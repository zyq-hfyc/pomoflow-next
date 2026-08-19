//! 全局番茄钟引擎 —— v1 `context/AppContext.tsx` 计时段的 Svelte 5 runes 移植。
//!
//! ## v1 语义(逐条保持)
//!
//! - **挂钟计时**:start 锚定 `startedAtMs + startSeconds`,tick 按真实流逝算
//!   `max(0, startSeconds - elapsed)` —— 后台/睡眠不漂移;`visibilitychange`
//!   回前台立即校准;pause 保留会话、resume 重新锚定。
//! - **空闲回满**:未运行且无会话时,secondsLeft 恒等于当前模式/任务时长
//!   (切任务/切模式不闪环)。
//! - **完成检测**:`secondsLeft===0 && !running && sessionId!==null && !triggered`
//!   → handleComplete(在模块层,路由切换不丢;新会话开始时清标志)。
//! - **完成链**(focus 结束):模板文案通知 + 弹窗 → stopPomodoro(true) →
//!   今日统计本地累加(跨天先重置)→ 刷新任务 →
//!   `!disableBreak && autoStartBreak` → 长短休息判定 `(终身计数+1)%interval===0`
//!   → 休息会话 task_id=null、project 继承活动任务;
//!   否则同任务未达预估则留,达预估/已完成 → pickNextAutoTask 接续,
//!   `autoStartNextPomodoro` 决定是否自动开。休息结束同"留/接续"回 focus。
//! - **终身专注计数**:localStorage `pomoflow-focus-count`,中断/放弃不清零。
//! - **候选池**:active + due 在本月 + due 日 ≤ 今天,优先级 high>medium>low>none,
//!   同级 created_at 升序,取第一;未来任务不自动接续。
//! - **无任务专注**:允许(taskId=null,时长用全局设置)。

import { getSettings } from "./settings.svelte";
import { getLang } from "./i18n.svelte";
import { resolveTemplate, type NotificationText } from "./notificationStyles";
import * as api from "./api";
import type { Task } from "./api";
import {
  isPermissionGranted,
  requestPermission,
} from "@tauri-apps/plugin-notification";

export type TimerMode = "focus" | "short_break" | "long_break";

const FOCUS_COUNT_KEY = "pomoflow-focus-count";

interface TimerState {
  mode: TimerMode;
  secondsLeft: number;
  running: boolean;
  sessionId: string | null;
  /// 当前活动任务(全局;null = 无特定任务专注)
  activeTask: Task | null;
  /// 终身已完成专注数(长休判定用;localStorage 持久)
  focusCompletedCount: number;
  /// 完成弹窗文案(非 null 时 TimerPage 显示;看完清掉)
  pendingCompletionMessage: string | null;
  /// 今日统计(本地即时累加;跨天重置)
  todayCount: number;
  todayMinutes: number;
}

let _state = $state<TimerState>({
  mode: "focus",
  secondsLeft: getSettings().focusDuration * 60,
  running: false,
  sessionId: null,
  activeTask: null,
  focusCompletedCount: loadFocusCount(),
  pendingCompletionMessage: null,
  todayCount: 0,
  todayMinutes: 0,
});

/// 挂钟锚点(非响应式;暂停时保留剩余,恢复时重锚)
let startedAtMs = 0;
let startSeconds = 0;
/// 今日统计对应的日期(toDateString 形式,跨天检测)
let lastStatsDay = new Date().toDateString();
/// 完成检测一次性标志(防重复触发)
let completionTriggered = false;
/// 当前通知模板(启动时拉取;设置页保存后可 refresh)
let _template: api.NotificationTemplate | null = null;

function loadFocusCount(): number {
  try {
    return parseInt(localStorage.getItem(FOCUS_COUNT_KEY) || "0", 10) || 0;
  } catch {
    return 0;
  }
}

export function getTimerState(): TimerState {
  return _state;
}

export function getNotificationTemplate(): api.NotificationTemplate | null {
  return _template;
}

/// 拉取通知模板(App 启动 + 设置页保存后调用)。
export async function refreshNotificationTemplate(): Promise<void> {
  try {
    _template = await api.getNotificationTemplate();
  } catch {
    // 拉不到 → resolveTemplate 回落 default 预设
  }
}

