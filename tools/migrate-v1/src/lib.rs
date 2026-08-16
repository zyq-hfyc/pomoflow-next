//! v1 pomoflow.db → v2 store.db 一键迁移 CLI。
//!
//! ## 设计要点
//!
//! - **两步走**:开 v1 只读(`rusqlite::Connection`)→ 写 v2 走 `pomoflow-core::Store`
//!   trait(`pomoflow_core::store::SqliteStore` 实现,P1.5 起 SqliteStore 已迁入
//!   core crate,desktop + migrate-v1 都直接复用),保证 v2 写入严格走业务字段映射。
//! - **ID 重映射**:v1 用 `INTEGER PK`,v2 必须 UUID v4(`Id::new()`)。维持
//!   `HashMap<i64, Id>` 把 v1 外键转 v2 引用;先 projects → tags → tasks
//!   → task_tag → pomodoros 这个顺序,确保前向引用已可解析。
//! - **enum 字符串映射**:v1 priority/status/reminder/repeat 都是字符串(含中文),
//!   用显式 `match` 映射到 v2 enum,未知值 fallback 到 `None` 安全降级。
//! - **dry-run**:开 v1 仍然,完全跳过 v2 写入,只打印统计。
//! - **回滚**:不自动备份(避免拷大型 db);输出建议 "先备份 v2 目录",
//!   失败时不破坏 v2 库(SqliteStore 单条 INSERT 失败 → 整批退出,已写的行
//!   留在 v2 db,管理员手动用 SQL 删 record 或重新跑)。

use std::collections::HashMap;
use std::path::PathBuf;

use anyhow::{Context, Result};
use chrono::{DateTime, NaiveDateTime, Utc};
use clap::Parser;
use log::{info, warn};
use rusqlite::Connection;

use pomoflow_core::model::{
    DailyReview, Id, MonthlyReview, PomodoroSession, Priority, Project, Reminder, Repeat, Tag, Task,
    TaskStatus, Timestamp, WeeklyReview,
};
use pomoflow_core::store::{SqliteStore, Store};

#[derive(Parser, Debug)]
#[command(name = "migrate-v1", version, about = "v1 pomoflow.db → v2 store.db")]
pub struct Args {
    /// v1 库路径(如 backend/pomoflow.db)
    #[arg(long)]
    pub from: PathBuf,

    /// v2 库路径(如 ~/.local/share/pomoflow/store.db)
    #[arg(long)]
    pub to: PathBuf,

    /// 只统计不写
    #[arg(long, default_value_t = false)]
    pub dry_run: bool,
}

/// 二进制入口 —— 由 `src/main.rs` 调用。
///
/// 单独提出来是为了让 `tests/integ.rs` 能直接 `use migrate_v1::run_main_with_args`
/// 跳过 clap 解析(测试需要自己构造 `Args`)。
pub fn run_main_with_args(args: Args) -> Result<()> {
    env_logger::Builder::from_env(env_logger::Env::default().default_filter_or("info"))
        .init();
    info!(
        "migrate-v1 from={} to={} dry_run={}",
        args.from.display(),
        args.to.display(),
        args.dry_run
    );
    run(args)
}

#[derive(Default, Debug)]
struct Stats {
    projects: usize,
    tags: usize,
    tasks: usize,
    task_tags: usize,
    pomodoros: usize,
    daily_reviews: usize,
    weekly_reviews: usize,
    monthly_reviews: usize,
    skipped: usize,
}

#[derive(Default)]
struct IdMap {
    project: HashMap<i64, Id>,
    tag: HashMap<i64, Id>,
    task: HashMap<i64, Id>,
}

