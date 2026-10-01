//! dueDate 工具单测(测试空白 Top6 补全,2026-10-01)。
//!
//! TaskForm / TaskDetailPanel / TasksPage 三处共用的日期口径。最关键的
//! 一条:**UTC RFC3339 必须先转本地再取日期** —— 直接截前 10 位会把东
//! 八区本地午夜的任务错归前一天(v2 存储格式引入的新坑,v1 无此问题)。
//! 时区相关断言用动态期望值(本地 Date 推算),锁定「本地日」契约本身,
//! 在任何 TZ 下都成立(含 CI 的 UTC)。

import { describe, expect, test } from "vitest";
import {
  hasTimePart,
  datePart,
  todayStr,
  tomorrowStr,
  fillCurrentTime,
  toLocal,
  toIsoUtc,
} from "./dueDate";

/** 用本地 Date 推算某 ISO 时刻的本地 "YYYY-MM-DD"(与实现无关的期望值)。 */
function localDateOf(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

describe("hasTimePart / datePart", () => {
  test("含 'T' 即视为选了时分", () => {
    expect(hasTimePart("2026-07-12T09:30")).toBe(true);
    expect(hasTimePart("2026-07-12")).toBe(false);
    expect(hasTimePart(null)).toBe(false);
    expect(hasTimePart(undefined)).toBe(false);
  });

  test("纯日期串原样返回(前 10 位)", () => {
    expect(datePart("2026-07-12")).toBe("2026-07-12");
    expect(datePart("")).toBe("");
    expect(datePart(null)).toBe("");
  });

  test("UTC RFC3339 → 本地日期(不是 UTC 日期)", () => {
    // 东八区 0-8 点的本地午夜 = 前一天 16:00-24:00 UTC;直接截 UTC 前 10
    // 位会错归前一天。断言与「本地日」契约一致(任何 TZ 下成立)。
    const iso = "2026-07-12T17:00:00.000Z";
    expect(datePart(iso)).toBe(localDateOf(iso));
  });
});

describe("todayStr / tomorrowStr / fillCurrentTime", () => {
  test("today/tomorrow 是本地日期串,且相差一天", () => {
    const today = todayStr();
    expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    // tomorrowStr 解析回 Date 应正好晚一天(月末/年末靠 Date 归一化)
    const diff =
      (new Date(tomorrowStr()).getTime() - new Date(today).getTime()) / 86400000;
    expect(diff).toBe(1);
  });

  test("fillCurrentTime:日期缺失用今天,时间缺失补当前时分", () => {
    expect(fillCurrentTime("2026-07-12")).toMatch(/^2026-07-12T\d{2}:\d{2}$/);
    expect(fillCurrentTime(null)).toMatch(/^.{10}T\d{2}:\d{2}$/);
    expect(fillCurrentTime(null).slice(0, 10)).toBe(todayStr());
  });
});

describe("toLocal / toIsoUtc · UTC ↔ 本地互转", () => {
  test("toLocal:UTC → 本地 16 位;非法/空输入回空串", () => {
    const iso = "2026-07-12T09:30:00.000Z";
    expect(toLocal(iso)).toBe(
      (() => {
        const d = new Date(iso);
        const pad = (n: number) => String(n).padStart(2, "0");
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
      })(),
    );
    expect(toLocal("not-a-date")).toBe("");
    expect(toLocal("")).toBe("");
    expect(toLocal(null)).toBe("");
  });

  test("toIsoUtc:纯日期按 UTC 午夜(ECMAScript 解析语义,契约锁定)", () => {
    expect(toIsoUtc("2026-07-12")).toBe("2026-07-12T00:00:00.000Z");
  });

  test("toIsoUtc:datetime-local 按本地时刻转 UTC;非法/空输入回 null", () => {
    expect(toIsoUtc("2026-07-12T09:30")).toBe(
      new Date("2026-07-12T09:30").toISOString(),
    );
    expect(toIsoUtc("not-a-date")).toBeNull();
    expect(toIsoUtc("")).toBeNull();
    expect(toIsoUtc(null)).toBeNull();
  });

  test("round-trip:toLocal(toIsoUtc(x)) 保住本地时刻", () => {
    const local = "2026-07-12T09:30";
    expect(toLocal(toIsoUtc(local))).toBe(local);
  });
});
