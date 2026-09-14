<script lang="ts">
  // 测试夹具:TaskDetailPanel 的 `task` 是父层 prop,Svelte 5 不能在 mount
  // 之后改 prop —— 用它包一层持有 $state,暴露 setTask 供测试模拟
  // 「refresh 回灌同 id 新对象(后台同步重拉)」和「切换到另一任务」
  // 两个时刻(2026-09-14 优化批)。
  import TaskDetailPanel from "./TaskDetailPanel.svelte";
  import type { Task } from "../../lib/api";

  let task = $state<Task | null>(null);
  let onClose = $state<() => void>(() => {});
  let onChanged = $state<() => void>(() => {});

  export function setTask(
    t: Task,
    hooks?: { onClose?: () => void; onChanged?: () => void },
  ) {
    task = t;
    if (hooks?.onClose) onClose = hooks.onClose;
    if (hooks?.onChanged) onChanged = hooks.onChanged;
  }
</script>

{#if task}
  <TaskDetailPanel {task} projects={[]} allTags={[]} {onClose} {onChanged} />
{/if}
