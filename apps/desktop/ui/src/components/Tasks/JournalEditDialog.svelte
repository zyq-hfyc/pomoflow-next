<script lang="ts">
  // 随手记新建/编辑弹窗 —— 结构照 RepeatCustomDialog(backdrop + Escape + footer)。
  //
  // 字段:kind 四类 chips / title / content / tags(逗号分隔自由文本)。
  // 校验「标题和内容至少填一项」与移动端 journal_edit_sheet 同口径,
  // 空标题 + 纯内容的小记合法(core validate_journal P3i 订正)。
  //
  // 删除 = 两步确认按钮(移动端二次确认 AlertDialog 的桌面形态;
  // 手账不进垃圾箱,删除即墓碑)。API 调用留在父层(NotesView)。

  import { X } from "lucide-svelte";
  import { getDict } from "../../lib/i18n.svelte";
  import { JOURNAL_KINDS, KIND_EMOJI } from "../../lib/journalKinds";
  import type { Journal, JournalKind, JournalUpsertInput } from "../../lib/api";

  const t = $derived(getDict());

  interface Props {
    open: boolean;
    /** 编辑目标;null = 新建 */
    initial: Journal | null;
    onSave: (input: JournalUpsertInput) => void;
    onDelete: (id: string) => void;
    onClose: () => void;
  }

  let { open, initial, onSave, onDelete, onClose }: Props = $props();

  let kind = $state<JournalKind>("note");
  let title = $state("");
  let content = $state("");
  let tagsText = $state("");
  let confirmDelete = $state(false);

  const kindLabels = $derived<Record<JournalKind, string>>({
    todo: t.notes.kindTodo,
    wish: t.notes.kindWish,
    plan: t.notes.kindPlan,
    note: t.notes.kindNote,
  });

  // 每次打开重置表单:新建空值,编辑预填
  $effect(() => {
    if (open) {
      kind = initial?.kind ?? "note";
      title = initial?.title ?? "";
      content = initial?.content ?? "";
      tagsText = initial?.tags.join(", ") ?? "";
      confirmDelete = false;
    }
  });

  const invalid = $derived(!title.trim() && !content.trim());

  function handleSave() {
    if (invalid) return;
    onSave({
      id: initial?.id ?? null,
      kind,
      title: title.trim(),
      content: content.trim(),
      // 中英文逗号都认,去空过滤空串
      tags: tagsText
        .split(/[,，]/)
        .map((s) => s.trim())
        .filter(Boolean),
    });
  }

  function handleDelete() {
    if (!initial) return;
    if (!confirmDelete) {
      confirmDelete = true;
      return;
    }
    onDelete(initial.id);
  }

  function onBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") onClose();
  }
</script>

