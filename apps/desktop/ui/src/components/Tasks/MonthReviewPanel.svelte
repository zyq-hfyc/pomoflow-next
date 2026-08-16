<script lang="ts">
  // 手账模式右侧面板 —— v1 `frontend/src/components/Tasks/MonthReviewPanel.tsx` 移植。
  //
  // 结构:
  //   - 标题 "YYYY年M月 · 复盘"
  //   - 上方:当月各周周复盘只读卡片(按周一日期排序;编辑在手账每周区块内做)
  //   - 下方:月度复盘可编辑 ReviewTextarea(upsert/delete by "YYYY-MM")
  //
  // props.reviewVersion 由父组件(TasksPage)计数;手账内周复盘保存后会 +1,
  // 本组件监听变化重新拉取。

  import * as api from "../../lib/api";
  import type { MonthlyReview, WeeklyReview } from "../../lib/api";
  import { getDict, fmt } from "../../lib/i18n.svelte";
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

  function pad(n: number): string {
    return String(n).padStart(2, "0");
  }

  async function load(y: number, m: number) {
    try {
      const [w, mr] = await Promise.all([
        api.listWeeklyReviews(y, m),
        api.getMonthlyReview(`${y}-${pad(m)}`),
      ]);
      if (y !== year || m !== month) return; // 请求期间已切月 → 丢弃过期响应
      weeklyReviews = w;
      monthly = mr;
    } catch (e) {
      console.warn("month panel load failed", e);
    }
  }

  $effect(() => {
    const y = year;
    const m = month;
    void reviewVersion; // 周复盘变化后强制重拉
    void load(y, m);
  });

  const sorted = $derived(
    [...weeklyReviews].sort((a, b) => a.week_start.localeCompare(b.week_start)),
  );

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
</script>

<aside class="panel" aria-label={fmt(t.monthPanel.title, { year, month })}>
  <h2 class="title">{fmt(t.monthPanel.title, { year, month })}</h2>

  <!-- 各周周复盘(只读) -->
  <div class="weekly-block">
    <div class="label">{t.monthPanel.weeklyReadonly}</div>
    {#if sorted.length === 0}
      <div class="empty">{t.monthPanel.noWeekly}</div>
    {:else}
      <div class="week-list">
        {#each sorted as w, i (w.week_start)}
          <div class="week-card">
            <div class="week-head">{fmt(t.monthPanel.weekRange, { n: i + 1, date: w.week_start })}</div>
            <div class="week-content">
              {w.content?.trim() ? w.content : t.monthPanel.empty}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- 月度复盘(可编辑) -->
  <div class="monthly-block">
    <div class="label">{t.monthPanel.monthlyReview}</div>
    <ReviewTextarea
      value={monthly?.content ?? null}
      placeholder={t.monthPanel.monthlyPlaceholder}
      rows={6}
      onSave={saveMonthly}
      onDelete={removeMonthly}
    />
  </div>
</aside>

<style>
  .panel {
    width: 320px; /* v1 w-80 */
    flex-shrink: 0;
    background: var(--color-surface, #fff);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-md, 8px);
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.06));
    padding: 1rem 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
    align-self: flex-start;
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
  .empty {
    font-size: 0.75rem;
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
    border-radius: var(--radius-md, 8px);
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

  .monthly-block {
    border-top: 1px solid var(--color-border, #e5e2dd);
    padding-top: 0.75rem;
  }
</style>
