//! 邮箱渠道端点(P1d,ADR-012)—— 验证码 / 邮箱注册登录 / 找回密码 /
//! 绑定换绑 / 资料与用户名。
//!
//! 统一返回结构化错误(`errors::ApiErr`,JSON 信封);旧端点维持纯文本不变。
//! 频控与验证码语义见 `email_codes.rs` 模块注释。

use axum::extract::{ConnectInfo, State};
use axum::http::{HeaderMap, StatusCode};
use axum::Json;
use pomoflow_core::model::Id;
use serde::Deserialize;
use serde_json::json;
use uuid::Uuid;

use crate::auth;
use crate::auth_handlers::{authenticate, issue_tokens, log_login, AuthTokens};
use crate::email_codes as ec;
use crate::errors::ApiErr;
use crate::state::AppState;

type ApiJson<T> = Result<(StatusCode, Json<T>), ApiErr>;

fn now_ms() -> i64 {
    chrono::Utc::now().timestamp_millis()
}

/// 旧认证函数的错误类型 → ApiErr(仅做包装,不改语义)。
fn auth_user(app: &AppState, headers: &HeaderMap) -> Result<Id, ApiErr> {
    authenticate(app, headers).map_err(|(status, message)| ApiErr {
        status,
        code: "UNAUTHORIZED",
        message,
        retry_after_secs: None,
    })
}

fn bearer_static(app: &AppState, headers: &HeaderMap) -> bool {
    headers
        .get(axum::http::header::AUTHORIZATION)
        .and_then(|v| v.to_str().ok())
        .and_then(|v| v.strip_prefix("Bearer "))
        == Some(app.token.as_str())
}

// === 请求体 ================================================================

#[derive(Debug, Deserialize)]
pub struct SendCodeRequest {
    pub email: String,
    pub purpose: String, // register | reset | bind
}

