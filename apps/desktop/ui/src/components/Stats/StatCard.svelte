<script lang="ts">
  // 统计卡片 —— 方案 3.8：
  //   - 白底 / 暖灰边 / 圆角 lg
  //   - 40px 图标块 + accent 浅底 / 主色图标
  //   - 数值 tabular-nums 26px 主色,unit 小字次色
  //   - 悬浮 border-accent + shadow-sm
  //
  // 与 v1 pomoflow 完全一致。lucide-svelte 的 Icon 组件接受 size / strokeWidth。
  //
  // icon 类型用宽泛的 Component<any>：
  //   lucide-svelte 1.x 导出的是 Svelte 4 SvelteComponentTyped，
  //   Svelte 5 的 Component<IconProps> 强类型断言不匹配（内部 Brand 差异）。
  //   但运行期 icon 仍是合法组件，调用 <Icon size=...> 没问题。

  import type { Component } from "svelte";

  interface Props {
    icon: Component<any, any, any>;
    label: string;
    value: number | string;
    unit?: string;
    /** 强调态：图标块与数值使用 accent 色 */
    accent?: boolean;
  }

  let { icon: Icon, label, value, unit, accent }: Props = $props();
</script>

<div class="stat-card" class:accent>
  <div class="icon-block">
    <Icon size={18} strokeWidth={1.8} />
  </div>
  <div class="value">
    {value}{#if unit}<span class="unit">{unit}</span>{/if}
  </div>
  <div class="label">{label}</div>
</div>

<style>
  .stat-card {
    background: var(--color-surface, #fff);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-lg, 12px);
    padding: 0.875rem;
    box-shadow: var(--shadow-xs, 0 1px 2px rgba(89, 47, 34, 0.04)); /* v1 shadow-xs */
    transition: border-color 0.12s, box-shadow 0.12s;
  }
  .stat-card:hover {
    border-color: var(--color-accent-200, #f4d5c4); /* v1 hover accent-200 */
    box-shadow: var(--shadow-sm, 0 2px 4px rgba(89, 47, 34, 0.04));
  }

  .icon-block {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: var(--color-bg, #fafaf7);
    color: var(--color-text-muted, #6b6864);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.6rem;
  }
  .stat-card.accent .icon-block {
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 12%, transparent);
    color: var(--color-accent, #e74c3c);
  }

  .value {
    font-size: 1.625rem;
    font-weight: 600;
    line-height: 1.15;
    color: var(--color-text, #1f1d1b);
    font-variant-numeric: tabular-nums;
  }
  .unit {
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--color-text-muted, #6b6864);
    margin-left: 0.25rem;
  }

  .label {
    font-size: 0.7rem;
    color: var(--color-text-muted, #6b6864);
    margin-top: 0.3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>