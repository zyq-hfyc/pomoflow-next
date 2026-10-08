//! SyncSetting 搬家后行为测试(2026-10-08 数据同步搬家批)。
//!
//! 锁:
//! ① 未登录(auth:null):hint 段可见,点「登录 / 注册 →」调 onGoAuth 一次;
//!    且不再有「修改密码」「设备管理」段(原 SyncSecuritySection 与账号页
//!    安全设置/登录设备重复,搬家时删除);
//! ② 已登录:hint 段不出现;
//! ③ 服务器连接/自动同步/本机标识/同步记录四段标题俱在。

import { describe, expect, test, beforeEach, vi } from "vitest";
import { flushSync, mount } from "svelte";

// hoisted 可控配置(未登录 / 已登录两种形态)
const h = vi.hoisted(() => ({
  cfg: {
    server_url: "http://192.168.1.10:8321",
    token: null as string | null,
    auto_sync: false,
    interval_min: 5,
    auth: null as { username: string; user_id: string } | null,
  },
}));

vi.mock("../../lib/api", () => ({
  getSyncConfig: vi.fn(async () => h.cfg),
  setSyncConfig: vi.fn(async () => {}),
  getSyncIdentity: vi.fn(async () => ({ user_id: "u-1", device_id: "d-1" })),
  syncNow: vi.fn(async () => ({ pushed: 0, pulled: 0, conflicts: 0, dropped: 0 })),
  onAutoSync: vi.fn(async () => () => {}),
  // SyncConflictsSection(真实组件)依赖
  listConflicts: vi.fn(async () => []),
  countConflicts: vi.fn(async () => 0),
  clearConflicts: vi.fn(async () => {}),
}));

import SyncSetting from "./SyncSetting.svelte";

interface Harness {
  target: HTMLElement;
  onGoAuth: ReturnType<typeof vi.fn>;
}

async function render(): Promise<Harness> {
  const target = document.createElement("div");
  document.body.appendChild(target);
  const onGoAuth = vi.fn();
  mount(SyncSetting, { target, props: { onGoAuth } });
  flushSync();
  await new Promise((r) => setTimeout(r, 0));
  flushSync();
  return { target, onGoAuth };
}

function groupTitles(target: HTMLElement): string[] {
  return [...target.querySelectorAll(".group-title")].map((el) => el.textContent!.trim());
}

beforeEach(() => {
  document.body.innerHTML = "";
  h.cfg.auth = null;
});

describe("SyncSetting · 未登录", () => {
  test("hint 段可见;点「登录 / 注册 →」→ onGoAuth 恰调一次", async () => {
    const { target, onGoAuth } = await render();
    expect(target.textContent).toContain("未登录");
    const btn = [...target.querySelectorAll<HTMLButtonElement>("button")].find((b) =>
      b.textContent?.includes("登录 / 注册"),
    );
    expect(btn, "应有「登录 / 注册 →」按钮").toBeTruthy();
    btn!.click();
    flushSync();
    expect(onGoAuth).toHaveBeenCalledTimes(1);
  });

  test("改密码/设备管理段已删除(与账号页安全设置/登录设备重复)", async () => {
    const { target } = await render();
    expect(groupTitles(target)).not.toContain("修改密码");
    expect(groupTitles(target)).not.toContain("设备管理");
    expect(target.textContent).not.toContain("修改密码");
  });
});

describe("SyncSetting · 已登录", () => {
  test("hint 段不出现", async () => {
    h.cfg.auth = { username: "tester", user_id: "u-1" };
    const { target } = await render();
    expect(target.textContent).not.toContain("登录 / 注册 →");
  });
});

describe("SyncSetting · 段构成", () => {
  test("服务器连接/自动同步/本机标识/同步记录四段俱在", async () => {
    const { target } = await render();
    expect(groupTitles(target)).toEqual(
      expect.arrayContaining(["服务器连接", "自动同步", "本机标识", "同步记录"]),
    );
  });
});