#[derive(Debug, Deserialize)]
pub struct RegisterEmailRequest {
    pub email: String,
    pub code: String,
    pub password: String,
    #[serde(default)]
    pub device_id: Option<String>,
    #[serde(default)]
    pub device_name: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct LoginEmailRequest {
    pub email: String,
    pub password: String,
    #[serde(default)]
    pub device_id: Option<String>,
    #[serde(default)]
    pub device_name: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct ResetPasswordRequest {
    pub email: String,
    pub code: String,
    pub new_password: String,
}

#[derive(Debug, Deserialize)]
pub struct BindEmailRequest {
    pub email: String,
    pub code: String,
    /// 换绑是敏感操作:仅 JWT 不足以改找回渠道,必须验当前密码
    pub password: String,
}

#[derive(Debug, Deserialize)]
pub struct UpdateProfileRequest {
    /// 可选更新:传了才改(None = 保持)
    pub display_name: Option<String>,
    /// 个性签名(0..=50 字;原型规格)
    pub bio: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct DeletionRequest {
    pub password: String,
    /// 已绑定并验证邮箱的账号必填(purpose=delete 的验证码)
    #[serde(default)]
    pub code: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct DeletionCancelRequest {
    pub password: String,
}

#[derive(Debug, Deserialize)]
pub struct SetAvatarRequest {
    /// 图片原始字节的 base64(JSON 传输,免 multipart)
    pub avatar_base64: String,
    /// "image/jpeg" | "image/png"
    pub mime: String,
}

#[derive(Debug, serde::Serialize)]
pub struct AvatarResponse {
    /// 无头像时为 None
    pub avatar_base64: Option<String>,
    pub mime: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateUsernameRequest {
    pub username: String,
    pub password: String,
}

#[derive(Debug, serde::Serialize)]
pub struct ProfileResponse {
    pub user_id: String,
    pub username: String,
    pub display_name: String,
    pub bio: String,
    pub email: Option<String>,
    pub email_verified: bool,
    pub created_ms: i64,
    pub password_changed_ms: Option<i64>,
    /// 非空 = 注销申请中(冷静期截止前的申请时间)
    pub deletion_requested_ms: Option<i64>,
}

// === 验证码核对(共用内核)==================================================

/// 校验并消费验证码:错码 attempts+1,达上限作废;对/错/无码返回统一语义。
async fn verify_code(app: &AppState, email: &str, purpose: &str, code: &str) -> Result<(), ApiErr> {
    if !ec::looks_like_code(code) {
        return Err(ApiErr::bad_request("CODE_INVALID", "验证码错误或已过期"));
    }
    let now = now_ms();
    let row: Option<(i64, String, i32)> = sqlx::query_as(
        "SELECT id, code_hash, attempts FROM email_codes
         WHERE email = $1 AND purpose = $2 AND used_ms IS NULL AND expires_ms > $3
         ORDER BY created_ms DESC LIMIT 1",
    )
    .bind(email)
    .bind(purpose)
    .bind(now)
    .fetch_optional(&app.pool)
    .await
    .map_err(ApiErr::db)?;

    let Some((id, hash, attempts)) = row else {
        return Err(ApiErr::bad_request("CODE_INVALID", "验证码错误或已过期"));
    };
    if attempts >= ec::CODE_MAX_ATTEMPTS {
        return Err(ApiErr::bad_request("CODE_EXHAUSTED", "尝试次数过多,请重新获取验证码"));
    }
    if ec::code_hash(&app.code_pepper, email, code) == hash {
        sqlx::query("UPDATE email_codes SET used_ms = $1 WHERE id = $2")
            .bind(now)
            .bind(id)
            .execute(&app.pool)
            .await
            .map_err(ApiErr::db)?;
        Ok(())
    } else {
        sqlx::query("UPDATE email_codes SET attempts = attempts + 1 WHERE id = $2")
            .bind(id)
            .execute(&app.pool)
            .await
            .map_err(ApiErr::db)?;
        if attempts + 1 >= ec::CODE_MAX_ATTEMPTS {
            Err(ApiErr::bad_request("CODE_EXHAUSTED", "尝试次数过多,请重新获取验证码"))
        } else {
            Err(ApiErr::bad_request("CODE_INVALID", "验证码错误或已过期"))
        }
    }
}

/// 发送频控(按 email_codes 行数统计):邮箱 60s / 5每小时 / 10每天 + IP 10每小时。
async fn check_rate_limit(
    app: &AppState,
    email: &str,
    purpose: &str,
    ip: &str,
) -> Result<(), ApiErr> {
    let now = now_ms();

    let last_interval: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM email_codes
         WHERE email = $1 AND purpose = $2 AND created_ms > $3",
    )
    .bind(email)
    .bind(purpose)
    .bind(now - ec::PER_EMAIL_INTERVAL_MS)
    .fetch_one(&app.pool)
    .await
    .map_err(ApiErr::db)?;
    if last_interval > 0 {
        return Err(ApiErr::rate_limited("发送过于频繁,请稍后再试", 60));
    }

    let last_hour: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM email_codes WHERE email = $1 AND created_ms > $2",
    )
    .bind(email)
    .bind(now - 3_600_000)
    .fetch_one(&app.pool)
    .await
    .map_err(ApiErr::db)?;
    if last_hour >= ec::PER_EMAIL_PER_HOUR {
        return Err(ApiErr::rate_limited("该邮箱每小时发送已达上限", 3600));
    }

    let last_day: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM email_codes WHERE email = $1 AND created_ms > $2",
    )
    .bind(email)
    .bind(now - 86_400_000)
    .fetch_one(&app.pool)
    .await
    .map_err(ApiErr::db)?;
    if last_day >= ec::PER_EMAIL_PER_DAY {
        return Err(ApiErr::rate_limited("该邮箱今日发送已达上限", 86_400));
    }

    let ip_hour: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM email_codes WHERE request_ip = $1 AND created_ms > $2",
    )
    .bind(ip)
    .bind(now - 3_600_000)
    .fetch_one(&app.pool)
    .await
    .map_err(ApiErr::db)?;
    if ip_hour >= ec::PER_IP_PER_HOUR {
        return Err(ApiErr::rate_limited("请求过于频繁,请稍后再试", 3600));
    }
    Ok(())
}

// === 端点 ==================================================================

/// POST /v1/auth/email/send-code —— 发验证码(202;reset 对不存在邮箱静默 202 防枚举)。
pub async fn send_code(
    State(app): State<AppState>,
    ConnectInfo(addr): ConnectInfo<std::net::SocketAddr>,
    Json(req): Json<SendCodeRequest>,
) -> ApiJson<serde_json::Value> {
    let email = ec::normalize_email(&req.email);
    if !ec::valid_email(&email) {
        return Err(ApiErr::bad_request("INVALID_EMAIL", "邮箱格式不正确"));
    }
    let purpose = match req.purpose.as_str() {
        "register" | "reset" | "bind" | "delete" => req.purpose.as_str(),
        _ => return Err(ApiErr::bad_request("INVALID_PURPOSE", "purpose 非法")),
    };
    let ip = addr.ip().to_string();

    match purpose {
        // 注册/换绑:目标邮箱已被占用 → 409(可接受的 UX 取舍,ADR-012 记录)
        "register" | "bind" => {
            let taken: bool = sqlx::query_scalar("SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)")
                .bind(&email)
                .fetch_one(&app.pool)
                .await
                .map_err(ApiErr::db)?;
            if taken {
                return Err(ApiErr::conflict("EMAIL_TAKEN", "该邮箱已被使用"));
            }
        }
        // 找回:账号不存在 → 静默 202(不泄露注册情况,也不发信)
        "reset" => {
            let exists: bool = sqlx::query_scalar("SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)")
                .bind(&email)
                .fetch_one(&app.pool)
                .await
                .map_err(ApiErr::db)?;
            if !exists {
                return Ok((StatusCode::ACCEPTED, Json(json!({ "ok": true, "expires_in": 600 }))));
            }
        }
        _ => unreachable!("上面已过滤"),
    }

    check_rate_limit(&app, &email, purpose, &ip).await?;

    let code = ec::gen_code();
    let now = now_ms();
    // 新码生效即作废旧码(同 email+purpose 同时至多一条活码)
    sqlx::query(
        "UPDATE email_codes SET used_ms = $1
         WHERE email = $2 AND purpose = $3 AND used_ms IS NULL",
    )
    .bind(now)
    .bind(&email)
    .bind(purpose)
    .execute(&app.pool)
    .await
    .map_err(ApiErr::db)?;
    sqlx::query(
        "INSERT INTO email_codes
            (email, purpose, code_hash, attempts, created_ms, expires_ms, used_ms, request_ip)
         VALUES ($1, $2, $3, 0, $4, $5, NULL, $6)",
    )
    .bind(&email)
    .bind(purpose)
    .bind(ec::code_hash(&app.code_pepper, &email, &code))
    .bind(now)
    .bind(now + ec::CODE_TTL_MS)
    .bind(&ip)
    .execute(&app.pool)
    .await
    .map_err(ApiErr::db)?;

    let subject = match purpose {
        "register" => "PomoFlow 注册验证码",
        "reset" => "PomoFlow 密码重置验证码",
        "delete" => "PomoFlow 账号注销验证码",
        _ => "PomoFlow 邮箱换绑验证码",
    };
    let body = format!(
        "你的验证码是:{code}\n\n{expires} 分钟内有效;若非本人操作请忽略本邮件。",
        expires = ec::CODE_TTL_MS / 60000
    );
    if let Err(e) = app.mailer.send(&email, subject, &body).await {
        log::error!("mail to {email} failed: {e}");
        return Err(ApiErr::internal("邮件发送失败,请稍后重试"));
    }
    log::info!("code sent: email={email} purpose={purpose} ip={ip}");

    Ok((StatusCode::ACCEPTED, Json(json!({ "ok": true, "expires_in": ec::CODE_TTL_MS / 1000 }))))
}

/// POST /v1/auth/register-email —— 邮箱注册(首账号采纳同用户名注册)。
pub async fn register_email(
    State(app): State<AppState>,
    headers: HeaderMap,
    ConnectInfo(addr): ConnectInfo<std::net::SocketAddr>,
    Json(req): Json<RegisterEmailRequest>,
) -> Result<(StatusCode, Json<AuthTokens>), ApiErr> {
    let email = ec::normalize_email(&req.email);
    if !ec::valid_email(&email) {
        return Err(ApiErr::bad_request("INVALID_EMAIL", "邮箱格式不正确"));
    }
    if !auth::valid_password(&req.password) {
        return Err(ApiErr::bad_request("INVALID_PASSWORD", "密码需 8 位及以上"));
    }
    verify_code(&app, &email, "register", &req.code).await?;

    let taken: bool =
        sqlx::query_scalar("SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)")
            .bind(&email)
            .fetch_one(&app.pool)
            .await
            .map_err(ApiErr::db)?;
    if taken {
        return Err(ApiErr::conflict("EMAIL_TAKEN", "该邮箱已被注册"));
    }

    // 首账号采纳:users 为空且带有效运维静态 Token → 继承 SYNC_USER_ID
    let user_count: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM users")
        .fetch_one(&app.pool)
        .await
        .map_err(ApiErr::db)?;
    let user_id = if user_count == 0 && bearer_static(&app, &headers) {
        log::info!("first email account adopts legacy SYNC_USER_ID {}", app.user_str());
        app.user_id.to_string()
    } else {
        Uuid::new_v4().to_string()
    };

    // 邮箱账号的 username 初始 = 邮箱全文(唯一性天然),展示名取本地部分;
    // 之后可在账号中心改成常规用户名
    let display_name = email.split('@').next().unwrap_or(&email).to_string();
    let hash = auth::hash_password(&req.password).map_err(ApiErr::internal)?;
    let now = now_ms();
    let inserted = sqlx::query(
        "INSERT INTO users
            (id, username, password_hash, created_ms, display_name, email,
             email_verified_ms, password_changed_ms)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $7)",
    )
    .bind(&user_id)
    .bind(&email)
    .bind(&hash)
    .bind(now)
    .bind(&display_name)
    .bind(&email)
    .bind(now)
    .execute(&app.pool)
    .await;
    match inserted {
        Ok(_) => {}
        Err(sqlx::Error::Database(db)) if db.is_unique_violation() => {
            return Err(ApiErr::conflict("EMAIL_TAKEN", "该邮箱已被注册"));
        }
        Err(e) => return Err(ApiErr::db(e)),
    }

