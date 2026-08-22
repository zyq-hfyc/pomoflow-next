//! 桌面端同步客户端(P1a 手动 / P1b 自动)—— HTTP 传输接 core 同步引擎。
//!
//! 流程(契约见 pomoflow/docs/同步协议详细设计.md):
//! 1. PUSH 循环:`list_pending` 组包(200/批)→ POST /v1/sync/push →
//!    `apply_push_outcomes`(Accepted/Dropped 标 synced;Conflicted 就地收敛)
//!    → 直到队列清空(上限 100 批防失控);
//! 2. PULL 循环:`last_sync_seq` 游标 → POST /v1/sync/pull →
//!    `apply_pull_response` → 推进游标(meta 持久化,断点续传)→ 直到空批。
//!
//! 配置(服务器地址 / Token / 自动同步开关与间隔)存 SQLite `meta` 表 ——
//! 同步在 Rust 侧执行,配置必须与引擎同侧;设置页经 `get/set_sync_config` 读写。
//! 本机 user_id/device_id 由迁移 002 生成,`get_sync_identity` 供用户把它们
//! 填进服务端 .env(SYNC_USER_ID 必须与本机一致,否则 403)。
//!
//! P1b 自动同步:`spawn_auto_sync` 起一条常驻任务 —— 启动 3 秒后同步一次,
//! 之后每 30 秒醒一次读配置(设置页开关 ≤30s 生效,无需重启),按间隔到期
//! 才真正执行;结果经 `sync://auto` 事件发给设置页展示。手动/自动共用
//! `sync_lock` 串行化,防止两个循环交错推拉。

use std::sync::Arc;
use std::time::{Duration, Instant};

use pomoflow_core::store::SqliteStore;
use pomoflow_core::sync::engine::{apply_pull_response, apply_push_outcomes, build_push_request};
use pomoflow_core::sync::{
    ApplyOutcome, PullRequest, PullResponse, PushRequest, PushResponse, SyncCursor,
};
use serde::{Deserialize, Serialize};
use tauri::{Emitter, State};

use crate::commands::AppState;

const META_URL: &str = "sync_server_url";
const META_TOKEN: &str = "sync_token";
const META_CURSOR: &str = "last_sync_seq";
const META_AUTO: &str = "auto_sync_enabled"; // "1" 开 / 其他 关
const META_INTERVAL: &str = "sync_interval_min";

/// 自动同步间隔(分钟)边界:下限防高频打爆服务器,上限防形同虚设。
const INTERVAL_MIN: u32 = 1;
const INTERVAL_MAX: u32 = 1440;
/// 默认间隔(分钟)。
pub const INTERVAL_DEFAULT: u32 = 5;

/// 后台循环的唤醒粒度:设置变更 ≤30s 生效;到期判断精度也是 30s。
const TICK: Duration = Duration::from_secs(30);
/// 启动后首次同步的缓冲(等 UI / 托盘就绪,避开启动高峰)。
const STARTUP_DELAY: Duration = Duration::from_secs(3);

fn es(e: pomoflow_core::error::CoreError) -> String {
    e.to_string()
}

fn meta_nonempty(store: &SqliteStore, key: &str) -> Result<Option<String>, String> {
    Ok(store.get_meta(key).map_err(es)?.filter(|v| !v.is_empty()))
}

// === 配置与标识 ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SyncConfig {
    pub server_url: Option<String>,
    pub token: Option<String>,
    /// 启动时 + 定时自动同步(P1b)
    pub auto_sync: bool,
    /// 自动同步间隔(分钟,1..=1440)
    pub interval_min: u32,
}

#[tauri::command]
pub fn get_sync_config(state: State<'_, AppState>) -> Result<SyncConfig, String> {
    Ok(SyncConfig {
        server_url: meta_nonempty(&state.store, META_URL)?,
        token: meta_nonempty(&state.store, META_TOKEN)?,
        auto_sync: state
            .store
            .get_meta(META_AUTO)
            .map_err(es)?
            .as_deref()
            == Some("1"),
        interval_min: state
            .store
            .get_meta(META_INTERVAL)
            .map_err(es)?
            .and_then(|v| v.parse().ok())
            .map(clamp_interval)
            .unwrap_or(INTERVAL_DEFAULT),
    })
}

/// 地址规范化(纯函数,便于单测):空/空白 = 清除(返回 None);
/// 非空须是合法 http(s) URL,规范化后去尾斜杠。
fn normalize_server_url(input: Option<&str>) -> Result<Option<String>, String> {
    match input.map(str::trim) {
        Some(u) if !u.is_empty() => {
            let parsed = reqwest::Url::parse(u).map_err(|e| format!("服务器地址不合法: {e}"))?;
            if !matches!(parsed.scheme(), "http" | "https") {
                return Err("服务器地址必须是 http:// 或 https:// 开头".into());
            }
            Ok(Some(parsed.to_string().trim_end_matches('/').to_string()))
        }
        _ => Ok(None),
    }
}

/// 间隔夹取到 [1, 1440](纯函数,便于单测)。
fn clamp_interval(v: u32) -> u32 {
    v.clamp(INTERVAL_MIN, INTERVAL_MAX)
}

