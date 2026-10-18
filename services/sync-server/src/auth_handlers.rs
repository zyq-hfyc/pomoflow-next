//! 账号端点(P1b,ADR-007)—— register / login / refresh / logout。
//!
//! ## 首账号"存量采纳"
//!
//! 静态 Token 时代(MVP)只有 SYNC_USER_ID 一个用户,数据全挂在它名下。
//! 升级到账号体系时,如果**第一个注册的账号**在注册请求里同时携带了
//! 有效的运维静态 Token(`Authorization: Bearer <SYNC_TOKEN>`),服务端把
//! 该账号的 id 直接设为 SYNC_USER_ID —— 存量数据无缝并入新账号,
//! 桌面端登录后无需任何数据迁移。之后的注册一律分配新 UUID。
//!
//! ## Refresh 轮换
//!
//! 每次 refresh:吊销旧 token(revoked_ms)+ 签发新的一对(Access + Refresh)。
//! token 泄露时窗口最小化;旧 token 二次使用直接 401。

use axum::extract::State;
use axum::http::{HeaderMap, StatusCode};
use axum::Json;
use pomoflow_core::model::Id;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::auth;
use crate::errors::{ACCOUNT_BANNED_CODE, ACCOUNT_BANNED_MESSAGE, INTERNAL_ERROR_MESSAGE};
use crate::state::AppState;

type ApiError = (StatusCode, String);

fn internal(e: sqlx::Error) -> ApiError {
    log::error!("database error: {e}");
    (
        StatusCode::INTERNAL_SERVER_ERROR,
        INTERNAL_ERROR_MESSAGE.into(),
    )
}

/// 旧文本端点也保留稳定机器码,P1d 包装时可直接识别。
pub(crate) fn account_banned_error() -> ApiError {
    (
        StatusCode::FORBIDDEN,
        format!("{ACCOUNT_BANNED_CODE}: {ACCOUNT_BANNED_MESSAGE}"),
    )
}

/// 登录失败限流(2026-09-15 批 6:按 IP 计近 15 分钟失败次数,≥5 次锁出)。
/// 复用 login_logs 表(已有 ok=false 的失败行),无需新表。
pub(crate) async fn check_login_rate_limit(app: &AppState, ip: &str) -> Result<(), ApiError> {
    let cutoff = chrono::Utc::now().timestamp_millis() - 15 * 60 * 1000;
    let n: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM login_logs WHERE ip = $1 AND ok = false AND created_ms > $2",
    )
    .bind(ip)
    .bind(cutoff)
    .fetch_one(&app.pool)
    .await
    .unwrap_or(0);
    if n >= 5 {
        return Err((
            StatusCode::TOO_MANY_REQUESTS,
            "尝试次数过多,请 15 分钟后再试".into(),
        ));
    }
    Ok(())
}

/// 登录记录(login_logs):登录/注册的成败各一行。写失败只告警不影响主流程。
#[allow(clippy::too_many_arguments)]
pub(crate) async fn log_login(
    app: &AppState,
    user_id: &str,
    device_id: &str,
    device_name: &str,
    ip: &str,
    method: &str,
    ok: bool,
    detail: &str,
) {
    let r = sqlx::query(
        "INSERT INTO login_logs
            (user_id, device_id, device_name, ip, method, ok, detail, created_ms)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    )
    .bind(user_id)
    .bind(device_id)
    .bind(device_name)
    .bind(ip)
    .bind(method)
    .bind(ok)
    .bind(detail)
    .bind(chrono::Utc::now().timestamp_millis())
    .execute(&app.pool)
    .await;
    if let Err(e) = r {
        log::warn!("login log write failed: {e}");
    }
}

fn bearer(headers: &HeaderMap) -> Option<&str> {
    headers
        .get(axum::http::header::AUTHORIZATION)
        .and_then(|v| v.to_str().ok())
        .and_then(|v| v.strip_prefix("Bearer "))
}

