<script lang="ts">
  // 账号页通用小弹窗(参考原型规格;骨架仿 RepeatCustomDialog:
  // backdrop 点击 + Escape 关闭,role=dialog)。
  import type { Snippet } from "svelte";

  let {
    open,
    title,
    desc = "",
    onClose,
    children,
  }: {
    open: boolean;
    title: string;
    desc?: string;
    onClose: () => void;
    children: Snippet;
  } = $props();

  function onKeydown(e: KeyboardEvent) {
    if (open && e.key === "Escape") onClose();
  }
</script>

<svelte:window onkeydown={onKeydown} />

{#if open}
  <div
    class="overlay"
    role="presentation"
    onclick={(e) => e.target === e.currentTarget && onClose()}
  >
    <div class="modal" role="dialog" aria-modal="true" aria-label={title}>
      <h3>{title}</h3>
      {#if desc}<p>{desc}</p>{/if}
      {@render children()}
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgb(0 0 0 / 32%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal {
    width: 380px;
    max-width: 90vw;
    background: var(--color-surface, #fff);
    border-radius: 16px;
    padding: 24px;
    box-shadow: var(--shadow-lg, 0 10px 40px rgb(0 0 0 / 20%));
  }
  .modal h3 {
    margin: 0 0 8px;
    font-size: 15px;
    font-weight: 500;
    color: var(--color-text);
  }
  .modal p {
    margin: 0 0 16px;
    font-size: 13px;
    line-height: 1.5;
    color: var(--color-text-muted);
  }
</style>
