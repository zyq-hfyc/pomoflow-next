<script lang="ts">
  // P1.7:任务管理页 —— 从原 P1.3-P1.5 App.svelte 拆出来,所有数据走 `lib/api`。
  //
  // 范围(P1.7):
  //   - 列表 + 新增 + 完成切换 + 删除 + 改优先级
  //   - 项目下拉筛选
  //   - 简单状态过滤(全部 / 进行中 / 已完成)
  //
  // 后续(P1.8)补:
  //   - 任务详情面板(描述、子任务、标签多选、due_date、reminder、repeat)
  //   - 多维筛选(项目 / 标签 / 优先级 / 日期)

  import { onMount } from "svelte";
  import * as api from "../lib/api";
  import type { Project, Priority, Task as ApiTask } from "../lib/api";

  // 字段类型与 Rust 域模型对齐。TaskQuery 在后端用 camelCase,
  // 这里不传 status 时给 null 而不是 undefined,避免 serde 把它当 Some。

  let tasks = $state<ApiTask[]>([]);
  let projects = $state<Project[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);

  let newTitle = $state("");
  let newProjectId = $state<string>("");
  let submitting = $state(false);

  let filter = $state<"all" | "active" | "completed">("all");

  const activeCount = $derived(
    tasks.filter((t) => t.status === "active").length,
  );
  const completedCount = $derived(
    tasks.filter((t) => t.status === "completed").length,
  );
  const filteredTasks = $derived(
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter),
  );

  async function refresh() {
    try {
      const [t, p] = await Promise.all([
        api.listTasks({}),
        api.listProjects(),
      ]);
      tasks = t;
      projects = p;
    } catch (e) {
      error = String(e);
    } finally {
      loading = false;
    }
  }

  onMount(refresh);

  function nowIso(): string {
    return new Date().toISOString();
  }

  function newId(): string {
    return crypto.randomUUID();
  }

  async function addTask() {
    const title = newTitle.trim();
    if (!title || submitting) return;
    submitting = true;
    error = null;
    try {
      const task: ApiTask = {
        id: newId(),
        title,
        description: "",
        project_id: newProjectId || null,
        priority: "none",
        status: "active",
        due_date: null,
        estimated_pomodoros: 0,
        completed_pomodoros: 0,
        pomodoro_duration: null,
        reminder: null,
        repeat: null,
        completed_at: null,
        created_at: nowIso(),
        updated_at: nowIso(),
      };
      await api.upsertTask(task);
      newTitle = "";
      await refresh();
    } catch (e) {
      error = String(e);
    } finally {
      submitting = false;
    }
  }

  async function toggleStatus(task: ApiTask) {
    const nextStatus: "active" | "completed" =
      task.status === "active" ? "completed" : "active";
    try {
      // 用 complete_task / reopen_task 业务 commands(不绕过业务规则)
      if (nextStatus === "completed") {
        await api.completeTask(task.id);
      } else {
        await api.reopenTask(task.id);
      }
      await refresh();
    } catch (e) {
      error = String(e);
    }
  }

  async function deleteTask(task: ApiTask) {
    if (!confirm(`删除任务「${task.title}」?`)) return;
    try {
      await api.deleteTask(task.id);
      await refresh();
    } catch (e) {
      error = String(e);
    }
  }

  async function changePriority(task: ApiTask, priority: Priority) {
    try {
      await api.upsertTask({ ...task, priority, updated_at: nowIso() });
      await refresh();
    } catch (e) {
      error = String(e);
    }
  }

  function projectName(id: string | null): string {
    if (!id) return "";
    return projects.find((p) => p.id === id)?.name ?? "";
  }

  function priorityLabel(p: Priority | undefined): string {
    return { high: "高", medium: "中", low: "低", none: "" }[p ?? "none"];
  }
</script>

