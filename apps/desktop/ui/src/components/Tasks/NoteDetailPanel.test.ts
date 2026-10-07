//! NoteDetailPanel 就地编辑交互测试(2026-09-13 面板化批)。
//!
//! 锁:
//! ① 编辑态预填(标题/内容/kind active/tags/创建日期/删除链);
//! ② IME 安全:连续 input 零 API 调用,blur 才提交一次且 onChanged;
//! ③ 失焦未改 → 零调用;kind chip(编辑态)→ 即时存;
//! ④ 校验:仅有标题的 journal 清空标题 blur → 零调用 + 草稿回滚;
//! ⑤ 新建态:无删除链/无勾选框/无日期,标题自动聚焦;空草稿 blur 零调用;
//!    输入标题 blur → id:null 建一次 + onCreated;
//! ⑥ 删除两步:一击 armed + 零 deleteJournal,二击 deleteJournal + onClose;
//! ⑦ todo 头部勾选框 → toggleJournal;wish 无;
//! ⑧ tags 中英文逗号解析。

import { describe, expect, test, beforeEach, vi } from "vitest";
import { flushSync, mount, unmount } from "svelte";

vi.mock("../../lib/api", () => ({
  upsertJournal: vi.fn(),
  deleteJournal: vi.fn(),
  toggleJournal: vi.fn(),
}));

// 富文本批(2026-10-06):面板逻辑与 Tiptap 实现解耦 —— RichTextEditor
// 换成同 props 契约的 textarea 替身(面板测试维持原 textarea 交互语义;
// 编辑器行为由 richTextEditor.behavior/RichTextEditor 两套测试覆盖)。
vi.mock("./RichTextEditor.svelte", async () => ({
  default: (await import("./RichTextEditor.stub.svelte")).default,
}));

import * as api from "../../lib/api";
import type { Journal } from "../../lib/api";
import NoteDetailPanel from "./NoteDetailPanel.svelte";
import RefreshHarness from "./NoteDetailPanel.test-harness.svelte";

function journal(p: Partial<Journal> & Pick<Journal, "id">): Journal {
  return {
    kind: "todo",
    title: "",
    content: "",
    tags: [],
    status: "active",
    created_at: "2026-09-13T10:00:00.000Z",
    ...p,
  };
}

type Props = {
  journal: Journal | null;
  onClose: () => void;
  onChanged: () => void;
  onCreated: (j: Journal) => void;
};

interface Harness {
  target: HTMLElement;
  onClose: ReturnType<typeof vi.fn>;
  onChanged: ReturnType<typeof vi.fn>;
  onCreated: ReturnType<typeof vi.fn>;
}

/// mount + 排空微/宏任务,让可能的 effect 落完。
async function render(init: Partial<Props> = {}): Promise<Harness> {
  const target = document.createElement("div");
  document.body.appendChild(target);
  const onClose = vi.fn();
  const onChanged = vi.fn();
  const onCreated = vi.fn();
  const props: Props = {
    journal: null,
    onClose,
    onChanged,
    onCreated,
    ...init,
  };
  mount(NoteDetailPanel, { target, props });
  flushSync();
  await settle();
  return { target, onClose, onChanged, onCreated };
}

async function settle(): Promise<void> {
  await new Promise((r) => setTimeout(r, 0));
  flushSync();
}

function titleInput(target: HTMLElement): HTMLInputElement {
  return target.querySelector(".title-input") as HTMLInputElement;
}
function contentArea(target: HTMLElement): HTMLTextAreaElement {
  return target.querySelector(".content") as HTMLTextAreaElement;
}
function kindBtn(target: HTMLElement, emoji: string): HTMLButtonElement {
  const btn = [...target.querySelectorAll(".kind-btn")].find((b) =>
    b.textContent?.includes(emoji),
  );
  expect(btn, `应存在 ${emoji} 的 kind chip`).toBeTruthy();
  return btn as HTMLButtonElement;
}

/// 触发 input(改值)再 blur。
async function typeAndBlur(el: HTMLInputElement | HTMLTextAreaElement, value: string) {
  el.value = value;
  el.dispatchEvent(new Event("input", { bubbles: true }));
  flushSync();
  el.dispatchEvent(new Event("blur", { bubbles: true }));
  flushSync();
  await settle();
}

