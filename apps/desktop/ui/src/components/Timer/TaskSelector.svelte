<script lang="ts">
  // 专注任务选择器 —— v1 TaskSelector.tsx 复刻。
  //
  // 为什么不用原生 select:v1 每个候选项要展示两行信息(标题 + n/m 番茄)
  // 和优先级色点,原生 <option> 做不到,故用自绘下拉。
  //
  // 行为(v1 对齐):
  //   - 候选 = 传入的 active 任务列表(父组件已按 优先级→创建时间 排序)
  //   - 顶部固定「无特定任务」项(允许无任务专注)
  //   - 当前任务前显示 Check;列表空显示「暂无待办任务」
  //   - 计时中不锁定 —— v1 专注模式下随时可换任务,会话不打断

  import { ChevronDown, Check } from "lucide-svelte";
  import type { Task } from "../../lib/api";
  import { getDict } from "../../lib/i18n.svelte";

  const t = $derived(getDict());

  interface Props {
    tasks: Task[];
    activeTask: Task | null;
    onSelect: (task: Task | null) => void;
  }

  let { tasks, activeTask, onSelect }: Props = $props();

  let open = $state(false);

  // 优先级颜色 —— v1 TaskSelector.tsx 同款
  const priorityColors: Record<string, string> = {
    high: "var(--color-priority-high, #c97b6e)",
    medium: "var(--color-priority-medium, #d4a373)",
    low: "var(--color-priority-low, #9ca3af)",
    none: "var(--color-text-muted, #9ca3af)",
  };

  function pick(task: Task | null) {
    onSelect(task);
    open = false;
  }
</script>

<div class="selector">
  <button
    type="button"
    class="trigger"
    onclick={() => (open = !open)}
    aria-haspopup="listbox"
    aria-expanded={open}
  >
    <span class="trigger-label">{activeTask ? activeTask.title : t.timer.selectTask}</span>
    <ChevronDown size={16} class={"chev" + (open ? " open" : "")} />
  </button>

  {#if open}
    <!-- 背板:点击任意处收起 -->
    <button type="button" class="backdrop" onclick={() => (open = false)} aria-hidden="true"
      tabindex="-1"></button>
    <div class="menu" role="listbox">
      <button
        type="button"
        class="item"
        role="option"
        aria-selected={activeTask === null}
        onclick={() => pick(null)}
      >
        <span class="check">{#if !activeTask}<Check size={16} />{/if}</span>
        <span class="item-title">{t.timer.noSpecificTask}</span>
      </button>
      {#if tasks.length === 0}
        <div class="empty">{t.timer.noTodoTask}</div>
      {/if}
      {#each tasks as task (task.id)}
        <button
          type="button"
          class="item"
          role="option"
          aria-selected={activeTask?.id === task.id}
          onclick={() => pick(task)}
        >
          <span class="check">
            {#if activeTask?.id === task.id}<Check size={16} />{/if}
          </span>
          <span class="item-main">
            <span class="item-title">{task.title}</span>
            <span class="item-sub">
              {task.completed_pomodoros ?? 0}/{task.estimated_pomodoros ?? 0} {t.timer.pomodoros}
            </span>
          </span>
          <span
            class="pri-dot"
            style="background-color: {priorityColors[task.priority ?? 'none'] ?? priorityColors.none}"
          ></span>
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .selector {
    position: relative;
    z-index: 20;
  }
  .trigger {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--color-surface, #fff);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: 999px;
    color: var(--color-text, #1f1d1b);
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.06));
    cursor: pointer;
    transition: background 0.15s;
    max-width: 320px;
  }
  .trigger:hover {
    background: var(--color-bg, #fafaf7);
  }
  .trigger-label {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.9rem;
  }
  .chev {
    transition: transform 0.15s;
    flex-shrink: 0;
  }
  .chev.open {
    transform: rotate(180deg);
  }

  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 10;
    background: transparent;
    border: none;
    padding: 0;
    cursor: default;
  }

  .menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 50%;
    transform: translateX(-50%);
    width: 18rem;
    max-height: 20rem;
    overflow-y: auto;
    background: var(--color-surface, #fff);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-xl, 16px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    z-index: 20;
    padding: 0.25rem;
  }
  .item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.6rem 0.75rem;
    background: transparent;
    border: none;
    border-radius: var(--radius-md, 8px);
    cursor: pointer;
    text-align: left;
    color: var(--color-text, #1f1d1b);
  }
  .item:hover {
    background: var(--color-bg, #fafaf7);
  }
  .check {
    width: 1rem;
    flex-shrink: 0;
    color: var(--color-accent, #e74c3c);
    display: inline-flex;
  }
  .item-main {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }
  .item-title {
    font-size: 0.875rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item-sub {
    font-size: 0.75rem;
    color: var(--color-text-muted, #6b6864);
  }
  .pri-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .empty {
    padding: 0.75rem 1rem;
    color: var(--color-text-muted, #9ca3af);
    font-size: 0.875rem;
  }
</style>
