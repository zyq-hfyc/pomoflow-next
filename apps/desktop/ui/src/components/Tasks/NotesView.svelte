<script lang="ts">
  // 随手记视图 —— 展示组件(2026-09-13 面板化批)。
  //   - 头部:标题 + 副标题 + 新建按钮
  //   - kind 筛选 chips(全部/待办/愿望/年度规划/小记,带条数)
  //   - 卡片列表:类型徽章 + 创建日期 / 标题 / 内容(pre-wrap,4 行截断)/ 标签
  //   - todo 卡片带头部勾选框:点击切换完成态,完成的沉底 + 标题划线变灰
  //   - 点卡片 → onSelect 通知父层在右侧面板显示详情(原弹窗已面板化);
  //     新建 → onNew;选中卡片高亮(selectedId)
  //
  // 数据由父层(TasksPage)持有并经 props 灌入;同步 rev 驱动的重拉也在父层。
  // 本组件只负责筛选/排序/渲染,选中/新建/勾选/清除错误全经事件上抛。

  import { Plus } from "lucide-svelte";
  import type { Journal, JournalKind } from "../../lib/api";
  import { getDict, fmt } from "../../lib/i18n.svelte";
  import { JOURNAL_KINDS, KIND_EMOJI, sortJournals, fmtJournalDate } from "../../lib/journalKinds";
  import TaskCheckbox from "./TaskCheckbox.svelte";

  const t = $derived(getDict());

  interface Props {
    journals: Journal[];
    loading: boolean;
    error: string | null;
    /** 当前在面板里编辑的卡片 id(新建态为 null) */
    selectedId: string | null;
    onSelect: (j: Journal) => void;
    onNew: () => void;
    onToggleTodo: (id: string) => void;
    onClearError: () => void;
  }

  let {
    journals,
    loading,
    error,
    selectedId,
    onSelect,
    onNew,
    onToggleTodo,
    onClearError,
  }: Props = $props();

  let kindFilter = $state<JournalKind | "all">("all");

  const kindLabels = $derived<Record<JournalKind | "all", string>>({
    all: t.notes.kindAll,
    todo: t.notes.kindTodo,
    wish: t.notes.kindWish,
    plan: t.notes.kindPlan,
    note: t.notes.kindNote,
  });

  // 未完成在前、已完成沉底(todo 完成语义),组内 created_at 倒序 —— 纯函数
  // 在 journalKinds.ts,可独立单测
  const filtered = $derived(
    sortJournals(kindFilter === "all" ? journals : journals.filter((j) => j.kind === kindFilter)),
  );

  const kindCount = $derived(
    (k: JournalKind | "all") =>
      k === "all" ? journals.length : journals.filter((j) => j.kind === k).length,
  );

  function onCardKeydown(e: KeyboardEvent, j: Journal) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(j);
    }
  }
</script>

