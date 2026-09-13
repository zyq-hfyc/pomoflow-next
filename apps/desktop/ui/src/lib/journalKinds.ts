//! 随手记(journal)四类常量 + 列表排序 + 日期格式化 —— NotesView 与
//! NoteDetailPanel 共用。emoji 与移动端 JournalKind 展示一一对应
//! (tasks_page kind chips 同表)。

import type { Journal, JournalKind } from "./api";

export const JOURNAL_KINDS: readonly JournalKind[] = ["todo", "wish", "plan", "note"] as const;

export const KIND_EMOJI: Record<JournalKind, string> = {
  todo: "☑️",
  wish: "⭐",
  plan: "🗓️",
  note: "✍️",
};

/// created_at ISO → 本地化日期(年/月/日);无效/缺省 → 空串。
/// 从 NotesView 卡片日期与 NoteDetailPanel 元信息行共用。
export function fmtJournalDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

/// 待办勾选批(2026-09-13)的列表排序:未完成在前、已完成沉底,
/// 两组内各自 created_at 倒序(命令层 list_journals 本身就是倒序,
/// Array.prototype.sort 稳定 → 同组相对顺序不变)。
///
/// 完成语义只属于 todo,但排序对四类统一执行:wish/plan/note 的 status
/// 恒为 active(缺省同视 active),天然落未完成组,不受影响。
export function sortJournals(journals: readonly Journal[]): Journal[] {
  const isDone = (j: Journal): boolean => j.status === "completed";
  const createdMs = (j: Journal): number => new Date(j.created_at ?? 0).getTime();
  return [...journals].sort((a, b) => {
    if (isDone(a) !== isDone(b)) return isDone(a) ? 1 : -1;
    return createdMs(b) - createdMs(a);
  });
}
