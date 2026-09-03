<script lang="ts">
  // 随手记视图(P3i)—— 桌面「随手记」= 移动端「手账」,journal 实体第 11 个
  // 同步实体在桌面的读写闭环(P3f 起只落库无 UI)。
  //
  // 结构:
  //   - 头部:标题 + 副标题 + 新建按钮
  //   - kind 筛选 chips(全部/待办/愿望/年度规划/小记,带条数)
  //   - 卡片列表:类型徽章 + 创建日期 / 标题 / 内容(pre-wrap,4 行截断)/ 标签
  //   - 点卡片 → JournalEditDialog 编辑;新建 → 同弹窗空表单
  //
  // 数据自拉自持(同 JournalView 的复盘列表);syncState().rev 变化重拉,
  // 手机写的随手记同步下来后不重启即可见(B6 统计页同款口径)。

  import { Plus } from "lucide-svelte";
  import * as api from "../../lib/api";
  import type { Journal, JournalKind, JournalUpsertInput } from "../../lib/api";
  import { syncState } from "../../lib/syncState.svelte";
  import { getDict, fmt } from "../../lib/i18n.svelte";
  import { JOURNAL_KINDS, KIND_EMOJI } from "../../lib/journalKinds";
  import JournalEditDialog from "./JournalEditDialog.svelte";

  const t = $derived(getDict());

  let journals = $state<Journal[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let kindFilter = $state<JournalKind | "all">("all");
  let dialogOpen = $state(false);
  let editing = $state<Journal | null>(null);

  const kindLabels = $derived<Record<JournalKind | "all", string>>({
    all: t.notes.kindAll,
    todo: t.notes.kindTodo,
    wish: t.notes.kindWish,
    plan: t.notes.kindPlan,
    note: t.notes.kindNote,
  });

  async function refresh() {
    try {
      journals = await api.listJournals();
      error = null;
    } catch (e) {
      error = String(e);
    } finally {
      loading = false;
    }
  }

  // 挂载拉一次;之后每轮同步(rev 变化)重拉 —— 手机端写入也能及时出现
  $effect(() => {
    void syncState().rev;
    void refresh();
  });

  const filtered = $derived(
    kindFilter === "all" ? journals : journals.filter((j) => j.kind === kindFilter),
  );

  const kindCount = $derived(
    (k: JournalKind | "all") =>
      k === "all" ? journals.length : journals.filter((j) => j.kind === k).length,
  );

  function openCreate() {
    editing = null;
    dialogOpen = true;
  }

  function openEdit(j: Journal) {
    editing = j;
    dialogOpen = true;
  }

  async function handleSave(input: JournalUpsertInput) {
    try {
      await api.upsertJournal(input);
      dialogOpen = false;
      await refresh();
    } catch (e) {
      alert(fmt(t.notes.saveFailed, { err: String(e) }));
    }
  }

  async function handleDelete(id: string) {
    try {
      await api.deleteJournal(id);
      dialogOpen = false;
      await refresh();
    } catch (e) {
      alert(fmt(t.notes.deleteFailed, { err: String(e) }));
    }
  }

  function fmtDate(iso?: string): string {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }

  function onCardKeydown(e: KeyboardEvent, j: Journal) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openEdit(j);
    }
  }
</script>

<div class="notes-view">
  <div class="head">
    <div class="head-text">
      <h1 class="title">{t.notes.title}</h1>
      <p class="subtitle">{t.notes.subtitle}</p>
    </div>
    <button type="button" class="add-btn" onclick={openCreate}>
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
      <button type="button" onclick={() => (error = null)}>×</button>
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
          role="button"
          tabindex="0"
          onclick={() => openEdit(j)}
          onkeydown={(e) => onCardKeydown(e, j)}
        >
          <header class="card-head">
            <span class="kind k-{j.kind}">{KIND_EMOJI[j.kind]} {kindLabels[j.kind]}</span>
            {#if j.created_at}
              <span class="date">{fmt(t.notes.createdAt, { date: fmtDate(j.created_at) })}</span>
            {/if}
          </header>
          {#if j.title}<h3 class="card-title">{j.title}</h3>{/if}
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

  <JournalEditDialog
    open={dialogOpen}
    initial={editing}
    onSave={(input) => void handleSave(input)}
    onDelete={(id) => void handleDelete(id)}
    onClose={() => (dialogOpen = false)}
  />
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
  .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.3rem;
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
