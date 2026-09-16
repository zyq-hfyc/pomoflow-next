<script lang="ts">
  // 全局 toast 容器 —— App.svelte 挂载一次;配合 lib/toast.svelte.ts 使用。
  import { toast } from "../lib/toast.svelte";

  const items = $derived(toast());
</script>

<div class="toast-host" aria-live="polite">
  {#each items as t (t.id)}
    <div class="toast" class:error={t.kind === "error"} role="status">
      {t.message}
    </div>
  {/each}
</div>

<style>
  .toast-host {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 1200;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 22rem;
    pointer-events: none;
  }
  .toast {
    padding: 0.5rem 0.875rem;
    border-radius: var(--radius-lg, 12px);
    background: var(--color-neutral-900, #1f1d1b);
    color: #fff;
    font-size: 0.8125rem;
    line-height: 1.45;
    box-shadow: var(--shadow-md, 0 4px 16px rgb(0 0 0 / 0.16));
    word-break: break-word;
  }
  .toast.error {
    background: var(--color-error, #dc2626);
  }
</style>
