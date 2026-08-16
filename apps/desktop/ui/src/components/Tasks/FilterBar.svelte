<script lang="ts">
  // 多维筛选条 —— v1 同款 6 个筛选维度：项目 / 标签 / 优先级 / 本周 / 本月 / 日期范围。
  //
  // 设计要点：
  //   - 已完成 / 已计划 视图各传入独立 state（切视图互不影响）。
  //   - 任何筛选有值 → 显示"清除"按钮。
  //   - 仅在 onExport 传入时显示"导出"按钮（用于"已计划"视图）。
  //   - 受控组件：父组件持有全部 state；本组件只暴露 setter。

  import { Download } from "lucide-svelte";
  import type { Project, Tag } from "../../lib/api";

  type Preset = "week" | "month" | null;
  type Priority = "high" | "medium" | "low" | "none";

  interface Props {
    projects: Project[];
    tags: Tag[];
    filterProject: string | null;
    setFilterProject: (v: string | null) => void;
    filterTag: string | null;
    setFilterTag: (v: string | null) => void;
    filterPriority: Priority | null;
    setFilterPriority: (v: Priority | null) => void;
    filterPreset: Preset;
    setFilterPreset: (v: Preset) => void;
    filterStartDate: string;
    setFilterStartDate: (v: string) => void;
    filterEndDate: string;
    setFilterEndDate: (v: string) => void;
    onExport?: () => void;
  }

  let {
    projects,
    tags,
    filterProject,
    setFilterProject,
    filterTag,
    setFilterTag,
    filterPriority,
    setFilterPriority,
    filterPreset,
    setFilterPreset,
    filterStartDate,
    setFilterStartDate,
    filterEndDate,
    setFilterEndDate,
    onExport,
  }: Props = $props();

  const hasFilter = $derived(
    filterProject !== null ||
      filterTag !== null ||
      filterPriority !== null ||
      filterPreset !== null ||
      filterStartDate !== "" ||
      filterEndDate !== "",
  );

  function clearAll() {
    setFilterProject(null);
    setFilterTag(null);
    setFilterPriority(null);
    setFilterPreset(null);
    setFilterStartDate("");
    setFilterEndDate("");
  }
</script>

<div class="filter-bar">
  <div class="row-1">
    <select
      value={filterProject ?? ""}
      onchange={(e) => {
        const v = (e.currentTarget as HTMLSelectElement).value;
        setFilterProject(v || null);
      }}
      title={filterProject !== null
        ? projects.find((p) => p.id === filterProject)?.name
        : "全部项目"}
      class="select"
      aria-label="项目筛选"
    >
      <option value="">全部项目</option>
      {#each projects as p (p.id)}
        <option value={p.id}>{p.name}</option>
      {/each}
    </select>

    <select
      value={filterTag ?? ""}
      onchange={(e) => {
        const v = (e.currentTarget as HTMLSelectElement).value;
        setFilterTag(v || null);
      }}
      title={filterTag !== null
        ? tags.find((x) => x.id === filterTag)?.name
        : "全部标签"}
      class="select"
      aria-label="标签筛选"
    >
      <option value="">全部标签</option>
      {#each tags as t (t.id)}
        <option value={t.id}>{t.name}</option>
      {/each}
    </select>

    <select
      value={filterPriority ?? ""}
      onchange={(e) => {
        const v = (e.currentTarget as HTMLSelectElement).value;
        setFilterPriority((v || null) as Priority | null);
      }}
      class="select"
      aria-label="优先级筛选"
    >
      <option value="">全部优先级</option>
      <option value="high">高</option>
      <option value="medium">中</option>
      <option value="low">低</option>
      <option value="none">无</option>
    </select>

    <button
      type="button"
      class="preset-btn"
      class:on={filterPreset === "week"}
      onclick={() => setFilterPreset(filterPreset === "week" ? null : "week")}
    >
      本周
    </button>
    <button
      type="button"
      class="preset-btn"
      class:on={filterPreset === "month"}
      onclick={() => setFilterPreset(filterPreset === "month" ? null : "month")}
    >
      本月
    </button>

    {#if hasFilter}
      <button
        type="button"
        class="clear-btn"
        onclick={clearAll}
      >
        清除筛选
      </button>
    {/if}
  </div>

  <div class="row-2">
    <span class="hint">到期日</span>
    <input
      type="date"
      value={filterStartDate}
      onchange={(e) => setFilterStartDate((e.currentTarget as HTMLInputElement).value)}
      class="date"
      aria-label="起始日期"
    />
    <span class="hint">至</span>
    <input
      type="date"
      value={filterEndDate}
      onchange={(e) => setFilterEndDate((e.currentTarget as HTMLInputElement).value)}
      class="date"
      aria-label="结束日期"
    />

    {#if onExport}
      <button
        type="button"
        class="export-btn"
        onclick={onExport}
      >
        <Download size={14} />
        导出
      </button>
    {/if}
  </div>
</div>

<style>
  .filter-bar {
    background: var(--color-surface, #fff);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-md, 8px);
    padding: 1rem;
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.06));
    margin-bottom: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .row-1 {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.75rem;
    overflow-x: auto;
  }

  .select {
    font-size: 0.85rem;
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-md, 8px);
    padding: 0.4rem 0.75rem;
    background: var(--color-surface, #fff);
    color: var(--color-text, #1f1d1b);
    outline: none;
    width: 130px;
    flex-shrink: 0;
  }
  .select:focus {
    border-color: var(--color-accent, #e74c3c);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent, #e74c3c) 15%, transparent);
  }

  .preset-btn {
    font-size: 0.85rem;
    padding: 0.4rem 0.75rem;
    border-radius: var(--radius-md, 8px);
    border: 1px solid var(--color-border, #e5e2dd);
    background: var(--color-surface, #fff);
    color: var(--color-text, #1f1d1b);
    cursor: pointer;
    transition: background 0.12s, color 0.12s, border-color 0.12s;
    flex-shrink: 0;
  }
  .preset-btn:hover {
    background: var(--color-bg, #fafaf7);
  }
  .preset-btn.on {
    background: var(--color-accent, #e74c3c);
    color: #fff;
    border-color: var(--color-accent, #e74c3c);
  }

  .clear-btn {
    font-size: 0.75rem;
    color: var(--color-text-muted, #6b6864);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
  }
  .clear-btn:hover {
    color: var(--color-accent, #e74c3c);
  }

  .row-2 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .hint {
    font-size: 0.75rem;
    color: var(--color-text-muted, #6b6864);
  }
  .date {
    font-size: 0.85rem;
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-md, 8px);
    padding: 0.35rem 0.6rem;
    background: var(--color-surface, #fff);
    color: var(--color-text, #1f1d1b);
    outline: none;
  }
  .date:focus {
    border-color: var(--color-accent, #e74c3c);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent, #e74c3c) 15%, transparent);
  }
  .export-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-left: auto;
    font-size: 0.85rem;
    padding: 0.4rem 0.75rem;
    border-radius: var(--radius-md, 8px);
    background: var(--color-accent, #e74c3c);
    color: #fff;
    border: none;
    cursor: pointer;
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.06));
  }
  .export-btn:hover {
    background: var(--color-accent-hover, #c0392b);
  }
</style>