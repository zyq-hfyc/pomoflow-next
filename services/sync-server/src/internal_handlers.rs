//! P4 后管内部端点 —— 仅供 Admin BFF 服务间调用(ADR-008:管理后台不直连库)。
//!
//! 鉴权:`Authorization: Bearer <INTERNAL_SERVICE_TOKEN>`,与用户 token 体系
//! (JWT / SYNC_TOKEN)完全独立;常量时间比较。未配置 `INTERNAL_SERVICE_TOKEN`
//! 时整组路由一律 403(服务启动日志会注明内部通道是否启用)。
//!
//! 端点(响应形状与 apps/admin 前端契约一一对应):
//! - `GET  /internal/users`                      用户列表(分页/搜索/状态筛选)
//! - `GET  /internal/users/:id`                  用户详情(资料/会话/登录记录/同步元数据)
//! - `POST /internal/users/:id/ban`              封禁(事务:标记 + 全会话吊销 + access 水位)
//! - `POST /internal/users/:id/unban`            解封(幂等;保留水位与封禁历史字段)
//! - `POST /internal/users/:id/sessions/revoke`  强制下线(单会话 / 全部)
//! - `GET  /internal/metrics/overview`           看板聚合(主库可算口径;DAU/留存归 Analytics)
//!
//! 口径说明:
//! - `last_sync_ms` = snapshots 里该用户最近一次权威快照更新(push 胜出);
//! - `pushed_changes` / trends 的 push 量 = 窗口内有快照更新的行数 —— changelog
//!   无时间列,这是 LWW 胜出 push 的近似口径;Pull 无事件日志,由 BFF 置空,
//!   Analytics(P4)上线后接管。

use axum::extract::{Path, Query as AxumQuery, State};
use axum::http::{HeaderMap, StatusCode};
use axum::middleware::Next;
use axum::response::Response;
use axum::{Json, Router};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use subtle::ConstantTimeEq;

use crate::auth_handlers::{advance_access_cutoff_on, force_logout_session};
use crate::state::AppState;

type ApiError = (StatusCode, String);

fn internal(e: sqlx::Error) -> ApiError {
    log::error!("database error: {e}");
    (
        StatusCode::INTERNAL_SERVER_ERROR,
        crate::errors::INTERNAL_ERROR_MESSAGE.into(),
    )
}

/// 内部路由(挂在共享 AppState 上;服务间鉴权由 main.rs 挂载处统一
/// route_layer 施加,这里不带 state 的 from_fn 满足不了 State 提取器)。
pub fn router() -> Router<AppState> {
    Router::new()
        .route("/internal/users", axum::routing::get(list_users))
        .route("/internal/users/{id}", axum::routing::get(user_detail))
        .route("/internal/users/{id}/ban", axum::routing::post(ban_user))
        .route(
            "/internal/users/{id}/unban",
            axum::routing::post(unban_user),
        )
        .route(
            "/internal/users/{id}/sessions/revoke",
            axum::routing::post(revoke_sessions),
        )
        .route(
            "/internal/metrics/overview",
            axum::routing::get(metrics_overview),
        )
}

/// 服务间鉴权:固定 Bearer,常量时间比较;未配置 token 时全组拒绝。
pub async fn require_service_token(
    State(app): State<AppState>,
    headers: HeaderMap,
    request: axum::extract::Request,
    next: Next,
) -> Result<Response, ApiError> {
    let Some(expected) = app.internal_token.as_deref() else {
        return Err((StatusCode::FORBIDDEN, "internal API disabled".into()));
    };
    let presented = headers
        .get(axum::http::header::AUTHORIZATION)
        .and_then(|v| v.to_str().ok())
        .and_then(|v| v.strip_prefix("Bearer "))
        .unwrap_or("");
    let ok = !presented.is_empty()
        && presented.len() == expected.len()
        && presented.as_bytes().ct_eq(expected.as_bytes()).into();
    if !ok {
        return Err((StatusCode::UNAUTHORIZED, "invalid service token".into()));
    }
    Ok(next.run(request).await)
}

// === 遮蔽工具(个人信息最小化;后管不展示完整邮箱/IP)=========================

