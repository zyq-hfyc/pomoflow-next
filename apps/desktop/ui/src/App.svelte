<script lang="ts">
  // P1.3:Task CRUD UI —— 从 Rust commands 拉数据,落到 Svelte 5 runes 反应式 UI。
  //
  // 重构:把 P1.1 的 Hello 窗口替换成任务管理界面,所有操作最终落到 Tauri command
  // → pomoflow-core::Store → SQLite。

  import { invoke } from "@tauri-apps/api/core";
  import { onMount } from "svelte";
  import {
    isPermissionGranted,
    requestPermission,
    sendNotification,
  } from "@tauri-apps/plugin-notification";
  import { disable, enable, isEnabled } from "@tauri-apps/plugin-autostart";

  // === 与 Rust 端域模型对齐的 TS 类型 ===
  // 字段名 = Rust serde 默认输出(snake_case,TaskQuery 单独开了 camelCase,这里没用)。
  // chrono DateTime<Utc> 默认序列化为 RFC3339 字符串,这里用 string 接收。

  type Id = string;

  type TaskStatus = "active" | "completed";
  type Priority = "high" | "medium" | "low" | "none";
  type Reminder =
    | "none"
    | "on_time"
    | "minutes5"
    | "minutes30"
    | "hour1"
    | "day1"
    | "days2";
  type Repeat = "none" | "daily" | "weekdays" | "weekly" | "monthly" | "yearly";

  interface Task {
    id: Id;
    title: string;
    description: string;
    project_id: Id | null;
    priority: Priority;
    status: TaskStatus;
    due_date: string | null;
    estimated_pomodoros: number;
    completed_pomodoros: number;
    pomodoro_duration: number | null;
    reminder: Reminder;
    repeat: Repeat;
    completed_at: string | null;
    revision: number;
    deleted_at: string | null;
    updated_at: string;
  }

  interface Project {
    id: Id;
    name: string;
    color: string;
    parent_id: Id | null;
    revision: number;
    deleted_at: string | null;
    updated_at: string;
  }

  // === 反应式状态 ===

  let tasks = $state<Task[]>([]);
  let projects = $state<Project[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);

  let newTitle = $state("");
  let newProjectId = $state<Id | "">("");
  let submitting = $state(false);

  // 简单过滤:全部 / 进行中 / 已完成
  let filter = $state<"all" | "active" | "completed">("all");

  // === P1.4 系统能力状态 ===
  let autostartOn = $state(false);
  let autostartLoading = $state(false);
  let notificationPermission = $state<"granted" | "denied" | "default">(
    "default",
  );

  // 派生量
  const activeCount = $derived(
    tasks.filter((t) => t.status === "active").length,
  );
  const completedCount = $derived(
    tasks.filter((t) => t.status === "completed").length,
  );
  const filteredTasks = $derived(
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter),
  );

  // === 数据加载 ===

  async function refresh() {
    try {
      const [t, p] = await Promise.all([
        invoke<Task[]>("list_tasks", { query: {} }),
        invoke<Project[]>("list_projects"),
      ]);
      tasks = t;
      projects = p;
    } catch (e) {
      error = String(e);
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    await refresh();
    await refreshSystemStatus();
  });

  async function refreshSystemStatus() {
    try {
      autostartOn = await isEnabled();
    } catch (e) {
      // 首次读不到 / 权限缺失 —— 静默,UI 显式标 unknown
      console.warn("isEnabled failed", e);
      autostartOn = false;
    }
    try {
      notificationPermission = (await isPermissionGranted())
        ? "granted"
        : "default";
    } catch {
      notificationPermission = "default";
    }
  }

  // === 写操作 ===

  function nowIso(): string {
    return new Date().toISOString();
  }

  function newTaskId(): Id {
    return crypto.randomUUID();
  }

  async function addTask() {
    const title = newTitle.trim();
    if (!title || submitting) return;
    submitting = true;
    error = null;
    try {
      const task: Task = {
        id: newTaskId(),
        title,
        description: "",
        project_id: newProjectId || null,
        priority: "none",
        status: "active",
        due_date: null,
        estimated_pomodoros: 0,
        completed_pomodoros: 0,
        pomodoro_duration: null,
        reminder: "none",
        repeat: "none",
        completed_at: null,
        revision: 1,
        deleted_at: null,
        updated_at: nowIso(),
      };
      await invoke<Task>("upsert_task", { task });
      newTitle = "";
      await refresh();
    } catch (e) {
      error = String(e);
    } finally {
      submitting = false;
    }
  }

  async function toggleStatus(task: Task) {
    const nextStatus: TaskStatus =
      task.status === "active" ? "completed" : "active";
    try {
      await invoke<Task>("upsert_task", {
        task: {
          ...task,
          status: nextStatus,
          completed_at: nextStatus === "completed" ? nowIso() : null,
          updated_at: nowIso(),
        },
      });
      await refresh();
    } catch (e) {
      error = String(e);
    }
  }

  async function deleteTask(task: Task) {
    if (!confirm(`删除任务「${task.title}」?`)) return;
    try {
      await invoke("delete_task", { id: task.id });
      await refresh();
    } catch (e) {
      error = String(e);
    }
  }

  async function changePriority(task: Task, priority: Priority) {
    try {
      await invoke<Task>("upsert_task", {
        task: { ...task, priority, updated_at: nowIso() },
      });
      await refresh();
    } catch (e) {
      error = String(e);
    }
  }

  // === P1.4 系统能力操作 ===

  async function toggleAutostart() {
    if (autostartLoading) return;
    autostartLoading = true;
    try {
      if (autostartOn) {
        await disable();
        autostartOn = false;
      } else {
        await enable();
        autostartOn = true;
      }
    } catch (e) {
      error = `自启动切换失败: ${e}`;
    } finally {
      autostartLoading = false;
    }
  }

  async function testNotification() {
    try {
      let granted = await isPermissionGranted();
      if (!granted) {
        const perm = await requestPermission();
        granted = perm === "granted";
        notificationPermission = perm;
      } else {
        notificationPermission = "granted";
      }
      if (!granted) {
        error = "通知权限未授予,无法发送";
        return;
      }
      sendNotification({
        title: "PomoFlow 测试通知",
        body: `当前任务数:${tasks.length},进行中:${activeCount}`,
      });
    } catch (e) {
      error = `通知失败: ${e}`;
    }
  }

  // === 派生工具 ===

  function projectName(id: Id | null): string {
    if (!id) return "";
    return projects.find((p) => p.id === id)?.name ?? "";
  }

  function priorityLabel(p: Priority): string {
    return { high: "高", medium: "中", low: "低", none: "" }[p];
  }