beforeEach(() => {
  document.body.innerHTML = "";
  vi.clearAllMocks();
});

describe("NoteDetailPanel · 编辑态", () => {
  test("预填:标题/内容/kind active/tags/创建日期/删除链", async () => {
    const { target } = await render({
      journal: journal({ id: "j1", kind: "wish", title: "去北海道", content: "冬天去", tags: ["旅行", "长期"] }),
    });
    expect(titleInput(target).value).toBe("去北海道");
    expect(contentArea(target).value).toBe("冬天去");
    expect(kindBtn(target, "⭐").classList.contains("active")).toBe(true);
    expect((target.querySelector("#ndp-tags") as HTMLInputElement).value).toBe("旅行, 长期");
    expect(target.querySelector(".meta")?.textContent).toBeTruthy();
    expect(target.querySelector(".del-btn")).toBeTruthy();
  });

  test("IME 安全:连续 input 零调用,blur 一次 + onChanged", async () => {
    const j = journal({ id: "j1", title: "旧标题" });
    const { target, onChanged } = await render({ journal: j });
    const input = titleInput(target);
    // 连续改(模拟 IME 组合) → 不提交
    input.value = "新标题a";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.value = "新标题ab";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    flushSync();
    expect(api.upsertJournal).not.toHaveBeenCalled();
    // blur → 提交一次,merge 正确
    input.dispatchEvent(new Event("blur", { bubbles: true }));
    flushSync();
    await settle();
    expect(api.upsertJournal).toHaveBeenCalledTimes(1);
    expect(api.upsertJournal).toHaveBeenCalledWith(
      expect.objectContaining({ id: "j1", title: "新标题ab" }),
    );
    expect(onChanged).toHaveBeenCalledTimes(1);
  });

  test("失焦未改 → 零调用", async () => {
    const { target } = await render({ journal: journal({ id: "j1", title: "不变" }) });
    const input = titleInput(target);
    input.dispatchEvent(new Event("blur", { bubbles: true }));
    flushSync();
    await settle();
    expect(api.upsertJournal).not.toHaveBeenCalled();
  });

  test("kind chip(编辑态)→ 即时存 + active 切换", async () => {
    const { target } = await render({ journal: journal({ id: "j1", kind: "note", title: "t" }) });
    expect(kindBtn(target, "✍️").classList.contains("active")).toBe(true);
    kindBtn(target, "⭐").click();
    flushSync();
    await settle();
    expect(api.upsertJournal).toHaveBeenCalledTimes(1);
    expect(api.upsertJournal).toHaveBeenCalledWith(expect.objectContaining({ id: "j1", kind: "wish" }));
    expect(kindBtn(target, "⭐").classList.contains("active")).toBe(true);
  });

  test("校验:仅有标题的 journal 清空标题 blur → 零调用 + 草稿回滚", async () => {
    const { target } = await render({ journal: journal({ id: "j1", title: "唯一标题", content: "" }) });
    const input = titleInput(target);
    await typeAndBlur(input, "");
    expect(api.upsertJournal).not.toHaveBeenCalled();
    expect(titleInput(target).value).toBe("唯一标题"); // 回滚
  });

  test("tags 中英文逗号解析", async () => {
    const { target } = await render({ journal: journal({ id: "j1", title: "t", tags: [] }) });
    const tagsInput = target.querySelector("#ndp-tags") as HTMLInputElement;
    await typeAndBlur(tagsInput, "a，b, c");
    expect(api.upsertJournal).toHaveBeenCalledWith(
      expect.objectContaining({ id: "j1", tags: ["a", "b", "c"] }),
    );
  });

  test("todo 头部勾选框 → toggleJournal;wish 无勾选框", async () => {
    const { target, onChanged } = await render({ journal: journal({ id: "j1", kind: "todo" }) });
    const checkbox = target.querySelector(".checkbox") as HTMLElement;
    expect(checkbox).toBeTruthy();
    checkbox.click();
    flushSync();
    await settle();
    expect(api.toggleJournal).toHaveBeenCalledWith("j1");
    expect(onChanged).toHaveBeenCalled();
  });

  test("wish 头部是色点不是勾选框", async () => {
    const { target } = await render({ journal: journal({ id: "j1", kind: "wish" }) });
    expect(target.querySelector(".checkbox")).toBeNull();
    expect(target.querySelector(".kind-dot")).toBeTruthy();
  });

  test("删除两步:一击 armed + 零 delete,二击 delete + onClose", async () => {
    const { target, onClose, onChanged } = await render({ journal: journal({ id: "j1", title: "t" }) });
    const delBtn = target.querySelector(".del-btn") as HTMLElement;
    expect(delBtn.classList.contains("armed")).toBe(false);
    // 第一击:armed,不删
    delBtn.click();
    flushSync();
    expect(delBtn.classList.contains("armed")).toBe(true);
    expect(api.deleteJournal).not.toHaveBeenCalled();
    // 第二击:删
    (target.querySelector(".del-btn") as HTMLElement).click();
    flushSync();
    await settle();
    expect(api.deleteJournal).toHaveBeenCalledWith("j1");
    expect(onClose).toHaveBeenCalled();
    expect(onChanged).toHaveBeenCalled();
  });
});

