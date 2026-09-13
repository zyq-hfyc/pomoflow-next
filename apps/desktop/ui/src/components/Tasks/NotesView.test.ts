//! NotesView 展示组件测试(2026-09-13 面板化批重写)。
//!
//! 面板化后 NotesView 退化为纯展示组件:journals 经 props 灌入,不再自拉
//! (api 只剩 type-only import,编译期擦除,故**不需要 vi.mock**)。
//!
//! 锁:
//! ① journals prop 渲染卡片;todo 卡有勾选框,wish 卡没有;
//! ② 完成的 todo 沉底 + 标题带 done 划线 class(排序细节由 journalKinds.test.ts 锁);
//! ③ 点卡片 → onSelect(该 journal);selectedId 匹配卡高亮;
//! ④ 点勾选框 → onToggleTodo(id) 且不触发 onSelect(stopPropagation);
//! ⑤ 点「新建」→ onNew;error prop 渲染 alert,× → onClearError。

import { describe, expect, test, beforeEach, vi } from "vitest";
import { flushSync, mount } from "svelte";

import type { Journal } from "../../lib/api";
import NotesView from "./NotesView.svelte";

function journal(p: Partial<Journal> & Pick<Journal, "id">): Journal {
  return { kind: "todo", title: "", content: "", tags: [], status: "active", ...p };
}

interface Harness {
  target: HTMLElement;
  onSelect: ReturnType<typeof vi.fn>;
  onNew: ReturnType<typeof vi.fn>;
  onToggleTodo: ReturnType<typeof vi.fn>;
  onClearError: ReturnType<typeof vi.fn>;
}

type Props = {
  journals: Journal[];
  loading: boolean;
  error: string | null;
  selectedId: string | null;
  onSelect: (j: Journal) => void;
  onNew: () => void;
  onToggleTodo: (id: string) => void;
  onClearError: () => void;
};

function render(init: Partial<Props> = {}): Harness {
  const target = document.createElement("div");
  document.body.appendChild(target);
  const onSelect = vi.fn();
  const onNew = vi.fn();
  const onToggleTodo = vi.fn();
  const onClearError = vi.fn();
  const props: Props = {
    journals: [],
    loading: false,
    error: null,
    selectedId: null,
    onSelect,
    onNew,
    onToggleTodo,
    onClearError,
    ...init,
  };
  mount(NotesView, { target, props });
  flushSync();
  return { target, onSelect, onNew, onToggleTodo, onClearError };
}

function cardOf(target: HTMLElement, text: string): HTMLElement {
  const card = [...target.querySelectorAll(".card")].find((el) =>
    el.textContent?.includes(text),
  );
  expect(card, `应存在包含「${text}」的卡片`).toBeTruthy();
  return card as HTMLElement;
}

beforeEach(() => {
  document.body.innerHTML = "";
});

describe("NotesView · 展示组件", () => {
  test("渲染卡片;todo 有勾选框,wish 没有", () => {
    const { target } = render({
      journals: [
        journal({ id: "t1", kind: "todo", title: "待办事项" }),
        journal({ id: "w1", kind: "wish", title: "愿望清单" }),
      ],
    });
    expect(cardOf(target, "待办事项").querySelector(".checkbox")).toBeTruthy();
    expect(cardOf(target, "愿望清单").querySelector(".checkbox")).toBeNull();
  });

  test("完成的 todo 沉底 + 标题带 done 划线", () => {
    const { target } = render({
      journals: [
        journal({ id: "done", kind: "todo", title: "已完成", status: "completed", created_at: "2026-09-13T10:00:00Z" }),
        journal({ id: "active", kind: "todo", title: "未完成", created_at: "2026-09-12T10:00:00Z" }),
      ],
    });
    const titles = [...target.querySelectorAll(".card-title")].map((h) => h.textContent);
    expect(titles).toEqual(["未完成", "已完成"]);
    const doneTitle = cardOf(target, "已完成").querySelector(".card-title");
    expect(doneTitle?.classList.contains("done")).toBe(true);
    expect(cardOf(target, "已完成").querySelector(".checkbox")?.classList.contains("completed")).toBe(true);
  });

  test("点卡片 → onSelect(该 journal);selectedId 匹配卡高亮", () => {
    const todo = journal({ id: "t1", kind: "todo", title: "点我" });
    const { target, onSelect } = render({ journals: [todo] });
    (cardOf(target, "点我") as HTMLElement).click();
    flushSync();
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(todo);
    // 未传 selectedId → 无高亮
    expect(cardOf(target, "点我").classList.contains("selected")).toBe(false);
  });

  test("selectedId 匹配卡有 .selected,其余没有", () => {
    const { target } = render({
      selectedId: "t1",
      journals: [
        journal({ id: "t1", kind: "todo", title: "选中我" }),
        journal({ id: "t2", kind: "todo", title: "别选我" }),
      ],
    });
    expect(cardOf(target, "选中我").classList.contains("selected")).toBe(true);
    expect(cardOf(target, "别选我").classList.contains("selected")).toBe(false);
  });

  test("点勾选框 → onToggleTodo(id),不触发 onSelect", () => {
    const { target, onSelect, onToggleTodo } = render({
      journals: [journal({ id: "t1", kind: "todo", title: "勾我" })],
    });
    const checkbox = cardOf(target, "勾我").querySelector(".checkbox") as HTMLElement;
    checkbox.click();
    flushSync();
    expect(onToggleTodo).toHaveBeenCalledTimes(1);
    expect(onToggleTodo).toHaveBeenCalledWith("t1");
    expect(onSelect).not.toHaveBeenCalled();
  });

  test("点「新建」→ onNew", () => {
    const { target, onNew } = render();
    const addBtn = [...target.querySelectorAll("button")].find((b) =>
      b.classList.contains("add-btn"),
    ) as HTMLElement;
    addBtn.click();
    flushSync();
    expect(onNew).toHaveBeenCalledTimes(1);
  });

  test("error prop 渲染 alert,× → onClearError", () => {
    const { target, onClearError } = render({ error: "拉取失败" });
    const alert = target.querySelector(".error");
    expect(alert?.textContent).toContain("拉取失败");
    (alert?.querySelector("button") as HTMLElement).click();
    flushSync();
    expect(onClearError).toHaveBeenCalledTimes(1);
  });

  test("kind 筛选 chip 切换 → 只显示该类", () => {
    const { target } = render({
      journals: [
        journal({ id: "t1", kind: "todo", title: "待办" }),
        journal({ id: "n1", kind: "note", title: "小记" }),
      ],
    });
    expect(target.querySelectorAll(".card").length).toBe(2);
    const noteChip = [...target.querySelectorAll(".chip")].find((c) =>
      c.textContent?.includes("小记"),
    ) as HTMLElement;
    noteChip.click();
    flushSync();
    const cards = target.querySelectorAll(".card");
    expect(cards.length).toBe(1);
    expect(cards[0].textContent).toContain("小记");
  });
});