#[derive(Debug, Deserialize)]
pub struct Credentials {
    pub username: String,
    pub password: String,
    /// 登录设备标识/友好名(桌面端上报,会话管理展示用;可缺省)
    #[serde(default)]
    pub device_id: Option<String>,
    #[serde(default)]
    pub device_name: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct RefreshRequest {
    pub refresh_token: String,
}

#[derive(Debug, Deserialize)]
pub struct ChangePasswordRequest {
    pub old_password: String,
    pub new_password: String,
    #[serde(default)]
    pub device_id: Option<String>,
    #[serde(default)]
    pub device_name: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct RevokeSessionRequest {
    /// 调用方自己的 refresh token(证明身份 + 定位"当前会话")
    pub refresh_token: String,
    /// 要吊销的会话行 id(来自 sessions 列表)
    pub revoke_id: i64,
}

/// 会话(= 一条有效 refresh token)的展示信息。
#[derive(Debug, Serialize)]
pub struct SessionInfo {
    pub id: i64,
    pub device_id: String,
    pub device_name: String,
    pub created_ms: i64,
    pub expires_ms: i64,
    /// 是否调用方当前会话(不可自我踢出)
    pub current: bool,
}

/// 登录/注册成功返回的四件套。
#[derive(Debug, Serialize)]
pub struct AuthTokens {
    pub user_id: String,
    pub username: String,
    pub access_token: String,
    /// refresh token 原文只出现一次(库里只有 SHA-256 摘要)
    pub refresh_token: String,
    /// access token 有效期(秒),客户端据此可预刷新
    pub expires_in: i64,
}

pub(crate) fn require_jwt(app: &AppState) -> Result<&str, ApiError> {
    app.jwt_secret.as_deref().ok_or((
        StatusCode::SERVICE_UNAVAILABLE,
        "JWT_SECRET 未配置,账号体系未启用".into(),
    ))
}

/// 在调用方事务内签发 token。用户行锁同时覆盖 cutoff 读取与 refresh 插入,
/// 使发牌与改密/强制下线共享同一串行边界。
pub(crate) async fn issue_tokens_on(
    app: &AppState,
    conn: &mut sqlx::PgConnection,
    user_id: &str,
    username: &str,
    device_id: &str,
    device_name: &str,
) -> Result<AuthTokens, ApiError> {
    let secret = require_jwt(app)?;
    let account: Option<(Option<i64>, Option<i64>)> = sqlx::query_as(
        "SELECT banned_ms, access_revoked_before_ms FROM users WHERE id = $1 FOR UPDATE",
    )
    .bind(user_id)
    .fetch_optional(&mut *conn)
    .await
    .map_err(internal)?;
    let Some((banned_ms, cutoff)) = account else {
        return Err((StatusCode::UNAUTHORIZED, "账号不存在或已删除".into()));
    };
    if banned_ms.is_some() {
        return Err(account_banned_error());
    }

    let refresh = auth::new_refresh_token();
    let now = chrono::Utc::now().timestamp_millis();
    // 先取得 refresh 行 id,再签 access:sid 将二者绑定,单会话吊销可立即失效 access。
    let session_id: i64 = sqlx::query_scalar(
        "INSERT INTO refresh_tokens
            (user_id, token_hash, device_id, device_name, created_ms, expires_ms)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id",
    )
    .bind(user_id)
    .bind(auth::sha256_hex(&refresh))
    .bind(device_id)
    .bind(device_name)
    .bind(now)
    .bind(now + auth::REFRESH_TTL_SECS * 1000)
    .fetch_one(&mut *conn)
    .await
    .map_err(internal)?;
    let access = auth::issue_access(secret, user_id, Some(session_id), cutoff)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e))?;
    Ok(AuthTokens {
        user_id: user_id.to_string(),
        username: username.to_string(),
        access_token: access,
        refresh_token: refresh,
        expires_in: auth::ACCESS_TTL_SECS,
    })
}

/// 签发一对新 token 并把 refresh 落库(独立事务包装)。
pub(crate) async fn issue_tokens(
    app: &AppState,
    user_id: &str,
    username: &str,
    device_id: &str,
    device_name: &str,
) -> Result<AuthTokens, ApiError> {
    let mut tx = app.pool.begin().await.map_err(internal)?;
    let tokens = issue_tokens_on(app, &mut tx, user_id, username, device_id, device_name).await?;
    tx.commit().await.map_err(internal)?;
    Ok(tokens)
}

