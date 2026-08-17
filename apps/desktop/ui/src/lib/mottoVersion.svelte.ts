//! 自定义名言版本号 —— 设置页增删名言后 bump,番茄钟页 MottoCard 监听重拉。
//!
//! v1 用 `window.dispatchEvent(new Event('storage'))` 广播(v1 MottoManager.tsx:26,32
//! + MottoCard.tsx:30-35 监听)。Tauri 单 WebView 里 storage 事件不可靠,
//! 用模块级 $state 计数器实现同一语义。

export const mottoVersion = $state({ n: 0 });

export function bumpMottoVersion(): void {
  mottoVersion.n += 1;
}