/// 邮箱遮蔽:保留首字符 + 域名(`a***@example.com`);无法解析返回 None。
fn mask_email(email: &str) -> Option<String> {
    let (local, domain) = email.split_once('@')?;
    if local.is_empty() {
        return None; // "@domain" 这类残缺数据 → None(响应里 masked_email = null)
    }
    let mut masked = local.chars().take(1).collect::<String>();
    masked.push_str("***");
    Some(format!("{masked}@{domain}"))
}

/// IP 遮蔽:IPv4 掐掉后两段(`1.2.*.*`);IPv6 保留前 3 组;其余整体打码。
fn mask_ip(ip: &str) -> String {
    let trimmed = ip.trim();
    let v4: Vec<&str> = trimmed.split('.').collect();
    if v4.len() == 4 && v4.iter().all(|s| s.parse::<u8>().is_ok()) {
        return format!("{}.{}.*.*", v4[0], v4[1]);
    }
    if trimmed.contains(':') {
        let groups: Vec<&str> = trimmed.split(':').collect();
        let kept: Vec<&str> = groups.iter().take(3).copied().collect();
        let mut out = kept.join(":");
        out.push_str(":*");
        return out;
    }
    "***".into()
}

// === 用户列表 ===============================================================

#[derive(Debug, Deserialize)]
pub struct ListUsersQuery {
    /// 用户名/显示名/邮箱子串(不区分大小写)
    #[serde(default)]
    pub query: Option<String>,
    /// active | banned | deletion_pending
    #[serde(default)]
    pub status: Option<String>,
    #[serde(default)]
    pub page: Option<i64>,
    #[serde(default)]
    pub page_size: Option<i64>,
}

pub const USER_LIST_MAX_PAGE_SIZE: i64 = 100;
pub const USER_LIST_DEFAULT_PAGE_SIZE: i64 = 20;

/// 状态筛选值 → SQL 条件;非法值返回 Err(前端契约外的取值一律 400)。
fn status_condition(status: Option<&str>) -> Result<Option<&'static str>, ApiError> {
    match status {
        None | Some("") => Ok(None),
        Some("active") => Ok(Some("deletion_requested_ms IS NULL AND banned_ms IS NULL")),
        Some("banned") => Ok(Some("banned_ms IS NOT NULL")),
        Some("deletion_pending") => Ok(Some("deletion_requested_ms IS NOT NULL")),
        Some(other) => Err((
            StatusCode::BAD_REQUEST,
            format!("unknown status filter: {other}"),
        )),
    }
}

/// 列表/计数共用的 WHERE 子句($1 = 搜索串,$2 = 状态)。
fn users_where(condition: Option<&str>) -> String {
    let mut sql = String::from(
        "WHERE ($1::text = '' OR username ILIKE $1 \
         OR display_name ILIKE $1 OR email ILIKE $1)",
    );
    if let Some(extra) = condition {
        sql.push_str(" AND (");
        sql.push_str(extra);
        sql.push(')');
    }
    sql
}

#[derive(Debug, Serialize)]
pub struct UserListItem {
    pub id: String,
    pub username: String,
    pub display_name: String,
    pub masked_email: Option<String>,
    pub email_verified: bool,
    pub status: &'static str,
    pub created_ms: i64,
    pub last_login_ms: Option<i64>,
    pub last_sync_ms: Option<i64>,
    /// 会员信息归 Membership 服务(P4 未开工),恒 null,字段随契约保留。
    pub membership: Option<Value>,
}

#[derive(Debug, Serialize)]
pub struct UserListResponse {
    pub items: Vec<UserListItem>,
    pub total: i64,
}

