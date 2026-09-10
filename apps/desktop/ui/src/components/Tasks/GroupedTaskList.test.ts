import { describe, expect, test, afterEach } from "vitest";
import { flushSync, mount, unmount } from "svelte";
import Harness from "./GroupedTaskList.test-harness.svelte";
import type { Task } from "../../lib/api";

/// 跳转定位回归锁(2026-09-10)。
///
/// 背景:GroupedTaskList 的 `expandKey`(跳转定位强制展开折叠组)由一个
/// `$effect` 消费。它曾经**读 `collapsed` 又写 `collapsed`**(每次
/// `new Set(...)` → 引用必变),`expandKey` 一旦非 null 就自激不收敛;
/// Svelte 5 抛 `effect_update_depth_exceeded` 并**中断整批 flush**,
/// 整个任务页从此不再重绘 —— 用户现象是「跳转模板 A 后,再点任何
/// 任务都不被选中、右栏详情不刷新,直到重启」。
///
/// 所以本文件的核心是:**只要 `expandKey` 非 null,装配就必须能正常
/// 完成渲染**。这是一条"回归即炸"的锁 —— 旧实现下 mount/flush 会直接
/// 抛错,不需要任何额外断言技巧。

type T = Task & { tags?: never[] };

const GROUP = "2026-09-10";

const tasks: T[] = [
  {
    id: "tpl-a",
    title: "重复模板A",
    status: "active",
    due_date: GROUP,
    repeat: "weekdays",
  } as T,
  { id: "b", title: "普通任务B", status: "active", due_date: GROUP } as T,
  { id: "c", title: "明天的任务C", status: "active", due_date: "2026-09-11" } as T,
];

let mounted: Record<string, unknown> | null = null;

function render() {
  const target = document.createElement("div");
  document.body.appendChild(target);
  mounted = mount(Harness, { target, props: { tasks } }) as Record<string, unknown>;
  flushSync();
  return target;
}

afterEach(() => {
  if (mounted) unmount(mounted);
  mounted = null;
  document.body.innerHTML = "";
});

describe("GroupedTaskList · expandKey(跳转定位强制展开)", () => {
  test("expandKey 非 null 时渲染不炸(旧实现会 effect 自激中断 flush)", () => {
    const target = render();
    (mounted!.setExpandKey as (k: string | null) => void)(GROUP);

    // 旧实现:这一步的 flush 会抛 effect_update_depth_exceeded。
    expect(() => flushSync()).not.toThrow();

    // 渲染确实完成(不是"吞了错误但白屏")。
    expect(target.textContent).toContain("重复模板A");
    expect(target.textContent).toContain("普通任务B");
    // 且之后状态还能继续更新 —— 这正是用户那次"界面冻住"的反面。
    const cardB = [...target.querySelectorAll(".task-card")].find((el) =>
      el.textContent?.includes("普通任务B"),
    );
    expect(cardB).toBeTruthy();
    (cardB as HTMLElement).click();
    flushSync();
    expect(
      [...target.querySelectorAll(".task-card")].find((el) =>
        el.textContent?.includes("普通任务B"),
      )?.className,
    ).toContain("selected");
  });

  test("expandKey 指向的折叠组被展开", () => {
    const target = render();
    const header = target.querySelector(".group-header") as HTMLElement;

    // 先手动折叠该组
    header.click();
    flushSync();
    expect(target.textContent).not.toContain("重复模板A");

    // 跳转定位 → 强制展开
    (mounted!.setExpandKey as (k: string | null) => void)(GROUP);
    flushSync();
    expect(target.textContent).toContain("重复模板A");
  });

  test("跳转之后再手动折叠,不会被 effect 立刻弹开", () => {
    const target = render();
    (mounted!.setExpandKey as (k: string | null) => void)(GROUP);
    flushSync();

    const header = target.querySelector(".group-header") as HTMLElement;
    header.click();
    flushSync();

    // expandKey 没变 → effect 不重跑;用户的折叠意图被尊重。
    expect(target.textContent).not.toContain("重复模板A");
  });
});
