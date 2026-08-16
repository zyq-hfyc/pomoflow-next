//! Tauri command 桥接 —— `crates/core::Store` 暴露给前端 invoke。
//!
//! ## 设计要点
//!
//! - **AppState 通过 `manage()` 注入**;每个 command 拿 `State<AppState>` 取句柄。
//! - **错误用 `String` 返回**:`CoreError` 没有 `Serialize` derive,直接 `to_string()`
//!   转文本;前端 invoke 的 promise reject 字符串。生产化时再考虑 `thiserror + serde`
//!   把错误码结构化。
//! - **参数透传**:command 签名直接接 `core::model` / `core::store::TaskQuery`,
//!   Tauri 自动反序列化 JSON。
//! - **P1.3 范围**:Task / Project / Tag 三个 CRUD + 标签关联。复盘 / pomodoro
//!   CRUD 留到 P1.4 + 番茄钟一并接。

use std::path::{Path, PathBuf};

use chrono::{NaiveDate, Utc};
use pomoflow_core::model::{
    DailyReview, Id, MonthlyReview, Motto, NotificationTemplate, PomodoroSession, Project, SubTask,
    Tag, Task, TaskStatus, TaskView, Timestamp, WeeklyReview,
};
use pomoflow_core::stats::{self, OverviewStats, RangeStats, StatsGroup};
use pomoflow_core::store::{SqliteStore, Store, TaskQuery};
use pomoflow_core::validate;
use tauri::State;

/// 全局应用状态 —— Tauri `manage()` 注入,每个 command 拿 `State<AppState>`。
///
/// `SqliteStore` 内部 `Arc<Mutex<Connection>>` 已经是 `Clone + Send + Sync`,
/// 所以 `AppState` 满足 Tauri 状态要求。
#[derive(Clone)]
pub struct AppState {
    pub store: SqliteStore,
}

/// 取得跨平台 SQLite 文件路径 —— 不引入 `dirs` crate,自己拼。
///
/// - Windows: `%APPDATA%\pomoflow\store.db`
/// - macOS:   `~/Library/Application Support/pomoflow/store.db`
/// - Linux:   `$XDG_DATA_HOME/pomoflow/store.db` → `~/.local/share/pomoflow/store.db`
///
/// 失败时回退到当前目录(开发模式方便)。
pub fn store_path() -> PathBuf {
    let mut base = PathBuf::new();
    if cfg!(windows) {
        if let Ok(appdata) = std::env::var("APPDATA") {
            base.push(appdata);
        }
    } else if cfg!(target_os = "macos") {
        if let Ok(home) = std::env::var("HOME") {
            base.push(home);
            base.push("Library/Application Support");
        }
    } else if let Ok(xdg) = std::env::var("XDG_DATA_HOME") {
        base.push(xdg);
    } else if let Ok(home) = std::env::var("HOME") {
        base.push(home);
        base.push(".local/share");
    }

    base.push("pomoflow");
    base.push("store.db");
    base
}

/// 确保 parent 目录存在(失败吞掉,open 时再报)。
pub fn ensure_parent(path: &Path) {
    if let Some(parent) = path.parent() {
        let _ = std::fs::create_dir_all(parent);
    }
}

fn map_err(e: pomoflow_core::error::CoreError) -> String {
    e.to_string()
}

// === Task commands ===

#[tauri::command]
pub fn list_tasks(query: TaskQuery, state: State<'_, AppState>) -> Result<Vec<TaskView>, String> {
    let tasks = state.store.list_tasks(&query).map_err(map_err)?;
    embed_views(&state, tasks)
}

#[tauri::command]
pub fn get_task(id: String, state: State<'_, AppState>) -> Result<TaskView, String> {
    let id = Id::parse(&id).ok_or_else(|| format!("invalid id: {id}"))?;
    let task = state.store.get_task(&id).map_err(map_err)?;
    embed_views(&state, vec![task]).map(|mut v| {
        debug_assert!(v.len() == 1);
        v.pop().unwrap()
    })
}