/// 公开的迁移入口 —— `main()` 与集成测试都从这里进。
///
/// `pub` 是为了让 `tests/integ.rs` 直接调用,跳过 clap CLI 解析。
pub fn run(args: Args) -> Result<()> {
    if !args.from.exists() {
        anyhow::bail!("v1 db not found: {}", args.from.display());
    }

    let v1 = Connection::open(&args.from).context("open v1 db")?;
    check_v1_schema(&v1)?;
    info!("v1 schema OK");

    let v2: Option<SqliteStore> = if args.dry_run {
        None
    } else {
        if let Some(parent) = args.to.parent() {
            std::fs::create_dir_all(parent).ok();
        }
        Some(SqliteStore::open(&args.to).context("open v2 store")?)
    };

    let mut stats = Stats::default();
    let mut id_map = IdMap::default();

    // 注意 borrow 顺序:
    // - `migrate_tasks` 需要 `&mut task_id_map` (写) + `&id_map.project` + `&id_map.tag` (读) →
    //   必须分别传,不能让 Rust 把对 `id_map` 的可变借用和不可变借用同时 hold。
    // - 函数返回后再合并到 `id_map.task`,这样后续 `migrate_task_tags` / `migrate_pomodoros`
    //   用的 `&id_map` 全部稳定可读。
    migrate_projects(&v1, v2.as_ref(), &mut stats, &mut id_map.project)?;
    migrate_tags(&v1, v2.as_ref(), &mut stats, &mut id_map.tag)?;

    let mut task_id_map: HashMap<i64, Id> = HashMap::new();
    migrate_tasks(
        &v1,
        v2.as_ref(),
        &mut stats,
        &mut task_id_map,
        &id_map.project,
    )?;
    id_map.task = task_id_map;

    migrate_task_tags(&v1, v2.as_ref(), &mut stats, &id_map)?;
    migrate_pomodoros(&v1, v2.as_ref(), &mut stats, &id_map)?;
    migrate_daily_reviews(&v1, v2.as_ref(), &mut stats)?;
    migrate_weekly_reviews(&v1, v2.as_ref(), &mut stats)?;
    migrate_monthly_reviews(&v1, v2.as_ref(), &mut stats)?;

    println!("\n=== Migration Summary ===");
    println!("  mode:         {}", if args.dry_run { "DRY-RUN" } else { "WRITE" });
    println!("  projects:     {}", stats.projects);
    println!("  tags:         {}", stats.tags);
    println!("  tasks:        {}", stats.tasks);
    println!("  task_tag:     {}", stats.task_tags);
    println!("  pomodoros:    {}", stats.pomodoros);
    println!("  daily_rev:    {}", stats.daily_reviews);
    println!("  weekly_rev:   {}", stats.weekly_reviews);
    println!("  monthly_rev:  {}", stats.monthly_reviews);
    if stats.skipped > 0 {
        warn!("skipped {} rows due to parse errors", stats.skipped);
    }
    Ok(())
}

fn check_v1_schema(v1: &Connection) -> Result<()> {
    let expected = [
        "projects",
        "tags",
        "tasks",
        "task_tag",
        "pomodoro_sessions",
        "daily_reviews",
        "weekly_reviews",
        "monthly_reviews",
    ];
    let mut stmt = v1.prepare("SELECT name FROM sqlite_master WHERE type='table'")?;
    let mut rows = stmt.query([])?;
    let mut found = std::collections::HashSet::new();
    while let Some(row) = rows.next()? {
        found.insert(row.get::<_, String>(0)?);
    }
    let missing: Vec<_> = expected
        .iter()
        .filter(|n| !found.contains(**n))
        .copied()
        .collect();
    if !missing.is_empty() {
        anyhow::bail!("v1 schema missing tables: {missing:?}");
    }
    Ok(())
}

// === 时间解析 —— v1 用 SQLAlchemy 默认 UTC,SQLite 实际存在多种格式 ===

