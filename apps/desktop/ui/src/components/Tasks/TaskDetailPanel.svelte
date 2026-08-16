<script lang="ts">
  // 任务详情侧边面板 —— 右侧滑出,展示并编辑单条任务的所有字段。
  //
  // 范围(P1.8.2):
  //   - title / description / project / priority(实时 select 改)
  //   - tags 多选(TagPicker)
  //   - due_date(datetime-local)
  //   - reminder(7 档:不提醒 / 准时 / 5 分钟 / 30 分钟 / 1 小时 / 1 天 / 2 天)
  //   - repeat(6 档:不重复 / 每天 / 工作日 / 每周 / 每月 / 每年;不含"自定义")
  //   - 子任务列表(增删改 + 完成切换)
  //
  // 设计要点:
  //   - 标题 / 描述用 draft → blur 时再 upsert,避免每个按键都打后端。
  //   - 标签 / 优先级 / 项目 / 日期 / reminder / repeat 立刻调对应 command。
  //   - 子任务用本地 state,add 后立刻 upsert + 刷新。
  //   - `onClose` 由父组件(TasksPage)接到 → 关闭面板 + 刷新列表。
  //   - 切换到另一条任务时 `$effect` 重新拉子任务 + 标签。

  import { onMount, untrack } from "svelte";
  import * as api from "../../lib/api";
  import type {
    Priority,
    Project,
    Reminder,
    Repeat,
    SubTask as ApiSubTask,
    Tag,
    Task as ApiTask,
  } from "../../lib/api";
  import { getDict, fmt } from "../../lib/i18n.svelte";
  import type { Dict } from "../../lib/i18n";
  import TagPicker from "./TagPicker.svelte";
  import SubTaskItem from "./SubTaskItem.svelte";

  const t = $derived(getDict());

  interface Props {
    task: ApiTask;
    projects: Project[];
    allTags: Tag[];
    onClose: () => void;
    onChanged: () => void;
  }

  let { task, projects, allTags, onClose, onChanged }: Props = $props();

  // === title / description 草稿 ===
  // 用 untrack 包初始值,避免 svelte-check 警告 "initial value capture"。
  // 真正的同步逻辑在下面 $effect 里(task 切换时重置)。
  let titleDraft = $state(untrack(() => task.title));
  let descDraft = $state(untrack(() => task.description ?? ""));
  let dueDraft = $state(untrack(() => toLocal(task.due_date)));

  $effect(() => {
    // task 切换 → 重置草稿
    titleDraft = task.title;
    descDraft = task.description ?? "";
    dueDraft = toLocal(task.due_date);
  });

  function toLocal(iso: string | null | undefined): string {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      if (isNaN(d.getTime())) return "";
      // datetime-local 需要 YYYY-MM-DDTHH:mm(本地时间)
      const off = d.getTimezoneOffset();
      const local = new Date(d.getTime() - off * 60000);
      return local.toISOString().slice(0, 16);
    } catch {
      return "";
    }
  }

  function toIsoUtc(local: string): string | null {
    if (!local) return null;
    try {
      const d = new Date(local);
      if (isNaN(d.getTime())) return null;
      return d.toISOString();
    } catch {
      return null;
    }
  }

  function nowIso(): string {
    return new Date().toISOString();
  }

  // === 任务字段持久化(单个 patch) ===
  async function patchTask(patch: Partial<ApiTask>) {
    try {
      await api.upsertTask({
        ...task,
        ...patch,
        updated_at: nowIso(),
      });
      onChanged();
    } catch (e) {
      console.error("patch task failed", e);
      alert(fmt(t.task.saveFailed, { err: String(e) }));
    }
  }

  async function commitTitle() {
    const next = titleDraft.trim();
    if (!next || next === task.title) return;
    await patchTask({ title: next });
  }

  async function commitDescription() {
    if (descDraft === (task.description ?? "")) return;
    await patchTask({ description: descDraft });
  }

  async function commitDueDate() {
    const iso = toIsoUtc(dueDraft);
    if (iso === task.due_date) return;
    await patchTask({ due_date: iso });
  }

  function clearDueDate() {
    dueDraft = "";
    void patchTask({ due_date: null });
  }

  // === Tags ===
  let selectedTagIds = $state<string[]>([]);

  $effect(() => {
    void loadTagsForTask();
  });

  async function loadTagsForTask() {
    try {
      const tags = await api.listTagsForTask(task.id);
      selectedTagIds = tags.map((t) => t.id);
    } catch (e) {
      console.error("load tags failed", e);
    }
  }

  async function onTagsChange(next: string[]) {
    const prev = selectedTagIds;
    selectedTagIds = next;
    try {
      await api.setTagsForTask(task.id, next);
      onChanged();
    } catch (e) {
      selectedTagIds = prev;
      alert(fmt(t.task.setTagsFailed, { err: String(e) }));
    }
  }

  // === SubTasks ===
  let subtasks = $state<ApiSubTask[]>([]);
  let newSubtask = $state("");

  $effect(() => {
    void loadSubtasks();
  });

  async function loadSubtasks() {
    try {
      subtasks = await api.listSubtasksForTask(task.id);
    } catch (e) {
      console.error("load subtasks failed", e);
    }
  }

  async function addSubtask() {
    const title = newSubtask.trim();
    if (!title) return;
    newSubtask = "";
    const draft: ApiSubTask = {
      id: crypto.randomUUID(),
      task_id: task.id,
      title,
      is_completed: false,
      position: subtasks.length,
      created_at: nowIso(),
      updated_at: nowIso(),
    };
    try {
      const saved = await api.upsertSubtask(draft);
      subtasks = [...subtasks, saved];
      onChanged();
    } catch (e) {
      alert(fmt(t.task.addSubtaskFailed, { err: String(e) }));
    }
  }

  async function updateSubtask(next: ApiSubTask) {
    const prev = subtasks.find((s) => s.id === next.id);
    subtasks = subtasks.map((s) => (s.id === next.id ? next : s));
    try {
      await api.upsertSubtask(next);
      onChanged();
    } catch (e) {
      if (prev) {
        subtasks = subtasks.map((s) => (s.id === prev.id ? prev : s));
      }
      alert(fmt(t.task.updateSubtaskFailed, { err: String(e) }));
    }
  }

  async function removeSubtask(id: string) {
    const prev = subtasks;
    subtasks = subtasks.filter((s) => s.id !== id);
    try {
      await api.deleteSubtask(id);
      onChanged();
    } catch (e) {
      subtasks = prev;
      alert(fmt(t.task.deleteSubtaskFailed, { err: String(e) }));
    }
  }

  // === 删除任务(v1 TaskDetailPanel 底部按钮) ===
  async function deleteTask() {
    try {
      await api.deleteTask(task.id);
      onClose();
      onChanged();
    } catch (e) {
      alert(fmt(t.task.saveFailed, { err: String(e) }));
    }
  }

  // === reminder / repeat 标签 ===
  // value 与 Rust `Reminder` serde(snake_case)输出一致(Minutes5 → "minutes5");
  // 展示文案查 v1 词典 enum(键形如 '' / '5m' / 'weekday'),做一层值映射
  const REMINDER_OPTIONS = [
    { value: "none" },
    { value: "on_time" },
    { value: "minutes5" },
    { value: "minutes30" },
    { value: "hour1" },
    { value: "day1" },
    { value: "days2" },
  ] as const;

  const REPEAT_OPTIONS = [
    { value: "none" },
    { value: "daily" },
    { value: "weekdays" },
    { value: "weekly" },
    { value: "monthly" },
    { value: "yearly" },
  ] as const;

  const REMINDER_DICT_KEY: Record<
    (typeof REMINDER_OPTIONS)[number]["value"],
    keyof Dict["enum"]["reminder"]
  > = {
    none: "",
    on_time: "on_time",
    minutes5: "5m",
    minutes30: "30m",
    hour1: "1h",
    day1: "1d",
    days2: "2d",
  };
  const REPEAT_DICT_KEY: Record<
    (typeof REPEAT_OPTIONS)[number]["value"],
    keyof Dict["enum"]["repeat"]
  > = {
    none: "",
    daily: "daily",
    weekdays: "weekday",
    weekly: "weekly",
    monthly: "monthly",
    yearly: "yearly",
  };

  function reminderLabel(v: (typeof REMINDER_OPTIONS)[number]["value"]): string {
    return t.enum.reminder[REMINDER_DICT_KEY[v]];
  }
  function repeatLabel(v: (typeof REPEAT_OPTIONS)[number]["value"]): string {
    return t.enum.repeat[REPEAT_DICT_KEY[v]];
  }

  function projectName(id: string | null | undefined): string {
    if (!id) return t.task.detailNoProject;
    return projects.find((p) => p.id === id)?.name ?? t.task.unknownProject;
  }

  function priorityLabel(p: Priority | null | undefined): string {
    return (
      { high: t.priority.high, medium: t.priority.medium, low: t.priority.low, none: "" }[
        p ?? "none"
      ] ?? ""
    );
  }
