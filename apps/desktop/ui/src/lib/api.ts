//! Tauri invoke 的类型化封装 —— 与 `apps/desktop/src/commands.rs` 一一对应。
//!
//! 设计要点:
//! - 单一 `invoke` 入口,统一错误捕获(返回 `string`,与后端 `Result<_, String>` 对齐)。
//! - 不在每处 try/catch:调用方拿到 string 错误直接 `alert` / 显示 toast 即可。
//! - 参数 / 返回类型用后端 `core::model` 的字段命名(snake_case),serde 直接透传。
//! - 此文件不依赖 `lib/store` 等其他模块;纯 invoke 包装,组件层自由组合。

import { invoke } from "@tauri-apps/api/core";

// === 后端 model 类型(前端 mirror,只声明用到的字段) ===

export type Priority = "high" | "medium" | "low" | "none";

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  project_id?: string | null;
  priority?: Priority;
  due_date?: string | null;
  estimated_pomodoros?: number;
  completed_pomodoros?: number;
  pomodoro_duration?: number | null;
  status: "active" | "completed";
  reminder?: string | null;
  repeat?: string | null;
  repeat_config?: string | null;
  completed_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  color?: string | null;
  parent_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  name: string;
  color?: string | null;
  created_at: string;
  updated_at: string;
}

export interface PomodoroSession {
  id: string;
  task_id?: string | null;
  project_id?: string | null;
  duration: number;
  started_at: string;
  ended_at?: string | null;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubTask {
  id: string;
  task_id: string;
  title: string;
  is_completed: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface DailyReview {
  date: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Motto {
  id: string;
  text: string;
  author: string | null;
  created_at: string;
  updated_at: string;
}

export interface WeeklyReview {
  week_start: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface MonthlyReview {
  year_month: string;
  content: string;
  created_at: string;
  updated_at: string;
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
  invoke<Task[]>("list_tasks", { query });

export const getTask = (id: string) => invoke<Task>("get_task", { id });

export const upsertTask = (task: Task) => invoke<Task>("upsert_task", { task });

export const deleteTask = (id: string) => invoke<void>("delete_task", { id });

export const completeTask = (id: string) =>
  invoke<Task>("complete_task", { id });

export const reopenTask = (id: string) => invoke<Task>("reopen_task", { id });

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

// === Stats ===

/** 番茄钟页"今日专注"分钟数(start_ms / end_ms 由前端按本地时区算出后传入) */
export const todayCompletedMinutes = (startMs: number, endMs: number) =>
  invoke<number>("today_completed_minutes", { startMs, endMs });