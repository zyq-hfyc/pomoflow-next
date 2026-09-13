//! sortJournals 排序规则单测(待办勾选批 2026-09-13)。
//!
//! 规则:未完成在前、已完成沉底;两组内各自 created_at 倒序。
//! NotesView 的卡片列表顺序完全由这个纯函数决定 —— 组件测试只锁
//! 「渲染到了对的 class / 调了对的命令」,排序细节锁在这里。

import { describe, expect, test } from "vitest";
import { sortJournals } from "./journalKinds";
import type { Journal } from "./api";

function journal(p: Partial<Journal> & Pick<Journal, "id">): Journal {
  return { kind: "todo", title: "", content: "", tags: [], status: "active", ...p };
}

describe("sortJournals · 完成沉底排序", () => {
  test("已完成沉底;未完成组内 created_at 倒序", () => {
    const sorted = sortJournals([
      journal({ id: "done", status: "completed", created_at: "2026-09-13T10:00:00.000Z" }),
      journal({ id: "old", created_at: "2026-09-12T10:00:00.000Z" }),
      journal({ id: "new", created_at: "2026-09-13T09:00:00.000Z" }),
    ]);
    // new > old(未完成组倒序),done 无论多新都沉底
    expect(sorted.map((j) => j.id)).toEqual(["new", "old", "done"]);
  });

  test("已完成组内同样 created_at 倒序", () => {
    const sorted = sortJournals([
      journal({ id: "done-old", status: "completed", created_at: "2026-09-12T10:00:00.000Z" }),
      journal({ id: "done-new", status: "completed", created_at: "2026-09-13T10:00:00.000Z" }),
      journal({ id: "active", created_at: "2026-09-11T10:00:00.000Z" }),
    ]);
    expect(sorted.map((j) => j.id)).toEqual(["active", "done-new", "done-old"]);
  });

  test("status 缺省(wish/plan/note 老数据)按未完成处理,不沉底", () => {
    const sorted = sortJournals([
      journal({ id: "done", status: "completed", created_at: "2026-09-13T10:00:00.000Z" }),
      journal({ id: "wish", kind: "wish", status: undefined, created_at: "2026-09-12T10:00:00.000Z" }),
    ]);
    expect(sorted.map((j) => j.id)).toEqual(["wish", "done"]);
  });

  test("不修改原数组(返回新副本,输入顺序原样保留)", () => {
    const input = [
      journal({ id: "a", status: "completed" }),
      journal({ id: "b" }),
    ];
    sortJournals(input);
    expect(input.map((j) => j.id)).toEqual(["a", "b"]);
  });
});
