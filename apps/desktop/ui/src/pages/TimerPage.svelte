<script lang="ts">
  // P1.7:番茄钟主页 —— 圆环 + 模式切换 + 任务选择 + start/pause/stop + 完成通知。
  //
  // 状态机走 `lib/timer.svelte` 的全局 module state;
  // 全局 tick 由 App.svelte 的 `$effect` 驱动(每秒一次),本页只渲染 + 派发 action。
  //
  // 范围(P1.7):
  //   - 三模式切换(focus / short_break / long_break)
  //   - 圆环进度 + mm:ss 大字
  //   - 任务选择:从 active 任务里挑一个,作为本次 focus 的 subject
  //   - start / pause / resume / stop(完成与放弃两条路径)
  //   - 完成时通过 Tauri 通知插件发系统通知
  //
  // 后续(P1.8+):座右铭卡片 + 完成弹窗 + 周期提示。

  import { onMount } from "svelte";
  import {
    getTimerState,
    start as timerStart,
    pause as timerPause,
    resume as timerResume,
    stop as timerStop,
    switchMode,
    type TimerMode,
  } from "../lib/timer.svelte";
  import { getSettings } from "../lib/settings.svelte";
  import * as api from "../lib/api";
  import type { Task as ApiTask } from "../lib/api";
  import {
    isPermissionGranted,
    requestPermission,
    sendNotification,
  } from "@tauri-apps/plugin-notification";

  // === 数据 ===
  let tasks = $state<ApiTask[]>([]);
  let selectedTaskId = $state<string>("");
  let error = $state<string | null>(null);
  let starting = $state(false);

  // === Timer state(订阅) ===
  const timer = $derived(getTimerState());

  // === 派生 ===
  const totalSeconds = $derived.by(() => {
    const s = getSettings();
    return timer.mode === "focus"
      ? s.focusMinutes * 60
      : timer.mode === "short_break"
      ? s.shortBreakMinutes * 60
      : s.longBreakMinutes * 60;
  });

  const progress = $derived(
    totalSeconds > 0 ? 1 - timer.secondsLeft / totalSeconds : 0,
  );

  const mm = $derived(Math.floor(timer.secondsLeft / 60));
  const ss = $derived(timer.secondsLeft % 60);
  const timeDisplay = $derived(
    `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`,
  );

  const selectedTask = $derived(
    tasks.find((t) => t.id === selectedTaskId) ?? null,
  );

  const canStart = $derived(
    !timer.running &&
      timer.sessionId === null &&
      timer.mode === "focus" &&
      selectedTaskId !== "" &&
      !starting,
  );

  const isFocus = $derived(timer.mode === "focus");

  const modeLabel = $derived(
    timer.mode === "focus"
      ? "专注"
      : timer.mode === "short_break"
      ? "短休息"
      : "长休息",
  );

  // === 副作用:监听 running 变化,完成时弹通知 ===
  // 用上一次的 running 状态做 diff:running 从 true → false 且 secondsLeft=0 → 刚跑完。
  let prevRunning = false;
  $effect(() => {
    if (prevRunning && !timer.running && timer.secondsLeft === 0) {
      onPomodoroCompleted();
    }
    prevRunning = timer.running;
  });

  function onPomodoroCompleted() {
    if (!getSettings().desktopNotificationEnabled) return;
    sendNotificationCompat(
      "专注完成",
      `太棒了!休息一下吧${
        selectedTask ? ` —— ${selectedTask.title}` : ""
      }`,
    );
  }

  async function sendNotificationCompat(title: string, body: string) {
    try {
      let granted = await isPermissionGranted();
      if (!granted) {
        const perm = await requestPermission();
        granted = perm === "granted";
      }
      if (!granted) return;
      sendNotification({ title, body });
    } catch (e) {
      console.warn("notification failed", e);
    }
  }

  // === 加载任务 ===
  async function refreshTasks() {
    try {
      tasks = await api.listTasks({ status: "active" });
    } catch (e) {
      error = String(e);
    }
  }

  onMount(refreshTasks);

  // === 操作 ===
  async function onStart() {
    if (!canStart) return;
    starting = true;
    error = null;
    try {
      const settings = getSettings();
      const session = await api.startPomodoro(
        selectedTaskId,
        null,
        settings.focusMinutes,
      );
      timerStart(selectedTaskId, session.id);
    } catch (e) {
      error = String(e);
    } finally {
      starting = false;
    }
  }

  async function onStop() {
    if (!timer.sessionId) return;
    const sessionId = timer.sessionId;
    timerStop(false); // UI 先清掉状态,避免倒计时继续跑
    try {
      await api.stopPomodoro(sessionId, false);
    } catch (e) {
      error = String(e);
    }
  }

  function onSwitchMode(mode: TimerMode) {
    if (timer.running) return;
    switchMode(mode);
  }

  // === 圆环几何 ===
  const SIZE = 280;
  const STROKE = 12;
  const RADIUS = (SIZE - STROKE) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const offset = $derived(CIRCUMFERENCE * (1 - progress));
</script>

