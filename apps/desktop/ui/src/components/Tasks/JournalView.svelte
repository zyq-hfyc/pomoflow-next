<script lang="ts">
  // 手账模式月视图 —— v1 `frontend/src/components/Tasks/JournalView.tsx` 全量移植。
  //
  // 结构:
  //   - 顶部月份选择:标题 + 上一月/下一月按钮(12↔1 跨年)+ 年下拉(2026..2086)+ 月下拉
  //   - 周区块:该月(周一落在该月)每个自然周一张卡片
  //       · 标题 "第 N 周(M/D ~ M/E)"
  //       · 7 个日格 3 列 grid:dashed 边框,今天高亮(accent)
  //           - 日期头(星期几 M/D)
  //           - 该日任务(due_date 前 10 位匹配;含 active + completed,可勾选切换)
  //           - 日复盘 ReviewTextarea(upsert/delete by 日期)
  //       · 卡片底部整行周复盘 ReviewTextarea(upsert/delete by 周一日期)
  //
  // 状态归属:
  //   - year/month / reviewVersion 由父组件(TasksPage)持有;本组件只回调
  //   - 周/日复盘列表本组件自拉自持;周复盘保存后回调 onReviewChange 通知右栏刷新
  //   - 任务列表由父组件传入 props;勾选后回调 onTasksChange 让父组件重拉
  //
  // 时区:日期字符串一律本地时区拼装(YYYY-MM-DD),不用 toISOString。

  import { ChevronLeft, ChevronRight } from "lucide-svelte";
  import * as api from "../../lib/api";
  import type { DailyReview, Task, WeeklyReview } from "../../lib/api";
  import { getDict, fmt } from "../../lib/i18n.svelte";
  import { datePart } from "../../lib/dueDate";
  import { getMondays, toISO } from "../../lib/calendar";
  import TaskCheckbox from "./TaskCheckbox.svelte";
  import ReviewTextarea from "../Timer/ReviewTextarea.svelte";

  const t = $derived(getDict());

  interface Props {
    year: number;
    month: number;
    /** 手账展示的任务(含 completed;按 due_date 分组到日格) */
    tasks: Task[];
    onYearChange: (y: number) => void;
    onMonthChange: (m: number) => void;
    /** 周复盘保存/删除后通知父组件(刷新右侧 MonthReviewPanel) */
    onReviewChange?: () => void;
    /** 任务勾选后通知父组件重拉任务列表 */
    onTasksChange?: () => void;
  }

  let {
    year,
    month,
    tasks,
    onYearChange,
    onMonthChange,
    onReviewChange,
    onTasksChange,
  }: Props = $props();

  // 年份范围:2026 起往后 60 年(含),共 61 项 —— 手账可能回溯/前瞻多年
  const YEAR_OPTIONS = Array.from({ length: 61 }, (_, i) => 2026 + i);
  const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);

  let weeklyReviews = $state<WeeklyReview[]>([]);
  let dailyReviews = $state<DailyReview[]>([]);

  // === 日期工具(本地时区) ===
  // pad/toISO/getMondays 抽到 lib/calendar.ts,与月度复盘面板共用(v1 12bc45a 同款)

  // === 数据加载 ===
  async function load(y: number, m: number) {
    const start = toISO(new Date(y, m - 1, 1));
    const end = toISO(new Date(y, m, 0)); // 该月最后一天
    try {
      const [w, d] = await Promise.all([
        api.listWeeklyReviews(y, m),
        api.listDailyReviews(start, end),
      ]);
      if (y !== year || m !== month) return; // 请求期间已切月 → 丢弃过期响应
      weeklyReviews = w;
      dailyReviews = d;
    } catch (e) {
      console.warn("journal load reviews failed", e);
    }
  }

  $effect(() => {
    const y = year;
    const m = month;
    void load(y, m);
  });

  // === 派生数据 ===
  interface DayCell {
    iso: string;
    label: string;
  }
  interface WeekBlock {
    startISO: string;
    title: string;
    days: DayCell[];
  }

  const weeks = $derived.by(() => {
    const weekdayNames = t.journal.weekday;
    return getMondays(year, month).map((monday, i) => {
      const dates = Array.from({ length: 7 }, (_, k) => {
        const d = new Date(monday);
        d.setDate(d.getDate() + k);
        return d;
      });
      const last = dates[6];
      const days: DayCell[] = dates.map((d, k) => ({
        iso: toISO(d),
        label: `${weekdayNames[k]} ${d.getMonth() + 1}/${d.getDate()}`,
      }));
      return {
        startISO: toISO(monday),
        title: fmt(t.journal.weekRange, {
          n: i + 1,
          ms: monday.getMonth() + 1,
          ds: monday.getDate(),
          me: last.getMonth() + 1,
          de: last.getDate(),
        }),
        days,
      } satisfies WeekBlock;
    });
  });

  // "今天"每次渲染重算(模板调用点求值)——$derived 里 new Date() 无响应式依赖,
  // 跨午夜永不失效;v1 每次 render 重算,这里用函数等价复刻
  function isToday(iso: string): boolean {
    return iso === toISO(new Date());
  }

  const tasksByDay = $derived.by(() => {
    const map = new Map<string, Task[]>();
    for (const t of tasks) {
      const day = datePart(t.due_date);
      if (!day) continue;
      if (!map.has(day)) map.set(day, []);
      map.get(day)!.push(t);
    }
    return map;
  });

  const weeklyMap = $derived(
    new Map(weeklyReviews.map((w) => [w.week_start, w])),
  );
  const dailyMap = $derived(new Map(dailyReviews.map((d) => [d.date, d])));

  // === 交互 ===
  function prevMonth() {
    if (month === 1) {
      onMonthChange(12);
      onYearChange(year - 1);
    } else {
      onMonthChange(month - 1);
    }
  }
  function nextMonth() {
    if (month === 12) {
      onMonthChange(1);
      onYearChange(year + 1);
    } else {
      onMonthChange(month + 1);
    }
  }

  async function handleToggle(t: Task) {
    try {
      if (t.status === "active") await api.completeTask(t.id);
      else await api.reopenTask(t.id);
      onTasksChange?.();
    } catch (e) {
      console.warn("journal toggle task failed", e);
    }
  }

  // === 复盘保存/删除(upsert;清空走 delete 硬删 —— 与 ReviewTextarea 的
  //     onSave/onDelete 行为对齐) ===
  async function saveDaily(dateISO: string, text: string) {
    try {
      const existing = dailyMap.get(dateISO);
      const r: DailyReview = existing
        ? { ...existing, content: text }
        : {
            id: crypto.randomUUID(),
            date: dateISO,
            content: text,
            updated_at: new Date().toISOString(),
          };
      await api.upsertDailyReview(r);
      await load(year, month);
    } catch (e) {
      console.warn("journal save daily review failed", e);
    }
  }

  async function removeDaily(dateISO: string) {
    try {
      await api.deleteDailyReview(dateISO);
      await load(year, month);
    } catch (e) {
      console.warn("journal delete daily review failed", e);
    }
  }

  async function saveWeekly(weekStart: string, text: string) {
    try {
      const existing = weeklyMap.get(weekStart);
      const r: WeeklyReview = existing
        ? { ...existing, content: text }
        : {
            id: crypto.randomUUID(),
            week_start: weekStart,
            content: text,
            updated_at: new Date().toISOString(),
          };
      await api.upsertWeeklyReview(r);
      await load(year, month);
      onReviewChange?.();
    } catch (e) {
      console.warn("journal save weekly review failed", e);
    }
  }

  async function removeWeekly(weekStart: string) {
    try {
      await api.deleteWeeklyReview(weekStart);
      await load(year, month);
      onReviewChange?.();
    } catch (e) {
      console.warn("journal delete weekly review failed", e);
    }
  }