/// 把一批 task 装上 tags + subtasks。共享 helper:list_tasks / get_task 都走这里。
fn embed_views(state: &AppState, tasks: Vec<Task>) -> Result<Vec<TaskView>, String> {
    let ids: Vec<Id> = tasks.iter().map(|t| t.id.clone()).collect();
    let tags_map = state.store.list_tags_for_tasks(&ids).map_err(map_err)?;
    let subs_map = state.store.list_subtasks_for_tasks(&ids).map_err(map_err)?;
    Ok(tasks
        .into_iter()
        .map(|t| TaskView {
            tags: tags_map.get(&t.id).cloned().unwrap_or_default(),
            subtasks: subs_map.get(&t.id).cloned().unwrap_or_default(),
            task: t,
        })
        .collect())
}

#[tauri::command]
pub fn upsert_task(task: Task, state: State<'_, AppState>) -> Result<TaskView, String> {
    // v1 TaskUpdate 的保护字段语义(status/completed_pomodoros/completed_at 只经
    // complete/reopen/番茄钟逻辑变更)在 v2 由前端约定保证 —— 内部命令
    // complete_task / stop_pomodoro 也走本入口,无法在 IPC 层强制区分。
    validate::validate_task(&task).map_err(map_err)?;
    let saved = state.store.upsert_task(task).map_err(map_err)?;
    embed_views(&state, vec![saved]).map(|mut v| v.pop().unwrap())
}

#[tauri::command]
pub fn delete_task(id: String, state: State<'_, AppState>) -> Result<(), String> {
    let id = Id::parse(&id).ok_or_else(|| format!("invalid id: {id}"))?;
    state.store.delete_task(&id).map_err(map_err)
}

// === Project commands ===

#[tauri::command]
pub fn list_projects(state: State<'_, AppState>) -> Result<Vec<Project>, String> {
    state.store.list_projects().map_err(map_err)
}

#[tauri::command]
pub fn upsert_project(project: Project, state: State<'_, AppState>) -> Result<Project, String> {
    validate::validate_project(&project).map_err(map_err)?;
    state.store.upsert_project(project).map_err(map_err)
}

#[tauri::command]
pub fn delete_project(id: String, state: State<'_, AppState>) -> Result<(), String> {
    let id = Id::parse(&id).ok_or_else(|| format!("invalid id: {id}"))?;
    state.store.delete_project(&id).map_err(map_err)
}

// === Tag commands ===

#[tauri::command]
pub fn list_tags(state: State<'_, AppState>) -> Result<Vec<Tag>, String> {
    state.store.list_tags().map_err(map_err)
}

#[tauri::command]
pub fn upsert_tag(tag: Tag, state: State<'_, AppState>) -> Result<Tag, String> {
    validate::validate_tag(&tag).map_err(map_err)?;
    state.store.upsert_tag(tag).map_err(map_err)
}

#[tauri::command]
pub fn delete_tag(id: String, state: State<'_, AppState>) -> Result<(), String> {
    let id = Id::parse(&id).ok_or_else(|| format!("invalid id: {id}"))?;
    state.store.delete_tag(&id).map_err(map_err)
}

// === Task ↔ Tag 关联 ===

#[tauri::command]
pub fn list_tags_for_task(task_id: String, state: State<'_, AppState>) -> Result<Vec<Tag>, String> {
    let id = Id::parse(&task_id).ok_or_else(|| format!("invalid id: {task_id}"))?;
    state.store.list_tags_for_task(&id).map_err(map_err)
}

