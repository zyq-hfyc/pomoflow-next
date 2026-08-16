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
    start as engineStart,
    startWithTask,
    pause as timerPause,
    resume as timerResume,
    stop as engineStop,
    switchMode,
    setActiveTask,
    clearCompletionMessage,
    resetTodayStats,
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
  import { getDict, fmt } from "../lib/i18n.svelte";
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

  // === Timer state(订阅全局引擎) ===
  const timer = $derived(getTimerState());

  // === i18n 词典(响应式) ===
  const t = $derived(getDict());

  // === 派生 ===
  // 有效专注时长:活动任务自带 → 否则全局(v1 effectiveFocusDuration)
  const totalSeconds = $derived.by(() => {
    const s = getSettings();
    return timer.mode === "focus"
      ? (timer.activeTask?.pomodoro_duration ?? s.focusDuration) * 60
      : timer.mode === "short_break"
      ? s.shortBreakDuration * 60
      : s.longBreakDuration * 60;
  });

  const progress = $derived(
    totalSeconds > 0 ? 1 - timer.secondsLeft / totalSeconds : 0,
  );

  const mm = $derived(Math.floor(timer.secondsLeft / 60));
  const ss = $derived(timer.secondsLeft % 60);
  const timeDisplay = $derived(
    `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`,
  );

  const selectedTask = $derived(timer.activeTask);

  // v1:开始按钮允许无任务专注(任务选择器有"无特定任务"选项)
  const canStart = $derived(
    !timer.running && timer.sessionId === null && !starting,
  );

  const isFocus = $derived(timer.mode === "focus");

  const modeLabel = $derived(
    timer.mode === "focus"
      ? t.mode.focus
      : timer.mode === "short_break"
      ? t.mode.shortBreak
      : t.mode.longBreak,
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

  // === 完成后刷新 ===
  // 完成链(通知/弹窗/接续)在 lib/timer.svelte 引擎层处理(v1 AppContext 语义,
  // 路由切换不丢);这里只监听 todayCount 变化刷新页面数据。
  $effect(() => {
    void timer.todayCount;
    void refreshTodayMinutes();
    void refreshSidebarTasks();
  });

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
      syncTodayStatsFromOverview(),
    ]);
  });

  /// 启动时从后端总览同步今日统计(v1 refreshTodayStats;之后的即时累加在引擎本地)。
  async function syncTodayStatsFromOverview() {
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

  // === 操作 ===
  // 开始当前模式(专注可无任务;时长取任务自带或全局,v1 startTimer)
  async function onStart() {
    if (!canStart) return;
    starting = true;
    error = null;
    try {
      await engineStart(
        selectedTask?.id ?? null,
        selectedTask?.project_id ?? null,
        selectedTask?.pomodoro_duration ?? undefined,
      );
    } catch (e) {
      error = String(e);
    } finally {
      starting = false;
    }
  }

  // 放弃/跳过:按未完成收尾(自然完成由引擎 tick 处理,不经此入口)
  async function onAbandon() {
    try {
      await engineStop(false);
    } catch (e) {
      error = String(e);
    }
  }

  function onSwitchMode(mode: "focus" | "short_break" | "long_break") {
    if (timer.running) return;
    switchMode(mode);
  }

  // 右侧栏:一键开始任务(引擎先停掉进行中会话再开新专注,v1 行为)
  async function handleStartTask(task: TaskWithExtras) {
    try {
      await startWithTask(task);
    } catch (e) {
      error = String(e);
    }
  }

  // 任务选择器变化 → 更新全局活动任务("" = 无特定任务)
  function onPickTask(value: string) {
    const task = value ? sidebarTasks.find((t) => t.id === value) ?? null : null;
    setActiveTask(task);
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

  // === 圆环几何 ===
  const SIZE = 280;
  const STROKE = 12;
  const RADIUS = (SIZE - STROKE) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const offset = $derived(CIRCUMFERENCE * (1 - progress));
</script>

<svelte:head>
  <title>{t.page.timer}</title>
</svelte:head>

<div class="layout">
  <!-- 左列:计时器主体 -->
  <div class="main">
    <div class="main-inner">
      <!-- 模式切换 -->
      <div class="mode-tabs" role="tablist" aria-label={t.timer.modeTabsAria}>
        <button
          class="mode-tab"
          class:active={timer.mode === "focus"}
          onclick={() => onSwitchMode("focus")}
          disabled={timer.running}
          role="tab"
          aria-selected={timer.mode === "focus"}
        >{t.mode.focus}</button>
        <button
          class="mode-tab"
          class:active={timer.mode === "short_break"}
          onclick={() => onSwitchMode("short_break")}
          disabled={timer.running}
          role="tab"
          aria-selected={timer.mode === "short_break"}
        >{t.mode.shortBreak}</button>
        <button
          class="mode-tab"
          class:active={timer.mode === "long_break"}
          onclick={() => onSwitchMode("long_break")}
          disabled={timer.running}
          role="tab"
          aria-selected={timer.mode === "long_break"}
        >{t.mode.longBreak}</button>
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
          <label for="task-select">{t.timer.focusOn}</label>
          <select
            id="task-select"
            value={selectedTask?.id ?? ""}
            disabled={timer.running || timer.sessionId !== null}
            onchange={(e) => onPickTask((e.currentTarget as HTMLSelectElement).value)}
          >
            <!-- v1:显式"无特定任务"选项,允许无任务专注 -->
            <option value="">{t.timer.noSpecificTask}</option>
            {#each sidebarTasks.filter((task) => task.status === "active") as task (task.id)}
              <option value={task.id}>{task.title}</option>
            {/each}
          </select>
        </div>
      {/if}

      {#if error}
        <div class="error" role="alert">⚠ {error}</div>
      {/if}

      <div class="controls">
        {#if timer.running}
          <button class="btn primary" onclick={timerPause}>{t.timer.pause}</button>
          <button class="btn danger" onclick={onAbandon}>{t.timer.abandon}</button>
        {:else if timer.sessionId}
          <button class="btn primary" onclick={timerResume}>{t.timer.resume}</button>
          <button class="btn danger" onclick={onAbandon}>{t.timer.abandon}</button>
        {:else}
          <button
            class="btn primary"
            onclick={onStart}
            disabled={!canStart}
          >
            {starting ? t.timer.starting : isFocus ? t.timer.start : t.timer.startBreak}
          </button>
        {/if}
      </div>

      <!-- 今日统计(v1:今日完成番茄数 + 长休间隔提示) -->
      <div class="today-stats">
        <span class="dot"></span>
        {t.timer.todayDone} <b>{timer.todayCount}</b> {t.timer.pomodoroUnit}
        {#if isFocus}
          （{fmt(t.timer.longBreakHint, { n: getSettings().longBreakInterval })}）
        {/if}
      </div>

      <!-- 今日日复盘(与手账模式当天日复盘同步) -->
      <div class="review-card">
        <div class="review-title">{t.timer.reviewTitle}</div>
        <ReviewTextarea
          value={todayReview}
          placeholder={t.timer.reviewPlaceholder}
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

  <!-- 完成弹窗(文案由引擎完成链产出,v1 handleTimerComplete) -->
  <CompletionModal
    open={timer.pendingCompletionMessage !== null}
    message={timer.pendingCompletionMessage ?? ""}
    onClose={clearCompletionMessage}
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
    stroke: var(--timer-ring-track, var(--color-accent-100, #faebe2));
  }
  .ring-progress {
    stroke: var(--timer-ring-progress, var(--color-accent-400, #e29676));
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