{#if open}
  <div
    class="backdrop"
    role="dialog"
    aria-modal="true"
    onclick={onBackdropClick}
    onkeydown={onKeydown}
    tabindex="-1"
  >
    <div class="dialog">
      <div class="header">
        <h3>{initial ? t.notes.editTitle : t.notes.createTitle}</h3>
        <button type="button" class="close-btn" onclick={onClose} aria-label={t.common.close}>
          <X size={18} />
        </button>
      </div>

      <div class="body">
        <div class="field">
          <span class="lbl-blk">{t.notes.fieldKind}</span>
          <div class="kind-chips">
            {#each JOURNAL_KINDS as k (k)}
              <button
                type="button"
                class="kind-btn"
                class:active={kind === k}
                onclick={() => (kind = k)}
              >
                {KIND_EMOJI[k]} {kindLabels[k]}
              </button>
            {/each}
          </div>
        </div>

        <div class="field">
          <label for="je-title">{t.notes.fieldTitle}</label>
          <input
            id="je-title"
            type="text"
            bind:value={title}
            placeholder={t.notes.titlePlaceholder}
            class="input"
            maxlength="200"
          />
        </div>

        <div class="field">
          <label for="je-content">{t.notes.fieldContent}</label>
          <textarea
            id="je-content"
            bind:value={content}
            placeholder={t.notes.contentPlaceholder}
            class="input content"
            rows="5"
            maxlength="5000"
          ></textarea>
        </div>

        <div class="field">
          <label for="je-tags">{t.notes.fieldTags}</label>
          <input
            id="je-tags"
            type="text"
            bind:value={tagsText}
            placeholder={t.notes.tagsPlaceholder}
            class="input"
          />
        </div>

        {#if invalid}
          <div class="warn">{t.notes.required}</div>
        {/if}
      </div>

      <div class="footer">
        {#if initial}
          <div class="del-wrap">
            {#if confirmDelete}<span class="del-hint">{t.notes.deleteConfirmHint}</span>{/if}
            <button
              type="button"
              class="btn-del"
              class:armed={confirmDelete}
              onclick={handleDelete}
            >
              {confirmDelete ? t.notes.deleteConfirm : t.notes.delete}
            </button>
          </div>
        {/if}
        <div class="actions">
          <button type="button" class="btn-cancel" onclick={onClose}>{t.notes.cancel}</button>
          <button type="button" class="btn-confirm" disabled={invalid} onclick={handleSave}>
            {t.notes.save}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dialog {
    background: var(--color-surface, #fff);
    border-radius: var(--radius-2xl, 24px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    padding: 1.5rem;
    width: 460px;
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .header h3 {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--color-text, #1f1d1b);
  }
  .close-btn {
    color: var(--color-text-muted, #6b6864);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 4px;
  }
  .close-btn:hover {
    color: var(--color-text, #1f1d1b);
  }
  .body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 0.875rem;
  }
  .field {
    display: flex;
    flex-direction: column;
  }
  .field label,
  .field .lbl-blk {
    color: var(--color-text-muted, #6b6864);
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }
  .input {
    width: 100%;
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-lg, 12px);
    padding: 0.375rem 0.5rem;
    background: color-mix(in srgb, var(--color-bg, #fafaf7) 50%, transparent);
    color: var(--color-text, #1f1d1b);
    font-size: 0.875rem;
    box-sizing: border-box;
    font-family: inherit;
  }
  .input:focus {
    outline: none;
    border-color: var(--color-accent, #e74c3c);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent, #e74c3c) 12%, transparent);
  }
  .input.content {
    resize: vertical;
    min-height: 90px;
    line-height: 1.5;
  }
  .kind-chips {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .kind-btn {
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-bg, #fafaf7) 80%, transparent);
    color: var(--color-text-muted, #6b6864);
    font-size: 0.8rem;
    padding: 0.3rem 0.75rem;
    cursor: pointer;
    transition: background 0.12s, color 0.12s, border-color 0.12s;
  }
  .kind-btn:hover {
    background: color-mix(in srgb, var(--color-text-muted, #6b6864) 15%, transparent);
  }
  .kind-btn.active {
    background: var(--color-accent, #e74c3c);
    border-color: var(--color-accent, #e74c3c);
    color: #fff;
  }
  .warn {
    color: var(--color-accent, #e74c3c);
    font-size: 0.75rem;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
  .del-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }
  .del-hint {
    color: var(--color-text-muted, #6b6864);
    font-size: 0.7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .btn-del {
    background: transparent;
    border: none;
    color: #dc2626;
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
    cursor: pointer;
    border-radius: var(--radius-lg, 12px);
    white-space: nowrap;
  }
  .btn-del:hover {
    background: color-mix(in srgb, #dc2626 10%, transparent);
  }
  .btn-del.armed {
    background: #dc2626;
    color: #fff;
  }
  .actions {
    display: flex;
    gap: 0.5rem;
    margin-left: auto;
  }
  .btn-cancel {
    background: transparent;
    border: none;
    color: var(--color-text-muted, #6b6864);
    padding: 0.375rem 1rem;
    font-size: 0.875rem;
    cursor: pointer;
    border-radius: var(--radius-lg, 12px);
  }
  .btn-cancel:hover {
    color: var(--color-text, #1f1d1b);
  }
  .btn-confirm {
    background: var(--color-accent, #e74c3c);
    color: #fff;
    border: none;
    padding: 0.375rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    border-radius: var(--radius-lg, 12px);
    transition: background 0.12s;
  }
  .btn-confirm:hover:not(:disabled) {
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 85%, #000);
  }
  .btn-confirm:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
</style>