/// 有效专注时长(分钟):活动任务自带 → 否则全局设置(v1 effectiveFocusDuration)
function effectiveFocusMinutes(): number {
  return _state.activeTask?.pomodoro_duration ?? getSettings().focusDuration;
}

function modeSeconds(mode: TimerMode): number {
  const s = getSettings();
  return mode === "focus"
    ? effectiveFocusMinutes() * 60
    : mode === "short_break"
      ? s.shortBreakDuration * 60
      : s.longBreakDuration * 60;
}

/// 空闲(未运行且无会话)时秒数跟随模式/任务时长 —— 圆环回满不闪动。
function snapIfIdle() {
  if (!_state.running && _state.sessionId === null) {
    _state.secondsLeft = modeSeconds(_state.mode);
  }
}

/// 启动一次计时(v1 startTimer)。
///
/// - focus:`taskId` 可空(无特定任务);时长 override 分钟数或按模式推
/// - break:taskId 恒空,project 继承活动任务
export async function start(
  taskId: string | null,
  projectId: string | null,
  overrideDurationMinutes?: number,
): Promise<void> {
  const duration =
    overrideDurationMinutes ?? Math.floor(modeSeconds(_state.mode) / 60);
  const session = await api.startPomodoro(taskId, projectId, duration);
  _state.sessionId = session.id;
  if (overrideDurationMinutes !== undefined) {
    _state.secondsLeft = overrideDurationMinutes * 60;
  }
  startedAtMs = Date.now();
  startSeconds = _state.secondsLeft;
  _state.running = true;
  completionTriggered = false;
}

/// 从任务列表一键开始:先停掉进行中的会话(按放弃计),再开新专注(v1 行为)。
export async function startWithTask(task: Task): Promise<void> {
  if (_state.sessionId !== null) {
    await stop(false);
  }
  _state.activeTask = task;
  _state.mode = "focus";
  snapIfIdle();
  await start(task.id, task.project_id ?? null, task.pomodoro_duration ?? undefined);
}

/// 从任务清单页「开始」按钮进入(v1 TasksPage handleStartTask + TimerPage
/// autostart effect):**不打断进行中的专注** —— running 时只切换活动任务并跳转;
/// 空闲(含暂停遗留会话,统一停干净)才自动开新会话。
export async function startWithTaskFromList(task: Task): Promise<void> {
  _state.activeTask = task;
  if (_state.running) {
    return; // 会话继续,选择器已切到新任务
  }
  if (_state.sessionId !== null) {
    await stop(false);
  }
  _state.mode = "focus";
  snapIfIdle();
  await start(task.id, task.project_id ?? null, task.pomodoro_duration ?? undefined);
}

export function pause(): void {
  if (!_state.running) return;
  _state.running = false;
}

export function resume(): void {
  if (_state.running || _state.sessionId === null) return;
  startedAtMs = Date.now();
  startSeconds = _state.secondsLeft;
  _state.running = true;
}

/// 用户主动停止(completed=false=放弃/跳过)或由完成链调用(true)。
///
/// 注意:自然完成走 tick→handleComplete,那里负责通知/接续;这里只收尾状态。
export async function stop(completed: boolean): Promise<void> {
  const sessionId = _state.sessionId;
  _state.running = false;
  _state.sessionId = null;
  if (sessionId !== null) {
    try {
      await api.stopPomodoro(sessionId, completed);
    } catch (e) {
      console.warn("stop pomodoro failed", e);
    }
  }
  _state.secondsLeft = modeSeconds(_state.mode);
}

/// 切换模式(手动):停掉一切并回满(v1 switchTimerMode 不写后端)。
export function switchMode(mode: TimerMode): void {
  _state.mode = mode;
  _state.running = false;
  _state.sessionId = null;
  _state.secondsLeft = modeSeconds(mode);
}

/// 挂钟 tick:App.svelte 每秒调用;按真实流逝计算,到 0 触发完成。
export function tick(): void {
  if (!_state.running) return;
  const elapsed = Math.floor((Date.now() - startedAtMs) / 1000);
  const next = Math.max(0, startSeconds - elapsed);
  if (next <= 0) {
    _state.secondsLeft = 0;
    _state.running = false; // 先停 tick,完成链异步接管
    if (_state.sessionId !== null && !completionTriggered) {
      completionTriggered = true;
      void handleComplete();
    }
    return;
  }
  _state.secondsLeft = next;
}

