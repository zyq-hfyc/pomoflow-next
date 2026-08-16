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
  import { getSettings } from "../../lib/settings.svelte";
  import type { Project, Tag, Priority } from "../../lib/api";

  const REMINDER_OPTIONS = [
    { value: "none", label: "不提醒" },
    { value: "on_time", label: "准时" },
    { value: "minutes_5", label: "提前 5 分钟" },
    { value: "minutes_30", label: "提前 30 分钟" },
    { value: "hour_1", label: "提前 1 小时" },
    { value: "day_1", label: "提前 1 天" },
    { value: "days_2", label: "提前 2 天" },
  ] as const;

  const REPEAT_OPTIONS = [
    { value: "none", label: "不重复" },
    { value: "daily", label: "每天" },
    { value: "weekdays", label: "工作日" },
    { value: "weekly", label: "每周" },
    { value: "monthly", label: "每月" },
    { value: "yearly", label: "每年" },
    { value: "custom", label: "自定义..." },
  ] as const;

  type ReminderValue = (typeof REMINDER_OPTIONS)[number]["value"];
  type RepeatValue = (typeof REPEAT_OPTIONS)[number]["value"];

  interface AddData {
    title: string;
    project_id?: string | null;
    priority: Priority;
    due_date?: string | null;
    estimated_pomodoros: number;
    pomodoro_duration: number;
    reminder?: string | null;
    repeat?: string | null;
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

  let settings = getSettings();

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

  function projectTreeOptions(): { id: string; name: string; depth: number; disabled: boolean }[] {
    const map = new Map<string, Project & { children: string[] }>();
    for (const p of projects) {
      map.set(p.id, { ...p, children: [] });
    }
    const roots: string[] = [];
    for (const p of projects) {
      if (p.parent_id && map.has(p.parent_id)) {
        map.get(p.parent_id)!.children.push(p.id);
      } else {
        roots.push(p.id);
      }
    }
    const result: { id: string; name: string; depth: number; disabled: boolean }[] = [];
    const walk = (id: string, depth: number) => {
      const node = map.get(id)!;
      const hasChildren = node.children.length > 0;
      result.push({ id: node.id, name: node.name, depth, disabled: hasChildren });
      for (const childId of node.children) walk(childId, depth + 1);
    };
    for (const rootId of roots) walk(rootId, 0);
    return result;
  }

  async function submit() {
    const trimmed = title.trim();
    if (!trimmed) {
      error = "请输入任务标题";
      return;
    }
    let finalDue = dueDate || todayStr();
    if (reminder !== "none") {
      if (!hasTimePart(finalDue)) {
        if (!timeWarning) {
          timeWarning = true;
          error = "提醒任务需要具体时间,请补充时分";
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
        pomodoro_duration: settings.focusMinutes,
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
      placeholder="任务标题..."
      class="title-input"
    />
    <div class="tomatoes" role="group" aria-label="预计番茄数">
      {#each Array.from({ length: 6 }, (_, i) => i + 1) as n}
        {@const filled = estimated >= n}
        <button
          type="button"
          class="tomato-btn"
          class:filled
          aria-label={`${n} 个番茄`}
          aria-pressed={filled}
          onclick={() => (estimated = n)}
        >
          <TomatoIcon size={14} {filled} />
        </button>
      {/each}
    </div>
    <button type="button" class="more-btn" onclick={toggleShowDetails}>
      {showDetails ? "收起" : "更多"}
    </button>
  </div>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  {#if showDetails}
    <div class="details">
      <div class="field">
        <label for="tf-proj">清单</label>
        <select
          id="tf-proj"
          value={projectId ?? ""}
          onchange={(e) => {
            const v = (e.currentTarget as HTMLSelectElement).value;
            projectId = v || null;
          }}
        >
          <option value="">无项目</option>
          {#each projectTreeOptions() as opt (opt.id)}
            <option value={opt.id} disabled={opt.disabled}>
              {"　".repeat(opt.depth)}{opt.name}
            </option>
          {/each}
        </select>
      </div>

      <div class="field">
        <label for="tf-pri">优先级</label>
        <select
          id="tf-pri"
          value={priority}
          onchange={(e) => {
            priority = (e.currentTarget as HTMLSelectElement).value as Priority;
          }}
        >
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
          <option value="none">无</option>
        </select>
      </div>

      <div class="field">
        <label for="tf-due">截止日期</label>
        <input
          id="tf-due"
          type="datetime-local"
          bind:value={dueDate}
          onblur={(e) => {
            const v = (e.currentTarget as HTMLInputElement).value;
            if (v.length === 16) {
              (e.currentTarget as HTMLInputElement).blur();
            }
          }}
        />
      </div>

      <div class="field">
        <label for="tf-est">预计番茄</label>
        <input
          id="tf-est"
          type="number"
          min="1"
          max="20"
          bind:value={estimated}
        />
      </div>

      <div class="field">
        <label for="tf-remind">提醒</label>
        <select
          id="tf-remind"
          bind:value={reminder}
          onchange={() => (timeWarning = false)}
        >
          {#each REMINDER_OPTIONS as opt (opt.value)}
            <option value={opt.value}>{opt.label}</option>
          {/each}
        </select>
      </div>

      <div class="field">
        <label for="tf-repeat">重复</label>
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
            <option value={opt.value}>{opt.label}</option>
          {/each}
        </select>
      </div>

      {#if tags.length > 0}
        <div class="field full">
          <span class="lbl-blk">标签</span>
          <div class="tag-chips">
            {#each tags as t (t.id)}
              {@const isOn = selectedTags.includes(t.id)}
              <button
                type="button"
                class="chip"
                class:on={isOn}
                aria-pressed={isOn}
                onclick={() =>
                  (selectedTags = isOn
                    ? selectedTags.filter((id) => id !== t.id)
                    : [...selectedTags, t.id])}
              >
                {t.name}
              </button>
            {/each}
          </div>
        </div>
      {/if}

      <div class="actions">
        <button type="button" class="submit-btn" onclick={submit}>添加</button>
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
    border-radius: 12px;
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
    padding-top: 0.5rem;
    border-top: 1px dashed var(--color-border, #e5e2dd);
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
    border-radius: 8px;
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
    border-radius: 8px;
    transition: background 0.12s;
  }
  .submit-btn:hover {
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 85%, #000);
  }
</style>