#[tauri::command]
pub fn set_sync_config(
    server_url: Option<String>,
    token: Option<String>,
    auto_sync: Option<bool>,
    interval_min: Option<u32>,
    state: State<'_, AppState>,
) -> Result<(), String> {
    let store = &state.store;
    let url_norm = normalize_server_url(server_url.as_deref())?;
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
    store
        .set_meta(META_AUTO, if auto_sync.unwrap_or(false) { "1" } else { "" })
        .map_err(es)?;
    store
        .set_meta(
            META_INTERVAL,
            &clamp_interval(interval_min.unwrap_or(INTERVAL_DEFAULT)).to_string(),
        )
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
    let lock = state.sync_lock.clone();
    run_sync_locked(&store, &lock).await
}

/// 带串行化锁的同步入口(手动「立即同步」与后台自动同步共用)。
async fn run_sync_locked(
    store: &SqliteStore,
    lock: &Arc<tokio::sync::Mutex<()>>,
) -> Result<SyncReport, String> {
    let _guard = lock.lock().await;
    run_sync(store).await
}

/// 后台自动同步事件(`sync://auto`)—— 设置页监听后展示"最近自动同步"。
#[derive(Debug, Clone, Serialize)]
pub struct AutoSyncEvent {
    pub ok: bool,
    pub error: Option<String>,
    pub pushed: usize,
    pub pulled: usize,
    pub conflicts: usize,
    pub dropped: usize,
    /// 事件产生时间(Unix 毫秒,前端 toLocaleTimeString 展示)
    pub at_ms: i64,
}

/// 起后台自动同步循环(P1b,`lib.rs` 的 setup 里调用一次):
///
/// - 启动 `STARTUP_DELAY` 后做首次同步(若已配置且开关开);
/// - 之后每 `TICK` 醒一次:**每次重新读 meta 配置**,设置页改开关/间隔
///   ≤30s 生效,无需重启应用;
/// - 到期才真正同步(`last_run + interval`),失败只记日志并发事件,循环不退。
pub fn spawn_auto_sync(
    app: tauri::AppHandle,
    store: SqliteStore,
    lock: Arc<tokio::sync::Mutex<()>>,
) {
    tauri::async_runtime::spawn(async move {
        tokio::time::sleep(STARTUP_DELAY).await;
        let mut last_run: Option<Instant> = None;
        loop {
            let auto_on = store
                .get_meta(META_AUTO)
                .map(|v| v.as_deref() == Some("1"))
                .unwrap_or(false);
            let interval_min = store
                .get_meta(META_INTERVAL)
                .ok()
                .flatten()
                .and_then(|v| v.parse::<u32>().ok())
                .map(clamp_interval)
                .unwrap_or(INTERVAL_DEFAULT);
            // 配置不全(未保存地址/令牌)时静默跳过,不报错 —— 自动同步
            // 是可选功能,首次使用只配地址不开启很正常
            let configured = meta_nonempty(&store, META_URL)
                .ok()
                .flatten()
                .is_some()
                && meta_nonempty(&store, META_TOKEN).ok().flatten().is_some();
            let due = last_run.is_none_or(|t| {
                t.elapsed() >= Duration::from_secs(u64::from(interval_min) * 60)
            });

            if auto_on && configured && due {
                let evt = match run_sync_locked(&store, &lock).await {
                    Ok(r) => AutoSyncEvent {
                        ok: true,
                        error: None,
                        pushed: r.pushed,
                        pulled: r.pulled,
                        conflicts: r.conflicts,
                        dropped: r.dropped,
                        at_ms: chrono::Utc::now().timestamp_millis(),
                    },
                    Err(e) => {
                        log::warn!("auto sync failed: {e}");
                        AutoSyncEvent {
                            ok: false,
                            error: Some(e),
                            pushed: 0,
                            pulled: 0,
                            conflicts: 0,
                            dropped: 0,
                            at_ms: chrono::Utc::now().timestamp_millis(),
                        }
                    }
                };
                // 事件发送失败(如窗口已关)不影响循环
                let _ = app.emit("sync://auto", &evt);
                last_run = Some(Instant::now());
            }

            tokio::time::sleep(TICK).await;
        }
    });
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn server_url_normalization() {
        // 合法 http(s):规范化 + 去尾斜杠 + 去首尾空白
        assert_eq!(
            normalize_server_url(Some(" http://a.b:8080/ "))
                .unwrap()
                .as_deref(),
            Some("http://a.b:8080")
        );
        assert_eq!(
            normalize_server_url(Some("https://cloud.example.com//")).unwrap(),
            Some("https://cloud.example.com".to_string())
        );
        // 空白 / None = 清除
        assert_eq!(normalize_server_url(Some("   ")).unwrap(), None);
        assert_eq!(normalize_server_url(None).unwrap(), None);
        // 非法 scheme / 非法 URL 拒绝
        assert!(normalize_server_url(Some("ftp://x")).is_err());
        assert!(normalize_server_url(Some("not a url")).is_err());
    }

    #[test]
    fn interval_clamped_to_bounds() {
        assert_eq!(clamp_interval(0), 1);
        assert_eq!(clamp_interval(1), 1);
        assert_eq!(clamp_interval(5), 5);
        assert_eq!(clamp_interval(60), 60);
        assert_eq!(clamp_interval(u32::MAX), 1440);
    }
}