#[tauri::command]
pub fn set_tags_for_task(
    task_id: String,
    tag_ids: Vec<String>,
    state: State<'_, AppState>,
) -> Result<(), String> {
    let id = Id::parse(&task_id).ok_or_else(|| format!("invalid task_id: {task_id}"))?;
    let mut parsed = Vec::with_capacity(tag_ids.len());
    for raw in tag_ids {
        let tid = Id::parse(&raw).ok_or_else(|| format!("invalid tag_id: {raw}"))?;
        parsed.push(tid);
    }
    state.store.set_tags_for_task(&id, &parsed).map_err(map_err)
}

// === Pomodoro commands ===
//
// 计时器流程:
//   start_pomodoro(task_id?, project_id?, duration_minutes)
//     → 建一条 PomodoroSession(started_at = now, ended_at = now 占位, is_completed = false)
//   stop_pomodoro(session_id, is_completed)
//     → ended_at = now, is_completed = 传入值;若 is_completed=true 且绑定了 task,
//        累加 task.completed_pomodoros(失败仅日志不影响主返回)
//
// 不在 Store trait 上加 get_pomodoro(避免 trait surface 扩大):stop 时 list + find by id,
// 当前 P1.7 单进程规模下 O(n) 完全够;后续统计 / 多设备场景再考虑加。

#[tauri::command]
pub fn start_pomodoro(
    task_id: Option<String>,
    project_id: Option<String>,
    duration: u32,
    state: State<'_, AppState>,
) -> Result<PomodoroSession, String> {
    validate::validate_session_duration(duration).map_err(map_err)?;
    let task_id = match task_id {
        Some(s) => Some(Id::parse(&s).ok_or_else(|| format!("invalid task_id: {s}"))?),
        None => None,
    };
    let project_id = match project_id {
        Some(s) => Some(Id::parse(&s).ok_or_else(|| format!("invalid project_id: {s}"))?),
        None => None,
    };
    // v1 语义:给了 task_id 而没给 project_id → 从任务上派生
    let project_id = match (task_id.as_ref(), project_id) {
        (Some(tid), None) => state
            .store
            .get_task(tid)
            .map_err(map_err)?
            .project_id
            .clone(),
        (_, pid) => pid,
    };
    let session = PomodoroSession::new(task_id, project_id, duration);
    state.store.upsert_pomodoro(session).map_err(map_err)
}

#[tauri::command]
pub fn stop_pomodoro(
    session_id: String,
    is_completed: bool,
    state: State<'_, AppState>,
) -> Result<PomodoroSession, String> {
    let id = Id::parse(&session_id).ok_or_else(|| format!("invalid session_id: {session_id}"))?;
    let mut session = state
        .store
        .list_pomodoros()
        .map_err(map_err)?
        .into_iter()
        .find(|s| s.id == id)
        .ok_or_else(|| format!("pomodoro not found: {session_id}"))?;

    // 捕获待累加的 task_id,后面 session 会被 move 进 upsert
    let task_to_bump = if is_completed {
        session.task_id.clone()
    } else {
        None
    };

    session.ended_at = Utc::now();
    session.is_completed = is_completed;
    session.updated_at = Timestamp::now();

    let result = state.store.upsert_pomodoro(session).map_err(map_err)?;

    // 完成且绑定了任务 → 累加 task.completed_pomodoros
    // 失败仅静默(不影响主返回:PomodoroSession 已成功落库,统计可重算)
    if let Some(task_id) = task_to_bump {
        if let Ok(mut task) = state.store.get_task(&task_id) {
            task.completed_pomodoros = task.completed_pomodoros.saturating_add(1);
            task.updated_at = Timestamp::now();
            let _ = state.store.upsert_task(task);
        }
    }

    Ok(result)
}

#[tauri::command]
pub fn list_pomodoros(state: State<'_, AppState>) -> Result<Vec<PomodoroSession>, String> {
    state.store.list_pomodoros().map_err(map_err)
}

// === Task complete / reopen commands ===
//
// 业务规则:TaskUpdate schema 不暴露 status / completed_at / completed_pomodoros,
// 只能经 complete / reopen / 番茄钟逻辑变更,避免绕过业务规则。
// 这里封装成 command —— Store trait 不感知"完成"业务语义。

