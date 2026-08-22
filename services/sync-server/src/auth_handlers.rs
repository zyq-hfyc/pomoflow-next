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
use crate::state::AppState;

type ApiError = (StatusCode, String);

fn internal(e: sqlx::Error) -> ApiError {
    (StatusCode::INTERNAL_SERVER_ERROR, format!("db: {e}"))
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
    app.jwt_secret
        .as_deref()
        .ok_or((StatusCode::SERVICE_UNAVAILABLE, "JWT_SECRET 未配置,账号体系未启用".into()))
}

/// 签发一对新 token 并把 refresh 落库。
#[allow(clippy::too_many_arguments)]
pub(crate) async fn issue_tokens(
    app: &AppState,
    user_id: &str,
    username: &str,
    device_id: &str,
    device_name: &str,
) -> Result<AuthTokens, ApiError> {
    let secret = require_jwt(app)?;
    let access = auth::issue_access(secret, user_id).map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, e)
    })?;
    let refresh = auth::new_refresh_token();
    let now = chrono::Utc::now().timestamp_millis();
    sqlx::query(
        "INSERT INTO refresh_tokens
            (user_id, token_hash, device_id, device_name, created_ms, expires_ms)
         VALUES ($1, $2, $3, $4, $5, $6)",
    )
    .bind(user_id)
    .bind(auth::sha256_hex(&refresh))
    .bind(device_id)
    .bind(device_name)
    .bind(now)
    .bind(now + auth::REFRESH_TTL_SECS * 1000)
    .execute(&app.pool)
    .await
    .map_err(internal)?;
    Ok(AuthTokens {
        user_id: user_id.to_string(),
        username: username.to_string(),
        access_token: access,
        refresh_token: refresh,
        expires_in: auth::ACCESS_TTL_SECS,
    })
}

/// POST /v1/auth/register —— 注册;首账号 + 运维静态 Token = 采纳 SYNC_USER_ID。
pub async fn register(
    State(app): State<AppState>,
    headers: HeaderMap,
    Json(req): Json<Credentials>,
) -> Result<(StatusCode, Json<AuthTokens>), ApiError> {
    require_jwt(&app)?;
    let username = req.username.trim().to_string();
    if !auth::valid_username(&username) {
        return Err((StatusCode::BAD_REQUEST, "用户名需 3-32 位字母/数字/_/-".into()));
    }
    if !auth::valid_password(&req.password) {
        return Err((StatusCode::BAD_REQUEST, "密码需 8-128 位".into()));
    }

    // 首账号采纳:users 为空 且 请求带有效静态 Token → 继承 SYNC_USER_ID
    let user_count: i64 =
        sqlx::query_scalar("SELECT COUNT(*) FROM users")
            .fetch_one(&app.pool)
            .await
            .map_err(internal)?;
    let operator_ok = bearer(&headers) == Some(app.token.as_str());
    let user_id = if user_count == 0 && operator_ok {
        log::info!("first account adopts legacy SYNC_USER_ID {}", app.user_str());
        app.user_id.to_string()
    } else {
        Uuid::new_v4().to_string()
    };

    let hash = auth::hash_password(&req.password).map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, e)
    })?;
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
    Json(req): Json<Credentials>,
) -> Result<Json<AuthTokens>, ApiError> {
    require_jwt(&app)?;
    let username = req.username.trim().to_string();
    let row: Option<(String, String, String)> = sqlx::query_as(
        "SELECT id, username, password_hash FROM users WHERE username = $1",
    )
    .bind(&username)
    .fetch_optional(&app.pool)
    .await
    .map_err(internal)?;

    // 统一返回"用户名或密码错误",不给探测口子
    let Some((user_id, username, password_hash)) = row else {
        return Err((StatusCode::UNAUTHORIZED, "用户名或密码错误".into()));
    };
    if !auth::verify_password(&req.password, &password_hash) {
        return Err((StatusCode::UNAUTHORIZED, "用户名或密码错误".into()));
    }
    let tokens = issue_tokens(
        &app,
        &user_id,
        &username,
        req.device_id.as_deref().unwrap_or(""),
        req.device_name.as_deref().unwrap_or(""),
    )
    .await?;
    Ok(Json(tokens))
}

/// POST /v1/auth/refresh —— 轮换:旧 refresh 吊销 + 新对签发。
pub async fn refresh(
    State(app): State<AppState>,
    Json(req): Json<RefreshRequest>,
) -> Result<Json<AuthTokens>, ApiError> {
    require_jwt(&app)?;
    let now = chrono::Utc::now().timestamp_millis();
    let row: Option<(String, String, String, String)> = sqlx::query_as(
        "SELECT u.id, u.username, rt.device_id, rt.device_name FROM refresh_tokens rt
         JOIN users u ON u.id = rt.user_id
         WHERE rt.token_hash = $1 AND rt.revoked_ms IS NULL AND rt.expires_ms > $2",
    )
    .bind(auth::sha256_hex(&req.refresh_token))
    .bind(now)
    .fetch_optional(&app.pool)
    .await
    .map_err(internal)?;

    let Some((user_id, username, device_id, device_name)) = row else {
        return Err((StatusCode::UNAUTHORIZED, "refresh token 无效或已过期".into()));
    };
    // 轮换:吊销旧的(已吊销/过期的不可能走到这里)
    sqlx::query("UPDATE refresh_tokens SET revoked_ms = $1 WHERE token_hash = $2")
        .bind(now)
        .bind(auth::sha256_hex(&req.refresh_token))
        .execute(&app.pool)
        .await
        .map_err(internal)?;

    let tokens = issue_tokens(&app, &user_id, &username, &device_id, &device_name).await?;
    Ok(Json(tokens))
}

