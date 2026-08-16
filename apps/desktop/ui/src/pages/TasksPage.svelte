<script lang="ts">
  // 任务管理页 —— v1 同款 3 列布局：
  //   [左] 时间筛选 + 项目树 + 搜索
  //   [中] 当前视图的标题 / 4 张统计卡 / 筛选条 / 添加表单 / 任务列表（扁平或分组）
  //        journal 视图换成手账月视图（JournalView）
  //   [右] 选中任务的详情面板（TaskDetailPanel）；journal 视图为月度复盘面板
  //        （MonthReviewPanel）
  //
  // 视图模式：
  //   - today / tomorrow / week / planned / completed / journal（6 档）
  //   - 或 selectedProject ≠ null（选中具体清单）
  //   - searchQuery 非空 → 跨视图搜索，忽略 filter 和 selectedProject
  //
  // 筛选状态 planned / completed 各自独立（切视图互不影响）。
  //
  // 与后端对齐：
  //   - list_tasks / list_projects / list_tags 一次拉
  //   - task 切换通过 onChanged 回调 → refresh
  //   - start 任务跳到 /timer（同步 P1.7 timer 行为）

  import { onMount } from "svelte";
  import { Clock, Target, CircleCheck, ChartColumn } from "lucide-svelte";
  import { save } from "@tauri-apps/plugin-dialog";
  import * as api from "../lib/api";
  import type {
    Project,
    Tag,
    Task,
    Priority,
    Reminder,
    Repeat,
  } from "../lib/api";
  import { currentRoute, navigate } from "../lib/router.svelte";
  import { startWithTask } from "../lib/timer.svelte";
  import { getDict, fmt } from "../lib/i18n.svelte";
  import { todayStr, tomorrowStr, datePart, hasTimePart } from "../lib/dueDate";
  import ProjectSidebar from "../components/Tasks/ProjectSidebar.svelte";
  import TaskItem from "../components/Tasks/TaskItem.svelte";
  import TaskDetailPanel from "../components/Tasks/TaskDetailPanel.svelte";
  import GroupedTaskList from "../components/Tasks/GroupedTaskList.svelte";
  import StatCard from "../components/Stats/StatCard.svelte";
  import FilterBar from "../components/Tasks/FilterBar.svelte";
  import TaskForm from "../components/Tasks/TaskForm.svelte";
  import JournalView from "../components/Tasks/JournalView.svelte";
  import MonthReviewPanel from "../components/Tasks/MonthReviewPanel.svelte";

  // list_tasks 返回 TaskView(拍平 tags + subtasks);导出 xlsx 需要子任务
  type TaskWithTags = Task & {
    tags?: Tag[];
    subtasks?: { id: string; title: string; is_completed: boolean; position: number }[];
  };
  type FilterKey = "today" | "tomorrow" | "week" | "planned" | "completed" | "journal" | "";

  let tasks = $state<TaskWithTags[]>([]);
  let projects = $state<Project[]>([]);
  let tags = $state<Tag[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);

  // === i18n 词典(响应式) ===
  const t = $derived(getDict());

  let selectedProject = $state<string | null>(null);
  let filter = $state<FilterKey>("today");
  let searchQuery = $state("");

  let selectedTask = $state<TaskWithTags | null>(null);

  // === 手账模式状态(P1.10):年/月默认今天;reviewVersion 在周复盘保存后 +1,
  //     驱动右侧 MonthReviewPanel 重拉 ===
  let journalYear = $state(new Date().getFullYear());
  let journalMonth = $state(new Date().getMonth() + 1);
  let reviewVersion = $state(0);

  // === Planned / Completed 视图的独立筛选 state ===
  let plannedFilterProject = $state<string | null>(null);
  let plannedFilterTag = $state<string | null>(null);
  let plannedFilterPriority = $state<Priority | null>(null);
  let plannedFilterPreset = $state<"week" | "month" | null>(null);
  let plannedFilterStartDate = $state("");
  let plannedFilterEndDate = $state("");

  let completedFilterProject = $state<string | null>(null);
  let completedFilterTag = $state<string | null>(null);
  let completedFilterPriority = $state<Priority | null>(null);
  let completedFilterPreset = $state<"week" | "month" | null>(null);
  let completedFilterStartDate = $state("");
  let completedFilterEndDate = $state("");

  // === derived: 主筛选结果 ===
  const filtered = $derived.by(() => {
    let result = [...tasks];
    const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2, none: 3 };

    // 搜索 → 忽略 filter / selectedProject
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
      result.sort((a, b) => {
        if (a.status !== b.status) return a.status === "active" ? -1 : 1;
        const pa = priorityOrder[a.priority || "none"] ?? 3;
        const pb = priorityOrder[b.priority || "none"] ?? 3;
        if (pa !== pb) return pa - pb;
        return (
          new Date(a.created_at ?? 0).getTime() -
          new Date(b.created_at ?? 0).getTime()
        );
      });
      return result;
    }

    const today = todayStr();
    const tomorrow = tomorrowStr();
    const now = new Date();
    const dow = now.getDay();
    const offsetToMonday = dow === 0 ? 6 : dow - 1;
    const startOfWeek = new Date(now);
    startOfWeek.setDate(startOfWeek.getDate() - offsetToMonday);
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    if (selectedProject !== null) {
      result = result.filter((t) => t.project_id === selectedProject);
    } else if (filter === "today") {
      result = result.filter((t) => datePart(t.due_date) === today);
    } else if (filter === "tomorrow") {
      result = result.filter((t) => datePart(t.due_date) === tomorrow);
    } else if (filter === "week") {
      result = result.filter((t) => {
        if (!t.due_date) return false;
        const d = new Date(t.due_date);
        return d >= startOfWeek && d <= endOfWeek;
      });
    } else if (filter === "planned") {
      result = applyExtraFilters(result, {
        project: plannedFilterProject,
        tag: plannedFilterTag,
        priority: plannedFilterPriority,
        preset: plannedFilterPreset,
        startDate: plannedFilterStartDate,
        endDate: plannedFilterEndDate,
      });
    } else if (filter === "completed") {
      result = result.filter((t) => t.status === "completed");
      result = applyExtraFilters(result, {
        project: completedFilterProject,
        tag: completedFilterTag,
        priority: completedFilterPriority,
        preset: completedFilterPreset,
        startDate: completedFilterStartDate,
        endDate: completedFilterEndDate,
      });
    } else if (filter === "journal") {
      // 手账模式：所有带 due_date 的任务（含 completed，可勾选切换）— v1 语义
      result = result.filter((t) => !!t.due_date);
    }

    // 排序：active 在前 → 优先级 → 创建时间
    result.sort((a, b) => {
      if (a.status !== b.status) return a.status === "active" ? -1 : 1;
      const pa = priorityOrder[a.priority || "none"] ?? 3;
      const pb = priorityOrder[b.priority || "none"] ?? 3;
      if (pa !== pb) return pa - pb;
      return (
        new Date(a.created_at ?? 0).getTime() -
        new Date(b.created_at ?? 0).getTime()
      );
    });

    return result;
  });

  // === helpers ===
  function applyExtraFilters(
    list: TaskWithTags[],
    f: {
      project: string | null;
      tag: string | null;
      priority: Priority | null;
      preset: "week" | "month" | null;
      startDate: string;
      endDate: string;
    },
  ): TaskWithTags[] {
    let r = list;
    if (f.project !== null) r = r.filter((t) => t.project_id === f.project);
    if (f.tag !== null) r = r.filter((t) => (t.tags ?? []).some((tag) => tag.id === f.tag));
    if (f.priority !== null) r = r.filter((t) => t.priority === f.priority);
    if (f.preset === "week") {
      const now = new Date();
      const dow = now.getDay();
      const off = dow === 0 ? 6 : dow - 1;
      const mon = new Date(now);
      mon.setDate(now.getDate() - off);
      const sun = new Date(mon);
      sun.setDate(mon.getDate() + 6);
      const s = datePart(mon.toISOString());
      const e = datePart(sun.toISOString());
      r = r.filter((t) => {
        const d = datePart(t.due_date);
        return !!d && d >= s && d <= e;
      });
    }
    if (f.preset === "month") {
      const now = new Date();
      const s = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
      const eom = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      const e = datePart(eom.toISOString());
      r = r.filter((t) => {
        const d = datePart(t.due_date);
        return !!d && d >= s && d <= e;
      });
    }
    if (f.startDate)
      r = r.filter((t) => {
        const d = datePart(t.due_date);
        return !!d && d >= f.startDate;
      });
    if (f.endDate)
      r = r.filter((t) => {
        const d = datePart(t.due_date);
        return !!d && d <= f.endDate;
      });
    return r;
  }

  // === stats ===
  const stats = $derived.by(() => {
    const estimatedMinutes = filtered
      .filter((t) => t.status === "active")
      .reduce(
        (s, t) => s + (t.estimated_pomodoros || 0) * (t.pomodoro_duration || 25),
        0,
      );
    const activeCount = filtered.filter((t) => t.status === "active").length;
    const focusedMinutes = filtered.reduce(
      (s, t) => s + (t.completed_pomodoros || 0) * (t.pomodoro_duration || 25),
      0,
    );
    const completedPomodoros = filtered.reduce(
      (s, t) => s + (t.completed_pomodoros || 0),
      0,
    );
    const completedCount = filtered.filter((t) => t.status === "completed").length;
    return { estimatedMinutes, activeCount, focusedMinutes, completedCount, completedPomodoros };
  });

  // === filter title ===
  const filterTitle = $derived.by(() => {
    if (searchQuery.trim()) {
      return `${t.task.searchResult} (${filtered.length})`;
    }
    if (selectedProject !== null) {
      const p = projects.find((pr) => pr.id === selectedProject);
      return p?.name || t.task.list;
    }
    const map: Record<FilterKey, string> = {
      today: t.filter.today,
      tomorrow: t.filter.tomorrow,
      week: t.filter.week,
      planned: t.sidebar.planned,
      completed: t.sidebar.completed,
      journal: t.sidebar.journal,
      "": t.task.task,
    };
    return map[filter] || t.task.task;
  });

  // === handlers ===
  async function refresh() {
    try {
      const [t, p, g] = await Promise.all([api.listTasks({}), api.listProjects(), api.listTags()]);
      // list_tasks 现在返回 TaskView (flatten tags + subtasks)，但 .tags 已经嵌入顶层。
      // 防御性写法：若 .tags 未嵌入则用空数组。
      tasks = (t as TaskWithTags[]).map((x) => ({ ...x, tags: x.tags ?? [] }));
      projects = p;
      tags = g;
      if (selectedTask) {
        const next = tasks.find((x) => x.id === selectedTask!.id);
        selectedTask = next ?? null;
      }
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

  async function toggleStatus(task: TaskWithTags | string) {
    const id = typeof task === "string" ? task : task.id;
    const t = typeof task === "string" ? tasks.find((x) => x.id === id) : task;
    if (!t) return;
    try {
      if (t.status === "active") {
        await api.completeTask(id);
      } else {
        await api.reopenTask(id);
      }
      await refresh();
    } catch (e) {
      error = String(e);
    }
  }

  async function deleteTask(task: TaskWithTags) {
    if (!confirm(fmt(t.task.deleteConfirm, { title: task.title }))) return;
    try {
      await api.deleteTask(task.id);
      if (selectedTask?.id === task.id) selectedTask = null;
      await refresh();
    } catch (e) {
      error = String(e);
    }
  }

  async function createProject(name: string, parent_id: string | null = null) {
    try {
      await api.upsertProject({
        id: newId(),
        name,
        color: "#c97b6e",
        parent_id: parent_id ?? null,
        created_at: nowIso(),
        updated_at: nowIso(),
      });
      await refresh();
    } catch (e) {
      error = String(e);
    }
  }

  async function updateProject(id: string, name: string) {
    try {
      const existing = projects.find((p) => p.id === id);
      if (!existing) return;
      await api.upsertProject({
        ...existing,
        name,
        updated_at: nowIso(),
      });
      await refresh();
    } catch (e) {
      error = String(e);
    }
  }

  async function deleteProject(id: string) {
    if (!confirm(t.sidebar.deleteListConfirm)) return;
    try {
      await api.deleteProject(id);
      if (selectedProject === id) selectedProject = null;
      await refresh();
    } catch (e) {
      error = String(e);
    }
  }

  function selectTask(task: TaskWithTags) {
    selectedTask = task;
  }

  function closePanel() {
    selectedTask = null;
  }

  function onPanelChanged() {
    void refresh();
  }

  // 一键开始专注(v1:navigate + autostart):引擎先弃当前会话再开新专注,
  // 会话全程由引擎驱动(修复旧实现 dispatch 无人监听的事件 + 孤儿会话行)
  async function startTask(task: TaskWithTags) {
    try {
      await startWithTask(task);
      navigate("/timer");
    } catch (e) {
      error = String(e);
    }
  }

  async function quickAddTask(data: {
    title: string;
    project_id?: string | null;
    priority: Priority;
    due_date?: string | null;
    estimated_pomodoros: number;
    pomodoro_duration: number;
    reminder?: Reminder | null;
    repeat?: Repeat | null;
    repeat_config?: string | null;
    tag_ids: string[];
  }) {
    const due = data.due_date ?? (filter === "tomorrow" ? tomorrowStr() : todayStr());
    try {
      const taskId = newId();
      // tagIds 随任务原子提交(v1 TaskCreate 语义):
      // 后端先链标签再生成重复实例,实例才能复制到模板标签
      await api.upsertTask(
        {
          id: taskId,
          title: data.title,
          description: "",
          project_id: data.project_id ?? selectedProject,
          priority: data.priority,
          status: "active",
          due_date: hasTimePart(due) ? due : `${due}T00:00:00`,
          estimated_pomodoros: data.estimated_pomodoros,
          completed_pomodoros: 0,
          pomodoro_duration: data.pomodoro_duration,
          reminder: data.reminder ?? "none",
          repeat: data.repeat ?? "none",
          repeat_parent_id: null,
          repeat_end_date: null,
          repeat_config: data.repeat_config ?? null,
          completed_at: null,
          created_at: nowIso(),
          updated_at: nowIso(),
        },
        data.tag_ids,
      );
      await refresh();
    } catch (e) {
      error = String(e);
    }
  }

  // 导出 .xlsx(v1 exportTasksToExcel:9 列本地化 + Rust 侧排版)。
  async function handleExportPlanned() {
    try {
      const path = await save({
        defaultPath: `${t.export.fileName}_${todayStr()}.xlsx`,
        filters: [{ name: "xlsx", extensions: ["xlsx"] }],
      });
      if (!path) return; // 用户取消
      const headers = [
        t.export.index,
        t.export.title,
        t.export.project,
        t.export.priority,
        t.export.dueDate,
        t.export.estimated,
        t.export.tags,
        t.export.subtasks,
        t.export.status,
      ];
      const rows = filtered.map((task) => ({
        title: task.title,
        project: projects.find((p) => p.id === task.project_id)?.name ?? "",
        priority: t.priority[task.priority ?? "none"] ?? task.priority ?? "",
        dueDate: task.due_date ? task.due_date.slice(0, 10) : "",
        // v1 只导 estimated(数字单元格)
        estimated: task.estimated_pomodoros ?? 0,
        tags: (task.tags ?? []).map((x) => x.name).join(", "),
        subtasks: (task.subtasks ?? []).map((s) => s.title).join("\n"),
        status:
          task.status === "completed" ? t.export.statusCompleted : t.export.statusActive,
      }));
      await api.exportTasksXlsx(path, t.nav.tasks, headers, rows);
    } catch (e) {
      error = String(e);
    }
  }
</script>

<svelte:head>
  <title>{t.page.tasks}</title>
</svelte:head>

<div class="page">
  <!-- 左：ProjectSidebar -->
  <ProjectSidebar
    {projects}
    {filter}
    {selectedProject}
    onSetFilter={(f) => {
      filter = f;
      searchQuery = "";
    }}
    onSelectProject={(id) => {
      selectedProject = id;
      searchQuery = "";
    }}
    onCreateProject={createProject}
    onUpdateProject={updateProject}
    onDeleteProject={deleteProject}
    search={searchQuery}
    onSearchChange={(v) => {
      searchQuery = v;
      if (v.trim()) {
        selectedProject = null;
        filter = "";
      }
    }}
    tasks={tasks}
  />

  <!-- 中：主内容 -->
  <div class="main">
    {#if filter === "journal"}
      <JournalView
        year={journalYear}
        month={journalMonth}
        tasks={filtered}
        onYearChange={(y) => (journalYear = y)}
        onMonthChange={(m) => (journalMonth = m)}
        onReviewChange={() => (reviewVersion += 1)}
        onTasksChange={() => void refresh()}
      />
    {:else}
      <div class="inner">
        <!-- 标题 -->
        {#if filterTitle}
          <h1 class="title">{filterTitle}</h1>
        {/if}

        <!-- 统计卡：已完成用 3 卡，否则 4 卡 -->
        {#if filter === "completed"}
          <div class="stats-3">
            <StatCard
              icon={Clock as any}
              label={t.task.statFocused}
              value={stats.focusedMinutes}
              unit={t.stats.unitMin}
              accent
            />
            <StatCard
              icon={Target as any}
              label={t.task.statCompletedPomo}
              value={stats.completedPomodoros}
              unit={t.stats.unitCount}
              accent
            />
            <StatCard
              icon={CircleCheck as any}
              label={t.task.statCompleted}
              value={stats.completedCount}
              unit={t.stats.unitCount}
              accent
            />
          </div>
        {:else}
          <div class="stats-4">
            <StatCard
              icon={Clock as any}
              label={t.task.statEstimated}
              value={stats.estimatedMinutes}
              unit={t.stats.unitMin}
              accent
            />
            <StatCard
              icon={Target as any}
              label={t.task.statActive}
              value={stats.activeCount}
              unit={t.stats.unitCount}
              accent
            />
            <StatCard
              icon={ChartColumn as any}
              label={t.task.statFocused}
              value={stats.focusedMinutes}
              unit={t.stats.unitMin}
              accent
            />
            <StatCard
              icon={CircleCheck as any}
              label={t.task.statCompleted}
              value={stats.completedCount}
              unit={t.stats.unitCount}
              accent
            />
          </div>
        {/if}

        <!-- 筛选条：completed / planned 共用 -->
        {#if filter === "completed"}
          <FilterBar
            {projects}
            {tags}
            filterProject={completedFilterProject}
            setFilterProject={(v) => (completedFilterProject = v)}
            filterTag={completedFilterTag}
            setFilterTag={(v) => (completedFilterTag = v)}
            filterPriority={completedFilterPriority}
            setFilterPriority={(v) => (completedFilterPriority = v)}
            filterPreset={completedFilterPreset}
            setFilterPreset={(v) => (completedFilterPreset = v)}
            filterStartDate={completedFilterStartDate}
            setFilterStartDate={(v) => (completedFilterStartDate = v)}
            filterEndDate={completedFilterEndDate}
            setFilterEndDate={(v) => (completedFilterEndDate = v)}
          />
        {:else if filter === "planned"}
          <FilterBar
            {projects}
            {tags}
            filterProject={plannedFilterProject}
            setFilterProject={(v) => (plannedFilterProject = v)}
            filterTag={plannedFilterTag}
            setFilterTag={(v) => (plannedFilterTag = v)}
            filterPriority={plannedFilterPriority}
            setFilterPriority={(v) => (plannedFilterPriority = v)}
            filterPreset={plannedFilterPreset}
            setFilterPreset={(v) => (plannedFilterPreset = v)}
            filterStartDate={plannedFilterStartDate}
            setFilterStartDate={(v) => (plannedFilterStartDate = v)}
            filterEndDate={plannedFilterEndDate}
            setFilterEndDate={(v) => (plannedFilterEndDate = v)}
            onExport={handleExportPlanned}
          />
        {/if}

        <!-- 快速添加：completed 视图隐藏 -->
        {#if filter !== "completed"}
          <TaskForm
            {projects}
            {tags}
            defaultProjectId={selectedProject}
            defaultDueDate={filter === "tomorrow" ? tomorrowStr() : todayStr()}
            onAdd={quickAddTask}
          />
        {/if}

        {#if error}
          <div class="error" role="alert">
            <span>⚠ {error}</span>
            <button onclick={() => (error = null)}>×</button>
          </div>
        {/if}

        {#if loading}
          <p class="loading">{t.common.loading}</p>
        {:else if filtered.length === 0}
          <p class="empty">
            {#if tasks.length === 0}
              {t.task.emptyAll}
            {:else}
              {t.task.emptyFiltered}
            {/if}
          </p>
        {:else if filter === "week" || filter === "planned" || filter === "completed"}
          <GroupedTaskList
            tasks={filtered}
            groupBy={filter === "completed" ? "completed_at" : "due_date"}
            {selectedTask}
            onToggle={toggleStatus}
            onSelect={selectTask}
            onStart={startTask}
          />
        {:else}
          <div class="task-list">
            {#each filtered as task (task.id)}
              <TaskItem
                {task}
                selected={selectedTask?.id === task.id}
                onToggle={() => toggleStatus(task)}
                onSelect={selectTask}
                onStart={startTask}
              />
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </div>

  <!-- 右：手账模式为月度复盘面板，其余为任务详情 -->
  {#if filter === "journal"}
    <MonthReviewPanel year={journalYear} month={journalMonth} {reviewVersion} />
  {:else if selectedTask}
    <TaskDetailPanel
      task={selectedTask}
      {projects}
      allTags={tags}
      onClose={closePanel}
      onChanged={onPanelChanged}
    />
  {/if}
</div>

<style>
  .page {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 100%;
    width: 100%;
  }

  .main {
    flex: 1;
    min-width: 0;
    overflow-y: auto;
    padding: 1.5rem 2rem 2rem;
  }
  .inner {
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text, #1f1d1b);
  }

  .stats-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  .stats-4 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  @media (min-width: 640px) {
    .stats-4 {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .task-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .loading,
  .empty {
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
</style>