#[tauri::command]
pub fn complete_task(id: String, state: State<'_, AppState>) -> Result<TaskView, String> {
    let id = Id::parse(&id).ok_or_else(|| format!("invalid id: {id}"))?;
    let mut task = state.store.get_task(&id).map_err(map_err)?;
    task.status = TaskStatus::Completed;
    task.completed_at = Some(Utc::now());
    task.updated_at = Timestamp::now();
    let saved = state.store.upsert_task(task).map_err(map_err)?;
    embed_views(&state, vec![saved]).map(|mut v| v.pop().unwrap())
}

#[tauri::command]
pub fn reopen_task(id: String, state: State<'_, AppState>) -> Result<TaskView, String> {
    let id = Id::parse(&id).ok_or_else(|| format!("invalid id: {id}"))?;
    let mut task = state.store.get_task(&id).map_err(map_err)?;
    task.status = TaskStatus::Active;
    task.completed_at = None;
    task.updated_at = Timestamp::now();
    let saved = state.store.upsert_task(task).map_err(map_err)?;
    embed_views(&state, vec![saved]).map(|mut v| v.pop().unwrap())
}

// === Review commands(日 / 周 / 月复盘透传) ===

#[tauri::command]
pub fn get_daily_review(
    date: String,
    state: State<'_, AppState>,
) -> Result<Option<DailyReview>, String> {
    state.store.get_daily_review(&date).map_err(map_err)
}

#[tauri::command]
pub fn upsert_daily_review(
    review: DailyReview,
    state: State<'_, AppState>,
) -> Result<DailyReview, String> {
    state.store.upsert_daily_review(review).map_err(map_err)
}

/// 日期区间列表(v1 GET /api/daily-reviews?start&end,手账模式用)。
#[tauri::command]
pub fn list_daily_reviews(
    start_date: String,
    end_date: String,
    state: State<'_, AppState>,
) -> Result<Vec<DailyReview>, String> {
    state
        .store
        .list_daily_reviews_between(&start_date, &end_date)
        .map_err(map_err)
}

/// 删除某天日复盘(v1 DELETE 语义,硬删)。
#[tauri::command]
pub fn delete_daily_review(date: String, state: State<'_, AppState>) -> Result<(), String> {
    state.store.delete_daily_review(&date).map_err(map_err)
}

#[tauri::command]
pub fn get_weekly_review(
    week_start: String,
    state: State<'_, AppState>,
) -> Result<Option<WeeklyReview>, String> {
    state.store.get_weekly_review(&week_start).map_err(map_err)
}

#[tauri::command]
pub fn upsert_weekly_review(
    review: WeeklyReview,
    state: State<'_, AppState>,
) -> Result<WeeklyReview, String> {
    state.store.upsert_weekly_review(review).map_err(map_err)
}

/// 某月的周复盘列表(v1 GET /api/weekly-reviews?year&month):
/// 返回所有**周一落在这个月内**的自然周,v1 crud.py:733-740 对齐。
#[tauri::command]
pub fn list_weekly_reviews(
    year: i32,
    month: u32,
    state: State<'_, AppState>,
) -> Result<Vec<WeeklyReview>, String> {
    let (Some(first), Some(last_day)) = (
        NaiveDate::from_ymd_opt(year, month, 1),
        if month == 12 {
            NaiveDate::from_ymd_opt(year + 1, 1, 1)
        } else {
            NaiveDate::from_ymd_opt(year, month + 1, 1)
        },
    ) else {
        return Err(format!("invalid year/month: {year}-{month}"));
    };
    let last = last_day.pred_opt().unwrap_or(first);
    state
        .store
        .list_weekly_reviews_between(&first.to_string(), &last.to_string())
        .map_err(map_err)
}

