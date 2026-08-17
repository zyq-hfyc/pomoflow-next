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
  import { toLocal, toIsoUtc, hasTimePart, fillCurrentTime } from "../../lib/dueDate";
  import { projectTreeOptions } from "../../lib/projectTree";
  import { getSettings } from "../../lib/settings.svelte";
  import TagPicker from "./TagPicker.svelte";
  import SubTaskItem from "./SubTaskItem.svelte";
  import RepeatCustomDialog from "./RepeatCustomDialog.svelte";

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

  // repeat 变化会触发后端删旧实例+重生成(v1 update_task)—— 重生成读模板
  // 当前标签,故这次提交带上当前标签,保持与 v1"标签先于重生成应用"一致。
  // `cfg` 只在 custom 弹窗确认时传入;切回内置规则时保留 repeat_config(v1 行为)
  async function patchRepeat(v: Repeat, cfg?: string) {
    try {
      await api.upsertTask(
        {
          ...task,
          repeat: v,
          updated_at: nowIso(),
          ...(v === "custom" && cfg !== undefined ? { repeat_config: cfg } : {}),
        },
        selectedTagIds,
      );
      onChanged();
    } catch (e) {
      console.error("patch repeat failed", e);
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
    { value: "custom" },
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
    custom: "custom",
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

  // === repeat:自定义规则弹窗(v1 TaskDetailPanel:390-398) ===
  let repeatDialogOpen = $state(false);

  // === 预计番茄数编辑(v1 TaskDetailPanel:214-231) ===
  const settings = $derived(getSettings());
  // "= N 分钟"换算:单任务时长覆盖 > 全局专注时长(v1 用 task.pomodoro_duration,创建时已落全局值)
  const estimatedMinutes = $derived(
    task.estimated_pomodoros * (task.pomodoro_duration ?? settings.focusDuration),
  );

  function onEstimatedChange(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    const raw = Math.round(Number(input.value));
    const n = Math.min(99, Math.max(1, Number.isFinite(raw) ? raw : 1));
    if (n !== task.estimated_pomodoros) {
      void patchTask({ estimated_pomodoros: n });
    }
  }

  // === 提醒变更:due 缺时间 → 补当前时间并提示(v1 TaskDetailPanel:101-114) ===
  // v2 due_date 存 UTC RFC3339(恒含 T),"缺时间"只能在本地草稿上判断:
  // 无到期日的任务选提醒时补今天+当前时间;有到期日(已带时间)直接保存
  function onReminderChange(v: Reminder) {
    if (v === "none") {
      void patchTask({ reminder: v });
      return;
    }
    if (!hasTimePart(dueDraft)) {
      const filled = fillCurrentTime(dueDraft);
      alert(t.task.detailTimeFilled);
      dueDraft = filled;
      void patchTask({ reminder: v, due_date: toIsoUtc(filled) });
    } else {
      void patchTask({ reminder: v });
    }
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
        {#each projectTreeOptions(projects) as opt (opt.id)}
          <option value={opt.id} disabled={opt.disabled}>
            {"　".repeat(opt.depth)}{opt.name}
          </option>
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

  <!-- 预计番茄数编辑(v1 TaskDetailPanel:214-231):completed/ N = N 分钟 -->
  <section class="block">
    <label class="lbl" for="est">{t.task.detailPomodoro}</label>
    <div class="pomo-row">
      <span class="pomo-done">{task.completed_pomodoros}/</span>
      <input
        id="est"
        class="pomo-input"
        type="number"
        min="1"
        max="99"
        value={task.estimated_pomodoros}
        onchange={onEstimatedChange}
      />
      <span class="pomo-minutes">= {estimatedMinutes}{t.task.minute}</span>
    </div>
  </section>

  <section class="block">
    <label class="lbl" for="due">{t.task.detailDueDate}</label>
    <div class="row-inline">
      <input
        id="due"
        type="datetime-local"
        bind:value={dueDraft}
        oninput={(e) => {
          // 选完日期+时间后自动关闭原生日历弹窗(v1 TaskDetailPanel:243-248)
          if ((e.currentTarget as HTMLInputElement).value.length === 16) {
            (e.currentTarget as HTMLInputElement).blur();
          }
        }}
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
          onReminderChange(v);
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
          if (v === "custom") {
            repeatDialogOpen = true;
          } else {
            void patchRepeat(v);
          }
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

  <!-- 重复:自定义规则弹窗(v1 TaskDetailPanel:390-398) -->
  <RepeatCustomDialog
    open={repeatDialogOpen}
    initialConfig={task.repeat_config}
    onConfirm={(cfg) => {
      repeatDialogOpen = false;
      void patchRepeat("custom", cfg);
    }}
    onClose={() => (repeatDialogOpen = false)}
  />
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
  .pomo-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--color-text);
  }
  .pomo-done {
    font-size: 0.9rem;
  }
  .pomo-input {
    width: 3.5rem;
    text-align: right;
    padding: 0.35rem 0.5rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 0.9rem;
  }
  .pomo-input:focus {
    border-color: var(--color-accent);
    outline: none;
  }
  .pomo-minutes {
    color: var(--color-text-muted);
    font-size: 0.75rem;
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