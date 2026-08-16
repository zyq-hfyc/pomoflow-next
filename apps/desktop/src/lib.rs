//! PomoFlow 桌面端核心逻辑。
//!
//! P1.3:注册 Tauri commands + 启动时初始化 SQLite。
//! P1.4:init notification / autostart 插件 + 构建系统托盘。

use log::{error, info};
use tauri_plugin_autostart::MacosLauncher;

use crate::commands::{ensure_parent, store_path, AppState};
use crate::store_sqlite::SqliteStore;

pub mod commands;
pub mod store_sqlite;
pub mod tray;

/// Tauri app 启动入口。
pub fn run() {
    env_logger::Builder::from_env(env_logger::Env::default().default_filter_or("info"))
        .format_timestamp_millis()
        .init();

    info!("PomoFlow desktop starting (P1.4 tray + notification + autostart)...");

    // 1. 打开 SQLite(失败就直接 panic —— 桌面端存储是必要前提)
    let path = store_path();
    ensure_parent(&path);
    info!("opening store at {}", path.display());
    let store = SqliteStore::open(&path).expect("open sqlite store");
    let state = AppState { store };

    // 2. 启动 Tauri + 注入 state + 注册 command handler + 加载插件
    tauri::Builder::default()
        .manage(state)
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            // 静默启动:开机时不抢焦点,常驻托盘
            Some(vec!["--silent"]),
        ))
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
        .setup(|app| {
            info!("Tauri app setup complete, building tray...");
            tray::build(app)?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .map_err(|e| error!("failed to run Tauri app: {e}"))
        .expect("error while running PomoFlow desktop");
}
