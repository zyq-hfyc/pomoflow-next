<script lang="ts">
  // 单条任务卡片 —— v1 同款三行分层（priority badge / title / tags / progress dots）。
  //
  // 设计要点:
  //   - 点击整条卡片 → onSelect(task)（打开详情面板）
  //   - checkbox 切换完成态(独立 click 阻止冒泡)
  //   - 右侧"开始"按钮(仅 active 任务)→ onStart(task)
  //   - 已完成任务用 line-through + 中性色
  //   - tags 灰色 #tag 形式,最多显示 3 个
  //   - 进度点(最多 8 个)展示 completed_pomodoros / estimated_pomodoros

  import { Check, Play } from "lucide-svelte";
  import type { Task, Tag } from "../../lib/api";
  import { datePart } from "../../lib/dueDate";

  interface Props {
    task: Task & { tags?: Tag[] };
    selected: boolean;
    onToggle: (id: string) => void;
    onSelect: (task: Task & { tags?: Tag[] }) => void;
    onStart?: (task: Task & { tags?: Tag[] }) => void;
  }

  let { task, selected, onToggle, onSelect, onStart }: Props = $props();

  const isCompleted = $derived(task.status === "completed");
  const estimated = $derived(task.estimated_pomodoros || 0);
  const completedCount = $derived(task.completed_pomodoros || 0);
  const priorityColor = $derived({
    high: "var(--color-priority-high, #c97b6e)",
    medium: "var(--color-priority-medium, #d4a373)",
    low: "var(--color-priority-low, #9ca3af)",
    none: "var(--color-priority-low, #9ca3af)",
  }[task.priority || "none"]);
  const priorityLabel = $derived(
    { high: "高", medium: "中", low: "低", none: "" }[task.priority || "none"],
  );
  const dueLabel = $derived(task.due_date ? datePart(task.due_date) : "");
</script>

<div
  class="task-card"
  class:selected
  class:done={isCompleted}
  onclick={() => onSelect(task)}
  onkeydown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(task);
    }
  }}
  role="button"
  tabindex="0"
  aria-label={task.title}
>
  <!-- Checkbox -->
  <button
    type="button"
    class="check"
    class:checked={isCompleted}
    onclick={(e) => {
      e.stopPropagation();
      onToggle(task.id);
    }}
    aria-label={isCompleted ? "标记为未完成" : "标记为完成"}
  >
    {#if isCompleted}
      <Check size={12} strokeWidth={3} color="#fff" />
    {/if}
  </button>

  <!-- 主内容：三行分层 -->
  <div class="main">
    <!-- 第一行：优先级标签 + 标题 -->
    <div class="row-1">
      {#if task.priority && task.priority !== "none"}
        <span
          class="pri-badge"
          style="--pri-color: {priorityColor}"
        >
          {priorityLabel}
        </span>
      {/if}
      <span class="title">{task.title}</span>
    </div>

    <!-- 第二行：标签 -->
    {#if task.tags && task.tags.length > 0}
      <div class="row-2">
        {#each task.tags.slice(0, 3) as tag (tag.id)}
          <span class="tag">#{tag.name}</span>
        {/each}
      </div>
    {/if}

    <!-- 第三行：进度点 + 番茄数 + 日期 -->
    <div class="row-3">
      {#if estimated > 0}
        <span class="progress">
          <span class="dots">
            {#each Array.from({ length: Math.min(estimated, 8) }) as _, i (i)}
              <span
                class="dot"
                class:filled={i < completedCount}
              ></span>
            {/each}
          </span>
          <span class="count">{completedCount}/{estimated} 番茄</span>
        </span>
      {/if}
      {#if dueLabel}
        <span class="due">{dueLabel}</span>
      {/if}
    </div>
  </div>

  <!-- 开始按钮 -->
  {#if !isCompleted && onStart}
    <button
      type="button"
      class="start"
      onclick={(e) => {
        e.stopPropagation();
        onStart?.(task);
      }}
      aria-label="开始专注"
      title="开始专注"
    >
      <Play size={13} color="#fff" fill="#fff" />
    </button>
  {/if}
</div>

<style>
  .task-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-md, 8px);
    background: var(--color-surface, #fff);
    border: 1px solid var(--color-border, #e5e2dd);
    cursor: pointer;
    transition: border-color 0.12s, box-shadow 0.12s, transform 0.12s;
  }
  .task-card:hover {
    border-color: var(--color-accent, #e74c3c);
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.06));
    transform: translateY(-1px);
  }
  .task-card.selected {
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 6%, transparent);
    border-color: var(--color-accent, #e74c3c);
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.06));
  }
  .task-card.done .title {
    text-decoration: line-through;
    color: var(--color-text-muted, #6b6864);
  }

  .check {
    width: 18px;
    height: 18px;
    border-radius: 6px;
    border: 1.5px solid var(--color-border, #e5e2dd);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
    padding: 0;
    transition: border-color 0.12s, background 0.12s;
  }
  .check:hover {
    border-color: var(--color-accent, #e74c3c);
  }
  .check.checked {
    background: var(--color-accent, #e74c3c);
    border-color: var(--color-accent, #e74c3c);
  }

  .main {
    flex: 1;
    min-width: 0;
  }

  .row-1 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .title {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--color-text, #1f1d1b);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pri-badge {
    font-size: 0.7rem;
    font-weight: 500;
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
    color: var(--pri-color, var(--color-accent, #e74c3c));
    background: color-mix(in srgb, var(--pri-color, var(--color-accent, #e74c3c)) 12%, transparent);
    flex-shrink: 0;
  }

  .row-2 {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: var(--color-text-muted, #6b6864);
  }
  .tag {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .row-3 {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: var(--color-text-muted, #6b6864);
  }
  .progress {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .dots {
    display: flex;
    gap: 3px;
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-border, #e5e2dd);
  }
  .dot.filled {
    background: var(--color-success, #5cb85c);
  }
  .count {
    font-variant-numeric: tabular-nums;
  }
  .due {
    color: var(--color-text-muted, #6b6864);
  }

  .start {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--color-accent, #e74c3c);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.06));
    transition: background 0.12s;
  }
  .start:hover {
    background: var(--color-accent-hover, #c0392b);
  }
</style>