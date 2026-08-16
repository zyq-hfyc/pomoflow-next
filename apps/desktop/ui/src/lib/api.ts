//! Tauri invoke 的类型化封装 —— 与 `apps/desktop/src/commands.rs` 一一对应。
//!
//! 设计要点:
//! - 单一 `invoke` 入口,统一错误捕获(返回 `string`,与后端 `Result<_, String>` 对齐)。
//! - 不在每处 try/catch:调用方拿到 string 错误直接 `alert` / 显示 toast 即可。
//! - 类型是 `crates/core/src/model/*` 的**精确镜像**(serde 输出 snake_case);
//!   带 `#[serde(default)]` 的字段在此标 `?` —— 响应里后端总会给,构造请求时可省。
//! - 此文件不依赖 `lib/store` 等其他模块;纯 invoke 包装,组件层自由组合。

import { invoke } from "@tauri-apps/api/core";

// === 后端 model 类型(前端 mirror) ===

export type Priority = "high" | "medium" | "low" | "none";

/** Rust `Reminder` serde(snake_case)输出 —— 注意 Minutes5 → "minutes5"(无下划线) */
export type Reminder =
  | "none"
  | "on_time"
  | "minutes5"
  | "minutes30"
  | "hour1"
  | "day1"
  | "days2";

/** Rust `Repeat` serde(snake_case)输出 */
export type Repeat =
  | "none"
  | "daily"
  | "weekdays"
  | "weekly"
  | "monthly"
  | "yearly"
  | "custom";

/** 同步元数据(Rust 侧非 Option + serde(default);构造请求时可省) */
interface SyncMeta {
  revision?: number;
  deleted_at?: string | null;
  updated_at?: string;
}

export interface Task extends SyncMeta {
  id: string;
  title: string;
  description?: string;
  project_id?: string | null;
  priority?: Priority;
  status: "active" | "completed";
  due_date?: string | null;
  estimated_pomodoros?: number;
  completed_pomodoros?: number;
  pomodoro_duration?: number | null;
  reminder?: Reminder;
  repeat?: Repeat;
  /** 自定义重复规则 JSON(仅 repeat === "custom" 有值) */
  repeat_config?: string | null;
  /** 重复实例指向模板任务;模板与普通任务为 null */
  repeat_parent_id?: string | null;
  /** 重复终止时间(模板任务上按规则计算) */
  repeat_end_date?: string | null;
  completed_at?: string | null;
  /** 创建时间(v1 created_date;列表"新建在前"排序依据) */
  created_at?: string;
}

/** `get/list/upsert/complete/reopen` 命令的实际返回(Rust TaskView flatten) */
export interface TaskView extends Task {
  tags: Tag[];
  subtasks: SubTask[];
}

export interface Project extends SyncMeta {
  id: string;
  name: string;
  color?: string;
  parent_id?: string | null;
  /** 同级排序(拖拽用,v1 display_order) */
  display_order?: number;
  created_at?: string;
}

export interface Tag extends SyncMeta {
  id: string;
  name: string;
  color?: string;
  /** 全局排序(拖拽用,v1 display_order) */
  display_order?: number;
  created_at?: string;
}

export interface PomodoroSession extends SyncMeta {
  id: string;
  task_id?: string | null;
  project_id?: string | null;
  /** 专注时长(分钟) */
  duration: number;
  started_at: string;
  ended_at: string;
  is_completed: boolean;
  created_at?: string;
}

export interface SubTask extends SyncMeta {
  id: string;
  task_id: string;
  title: string;
  is_completed: boolean;
  position: number;
  created_at?: string;
}

/** 复盘族:Rust 侧只有 id / 键 / content / updated_at(无 created_at) */
interface ReviewBase extends SyncMeta {
  content: string;
  updated_at?: string;
}

export interface DailyReview extends ReviewBase {
  id: string;
  date: string;
}

export interface WeeklyReview extends ReviewBase {
  id: string;
  week_start: string;
}

export interface MonthlyReview extends ReviewBase {
  id: string;
  year_month: string;
}

export interface Motto extends SyncMeta {
  id: string;
  text: string;
  author: string | null;
  created_at?: string;
}

/** 通知文案模板(全库单行,id 固定 "1");文案字段仅 custom 风格有值 */
export interface NotificationTemplate {
  id: string;
  style: string;
  style_description?: string | null;
  focus_end_title?: string | null;
  focus_end_body?: string | null;
  break_end_title?: string | null;
  break_end_body?: string | null;
  reminder_title?: string | null;
  reminder_body?: string | null;
  updated_at?: string;
}

