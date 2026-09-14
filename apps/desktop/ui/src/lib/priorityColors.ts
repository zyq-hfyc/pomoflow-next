/**
 * 优先级色点 —— 单一来源(2026-09-14 去重批)。
 *
 * 此前四份拷贝 fallback 已实际漂移:`none` 三种写法(--color-priority-low /
 * --color-text-muted / --color-neutral-400)、`low` 两种 fallback hex。
 * 以 v1 对齐的两份(TimerRightSidebar / TaskSelector)为准:high/medium/low
 * 走 priority 主题变量,`none` 走 text-muted。
 */
export const PRIORITY_COLOR: Record<string, string> = {
  high: "var(--color-priority-high, #c97b6e)",
  medium: "var(--color-priority-medium, #d4a373)",
  low: "var(--color-priority-low, #9ca3af)",
  none: "var(--color-text-muted, #9ca3af)",
};

/** 任意脏值兜底到 none 色(不抛错、不返回 undefined)。 */
export function priorityColor(priority?: string | null): string {
  return PRIORITY_COLOR[priority ?? "none"] ?? PRIORITY_COLOR.none;
}
