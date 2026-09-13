//! NotesView 待办勾选框组件级测试(待办勾选批 2026-09-13)。
//!
//! 锁三条行为(排序规则细节由 journalKinds.test.ts 的纯函数单测覆盖):
//! ① kind=todo 卡片渲染 TaskCheckbox,wish 卡片不渲染;
//! ② 点击勾选框调用 toggleJournal 并重拉列表;
//! ③ 完成的 todo 沉底 + 标题带 done 划线 class。
//!
//! NotesView 自拉数据($effect → api.listJournals)且经 syncState 间接
//! 依赖 api.onAutoSync,故整体 mock ../../lib/api 模块(reminders.test.ts
//! 同款 vi.mock 模式);i18n / 图标走真实模块,jsdom 环境可直接跑。

import { describe, expect, test, beforeEach, afterEach, vi } from "vitest";
import { flushSync, mount, unmount } from "svelte";

vi.mock("../../lib/api", () => ({
  listJournals: vi.fn(),
  upsertJournal: vi.fn(),
  deleteJournal: vi.fn(),
  toggleJournal: vi.fn(),
  // syncState.svelte.ts 顶层 import 需要(本测试不触发,仅保模块可加载)
  onAutoSync: vi.fn(),
}));

import * as api from "../../lib/api";
import type { Journal } from "../../lib/api";
import NotesView from "./NotesView.svelte";

function journal(p: Partial<Journal> & Pick<Journal, "id">): Journal {
  return { kind: "todo", title: "", content: "", tags: [], status: "active", ...p };
}

/// mock 数据仓:toggle 的 mockImplementation 原地翻转它,模拟
/// 「toggle → 重拉列表看到新状态」的真实链路。
let data: Journal[] = [];

let mounted: Record<string, unknown> | null = null;

/// mount + 等待 $effect 里的 refresh() 走完宏任务,再 flush 渲染。
async function render(): Promise<HTMLElement> {
  const target = document.createElement("div");
  document.body.appendChild(target);
  mounted = mount(NotesView, { target }) as Record<string, unknown>;
  flushSync();
  await settle();
  return target;
}

/// 排空微/宏任务让 refresh 的 await 链结束,随后 flushSync 落渲染。
async function settle(): Promise<void> {
  await new Promise((r) => setTimeout(r, 0));
  flushSync();
}

function cardOf(target: HTMLElement, text: string): HTMLElement {
  const card = [...target.querySelectorAll(".card")].find((el) =>
    el.textContent?.includes(text),
  );
  expect(card, `应存在包含「${text}」的卡片`).toBeTruthy();
  return card as HTMLElement;
}

beforeEach(() => {
  data = [];
  vi.mocked(api.listJournals).mockImplementation(async () => [...data]);
  vi.mocked(api.toggleJournal).mockImplementation(async (id: string) => {
    const hit = data.find((j) => j.id === id);
    if (hit) hit.status = hit.status === "completed" ? "active" : "completed";
    return hit as Journal;
  });
});

afterEach(() => {
  if (mounted) unmount(mounted);
  mounted = null;
  document.body.innerHTML = "";
  vi.clearAllMocks();
});

describe("NotesView · 待办勾选框", () => {
  test("todo 卡片渲染勾选框,wish 卡片不渲染", async () => {
    data = [
      journal({ id: "t1", kind: "todo", title: "买牛奶", created_at: "2026-09-13T10:00:00.000Z" }),
      journal({ id: "w1", kind: "wish", title: "去冰岛", created_at: "2026-09-13T09:00:00.000Z" }),
    ];
    const target = await render();

    expect(cardOf(target, "买牛奶").querySelector(".checkbox")).toBeTruthy();
    expect(cardOf(target, "去冰岛").querySelector(".checkbox")).toBeNull();
  });

  test("点击勾选框调用 toggleJournal 并重拉列表", async () => {
    data = [
      journal({ id: "t1", kind: "todo", title: "买牛奶", created_at: "2026-09-13T10:00:00.000Z" }),
    ];
    const target = await render();
    expect(api.listJournals).toHaveBeenCalledTimes(1);

    const checkbox = cardOf(target, "买牛奶").querySelector(".checkbox") as HTMLElement;
    checkbox.click();
    await settle();

    expect(api.toggleJournal).toHaveBeenCalledWith("t1");
    expect(api.listJournals).toHaveBeenCalledTimes(2);
  });

  test("完成的 todo 沉底且标题带 done 划线 class", async () => {
    data = [
      journal({
        id: "t1",
        kind: "todo",
        title: "已完成的待办",
        status: "completed",
        created_at: "2026-09-13T12:00:00.000Z",
      }),
      journal({ id: "t2", kind: "todo", title: "未完成待办", created_at: "2026-09-13T11:00:00.000Z" }),
    ];
    const target = await render();

    // 新建的已完成排在旧的未完成后面(沉底)
    const cards = [...target.querySelectorAll(".card")] as HTMLElement[];
    expect(cards[0].textContent).toContain("未完成待办");
    expect(cards[1].textContent).toContain("已完成的待办");
    // 完成卡:勾选框亮 + 标题划线 class;未完成卡两者皆无
    expect(cards[0].querySelector(".checkbox.completed")).toBeNull();
    expect(cards[0].querySelector(".card-title.done")).toBeNull();
    expect(cards[1].querySelector(".checkbox.completed")).toBeTruthy();
    expect(cards[1].querySelector(".card-title.done")).toBeTruthy();
  });

  test("点击勾选框后 UI 同步翻转(沉底 + done class 跟上)", async () => {
    data = [
      journal({ id: "t1", kind: "todo", title: "买牛奶", created_at: "2026-09-13T10:00:00.000Z" }),
      journal({ id: "t2", kind: "todo", title: "写周报", created_at: "2026-09-13T09:00:00.000Z" }),
    ];
    const target = await render();

    (cardOf(target, "买牛奶").querySelector(".checkbox") as HTMLElement).click();
    await settle();

    // 买牛奶 完成后沉到 写周报 之后,标题换上划线
    const cards = [...target.querySelectorAll(".card")] as HTMLElement[];
    expect(cards[0].textContent).toContain("写周报");
    expect(cards[1].textContent).toContain("买牛奶");
    expect(cards[1].querySelector(".card-title.done")).toBeTruthy();
  });
});