    log_login(
        &app,
        &user_id,
        req.device_id.as_deref().unwrap_or(""),
        req.device_name.as_deref().unwrap_or(""),
        &addr.ip().to_string(),
        "register_email",
        true,
        "",
    )
    .await;
    let tokens = issue_tokens(
        &app,
        &user_id,
        &display_name,
        req.device_id.as_deref().unwrap_or(""),
        req.device_name.as_deref().unwrap_or(""),
    )
    .await
    .map_err(|(status, message)| ApiErr {
        status,
        code: "INTERNAL",
        message,
        retry_after_secs: None,
    })?;
    Ok((StatusCode::CREATED, Json(tokens)))
}

/// POST /v1/auth/login-email —— 邮箱+密码登录(拍板形态;验证码不参与登录)。
pub async fn login_email(
    State(app): State<AppState>,
    ConnectInfo(addr): ConnectInfo<std::net::SocketAddr>,
    Json(req): Json<LoginEmailRequest>,
) -> Result<Json<AuthTokens>, ApiErr> {
    let email = ec::normalize_email(&req.email);
    let row: Option<(String, String, String)> = sqlx::query_as(
        "SELECT id, COALESCE(NULLIF(display_name, ''), username), password_hash
         FROM users WHERE email = $1",
    )
    .bind(&email)
    .fetch_optional(&app.pool)
    .await
    .map_err(ApiErr::db)?;

    let ip = addr.ip().to_string();
    let dev_id = req.device_id.as_deref().unwrap_or("");
    let dev_name = req.device_name.as_deref().unwrap_or("");
    // 统一错误文案,不给"邮箱是否存在"的探测口子
    let Some((user_id, display, password_hash)) = row else {
        log_login(&app, "", dev_id, dev_name, &ip, "email", false, "账号不存在").await;
        return Err(ApiErr::unauthorized("邮箱或密码错误"));
    };
    if !auth::verify_password(&req.password, &password_hash) {
        log_login(&app, &user_id, dev_id, dev_name, &ip, "email", false, "密码错误").await;
        return Err(ApiErr::unauthorized("邮箱或密码错误"));
    }
    log_login(&app, &user_id, dev_id, dev_name, &ip, "email", true, "").await;
    let tokens = issue_tokens(
        &app,
        &user_id,
        &display,
        req.device_id.as_deref().unwrap_or(""),
        req.device_name.as_deref().unwrap_or(""),
    )
    .await
    .map_err(|(status, message)| ApiErr {
        status,
        code: "INTERNAL",
        message,
        retry_after_secs: None,
    })?;
    Ok(Json(tokens))
}

