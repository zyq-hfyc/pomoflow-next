<script lang="ts">
  // 手账模式右侧面板 —— v1 `frontend/src/components/Tasks/MonthReviewPanel.tsx` 移植。
  //
  // 结构:
  //   - 标题 "YYYY年M月 · 复盘"
  //   - 上方:按自然周展示当月各周的周复盘(只读)
  //   - 中部:月度复盘可编辑 ReviewTextarea(upsert/delete by "YYYY-MM")
  //   - 底部:年度复盘可编辑 ReviewTextarea(upsert/delete by "YYYY",
  //     2026-09 复盘入口重构批补齐第四粒度;切月不重置,切年才换)
  //
  // 周序号由周一在当月的位置计算(与左侧手账区块一致),未写复盘的周显示为空 ——
  // 不能按"已保存复盘的下标"编号,否则第一周未写时第二周的复盘会被错标成
  // 第一周(v1 12bc45a 修复,v2 同步)。
  //
  // props.reviewVersion 由父组件(TasksPage)计数;手账内周复盘保存后会 +1,
  // 本组件监听变化重新拉取。

  import * as api from "../../lib/api";
  import type { MonthlyReview, WeeklyReview, YearlyReview } from "../../lib/api";
  import { getDict, fmt } from "../../lib/i18n.svelte";
  import { getMondays, toISO, pad } from "../../lib/calendar";
  import { syncState } from "../../lib/syncState.svelte";
  import ReviewTextarea from "../Timer/ReviewTextarea.svelte";

  const t = $derived(getDict());

  interface Props {
    year: number;
    month: number;
    reviewVersion: number;
  }

  let { year, month, reviewVersion }: Props = $props();

  let weeklyReviews = $state<WeeklyReview[]>([]);
  let monthly = $state<MonthlyReview | null>(null);
  let yearly = $state<YearlyReview | null>(null);

  async function load(y: number, m: number) {
    try {
      const [w, mr, yr] = await Promise.all([
        api.listWeeklyReviews(y, m),
        api.getMonthlyReview(`${y}-${pad(m)}`),
        api.getYearlyReview(`${y}`),
      ]);
      if (y !== year || m !== month) return; // 请求期间已切月 → 丢弃过期响应
      weeklyReviews = w;
      monthly = mr;
      yearly = yr;
    } catch (e) {
      console.warn("month panel load failed", e);
    }
  }

  $effect(() => {
    const y = year;
    const m = month;
    void reviewVersion; // 周复盘变化后强制重拉
    void syncState().rev; // 同步完成 → 重拉(与 JournalView 同款,远端编辑可见)
    void load(y, m);
  });

  // 当月全部自然周(周一日期);周序号 = 周一在列表中的位置 + 1
  const mondays = $derived(getMondays(year, month));
  const weeklyMap = $derived.by(() => {
    const m = new Map<string, string | null>();
    for (const w of weeklyReviews) m.set(w.week_start, w.content);
    return m;
  });

  async function saveMonthly(text: string) {
    try {
      const yearMonth = `${year}-${pad(month)}`;
      const r: MonthlyReview = monthly
        ? { ...monthly, content: text }
        : {
            id: crypto.randomUUID(),
            year_month: yearMonth,
            content: text,
            updated_at: new Date().toISOString(),
          };
      await api.upsertMonthlyReview(r);
      await load(year, month);
    } catch (e) {
      console.warn("month panel save failed", e);
    }
  }

  async function removeMonthly() {
    try {
      await api.deleteMonthlyReview(`${year}-${pad(month)}`);
      await load(year, month);
    } catch (e) {
      console.warn("month panel delete failed", e);
    }
  }

  async function saveYearly(text: string) {
    try {
      const r: YearlyReview = yearly
        ? { ...yearly, content: text }
        : {
            id: crypto.randomUUID(),
            year: `${year}`,
            content: text,
            updated_at: new Date().toISOString(),
          };
      await api.upsertYearlyReview(r);
      await load(year, month);
    } catch (e) {
      console.warn("month panel yearly save failed", e);
    }
  }

  async function removeYearly() {
    try {
      await api.deleteYearlyReview(`${year}`);
      await load(year, month);
    } catch (e) {
      console.warn("month panel yearly delete failed", e);
    }
  }
</script>

<aside class="panel" aria-label={fmt(t.monthPanel.title, { year, month })}>
  <h2 class="title">{fmt(t.monthPanel.title, { year, month })}</h2>

  <!-- 各周周复盘(只读,未写的周显示为空) -->
  <div class="weekly-block">
    <div class="label">{t.monthPanel.weeklyReadonly}</div>
    <div class="week-list">
      {#each mondays as monday, i (toISO(monday))}
        {@const weekStartISO = toISO(monday)}
        {@const content = weeklyMap.get(weekStartISO)}
        <div class="week-card">
          <div class="week-head">
            {fmt(t.monthPanel.weekRange, { n: i + 1, date: weekStartISO })}
          </div>
          <div class="week-content" class:dimmed={!content?.trim()}>
            {content?.trim() ? content : t.monthPanel.empty}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- 月度复盘(可编辑) -->
  <div class="monthly-block">
    <div class="label">{t.monthPanel.monthlyReview}</div>
    <ReviewTextarea
      value={monthly?.content || null}
      placeholder={t.monthPanel.monthlyPlaceholder}
      rows={6}
      onSave={saveMonthly}
      onDelete={removeMonthly}
    />
  </div>

  <!-- 年度复盘(可编辑;键为年份,切月不变) -->
  <div class="yearly-block">
    <div class="label">{fmt(t.monthPanel.yearlyTitle, { year })}</div>
    <ReviewTextarea
      value={yearly?.content || null}
      placeholder={t.monthPanel.yearlyPlaceholder}
      rows={8}
      onSave={saveYearly}
      onDelete={removeYearly}
    />
  </div>
</aside>

<style>
  /* v1:全高列(w-80 + border-l + 内部滚动),不是悬浮卡片 —— 与左侧手账区对齐 */
  .panel {
    width: 320px; /* v1 w-80 */
    flex-shrink: 0;
    height: 100%;
    background: var(--color-surface, #fff);
    border-left: 1px solid var(--color-border, #e5e2dd);
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
  }

  .title {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text, #1f1d1b);
  }

  .label {
    font-size: 0.75rem;
    color: var(--color-text-muted, #6b6864);
    margin-bottom: 0.5rem;
  }
  /* 未写复盘的周:内容置灰(v1 text-gray-300) */
  .week-content.dimmed {
    color: color-mix(in srgb, var(--color-text-muted, #6b6864) 55%, transparent);
  }

  .weekly-block {
    margin-bottom: 0.25rem;
  }
  .week-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .week-card {
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-lg, 12px);
    padding: 0.5rem;
  }
  .week-head {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-text, #1f1d1b);
    margin-bottom: 0.25rem;
  }
  .week-content {
    font-size: 0.75rem;
    color: var(--color-text, #1f1d1b);
    white-space: pre-wrap;
    word-break: break-word;
  }

  .monthly-block,
  .yearly-block {
    border-top: 1px solid var(--color-border, #e5e2dd);
    padding-top: 0.75rem;
  }
</style>
