<script lang="ts">
  // 统计页 —— v1 `pomoflow/frontend/src/pages/StatsPage.tsx` 完整移植(P1.9)。
  //
  // 结构(与 v1 一致):
  //   6 维度 pill(今天/本周/本月/本季度/半年/全年)
  //   → 4 张通用卡(专注分钟 / 番茄数 / 完成任务 / 日均分钟)
  //   → 维度递进亮点卡(活跃天数 / 最长连续 / 周均·月均 / 高峰月 / 最佳项目 / 环比)
  //   → 趋势柱状图 + 项目环形图(本月上下堆叠,其余维度 6.5:3.5 双栏)
  //
  // 取数:statsRange 拉当前区间 + 上一区间(环比),切换维度即重拉;
  // 上一期失败不阻塞页面(prevTotal 停留 0,与 v1 静默吞错行为一致)。
  //
  // 日均口径:v1 源码为 total / 整区间天数(getRange().days,如 8 月中旬看
  // "本月"分母仍是 31),非"截至今天"—— 本页保持该口径。
  //
  // 时区:JS getTimezoneOffset 是"西正东负"(上海 -480),Rust 后端要
  // "东正西负" → 取反传 +480。

  import {
    CalendarDays,
    ChartColumn,
    Clock,
    Flame,
    Target,
    TrendingUp,
    Award,
  } from "lucide-svelte";
  import { statsRange } from "../lib/api";
  import type { RangeStats } from "../lib/api";
  import { getDict, fmt } from "../lib/i18n.svelte";
  import {
    DIMENSIONS,
    getRange,
    getPrevRange,
    keyLabel,
  } from "../lib/statsRanges";
  import type { StatsDimension } from "../lib/statsRanges";
  import StatCard from "../components/Stats/StatCard.svelte";
  import TrendBarChart from "../components/Stats/TrendBarChart.svelte";
  import DonutChart from "../components/Stats/DonutChart.svelte";

  const t = $derived(getDict());

  let dim = $state<StatsDimension>("week");
  let data = $state<RangeStats | null>(null);
  let prevTotal = $state(0);
  let loading = $state(true);
  /** 原始错误串(渲染时经 t.stats.loadError 包装,避免语言切换重拉数据) */
  let error = $state<string | null>(null);
  /** 请求序号:快速切维度时丢弃过期响应 */
  let loadSeq = 0;

  const range = $derived(getRange(dim));
  const group = $derived(range.group);
  const groupLabel = $derived(
    group === "day" ? t.stats.byDay : group === "week" ? t.stats.byWeek : t.stats.byMonth,
  );

  // 维度 pill 文案(v1 dimLabel 同款映射)
  const dimLabel = $derived<Record<StatsDimension, string>>({
    today: t.stats.dimToday,
    week: t.stats.dimWeek,
    month: t.stats.dimMonth,
    quarter: t.stats.dimQuarter,
    halfyear: t.stats.dimHalf,
    year: t.stats.dimYear,
  });

  const totalMinutes = $derived(data?.summary.total_minutes ?? 0);
  const sessions = $derived(data?.summary.total_sessions ?? 0);
  const completed = $derived(data?.summary.completed_tasks ?? 0);
  const avgMinutes = $derived(
    Math.round(totalMinutes / Math.max(1, range.days)),
  );

  // === 亮点卡(v1 computeHighlights 语义,按当前粒度的桶计算) ===
  const highlights = $derived.by(() => {
    if (!data) return null;
    const trend = data.trend;
    let longest = 0;
    let cur = 0;
    for (const t of trend) {
      if (t.minutes > 0) {
        cur++;
        longest = Math.max(longest, cur);
      } else {
        cur = 0;
      }
    }
    // v1:reduce 以空 key 初始、严格 > 才替换 —— 全零 trend 时 peak.key 为空,
    // 卡片显示 "—" 而不是第一个桶的标签
    let peak = { key: "", minutes: 0, sessions: 0 };
    for (const t of trend) {
      if (t.minutes > peak.minutes) peak = t;
    }
    return {
      activeDays: trend.filter((t) => t.minutes > 0).length,
      longest,
      perPeriod: trend.length > 0 ? Math.round(totalMinutes / trend.length) : 0,
      peak,
      projects: [...data.projects].sort(
        (a, b) => b.total_minutes - a.total_minutes,
      ),
    };
  });

  // 环比(v1 公式原样):上一期为 0 且本期 > 0 → +100%;双 0 → +0%。
  // 上一期拉取失败时 prevTotal 停留在 0,表现与 v1 的静默吞错一致。
  const momPct = $derived(
    prevTotal > 0
      ? Math.round(((totalMinutes - prevTotal) / prevTotal) * 100)
      : totalMinutes > 0
        ? 100
        : 0,
  );
  const momText = $derived(`${momPct >= 0 ? "+" : ""}${momPct}%`);

  const sortedProjects = $derived(
    highlights ? highlights.projects : [],
  );

  // === 拉数:维度变化 → 当前区间 + 上一区间 ===
  $effect(() => {
    const r = getRange(dim);
    const p = getPrevRange(dim);
    const seq = ++loadSeq;
    data = null;
    prevTotal = 0;
    error = null;
    loading = true;

    const tzOffsetMin = -new Date().getTimezoneOffset();

    statsRange(r.start, r.end, r.group, tzOffsetMin)
      .then((res) => {
        if (seq !== loadSeq) return;
        data = res;
        loading = false;
      })
      .catch((e: unknown) => {
        if (seq !== loadSeq) return;
        error = String(e);
        loading = false;
      });

    statsRange(p.start, p.end, r.group, tzOffsetMin)
      .then((res) => {
        if (seq === loadSeq) prevTotal = res.summary.total_minutes;
      })
      .catch(() => {
        // 上一期失败不阻塞页面,环比显示 "--"
      });
  });