/// POST /v1/auth/register —— 注册;首账号 + 运维静态 Token = 采纳 SYNC_USER_ID。
pub async fn register(
    State(app): State<AppState>,
    headers: HeaderMap,
    axum::extract::ConnectInfo(addr): axum::extract::ConnectInfo<std::net::SocketAddr>,
    Json(req): Json<Credentials>,
) -> Result<(StatusCode, Json<AuthTokens>), ApiError> {
    require_jwt(&app)?;
    let username = req.username.trim().to_string();
    if !auth::valid_username(&username) {
        return Err((
            StatusCode::BAD_REQUEST,
            "用户名需 3-32 位字母/数字/_/-".into(),
        ));
    }
    if !auth::valid_password(&req.password) {
        return Err((StatusCode::BAD_REQUEST, "密码需 8-128 位".into()));
    }

    // 首账号采纳:users 为空 且 请求带有效静态 Token → 继承 SYNC_USER_ID
    let user_count: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM users")
        .fetch_one(&app.pool)
        .await
        .map_err(internal)?;
    let operator_ok = bearer(&headers) == Some(app.token.as_str());
    let user_id = if user_count == 0 && operator_ok {
        log::info!(
            "first account adopts legacy SYNC_USER_ID {}",
            app.user_str()
        );
        app.user_id.to_string()
    } else {
        Uuid::new_v4().to_string()
    };

    let hash =
        auth::hash_password(&req.password).map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e))?;
    let now = chrono::Utc::now().timestamp_millis();
    let inserted = sqlx::query(
        "INSERT INTO users (id, username, password_hash, created_ms) VALUES ($1, $2, $3, $4)",
    )
    .bind(&user_id)
    .bind(&username)
    .bind(&hash)
    .bind(now)
    .execute(&app.pool)
    .await;
    match inserted {
        Ok(_) => {}
        // users.username 唯一冲突 → 409(不泄露是否存在,直接提示已占用)
        Err(sqlx::Error::Database(db)) if db.is_unique_violation() => {
            return Err((StatusCode::CONFLICT, "用户名已被占用".into()));
        }
        Err(e) => return Err(internal(e)),
    }

    log_login(
        &app,
        &user_id,
        req.device_id.as_deref().unwrap_or(""),
        req.device_name.as_deref().unwrap_or(""),
        &addr.ip().to_string(),
        "register_username",
        true,
        "",
    )
    .await;
    let tokens = issue_tokens(
        &app,
        &user_id,
        &username,
        req.device_id.as_deref().unwrap_or(""),
        req.device_name.as_deref().unwrap_or(""),
    )
    .await?;
    Ok((StatusCode::CREATED, Json(tokens)))
}

/// POST /v1/auth/login —— 校验密码,签发新对。
pub async fn login(
    State(app): State<AppState>,
    axum::extract::ConnectInfo(addr): axum::extract::ConnectInfo<std::net::SocketAddr>,
    Json(req): Json<Credentials>,
) -> Result<Json<AuthTokens>, ApiError> {
    require_jwt(&app)?;
    check_login_rate_limit(&app, &addr.ip().to_string()).await?;
    let username = req.username.trim().to_string();
    let mut tx = app.pool.begin().await.map_err(internal)?;
    let row: Option<(String, String, String, Option<i64>)> = sqlx::query_as(
        "SELECT id, username, password_hash, banned_ms FROM users WHERE username = $1 FOR UPDATE",
    )
    .bind(&username)
    .fetch_optional(&mut *tx)
    .await
    .map_err(internal)?;

    let ip = addr.ip().to_string();
    let dev_id = req.device_id.as_deref().unwrap_or("");
    let dev_name = req.device_name.as_deref().unwrap_or("");
    // 统一返回"用户名或密码错误",不给探测口子
    let Some((user_id, username, password_hash, banned_ms)) = row else {
        log_login(
            &app,
            "",
            dev_id,
            dev_name,
            &ip,
            "username",
            false,
            "账号不存在",
        )
        .await;
        return Err((StatusCode::UNAUTHORIZED, "用户名或密码错误".into()));
    };
    if !auth::verify_password(&req.password, &password_hash) {
        log_login(
            &app,
            &user_id,
            dev_id,
            dev_name,
            &ip,
            "username",
            false,
            "密码错误",
        )
        .await;
        return Err((StatusCode::UNAUTHORIZED, "用户名或密码错误".into()));
    }
    // 密码通过后再显式报封禁,避免用错误密码探测账号状态;失败不得写成成功日志。
    if banned_ms.is_some() {
        log_login(
            &app,
            &user_id,
            dev_id,
            dev_name,
            &ip,
            "username",
            false,
            ACCOUNT_BANNED_CODE,
        )
        .await;
        return Err(account_banned_error());
    }
    let tokens = issue_tokens_on(&app, &mut tx, &user_id, &username, dev_id, dev_name).await?;
    tx.commit().await.map_err(internal)?;
    log_login(&app, &user_id, dev_id, dev_name, &ip, "username", true, "").await;
    Ok(Json(tokens))
}