describe("NoteDetailPanel · 新建态", () => {
  test("无删除链/无勾选框/无日期,标题自动聚焦,默认 todo active", async () => {
    const { target } = await render({ journal: null });
    expect(target.querySelector(".del-btn")).toBeNull();
    expect(target.querySelector(".checkbox")).toBeNull();
    expect(target.querySelector(".meta")).toBeNull();
    expect(kindBtn(target, "☑️").classList.contains("active")).toBe(true);
    expect(document.activeElement).toBe(titleInput(target));
  });

  test("空草稿 blur → 零调用(不落库)", async () => {
    const { target } = await render({ journal: null });
    titleInput(target).dispatchEvent(new Event("blur", { bubbles: true }));
    flushSync();
    await settle();
    expect(api.upsertJournal).not.toHaveBeenCalled();
  });

  test("输入标题 blur → id:null 建一次 + onCreated", async () => {
    (api.upsertJournal as ReturnType<typeof vi.fn>).mockResolvedValue(
      journal({ id: "created-1", title: "新待办" }),
    );
    const { target, onCreated } = await render({ journal: null });
    await typeAndBlur(titleInput(target), "新待办");
    expect(api.upsertJournal).toHaveBeenCalledTimes(1);
    expect(api.upsertJournal).toHaveBeenCalledWith(
      expect.objectContaining({ id: null, kind: "todo", title: "新待办" }),
    );
    expect(onCreated).toHaveBeenCalledTimes(1);
    expect(onCreated).toHaveBeenCalledWith(expect.objectContaining({ id: "created-1" }));
  });

  test("新建态选「愿望」再写标题 → 建成 wish", async () => {
    (api.upsertJournal as ReturnType<typeof vi.fn>).mockResolvedValue(
      journal({ id: "created-2", kind: "wish" }),
    );
    const { target } = await render({ journal: null });
    kindBtn(target, "⭐").click();
    flushSync();
    await typeAndBlur(titleInput(target), "一个愿望");
    expect(api.upsertJournal).toHaveBeenCalledWith(
      expect.objectContaining({ id: null, kind: "wish", title: "一个愿望" }),
    );
  });

  test("双 blur 竞态:upsert 挂起时第二次 blur 不重复建", async () => {
    let resolve!: (v: Journal) => void;
    (api.upsertJournal as ReturnType<typeof vi.fn>).mockReturnValue(
      new Promise<Journal>((r) => (resolve = r)),
    );
    const { target } = await render({ journal: null });
    // 标题 blur 触发 create(挂起)
    titleInput(target).value = "竞态";
    titleInput(target).dispatchEvent(new Event("input", { bubbles: true }));
    flushSync();
    titleInput(target).dispatchEvent(new Event("blur", { bubbles: true }));
    flushSync();
    // 内容再 blur(此时 create 在途)
    contentArea(target).value = "内容";
    contentArea(target).dispatchEvent(new Event("input", { bubbles: true }));
    flushSync();
    contentArea(target).dispatchEvent(new Event("blur", { bubbles: true }));
    flushSync();
    resolve(journal({ id: "c-1" }));
    await settle();
    expect(api.upsertJournal).toHaveBeenCalledTimes(1);
  });
});

