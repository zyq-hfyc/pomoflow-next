<script lang="ts">
  // 番茄钟页右侧栏 —— 与 v1 TimerPage.tsx 右侧 aside 区块完全对齐。
  //
  // 内容(自上而下):
  //   1. 今日专注卡片(分钟数)
  //   2. 任务列表筛选器(项目 select / 标签 select / 优先级 3 按钮 / 日期 3 按钮 + 清除)
  //   3. 任务列表(按筛选过滤;带优先级点 / 番茄数 / 子任务计数 / 项目名 / 截止日期 / 一键开始)
  //   4. 子任务展开(只读勾选)
  //
  // 设计要点:
  //   - 任务列表展示的是 v1 风格的"侧栏卡片"而不是 TasksPage 的 3-行 TaskItem;
  //     紧凑信息密度更高,适合侧栏宽度。
  //   - 子任务展开由本地 Set<taskId> 维护,刷新后重置(与 v1 一致)。

  import { ChevronDown, ChevronRight, Play } from "lucide-svelte";
  import type { Project, SubTask, Tag, Task } from "../../lib/api";
  import { getDict } from "../../lib/i18n.svelte";
  import type {
    TimerFilter,
    Priority,
    DateFilter,
  } from "../../lib/timerFilter.svelte";

  const t = $derived(getDict());

  // 后端返回的 TaskView 会被拍平 → 字段直接挂在 task 上
  type TaskWithExtras = Task & {
    tags?: Tag[];
    subtasks?: SubTask[];
  };

  interface Props {
    todayMinutes: number;
    projects: Project[];
    tags: Tag[];
    tasks: TaskWithExtras[];
    /** 当前活动任务 id(v1:对应卡片 border-accent-200 + bg-accent-50 高亮) */
    activeTaskId: string | null;
    filter: TimerFilter;
    onFilterChange: (next: Partial<TimerFilter>) => void;
    onStartTask: (task: TaskWithExtras) => void;
    onToggleSubtask: (subtaskId: string, done: boolean) => void;
  }

  let {
    todayMinutes,
    projects,
    tags,
    tasks,
    activeTaskId,
    filter,
    onFilterChange,
    onStartTask,
    onToggleSubtask,
  }: Props = $props();

  // 优先级颜色 —— 与 v1 TimerPage.tsx `priorityColors` 对齐
  const priorityColors: Record<string, string> = {
    high: "var(--color-priority-high, #c97b6e)",
    medium: "var(--color-priority-medium, #d4a373)",
    low: "var(--color-priority-low, #9ca3af)",
    none: "var(--color-text-muted, #9ca3af)",
  };

  let expandedTasks = $state<Set<string>>(new Set());

  function toggleExpand(id: string) {
    const next = new Set(expandedTasks);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    expandedTasks = next;
  }

  function clearFilter() {
    onFilterChange({ project: null, tag: null, priority: null, date: null });
  }

  const hasFilter = $derived(
    filter.tag !== null ||
      filter.project !== null ||
      filter.priority !== null ||
      filter.date !== null,
  );

  const priorityKeys: Priority[] = ["high", "medium", "low"];
  const priorityLabels = $derived<Record<Priority, string>>({
    high: t.priority.high,
    medium: t.priority.medium,
    low: t.priority.low,
  });
  const dateKeys: DateFilter[] = ["today", "tomorrow", "this_week"];
  const dateLabels = $derived<Record<DateFilter, string>>({
    today: t.filter.today,
    tomorrow: t.filter.tomorrow,
    this_week: t.filter.thisWeek,
  });

  function projectName(id: string | null | undefined): string {
    if (!id) return "";
    return projects.find((p) => p.id === id)?.name ?? "";
  }
</script>

