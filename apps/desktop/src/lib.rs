//! PomoFlow 桌面端核心逻辑。
//!
//! P1.3:注册 Tauri commands + 启动时初始化 SQLite。

use log::{error, info};

pub mod commands;
pub mod store_sqlite;

use crate::commands::{ensure_parent, store_path, AppState};
use crate::store_sqlite::SqliteStore;

/// Tauri app 启动入口。
pub fn run() {
    env_logger::Builder::from_env(env_logger::Env::default().default_filter_or("info"))
        .format_timestamp_millis()
        .init();

    info!("PomoFlow desktop starting (P1.3 commands + Task CRUD)...");

    // 1. 打开 SQLite(失败就直接 panic —— 桌面端存储是必要前提)
    let path = store_path();
    ensure_parent(&path);
    info!("opening store at {}", path.display());
    let store = SqliteStore::open(&path).expect("open sqlite store");
    let state = AppState { store };

    // 2. 启动 Tauri + 注入 state + 注册 command handler
    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![
            commands::list_tasks,
            commands::get_task,
            commands::upsert_task,
            commands::delete_task,
            commands::list_projects,
            commands::upsert_project,
            commands::delete_project,
            commands::list_tags,
            commands::upsert_tag,
            commands::delete_tag,
            commands::list_tags_for_task,
            commands::set_tags_for_task,
        ])
        .setup(|_app| {
            info!("Tauri app setup complete, opening window...");
            Ok(())
        })
        .run(tauri::generate_context!())
        .map_err(|e| error!("failed to run Tauri app: {e}"))
        .expect("error while running PomoFlow desktop");
}
