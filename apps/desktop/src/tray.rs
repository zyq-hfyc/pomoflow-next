//! 系统托盘 —— Tauri 2 内置 `tray-icon` feature,不依赖 plugin。
//!
//! ## 设计要点
//!
//! - **图标复用窗口默认图标**(`.bundle.icon` 配置那批),不单独搞一份 PNG。
//! - **菜单 2 项**:显示窗口 / 退出。`Quit` 调 `app.exit(0)` 显式退出;
//!   `Show` 找名为 "main" 的窗口 show + focus,找不到就 no-op(便于 P1.4 阶段
//!   先打通链路,后面命令名变了再调)。
//! - **不挂在 `tray_icon` 全局变量上**:Builder 的 `build()` 返回 `TrayIcon`,
//!   Tauri 内部已经常驻不需要用户存。返回 `tauri::Error` 让 setup 阶段失败可见。

use tauri::menu::{Menu, MenuItem};
use tauri::tray::TrayIconBuilder;
use tauri::{App, Manager};

const TRAY_ID: &str = "pomoflow-main";

/// 构造系统托盘 + 右键菜单 + 菜单事件回调。
///
/// 失败时 `expect` 让 panic 浮上去 —— 桌面端托盘是核心功能,启动期失败
/// 比运行期 silent fail 更好排查。
pub fn build(app: &App) -> tauri::Result<()> {
    let show_item = MenuItem::with_id(app, "tray_show", "显示窗口", true, None::<&str>)?;
    let quit_item = MenuItem::with_id(app, "tray_quit", "退出", true, None::<&str>)?;
    let menu = Menu::with_items(app, &[&show_item, &quit_item])?;

    let _tray = TrayIconBuilder::with_id(TRAY_ID)
        .icon(
            app.default_window_icon()
                .cloned()
                .expect("no default window icon configured in tauri.conf.json"),
        )
        .tooltip("PomoFlow")
        .menu(&menu)
        // 左键单击直接显示窗口,不走菜单
        .show_menu_on_left_click(false)
        .on_menu_event(|app, event| match event.id.as_ref() {
            "tray_show" => {
                if let Some(w) = app.get_webview_window("main") {
                    let _ = w.show();
                    let _ = w.set_focus();
                }
            }
            "tray_quit" => {
                app.exit(0);
            }
            _ => {}
        })
        .build(app)?;

    Ok(())
}
