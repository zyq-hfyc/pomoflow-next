/**
 * 任务列表排序比较器 —— 单一来源(2026-09-14 去重批)。
 *
 * 此前五份拷贝:TimerPage 侧栏 / 任务下拉、TasksPage 搜索/主列表、
 * timer.svelte.ts pickNextAutoTask。v1 口径:
 * - 未完成在前(active → completed)
 * - 优先级 high > medium > low > none
 * - created_at 升序(先建的在前)
 */
import type { Task } from "./api";

export const PRIORITY_ORDER: Record<string, number> = {
  high: 0,
  medium: 1,
  low: 2,
  none: 3,
};

/** created_at 升序(先建的在前);缺失按 0。 */
export function createdAsc(a: Task, b: Task): number {
  return (
    new Date(a.created_at ?? 0).getTime() - new Date(b.created_at ?? 0).getTime()
  );
}

/** 优先级 high > medium > low > none → created_at 升序。 */
export function compareByPriorityThenCreated(a: Task, b: Task): number {
  const pa = PRIORITY_ORDER[a.priority ?? "none"] ?? 3;
  const pb = PRIORITY_ORDER[b.priority ?? "none"] ?? 3;
  if (pa !== pb) return pa - pb;
  return createdAsc(a, b);
}

/** 未完成在前 → 优先级 → created_at 升序(v1 列表完整口径)。 */
export function compareByStatusPriorityCreated(a: Task, b: Task): number {
  if (a.status !== b.status) return a.status === "active" ? -1 : 1;
  return compareByPriorityThenCreated(a, b);
}
