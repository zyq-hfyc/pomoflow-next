//! projectTree 三函数单测(测试空白 Top6 补全,2026-10-01)。
//!
//! projectTreeOptions:TaskForm/TaskDetailPanel 下拉平铺(DFS + 缩进 +
//! 父节点 disabled);buildProjectTree:侧栏/设置页树(同父按
//! display_order 排序);flattenProjectTree:expanded 集控制的可见序列。
//! 全部纯函数,树语义锁在这里,组件测试只锁渲染。

import { describe, expect, test } from "vitest";
import {
  projectTreeOptions,
  buildProjectTree,
  flattenProjectTree,
} from "./projectTree";
import type { Project } from "./api";

function proj(p: Partial<Project> & Pick<Project, "id" | "name">): Project {
  return { color: "", parent_id: null, display_order: 0, ...p };
}

// 三层树:root-A(dis 2) > child-A1(dis 2) > leaf-gc;root-A > child-A2(dis 1);
// root-B(dis 1)。另加孤儿(父 id 不存在,按根处理)。
function fixture(): Project[] {
  return [
    proj({ id: "rootA", name: "A", display_order: 2 }),
    proj({ id: "childA1", name: "A1", parent_id: "rootA", display_order: 2 }),
    proj({ id: "gc", name: "A1a", parent_id: "childA1", display_order: 1 }),
    proj({ id: "childA2", name: "A2", parent_id: "rootA", display_order: 1 }),
    proj({ id: "rootB", name: "B", display_order: 1 }),
    proj({ id: "orphan", name: "孤儿", parent_id: "ghost" }),
  ];
}

describe("projectTreeOptions · 下拉平铺(TaskForm 语义)", () => {
  test("DFS 先序 + depth 缩进层级", () => {
    const opts = projectTreeOptions(fixture());
    const byId = Object.fromEntries(opts.map((o) => [o.id, o]));
    expect(byId.rootA.depth).toBe(0);
    expect(byId.childA1.depth).toBe(1);
    expect(byId.gc.depth).toBe(2);
    // DFS:gc 紧跟 childA1,childA2 在子树之后
    const ids = opts.map((o) => o.id);
    expect(ids.indexOf("gc")).toBe(ids.indexOf("childA1") + 1);
    expect(ids.indexOf("childA2")).toBeGreaterThan(ids.indexOf("gc"));
  });

  test("有子清单的父节点 disabled(任务只能挂叶子)", () => {
    const opts = projectTreeOptions(fixture());
    const byId = Object.fromEntries(opts.map((o) => [o.id, o]));
    expect(byId.rootA.disabled).toBe(true);
    expect(byId.childA1.disabled).toBe(true);
    expect(byId.gc.disabled).toBe(false);
    expect(byId.childA2.disabled).toBe(false);
    expect(byId.rootB.disabled).toBe(false);
  });

  test("父 id 不存在的孤儿按根节点处理(不丢)", () => {
    const opts = projectTreeOptions(fixture());
    const orphan = opts.find((o) => o.id === "orphan");
    expect(orphan).toBeDefined();
    expect(orphan!.depth).toBe(0);
  });
});

describe("buildProjectTree · 同父 display_order 排序", () => {
  test("根与子层都按 display_order 升序", () => {
    const tree = buildProjectTree(fixture());
    // 根层:rootB(1) 在 rootA(2) 前;孤儿 display_order 0 最前
    expect(tree.map((n) => n.id)).toEqual(["orphan", "rootB", "rootA"]);
    const rootA = tree.find((n) => n.id === "rootA")!;
    // 子层:childA2(1) 在 childA1(2) 前
    expect(rootA.children.map((n) => n.id)).toEqual(["childA2", "childA1"]);
    expect(rootA.children[1].children.map((n) => n.id)).toEqual(["gc"]);
  });

  test("display_order 并列 → created_at → id 兜底稳定", () => {
    const tree = buildProjectTree([
      proj({ id: "b", name: "b", display_order: 1, created_at: "2026-01-02T00:00:00.000Z" }),
      proj({ id: "a", name: "a", display_order: 1, created_at: "2026-01-01T00:00:00.000Z" }),
      proj({ id: "c", name: "c", display_order: 1, created_at: "2026-01-01T00:00:00.000Z" }),
    ]);
    // a/c created 并列 → id 字母序
    expect(tree.map((n) => n.id)).toEqual(["a", "c", "b"]);
  });

  test("depth 标注:根 0,逐层 +1", () => {
    const tree = buildProjectTree(fixture());
    const rootA = tree.find((n) => n.id === "rootA")!;
    expect(rootA.depth).toBe(0);
    expect(rootA.children[0].depth).toBe(1);
    expect(rootA.children[1].children[0].depth).toBe(2);
  });
});

describe("flattenProjectTree · expanded 集控制可见性", () => {
  test("全折叠:只见根;展开的子树才现身", () => {
    const tree = buildProjectTree(fixture());
    const collapsed = flattenProjectTree(tree, new Set());
    expect(collapsed.map((n) => n.id)).toEqual(["orphan", "rootB", "rootA"]);

    const openA = flattenProjectTree(tree, new Set(["rootA"]));
    // rootA 展开 → 直接子层可见;gc 的父 childA1 未展开 → gc 不可见
    expect(openA.map((n) => n.id)).toEqual([
      "orphan",
      "rootB",
      "rootA",
      "childA2",
      "childA1",
    ]);

    const openAll = flattenProjectTree(tree, new Set(["rootA", "childA1"]));
    expect(openAll.map((n) => n.id)).toEqual([
      "orphan",
      "rootB",
      "rootA",
      "childA2",
      "childA1",
      "gc",
    ]);
  });

  test("展开叶子节点无副作用(无子不展开)", () => {
    const tree = buildProjectTree(fixture());
    const out = flattenProjectTree(tree, new Set(["gc", "childA2"]));
    expect(out.map((n) => n.id)).toEqual(["orphan", "rootB", "rootA"]);
  });
});
