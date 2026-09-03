<script lang="ts">
  // 设置页「名言警句」标签 —— v1 components/Settings/MottoManager.tsx 移植。
  //
  // 添加(text 校验 1-500 字,author ≤ 64 字)+ 列表 + 删除。
  // 数据走后端 motto 命令(list/upsert/delete),番茄钟页 MottoCard 优先轮播。

  import { syncState } from "../../lib/syncState.svelte";
  import { Plus, Trash2 } from "lucide-svelte";
  import * as api from "../../lib/api";
  import type { Motto } from "../../lib/api";
  import { getDict } from "../../lib/i18n.svelte";
  import { bumpMottoVersion } from "../../lib/mottoVersion.svelte";

  const t = $derived(getDict());

  // 与后端校验对齐:text 1-500 字,author ≤ 64 字
  const TEXT_MAX = 500;
  const AUTHOR_MAX = 64;

  let mottos = $state<Motto[]>([]);
  let text = $state("");
  let author = $state("");
  let error = $state<string | null>(null);

  function nowIso(): string {
    return new Date().toISOString();
  }

  async function load() {
    try {
      mottos = await api.listMottos();
    } catch {
      // 加载失败保持现状
    }
  }

  // 同步完成 → 重拉:远端增删在「本页开着不动」时也能看到
  //(设置页切走会卸载重进,这里补的是同步落地瞬间本页仍打开的场景)。
  $effect(() => {
    void syncState().rev;
    void load();
  });

  // 3 秒后自动清除错误提示
  $effect(() => {
    if (!error) return;
    const id = window.setTimeout(() => (error = null), 3000);
    return () => window.clearTimeout(id);
  });

  function validate(): string | null {
    const txt = text.trim();
    if (txt.length < 1) return t.settings.motto.textRequired;
    if (txt.length > TEXT_MAX) return t.settings.motto.textTooLong;
    if (author.trim().length > AUTHOR_MAX) return t.settings.motto.authorTooLong;
    return null;
  }

  async function handleAdd() {
    const invalid = validate();
    if (invalid) {
      error = invalid;
      return;
    }
    try {
      await api.upsertMotto({
        id: crypto.randomUUID(),
        text: text.trim(),
        author: author.trim() || null,
        created_at: nowIso(),
        updated_at: nowIso(),
      });
      text = "";
      author = "";
      await load();
      // v1:storage 事件广播 → 番茄钟页 MottoCard 即时刷新
      bumpMottoVersion();
    } catch (e) {
      error = String(e);
    }
  }

  async function handleDelete(id: string) {
    try {
      await api.deleteMotto(id);
      await load();
      bumpMottoVersion();
    } catch (e) {
      error = String(e);
    }
  }
</script>

<div class="manager">
  <h2 class="tab-title">{t.settings.motto.title}</h2>

  <!-- 添加 -->
  <div class="add-card">
    <textarea
      bind:value={text}
      rows={2}
      placeholder={t.settings.motto.addPlaceholder}
      class="textarea"
    ></textarea>
    <div class="author-row">
      <input
        type="text"
        bind:value={author}
        onkeydown={(e) => {
          if (e.key === "Enter") void handleAdd();
        }}
        placeholder={t.settings.motto.authorPlaceholder}
        class="author-input"
      />
      <button type="button" class="add-btn" onclick={handleAdd}>
        <Plus size={14} />
        {t.settings.motto.addBtn}
      </button>
    </div>
  </div>

  {#if error}
    <div class="error" role="alert">{error}</div>
  {/if}

  <!-- 自定义名言列表 -->
  <div class="list">
    {#if mottos.length === 0}
      <div class="empty">{t.settings.motto.empty}</div>
    {/if}
    {#each mottos as m (m.id)}
      <div class="item">
        <div class="item-main">
          <div class="item-text">{m.text}</div>
          <div class="item-author">—— {m.author?.trim() ? m.author : t.settings.motto.defaultAuthor}</div>
        </div>
        <button
          type="button"
          class="del-btn"
          onclick={() => void handleDelete(m.id)}
          aria-label={t.settings.list.del}
        >
          <Trash2 size={14} />
        </button>
      </div>
    {/each}
  </div>
</div>

<style>
  .manager {
    max-width: 32rem;
  }
  .tab-title {
    margin: 0 0 1rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .add-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1rem;
    box-shadow: var(--shadow-xs);
    margin-bottom: 1rem;
  }
  .textarea {
    width: 100%;
    resize: none;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }
  .textarea:focus {
    outline: none;
    border-color: var(--color-accent-400);
    box-shadow: var(--shadow-focus);
  }
  .author-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .author-input {
    flex: 1;
    min-width: 0;
    padding: 0.4rem 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 0.875rem;
  }
  .author-input:focus {
    outline: none;
    border-color: var(--color-accent-400);
    box-shadow: var(--shadow-focus);
  }
  .add-btn {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.4rem 1rem;
    border: none;
    border-radius: var(--radius-md);
    background: var(--color-neutral-900);
    color: #fff;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background 0.15s;
  }
  .add-btn:hover {
    background: var(--color-neutral-700);
  }

  .error {
    margin-bottom: 0.75rem;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-md);
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: var(--color-error);
    font-size: 0.75rem;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .item {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 0.75rem 1rem;
    box-shadow: var(--shadow-xs);
  }
  .item-main {
    flex: 1;
    min-width: 0;
  }
  .item-text {
    font-size: 0.875rem;
    color: var(--color-text);
    word-break: break-word;
  }
  .item-author {
    margin-top: 0.15rem;
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }
  .del-btn {
    flex-shrink: 0;
    display: inline-flex;
    padding: 4px;
    border: none;
    background: transparent;
    color: var(--color-neutral-300);
    cursor: pointer;
    transition: color 0.12s;
  }
  .del-btn:hover {
    color: var(--color-accent-500);
  }

  .empty {
    text-align: center;
    color: var(--color-text-muted);
    font-size: 0.75rem;
    padding: 2rem 0;
  }
</style>
