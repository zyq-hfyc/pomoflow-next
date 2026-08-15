//! PomoFlow 桌面端核心逻辑。
//!
//! 当前阶段 P1.1:仅 `run()` 启动 Tauri app,不做任何业务。
//! 后续 P1.2 起:`register_commands` 注册 Store trait 桥接、`setup` 里初始化 SQLite 连接。

use log::info;

pub mod store_sqlite;

/// Tauri app 启动入口。
///
/// P1.1 阶段:仅打日志 + 启动。P1.2 起会在这里初始化持久化层 + 注册 commands。
pub fn run() {
    // 日志初始化(后续 Store impl / commands 都靠它打日志)
    env_logger::Builder::from_env(env_logger::Env::default().default_filter_or("info"))
        .format_timestamp_millis()
        .init();

    info!("PomoFlow desktop starting (P1.1 scaffold)...");

    tauri::Builder::default()
        .setup(|_app| {
            info!("Tauri app setup complete, opening window...");
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running PomoFlow desktop");
}