/// POST /v1/auth/reset-password —— 找回密码:验码 → 改哈希 → **全端踢出(含本机)**。
pub async fn reset_password(
    State(app): State<AppState>,
    Json(req): Json<ResetPasswordRequest>,
) -> Result<Json<serde_json::Value>, ApiErr> {
    let email = ec::normalize_email(&req.email);
    if !auth::valid_password(&req.new_password) {
        return Err(ApiErr::bad_request("INVALID_PASSWORD", "新密码需 8 位及以上"));
    }
    // 无码行(含"账号不存在导致从未发码")与错码同错误,不泄露注册情况
    verify_code(&app, &email, "reset", &req.code).await?;
    let user_id: Option<String> = sqlx::query_scalar("SELECT id FROM users WHERE email = $1")
        .bind(&email)
        .fetch_optional(&app.pool)
        .await
        .map_err(ApiErr::db)?;
    let Some(user_id) = user_id else {
        return Err(ApiErr::bad_request("CODE_INVALID", "验证码错误或已过期"));
    };

    let hash = auth::hash_password(&req.new_password).map_err(ApiErr::internal)?;
    let now = now_ms();
    sqlx::query("UPDATE users SET password_hash = $1, password_changed_ms = $2 WHERE id = $3")
        .bind(&hash)
        .bind(now)
        .bind(&user_id)
        .execute(&app.pool)
        .await
        .map_err(ApiErr::db)?;
    // 全端下线(含正在使用的设备)—— 找回密码是高权限动作
    sqlx::query(
        "UPDATE refresh_tokens SET revoked_ms = $1 WHERE user_id = $2 AND revoked_ms IS NULL",
    )
    .bind(now)
    .bind(&user_id)
    .execute(&app.pool)
    .await
    .map_err(ApiErr::db)?;
    log::info!("password reset via email: user={user_id} (all sessions revoked)");
    Ok(Json(json!({ "ok": true })))
}