</script>

<svelte:head>
  <title>{t.page.stats}</title>
</svelte:head>

<!-- v1 StatsPage:146 结构 —— 外层全宽全高 page-veil,内容列居中(max-w)。
     蒙层不能挂在内容列上,否则宽窗口左右留白和矮内容下方会裸露背景图 -->
<div class="stats-veil page-veil">
  <div class="page">
  <!-- 维度 pill -->
  <div class="dims">
    {#each DIMENSIONS as d (d.key)}
      <button
        class="dim-pill"
        class:active={dim === d.key}
        aria-pressed={dim === d.key}
        onclick={() => (dim = d.key)}
      >
        {dimLabel[d.key]}
      </button>
    {/each}
  </div>

  {#if error}
    <div class="error" role="alert">⚠ {fmt(t.stats.loadError, { err: error })}</div>
  {/if}

  {#if loading}
    <p class="loading">{t.stats.loading}</p>
  {:else if data}
    <!-- 通用卡片 -->
    <div class="stats-4">
      <StatCard icon={Clock as any} label={t.stats.focusDuration} value={totalMinutes} unit={t.stats.unitMin} accent />
      <StatCard icon={ChartColumn as any} label={t.stats.sessions} value={sessions} unit={t.stats.unitCount} accent />
      <StatCard icon={Target as any} label={t.stats.completed} value={completed} unit={t.stats.unitCount} accent />
      <StatCard icon={TrendingUp as any} label={t.stats.avg} value={avgMinutes} unit={t.stats.unitMin} accent />
    </div>

    <!-- 亮点卡片:按维度逐级出现(语义/取数对齐 v1) -->
    {#if highlights && dim !== "today"}
      <div class="stats-4">
        <StatCard
          icon={CalendarDays as any}
          label={t.stats.activeDays}
          value={highlights.activeDays}
          unit={t.stats.unitDay}
          accent
        />
        {#if dim === "month" || dim === "quarter" || dim === "halfyear" || dim === "year"}
          <StatCard
            icon={Flame as any}
            label={t.stats.longestStreak}
            value={highlights.longest}
            unit={t.stats.unitDay}
            accent
          />
        {/if}
        {#if dim === "quarter" || dim === "halfyear" || dim === "year"}
          <StatCard
            icon={TrendingUp as any}
            label={group === "week" ? t.stats.avgWeek : t.stats.avgMonth}
            value={highlights.perPeriod}
            unit={t.stats.unitMin}
            accent
          />
        {/if}
        {#if dim === "halfyear" || dim === "year"}
          <StatCard
            icon={Award as any}
            label={group === "month" ? t.stats.peakMonth : t.stats.peakPeriod}
            value={highlights.peak.key ? keyLabel(highlights.peak.key, group) : "—"}
            unit={highlights.peak.minutes ? `${highlights.peak.minutes} ${t.stats.unitMin}` : ""}
            accent
          />
        {/if}
        {#if (dim === "halfyear" || dim === "year") && highlights.projects[0]}
          <StatCard
            icon={Award as any}
            label={t.stats.bestProject}
            value={highlights.projects[0].project_name}
            unit={`${highlights.projects[0].total_minutes} ${t.stats.unitMin}`}
            accent
          />
        {/if}
        <StatCard icon={TrendingUp as any} label={t.stats.momRatio} value={momText} accent />
      </div>
    {/if}

    <!-- 趋势柱状图 + 项目环形图:本月上下堆叠,其余维度 6.5:3.5 双栏(窄屏退化为堆叠) -->
    <div class="charts" class:split={dim !== "month"}>
      <section class="chart-card">
        <h3>{t.stats.trendTitle}（{groupLabel}）</h3>
        <TrendBarChart data={data.trend} {group} />
      </section>
      <section class="chart-card">
        <h3>{t.stats.projectDist}</h3>
        <DonutChart projects={sortedProjects} />
      </section>
    </div>
  {/if}
  </div>
</div>

<style>
  /* 蒙层外层:至少铺满视口剩余高度(v1 min-h-[calc(100vh-4rem)]) */
  .stats-veil {
    min-height: calc(100vh - var(--topbar-height, 50px));
  }
  .page {
    padding: 4rem 1rem 1.25rem; /* v1 px-4 page-pt pb-5 */
    display: flex;
    flex-direction: column;
    gap: 1.5rem; /* v1 space-y-6 */
    /* 图表双栏需要比设置页更宽的画布(v1 max-w-5xl) */
    max-width: 1040px;
    margin: 0 auto;
  }
  .page h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .dims {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .dim-pill {
    padding: 0.35rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    color: var(--color-text-muted);
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }
  .dim-pill:hover {
    background: var(--color-neutral-50, #fbfaf8); /* v1 hover:bg-gray-50 */
    color: var(--color-text);
  }
  .dim-pill.active {
    background: var(--color-accent-500, #d17b5c);
    border-color: transparent; /* v1 激活态无描边 */
    color: #fff;
  }

  .stats-4 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem; /* v1 gap-2 */
  }
  /* v1 断点:Tailwind md = 768px(卡片 2→4 列与双图拆分同点) */
  @media (min-width: 768px) {
    .stats-4 {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .charts {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem; /* v1 gap-2 */
  }
  @media (min-width: 768px) {
    .charts.split {
      grid-template-columns: 6.5fr 3.5fr;
    }
  }

  .chart-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 0.875rem 0.9rem;
    box-shadow: var(--shadow-sm);
    min-width: 0;
  }
  .chart-card h3 {
    margin: 0 0 0.75rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .loading {
    text-align: center;
    padding: 3rem 0;
    font-size: 0.9rem;
    color: var(--color-text-muted);
    margin: 0;
  }

  .error {
    color: #991b1b;
    background: #fee2e2;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
  }
</style>
