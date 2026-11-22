//! ProjectManager 行为测试(2026-11-22 结束项目批)。
//!
//! 锁「结束 → 徽标灰显 → 重启恢复」交互闭环(纯闭包语义在
//! projectTree.test.ts,这里只锁组件渲染与命令调用):
//! ① 进行中行:Archive 按钮(结束项目)→ setProjectClosed(id,true) →
//!    重拉后名字灰显 + 「已结束」徽标 + 按钮翻转为 重新开启;
//! ② 已结束行:按钮(重新开启)→ setProjectClosed(id,false) → 徽标消失;
//! ③ 已结束行禁「添加子清单/修改/删除」(要动先重新开启),开启后恢复;
//! ④ 命令失败 → 错误原文 role=alert(仍会重拉,不崩页)。

import { describe, expect, test, beforeEach, vi } from "vitest";
import { flushSync, mount } from "svelte";

const h = vi.hoisted(() => ({
  listProjects: vi.fn(),
  setProjectClosed: vi.fn(),
}));

vi.mock("../../lib/api", () => ({
  listProjects: h.listProjects,
  setProjectClosed: h.setProjectClosed,
  upsertProject: vi.fn(),
  deleteProject: vi.fn(),
  reorderProjects: vi.fn(),
}));
vi.mock("../../lib/syncState.svelte", () => ({
  syncState: () => ({ rev: 0 }),
}));

import ProjectManager from "./ProjectManager.svelte";
import type { Project } from "../../lib/api";

function proj(p: Partial<Project> & Pick<Project, "id" | "name">): Project {
  return {
    color: "",
    parent_id: null,
    display_order: 0,
    created_at: "2026-09-01T00:00:00.000Z",
    updated_at: "2026-09-01T00:00:00.000Z",
    revision: 1,
    closed_at: null,
    ...p,
  };
}

const OPEN = proj({ id: "p-open", name: "进行中清单" });
const CLOSED = proj({
  id: "p-closed",
  name: "已结束清单",
  closed_at: "2026-11-01T00:00:00.000Z",
});

/** 首次 load 返回 initial(仅一次;重拉值由各用例自行 mock)。 */
async function render(initial: Project[]): Promise<HTMLElement> {
  h.listProjects.mockResolvedValueOnce(initial);
  const target = document.createElement("div");
  document.body.appendChild(target);
  mount(ProjectManager, { target });
  flushSync();
  await new Promise((r) => setTimeout(r, 0));
  flushSync();
  return target;
}

function buttonByLabel(target: HTMLElement, label: string): HTMLButtonElement {
  const btn = [...target.querySelectorAll<HTMLButtonElement>("button")].find(
    (b) => b.getAttribute("aria-label") === label,
  );
  expect(btn, `应有「${label}」按钮`).toBeTruthy();
  return btn!;
}

async function settle() {
  await new Promise((r) => setTimeout(r, 0));
  flushSync();
}

beforeEach(() => {
  document.body.innerHTML = "";
  vi.clearAllMocks();
});

describe("ProjectManager · 结束项目", () => {
  test("进行中行:点「结束项目」→ 命令(id,true)→ 重拉后徽标灰显 + 按钮翻转", async () => {
    const closedOpen = {
      ...OPEN,
      closed_at: "2026-11-22T00:00:00.000Z",
      revision: 2,
    };
    h.setProjectClosed.mockResolvedValue(closedOpen);
    h.listProjects.mockResolvedValue([closedOpen]);
    const target = await render([OPEN]);

    // 初始:无徽标、名字不灰显;有「添加子清单」与「结束项目」
    expect(target.querySelector(".closed-badge")).toBeNull();
    expect(target.querySelector(".name.closed")).toBeNull();
    buttonByLabel(target, "添加子清单");
    await buttonByLabel(target, "结束项目").click();
    await settle();

    expect(h.setProjectClosed).toHaveBeenCalledTimes(1);
    expect(h.setProjectClosed).toHaveBeenCalledWith("p-open", true);
    // 重拉后:徽标 + 灰显 + 按钮翻转;加子/修改/删除全部消失(禁改禁删)
    expect(target.querySelector(".closed-badge")?.textContent).toContain("已结束");
    expect(target.querySelector(".name.closed")).not.toBeNull();
    expect(buttonByLabel(target, "重新开启")).toBeTruthy();
    for (const banned of ["添加子清单", "修改", "删除"]) {
      expect(
        [...target.querySelectorAll("button")].some(
          (b) => b.getAttribute("aria-label") === banned,
        ),
        `已结束行不应再有「${banned}」`,
      ).toBe(false);
    }
  });

  test("命令失败 → 错误原文就地 role=alert,不崩页", async () => {
    h.setProjectClosed.mockRejectedValue("store 已锁");
    h.listProjects.mockResolvedValue([OPEN]);
    const target = await render([OPEN]);

    await buttonByLabel(target, "结束项目").click();
    await settle();

    const alert = target.querySelector('[role="alert"]');
    expect(alert?.textContent).toContain("store 已锁");
    // 行仍在(重拉兜底),可再次操作
    expect(buttonByLabel(target, "结束项目")).toBeTruthy();
  });
});

describe("ProjectManager · 重新开启", () => {
  test("已结束行:徽标 + 禁加子;点「重新开启」→ 命令(id,false)→ 恢复", async () => {
    const reopened = { ...CLOSED, closed_at: null, revision: 2 };
    h.setProjectClosed.mockResolvedValue(reopened);
    h.listProjects.mockResolvedValue([reopened]);
    const target = await render([CLOSED]);

    // 初始:徽标 + 灰显;加子/修改/删除全无(禁改禁删)
    expect(target.querySelector(".closed-badge")?.textContent).toContain("已结束");
    expect(target.querySelector(".name.closed")).not.toBeNull();
    for (const banned of ["添加子清单", "修改", "删除"]) {
      expect(
        [...target.querySelectorAll("button")].some(
          (b) => b.getAttribute("aria-label") === banned,
        ),
        `已结束行不应有「${banned}」`,
      ).toBe(false);
    }

    await buttonByLabel(target, "重新开启").click();
    await settle();

    expect(h.setProjectClosed).toHaveBeenCalledTimes(1);
    expect(h.setProjectClosed).toHaveBeenCalledWith("p-closed", false);
    // 重拉后:徽标消失、按钮翻回、加子/修改/删除恢复
    expect(target.querySelector(".closed-badge")).toBeNull();
    expect(target.querySelector(".name.closed")).toBeNull();
    expect(buttonByLabel(target, "结束项目")).toBeTruthy();
    expect(buttonByLabel(target, "添加子清单")).toBeTruthy();
    expect(buttonByLabel(target, "修改")).toBeTruthy();
    expect(buttonByLabel(target, "删除")).toBeTruthy();
  });
});
