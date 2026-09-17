//! Ctrl+滚轮缩放(2026-09-16):webview 层整体等比缩放,px 硬编码也缩放。
//! 依赖 Tauri capability `core:webview:allow-set-webview-zoom`。
//! 快捷键:Ctrl+滚轮 ± / Ctrl+= 放大 / Ctrl+- 缩小 / Ctrl+0 重置。

import { getCurrentWebview } from "@tauri-apps/api/webview";

const KEY = "pomoflow:ui-zoom";
const MIN = 0.6;
const MAX = 2.0;
const STEP = 0.1;

let _zoom = 1;

function clamp(v: number): number {
  return Math.min(MAX, Math.max(MIN, Math.round(v * 10) / 10));
}

async function apply(z: number): Promise<void> {
  _zoom = clamp(z);
  try {
    await getCurrentWebview().setZoom(_zoom);
  } catch {
    // 浏览器 dev 模式无 Tauri webview → 静默
  }
  localStorage.setItem(KEY, String(_zoom));
}

/** 挂载 Ctrl+滚轮 + Ctrl+±/0 键盘监听(App onMount 调用一次)。 */
export function initZoom(): void {
  _zoom = clamp(parseFloat(localStorage.getItem(KEY) ?? "1") || 1);
  apply(_zoom);

  window.addEventListener(
    "wheel",
    (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -STEP : STEP;
      void apply(_zoom + delta);
    },
    { passive: false },
  );

  window.addEventListener(
    "keydown",
    (e: KeyboardEvent) => {
      if (!e.ctrlKey) return;
      if (e.key === "=" || e.key === "+") {
        e.preventDefault();
        void apply(_zoom + STEP);
      } else if (e.key === "-") {
        e.preventDefault();
        void apply(_zoom - STEP);
      } else if (e.key === "0") {
        e.preventDefault();
        void apply(1);
      }
    },
  );
}