/// POST /v1/auth/refresh —— 事务内原子消费旧 refresh,并签发新对。
pub async fn refresh(
    State(app): State<AppState>,
    Json(req): Json<RefreshRequest>,
) -> Result<Json<AuthTokens>, ApiError> {
    require_jwt(&app)?;
    let token_hash = auth::sha256_hex(&req.refresh_token);
    let mut tx = app.pool.begin().await.map_err(internal)?;

    // 先定位用户,再按与 force_logout 相同的顺序锁用户行;条件 UPDATE 是最终原子消费闸。
    let user_id: Option<String> =
        sqlx::query_scalar("SELECT user_id FROM refresh_tokens WHERE token_hash = $1")
            .bind(&token_hash)
            .fetch_optional(&mut *tx)
            .await
            .map_err(internal)?;
    let Some(user_id) = user_id else {
        return Err((
            StatusCode::UNAUTHORIZED,
            "refresh token 无效或已过期".into(),
        ));
    };
    let account: Option<(String, Option<i64>)> =
        sqlx::query_as("SELECT username, banned_ms FROM users WHERE id = $1 FOR UPDATE")
            .bind(&user_id)
            .fetch_optional(&mut *tx)
            .await
            .map_err(internal)?;
    let Some((username, banned_ms)) = account else {
        return Err((
            StatusCode::UNAUTHORIZED,
            "refresh token 无效或已过期".into(),
        ));
    };
    if banned_ms.is_some() {
        return Err(account_banned_error());
    }

    let now = chrono::Utc::now().timestamp_millis();
    let consumed: Option<(String, String)> = sqlx::query_as(
        "UPDATE refresh_tokens SET revoked_ms = $1
         WHERE token_hash = $2 AND user_id = $3 AND revoked_ms IS NULL AND expires_ms > $1
         RETURNING device_id, device_name",
    )
    .bind(now)
    .bind(&token_hash)
    .bind(&user_id)
    .fetch_optional(&mut *tx)
    .await
    .map_err(internal)?;
    let Some((device_id, device_name)) = consumed else {
        // 并发 refresh / force_logout 已消费或吊销;旧 token 不得二次换发。
        return Err((
            StatusCode::UNAUTHORIZED,
            "refresh token 无效或已过期".into(),
        ));
    };

    let tokens =
        issue_tokens_on(&app, &mut tx, &user_id, &username, &device_id, &device_name).await?;
    tx.commit().await.map_err(internal)?;
    Ok(Json(tokens))
}

/// POST /v1/auth/logout —— 吊销指定 refresh token(幂等)。带 sid access 立即失效;
/// 过渡期无 sid 单会话 access 无法定位到某一行,只能等 exp;logout 对 banned 仍开放。
pub async fn logout(
    State(app): State<AppState>,
    Json(req): Json<RefreshRequest>,
) -> Result<Json<serde_json::Value>, ApiError> {
    require_jwt(&app)?;
    let now = chrono::Utc::now().timestamp_millis();
    sqlx::query(
        "UPDATE refresh_tokens SET revoked_ms = $1 WHERE token_hash = $2 AND revoked_ms IS NULL",
    )
    .bind(now)
    .bind(auth::sha256_hex(&req.refresh_token))
    .execute(&app.pool)
    .await
    .map_err(internal)?;
    Ok(Json(serde_json::json!({ "ok": true })))
}

// === P1c:账号完善 —— 改密码 / 会话管理 ======================================

