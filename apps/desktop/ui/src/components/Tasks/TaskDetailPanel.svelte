<script lang="ts">
  // 任务详情侧边面板 —— v1 `TaskDetailPanel.tsx` 结构一比一复刻。
  //
  // 自上而下(与 v1 完全一致):
  //   1. 头部:优先级色点 + 标题输入(失焦保存) + 关闭 ×
  //   2. 标签:已选彩色 chip / 「无标签」 + 「编辑标签/收起」开关 + 复选列表
  //   3. 信息行 ×6:优先级 / 番茄钟(completed/N=分钟) / 到期日 / 清单(树形)
  //                / 提醒(缺时间自动补) / 重复(含自定义弹窗)
  //   4. 子任务列表(勾选 + 铅笔/垃圾桶)+ 添加输入(Enter)
  //   5. 备注 textarea(失焦保存)
  //   6. 右下角小号「删除任务」文字链(垃圾桶图标,v1 无确认框)
  //
  // 面板为全高列(320px + 左边框),与左侧列表区同高对齐,内部滚动。

  import { untrack } from "svelte";
  // RepeatIcon:lucide 的 Repeat 图标,避开 api 的 Repeat 类型重名
  import { X, Clock, Calendar, Bell, Repeat as RepeatIcon, Plus, Trash2, List } from "lucide-svelte";
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

  // === title / note 草稿(IME 安全:输入只改本地,失焦才提交) ===
  let titleDraft = $state(untrack(() => task.title));
  let noteDraft = $state(untrack(() => task.description ?? ""));
  let dueDraft = $state(untrack(() => toLocal(task.due_date)));

  $effect(() => {
    // task 切换 → 重置草稿
    titleDraft = task.title;
    noteDraft = task.description ?? "";
    dueDraft = toLocal(task.due_date);
  });

  function nowIso(): string {
    return new Date().toISOString();
  }

  // === 字段持久化(单个 patch) ===
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

  async function commitNote() {
    if (noteDraft === (task.description ?? "")) return;
    await patchTask({ description: noteDraft });
  }

  async function commitDueDate() {
    const iso = toIsoUtc(dueDraft);
    if (iso === task.due_date) return;
    await patchTask({ due_date: iso });
  }

  // === 标签(v1:chips 展示 + 编辑开关 + 复选列表) ===
  let selectedTagIds = $state<string[]>([]);
  let editingTags = $state(false);

  $effect(() => {
    void loadTagsForTask();
  });

  async function loadTagsForTask() {
    try {
      const tags = await api.listTagsForTask(task.id);
      selectedTagIds = tags.map((x) => x.id);
    } catch (e) {
      console.error("load tags failed", e);
    }
  }

  // v1 toggleTag:构造下一版 id 集合 → 整体提交
  async function toggleTag(tagId: string) {
    const prev = selectedTagIds;
    const next = prev.includes(tagId)
      ? prev.filter((id) => id !== tagId)
      : [...prev, tagId];
    selectedTagIds = next;
    try {
      await api.setTagsForTask(task.id, next);
      onChanged();
    } catch (e) {
      selectedTagIds = prev;
      alert(fmt(t.task.setTagsFailed, { err: String(e) }));
    }
  }

  const selectedTags = $derived(
    selectedTagIds
      .map((id) => allTags.find((x) => x.id === id))
      .filter((x): x is Tag => Boolean(x)),
  );

  // === 子任务 ===
  let subtasks = $state<ApiSubTask[]>([]);
  let subtaskInput = $state("");

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
    const title = subtaskInput.trim();
    if (!title) return;
    subtaskInput = "";
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

  // === 删除任务(v1:右下角文字链,无确认框) ===
  async function deleteTask() {
    try {
      await api.deleteTask(task.id);
      onClose();
      onChanged();
    } catch (e) {
      alert(fmt(t.task.saveFailed, { err: String(e) }));
    }
  }

  // === reminder / repeat 选项(value 与 Rust serde snake_case 对应) ===
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

  // === repeat:自定义规则弹窗 ===
  let repeatDialogOpen = $state(false);

  // === 预计番茄数(v1:completed/ N = N 分钟) ===
  const settings = $derived(getSettings());
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

  // === 提醒变更:due 缺时间 → 补当前时间并提示(v1:101-114) ===
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

  // === 优先级色点(v1 PRIORITY_COLORS) ===
  const PRIORITY_COLORS: Record<string, string> = {
    high: "var(--color-priority-high, #c97b6e)",
    medium: "var(--color-priority-medium, #d4a373)",
    low: "var(--color-priority-low, #a8a298)",
    none: "var(--color-neutral-400, #a8a298)",
  };
</script>