/// POST /v1/auth/email/bind(JWT)—— 绑定/换绑邮箱:验当前密码 + 新邮箱验证码。
pub async fn bind_email(
    State(app): State<AppState>,
    headers: HeaderMap,
    Json(req): Json<BindEmailRequest>,
) -> Result<Json<serde_json::Value>, ApiErr> {
    let user = auth_user(&app, &headers)?;
    let email = ec::normalize_email(&req.email);
    if !ec::valid_email(&email) {
        return Err(ApiErr::bad_request("INVALID_EMAIL", "邮箱格式不正确"));
    }
    let hash: Option<String> =
        sqlx::query_scalar("SELECT password_hash FROM users WHERE id = $1")
            .bind(user.as_str())
            .fetch_optional(&app.pool)
            .await
            .map_err(ApiErr::db)?;
    let Some(hash) = hash else {
        return Err(ApiErr::not_found("账号不存在"));
    };
    if !auth::verify_password(&req.password, &hash) {
        return Err(ApiErr::unauthorized("当前密码不正确"));
    }
    verify_code(&app, &email, "bind", &req.code).await?;

    let taken: Option<String> =
        sqlx::query_scalar("SELECT id FROM users WHERE email = $1 AND id <> $2")
            .bind(&email)
            .bind(user.as_str())
            .fetch_optional(&app.pool)
            .await
            .map_err(ApiErr::db)?;
    if taken.is_some() {
        return Err(ApiErr::conflict("EMAIL_TAKEN", "该邮箱已被其他账号使用"));
    }

    sqlx::query("UPDATE users SET email = $1, email_verified_ms = $2 WHERE id = $3")
        .bind(&email)
        .bind(now_ms())
        .bind(user.as_str())
        .execute(&app.pool)
        .await
        .map_err(ApiErr::db)?;
    log::info!("email bound: user={} email={email}", user.as_str());
    Ok(Json(json!({ "ok": true })))
}

/// GET /v1/auth/profile(JWT)。
pub async fn get_profile(
    State(app): State<AppState>,
    headers: HeaderMap,
) -> Result<Json<ProfileResponse>, ApiErr> {
    /// (id, username, display_name, bio, email, email_verified_ms, created_ms,
    ///  password_changed_ms, deletion_requested_ms)
    type ProfileRow = (
        String, String, String, String, Option<String>, Option<i64>, i64, Option<i64>, Option<i64>,
    );
    let user = auth_user(&app, &headers)?;
    let row: Option<ProfileRow> =
        sqlx::query_as(
            "SELECT id, username, display_name, bio, email, email_verified_ms, created_ms,
                    password_changed_ms, deletion_requested_ms
             FROM users WHERE id = $1",
        )
        .bind(user.as_str())
        .fetch_optional(&app.pool)
        .await
        .map_err(ApiErr::db)?;
    let Some((
        user_id,
        username,
        display_name,
        bio,
        email,
        verified,
        created,
        pw_changed,
        deletion,
    )) = row
    else {
        return Err(ApiErr::not_found("账号不存在"));
    };
    Ok(Json(ProfileResponse {
        user_id,
        username,
        display_name,
        bio,
        email,
        email_verified: verified.is_some(),
        created_ms: created,
        password_changed_ms: pw_changed,
        deletion_requested_ms: deletion,
    }))
}

/// POST /v1/auth/profile(JWT)—— 改资料:显示名(0..=32,空 = 回退 username)
/// 与个性签名(0..=50);字段可选,传了才改。
pub async fn update_profile(
    State(app): State<AppState>,
    headers: HeaderMap,
    Json(req): Json<UpdateProfileRequest>,
) -> Result<Json<serde_json::Value>, ApiErr> {
    let user = auth_user(&app, &headers)?;
    if let Some(name) = req.display_name.as_deref() {
        let name = name.trim();
        if name.chars().count() > 32 {
            return Err(ApiErr::bad_request("INVALID_NAME", "显示名最多 32 字"));
        }
        sqlx::query("UPDATE users SET display_name = $1 WHERE id = $2")
            .bind(name)
            .bind(user.as_str())
            .execute(&app.pool)
            .await
            .map_err(ApiErr::db)?;
    }
    if let Some(bio) = req.bio.as_deref() {
        let bio = bio.trim();
        if bio.chars().count() > 50 {
            return Err(ApiErr::bad_request("INVALID_BIO", "个性签名最多 50 字"));
        }
        sqlx::query("UPDATE users SET bio = $1 WHERE id = $2")
            .bind(bio)
            .bind(user.as_str())
            .execute(&app.pool)
            .await
            .map_err(ApiErr::db)?;
    }
    Ok(Json(json!({ "ok": true })))
}