/// POST /v1/auth/change-password(JWT 认证)—— 验旧密码后更新哈希,
/// **吊销该用户全部 refresh token**(其他设备强制重新登录),
/// 并给当前设备签发新的一对(调用方替换本地令牌,自己不掉线)。
pub async fn change_password(
    State(app): State<AppState>,
    headers: HeaderMap,
    Json(req): Json<ChangePasswordRequest>,
) -> Result<Json<AuthTokens>, ApiError> {
    let auth_user = authenticate(&app, &headers).await?;
    let user_str = auth_user.as_str();
    if !auth::valid_password(&req.new_password) {
        return Err((StatusCode::BAD_REQUEST, "新密码需 8-128 位".into()));
    }

    // 与 login/refresh 共用用户行锁:旧密码验证、改密、吊销与新发牌是同一原子协议。
    let mut tx = app.pool.begin().await.map_err(internal)?;
    let account: Option<(String, String, Option<i64>)> = sqlx::query_as(
        "SELECT password_hash, username, banned_ms FROM users WHERE id = $1 FOR UPDATE",
    )
    .bind(user_str)
    .fetch_optional(&mut *tx)
    .await
    .map_err(internal)?;
    let Some((hash, username, banned_ms)) = account else {
        return Err((StatusCode::NOT_FOUND, "账号不存在".into()));
    };
    if banned_ms.is_some() {
        return Err(account_banned_error());
    }
    if !auth::verify_password(&req.old_password, &hash) {
        return Err((StatusCode::UNAUTHORIZED, "旧密码不正确".into()));
    }
    let new_hash = auth::hash_password(&req.new_password)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e))?;
    let now = chrono::Utc::now().timestamp_millis();
    sqlx::query("UPDATE users SET password_hash = $1 WHERE id = $2")
        .bind(&new_hash)
        .bind(user_str)
        .execute(&mut *tx)
        .await
        .map_err(internal)?;
    force_logout_user_on(&mut tx, user_str, now)
        .await
        .map_err(internal)?;
    let tokens = issue_tokens_on(
        &app,
        &mut tx,
        user_str,
        &username,
        req.device_id.as_deref().unwrap_or(""),
        req.device_name.as_deref().unwrap_or(""),
    )
    .await?;
    tx.commit().await.map_err(internal)?;
    Ok(Json(tokens))
}

/// 会话请求的公共内核:用调用方 refresh token 定位用户与当前行 id。
async fn resolve_session(app: &AppState, refresh_token: &str) -> Result<(String, i64), ApiError> {
    let now = chrono::Utc::now().timestamp_millis();
    let row: Option<(String, i64, Option<i64>)> = sqlx::query_as(
        "SELECT rt.user_id, rt.id, u.banned_ms
         FROM refresh_tokens rt
         JOIN users u ON u.id = rt.user_id
         WHERE rt.token_hash = $1 AND rt.revoked_ms IS NULL AND rt.expires_ms > $2",
    )
    .bind(auth::sha256_hex(refresh_token))
    .bind(now)
    .fetch_optional(&app.pool)
    .await
    .map_err(internal)?;
    let Some((user_id, session_id, banned_ms)) = row else {
        return Err((
            StatusCode::UNAUTHORIZED,
            "refresh token 无效或已过期".into(),
        ));
    };
    if banned_ms.is_some() {
        return Err(account_banned_error());
    }
    Ok((user_id, session_id))
}

/// POST /v1/auth/sessions —— 有效会话列表(current 标记调用方自己)。
pub async fn sessions(
    State(app): State<AppState>,
    Json(req): Json<RefreshRequest>,
) -> Result<Json<Vec<SessionInfo>>, ApiError> {
    let (user_id, current_id) = resolve_session(&app, &req.refresh_token).await?;
    let now = chrono::Utc::now().timestamp_millis();
    let rows: Vec<(i64, String, String, i64, i64)> = sqlx::query_as(
        "SELECT id, device_id, device_name, created_ms, expires_ms
         FROM refresh_tokens
         WHERE user_id = $1 AND revoked_ms IS NULL AND expires_ms > $2
         ORDER BY created_ms DESC",
    )
    .bind(&user_id)
    .bind(now)
    .fetch_all(&app.pool)
    .await
    .map_err(internal)?;
    let out = rows
        .into_iter()
        .map(
            |(id, device_id, device_name, created_ms, expires_ms)| SessionInfo {
                id,
                device_id,
                device_name,
                created_ms,
                expires_ms,
                current: id == current_id,
            },
        )
        .collect();
    Ok(Json(out))
}