<div class="page">
  <div class="header">
    <h2>任务</h2>
    <div class="counts">
      <span>进行中 <b>{activeCount}</b></span>
      <span>已完成 <b>{completedCount}</b></span>
    </div>
  </div>

  <form class="composer" onsubmit={(e) => { e.preventDefault(); addTask(); }}>
    <input
      type="text"
      bind:value={newTitle}
      placeholder="新任务标题..."
      disabled={submitting}
      aria-label="新任务标题"
    />
    <select bind:value={newProjectId} disabled={submitting} aria-label="项目">
      <option value="">无项目</option>
      {#each projects as p (p.id)}
        <option value={p.id}>{p.name}</option>
      {/each}
    </select>
    <button type="submit" disabled={submitting || !newTitle.trim()}>
      {submitting ? "添加中..." : "添加"}
    </button>
  </form>

  <div class="filter-row">
    <button
      class:active={filter === "all"}
      onclick={() => (filter = "all")}
    >全部</button>
    <button
      class:active={filter === "active"}
      onclick={() => (filter = "active")}
    >进行中</button>
    <button
      class:active={filter === "completed"}
      onclick={() => (filter = "completed")}
    >已完成</button>
  </div>

  {#if error}
    <div class="error" role="alert">
      <span>⚠ {error}</span>
      <button onclick={() => (error = null)}>×</button>
    </div>
  {/if}

  {#if loading}
    <p class="hint">加载中...</p>
  {:else if filteredTasks.length === 0}
    <p class="hint">
      {filter === "all" ? "暂无任务,添加一个开始吧" : "此视图下没有任务"}
    </p>
  {:else}
    <ul class="task-list">
      {#each filteredTasks as task (task.id)}
        <li class:done={task.status === "completed"}>
          <input
            type="checkbox"
            checked={task.status === "completed"}
            onchange={() => toggleStatus(task)}
            aria-label="切换完成"
          />
          <div class="content">
            <div class="title-row">
              <span class="title">{task.title}</span>
              {#if task.project_id}
                <span class="project-badge">{projectName(task.project_id)}</span>
              {/if}
              {#if task.priority !== "none"}
                <span class="pri-badge pri-{task.priority}">{priorityLabel(task.priority)}</span>
              {/if}
            </div>
            {#if task.description}
              <p class="desc">{task.description}</p>
            {/if}
          </div>
          <div class="actions">
            <select
              value={task.priority}
              onchange={(e) =>
                changePriority(task, (e.currentTarget as HTMLSelectElement).value as Priority)}
              aria-label="优先级"
            >
              <option value="none">优先级</option>
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
            <button class="del" onclick={() => deleteTask(task)} aria-label="删除">
              删除
            </button>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .page {
    padding: 1.5rem 2rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .header h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
  .counts {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
  .counts b {
    color: var(--color-text);
    font-weight: 600;
    margin-left: 0.25rem;
  }

  .composer {
    display: flex;
    gap: 0.5rem;
  }
  .composer input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: 0.95rem;
    background: var(--color-surface);
    color: var(--color-text);
  }
  .composer select {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text);
  }
  .composer button {
    padding: 0.5rem 1.25rem;
    border: none;
    border-radius: var(--radius-md);
    background: var(--color-accent);
    color: #fff;
    font-weight: 500;
    cursor: pointer;
  }
  .composer button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .filter-row {
    display: flex;
    gap: 0.5rem;
  }
  .filter-row button {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 0.3rem 0.85rem;
    font-size: 0.85rem;
    color: var(--color-text-muted);
    cursor: pointer;
  }
  .filter-row button.active {
    background: var(--color-accent);
    color: #fff;
    border-color: var(--color-accent);
  }

  .error {
    background: #fee2e2;
    color: #991b1b;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-md);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
  }
  .error button {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.1rem;
    cursor: pointer;
  }

  .hint {
    color: var(--color-text-muted);
    text-align: center;
    padding: 2rem;
    font-size: 0.9rem;
  }

  .task-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .task-list li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
  }
  .task-list li.done .title {
    text-decoration: line-through;
    color: var(--color-text-muted);
  }

  .task-list input[type="checkbox"] {
    margin-top: 0.25rem;
  }

  .content {
    flex: 1;
    min-width: 0;
  }
  .title-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .title {
    font-weight: 500;
    color: var(--color-text);
  }
  .project-badge {
    font-size: 0.75rem;
    padding: 0.1rem 0.5rem;
    background: var(--color-bg);
    border-radius: 999px;
    color: var(--color-text-muted);
  }
  .pri-badge {
    font-size: 0.75rem;
    padding: 0.1rem 0.5rem;
    border-radius: 999px;
  }
  .pri-high { background: #fee2e2; color: #991b1b; }
  .pri-medium { background: #fef3c7; color: #92400e; }
  .pri-low { background: #dbeafe; color: #1e40af; }

  .desc {
    margin: 0.25rem 0 0;
    font-size: 0.85rem;
    color: var(--color-text-muted);
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    align-items: flex-end;
  }
  .actions select {
    font-size: 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 0.15rem 0.4rem;
    background: var(--color-surface);
    color: var(--color-text);
  }
  .actions .del {
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
    padding: 0.15rem 0.6rem;
    border-radius: 4px;
    font-size: 0.75rem;
    cursor: pointer;
  }
  .actions .del:hover {
    color: #dc2626;
    border-color: #dc2626;
  }
</style>