fn parse_datetime(s: &str) -> Option<DateTime<Utc>> {
    // v1 `DateTime` 字段(带时分秒):SQLAlchemy 默认 → "YYYY-MM-DD HH:MM:SS.ffffff"
    let datetime_formats = [
        "%Y-%m-%d %H:%M:%S%.f",
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%dT%H:%M:%S%.fZ",
        "%Y-%m-%dT%H:%M:%S",
        "%Y-%m-%dT%H:%M:%S%.f",
    ];
    for f in datetime_formats {
        if let Ok(dt) = NaiveDateTime::parse_from_str(s, f) {
            return Some(DateTime::<Utc>::from_naive_utc_and_offset(dt, Utc));
        }
    }
    // v1 `Date` 字段(如 tasks.due_date):只到日期 "YYYY-MM-DD",补 00:00:00 UTC。
    let date_formats = ["%Y-%m-%d", "%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%S"];
    for f in date_formats {
        if let Ok(d) = chrono::NaiveDate::parse_from_str(s, f) {
            let dt = d.and_hms_opt(0, 0, 0)?;
            return Some(DateTime::<Utc>::from_naive_utc_and_offset(dt, Utc));
        }
    }
    // 兜底 RFC3339
    DateTime::parse_from_rfc3339(s)
        .ok()
        .map(|d| d.with_timezone(&Utc))
}

fn parse_date(s: &str) -> Option<String> {
    let formats = ["%Y-%m-%d", "%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%S"];
    for f in formats {
        if let Ok(d) = chrono::NaiveDate::parse_from_str(s.split(' ').next().unwrap_or(s), f) {
            return Some(d.format("%Y-%m-%d").to_string());
        }
    }
    None
}

// === enum 映射 ===

fn priority_v1_to_v2(s: &str) -> Priority {
    match s {
        "high" => Priority::High,
        "medium" => Priority::Medium,
        "low" => Priority::Low,
        _ => Priority::None,
    }
}

fn status_v1_to_v2(s: &str) -> TaskStatus {
    if s == "completed" {
        TaskStatus::Completed
    } else {
        TaskStatus::Active
    }
}

fn reminder_v1_to_v2(s: &str) -> Reminder {
    match s {
        "准时" => Reminder::OnTime,
        "提前5分钟" => Reminder::Minutes5,
        "30分钟" => Reminder::Minutes30,
        "1小时" => Reminder::Hour1,
        "1天" => Reminder::Day1,
        "2天" => Reminder::Days2,
        _ => Reminder::None,
    }
}

fn repeat_v1_to_v2(s: &str) -> Repeat {
    match s {
        "每天" => Repeat::Daily,
        "工作日" => Repeat::Weekdays,
        "每周" => Repeat::Weekly,
        "每月" => Repeat::Monthly,
        "每年" => Repeat::Yearly,
        _ => Repeat::None,
    }
}

// === 各表迁移 ===

fn migrate_projects(
    v1: &Connection,
    v2: Option<&SqliteStore>,
    stats: &mut Stats,
    id_map: &mut HashMap<i64, Id>,
) -> Result<()> {
    let mut stmt = v1.prepare(
        "SELECT id, name, color, parent_id, updated_date FROM projects ORDER BY id",
    )?;
    let rows = stmt.query_map([], |r| {
        Ok((
            r.get::<_, i64>(0)?,
            r.get::<_, String>(1)?,
            r.get::<_, String>(2)?,
            r.get::<_, Option<i64>>(3)?,
            r.get::<_, Option<String>>(4)?,
        ))
    })?;

    for row in rows {
        let (v1_id, name, color, v1_parent, updated) = match row {
            Ok(x) => x,
            Err(e) => {
                warn!("project row read: {e}");
                stats.skipped += 1;
                continue;
            }
        };

        let new_id = Id::new();
        let parent_id = v1_parent.and_then(|pid| id_map.get(&pid).cloned());
        let updated_at = updated
            .as_deref()
            .and_then(parse_datetime)
            .map(Timestamp)
            .unwrap_or_else(Timestamp::now);

        let project = Project {
            id: new_id.clone(),
            name,
            color,
            parent_id,
            revision: 1,
            deleted_at: None,
            updated_at,
        };

        if let Some(store) = v2 {
            store.upsert_project(project)?;
        }
        id_map.insert(v1_id, new_id);
        stats.projects += 1;
    }
    Ok(())
}