</script>

<main class="page">
  <header class="topbar">
    <div class="brand">
      <span class="logo" aria-hidden="true">🍅</span>
      <h1>PomoFlow</h1>
    </div>
    <div class="counts">
      <span class="count">进行中 <b>{activeCount}</b></span>
      <span class="count">已完成 <b>{completedCount}</b></span>
    </div>
  </header>

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

  <!-- P1.4 系统能力面板 -->
  <section class="settings">
    <h2>系统能力</h2>
    <div class="setting-row">
      <div class="setting-label">
        <span class="setting-name">开机自启动</span>
        <span class="setting-hint">
          OS 启动时自动运行 PomoFlow(静默启动,常驻托盘)
        </span>
      </div>
      <button
        class="toggle"
        class:on={autostartOn}
        disabled={autostartLoading}
        onclick={toggleAutostart}
        aria-pressed={autostartOn}
      >
        {autostartLoading ? "..." : autostartOn ? "已开启" : "已关闭"}
      </button>
    </div>

    <div class="setting-row">
      <div class="setting-label">
        <span class="setting-name">系统通知</span>
        <span class="setting-hint">
          番茄完成 / 任务提醒时弹出系统通知
        </span>
      </div>
      <button class="action" onclick={testNotification}>
        发送测试通知
      </button>
    </div>

    <p class="tray-hint">
      💡 关闭主窗口时 PomoFlow 会驻留在系统托盘,右键托盘图标可『显示窗口 / 退出』。
    </p>
  </section>
</main>

<style>
  .page {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 1.5rem 2rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-border);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .brand h1 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
  .logo { font-size: 1.5rem; }

  .counts {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
  .count b {
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
  }
  .composer select {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
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
  }
  .project-badge {
    font-size: 0.75rem;
    padding: 0.1rem 0.5rem;
    background: #f3f4f6;
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

  /* === P1.4 系统能力面板 === */
  .settings {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px dashed var(--color-border);
  }
  .settings h2 {
    margin: 0 0 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
  }
  .setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 0;
    gap: 1rem;
  }
  .setting-label {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .setting-name {
    font-weight: 500;
    color: var(--color-text);
  }
  .setting-hint {
    font-size: 0.8rem;
    color: var(--color-text-muted);
  }
  .toggle {
    padding: 0.4rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-muted);
    cursor: pointer;
    font-size: 0.85rem;
    min-width: 5rem;
  }
  .toggle.on {
    background: var(--color-accent);
    color: #fff;
    border-color: var(--color-accent);
  }
  .toggle:disabled { opacity: 0.5; cursor: not-allowed; }
  .action {
    padding: 0.4rem 1rem;
    border: 1px solid var(--color-accent);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-accent);
    cursor: pointer;
    font-size: 0.85rem;
  }
  .action:hover { background: var(--color-accent); color: #fff; }
  .tray-hint {
    margin: 1rem 0 0;
    font-size: 0.8rem;
    color: var(--color-text-muted);
    line-height: 1.5;
  }
</style>
