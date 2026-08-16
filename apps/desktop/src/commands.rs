//! Tauri command 桥接 —— `crates/core::Store` 暴露给前端 invoke。
//!
//! ## 设计要点
//!
//! - **AppState 通过 `manage()` 注入**;每个 command 拿 `State<AppState>` 取句柄。
//! - **错误用 `String` 返回**:`CoreError` 没有 `Serialize` derive,直接 `to_string()`
//!   转文本;前端 invoke 的 promise reject 字符串。生产化时再考虑 `thiserror + serde`
//!   把错误码结构化。
//! - **参数透传**:command 签名直接接 `core::model` / `core::store::TaskQuery`,
//!   Tauri 自动反序列化 JSON。
//! - **P1.3 范围**:Task / Project / Tag 三个 CRUD + 标签关联。复盘 / pomodoro
//!   CRUD 留到 P1.4 + 番茄钟一并接。

use std::path::{Path, PathBuf};

use pomoflow_core::model::{Id, Project, Tag, Task};
use pomoflow_core::store::{SqliteStore, Store, TaskQuery};
use tauri::State;

/// 全局应用状态 —— Tauri `manage()` 注入,每个 command 拿 `State<AppState>`。
///
/// `SqliteStore` 内部 `Arc<Mutex<Connection>>` 已经是 `Clone + Send + Sync`,
/// 所以 `AppState` 满足 Tauri 状态要求。
#[derive(Clone)]
pub struct AppState {
    pub store: SqliteStore,
}

/// 取得跨平台 SQLite 文件路径 —— 不引入 `dirs` crate,自己拼。
///
/// - Windows: `%APPDATA%\pomoflow\store.db`
/// - macOS:   `~/Library/Application Support/pomoflow/store.db`
/// - Linux:   `$XDG_DATA_HOME/pomoflow/store.db` → `~/.local/share/pomoflow/store.db`
///
/// 失败时回退到当前目录(开发模式方便)。
pub fn store_path() -> PathBuf {
    let mut base = PathBuf::new();
    if cfg!(windows) {
        if let Ok(appdata) = std::env::var("APPDATA") {
            base.push(appdata);
        }
    } else if cfg!(target_os = "macos") {
        if let Ok(home) = std::env::var("HOME") {
            base.push(home);
            base.push("Library/Application Support");
        }
    } else if let Ok(xdg) = std::env::var("XDG_DATA_HOME") {
        base.push(xdg);
    } else if let Ok(home) = std::env::var("HOME") {
        base.push(home);
        base.push(".local/share");
    }

    base.push("pomoflow");
    base.push("store.db");
    base
}

/// 确保 parent 目录存在(失败吞掉,open 时再报)。
pub fn ensure_parent(path: &Path) {
    if let Some(parent) = path.parent() {
        let _ = std::fs::create_dir_all(parent);
    }
}

fn map_err(e: pomoflow_core::error::CoreError) -> String {
    e.to_string()
}

// === Task commands ===

#[tauri::command]
pub fn list_tasks(query: TaskQuery, state: State<'_, AppState>) -> Result<Vec<Task>, String> {
    state.store.list_tasks(&query).map_err(map_err)
}

#[tauri::command]
pub fn get_task(id: String, state: State<'_, AppState>) -> Result<Task, String> {
    let id = Id::parse(&id).ok_or_else(|| format!("invalid id: {id}"))?;
    state.store.get_task(&id).map_err(map_err)
}

#[tauri::command]
pub fn upsert_task(task: Task, state: State<'_, AppState>) -> Result<Task, String> {
    state.store.upsert_task(task).map_err(map_err)
}

#[tauri::command]
pub fn delete_task(id: String, state: State<'_, AppState>) -> Result<(), String> {
    let id = Id::parse(&id).ok_or_else(|| format!("invalid id: {id}"))?;
    state.store.delete_task(&id).map_err(map_err)
}

// === Project commands ===

#[tauri::command]
pub fn list_projects(state: State<'_, AppState>) -> Result<Vec<Project>, String> {
    state.store.list_projects().map_err(map_err)
}

#[tauri::command]
pub fn upsert_project(project: Project, state: State<'_, AppState>) -> Result<Project, String> {
    state.store.upsert_project(project).map_err(map_err)
}

#[tauri::command]
pub fn delete_project(id: String, state: State<'_, AppState>) -> Result<(), String> {
    let id = Id::parse(&id).ok_or_else(|| format!("invalid id: {id}"))?;
    state.store.delete_project(&id).map_err(map_err)
}

// === Tag commands ===

#[tauri::command]
pub fn list_tags(state: State<'_, AppState>) -> Result<Vec<Tag>, String> {
    state.store.list_tags().map_err(map_err)
}

#[tauri::command]
pub fn upsert_tag(tag: Tag, state: State<'_, AppState>) -> Result<Tag, String> {
    state.store.upsert_tag(tag).map_err(map_err)
}

#[tauri::command]
pub fn delete_tag(id: String, state: State<'_, AppState>) -> Result<(), String> {
    let id = Id::parse(&id).ok_or_else(|| format!("invalid id: {id}"))?;
    state.store.delete_tag(&id).map_err(map_err)
}

// === Task ↔ Tag 关联 ===

#[tauri::command]
pub fn list_tags_for_task(task_id: String, state: State<'_, AppState>) -> Result<Vec<Tag>, String> {
    let id = Id::parse(&task_id).ok_or_else(|| format!("invalid id: {task_id}"))?;
    state.store.list_tags_for_task(&id).map_err(map_err)
}

#[tauri::command]
pub fn set_tags_for_task(
    task_id: String,
    tag_ids: Vec<String>,
    state: State<'_, AppState>,
) -> Result<(), String> {
    let id = Id::parse(&task_id).ok_or_else(|| format!("invalid task_id: {task_id}"))?;
    let mut parsed = Vec::with_capacity(tag_ids.len());
    for raw in tag_ids {
        let tid = Id::parse(&raw).ok_or_else(|| format!("invalid tag_id: {raw}"))?;
        parsed.push(tid);
    }
    state.store.set_tags_for_task(&id, &parsed).map_err(map_err)
}