<aside class="panel" aria-label={t.task.detailPanelAria}>
  <!-- 1. 头部:优先级点 + 标题 + 关闭 -->
  <div class="head">
    <div class="head-left">
      <span class="pri-dot" style="background-color: {PRIORITY_COLORS[task.priority] ?? PRIORITY_COLORS.none}"></span>
      <input
        class="title-input"
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
    </div>
    <button class="close" onclick={onClose} aria-label={t.common.close}>
      <X size={18} />
    </button>
  </div>

  <!-- 2. 标签 -->
  <div class="tags">
    {#if selectedTags.length > 0}
      <div class="tag-chips">
        {#each selectedTags as tag (tag.id)}
          <span class="tag-chip" style="background-color: {tag.color}">{tag.name}</span>
        {/each}
      </div>
    {:else}
      <span class="no-tags">{t.task.detailNoTags}</span>
    {/if}
    <button type="button" class="tags-toggle" onclick={() => (editingTags = !editingTags)}>
      {editingTags ? t.task.detailCollapse : t.task.detailEditTags}
    </button>
    {#if editingTags}
      <div class="tags-editor">
        {#each allTags as tag (tag.id)}
          <label class="tags-editor-row">
            <input
              type="checkbox"
              checked={selectedTagIds.includes(tag.id)}
              onchange={() => void toggleTag(tag.id)}
            />
            <span class="tag-dot" style="background-color: {tag.color}"></span>
            <span>{tag.name}</span>
          </label>
        {/each}
        {#if allTags.length === 0}
          <div class="no-tags">{t.task.detailNoTagsAvailable}</div>
        {/if}
      </div>
    {/if}
  </div>

  <!-- 3. 信息行 -->
  <div class="rows">
    <!-- 优先级 -->
    <div class="row">
      <span class="row-label">
        <span
          class="pri-swatch"
          style="background-color: {PRIORITY_COLORS[task.priority] ?? PRIORITY_COLORS.none}"
        ></span>
        {t.task.detailPriority}
      </span>
      <select
        class="ctrl"
        value={task.priority}
        onchange={(e) => {
          const v = (e.currentTarget as HTMLSelectElement).value as Priority;
          void patchTask({ priority: v });
        }}
      >
        <option value="high">{t.priority.high}</option>
        <option value="medium">{t.priority.medium}</option>
        <option value="low">{t.priority.low}</option>
        <option value="none">{t.priority.none}</option>
      </select>
    </div>

    <!-- 番茄钟 -->
    <div class="row">
      <span class="row-label">
        <Clock size={16} />
        {t.task.detailPomodoro}
      </span>
      <span class="ctrl-group">
        <span class="pomo-done">{task.completed_pomodoros}/</span>
        <input
          class="pomo-input"
          type="number"
          min="1"
          max="99"
          value={task.estimated_pomodoros}
          onchange={onEstimatedChange}
        />
        <span class="pomo-minutes">= {estimatedMinutes}{t.task.minute}</span>
      </span>
    </div>

    <!-- 到期日 -->
    <div class="row">
      <span class="row-label">
        <Calendar size={16} />
        {t.task.detailDueDate}
      </span>
      <input
        class="ctrl ctrl-bare"
        type="datetime-local"
        bind:value={dueDraft}
        oninput={(e) => {
          // 选完日期+时间后自动关闭原生日历弹窗(v1:243-248)
          if ((e.currentTarget as HTMLInputElement).value.length === 16) {
            (e.currentTarget as HTMLInputElement).blur();
          }
        }}
        onblur={commitDueDate}
      />
    </div>

    <!-- 清单 -->
    <div class="row">
      <span class="row-label">
        <List size={16} />
        {t.task.detailProject}
      </span>
      <select
        class="ctrl"
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

    <!-- 提醒 -->
    <div class="row">
      <span class="row-label">
        <Bell size={16} />
        {t.task.detailReminder}
      </span>
      <select
        class="ctrl"
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

    <!-- 重复 -->
    <div class="row">
      <span class="row-label">
        <RepeatIcon size={16} />
        {t.task.detailRepeat}
      </span>
      <select
        class="ctrl"
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
  </div>

  <!-- 4. 子任务 -->
  <div class="subtasks">
    {#each subtasks as s (s.id)}
      <SubTaskItem subtask={s} onChange={updateSubtask} onDelete={removeSubtask} />
    {/each}
    <div class="sub-add">
      <Plus size={14} class="sub-add-icon" />
      <input
        type="text"
        bind:value={subtaskInput}
        onkeydown={(e) => {
          if (e.key === "Enter" && subtaskInput.trim()) {
            e.preventDefault();
            void addSubtask();
          }
        }}
        placeholder={t.task.detailAddSubtask}
        aria-label={t.task.newSubtaskAria}
      />
    </div>
  </div>

  <!-- 5. 备注 -->
  <div class="notes">
    <textarea
      bind:value={noteDraft}
      onblur={commitNote}
      rows="3"
      placeholder={t.task.detailAddNote}
    ></textarea>
  </div>

  <!-- 6. 删除(右下角文字链) -->
  <div class="del-wrap">
    <button type="button" class="del-btn" onclick={() => void deleteTask()}>
      <Trash2 size={14} />
      {t.task.detailDelete}
    </button>
  </div>

  <!-- 重复:自定义规则弹窗 -->
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
  /* v1:全高列(w-80 + border-l + 内部滚动),不是悬浮卡片 —— 与左侧列表区对齐 */
  .panel {
    width: 320px;
    flex-shrink: 0;
    height: 100%;
    overflow-y: auto;
    border-left: 1px solid var(--color-border, #e5e2dd);
    background: var(--color-surface, #fff);
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .head-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    min-width: 0;
  }
  .pri-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .title-input {
    flex: 1;
    min-width: 0;
    font-weight: 600;
    color: var(--color-text, #1f1d1b);
    outline: none;
    background: transparent;
    border: none;
    font-size: 0.95rem;
    font-family: inherit;
  }
  .close {
    background: transparent;
    border: none;
    color: var(--color-text-muted, #6b6864);
    cursor: pointer;
    padding: 0.15rem;
    display: inline-flex;
  }
  .close:hover {
    color: var(--color-text, #1f1d1b);
  }

  /* 标签 */
  .tags {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .tag-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }
  .tag-chip {
    display: inline-flex;
    align-items: center;
    padding: 0.1rem 0.5rem;
    border-radius: 999px;
    font-size: 0.75rem;
    color: #fff;
  }
  .no-tags {
    font-size: 0.75rem;
    color: var(--color-text-muted, #6b6864);
  }
  .tags-toggle {
    font-size: 0.75rem;
    color: var(--color-text-muted, #6b6864);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  .tags-toggle:hover {
    color: var(--color-text, #1f1d1b);
  }
  .tags-editor {
    width: 100%;
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-md, 8px);
    padding: 0.5rem;
    max-height: 10rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .tags-editor-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    cursor: pointer;
    color: var(--color-text, #1f1d1b);
  }
  .tags-editor-row input[type="checkbox"] {
    accent-color: var(--color-accent, #e74c3c);
  }
  .tag-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* 信息行(v1:py-2 + 底部细线分隔) */
  .rows {
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid color-mix(in srgb, var(--color-border, #e5e2dd) 50%, transparent);
    gap: 0.5rem;
  }
  .row-label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-text-muted, #6b6864);
  }
  .pri-swatch {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid var(--color-border, #e5e2dd);
  }
  .ctrl {
    font-size: 0.85rem;
    color: var(--color-text, #1f1d1b);
    background: var(--color-bg, #fafaf7);
    border: none;
    border-radius: var(--radius-md, 8px);
    padding: 0.15rem 0.5rem;
    cursor: pointer;
    flex-shrink: 0;
    max-width: 180px;
  }
  .ctrl:focus {
    outline: 1px solid var(--color-accent, #e74c3c);
  }
  /* 到期日:v1 为透明背景右对齐,无框 */
  .ctrl-bare {
    background: transparent;
    color: var(--color-text, #1f1d1b);
    text-align: right;
    cursor: text;
  }
  .ctrl-group {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--color-text, #1f1d1b);
    flex-shrink: 0;
  }
  .pomo-done {
    font-size: 0.875rem;
  }
  .pomo-input {
    width: 2.5rem;
    text-align: right;
    outline: none;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--color-border, #e5e2dd);
    font-size: 0.875rem;
    color: var(--color-text, #1f1d1b);
  }
  .pomo-input:focus {
    border-bottom-color: var(--color-accent, #e74c3c);
  }
  .pomo-minutes {
    color: var(--color-text-muted, #6b6864);
    font-size: 0.75rem;
    margin-left: 0.25rem;
  }

  /* 子任务 */
  .subtasks {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .sub-add {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  .sub-add-icon {
    color: var(--color-text-muted, #6b6864);
    flex-shrink: 0;
  }
  .sub-add input {
    flex: 1;
    font-size: 0.875rem;
    color: var(--color-text, #1f1d1b);
    outline: none;
    background: transparent;
    border: none;
    font-family: inherit;
  }
  .sub-add input::placeholder {
    color: var(--color-text-muted, #6b6864);
  }

  /* 备注 */
  .notes textarea {
    width: 100%;
    font-size: 0.875rem;
    color: var(--color-text, #1f1d1b);
    outline: none;
    background: transparent;
    border: none;
    resize: none;
    font-family: inherit;
  }
  .notes textarea::placeholder {
    color: var(--color-text-muted, #6b6864);
  }

  /* 删除 */
  .del-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
  }
  .del-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: var(--color-text-muted, #6b6864);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: color 0.15s;
  }
  .del-btn:hover {
    color: var(--color-accent, #e74c3c);
  }
</style>
