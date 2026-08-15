//! PomoFlow 桌面端入口。
//!
//! 当前阶段 P1.1:只启动 Tauri app + 加载 Svelte 5 UI 显示 "Hello PomoFlow"。
//! 后续 P1.2 / P1.3 / P1.4 阶段在这里接 store_sqlite、commands、托盘等。
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    pomoflow_desktop_lib::run();
}
