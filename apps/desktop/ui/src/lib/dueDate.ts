//! 截止时间（due_date）相关工具。
//!
//! 后端 due_date 存为 UTC RFC3339（如 "2026-07-12T09:30:00Z"）。
//! 前端表单用本地 datetime-local（"YYYY-MM-DD" 或 "YYYY-MM-DDTHH:MM"）。
//!
//! `TaskForm` / `TaskDetailPanel` / `TasksPage` 共用本工具保证校验逻辑一致。
//!
//! 与 v1 完全对齐：
//! - `hasTimePart`：含 'T' 即视为用户选了时分
//! - `datePart`：取 YYYY-MM-DD 部分
//! - `todayStr`：今天 YYYY-MM-DD
//! - `fillCurrentTime`：补全时分（默认当前时刻），用于"设置了提醒但用户未选时间"的兜底
//! - `toLocal`：UTC RFC3339 → 本地 "YYYY-MM-DDTHH:MM"（datetime-local 展示）
//! - `toIsoUtc`：本地 "YYYY-MM-DD[THH:MM]" → UTC RFC3339（提交后端）

/** due_date 是否包含时间部分（含 'T' 即视为用户选了时分）。 */
export function hasTimePart(dueDate: string | null | undefined): boolean {
  return !!dueDate && dueDate.includes("T");
}

/** 取日期部分 "YYYY-MM-DD"（兼容纯日期与 datetime 字符串）。 */
export function datePart(dueDate: string | null | undefined): string {
  return (dueDate || "").slice(0, 10);
}

/** 今天的 "YYYY-MM-DD"。 */
export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** 当前时分的 "HH:MM"。 */
function nowHHMM(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

/**
 * 把（可能缺时间的）due_date 补全为带当前时分的 datetime-local 值。
 * 日期缺失时用今天，返回 "YYYY-MM-DDTHH:MM"。
 */
export function fillCurrentTime(dueDate: string | null | undefined): string {
  return `${datePart(dueDate) || todayStr()}T${nowHHMM()}`;
}

/**
 * 同 fillCurrentTime，但返回的字符串不带 'T' 前的部分补全 — 用于 Picker。
 * 实际上等价于 fillCurrentTime(dueDate)。
 */
export function ensureTimePart(dueDate: string | null | undefined): string {
  return fillCurrentTime(dueDate);
}

/** 明天的 "YYYY-MM-DD"。 */
export function tomorrowStr(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * 后端存的 UTC RFC3339(如 "2026-07-12T09:30:00Z")→ 本地时区的
 * "YYYY-MM-DDTHH:MM",供 datetime-local 控件展示。
 */
export function toLocal(iso: string | null | undefined): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    const off = d.getTimezoneOffset();
    const local = new Date(d.getTime() - off * 60000);
    return local.toISOString().slice(0, 16);
  } catch {
    return "";
  }
}

/**
 * 本地时间字符串(YYYY-MM-DD 或 YYYY-MM-DDTHH:MM)→ UTC RFC3339。
 * 后端 `Task.due_date: DateTime<Utc>` 只接受带时区的 RFC3339,
 * 纯日期/naive 字符串会被 chrono 拒收("premature end of input")。
 */
export function toIsoUtc(local: string | null | undefined): string | null {
  if (!local) return null;
  try {
    const d = new Date(local);
    if (isNaN(d.getTime())) return null;
    return d.toISOString();
  } catch {
    return null;
  }
}