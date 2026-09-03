<script lang="ts">
  // 设置页「清单管理」标签 —— v1 components/Settings/ProjectManager.tsx 移植。
  //
  // 功能:
  //   - 三级项目树:添加根/子清单(第 3 层节点不再显示「加子」)、行内改名换色、删除
  //   - 拖拽:**手写 HTML5 DnD**(draggable + dragstart/dragover/drop,不引库)
  //     · 拖到某节点上 → 成为该节点的子级(追加到末尾)
  //     · 拖到树根空白区 → 变为顶层
  //     · 一级节点不可拖(与 v1 一致),只作为放置目标
  //   - 深度 ≤ 3(放置后子树最深超过第 3 层 → 前端直接报 depthError)
  //   - 环(拖到自己的后代上)→ cycleError;后端 reorder_projects 双保险
  //   - 兄弟顺序:本地按 parent_id + display_order 排,整树 flatten 成
  //     ReorderItem[] 调 reorderProjects(乐观更新,失败重载 + 3 秒错误条)

  import { syncState } from "../../lib/syncState.svelte";
  import { ChevronDown, ChevronRight, Plus, Pencil, Trash2 } from "lucide-svelte";
  import * as api from "../../lib/api";
  import type { Project, ReorderItem } from "../../lib/api";
  import { getDict, fmt } from "../../lib/i18n.svelte";
  import { DEFAULT_PROJECT_COLOR } from "../../lib/presetColors";

  const t = $derived(getDict());

  let projects = $state<Project[]>([]);
  let expanded = $state<Set<string>>(new Set());
  let addingParentId = $state<string | null | "root">("root");
  let newName = $state("");
  let editingId = $state<string | null>(null);
  let editName = $state("");
  let editColor = $state<string>(DEFAULT_PROJECT_COLOR);
  let reorderError = $state<string | null>(null);

  // === DnD 状态 ===
  let dragId = $state<string | null>(null);
  let overId = $state<string | null>(null);
  let overRoot = $state(false);

  function nowIso(): string {
    return new Date().toISOString();
  }

  async function load() {
    try {
      projects = await api.listProjects();
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

  // === 树构建 ===

  interface TreeNode extends Project {
    children: TreeNode[];
    depth: number;
  }

  function buildTree(items: Project[]): TreeNode[] {
    const map = new Map<string, TreeNode>();
    const roots: TreeNode[] = [];
    for (const p of items) map.set(p.id, { ...p, children: [], depth: 0 });
    for (const p of items) {
      const node = map.get(p.id);
      if (!node) continue;
      if (p.parent_id && map.has(p.parent_id)) {
        map.get(p.parent_id)!.children.push(node);
      } else {
        roots.push(node);
      }
    }
    // 同父下按 display_order 排序;并列时按 created_at / id 兜底(稳定)
    const sortByOrder = (nodes: TreeNode[]) => {
      nodes.sort(
        (a, b) =>
          (a.display_order ?? 0) - (b.display_order ?? 0) ||
          (a.created_at ?? "").localeCompare(b.created_at ?? "") ||
          a.id.localeCompare(b.id),
      );
      nodes.forEach((n) => sortByOrder(n.children));
    };
    sortByOrder(roots);
    const setDepth = (nodes: TreeNode[], depth: number) => {
      for (const node of nodes) {
        node.depth = depth;
        setDepth(node.children, depth + 1);
      }
    };
    setDepth(roots, 0);
    return roots;
  }

  function flattenTree(nodes: TreeNode[], open: Set<string>): TreeNode[] {
    const result: TreeNode[] = [];
    for (const node of nodes) {
      result.push(node);
      if (open.has(node.id) && node.children.length > 0) {
        result.push(...flattenTree(node.children, open));
      }
    }
    return result;
  }

  const tree = $derived(buildTree(projects));
  const flatTree = $derived(flattenTree(tree, expanded));

  function toggleExpand(id: string) {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    expanded = next;
  }

  // === 图查询 helpers(用当前 projects 的 parent 关系) ===

  function parentById(): Map<string, string | null> {
    const m = new Map<string, string | null>();
    for (const p of projects) m.set(p.id, p.parent_id ?? null);
    return m;
  }

  function childrenById(): Map<string | null, string[]> {
    const m = new Map<string | null, string[]>();
    for (const p of projects) {
      const key = p.parent_id ?? null;
      if (!m.has(key)) m.set(key, []);
      m.get(key)!.push(p.id);
    }
    return m;
  }

  /** 节点深度(顶层 = 0);parent 不在图中按根处理。 */
  function depthOfNode(id: string | null, parents: Map<string, string | null>): number {
    let depth = -1;
    let cur = id;
    const seen = new Set<string>();
    while (cur) {
      if (seen.has(cur)) return 0; // 防御:异常数据成环按 0 处理
      seen.add(cur);
      depth += 1;
      cur = parents.get(cur) ?? null;
    }
    return depth;
  }

  /** 以 id 为根的子树高度(自身 = 1)。 */
  function subtreeHeight(id: string, children: Map<string | null, string[]>): number {
    const kids = children.get(id) ?? [];
    if (kids.length === 0) return 1;
    return 1 + Math.max(...kids.map((k) => subtreeHeight(k, children)));
  }

  /** candidate 的祖先链上是否出现 ancestor(即 candidate 在 ancestor 的子树内)。 */
  function isInSubtree(candidateId: string, ancestorId: string, parents: Map<string, string | null>): boolean {
    let cur: string | null = candidateId;
    const seen = new Set<string>();
    while (cur) {
      if (cur === ancestorId) return true;
      if (seen.has(cur)) return false;
      seen.add(cur);
      cur = parents.get(cur) ?? null;
    }
    return false;
  }

  // === 增 / 改 / 删 ===

  async function handleAdd() {
    const name = newName.trim();
    if (!name) return;
    const parentId = addingParentId === "root" ? null : addingParentId;
    const siblings = projects.filter((p) => (p.parent_id ?? null) === parentId);
    try {
      await api.upsertProject({
        id: crypto.randomUUID(),
        name,
        color: DEFAULT_PROJECT_COLOR,
        parent_id: parentId,
        display_order: siblings.length,
        created_at: nowIso(),
        updated_at: nowIso(),
      });
    } catch (e) {
      reorderError = String(e);
    }
    newName = "";
    addingParentId = null;
    if (parentId) {
      const next = new Set(expanded);
      next.add(parentId);
      expanded = next;
    }
    await load();
  }

  function startEdit(node: TreeNode) {
    editingId = node.id;
    editName = node.name;
    editColor = node.color ?? DEFAULT_PROJECT_COLOR;
  }

  async function handleUpdate() {
    if (!editingId) return;
    const name = editName.trim();
    if (!name) return;
    const existing = projects.find((p) => p.id === editingId);
    if (!existing) return;
    try {
      await api.upsertProject({
        ...existing,
        name,
        color: editColor,
        updated_at: nowIso(),
      });
    } catch (e) {
      reorderError = String(e);
    }
    editingId = null;
    editName = "";
    await load();
  }

  async function handleDelete(id: string) {
    try {
      await api.deleteProject(id);
    } catch (e) {
      reorderError = String(e);
    }
    await load();
  }

  // === 拖拽 ===

  function mapReorderError(detail: string): string {
    return detail.includes("exceed max depth")
      ? t.settings.list.reorderFailDepth
      : detail.includes("cycle")
        ? t.settings.list.reorderFailCycle
        : t.settings.list.reorderFail;
  }

  function toReorderItems(list: Project[]): ReorderItem[] {
    return list.map((p) => ({
      id: p.id,
      parent_id: p.parent_id ?? null,
      display_order: p.display_order ?? 0,
    }));
  }

  /**
   * v1 语义:移动后把每个兄弟组重排为 0..n 连续 —— 跨父移动在新旧父级
   * 都不留 display_order 空洞,避免后续拖入生成重复序号。
   */
  function renumberSiblings(list: Project[]): Project[] {
    const groups = new Map<string | null, Project[]>();
    for (const p of list) {
      const key = p.parent_id ?? null;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(p);
    }
    const orderById = new Map<string, number>();
    for (const group of groups.values()) {
      group
        .slice()
        .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
        .forEach((p, i) => orderById.set(p.id, i));
    }
    return list.map((p) => ({ ...p, display_order: orderById.get(p.id) ?? 0 }));
  }

  /** 应用一次移动:乐观更新 → reorderProjects → 失败重载 + 错误条。 */
  async function applyMove(draggedId: string, newParentId: string | null) {
    const dragged = projects.find((p) => p.id === draggedId);
    if (!dragged) return;
    // 追加到新父级末尾
    const newSiblingCount = projects.filter(
      (p) => (p.parent_id ?? null) === newParentId && p.id !== draggedId,
    ).length;
    const moved = projects.map((p) =>
      p.id === draggedId
        ? { ...p, parent_id: newParentId, display_order: newSiblingCount }
        : p,
    );
    const optimistic = renumberSiblings(moved);
    projects = optimistic;
    if (newParentId) {
      const next = new Set(expanded);
      next.add(newParentId);
      expanded = next;
    }
    try {
      await api.reorderProjects(toReorderItems(optimistic));
      await load();
    } catch (e) {
      await load();
      reorderError = mapReorderError(String(e));
    }
  }

  /** 拖到某节点上 → 成为它的子级。前置校验:环 / 深度 / 无变化。 */
  function dropOnNode(node: TreeNode) {
    const draggedId = dragId;
    resetDragState();
    if (!draggedId || draggedId === node.id) return;
    const dragged = projects.find((p) => p.id === draggedId);
    if (!dragged) return;
    if ((dragged.parent_id ?? null) === node.id) return; // 已是其子级,无变化

    const parents = parentById();
    if (isInSubtree(node.id, draggedId, parents)) {
      reorderError = t.settings.list.reorderFailCycle;
      return;
    }
    // 放置后子树最深 = 新深度(node.depth+1) + 子树高度 - 1,必须 ≤ 第 3 层(depth 2)
    const height = subtreeHeight(draggedId, childrenById());
    if (node.depth + height > 2) {
      reorderError = t.settings.list.reorderFailDepth;
      return;
    }
    void applyMove(draggedId, node.id);
  }

  /** 拖到树根区域 → 变为顶层(已是顶层则移到末尾)。 */
  function dropToRoot() {
    const draggedId = dragId;
    resetDragState();
    if (!draggedId) return;
    const dragged = projects.find((p) => p.id === draggedId);
    if (!dragged) return;
    if ((dragged.parent_id ?? null) === null) {
      const rootCount = projects.filter(
        (p) => p.parent_id == null && p.id !== draggedId,
      ).length;
      if ((dragged.display_order ?? 0) === rootCount) return; // 已在末尾
    }
    void applyMove(draggedId, null);
  }

  function resetDragState() {
    dragId = null;
    overId = null;
    overRoot = false;
  }

  function onRowDragStart(e: DragEvent, node: TreeNode) {
    if (!e.dataTransfer) return;
    dragId = node.id;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", node.id);
  }

  function onRowDragOver(e: DragEvent, node: TreeNode) {
    if (!dragId) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    overId = node.id;
    overRoot = false;
  }

  function onRowDrop(e: DragEvent, node: TreeNode) {
    e.preventDefault();
    e.stopPropagation();
    dropOnNode(node);
  }

  function onRootDragOver(e: DragEvent) {
    if (!dragId) return;
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    overRoot = true;
    overId = null;
  }

  function onRootDrop(e: DragEvent) {
    e.preventDefault();
    dropToRoot();
  }

  function onRootDragLeave(e: DragEvent) {
    if (e.target === e.currentTarget) overRoot = false;
  }
</script>

<div class="manager">
  <h2 class="tab-title">{t.settings.list.title}</h2>
  <p class="drag-hint">{t.settings.list.dragHint}</p>

  {#if reorderError}
    <div class="error" role="alert">{reorderError}</div>
  {/if}

  <!-- 添加一级清单 -->
  {#if addingParentId === "root"}
    <div class="add-root-row">
      <!-- svelte-ignore a11y_autofocus -->
      <input
        autofocus
        type="text"
        bind:value={newName}
        onkeydown={(e) => {
          if (e.key === "Enter") void handleAdd();
          if (e.key === "Escape") {
            addingParentId = null;
            newName = "";
          }
        }}
        onblur={() => {
          if (newName.trim()) void handleAdd();
          else {
            addingParentId = null;
            newName = "";
          }
        }}
        placeholder={t.settings.list.addRootPlaceholder}
        class="text-input"
      />
    </div>
  {:else}
    <button
      type="button"
      class="add-root-btn"
      onclick={() => {
        addingParentId = "root";
        newName = "";
      }}
    >
      <Plus size={16} />
      {t.settings.list.addRoot}
    </button>
  {/if}

  <!-- 树本体(根区域同时是「拖回顶层」的放置目标) -->
  <div
    class="tree"
    class:over-root={overRoot}
    role="tree"
    tabindex="-1"
    ondragover={onRootDragOver}
    ondrop={onRootDrop}
    ondragleave={onRootDragLeave}
  >
    {#each flatTree as node (node.id)}
      {@const isEditing = editingId === node.id}
      {@const isAddingChild = addingParentId === node.id}
      {@const hasChildren = node.children.length > 0}
      {@const isExpanded = expanded.has(node.id)}
      {@const isDraggable = !isEditing && !isAddingChild && node.depth > 0}
      <div class="row-wrap" style="padding-left: {node.depth * 24}px">
        {#if isEditing}
          <!-- v1 ProjectManager:401-417 —— 编辑态是一条裸 input,Enter/blur 保存、
               Esc 取消,不改颜色(色板属 v2 增强,按 v1 复刻移除) -->
          <div class="edit-box">
            <input
              type="text"
              bind:value={editName}
              onkeydown={(e) => {
                if (e.key === "Enter") void handleUpdate();
                if (e.key === "Escape") {
                  editingId = null;
                  editName = "";
                }
              }}
              onblur={() => {
                if (editingId === node.id) void handleUpdate();
              }}
              placeholder={node.name}
              class="text-input"
            />
          </div>
        {:else}
          <div
            class="row"
            class:drop-over={overId === node.id && dragId !== node.id}
            class:dragging={dragId === node.id}
            draggable={isDraggable}
            role="treeitem"
            tabindex="-1"
            aria-selected="false"
            ondragstart={(e) => onRowDragStart(e, node)}
            ondragover={(e) => onRowDragOver(e, node)}
            ondrop={(e) => onRowDrop(e, node)}
            ondragend={resetDragState}
          >
            <span class="label" class:grabbable={isDraggable}>
              {#if hasChildren}
                <button
                  type="button"
                  class="chevron"
                  onclick={(e) => {
                    e.stopPropagation();
                    toggleExpand(node.id);
                  }}
                  aria-label={isExpanded ? t.common.expand : t.common.collapse}
                >
                  {#if isExpanded}<ChevronDown size={14} />{:else}<ChevronRight size={14} />{/if}
                </button>
              {:else}
                <span class="chevron-spacer"></span>
              {/if}
              <span class="dot" style="background-color: {node.color ?? DEFAULT_PROJECT_COLOR}"></span>
              <span class="name">{node.name}</span>
            </span>
            <span class="actions">
              {#if node.depth < 2}
                <button
                  type="button"
                  class="icon-btn"
                  title={t.settings.list.addChild}
                  aria-label={t.settings.list.addChild}
                  onclick={(e) => {
                    e.stopPropagation();
                    addingParentId = node.id;
                    newName = "";
                  }}
                >
                  <Plus size={14} />
                </button>
              {/if}
              <button
                type="button"
                class="icon-btn"
                title={t.settings.list.edit}
                aria-label={t.settings.list.edit}
                onclick={(e) => {
                  e.stopPropagation();
                  startEdit(node);
                }}
              >
                <Pencil size={14} />
              </button>
              <button
                type="button"
                class="icon-btn danger"
                title={t.settings.list.del}
                aria-label={t.settings.list.del}
                onclick={(e) => {
                  e.stopPropagation();
                  void handleDelete(node.id);
                }}
              >
                <Trash2 size={14} />
              </button>
            </span>
          </div>
        {/if}

        {#if isAddingChild}
          <div class="add-child-row">
            <!-- svelte-ignore a11y_autofocus -->
            <input
              autofocus
              type="text"
              bind:value={newName}
              onkeydown={(e) => {
                if (e.key === "Enter") void handleAdd();
                if (e.key === "Escape") {
                  addingParentId = null;
                  newName = "";
                }
              }}
              onblur={() => {
                if (newName.trim()) void handleAdd();
                else {
                  addingParentId = null;
                  newName = "";
                }
              }}
              placeholder={node.depth === 0
                ? t.settings.list.level2Placeholder
                : t.settings.list.level3Placeholder}
              class="text-input"
            />
          </div>
        {/if}
      </div>
    {/each}

    {#if projects.length === 0 && addingParentId !== "root"}
      <div class="empty">{t.settings.list.empty}</div>
    {/if}
  </div>
</div>

<style>
  .manager {
    max-width: 32rem;
  }
  .tab-title {
    margin: 0 0 1.5rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text);
  }
  .drag-hint {
    margin: 0 0 0.75rem;
    font-size: 0.75rem;
    color: var(--color-text-muted);
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

  .add-root-row {
    margin-bottom: 1rem;
  }
  .add-root-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    margin-bottom: 1rem;
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-text-muted);
    font-size: 0.875rem;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .add-root-btn:hover {
    background: var(--color-neutral-50);
    color: var(--color-text);
  }

  .text-input {
    width: 100%;
    padding: 0.45rem 0.75rem;
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

  .tree {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-height: 80px;
    padding: 0.25rem;
    border: 1px dashed transparent;
    border-radius: var(--radius-md);
    transition: border-color 0.15s, background 0.15s;
  }
  .tree.over-root {
    border-color: var(--color-accent-300);
    background: var(--color-accent-50);
  }

  .row-wrap {
    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.35rem 0.5rem;
    border-radius: var(--radius-md);
    transition: background 0.12s, opacity 0.12s;
  }
  .row:hover {
    background: var(--color-neutral-50);
  }
  .row.drop-over {
    background: var(--color-accent-50);
    box-shadow: inset 0 0 0 1px var(--color-accent-300);
  }
  .row.dragging {
    opacity: 0.4;
  }

  .label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    min-width: 0;
    font-size: 0.875rem;
    color: var(--color-text);
  }
  .label.grabbable {
    cursor: grab;
  }
  .label.grabbable:active {
    cursor: grabbing;
  }
  .chevron {
    display: inline-flex;
    padding: 2px;
    border: none;
    background: transparent;
    color: var(--color-text-muted);
    cursor: pointer;
  }
  .chevron:hover {
    color: var(--color-text);
  }
  .chevron-spacer {
    width: 18px;
    flex-shrink: 0;
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: var(--shadow-xs);
  }
  .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* v1 ProjectManager:453 —— 操作按钮默认透明,行 hover 时浮现 */
  .actions {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
    opacity: 0;
    transition: opacity 0.12s;
  }
  .row:hover .actions,
  .row:focus-within .actions {
    opacity: 1;
  }
  .icon-btn {
    display: inline-flex;
    padding: 4px;
    border: none;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-text-muted);
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
  }
  .icon-btn:hover {
    background: var(--color-neutral-100);
    color: var(--color-text);
  }
  .icon-btn.danger:hover {
    background: #fef2f2;
    color: var(--color-error);
  }

  .edit-box {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 0.6rem 0.5rem;
    border: 1px solid var(--color-accent-200);
    border-radius: var(--radius-md);
    background: var(--color-surface);
  }
  .color-row {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
  }
  .swatch {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid var(--color-border);
    cursor: pointer;
    padding: 0;
    transition: transform 0.12s, border-color 0.12s;
  }
  .swatch:hover {
    transform: scale(1.08);
  }
  .swatch.active {
    border-color: var(--color-neutral-800);
    box-shadow: var(--shadow-xs);
  }
  .edit-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.75rem;
  }
  .link-btn {
    border: none;
    background: transparent;
    color: var(--color-text-muted);
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }
  .link-btn:hover {
    color: var(--color-text);
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

  .add-child-row {
    padding: 0.25rem 0 0.25rem 24px;
  }

  .empty {
    text-align: center;
    color: var(--color-text-muted);
    font-size: 0.875rem;
    padding: 2.5rem 0;
  }
</style>
