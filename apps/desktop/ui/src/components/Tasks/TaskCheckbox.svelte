<script lang="ts">
  // 方形复选框(区别于 TaskItem 的圆角勾选框)— 手账模式专用。
  //
  // 与 v1 `frontend/src/components/Tasks/TaskCheckbox.tsx` 对齐:
  //   - completed:主色底 + 白色 √
  //   - active:空框,hover 加深边框
  //   - 点击 onToggle 切换完成;stopPropagation 避免触发外层选中

  import { Check } from "lucide-svelte";

  interface Props {
    completed: boolean;
    onToggle: () => void;
  }

  let { completed, onToggle }: Props = $props();
</script>

<button
  type="button"
  class="checkbox"
  class:completed
  onclick={(e) => {
    e.stopPropagation();
    onToggle();
  }}
  aria-label={completed ? "已完成" : "标记完成"}
>
  {#if completed}
    <Check size={10} strokeWidth={3} color="#fff" />
  {/if}
</button>

<style>
  .checkbox {
    width: 18px;
    height: 18px;
    border-radius: 4px;
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
  .checkbox:hover {
    border-color: var(--color-text-muted, #6b6864);
  }
  .checkbox.completed {
    background: var(--color-accent, #e74c3c);
    border-color: var(--color-accent, #e74c3c);
  }
</style>