/// POST /v1/auth/sessions/revoke —— 踢出指定会话(不能踢自己;下线自己请用 logout)。
pub async fn revoke_session(
    State(app): State<AppState>,
    Json(req): Json<RevokeSessionRequest>,
) -> Result<Json<serde_json::Value>, ApiError> {
    let (user_id, current_id) = resolve_session(&app, &req.refresh_token).await?;
    if req.revoke_id == current_id {
        return Err((
            StatusCode::BAD_REQUEST,
            "不能踢出当前会话(请用退出登录)".into(),
        ));
    }
    let revoked = force_logout_session(&app, &user_id, req.revoke_id)
        .await
        .map_err(internal)?;
    if !revoked {
        return Err((StatusCode::NOT_FOUND, "会话不存在或已下线".into()));
    }
    Ok(Json(serde_json::json!({ "ok": true })))
}

/// POST /v1/auth/sessions/revoke-others —— 退出其他所有设备(保留当前会话)。
pub async fn revoke_others(
    State(app): State<AppState>,
    Json(req): Json<RefreshRequest>,
) -> Result<Json<serde_json::Value>, ApiError> {
    let (user_id, current_id) = resolve_session(&app, &req.refresh_token).await?;
    let now = chrono::Utc::now().timestamp_millis();
    let mut tx = app.pool.begin().await.map_err(internal)?;
    // 全局 cutoff 覆盖无 sid legacy access;当前 refresh 保留,可换新 access。
    advance_access_cutoff_on(&mut tx, &user_id, now)
        .await
        .map_err(internal)?;
    let current_active: bool = sqlx::query_scalar(
        "SELECT EXISTS(SELECT 1 FROM refresh_tokens
         WHERE id = $1 AND user_id = $2 AND revoked_ms IS NULL AND expires_ms > $3)",
    )
    .bind(current_id)
    .bind(&user_id)
    .bind(now)
    .fetch_one(&mut *tx)
    .await
    .map_err(internal)?;
    if !current_active {
        return Err((
            StatusCode::UNAUTHORIZED,
            "refresh token 无效或已过期".into(),
        ));
    }
    let n = sqlx::query(
        "UPDATE refresh_tokens SET revoked_ms = $1
         WHERE user_id = $2 AND id <> $3 AND revoked_ms IS NULL",
    )
    .bind(now)
    .bind(&user_id)
    .bind(current_id)
    .execute(&mut *tx)
    .await
    .map_err(internal)?
    .rows_affected();
    tx.commit().await.map_err(internal)?;
    Ok(Json(serde_json::json!({ "ok": true, "revoked": n })))
}

/// 在调用方事务内推进 access cutoff,并通过 UPDATE 锁住用户行。
/// cutoff 取 now + 1ms:legacy token 只有秒级 iat,即使与操作同秒也严格早于 cutoff。
pub(crate) async fn advance_access_cutoff_on(
    conn: &mut sqlx::PgConnection,
    user_id: &str,
    now_ms: i64,
) -> Result<(), sqlx::Error> {
    let cutoff = now_ms.saturating_add(1);
    let updated: Option<String> = sqlx::query_scalar(
        "UPDATE users
         SET access_revoked_before_ms = GREATEST(COALESCE(access_revoked_before_ms, $1), $1)
         WHERE id = $2
         RETURNING id",
    )
    .bind(cutoff)
    .bind(user_id)
    .fetch_optional(&mut *conn)
    .await?;
    if updated.is_none() {
        return Err(sqlx::Error::RowNotFound);
    }
    Ok(())
}

/// 在调用方事务内执行用户级强制下线;必须先锁/更新用户行,再吊销 refresh。
pub(crate) async fn force_logout_user_on(
    conn: &mut sqlx::PgConnection,
    user_id: &str,
    now_ms: i64,
) -> Result<(), sqlx::Error> {
    advance_access_cutoff_on(conn, user_id, now_ms).await?;
    sqlx::query(
        "UPDATE refresh_tokens SET revoked_ms = $1 WHERE user_id = $2 AND revoked_ms IS NULL",
    )
    .bind(now_ms)
    .bind(user_id)
    .execute(&mut *conn)
    .await?;
    Ok(())
}

