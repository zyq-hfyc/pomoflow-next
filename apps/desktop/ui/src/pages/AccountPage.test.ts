//! AccountPage 菜单状态机与深链测试(2026-10-08 数据同步搬家批)。
//!
//! 锁:
//! ① 未登录:菜单 = [账号, 数据同步],默认渲染认证卡片;
//! ② 未登录点「数据同步」→ SyncSetting 段 + active 迁移;点「账号」切回;
//! ③ 已登录:菜单 6 项顺序(数据同步插在登录设备与账号注销之间);
//! ④ 深链:requestAccountSection("sync") 后 mount → 直接落 sync 段,
//!    且 pending 信号已被消费($effect 消费,覆盖「已在 /account 时
//!    navigate 不 remount」场景 —— 见 accountNav.svelte.ts 头注)。

import { describe, expect, test, beforeEach, afterEach, vi } from "vitest";
import { flushSync, mount, unmount } from "svelte";

// 可变的登录态(hoisted 供 mock 工厂闭包引用;每个用例 mount 前重置)。
const h = vi.hoisted(() => ({
  acct: {
    loaded: true,
    user: null as { username: string } | null,
    avatar: null as string | null,
  },
}));

vi.mock("../lib/accountState.svelte", () => ({
  accountState: () => h.acct,
  loadAccountState: vi.fn(async () => {}),
  setAccountUser: vi.fn((u: { username: string } | null) => {
    h.acct.user = u;
  }),
  refreshAvatar: vi.fn(async () => {}),
}));
vi.mock("../lib/api", () => ({
  // 已登录用例会触发登录态自愈核验,必须 resolve,否则误判掉线清登录态
  authGetProfile: vi.fn(async () => ({
    username: "tester",
    email: "t@example.com",
    display_name: "Tester",
  })),
  authLogout: vi.fn(async () => {}),
}));
vi.mock("../lib/journalsStore.svelte", () => ({ resetJournals: vi.fn() }));

// 三个子组件换替身(各自真实实现由专门测试覆盖;此处只锁菜单状态机)。
vi.mock("../components/Settings/Account/AuthCard.svelte", async () => ({
  default: (await import("../components/Settings/Account/AuthCard.stub.svelte")).default,
}));
vi.mock("../components/Settings/Account/AccountCenter.svelte", async () => ({
  default: (await import("../components/Settings/Account/AccountCenter.stub.svelte")).default,
}));
vi.mock("../components/Settings/SyncSetting.svelte", async () => ({
  default: (await import("../components/Settings/SyncSetting.stub.svelte")).default,
}));

// accountNav 用真模块 —— 深链信号的生产/消费正是被测对象
import {
  requestAccountSection,
  pendingAccountSection,
  clearAccountSectionRequest,
} from "../lib/accountNav.svelte";
import AccountPage from "./AccountPage.svelte";

// 已挂载实例登记:必须 afterEach 卸载 —— 存活实例的 $effect 仍在追踪
// accountNav 的 pending 信号,深链用例发信号时会被旧实例抢先消费(真实踩过)。
const mounted: Record<string, unknown>[] = [];

async function render(): Promise<HTMLElement> {
  const target = document.createElement("div");
  document.body.appendChild(target);
  const comp = mount(AccountPage, { target });
  mounted.push(comp as unknown as Record<string, unknown>);
  flushSync();
  await new Promise((r) => setTimeout(r, 0));
  flushSync();
  return target;
}

function navItems(target: HTMLElement): HTMLButtonElement[] {
  return [...target.querySelectorAll<HTMLButtonElement>(".menu-nav .menu-item")];
}
function navLabels(target: HTMLElement): string[] {
  return navItems(target).map((b) => b.textContent!.trim());
}
function navItem(target: HTMLElement, label: string): HTMLButtonElement {
  const btn = navItems(target).find((b) => b.textContent!.includes(label));
  expect(btn, `菜单应有「${label}」项`).toBeTruthy();
  return btn!;
}

beforeEach(() => {
  document.body.innerHTML = "";
  h.acct.loaded = true;
  h.acct.user = null;
  h.acct.avatar = null;
  clearAccountSectionRequest();
});

afterEach(() => {
  while (mounted.length) unmount(mounted.pop()!);
});

describe("AccountPage · 未登录", () => {
  test("菜单 = [账号, 数据同步],默认渲染认证卡片", async () => {
    const target = await render();
    expect(navLabels(target)).toEqual(["账号", "数据同步"]);
    expect(navItem(target, "账号").classList.contains("active")).toBe(true);
    expect(target.querySelector('[data-stub="auth-card"]')).toBeTruthy();
    expect(target.querySelector('[data-stub="sync-setting"]')).toBeNull();
  });

  test("点「数据同步」→ SyncSetting 段 + active 迁移;点「账号」切回", async () => {
    const target = await render();
    navItem(target, "数据同步").click();
    flushSync();
    expect(target.querySelector('[data-stub="sync-setting"]')).toBeTruthy();
    expect(target.querySelector('[data-stub="auth-card"]')).toBeNull();
    expect(navItem(target, "数据同步").classList.contains("active")).toBe(true);
    expect(navItem(target, "账号").classList.contains("active")).toBe(false);
    // 切回账号
    navItem(target, "账号").click();
    flushSync();
    expect(target.querySelector('[data-stub="auth-card"]')).toBeTruthy();
    expect(target.querySelector('[data-stub="sync-setting"]')).toBeNull();
  });
});

describe("AccountPage · 已登录", () => {
  test("菜单 6 项顺序:数据同步插在登录设备与账号注销之间;默认个人资料段", async () => {
    h.acct.user = { username: "tester" };
    const target = await render();
    expect(navLabels(target)).toEqual([
      "个人资料",
      "安全设置",
      "第三方账号",
      "登录设备",
      "数据同步",
      "账号注销",
    ]);
    const center = target.querySelector('[data-stub="account-center"]');
    expect(center?.textContent).toBe("CENTER:profile");
    // 底部退出登录按钮在(已登录形态专属)
    expect(target.querySelector(".menu-footer .menu-item")?.textContent).toContain("退出登录");
  });

  test("点「数据同步」→ sync 段直挂(不经 AccountCenter)", async () => {
    h.acct.user = { username: "tester" };
    const target = await render();
    navItem(target, "数据同步").click();
    flushSync();
    expect(target.querySelector('[data-stub="sync-setting"]')).toBeTruthy();
    expect(target.querySelector('[data-stub="account-center"]')).toBeNull();
    // 危险区仍在且垫底
    expect(navLabels(target).at(-1)).toBe("账号注销");
  });
});

describe("AccountPage · 深链(顶栏同步图标直达)", () => {
  test("requestAccountSection(\"sync\") 后进入 → 直接落 sync 段,信号被消费", async () => {
    requestAccountSection("sync");
    const target = await render();
    expect(target.querySelector('[data-stub="sync-setting"]')).toBeTruthy();
    expect(navItem(target, "数据同步").classList.contains("active")).toBe(true);
    // 一次性:消费后即清空,再进页面(无新请求)落默认段
    expect(pendingAccountSection()).toBeNull();
  });

  test("无深链信号时未登录默认落账号段(不残留旧信号)", async () => {
    const target = await render();
    expect(target.querySelector('[data-stub="auth-card"]')).toBeTruthy();
    expect(target.querySelector('[data-stub="sync-setting"]')).toBeNull();
  });
});
