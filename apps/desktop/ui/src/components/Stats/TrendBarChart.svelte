<script lang="ts">
  // 手写 SVG 柱状图(专注趋势) —— 代替 v1 的 Recharts BarChart,零依赖。
  //
  // 视觉规格对齐 v1 Recharts(ResponsiveContainer height=234):
  // - 高度固定 234px、宽度满容器(bind:clientWidth 动态坐标系,文字不拉伸)
  // - 柱仅顶部圆角(radius [4,4,0,0]),maxBarSize 32px
  // - y 轴 5 档刻度(0/25/50/75/100%)+ 左轴线 + 刻度短线 + 底部轴线
  // - 0 值柱高度 0 不可见(同 v1);轴字 11px neutral-400
  // - hover:整列热区 → 白底 tooltip(key + N 分钟);柱本体无 opacity 变化
  // - day 粒度给"今天"的柱 accent-700 描边高亮(v1 行为)
  // - 空数据 → 空态文案

  import type { RangeTrendPoint, StatsGroup } from "../../lib/api";
  import { currentBucketKey, keyLabel } from "../../lib/statsRanges";
  import { getDict } from "../../lib/i18n.svelte";

  const t = $derived(getDict());

  interface Props {
    data: RangeTrendPoint[];
    group: StatsGroup;
    emptyText?: string;
  }

  let { data, group, emptyText }: Props = $props();

  /** v1 ResponsiveContainer height={234} —— 图表高度固定,不随容器宽缩放 */
  const VB_H = 234;
  const MARGIN = { top: 8, right: 8, bottom: 24, left: 44 };
  /** x 轴最多显示的标签数(超出按步长抽样) */
  const MAX_LABELS = 10;
  /** v1 maxBarSize=32(实际像素) */
  const MAX_BAR_W = 32;
  /** 柱顶圆角(v1 radius [4,4,0,0]) */
  const BAR_R = 4;

  /** 容器实测宽(bind:clientWidth);0 = 首帧未量到 */
  let cw = $state(0);
  const W = $derived(cw > 0 ? cw : 600);
  const PLOT_W = $derived(W - MARGIN.left - MARGIN.right);
  const PLOT_H = VB_H - MARGIN.top - MARGIN.bottom;

  let hovered = $state<number | null>(null);

  /** 向上取整到 1/2/5×10^k 的"好看"刻度(y 轴归一基准) */
  function niceCeil(v: number): number {
    if (v <= 0) return 0;
    const base = Math.pow(10, Math.floor(Math.log10(v)));
    const f = v / base;
    const niceF = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10;
    return niceF * base;
  }

  /** 仅顶部圆角的矩形 path(v1 radius=[4,4,0,0],平底贴轴线) */
  function topRoundedRect(x: number, y: number, w: number, h: number, r: number): string {
    const rr = Math.min(r, w / 2, Math.max(0, h));
    return `M ${x} ${y + h} L ${x} ${y + rr} Q ${x} ${y} ${x + rr} ${y} L ${x + w - rr} ${y} Q ${x + w} ${y} ${x + w} ${y + rr} L ${x + w} ${y + h} Z`;
  }

  interface BarModel {
    i: number;
    key: string;
    minutes: number;
    x: number;
    y: number;
    w: number;
    h: number;
    path: string;
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
    const currentKey = group === "day" ? currentBucketKey("day") : null;

    const bars: BarModel[] = data.map((t, i) => {
      // v1:0 值柱高度 0,画面上不可见
      const h = t.minutes > 0 && niceMax > 0 ? (t.minutes / niceMax) * PLOT_H : 0;
      const x = MARGIN.left + slot * i + (slot - barW) / 2;
      const y = MARGIN.top + PLOT_H - h;
      return {
        i,
        key: t.key,
        minutes: t.minutes,
        x,
        y,
        w: barW,
        h,
        path: topRoundedRect(x, y, barW, h, BAR_R),
        hitX: MARGIN.left + slot * i,
        hitW: slot,
        label: keyLabel(t.key, group),
        showLabel: i % step === 0 || i === n - 1,
        isCurrent: currentKey !== null && t.key === currentKey,
      };
    });

    // y 轴 5 档刻度(Recharts 默认)+ 轴线/刻度短线坐标
    const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => ({
      y: MARGIN.top + PLOT_H - f * PLOT_H,
      value: Math.round(niceMax * f),
    }));

    return { bars, ticks, baseline: MARGIN.top + PLOT_H };
  });

  const hoveredBar = $derived(hovered !== null ? model.bars[hovered] : null);
