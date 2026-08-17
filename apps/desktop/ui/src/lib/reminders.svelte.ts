//! 任务提醒触发器 —— v1 `frontend/src/hooks/useReminders.ts` 移植(Svelte 5)。
//!
//! - 每 30 秒检查所有 active 任务(本地 IPC 拉,便宜)
//! - 到达"提醒时间点"(due_date - 提前量)→ 系统通知,localStorage 去重
//!   (键 `taskId:reminderTimeMs`,7 天 TTL 清理)
//! - 专注中(running && mode==='focus')跳过不打扰;专注结束自动补弹
//!   (专注结束即触发一次检查,含应用启动时的"错过补弹")
//! - 通知文案走模板 + `{task_title}` 占位替换(v1 调用处 .replace 语义)
//!
//! 挂载:App.svelte 调 `initReminders()`(幂等)。

import { getLang } from "./i18n.svelte";
import { resolveTemplate, type NotificationText } from "./notificationStyles";
import { getTimerState, getNotificationTemplate } from "./timer.svelte";
import * as api from "./api";
import type { Task } from "./api";
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification";

const FIRED_KEY = "pomoflow-fired-reminders";
const CHECK_INTERVAL = 30_000;
const FIRED_TTL = 7 * 24 * 60 * 60 * 1000;

/// Rust Reminder serde 值 → 提前量毫秒(v1 parseReminderOffset 的 map)。
const OFFSETS_MS: Record<string, number> = {
  on_time: 0,
  minutes5: 5 * 60_000,
  minutes30: 30 * 60_000,
  hour1: 60 * 60_000,
  day1: 24 * 60 * 60_000,
  days2: 2 * 24 * 60 * 60_000,
};

function loadFired(): Record<string, number> {
  try {
    const raw = localStorage.getItem(FIRED_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveFired(map: Record<string, number>): void {
  try {
    localStorage.setItem(FIRED_KEY, JSON.stringify(map));
  } catch {
    // localStorage 不可用时忽略,最坏情况重复提醒
  }
}

function isFocusing(): boolean {
  const t = getTimerState();
  return t.running && t.mode === "focus";
}

async function fireNotification(task: Task): Promise<void> {
  const tpl = getNotificationTemplate();
  const lang = getLang();
  const tplText: Partial<NotificationText> | null = tpl
    ? {
        reminder_title: tpl.reminder_title ?? undefined,
        reminder_body: tpl.reminder_body ?? undefined,
      }
    : null;
  const resolved = resolveTemplate(tpl?.style, lang, tplText);
  const body = resolved.reminder_body.replace(/\{task_title\}/g, task.title);
  try {
    let granted = await isPermissionGranted();
    if (!granted) {
      const perm = await requestPermission();
      granted = perm === "granted";
    }
    if (!granted) return;
    sendNotification({ title: resolved.reminder_title, body });
  } catch (e) {
    console.warn("reminder notification failed", e);
  }
}

async function checkOnce(): Promise<void> {
  const now = Date.now();
  const fired = loadFired();
  let changed = false;

  let tasks: Task[] = [];
  try {
    const views = await api.listTasks({ status: "active", limit: null });
    tasks = views as unknown as Task[];
  } catch {
    return; // 拉不到任务 → 本次跳过
  }

  const focusing = isFocusing();
  for (const task of tasks) {
    if (task.status !== "active" || !task.reminder || task.reminder === "none") continue;
    if (!task.due_date) continue;
    const offset = OFFSETS_MS[task.reminder];
    if (offset === undefined) continue;
    const dueMs = new Date(task.due_date).getTime();
    if (Number.isNaN(dueMs)) continue;
    const reminderTime = dueMs - offset;
    if (reminderTime > now) continue; // 未到提醒时间
    const key = `${task.id}:${reminderTime}`;
    if (fired[key]) continue; // 已触发过,去重
    if (focusing) continue; // 专注中跳过,结束后的检查会补弹
    // 先记后发:v1 是全同步无竞态;v2 通知含 IPC await,若后写,
    // 30s tick 与专注结束补弹并发时会双弹同一条
    fired[key] = reminderTime;
    changed = true;
    await fireNotification(task);
  }

  // 清理过期记录(7 天 TTL)
  const expireBefore = now - FIRED_TTL;
  for (const k of Object.keys(fired)) {
    if (fired[k] < expireBefore) {
      delete fired[k];
      changed = true;
    }
  }
  if (changed) saveFired(fired);
}

let _initialized = false;
/// 专注结束标志:上一 tick 在专注、现在不在 → 立即补一次检查(v1 effect 重跑语义)
let _wasFocusing = false;
/// 并发护栏:checkOnce 各持一份 fired 快照,并发跑会双弹同一条
let _inFlight = false;

async function checkOnceGuarded(): Promise<void> {
  if (_inFlight) return;
  _inFlight = true;
  try {
    await checkOnce();
  } finally {
    _inFlight = false;
  }
}

/// 任务列表变化后立即检查一次(v1 useReminders effect 依赖 [tasks]:
/// 新建一个已过提醒时间的任务会立刻弹,不用等 30s tick)。
export function checkRemindersNow(): void {
  void checkOnceGuarded();
}

export function initReminders(): void {
  if (_initialized || typeof window === "undefined") return;
  _initialized = true;

  // 启动补弹(错过检查)+ 周期检查
  void checkOnceGuarded();
  window.setInterval(() => void checkOnceGuarded(), CHECK_INTERVAL);

  // 专注结束 → 立即补弹(200ms 轮询太重,用 1s 检查 focusing 翻转即可;30s 内
  // 也会自然覆盖,这里只是让"结束专注后马上看到被抑制的提醒"更即时)
  window.setInterval(() => {
    const f = isFocusing();
    if (_wasFocusing && !f) void checkOnceGuarded();
    _wasFocusing = f;
  }, 1000);
}
