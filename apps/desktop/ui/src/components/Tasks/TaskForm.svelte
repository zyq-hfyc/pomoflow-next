<script lang="ts">
  // 任务快速添加表单 —— 与 v1 TaskForm.tsx 对齐。
  //
  // 字段:
  //   - 必填 title(顶部文本框)
  //   - 6 个番茄图标:点击第 N 个 → 前 N 个亮起 → estimated_pomodoros = N
  //   - "更多"按钮展开详情:清单 / 优先级 / 截止日期 / 预计番茄 / 提醒 / 重复 / 标签
  //   - 提醒:选了非"不提醒" → 必须含时间(否则弹错;用户二次提交时自动补当前时间)
  //   - 重复:选了"自定义" → 弹 RepeatCustomDialog 编辑 repeat_config
  //
  // 与 v1 差异:
  //   - id / due_date / repeat / reminder 等用后端 snake_case 直接传(前端 mirror api.ts)。
  //   - onAdd 把整张 task(包括新生成的 id / timestamps)交给父组件上送。

  import { Plus } from "lucide-svelte";
  import { untrack } from "svelte";
  import TomatoIcon from "../ui/TomatoIcon.svelte";
  import RepeatCustomDialog from "./RepeatCustomDialog.svelte";
  import { todayStr, hasTimePart, fillCurrentTime } from "../../lib/dueDate";
  import { projectTreeOptions } from "../../lib/projectTree";
  import { getSettings } from "../../lib/settings.svelte";
  import { getDict } from "../../lib/i18n.svelte";
  import type { Dict } from "../../lib/i18n";
  import type { Project, Tag, Priority, Reminder, Repeat } from "../../lib/api";

  const t = $derived(getDict());

  // value 与 Rust `Reminder` serde(snake_case)输出一一对应:
  // Minutes5 → "minutes5"(无下划线),以此类推
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

  // v2 Rust serde 值 → v1 词典 enum 键(v1 词典键形如 '' / '5m' / 'weekday')
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

  type ReminderValue = (typeof REMINDER_OPTIONS)[number]["value"];
  type RepeatValue = (typeof REPEAT_OPTIONS)[number]["value"];
  // options 的 value 就是 Rust enum 的 serde 输出,与 api.ts 的类型一致:
  const _optionsMatchApi: ReminderValue = "none" satisfies Reminder;
  const _repeatOptionsMatchApi: RepeatValue = "none" satisfies Repeat;
  void _optionsMatchApi;
  void _repeatOptionsMatchApi;

  interface AddData {
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
  }

  interface Props {
    projects: Project[];
    tags: Tag[];
    defaultProjectId?: string | null;
    defaultDueDate?: string;
    onAdd: (data: AddData) => Promise<void> | void;
  }

  let { projects, tags, defaultProjectId, defaultDueDate, onAdd }: Props = $props();

  let settings = $derived(getSettings());

  let title = $state("");
  let projectId = $state<string | null>(untrack(() => defaultProjectId ?? null));
  let priority = $state<Priority>("medium");
  let dueDate = $state(untrack(() => defaultDueDate || todayStr()));
  let estimated = $state(0);
  let reminder = $state<ReminderValue>("none");
  let repeat = $state<RepeatValue>("none");
  let repeatConfig = $state<string | null>(null);
  let repeatDialogOpen = $state(false);
  let selectedTags = $state<string[]>(untrack(() => tags.length > 0 ? [tags[0].id] : []));
  let showDetails = $state(false);
  let error = $state("");
  let timeWarning = $state(false);

  $effect(() => {
    projectId = defaultProjectId ?? null;
  });

  $effect(() => {
    dueDate = defaultDueDate || todayStr();
  });

  $effect(() => {
    if (tags.length > 0 && selectedTags.length === 0) {
      selectedTags = [tags[0].id];
    }
  });

  async function submit() {
    const trimmed = title.trim();
    if (!trimmed) {
      error = t.form.needTitle;
      return;
    }
    let finalDue = dueDate || todayStr();
    if (reminder !== "none") {
      if (!hasTimePart(finalDue)) {
        if (!timeWarning) {
          timeWarning = true;
          error = t.form.needTimeForReminder;
          return;
        }
        finalDue = fillCurrentTime(finalDue);
      }
    }
    timeWarning = false;
    error = "";
    try {
      await onAdd({
        title: trimmed,
        project_id: projectId,
        priority,
        due_date: finalDue,
        estimated_pomodoros: estimated > 0 ? estimated : 1,
        pomodoro_duration: settings.focusDuration,
        reminder: reminder === "none" ? null : reminder,
        repeat: repeat === "none" ? null : repeat,
        repeat_config: repeat === "custom" ? repeatConfig : null,
        tag_ids: selectedTags,
      });
      // 重置
      title = "";
      projectId = defaultProjectId ?? null;
      priority = "medium";
      dueDate = defaultDueDate || todayStr();
      estimated = 0;
      reminder = "none";
      timeWarning = false;
      repeat = "none";
      repeatConfig = null;
      selectedTags = tags.length > 0 ? [tags[0].id] : [];
      showDetails = false;
    } catch (e) {
      error = String(e);
    }
  }

  function onSubmit(e: Event) {
    e.preventDefault();
    void submit();
  }

  function toggleShowDetails() {
    if (!showDetails) {
      if (!hasTimePart(dueDate)) dueDate = fillCurrentTime(dueDate);
    }
    showDetails = !showDetails;
  }
