//! SyncIndicator 点击深链测试(2026-10-08 数据同步搬家批)。
//!
//! 锁:点击 → ① accountNav 一次性信号置 "sync";② navigate("/account")
//! 恰调一次(原实现 navigate("/settings") 落配置页默认 tab,定位不准)。

import { describe, expect, test, beforeEach, vi } from "vitest";
import { flushSync, mount } from "svelte";

vi.mock("../../lib/router.svelte", () => ({ navigate: vi.fn() }));

// syncState / accountNav / i18n 全用真模块(api.ts 仅 import 不调用,安全)
import { navigate } from "../../lib/router.svelte";
import {
  pendingAccountSection,
  clearAccountSectionRequest,
} from "../../lib/accountNav.svelte";
import SyncIndicator from "./SyncIndicator.svelte";

beforeEach(() => {
  document.body.innerHTML = "";
  clearAccountSectionRequest();
  vi.mocked(navigate).mockClear();
});

describe("SyncIndicator · 点击跳转", () => {
  test("渲染同步按钮(idle 态,aria-label=数据同步)", () => {
    const target = document.createElement("div");
    document.body.appendChild(target);
    mount(SyncIndicator, { target });
    flushSync();
    expect(target.querySelector('button[aria-label="数据同步"]')).toBeTruthy();
  });

  test("点击 → 置 sync 深链信号 + navigate(\"/account\") 恰一次", () => {
    const target = document.createElement("div");
    document.body.appendChild(target);
    mount(SyncIndicator, { target });
    flushSync();
    (target.querySelector("button") as HTMLButtonElement).click();
    flushSync();
    expect(pendingAccountSection()).toBe("sync");
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/account");
  });
});
