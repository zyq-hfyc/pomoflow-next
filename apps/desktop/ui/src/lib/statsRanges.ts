//! 统计页维度区间/标签工具 —— v1 `pomoflow/frontend/src/pages/StatsPage.tsx` 的
//! `DIMENSIONS` / `getRange` / `getPrevRange` / `keyLabel` 纯函数移植。
//!
//! 边界语义(与 v1 逐条对齐,勿擅自改动):
//! - today    : 当天,固定 1 天
//! - week     : 本周一 → 周日,固定 7 天(周一开始;周日属于上一周)
//! - month    : 自然月(1 号 → 月末)
//! - quarter  : 自然季度(季度首月 1 号 → 季度末月月末,按 3 个月推进)
//! - halfyear : 自然半年(上半年 1/1–6/30,下半年 7/1–12/31,按 6 个月推进)
//! - year     : 自然年(1/1 → 12/31)
//! - prev     : 对齐日历边界取上一自然周期(昨日/上周/上月/上季/上半年/去年)
//!
//! 趋势粒度(group)按维度固定:today/week/month → day,quarter → week,
//! halfyear/year → month。
//!
//! 所有函数均为纯函数;`now` 参数仅用于注入"当前时刻"方便核对边界,
//! 缺省取系统时间。日期一律本地时区(与后端 `tz_offset_min` 分桶口径一致)。

import type { StatsGroup } from "./api";

/** 统计页维度键(v1 Dimension) */
export type StatsDimension =
  | "today"
  | "week"
  | "month"
  | "quarter"
  | "halfyear"
  | "year";

/** 维度元数据:趋势聚合粒度(pill 展示文案由 StatsPage 查词典 t.stats.dimXXX,本 lib 不含 UI 文案) */
export interface DimensionSpec {
  key: StatsDimension;
  group: StatsGroup;
}

/** 6 维度定义(顺序即 pill 顺序;粒度映射 v1 原样) */
export const DIMENSIONS: DimensionSpec[] = [
  { key: "today", group: "day" },
  { key: "week", group: "day" },
  { key: "month", group: "day" },
  { key: "quarter", group: "week" },
  { key: "halfyear", group: "month" },
  { key: "year", group: "month" },
];

/** 一个维度的完整区间描述(日期均为本地 YYYY-MM-DD,双端包含) */
export interface DimensionRange {
  start: string;
  end: string;
  /** 区间实际天数(整区间,如 8 月中旬看"本月"仍是 31 天 —— v1 口径) */
  days: number;
  group: StatsGroup;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** 本地日期 → "YYYY-MM-DD"(不走 toISOString,避免 UTC 偏移串天) */
export function isoDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** a..b 的天数(双端包含;round 抵消 DST 造成的毫秒漂移) */
function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86400000) + 1;
}

/**
 * 维度 → 当前区间 + 趋势粒度。
 *
 * 单测式锚点(锚点日 2026-08-16 是周日,已核对日历):
 * ```
 * getRange("today",    sun) → { start:"2026-08-16", end:"2026-08-16", days:1,  group:"day"   }
 * getRange("week",     sun) → { start:"2026-08-10", end:"2026-08-16", days:7,  group:"day"   }
 * getRange("month",    sun) → { start:"2026-08-01", end:"2026-08-31", days:31, group:"day"   }
 * getRange("quarter",  sun) → { start:"2026-07-01", end:"2026-09-30", days:92, group:"week"  }
 * getRange("halfyear", sun) → { start:"2026-07-01", end:"2026-12-31", days:184,group:"month" }
 * getRange("year",     sun) → { start:"2026-01-01", end:"2026-12-31", days:365,group:"month" }
 * ```
 * (锚点构造:`new Date(2026, 7, 16)` —— 8 月 16 日周日,跨周/月/季/半年全档覆盖)
 */
export function getRange(dim: StatsDimension, now: Date = new Date()): DimensionRange {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dow = today.getDay();
  const mondayOffset = dow === 0 ? -6 : 1 - dow;

  if (dim === "today") {
    return { start: isoDate(today), end: isoDate(today), days: 1, group: "day" };
  }
  if (dim === "week") {
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return { start: isoDate(monday), end: isoDate(sunday), days: 7, group: "day" };
  }
  if (dim === "month") {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return { start: isoDate(start), end: isoDate(end), days: end.getDate(), group: "day" };
  }
  if (dim === "quarter") {
    const q = Math.floor(today.getMonth() / 3);
    const start = new Date(today.getFullYear(), q * 3, 1);
    const end = new Date(today.getFullYear(), q * 3 + 3, 0);
    return { start: isoDate(start), end: isoDate(end), days: daysBetween(start, end), group: "week" };
  }
  if (dim === "halfyear") {
    const half = today.getMonth() < 6 ? 0 : 6;
    const start = new Date(today.getFullYear(), half, 1);
    const end = new Date(today.getFullYear(), half + 6, 0);
    return { start: isoDate(start), end: isoDate(end), days: daysBetween(start, end), group: "month" };
  }
  // year
  const start = new Date(today.getFullYear(), 0, 1);
  const end = new Date(today.getFullYear(), 11, 31);
  return { start: isoDate(start), end: isoDate(end), days: daysBetween(start, end), group: "month" };
}