</script>

<aside class="panel" aria-label={t.task.detailPanelAria}>
  <header class="head">
    <div class="meta">
      <span class="proj">{projectName(task.project_id)}</span>
      {#if task.priority !== "none"}
        <span class="pri pri-{task.priority}">{priorityLabel(task.priority)}</span>
      {/if}
    </div>
    <button class="close" onclick={onClose} aria-label={t.common.close}>×</button>
  </header>

  <input
    class="title"
    bind:value={titleDraft}
    onblur={commitTitle}
    onkeydown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        (e.currentTarget as HTMLInputElement).blur();
      }
    }}
    aria-label={t.task.titleAria}
  />

  <section class="block">
    <label class="lbl" for="desc">{t.task.detailDescription}</label>
    <textarea
      id="desc"
      class="desc"
      bind:value={descDraft}
      onblur={commitDescription}
      rows="4"
      placeholder={t.task.detailDescPlaceholder}
    ></textarea>
  </section>

  <section class="block row">
    <div class="col">
      <label class="lbl" for="proj">{t.task.detailProject}</label>
      <select
        id="proj"
        value={task.project_id ?? ""}
        onchange={(e) => {
          const v = (e.currentTarget as HTMLSelectElement).value;
          void patchTask({ project_id: v || null });
        }}
      >
        <option value="">{t.task.detailNoProject}</option>
        {#each projects as p (p.id)}
          <option value={p.id}>{p.name}</option>
        {/each}
      </select>
    </div>
    <div class="col">
      <label class="lbl" for="pri">{t.task.detailPriority}</label>
      <select
        id="pri"
        value={task.priority}
        onchange={(e) => {
          const v = (e.currentTarget as HTMLSelectElement).value as Priority;
          void patchTask({ priority: v });
        }}
      >
        <option value="none">{t.priority.none}</option>
        <option value="high">{t.priority.high}</option>
        <option value="medium">{t.priority.medium}</option>
        <option value="low">{t.priority.low}</option>
      </select>
    </div>
  </section>

  <section class="block">
    <label class="lbl" for="due">{t.task.detailDueDate}</label>
    <div class="row-inline">
      <input
        id="due"
        type="datetime-local"
        bind:value={dueDraft}
        onblur={commitDueDate}
      />
      {#if dueDraft}
        <button type="button" class="link" onclick={clearDueDate}>{t.common.clear}</button>
      {/if}
    </div>
  </section>

  <section class="block row">
    <div class="col">
      <label class="lbl" for="reminder">{t.task.detailReminder}</label>
      <select
        id="reminder"
        value={task.reminder ?? "none"}
        onchange={(e) => {
          const v = (e.currentTarget as HTMLSelectElement).value as Reminder;
          void patchTask({ reminder: v });
        }}
      >
        {#each REMINDER_OPTIONS as o (o.value)}
          <option value={o.value}>{reminderLabel(o.value)}</option>
        {/each}
      </select>
    </div>
    <div class="col">
      <label class="lbl" for="repeat">{t.task.detailRepeat}</label>
      <select
        id="repeat"
        value={task.repeat ?? "none"}
        onchange={(e) => {
          const v = (e.currentTarget as HTMLSelectElement).value as Repeat;
          void patchTask({ repeat: v });
        }}
      >
        {#each REPEAT_OPTIONS as o (o.value)}
          <option value={o.value}>{repeatLabel(o.value)}</option>
        {/each}
      </select>
    </div>
  </section>

  <section class="block">
    <span class="lbl">{t.filter.tag}</span>
    <TagPicker tags={allTags} selected={selectedTagIds} onChange={onTagsChange} />
  </section>

  <section class="block">
    <span class="lbl">{t.task.detailSubtasks}</span>
    <ul class="sub-list">
      {#each subtasks as s (s.id)}
        <SubTaskItem
          subtask={s}
          onChange={updateSubtask}
          onDelete={removeSubtask}
        />
      {/each}
    </ul>
    <form
      class="sub-add"
      onsubmit={(e) => {
        e.preventDefault();
        void addSubtask();
      }}
    >
      <input
        type="text"
        bind:value={newSubtask}
        placeholder={t.task.detailAddSubtask}
        aria-label={t.task.newSubtaskAria}
      />
      <button type="submit" disabled={!newSubtask.trim()}>{t.common.add}</button>
    </form>
  </section>

  <!-- 删除任务(v1 TaskDetailPanel 底部同款) -->
  <section class="block">
    <button
      class="delete"
      onclick={() => {
        if (confirm(fmt(t.task.deleteConfirm, { title: task.title }))) {
          void deleteTask();
        }
      }}
    >
      {t.task.detailDelete}
    </button>
  </section>
</aside>

<style>
  .panel {
    width: 360px;
    flex-shrink: 0;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    padding: 1rem 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
    align-self: flex-start;
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-text-muted);
    font-size: 0.85rem;
  }
  .proj {
    padding: 0.1rem 0.5rem;
    background: var(--color-bg);
    border-radius: 999px;
  }
  .pri {
    padding: 0.1rem 0.5rem;
    border-radius: 999px;
    font-size: 0.75rem;
  }
  .pri-high { background: #fee2e2; color: #991b1b; }
  .pri-medium { background: #fef3c7; color: #92400e; }
  .pri-low { background: #dbeafe; color: #1e40af; }

  .delete {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--color-error, #c97b6e);
    border-radius: var(--radius-md, 8px);
    background: transparent;
    color: var(--color-error, #c97b6e);
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .delete:hover {
    background: var(--color-error, #c97b6e);
    color: #fff;
  }

  .close {
    background: transparent;
    border: none;
    color: var(--color-text-muted);
    font-size: 1.4rem;
    line-height: 1;
    cursor: pointer;
    padding: 0 0.4rem;
    border-radius: 4px;
  }
  .close:hover {
    color: var(--color-text);
    background: var(--color-bg);
  }

  .title {
    width: 100%;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 0.5rem 0.75rem;
    font-size: 1.05rem;
    font-weight: 600;
    background: var(--color-surface);
    color: var(--color-text);
  }
  .title:focus {
    border-color: var(--color-accent);
    outline: none;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 25%, transparent);
  }

  .block {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .lbl {
    font-size: 0.8rem;
    color: var(--color-text-muted);
    font-weight: 500;
  }
  .desc {
    width: 100%;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    background: var(--color-surface);
    color: var(--color-text);
    font-family: inherit;
    resize: vertical;
  }
  .desc:focus,
  .block select:focus,
  .block input:focus {
    border-color: var(--color-accent);
    outline: none;
  }

  .row {
    display: flex;
    gap: 0.75rem;
  }
  .col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .row-inline {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .row-inline input {
    flex: 1;
  }
  .link {
    background: transparent;
    border: none;
    color: var(--color-accent);
    cursor: pointer;
    font-size: 0.85rem;
    padding: 0;
  }
  .link:hover {
    text-decoration: underline;
  }

  .block select,
  .block input[type="datetime-local"] {
    width: 100%;
    padding: 0.4rem 0.6rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 0.9rem;
  }

  .sub-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }
  .sub-add {
    display: flex;
    gap: 0.4rem;
    margin-top: 0.5rem;
  }
  .sub-add input {
    flex: 1;
    padding: 0.35rem 0.6rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 0.85rem;
  }
  .sub-add button {
    padding: 0.35rem 0.85rem;
    background: var(--color-accent);
    color: #fff;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: 0.85rem;
  }
  .sub-add button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>