/// POST /v1/auth/logout —— 吊销指定 refresh token(access 到期自然失效;幂等)。
pub async fn logout(
    State(app): State<AppState>,
    Json(req): Json<RefreshRequest>,
) -> Result<Json<serde_json::Value>, ApiError> {
    require_jwt(&app)?;
    let now = chrono::Utc::now().timestamp_millis();
    sqlx::query("UPDATE refresh_tokens SET revoked_ms = $1 WHERE token_hash = $2 AND revoked_ms IS NULL")
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
    let auth_user = authenticate(&app, &headers)?;
    let user_str = auth_user.as_str();
    let hash: Option<String> =
        sqlx::query_scalar("SELECT password_hash FROM users WHERE id = $1")
            .bind(user_str)
            .fetch_optional(&app.pool)
            .await
            .map_err(internal)?;
    let Some(hash) = hash else {
        return Err((StatusCode::NOT_FOUND, "账号不存在".into()));
    };
    if !auth::verify_password(&req.old_password, &hash) {
        return Err((StatusCode::UNAUTHORIZED, "旧密码不正确".into()));
    }
    if !auth::valid_password(&req.new_password) {
        return Err((StatusCode::BAD_REQUEST, "新密码需 8-128 位".into()));
    }
    let new_hash = auth::hash_password(&req.new_password)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e))?;
    let now = chrono::Utc::now().timestamp_millis();
    sqlx::query("UPDATE users SET password_hash = $1 WHERE id = $2")
        .bind(&new_hash)
        .bind(user_str)
        .execute(&app.pool)
        .await
        .map_err(internal)?;
    // 全端踢出:旧 refresh 全部吊销
    sqlx::query(
        "UPDATE refresh_tokens SET revoked_ms = $1 WHERE user_id = $2 AND revoked_ms IS NULL",
    )
    .bind(now)
    .bind(user_str)
    .execute(&app.pool)
    .await
    .map_err(internal)?;
    let username: String = sqlx::query_scalar("SELECT username FROM users WHERE id = $1")
        .bind(user_str)
        .fetch_one(&app.pool)
        .await
        .map_err(internal)?;
    let tokens = issue_tokens(
        &app,
        user_str,
        &username,
        req.device_id.as_deref().unwrap_or(""),
        req.device_name.as_deref().unwrap_or(""),
    )
    .await?;
    Ok(Json(tokens))
}

/// 会话请求的公共内核:用调用方 refresh token 定位用户与当前行 id。
async fn resolve_session(
    app: &AppState,
    refresh_token: &str,
) -> Result<(String, i64), ApiError> {
    let now = chrono::Utc::now().timestamp_millis();
    let row: Option<(String, i64)> = sqlx::query_as(
        "SELECT user_id, id FROM refresh_tokens
         WHERE token_hash = $1 AND revoked_ms IS NULL AND expires_ms > $2",
    )
    .bind(auth::sha256_hex(refresh_token))
    .bind(now)
    .fetch_optional(&app.pool)
    .await
    .map_err(internal)?;
    row.ok_or((StatusCode::UNAUTHORIZED, "refresh token 无效或已过期".into()))
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
        .map(|(id, device_id, device_name, created_ms, expires_ms)| SessionInfo {
            id,
            device_id,
            device_name,
            created_ms,
            expires_ms,
            current: id == current_id,
        })
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
    let now = chrono::Utc::now().timestamp_millis();
    let n = sqlx::query(
        "UPDATE refresh_tokens SET revoked_ms = $1
         WHERE id = $2 AND user_id = $3 AND revoked_ms IS NULL",
    )
    .bind(now)
    .bind(req.revoke_id)
    .bind(&user_id)
    .execute(&app.pool)
    .await
    .map_err(internal)?
    .rows_affected();
    if n == 0 {
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
    let n = sqlx::query(
        "UPDATE refresh_tokens SET revoked_ms = $1
         WHERE user_id = $2 AND id <> $3 AND revoked_ms IS NULL",
    )
    .bind(now)
    .bind(&user_id)
    .bind(current_id)
    .execute(&app.pool)
    .await
    .map_err(internal)?
    .rows_affected();
    Ok(Json(serde_json::json!({ "ok": true, "revoked": n })))
}

/// 认证 sync 端点:Bearer → JWT(若启用)→ 静态 Token 回落;返回已认证 user_id。
/// (放这里供 handlers.rs 复用;纯函数便于单测的部分在 auth.rs)
pub fn authenticate(app: &AppState, headers: &HeaderMap) -> Result<Id, ApiError> {
    let Some(token) = bearer(headers) else {
        return Err((StatusCode::UNAUTHORIZED, "missing bearer token".into()));
    };
    // 1) JWT(配置了 JWT_SECRET 才尝试;静态 token 不是 JWT 格式,解析失败无副作用)
    if let Some(secret) = app.jwt_secret.as_deref() {
        if let Some(user) = auth::verify_access(secret, token) {
            return Id::parse(&user)
                .ok_or((StatusCode::UNAUTHORIZED, "jwt sub 不是合法 UUID".into()));
        }
    }
    // 2) 静态 Token 回落(MVP 兼容;SYNC_TOKEN → SYNC_USER_ID)
    if token == app.token {
        return Ok(app.user_id.clone());
    }
    Err((StatusCode::UNAUTHORIZED, "invalid token".into()))
}