</script>

{#if data.length === 0}
  <div class="empty">{emptyText ?? t.stats.noData}</div>
{:else}
  <div class="chart-wrap" bind:clientWidth={cw}>
    <svg
      viewBox="0 0 {W} {VB_H}"
      width="{W}"
      height={VB_H}
      role="img"
      aria-label={t.stats.trendChartAria}
      onpointerleave={() => (hovered = null)}
    >
      <!-- 网格(水平虚线,仅内部 4 条;0 线由轴线承担) -->
      {#each model.ticks.slice(1, -1) as g}
        <line class="grid" x1={MARGIN.left} x2={W - MARGIN.right} y1={g.y} y2={g.y} />
      {/each}

      <!-- y 轴:竖轴线 + 5 档刻度短线与标签(Recharts 默认) -->
      <line class="axis" x1={MARGIN.left} x2={MARGIN.left} y1={MARGIN.top} y2={model.baseline} />
      {#each model.ticks as g}
        <line class="tick-line" x1={MARGIN.left - 4} x2={MARGIN.left} y1={g.y} y2={g.y} />
        <text class="tick" text-anchor="end" x={MARGIN.left - 6} y={g.y + 3.5}>{g.value}</text>
      {/each}

      <!-- 底部 x 轴线 -->
      <line class="axis" x1={MARGIN.left} x2={W - MARGIN.right} y1={model.baseline} y2={model.baseline} />

      {#each model.bars as b (b.key)}
        {#if b.h > 0}
          <path class="bar" class:current={b.isCurrent} d={b.path} />
        {/if}
        {#if b.showLabel}
          <text class="tick" text-anchor="middle" x={b.x + b.w / 2} y={VB_H - 6}>
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
        style:left={Math.min(88, Math.max(12, ((hoveredBar.x + hoveredBar.w / 2) / W) * 100)) + "%"}
        style:top={(hoveredBar.y / VB_H) * 100 + "%"}
      >
        {hoveredBar.label} · {hoveredBar.minutes} {t.stats.unitMin}
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
    height: 234px; /* v1 固定高 */
  }

  .grid {
    stroke: var(--color-neutral-200, #e8e5e0);
    stroke-dasharray: 3 3;
  }
  .axis {
    stroke: var(--color-neutral-200, #e8e5e0);
  }
  .tick-line {
    stroke: var(--color-neutral-200, #e8e5e0);
  }
  .tick {
    font-size: 11px; /* v1 tick fontSize 11 */
    fill: var(--color-neutral-400, #a8a298);
    font-variant-numeric: tabular-nums;
  }

  .bar {
    fill: var(--color-accent-500, #d17b5c);
  }
  /* 当前桶(今天):v1 accent-700 描边 1.5 */
  .bar.current {
    stroke: var(--color-accent-700, #9a523b);
    stroke-width: 1.5;
  }

  .hit {
    fill: none;
    pointer-events: all;
  }

  /* v1 Recharts 默认 tooltip:白底 + 浅灰边 + 12px */
  .tooltip {
    position: absolute;
    transform: translate(-50%, calc(-100% - 6px));
    background: var(--color-surface, #fff);
    color: var(--color-text, #1f1d1b);
    border: 1px solid var(--color-neutral-200, #e8e5e0);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    line-height: 1.4;
    white-space: nowrap;
    pointer-events: none;
    font-variant-numeric: tabular-nums;
    box-shadow: var(--shadow-xs, 0 1px 2px rgba(89, 47, 34, 0.04));
    z-index: 2;
  }

  .empty {
    text-align: center;
    padding: 3rem 0;
    color: var(--color-text-muted, #6b6864);
    font-size: 0.85rem;
  }
</style>
