//! 随手记数据层(2026-09-15 批 4d:自 TasksPage 抽出 store 化)。
//!
//! 页面只消费状态与动作;rev 驱动的重拉仍由页面 effect 触发(保持
//! 「仅 notes 视图才拉」的现有行为,避免 filter 进主 refresh 依赖)。
//! 状态是模块级 $state:切视图/切页不丢(与 timerFilter 单例同型)。

import * as api from "./api";
import type { Journal } from "./api";
import { getDict, fmt } from "./i18n.svelte";
import { toastError } from "./toast.svelte";

const state = $state({
  journals: [] as Journal[],
  loading: true,
  error: null as string | null,
  selected: null as Journal | null,
  creating: false,
});

export function journalsState() {
  return state;
}

/** 登出/换账号时清空(2026-09-15 M4:否则先渲染上一账号的随手记)。 */
export function resetJournals(): void {
  state.journals = [];
  state.loading = true;
  state.error = null;
  state.selected = null;
  state.creating = false;
}

export async function refreshJournals(): Promise<void> {
  try {
    state.journals = await api.listJournals();
    state.error = null;
    if (state.selected) {
      // 同步删掉选中的 → 面板自动回空态(与任务 refresh 同语义)
      state.selected =
        state.journals.find((j) => j.id === state.selected!.id) ?? null;
    }
  } catch (e) {
    state.error = String(e);
  } finally {
    state.loading = false;
  }
}

export function selectJournal(j: Journal): void {
  state.selected = j;
  state.creating = false;
}

export function startNewNote(): void {
  state.selected = null;
  state.creating = true;
}

export function closeNotePanel(): void {
  state.selected = null;
  state.creating = false;
}

export function onNoteCreated(j: Journal): void {
  state.selected = j; // 先同步选中(收窄竞态窗口)
  state.creating = false;
  void refreshJournals();
}

export async function toggleJournalTodo(id: string): Promise<void> {
  try {
    await api.toggleJournal(id);
    await refreshJournals();
  } catch (e) {
    toastError(fmt(getDict().notes.toggleFailed, { err: String(e) }));
  }
}
