//! toast 基础设施单测(测试空白 Top6 补全,2026-10-01)。
//!
//! 原生 alert() 的替代:错误路径 `toastError(msg)` → ToastHost 渲染。
//! 锁定三条契约:id 自增、同刻最多 3 条(旧的先走)、4 秒自动消失。
//! 模块级 $state 无重置 API,用 splice 清场隔离用例。

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { toast, toastError } from "./toast.svelte";

describe("toast · 通知队列", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    toast().splice(0); // 模块单例清场
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test("toastError 追加 error 条目,id 自增", () => {
    toastError("第一条");
    toastError("第二条");
    const items = toast();
    expect(items).toHaveLength(2);
    expect(items[0].kind).toBe("error");
    expect(items[0].message).toBe("第一条");
    expect(items[1].id).toBe(items[0].id + 1);
  });

  test("同刻最多 3 条:第 4 条挤走最旧的", () => {
    for (const m of ["m1", "m2", "m3", "m4"]) toastError(m);
    const items = toast();
    expect(items).toHaveLength(3);
    expect(items.map((t) => t.message)).toEqual(["m2", "m3", "m4"]);
  });

  test("4 秒后自动消失(按 id 精确移除,不误删新条目)", () => {
    toastError("会走的");
    expect(toast()).toHaveLength(1);
    vi.advanceTimersByTime(3900);
    expect(toast()).toHaveLength(1);
    vi.advanceTimersByTime(200);
    expect(toast()).toHaveLength(0);
  });

  test("同刻多条各自计时:先入先消失", () => {
    toastError("a");
    vi.advanceTimersByTime(2000);
    toastError("b");
    vi.advanceTimersByTime(2100); // a 到时,b 余 1.9s
    expect(toast().map((t) => t.message)).toEqual(["b"]);
    vi.advanceTimersByTime(2000);
    expect(toast()).toHaveLength(0);
  });
});
