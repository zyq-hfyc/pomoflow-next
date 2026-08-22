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
use crate::auth_handlers::{authenticate, issue_tokens, AuthTokens};
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
pub struct UpdateDisplayNameRequest {
    pub display_name: String,
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
    pub email: Option<String>,
    pub email_verified: bool,
    pub created_ms: i64,
    pub password_changed_ms: Option<i64>,
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
        "register" | "reset" | "bind" => req.purpose.as_str(),
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

    // 统一错误文案,不给"邮箱是否存在"的探测口子
    let Some((user_id, display, password_hash)) = row else {
        return Err(ApiErr::unauthorized("邮箱或密码错误"));
    };
    if !auth::verify_password(&req.password, &password_hash) {
        return Err(ApiErr::unauthorized("邮箱或密码错误"));
    }
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
    /// (id, username, display_name, email, email_verified_ms, created_ms, password_changed_ms)
    type ProfileRow = (String, String, String, Option<String>, Option<i64>, i64, Option<i64>);
    let user = auth_user(&app, &headers)?;
    let row: Option<ProfileRow> =
        sqlx::query_as(
            "SELECT id, username, display_name, email, email_verified_ms, created_ms,
                    password_changed_ms
             FROM users WHERE id = $1",
        )
        .bind(user.as_str())
        .fetch_optional(&app.pool)
        .await
        .map_err(ApiErr::db)?;
    let Some((user_id, username, display_name, email, verified, created, pw_changed)) = row
    else {
        return Err(ApiErr::not_found("账号不存在"));
    };
    Ok(Json(ProfileResponse {
        user_id,
        username,
        display_name,
        email,
        email_verified: verified.is_some(),
        created_ms: created,
        password_changed_ms: pw_changed,
    }))
}

/// POST /v1/auth/profile(JWT)—— 改显示名(0..=32,空 = 回退 username)。
pub async fn update_display_name(
    State(app): State<AppState>,
    headers: HeaderMap,
    Json(req): Json<UpdateDisplayNameRequest>,
) -> Result<Json<serde_json::Value>, ApiErr> {
    let user = auth_user(&app, &headers)?;
    let name = req.display_name.trim();
    if name.chars().count() > 32 {
        return Err(ApiErr::bad_request("INVALID_NAME", "显示名最多 32 字"));
    }
    sqlx::query("UPDATE users SET display_name = $1 WHERE id = $2")
        .bind(name)
        .bind(user.as_str())
        .execute(&app.pool)
        .await
        .map_err(ApiErr::db)?;
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
