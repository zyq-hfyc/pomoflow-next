//! 月历工具:ISO 日期格式化 + 自然周(周一起点)计算。
//! 手账视图(JournalView)与月度复盘面板(MonthReviewPanel)共用。
//! (v1 frontend/src/utils/calendar.ts 对应物,v1 12bc45a 抽取)

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function toISO(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** 计算某月(周一在该月)的所有周一日期(自然周起点)。 */
export function getMondays(year: number, month: number): Date[] {
  const mondays: Date[] = [];
  const d = new Date(year, month - 1, 1);
  while (d.getDay() !== 1) d.setDate(d.getDate() + 1); // 前进到首个周一
  while (d.getMonth() === month - 1) {
    mondays.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }
  return mondays;
}
