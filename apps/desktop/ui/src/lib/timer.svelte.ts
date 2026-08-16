//! 全局番茄钟状态机 —— Svelte 5 runes 模块态,任意组件共享同一实例。
//!
//! 设计要点:
//! - 三种模式:`focus` / `short_break` / `long_break`(与后端 Pomodoro mode 无关,
//!   这里是 UI 端的概念,后端 PomodoroSession 只记 "focus 一次" 的一段时间)。
//! - `running` 只表示"UI 在 tick",后端 session 已 start 并在数据库占位。
//! - `pause / resume` 是 UI 行为:不调后端、不改 session.ended_at。
//!   - 真正的"结束一次番茄"是 `stop(isCompleted)` → 写 `ended_at` + `is_completed`。
//! - `currentTaskId`:可空。空时 `start()` 会拒绝(UI 层先禁用按钮)。
//! - 后端调用在 `lib/api.ts` 集中;此处只编排状态。
//!
//! Tick:`tick(seconds)` 由 App.svelte 的 `$effect` 在 `running` 为 true 时每秒调用一次。
//! 这里不直接 setInterval,保持模块纯状态(便于测试 + 路由切换不丢 tick)。

import { getSettings } from "./settings.svelte";

export type TimerMode = "focus" | "short_break" | "long_break";

interface TimerState {
  mode: TimerMode;
  secondsLeft: number;
  running: boolean;
  sessionId: string | null;
  currentTaskId: string | null;
  /// 已完成的 focus session 数(用于 long break 决策:每 4 个 → long_break)
  focusCompletedInCycle: number;
}

let _state = $state<TimerState>({
  mode: "focus",
  secondsLeft: 25 * 60,
  running: false,
  sessionId: null,
  currentTaskId: null,
  focusCompletedInCycle: 0,
});

export function getTimerState(): TimerState {
  return _state;
}

/// 从 settings 重置当前模式对应的秒数(切换模式 / 设置变更时调用)。
function resetSecondsFor(mode: TimerMode) {
  const s = getSettings();
  _state.secondsLeft =
    mode === "focus"
      ? s.focusMinutes * 60
      : mode === "short_break"
      ? s.shortBreakMinutes * 60
      : s.longBreakMinutes * 60;
}

/// 启动一次番茄(必须是 focus 模式;且必须先选任务)。
///
/// 返回本次 backend session id,UI 层用来在 stop 时回写。
export function start(taskId: string, sessionId: string) {
  if (_state.running) return; // 已运行 → 忽略
  _state.mode = "focus";
  resetSecondsFor("focus");
  _state.currentTaskId = taskId;
  _state.sessionId = sessionId;
  _state.running = true;
}

export function pause() {
  if (!_state.running) return;
  _state.running = false;
}

export function resume() {
  if (_state.running || _state.sessionId === null) return;
  _state.running = true;
}

/// 结束本次番茄。
///
/// `completed=true`:UI 跑完秒数 → 算一次完成 focus;按 settings.autoChain 决定
/// 是进入短休 / 长休 / 下一个 focus,或停在这里等用户手动。
///
/// `completed=false`:用户中途手动 stop → 不计入 focusCompleted,模式回到 focus,
/// 等待下一次 start。
export function stop(completed: boolean) {
  const prevMode = _state.mode;
  _state.running = false;
  _state.sessionId = null;
  _state.currentTaskId = null;

  const s = getSettings();

  if (prevMode === "focus" && completed) {
    _state.focusCompletedInCycle += 1;
    const isLong = _state.focusCompletedInCycle % s.longBreakInterval === 0;
    const nextMode: TimerMode = isLong ? "long_break" : "short_break";
    _state.mode = nextMode;
    resetSecondsFor(nextMode);
    if (s.autoChain) {
      _state.running = true; // 衔接:休息自动开始
    }
  } else if (prevMode === "focus" && !completed) {
    // 中途放弃:重置 focus + 计数
    _state.mode = "focus";
    _state.focusCompletedInCycle = 0;
    resetSecondsFor("focus");
  } else {
    // 休息结束 → 回到 focus 等待用户
    _state.mode = "focus";
    resetSecondsFor("focus");
    if (s.autoChain) {
      // autoChain:休息完自动开下一个 focus? 默认 false(用户需要先选任务)。
      // 这里不强行 autoChain 到 focus,因为还没选任务。
      _state.running = false;
    }
  }
}

/// 切换模式(UI 按钮直接切,不调后端)。会重置秒数 + 停掉 tick。
export function switchMode(mode: TimerMode) {
  if (_state.running) return;
  _state.mode = mode;
  resetSecondsFor(mode);
}

/// 内部 tick:每秒减 1,跑完自动 stop(true)。
///
/// 由 App.svelte 的 `$effect` 调用 —— `$effect(() => { if (running) { interval } })`。
export function tick() {
  if (!_state.running) return;
  if (_state.secondsLeft > 0) {
    _state.secondsLeft -= 1;
    return;
  }
  // 跑完了 → 自动 stop(true)
  stop(true);
}

/// 设置变更时重置秒数(用户在 Settings 改了时长 → 当前未跑的秒数同步)。
export function applySettingsChange() {
  if (_state.running) return; // 跑动中别打断
  resetSecondsFor(_state.mode);
}