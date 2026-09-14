/**
 * 本周/本月窗口 —— 单一来源(2026-09-14 去重批)。
 *
 * 此前三份各写各的周一/月末算法:TasksPage 主筛选、TasksPage
 * applyExtraFilters、ProjectSidebar 侧栏计数。v1 口径:周一起始,本地时区。
 */

/** 本周周一 00:00(本地时区)。 */
export function startOfWeek(d: Date): Date {
  const out = new Date(d);
  const day = out.getDay();
  const diff = day === 0 ? -6 : 1 - day; // 周一为一周开始
  out.setDate(out.getDate() + diff);
  out.setHours(0, 0, 0, 0);
  return out;
}

/** 本周周日 23:59:59.999(本地时区)。 */
export function endOfWeek(d: Date): Date {
  const s = startOfWeek(d);
  const e = new Date(s);
  e.setDate(e.getDate() + 6);
  e.setHours(23, 59, 59, 999);
  return e;
}

/** 本月 1 日 00:00(本地时区)。 */
export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

/** 本月最后一天 23:59:59.999(本地时区)。 */
export function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
}