/// 回前台立即校准(v1 visibilitychange;App.svelte 挂载监听)。
export function recalibrateOnVisible(): void {
  if (!_state.running) return;
  const elapsed = Math.floor((Date.now() - startedAtMs) / 1000);
  const next = Math.max(0, startSeconds - elapsed);
  if (next <= 0) {
    _state.secondsLeft = 0;
    _state.running = false;
    if (_state.sessionId !== null && !completionTriggered) {
      completionTriggered = true;
      void handleComplete();
    }
  } else {
    _state.secondsLeft = next;
  }
}

export function clearCompletionMessage(): void {
  _state.pendingCompletionMessage = null;
}

export function setActiveTask(task: Task | null): void {
  _state.activeTask = task;
  snapIfIdle();
}

export function applySettingsChange(): void {
  snapIfIdle();
}

// === 今日统计 ===

/// 专注完成时的本地即时累加(v1:不依赖后端往返,无任务专注也计入)。
function bumpTodayStats(minutes: number) {
  const today = new Date().toDateString();
  if (today !== lastStatsDay) {
    lastStatsDay = today;
    _state.todayCount = 1;
    _state.todayMinutes = minutes;
  } else {
    _state.todayCount += 1;
    _state.todayMinutes += minutes;
  }
}

export function resetTodayStats(count: number, minutes: number): void {
  _state.todayCount = count;
  _state.todayMinutes = minutes;
  lastStatsDay = new Date().toDateString();
}

/// 从后端总览重拉今日统计(v1 refreshTodayStats:启动 / 回前台 / 跨午夜)。
export async function syncTodayStatsFromOverview(): Promise<void> {
  try {
    const now = new Date();
    const dow = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
    monday.setHours(0, 0, 0, 0);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const iso = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const s = await api.statsOverview(
      iso(now),
      iso(monday),
      iso(monthStart),
      -now.getTimezoneOffset(),
    );
    resetTodayStats(s.today_sessions, s.today_minutes);
  } catch (e) {
    console.warn("sync today stats", e);
  }
}

/// 今日统计的三类重同步时机(v1 AppContext L323-341):
/// 1. 启动(App 调一次)2. 回前台 3. 60s 跨午夜检测。
let _statsTimersInitialzed = false;
export function initTodayStatsSync(): void {
  if (_statsTimersInitialzed || typeof window === "undefined") return;
  _statsTimersInitialzed = true;
  void syncTodayStatsFromOverview();
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) void syncTodayStatsFromOverview();
  });
  let lastDay = new Date().toDateString();
  window.setInterval(() => {
    const today = new Date().toDateString();
    if (today !== lastDay) {
      lastDay = today;
      void syncTodayStatsFromOverview();
    }
  }, 60_000);
}

// === 完成链(v1 handleTimerComplete) ===

/// 候选池:active + due 本月 + due 日 ≤ 今天;优先级 → created 升序。
function pickNextAutoTask(list: Task[]): Task | null {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  const order: Record<string, number> = { high: 0, medium: 1, low: 2, none: 3 };
  const pool = list.filter((t) => {
    if (t.status !== "active" || !t.due_date) return false;
    const d = new Date(t.due_date);
    if (isNaN(d.getTime()) || d < monthStart || d > monthEnd) return false;
    const dueDay = new Date(d);
    dueDay.setHours(0, 0, 0, 0);
    return dueDay.getTime() <= now.getTime();
  });
  pool.sort((a, b) => {
    const pa = order[a.priority ?? "none"] ?? 3;
    const pb = order[b.priority ?? "none"] ?? 3;
    if (pa !== pb) return pa - pb;
    return (
      new Date(a.created_at ?? 0).getTime() - new Date(b.created_at ?? 0).getTime()
    );
  });
  return pool[0] ?? null;
}

async function sendSystemNotification(title: string, body: string): Promise<void> {
  if (!getSettings().desktopNotificationEnabled) return;
  try {
    let granted = await isPermissionGranted();
    if (!granted) {
      const perm = await requestPermission();
      granted = perm === "granted";
    }
    if (!granted) return;
    // 走自有命令(显式 AUMID):dev 下插件发送会显示"Windows PowerShell"签名
    void api.sendSystemNotification(title, body);
  } catch (e) {
    console.warn("notification failed", e);
  }
}

