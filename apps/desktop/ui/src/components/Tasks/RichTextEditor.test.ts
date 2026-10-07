//! RichTextEditor 组件挂载与工具栏接线测试(2026-10-06 富文本批)。
//!
//! 内核行为(样式/列表/链接/表格/history)锁在 richTextEditor.behavior
//! .test.ts(headless 同款扩展);本套只锁组件层:挂载渲染、占位 attr、
//! 初始内容、工具栏按钮齐备、更多菜单开/合/Esc、表格弹层、Ctrl+S 触发
//! onCommit、停笔防抖触发 onCommit。

import { describe, expect, test, beforeEach, afterEach, vi } from "vitest";
import { flushSync, mount, unmount } from "svelte";
import RichTextEditor from "./RichTextEditor.svelte";

interface Harness {
  target: HTMLElement;
  onUpdate: ReturnType<typeof vi.fn>;
  onCommit: ReturnType<typeof vi.fn>;
  comp: {
    flush(): void;
    reset(c: string): void;
    getEditor(): import("@tiptap/core").Editor | null;
  };
}

async function render(content = ""): Promise<Harness> {
  const target = document.createElement("div");
  document.body.appendChild(target);
  const onUpdate = vi.fn();
  const onCommit = vi.fn();
  const comp = mount(RichTextEditor, {
    target,
    props: { content, placeholder: "记你想记...", onUpdate, onCommit },
  }) as unknown as Harness["comp"];
  flushSync();
  await new Promise((r) => setTimeout(r, 0));
  flushSync();
  return { target, onUpdate, onCommit, comp };
}

function toolbarBtn(target: HTMLElement, label: string): HTMLButtonElement {
  const btn = [...target.querySelectorAll<HTMLButtonElement>(".rt-toolbar button")].find(
    (b) => b.getAttribute("aria-label")?.includes(label),
  );
  expect(btn, `工具栏应有「${label}」按钮`).toBeTruthy();
  return btn!;
}

beforeEach(() => {
  document.body.innerHTML = "";
  vi.useRealTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

describe("RichTextEditor · 挂载与结构", () => {
  test("ProseMirror 挂载 + 占位 attr + 工具栏全量按钮", async () => {
    const { target } = await render();
    const pm = target.querySelector(".ProseMirror") as HTMLElement;
    expect(pm).toBeTruthy();
    // tiptap Placeholder:attr 落在空段落节点上(非 ProseMirror 根)
    expect(
      pm.querySelector("p.is-editor-empty")?.getAttribute("data-placeholder"),
    ).toBe("记你想记...");
    // 主工具栏:撤销/重做/样式下拉/B I S U/颜色/高亮/对齐×4/列表×3/更多
    for (const label of ["撤销", "重做", "加粗", "斜体", "删除线", "下划线",
      "左对齐", "居中", "右对齐", "两端对齐", "无序列表", "有序列表", "任务清单", "更多格式"]) {
      toolbarBtn(target, label);
    }
    expect(target.querySelectorAll(".rt-select")).toHaveLength(2);
    expect(target.querySelectorAll('input[type="color"]')).toHaveLength(2);
  });

  test("初始纯文本内容渲染进编辑区(升级包装,不露原文以外的结构)", async () => {
    const { target } = await render("旧纯文本一行");
    expect(target.querySelector(".ProseMirror")?.textContent).toContain("旧纯文本一行");
  });

  test("初始 JSON 内容渲染", async () => {
    const json = JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "富文本" }, { type: "text", text: "加粗", marks: [{ type: "bold" }] }] },
      ],
    });
    const { target } = await render(json);
    const pm = target.querySelector(".ProseMirror") as HTMLElement;
    expect(pm.textContent).toContain("富文本加粗");
    expect(pm.querySelector("strong")?.textContent).toBe("加粗");
  });
});

