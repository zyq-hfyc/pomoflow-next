/**
 * 提醒 / 重复选项 + 词典映射 —— 单一来源(2026-09-14 去重批)。
 *
 * 此前 TaskForm 与 TaskDetailPanel 各持一份整块复制(选项数组 + serde 值 →
 * v1 词典键映射 + label 函数)。value 就是 Rust enum 的 serde 输出,与
 * api.ts 的 Reminder / Repeat 类型一致(类型级断言在文件底部)。
 */
import type { Dict } from "./i18n";
import type { Reminder, Repeat } from "./api";

export const REMINDER_OPTIONS = [
  { value: "none" },
  { value: "on_time" },
  { value: "minutes5" },
  { value: "minutes30" },
  { value: "hour1" },
  { value: "day1" },
  { value: "days2" },
] as const;

export const REPEAT_OPTIONS = [
  { value: "none" },
  { value: "daily" },
  { value: "weekdays" },
  { value: "weekly" },
  { value: "monthly" },
  { value: "yearly" },
  { value: "custom" },
] as const;

export type ReminderValue = (typeof REMINDER_OPTIONS)[number]["value"];
export type RepeatValue = (typeof REPEAT_OPTIONS)[number]["value"];

// v2 Rust serde 值 → v1 词典 enum 键(v1 词典键形如 '' / '5m' / 'weekday')
export const REMINDER_DICT_KEY: Record<ReminderValue, keyof Dict["enum"]["reminder"]> =
  {
    none: "",
    on_time: "on_time",
    minutes5: "5m",
    minutes30: "30m",
    hour1: "1h",
    day1: "1d",
    days2: "2d",
  };

export const REPEAT_DICT_KEY: Record<RepeatValue, keyof Dict["enum"]["repeat"]> = {
  none: "",
  daily: "daily",
  weekdays: "weekday",
  weekly: "weekly",
  monthly: "monthly",
  yearly: "yearly",
  custom: "custom",
};

export function reminderLabel(t: Dict, v: ReminderValue): string {
  return t.enum.reminder[REMINDER_DICT_KEY[v]];
}

export function repeatLabel(t: Dict, v: RepeatValue): string {
  return t.enum.repeat[REPEAT_DICT_KEY[v]];
}

// 类型级断言:options 的 value 必须是 api 类型(Rust serde 输出)的子集 ——
// 取代原先组件里的 satisfies 占位 hack。
const _reminderValuesAreApiValues: Reminder[] = REMINDER_OPTIONS.map((o) => o.value);
const _repeatValuesAreApiValues: Repeat[] = REPEAT_OPTIONS.map((o) => o.value);
void _reminderValuesAreApiValues;
void _repeatValuesAreApiValues;
