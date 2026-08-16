<script lang="ts">
  // 复盘文本框 —— 周 / 日 / 今日日复盘共用(番茄钟页"今日日复盘"用的是这个)。
  //
  // 设计要点:
  //   - 内联编辑,失焦自动保存
  //   - 失焦时若文本为空且原值非空 → onDelete(清空)
  //   - 失焦时若文本变化且非空 → onSave
  //   - 与 v1 `frontend/src/components/Tasks/ReviewTextarea.tsx` 行为一致

  import { untrack } from "svelte";

  interface Props {
    value: string | null;
    placeholder?: string;
    rows?: number;
    onSave: (text: string) => void;
    onDelete?: () => void;
  }

  let { value, placeholder, rows = 2, onSave, onDelete }: Props = $props();

  let text = $state(untrack(() => value ?? ""));

  // 当外部 value 变化时(例如刷新后重新拉数据)同步本地
  $effect(() => {
    const incoming = value ?? "";
    if (incoming !== text) {
      text = incoming;
    }
  });

  function handleBlur() {
    const trimmed = text.trim();
    if (trimmed === "") {
      if (value && onDelete) onDelete();
    } else if (trimmed !== (value ?? "")) {
      onSave(trimmed);
    }
  }
</script>

<textarea
  bind:value={text}
  onblur={handleBlur}
  placeholder={placeholder ?? "写下今天的复盘..."}
  {rows}
  class="review-textarea"
></textarea>

<style>
  .review-textarea {
    width: 100%;
    font-size: 0.875rem;
    color: var(--color-text, #1f1d1b);
    background: var(--color-bg, #fafaf7);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-md, 8px);
    padding: 0.5rem 0.75rem;
    resize: none;
    transition: border-color 0.12s, background 0.12s;
    font-family: inherit;
    line-height: 1.5;
    box-sizing: border-box;
  }
  .review-textarea::placeholder {
    color: var(--color-text-muted, #9ca3af);
  }
  .review-textarea:focus {
    outline: none;
    border-color: var(--color-accent, #e74c3c);
    background: var(--color-surface, #fff);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent, #e74c3c) 12%, transparent);
  }
</style>