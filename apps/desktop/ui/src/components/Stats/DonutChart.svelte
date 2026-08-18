<script lang="ts">
  // 手写 SVG 环形图(项目时间分布) —— 代替 v1 的 Recharts PieChart,零依赖。
  //
  // 视觉规格对齐 v1 StatsPage.tsx:272(Recharts Pie):
  // - 环体:innerRadius=50 / outerRadius=90(环厚 40),paddingAngle=2°
  // - 配色:v1 PIE_COLORS 10 色深浅交错 accent 阶梯
  //   (500/300/700/400/200/600/800/100/900 + neutral-300)
  // - 扇区外缘直接标注项目名(v1 label,无图例)
  // - hover:白底 tooltip(项目名 + N 分钟),扇区本体不变(v1 无放大)
  // - 总 0 分钟 / 无项目 → 空态文案

  import type { ProjectStat } from "../../lib/api";
  import { getDict } from "../../lib/i18n.svelte";

  const t = $derived(getDict());

  interface Props {
    projects: ProjectStat[];
    emptyText?: string;
  }

  let { projects, emptyText }: Props = $props();

  const VB = 240;
  const C = 120; // 圆心
  const R = 70; // 环中心线半径;stroke-width 40 → 内 50 / 外 90(v1 inner/outerRadius)
  /** 扇区间隙(v1 paddingAngle=2°),pathLength=100 下换算成百分比 */
  const GAP_PCT = (2 / 360) * 100;
  /** 项目名 label 的锚定半径(外半径 90 + 14) */
  const LABEL_R = 104;

  /** v1 PIE_COLORS:10 色深浅交错阶梯,超 10 项循环并逐档降透明度 */
  const ACCENT_STEPS = [500, 300, 700, 400, 200, 600, 800, 100, 900];
  const FALLBACKS: Record<string, string> = {
    "100": "#faebe2", "200": "#f4d5c4", "300": "#ecb89d", "400": "#e29676",
    "500": "#d17b5c", "600": "#b86649", "700": "#9a523b", "800": "#7a4130",
    "900": "#5c3125",
  };

  function colorOf(i: number): string {
    if (i < ACCENT_STEPS.length) {
      const step = ACCENT_STEPS[i];
      return `var(--color-accent-${step}, ${FALLBACKS[String(step)]})`;
    }
    if (i === ACCENT_STEPS.length) return "var(--color-neutral-300, #d2ccc2)";
    // >10 项:循环阶梯 + 降透明度(与首项区分)
    return `var(--color-accent-${ACCENT_STEPS[i % ACCENT_STEPS.length]}, ${FALLBACKS[String(ACCENT_STEPS[i % ACCENT_STEPS.length])]})`;
  }

  function opacityOf(i: number): number | undefined {
    return i > ACCENT_STEPS.length
      ? Math.max(0.4, 1 - (i - ACCENT_STEPS.length) * 0.15)
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
    /** 弧中点角度(未旋转坐标系:起点 3 点钟;group 旋转 -90° 后视觉起点 12 点钟) */
    midRad: number;
    /** label 锚点坐标(外缘) */
    lx: number;
    ly: number;
    /** label 水平对齐(按所在半区) */
    anchor: "start" | "middle" | "end";
  }

  const segments = $derived.by(() => {
    if (total <= 0 || projects.length === 0) return [];
    const gap = projects.length > 1 ? GAP_PCT : 0;
    let cum = 0;
    return projects.map((p, i): Segment => {
      const frac = p.total_minutes / total;
      const len = Math.max(0.6, frac * 100 - gap);
      const mid = ((cum + frac / 2) / 100) * 2 * Math.PI - Math.PI / 2;
      const cos = Math.cos(mid);
      const seg: Segment = {
        i,
        p,
        len,
        offset: cum,
        color: colorOf(i),
        opacity: opacityOf(i),
        midRad: mid,
        lx: C + LABEL_R * cos,
        ly: C + LABEL_R * Math.sin(mid),
        anchor: Math.abs(cos) < 0.35 ? "middle" : cos > 0 ? "start" : "end",
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
  <div class="chart">
    <svg viewBox="0 0 {VB} {VB}" role="img" aria-label={t.stats.donutChartAria}>
      <g transform="rotate(-90 {C} {C})">
        {#each segments as s (s.p.project_id)}
          <circle
            class="seg"
            role="presentation"
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
      <!-- v1 label:扇区外缘直接标注项目名 -->
      {#each segments as s (s.p.project_id)}
        <text
          class="seg-label"
          x={s.lx}
          y={s.ly}
          text-anchor={s.anchor}
          dominant-baseline="middle"
        >{s.p.project_name}</text>
      {/each}
    </svg>

    {#if tip}
      <div class="tooltip" style:left={(tip.lx / VB) * 100 + "%"} style:top={(tip.ly / VB) * 100 + "%"}>
        {tip.p.project_name} · {tip.p.total_minutes} {t.stats.unitMin}
      </div>
    {/if}
  </div>
{/if}

<style>
  .chart {
    position: relative;
    width: 100%;
    max-width: 220px;
    margin: 0 auto;
  }
  svg {
    display: block;
    width: 100%;
    height: auto;
  }

  /* v1 环厚 40(inner 50 / outer 90);hover 不放大(v1 Recharts 无此效果) */
  .seg {
    fill: none;
    stroke-width: 40;
    cursor: pointer;
  }

  .seg-label {
    font-size: 11px;
    fill: var(--color-neutral-600, #57534e);
  }

  /* v1 Recharts 默认 tooltip:白底 + 浅灰边 */
  .tooltip {
    position: absolute;
    transform: translate(-50%, -140%);
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
