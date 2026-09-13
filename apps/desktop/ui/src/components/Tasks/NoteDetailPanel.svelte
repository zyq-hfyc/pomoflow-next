<script lang="ts">
  // 随手记详情侧边面板 —— 结构照 TaskDetailPanel(320px 全高列 + 左边框)。
  // 取代原 JournalEditDialog 居中弹窗,与任务详情同款的就地编辑交互。
  //
  // 自上而下:
  //   1. 头部:kind 色点(todo 为勾选框)+ 标题输入(失焦保存) + 关闭 ×
  //   2. 类型:kind 四档 chips(2×2 网格;新建只改草稿、编辑即时存)
  //   3. 内容 textarea(失焦保存,flex:1 撑开)
  //   4. 标签输入(逗号分隔,失焦保存)
  //   5. 创建日期(编辑态)+ 删除两步确认文字链(右下角,armed 红 pill)
  //
  // 草稿模式照 TaskDetailPanel :52-62:输入只改本地 state,失焦才提交(IME 安全);
  // journal prop 切换(含 refresh 回灌新对象)时 $effect 重置草稿并解除删除武装。
  //
  // 新建 vs 编辑:`journal === null` 即新建草稿态。新建态无删除链/无勾选框/
  // 无日期,标题自动聚焦;首个字段失焦且「标题或内容非空」→ createFromDraft()
  // 一次性建库,经 onCreated 让父层选中,面板平滑转编辑态。空草稿失焦不落库。
  // 编辑态清空标题且内容也为空 → 拒存并回滚该字段草稿(守「至少填一项」,
  // 与 core validate_journal 同口径)。

  import { untrack, tick } from "svelte";
  import { X, Trash2 } from "lucide-svelte";
  import * as api from "../../lib/api";
  import type { Journal, JournalKind, JournalUpsertInput } from "../../lib/api";
  import { getDict, fmt } from "../../lib/i18n.svelte";
  import { JOURNAL_KINDS, KIND_EMOJI, fmtJournalDate } from "../../lib/journalKinds";
  import TaskCheckbox from "./TaskCheckbox.svelte";

  const t = $derived(getDict());

  interface Props {
    /** 编辑目标;null = 新建草稿态 */
    journal: Journal | null;
    onClose: () => void;
    onChanged: () => void;
    /** 新建首次落库成功(父层选中它并刷新列表) */
    onCreated: (j: Journal) => void;
  }

  let { journal, onClose, onChanged, onCreated }: Props = $props();

  // === 草稿(输入只改本地,失焦才提交) ===
  let titleDraft = $state(untrack(() => journal?.title ?? ""));
  let contentDraft = $state(untrack(() => journal?.content ?? ""));
  let tagsDraft = $state(untrack(() => (journal?.tags ?? []).join(", ")));
  // 新建默认 todo(2026-09-13 面板化批用户拍板);编辑取现值
  let kindDraft = $state<JournalKind>(untrack(() => journal?.kind ?? "todo"));
  let deleteArmed = $state(false);
  let creating = $state(false); // 新建 in-flight 守卫(双 blur 竞态)
  let titleEl = $state<HTMLInputElement | null>(null);

  const isNew = $derived(journal === null);
  const draftValid = $derived(!!titleDraft.trim() || !!contentDraft.trim());

  const kindLabels = $derived<Record<JournalKind, string>>({
    todo: t.notes.kindTodo,
    wish: t.notes.kindWish,
    plan: t.notes.kindPlan,
    note: t.notes.kindNote,
  });

  $effect(() => {
    // 切换目标(含 refresh 回灌新对象) → 重置草稿 + 解除删除武装
    titleDraft = journal?.title ?? "";
    contentDraft = journal?.content ?? "";
    tagsDraft = (journal?.tags ?? []).join(", ");
    kindDraft = journal?.kind ?? "todo";
    deleteArmed = false;
  });

  // 新建态自动聚焦标题(不用 autofocus 属性,避开 a11y 编译警告)。
  // tick() 等 DOM 提交后再 focus —— 点击「新建」按钮后按钮本身持有焦点,
  // 同步 focus 会被按钮的 focus 夺回,延迟到下一拍才稳。
  $effect(() => {
    if (isNew) {
      void tick().then(() => titleEl?.focus());
    }
  });

  function parseTags(): string[] {
    return tagsDraft
      .split(/[,，]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  // === 编辑态单字段落库 ===
  async function patch(p: Partial<Omit<JournalUpsertInput, "id">>) {
    const j = journal!;
    try {
      await api.upsertJournal({
        id: j.id,
        kind: kindDraft, // 用草稿:chip 点击与 refresh 回灌之间的竞态窗口内不被旧值回盖
        title: j.title,
        content: j.content,
        tags: j.tags,
        ...p,
      });
      onChanged();
    } catch (e) {
      alert(fmt(t.notes.saveFailed, { err: String(e) }));
    }
  }

  // === 新建态首个字段失焦 → 带全部草稿一次性建 ===
  async function createFromDraft() {
    if (!draftValid || creating) return; // 不满足「至少一项」或在途 → 不落库
    creating = true;
    try {
      const created = await api.upsertJournal({
        id: null,
        kind: kindDraft,
        title: titleDraft.trim(),
        content: contentDraft.trim(),
        tags: parseTags(),
      });
      onCreated(created);
    } catch (e) {
      alert(fmt(t.notes.saveFailed, { err: String(e) }));
    } finally {
      creating = false;
    }
  }

  async function commitTitle() {
    const next = titleDraft.trim();
    if (isNew) {
      await createFromDraft();
      return;
    }
    if (next === journal!.title) return;
    // 清空标题须有内容兜底,否则拒存并回滚草稿(守「至少一项」)
    if (!next && !contentDraft.trim()) {
      titleDraft = journal!.title;
      return;
    }
    await patch({ title: next });
  }

  async function commitContent() {
    const next = contentDraft.trim();
    if (isNew) {
      await createFromDraft();
      return;
    }
    if (next === journal!.content) return;
    if (!next && !titleDraft.trim()) {
      contentDraft = journal!.content;
      return;
    }
    await patch({ content: next });
  }

  async function commitTags() {
    const next = parseTags();
    if (isNew) {
      await createFromDraft();
      return;
    }
    if (next.join() === journal!.tags.join()) return;
    await patch({ tags: next });
  }

  async function selectKind(k: JournalKind) {
    if (k === kindDraft) return;
    kindDraft = k;
    if (isNew) return; // 新建草稿:只改本地,随首个字段落库带上
    await patch({ kind: k }); // 编辑态:即时存
  }

  async function handleToggleTodo() {
    if (!journal) return;
    try {
      await api.toggleJournal(journal.id);
      onChanged();
    } catch (e) {
      alert(fmt(t.notes.toggleFailed, { err: String(e) }));
    }
  }

  async function handleDelete() {
    if (!journal) return;
    if (!deleteArmed) {
      deleteArmed = true;
      return;
    }
    try {
      await api.deleteJournal(journal.id);
      onClose();
      onChanged(); // 顺序照 TaskDetailPanel :225-233
    } catch (e) {
      alert(fmt(t.notes.deleteFailed, { err: String(e) }));
    }
  }
</script>

<aside class="panel" aria-label={t.notes.panelAria}>
  <!-- 1. 头部:kind 色点(todo 勾选框)+ 标题 + 关闭 -->
  <div class="head">
    <div class="head-left">
      {#if journal && journal.kind === "todo"}
        <TaskCheckbox
          completed={journal.status === "completed"}
          onToggle={() => void handleToggleTodo()}
        />
      {:else}
        <span class="kind-dot k-{kindDraft}"></span>
      {/if}
      <input
        class="title-input"
        bind:this={titleEl}
        bind:value={titleDraft}
        onblur={() => void commitTitle()}
        onkeydown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            (e.currentTarget as HTMLInputElement).blur();
          }
        }}
        placeholder={t.notes.titlePlaceholder}
        aria-label={t.notes.fieldTitle}
        maxlength="200"
      />
    </div>
    <button class="close" onclick={onClose} aria-label={t.common.close}>
      <X size={18} />
    </button>
  </div>

  <!-- 2. 类型:kind 四档 chips(2×2 网格) -->
  <div class="kind-grid" role="group" aria-label={t.notes.fieldKind}>
    {#each JOURNAL_KINDS as k (k)}
      <button
        type="button"
        class="kind-btn"
        class:active={kindDraft === k}
        onclick={() => void selectKind(k)}
      >
        {KIND_EMOJI[k]} {kindLabels[k]}
      </button>
    {/each}
  </div>

  <!-- 3. 内容 -->
  <textarea
    class="content"
    bind:value={contentDraft}
    onblur={() => void commitContent()}
    placeholder={t.notes.contentPlaceholder}
    aria-label={t.notes.fieldContent}
    maxlength="5000"
  ></textarea>

  <!-- 4. 标签 -->
  <div class="tags-row">
    <label for="ndp-tags">{t.notes.fieldTags}</label>
    <input
      id="ndp-tags"
      class="tags-input"
      bind:value={tagsDraft}
      onblur={() => void commitTags()}
      placeholder={t.notes.tagsPlaceholder}
    />
  </div>

  {#if isNew && !draftValid}
    <div class="warn">{t.notes.required}</div>
  {/if}

  {#if journal?.created_at}
    <div class="meta">{fmt(t.notes.createdAt, { date: fmtJournalDate(journal.created_at) })}</div>
  {/if}

  <!-- 5. 删除(两步确认,右下角文字链) -->
  {#if journal}
    <div class="del-wrap">
      {#if deleteArmed}<span class="del-hint">{t.notes.deleteConfirmHint}</span>{/if}
      <button
        type="button"
        class="del-btn"
        class:armed={deleteArmed}
        onclick={() => void handleDelete()}
      >
        <Trash2 size={14} />
        {deleteArmed ? t.notes.deleteConfirm : t.notes.delete}
      </button>
    </div>
  {/if}
</aside>

<style>
  /* 全高列(320px + 左边框 + 内部滚动) —— 照 TaskDetailPanel :597-608 */
  .panel {
    width: 320px;
    flex-shrink: 0;
    height: 100%;
    overflow-y: auto;
    border-left: 1px solid var(--color-border, #e5e2dd);
    background: var(--color-surface, #fff);
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
  }

  /* 头部 —— 照 TaskDetailPanel :610-650 */
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .head-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    min-width: 0;
  }
  .kind-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  /* kind 色点取 NotesView 卡片徽章前景色(:361-376) */
  .kind-dot.k-todo {
    background: #1d4ed8;
  }
  .kind-dot.k-wish {
    background: #b45309;
  }
  .kind-dot.k-plan {
    background: #0f766e;
  }
  .kind-dot.k-note {
    background: #6d28d9;
  }
  .title-input {
    flex: 1;
    min-width: 0;
    font-weight: 600;
    color: var(--color-text, #1f1d1b);
    outline: none;
    background: transparent;
    border: none;
    font-size: 1rem;
    font-family: inherit;
  }
  .close {
    background: transparent;
    border: none;
    color: var(--color-text-muted, #6b6864);
    cursor: pointer;
    padding: 0.15rem;
    display: inline-flex;
  }
  .close:hover {
    color: var(--color-text, #1f1d1b);
  }

  /* 类型 2×2 网格 —— .kind-btn 照弹窗 :272-289 */
  .kind-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem;
    margin-bottom: 1rem;
  }
  .kind-btn {
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-bg, #fafaf7) 80%, transparent);
    color: var(--color-text-muted, #6b6864);
    font-size: 0.8rem;
    padding: 0.3rem 0.5rem;
    cursor: pointer;
    transition:
      background 0.12s,
      color 0.12s,
      border-color 0.12s;
  }
  .kind-btn:hover {
    background: color-mix(in srgb, var(--color-text-muted, #6b6864) 15%, transparent);
  }
  .kind-btn.active {
    background: var(--color-accent, #e74c3c);
    border-color: var(--color-accent, #e74c3c);
    color: #fff;
  }

  /* 内容:flex:1 撑开,删除链自然沉底 */
  .content {
    flex: 1;
    min-height: 8rem;
    resize: none;
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-lg, 12px);
    padding: 0.5rem;
    background: color-mix(in srgb, var(--color-bg, #fafaf7) 50%, transparent);
    color: var(--color-text, #1f1d1b);
    font-size: 0.875rem;
    font-family: inherit;
    line-height: 1.5;
    box-sizing: border-box;
    margin-bottom: 1rem;
  }
  .content:focus {
    outline: none;
    border-color: var(--color-accent, #e74c3c);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent, #e74c3c) 12%, transparent);
  }

  /* 标签 —— 照弹窗 .field/.input 子集 */
  .tags-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
  }
  .tags-row label {
    color: var(--color-text-muted, #6b6864);
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }
  .tags-input {
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
  .tags-input:focus {
    outline: none;
    border-color: var(--color-accent, #e74c3c);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent, #e74c3c) 12%, transparent);
  }

  .warn {
    color: var(--color-accent, #e74c3c);
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }
  .meta {
    color: var(--color-text-muted, #6b6864);
    font-size: 0.72rem;
    margin-bottom: 0.5rem;
  }

  /* 删除 —— 照 TaskDetailPanel :865-884 + 弹窗 armed/hint :307-330 */
  .del-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  .del-hint {
    color: var(--color-text-muted, #6b6864);
    font-size: 0.7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .del-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: var(--color-text-muted, #6b6864);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: color 0.15s;
    white-space: nowrap;
  }
  .del-btn:hover {
    color: var(--color-accent, #e74c3c);
  }
  .del-btn.armed {
    background: #dc2626;
    color: #fff;
    border-radius: var(--radius-lg, 12px);
    padding: 0.2rem 0.6rem;
  }
</style>
