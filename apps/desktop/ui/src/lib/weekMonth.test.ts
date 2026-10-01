//! weekMonth 本周/本月窗口单测(测试空白 Top6 补全,2026-10-01)。
//!
//! 三个消费面(TasksPage 主筛选 / applyExtraFilters / ProjectSidebar 计数)
//! 的单一来源。重点是**跨年/跨月边界**:周一起始的周日回退、12 月
//! endOfMonth 年份进位、闰年 2 月 —— 这些是当年三份手写实现口径分叉的
//! 高发区。窗口全部本地时区,不能用 UTC 推。

import { describe, expect, test } from "vitest";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "./weekMonth";

describe("startOfWeek · 周一起始(本地时区)", () => {
  test("周一当天 → 当天 00:00", () => {
    // 2026-09-28 是周一
    const s = startOfWeek(new Date(2026, 8, 28, 15, 30));
    expect(s.getFullYear()).toBe(2026);
    expect(s.getMonth()).toBe(8);
    expect(s.getDate()).toBe(28);
    expect(s.getHours()).toBe(0);
    expect(s.getMinutes()).toBe(0);
  });

  test("周日 → 回退 6 天到上一个周一(不是下周)", () => {
    // 2026-10-04 是周日
    const s = startOfWeek(new Date(2026, 9, 4, 12, 0));
    expect(s.getDate()).toBe(28);
    expect(s.getMonth()).toBe(8); // 9 月 28 日周一
  });

  test("周三 → 本周一", () => {
    // 2026-09-30 是周三
    const s = startOfWeek(new Date(2026, 8, 30, 9, 0));
    expect(s.getDate()).toBe(28);
  });

  test("跨年:1 月 1 日(周四)→ 上一年的周一 12-29", () => {
    // 2026-01-01 是周四,本周一是 2025-12-29
    const s = startOfWeek(new Date(2026, 0, 1, 10, 0));
    expect(s.getFullYear()).toBe(2025);
    expect(s.getMonth()).toBe(11);
    expect(s.getDate()).toBe(29);
  });

  test("endOfWeek = startOfWeek + 6 天 23:59:59.999", () => {
    const e = endOfWeek(new Date(2026, 8, 30, 12, 0));
    expect(e.getMonth()).toBe(9); // 10 月 4 日周日
    expect(e.getDate()).toBe(4);
    expect(e.getHours()).toBe(23);
    expect(e.getMinutes()).toBe(59);
    expect(e.getSeconds()).toBe(59);
    expect(e.getMilliseconds()).toBe(999);
  });
});

describe("startOfMonth / endOfMonth · 含跨年与闰年", () => {
  test("普通月:1 日 00:00 → 月末 23:59:59.999", () => {
    const s = startOfMonth(new Date(2026, 8, 15, 12, 0));
    expect([s.getFullYear(), s.getMonth(), s.getDate(), s.getHours()]).toEqual([2026, 8, 1, 0]);
    const e = endOfMonth(new Date(2026, 8, 15, 12, 0));
    expect([e.getMonth(), e.getDate(), e.getHours(), e.getMilliseconds()]).toEqual([8, 30, 23, 999]);
  });

  test("跨年:12 月 endOfMonth 年份不进位、日为 31", () => {
    const e = endOfMonth(new Date(2026, 11, 10, 8, 0));
    expect([e.getFullYear(), e.getMonth(), e.getDate()]).toEqual([2026, 11, 31]);
  });

  test("跨年:1 月 startOfMonth/endOfMonth 不回退到上年", () => {
    const s = startOfMonth(new Date(2026, 0, 31, 23, 0));
    expect([s.getFullYear(), s.getMonth(), s.getDate()]).toEqual([2026, 0, 1]);
    const e = endOfMonth(new Date(2026, 0, 1, 0, 30));
    expect([e.getFullYear(), e.getMonth(), e.getDate()]).toEqual([2026, 0, 31]);
  });

  test("闰年 2 月 29 天;平年 28 天", () => {
    expect(endOfMonth(new Date(2024, 1, 10)).getDate()).toBe(29); // 2024 闰
    expect(endOfMonth(new Date(2026, 1, 10)).getDate()).toBe(28); // 2026 平
  });

  test("31 号日输入不会被归一化到次月(endOfMonth 锚同月)", () => {
    // new Date(y, m+1, 0) 算法:输入 1/31 时若错用 setDate(32) 会进 2 月
    const e = endOfMonth(new Date(2026, 0, 31, 12, 0));
    expect(e.getMonth()).toBe(0);
    expect(e.getDate()).toBe(31);
  });
});
