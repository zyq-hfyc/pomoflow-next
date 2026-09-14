//! TaskDetailPanel 草稿/删除交互测试(2026-09-14 优化批)。
//!
//! 锁:
//! ① refresh 回灌同 id 新对象(后台同步重拉)→ 正在编辑的草稿保留;
//!    旧实现按对象引用重置草稿,auto-sync 一到就把编辑中内容静默清空;
//! ② 切换不同 id 任务 → 草稿重置为新任务值(合法重置路径不被误伤);
//! ③ 删除两步确认:一击武装 + 零调用,二击执行 deleteTask + onClose;
//!    切换任务解除武装,前一任务的确认态不带到下一任务。

import { describe, expect, test, beforeEach, afterEach, vi } from "vitest";
import { flushSync, mount, unmount } from "svelte";

vi.mock("../../lib/api", () => ({
  upsertTask: vi.fn(),
  deleteTask: vi.fn(),
  listTagsForTask: vi.fn(async () => []),
  setTagsForTask: vi.fn(async () => []),
  listSubtasksForTask: vi.fn(async () => []),
  upsertSubtask: vi.fn(),
  deleteSubtask: vi.fn(),
  onAutoSync: vi.fn(async () => () => {}),
}));

import * as api from "../../lib/api";
import type { Task } from "../../lib/api";
import { markSyncDone } from "../../lib/syncState.svelte";
import Harness from "./TaskDetailPanel.test-harness.svelte";

function task(p: Partial<Task> & Pick<Task, "id">): Task {
  return {
    title: "",
    status: "active",
    priority: "none",
    repeat: "none",
    reminder: "none",
    completed_pomodoros: 0,
    estimated_pomodoros: 1,
    ...p,
  } as Task;
}

let mounted: Record<string, unknown> | null = null;
let target: HTMLElement;

type SetTaskFn = (
  t: Task,
  hooks?: { onClose?: () => void; onChanged?: () => void },
) => void;

function renderWith(t: Task): { setTask: SetTaskFn; onClose: ReturnType<typeof vi.fn>; onChanged: ReturnType<typeof vi.fn> } {
  target = document.createElement("div");
  document.body.appendChild(target);
  const onClose = vi.fn();
  const onChanged = vi.fn();
  mounted = mount(Harness, { target }) as Record<string, unknown>;
  const setTask = mounted!.setTask as SetTaskFn;
  setTask(t, { onClose, onChanged });
  flushSync();
  return { setTask, onClose, onChanged };
}

async function settle(): Promise<void> {
  await new Promise((r) => setTimeout(r, 0));
  flushSync();
}

function titleInput(): HTMLInputElement {
  return target.querySelector(".title-input") as HTMLInputElement;
}
function delBtn(): HTMLElement {
  return target.querySelector(".del-btn") as HTMLElement;
}

/// 模拟用户在标题输入框打字(IME 组合中,未 blur → 草稿态)
function typeTitle(value: string) {
  titleInput().value = value;
  titleInput().dispatchEvent(new Event("input", { bubbles: true }));
  flushSync();
}

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  if (mounted) unmount(mounted);
  mounted = null;
  document.body.innerHTML = "";
});

describe("TaskDetailPanel · 草稿与删除(2026-09-14 优化批)", () => {
  test("refresh 回灌同 id 新对象 → 正在编辑的草稿保留", async () => {
    const { setTask } = renderWith(task({ id: "t1", title: "旧标题", description: "旧描述" }));
    flushSync();
    typeTitle("改了一半的标题");
    // 后台同步重拉:同 id、内容已变的新对象(旧实现会把草稿重置成远端值)
    setTask(task({ id: "t1", title: "远端新标题", description: "远端新描述" }));
    flushSync();
    expect(titleInput().value).toBe("改了一半的标题");
    expect(api.upsertTask).not.toHaveBeenCalled();
  });

  test("切换到不同 id 的任务 → 草稿重置为新任务值", async () => {
    const { setTask } = renderWith(task({ id: "t1", title: "任务一" }));
    flushSync();
    typeTitle("任务一的编辑");
    setTask(task({ id: "t2", title: "任务二" }));
    flushSync();
    expect(titleInput().value).toBe("任务二");
  });

  test("切换任务后删除武装解除(确认态不带过)", async () => {
    const { setTask } = renderWith(task({ id: "t1", title: "A" }));
    flushSync();
    delBtn().click();
    flushSync();
    expect(delBtn().classList.contains("armed")).toBe(true);
    setTask(task({ id: "t2", title: "B" }));
    flushSync();
    expect(delBtn().classList.contains("armed")).toBe(false);
    expect(api.deleteTask).not.toHaveBeenCalled();
  });

  test("删除两步:一击 armed + 零调用,二击 deleteTask + onClose", async () => {
    const { onClose, onChanged } = renderWith(task({ id: "t1", title: "待删" }));
    flushSync();
    delBtn().click();
    flushSync();
    expect(delBtn().classList.contains("armed")).toBe(true);
    expect(api.deleteTask).not.toHaveBeenCalled();
    delBtn().click();
    flushSync();
    await settle();
    expect(api.deleteTask).toHaveBeenCalledWith("t1");
    expect(onClose).toHaveBeenCalled();
    expect(onChanged).toHaveBeenCalled();
  });

  test("同步落库(rev bump)→ 标签/子任务重拉(面板数据不陈旧)", async () => {
    renderWith(task({ id: "t1", title: "A" }));
    flushSync();
    await settle();
    expect(api.listTagsForTask).toHaveBeenCalledTimes(1);
    expect(api.listSubtasksForTask).toHaveBeenCalledTimes(1);
    // 模拟同步引擎落库后 bump rev(markSyncDone = 手动同步成功路径)
    markSyncDone();
    flushSync();
    await settle();
    expect(api.listTagsForTask).toHaveBeenCalledTimes(2);
    expect(api.listSubtasksForTask).toHaveBeenCalledTimes(2);
  });
});