/// 冷静期时长(毫秒):15 天。
pub const DELETION_COOLDOWN_MS: i64 = 15 * 86_400_000;

/// 校验当前密码(注销类操作的公共前置)。
async fn verify_user_password(app: &AppState, user: &str, password: &str) -> Result<(), ApiErr> {
    let hash: Option<String> =
        sqlx::query_scalar("SELECT password_hash FROM users WHERE id = $1")
            .bind(user)
            .fetch_optional(&app.pool)
            .await
            .map_err(ApiErr::db)?;
    let Some(hash) = hash else {
        return Err(ApiErr::not_found("账号不存在"));
    };
    if !auth::verify_password(password, &hash) {
        return Err(ApiErr::unauthorized("当前密码不正确"));
    }
    Ok(())
}

/// POST /v1/auth/deletion/request(JWT)—— 申请注销:
/// 验当前密码;已绑并验证邮箱的账号还必须带 purpose=delete 的验证码。
/// 生效语义:标记 deletion_requested_ms + 其他设备全部下线(保留本机最新会话
/// 以便冷静期内登录撤销);到期由每日清理任务级联删除全部云端数据。
pub async fn deletion_request(
    State(app): State<AppState>,
    headers: HeaderMap,
    Json(req): Json<DeletionRequest>,
) -> Result<Json<serde_json::Value>, ApiErr> {
    let user = auth_user(&app, &headers)?;
    verify_user_password(&app, user.as_str(), &req.password).await?;

    let row: Option<(Option<String>, Option<i64>)> = sqlx::query_as(
        "SELECT email, email_verified_ms FROM users WHERE id = $1",
    )
    .bind(user.as_str())
    .fetch_optional(&app.pool)
    .await
    .map_err(ApiErr::db)?;
    let Some((email, verified)) = row else {
        return Err(ApiErr::not_found("账号不存在"));
    };
    if let (Some(email), Some(_)) = (&email, verified) {
        let code = req.code.as_deref().unwrap_or("");
        verify_code(&app, email, "delete", code).await?;
    }

    let now = now_ms();
    sqlx::query("UPDATE users SET deletion_requested_ms = $1 WHERE id = $2")
        .bind(now)
        .bind(user.as_str())
        .execute(&app.pool)
        .await
        .map_err(ApiErr::db)?;
    // 其他设备下线:保留该用户最新创建的一条会话(本机撤销通道),其余吊销
    sqlx::query(
        "UPDATE refresh_tokens SET revoked_ms = $1
         WHERE user_id = $2 AND revoked_ms IS NULL
           AND id <> (
             SELECT id FROM refresh_tokens WHERE user_id = $2
             ORDER BY created_ms DESC LIMIT 1
           )",
    )
    .bind(now)
    .bind(user.as_str())
    .execute(&app.pool)
    .await
    .map_err(ApiErr::db)?;

    let effective = now + DELETION_COOLDOWN_MS;
    log::warn!(
        "deletion requested: user={} effective_at={effective}",
        user.as_str()
    );
    Ok(Json(json!({
        "ok": true,
        "deletion_requested_ms": now,
        "effective_ms": effective,
    })))
}

/// POST /v1/auth/deletion/cancel(JWT)—— 冷静期内撤销注销申请。
pub async fn deletion_cancel(
    State(app): State<AppState>,
    headers: HeaderMap,
    Json(req): Json<DeletionCancelRequest>,
) -> Result<Json<serde_json::Value>, ApiErr> {
    let user = auth_user(&app, &headers)?;
    verify_user_password(&app, user.as_str(), &req.password).await?;
    let n = sqlx::query(
        "UPDATE users SET deletion_requested_ms = NULL
         WHERE id = $1 AND deletion_requested_ms IS NOT NULL",
    )
    .bind(user.as_str())
    .execute(&app.pool)
    .await
    .map_err(ApiErr::db)?
    .rows_affected();
    if n == 0 {
        return Err(ApiErr::bad_request("NO_PENDING_DELETION", "没有待生效的注销申请"));
    }
    log::info!("deletion cancelled: user={}", user.as_str());
    Ok(Json(json!({ "ok": true })))
}

