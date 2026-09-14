//! priorityColors / taskSort 单一来源测试(2026-09-14 去重批)。
//!
//! 锁:脏值兜底(不抛错、不 undefined)+ 三个比较器的完整 v1 口径。

import { describe, expect, test } from "vitest";

import { priorityColor } from "./priorityColors";
import {
  compareByPriorityThenCreated,
  compareByStatusPriorityCreated,
} from "./taskSort";
import type { Task } from "./api";

function task(p: Partial<Task> & Pick<Task, "id">): Task {
  return {
    title: "",
    status: "active",
    priority: "none",
    ...p,
  } as Task;
}

describe("priorityColor", () => {
  test("四档映射到主题变量", () => {
    expect(priorityColor("high")).toContain("--color-priority-high");
    expect(priorityColor("medium")).toContain("--color-priority-medium");
    expect(priorityColor("low")).toContain("--color-priority-low");
    expect(priorityColor("none")).toContain("--color-text-muted");
  });

  test("脏值(undefined/null/未知串)兜底到 none 色,不抛错", () => {
    const none = priorityColor("none");
    expect(priorityColor(undefined)).toBe(none);
    expect(priorityColor(null)).toBe(none);
    expect(priorityColor("bogus")).toBe(none);
  });
});

describe("compareByStatusPriorityCreated(v1 列表完整口径)", () => {
  test("未完成在前,同状态按优先级,同优先级按创建时间升序", () => {
    const done = task({ id: "done", status: "completed", priority: "high" });
    const lowOld = task({
      id: "low-old",
      priority: "low",
      created_at: "2026-01-01T00:00:00Z",
    });
    const lowNew = task({
      id: "low-new",
      priority: "low",
      created_at: "2026-02-01T00:00:00Z",
    });
    const high = task({
      id: "high",
      priority: "high",
      created_at: "2026-03-01T00:00:00Z",
    });
    const sorted = [lowNew, done, high, lowOld].sort(
      compareByStatusPriorityCreated,
    );
    expect(sorted.map((t) => t.id)).toEqual(["high", "low-old", "low-new", "done"]);
  });

  test("脏优先级按 none 档处理,不抛错", () => {
    const dirty = task({ id: "dirty", priority: "bogus" as Task["priority"] });
    const none = task({ id: "none" });
    expect(
      [none, dirty].sort(compareByStatusPriorityCreated).map((t) => t.id),
    ).toEqual(["none", "dirty"]); // 同档 → created_at 缺省相等 → 稳定序保原序
  });
});

describe("compareByPriorityThenCreated", () => {
  test("不区分完成态,仅优先级 → 创建时间", () => {
    const doneHigh = task({
      id: "done-high",
      status: "completed",
      priority: "high",
    });
    const activeLow = task({ id: "active-low", priority: "low" });
    const sorted = [activeLow, doneHigh].sort(compareByPriorityThenCreated);
    expect(sorted.map((t) => t.id)).toEqual(["done-high", "active-low"]);
  });
});
