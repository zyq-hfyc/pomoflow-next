//! journalsStore 状态机单测(测试空白 Top6 补全,2026-10-01)。
//!
//! 随手记数据层(批 4d 自 TasksPage 抽出的模块级 $state 单例)。锁定:
//! refresh 成功/失败两路径、选中项随重拉的保留/回空、面板三态互斥、
//! onNoteCreated 先选中再重拉、toggle 失败走 toast 不炸状态。
//! api 层整体 mock(i18n/toast 用真实模块 —— 顺带覆盖集成)。

import { beforeEach, describe, expect, test, vi } from "vitest";
import type { Journal } from "./api";

vi.mock("./api", () => ({
  listJournals: vi.fn(),
  toggleJournal: vi.fn(),
}));

import * as api from "./api";
import {
  journalsState,
  resetJournals,
  refreshJournals,
  selectJournal,
  startNewNote,
  closeNotePanel,
  onNoteCreated,
  toggleJournalTodo,
} from "./journalsStore.svelte";
import { toast } from "./toast.svelte";

const listJournals = vi.mocked(api.listJournals);
const toggleJournal = vi.mocked(api.toggleJournal);

function journal(p: Partial<Journal> & Pick<Journal, "id">): Journal {
  return { kind: "note", title: "", content: "", tags: [], status: "active", ...p };
}

describe("journalsStore · 状态机", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetJournals(); // 模块单例清场
    toast().splice(0);
  });

  test("refresh 成功:填充列表、清错误、loading 落地", async () => {
    listJournals.mockResolvedValue([journal({ id: "j1" })]);
    await refreshJournals();
    const s = journalsState();
    expect(s.journals.map((j) => j.id)).toEqual(["j1"]);
    expect(s.error).toBeNull();
    expect(s.loading).toBe(false);
  });

  test("refresh:选中项仍在 → 保留;被删 → 自动回空态", async () => {
    listJournals.mockResolvedValue([journal({ id: "j1" }), journal({ id: "j2" })]);
    await refreshJournals();
    selectJournal(journalsState().journals[0]);

    await refreshJournals();
    expect(journalsState().selected?.id).toBe("j1");

    listJournals.mockResolvedValue([journal({ id: "j2" })]);
    await refreshJournals();
    expect(journalsState().selected).toBeNull();
  });

  test("refresh 失败:error 记录、旧列表保留、loading 落地", async () => {
    listJournals.mockResolvedValue([journal({ id: "j1" })]);
    await refreshJournals();
    listJournals.mockRejectedValue(new Error("boom"));
    await refreshJournals();
    const s = journalsState();
    expect(s.error).toContain("boom");
    expect(s.journals).toHaveLength(1);
    expect(s.loading).toBe(false);
  });

  test("面板三态:select/startNew/close 互斥转换", () => {
    startNewNote();
    expect(journalsState().creating).toBe(true);
    expect(journalsState().selected).toBeNull();

    selectJournal(journal({ id: "j1" }));
    expect(journalsState().creating).toBe(false);
    expect(journalsState().selected?.id).toBe("j1");

    startNewNote();
    expect(journalsState().selected).toBeNull();
    expect(journalsState().creating).toBe(true);

    closeNotePanel();
    expect(journalsState().creating).toBe(false);
    expect(journalsState().selected).toBeNull();
  });

  test("onNoteCreated:先同步选中(收窄竞态)再触发重拉", async () => {
    listJournals.mockResolvedValue([journal({ id: "j1" })]);
    onNoteCreated(journal({ id: "j1" }));
    // 同步部分立即生效
    expect(journalsState().selected?.id).toBe("j1");
    expect(journalsState().creating).toBe(false);
    // void refresh 异步收尾
    await vi.waitFor(() => expect(listJournals).toHaveBeenCalled());
  });

  test("toggleJournalTodo:调命令并重拉;失败 → toast 报错,状态不炸", async () => {
    toggleJournal.mockResolvedValue(journal({ id: "j1", status: "completed" }));
    listJournals.mockResolvedValue([]);
    await toggleJournalTodo("j1");
    expect(toggleJournal).toHaveBeenCalledWith("j1");
    expect(listJournals).toHaveBeenCalled();

    toggleJournal.mockRejectedValueOnce(new Error("flip boom"));
    await toggleJournalTodo("j1");
    expect(toast().map((t) => t.message).join()).toContain("flip boom");
    expect(journalsState().error).toBeNull(); // error 字段不被 toggle 污染
  });
});