/// 用户级强制下线的独立事务包装(P4 后管内部复用)。
#[allow(dead_code)] // 后管封禁/强制下线写路径复用;当前协议内流程使用 *_on 形态。
pub(crate) async fn force_logout_user(app: &AppState, user_id: &str) -> Result<(), sqlx::Error> {
    let now = chrono::Utc::now().timestamp_millis();
    let mut tx = app.pool.begin().await?;
    force_logout_user_on(&mut tx, user_id, now).await?;
    tx.commit().await
}

/// 单会话强制下线:带 sid 的 access 会因对应 refresh 行吊销而立即失效。
/// 无 sid legacy access 不绑定任何单行,只能等 exp;用户级操作会用 cutoff 覆盖。
pub(crate) async fn force_logout_session(
    app: &AppState,
    user_id: &str,
    session_id: i64,
) -> Result<bool, sqlx::Error> {
    let now = chrono::Utc::now().timestamp_millis();
    let n = sqlx::query(
        "UPDATE refresh_tokens SET revoked_ms = $1
         WHERE id = $2 AND user_id = $3 AND revoked_ms IS NULL",
    )
    .bind(now)
    .bind(session_id)
    .bind(user_id)
    .execute(&app.pool)
    .await?
    .rows_affected();
    Ok(n == 1)
}

fn access_denial_error(denial: auth::AccessDenial) -> ApiError {
    match denial {
        auth::AccessDenial::AccountBanned => account_banned_error(),
        auth::AccessDenial::AccountMissing => {
            (StatusCode::UNAUTHORIZED, "账号不存在或已删除".into())
        }
        auth::AccessDenial::AccessRevoked => {
            (StatusCode::UNAUTHORIZED, "access token 已被强制下线".into())
        }
        auth::AccessDenial::SessionMissing
        | auth::AccessDenial::SessionWrongUser
        | auth::AccessDenial::SessionRevoked
        | auth::AccessDenial::SessionExpired => (
            StatusCode::UNAUTHORIZED,
            "access token 会话无效或已过期".into(),
        ),
    }
}

/// JWT 验签后的 DB 授权。与纯 token 解码分离,便于无 PG 单测状态判定。
async fn authorize_access(app: &AppState, claims: &auth::AccessClaims) -> Result<(), ApiError> {
    let row: Option<(Option<i64>, Option<i64>)> =
        sqlx::query_as("SELECT banned_ms, access_revoked_before_ms FROM users WHERE id = $1")
            .bind(&claims.sub)
            .fetch_optional(&app.pool)
            .await
            .map_err(internal)?;
    let account = row.map(
        |(banned_ms, access_revoked_before_ms)| auth::AccountStatus {
            banned_ms,
            access_revoked_before_ms,
        },
    );
    auth::check_account_access(claims.issued_at_ms(), account).map_err(access_denial_error)?;

    if let Some(session_id) = claims.sid {
        let now = chrono::Utc::now().timestamp_millis();
        let row: Option<(String, Option<i64>, i64)> = sqlx::query_as(
            "SELECT user_id, revoked_ms, expires_ms FROM refresh_tokens WHERE id = $1",
        )
        .bind(session_id)
        .fetch_optional(&app.pool)
        .await
        .map_err(internal)?;
        let session = row.map(|(user_id, revoked_ms, expires_ms)| auth::SessionStatus {
            user_id,
            revoked_ms,
            expires_ms,
        });
        auth::check_session_access(&claims.sub, session, now).map_err(access_denial_error)?;
    }
    Ok(())
}

#[derive(Debug)]
pub(crate) struct AuthenticatedUser {
    pub id: Id,
    pub session_id: Option<i64>,
}

