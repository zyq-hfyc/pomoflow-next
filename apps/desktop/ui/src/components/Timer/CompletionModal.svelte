<script lang="ts">
  // 完成提示弹窗 —— 番茄钟到点 / 用户主动完成后,弹出居中模态。
  //
  // 与 v1 TimerPage.tsx 末尾的 `pendingCompletionMessage` 模态对齐。
  // 这里只是 UI 壳子,正文由父组件提供(open + message + onClose)。

  import { getDict } from "../../lib/i18n.svelte";

  const t = $derived(getDict());

  interface Props {
    open: boolean;
    message: string;
    onClose: () => void;
  }

  let { open, message, onClose }: Props = $props();

  function handleBackdrop(e: MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === "Escape") onClose();
  }
</script>

<svelte:window onkeydown={open ? handleKey : undefined} />

{#if open}
  <div
    class="backdrop"
    onclick={handleBackdrop}
    role="presentation"
  >
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="icon-wrap">⏰</div>
      <!-- v1 TimerPage:491 —— 专注/休息完成共用通用标题「提示」 -->
      <h3 id="modal-title" class="title">{t.timer.modalTitle}</h3>
      <p class="msg">{message}</p>
      <button class="btn" onclick={onClose} type="button">{t.common.confirm}</button>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
  }
  .modal {
    background: var(--color-surface, #fff);
    border-radius: var(--radius-lg, 12px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    padding: 1.5rem;
    width: 20rem;
    max-width: 90vw;
    text-align: center;
  }
  .icon-wrap {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 12%, transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0.75rem;
    font-size: 1.5rem;
  }
  .title {
    margin: 0 0 0.25rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text, #1f1d1b);
  }
  .msg {
    margin: 0 0 1.25rem;
    font-size: 0.875rem;
    color: var(--color-text-muted, #6b6864);
  }
  .btn {
    width: 100%;
    padding: 0.5rem 1rem;
    background: var(--color-accent, #e74c3c);
    color: #fff;
    border: none;
    border-radius: var(--radius-md, 8px);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.12s;
  }
  .btn:hover {
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 90%, black);
  }
</style>