</script>

<div class="journal">
  <div class="inner">
    <!-- 月份选择 -->
    <div class="head">
      <h1 class="title">{fmt(t.journal.monthTitle, { year, month })}</h1>
      <div class="month-nav">
        <button
          type="button"
          class="nav-btn"
          onclick={prevMonth}
          title={t.journal.prevMonth}
          aria-label={t.journal.prevMonth}
        >
          <ChevronLeft size={16} />
        </button>
        <select
          class="select"
          aria-label={t.journal.yearAria}
          value={year}
          onchange={(e) => onYearChange(Number(e.currentTarget.value))}
        >
          {#each YEAR_OPTIONS as y (y)}
            <option value={y}>{fmt(t.journal.yearOption, { year: y })}</option>
          {/each}
        </select>
        <select
          class="select"
          aria-label={t.journal.monthAria}
          value={month}
          onchange={(e) => onMonthChange(Number(e.currentTarget.value))}
        >
          {#each MONTH_OPTIONS as m (m)}
            <option value={m}>{fmt(t.journal.monthOption, { month: m })}</option>
          {/each}
        </select>
        <button
          type="button"
          class="nav-btn"
          onclick={nextMonth}
          title={t.journal.nextMonth}
          aria-label={t.journal.nextMonth}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>

    <!-- 周区块 -->
    <div class="weeks">
      {#each weeks as week (week.startISO)}
        <section class="week-card">
          <div class="week-title">{week.title}</div>
          <div class="day-grid">
            {#each week.days as day (day.iso)}
              <div class="day-cell">
                <div class="day-head" class:today={isToday(day.iso)}>
                  {day.label}
                </div>
                {#if (tasksByDay.get(day.iso) ?? []).length === 0}
                  <div class="no-task">{t.common.noData}</div>
                {:else}
                  {#each tasksByDay.get(day.iso) ?? [] as t (t.id)}
                    <div class="task-row">
                      <TaskCheckbox
                        completed={t.status === "completed"}
                        onToggle={() => handleToggle(t)}
                      />
                      <span class="task-title" class:done={t.status === "completed"}>
                        {t.title}
                      </span>
                    </div>
                  {/each}
                {/if}
                <div class="day-divider"></div>
                <ReviewTextarea
                  value={dailyMap.get(day.iso)?.content || null} // 空内容行(ADR-010)等同未写
                  placeholder={t.journal.dailyReviewPlaceholder}
                  rows={2}
                  onSave={(text) => saveDaily(day.iso, text)}
                  onDelete={() => removeDaily(day.iso)}
                />
              </div>
            {/each}
          </div>
          <!-- 周复盘(整行) -->
          <div class="weekly-block">
            <div class="weekly-label">{t.journal.weeklyReview}</div>
            <ReviewTextarea
              value={weeklyMap.get(week.startISO)?.content || null}
              placeholder={t.journal.weeklyReviewPlaceholder}
              rows={5}
              onSave={(text) => saveWeekly(week.startISO, text)}
              onDelete={() => removeWeekly(week.startISO)}
            />
          </div>
        </section>
      {/each}
    </div>
  </div>
</div>

<style>
  .journal {
    width: 100%;
    padding: 1.25rem 1.5rem; /* v1 组件自身 py-5 px-6(与外层 .main 双层叠加) */
  }
  .inner {
    max-width: 72rem; /* v1 max-w-6xl */
    margin: 0 auto;
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }
  .title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text, #1f1d1b);
  }
  .month-nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.35rem;
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-lg, 12px);
    background: var(--color-surface, #fff);
    color: var(--color-text-muted, #6b6864);
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
  }
  .nav-btn:hover {
    background: var(--color-bg, #fafaf7);
    color: var(--color-text, #1f1d1b);
  }
  .select {
    font-size: 0.85rem;
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-lg, 12px);
    padding: 0.3rem 0.5rem;
    background: var(--color-surface, #fff);
    color: var(--color-text, #1f1d1b);
    cursor: pointer;
  }
  .select:focus {
    outline: none;
    border-color: var(--color-accent, #e74c3c);
  }

  .weeks {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .week-card {
    background: var(--color-surface, #fff);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-xl, 16px);
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.06));
    padding: 1rem;
  }
  .week-title {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-text, #1f1d1b);
    margin-bottom: 0.75rem;
  }

  .day-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  .day-cell {
    min-height: 80px;
    border: 1px dashed color-mix(in srgb, var(--color-text, #1f1d1b) 22%, transparent);
    border-radius: var(--radius-lg, 12px);
    padding: 0.5rem;
  }
  .day-head {
    font-size: 0.75rem;
    color: var(--color-text-muted, #6b6864);
    margin-bottom: 0.25rem;
  }
  .day-head.today {
    color: var(--color-accent, #e74c3c);
    font-weight: 700;
  }
  .no-task {
    font-size: 0.7rem;
    color: color-mix(in srgb, var(--color-text-muted, #6b6864) 55%, transparent);
    margin-bottom: 0.25rem;
  }
  .task-row {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-bottom: 0.25rem;
  }
  .task-title {
    font-size: 0.75rem;
    color: var(--color-text, #1f1d1b);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .task-title.done {
    color: var(--color-text-muted, #6b6864);
  }
  .day-divider {
    border-top: 1px dashed var(--color-border, #e5e2dd);
    margin: 0.4rem 0;
  }

  .weekly-block {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--color-border, #e5e2dd);
  }
  .weekly-label {
    font-size: 0.75rem;
    color: var(--color-text-muted, #6b6864);
    margin-bottom: 0.25rem;
  }
</style>
