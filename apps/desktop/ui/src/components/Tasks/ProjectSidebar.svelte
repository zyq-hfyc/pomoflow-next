<script lang="ts">
  // 左侧侧栏 —— v1 同款 6 个时间筛选 + 嵌套项目树 + 搜索 + 增删改。
  //
  // 设计要点:
  //   - 搜索框:onSearchChange 同步到父组件 TasksPage 的 search state
  //   - 6 个时间筛选:今天 / 明天 / 本周 / 已计划 / 已完成 / 手账
  //     每个按钮右侧显示「预估分钟 + 任务数」(来自 props.tasks 聚合)
  //   - 项目树:支持 3 级嵌套;每个节点 hover 显示 ⋮ 菜单(加子 / 改名 / 删除)
  //   - 选中项目 → onSelectProject(id);选中筛选 → onSetFilter(key)
  //   - 手账模式当前 P1.10 占位(filter key 接收但页面侧仍跳 JournalPage)

  import { Search, Sun, Sunrise, CalendarDays, CalendarCheck, CircleCheck, CalendarRange, Folder, ChevronDown, ChevronRight, Plus, MoreVertical, Pencil, Trash2 } from "lucide-svelte";
  import type { Component } from "svelte";
  import type { Project, Task } from "../../lib/api";
  import { datePart, todayStr, tomorrowStr } from "../../lib/dueDate";

  type FilterKey = "today" | "tomorrow" | "week" | "planned" | "completed" | "journal" | "";

  interface Props {
    projects: Project[];
    filter: FilterKey;
    onSetFilter: (f: FilterKey) => void;
    onSelectProject: (id: string | null) => void;
    selectedProject: string | null;
    tasks: Task[];
    onCreateProject?: (name: string, parent_id?: string | null) => void;
    onUpdateProject?: (id: string, name: string) => void;
    onDeleteProject?: (id: string) => void;
    search?: string;
    onSearchChange?: (value: string) => void;
  }

  let {
    projects,
    filter,
    onSetFilter,
    onSelectProject,
    selectedProject,
    tasks,
    onCreateProject,
    onUpdateProject,
    onDeleteProject,
    search = "",
    onSearchChange,
  }: Props = $props();

  // === 内部 state ===
  let projectOpen = $state(true);
  let expanded = $state<Set<string>>(new Set());
  let menuProjectId = $state<string | null>(null);
  let editingProjectId = $state<string | null>(null);
  let editName = $state("");
  let addingParentId = $state<string | null | "root">(null);
  let newName = $state("");

  // === 计算 helpers ===
  function startOfWeek(d: Date): Date {
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day; // 周一为一周开始
    const out = new Date(d);
    out.setDate(out.getDate() + diff);
    out.setHours(0, 0, 0, 0);
    return out;
  }

  function endOfWeek(d: Date): Date {
    const s = startOfWeek(d);
    const e = new Date(s);
    e.setDate(e.getDate() + 6);
    e.setHours(23, 59, 59, 999);
    return e;
  }

  interface TaskStats {
    timeStr: string;
    count: number;
  }

  function getTaskStats(items: Task[], key: FilterKey): TaskStats {
    if (key === "journal") return { timeStr: "", count: 0 };
    const today = todayStr();
    const tomorrow = tomorrowStr();
    const sow = startOfWeek(new Date());
    const eow = endOfWeek(new Date());

    let filtered = items;
    if (key === "today") filtered = items.filter((t) => datePart(t.due_date) === today);
    if (key === "tomorrow") filtered = items.filter((t) => datePart(t.due_date) === tomorrow);
    if (key === "week") {
      filtered = items.filter((t) => {
        if (!t.due_date) return false;
        const d = new Date(t.due_date);
        return d >= sow && d <= eow;
      });
    }
    if (key === "planned") filtered = items.filter((t) => t.due_date !== null && t.due_date !== undefined);
    if (key === "completed") filtered = items.filter((t) => t.status === "completed");

    const minutes = filtered.reduce(
      (s, t) => s + (t.estimated_pomodoros || 0) * (t.pomodoro_duration || 25),
      0,
    );
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const timeStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    return { timeStr, count: filtered.length };
  }

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
    const setDepth = (nodes: TreeNode[], depth: number) => {
      for (const node of nodes) {
        node.depth = depth;
        setDepth(node.children, depth + 1);
      }
    };
    setDepth(roots, 0);
    return roots;
  }

  function flattenTree(nodes: TreeNode[], expanded: Set<string>): TreeNode[] {
    const result: TreeNode[] = [];
    for (const node of nodes) {
      result.push(node);
      if (expanded.has(node.id) && node.children.length > 0) {
        result.push(...flattenTree(node.children, expanded));
      }
    }
    return result;
  }

  // === derived ===
  const tree = $derived(buildTree(projects));
  const flatTree = $derived(flattenTree(tree, expanded));

  // 6 个时间筛选项
  // lucide-svelte 1.x 导出的是 Svelte 4 SvelteComponentTyped，与 Svelte 5 Component 类型不兼容。
  // 用 `as any` 在赋值处绕过 — 运行期正常。
  const timeFilters: { key: FilterKey; icon: Component<any>; label: string }[] = [
    { key: "today", icon: Sun as any, label: "今天" },
    { key: "tomorrow", icon: Sunrise as any, label: "明天" },
    { key: "week", icon: CalendarDays as any, label: "本周" },
    { key: "planned", icon: CalendarCheck as any, label: "已计划" },
    { key: "completed", icon: CircleCheck as any, label: "已完成" },
    { key: "journal", icon: CalendarRange as any, label: "手账" },
  ];

  const activeFilter = $derived(selectedProject === null ? filter : "");

  function toggleExpand(id: string) {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    expanded = next;
  }

  function pickFilter(k: FilterKey) {
    onSetFilter(k);
    onSelectProject(null);
  }