fn migrate_tags(
    v1: &Connection,
    v2: Option<&SqliteStore>,
    stats: &mut Stats,
    id_map: &mut HashMap<i64, Id>,
) -> Result<()> {
    let mut stmt = v1.prepare("SELECT id, name, color, updated_date FROM tags ORDER BY id")?;
    let rows = stmt.query_map([], |r| {
        Ok((
            r.get::<_, i64>(0)?,
            r.get::<_, String>(1)?,
            r.get::<_, String>(2)?,
            r.get::<_, Option<String>>(3)?,
        ))
    })?;

    for row in rows {
        let (v1_id, name, color, updated) = match row {
            Ok(x) => x,
            Err(e) => {
                warn!("tag row read: {e}");
                stats.skipped += 1;
                continue;
            }
        };

        let new_id = Id::new();
        let updated_at = updated
            .as_deref()
            .and_then(parse_datetime)
            .map(Timestamp)
            .unwrap_or_else(Timestamp::now);

        let tag = Tag {
            id: new_id.clone(),
            name: name.clone(),
            color,
            revision: 1,
            deleted_at: None,
            updated_at,
        };

        // v2 唯一约束:同名 active 冲突 → upsert_tag 报 Conflict。
        // v1 也是唯一,所以理论上不会冲突,但同名大小写/带空格时 SQLAlchemy
        // 与 SQLite 都不严格相等,这里 catch 后跳过。
        if let Some(store) = v2 {
            match store.upsert_tag(tag) {
                Ok(_) => {}
                Err(pomoflow_core::error::CoreError::Conflict(msg)) => {
                    warn!("tag '{name}' 冲突: {msg},skip");
                    stats.skipped += 1;
                    continue;
                }
                Err(e) => return Err(e.into()),
            }
        }
        id_map.insert(v1_id, new_id);
        stats.tags += 1;
    }
    Ok(())
}

fn migrate_tasks(
    v1: &Connection,
    v2: Option<&SqliteStore>,
    stats: &mut Stats,
    task_id_map: &mut HashMap<i64, Id>,
    project_map: &HashMap<i64, Id>,
) -> Result<()> {
    let mut stmt = v1.prepare(
        "SELECT id, title, description, project_id, priority, status, due_date,
                estimated_pomodoros, completed_pomodoros, pomodoro_duration,
                reminder, repeat, completed_at, updated_date
         FROM tasks ORDER BY id",
    )?;
    let rows = stmt.query_map([], |r| {
        Ok((
            r.get::<_, i64>(0)?,
            r.get::<_, String>(1)?,
            r.get::<_, Option<String>>(2)?,
            r.get::<_, Option<i64>>(3)?,
            r.get::<_, String>(4)?,
            r.get::<_, String>(5)?,
            r.get::<_, Option<String>>(6)?,
            r.get::<_, Option<i64>>(7)?,
            r.get::<_, i64>(8)?,
            r.get::<_, Option<i64>>(9)?,
            r.get::<_, Option<String>>(10)?,
            r.get::<_, Option<String>>(11)?,
            r.get::<_, Option<String>>(12)?,
            r.get::<_, Option<String>>(13)?,
        ))
    })?;

    for row in rows {
        let (
            v1_id,
            title,
            description,
            v1_project,
            priority,
            status,
            due_date,
            estimated,
            completed,
            pomodoro_duration,
            reminder,
            repeat,
            completed_at,
            updated,
        ) = match row {
            Ok(x) => x,
            Err(e) => {
                warn!("task row read: {e}");
                stats.skipped += 1;
                continue;
            }
        };

        let new_id = Id::new();
        let project_id = v1_project.and_then(|pid| project_map.get(&pid).cloned());
        let updated_at = updated
            .as_deref()
            .and_then(parse_datetime)
            .map(Timestamp)
            .unwrap_or_else(Timestamp::now);

        let task = Task {
            id: new_id.clone(),
            title,
            description: description.unwrap_or_default(),
            project_id,
            priority: priority_v1_to_v2(&priority),
            status: status_v1_to_v2(&status),
            due_date: due_date.as_deref().and_then(parse_datetime),
            estimated_pomodoros: estimated.unwrap_or(0).max(0) as u32,
            completed_pomodoros: completed.max(0) as u32,
            pomodoro_duration: pomodoro_duration.map(|v| v.max(0) as u32),
            reminder: reminder
                .as_deref()
                .map(reminder_v1_to_v2)
                .unwrap_or(Reminder::None),
            repeat: repeat
                .as_deref()
                .map(repeat_v1_to_v2)
                .unwrap_or(Repeat::None),
            completed_at: completed_at.as_deref().and_then(parse_datetime),
            revision: 1,
            deleted_at: None,
            updated_at,
        };

        if let Some(store) = v2 {
            store.upsert_task(task)?;
        }
        task_id_map.insert(v1_id, new_id);
        stats.tasks += 1;
    }
    Ok(())
}

