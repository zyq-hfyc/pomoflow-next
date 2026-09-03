<script lang="ts">
  // 设置页「标签管理」标签 —— v1 SettingsPage.tsx 内联 TagManager 移植。
  //
  // 功能:
  //   - 添加卡:名称 + 12 色 Morandi 色板
  //   - 平铺拖拽排序(手写 HTML5 DnD):拖到另一行上 → 与该行交换位置
  //     (arrayMove 语义),乐观更新 → reorderTags,失败回滚 + 3 秒错误条
  //   - 行内改名 / 换色 / 删除(v1 行为;编辑态禁用拖拽避免误拖表单)

  import { syncState } from "../../lib/syncState.svelte";
  import { GripVertical } from "lucide-svelte";
  import * as api from "../../lib/api";
  import type { Tag } from "../../lib/api";
  import { getDict, fmt } from "../../lib/i18n.svelte";
  import { PRESET_COLORS, DEFAULT_PROJECT_COLOR } from "../../lib/presetColors";

  const t = $derived(getDict());

  let tags = $state<Tag[]>([]);
  let name = $state("");
  let color = $state<string>(DEFAULT_PROJECT_COLOR);
  let editingId = $state<string | null>(null);
  let editName = $state("");
  let editColor = $state<string>(DEFAULT_PROJECT_COLOR);
  let reorderError = $state<string | null>(null);

  // === DnD 状态 ===
  let dragId = $state<string | null>(null);
  let overId = $state<string | null>(null);

  function nowIso(): string {
    return new Date().toISOString();
  }

  async function load() {
    try {
      const list = await api.listTags();
      // 与 v1 一致按 display_order 排;并列时 created_at / id 兜底(稳定)
      tags = [...list].sort(
        (a, b) =>
          (a.display_order ?? 0) - (b.display_order ?? 0) ||
          (a.created_at ?? "").localeCompare(b.created_at ?? "") ||
          a.id.localeCompare(b.id),
      );
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

  // 3 秒后自动清除错误提示(v1 同款)
  $effect(() => {
    if (!reorderError) return;
    const id = window.setTimeout(() => (reorderError = null), 3000);
    return () => window.clearTimeout(id);
  });

  function arrayMove<T>(arr: T[], from: number, to: number): T[] {
    const copy = arr.slice();
    const [x] = copy.splice(from, 1);
    copy.splice(to, 0, x);
    return copy;
  }

  async function handleAdd() {
    const n = name.trim();
    if (!n) return;
    try {
      await api.upsertTag({
        id: crypto.randomUUID(),
        name: n,
        color,
        display_order: tags.length,
        created_at: nowIso(),
        updated_at: nowIso(),
      });
      name = "";
      await load();
    } catch (e) {
      reorderError = String(e);
    }
  }

  async function handleDelete(id: string) {
    try {
      await api.deleteTag(id);
      await load();
    } catch (e) {
      reorderError = String(e);
    }
  }

  function startEdit(tag: Tag) {
    editingId = tag.id;
    editName = tag.name;
    editColor = tag.color ?? DEFAULT_PROJECT_COLOR;
  }

  async function handleUpdate() {
    if (!editingId) return;
    const n = editName.trim();
    if (!n) return;
    const existing = tags.find((x) => x.id === editingId);
    if (!existing) return;
    try {
      await api.upsertTag({
        ...existing,
        name: n,
        color: editColor,
        updated_at: nowIso(),
      });
    } catch (e) {
      reorderError = String(e);
    }
    editingId = null;
    await load();
  }

  // === 拖拽排序(乐观更新,失败回滚) ===

  function onRowDragStart(e: DragEvent, tag: Tag) {
    if (!e.dataTransfer) return;
    dragId = tag.id;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", tag.id);
  }

  function onRowDragOver(e: DragEvent, tag: Tag) {
    if (!dragId || dragId === tag.id) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    overId = tag.id;
  }

  function onRowDrop(e: DragEvent, tag: Tag) {
    e.preventDefault();
    e.stopPropagation();
    const draggedId = dragId;
    dragId = null;
    overId = null;
    if (!draggedId || draggedId === tag.id) return;
    const oldIndex = tags.findIndex((x) => x.id === draggedId);
    const newIndex = tags.findIndex((x) => x.id === tag.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const prev = tags;
    const reordered = arrayMove(tags, oldIndex, newIndex);
    tags = reordered; // 即时视觉反馈
    const items = reordered.map((item, idx) => ({
      id: item.id,
      display_order: idx,
    }));
    void api
      .reorderTags(items)
      .then(load)
      .catch(async (err: unknown) => {
        // 失败:回滚到拖动前顺序 + 提示
        tags = prev;
        await load();
        // Tauri 命令错误以纯字符串 reject(instanceof Error 恒 false)
        reorderError = String(err) || t.settings.list.reorderFail;
      });
  }

  function resetDragState() {
    dragId = null;
    overId = null;
  }
</script>

<div>
  <h2 class="tab-title">{t.settings.tab.tags}</h2>

  <!-- 添加新标签卡 -->
  <div class="add-card">
    <div class="add-row">
      <input
        type="text"
        bind:value={name}
        onkeydown={(e) => {
          if (e.key === "Enter") void handleAdd();
        }}
        placeholder={t.settings.tag.namePlaceholder}
        class="text-input"
      />
      <button type="button" class="add-btn" onclick={handleAdd}>
        {t.settings.tag.add}
      </button>
    </div>
    <div>
      <span class="color-label">{t.settings.tag.colorLabel}</span>
      <div class="color-grid">
        {#each PRESET_COLORS as c (c)}
          <button
            type="button"
            class="swatch"
            class:active={color === c}
            style="background-color: {c}"
            aria-label={fmt(t.settings.tag.colorAria, { color: c })}
            onclick={() => (color = c)}
          ></button>
        {/each}
      </div>
    </div>
  </div>

  {#if reorderError}
    <div class="error" role="alert">{reorderError}</div>
  {/if}

  <!-- 标签列表(可拖拽排序) -->
  <div class="tag-list" role="list">
    {#each tags as tag (tag.id)}
      {@const isEditing = editingId === tag.id}
      <div
        class="tag-card"
        class:dragging={dragId === tag.id}
        class:drop-over={overId === tag.id && dragId !== null && dragId !== tag.id}
        draggable={!isEditing}
        role="listitem"
        tabindex="-1"
        ondragstart={(e) => onRowDragStart(e, tag)}
        ondragover={(e) => onRowDragOver(e, tag)}
        ondrop={(e) => onRowDrop(e, tag)}
        ondragend={resetDragState}
      >
        {#if isEditing}
          <div class="edit-box">
            <div class="edit-name-row">
              <span class="name-label">{t.settings.tag.nameLabel}</span>
              <!-- svelte-ignore a11y_autofocus -->
              <input
                autofocus
                type="text"
                bind:value={editName}
                onkeydown={(e) => {
                  if (e.key === "Enter") void handleUpdate();
                  if (e.key === "Escape") (editingId = null);
                }}
                class="text-input"
              />
            </div>
            <div>
              <span class="color-label">{t.settings.tag.colorLabel}</span>
              <div class="color-grid">
                {#each PRESET_COLORS as c (c)}
                  <button
                    type="button"
                    class="swatch sm"
                    class:active={editColor === c}
                    style="background-color: {c}"
                    aria-label={fmt(t.settings.tag.colorAria, { color: c })}
                    onclick={() => (editColor = c)}
                  ></button>
                {/each}
              </div>
            </div>
            <div class="edit-actions">
              <button
                type="button"
                class="link-btn"
                onclick={() => (editingId = null)}
              >{t.settings.repeatCustom.cancel}</button>
              <button type="button" class="save-btn" onclick={handleUpdate}>
                {t.settings.notification.save}
              </button>
            </div>
          </div>
        {:else}
          <div class="tag-row">
            <div class="tag-row-main">
              <span
                class="grip"
                aria-label={t.settings.tag.dragHandle}
                title={t.settings.tag.dragHandle}
              >
                <GripVertical size={16} />
              </span>
              <span
                class="dot"
                style="background-color: {tag.color ?? DEFAULT_PROJECT_COLOR}"
              ></span>
              <span class="tag-name">{tag.name}</span>
            </div>
            <div class="tag-row-actions">
              <button type="button" class="link-btn" onclick={() => startEdit(tag)}>
                {t.settings.list.edit}
              </button>
              <span class="sep">|</span>
              <button
                type="button"
                class="link-btn danger"
                onclick={() => void handleDelete(tag.id)}
              >{t.settings.list.del}</button>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  {#if tags.length === 0}
    <div class="empty">{t.settings.tag.empty}</div>
  {/if}
</div>

<style>
  .tab-title {
    margin: 0 0 1.5rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .add-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow-xs);
  }
  .add-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }
  .add-btn {
    flex-shrink: 0;
    padding: 0.5rem 1.25rem;
    border: none;
    border-radius: var(--radius-md);
    background: var(--color-accent-500);
    color: #fff;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    box-shadow: var(--shadow-xs);
    transition: background 0.15s;
  }
  .add-btn:hover {
    background: var(--color-accent-600);
  }

  .text-input {
    flex: 1;
    min-width: 0;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 0.875rem;
  }
  .text-input:focus {
    outline: none;
    border-color: var(--color-accent-400);
    box-shadow: var(--shadow-focus);
  }

  .color-label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    color: var(--color-text-muted);
  }
  .color-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
  }
  .swatch {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid var(--color-border);
    cursor: pointer;
    padding: 0;
    transition: transform 0.12s, border-color 0.12s;
  }
  .swatch.sm {
    width: 24px;
    height: 24px;
  }
  .swatch:hover {
    transform: scale(1.08);
  }
  .swatch.active {
    border-color: var(--color-neutral-800);
    box-shadow: var(--shadow-xs);
    transform: scale(1.1);
  }

  .error {
    margin-bottom: 1rem;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-md);
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: var(--color-error);
    font-size: 0.75rem;
  }

  .tag-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .tag-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 0.75rem 1rem;
    box-shadow: var(--shadow-xs);
    transition: box-shadow 0.15s, opacity 0.12s;
  }
  .tag-card:hover {
    box-shadow: var(--shadow-sm);
  }
  .tag-card.dragging {
    opacity: 0.5;
  }
  .tag-card.drop-over {
    box-shadow: inset 0 0 0 1px var(--color-accent-300), var(--shadow-sm);
  }

  .tag-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }
  .tag-row-main {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;
    flex: 1;
  }
  .grip {
    display: inline-flex;
    color: var(--color-neutral-300);
    cursor: grab;
    flex-shrink: 0;
  }
  .grip:active {
    cursor: grabbing;
  }
  .dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: 0 0 0 2px var(--color-surface), var(--shadow-xs);
  }
  .tag-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tag-row-actions {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    flex-shrink: 0;
  }
  .sep {
    color: var(--color-border);
    font-size: 0.75rem;
  }

  .link-btn {
    border: none;
    background: transparent;
    color: var(--color-text-muted);
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: color 0.12s, background 0.12s;
  }
  .link-btn:hover {
    color: var(--color-text);
    background: var(--color-neutral-50);
  }
  .link-btn.danger:hover {
    color: var(--color-error);
    background: #fef2f2;
  }

  .edit-box {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .edit-name-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .name-label {
    font-size: 0.75rem;
    color: var(--color-neutral-400);
    flex-shrink: 0;
  }
  .edit-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.75rem;
  }
  .save-btn {
    border: none;
    border-radius: var(--radius-md);
    background: var(--color-accent-500);
    color: #fff;
    font-size: 0.75rem;
    padding: 0.35rem 0.85rem;
    cursor: pointer;
    transition: background 0.15s;
  }
  .save-btn:hover {
    background: var(--color-accent-600);
  }

  .empty {
    text-align: center;
    color: var(--color-text-muted);
    font-size: 0.875rem;
    padding: 2.5rem 0;
    background: var(--color-surface);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-lg);
  }
</style>
