<script lang="ts">
  // P1.8.6a:番茄钟主页 —— 与 v1 TimerPage.tsx 布局对齐(双列)。
  //
  // 左列:
  //   - 模式切换(focus / short_break / long_break)
  //   - 任务选择(下拉)
  //   - 圆形计时器 + mm:ss
  //   - 控制按钮(开始 / 暂停 / 继续 / 停止)
  //   - 周期提示
  //   - 今日统计(已完成番茄数)
  //   - 今日日复盘(ReviewTextarea)
  //   - 座右铭卡片(MottoCard)
  //
  // 右列(TimerRightSidebar):
  //   - 今日专注(分钟数)
  //   - 筛选器(项目 / 标签 / 优先级 / 日期 + 清除)
  //   - 任务列表(优先级点 / 番茄数 / 子任务 / 项目 / 截止日期 / 一键开始)
  //
  // 完成弹窗(CompletionModal):到点 / 主动停止时弹出。

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
  import type {
    DailyReview,
    Project,
    SubTask,
    Tag,
    Task,
  } from "../lib/api";
  import {
    isPermissionGranted,
    requestPermission,
    sendNotification,
  } from "@tauri-apps/plugin-notification";
  import ReviewTextarea from "../components/Timer/ReviewTextarea.svelte";
  import MottoCard from "../components/Timer/MottoCard.svelte";
  import TimerRightSidebar, {
    type TimerFilter,
  } from "../components/Timer/TimerRightSidebar.svelte";
  import CompletionModal from "../components/Timer/CompletionModal.svelte";

  // 后端返回的 TaskView 会被拍平 → 字段直接挂在 task 上
  type TaskWithExtras = Task & {
    tags?: Tag[];
    subtasks?: SubTask[];
  };

  // === 数据 ===
  let projects = $state<Project[]>([]);
  let tags = $state<Tag[]>([]);
  let sidebarTasks = $state<TaskWithExtras[]>([]); // 右侧栏任务列表
  let selectedTaskId = $state<string>("");
  let todayReview = $state<string | null>(null);
  let todayMinutes = $state<number>(0);
  let error = $state<string | null>(null);
  let starting = $state<boolean>(false);

  let filter = $state<TimerFilter>({
    project: null,
    tag: null,
    priority: null,
    date: null,
  });

  // === 完成弹窗 ===
  let modalOpen = $state<boolean>(false);
  let modalMessage = $state<string>("");

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
    sidebarTasks.find((t) => t.id === selectedTaskId) ?? null,
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

  // === 今日(本地时区)0 点 / 24 点的 ms ===
  function todayRange(): { startMs: number; endMs: number } {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    return { startMs: start.getTime(), endMs: end.getTime() };
  }

  // === 当月区间 ===
  function monthRange(): { monthStartMs: number; monthEndMs: number } {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    // 下月 1 号的 0 点 = 本月最后一天的 24 点
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
    // 后端 SQL 用 <=,所以 end 取本月最后一秒 —— 但 SQL 比较的是时间戳,
    // 这里给下月 1 号 0 点也行,因为下月不会匹配(只覆盖本月)。
    // 实际上为了对齐 v1 用 monthEnd.setHours(23,59,59,999),我们取 24:00 前一毫秒
    const endMs = end.getTime() - 1;
    return { monthStartMs: start.getTime(), monthEndMs: endMs };
  }

  // === 今日日期字符串(本地时区) ===
  function todayISO(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  }

  // === 副作用:监听 running 变化,完成时弹通知 + 模态 ===
  let prevRunning = false;
  $effect(() => {
    if (prevRunning && !timer.running && timer.secondsLeft === 0) {
      onPomodoroCompleted();
    }
    prevRunning = timer.running;
  });

  function onPomodoroCompleted() {
    if (selectedTask) {
      modalMessage = `太棒了!休息一下吧 —— ${selectedTask.title}`;
    } else {
      modalMessage = "太棒了!休息一下吧";
    }
    modalOpen = true;
    refreshTodayMinutes();

    if (getSettings().desktopNotificationEnabled) {
      sendNotificationCompat("专注完成", modalMessage);
    }
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

  // === 加载 ===
  async function refreshProjects() {
    try {
      projects = await api.listProjects();
    } catch (e) {
      console.warn("refresh projects", e);
    }
  }
  async function refreshTags() {
    try {
      tags = await api.listTags();
    } catch (e) {
      console.warn("refresh tags", e);
    }
  }

  async function refreshSidebarTasks() {
    try {
      const m = monthRange();
      sidebarTasks = await api.listTasks({
        status: null, // 包含 active + completed(完成排在下方)
        month_start_ms: m.monthStartMs,
        month_end_ms: m.monthEndMs,
        project_id: filter.project,
        tag_id: filter.tag,
        priority: filter.priority,
        date: filter.date,
        limit: null,
      });
    } catch (e) {
      console.warn("refresh tasks", e);
    }
  }

  async function refreshTodayReview() {
    try {
      const r: DailyReview | null = await api.getDailyReview(todayISO());
      todayReview = r?.content ?? null;
    } catch (e) {
      console.warn("refresh review", e);
    }
  }

  async function refreshTodayMinutes() {
    try {
      const r = todayRange();
      todayMinutes = await api.todayCompletedMinutes(r.startMs, r.endMs);
    } catch (e) {
      console.warn("refresh minutes", e);
    }
  }

  // 筛选器变化 → 重拉任务列表
  $effect(() => {
    void filter;
    refreshSidebarTasks();
  });

  onMount(async () => {
    await Promise.all([
      refreshProjects(),
      refreshTags(),
      refreshSidebarTasks(),
      refreshTodayReview(),
      refreshTodayMinutes(),
    ]);
  });

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

  async function onStop(isCompleted: boolean) {
    if (!timer.sessionId) return;
    const sessionId = timer.sessionId;
    timerStop(isCompleted); // UI 先清掉状态
    try {
      await api.stopPomodoro(sessionId, isCompleted);
    } catch (e) {
      error = String(e);
    }
  }

  function onSwitchMode(mode: TimerMode) {
    if (timer.running) return;
    switchMode(mode);
  }

  // 右侧栏:点击"开始"按钮 → 切换到 focus 模式 + 选中任务 + 启动
  async function handleStartTask(task: TaskWithExtras) {
    // 如果当前在跑,先停掉
    if (timer.running) {
      await onStop(false);
    }
    selectedTaskId = task.id;
    if (timer.mode !== "focus") {
      switchMode("focus");
    }
    try {
      const session = await api.startPomodoro(
        task.id,
        task.project_id ?? null,
        task.pomodoro_duration ?? getSettings().focusMinutes,
      );
      timerStart(task.id, session.id);
    } catch (e) {
      error = String(e);
    }
  }

  // 右侧栏:勾选/取消子任务(只写库 + 刷新当前列表)
  async function handleToggleSubtask(subtaskId: string, done: boolean) {
    try {
      // 先拉一次拿到当前字段,再写回(简化:只更新 is_completed)
      // 直接 upsert 可能丢字段,这里通过列表查找
      const list = await Promise.all(
        sidebarTasks.map((t) => api.listSubtasksForTask(t.id)),
      );
      let target: SubTask | null = null;
      for (const arr of list) {
        const hit = arr.find((x) => x.id === subtaskId);
        if (hit) {
          target = hit;
          break;
        }
      }
      if (!target) return;
      await api.upsertSubtask({ ...target, is_completed: done });
      await refreshSidebarTasks();
      await refreshTodayMinutes();
    } catch (e) {
      console.warn("toggle subtask", e);
    }
  }

  // 今日复盘 save / delete
  async function handleSaveReview(text: string) {
    try {
      const today = todayISO();
      const existing = await api.getDailyReview(today);
      const r: DailyReview = existing
        ? { ...existing, content: text }
        : {
            id: crypto.randomUUID(),
            date: today,
            content: text,
            updated_at: new Date().toISOString(),
          };
      await api.upsertDailyReview(r);
      todayReview = text;
    } catch (e) {
      console.warn("save review", e);
    }
  }
  async function handleDeleteReview() {
    try {
      // v1 语义:硬删(deleteDailyReview),不写 content="" 墓碑行 ——
      // 与手账视图的删除口径一致,避免残留行让"清空"永远不再触发
      await api.deleteDailyReview(todayISO());
      todayReview = null;
    } catch (e) {
      console.warn("delete review", e);
    }
  }

  function closeModal() {
    modalOpen = false;
  }

  // === 圆环几何 ===
  const SIZE = 280;
  const STROKE = 12;
  const RADIUS = (SIZE - STROKE) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const offset = $derived(CIRCUMFERENCE * (1 - progress));
</script>

<div class="layout">
  <!-- 左列:计时器主体 -->
  <div class="main">
    <div class="main-inner">
      <!-- 模式切换 -->
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

      <!-- 圆环 -->
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
            {#each sidebarTasks.filter((t) => t.status === "active") as t (t.id)}
              <option value={t.id}>{t.title}</option>
            {/each}
          </select>
        </div>
      {/if}

      {#if error}
        <div class="error" role="alert">⚠ {error}</div>
      {/if}

      <div class="controls">
        {#if timer.running}
          <button class="btn primary" onclick={timerPause}>暂停</button>
          <button class="btn danger" onclick={() => onStop(false)}>停止</button>
        {:else if timer.sessionId}
          <button class="btn primary" onclick={timerResume}>继续</button>
          <button class="btn danger" onclick={() => onStop(false)}>停止</button>
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

      <!-- 今日统计 -->
      <div class="today-stats">
        <span class="dot"></span>
        今日已完成 <b>{timer.focusCompletedInCycle}</b> 个番茄
        {#if isFocus}
          (每 {getSettings().longBreakInterval} 个 → 长休息)
        {/if}
      </div>

      <!-- 今日日复盘(与手账模式当天日复盘同步) -->
      <div class="review-card">
        <div class="review-title">今日日复盘</div>
        <ReviewTextarea
          value={todayReview}
          placeholder="写下今天的复盘..."
          rows={2}
          onSave={handleSaveReview}
          onDelete={handleDeleteReview}
        />
      </div>

      <!-- 座右铭 -->
      <MottoCard />
    </div>
  </div>

  <!-- 右列:任务清单 + 筛选 -->
  <TimerRightSidebar
    {todayMinutes}
    {projects}
    {tags}
    tasks={sidebarTasks}
    {filter}
    onFilterChange={(next) => (filter = { ...filter, ...next })}
    onStartTask={handleStartTask}
    onToggleSubtask={handleToggleSubtask}
  />

  <!-- 完成弹窗 -->
  <CompletionModal
    open={modalOpen}
    message={modalMessage}
    onClose={closeModal}
  />
</div>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    height: auto;
    transition: background-color 0.7s;
  }
  @media (min-width: 1024px) {
    .layout {
      flex-direction: row;
      height: calc(100vh - 4rem);
    }
  }

  /* 左列 */
  .main {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem 1rem;
    position: relative;
    overflow: hidden;
  }
  @media (min-width: 1024px) {
    .main {
      padding: 0 1rem;
      justify-content: center;
    }
  }
  .main-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    width: 100%;
    max-width: 720px;
    position: relative;
    z-index: 1;
  }

  .mode-tabs {
    display: flex;
    gap: 0.25rem;
    background: var(--color-surface, #fff);
    padding: 0.25rem;
    border-radius: var(--radius-md, 8px);
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.06));
  }
  .mode-tab {
    padding: 0.4rem 1.1rem;
    border: none;
    background: transparent;
    color: var(--color-text-muted, #6b6864);
    border-radius: var(--radius-md, 8px);
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.15s, color 0.15s;
  }
  .mode-tab:hover:not(:disabled) {
    color: var(--color-text, #1f1d1b);
  }
  .mode-tab.active {
    background: var(--color-accent, #e74c3c);
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
  .ring-track {
    stroke: var(--color-border, #e5e2dd);
  }
  .ring-progress {
    stroke: var(--color-accent, #e74c3c);
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
    color: var(--color-text, #1f1d1b);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
  }
  .mode-label {
    margin-top: 0.25rem;
    font-size: 1rem;
    color: var(--color-text-muted, #6b6864);
  }
  .task-title {
    margin-top: 0.5rem;
    max-width: 200px;
    font-size: 0.85rem;
    color: var(--color-text-muted, #6b6864);
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
    color: var(--color-text-muted, #6b6864);
    font-size: 0.9rem;
  }
  .task-picker select {
    padding: 0.4rem 0.75rem;
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-md, 8px);
    background: var(--color-surface, #fff);
    color: var(--color-text, #1f1d1b);
    min-width: 220px;
  }
  .task-picker select:focus {
    outline: none;
    border-color: var(--color-accent, #e74c3c);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent, #e74c3c) 12%, transparent);
  }

  .controls {
    display: flex;
    gap: 0.75rem;
  }
  .btn {
    padding: 0.55rem 1.75rem;
    border: none;
    border-radius: var(--radius-md, 8px);
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
    background: var(--color-accent, #e74c3c);
    color: #fff;
  }
  .btn.danger {
    background: transparent;
    color: var(--color-text-muted, #6b6864);
    border: 1px solid var(--color-border, #e5e2dd);
  }
  .btn.danger:hover:not(:disabled) {
    color: #dc2626;
    border-color: #dc2626;
  }

  .today-stats {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: color-mix(in srgb, var(--color-surface, #fff) 60%, transparent);
    border: 1px solid color-mix(in srgb, var(--color-border, #e5e2dd) 50%, transparent);
    backdrop-filter: blur(4px);
    border-radius: 999px;
    padding: 0.5rem 1.25rem;
    font-size: 0.875rem;
    color: var(--color-text-muted, #6b6864);
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.06));
  }
  .today-stats b {
    color: var(--color-text, #1f1d1b);
    font-weight: 700;
    margin: 0 0.15rem;
  }
  .today-stats .dot {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: var(--color-accent, #e74c3c);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .review-card {
    width: 100%;
    background: var(--color-surface, #fff);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-lg, 12px);
    padding: 1.25rem;
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.06));
  }
  .review-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-text-muted, #6b6864);
    margin-bottom: 0.5rem;
  }

  .error {
    color: #991b1b;
    background: #fee2e2;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-md, 8px);
    font-size: 0.875rem;
  }
</style>