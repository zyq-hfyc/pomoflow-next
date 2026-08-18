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
  import { Play, Pause, Square, SkipForward } from "lucide-svelte";
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
  } from "../lib/timer.svelte";
  import { getSettings } from "../lib/settings.svelte";
  import { timerFilter } from "../lib/timerFilter.svelte";
  import * as api from "../lib/api";
  import type {
    DailyReview,
    Project,
    SubTask,
    Tag,
    Task,
  } from "../lib/api";
  import { getDict } from "../lib/i18n.svelte";
  import ReviewTextarea from "../components/Timer/ReviewTextarea.svelte";
  import MottoCard from "../components/Timer/MottoCard.svelte";
  import TaskSelector from "../components/Timer/TaskSelector.svelte";
  import TimerRightSidebar from "../components/Timer/TimerRightSidebar.svelte";
  import CompletionModal from "../components/Timer/CompletionModal.svelte";

  // 后端返回的 TaskView 会被拍平 → 字段直接挂在 task 上
  type TaskWithExtras = Task & {
    tags?: Tag[];
    subtasks?: SubTask[];
  };

  // === 数据 ===
  let projects = $state<Project[]>([]);
  let tags = $state<Tag[]>([]);
  let sidebarTasks = $state<TaskWithExtras[]>([]); // 右侧栏任务列表(当月+筛选)
  // 任务下拉候选(v1 TaskSelector:全部 active 任务,不受侧栏筛选影响)
  let allActiveTasks = $state<TaskWithExtras[]>([]);
  let todayReview = $state<string | null>(null);
  let todayMinutes = $state<number>(0);
  let error = $state<string | null>(null);
  let starting = $state<boolean>(false);

  // 筛选器用模块级单例(v1 存 AppContext):切页再回来保留
  const filter = timerFilter;

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
      ? t.mode.focusing
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
    void refreshAllActiveTasks();
  });

  // v1 TimerPage:活动任务一旦变成 completed(无论在哪页勾选)→ 清除选中,
  // 避免对已完成任务再开专注会话
  $effect(() => {
    if (timer.activeTask && timer.activeTask.status === "completed") {
      setActiveTask(null);
    }
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
      const list = await api.listTasks({
        status: null, // 包含 active + completed(完成排在下方)
        month_start_ms: m.monthStartMs,
        month_end_ms: m.monthEndMs,
        project_id: filter.project,
        tag_id: filter.tag,
        priority: filter.priority,
        date: filter.date,
        limit: null,
      });
      // v1 TimerPage:130-138 —— 未完成在前 → 优先级 high>medium>low>none → 创建时间升序
      const order: Record<string, number> = { high: 0, medium: 1, low: 2, none: 3 };
      sidebarTasks = (list as TaskWithExtras[]).sort((a, b) => {
        if (a.status !== b.status) return a.status === "active" ? -1 : 1;
        const pa = order[a.priority ?? "none"] ?? 3;
        const pb = order[b.priority ?? "none"] ?? 3;
        if (pa !== pb) return pa - pb;
        return (
          new Date(a.created_at ?? 0).getTime() - new Date(b.created_at ?? 0).getTime()
        );
      });
    } catch (e) {
      console.warn("refresh tasks", e);
    }
  }

  /// 任务下拉候选:全部 active 任务(v1 TaskSelector 语义,与侧栏筛选解耦),
  /// 按优先级 → 创建时间排序展示
  async function refreshAllActiveTasks() {
    try {
      const list = await api.listTasks({ status: "active", limit: null });
      const order: Record<string, number> = { high: 0, medium: 1, low: 2, none: 3 };
      allActiveTasks = (list as TaskWithExtras[]).sort((a, b) => {
        const pa = order[a.priority ?? "none"] ?? 3;
        const pb = order[b.priority ?? "none"] ?? 3;
        if (pa !== pb) return pa - pb;
        return (
          new Date(a.created_at ?? 0).getTime() - new Date(b.created_at ?? 0).getTime()
        );
      });
    } catch (e) {
      console.warn("refresh active tasks", e);
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

  // 筛选器变化 → 重拉任务列表(单例上的就地变更,需逐属性读取才能被追踪)
  $effect(() => {
    void filter.project;
    void filter.tag;
    void filter.priority;
    void filter.date;
    refreshSidebarTasks();
  });

  onMount(async () => {
    // 今日统计由引擎 initTodayStatsSync 全局同步(App 挂载),此处不再重复
    await Promise.all([
      refreshProjects(),
      refreshTags(),
      refreshSidebarTasks(),
      refreshAllActiveTasks(),
      refreshTodayReview(),
      refreshTodayMinutes(),
    ]);
  });

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

  // v1 switchTimerMode:随时可切 —— 运行中点击即丢弃式切换(不写后端,会话不记录)
  function onSwitchMode(mode: "focus" | "short_break" | "long_break") {
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

  // 任务选择器(v1 TaskSelector:计时中也不锁定,换任务不打断会话)
  function onSelectTask(task: TaskWithExtras | null) {
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

<div class="layout page-veil">
  <!-- 左列:计时器主体 -->
  <div class="main">
    <div class="main-inner">
      <!-- 模式切换(v1:运行中也可切,丢弃式切换) -->
      <div class="mode-tabs" role="tablist" aria-label={t.timer.modeTabsAria}>
        <button
          class="mode-tab"
          class:active={timer.mode === "focus"}
          onclick={() => onSwitchMode("focus")}
          role="tab"
          aria-selected={timer.mode === "focus"}
        >{t.mode.focus}</button>
        <button
          class="mode-tab"
          class:active={timer.mode === "short_break"}
          onclick={() => onSwitchMode("short_break")}
          role="tab"
          aria-selected={timer.mode === "short_break"}
        >{t.mode.shortBreak}</button>
        <button
          class="mode-tab"
          class:active={timer.mode === "long_break"}
          onclick={() => onSwitchMode("long_break")}
          role="tab"
          aria-selected={timer.mode === "long_break"}
        >{t.mode.longBreak}</button>
      </div>

      {#if isFocus}
        <TaskSelector tasks={allActiveTasks} activeTask={selectedTask} onSelect={onSelectTask} />
      {/if}

      <!-- 圆环(v1 CircleTimer:渐变描边 + 圆头 + 发光) -->
      <div class="ring-wrap">
        <svg
          class="ring"
          width={SIZE}
          height={SIZE}
          viewBox="0 0 {SIZE} {SIZE}"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="var(--color-accent-400, #e29676)" />
              <stop offset="100%" stop-color="var(--color-accent-600, #c9552d)" />
            </linearGradient>
          </defs>
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
            stroke-linecap="round"
            stroke="url(#ring-gradient)"
            stroke-dasharray={CIRCUMFERENCE}
            stroke-dashoffset={offset}
            transform="rotate(-90 {SIZE / 2} {SIZE / 2})"
          />
        </svg>
        <div class="ring-center">
          <div class="time" aria-live="polite">{timeDisplay}</div>
          <div class="mode-row">
            <span class="mode-label">{modeLabel}</span>
            {#if isFocus}
              <span class="pomo-count">
                {selectedTask?.completed_pomodoros ?? 0}/{selectedTask?.estimated_pomodoros ?? 0} {t.timer.pomodoros}
              </span>
            {/if}
          </div>
        </div>
      </div>

      {#if error}
        <div class="error" role="alert">⚠ {error}</div>
      {/if}

      <!-- 控制按钮(v1 TimerControls:运行中=暂停+跳过,暂停中=继续+放弃) -->
      <div class="controls">
        {#if timer.running}
          <button class="btn pause" onclick={timerPause}>
            <Pause size={18} fill="currentColor" />
            {t.timer.pause}
          </button>
          <button class="btn secondary" onclick={onAbandon}>
            <SkipForward size={16} />
            {t.timer.skip}
          </button>
        {:else if timer.sessionId}
          <button class="btn primary" onclick={timerResume}>
            <Play size={18} fill="currentColor" />
            {t.timer.resume}
          </button>
          <button class="btn secondary" onclick={onAbandon}>
            <Square size={16} />
            {t.timer.abandon}
          </button>
        {:else}
          <button
            class="btn primary"
            onclick={onStart}
            disabled={!canStart}
          >
            <Play size={18} fill="currentColor" />
            {starting ? t.timer.starting : isFocus ? t.timer.start : t.timer.startBreak}
          </button>
        {/if}
      </div>

      <!-- 今日统计(v1:今日完成番茄数) -->
      <div class="today-stats">
        <span class="dot"></span>
        {t.timer.todayDone} <b>{timer.todayCount}</b> {t.timer.pomodoroUnit}
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
    activeTaskId={timer.activeTask?.id ?? null}
    {filter}
    onFilterChange={(next) => Object.assign(filter, next)}
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
      height: calc(100vh - var(--topbar-height, 50px));
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
    border-radius: var(--radius-xl, 16px);
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.06));
  }
  .mode-tab {
    padding: 0.4rem 1.1rem;
    border: none;
    background: transparent;
    color: var(--color-text-muted, #6b6864);
    border-radius: var(--radius-lg, 12px);
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
    filter: drop-shadow(0 0 6px color-mix(in srgb, var(--color-accent-400, #e29676) 45%, transparent));
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
  .mode-row {
    margin-top: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .mode-label {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text-muted, #6b6864);
  }
  .pomo-count {
    font-size: 0.9rem;
    color: var(--color-text-muted, #6b6864);
  }

  .controls {
    display: flex;
    gap: 0.75rem;
  }
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1.75rem;
    border: none;
    border-radius: var(--radius-xl, 16px);
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
  /* v1 TimerControls:暂停为 warning 色主按钮 */
  .btn.pause {
    background: var(--color-warning, #d4a574);
    color: #fff;
  }
  .btn.pause:hover {
    background: color-mix(in srgb, var(--color-warning, #d4a574) 88%, #000);
  }
  /* v1 SECONDARY:白底描边次按钮 */
  .btn.secondary {
    background: var(--color-surface, #fff);
    color: var(--color-text-muted, #6b6864);
    border: 1px solid var(--color-border, #e5e2dd);
  }
  .btn.secondary:hover:not(:disabled) {
    background: var(--color-bg, #fafaf7);
    color: var(--color-text, #1f1d1b);
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
    border-radius: var(--radius-2xl, 24px);
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
    border-radius: var(--radius-lg, 12px);
    font-size: 0.875rem;
  }
</style>