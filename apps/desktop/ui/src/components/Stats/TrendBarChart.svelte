<script lang="ts">
  // 手写 SVG 柱状图(专注趋势) —— 代替 v1 的 Recharts BarChart,零依赖。
  //
  // 规格:
  // - 数据 RangeTrendPoint[](key:日/周一日期/YYYY-MM);柱高按 niceMax 归一
  // - 有数据的柱填 var(--color-accent),0 值柱用 var(--color-border) 中性色
  // - max=0(全区间无数据)时所有柱画最小高度 2px
  // - day 粒度给"今天"的柱描边高亮(v1 行为;week/month 桶不高亮)
  // - x 轴标签:v1 keyLabel —— day/week → "M/D",month → 月份数字;数量多时抽样 + 兜底末桶
  // - hover:命中槽(整列高透明热区)→ 绝对定位 tooltip(key + N 分钟)
  // - SVG viewBox 600×240,width:100% 等比自适应容器宽度
  // - 空数据 → 空态文案

  import type { RangeTrendPoint, StatsGroup } from "../../lib/api";
  import { currentBucketKey, keyLabel } from "../../lib/statsRanges";

  interface Props {
    data: RangeTrendPoint[];
    group: StatsGroup;
    emptyText?: string;
  }

  let { data, group, emptyText = "该维度暂无专注数据" }: Props = $props();

  const VB_W = 600;
  const VB_H = 240;
  const MARGIN = { top: 14, right: 8, bottom: 26, left: 42 };
  const PLOT_W = VB_W - MARGIN.left - MARGIN.right;
  const PLOT_H = VB_H - MARGIN.top - MARGIN.bottom;
  /** 柱最小高度(px,viewBox 单位);0 值柱与全零区间都至少画到这个高度 */
  const MIN_BAR_H = 2;
  /** x 轴最多显示的标签数(超出按步长抽样) */
  const MAX_LABELS = 10;
  const MAX_BAR_W = 34;

  let hovered = $state<number | null>(null);

  /** 向上取整到 1/2/5×10^k 的"好看"刻度(y 轴归一基准,避免 37/456 这种碎刻度) */
  function niceCeil(v: number): number {
    if (v <= 0) return 0;
    const base = Math.pow(10, Math.floor(Math.log10(v)));
    const f = v / base;
    const niceF = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10;
    return niceF * base;
  }

  /** 轴标签:v1 keyLabel 原样 —— day/week → "M/D",month → 月份数字("8") */
  function axisLabel(key: string, g: StatsGroup): string {
    return keyLabel(key, g);
  }

  interface BarModel {
    i: number;
    key: string;
    minutes: number;
    x: number;
    y: number;
    w: number;
    h: number;
    hitX: number;
    hitW: number;
    label: string;
    showLabel: boolean;
    isCurrent: boolean;
  }

  const model = $derived.by(() => {
    const n = data.length;
    const max = data.reduce((m, t) => Math.max(m, t.minutes), 0);
    const niceMax = niceCeil(max);
    const slot = n > 0 ? PLOT_W / n : PLOT_W;
    const barW = Math.min(slot * 0.62, MAX_BAR_W);
    const step = Math.max(1, Math.ceil(n / MAX_LABELS));
    // v1:仅 day 粒度高亮"今天"(week/month 桶不高亮)。
    // today key 用本地日期(v1 用 toISOString 的 UTC 日期,东八区早 8 点前会错标昨天 —— 顺带修正)
    const currentKey = group === "day" ? currentBucketKey("day") : null;

    const bars: BarModel[] = data.map((t, i) => {
      const h =
        t.minutes > 0 && niceMax > 0
          ? Math.max(MIN_BAR_H, (t.minutes / niceMax) * PLOT_H)
          : MIN_BAR_H;
      const x = MARGIN.left + slot * i + (slot - barW) / 2;
      return {
        i,
        key: t.key,
        minutes: t.minutes,
        x,
        y: MARGIN.top + PLOT_H - h,
        w: barW,
        h,
        hitX: MARGIN.left + slot * i,
        hitW: slot,
        label: axisLabel(t.key, group),
        showLabel: i % step === 0 || i === n - 1,
        isCurrent: currentKey !== null && t.key === currentKey,
      };
    });

    // 水平网格线 + y 刻度(只标 0 / 半值 / 满值,避免拥挤)
    const gridlines = [0, 0.25, 0.5, 0.75, 1].map((f) => ({
      y: MARGIN.top + PLOT_H - f * PLOT_H,
      value: Math.round(niceMax * f),
      labeled: f === 0 || f === 0.5 || f === 1,
    }));

    return { bars, gridlines };
  });

  const hoveredBar = $derived(hovered !== null ? model.bars[hovered] : null);