fn migrate_task_tags(
    v1: &Connection,
    v2: Option<&SqliteStore>,
    stats: &mut Stats,
    id_map: &IdMap,
) -> Result<()> {
    let mut stmt = v1.prepare("SELECT task_id, tag_id FROM task_tag")?;
    let rows = stmt.query_map([], |r| {
        Ok((r.get::<_, i64>(0)?, r.get::<_, i64>(1)?))
    })?;

    let mut per_task: HashMap<Id, Vec<Id>> = HashMap::new();
    for row in rows {
        let (v1_task, v1_tag) = match row {
            Ok(x) => x,
            Err(e) => {
                warn!("task_tag row read: {e}");
                stats.skipped += 1;
                continue;
            }
        };
        let Some(tid) = id_map.task.get(&v1_task) else {
            continue;
        };
        let Some(gid) = id_map.tag.get(&v1_tag) else {
            continue;
        };
        per_task.entry(tid.clone()).or_default().push(gid.clone());
    }

    if let Some(store) = v2 {
        for (task_id, tag_ids) in &per_task {
            store.set_tags_for_task(task_id, tag_ids)?;
        }
    }
    stats.task_tags = per_task.values().map(|v| v.len()).sum();
    Ok(())
}

fn migrate_pomodoros(
    v1: &Connection,
    v2: Option<&SqliteStore>,
    stats: &mut Stats,
    id_map: &IdMap,
) -> Result<()> {
    let mut stmt = v1.prepare(
        "SELECT id, task_id, project_id, duration, started_at, ended_at, is_completed, updated_date
         FROM pomodoro_sessions ORDER BY id",
    )?;
    let rows = stmt.query_map([], |r| {
        Ok((
            r.get::<_, i64>(0)?,
            r.get::<_, Option<i64>>(1)?,
            r.get::<_, Option<i64>>(2)?,
            r.get::<_, i64>(3)?,
            r.get::<_, Option<String>>(4)?,
            r.get::<_, Option<String>>(5)?,
            r.get::<_, bool>(6)?,
            r.get::<_, Option<String>>(7)?,
        ))
    })?;

    for row in rows {
        let (v1_id, v1_task, v1_project, duration, started, ended, is_completed, updated) =
            match row {
                Ok(x) => x,
                Err(e) => {
                    warn!("pomodoro row read: {e}");
                    stats.skipped += 1;
                    continue;
                }
            };

        let Some(started_dt) = started.as_deref().and_then(parse_datetime) else {
            warn!("pomodoro {v1_id} missing started_at, skip");
            stats.skipped += 1;
            continue;
        };
        let ended_dt = ended
            .as_deref()
            .and_then(parse_datetime)
            .unwrap_or(started_dt);

        let task_id = v1_task.and_then(|t| id_map.task.get(&t).cloned());
        let project_id = v1_project.and_then(|p| id_map.project.get(&p).cloned());
        let updated_at = updated
            .as_deref()
            .and_then(parse_datetime)
            .map(Timestamp)
            .unwrap_or_else(Timestamp::now);

        let session = PomodoroSession {
            id: Id::new(),
            task_id,
            project_id,
            duration: duration.max(0) as u32,
            started_at: started_dt,
            ended_at: ended_dt,
            is_completed,
            revision: 1,
            deleted_at: None,
            updated_at,
        };

        if let Some(store) = v2 {
            store.upsert_pomodoro(session)?;
        }
        stats.pomodoros += 1;
    }
    Ok(())
}

