//! 系统通知 —— AUMID 注册 + 自有发送命令。
//!
//! ## 为什么不用插件的 sendNotification
//!
//! Windows toast 的应用签名取自 AUMID(AppUserModelID)的**注册显示名**。
//! `tauri-plugin-notification` 只在安装版路径(可执行文件不在 `target\debug`
//! / `target\release` 下)才给 toast 设置 AUMID(插件 desktop.rs:196-204);
//! dev 模式不设置 → notify-rust 回落到 `Toast::POWERSHELL_APP_ID`,通知
//! 签名显示成"Windows PowerShell"。
//!
//! 修复:启动时把本应用 AUMID(`tauri.conf.json` 的 identifier)的
//! DisplayName 写入 `HKCU\Software\Classes\AppUserModelId\<id>`(Windows 官方
//! 支持的按用户注册方式,免管理员),`send_notification` 命令显式带 AUMID
//! 发送 —— dev 与安装态统一显示"PomoFlow"。非 Windows 平台保持 notify-rust
//! 默认行为(该项目当前只发布 Windows 桌面端)。

use notify_rust::Notification;

/// 应用显示名(通知签名)。与 productName 保持一致。
const DISPLAY_NAME: &str = "PomoFlow";

/// 启动时注册 AUMID 显示名(HKCU,失败仅告警不阻断启动)。
pub fn register_aumid(identifier: &str) {
    #[cfg(windows)]
    {
        use winreg::enums::HKEY_CURRENT_USER;
        use winreg::RegKey;

        let hkcu = RegKey::predef(HKEY_CURRENT_USER);
        let path = format!(r"Software\Classes\AppUserModelId\{identifier}");
        match hkcu.create_subkey(&path) {
            Ok((key, _)) => {
                if let Err(e) = key.set_value("DisplayName", &DISPLAY_NAME) {
                    log::warn!("set AUMID DisplayName failed: {e}");
                }
            }
            Err(e) => log::warn!("create AUMID key failed: {e}"),
        }
    }
    #[cfg(not(windows))]
    let _ = identifier;
}

/// 发送系统通知(前端替代 `@tauri-apps/plugin-notification` 的 sendNotification;
/// 权限查询/请求仍走插件 —— Windows 上恒为已授权)。
#[tauri::command]
pub fn send_notification(app: tauri::AppHandle, title: String, body: String) -> Result<(), String> {
    let identifier = app.config().identifier.clone();
    tauri::async_runtime::spawn(async move {
        let mut notification = Notification::new();
        #[cfg(windows)]
        notification.app_id(&identifier);
        let _ = notification.summary(&title).body(&body).show();
    });
    Ok(())
}
