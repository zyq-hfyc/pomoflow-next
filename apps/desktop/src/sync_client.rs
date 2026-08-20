//! 桌面端同步客户端(P1a)—— HTTP 传输接 core 同步引擎。
//!
//! 流程(契约见 pomoflow/docs/同步协议详细设计.md):
//! 1. PUSH 循环:`list_pending` 组包(200/批)→ POST /v1/sync/push →
//!    `apply_push_outcomes`(Accepted/Dropped 标 synced;Conflicted 就地收敛)
//!    → 直到队列清空(上限 100 批防失控);
//! 2. PULL 循环:`last_sync_seq` 游标 → POST /v1/sync/pull →
//!    `apply_pull_response` → 推进游标(meta 持久化,断点续传)→ 直到空批。
//!
//! 配置(服务器地址 / Token)存 SQLite `meta` 表 —— 同步在 Rust 侧执行,
//! 配置必须与引擎同侧;设置页经 `get/set_sync_config` 读写。
//! 本机 user_id/device_id 由迁移 002 生成,`get_sync_identity` 供用户把它们
//! 填进服务端 .env(SYNC_USER_ID 必须与本机一致,否则 403)。

use pomoflow_core::store::SqliteStore;
use pomoflow_core::sync::engine::{apply_pull_response, apply_push_outcomes, build_push_request};
use pomoflow_core::sync::{
    ApplyOutcome, PullRequest, PullResponse, PushRequest, PushResponse, SyncCursor,
};
use serde::{Deserialize, Serialize};
use tauri::State;

use crate::commands::AppState;

const META_URL: &str = "sync_server_url";
const META_TOKEN: &str = "sync_token";
const META_CURSOR: &str = "last_sync_seq";

fn es(e: pomoflow_core::error::CoreError) -> String {
    e.to_string()
}

fn meta_nonempty(store: &SqliteStore, key: &str) -> Result<Option<String>, String> {
    Ok(store.get_meta(key).map_err(es)?.filter(|v| !v.is_empty()))
}

// === 配置与标识 ===

#[derive(Debug, Default, Clone, Serialize, Deserialize)]
pub struct SyncConfig {
    pub server_url: Option<String>,
    pub token: Option<String>,
}

#[tauri::command]
pub fn get_sync_config(state: State<'_, AppState>) -> Result<SyncConfig, String> {
    Ok(SyncConfig {
        server_url: meta_nonempty(&state.store, META_URL)?,
        token: meta_nonempty(&state.store, META_TOKEN)?,
    })
}

#[tauri::command]
pub fn set_sync_config(
    server_url: Option<String>,
    token: Option<String>,
    state: State<'_, AppState>,
) -> Result<(), String> {
    let store = &state.store;
    // 地址:空 = 清除;非空须是合法 http(s) URL,规范化后去尾斜杠
    let url_norm = match server_url.as_deref().map(str::trim) {
        Some(u) if !u.is_empty() => {
            let parsed = reqwest::Url::parse(u).map_err(|e| format!("服务器地址不合法: {e}"))?;
            if !matches!(parsed.scheme(), "http" | "https") {
                return Err("服务器地址必须是 http:// 或 https:// 开头".into());
            }
            Some(parsed.to_string().trim_end_matches('/').to_string())
        }
        _ => None,
    };
    store
        .set_meta(META_URL, url_norm.as_deref().unwrap_or(""))
        .map_err(es)?;
    let token_norm = token
        .as_deref()
        .map(str::trim)
        .filter(|t| !t.is_empty())
        .map(str::to_string);
    store
        .set_meta(META_TOKEN, token_norm.as_deref().unwrap_or(""))
        .map_err(es)?;
    Ok(())
}

#[derive(Debug, Clone, Serialize)]
pub struct SyncIdentity {
    pub user_id: String,
    pub device_id: String,
}

#[tauri::command]
pub fn get_sync_identity(state: State<'_, AppState>) -> Result<SyncIdentity, String> {
    Ok(SyncIdentity {
        user_id: state.store.local_user_id().to_string(),
        device_id: state.store.local_device_id().to_string(),
    })
}

// === 同步执行 ===

#[derive(Debug, Default, Clone, Copy, Serialize)]
pub struct SyncReport {
    pub pushed: usize,
    pub conflicts: usize,
    pub dropped: usize,
    pub pulled: usize,
}

#[tauri::command]
pub async fn sync_now(state: State<'_, AppState>) -> Result<SyncReport, String> {
    // async 命令不跨 await 持有 State:先把句柄克隆出来
    let store = state.store.clone();
    run_sync(&store).await
}

async fn run_sync(store: &SqliteStore) -> Result<SyncReport, String> {
    let url = meta_nonempty(store, META_URL)?.ok_or("未配置同步服务器(设置 → 数据同步)")?;
    let token = meta_nonempty(store, META_TOKEN)?.ok_or("未配置访问令牌")?;
    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(30))
        .build()
        .map_err(|e| e.to_string())?;
    let user = store.local_user_id().clone();
    let device = store.local_device_id().to_string();
    let mut report = SyncReport::default();

    // --- PUSH:分批推到清空 ---
    for _ in 0..100 {
        let req: PushRequest = build_push_request(&user, &device, store, 200).map_err(es)?;
        if req.changes.is_empty() {
            break;
        }
        let resp: PushResponse =
            post_json(&client, &format!("{url}/v1/sync/push"), &token, &req).await?;
        for outcome in &resp.results {
            match outcome {
                ApplyOutcome::Accepted { .. } => report.pushed += 1,
                ApplyOutcome::Conflicted { .. } => report.conflicts += 1,
                ApplyOutcome::Dropped { .. } => report.dropped += 1,
            }
        }
        apply_push_outcomes(store, &req.changes, &resp).map_err(es)?;
    }

    // --- PULL:游标循环到空批 ---
    let mut cursor = SyncCursor {
        last_seq: meta_nonempty(store, META_CURSOR)?
            .and_then(|v| v.parse().ok())
            .unwrap_or(0),
    };
    for _ in 0..200 {
        let req = PullRequest {
            user_id: user.clone(),
            device_id: device.clone(),
            since: cursor,
        };
        let resp: PullResponse =
            post_json(&client, &format!("{url}/v1/sync/pull"), &token, &req).await?;
        let n = resp.changes.len();
        apply_pull_response(store, &resp.changes).map_err(es)?;
        cursor = resp.next_cursor;
        store
            .set_meta(META_CURSOR, &cursor.last_seq.to_string())
            .map_err(es)?;
        report.pulled += n;
        if n == 0 {
            break;
        }
    }

    Ok(report)
}

async fn post_json<T, R>(
    client: &reqwest::Client,
    url: &str,
    token: &str,
    body: &T,
) -> Result<R, String>
where
    T: serde::Serialize,
    R: serde::de::DeserializeOwned,
{
    let resp = client
        .post(url)
        .bearer_auth(token)
        .json(body)
        .send()
        .await
        .map_err(|e| format!("网络错误: {e}"))?;
    let status = resp.status();
    let text = resp
        .text()
        .await
        .map_err(|e| format!("读取响应失败: {e}"))?;
    if !status.is_success() {
        return Err(format!("服务器返回 {status}: {text}"));
    }
    serde_json::from_str(&text).map_err(|e| format!("响应解析失败: {e}"))
}