/// POST /v1/auth/username(JWT)—— 改用户名(登录名):验密码 + 唯一 +
/// 其他设备强制下线(本机换取新令牌不掉线,同改密码语义)。
pub async fn update_username(
    State(app): State<AppState>,
    headers: HeaderMap,
    Json(req): Json<UpdateUsernameRequest>,
) -> Result<Json<AuthTokens>, ApiErr> {
    let user = auth_user(&app, &headers)?;
    let username = req.username.trim().to_string();
    if !auth::valid_username(&username) {
        return Err(ApiErr::bad_request("INVALID_USERNAME", "用户名需 3-32 位字母/数字/_/-"));
    }
    let hash: Option<String> =
        sqlx::query_scalar("SELECT password_hash FROM users WHERE id = $1")
            .bind(user.as_str())
            .fetch_optional(&app.pool)
            .await
            .map_err(ApiErr::db)?;
    let Some(hash) = hash else {
        return Err(ApiErr::not_found("账号不存在"));
    };
    if !auth::verify_password(&req.password, &hash) {
        return Err(ApiErr::unauthorized("当前密码不正确"));
    }

    let now = now_ms();
    let updated = sqlx::query("UPDATE users SET username = $1 WHERE id = $2")
        .bind(&username)
        .bind(user.as_str())
        .execute(&app.pool)
        .await
        .map_err(ApiErr::db)?;
    if updated.rows_affected() == 0 {
        return Err(ApiErr::not_found("账号不存在"));
    }
    sqlx::query(
        "UPDATE refresh_tokens SET revoked_ms = $1 WHERE user_id = $2 AND revoked_ms IS NULL",
    )
    .bind(now)
    .bind(user.as_str())
    .execute(&app.pool)
    .await
    .map_err(ApiErr::db)?;

    let tokens = issue_tokens(&app, user.as_str(), &username, "", "")
        .await
        .map_err(|(status, message)| ApiErr {
            status,
            code: "INTERNAL",
            message,
            retry_after_secs: None,
        })?;
    log::info!("username changed: user={} -> {username}", user.as_str());
    Ok(Json(tokens))
}

// === 头像(P1d,原型规格:JPG/PNG ≤2MB)=====================================

/// 头像大小上限(字节)。
const AVATAR_MAX_BYTES: usize = 2 * 1024 * 1024;

/// POST /v1/auth/avatar(JWT)—— 上传/替换头像(base64 JSON)。
pub async fn set_avatar(
    State(app): State<AppState>,
    headers: HeaderMap,
    Json(req): Json<SetAvatarRequest>,
) -> Result<Json<serde_json::Value>, ApiErr> {
    use base64::Engine as _;
    let user = auth_user(&app, &headers)?;
    if !matches!(req.mime.as_str(), "image/jpeg" | "image/png") {
        return Err(ApiErr::bad_request("INVALID_AVATAR", "头像仅支持 JPG/PNG"));
    }
    let bytes = base64::engine::general_purpose::STANDARD
        .decode(req.avatar_base64.as_bytes())
        .map_err(|e| ApiErr::bad_request("INVALID_AVATAR", format!("base64 解码失败: {e}")))?;
    if bytes.is_empty() || bytes.len() > AVATAR_MAX_BYTES {
        return Err(ApiErr::bad_request("INVALID_AVATAR", "头像需在 2MB 以内"));
    }
    // 魔法字节核验(不信任客户端声称的 mime)
    let ok = match bytes.as_slice() {
        [0xFF, 0xD8, 0xFF, ..] => req.mime == "image/jpeg",
        [0x89, b'P', b'N', b'G', ..] => req.mime == "image/png",
        _ => false,
    };
    if !ok {
        return Err(ApiErr::bad_request("INVALID_AVATAR", "文件内容与格式不符(仅 JPG/PNG)"));
    }
    sqlx::query("UPDATE users SET avatar = $1, avatar_mime = $2 WHERE id = $3")
        .bind(&bytes)
        .bind(&req.mime)
        .bind(user.as_str())
        .execute(&app.pool)
        .await
        .map_err(ApiErr::db)?;
    Ok(Json(json!({ "ok": true })))
}

/// GET /v1/auth/avatar(JWT)—— 取头像(无头像 avatar_base64 = null)。
pub async fn get_avatar(
    State(app): State<AppState>,
    headers: HeaderMap,
) -> Result<Json<AvatarResponse>, ApiErr> {
    use base64::Engine as _;
    let user = auth_user(&app, &headers)?;
    let row: Option<(Option<Vec<u8>>, Option<String>)> = sqlx::query_as(
        "SELECT avatar, avatar_mime FROM users WHERE id = $1",
    )
    .bind(user.as_str())
    .fetch_optional(&app.pool)
    .await
    .map_err(ApiErr::db)?;
    let Some((avatar, mime)) = row else {
        return Err(ApiErr::not_found("账号不存在"));
    };
    Ok(Json(AvatarResponse {
        avatar_base64: avatar
            .map(|b| base64::engine::general_purpose::STANDARD.encode(b)),
        mime,
    }))
}