<aside class="sidebar">
  <!-- 上方固定区域 -->
  <div class="top">
    <!-- 今日专注 -->
    <div class="today-focus">
      <h3 class="focus-label">{t.timer.todayFocus}</h3>
      <div class="focus-value">
        <span class="num">{todayMinutes}</span>
        <span class="unit">{t.timer.minute}</span>
      </div>
    </div>

    <!-- 筛选器 -->
    <div class="filters">
      <h3 class="filter-title">{t.timer.taskList}</h3>

      <!-- 项目 + 标签 并排 -->
      <div class="row-2col">
        <div>
          <label class="lbl" for="timer-filter-project">{t.filter.project}</label>
          <select
            id="timer-filter-project"
            value={filter.project ?? ""}
            onchange={(e) =>
              onFilterChange({
                project: (e.currentTarget as HTMLSelectElement).value || null,
              })}
          >
            <option value="">{t.filter.all}</option>
            {#each projects as p (p.id)}
              <option value={p.id}>{p.name}</option>
            {/each}
          </select>
        </div>
        <div>
          <label class="lbl" for="timer-filter-tag">{t.filter.tag}</label>
          <select
            id="timer-filter-tag"
            value={filter.tag ?? ""}
            onchange={(e) =>
              onFilterChange({
                tag: (e.currentTarget as HTMLSelectElement).value || null,
              })}
          >
            <option value="">{t.filter.all}</option>
            {#each tags as tag (tag.id)}
              <option value={tag.id}>{tag.name}</option>
            {/each}
          </select>
        </div>
      </div>

      <!-- 优先级 + 日期 -->
      <div class="filter-grid">
        <span class="lbl">{t.filter.priority}</span>
        <div class="btn-group">
          {#each priorityKeys as p (p)}
            <button
              type="button"
              class="opt"
              class:active={filter.priority === p}
              onclick={() =>
                onFilterChange({
                  priority: filter.priority === p ? null : p,
                })}
            >
              {priorityLabels[p]}
            </button>
          {/each}
        </div>

        <span class="lbl">{t.filter.date}</span>
        <div class="btn-group">
          {#each dateKeys as d (d)}
            <button
              type="button"
              class="opt"
              class:active={filter.date === d}
              onclick={() =>
                onFilterChange({
                  date: filter.date === d ? null : d,
                })}
            >
              {dateLabels[d]}
            </button>
          {/each}
        </div>
      </div>

      {#if hasFilter}
        <button type="button" class="clear" onclick={clearFilter}>
          {t.timer.clearFilter}
        </button>
      {/if}
    </div>
  </div>

  <!-- 下方任务列表(可滚动) -->
  <div class="list">
    {#if tasks.length === 0}
      <div class="empty">{t.timer.noTask}</div>
    {/if}
    {#each tasks as task (task.id)}
      {@const isCompleted = task.status === "completed"}
      {@const hasSubs = (task.subtasks?.length ?? 0) > 0}
      {@const isExpanded = expandedTasks.has(task.id)}
      {@const completedSubs = hasSubs
        ? (task.subtasks ?? []).filter((s) => s.is_completed).length
        : 0}
      {@const projName = projectName(task.project_id)}
      <div class="task-card" class:active={task.id === activeTaskId}>
        <!-- 任务行 -->
        <div class="task-row">
          <!-- 展开按钮 -->
          {#if hasSubs}
            <button
              type="button"
              class="expander"
              onclick={() => toggleExpand(task.id)}
              aria-label={isExpanded ? t.timer.collapseSubtasks : t.timer.expandSubtasks}
            >
              {#if isExpanded}<ChevronDown size={14} />{:else}<ChevronRight size={14} />{/if}
            </button>
          {:else}
            <span class="expander-placeholder"></span>
          {/if}

          <!-- 优先级点 -->
          <span
            class="pri-dot"
            style="background-color: {priorityColors[task.priority || 'none'] ??
              priorityColors.none}"
          ></span>

          <!-- 任务信息 -->
          <div class="task-main">
            <div class="title" class:done={isCompleted}>{task.title}</div>
            <div class="meta">
              <span class="meta-item">
                {task.completed_pomodoros ?? 0}/{task.estimated_pomodoros ?? 0} {t.timer.pomodoros}
              </span>
              {#if hasSubs}
                <span class="meta-item">· {completedSubs}/{task.subtasks?.length ?? 0}</span>
              {/if}
              {#if projName}
                <span class="meta-item">{projName}</span>
              {/if}
              {#if task.due_date}
                <span class="meta-item">{task.due_date.slice(0, 10)}</span>
              {/if}
            </div>
          </div>

          <!-- 开始按钮(已完成的任务不显示) -->
          {#if !isCompleted}
            <button
              type="button"
              class="start"
              onclick={() => onStartTask(task)}
              aria-label={t.timer.startTooltip}
              title={t.timer.startTooltip}
            >
              <Play size={10} color="#fff" fill="#fff" />
            </button>
          {/if}
        </div>

        <!-- 子任务列表(展开) -->
        {#if hasSubs && isExpanded}
          <div class="subs">
            {#each task.subtasks ?? [] as st (st.id)}
              <label class="sub-row" class:done={st.is_completed}>
                <input
                  type="checkbox"
                  checked={st.is_completed}
                  onchange={(e) =>
                    onToggleSubtask(
                      st.id,
                      (e.currentTarget as HTMLInputElement).checked,
                    )}
                />
                <span class="sub-title">{st.title}</span>
              </label>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</aside>

<style>
  .sidebar {
    width: 100%;
    background: color-mix(in srgb, var(--color-surface, #fff) 80%, transparent);
    border-top: 1px solid color-mix(in srgb, var(--color-border, #e5e2dd) 70%, transparent);
    backdrop-filter: blur(6px);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }
  @media (min-width: 1024px) {
    .sidebar {
      width: 20rem;
      border-top: none;
      border-left: 1px solid color-mix(in srgb, var(--color-border, #e5e2dd) 70%, transparent);
    }
  }

  .top {
    padding: 1.25rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    flex-shrink: 0;
  }

  /* 今日专注卡片 */
  .today-focus {
    background: var(--color-surface, #fff);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-xl, 16px);
    padding: 1rem;
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.06));
  }
  .focus-label {
    margin: 0 0 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-muted, #6b6864);
  }
  .focus-value {
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
  }
  .num {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-text, #1f1d1b);
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }
  .unit {
    font-size: 0.875rem;
    color: var(--color-text-muted, #6b6864);
  }

  /* 筛选器 */
  .filters {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .filter-title {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text, #1f1d1b);
  }
  .row-2col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
  .lbl {
    font-size: 0.75rem;
    color: var(--color-text-muted, #6b6864);
    display: block;
    margin-bottom: 0.25rem;
  }
  select {
    width: 100%;
    font-size: 0.875rem;
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-lg, 12px);
    padding: 0.375rem 0.75rem;
    background: var(--color-surface, #fff);
    color: var(--color-text, #1f1d1b);
    box-sizing: border-box;
  }
  select:focus {
    outline: none;
    border-color: var(--color-accent, #e74c3c);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent, #e74c3c) 12%, transparent);
  }
  .filter-grid {
    display: grid;
    grid-template-columns: 3rem 1fr;
    gap: 0.5rem 0.5rem;
    align-items: center;
  }
  .btn-group {
    display: flex;
    gap: 0.25rem;
  }
  .opt {
    flex: 1;
    font-size: 0.75rem;
    padding: 0.375rem 0;
    border-radius: var(--radius-lg, 12px);
    border: 1px solid var(--color-border, #e5e2dd);
    background: var(--color-surface, #fff);
    color: var(--color-text-muted, #6b6864);
    cursor: pointer;
    transition: border-color 0.12s, background 0.12s, color 0.12s;
  }
  .opt:hover {
    background: var(--color-bg, #fafaf7);
  }
  .opt.active {
    border-color: var(--color-accent, #e74c3c);
    background: var(--color-accent, #e74c3c);
    color: #fff;
  }
  .clear {
    font-size: 0.75rem;
    color: var(--color-text-muted, #9ca3af);
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    align-self: flex-start;
    transition: color 0.12s;
  }
  .clear:hover {
    color: var(--color-accent, #e74c3c);
  }

  /* 任务列表 */
  .list {
    padding: 0 1.25rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
  }
  @media (min-width: 1024px) {
    .list {
      flex: 1 1 auto;
      min-height: 0;
    }
  }
  .empty {
    text-align: center;
    color: var(--color-text-muted, #9ca3af);
    font-size: 0.875rem;
    padding: 2rem 0;
  }
  .task-card {
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-lg, 12px);
    background: var(--color-surface, #fff);
    transition: border-color 0.12s;
  }
  .task-card:hover {
    border-color: color-mix(in srgb, var(--color-text-muted, #6b6864) 30%, var(--color-border, #e5e2dd));
  }
  /* v1:当前活动任务卡片 accent 描边 + 淡色底 */
  .task-card.active {
    border-color: var(--color-accent-200, #f0c4ae);
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 5%, var(--color-surface, #fff));
  }
  .task-card.active .task-row {
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 5%, transparent);
  }
  .task-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 0.75rem;
  }
  .expander {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    background: transparent;
    border: none;
    color: var(--color-text-muted, #9ca3af);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
  }
  .expander:hover {
    color: var(--color-accent, #e74c3c);
  }
  .expander-placeholder {
    width: 1rem;
    flex-shrink: 0;
  }
  .pri-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .task-main {
    flex: 1;
    min-width: 0;
  }
  .title {
    font-size: 0.875rem;
    color: var(--color-text, #1f1d1b);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .title.done {
    text-decoration: line-through;
    color: var(--color-text-muted, #9ca3af);
  }
  .meta {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin-top: 0.125rem;
    font-size: 0.7rem;
    color: var(--color-text-muted, #9ca3af);
  }
  .meta-item {
    white-space: nowrap;
  }
  .start {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: var(--color-accent, #e74c3c);
    border: none;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.12s;
  }
  .start:hover {
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 90%, black);
  }

  /* 子任务 */
  .subs {
    margin: 0 0.75rem 0.5rem 1.5rem;
    padding-top: 0.25rem;
    border-top: 1px solid color-mix(in srgb, var(--color-border, #e5e2dd) 50%, transparent);
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }
  .sub-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0;
    cursor: pointer;
    font-size: 0.8125rem;
    color: var(--color-text, #1f1d1b);
  }
  .sub-row.done .sub-title {
    text-decoration: line-through;
    color: var(--color-text-muted, #9ca3af);
  }
  .sub-row input[type="checkbox"] {
    margin: 0;
    accent-color: var(--color-accent, #e74c3c);
  }
  .sub-title {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>