<div class="page">
  <div class="mode-tabs" role="tablist" aria-label="计时器模式">
    <button
      class="mode-tab"
      class:active={timer.mode === "focus"}
      onclick={() => onSwitchMode("focus")}
      disabled={timer.running}
      role="tab"
      aria-selected={timer.mode === "focus"}
    >专注</button>
    <button
      class="mode-tab"
      class:active={timer.mode === "short_break"}
      onclick={() => onSwitchMode("short_break")}
      disabled={timer.running}
      role="tab"
      aria-selected={timer.mode === "short_break"}
    >短休息</button>
    <button
      class="mode-tab"
      class:active={timer.mode === "long_break"}
      onclick={() => onSwitchMode("long_break")}
      disabled={timer.running}
      role="tab"
      aria-selected={timer.mode === "long_break"}
    >长休息</button>
  </div>

  <div class="ring-wrap">
    <svg
      class="ring"
      width={SIZE}
      height={SIZE}
      viewBox="0 0 {SIZE} {SIZE}"
      aria-hidden="true"
    >
      <circle
        class="ring-track"
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        stroke-width={STROKE}
        fill="none"
      />
      <circle
        class="ring-progress"
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        stroke-width={STROKE}
        fill="none"
        stroke-dasharray={CIRCUMFERENCE}
        stroke-dashoffset={offset}
        transform="rotate(-90 {SIZE / 2} {SIZE / 2})"
      />
    </svg>
    <div class="ring-center">
      <div class="time" aria-live="polite">{timeDisplay}</div>
      <div class="mode-label">{modeLabel}</div>
      {#if selectedTask}
        <div class="task-title" title={selectedTask.title}>
          {selectedTask.title}
        </div>
      {/if}
    </div>
  </div>

  {#if isFocus}
    <div class="task-picker">
      <label for="task-select">本次专注:</label>
      <select
        id="task-select"
        bind:value={selectedTaskId}
        disabled={timer.running}
      >
        <option value="">-- 选择任务 --</option>
        {#each tasks as t (t.id)}
          <option value={t.id}>{t.title}</option>
        {/each}
      </select>
      {#if tasks.length === 0}
        <span class="hint">没有 active 任务,请到「任务」页添加</span>
      {/if}
    </div>
  {/if}

  {#if error}
    <div class="error" role="alert">⚠ {error}</div>
  {/if}

  <div class="controls">
    {#if timer.running}
      <button class="btn primary" onclick={timerPause}>暂停</button>
      <button class="btn danger" onclick={onStop}>停止</button>
    {:else if timer.sessionId}
      <button class="btn primary" onclick={timerResume}>继续</button>
      <button class="btn danger" onclick={onStop}>停止</button>
    {:else}
      <button
        class="btn primary"
        onclick={onStart}
        disabled={!canStart}
      >
        {starting ? "启动中..." : "开始"}
      </button>
    {/if}
  </div>

  <p class="cycle-hint">
    本周期已完成 <b>{timer.focusCompletedInCycle}</b> 个专注
    {#if isFocus}
      (每 {getSettings().longBreakInterval} 个 → 长休息)
    {/if}
  </p>
</div>

<style>
  .page {
    padding: 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    max-width: 720px;
    margin: 0 auto;
  }

  .mode-tabs {
    display: flex;
    gap: 0.25rem;
    background: var(--color-surface);
    padding: 0.25rem;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
  }
  .mode-tab {
    padding: 0.4rem 1.1rem;
    border: none;
    background: transparent;
    color: var(--color-text-muted);
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.15s, color 0.15s;
  }
  .mode-tab:hover:not(:disabled) {
    color: var(--color-text);
  }
  .mode-tab.active {
    background: var(--color-accent);
    color: #fff;
  }
  .mode-tab:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .ring-wrap {
    position: relative;
    width: 280px;
    height: 280px;
  }
  .ring {
    transform: rotate(0deg);
  }
  .ring-track {
    stroke: var(--color-border);
  }
  .ring-progress {
    stroke: var(--color-accent);
    transition: stroke-dashoffset 1s linear;
  }
  .ring-center {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
  .time {
    font-size: 3.5rem;
    font-weight: 600;
    color: var(--color-text);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
  }
  .mode-label {
    margin-top: 0.25rem;
    font-size: 1rem;
    color: var(--color-text-muted);
  }
  .task-title {
    margin-top: 0.5rem;
    max-width: 200px;
    font-size: 0.85rem;
    color: var(--color-text-muted);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .task-picker {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  .task-picker label {
    color: var(--color-text-muted);
    font-size: 0.9rem;
  }
  .task-picker select {
    padding: 0.4rem 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text);
    min-width: 220px;
  }
  .hint {
    color: var(--color-text-muted);
    font-size: 0.8rem;
  }

  .controls {
    display: flex;
    gap: 0.75rem;
  }
  .btn {
    padding: 0.55rem 1.75rem;
    border: none;
    border-radius: var(--radius-md);
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.15s, background 0.15s;
  }
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .btn.primary {
    background: var(--color-accent);
    color: #fff;
  }
  .btn.danger {
    background: transparent;
    color: var(--color-text-muted);
    border: 1px solid var(--color-border);
  }
  .btn.danger:hover:not(:disabled) {
    color: #dc2626;
    border-color: #dc2626;
  }

  .cycle-hint {
    margin: 0;
    font-size: 0.85rem;
    color: var(--color-text-muted);
  }
  .cycle-hint b {
    color: var(--color-accent);
    font-weight: 600;
    margin: 0 0.15rem;
  }

  .error {
    color: #991b1b;
    background: #fee2e2;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
  }
</style>