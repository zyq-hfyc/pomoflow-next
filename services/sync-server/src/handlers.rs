//! Push / Pull 处理器。
//!
//! 存储模型(P1a 简化,见 README「设计说明」):
//! - `snapshots`:每 (user, entity, entity_id) 的**权威快照**(payload JSONB
//!   原样保存),合并只看 revision/updated_at/device_id 元信息;
//! - `changelog`:seq 单调递增 + `(user_id, change_id)` 唯一(幂等),
//!   行内保存完整 Change JSON —— pull 原样下发。
//!
//! 合并裁决与桌面端**同一段代码**:`pomoflow_core::sync::lww::resolve_conflict`
//! (ADR-005/009)。

use axum::extract::State;
use axum::http::{HeaderMap, StatusCode};
use axum::Json;
use chrono::TimeZone;
use pomoflow_core::sync::lww::{resolve_conflict, Resolution};
use pomoflow_core::sync::{
    ApplyOutcome, Change, EntityKind, PullRequest, PullResponse, PushRequest, PushResponse,
    SyncCursor,
};
use serde_json::Value;
use uuid::Uuid;

use crate::auth_handlers::authenticate;
use crate::state::{AppState, PULL_LIMIT};

type ApiError = (StatusCode, String);

fn internal(e: sqlx::Error) -> ApiError {
    (StatusCode::INTERNAL_SERVER_ERROR, format!("db: {e}"))
}

fn bad_request(e: serde_json::Error) -> ApiError {
    (StatusCode::BAD_REQUEST, format!("payload: {e}"))
}

/// EntityKind → 快照表实体列(serde snake_case 名)。
fn kind_text(k: EntityKind) -> String {
    serde_json::to_value(k)
        .ok()
        .and_then(|v| v.as_str().map(str::to_string))
        .unwrap_or_else(|| "unknown".into())
}

/// 从库中快照行重建 Change(供 LWW 比较与 Conflicted 返回)。
#[allow(clippy::too_many_arguments)]
fn stored_change(
    entity: EntityKind,
    entity_id: String,
    revision: i64,
    updated_ms: i64,
    device_id: String,
    payload: Value,
) -> Change {
    Change {
        id: Uuid::nil(),
        device_id,
        entity,
        entity_id,
        revision: revision.max(0) as u64,
        updated_at: chrono::Utc
            .timestamp_millis_opt(updated_ms)
            .single()
            .unwrap_or_default(),
        payload,
    }
}