fn migrate_daily_reviews(
    v1: &Connection,
    v2: Option<&SqliteStore>,
    stats: &mut Stats,
) -> Result<()> {
    let mut stmt = v1.prepare("SELECT id, date, content, updated_date FROM daily_reviews")?;
    let rows = stmt.query_map([], |r| {
        Ok((
            r.get::<_, i64>(0)?,
            r.get::<_, String>(1)?,
            r.get::<_, Option<String>>(2)?,
            r.get::<_, Option<String>>(3)?,
        ))
    })?;

    for row in rows {
        let (id, date, content, updated) = match row {
            Ok(x) => x,
            Err(e) => {
                warn!("daily_review row read: {e}");
                stats.skipped += 1;
                continue;
            }
        };
        let Some(date_str) = parse_date(&date) else {
            warn!("dr {id} bad date: {date}");
            stats.skipped += 1;
            continue;
        };
        let updated_at = updated
            .as_deref()
            .and_then(parse_datetime)
            .map(Timestamp)
            .unwrap_or_else(Timestamp::now);

        let review = DailyReview {
            id: Id::new(),
            date: date_str,
            content: content.unwrap_or_default(),
            revision: 1,
            deleted_at: None,
            updated_at,
        };

        if let Some(store) = v2 {
            store.upsert_daily_review(review)?;
        }
        stats.daily_reviews += 1;
    }
    Ok(())
}

fn migrate_weekly_reviews(
    v1: &Connection,
    v2: Option<&SqliteStore>,
    stats: &mut Stats,
) -> Result<()> {
    let mut stmt = v1.prepare("SELECT id, week_start, content, updated_date FROM weekly_reviews")?;
    let rows = stmt.query_map([], |r| {
        Ok((
            r.get::<_, i64>(0)?,
            r.get::<_, String>(1)?,
            r.get::<_, Option<String>>(2)?,
            r.get::<_, Option<String>>(3)?,
        ))
    })?;

    for row in rows {
        let (id, week_start, content, updated) = match row {
            Ok(x) => x,
            Err(e) => {
                warn!("weekly_review row read: {e}");
                stats.skipped += 1;
                continue;
            }
        };
        let Some(week_str) = parse_date(&week_start) else {
            warn!("wr {id} bad week_start: {week_start}");
            stats.skipped += 1;
            continue;
        };
        let updated_at = updated
            .as_deref()
            .and_then(parse_datetime)
            .map(Timestamp)
            .unwrap_or_else(Timestamp::now);

        let review = WeeklyReview {
            id: Id::new(),
            week_start: week_str,
            content: content.unwrap_or_default(),
            revision: 1,
            deleted_at: None,
            updated_at,
        };

        if let Some(store) = v2 {
            store.upsert_weekly_review(review)?;
        }
        stats.weekly_reviews += 1;
    }
    Ok(())
}

fn migrate_monthly_reviews(
    v1: &Connection,
    v2: Option<&SqliteStore>,
    stats: &mut Stats,
) -> Result<()> {
    let mut stmt = v1.prepare("SELECT id, year_month, content, updated_date FROM monthly_reviews")?;
    let rows = stmt.query_map([], |r| {
        Ok((
            r.get::<_, i64>(0)?,
            r.get::<_, String>(1)?,
            r.get::<_, Option<String>>(2)?,
            r.get::<_, Option<String>>(3)?,
        ))
    })?;

    for row in rows {
        let (_id, year_month, content, updated) = match row {
            Ok(x) => x,
            Err(e) => {
                warn!("monthly_review row read: {e}");
                stats.skipped += 1;
                continue;
            }
        };
        let updated_at = updated
            .as_deref()
            .and_then(parse_datetime)
            .map(Timestamp)
            .unwrap_or_else(Timestamp::now);

        let review = MonthlyReview {
            id: Id::new(),
            year_month,
            content: content.unwrap_or_default(),
            revision: 1,
            deleted_at: None,
            updated_at,
        };

        if let Some(store) = v2 {
            store.upsert_monthly_review(review)?;
        }
        stats.monthly_reviews += 1;
    }
    Ok(())
}
