<script lang="ts">
  // 分组任务列表 —— v1 同款，按 due_date 或 completed_at 分组，组内可折叠。
  //
  // 用法（"已计划" / "已完成" 视图用）：
  //   <GroupedTaskList
  //     tasks={filtered}
  //     groupBy="due_date"
  //     selectedTask={...}
  //     onToggle={...}
  //     onSelect={...}
  //     onStart={...}
  //   />
  //
  // 设计要点：
  //   - 按 groupBy 把任务分成若干日期组；无日期的归入"未排期"。
  //   - 头部展示 `YYYY-MM-DD（周X）| 预估 N 分钟`。
  //   - 每组可独立折叠（点头部切换）。
  //   - 内部仍用 TaskItem 渲染单条。

  import { ChevronDown, ChevronRight } from "lucide-svelte";
  import type { Task, Tag } from "../../lib/api";
  import { getDict, fmt } from "../../lib/i18n.svelte";
  import { datePart } from "../../lib/dueDate";
  import TaskItem from "./TaskItem.svelte";

  const t = $derived(getDict());

  type TaskWithTags = Task & { tags?: Tag[] };

  interface Props {
    tasks: TaskWithTags[];
    groupBy: "due_date" | "completed_at";
    selectedTask: TaskWithTags | null;
    onToggle: (id: string) => void;
    onSelect: (task: TaskWithTags) => void;
    onStart?: (task: TaskWithTags) => void;
  }

  let { tasks, groupBy, selectedTask, onToggle, onSelect, onStart }: Props = $props();

  const UNSCHEDULED = "unscheduled";

  let collapsed = $state<Set<string>>(new Set());

  function formatHeader(dateStr: string, groupTasks: TaskWithTags[]): string {
    const d = new Date(dateStr + "T00:00:00");
    const totalMinutes = groupTasks.reduce(
      (s, x) => s + (x.estimated_pomodoros || 0) * (x.pomodoro_duration || 25),
      0,
    );
    return fmt(t.task.groupHeader, {
      date: dateStr,
      weekday: t.enum.weekday[d.getDay()],
      n: totalMinutes,
    });
  }

  function toggleGroup(key: string) {
    const next = new Set(collapsed);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    collapsed = next;
  }

  const groups = $derived.by(() => {
    const map = new Map<string, TaskWithTags[]>();
    for (const t of tasks) {
      let key: string;
      if (groupBy === "completed_at") {
        if (t.completed_at) {
          key = datePart(t.completed_at);
        } else {
          key = UNSCHEDULED;
        }
      } else {
        key = t.due_date ? datePart(t.due_date) : UNSCHEDULED;
      }
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    }
    const entries = Array.from(map.entries());
    entries.sort((a, b) => {
      if (a[0] === UNSCHEDULED) return 1;
      if (b[0] === UNSCHEDULED) return -1;
      return new Date(a[0]).getTime() - new Date(b[0]).getTime();
    });
    return entries;
  });
</script>

<div class="grouped">
  {#each groups as [dateStr, groupTasks] (dateStr)}
    {@const isCollapsed = collapsed.has(dateStr)}
    <div class="group">
      <button
        type="button"
        class="group-header"
        onclick={() => toggleGroup(dateStr)}
        aria-expanded={!isCollapsed}
      >
        <span>{dateStr === UNSCHEDULED ? t.task.noDate : formatHeader(dateStr, groupTasks)}</span>
        <span class="chev">
          {#if isCollapsed}<ChevronRight size={16} />{:else}<ChevronDown size={16} />{/if}
        </span>
      </button>
      {#if !isCollapsed}
        <div class="group-tasks">
          {#each groupTasks as task (task.id)}
            <TaskItem
              {task}
              selected={selectedTask?.id === task.id}
              {onToggle}
              {onSelect}
              {onStart}
            />
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .grouped {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .group-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.25rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-text, #1f1d1b);
    background: var(--color-neutral-50, #fbfaf8); /* v1 bg-gray-50 整条底 */
    border: none;
    border-bottom: 1px solid var(--color-neutral-100, #f5f3f0);
    cursor: pointer;
    margin-bottom: 0.25rem;
  }
  .group-header:hover {
    color: var(--color-accent, #e74c3c);
  }
  .chev {
    color: var(--color-text-muted, #6b6864);
  }
  .group-header:hover .chev {
    color: var(--color-accent, #e74c3c);
  }
  .group-tasks {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>