/// GET /internal/users
pub async fn list_users(
    State(app): State<AppState>,
    AxumQuery(q): AxumQuery<ListUsersQuery>,
) -> Result<Json<UserListResponse>, ApiError> {
    let status_filter = status_condition(q.status.as_deref())?;
    let pattern = format!("%{}%", q.query.unwrap_or_default().trim());
    let where_sql = users_where(status_filter);

    let total: i64 = sqlx::query_scalar(&format!("SELECT COUNT(*) FROM users {where_sql}"))
        .bind(&pattern)
        .fetch_one(&app.pool)
        .await
        .map_err(internal)?;

    let page = q.page.unwrap_or(1).max(1);
    let page_size = q
        .page_size
        .unwrap_or(USER_LIST_DEFAULT_PAGE_SIZE)
        .clamp(1, USER_LIST_MAX_PAGE_SIZE);
    let offset = (page - 1) * page_size;

    let rows: Vec<UserListRow> = sqlx::query_as(&format!(
        "SELECT u.id, u.username, u.display_name, u.email, u.email_verified_ms,
                CASE
                    WHEN u.deletion_requested_ms IS NOT NULL THEN 'deletion_pending'
                    WHEN u.banned_ms IS NOT NULL THEN 'banned'
                    ELSE 'active'
                END,
                u.created_ms,
                (SELECT MAX(l.created_ms) FROM login_logs l WHERE l.user_id = u.id AND l.ok),
                (SELECT MAX(s.updated_ms) FROM snapshots s WHERE s.user_id = u.id)
             FROM users u
             {where_sql}
             ORDER BY u.created_ms DESC, u.username ASC
             LIMIT $2 OFFSET $3"
    ))
    .bind(&pattern)
    .bind(page_size)
    .bind(offset)
    .fetch_all(&app.pool)
    .await
    .map_err(internal)?;

    let items = rows
        .into_iter()
        .map(
            |(
                id,
                username,
                display_name,
                email,
                email_verified_ms,
                status,
                created_ms,
                last_login_ms,
                last_sync_ms,
            )| {
                UserListItem {
                    id,
                    username,
                    display_name,
                    masked_email: email.as_deref().and_then(mask_email),
                    email_verified: email_verified_ms.is_some(),
                    status: match status.as_str() {
                        "deletion_pending" => "deletion_pending",
                        "banned" => "banned",
                        _ => "active",
                    },
                    created_ms,
                    last_login_ms,
                    last_sync_ms,
                    membership: None,
                }
            },
        )
        .collect();

    Ok(Json(UserListResponse { items, total }))
}

// === 用户详情 ===============================================================

#[derive(Debug, Serialize)]
pub struct UserSessionItem {
    pub id: i64,
    pub device_id: String,
    pub device_name: String,
    pub created_ms: i64,
    pub expires_ms: i64,
    pub revoked_ms: Option<i64>,
}

#[derive(Debug, Serialize)]
pub struct UserLoginLogItem {
    pub id: i64,
    pub device_id: String,
    pub device_name: String,
    pub masked_ip: String,
    pub method: String,
    pub ok: bool,
    pub detail: String,
    pub created_ms: i64,
}

#[derive(Debug, Serialize)]
pub struct SyncEntityMetadata {
    pub entity: String,
    pub record_count: i64,
    pub latest_revision: i64,
    pub latest_updated_ms: i64,
}

#[derive(Debug, Serialize)]
pub struct SyncMetadata {
    pub device_count: i64,
    pub change_count: i64,
    pub latest_seq: Option<i64>,
    pub last_sync_ms: Option<i64>,
    pub entities: Vec<SyncEntityMetadata>,
}

#[derive(Debug, Serialize)]
pub struct UserProfile {
    pub id: String,
    pub username: String,
    pub display_name: String,
    pub masked_email: Option<String>,
    pub email_verified: bool,
    pub status: &'static str,
    pub created_ms: i64,
    pub last_login_ms: Option<i64>,
    pub last_sync_ms: Option<i64>,
    pub membership: Option<Value>,
    pub deletion_requested_ms: Option<i64>,
    pub ban_reason: String,
}

#[derive(Debug, Serialize)]
pub struct UserDetailResponse {
    pub profile: UserProfile,
    pub sessions: Vec<UserSessionItem>,
    pub login_logs: Vec<UserLoginLogItem>,
    pub sync: SyncMetadata,
}

/// sqlx 位置元组:账号资料投影(列序与 user_detail 的 SELECT 一一对应)。
/// banned_ms 列是 BIGINT(可空);banned_reason 列 TEXT NOT NULL DEFAULT ''。
type AccountRow = (
    String,         // username
    String,         // display_name
    Option<String>, // email
    Option<i64>,    // email_verified_ms
    i64,            // created_ms
    Option<i64>,    // deletion_requested_ms
    Option<i64>,    // last_login_ms(子查询)
    Option<i64>,    // banned_ms
    String,         // banned_reason
);

