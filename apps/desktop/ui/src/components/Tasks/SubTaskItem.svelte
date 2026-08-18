<script lang="ts">
  // 单条子任务行 —— checkbox + 标题(可编辑) + 删除按钮。
  //
  // 设计要点:
  //   - 标题默认显示态,点击进入编辑态(contenteditable 改用 input,IME 友好)。
  //   - 回车提交、Esc 取消、失焦自动提交。
  //   - 切换 checkbox 立即 onChange;title 改动节流到 blur。
  //   - 父组件持有 SubTask 数据,本组件只暴露 onChange(整条替换)+ onDelete。

  import { untrack } from "svelte";
  import { Pencil, Trash2 } from "lucide-svelte";
  import type { SubTask } from "../../lib/api";
  import { getDict } from "../../lib/i18n.svelte";

  const t = $derived(getDict());

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
    aria-label={t.task.toggleSubtaskAria}
  />

  {#if editing}
    <input
      type="text"
      class="title-input"
      bind:value={draft}
      bind:this={inputEl}
      onblur={commit}
      onkeydown={onKey}
      aria-label={t.task.editSubtask}
    />
  {:else}
    <button
      type="button"
      class="title-btn"
      ondblclick={startEdit}
      title={t.task.dblclickToEdit}
    >{subtask.title}</button>
  {/if}

  <!-- v1 SubtaskItem(panel):显式铅笔/垃圾桶按钮,双击标题仍可编辑 -->
  {#if !editing}
    <button
      type="button"
      class="icon-btn"
      onclick={startEdit}
      aria-label={t.task.editSubtask}
      title={t.task.editSubtask}
    >
      <Pencil size={14} />
    </button>
  {/if}
  <button
    type="button"
    class="icon-btn danger"
    onclick={() => onDelete(subtask.id)}
    aria-label={t.task.deleteSubtask}
    title={t.task.deleteSubtask}
  >
    <Trash2 size={14} />
  </button>
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
  /* v1 显示态是无 hover 的 span */
  /* v1 SubtaskItem:103 —— 行内下划线式编辑(border-b accent-300,透明底) */
  .title-input {
    flex: 1;
    border: none;
    border-bottom: 1px solid var(--color-accent-300, #ecb89d);
    border-radius: 0;
    padding: 0.15rem 0;
    font-size: 0.875rem;
    background: transparent;
    color: var(--color-text);
    outline: none;
  }
  .row.done .title-btn {
    text-decoration: line-through;
    color: var(--color-text-muted);
  }
  .icon-btn {
    background: transparent;
    border: none;
    color: var(--color-text-muted);
    padding: 0.15rem 0.3rem;
    cursor: pointer;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }
  .icon-btn:hover {
    color: var(--color-accent);
  }
  /* v1 hover:text-red-500 + red→accent 映射 → 跟随主题主色 */
  .icon-btn.danger:hover {
    color: var(--color-accent-500, #d17b5c);
  }
</style>