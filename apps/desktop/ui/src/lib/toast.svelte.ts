//! 轻量 toast 通知(2026-09-15 测试补强批)—— 取代表单内的原生 `alert()`
//! (桌面端观感差,且 alert 阻塞主线程)。
//!
//! 用法:错误路径 `toastError(msg)`;App.svelte 挂一次 `<ToastHost />`。
//! 自动 4 秒消失;同刻最多 3 条,旧的先走。

export interface ToastItem {
  id: number;
  message: string;
  kind: "error" | "info";
}

const state = $state<{ items: ToastItem[] }>({ items: [] });

let nextId = 1;

function push(message: string, kind: ToastItem["kind"]): void {
  const id = nextId++;
  state.items = [...state.items, { id, message, kind }].slice(-3);
  setTimeout(() => {
    state.items = state.items.filter((t) => t.id !== id);
  }, 4000);
}

export function toast(): ToastItem[] {
  return state.items;
}

export function toastError(message: string): void {
  push(message, "error");
}