</script>

{#if data.length === 0}
  <div class="empty">{emptyText}</div>
{:else}
  <div class="chart-wrap">
    <svg
      viewBox="0 0 {VB_W} {VB_H}"
      role="img"
      aria-label="专注趋势柱状图"
      onpointerleave={() => (hovered = null)}
    >
      {#each model.gridlines as g}
        <line class="grid" x1={MARGIN.left} x2={VB_W - MARGIN.right} y1={g.y} y2={g.y} />
        {#if g.labeled}
          <text class="tick" text-anchor="end" x={MARGIN.left - 6} y={g.y + 3}>{g.value}</text>
        {/if}
      {/each}

      {#each model.bars as b (b.key)}
        <rect
          class="bar"
          class:zero={b.minutes === 0}
          class:current={b.isCurrent}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx="3"
        />
        {#if b.showLabel}
          <text class="tick" text-anchor="middle" x={b.x + b.w / 2} y={VB_H - 8}>
            {b.label}
          </text>
        {/if}
        <!-- 命中热区:整列高,细柱也容易 hover -->
        <rect
          class="hit"
          role="presentation"
          x={b.hitX}
          y={MARGIN.top}
          width={b.hitW}
          height={PLOT_H}
          onpointerenter={() => (hovered = b.i)}
          onpointerleave={() => (hovered = null)}
        />
      {/each}
    </svg>

    {#if hoveredBar}
      <div
        class="tooltip"
        style:left={Math.min(88, Math.max(12, ((hoveredBar.x + hoveredBar.w / 2) / VB_W) * 100)) + "%"}
        style:top={(hoveredBar.y / VB_H) * 100 + "%"}
      >
        {hoveredBar.label} · {hoveredBar.minutes} 分钟
      </div>
    {/if}
  </div>
{/if}

<style>
  .chart-wrap {
    position: relative;
  }
  svg {
    display: block;
    width: 100%;
    height: auto;
  }

  .grid {
    stroke: var(--color-border, #e5e2dd);
    stroke-dasharray: 3 3;
  }
  .tick {
    font-size: 10px;
    fill: var(--color-text-muted, #6b6864);
    font-variant-numeric: tabular-nums;
  }

  .bar {
    fill: var(--color-accent, #e74c3c);
    transition: opacity 0.1s;
  }
  /* 0 值柱:中性色,只在基线上露出最小高度 */
  .bar.zero {
    fill: var(--color-border, #e5e2dd);
  }
  /* 当前桶(今天/本周/本月):描边加深 */
  .bar.current {
    stroke: var(--color-accent-hover, #c0392b);
    stroke-width: 1.5;
  }
  .bar:hover {
    opacity: 0.82;
  }

  .hit {
    fill: none;
    pointer-events: all;
  }

  .tooltip {
    position: absolute;
    transform: translate(-50%, calc(-100% - 6px));
    background: var(--color-text, #1f1d1b);
    color: var(--color-surface, #fff);
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-size: 0.75rem;
    line-height: 1.4;
    white-space: nowrap;
    pointer-events: none;
    font-variant-numeric: tabular-nums;
    box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08));
    z-index: 2;
  }

  .empty {
    text-align: center;
    padding: 3rem 0;
    color: var(--color-text-muted, #6b6864);
    font-size: 0.85rem;
  }
</style>