/// sqlx 位置元组:登录日志投影。
type LoginLogRow = (i64, String, String, String, String, bool, String, i64);

/// sqlx 位置元组:用户列表投影(status 由 CASE 表达式算出)。
type UserListRow = (
    String,         // id
    String,         // username
    String,         // display_name
    Option<String>, // email
    Option<i64>,    // email_verified_ms
    String,         // status(CASE)
    i64,            // created_ms
    Option<i64>,    // last_login_ms(子查询)
    Option<i64>,    // last_sync_ms(子查询)
);

/// GET /internal/users/{id}
pub async fn user_detail(
    State(app): State<AppState>,
    Path(user_id): Path<String>,
) -> Result<Json<UserDetailResponse>, ApiError> {
    let account: Option<AccountRow> = sqlx::query_as(
        "SELECT username, display_name, email, email_verified_ms, created_ms,
                deletion_requested_ms,
                (SELECT MAX(l.created_ms) FROM login_logs l WHERE l.user_id = users.id AND l.ok),
                banned_ms,
                banned_reason
             FROM users WHERE id = $1",
    )
    .bind(&user_id)
    .fetch_optional(&app.pool)
    .await
    .map_err(internal)?;
    let Some((
        username,
        display_name,
        email,
        email_verified_ms,
        created_ms,
        deletion_requested_ms,
        last_login_ms,
        banned_ms,
        ban_reason,
    )) = account
    else {
        return Err((StatusCode::NOT_FOUND, "user not found".into()));
    };

    let sessions: Vec<(i64, String, String, i64, i64, Option<i64>)> = sqlx::query_as(
        "SELECT id, device_id, device_name, created_ms, expires_ms, revoked_ms
         FROM refresh_tokens WHERE user_id = $1
         ORDER BY created_ms DESC LIMIT 200",
    )
    .bind(&user_id)
    .fetch_all(&app.pool)
    .await
    .map_err(internal)?;

    let login_logs: Vec<LoginLogRow> = sqlx::query_as(
        "SELECT id, device_id, device_name, ip, method, ok, detail, created_ms
         FROM login_logs WHERE user_id = $1
         ORDER BY created_ms DESC LIMIT 100",
    )
    .bind(&user_id)
    .fetch_all(&app.pool)
    .await
    .map_err(internal)?;

    let (device_count, change_count): (i64, i64) = sqlx::query_as(
        "SELECT
            (SELECT COUNT(DISTINCT device_id) FROM snapshots WHERE user_id = $1),
            (SELECT COUNT(*) FROM changelog WHERE user_id = $1)",
    )
    .bind(&user_id)
    .fetch_one(&app.pool)
    .await
    .map_err(internal)?;

    let (latest_seq, last_sync_ms): (Option<i64>, Option<i64>) = sqlx::query_as(
        "SELECT
            (SELECT MAX(seq) FROM changelog WHERE user_id = $1),
            (SELECT MAX(updated_ms) FROM snapshots WHERE user_id = $1)",
    )
    .bind(&user_id)
    .fetch_one(&app.pool)
    .await
    .map_err(internal)?;

    let entity_rows: Vec<(String, i64, i64, i64)> = sqlx::query_as(
        "SELECT entity, COUNT(*), MAX(revision), MAX(updated_ms)
         FROM snapshots WHERE user_id = $1
         GROUP BY entity ORDER BY entity",
    )
    .bind(&user_id)
    .fetch_all(&app.pool)
    .await
    .map_err(internal)?;

    Ok(Json(UserDetailResponse {
        profile: UserProfile {
            id: user_id,
            username,
            display_name,
            masked_email: email.as_deref().and_then(mask_email),
            email_verified: email_verified_ms.is_some(),
            status: if deletion_requested_ms.is_some() {
                "deletion_pending"
            } else if banned_ms.is_some() {
                "banned"
            } else {
                "active"
            },
            created_ms,
            last_login_ms,
            last_sync_ms,
            membership: None,
            deletion_requested_ms,
            ban_reason,
        },
        sessions: sessions
            .into_iter()
            .map(
                |(id, device_id, device_name, created_ms, expires_ms, revoked_ms)| {
                    UserSessionItem {
                        id,
                        device_id,
                        device_name,
                        created_ms,
                        expires_ms,
                        revoked_ms,
                    }
                },
            )
            .collect(),
        login_logs: login_logs
            .into_iter()
            .map(
                |(id, device_id, device_name, ip, method, ok, detail, created_ms)| {
                    UserLoginLogItem {
                        id,
                        device_id,
                        device_name,
                        masked_ip: mask_ip(&ip),
                        method,
                        ok,
                        detail,
                        created_ms,
                    }
                },
            )
            .collect(),
        sync: SyncMetadata {
            device_count,
            change_count,
            latest_seq,
            last_sync_ms,
            entities: entity_rows
                .into_iter()
                .map(
                    |(entity, record_count, latest_revision, latest_updated_ms)| {
                        SyncEntityMetadata {
                            entity,
                            record_count,
                            latest_revision,
                            latest_updated_ms,
                        }
                    },
                )
                .collect(),
        },
    }))
}