/// 返回 user_id 与 access 绑定的当前 sid,供需要保留当前会话的敏感操作使用。
pub async fn authenticate_detailed(
    app: &AppState,
    headers: &HeaderMap,
) -> Result<AuthenticatedUser, ApiError> {
    let Some(token) = bearer(headers) else {
        return Err((StatusCode::UNAUTHORIZED, "missing bearer token".into()));
    };
    // 1) JWT(配置了 JWT_SECRET 才尝试;静态 token 不是 JWT 格式,解析失败无副作用)
    if let Some(secret) = app.jwt_secret.as_deref() {
        if let Some(claims) = auth::verify_access(secret, token) {
            let user = Id::parse(&claims.sub)
                .ok_or((StatusCode::UNAUTHORIZED, "jwt sub 不是合法 UUID".into()))?;
            authorize_access(app, &claims).await?;
            return Ok(AuthenticatedUser {
                id: user,
                session_id: claims.sid,
            });
        }
    }
    // 2) 静态 Token 回落:**仅账号体系未启用(未配 JWT_SECRET)的纯静态模式**。
    //    JWT 启用后静态 token 不再被受保护端点接受 —— 它永久有效、不可吊销,
    //    此前持有者可冒充 SYNC_USER_ID 读写全量数据 / 触发导出与注销
    //    (2026-09-16 二次排查 C1)。运维/首账号采纳的静态 token 用途走各自
    //    端点的显式校验(register 的 operator_ok、email_handlers 的
    //    bearer_static),不经此处。
    if app.jwt_secret.is_none() && token == app.token {
        return Ok(AuthenticatedUser {
            id: app.user_id.clone(),
            session_id: None,
        });
    }
    Err((StatusCode::UNAUTHORIZED, "invalid token".into()))
}

/// 认证 sync 端点:Bearer → JWT(验签 + DB 授权)→ 纯静态 Token 回落。
/// 纯静态模式不触库;JWT 模式必须确认 users 仍存在且账号/会话可用。
pub async fn authenticate(app: &AppState, headers: &HeaderMap) -> Result<Id, ApiError> {
    authenticate_detailed(app, headers)
        .await
        .map(|authenticated| authenticated.id)
}

#[cfg(test)]
mod tests {
    //! authenticate() 的 C1 回归锁(2026-10-02):JWT 启用后静态 SYNC_TOKEN
    //! 不得再被受保护端点接受;纯静态模式(未配 JWT_SECRET)回落保持可用。
    //! 这里只覆盖不触库的 token 分支;DB 授权状态判定在 auth.rs 纯函数测试中覆盖。
    use super::*;
    use crate::mailer::LogSender;
    use axum::http::header::AUTHORIZATION;
    use std::sync::Arc;

    const STATIC_UID: &str = "11111111-1111-4111-8111-111111111111";

    fn test_app(jwt_secret: Option<&str>) -> AppState {
        AppState {
            pool: sqlx::PgPool::connect_lazy("postgres://u:u@127.0.0.1:1/u")
                .expect("lazy pool 不建连"),
            token: "static-token".to_string(),
            user_id: Id::parse(STATIC_UID).expect("合法 UUID"),
            jwt_secret: jwt_secret.map(str::to_string),
            code_pepper: "pepper".to_string(),
            mailer: Arc::new(LogSender),
            internal_token: None,
        }
    }

    fn headers_with(token: &str) -> HeaderMap {
        let mut h = HeaderMap::new();
        h.insert(AUTHORIZATION, format!("Bearer {token}").parse().unwrap());
        h
    }

    #[tokio::test]
    async fn static_token_rejected_when_jwt_enabled() {
        let app = test_app(Some("secret"));
        let err = authenticate(&app, &headers_with("static-token"))
            .await
            .unwrap_err();
        assert_eq!(err.0, StatusCode::UNAUTHORIZED);
    }

    #[tokio::test]
    async fn static_token_accepted_in_pure_static_mode() {
        let app = test_app(None);
        let user = authenticate(&app, &headers_with("static-token"))
            .await
            .unwrap();
        assert_eq!(user.as_str(), STATIC_UID);
        let detailed = authenticate_detailed(&app, &headers_with("static-token"))
            .await
            .unwrap();
        assert_eq!(detailed.id.as_str(), STATIC_UID);
        assert_eq!(detailed.session_id, None);
    }

    #[test]
    fn legacy_db_error_does_not_leak_details() {
        let error = internal(sqlx::Error::RowNotFound);
        assert_eq!(error.0, StatusCode::INTERNAL_SERVER_ERROR);
        assert_eq!(error.1, INTERNAL_ERROR_MESSAGE);
    }

    #[tokio::test]
    async fn wrong_or_missing_token_rejected_in_both_modes() {
        for app in [test_app(None), test_app(Some("secret"))] {
            assert!(authenticate(&app, &headers_with("wrong-token"))
                .await
                .is_err());
            assert!(authenticate(&app, &HeaderMap::new()).await.is_err());
        }
    }
}