async function handleComplete(): Promise<void> {
  const mode = _state.mode;
  // v1:今日统计按完整模式时长计(与暂停无关),不用 startSeconds(暂停续跑会少计)
  const totalMinutes = Math.floor(modeSeconds(mode) / 60);
  const task = _state.activeTask;

  // 通知/弹窗文案:模板按当前语言解析(focus/break 用各自字段)
  const lang = getLang();
  const tplText: Partial<NotificationText> | null = _template
    ? {
        focus_end_title: _template.focus_end_title ?? undefined,
        focus_end_body: _template.focus_end_body ?? undefined,
        break_end_title: _template.break_end_title ?? undefined,
        break_end_body: _template.break_end_body ?? undefined,
        reminder_title: _template.reminder_title ?? undefined,
        reminder_body: _template.reminder_body ?? undefined,
      }
    : null;
  const resolved = resolveTemplate(_template?.style, lang, tplText);
  const title = mode === "focus" ? resolved.focus_end_title : resolved.break_end_title;
  const body = mode === "focus" ? resolved.focus_end_body : resolved.break_end_body;
  await sendSystemNotification(title, body);
  _state.pendingCompletionMessage = body;

  // 收尾会话(is_completed=true;后端顺带完成达预估的任务)
  const sessionId = _state.sessionId;
  _state.running = false;
  _state.sessionId = null;
  if (sessionId !== null) {
    try {
      await api.stopPomodoro(sessionId, true);
    } catch (e) {
      console.warn("stop pomodoro failed", e);
    }
  }

  const s = getSettings();

  if (mode === "focus") {
    // 终身计数 + 今日统计本地累加
    _state.focusCompletedCount += 1;
    try {
      localStorage.setItem(FOCUS_COUNT_KEY, String(_state.focusCompletedCount));
    } catch {
      /* ignore */
    }
    bumpTodayStats(totalMinutes);

    // 刷新任务,拿活动任务最新状态
    let freshTasks: Task[] = [];
    try {
      freshTasks = (await api.listTasks({ status: null, limit: null })) as unknown as Task[];
    } catch (e) {
      console.warn("refresh tasks failed", e);
    }
    const freshActive = task ? freshTasks.find((t) => t.id === task.id) ?? null : null;

    // 自动休息链:task_id=null,project 继承活动任务
    if (!s.disableBreak && s.autoStartBreak) {
      const newCount = _state.focusCompletedCount;
      const isLong = newCount % s.longBreakInterval === 0;
      const breakMode: TimerMode = isLong ? "long_break" : "short_break";
      const breakMinutes = isLong ? s.longBreakDuration : s.shortBreakDuration;
      switchMode(breakMode);
      await start(null, freshActive?.project_id ?? task?.project_id ?? null, breakMinutes);
      return;
    }

    // 留在当前任务 or 接续下一个
    await advanceAfterFocus(freshTasks, freshActive, s.autoStartNextPomodoro);
    return;
  }

  // 休息结束 → 回 focus:同"留/接续"逻辑
  let tasks: Task[] = [];
  try {
    tasks = (await api.listTasks({ status: null, limit: null })) as unknown as Task[];
  } catch (e) {
    console.warn("refresh tasks failed", e);
  }
  const freshActive = task ? tasks.find((t) => t.id === task.id) ?? null : null;
  await advanceAfterFocus(tasks, freshActive, s.autoStartNextPomodoro);
}

/// focus/休息结束后的"留在当前任务或接续下一个"(v1 同段逻辑)。
async function advanceAfterFocus(
  freshTasks: Task[],
  freshActive: Task | null,
  autoStartNext: boolean,
): Promise<void> {
  const shouldStay =
    freshActive !== null &&
    freshActive.status === "active" &&
    (freshActive.completed_pomodoros ?? 0) < (freshActive.estimated_pomodoros ?? 0);

  if (shouldStay && freshActive) {
    switchMode("focus");
    _state.activeTask = freshActive;
    if (autoStartNext) {
      await start(
        freshActive.id,
        freshActive.project_id ?? null,
        freshActive.pomodoro_duration ?? undefined,
      );
    }
    return;
  }

  if (freshActive && freshActive.status === "completed") {
    _state.activeTask = null;
  }
  const next = pickNextAutoTask(freshTasks);
  _state.activeTask = next;
  switchMode("focus");
  if (next && autoStartNext) {
    await start(next.id, next.project_id ?? null, next.pomodoro_duration ?? undefined);
  }
}