<div class="notes-view">
  <div class="head">
    <div class="head-text">
      <h1 class="title">{t.notes.title}</h1>
      <p class="subtitle">{t.notes.subtitle}</p>
    </div>
    <button type="button" class="add-btn" onclick={onNew}>
      <Plus size={15} />
      {t.notes.add}
    </button>
  </div>

  <div class="chips" role="tablist" aria-label={t.notes.title}>
    <button
      type="button"
      role="tab"
      class="chip"
      class:active={kindFilter === "all"}
      aria-selected={kindFilter === "all"}
      onclick={() => (kindFilter = "all")}
    >
      {t.notes.kindAll} <span class="count">{kindCount("all")}</span>
    </button>
    {#each JOURNAL_KINDS as k (k)}
      <button
        type="button"
        role="tab"
        class="chip"
        class:active={kindFilter === k}
        aria-selected={kindFilter === k}
        onclick={() => (kindFilter = k)}
      >
        {KIND_EMOJI[k]} {kindLabels[k]} <span class="count">{kindCount(k)}</span>
      </button>
    {/each}
  </div>

  {#if error}
    <div class="error" role="alert">
      <span>⚠ {error}</span>
      <button type="button" onclick={onClearError} aria-label={t.common.close}>×</button>
    </div>
  {:else if loading}
    <p class="hint">{t.common.loading}</p>
  {:else if filtered.length === 0}
    <p class="hint">{t.notes.empty}</p>
  {:else}
    <div class="cards">
      {#each filtered as j (j.id)}
        <div
          class="card"
          class:selected={selectedId === j.id}
          role="button"
          tabindex="0"
          onclick={() => onSelect(j)}
          onkeydown={(e) => onCardKeydown(e, j)}
        >
          <header class="card-head">
            <div class="head-left">
              {#if j.kind === "todo"}
                <TaskCheckbox
                  completed={j.status === "completed"}
                  onToggle={() => onToggleTodo(j.id)}
                />
              {/if}
              <span class="kind k-{j.kind}">{KIND_EMOJI[j.kind]} {kindLabels[j.kind]}</span>
            </div>
            {#if j.created_at}
              <span class="date">{fmt(t.notes.createdAt, { date: fmtJournalDate(j.created_at) })}</span>
            {/if}
          </header>
          {#if j.title}
            <h3 class="card-title" class:done={j.kind === "todo" && j.status === "completed"}>
              {j.title}
            </h3>
          {/if}
          {#if j.content}<p class="card-content">{j.content}</p>{/if}
          {#if j.tags.length > 0}
            <div class="tags">
              {#each j.tags as tag (tag)}
                <span class="tag"># {tag}</span>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .notes-view {
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
  }
  .title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text, #1f1d1b);
  }
  .subtitle {
    margin: 0.25rem 0 0;
    font-size: 0.78rem;
    color: var(--color-text-muted, #6b6864);
  }
  .add-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    background: var(--color-accent, #e74c3c);
    color: #fff;
    border: none;
    padding: 0.45rem 0.9rem;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    border-radius: var(--radius-lg, 12px);
    transition: background 0.12s;
    white-space: nowrap;
  }
  .add-btn:hover {
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 85%, #000);
  }
  .chips {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .chip {
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: 999px;
    background: var(--color-surface, #fff);
    color: var(--color-text-muted, #6b6864);
    font-size: 0.8rem;
    padding: 0.3rem 0.75rem;
    cursor: pointer;
    transition: background 0.12s, color 0.12s, border-color 0.12s;
  }
  .chip:hover {
    background: color-mix(in srgb, var(--color-text-muted, #6b6864) 12%, transparent);
  }
  .chip.active {
    background: var(--color-accent, #e74c3c);
    border-color: var(--color-accent, #e74c3c);
    color: #fff;
  }
  .chip .count {
    opacity: 0.75;
    font-size: 0.72rem;
    margin-left: 0.15rem;
  }
  .hint {
    text-align: center;
    padding: 2rem;
    font-size: 0.9rem;
    color: var(--color-text-muted, #6b6864);
  }
  .error {
    background: color-mix(in srgb, #dc2626 10%, transparent);
    color: #991b1b;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-md, 8px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
  }
  .error button {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.1rem;
    cursor: pointer;
  }
  .cards {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .card {
    background: var(--color-surface, #fff);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-lg, 12px);
    padding: 0.75rem 0.9rem;
    cursor: pointer;
    transition: border-color 0.12s, box-shadow 0.12s;
  }
  .card:hover,
  .card:focus-visible {
    border-color: color-mix(in srgb, var(--color-accent, #e74c3c) 55%, var(--color-border, #e5e2dd));
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    outline: none;
  }
  /* 面板化批(2026-09-13):正在面板里编辑的卡片高亮 —— 照 TaskItem :181-185 */
  .card.selected {
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 6%, transparent);
    border-color: var(--color-accent, #e74c3c);
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.06));
  }
  .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.3rem;
  }
  .head-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }
  .kind {
    font-size: 0.72rem;
    padding: 0.1rem 0.55rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-text-muted, #6b6864) 12%, transparent);
    color: var(--color-text-muted, #6b6864);
    white-space: nowrap;
  }
  .kind.k-todo {
    background: color-mix(in srgb, #2563eb 12%, transparent);
    color: #1d4ed8;
  }
  .kind.k-wish {
    background: color-mix(in srgb, #d97706 14%, transparent);
    color: #b45309;
  }
  .kind.k-plan {
    background: color-mix(in srgb, #0d9488 12%, transparent);
    color: #0f766e;
  }
  .kind.k-note {
    background: color-mix(in srgb, #7c3aed 10%, transparent);
    color: #6d28d9;
  }
  .date {
    font-size: 0.72rem;
    color: var(--color-text-muted, #6b6864);
    white-space: nowrap;
  }
  .card-title {
    margin: 0 0 0.25rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-text, #1f1d1b);
    overflow-wrap: anywhere;
  }
  /* 完成的待办标题划线变灰(对齐 TaskItem .task-card.done .title) */
  .card-title.done {
    text-decoration: line-through;
    color: var(--color-text-muted, #6b6864);
  }
  .card-content {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.55;
    color: var(--color-text, #1f1d1b);
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .tags {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    margin-top: 0.45rem;
  }
  .tag {
    font-size: 0.7rem;
    color: var(--color-text-muted, #6b6864);
    background: color-mix(in srgb, var(--color-bg, #fafaf7) 90%, transparent);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: 999px;
    padding: 0.05rem 0.5rem;
    max-width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