describe("NoteDetailPanel · refresh 回灌不冲草稿(2026-09-14 优化批)", () => {
  test("同 id 新对象(refresh 回灌)→ 正在编辑的草稿保留", async () => {
    const target = document.createElement("div");
    document.body.appendChild(target);
    const mounted = mount(RefreshHarness, { target }) as Record<string, unknown>;
    const setJournal = mounted!.setJournal as (j: Journal | null) => void;
    setJournal(journal({ id: "j1", title: "旧标题", content: "旧内容" }));
    flushSync();
    const input = titleInput(target);
    input.value = "编辑中标题";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    flushSync();
    // 后台同步重拉:同 id、内容已变的新对象(旧实现会把草稿重置成远端值)
    setJournal(journal({ id: "j1", title: "远端新标题", content: "远端新内容" }));
    flushSync();
    expect(input.value).toBe("编辑中标题");
    expect(api.upsertJournal).not.toHaveBeenCalled();
    unmount(mounted);
  });
});

describe("NoteDetailPanel · 富文本批新增(2026-10-06)", () => {
  test("新建落库回声:创建后继续输入不被 reset 清掉", async () => {
    const target = document.createElement("div");
    document.body.appendChild(target);
    const mounted = mount(RefreshHarness, { target }) as Record<string, unknown>;
    type SetJ = (j: Journal | null, hooks?: { onCreated?: (j: Journal) => void }) => void;
    const setJournal = mounted!.setJournal as SetJ;
    // 模拟父层:onCreated → 选中刚创建的记录(回声时刻)
    setJournal(null, { onCreated: (created) => setJournal(created) });
    (api.upsertJournal as ReturnType<typeof vi.fn>).mockResolvedValue(
      journal({ id: "c9", title: "标题甲", content: "" }),
    );
    flushSync();
    await settle();
    await typeAndBlur(titleInput(target), "标题甲");
    expect(api.upsertJournal).toHaveBeenCalledTimes(1);
    // 回声后编辑器已是编辑态;继续在内容里打字
    const area = contentArea(target);
    area.value = "继续写正文";
    area.dispatchEvent(new Event("input", { bubbles: true }));
    flushSync();
    await settle();
    // 关键断言:回声没有触发 reset(否则内容被重置成创建时的 "")
    expect(contentArea(target).value).toBe("继续写正文");
    unmount(mounted);
  });

  test("切到另一条记录(非回声)→ 编辑器内容重置为目标的", async () => {
    const target = document.createElement("div");
    document.body.appendChild(target);
    const mounted = mount(RefreshHarness, { target }) as Record<string, unknown>;
    const setJournal = mounted!.setJournal as (j: Journal | null) => void;
    setJournal(journal({ id: "j1", title: "甲", content: "甲内容" }));
    flushSync();
    expect(contentArea(target).value).toBe("甲内容");
    setJournal(journal({ id: "j2", title: "乙", content: "乙内容" }));
    flushSync();
    await settle();
    expect(contentArea(target).value).toBe("乙内容");
    unmount(mounted);
  });

  test("JSON 内容未改动时失焦 → 零调用(getJSON 与库内串相等即无变化)", async () => {
    const json = JSON.stringify({
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text: "富文本内容" }] }],
    });
    const { target } = await render({ journal: journal({ id: "j1", title: "t", content: json }) });
    // stub 不输入直接 blur(= 用户点开看了看就关)
    contentArea(target).dispatchEvent(new Event("blur", { bubbles: true }));
    flushSync();
    await settle();
    expect(api.upsertJournal).not.toHaveBeenCalled();
  });

  test("保存失败(如超 20000 上限)→ toast 报错,不静默吞", async () => {
    const { toast } = await import("../../lib/toast.svelte");
    toast().splice(0);
    (api.upsertJournal as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("journal.content 不能超过 20000 字符"),
    );
    const { target } = await render({ journal: journal({ id: "j1", title: "t", content: "旧" }) });
    await typeAndBlur(contentArea(target), "超长长长长的新内容");
    expect(toast().map((x) => x.message).join()).toContain("保存失败");
  });
});