export interface TaskQuery {
  project_id?: string | null;
  tag_id?: string | null;
  status?: "active" | "completed" | null;
  limit?: number | null;
  /** v1 番茄钟页右侧任务清单支持按优先级筛选 */
  priority?: Priority | null;
  /** v1 番茄钟页右侧任务清单支持按 due_date 维度筛选(today / tomorrow / this_week) */
  date?: "today" | "tomorrow" | "this_week" | null;
  /** 番茄钟页右侧任务清单限定"当月任务" */
  month_start_ms?: number | null;
  month_end_ms?: number | null;
}

// === Task ===

export const listTasks = (query: TaskQuery) =>
  invoke<TaskView[]>("list_tasks", { query });

export const getTask = (id: string) => invoke<TaskView>("get_task", { id });

export const upsertTask = (task: Task) =>
  invoke<TaskView>("upsert_task", { task });

export const deleteTask = (id: string) => invoke<void>("delete_task", { id });

export const completeTask = (id: string) =>
  invoke<TaskView>("complete_task", { id });

export const reopenTask = (id: string) =>
  invoke<TaskView>("reopen_task", { id });

// === Project ===

export const listProjects = () => invoke<Project[]>("list_projects");

export const upsertProject = (project: Project) =>
  invoke<Project>("upsert_project", { project });

export const deleteProject = (id: string) =>
  invoke<void>("delete_project", { id });

// === Tag ===

export const listTags = () => invoke<Tag[]>("list_tags");

export const upsertTag = (tag: Tag) => invoke<Tag>("upsert_tag", { tag });

export const deleteTag = (id: string) => invoke<void>("delete_tag", { id });

export const listTagsForTask = (taskId: string) =>
  invoke<Tag[]>("list_tags_for_task", { taskId });

export const setTagsForTask = (taskId: string, tagIds: string[]) =>
  invoke<void>("set_tags_for_task", { taskId, tagIds });

// === Pomodoro ===

export const startPomodoro = (
  taskId: string | null,
  projectId: string | null,
  duration: number,
) =>
  invoke<PomodoroSession>("start_pomodoro", {
    taskId,
    projectId,
    duration,
  });

export const stopPomodoro = (sessionId: string, isCompleted: boolean) =>
  invoke<PomodoroSession>("stop_pomodoro", { sessionId, isCompleted });

export const listPomodoros = () =>
  invoke<PomodoroSession[]>("list_pomodoros");

// === Review ===

export const getDailyReview = (date: string) =>
  invoke<DailyReview | null>("get_daily_review", { date });

export const upsertDailyReview = (review: DailyReview) =>
  invoke<DailyReview>("upsert_daily_review", { review });

export const getWeeklyReview = (weekStart: string) =>
  invoke<WeeklyReview | null>("get_weekly_review", { weekStart });

export const upsertWeeklyReview = (review: WeeklyReview) =>
  invoke<WeeklyReview>("upsert_weekly_review", { review });

export const getMonthlyReview = (yearMonth: string) =>
  invoke<MonthlyReview | null>("get_monthly_review", { yearMonth });

export const upsertMonthlyReview = (review: MonthlyReview) =>
  invoke<MonthlyReview>("upsert_monthly_review", { review });

// === SubTask ===

export const listSubtasksForTask = (taskId: string) =>
  invoke<SubTask[]>("list_subtasks_for_task", { taskId });

export const upsertSubtask = (subtask: SubTask) =>
  invoke<SubTask>("upsert_subtask", { subtask });

export const deleteSubtask = (id: string) =>
  invoke<void>("delete_subtask", { id });

// === Motto ===

export const listMottos = () => invoke<Motto[]>("list_mottos");

export const upsertMotto = (motto: Motto) =>
  invoke<Motto>("upsert_motto", { motto });

export const deleteMotto = (id: string) =>
  invoke<void>("delete_motto", { id });

// === NotificationTemplate ===

export const getNotificationTemplate = () =>
  invoke<NotificationTemplate>("get_notification_template");

export const upsertNotificationTemplate = (template: NotificationTemplate) =>
  invoke<NotificationTemplate>("upsert_notification_template", { template });

// === Stats ===

/** 番茄钟页"今日专注"分钟数(start_ms / end_ms 由前端按本地时区算出后传入) */
export const todayCompletedMinutes = (startMs: number, endMs: number) =>
  invoke<number>("today_completed_minutes", { startMs, endMs });