/// 删除某周复盘(硬删)。
#[tauri::command]
pub fn delete_weekly_review(
    week_start: String,
    state: State<'_, AppState>,
) -> Result<(), String> {
    state
        .store
        .delete_weekly_review(&week_start)
        .map_err(map_err)
}

#[tauri::command]
pub fn get_monthly_review(
    year_month: String,
    state: State<'_, AppState>,
) -> Result<Option<MonthlyReview>, String> {
    state.store.get_monthly_review(&year_month).map_err(map_err)
}

#[tauri::command]
pub fn upsert_monthly_review(
    review: MonthlyReview,
    state: State<'_, AppState>,
) -> Result<MonthlyReview, String> {
    state.store.upsert_monthly_review(review).map_err(map_err)
}

/// 删除某月复盘(硬删)。
#[tauri::command]
pub fn delete_monthly_review(
    year_month: String,
    state: State<'_, AppState>,
) -> Result<(), String> {
    state
        .store
        .delete_monthly_review(&year_month)
        .map_err(map_err)
}

// === SubTask commands ===

#[tauri::command]
pub fn list_subtasks_for_task(
    task_id: String,
    state: State<'_, AppState>,
) -> Result<Vec<SubTask>, String> {
    let id = Id::parse(&task_id).ok_or_else(|| format!("invalid task_id: {task_id}"))?;
    state.store.list_subtasks_for_task(&id).map_err(map_err)
}

#[tauri::command]
pub fn upsert_subtask(subtask: SubTask, state: State<'_, AppState>) -> Result<SubTask, String> {
    validate::validate_subtask(&subtask).map_err(map_err)?;
    // 写入前 bump updated_at + revision —— 业务规则集中在 command 层,Store 不感知
    let mut s = subtask;
    s.updated_at = Timestamp::now();
    s.revision = s.revision.saturating_add(1);
    state.store.upsert_subtask(s).map_err(map_err)
}

#[tauri::command]
pub fn delete_subtask(id: String, state: State<'_, AppState>) -> Result<(), String> {
    let id = Id::parse(&id).ok_or_else(|| format!("invalid id: {id}"))?;
    state.store.delete_subtask(&id).map_err(map_err)
}

// === Motto commands(座右铭) ===

#[tauri::command]
pub fn list_mottos(state: State<'_, AppState>) -> Result<Vec<Motto>, String> {
    state.store.list_mottos().map_err(map_err)
}

#[tauri::command]
pub fn upsert_motto(motto: Motto, state: State<'_, AppState>) -> Result<Motto, String> {
    validate::validate_motto(&motto).map_err(map_err)?;
    // 写入前 bump updated_at + revision
    let mut m = motto;
    m.updated_at = Timestamp::now();
    m.revision = m.revision.saturating_add(1);
    state.store.upsert_motto(m).map_err(map_err)
}

#[tauri::command]
pub fn delete_motto(id: String, state: State<'_, AppState>) -> Result<(), String> {
    let id = Id::parse(&id).ok_or_else(|| format!("invalid id: {id}"))?;
    state.store.delete_motto(&id).map_err(map_err)
}

// === NotificationTemplate commands(通知文案模板,单行配置) ===

/// 读模板;表为空返回默认行(v1 `_DEFAULTS` 语义:文案由前端预设表按语言解析)。
#[tauri::command]
pub fn get_notification_template(
    state: State<'_, AppState>,
) -> Result<NotificationTemplate, String> {
    let template = state
        .store
        .get_notification_template()
        .map_err(map_err)?
        .unwrap_or_else(NotificationTemplate::default_row);
    Ok(template)
}

#[tauri::command]
pub fn upsert_notification_template(
    template: NotificationTemplate,
    state: State<'_, AppState>,
) -> Result<NotificationTemplate, String> {
    let mut t = template;
    // 固定单行 id = "1"(防御:前端传错 id 也归一)
    t.id = Id("1".to_string());
    t.updated_at = Timestamp::now();
    state.store.upsert_notification_template(t).map_err(map_err)
}