/// DELETE /v1/auth/avatar(JWT)—— 移除头像(幂等)。
pub async fn delete_avatar(
    State(app): State<AppState>,
    headers: HeaderMap,
) -> Result<Json<serde_json::Value>, ApiErr> {
    let user = auth_user(&app, &headers)?;
    sqlx::query("UPDATE users SET avatar = NULL, avatar_mime = NULL WHERE id = $1")
        .bind(user.as_str())
        .execute(&app.pool)
        .await
        .map_err(ApiErr::db)?;
    Ok(Json(json!({ "ok": true })))
}

/// GET /v1/auth/export(JWT)—— 导出该账号全部云端数据(注销前备份,ADR-012)。
/// 内容:profile 概要 + 全部实体快照(snapshots 行原样)。JSON 一次拉全,
/// 个人规模数据量(几百条)足够;P6 规模化再改分页/文件流。
pub async fn export_data(
    State(app): State<AppState>,
    headers: HeaderMap,
) -> Result<Json<serde_json::Value>, ApiErr> {
    let user = auth_user(&app, &headers)?;
    let profile = get_profile_inner(&app, &headers).await?;
    let rows: Vec<(String, String, i64, i64, serde_json::Value)> = sqlx::query_as(
        "SELECT entity, entity_id, revision, updated_ms, payload
         FROM snapshots WHERE user_id = $1 ORDER BY entity, entity_id",
    )
    .bind(user.as_str())
    .fetch_all(&app.pool)
    .await
    .map_err(ApiErr::db)?;
    let snapshots: Vec<serde_json::Value> = rows
        .into_iter()
        .map(|(entity, entity_id, revision, updated_ms, payload)| {
            json!({
                "entity": entity,
                "entity_id": entity_id,
                "revision": revision,
                "updated_ms": updated_ms,
                "payload": payload,
            })
        })
        .collect();
    Ok(Json(json!({
        "exported_ms": now_ms(),
        "user_id": user.as_str(),
        "profile": {
            "username": profile.username,
            "display_name": profile.display_name,
            "bio": profile.bio,
            "email": profile.email,
        },
        "snapshots": snapshots,
    })))
}

/// get_profile 的内部复用形(export 需要同一份数据)。
async fn get_profile_inner(
    app: &AppState,
    headers: &HeaderMap,
) -> Result<ProfileResponse, ApiErr> {
    let user = auth_user(app, headers)?;
    type ProfileRow = (
        String, String, String, String, Option<String>, Option<i64>, i64, Option<i64>, Option<i64>,
    );
    let row: Option<ProfileRow> = sqlx::query_as(
        "SELECT id, username, display_name, bio, email, email_verified_ms, created_ms,
                password_changed_ms, deletion_requested_ms
         FROM users WHERE id = $1",
    )
    .bind(user.as_str())
    .fetch_optional(&app.pool)
    .await
    .map_err(ApiErr::db)?;
    let Some((user_id, username, display_name, bio, email, verified, created, pw_changed, deletion)) =
        row
    else {
        return Err(ApiErr::not_found("账号不存在"));
    };
    Ok(ProfileResponse {
        user_id,
        username,
        display_name,
        bio,
        email,
        email_verified: verified.is_some(),
        created_ms: created,
        password_changed_ms: pw_changed,
        deletion_requested_ms: deletion,
    })
}

/// 单条登录记录(序列化形态)。
#[derive(Debug, serde::Serialize)]
pub struct LoginLogItem {
    pub created_ms: i64,
    pub device_id: String,
    pub device_name: String,
    pub ip: String,
    pub method: String,
    pub ok: bool,
    pub detail: String,
}

/// GET /v1/auth/login-logs(JWT)—— 本人最近 50 条登录记录(含失败)。
pub async fn login_logs(
    State(app): State<AppState>,
    headers: HeaderMap,
) -> Result<Json<Vec<LoginLogItem>>, ApiErr> {
    let user = auth_user(&app, &headers)?;
    let rows: Vec<(i64, String, String, String, String, bool, String)> = sqlx::query_as(
        "SELECT created_ms, device_id, device_name, ip, method, ok, detail
         FROM login_logs WHERE user_id = $1
         ORDER BY created_ms DESC LIMIT 50",
    )
    .bind(user.as_str())
    .fetch_all(&app.pool)
    .await
    .map_err(ApiErr::db)?;
    let out = rows
        .into_iter()
        .map(|(created_ms, device_id, device_name, ip, method, ok, detail)| LoginLogItem {
            created_ms,
            device_id,
            device_name,
            ip,
            method,
            ok,
            detail,
        })
        .collect();
    Ok(Json(out))
}
