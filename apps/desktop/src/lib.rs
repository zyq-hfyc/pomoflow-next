//! PomoFlow 桌面端核心逻辑。
//!
//! P1.3:注册 Tauri commands + 启动时初始化 SQLite。
//! P1.4:init notification / autostart 插件 + 构建系统托盘。
//! P1.5:`SqliteStore` 已迁入 `pomoflow-core`,桌面端只 re-use。

use log::{error, info, warn};
use pomoflow_core::store::{migrate, SqliteStore};
use tauri_plugin_autostart::MacosLauncher;

use crate::commands::{ensure_parent, store_path, AppState};

pub mod commands;
pub mod tray;

/// 迁移前把 db 复制为 `store.db.<YYYYmmdd_HHMMSS>.bak`(v1 `database.py::_backup_db` 对齐)。
///
/// 失败只告警不阻断 —— 备份是保险措施,不应阻止应用启动。
fn backup_store_file(path: &std::path::Path) {
    let stamp = chrono::Local::now().format("%Y%m%d_%H%M%S");
    let backup = path.with_extension(format!("db.{stamp}.bak"));
    match std::fs::copy(path, &backup) {
        Ok(bytes) => info!(
            "store backed up to {} ({} bytes) before migration",
            backup.display(),
            bytes
        ),
        Err(e) => warn!("store backup failed (continuing): {e}"),
    }
}

/// Tauri app 启动入口。
pub fn run() {
    env_logger::Builder::from_env(env_logger::Env::default().default_filter_or("info"))
        .format_timestamp_millis()
        .init();

    info!("PomoFlow desktop starting (P1.4 tray + notification + autostart)...");

    // 1. 打开 SQLite(失败就直接 panic —— 桌面端存储是必要前提)。
    //    结构有版本化迁移:执行前先做 .bak 备份(v1 行为对齐)。
    let path = store_path();
    ensure_parent(&path);
    info!("opening store at {}", path.display());
    if migrate::needs_migration(&path) {
        backup_store_file(&path);
    }
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
            commands::complete_task,
            commands::reopen_task,
            commands::list_projects,
            commands::upsert_project,
            commands::delete_project,
            commands::list_tags,
            commands::upsert_tag,
            commands::delete_tag,
            commands::list_tags_for_task,
            commands::set_tags_for_task,
            commands::start_pomodoro,
            commands::stop_pomodoro,
            commands::list_pomodoros,
            commands::get_daily_review,
            commands::upsert_daily_review,
            commands::get_weekly_review,
            commands::upsert_weekly_review,
            commands::get_monthly_review,
            commands::upsert_monthly_review,
            commands::list_subtasks_for_task,
            commands::upsert_subtask,
            commands::delete_subtask,
            commands::list_mottos,
            commands::upsert_motto,
            commands::delete_motto,
            commands::get_notification_template,
            commands::upsert_notification_template,
            commands::today_completed_minutes,
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