// === 封禁 / 解封 / 强制下线 =================================================

#[derive(Debug, Deserialize)]
pub struct AdminActionRequest {
    /// 操作原因(审计落库;必填)
    pub reason: String,
    /// 操作者标识(Admin BFF 传入 `issuer:subject`)
    #[serde(default)]
    pub actor: String,
}

#[derive(Debug, Serialize)]
pub struct BanResponse {
    pub banned_ms: i64,
    pub revoked_sessions: i64,
}

/// POST /internal/users/{id}/ban —— 封禁 + 全会话吊销 + access 水位,单事务。
/// 重复封禁幂等(200,不重置封禁信息)。
pub async fn ban_user(
    State(app): State<AppState>,
    Path(user_id): Path<String>,
    Json(req): Json<AdminActionRequest>,
) -> Result<Json<BanResponse>, ApiError> {
    let reason = req.reason.trim();
    if reason.is_empty() {
        return Err((StatusCode::BAD_REQUEST, "reason is required".into()));
    }
    let now = chrono::Utc::now().timestamp_millis();

    let mut tx = app.pool.begin().await.map_err(internal)?;
    let banned: Option<Option<i64>> =
        sqlx::query_scalar("SELECT banned_ms FROM users WHERE id = $1 FOR UPDATE")
            .bind(&user_id)
            .fetch_optional(&mut *tx)
            .await
            .map_err(internal)?;
    let Some(existing) = banned else {
        return Err((StatusCode::NOT_FOUND, "user not found".into()));
    };
    if let Some(banned_ms) = existing {
        return Ok(Json(BanResponse {
            banned_ms,
            revoked_sessions: 0,
        }));
    }

    sqlx::query(
        "UPDATE users
         SET banned_ms = $2, banned_reason = $3, banned_by = $4
         WHERE id = $1",
    )
    .bind(&user_id)
    .bind(now)
    .bind(reason)
    .bind(req.actor.trim())
    .execute(&mut *tx)
    .await
    .map_err(internal)?;
    // 水位:封禁瞬间之后签发的 access 才有效(force_logout 系列同款 +1ms 边界)。
    advance_access_cutoff_on(&mut tx, &user_id, now)
        .await
        .map_err(internal)?;
    let revoked_sessions = sqlx::query(
        "UPDATE refresh_tokens SET revoked_ms = $2 WHERE user_id = $1 AND revoked_ms IS NULL",
    )
    .bind(&user_id)
    .bind(now)
    .execute(&mut *tx)
    .await
    .map_err(internal)?
    .rows_affected();
    tx.commit().await.map_err(internal)?;

    log::info!(
        "internal: user {user_id} banned by {} ({reason}), revoked {revoked_sessions} sessions",
        req.actor.trim()
    );
    Ok(Json(BanResponse {
        banned_ms: now,
        // rows_affected 是 u64,契约字段是 i64;吊销数不可能溢出,兜底 0。
        revoked_sessions: i64::try_from(revoked_sessions).unwrap_or_default(),
    }))
}