/// POST /v1/sync/push —— 逐条 LWW 裁决(ADR-009),change_id 幂等去重。
pub async fn push(
    State(app): State<AppState>,
    headers: HeaderMap,
    Json(req): Json<PushRequest>,
) -> Result<Json<PushResponse>, ApiError> {
    // 认证 → 已认证 user_id(JWT 账号或静态 Token 回落);
    // 归属断言:请求体声称的 user 必须与 token 一致(多租户第一道闸,ADR-007)
    let auth_user = authenticate(&app, &headers)?;
    if req.user_id != auth_user {
        return Err((StatusCode::FORBIDDEN, "user mismatch".into()));
    }
    let user_str = auth_user.as_str();

    let mut results = Vec::with_capacity(req.changes.len());

    for change in &req.changes {
        // 幂等:同一 change_id(客户端重试)按已受理返回,不重复记 log
        let dup: bool = sqlx::query_scalar(
            "SELECT EXISTS(SELECT 1 FROM changelog WHERE user_id = $1 AND change_id = $2)",
        )
        .bind(user_str)
        .bind(change.id.to_string())
        .fetch_one(&app.pool)
        .await
        .map_err(internal)?;
        if dup {
            results.push(ApplyOutcome::Accepted {
                entity: change.entity,
                entity_id: change.entity_id.clone(),
                revision: change.revision,
            });
            continue;
        }

        let stored: Option<(i64, i64, String, Value)> = sqlx::query_as(
            "SELECT revision, updated_ms, device_id, payload
             FROM snapshots WHERE user_id = $1 AND entity = $2 AND entity_id = $3",
        )
        .bind(user_str)
        .bind(kind_text(change.entity))
        .bind(&change.entity_id)
        .fetch_optional(&app.pool)
        .await
        .map_err(internal)?;

        let (incoming_wins, winner) = match stored {
            None => (true, None),
            Some((rev, ms, dev, payload)) => {
                let s = stored_change(
                    change.entity,
                    change.entity_id.clone(),
                    rev,
                    ms,
                    dev,
                    payload,
                );
                match resolve_conflict(&s, change) {
                    Resolution::Left => (false, Some(s)),
                    Resolution::Right | Resolution::Tie => (true, None),
                }
            }
        };

        if incoming_wins {
            let change_json = serde_json::to_value(change).map_err(bad_request)?;
            let inserted = sqlx::query(
                "INSERT INTO changelog (user_id, change_id, device_id, change)
                 VALUES ($1, $2, $3, $4)
                 ON CONFLICT (user_id, change_id) DO NOTHING",
            )
            .bind(user_str)
            .bind(change.id.to_string())
            .bind(&change.device_id)
            .bind(&change_json)
            .execute(&app.pool)
            .await
            .map_err(internal)?;
            if inserted.rows_affected() == 1 {
                sqlx::query(
                    "INSERT INTO snapshots
                        (user_id, entity, entity_id, revision, updated_ms, device_id, payload)
                     VALUES ($1, $2, $3, $4, $5, $6, $7)
                     ON CONFLICT (user_id, entity, entity_id) DO UPDATE SET
                        revision = excluded.revision,
                        updated_ms = excluded.updated_ms,
                        device_id = excluded.device_id,
                        payload = excluded.payload",
                )
                .bind(user_str)
                .bind(kind_text(change.entity))
                .bind(&change.entity_id)
                .bind(change.revision as i64)
                .bind(change.updated_at.timestamp_millis())
                .bind(&change.device_id)
                .bind(&change.payload)
                .execute(&app.pool)
                .await
                .map_err(internal)?;
            }
            results.push(ApplyOutcome::Accepted {
                entity: change.entity,
                entity_id: change.entity_id.clone(),
                revision: change.revision,
            });
        } else {
            results.push(ApplyOutcome::Conflicted {
                entity_id: change.entity_id.clone(),
                winner: winner.expect("conflicted 必有 winner"),
            });
        }
    }

    Ok(Json(PushResponse { results }))
}

/// POST /v1/sync/pull —— seq 游标增量拉取,排除请求方自己的设备(ADR-011)。
pub async fn pull(
    State(app): State<AppState>,
    headers: HeaderMap,
    Json(req): Json<PullRequest>,
) -> Result<Json<PullResponse>, ApiError> {
    let auth_user = authenticate(&app, &headers)?;
    if req.user_id != auth_user {
        return Err((StatusCode::FORBIDDEN, "user mismatch".into()));
    }
    let user_str = auth_user.as_str();

    let rows: Vec<(i64, Value)> = sqlx::query_as(
        "SELECT seq, change FROM changelog
         WHERE user_id = $1 AND seq > $2 AND device_id <> $3
         ORDER BY seq ASC LIMIT $4",
    )
    .bind(user_str)
    .bind(req.since.last_seq as i64)
    .bind(&req.device_id)
    .bind(PULL_LIMIT)
    .fetch_all(&app.pool)
    .await
    .map_err(internal)?;

    let next_seq = rows
        .last()
        .map(|(s, _)| *s)
        .unwrap_or(req.since.last_seq as i64);
    let mut changes = Vec::with_capacity(rows.len());
    for (_, v) in rows {
        changes.push(serde_json::from_value(v).map_err(bad_request)?);
    }

    Ok(Json(PullResponse {
        changes,
        next_cursor: SyncCursor {
            last_seq: next_seq.max(0) as u64,
        },
    }))
}

/// GET /healthz —— 存活/就绪探针(compose 依赖检查用)。
pub async fn healthz(State(app): State<AppState>) -> Result<Json<Value>, ApiError> {
    let ok: bool = sqlx::query_scalar::<_, i32>("SELECT 1")
        .fetch_one(&app.pool)
        .await
        .is_ok();
    Ok(Json(
        serde_json::json!({ "ok": ok, "service": "sync-server" }),
    ))
}
