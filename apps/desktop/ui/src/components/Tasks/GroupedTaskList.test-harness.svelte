<script lang="ts">
  // 测试夹具:GroupedTaskList 的 `expandKey` 是父组件传下来的 prop,
  // 而 Svelte 5 不能在 mount 之后改 prop —— 用它包一层持有 $state,
  // 暴露 setExpandKey 供测试驱动「跳转定位」那一刻。
  import GroupedTaskList from "./GroupedTaskList.svelte";
  import type { Task } from "../../lib/api";

  interface Props {
    tasks: (Task & { tags?: never[] })[];
  }

  let { tasks }: Props = $props();

  let expandKey = $state<string | null>(null);
  let selected = $state<string | null>(null);

  export function setExpandKey(key: string | null) {
    expandKey = key;
  }
</script>

<GroupedTaskList
  {tasks}
  groupBy="due_date"
  selectedTask={tasks.find((t) => t.id === selected) ?? null}
  onToggle={() => {}}
  onSelect={(t) => (selected = t.id)}
  {expandKey}
/>