#[derive(Debug, Serialize)]
pub struct UnbanResponse {
    pub unbanned: bool,
}

/// POST /internal/users/{id}/unban —— 清除封禁标记(幂等)。
/// access 水位**不回退**:封禁前签发的 token 必须保持失效;封禁历史字段保留。
pub async fn unban_user(
    State(app): State<AppState>,
    Path(user_id): Path<String>,
    Json(req): Json<AdminActionRequest>,
) -> Result<Json<UnbanResponse>, ApiError> {
    if req.reason.trim().is_empty() {
        return Err((StatusCode::BAD_REQUEST, "reason is required".into()));
    }

    let mut tx = app.pool.begin().await.map_err(internal)?;
    let banned: Option<Option<i64>> =
        sqlx::query_scalar("SELECT banned_ms FROM users WHERE id = $1 FOR UPDATE")
            .bind(&user_id)
            .fetch_optional(&mut *tx)
            .await
            .map_err(internal)?;
    let Some(existing) = banned else {
        return Err((StatusCode::NOT_FOUND, "user not found".into()));
    };
    if existing.is_none() {
        return Ok(Json(UnbanResponse { unbanned: false }));
    }
    sqlx::query("UPDATE users SET banned_ms = NULL WHERE id = $1")
        .bind(&user_id)
        .execute(&mut *tx)
        .await
        .map_err(internal)?;
    tx.commit().await.map_err(internal)?;

    log::info!(
        "internal: user {user_id} unbanned by {} ({})",
        req.actor.trim(),
        req.reason.trim()
    );
    Ok(Json(UnbanResponse { unbanned: true }))
}

#[derive(Debug, Deserialize)]
pub struct RevokeSessionsRequest {
    /// 缺省 = 全部会话 + access 水位;给定 = 只吊销该会话(新式 access 经 sid 立即失效)
    #[serde(default)]
    pub session_id: Option<i64>,
}

#[derive(Debug, Serialize)]
pub struct RevokeSessionsResponse {
    pub revoked: i64,
}

/// POST /internal/users/{id}/sessions/revoke
pub async fn revoke_sessions(
    State(app): State<AppState>,
    Path(user_id): Path<String>,
    Json(req): Json<RevokeSessionsRequest>,
) -> Result<Json<RevokeSessionsResponse>, ApiError> {
    match req.session_id {
        Some(session_id) => {
            let exists: Option<i32> = sqlx::query_scalar("SELECT 1 FROM users WHERE id = $1")
                .bind(&user_id)
                .fetch_optional(&app.pool)
                .await
                .map_err(internal)?;
            if exists.is_none() {
                return Err((StatusCode::NOT_FOUND, "user not found".into()));
            }
            let revoked = force_logout_session(&app, &user_id, session_id)
                .await
                .map_err(internal)?;
            if !revoked {
                return Err((StatusCode::NOT_FOUND, "session not found".into()));
            }
            Ok(Json(RevokeSessionsResponse { revoked: 1 }))
        }
        None => {
            let now = chrono::Utc::now().timestamp_millis();
            let mut tx = app.pool.begin().await.map_err(internal)?;
            let exists: Option<i32> =
                sqlx::query_scalar("SELECT 1 FROM users WHERE id = $1 FOR UPDATE")
                    .bind(&user_id)
                    .fetch_optional(&mut *tx)
                    .await
                    .map_err(internal)?;
            if exists.is_none() {
                return Err((StatusCode::NOT_FOUND, "user not found".into()));
            }
            advance_access_cutoff_on(&mut tx, &user_id, now)
                .await
                .map_err(internal)?;
            let revoked = sqlx::query(
                "UPDATE refresh_tokens SET revoked_ms = $2
                 WHERE user_id = $1 AND revoked_ms IS NULL",
            )
            .bind(&user_id)
            .bind(now)
            .execute(&mut *tx)
            .await
            .map_err(internal)?
            .rows_affected();
            tx.commit().await.map_err(internal)?;
            log::info!("internal: user {user_id} force logout, revoked {revoked} sessions");
            Ok(Json(RevokeSessionsResponse {
                revoked: i64::try_from(revoked).unwrap_or_default(),
            }))
        }
    }
}

