<script lang="ts">
  // 手写 SVG 环形图(项目时间分布) —— 代替 v1 的 Recharts PieChart,零依赖。
  //
  // 规格:
  // - 数据 ProjectStat[](调用方保证按分钟降序;最大项目用最深色)
  // - 单色系阶梯配色:v2 目前只有单一 --color-accent,
  //   用 color-mix(in srgb, var(--color-accent) N%, white) 生成阶梯,
  //   N 降序取 [90, 75, 60, 45, 30, 15, 0](第一名最深,之后逐级变浅);
  //   第 8 项起循环阶梯并逐档降透明度(与首项区分)
  // - 扇区用 stroke-dasharray 画弧(pathLength=100 百分比化,圆心角=minutes/total×360,
  //   扇区间留 2° 间隙对齐 v1 paddingAngle),中心留白不画(环形,非饼)
  // - hover:扇区加粗 + tooltip(项目名 + N 分钟)
  // - 下方图例:色点 + 名称 + 分钟,可换行(最浅一阶是白,色点带描边保证可见)
  // - 总 0 分钟 / 无项目 → 空态文案

  import type { ProjectStat } from "../../lib/api";
  import { getDict } from "../../lib/i18n.svelte";

  const t = $derived(getDict());

  interface Props {
    projects: ProjectStat[];
    emptyText?: string;
  }

  let { projects, emptyText }: Props = $props();

  const VB = 220;
  const C = 110; // 圆心
  const R = 76; // 环半径(stroke 中心线);环厚度在 CSS 里(26,hover 加粗到 30)
  /** 扇区间隙(v1 paddingAngle=2°),pathLength=100 下换算成百分比 */
  const GAP_PCT = (2 / 360) * 100;

  /** accent 混白阶梯(N = accent 占比;降序 → 第一名最深)。N=0 即纯白。 */
  const ACCENT_STEPS = [90, 75, 60, 45, 30, 15, 0];

  function colorOf(i: number): string {
    const n = ACCENT_STEPS[i % ACCENT_STEPS.length];
    return `color-mix(in srgb, var(--color-accent, #e74c3c) ${n}%, white)`;
  }

  /** 阶梯循环重开的位置(第 8 项起与第 1 项同色)起逐档降透明度(下限 0.4),
   *  避免同色扇区在图上无法区分 */
  function opacityOf(i: number): number | undefined {
    return i >= ACCENT_STEPS.length
      ? Math.max(0.4, 1 - (i - ACCENT_STEPS.length + 1) * 0.15)
      : undefined;
  }

  let hovered = $state<number | null>(null);

  const total = $derived(projects.reduce((s, p) => s + p.total_minutes, 0));

  interface Segment {
    i: number;
    p: ProjectStat;
    /** 弧长(pathLength 百分比) */
    len: number;
    /** 弧起点(pathLength 百分比) */
    offset: number;
    color: string;
    opacity: number | undefined;
    /** 弧中点视觉坐标(viewBox 单位;tooltip 锚点) */
    tipX: number;
    tipY: number;
  }

  const segments = $derived.by(() => {
    if (total <= 0 || projects.length === 0) return [];
    const gap = projects.length > 1 ? GAP_PCT : 0;
    let cum = 0;
    return projects.map((p, i): Segment => {
      const frac = p.total_minutes / total;
      const len = Math.max(0.6, frac * 100 - gap);
      // 弧中点角度:circle 起点在 3 点钟方向,group 旋转 -90° 后视觉起点为 12 点钟
      const mid = ((cum + frac / 2) / 100) * 2 * Math.PI - Math.PI / 2;
      const seg: Segment = {
        i,
        p,
        len,
        offset: cum,
        color: colorOf(i),
        opacity: opacityOf(i),
        tipX: C + R * Math.cos(mid),
        tipY: C + R * Math.sin(mid),
      };
      cum += frac * 100;
      return seg;
    });
  });

  const tip = $derived(hovered !== null ? segments[hovered] : null);
</script>

{#if segments.length === 0}
  <div class="empty">{emptyText ?? t.stats.noProject}</div>
{:else}
  <div class="donut">
    <div class="chart">
      <svg viewBox="0 0 {VB} {VB}" role="img" aria-label={t.stats.donutChartAria}>
        <g transform="rotate(-90 {C} {C})">
          {#each segments as s (s.p.project_id)}
            <circle
              class="seg"
              role="presentation"
              class:hovered={hovered === s.i}
              cx={C}
              cy={C}
              r={R}
              pathLength="100"
              style:stroke={s.color}
              opacity={s.opacity}
              stroke-dasharray="{s.len} {100 - s.len}"
              stroke-dashoffset={-s.offset}
              onpointerenter={() => (hovered = s.i)}
              onpointerleave={() => (hovered = null)}
            />
          {/each}
        </g>
      </svg>

      {#if tip}
        <div class="tooltip" style:left={(tip.tipX / VB) * 100 + "%"} style:top={(tip.tipY / VB) * 100 + "%"}>
          {tip.p.project_name} · {tip.p.total_minutes} {t.stats.unitMin}
        </div>
      {/if}
    </div>

    <div class="legend">
      {#each segments as s (s.p.project_id)}
        <span class="legend-item" class:hovered={hovered === s.i}>
          <i class="dot" style:background={s.color} style:opacity={s.opacity ?? 1}></i>
          <span class="name">{s.p.project_name}</span>
          <span class="minutes">{s.p.total_minutes} {t.stats.unitMin}</span>
        </span>
      {/each}
    </div>
  </div>
{/if}

<style>
  .donut {
    display: flex;
    flex-direction: column;
  }
  .chart {
    position: relative;
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
  }
  svg {
    display: block;
    width: 100%;
    height: auto;
  }

  .seg {
    fill: none;
    stroke-width: 26;
    cursor: pointer;
    transition: stroke-width 0.12s;
  }
  .seg:hovered {
    stroke-width: 30;
  }

  .tooltip {
    position: absolute;
    transform: translate(-50%, -130%);
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

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 0.9rem;
    margin-top: 0.75rem;
    justify-content: center;
  }
  .legend-item {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.78rem;
    color: var(--color-text, #1f1d1b);
    max-width: 100%;
    min-width: 0;
  }
  .legend-item .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    /* 最浅一阶是纯白,带描边保证在白卡上可见 */
    border: 1px solid var(--color-border, #e5e2dd);
    flex-shrink: 0;
  }
  .legend-item .name {
    max-width: 8em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .legend-item .minutes {
    color: var(--color-text-muted, #6b6864);
    font-variant-numeric: tabular-nums;
  }
  .legend-item:hovered .name {
    color: var(--color-accent, #e74c3c);
  }

  .empty {
    text-align: center;
    padding: 3rem 0;
    color: var(--color-text-muted, #6b6864);
    font-size: 0.85rem;
  }
</style>
