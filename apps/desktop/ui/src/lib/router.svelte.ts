//! Hash-based router —— 无外部依赖,Svelte 5 runes 模块态。
//!
//! 设计要点:
//! - 路由形态:`#/timer`、`#/tasks`、`#/stats`、`#/journal`、`#/settings`
//! - `currentRoute()` 是 reactive getter;在 template / `$derived` 里调用会被追踪。
//! - `navigate(path)` 只改 hash,`hashchange` 事件统一回写到 `_current`。
//! - SSR 不支持(WebView SPA),直接读 `window.location`。
//! - 默认路由 `/timer`,首次进入无 hash 时落默认。
//!
//! 后续若路由参数复杂化(query string / path params),在此文件内扩展,
//! 调用方零改动。

const DEFAULT_ROUTE = "/timer";

function parseHash(): string {
  const raw = window.location.hash;
  const path = raw.startsWith("#") ? raw.slice(1) : raw;
  if (!path || path === "/") return DEFAULT_ROUTE;
  return path;
}

let _current = $state<string>(parseHash());
let _initialized = false;

function ensureInit() {
  if (_initialized || typeof window === "undefined") return;
  _initialized = true;
  window.addEventListener("hashchange", () => {
    _current = parseHash();
  });
}

ensureInit();

/// 当前路由(响应式)。在 Svelte template / `$derived` / `$effect` 中读取会自动追踪。
export function currentRoute(): string {
  return _current;
}

/// 跳转到指定路径(只改 hash,触发 hashchange 自循环)。
export function navigate(path: string) {
  if (window.location.hash === `#${path}`) {
    // 已经是目标路径 → 强制刷新一次(repaint 场景需要)
    _current = path;
    return;
  }
  window.location.hash = path;
}

/// 已注册路由表(供导航栏渲染与类型约束)。
export const ROUTES = [
  { path: "/timer", label: "番茄钟" },
  { path: "/tasks", label: "任务" },
  { path: "/stats", label: "统计" },
  { path: "/journal", label: "手账" },
  { path: "/settings", label: "设置" },
] as const;

export type RoutePath = (typeof ROUTES)[number]["path"];