// === 看板聚合 ===============================================================

#[derive(Debug, Deserialize)]
pub struct MetricsQuery {
    pub from_ms: i64,
    pub to_ms: i64,
}

#[derive(Debug, Serialize)]
pub struct MetricsTrendPoint {
    pub bucket: String,
    pub new_users: i64,
    pub active_users: i64,
    pub pushed_changes: i64,
}

#[derive(Debug, Serialize)]
pub struct MetricsOverviewResponse {
    pub generated_at_ms: i64,
    pub metrics: MetricsSummary,
    pub trends: Vec<MetricsTrendPoint>,
}

#[derive(Debug, Serialize)]
pub struct MetricsSummary {
    pub total_users: i64,
    pub new_users: i64,
    pub active_users: i64,
    pub pushed_changes: i64,
    pub sync_users: i64,
    pub sync_devices: i64,
}

/// [from_ms, to_ms) 内按 UTC 日的桶序列(`YYYY-MM-DD`)。
fn utc_day_buckets(from_ms: i64, to_ms: i64) -> Vec<String> {
    if from_ms >= to_ms {
        return Vec::new(); // 倒序/零长窗口(上游已 400 挡,这里纯防御)
    }
    let Some(start) = chrono::DateTime::from_timestamp_millis(from_ms) else {
        return Vec::new();
    };
    let Some(end) = chrono::DateTime::from_timestamp_millis(to_ms.saturating_sub(1)) else {
        return Vec::new();
    };
    let mut day = start.date_naive();
    let last = end.date_naive();
    let mut buckets = Vec::new();
    while day <= last {
        buckets.push(day.format("%Y-%m-%d").to_string());
        let Some(next) = day.succ_opt() else {
            break;
        };
        day = next;
    }
    buckets
}