describe("RichTextEditor · 菜单与弹层", () => {
  test("更多菜单:点开出现,Esc 关闭", async () => {
    const { target } = await render();
    expect(target.querySelector(".rt-menu")).toBeNull();
    toolbarBtn(target, "更多格式").click();
    flushSync();
    const menu = target.querySelector(".rt-menu");
    expect(menu).toBeTruthy();
    for (const item of ["链接", "引用块", "代码块", "分隔线", "表格"]) {
      expect(menu!.textContent).toContain(item);
    }
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    flushSync();
    expect(target.querySelector(".rt-menu")).toBeNull();
  });

  test("表格项 → 尺寸弹层;取消遮罩关闭", async () => {
    const { target } = await render();
    toolbarBtn(target, "更多格式").click();
    flushSync();
    [...target.querySelectorAll<HTMLButtonElement>(".rt-menu button")]
      .find((b) => b.textContent?.includes("表格"))!
      .click();
    flushSync();
    expect(target.querySelector(".rt-dialog")).toBeTruthy();
    expect(target.querySelector(".rt-dialog")?.textContent).toContain("行");
    expect(target.querySelector(".rt-dialog")?.textContent).toContain("列");
    (target.querySelector(".rt-overlay") as HTMLElement).click();
    flushSync();
    expect(target.querySelector(".rt-dialog")).toBeNull();
  });

  test("链接项 → URL 弹层", async () => {
    const { target } = await render();
    toolbarBtn(target, "更多格式").click();
    flushSync();
    [...target.querySelectorAll<HTMLButtonElement>(".rt-menu button")]
      .find((b) => b.textContent?.includes("链接"))!
      .click();
    flushSync();
    const input = target.querySelector(".rt-dialog input") as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.placeholder).toContain("URL");
  });
});

describe("RichTextEditor · 保存时机", () => {
  test("Ctrl+S → 立即 onCommit", async () => {
    const { target, onCommit } = await render();
    const pm = target.querySelector(".ProseMirror") as HTMLElement;
    pm.dispatchEvent(
      new KeyboardEvent("keydown", { key: "s", ctrlKey: true, bubbles: true, cancelable: true }),
    );
    flushSync();
    expect(onCommit).toHaveBeenCalledTimes(1);
  });

  test("停笔 2 秒防抖:onUpdate 即时、onCommit 到点才发且合并为一次", async () => {
    const { onUpdate, onCommit, comp } = await render(); // 先渲染(真定时器)
    vi.useFakeTimers(); // 再切假定时器,控住防抖
    try {
      comp.getEditor()!.commands.insertContent("第一下");
      expect(onUpdate).toHaveBeenCalledTimes(1);
      expect(onCommit).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1900);
      expect(onCommit).not.toHaveBeenCalled();
      // 补一笔 → 防抖重置,再等 2s 才发,且全程只发一次
      comp.getEditor()!.commands.insertContent("第二下");
      vi.advanceTimersByTime(1900);
      expect(onCommit).not.toHaveBeenCalled();
      vi.advanceTimersByTime(200);
      expect(onCommit).toHaveBeenCalledTimes(1);
      // onUpdate 的纯文本轨与编辑内容一致
      expect(onUpdate.mock.lastCall?.[1]).toContain("第一下第二下");
    } finally {
      vi.useRealTimers();
    }
  });

  test("失焦(blur)→ 立即 onCommit", async () => {
    const { target, onCommit } = await render();
    const pm = target.querySelector(".ProseMirror") as HTMLElement;
    pm.dispatchEvent(new FocusEvent("blur"));
    flushSync();
    expect(onCommit).toHaveBeenCalledTimes(1);
  });

  test("flush() 宿主强制落库:不等防抖", async () => {
    const { onCommit, comp } = await render();
    vi.useFakeTimers();
    try {
      comp.getEditor()!.commands.insertContent("急存");
      comp.flush();
      expect(onCommit).toHaveBeenCalledTimes(1); // 未到 2s 已发
      vi.advanceTimersByTime(3000);
      expect(onCommit).toHaveBeenCalledTimes(1); // 防抖被取消,不重复
    } finally {
      vi.useRealTimers();
    }
  });

  test("reset 销毁重建:undo 不穿越上一篇、内容换成新值", async () => {
    const { comp, target } = await render("第一篇");
    comp.getEditor()!.commands.focus("end");
    comp.getEditor()!.commands.insertContent("改动");
    expect(comp.getEditor()!.can().undo()).toBe(true);
    // reset → 新内容 + 历史清零
    comp.reset("第二篇");
    expect(target.querySelector(".ProseMirror")?.textContent).toBe("第二篇");
    expect(comp.getEditor()!.can().undo()).toBe(false);
  });
});