// === Stats helpers ===

/// 番茄钟页"今日专注"分钟数 —— 与 v1 `todayMinutes` 对齐。
///
/// 入参是今日 0 点的 UTC 毫秒和次日 0 点的 UTC 毫秒(前端按本地时区算好后传入),
/// 后端做 SUM(duration_minutes) 聚合。
#[tauri::command]
pub fn today_completed_minutes(
    start_ms: i64,
    end_ms: i64,
    state: State<'_, AppState>,
) -> Result<u32, String> {
    state
        .store
        .today_completed_minutes(start_ms, end_ms)
        .map_err(map_err)
}

/// 本地日区间 [start_date, end_date](双含)→ UTC 毫秒窗口 [start, end_exclusive)。
/// 统计页窄查会话用:把"本地某天的会话"换算成 UTC 时间戳范围。
fn local_day_range_to_utc_ms(
    start_date: &str,
    end_date: &str,
    tz_offset_min: i32,
) -> Option<(i64, i64)> {
    let s = NaiveDate::parse_from_str(start_date, "%Y-%m-%d").ok()?;
    let e = NaiveDate::parse_from_str(end_date, "%Y-%m-%d").ok()?;
    let offset_ms = tz_offset_min as i64 * 60_000;
    let start = s.and_hms_opt(0, 0, 0)?.and_utc().timestamp_millis() - offset_ms;
    let end_excl = (e + chrono::Duration::days(1))
        .and_hms_opt(0, 0, 0)?
        .and_utc()
        .timestamp_millis()
        - offset_ms;
    Some((start, end_excl))
}

/// 统计页维度查询(v1 `/api/stats/range`)。
///
/// - `start_date`/`end_date`:本地日期 YYYY-MM-DD,双端包含
/// - `group`:day / week / month
/// - `tz_offset_min`:会话日分桶用的本地时区偏移(东正西负,如上海 +480)
///
/// 语义在 core::stats(纯函数),此处只做取数编排。
#[tauri::command]
pub fn stats_range(
    start_date: String,
    end_date: String,
    group: StatsGroup,
    tz_offset_min: i32,
    state: State<'_, AppState>,
) -> Result<RangeStats, String> {
    let Some((start_ms, end_ms)) = local_day_range_to_utc_ms(&start_date, &end_date, tz_offset_min)
    else {
        return Err(format!("invalid date range: {start_date}..{end_date}"));
    };
    let sessions = state
        .store
        .list_pomodoros_between(start_ms, end_ms)
        .map_err(map_err)?;
    // 全量任务(不走分页 list_tasks:limit 夹紧 ≤5000,超限时老任务被截断,统计会少算)
    let tasks = state.store.list_tasks_for_stats().map_err(map_err)?;
    let projects = state.store.list_projects().map_err(map_err)?;
    Ok(stats::range_stats(
        &sessions,
        &tasks,
        &projects,
        &start_date,
        &end_date,
        group,
        tz_offset_min,
    ))
}

/// 统计总览(v1 `/api/stats/overview`)。
///
/// `today`/`week_start`/`month_start` 是前端本地时区的日期(YYYY-MM-DD);
/// total_sessions / total_tasks_completed 无时间界。
#[tauri::command]
pub fn stats_overview(
    today: String,
    week_start: String,
    month_start: String,
    tz_offset_min: i32,
    state: State<'_, AppState>,
) -> Result<OverviewStats, String> {
    let sessions = state.store.list_pomodoros().map_err(map_err)?;
    let tasks = state.store.list_tasks_for_stats().map_err(map_err)?;
    Ok(stats::overview_stats(
        &sessions,
        &tasks,
        &today,
        &week_start,
        &month_start,
        tz_offset_min,
    ))
}