/// GET /internal/metrics/overview?from_ms=&to_ms= —— 主库可算口径;
/// DAU/WAU/MAU/留存/Pull 量不在响应里,由 BFF 置空标注「Analytics 未上线」。
pub async fn metrics_overview(
    State(app): State<AppState>,
    AxumQuery(q): AxumQuery<MetricsQuery>,
) -> Result<Json<MetricsOverviewResponse>, ApiError> {
    if q.from_ms >= q.to_ms {
        return Err((
            StatusCode::BAD_REQUEST,
            "from_ms must be before to_ms".into(),
        ));
    }

    let new_rows: Vec<(String, i64)> = sqlx::query_as(
        "SELECT to_char(to_timestamp(created_ms / 1000.0), 'YYYY-MM-DD') AS day, COUNT(*)
         FROM users WHERE created_ms >= $1 AND created_ms < $2
         GROUP BY day",
    )
    .bind(q.from_ms)
    .bind(q.to_ms)
    .fetch_all(&app.pool)
    .await
    .map_err(internal)?;

    let snapshot_rows: Vec<(String, i64, i64)> = sqlx::query_as(
        "SELECT to_char(to_timestamp(updated_ms / 1000.0), 'YYYY-MM-DD') AS day,
                COUNT(DISTINCT user_id), COUNT(*)
         FROM snapshots WHERE updated_ms >= $1 AND updated_ms < $2
         GROUP BY day",
    )
    .bind(q.from_ms)
    .bind(q.to_ms)
    .fetch_all(&app.pool)
    .await
    .map_err(internal)?;

    let (total_users, new_users, active_users, pushed_changes, sync_users, sync_devices): (
        i64,
        i64,
        i64,
        i64,
        i64,
        i64,
    ) = sqlx::query_as(
        "SELECT
            (SELECT COUNT(*) FROM users),
            (SELECT COUNT(*) FROM users WHERE created_ms >= $1 AND created_ms < $2),
            (SELECT COUNT(DISTINCT user_id) FROM snapshots WHERE updated_ms >= $1 AND updated_ms < $2),
            (SELECT COUNT(*) FROM snapshots WHERE updated_ms >= $1 AND updated_ms < $2),
            (SELECT COUNT(DISTINCT user_id) FROM snapshots),
            (SELECT COUNT(DISTINCT device_id) FROM snapshots)",
    )
    .bind(q.from_ms)
    .bind(q.to_ms)
    .fetch_one(&app.pool)
    .await
    .map_err(internal)?;

    let new_by_day: std::collections::HashMap<String, i64> = new_rows.into_iter().collect();
    let mut active_by_day: std::collections::HashMap<String, i64> =
        std::collections::HashMap::new();
    let mut pushed_by_day: std::collections::HashMap<String, i64> =
        std::collections::HashMap::new();
    for (day, active, pushed) in snapshot_rows {
        active_by_day.insert(day.clone(), active);
        pushed_by_day.insert(day, pushed);
    }

    let trends = utc_day_buckets(q.from_ms, q.to_ms)
        .into_iter()
        .map(|bucket| {
            let empty = 0;
            MetricsTrendPoint {
                new_users: *new_by_day.get(&bucket).unwrap_or(&empty),
                active_users: *active_by_day.get(&bucket).unwrap_or(&empty),
                pushed_changes: *pushed_by_day.get(&bucket).unwrap_or(&empty),
                bucket,
            }
        })
        .collect();

    Ok(Json(MetricsOverviewResponse {
        generated_at_ms: chrono::Utc::now().timestamp_millis(),
        metrics: MetricsSummary {
            total_users,
            new_users,
            active_users,
            pushed_changes,
            sync_users,
            sync_devices,
        },
        trends,
    }))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn mask_email_keeps_first_char_and_domain() {
        assert_eq!(
            mask_email("alice@example.com").as_deref(),
            Some("a***@example.com")
        );
        assert!(mask_email("@nodomain").is_none());
        assert!(mask_email("noat").is_none());
    }

    #[test]
    fn mask_ip_masks_last_two_ipv4_octets() {
        assert_eq!(mask_ip("192.168.1.23"), "192.168.*.*");
        assert_eq!(mask_ip(" 10.0.0.1 "), "10.0.*.*");
    }

    #[test]
    fn mask_ip_keeps_ipv6_prefix_and_masks_garbage() {
        assert_eq!(mask_ip("2001:db8:1:2:3:4:5:6"), "2001:db8:1:*");
        assert_eq!(mask_ip("localhost"), "***");
    }

    #[test]
    fn status_condition_accepts_contract_values_only() {
        assert!(status_condition(None).unwrap().is_none());
        assert!(status_condition(Some("")).unwrap().is_none());
        assert!(status_condition(Some("active")).unwrap().is_some());
        assert!(status_condition(Some("banned")).unwrap().is_some());
        assert!(status_condition(Some("deletion_pending"))
            .unwrap()
            .is_some());
        assert!(status_condition(Some("hacker")).is_err());
    }

    #[test]
    fn utc_day_buckets_cover_whole_window_by_utc_day() {
        // 2026-01-01 23:30 UTC ~ 2026-01-03 00:30 UTC → 3 个日桶
        let start = chrono::DateTime::parse_from_rfc3339("2026-01-01T23:30:00Z")
            .unwrap()
            .timestamp_millis();
        let end = chrono::DateTime::parse_from_rfc3339("2026-01-03T00:30:00Z")
            .unwrap()
            .timestamp_millis();
        assert_eq!(
            utc_day_buckets(start, end),
            vec!["2026-01-01", "2026-01-02", "2026-01-03"]
        );
    }

    #[test]
    fn utc_day_buckets_single_day_and_empty_window() {
        let start = chrono::DateTime::parse_from_rfc3339("2026-05-05T10:00:00Z")
            .unwrap()
            .timestamp_millis();
        let end = start + 60_000;
        assert_eq!(utc_day_buckets(start, end), vec!["2026-05-05"]);
        assert!(utc_day_buckets(end, start).is_empty());
    }

    #[test]
    fn users_where_always_binds_search_and_status() {
        let plain = users_where(None);
        assert!(plain.contains("$1::text = ''"));
        assert!(!plain.contains("AND ("));
        let filtered = users_where(Some("banned_ms IS NOT NULL"));
        assert!(filtered.contains("AND (banned_ms IS NOT NULL)"));
    }
}