</script>

<form class="task-form" onsubmit={onSubmit}>
  <div class="row-top">
    <Plus size={16} class="plus-icon" />
    <input
      type="text"
      bind:value={title}
      placeholder={t.form.titlePlaceholder}
      class="title-input"
    />
    <div class="tomatoes" role="group" aria-label={t.form.pomodoroIcons}>
      {#each Array.from({ length: 6 }, (_, i) => i + 1) as n}
        {@const filled = estimated >= n}
        <button
          type="button"
          class="tomato-btn"
          class:filled
          aria-label={`${n} ${t.form.pomodoroUnit}`}
          aria-pressed={filled}
          onclick={() => (estimated = n)}
        >
          <TomatoIcon size={14} {filled} />
        </button>
      {/each}
    </div>
    <button type="button" class="more-btn" onclick={toggleShowDetails}>
      {showDetails ? t.form.collapse : t.form.more}
    </button>
  </div>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  {#if showDetails}
    <div class="details">
      <div class="field">
        <label for="tf-proj">{t.filter.project}</label>
        <select
          id="tf-proj"
          value={projectId ?? ""}
          onchange={(e) => {
            const v = (e.currentTarget as HTMLSelectElement).value;
            projectId = v || null;
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

      <div class="field">
        <label for="tf-pri">{t.filter.priority}</label>
        <select
          id="tf-pri"
          value={priority}
          onchange={(e) => {
            priority = (e.currentTarget as HTMLSelectElement).value as Priority;
          }}
        >
          <option value="high">{t.priority.high}</option>
          <option value="medium">{t.priority.medium}</option>
          <option value="low">{t.priority.low}</option>
          <option value="none">{t.priority.none}</option>
        </select>
      </div>

      <div class="field">
        <label for="tf-due">{t.filter.dueDate}</label>
        <input
          id="tf-due"
          type="datetime-local"
          bind:value={dueDate}
          oninput={(e) => {
            // v1 TaskForm:234-239 —— 选完日期+时间(长度 16)自动 blur 关闭原生日历弹窗
            if ((e.currentTarget as HTMLInputElement).value.length === 16) {
              (e.currentTarget as HTMLInputElement).blur();
            }
          }}
        />
      </div>

      <div class="field">
        <label for="tf-est">{t.form.estimatedPomo}</label>
        <input
          id="tf-est"
          type="number"
          min="1"
          max="20"
          bind:value={estimated}
        />
      </div>

      <div class="field">
        <label for="tf-remind">{t.task.detailReminder}</label>
        <select
          id="tf-remind"
          bind:value={reminder}
          onchange={() => (timeWarning = false)}
        >
          {#each REMINDER_OPTIONS as opt (opt.value)}
            <option value={opt.value}>{reminderLabel(opt.value)}</option>
          {/each}
        </select>
      </div>

      <div class="field">
        <label for="tf-repeat">{t.task.detailRepeat}</label>
        <select
          id="tf-repeat"
          bind:value={repeat}
          onchange={(e) => {
            const v = (e.currentTarget as HTMLSelectElement).value as RepeatValue;
            if (v === "custom") {
              repeatDialogOpen = true;
            } else {
              repeatConfig = null;
            }
          }}
        >
          {#each REPEAT_OPTIONS as opt (opt.value)}
            <option value={opt.value}>{repeatLabel(opt.value)}</option>
          {/each}
        </select>
      </div>

      {#if tags.length > 0}
        <div class="field full">
          <span class="lbl-blk">{t.filter.tag}</span>
          <div class="tag-chips">
            {#each tags as tag (tag.id)}
              {@const isOn = selectedTags.includes(tag.id)}
              <button
                type="button"
                class="chip"
                class:on={isOn}
                aria-pressed={isOn}
                onclick={() =>
                  (selectedTags = isOn
                    ? selectedTags.filter((id) => id !== tag.id)
                    : [...selectedTags, tag.id])}
              >
                {tag.name}
              </button>
            {/each}
          </div>
        </div>
      {/if}

      <div class="actions">
        <button type="button" class="submit-btn" onclick={submit}>{t.form.submit}</button>
      </div>
    </div>
  {/if}

  <RepeatCustomDialog
    open={repeatDialogOpen}
    initialConfig={repeatConfig}
    onConfirm={(cfg) => {
      repeatConfig = cfg;
      repeatDialogOpen = false;
    }}
    onClose={() => (repeatDialogOpen = false)}
  />
</form>

<style>
  .task-form {
    background: var(--color-surface, #fff);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-xl, 16px);
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  }

  .row-top {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  :global(.plus-icon) {
    color: var(--color-text-muted, #6b6864);
    flex-shrink: 0;
  }

  .title-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--color-text, #1f1d1b);
    font-size: 0.875rem;
    padding: 0.25rem 0;
  }
  .title-input::placeholder {
    color: var(--color-text-muted, #9ca3af);
  }

  .tomatoes {
    display: flex;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
  }

  .tomato-btn {
    padding: 2px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #d1d5db;
    transition: color 0.12s;
  }
  .tomato-btn.filled {
    color: var(--color-accent, #e74c3c);
  }
  .tomato-btn:hover {
    color: color-mix(in srgb, var(--color-accent, #e74c3c) 60%, #d1d5db);
  }

  .more-btn {
    color: var(--color-text-muted, #6b6864);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    border-radius: 6px;
  }
  .more-btn:hover {
    color: var(--color-text, #1f1d1b);
  }

  .error {
    color: var(--color-accent, #e74c3c);
    font-size: 0.75rem;
    padding: 0 0.25rem;
  }

  .details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    font-size: 0.875rem;

  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .field.full {
    grid-column: span 2;
  }
  .field label,
  .field .lbl-blk {
    color: var(--color-text-muted, #6b6864);
    font-size: 0.75rem;
  }
  .field select,
  .field input[type="datetime-local"],
  .field input[type="number"] {
    width: 100%;
    background: color-mix(in srgb, var(--color-bg, #fafaf7) 50%, transparent);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-lg, 12px);
    padding: 0.375rem 0.5rem;
    font-size: 0.875rem;
    color: var(--color-text, #1f1d1b);
    box-sizing: border-box;
  }
  .field select:focus,
  .field input:focus {
    outline: none;
    border-color: var(--color-accent, #e74c3c);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent, #e74c3c) 12%, transparent);
  }

  .tag-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .chip {
    font-size: 0.75rem;
    padding: 0.25rem 0.7rem;
    border-radius: 999px;
    border: 1px solid var(--color-border, #e5e2dd);
    background: transparent;
    color: var(--color-text-muted, #6b6864);
    cursor: pointer;
    transition: all 0.12s;
  }
  .chip:hover {
    border-color: var(--color-accent, #e74c3c);
  }
  .chip.on {
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 8%, transparent);
    border-color: var(--color-accent, #e74c3c);
    color: var(--color-accent, #e74c3c);
  }

  .actions {
    grid-column: span 2;
    display: flex;
    justify-content: flex-end;
  }
  .submit-btn {
    background: var(--color-accent, #e74c3c);
    color: #fff;
    border: none;
    padding: 0.375rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    border-radius: var(--radius-lg, 12px);
    transition: background 0.12s;
  }
  .submit-btn:hover {
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 85%, #000);
  }
</style>