//! taskSort 排序比较器单测(测试空白 Top6 补全,2026-10-01)。
//!
//! 这是 5 个消费面(TimerPage 侧栏/任务下拉、TasksPage 搜索/主列表、
//! timer.svelte pickNextAutoTask)的单一来源 —— v1 口径:未完成在前 →
//! 优先级 high>medium>low>none → created_at 升序。比较器语义锁在这里,
//! 消费面只锁「调用了它」。

import { describe, expect, test } from "vitest";
import {
  PRIORITY_ORDER,
  createdAsc,
  compareByPriorityThenCreated,
  compareByStatusPriorityCreated,
} from "./taskSort";
import type { Task } from "./api";

function task(p: Partial<Task> & Pick<Task, "id">): Task {
  return { title: p.id, status: "active", priority: "none", ...p };
}

describe("taskSort · v1 列表排序口径", () => {
  test("PRIORITY_ORDER:high>medium>low>none", () => {
    expect(PRIORITY_ORDER.high).toBeLessThan(PRIORITY_ORDER.medium);
    expect(PRIORITY_ORDER.medium).toBeLessThan(PRIORITY_ORDER.low);
    expect(PRIORITY_ORDER.low).toBeLessThan(PRIORITY_ORDER.none);
  });

  test("createdAsc:先建的在前;created_at 缺失按 0(排最前)", () => {
    const old = task({ id: "old", created_at: "2026-01-01T00:00:00.000Z" });
    const neo = task({ id: "new", created_at: "2026-06-01T00:00:00.000Z" });
    const missing = task({ id: "missing" });
    expect(createdAsc(old, neo)).toBeLessThan(0);
    expect(createdAsc(neo, old)).toBeGreaterThan(0);
    expect(createdAsc(missing, old)).toBeLessThan(0);
  });

  test("compareByPriorityThenCreated:优先级优先,同级比创建时间", () => {
    const highNew = task({ id: "h", priority: "high", created_at: "2026-06-01T00:00:00.000Z" });
    const lowOld = task({ id: "l", priority: "low", created_at: "2026-01-01T00:00:00.000Z" });
    // 低优先级再老也排不到高优先级前
    expect(compareByPriorityThenCreated(highNew, lowOld)).toBeLessThan(0);
    const oldFirst = task({ id: "o", priority: "high", created_at: "2026-01-01T00:00:00.000Z" });
    expect(compareByPriorityThenCreated(oldFirst, highNew)).toBeLessThan(0);
  });

  test("未知/缺省优先级按 none(3)处理", () => {
    const none = task({ id: "n", priority: "none", created_at: "2026-01-01T00:00:00.000Z" });
    const missing = task({ id: "m", priority: undefined, created_at: "2026-06-01T00:00:00.000Z" });
    // 同档(都按 3)→ 比创建时间
    expect(compareByPriorityThenCreated(none, missing)).toBeLessThan(0);
  });

  test("compareByStatusPriorityCreated:未完成永远在完成前(与优先级无关)", () => {
    const doneHigh = task({ id: "done", status: "completed", priority: "high" });
    const activeNone = task({ id: "act", status: "active", priority: "none" });
    expect(compareByStatusPriorityCreated(activeNone, doneHigh)).toBeLessThan(0);
    expect(compareByStatusPriorityCreated(doneHigh, activeNone)).toBeGreaterThan(0);
  });

  test("Array.sort 集成:完整口径排序", () => {
    const list = [
      task({ id: "done-high", status: "completed", priority: "high", created_at: "2026-01-01T00:00:00.000Z" }),
      task({ id: "act-none", priority: "none", created_at: "2026-01-03T00:00:00.000Z" }),
      task({ id: "act-high-new", priority: "high", created_at: "2026-01-02T00:00:00.000Z" }),
      task({ id: "act-high-old", priority: "high", created_at: "2026-01-01T00:00:00.000Z" }),
    ];
    list.sort(compareByStatusPriorityCreated);
    expect(list.map((t) => t.id)).toEqual([
      "act-high-old",
      "act-high-new",
      "act-none",
      "done-high",
    ]);
  });
});
