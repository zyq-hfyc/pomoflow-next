//! 随手记(journal)四类常量 —— NotesView 与 JournalEditDialog 共用。
//! emoji 与移动端 JournalKind 展示一一对应(tasks_page kind chips 同表)。

import type { JournalKind } from "./api";

export const JOURNAL_KINDS: readonly JournalKind[] = ["todo", "wish", "plan", "note"] as const;

export const KIND_EMOJI: Record<JournalKind, string> = {
  todo: "☑️",
  wish: "⭐",
  plan: "🗓️",
  note: "✍️",
};