</script>

<aside class="sidebar">
  <!-- Search -->
  <div class="search-row">
    <Search size={14} class="search-icon" />
    <input
      type="text"
      value={search}
      oninput={(e) => onSearchChange?.((e.currentTarget as HTMLInputElement).value)}
      placeholder="搜索任务标题..."
      class="search-input"
    />
  </div>

  <!-- Time filters -->
  <div class="time-filters">
    {#each timeFilters as item (item.key)}
      {@const stats = getTaskStats(tasks, item.key)}
      {@const active = activeFilter === item.key}
      <button
        type="button"
        class="filter-btn"
        class:active
        onclick={() => pickFilter(item.key)}
      >
        <span class="filter-label">
          <item.icon size={16} />
          {item.label}
        </span>
        {#if stats.count > 0}
          <span class="filter-stats">
            {stats.timeStr} {stats.count}
          </span>
        {/if}
      </button>
    {/each}
  </div>

  <!-- Projects / Lists -->
  <div class="projects-section">
    <div class="projects-header">
      <button
        type="button"
        class="projects-toggle"
        onclick={() => (projectOpen = !projectOpen)}
      >
        {#if projectOpen}<ChevronDown size={14} />{:else}<ChevronRight size={14} />{/if}
        清单
      </button>
      {#if onCreateProject}
        <button
          type="button"
          class="add-root"
          onclick={() => {
            addingParentId = "root";
            newName = "";
          }}
          aria-label="新增根清单"
          title="新增清单"
        >
          <Plus size={14} />
        </button>
      {/if}
    </div>

    {#if projectOpen}
      <div class="projects-tree">
        <!-- Add root input -->
        {#if addingParentId === "root" && onCreateProject}
          <div class="add-row depth-0">
            <!-- svelte-ignore a11y_autofocus -->
            <input
              autofocus
              type="text"
              bind:value={newName}
              onkeydown={(e) => {
                if (e.key === "Enter") {
                  const name = newName.trim();
                  if (name && onCreateProject) onCreateProject(name, null);
                  addingParentId = null;
                  newName = "";
                }
                if (e.key === "Escape") {
                  addingParentId = null;
                  newName = "";
                }
              }}
              onblur={() => {
                const name = newName.trim();
                if (name && onCreateProject) onCreateProject(name, null);
                addingParentId = null;
                newName = "";
              }}
              placeholder="清单名称..."
              class="add-input"
            />
          </div>
        {/if}

        {#each flatTree as node (node.id)}
          {@const active = selectedProject === node.id}
          {@const isMenuOpen = menuProjectId === node.id}
          {@const isEditing = editingProjectId === node.id}
          {@const hasChildren = node.children.length > 0}
          {@const isExpanded = expanded.has(node.id)}
          <div class="tree-node" style="padding-left: {node.depth * 12}px;">
            {#if isEditing}
              <div class="edit-row">
                <!-- svelte-ignore a11y_autofocus -->
                <input
                  autofocus
                  type="text"
                  bind:value={editName}
                  onkeydown={(e) => {
                    if (e.key === "Enter") {
                      const name = editName.trim();
                      if (name && onUpdateProject) onUpdateProject(node.id, name);
                      editingProjectId = null;
                      editName = "";
                    }
                    if (e.key === "Escape") {
                      editingProjectId = null;
                      editName = "";
                    }
                  }}
                  onblur={() => {
                    const name = editName.trim();
                    if (name && onUpdateProject) onUpdateProject(node.id, name);
                    editingProjectId = null;
                    editName = "";
                  }}
                  class="add-input"
                />
              </div>
            {:else}
              <div class="node-row" class:active>
                <span
                  class="node-label"
                  onclick={() => {
                    onSelectProject(node.id);
                    onSetFilter("");
                  }}
                  onkeydown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectProject(node.id);
                      onSetFilter("");
                    }
                  }}
                  role="button"
                  tabindex="0"
                >
                  {#if hasChildren}
                    <button
                      type="button"
                      class="expand-btn"
                      onclick={(e) => {
                        e.stopPropagation();
                        toggleExpand(node.id);
                      }}
                      aria-label={isExpanded ? "收起" : "展开"}
                    >
                      {#if isExpanded}<ChevronDown size={12} />{:else}<ChevronRight size={12} />{/if}
                    </button>
                  {:else}
                    <span class="expand-spacer"></span>
                  {/if}
                  <Folder size={14} color={node.color || "var(--color-accent)"} />
                  <span class="node-name">{node.name}</span>
                </span>
                {#if onUpdateProject || onDeleteProject || (onCreateProject && node.depth < 2)}
                  <button
                    type="button"
                    class="more-btn"
                    onclick={(e) => {
                      e.stopPropagation();
                      menuProjectId = isMenuOpen ? null : node.id;
                    }}
                    aria-label="更多操作"
                  >
                    <MoreVertical size={14} />
                  </button>
                {/if}
              </div>
            {/if}

            <!-- Add child input -->
            {#if addingParentId === node.id && onCreateProject}
              <div class="add-row" style="padding-left: {(node.depth + 1) * 12 + 12}px;">
                <!-- svelte-ignore a11y_autofocus -->
                <input
                  autofocus
                  type="text"
                  bind:value={newName}
                  onkeydown={(e) => {
                    if (e.key === "Enter") {
                      const name = newName.trim();
                      if (name && onCreateProject) onCreateProject(name, node.id);
                      addingParentId = null;
                      newName = "";
                      const next = new Set(expanded);
                      next.add(node.id);
                      expanded = next;
                    }
                    if (e.key === "Escape") {
                      addingParentId = null;
                      newName = "";
                    }
                  }}
                  onblur={() => {
                    const name = newName.trim();
                    if (name && onCreateProject) onCreateProject(name, node.id);
                    addingParentId = null;
                    newName = "";
                    const next = new Set(expanded);
                    next.add(node.id);
                    expanded = next;
                  }}
                  placeholder={node.depth === 0 ? "子清单名称..." : "孙清单名称..."}
                  class="add-input"
                />
              </div>
            {/if}

            <!-- Context menu -->
            {#if isMenuOpen && !isEditing}
              <div class="context-menu">
                {#if onCreateProject && node.depth < 2}
                  <button
                    type="button"
                    class="ctx-item"
                    onclick={() => {
                      addingParentId = node.id;
                      newName = "";
                      menuProjectId = null;
                    }}
                  >
                    <Plus size={12} />
                    新增子清单
                  </button>
                {/if}
                {#if onUpdateProject}
                  <button
                    type="button"
                    class="ctx-item"
                    onclick={() => {
                      editName = node.name;
                      editingProjectId = node.id;
                      menuProjectId = null;
                    }}
                  >
                    <Pencil size={12} />
                    重命名
                  </button>
                {/if}
                {#if onDeleteProject}
                  <button
                    type="button"
                    class="ctx-item danger"
                    onclick={() => {
                      onDeleteProject(node.id);
                      menuProjectId = null;
                    }}
                  >
                    <Trash2 size={12} />
                    删除
                  </button>
                {/if}
              </div>
            {/if}
          </div>
        {/each}

        {#if projects.length === 0 && addingParentId !== "root"}
          <div class="empty-hint">还没有清单,点 + 新建</div>
        {/if}
      </div>
    {/if}
  </div>
</aside>

<style>
  .sidebar {
    width: 240px;
    flex-shrink: 0;
    border-right: 1px solid var(--color-border, #e5e2dd);
    background: var(--color-surface, #fff);
    padding: 0.75rem 0.5rem;
    overflow-y: auto;
    height: 100%;
  }

  .search-row {
    position: relative;
    margin-bottom: 0.75rem;
    padding: 0 0.25rem;
  }
  :global(.search-row .search-icon) {
    position: absolute;
    left: 0.85rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-muted, #6b6864);
    pointer-events: none;
  }
  .search-input {
    width: 100%;
    padding: 0.4rem 0.75rem 0.4rem 2rem;
    font-size: 0.85rem;
    background: var(--color-bg, #fafaf7);
    border: 1px solid transparent;
    border-radius: var(--radius-md, 8px);
    color: var(--color-text, #1f1d1b);
    outline: none;
    transition: background 0.12s, border-color 0.12s;
  }
  .search-input:focus {
    background: var(--color-surface, #fff);
    border-color: var(--color-accent, #e74c3c);
  }

  .time-filters {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 0.75rem;
  }
  .filter-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.4rem 0.75rem;
    font-size: 0.85rem;
    border: none;
    border-radius: var(--radius-md, 8px);
    background: transparent;
    color: var(--color-text, #1f1d1b);
    cursor: pointer;
    transition: background 0.12s;
  }
  .filter-btn:hover {
    background: var(--color-bg, #fafaf7);
  }
  .filter-btn.active {
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 10%, transparent);
    color: var(--color-accent, #e74c3c);
    font-weight: 500;
  }
  .filter-label {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .filter-stats {
    font-size: 0.7rem;
    color: var(--color-text-muted, #6b6864);
    font-variant-numeric: tabular-nums;
  }

  .projects-section {
    margin-top: 0.5rem;
  }
  .projects-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.25rem 0.75rem;
  }
  .projects-toggle {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: transparent;
    border: none;
    font-size: 0.85rem;
    color: var(--color-text-muted, #6b6864);
    cursor: pointer;
    padding: 0;
  }
  .projects-toggle:hover {
    color: var(--color-text, #1f1d1b);
  }
  .add-root {
    background: transparent;
    border: none;
    color: var(--color-text-muted, #6b6864);
    padding: 2px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
  }
  .add-root:hover {
    color: var(--color-accent, #e74c3c);
  }

  .projects-tree {
    margin-top: 0.25rem;
    display: flex;
    flex-direction: column;
  }

  .tree-node {
    position: relative;
  }
  .node-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.3rem 0.75rem;
    border-radius: var(--radius-md, 8px);
    cursor: pointer;
    transition: background 0.12s;
    font-size: 0.85rem;
  }
  .node-row:hover {
    background: var(--color-bg, #fafaf7);
  }
  .node-row.active {
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 10%, transparent);
    color: var(--color-accent, #e74c3c);
    font-weight: 500;
  }
  .node-label {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    flex: 1;
    min-width: 0;
    cursor: pointer;
    outline: none;
  }
  .expand-btn {
    background: transparent;
    border: none;
    color: var(--color-text-muted, #6b6864);
    padding: 0;
    cursor: pointer;
    display: flex;
  }
  .expand-spacer {
    width: 18px;
  }
  .node-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .more-btn {
    background: transparent;
    border: none;
    color: var(--color-text-muted, #6b6864);
    padding: 0;
    cursor: pointer;
    display: flex;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.12s;
  }
  .tree-node:hover .more-btn {
    opacity: 1;
  }
  .more-btn:hover {
    background: var(--color-bg, #fafaf7);
  }

  .add-row,
  .edit-row {
    padding: 0.2rem 0.5rem;
  }
  .depth-0 {
    padding-left: 0.5rem !important;
  }
  .add-input {
    width: 100%;
    font-size: 0.85rem;
    background: var(--color-bg, #fafaf7);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-md, 8px);
    padding: 0.3rem 0.5rem;
    color: var(--color-text, #1f1d1b);
    outline: none;
  }
  .add-input:focus {
    border-color: var(--color-accent, #e74c3c);
  }

  .context-menu {
    position: absolute;
    right: 0.5rem;
    top: 2rem;
    z-index: 10;
    background: var(--color-surface, #fff);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-md, 8px);
    box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08));
    padding: 0.25rem 0;
    min-width: 144px;
    display: flex;
    flex-direction: column;
  }
  .ctx-item {
    background: transparent;
    border: none;
    text-align: left;
    padding: 0.4rem 0.75rem;
    font-size: 0.85rem;
    color: var(--color-text, #1f1d1b);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
  }
  .ctx-item:hover {
    background: var(--color-bg, #fafaf7);
  }
  .ctx-item.danger {
    color: var(--color-accent, #e74c3c);
  }
  .ctx-item.danger:hover {
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 10%, transparent);
  }

  .empty-hint {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    color: var(--color-text-muted, #6b6864);
  }
</style>