/**
 * 维度 → 上一周期区间(环比取数)。
 *
 * 规则:对齐日历边界取上一个自然日/周/月/季/半年/年。
 *
 * v1 原实现(v1 已同步修复)按「当前区间天数」整体回退:当前期与上期长度
 * 不等(月有大小、季度 90-92 天、半年 181/184 天)时上期窗口漂移 1~3 天
 * —— Q3 prev 从 03-31 起、下半年 prev 从上一年 12-29 起、3 月 prev 从
 * 01-29 起,环比分母混入更早周期的数据。
 *
 * 单测式锚点(同上 2026-08-16 周日,已实测核对):
 * ```
 * getPrevRange("today",    sun) → { start:"2026-08-15", end:"2026-08-15" }
 * getPrevRange("week",     sun) → { start:"2026-08-03", end:"2026-08-09" }
 * getPrevRange("month",    sun) → { start:"2026-07-01", end:"2026-07-31" }
 * getPrevRange("quarter",  sun) → { start:"2026-04-01", end:"2026-06-30" } // 自然 Q2
 * getPrevRange("halfyear", sun) → { start:"2026-01-01", end:"2026-06-30" } // 自然 H1
 * getPrevRange("year",     sun) → { start:"2025-01-01", end:"2025-12-31" }
 * ```
 */
export function getPrevRange(
  dim: StatsDimension,
  now: Date = new Date(),
): { start: string; end: string } {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dow = today.getDay();
  const mondayOffset = dow === 0 ? -6 : 1 - dow;

  if (dim === "today") {
    const d = new Date(today);
    d.setDate(today.getDate() - 1);
    return { start: isoDate(d), end: isoDate(d) };
  }
  if (dim === "week") {
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset - 7);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return { start: isoDate(monday), end: isoDate(sunday) };
  }
  if (dim === "month") {
    // Date 自动进位:1 月的上月 = 上一年 12 月
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const end = new Date(today.getFullYear(), today.getMonth(), 0);
    return { start: isoDate(start), end: isoDate(end) };
  }
  if (dim === "quarter") {
    const q = Math.floor(today.getMonth() / 3);
    const start = new Date(today.getFullYear(), (q - 1) * 3, 1);
    const end = new Date(today.getFullYear(), q * 3, 0);
    return { start: isoDate(start), end: isoDate(end) };
  }
  if (dim === "halfyear") {
    const half = today.getMonth() < 6 ? 0 : 6;
    const start = new Date(today.getFullYear(), half - 6, 1);
    const end = new Date(today.getFullYear(), half, 0);
    return { start: isoDate(start), end: isoDate(end) };
  }
  // year
  const start = new Date(today.getFullYear() - 1, 0, 1);
  const end = new Date(today.getFullYear() - 1, 11, 31);
  return { start: isoDate(start), end: isoDate(end) };
}

/**
 * 维度的趋势粒度(等价 `DIMENSIONS.find(d => d.key === dim)!.group`)。
 *
 * ```
 * groupOfDimension("today") → "day"    groupOfDimension("quarter")  → "week"
 * groupOfDimension("week")  → "day"    groupOfDimension("halfyear") → "month"
 * groupOfDimension("month") → "day"    groupOfDimension("year")     → "month"
 * ```
 */
export function groupOfDimension(dim: StatsDimension): StatsGroup {
  const spec = DIMENSIONS.find((d) => d.key === dim);
  return spec ? spec.group : "day";
}

/**
 * 趋势 key → 卡片/轴标签(v1 keyLabel 原样)。
 *
 * ```
 * keyLabel("2026-08-16", "day")   → "8/16"
 * keyLabel("2026-08-10", "week")  → "8/10"   // 周桶 key 是周一日期
 * keyLabel("2026-08",    "month") → "8"
 * ```
 */
export function keyLabel(key: string, group: StatsGroup): string {
  if (group === "month") return `${Number(key.slice(5, 7))}`;
  return `${Number(key.slice(5, 7))}/${Number(key.slice(8, 10))}`;
}

/**
 * 当前时刻所在的趋势桶 key(柱状图"当前桶"高亮用)。
 *
 * ```
 * currentBucketKey("day",   sun) → "2026-08-16"
 * currentBucketKey("week",  sun) → "2026-08-10"  // 本周一
 * currentBucketKey("month", sun) → "2026-08"
 * ```
 */
export function currentBucketKey(group: StatsGroup, now: Date = new Date()): string {
  if (group === "month") {
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
  }
  if (group === "week") {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dow = today.getDay();
    const mondayOffset = dow === 0 ? -6 : 1 - dow;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    return isoDate(monday);
  }
  return isoDate(now);
}
