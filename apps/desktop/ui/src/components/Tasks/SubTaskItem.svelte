<script lang="ts">
  // 单条子任务行 —— checkbox + 标题(可编辑) + 删除按钮。
  //
  // 设计要点:
  //   - 标题默认显示态,点击进入编辑态(contenteditable 改用 input,IME 友好)。
  //   - 回车提交、Esc 取消、失焦自动提交。
  //   - 切换 checkbox 立即 onChange;title 改动节流到 blur。
  //   - 父组件持有 SubTask 数据,本组件只暴露 onChange(整条替换)+ onDelete。

  import { untrack } from "svelte";
  import type { SubTask } from "../../lib/api";

  interface Props {
    subtask: SubTask;
    onChange: (next: SubTask) => void;
    onDelete: (id: string) => void;
  }

  let { subtask, onChange, onDelete }: Props = $props();

  let editing = $state(false);
  // untrack 包初始值,真实同步走下面 $effect(只在非编辑态回填)
  let draft = $state(untrack(() => subtask.title));
  let inputEl = $state<HTMLInputElement | null>(null);

  $effect(() => {
    // 数据刷新(其他位置改了)→ 同步到 draft 但仅在非编辑态
    if (!editing) draft = subtask.title;
  });

  function startEdit() {
    draft = subtask.title;
    editing = true;
    queueMicrotask(() => inputEl?.focus());
  }

  function commit() {
    const next = draft.trim();
    if (!editing) return;
    editing = false;
    if (next && next !== subtask.title) {
      onChange({ ...subtask, title: next });
    } else if (!next) {
      // 空标题 → 还原
      draft = subtask.title;
    }
  }

  function cancel() {
    draft = subtask.title;
    editing = false;
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      commit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancel();
    }
  }

  function toggle() {
    onChange({ ...subtask, is_completed: !subtask.is_completed });
  }
</script>

<li class="row" class:done={subtask.is_completed}>
  <input
    type="checkbox"
    checked={subtask.is_completed}
    onchange={toggle}
    aria-label="切换子任务完成"
  />

  {#if editing}
    <input
      type="text"
      class="title-input"
      bind:value={draft}
      bind:this={inputEl}
      onblur={commit}
      onkeydown={onKey}
      aria-label="编辑子任务"
    />
  {:else}
    <button
      type="button"
      class="title-btn"
      ondblclick={startEdit}
      title="双击编辑"
    >{subtask.title}</button>
  {/if}

  <button
    type="button"
    class="del"
    onclick={() => onDelete(subtask.id)}
    aria-label="删除子任务"
  >×</button>
</li>

<style>
  .row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem 0;
    list-style: none;
  }
  .row input[type="checkbox"] {
    margin: 0;
    cursor: pointer;
  }
  .title-btn {
    flex: 1;
    text-align: left;
    background: transparent;
    border: none;
    padding: 0.15rem 0.25rem;
    color: var(--color-text);
    font-size: 0.9rem;
    cursor: pointer;
    border-radius: 4px;
  }
  .title-btn:hover {
    background: var(--color-bg);
  }
  .title-input {
    flex: 1;
    border: 1px solid var(--color-accent);
    border-radius: 4px;
    padding: 0.2rem 0.4rem;
    font-size: 0.9rem;
    background: var(--color-surface);
    color: var(--color-text);
    outline: none;
  }
  .row.done .title-btn {
    text-decoration: line-through;
    color: var(--color-text-muted);
  }
  .del {
    background: transparent;
    border: none;
    color: var(--color-text-muted);
    font-size: 1.1rem;
    line-height: 1;
    padding: 0 0.4rem;
    cursor: pointer;
    border-radius: 4px;
  }
  .del:hover {
    color: #dc2626;
    background: var(--color-bg);
  }
</style>