//! `crates/core::Store` trait 的 SQLite 实现。
//!
//! ## 位置说明
//!
//! 历史:此文件最初在 `apps/desktop/src/store_sqlite.rs`(P1.2),P1.5 新增
//! `tools/migrate-v1` 也需要这个实现,所以把它搬进 `crates/core` ——
//! `core` 是 desktop + cloud + 迁移工具共享的"业务大脑",SQLite 持久化属于
//! 共享能力。这与 ADR-005 "关键域逻辑用 Rust `core` crate 共享"一致。
//!
//! ## 设计要点
//!
//! - **每个实体一张表 + 软删除列 `deleted_at_ms`**:列表查询过滤 `deleted_at_ms IS NULL`,
//!   `get` 仍然返回已删除记录(供同步 / 审计)。
//! - **时间统一存毫秒(`INTEGER`)**:chrono `DateTime<Utc>` ↔ `i64` ms 的转换
//!   集中在 `ts_to_ms` / `ts_from_ms` 两个 helper。
//! - **枚举存字符串**:与 `serde` 的 `lowercase` / `snake_case` 重命名一致,直接复用
//!   `serde_json::to_string` / `from_str` 做转换。
//! - **唯一约束走 partial unique index**:`tags.name` 在 `deleted_at_ms IS NULL` 时唯一,
//!   软删除后同名可复用。
//! - **线程安全**:`Connection` 不 `Sync`,包一层 `Arc<Mutex<Connection>>`。
//!   Tauri command 处理器并发调用时互斥。
//!
//! ## 未来(P2+)要做的事
//!
//! - 迁移系统(添加字段时 ALTER TABLE + 数据回填)
//! - `updated_at` 索引覆盖更多查询模式
//! - WAL 模式提升并发读性能(写入仍需互斥)

use std::collections::HashMap;
use std::path::Path;
use std::sync::{Arc, Mutex};

use chrono::{DateTime, Datelike, TimeZone, Utc};
use rusqlite::{params, Connection, OptionalExtension, Row};

use crate::error::{CoreError, CoreResult};
use crate::model::{
    DailyReview, Id, MonthlyReview, Motto, NotificationTemplate, PomodoroSession, Priority,
    Project, Reminder, Repeat, SubTask, Tag, Task, TaskStatus, TaskTagLink, Timestamp,
    WeeklyReview,
};
use crate::store::{ConflictRecord, Store, TaskDateFilter, TaskQuery};
use crate::sync::{change_of, Change, ChangeLogStore, EntityKind};

/// `pomoflow-core::Store` trait 的 SQLite 持久化实现。
#[derive(Debug, Clone)]
pub struct SqliteStore {
    conn: Arc<Mutex<Connection>>,
    /// 本机用户(ADR-007 多租户归属;meta.user_id,迁移 002 生成)
    user_id: Id,
    /// 本设备标识(pending 变更的 origin;meta.device_id)
    device_id: String,
}

impl SqliteStore {
    /// 打开(或创建)SQLite 数据库并跑 schema。
    ///
    /// `path` 通常是 `~/.local/share/pomoflow/store.db`(Linux)、`%APPDATA%\pomoflow\store.db`、
    /// `~/Library/Application Support/pomoflow/store.db` —— 桌面端启动时确定。P1.3 起由
    /// `apps/desktop/src/lib.rs::run()` 决定具体路径。P1.5 起迁移工具 `tools/migrate-v1`
    /// 也用同样的 `open()` 把 v1 数据写到 v2 store。
    pub fn open(path: impl AsRef<Path>) -> CoreResult<Self> {
        let conn = Connection::open(path.as_ref())
            .map_err(|e| CoreError::storage(format!("open sqlite: {e}")))?;

        // 外键约束(默认 off,显式开)
        conn.execute_batch("PRAGMA foreign_keys = ON;")
            .map_err(|e| CoreError::storage(format!("pragma foreign_keys: {e}")))?;

        // 新库一次建成最新结构;旧库的表已存在,由版本化迁移补齐(幂等)。
        // 迁移前备份由调用方(桌面端 / migrate-v1)用 migrate::needs_migration 判断。
        conn.execute_batch(SCHEMA_SQL)
            .map_err(|e| CoreError::storage(format!("apply schema: {e}")))?;
        super::migrate::run_migrations(&conn)
            .map_err(|e| CoreError::storage(format!("run migrations: {e}")))?;
        Self::with_conn(conn)
    }

    /// 打开内存 SQLite(测试用)。
    ///
    /// 集成测试/文档测试都能用,lib crate 内部直接 `::open_in_memory()`。
    /// 不加 `#[cfg(test)]` —— 集成测试不在 lib 的 cfg(test) 下,如果只允许测试用
    /// 反而阻碍外部测试。生产路径不会调用它。
    pub fn open_in_memory() -> CoreResult<Self> {
        let conn = Connection::open_in_memory()
            .map_err(|e| CoreError::storage(format!("open in-memory: {e}")))?;
        conn.execute_batch("PRAGMA foreign_keys = ON;")
            .map_err(|e| CoreError::storage(format!("pragma foreign_keys: {e}")))?;
        conn.execute_batch(SCHEMA_SQL)
            .map_err(|e| CoreError::storage(format!("apply schema: {e}")))?;
        super::migrate::run_migrations(&conn)
            .map_err(|e| CoreError::storage(format!("run migrations: {e}")))?;
        Self::with_conn(conn)
    }

    /// 公共收尾:加载同步元数据(meta 表由迁移 002 保证存在)。
    fn with_conn(conn: Connection) -> CoreResult<Self> {
        let user_id: String = conn
            .query_row("SELECT value FROM meta WHERE key = 'user_id'", [], |r| {
                r.get(0)
            })
            .map_err(|e| CoreError::storage(format!("read meta.user_id: {e}")))?;
        let device_id: String = conn
            .query_row("SELECT value FROM meta WHERE key = 'device_id'", [], |r| {
                r.get(0)
            })
            .map_err(|e| CoreError::storage(format!("read meta.device_id: {e}")))?;
        Ok(Self {
            conn: Arc::new(Mutex::new(conn)),
            user_id: Id::parse(&user_id).unwrap_or_else(Id::nil),
            device_id,
        })
    }

    /// 本机用户 id(同步请求的 user_id 来源)。
    pub fn local_user_id(&self) -> &Id {
        &self.user_id
    }

    /// 本设备标识(同步请求的 device_id 来源)。
    pub fn local_device_id(&self) -> &str {
        &self.device_id
    }

    /// 读 meta 值(如 `last_sync_seq` 游标);不存在返回 None。
    pub fn get_meta(&self, key: &str) -> CoreResult<Option<String>> {
        let conn = self.lock()?;
        conn.query_row("SELECT value FROM meta WHERE key = ?", params![key], |r| {
            r.get(0)
        })
        .optional()
        .map_err(|e| CoreError::storage(format!("get_meta: {e}")))
    }

    /// 写 meta 值(upsert)。
    pub fn set_meta(&self, key: &str, value: &str) -> CoreResult<()> {
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO meta(key, value) VALUES(?, ?)
             ON CONFLICT(key) DO UPDATE SET value = excluded.value",
            params![key, value],
        )
        .map_err(|e| CoreError::storage(format!("set_meta: {e}")))?;
        Ok(())
    }

    /// 实体写入前盖章:user_id 占位(nil)→ 本机用户。
    fn stamp<T: Stamped>(&self, mut entity: T) -> T {
        if entity.user_id().is_nil() {
            *entity.user_id() = self.user_id.clone();
        }
        entity
    }

    /// 任务标签关联落地的双态内核(`set_tags_for_task` / `apply_remote` 共用):
    /// 单事务里全量替换 `task_tags`(排序去重,同集合 → 同载荷)+ upsert
    /// `task_tag_sync` 元信息。
    /// - `pending = true`:本地写,revision/updated 由调用方自增后传入;
    /// - `pending = false`:应用远端权威值**原样**落库(不本地 bump),标 synced。
    ///
    /// 空 `tag_ids` 且该任务无同步行 → 不建行(不给没打过标签的任务造同步噪音)。
    fn set_tags_for_task_marked(
        &self,
        task_id: &Id,
        tag_ids: &[Id],
        revision: u64,
        updated_at: Timestamp,
        origin: &str,
        pending: bool,
    ) -> CoreResult<()> {
        let mut sorted: Vec<&Id> = tag_ids.iter().collect();
        sorted.sort_by(|a, b| a.0.cmp(&b.0));
        sorted.dedup_by(|a, b| a.0 == b.0);

        let conn = self.lock()?;
        let tx = conn
            .unchecked_transaction()
            .map_err(|e| CoreError::storage(format!("begin tx: {e}")))?;
        tx.execute(
            "DELETE FROM task_tags WHERE task_id = ?",
            params![task_id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("clear task_tags: {e}")))?;
        for tag_id in &sorted {
            tx.execute(
                "INSERT OR IGNORE INTO task_tags (task_id, tag_id) VALUES (?, ?)",
                params![task_id.as_str(), tag_id.as_str()],
            )
            .map_err(|e| CoreError::storage(format!("insert task_tag: {e}")))?;
        }
        let has_row: bool = tx
            .query_row(
                "SELECT 1 FROM task_tag_sync WHERE task_id = ?",
                params![task_id.as_str()],
                |_| Ok(()),
            )
            .optional()
            .map_err(|e| CoreError::storage(format!("probe task_tag_sync: {e}")))?
            .is_some();
        if !sorted.is_empty() || has_row {
            let state = if pending { "pending" } else { "synced" };
            tx.execute(
                "INSERT INTO task_tag_sync
                    (task_id, user_id, revision, updated_at_ms, sync_state, origin_device)
                 VALUES (?, ?, ?, ?, ?, ?)
                 ON CONFLICT(task_id) DO UPDATE SET
                    user_id=excluded.user_id, revision=excluded.revision,
                    updated_at_ms=excluded.updated_at_ms, sync_state=excluded.sync_state,
                    origin_device=excluded.origin_device",
                params![
                    task_id.as_str(),
                    self.user_id.as_str(),
                    revision as i64,
                    ts_to_ms(updated_at),
                    state,
                    origin
                ],
            )
            .map_err(|e| CoreError::storage(format!("upsert task_tag_sync: {e}")))?;
        }
        tx.commit()
            .map_err(|e| CoreError::storage(format!("commit: {e}")))?;
        Ok(())
    }

    fn lock(&self) -> CoreResult<std::sync::MutexGuard<'_, Connection>> {
        self.conn
            .lock()
            .map_err(|e| CoreError::storage(format!("lock poisoned: {e}")))
    }
}

/// 有归属用户的实体(user_id 盖章用,内部 trait)。
trait Stamped {
    fn user_id(&mut self) -> &mut Id;
}
impl Stamped for Task {
    fn user_id(&mut self) -> &mut Id {
        &mut self.user_id
    }
}
impl Stamped for Project {
    fn user_id(&mut self) -> &mut Id {
        &mut self.user_id
    }
}
impl Stamped for Tag {
    fn user_id(&mut self) -> &mut Id {
        &mut self.user_id
    }
}
impl Stamped for SubTask {
    fn user_id(&mut self) -> &mut Id {
        &mut self.user_id
    }
}
impl Stamped for PomodoroSession {
    fn user_id(&mut self) -> &mut Id {
        &mut self.user_id
    }
}
impl Stamped for Motto {
    fn user_id(&mut self) -> &mut Id {
        &mut self.user_id
    }
}
impl Stamped for DailyReview {
    fn user_id(&mut self) -> &mut Id {
        &mut self.user_id
    }
}
impl Stamped for WeeklyReview {
    fn user_id(&mut self) -> &mut Id {
        &mut self.user_id
    }
}
impl Stamped for MonthlyReview {
    fn user_id(&mut self) -> &mut Id {
        &mut self.user_id
    }
}

/// SQLite schema —— 9 张表,所有时间戳 ms INTEGER,所有枚举 TEXT。
///
/// 这里永远是**最新结构**(新库一次建成);旧库升级走 `migrate.rs` 的版本化迁移
/// (迁移函数里同步补一份新列,保持两边一致)。
pub(crate) const SCHEMA_SQL: &str = r#"
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '',
  parent_id TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at_ms INTEGER NOT NULL DEFAULT 0,
  revision INTEGER NOT NULL DEFAULT 1,
  deleted_at_ms INTEGER,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_projects_parent ON projects(parent_id);
-- 注意:引用"迁移 1 新增列"的索引(idx_projects/tags_display_order、
-- idx_tasks_repeat_parent、idx_tasks_created)不放这里 —— 旧库的老表还没这些列,
-- SCHEMA_SQL 先于迁移执行会炸;统一放 migrate.rs 的 migration_001 里。

CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at_ms INTEGER NOT NULL DEFAULT 0,
  revision INTEGER NOT NULL DEFAULT 1,
  deleted_at_ms INTEGER,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

-- 同名标签不能同时存在(忽略已软删除的)
CREATE UNIQUE INDEX IF NOT EXISTS idx_tags_name_active
  ON tags(name COLLATE NOCASE)
  WHERE deleted_at_ms IS NULL;

CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  project_id TEXT,
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'active',
  due_date_ms INTEGER,
  estimated_pomodoros INTEGER NOT NULL DEFAULT 0,
  completed_pomodoros INTEGER NOT NULL DEFAULT 0,
  pomodoro_duration INTEGER,
  reminder TEXT NOT NULL DEFAULT 'none',
  repeat_kind TEXT NOT NULL DEFAULT 'none',
  repeat_config TEXT,
  repeat_parent_id TEXT,
  repeat_end_date_ms INTEGER,
  completed_at_ms INTEGER,
  created_at_ms INTEGER NOT NULL DEFAULT 0,
  revision INTEGER NOT NULL DEFAULT 1,
  deleted_at_ms INTEGER,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_tasks_project ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_updated ON tasks(updated_at_ms DESC);

CREATE TABLE IF NOT EXISTS task_tags (
  task_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY (task_id, tag_id)
);

CREATE INDEX IF NOT EXISTS idx_task_tags_tag ON task_tags(tag_id);

-- 任务↔标签关联的同步元信息:关联数据本身仍在 task_tags(单一事实源),
-- 这里只存 per-task 的 LWW 元数据;载荷在 list_pending 时现查 task_tags 组装。
-- (新表,SCHEMA 与迁移 003 各建一次,IF NOT EXISTS 幂等)
CREATE TABLE IF NOT EXISTS task_tag_sync (
  task_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT '',
  revision INTEGER NOT NULL DEFAULT 1,
  updated_at_ms INTEGER NOT NULL,
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_task_tag_sync_pending
  ON task_tag_sync(sync_state) WHERE sync_state = 'pending';

CREATE TABLE IF NOT EXISTS pomodoros (
  id TEXT PRIMARY KEY NOT NULL,
  task_id TEXT,
  project_id TEXT,
  duration_minutes INTEGER NOT NULL,
  started_at_ms INTEGER NOT NULL,
  ended_at_ms INTEGER NOT NULL,
  is_completed INTEGER NOT NULL DEFAULT 0,
  created_at_ms INTEGER NOT NULL DEFAULT 0,
  revision INTEGER NOT NULL DEFAULT 1,
  deleted_at_ms INTEGER,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_pomodoros_task ON pomodoros(task_id);
CREATE INDEX IF NOT EXISTS idx_pomodoros_started ON pomodoros(started_at_ms DESC);

CREATE TABLE IF NOT EXISTS daily_reviews (
  id TEXT PRIMARY KEY NOT NULL,
  date TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  revision INTEGER NOT NULL DEFAULT 1,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS weekly_reviews (
  id TEXT PRIMARY KEY NOT NULL,
  week_start TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  revision INTEGER NOT NULL DEFAULT 1,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS monthly_reviews (
  id TEXT PRIMARY KEY NOT NULL,
  year_month TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  revision INTEGER NOT NULL DEFAULT 1,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS subtasks (
  id TEXT PRIMARY KEY NOT NULL,
  task_id TEXT NOT NULL,
  title TEXT NOT NULL,
  is_completed INTEGER NOT NULL DEFAULT 0,
  position INTEGER NOT NULL DEFAULT 0,
  created_at_ms INTEGER NOT NULL DEFAULT 0,
  revision INTEGER NOT NULL DEFAULT 1,
  deleted_at_ms INTEGER,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS mottos (
  id TEXT PRIMARY KEY NOT NULL,
  text TEXT NOT NULL DEFAULT '',
  author TEXT,
  created_at_ms INTEGER NOT NULL DEFAULT 0,
  revision INTEGER NOT NULL DEFAULT 1,
  deleted_at_ms INTEGER,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_mottos_updated ON mottos(updated_at_ms DESC);

CREATE INDEX IF NOT EXISTS idx_subtasks_task ON subtasks(task_id);

-- 通知文案模板:全库单行(id 固定 '1';本地设置,不参与同步)
CREATE TABLE IF NOT EXISTS notification_templates (
  id TEXT PRIMARY KEY NOT NULL,
  style TEXT NOT NULL DEFAULT 'default',
  style_description TEXT,
  focus_end_title TEXT,
  focus_end_body TEXT,
  break_end_title TEXT,
  break_end_body TEXT,
  reminder_title TEXT,
  reminder_body TEXT,
  updated_at_ms INTEGER NOT NULL
);

-- 冲突日志:P2 冲突可视化 —— pull/push 探测到 LWW 另一方胜出时落行,
-- 供 UI 列表展示「刚被覆盖的实体」。不参与同步,仅本地记录。
CREATE TABLE IF NOT EXISTS conflict_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  entity_title TEXT NOT NULL DEFAULT '',
  direction TEXT NOT NULL,
  remote_device TEXT NOT NULL DEFAULT '',
  local_updated_ms INTEGER NOT NULL DEFAULT 0,
  remote_updated_ms INTEGER NOT NULL DEFAULT 0,
  occurred_at_ms INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_conflict_log_occurred ON conflict_log(occurred_at_ms DESC);

-- 本机同步元数据(key-value):user_id(本机用户,ADR-007 多租户归属)、
-- device_id(设备标识)、last_sync_seq(拉取游标,ADR-011)
CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL
);

-- 注意:pending partial index(引用 sync_state 列)不放这里 —— 旧库的老表
-- 还没有该列,SCHEMA 先于迁移执行会炸;统一放 migrate.rs 的 migration_002
-- (与"迁移 1 新增列"的索引同一处理方式)。
"#;

// === 时间转换 helper ===

fn now_ms() -> i64 {
    Utc::now().timestamp_millis()
}

fn ts_to_ms(ts: Timestamp) -> i64 {
    ts.0.timestamp_millis()
}

fn ts_from_ms(ms: i64) -> CoreResult<Timestamp> {
    Utc.timestamp_millis_opt(ms)
        .single()
        .map(Timestamp)
        .ok_or_else(|| CoreError::storage(format!("invalid timestamp ms: {ms}")))
}

fn dt_to_ms(dt: DateTime<Utc>) -> i64 {
    dt.timestamp_millis()
}

fn dt_from_ms(ms: i64) -> CoreResult<DateTime<Utc>> {
    Utc.timestamp_millis_opt(ms)
        .single()
        .ok_or_else(|| CoreError::storage(format!("invalid datetime ms: {ms}")))
}

/// task_tag_sync 行 → (TaskTagLink, origin)。`tag_ids` 列由查询侧从 task_tags
/// 现查(GROUP_CONCAT;NULL = 空集即清除 tombstone),这里解析后排序去重,
/// 与写入侧同规格,保证"同一集合 → 同一载荷",不因顺序产生伪冲突。
fn row_to_task_tag_link(row: &Row<'_>) -> rusqlite::Result<(TaskTagLink, String)> {
    let task_id_s: String = row.get("task_id")?;
    let task_id = Id::parse(&task_id_s).ok_or_else(|| {
        core_err(CoreError::storage(format!(
            "invalid task_tag task_id: {task_id_s}"
        )))
    })?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);
    let joined: Option<String> = row.get("tag_ids")?;
    let mut tag_ids: Vec<Id> = joined
        .map(|s| {
            s.split(',')
                .filter(|p| !p.is_empty())
                .map(|p| Id(p.to_string()))
                .collect()
        })
        .unwrap_or_default();
    tag_ids.sort_by(|a, b| a.0.cmp(&b.0));
    tag_ids.dedup_by(|a, b| a.0 == b.0);
    Ok((
        TaskTagLink {
            task_id,
            tag_ids,
            user_id,
            revision: row.get::<_, i64>("revision")? as u64,
            updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
        },
        row.get("origin_device")?,
    ))
}

// === 枚举 ↔ 字符串 ===

fn task_status_str(s: TaskStatus) -> &'static str {
    match s {
        TaskStatus::Active => "active",
        TaskStatus::Completed => "completed",
    }
}

fn task_status_parse(s: &str) -> CoreResult<TaskStatus> {
    match s {
        "active" => Ok(TaskStatus::Active),
        "completed" => Ok(TaskStatus::Completed),
        other => Err(CoreError::storage(format!("unknown TaskStatus: {other}"))),
    }
}

fn priority_str(p: Priority) -> &'static str {
    match p {
        Priority::High => "high",
        Priority::Medium => "medium",
        Priority::Low => "low",
        Priority::None => "none",
    }
}

fn priority_parse(s: &str) -> CoreResult<Priority> {
    match s {
        "high" => Ok(Priority::High),
        "medium" => Ok(Priority::Medium),
        "low" => Ok(Priority::Low),
        "none" => Ok(Priority::None),
        other => Err(CoreError::storage(format!("unknown Priority: {other}"))),
    }
}

fn reminder_str(r: Reminder) -> &'static str {
    match r {
        Reminder::None => "none",
        Reminder::OnTime => "on_time",
        Reminder::Minutes5 => "minutes5",
        Reminder::Minutes30 => "minutes30",
        Reminder::Hour1 => "hour1",
        Reminder::Day1 => "day1",
        Reminder::Days2 => "days2",
    }
}

fn reminder_parse(s: &str) -> CoreResult<Reminder> {
    match s {
        "none" => Ok(Reminder::None),
        "on_time" => Ok(Reminder::OnTime),
        "minutes5" => Ok(Reminder::Minutes5),
        "minutes30" => Ok(Reminder::Minutes30),
        "hour1" => Ok(Reminder::Hour1),
        "day1" => Ok(Reminder::Day1),
        "days2" => Ok(Reminder::Days2),
        other => Err(CoreError::storage(format!("unknown Reminder: {other}"))),
    }
}

fn repeat_str(r: Repeat) -> &'static str {
    match r {
        Repeat::None => "none",
        Repeat::Daily => "daily",
        Repeat::Weekdays => "weekdays",
        Repeat::Weekly => "weekly",
        Repeat::Monthly => "monthly",
        Repeat::Yearly => "yearly",
        Repeat::Custom => "custom",
    }
}

fn repeat_parse(s: &str) -> CoreResult<Repeat> {
    match s {
        "none" => Ok(Repeat::None),
        "daily" => Ok(Repeat::Daily),
        "weekdays" => Ok(Repeat::Weekdays),
        "weekly" => Ok(Repeat::Weekly),
        "monthly" => Ok(Repeat::Monthly),
        "yearly" => Ok(Repeat::Yearly),
        "custom" => Ok(Repeat::Custom),
        other => Err(CoreError::storage(format!("unknown Repeat: {other}"))),
    }
}

/// 把 `TaskDateFilter` 展开为 `[start_ms, end_ms)` 区间,SQL 直接拿两个参数。
///
/// `tz_offset_min`(东正西负,东八区 +480)决定"今天/明天/本周"的日界:
/// 按请求方**本地**日历取今日 0 点再换算回 UTC —— due_date 存 UTC,纯日期
/// 任务(本地午夜)在东八区落在 UTC 前一天,若按 UTC 日界过滤会错一天。
fn date_filter_range(f: TaskDateFilter, tz_offset_min: i32) -> (i64, i64) {
    let offset = chrono::FixedOffset::east_opt(tz_offset_min * 60)
        .unwrap_or_else(|| chrono::FixedOffset::east_opt(0).unwrap());
    let now_local = Utc::now().with_timezone(&offset);
    let today_start = now_local
        .date_naive()
        .and_hms_opt(0, 0, 0)
        .unwrap()
        .and_local_timezone(offset)
        .single()
        .unwrap_or(now_local)
        .with_timezone(&Utc);
    match f {
        TaskDateFilter::Today => {
            let end = today_start + chrono::Duration::days(1);
            (dt_to_ms(today_start), dt_to_ms(end))
        }
        TaskDateFilter::Tomorrow => {
            let start = today_start + chrono::Duration::days(1);
            let end = today_start + chrono::Duration::days(2);
            (dt_to_ms(start), dt_to_ms(end))
        }
        TaskDateFilter::ThisWeek => {
            // 周一为一周开始(本地日历)
            let weekday = now_local.date_naive().weekday().num_days_from_monday() as i64;
            let week_start = today_start - chrono::Duration::days(weekday);
            let week_end = week_start + chrono::Duration::days(7);
            (dt_to_ms(week_start), dt_to_ms(week_end))
        }
    }
}

// === 行解析 ===

/// `CoreError` → `rusqlite::Error` 转换。提供给 `row_to_*` 内部 `?` 链路使用。
fn core_err(e: CoreError) -> rusqlite::Error {
    rusqlite::Error::ToSqlConversionFailure(e.into())
}

/// `CoreResult<T>` → `rusqlite::Result<T>` 适配器,用于把 `Ok(Task { ... })` 这种
/// 整体表达式喂给 `query_row` / `query_map`。
#[allow(dead_code)] // 保留作为 `core_try` 的 alias,有些场景(测试)直接用更顺
fn adapt<T>(r: CoreResult<T>) -> rusqlite::Result<T> {
    r.map_err(core_err)
}

/// `Try` 风格 helper,让 `?` 能从 `CoreError` 跳到 `rusqlite::Error`。
fn core_try<T>(r: CoreResult<T>) -> rusqlite::Result<T> {
    r.map_err(core_err)
}

fn row_to_task(row: &Row<'_>) -> rusqlite::Result<Task> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s)
        .ok_or_else(|| core_err(CoreError::storage(format!("invalid task id: {id_s}"))))?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    let deleted_at_ms: Option<i64> = row.get("deleted_at_ms")?;
    let updated_at_ms: i64 = row.get("updated_at_ms")?;
    let due_date_ms: Option<i64> = row.get("due_date_ms")?;
    let completed_at_ms: Option<i64> = row.get("completed_at_ms")?;
    let repeat_end_date_ms: Option<i64> = row.get("repeat_end_date_ms")?;
    let pomodoro_duration: Option<i64> = row.get("pomodoro_duration")?;

    let project_id_s: Option<String> = row.get("project_id")?;
    let project_id = match project_id_s {
        Some(s) => Some(
            Id::parse(&s)
                .ok_or_else(|| core_err(CoreError::storage(format!("invalid project_id: {s}"))))?,
        ),
        None => None,
    };
    let repeat_parent_s: Option<String> = row.get("repeat_parent_id")?;
    let repeat_parent_id = match repeat_parent_s {
        Some(s) => Some(Id::parse(&s).ok_or_else(|| {
            core_err(CoreError::storage(format!("invalid repeat_parent_id: {s}")))
        })?),
        None => None,
    };

    let priority_s: String = row.get("priority")?;
    let status_s: String = row.get("status")?;
    let reminder_s: String = row.get("reminder")?;
    let repeat_kind_s: String = row.get("repeat_kind")?;

    let make = || {
        core_try(Ok(Task {
            id: id.clone(),
            user_id: user_id.clone(),
            title: row.get("title")?,
            description: row.get("description")?,
            project_id: project_id.clone(),
            priority: priority_parse(&priority_s).map_err(core_err)?,
            status: task_status_parse(&status_s).map_err(core_err)?,
            due_date: due_date_ms.map(dt_from_ms).transpose().map_err(core_err)?,
            estimated_pomodoros: row.get::<_, i64>("estimated_pomodoros")? as u32,
            completed_pomodoros: row.get::<_, i64>("completed_pomodoros")? as u32,
            pomodoro_duration: pomodoro_duration.map(|v| v as u32),
            reminder: reminder_parse(&reminder_s).map_err(core_err)?,
            repeat: repeat_parse(&repeat_kind_s).map_err(core_err)?,
            repeat_config: row.get("repeat_config")?,
            repeat_parent_id: repeat_parent_id.clone(),
            repeat_end_date: repeat_end_date_ms
                .map(dt_from_ms)
                .transpose()
                .map_err(core_err)?,
            completed_at: completed_at_ms
                .map(dt_from_ms)
                .transpose()
                .map_err(core_err)?,
            created_at: ts_from_ms(row.get("created_at_ms")?).map_err(core_err)?,
            revision: row.get::<_, i64>("revision")? as u64,
            deleted_at: deleted_at_ms
                .map(ts_from_ms)
                .transpose()
                .map_err(core_err)?,
            updated_at: ts_from_ms(updated_at_ms).map_err(core_err)?,
        }))
    };
    make()
}

fn row_to_project(row: &Row<'_>) -> rusqlite::Result<Project> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s)
        .ok_or_else(|| core_err(CoreError::storage(format!("invalid project id: {id_s}"))))?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    let parent_id_s: Option<String> = row.get("parent_id")?;
    let parent_id = match parent_id_s {
        Some(s) => Some(
            Id::parse(&s)
                .ok_or_else(|| core_err(CoreError::storage(format!("invalid parent_id: {s}"))))?,
        ),
        None => None,
    };

    core_try(Ok(Project {
        id,
        user_id,
        name: row.get("name")?,
        color: row.get("color")?,
        parent_id,
        display_order: row.get::<_, i64>("display_order")? as u32,
        created_at: ts_from_ms(row.get("created_at_ms")?).map_err(core_err)?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: row
            .get::<_, Option<i64>>("deleted_at_ms")?
            .map(ts_from_ms)
            .transpose()
            .map_err(core_err)?,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

fn row_to_tag(row: &Row<'_>) -> rusqlite::Result<Tag> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s)
        .ok_or_else(|| core_err(CoreError::storage(format!("invalid tag id: {id_s}"))))?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    core_try(Ok(Tag {
        id,
        user_id,
        name: row.get("name")?,
        color: row.get("color")?,
        display_order: row.get::<_, i64>("display_order")? as u32,
        created_at: ts_from_ms(row.get("created_at_ms")?).map_err(core_err)?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: row
            .get::<_, Option<i64>>("deleted_at_ms")?
            .map(ts_from_ms)
            .transpose()
            .map_err(core_err)?,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

fn row_to_pomodoro(row: &Row<'_>) -> rusqlite::Result<PomodoroSession> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s)
        .ok_or_else(|| core_err(CoreError::storage(format!("invalid pomodoro id: {id_s}"))))?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    let task_id_s: Option<String> = row.get("task_id")?;
    let task_id = match task_id_s {
        Some(s) => Some(
            Id::parse(&s)
                .ok_or_else(|| core_err(CoreError::storage(format!("invalid task_id: {s}"))))?,
        ),
        None => None,
    };
    let project_id_s: Option<String> = row.get("project_id")?;
    let project_id = match project_id_s {
        Some(s) => Some(
            Id::parse(&s)
                .ok_or_else(|| core_err(CoreError::storage(format!("invalid project_id: {s}"))))?,
        ),
        None => None,
    };

    core_try(Ok(PomodoroSession {
        id,
        user_id,
        task_id,
        project_id,
        duration: row.get::<_, i64>("duration_minutes")? as u32,
        started_at: dt_from_ms(row.get("started_at_ms")?).map_err(core_err)?,
        ended_at: dt_from_ms(row.get("ended_at_ms")?).map_err(core_err)?,
        is_completed: row.get::<_, i64>("is_completed")? != 0,
        created_at: ts_from_ms(row.get("created_at_ms")?).map_err(core_err)?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: row
            .get::<_, Option<i64>>("deleted_at_ms")?
            .map(ts_from_ms)
            .transpose()
            .map_err(core_err)?,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

fn row_to_daily_review(row: &Row<'_>) -> rusqlite::Result<DailyReview> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s).ok_or_else(|| {
        core_err(CoreError::storage(format!(
            "invalid daily_review id: {id_s}"
        )))
    })?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    core_try(Ok(DailyReview {
        id,
        user_id,
        date: row.get("date")?,
        content: row.get("content")?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: None,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

fn row_to_weekly_review(row: &Row<'_>) -> rusqlite::Result<WeeklyReview> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s).ok_or_else(|| {
        core_err(CoreError::storage(format!(
            "invalid weekly_review id: {id_s}"
        )))
    })?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    core_try(Ok(WeeklyReview {
        id,
        user_id,
        week_start: row.get("week_start")?,
        content: row.get("content")?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: None,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

fn row_to_monthly_review(row: &Row<'_>) -> rusqlite::Result<MonthlyReview> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s).ok_or_else(|| {
        core_err(CoreError::storage(format!(
            "invalid monthly_review id: {id_s}"
        )))
    })?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    core_try(Ok(MonthlyReview {
        id,
        user_id,
        year_month: row.get("year_month")?,
        content: row.get("content")?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: None,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

fn row_to_subtask(row: &Row<'_>) -> rusqlite::Result<SubTask> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s)
        .ok_or_else(|| core_err(CoreError::storage(format!("invalid subtask id: {id_s}"))))?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    let task_id_s: String = row.get("task_id")?;
    let task_id = Id::parse(&task_id_s).ok_or_else(|| {
        core_err(CoreError::storage(format!(
            "invalid subtask task_id: {task_id_s}"
        )))
    })?;

    core_try(Ok(SubTask {
        id,
        user_id,
        task_id,
        title: row.get("title")?,
        is_completed: row.get::<_, i64>("is_completed")? != 0,
        position: row.get::<_, i64>("position")? as u32,
        created_at: ts_from_ms(row.get("created_at_ms")?).map_err(core_err)?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: row
            .get::<_, Option<i64>>("deleted_at_ms")?
            .map(ts_from_ms)
            .transpose()
            .map_err(core_err)?,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

fn row_to_motto(row: &Row<'_>) -> rusqlite::Result<Motto> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s)
        .ok_or_else(|| core_err(CoreError::storage(format!("invalid motto id: {id_s}"))))?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    core_try(Ok(Motto {
        id,
        user_id,
        text: row.get("text")?,
        author: row.get::<_, Option<String>>("author")?,
        created_at: ts_from_ms(row.get("created_at_ms")?).map_err(core_err)?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: row
            .get::<_, Option<i64>>("deleted_at_ms")?
            .map(ts_from_ms)
            .transpose()
            .map_err(core_err)?,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

fn row_to_notification_template(row: &Row<'_>) -> rusqlite::Result<NotificationTemplate> {
    // id 固定 '1',不是 UUID —— 直接读字符串,不走 Id::parse
    core_try(Ok(NotificationTemplate {
        id: Id(row.get::<_, String>("id")?),
        style: row.get("style")?,
        style_description: row.get::<_, Option<String>>("style_description")?,
        focus_end_title: row.get::<_, Option<String>>("focus_end_title")?,
        focus_end_body: row.get::<_, Option<String>>("focus_end_body")?,
        break_end_title: row.get::<_, Option<String>>("break_end_title")?,
        break_end_body: row.get::<_, Option<String>>("break_end_body")?,
        reminder_title: row.get::<_, Option<String>>("reminder_title")?,
        reminder_body: row.get::<_, Option<String>>("reminder_body")?,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

// === Store trait impl ===

impl Store for SqliteStore {
    fn list_tasks(&self, q: &TaskQuery) -> CoreResult<Vec<Task>> {
        let conn = self.lock()?;

        // 基础 SQL —— list 时过滤软删除,再叠加动态过滤条件
        let mut sql = String::from(
            "SELECT t.* FROM tasks t \
             WHERE t.deleted_at_ms IS NULL",
        );
        let mut args: Vec<Box<dyn rusqlite::ToSql>> = Vec::new();

        if let Some(pid) = &q.project_id {
            sql.push_str(" AND t.project_id = ?");
            args.push(Box::new(pid.as_str().to_string()));
        }
        if let Some(s) = q.status {
            sql.push_str(" AND t.status = ?");
            args.push(Box::new(task_status_str(s).to_string()));
        }
        if let Some(tag_id) = &q.tag_id {
            sql.push_str(
                " AND EXISTS (SELECT 1 FROM task_tags tt WHERE tt.task_id = t.id AND tt.tag_id = ?)",
            );
            args.push(Box::new(tag_id.as_str().to_string()));
        }
        if let Some(p) = q.priority {
            sql.push_str(" AND t.priority = ?");
            args.push(Box::new(priority_str(p).to_string()));
        }
        if let Some(rp) = &q.repeat_parent {
            sql.push_str(" AND t.repeat_parent_id = ?");
            args.push(Box::new(rp.as_str().to_string()));
        }
        // 月份区间(v1 番茄钟右侧"当月任务"用)
        if let Some(start) = q.month_start_ms {
            sql.push_str(" AND t.due_date_ms >= ?");
            args.push(Box::new(start));
        }
        if let Some(end) = q.month_end_ms {
            sql.push_str(" AND t.due_date_ms <= ?");
            args.push(Box::new(end));
        }
        // 日期维度(today / tomorrow / this_week) —— 在 SQL 里展开
        if let Some(date_filter) = q.date {
            let (start, end) = date_filter_range(date_filter, q.tz_offset_min.unwrap_or(0));
            sql.push_str(" AND t.due_date_ms >= ? AND t.due_date_ms < ?");
            args.push(Box::new(start));
            args.push(Box::new(end));
        }

        sql.push_str(" ORDER BY t.created_at_ms DESC, t.id");
        // v1:limit 1–5000,缺省 1000
        sql.push_str(&format!(" LIMIT {}", crate::validate::clamp_limit(q.limit)));

        let mut stmt = conn
            .prepare(&sql)
            .map_err(|e| CoreError::storage(format!("prepare list_tasks: {e}")))?;

        let arg_refs: Vec<&dyn rusqlite::ToSql> = args.iter().map(|b| b.as_ref()).collect();

        let rows = stmt
            .query_map(&arg_refs[..], row_to_task)
            .map_err(|e| CoreError::storage(format!("query list_tasks: {e}")))?;

        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CoreError::storage(format!("row list_tasks: {e}")))?);
        }
        Ok(out)
    }

    fn list_tasks_for_stats(&self) -> CoreResult<Vec<Task>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                // 全量(无 LIMIT):统计聚合与 v1 全表过滤语义一致
                "SELECT * FROM tasks WHERE deleted_at_ms IS NULL
                 ORDER BY created_at_ms DESC, id",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_tasks_for_stats: {e}")))?;
        let rows = stmt
            .query_map([], row_to_task)
            .map_err(|e| CoreError::storage(format!("query: {e}")))?;
        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CoreError::storage(format!("row: {e}")))?);
        }
        Ok(out)
    }

    fn get_task(&self, id: &Id) -> CoreResult<Task> {
        let conn = self.lock()?;
        conn.query_row(
            "SELECT * FROM tasks WHERE id = ?",
            params![id.as_str()],
            row_to_task,
        )
        .optional()
        .map_err(|e| CoreError::storage(format!("get_task: {e}")))?
        .ok_or_else(|| CoreError::NotFound {
            entity: "task",
            id: id.to_string(),
        })
    }

    fn upsert_task(&self, task: Task) -> CoreResult<Task> {
        self.upsert_task_marked(task, true)
    }

    fn delete_task(&self, id: &Id) -> CoreResult<()> {
        let conn = self.lock()?;
        // 软删即 tombstone:revision+1 + pending,让"删除"作为变更被推送(ADR-006)
        conn.execute(
            "UPDATE tasks SET deleted_at_ms = ?, updated_at_ms = ?,
                revision = revision + 1, sync_state = 'pending', origin_device = ?
             WHERE id = ?",
            params![now_ms(), now_ms(), self.device_id, id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("delete_task: {e}")))?;
        // 关联标签一并清掉,并把关联同步行写成空集 tombstone(revision+1 + pending,
        // 载荷=空集合,ADR-010 同语义);没打过标签的任务无行,UPDATE 自动 no-op
        conn.execute(
            "DELETE FROM task_tags WHERE task_id = ?",
            params![id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("delete_task task_tags: {e}")))?;
        conn.execute(
            "UPDATE task_tag_sync SET revision = revision + 1, updated_at_ms = ?,
                sync_state = 'pending', origin_device = ?
             WHERE task_id = ?",
            params![now_ms(), self.device_id, id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("delete_task task_tag_sync: {e}")))?;
        Ok(())
    }

    fn list_deleted_tasks(&self) -> CoreResult<Vec<Task>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                "SELECT * FROM tasks WHERE deleted_at_ms IS NOT NULL
                 ORDER BY deleted_at_ms DESC, id ASC",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_deleted_tasks: {e}")))?;
        let rows = stmt
            .query_map([], row_to_task)
            .map_err(|e| CoreError::storage(format!("query list_deleted_tasks: {e}")))?;
        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CoreError::storage(format!("row: {e}")))?);
        }
        Ok(out)
    }

    fn restore_task(&self, id: &Id) -> CoreResult<()> {
        let conn = self.lock()?;
        // 清 deleted_at + bump revision + 标 pending → 服务端会把这个"还原"当
        // 一条普通变更推进,多端 LWW 收敛(若两端同时还原/还原,revision 大者胜)。
        let changed = conn
            .execute(
                "UPDATE tasks SET deleted_at_ms = NULL, updated_at_ms = ?,
                    revision = revision + 1, sync_state = 'pending', origin_device = ?
                 WHERE id = ? AND deleted_at_ms IS NOT NULL",
                params![now_ms(), self.device_id, id.as_str()],
            )
            .map_err(|e| CoreError::storage(format!("restore_task: {e}")))?;
        if changed == 0 {
            // 行不存在 或 已是活动态 —— 与 LWW 收敛语义一致:不抛错,no-op。
            return Ok(());
        }
        Ok(())
    }

    fn purge_task(&self, id: &Id) -> CoreResult<()> {
        let conn = self.lock()?;
        // 物理删除:同时清掉 task_tags + task_tag_sync 两张关联表;revisions 同步行
        // 通过外键 / 显式 SQL 清(无外键定义)。重复实例(重复任务)的 subtasks / sessions
        // 由上游 repeat_service.delete_all_instances 调用方保证先清。
        conn.execute("DELETE FROM task_tags WHERE task_id = ?", params![id.as_str()])
            .map_err(|e| CoreError::storage(format!("purge_task task_tags: {e}")))?;
        conn.execute(
            "DELETE FROM task_tag_sync WHERE task_id = ?",
            params![id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("purge_task task_tag_sync: {e}")))?;
        let changed = conn
            .execute("DELETE FROM tasks WHERE id = ?", params![id.as_str()])
            .map_err(|e| CoreError::storage(format!("purge_task: {e}")))?;
        if changed == 0 {
            return Err(CoreError::NotFound {
                entity: "task",
                id: id.to_string(),
            });
        }
        Ok(())
    }

    fn list_projects(&self) -> CoreResult<Vec<Project>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                // v1 排序:(parent_id, display_order, id);SQLite ASC 下 NULL parent 排最前
                "SELECT * FROM projects WHERE deleted_at_ms IS NULL
                 ORDER BY parent_id ASC, display_order ASC, id ASC",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_projects: {e}")))?;
        let rows = stmt
            .query_map([], row_to_project)
            .map_err(|e| CoreError::storage(format!("query list_projects: {e}")))?;
        rows.map(|r| r.map_err(|e| CoreError::storage(format!("row: {e}"))))
            .collect()
    }

    fn get_project(&self, id: &Id) -> CoreResult<Project> {
        let conn = self.lock()?;
        conn.query_row(
            "SELECT * FROM projects WHERE id = ?",
            params![id.as_str()],
            row_to_project,
        )
        .optional()
        .map_err(|e| CoreError::storage(format!("get_project: {e}")))?
        .ok_or_else(|| CoreError::NotFound {
            entity: "project",
            id: id.to_string(),
        })
    }

    fn upsert_project(&self, project: Project) -> CoreResult<Project> {
        self.upsert_project_marked(project, true)
    }

    fn delete_project(&self, id: &Id) -> CoreResult<()> {
        let conn = self.lock()?;
        // v1 FK 语义:删除项目 → 整棵子树级联删 + 相关 tasks/pomodoros 的
        // project_id 置空(ON DELETE CASCADE / SET NULL)。
        // 级联触及的每一行都要 revision+1 + pending,变更才能被同步。
        let mut stmt = conn
            .prepare("SELECT id, parent_id FROM projects WHERE deleted_at_ms IS NULL")
            .map_err(|e| CoreError::storage(format!("prepare delete_project: {e}")))?;
        let rows: Vec<(String, Option<String>)> = stmt
            .query_map([], |r| Ok((r.get(0)?, r.get(1)?)))
            .map_err(|e| CoreError::storage(format!("query: {e}")))?
            .filter_map(|r| r.ok())
            .collect();
        drop(stmt);

        // BFS 收集子树
        let mut subtree = vec![id.as_str().to_string()];
        let mut frontier = vec![id.as_str().to_string()];
        while let Some(cur) = frontier.pop() {
            for (pid, parent) in &rows {
                if parent.as_deref() == Some(cur.as_str()) && !subtree.contains(pid) {
                    subtree.push(pid.clone());
                    frontier.push(pid.clone());
                }
            }
        }

        let tx = conn
            .unchecked_transaction()
            .map_err(|e| CoreError::storage(format!("begin tx: {e}")))?;
        for pid in &subtree {
            tx.execute(
                "UPDATE projects SET deleted_at_ms = ?, updated_at_ms = ?,
                    revision = revision + 1, sync_state = 'pending', origin_device = ?
                 WHERE id = ?",
                params![now_ms(), now_ms(), self.device_id, pid],
            )
            .map_err(|e| CoreError::storage(format!("cascade delete project: {e}")))?;
            tx.execute(
                "UPDATE tasks SET project_id = NULL, updated_at_ms = ?,
                    revision = revision + 1, sync_state = 'pending', origin_device = ?
                 WHERE project_id = ?",
                params![now_ms(), self.device_id, pid],
            )
            .map_err(|e| CoreError::storage(format!("detach tasks: {e}")))?;
            tx.execute(
                "UPDATE pomodoros SET project_id = NULL, updated_at_ms = ?,
                    revision = revision + 1, sync_state = 'pending', origin_device = ?
                 WHERE project_id = ?",
                params![now_ms(), self.device_id, pid],
            )
            .map_err(|e| CoreError::storage(format!("detach pomodoros: {e}")))?;
        }
        tx.commit()
            .map_err(|e| CoreError::storage(format!("delete_project commit: {e}")))
    }

    fn reorder_projects(&self, items: &[crate::reorder::ReorderItem]) -> CoreResult<()> {
        let conn = self.lock()?;
        // 取全图(未软删):提交项新 parent 覆盖,未涉及节点原状参与环/深度校验
        let mut stmt = conn
            .prepare("SELECT id, parent_id FROM projects WHERE deleted_at_ms IS NULL")
            .map_err(|e| CoreError::storage(format!("prepare reorder_projects: {e}")))?;
        let existing: Vec<(String, Option<String>)> = stmt
            .query_map([], |r| Ok((r.get(0)?, r.get(1)?)))
            .map_err(|e| CoreError::storage(format!("query: {e}")))?
            .filter_map(|r| r.ok())
            .collect();
        drop(stmt);

        let parse_pair = |(id_s, parent_s): &(String, Option<String>)| -> Option<(Id, Option<Id>)> {
            let id = Id::parse(id_s)?;
            let parent = match parent_s {
                Some(s) => Some(Id::parse(s)?),
                None => None,
            };
            Some((id, parent))
        };
        let existing: Vec<(Id, Option<Id>)> = existing.iter().filter_map(parse_pair).collect();
        let existing_ids: std::collections::HashSet<Id> =
            existing.iter().map(|(id, _)| id.clone()).collect();
        crate::reorder::validate_ids_exist(items, &existing_ids)?;
        crate::reorder::validate_project_reorder(&crate::reorder::merge_graph(items, &existing))?;

        // 校验通过后单事务更新;任何一步失败整体回滚(v1 行为)
        let tx = conn
            .unchecked_transaction()
            .map_err(|e| CoreError::storage(format!("begin tx: {e}")))?;
        for it in items {
            tx.execute(
                "UPDATE projects
                 SET parent_id = ?, display_order = ?, updated_at_ms = ?,
                     revision = revision + 1, sync_state = 'pending', origin_device = ?
                 WHERE id = ?",
                params![
                    it.parent_id.as_ref().map(|p| p.as_str().to_string()),
                    it.display_order as i64,
                    now_ms(),
                    self.device_id,
                    it.id.as_str()
                ],
            )
            .map_err(|e| CoreError::storage(format!("reorder_projects update: {e}")))?;
        }
        tx.commit()
            .map_err(|e| CoreError::storage(format!("reorder_projects commit: {e}")))
    }

    fn list_tags(&self) -> CoreResult<Vec<Tag>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                // v1 排序:(display_order, id) —— 用户拖拽顺序优先
                "SELECT * FROM tags WHERE deleted_at_ms IS NULL ORDER BY display_order ASC, id ASC",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_tags: {e}")))?;
        let rows = stmt
            .query_map([], row_to_tag)
            .map_err(|e| CoreError::storage(format!("query list_tags: {e}")))?;
        rows.map(|r| r.map_err(|e| CoreError::storage(format!("row: {e}"))))
            .collect()
    }

    fn get_tag(&self, id: &Id) -> CoreResult<Tag> {
        let conn = self.lock()?;
        conn.query_row(
            "SELECT * FROM tags WHERE id = ?",
            params![id.as_str()],
            row_to_tag,
        )
        .optional()
        .map_err(|e| CoreError::storage(format!("get_tag: {e}")))?
        .ok_or_else(|| CoreError::NotFound {
            entity: "tag",
            id: id.to_string(),
        })
    }

    fn upsert_tag(&self, tag: Tag) -> CoreResult<Tag> {
        // 唯一约束通过 partial unique index 实现 —— 软删除的不算冲突。
        // 但 active 同名 tag 已存在时返回 Conflict。
        {
            let conn = self.lock()?;
            let conflict: Option<String> = conn
                .query_row(
                    "SELECT id FROM tags
                     WHERE name = ? COLLATE NOCASE
                       AND deleted_at_ms IS NULL
                       AND id != ?",
                    params![tag.name, tag.id.as_str()],
                    |row| row.get(0),
                )
                .optional()
                .map_err(|e| CoreError::storage(format!("check tag name: {e}")))?;

            if conflict.is_some() {
                return Err(CoreError::Conflict(format!(
                    "tag name '{}' already exists",
                    tag.name
                )));
            }
        }
        self.upsert_tag_marked(tag, true)
    }

    fn delete_tag(&self, id: &Id) -> CoreResult<()> {
        let conn = self.lock()?;
        conn.execute(
            "UPDATE tags SET deleted_at_ms = ?, updated_at_ms = ?,
                revision = revision + 1, sync_state = 'pending', origin_device = ?
             WHERE id = ?",
            params![now_ms(), now_ms(), self.device_id, id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("delete_tag: {e}")))?;
        // 顺手清掉 task_tags 关联(可选,但符合预期;task_tags 本身不参与同步,P1a 处理)
        conn.execute(
            "DELETE FROM task_tags WHERE tag_id = ?",
            params![id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("cleanup task_tags: {e}")))?;
        Ok(())
    }

    fn reorder_tags(&self, items: &[crate::reorder::ReorderItem]) -> CoreResult<()> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare("SELECT id FROM tags WHERE deleted_at_ms IS NULL")
            .map_err(|e| CoreError::storage(format!("prepare reorder_tags: {e}")))?;
        let existing_ids: std::collections::HashSet<Id> = stmt
            .query_map([], |r| r.get::<_, String>(0))
            .map_err(|e| CoreError::storage(format!("query: {e}")))?
            .filter_map(|r| r.ok())
            .filter_map(|s| Id::parse(&s))
            .collect();
        drop(stmt);
        crate::reorder::validate_ids_exist(items, &existing_ids)?;

        let tx = conn
            .unchecked_transaction()
            .map_err(|e| CoreError::storage(format!("begin tx: {e}")))?;
        for it in items {
            tx.execute(
                "UPDATE tags SET display_order = ?, updated_at_ms = ?,
                    revision = revision + 1, sync_state = 'pending', origin_device = ?
                 WHERE id = ?",
                params![
                    it.display_order as i64,
                    now_ms(),
                    self.device_id,
                    it.id.as_str()
                ],
            )
            .map_err(|e| CoreError::storage(format!("reorder_tags update: {e}")))?;
        }
        tx.commit()
            .map_err(|e| CoreError::storage(format!("reorder_tags commit: {e}")))
    }

    fn list_tags_for_task(&self, task_id: &Id) -> CoreResult<Vec<Tag>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                "SELECT t.* FROM tags t
                 JOIN task_tags tt ON tt.tag_id = t.id
                 WHERE tt.task_id = ? AND t.deleted_at_ms IS NULL
                 ORDER BY t.name",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_tags_for_task: {e}")))?;
        let rows = stmt
            .query_map(params![task_id.as_str()], row_to_tag)
            .map_err(|e| CoreError::storage(format!("query: {e}")))?;
        rows.map(|r| r.map_err(|e| CoreError::storage(format!("row: {e}"))))
            .collect()
    }

    fn list_tags_for_tasks(&self, task_ids: &[Id]) -> CoreResult<HashMap<Id, Vec<Tag>>> {
        let mut out: HashMap<Id, Vec<Tag>> = HashMap::new();
        if task_ids.is_empty() {
            return Ok(out);
        }
        let conn = self.lock()?;
        // 用 IN (...) 一次查所有 task_tag 关联,内存里再 join tags。
        let placeholders = std::iter::repeat_n("?", task_ids.len())
            .collect::<Vec<_>>()
            .join(",");
        let sql = format!(
            "SELECT tt.task_id, t.* FROM tags t
             JOIN task_tags tt ON tt.tag_id = t.id
             WHERE tt.task_id IN ({placeholders}) AND t.deleted_at_ms IS NULL
             ORDER BY t.name"
        );
        let mut stmt = conn
            .prepare(&sql)
            .map_err(|e| CoreError::storage(format!("prepare list_tags_for_tasks: {e}")))?;
        let mut rows = stmt
            .query(rusqlite::params_from_iter(
                task_ids.iter().map(|i| i.as_str()),
            ))
            .map_err(|e| CoreError::storage(format!("query: {e}")))?;
        while let Some(row) = rows
            .next()
            .map_err(|e| CoreError::storage(format!("row: {e}")))?
        {
            let task_id_s: String = row
                .get::<_, String>(0)
                .map_err(|e| CoreError::storage(format!("row.task_id: {e}")))?;
            let tag =
                row_to_tag(row).map_err(|e| CoreError::storage(format!("row_to_tag: {e}")))?;
            out.entry(Id(task_id_s)).or_default().push(tag);
        }
        Ok(out)
    }

    fn set_tags_for_task(&self, task_id: &Id, tag_ids: &[Id]) -> CoreResult<()> {
        // 本地写:revision 自增 + pending(0 → 1 起步),origin = 本机设备
        let cur: u64 = {
            let conn = self.lock()?;
            conn.query_row(
                "SELECT revision FROM task_tag_sync WHERE task_id = ?",
                params![task_id.as_str()],
                |row| row.get::<_, i64>(0),
            )
            .optional()
            .map_err(|e| CoreError::storage(format!("read task_tag revision: {e}")))?
            .map(|v| v.unsigned_abs())
            .unwrap_or(0)
        };
        let device = self.device_id.clone();
        self.set_tags_for_task_marked(task_id, tag_ids, cur + 1, Timestamp::now(), &device, true)
    }

    fn list_pomodoros(&self) -> CoreResult<Vec<PomodoroSession>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                "SELECT * FROM pomodoros WHERE deleted_at_ms IS NULL ORDER BY started_at_ms DESC",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_pomodoros: {e}")))?;
        let rows = stmt
            .query_map([], row_to_pomodoro)
            .map_err(|e| CoreError::storage(format!("query: {e}")))?;
        rows.map(|r| r.map_err(|e| CoreError::storage(format!("row: {e}"))))
            .collect()
    }

    fn list_pomodoros_between(
        &self,
        start_ms: i64,
        end_ms: i64,
    ) -> CoreResult<Vec<PomodoroSession>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                "SELECT * FROM pomodoros
                 WHERE deleted_at_ms IS NULL
                   AND started_at_ms >= ? AND started_at_ms < ?
                 ORDER BY started_at_ms DESC",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_pomodoros_between: {e}")))?;
        let rows = stmt
            .query_map(params![start_ms, end_ms], row_to_pomodoro)
            .map_err(|e| CoreError::storage(format!("query: {e}")))?;
        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CoreError::storage(format!("row: {e}")))?);
        }
        Ok(out)
    }

    fn upsert_pomodoro(&self, session: PomodoroSession) -> CoreResult<PomodoroSession> {
        self.upsert_pomodoro_marked(session, true)
    }

    fn delete_pomodoro(&self, id: &Id) -> CoreResult<()> {
        let conn = self.lock()?;
        conn.execute(
            "UPDATE pomodoros SET deleted_at_ms = ?, updated_at_ms = ?,
                revision = revision + 1, sync_state = 'pending', origin_device = ?
             WHERE id = ?",
            params![now_ms(), now_ms(), self.device_id, id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("delete_pomodoro: {e}")))?;
        Ok(())
    }

    fn get_daily_review(&self, date: &str) -> CoreResult<Option<DailyReview>> {
        let conn = self.lock()?;
        conn.query_row(
            "SELECT * FROM daily_reviews WHERE date = ?",
            params![date],
            row_to_daily_review,
        )
        .optional()
        .map_err(|e| CoreError::storage(format!("get_daily_review: {e}")))
    }

    fn upsert_daily_review(&self, review: DailyReview) -> CoreResult<DailyReview> {
        self.upsert_daily_review_marked(review, true)
    }

    fn list_daily_reviews_between(
        &self,
        start_date: &str,
        end_date: &str,
    ) -> CoreResult<Vec<DailyReview>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                "SELECT * FROM daily_reviews
                 WHERE date >= ? AND date <= ? ORDER BY date ASC",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_daily_reviews_between: {e}")))?;
        let rows = stmt
            .query_map(params![start_date, end_date], row_to_daily_review)
            .map_err(|e| CoreError::storage(format!("query: {e}")))?;
        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CoreError::storage(format!("row: {e}")))?);
        }
        Ok(out)
    }

    fn delete_daily_review(&self, date: &str) -> CoreResult<()> {
        // ADR-010:删除 = content='' 的 upsert(变更可同步),revision+1 + pending;
        // 行不存在则无内容可删,静默返回(远端若有内容,由 pull 比较收敛)
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO daily_reviews
                (id, user_id, date, content, revision, updated_at_ms, sync_state, origin_device)
             VALUES (?, ?, ?, '', 1, ?, 'pending', ?)
             ON CONFLICT(date) DO UPDATE SET
                content = '', updated_at_ms = excluded.updated_at_ms, revision = revision + 1,
                user_id = excluded.user_id, sync_state = 'pending',
                origin_device = excluded.origin_device",
            params![
                Id::new().as_str(),
                self.user_id.as_str(),
                date,
                now_ms(),
                self.device_id
            ],
        )
        .map_err(|e| CoreError::storage(format!("delete_daily_review: {e}")))?;
        Ok(())
    }

    fn get_weekly_review(&self, week_start: &str) -> CoreResult<Option<WeeklyReview>> {
        let conn = self.lock()?;
        conn.query_row(
            "SELECT * FROM weekly_reviews WHERE week_start = ?",
            params![week_start],
            row_to_weekly_review,
        )
        .optional()
        .map_err(|e| CoreError::storage(format!("get_weekly_review: {e}")))
    }

    fn upsert_weekly_review(&self, review: WeeklyReview) -> CoreResult<WeeklyReview> {
        self.upsert_weekly_review_marked(review, true)
    }

    fn list_weekly_reviews_between(
        &self,
        start_week: &str,
        end_week: &str,
    ) -> CoreResult<Vec<WeeklyReview>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                "SELECT * FROM weekly_reviews
                 WHERE week_start >= ? AND week_start <= ? ORDER BY week_start ASC",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_weekly_reviews_between: {e}")))?;
        let rows = stmt
            .query_map(params![start_week, end_week], row_to_weekly_review)
            .map_err(|e| CoreError::storage(format!("query: {e}")))?;
        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CoreError::storage(format!("row: {e}")))?);
        }
        Ok(out)
    }

    fn delete_weekly_review(&self, week_start: &str) -> CoreResult<()> {
        // ADR-010:删除 = content='' 的 upsert(同 delete_daily_review)
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO weekly_reviews
                (id, user_id, week_start, content, revision, updated_at_ms, sync_state, origin_device)
             VALUES (?, ?, ?, '', 1, ?, 'pending', ?)
             ON CONFLICT(week_start) DO UPDATE SET
                content = '', updated_at_ms = excluded.updated_at_ms, revision = revision + 1,
                user_id = excluded.user_id, sync_state = 'pending',
                origin_device = excluded.origin_device",
            params![
                Id::new().as_str(),
                self.user_id.as_str(),
                week_start,
                now_ms(),
                self.device_id
            ],
        )
        .map_err(|e| CoreError::storage(format!("delete_weekly_review: {e}")))?;
        Ok(())
    }

    fn get_monthly_review(&self, year_month: &str) -> CoreResult<Option<MonthlyReview>> {
        let conn = self.lock()?;
        conn.query_row(
            "SELECT * FROM monthly_reviews WHERE year_month = ?",
            params![year_month],
            row_to_monthly_review,
        )
        .optional()
        .map_err(|e| CoreError::storage(format!("get_monthly_review: {e}")))
    }

    fn upsert_monthly_review(&self, review: MonthlyReview) -> CoreResult<MonthlyReview> {
        self.upsert_monthly_review_marked(review, true)
    }

    fn delete_monthly_review(&self, year_month: &str) -> CoreResult<()> {
        // ADR-010:删除 = content='' 的 upsert(同 delete_daily_review)
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO monthly_reviews
                (id, user_id, year_month, content, revision, updated_at_ms, sync_state, origin_device)
             VALUES (?, ?, ?, '', 1, ?, 'pending', ?)
             ON CONFLICT(year_month) DO UPDATE SET
                content = '', updated_at_ms = excluded.updated_at_ms, revision = revision + 1,
                user_id = excluded.user_id, sync_state = 'pending',
                origin_device = excluded.origin_device",
            params![
                Id::new().as_str(),
                self.user_id.as_str(),
                year_month,
                now_ms(),
                self.device_id
            ],
        )
        .map_err(|e| CoreError::storage(format!("delete_monthly_review: {e}")))?;
        Ok(())
    }

    fn list_subtasks_for_task(&self, task_id: &Id) -> CoreResult<Vec<SubTask>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                "SELECT * FROM subtasks
                 WHERE task_id = ? AND deleted_at_ms IS NULL
                 ORDER BY position ASC, updated_at_ms ASC",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_subtasks: {e}")))?;
        let rows = stmt
            .query_map(params![task_id.as_str()], row_to_subtask)
            .map_err(|e| CoreError::storage(format!("query list_subtasks: {e}")))?;
        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CoreError::storage(format!("row list_subtasks: {e}")))?);
        }
        Ok(out)
    }

    fn list_subtasks_for_tasks(&self, task_ids: &[Id]) -> CoreResult<HashMap<Id, Vec<SubTask>>> {
        let mut out: HashMap<Id, Vec<SubTask>> = HashMap::new();
        if task_ids.is_empty() {
            return Ok(out);
        }
        let conn = self.lock()?;
        let placeholders = std::iter::repeat_n("?", task_ids.len())
            .collect::<Vec<_>>()
            .join(",");
        let sql = format!(
            "SELECT * FROM subtasks
             WHERE task_id IN ({placeholders}) AND deleted_at_ms IS NULL
             ORDER BY task_id, position ASC, updated_at_ms ASC"
        );
        let mut stmt = conn
            .prepare(&sql)
            .map_err(|e| CoreError::storage(format!("prepare list_subtasks_for_tasks: {e}")))?;
        let mut rows = stmt
            .query(rusqlite::params_from_iter(
                task_ids.iter().map(|i| i.as_str()),
            ))
            .map_err(|e| CoreError::storage(format!("query: {e}")))?;
        while let Some(row) = rows
            .next()
            .map_err(|e| CoreError::storage(format!("row: {e}")))?
        {
            let task_id_s: String = row
                .get::<_, String>("task_id")
                .map_err(|e| CoreError::storage(format!("row.task_id: {e}")))?;
            let st = row_to_subtask(row)
                .map_err(|e| CoreError::storage(format!("row_to_subtask: {e}")))?;
            out.entry(Id(task_id_s)).or_default().push(st);
        }
        Ok(out)
    }

    fn upsert_subtask(&self, subtask: SubTask) -> CoreResult<SubTask> {
        self.upsert_subtask_marked(subtask, true)
    }

    fn delete_subtask(&self, id: &Id) -> CoreResult<()> {
        let conn = self.lock()?;
        // 软删除 tombstone:revision+1 + pending
        conn.execute(
            "UPDATE subtasks SET deleted_at_ms = ?, updated_at_ms = ?,
                revision = revision + 1, sync_state = 'pending', origin_device = ?
             WHERE id = ? AND deleted_at_ms IS NULL",
            params![now_ms(), now_ms(), self.device_id, id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("delete_subtask: {e}")))?;
        Ok(())
    }

    // --- Mottos ---

    fn list_mottos(&self) -> CoreResult<Vec<Motto>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare("SELECT * FROM mottos WHERE deleted_at_ms IS NULL ORDER BY created_at_ms ASC")
            .map_err(|e| CoreError::storage(format!("prepare list_mottos: {e}")))?;
        let rows = stmt
            .query_map([], row_to_motto)
            .map_err(|e| CoreError::storage(format!("query list_mottos: {e}")))?;
        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CoreError::storage(format!("row list_mottos: {e}")))?);
        }
        Ok(out)
    }

    fn upsert_motto(&self, motto: Motto) -> CoreResult<Motto> {
        self.upsert_motto_marked(motto, true)
    }

    fn delete_motto(&self, id: &Id) -> CoreResult<()> {
        let conn = self.lock()?;
        conn.execute(
            "UPDATE mottos SET deleted_at_ms = ?, updated_at_ms = ?,
                revision = revision + 1, sync_state = 'pending', origin_device = ?
             WHERE id = ? AND deleted_at_ms IS NULL",
            params![now_ms(), now_ms(), self.device_id, id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("delete_motto: {e}")))?;
        Ok(())
    }

    fn today_completed_minutes(&self, start_ms: i64, end_ms: i64) -> CoreResult<u32> {
        let conn = self.lock()?;
        // 按 started_at 分桶(与 stats::overview / range 一致;v1 全部按 started_at):
        // 若按 ended_at,23:55 开始、次日 0:20 结束的会话会在番茄钟页算"今天"、
        // 统计页算"昨天",两页数字对不上
        let total: i64 = conn
            .query_row(
                "SELECT COALESCE(SUM(duration_minutes), 0) FROM pomodoros
                 WHERE deleted_at_ms IS NULL
                   AND is_completed = 1
                   AND started_at_ms >= ? AND started_at_ms < ?",
                params![start_ms, end_ms],
                |row| row.get(0),
            )
            .map_err(|e| CoreError::storage(format!("today_completed_minutes: {e}")))?;
        u32::try_from(total).map_err(|_| CoreError::storage("today minutes overflow"))
    }

    // --- NotificationTemplate(单行配置) ---

    fn get_notification_template(&self) -> CoreResult<Option<NotificationTemplate>> {
        let conn = self.lock()?;
        conn.query_row(
            "SELECT * FROM notification_templates WHERE id = '1'",
            [],
            row_to_notification_template,
        )
        .optional()
        .map_err(|e| CoreError::storage(format!("get_notification_template: {e}")))
    }

    fn upsert_notification_template(
        &self,
        template: NotificationTemplate,
    ) -> CoreResult<NotificationTemplate> {
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO notification_templates
                (id, style, style_description,
                 focus_end_title, focus_end_body, break_end_title, break_end_body,
                 reminder_title, reminder_body, updated_at_ms)
             VALUES (?,?,?,?,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET
                style=excluded.style, style_description=excluded.style_description,
                focus_end_title=excluded.focus_end_title, focus_end_body=excluded.focus_end_body,
                break_end_title=excluded.break_end_title, break_end_body=excluded.break_end_body,
                reminder_title=excluded.reminder_title, reminder_body=excluded.reminder_body,
                updated_at_ms=excluded.updated_at_ms",
            params![
                template.id.as_str(),
                template.style,
                template.style_description,
                template.focus_end_title,
                template.focus_end_body,
                template.break_end_title,
                template.break_end_body,
                template.reminder_title,
                template.reminder_body,
                ts_to_ms(template.updated_at),
            ],
        )
        .map_err(|e| CoreError::storage(format!("upsert_notification_template: {e}")))?;
        Ok(template)
    }

    // --- conflict_log(P2 冲突可视化) ---

    fn insert_conflict(
        &self,
        record: ConflictRecord,
    ) -> CoreResult<()> {
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO conflict_log
             (entity, entity_id, entity_title, direction, remote_device,
              local_updated_ms, remote_updated_ms, occurred_at_ms)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            params![
                record.entity,
                record.entity_id,
                record.entity_title,
                record.direction,
                record.remote_device,
                record.local_updated_ms,
                record.remote_updated_ms,
                record.occurred_at_ms,
            ],
        )
        .map_err(|e| CoreError::storage(format!("insert_conflict: {e}")))?;
        Ok(())
    }

    fn list_recent_conflicts(
        &self,
        limit: usize,
    ) -> CoreResult<Vec<ConflictRecord>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                "SELECT entity, entity_id, entity_title, direction, remote_device,
                        local_updated_ms, remote_updated_ms, occurred_at_ms
                 FROM conflict_log
                 ORDER BY occurred_at_ms DESC
                 LIMIT ?",
            )
            .map_err(|e| CoreError::storage(format!("list_recent_conflicts: {e}")))?;
        let rows = stmt
            .query_map(params![limit as i64], |row| {
                Ok(ConflictRecord {
                    entity: row.get(0)?,
                    entity_id: row.get(1)?,
                    entity_title: row.get(2)?,
                    direction: row.get(3)?,
                    remote_device: row.get(4)?,
                    local_updated_ms: row.get(5)?,
                    remote_updated_ms: row.get(6)?,
                    occurred_at_ms: row.get(7)?,
                })
            })
            .map_err(|e| CoreError::storage(format!("list_recent_conflicts query: {e}")))?;
        rows.collect::<Result<Vec<_>, _>>()
            .map_err(|e| CoreError::storage(format!("list_recent_conflicts collect: {e}")))
    }

    fn clear_conflicts(&self) -> CoreResult<()> {
        let conn = self.lock()?;
        conn.execute("DELETE FROM conflict_log", [])
            .map_err(|e| CoreError::storage(format!("clear_conflicts: {e}")))?;
        Ok(())
    }

    fn count_conflicts(&self) -> CoreResult<usize> {
        let conn = self.lock()?;
        let count: i64 = conn
            .query_row("SELECT COUNT(*) FROM conflict_log", [], |row| row.get(0))
            .map_err(|e| CoreError::storage(format!("count_conflicts: {e}")))?;
        usize::try_from(count).map_err(|_| CoreError::storage("conflict count overflow"))
    }
}

// === 同步地基:marked 写入 + ChangeLogStore ==================================

impl SqliteStore {
    /// pending=true:本地写入(sync_state='pending' 待推送);
    /// false:apply_remote 落权威快照(sync_state='synced',revision 原样)。
    fn upsert_task_marked(&self, task: Task, pending: bool) -> CoreResult<Task> {
        let task = self.stamp(task);
        let mark = if pending { "pending" } else { "synced" };
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO tasks (
                id, user_id, title, description, project_id, priority, status,
                due_date_ms, estimated_pomodoros, completed_pomodoros, pomodoro_duration,
                reminder, repeat_kind, repeat_config, repeat_parent_id, repeat_end_date_ms,
                completed_at_ms, created_at_ms,
                revision, deleted_at_ms, updated_at_ms, sync_state, origin_device
             ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET
                title=excluded.title,
                description=excluded.description,
                project_id=excluded.project_id,
                priority=excluded.priority,
                status=excluded.status,
                due_date_ms=excluded.due_date_ms,
                estimated_pomodoros=excluded.estimated_pomodoros,
                completed_pomodoros=excluded.completed_pomodoros,
                pomodoro_duration=excluded.pomodoro_duration,
                reminder=excluded.reminder,
                repeat_kind=excluded.repeat_kind,
                repeat_config=excluded.repeat_config,
                repeat_parent_id=excluded.repeat_parent_id,
                repeat_end_date_ms=excluded.repeat_end_date_ms,
                completed_at_ms=excluded.completed_at_ms,
                created_at_ms=excluded.created_at_ms,
                revision=excluded.revision,
                deleted_at_ms=excluded.deleted_at_ms,
                updated_at_ms=excluded.updated_at_ms,
                user_id=excluded.user_id, sync_state=excluded.sync_state,
                origin_device=excluded.origin_device",
            params![
                task.id.as_str(),
                task.user_id.as_str(),
                task.title,
                task.description,
                task.project_id.as_ref().map(|p| p.as_str().to_string()),
                priority_str(task.priority),
                task_status_str(task.status),
                task.due_date.map(dt_to_ms),
                task.estimated_pomodoros as i64,
                task.completed_pomodoros as i64,
                task.pomodoro_duration.map(|v| v as i64),
                reminder_str(task.reminder),
                repeat_str(task.repeat),
                task.repeat_config,
                task.repeat_parent_id
                    .as_ref()
                    .map(|p| p.as_str().to_string()),
                task.repeat_end_date.map(dt_to_ms),
                task.completed_at.map(dt_to_ms),
                ts_to_ms(task.created_at),
                task.revision as i64,
                task.deleted_at.map(ts_to_ms),
                ts_to_ms(task.updated_at),
                mark,
                self.device_id,
            ],
        )
        .map_err(|e| CoreError::storage(format!("upsert_task: {e}")))?;
        Ok(task)
    }

    fn upsert_project_marked(&self, project: Project, pending: bool) -> CoreResult<Project> {
        let project = self.stamp(project);
        let mark = if pending { "pending" } else { "synced" };
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO projects
                (id, user_id, name, color, parent_id, display_order, created_at_ms,
                 revision, deleted_at_ms, updated_at_ms, sync_state, origin_device)
             VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET
                name=excluded.name, color=excluded.color, parent_id=excluded.parent_id,
                display_order=excluded.display_order, created_at_ms=excluded.created_at_ms,
                revision=excluded.revision, deleted_at_ms=excluded.deleted_at_ms,
                updated_at_ms=excluded.updated_at_ms,
                user_id=excluded.user_id, sync_state=excluded.sync_state,
                origin_device=excluded.origin_device",
            params![
                project.id.as_str(),
                project.user_id.as_str(),
                project.name,
                project.color,
                project.parent_id.as_ref().map(|p| p.as_str().to_string()),
                project.display_order as i64,
                ts_to_ms(project.created_at),
                project.revision as i64,
                project.deleted_at.map(ts_to_ms),
                ts_to_ms(project.updated_at),
                mark,
                self.device_id,
            ],
        )
        .map_err(|e| CoreError::storage(format!("upsert_project: {e}")))?;
        Ok(project)
    }

    fn upsert_tag_marked(&self, tag: Tag, pending: bool) -> CoreResult<Tag> {
        let tag = self.stamp(tag);
        let mark = if pending { "pending" } else { "synced" };
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO tags
                (id, user_id, name, color, display_order, created_at_ms,
                 revision, deleted_at_ms, updated_at_ms, sync_state, origin_device)
             VALUES (?,?,?,?,?,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET
                name=excluded.name, color=excluded.color,
                display_order=excluded.display_order, created_at_ms=excluded.created_at_ms,
                revision=excluded.revision,
                deleted_at_ms=excluded.deleted_at_ms, updated_at_ms=excluded.updated_at_ms,
                user_id=excluded.user_id, sync_state=excluded.sync_state,
                origin_device=excluded.origin_device",
            params![
                tag.id.as_str(),
                tag.user_id.as_str(),
                tag.name,
                tag.color,
                tag.display_order as i64,
                ts_to_ms(tag.created_at),
                tag.revision as i64,
                tag.deleted_at.map(ts_to_ms),
                ts_to_ms(tag.updated_at),
                mark,
                self.device_id,
            ],
        )
        .map_err(|e| CoreError::storage(format!("upsert_tag: {e}")))?;
        Ok(tag)
    }

    fn upsert_subtask_marked(&self, subtask: SubTask, pending: bool) -> CoreResult<SubTask> {
        let subtask = self.stamp(subtask);
        let mark = if pending { "pending" } else { "synced" };
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO subtasks
              (id, user_id, task_id, title, is_completed, position, created_at_ms,
               revision, deleted_at_ms, updated_at_ms, sync_state, origin_device)
             VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET
                task_id=excluded.task_id,
                title=excluded.title,
                is_completed=excluded.is_completed,
                position=excluded.position,
                created_at_ms=excluded.created_at_ms,
                revision=excluded.revision,
                deleted_at_ms=excluded.deleted_at_ms,
                updated_at_ms=excluded.updated_at_ms,
                user_id=excluded.user_id, sync_state=excluded.sync_state,
                origin_device=excluded.origin_device",
            params![
                subtask.id.as_str(),
                subtask.user_id.as_str(),
                subtask.task_id.as_str(),
                subtask.title,
                subtask.is_completed as i64,
                subtask.position as i64,
                ts_to_ms(subtask.created_at),
                subtask.revision as i64,
                subtask.deleted_at.map(ts_to_ms),
                ts_to_ms(subtask.updated_at),
                mark,
                self.device_id,
            ],
        )
        .map_err(|e| CoreError::storage(format!("upsert_subtask: {e}")))?;
        Ok(subtask)
    }

    fn upsert_pomodoro_marked(
        &self,
        session: PomodoroSession,
        pending: bool,
    ) -> CoreResult<PomodoroSession> {
        let session = self.stamp(session);
        let mark = if pending { "pending" } else { "synced" };
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO pomodoros (
                id, user_id, task_id, project_id, duration_minutes,
                started_at_ms, ended_at_ms, is_completed, created_at_ms,
                revision, deleted_at_ms, updated_at_ms, sync_state, origin_device
             ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET
                task_id=excluded.task_id, project_id=excluded.project_id,
                duration_minutes=excluded.duration_minutes,
                started_at_ms=excluded.started_at_ms, ended_at_ms=excluded.ended_at_ms,
                is_completed=excluded.is_completed, created_at_ms=excluded.created_at_ms,
                revision=excluded.revision, deleted_at_ms=excluded.deleted_at_ms,
                updated_at_ms=excluded.updated_at_ms,
                user_id=excluded.user_id, sync_state=excluded.sync_state,
                origin_device=excluded.origin_device",
            params![
                session.id.as_str(),
                session.user_id.as_str(),
                session.task_id.as_ref().map(|t| t.as_str().to_string()),
                session.project_id.as_ref().map(|p| p.as_str().to_string()),
                session.duration as i64,
                dt_to_ms(session.started_at),
                dt_to_ms(session.ended_at),
                session.is_completed as i64,
                ts_to_ms(session.created_at),
                session.revision as i64,
                session.deleted_at.map(ts_to_ms),
                ts_to_ms(session.updated_at),
                mark,
                self.device_id,
            ],
        )
        .map_err(|e| CoreError::storage(format!("upsert_pomodoro: {e}")))?;
        Ok(session)
    }

    fn upsert_motto_marked(&self, motto: Motto, pending: bool) -> CoreResult<Motto> {
        let motto = self.stamp(motto);
        let mark = if pending { "pending" } else { "synced" };
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO mottos
              (id, user_id, text, author, created_at_ms,
               revision, deleted_at_ms, updated_at_ms, sync_state, origin_device)
             VALUES (?,?,?,?,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET
                text=excluded.text,
                author=excluded.author,
                created_at_ms=excluded.created_at_ms,
                revision=excluded.revision,
                deleted_at_ms=excluded.deleted_at_ms,
                updated_at_ms=excluded.updated_at_ms,
                user_id=excluded.user_id, sync_state=excluded.sync_state,
                origin_device=excluded.origin_device",
            params![
                motto.id.as_str(),
                motto.user_id.as_str(),
                motto.text,
                motto.author,
                ts_to_ms(motto.created_at),
                motto.revision as i64,
                motto.deleted_at.map(ts_to_ms),
                ts_to_ms(motto.updated_at),
                mark,
                self.device_id,
            ],
        )
        .map_err(|e| CoreError::storage(format!("upsert_motto: {e}")))?;
        Ok(motto)
    }

    /// 复盘族 marked 写入。pending 路径 revision 由存储管理(插入 1、更新 +1);
    /// remote 路径按权威载荷原样落库(ADR-010)。
    fn upsert_daily_review_marked(
        &self,
        review: DailyReview,
        pending: bool,
    ) -> CoreResult<DailyReview> {
        let review = self.stamp(review);
        let conn = self.lock()?;
        if pending {
            conn.execute(
                "INSERT INTO daily_reviews
                    (id, user_id, date, content, revision, updated_at_ms, sync_state, origin_device)
                 VALUES (?, ?, ?, ?, 1, ?, 'pending', ?)
                 ON CONFLICT(date) DO UPDATE SET
                    content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                    revision = revision + 1, user_id=excluded.user_id,
                    sync_state='pending', origin_device=excluded.origin_device",
                params![
                    review.id.as_str(),
                    review.user_id.as_str(),
                    review.date,
                    review.content,
                    ts_to_ms(review.updated_at),
                    self.device_id
                ],
            )
        } else {
            conn.execute(
                "INSERT INTO daily_reviews
                    (id, user_id, date, content, revision, updated_at_ms, sync_state, origin_device)
                 VALUES (?, ?, ?, ?, ?, ?, 'synced', ?)
                 ON CONFLICT(date) DO UPDATE SET
                    content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                    revision=excluded.revision, user_id=excluded.user_id,
                    sync_state='synced', origin_device=excluded.origin_device",
                params![
                    review.id.as_str(),
                    review.user_id.as_str(),
                    review.date,
                    review.content,
                    review.revision as i64,
                    ts_to_ms(review.updated_at),
                    self.device_id
                ],
            )
        }
        .map_err(|e| CoreError::storage(format!("upsert_daily_review: {e}")))?;
        Ok(review)
    }

    fn upsert_weekly_review_marked(
        &self,
        review: WeeklyReview,
        pending: bool,
    ) -> CoreResult<WeeklyReview> {
        let review = self.stamp(review);
        let conn = self.lock()?;
        if pending {
            conn.execute(
                "INSERT INTO weekly_reviews
                    (id, user_id, week_start, content, revision, updated_at_ms, sync_state, origin_device)
                 VALUES (?, ?, ?, ?, 1, ?, 'pending', ?)
                 ON CONFLICT(week_start) DO UPDATE SET
                    content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                    revision = revision + 1, user_id=excluded.user_id,
                    sync_state='pending', origin_device=excluded.origin_device",
                params![
                    review.id.as_str(),
                    review.user_id.as_str(),
                    review.week_start,
                    review.content,
                    ts_to_ms(review.updated_at),
                    self.device_id
                ],
            )
        } else {
            conn.execute(
                "INSERT INTO weekly_reviews
                    (id, user_id, week_start, content, revision, updated_at_ms, sync_state, origin_device)
                 VALUES (?, ?, ?, ?, ?, ?, 'synced', ?)
                 ON CONFLICT(week_start) DO UPDATE SET
                    content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                    revision=excluded.revision, user_id=excluded.user_id,
                    sync_state='synced', origin_device=excluded.origin_device",
                params![
                    review.id.as_str(),
                    review.user_id.as_str(),
                    review.week_start,
                    review.content,
                    review.revision as i64,
                    ts_to_ms(review.updated_at),
                    self.device_id
                ],
            )
        }
        .map_err(|e| CoreError::storage(format!("upsert_weekly_review: {e}")))?;
        Ok(review)
    }

    fn upsert_monthly_review_marked(
        &self,
        review: MonthlyReview,
        pending: bool,
    ) -> CoreResult<MonthlyReview> {
        let review = self.stamp(review);
        let conn = self.lock()?;
        if pending {
            conn.execute(
                "INSERT INTO monthly_reviews
                    (id, user_id, year_month, content, revision, updated_at_ms, sync_state, origin_device)
                 VALUES (?, ?, ?, ?, 1, ?, 'pending', ?)
                 ON CONFLICT(year_month) DO UPDATE SET
                    content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                    revision = revision + 1, user_id=excluded.user_id,
                    sync_state='pending', origin_device=excluded.origin_device",
                params![
                    review.id.as_str(),
                    review.user_id.as_str(),
                    review.year_month,
                    review.content,
                    ts_to_ms(review.updated_at),
                    self.device_id
                ],
            )
        } else {
            conn.execute(
                "INSERT INTO monthly_reviews
                    (id, user_id, year_month, content, revision, updated_at_ms, sync_state, origin_device)
                 VALUES (?, ?, ?, ?, ?, ?, 'synced', ?)
                 ON CONFLICT(year_month) DO UPDATE SET
                    content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                    revision=excluded.revision, user_id=excluded.user_id,
                    sync_state='synced', origin_device=excluded.origin_device",
                params![
                    review.id.as_str(),
                    review.user_id.as_str(),
                    review.year_month,
                    review.content,
                    review.revision as i64,
                    ts_to_ms(review.updated_at),
                    self.device_id
                ],
            )
        }
        .map_err(|e| CoreError::storage(format!("upsert_monthly_review: {e}")))?;
        Ok(review)
    }
}

impl ChangeLogStore for SqliteStore {
    fn list_pending(&self, limit: usize) -> CoreResult<Vec<Change>> {
        let conn = self.lock()?;
        let mut out: Vec<Change> = Vec::new();

        macro_rules! scan {
            ($table:literal, $rowfn:ident) => {
                if out.len() < limit {
                    let sql = format!(
                        "SELECT * FROM {} WHERE sync_state = 'pending' \
                         ORDER BY updated_at_ms ASC LIMIT {}",
                        $table,
                        limit - out.len()
                    );
                    let mut stmt = conn.prepare(&sql).map_err(|e| {
                        CoreError::storage(format!("prepare pending {}: {e}", $table))
                    })?;
                    let rows = stmt
                        .query_map([], |row| {
                            let entity = $rowfn(row)?;
                            let origin: String = row.get("origin_device")?;
                            Ok((entity, origin))
                        })
                        .map_err(|e| {
                            CoreError::storage(format!("query pending {}: {e}", $table))
                        })?;
                    for r in rows {
                        let (entity, origin) = r.map_err(|e| {
                            CoreError::storage(format!("row pending {}: {e}", $table))
                        })?;
                        out.push(change_of(&entity, origin, &self.device_id)?);
                    }
                }
            };
        }

        scan!("tasks", row_to_task);
        scan!("projects", row_to_project);
        scan!("tags", row_to_tag);
        scan!("subtasks", row_to_subtask);
        scan!("pomodoros", row_to_pomodoro);
        scan!("mottos", row_to_motto);
        scan!("daily_reviews", row_to_daily_review);
        scan!("weekly_reviews", row_to_weekly_review);
        scan!("monthly_reviews", row_to_monthly_review);

        // task_tag:关联载荷从 task_tags 现查组装(空集合 = 清除 tombstone,ADR-010)
        if out.len() < limit {
            let sql = format!(
                "SELECT s.task_id, s.revision, s.updated_at_ms, s.origin_device, s.user_id,
                        (SELECT GROUP_CONCAT(tag_id) FROM task_tags WHERE task_id = s.task_id)
                            AS tag_ids
                 FROM task_tag_sync s
                 WHERE s.sync_state = 'pending'
                 ORDER BY s.updated_at_ms ASC LIMIT {}",
                limit - out.len()
            );
            let mut stmt = conn
                .prepare(&sql)
                .map_err(|e| CoreError::storage(format!("prepare pending task_tag_sync: {e}")))?;
            let rows = stmt
                .query_map([], row_to_task_tag_link)
                .map_err(|e| CoreError::storage(format!("query pending task_tag_sync: {e}")))?;
            for r in rows {
                let (link, origin) =
                    r.map_err(|e| CoreError::storage(format!("row pending task_tag_sync: {e}")))?;
                out.push(change_of(&link, origin, &self.device_id)?);
            }
        }
        Ok(out)
    }

    fn apply_remote(&self, change: &Change) -> CoreResult<()> {
        macro_rules! apply {
            ($t:ty, $marked:ident) => {{
                let mut entity: $t = serde_json::from_value(change.payload.clone())
                    .map_err(|e| CoreError::Validation(format!("apply_remote payload: {e}")))?;
                if entity.user_id.is_nil() {
                    entity.user_id = self.user_id.clone();
                }
                self.$marked(entity, false)?;
            }};
        }
        match change.entity {
            EntityKind::Task => apply!(Task, upsert_task_marked),
            EntityKind::Project => apply!(Project, upsert_project_marked),
            EntityKind::Tag => apply!(Tag, upsert_tag_marked),
            EntityKind::SubTask => apply!(SubTask, upsert_subtask_marked),
            EntityKind::PomodoroSession => apply!(PomodoroSession, upsert_pomodoro_marked),
            EntityKind::Motto => apply!(Motto, upsert_motto_marked),
            EntityKind::DailyReview => apply!(DailyReview, upsert_daily_review_marked),
            EntityKind::WeeklyReview => apply!(WeeklyReview, upsert_weekly_review_marked),
            EntityKind::MonthlyReview => apply!(MonthlyReview, upsert_monthly_review_marked),
            // 关联实体走专用内核(键是 task_id,载荷是 tag 集合,非整实体 upsert)
            EntityKind::TaskTag => {
                let mut link: TaskTagLink = serde_json::from_value(change.payload.clone())
                    .map_err(|e| CoreError::Validation(format!("apply_remote payload: {e}")))?;
                if link.user_id.is_nil() {
                    link.user_id = self.user_id.clone();
                }
                let origin = change.device_id.clone();
                self.set_tags_for_task_marked(
                    &link.task_id,
                    &link.tag_ids,
                    link.revision,
                    link.updated_at,
                    &origin,
                    false,
                )?;
            }
        }
        Ok(())
    }

    fn mark_synced(&self, keys: &[(EntityKind, String)]) -> CoreResult<()> {
        let mut by: HashMap<EntityKind, Vec<String>> = HashMap::new();
        for (k, id) in keys {
            by.entry(*k).or_default().push(id.clone());
        }
        let conn = self.lock()?;
        macro_rules! mark {
            ($table:literal, $keycol:literal, $ids:expr) => {{
                let ids = $ids;
                if !ids.is_empty() {
                    let placeholders = std::iter::repeat_n("?", ids.len())
                        .collect::<Vec<_>>()
                        .join(",");
                    let sql = format!(
                        "UPDATE {} SET sync_state = 'synced' WHERE {} IN ({})",
                        $table, $keycol, placeholders
                    );
                    conn.execute(&sql, rusqlite::params_from_iter(ids.iter()))
                        .map_err(|e| CoreError::storage(format!("mark_synced {}: {e}", $table)))?;
                }
            }};
        }
        for (kind, ids) in by {
            match kind {
                EntityKind::Task => mark!("tasks", "id", ids),
                EntityKind::Project => mark!("projects", "id", ids),
                EntityKind::Tag => mark!("tags", "id", ids),
                EntityKind::SubTask => mark!("subtasks", "id", ids),
                EntityKind::PomodoroSession => mark!("pomodoros", "id", ids),
                EntityKind::Motto => mark!("mottos", "id", ids),
                EntityKind::DailyReview => mark!("daily_reviews", "date", ids),
                EntityKind::WeeklyReview => mark!("weekly_reviews", "week_start", ids),
                EntityKind::MonthlyReview => mark!("monthly_reviews", "year_month", ids),
                EntityKind::TaskTag => mark!("task_tag_sync", "task_id", ids),
            }
        }
        Ok(())
    }

    fn local_candidate(&self, kind: EntityKind, id: &str) -> CoreResult<Option<Change>> {
        let conn = self.lock()?;
        macro_rules! probe {
            ($table:literal, $keycol:literal, $rowfn:ident) => {{
                let hit = conn
                    .query_row(
                        &format!("SELECT * FROM {} WHERE {} = ?", $table, $keycol),
                        params![id],
                        |row| {
                            let entity = $rowfn(row)?;
                            let origin: String =
                                row.get::<_, String>("origin_device").unwrap_or_default();
                            Ok((entity, origin))
                        },
                    )
                    .optional()
                    .map_err(|e| CoreError::storage(format!("candidate {}: {e}", $table)))?;
                hit.map(|(entity, origin)| change_of(&entity, origin, &self.device_id))
                    .transpose()
            }};
        }
        match kind {
            EntityKind::Task => probe!("tasks", "id", row_to_task),
            EntityKind::Project => probe!("projects", "id", row_to_project),
            EntityKind::Tag => probe!("tags", "id", row_to_tag),
            EntityKind::SubTask => probe!("subtasks", "id", row_to_subtask),
            EntityKind::PomodoroSession => probe!("pomodoros", "id", row_to_pomodoro),
            EntityKind::Motto => probe!("mottos", "id", row_to_motto),
            EntityKind::DailyReview => probe!("daily_reviews", "date", row_to_daily_review),
            EntityKind::WeeklyReview => {
                probe!("weekly_reviews", "week_start", row_to_weekly_review)
            }
            EntityKind::MonthlyReview => {
                probe!("monthly_reviews", "year_month", row_to_monthly_review)
            }
            EntityKind::TaskTag => {
                let hit = conn
                    .query_row(
                        "SELECT s.task_id, s.revision, s.updated_at_ms, s.origin_device,
                                s.user_id,
                                (SELECT GROUP_CONCAT(tag_id) FROM task_tags
                                 WHERE task_id = s.task_id) AS tag_ids
                         FROM task_tag_sync s WHERE s.task_id = ?",
                        params![id],
                        row_to_task_tag_link,
                    )
                    .optional()
                    .map_err(|e| CoreError::storage(format!("candidate task_tag_sync: {e}")))?;
                hit.map(|(link, origin)| change_of(&link, origin, &self.device_id))
                    .transpose()
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::model::Task;

    #[test]
    fn upsert_and_get_task_roundtrip() {
        let store = SqliteStore::open_in_memory().unwrap();
        let task = Task::new("写代码");
        let id = task.id.clone();
        store.upsert_task(task.clone()).unwrap();
        let got = store.get_task(&id).unwrap();
        assert_eq!(got.title, "写代码");
    }

    #[test]
    fn soft_delete_marks_deleted_at() {
        let store = SqliteStore::open_in_memory().unwrap();
        let task = Task::new("已删除");
        let id = task.id.clone();
        store.upsert_task(task).unwrap();
        store.delete_task(&id).unwrap();
        assert!(store.list_tasks(&TaskQuery::default()).unwrap().is_empty());
        let got = store.get_task(&id).unwrap();
        assert!(got.deleted_at.is_some());
    }

    #[test]
    fn tag_unique_name_conflict() {
        let store = SqliteStore::open_in_memory().unwrap();
        store.upsert_tag(Tag::new("urgent")).unwrap();
        let dup = Tag::new("urgent");
        let err = store.upsert_tag(dup).unwrap_err();
        assert!(matches!(err, CoreError::Conflict(_)));
    }

    #[test]
    fn today_minutes_buckets_by_started_at() {
        // 23:50 开始、次日 00:15 结束的会话归**开始日**(v1/stats 一致;
        // 修复前按 ended_at 会归到次日)
        let store = SqliteStore::open_in_memory().unwrap();
        let mut s = PomodoroSession::new(None, None, 25);
        s.started_at = Utc.with_ymd_and_hms(2026, 8, 18, 15, 50, 0).unwrap();
        s.ended_at = Utc.with_ymd_and_hms(2026, 8, 18, 16, 15, 0).unwrap();
        s.is_completed = true;
        store.upsert_pomodoro(s).unwrap();

        let day1_start = Utc.with_ymd_and_hms(2026, 8, 18, 0, 0, 0).unwrap();
        let day2_start = Utc.with_ymd_and_hms(2026, 8, 19, 0, 0, 0).unwrap();
        assert_eq!(
            store
                .today_completed_minutes(
                    day1_start.timestamp_millis(),
                    day2_start.timestamp_millis()
                )
                .unwrap(),
            25
        );
        let day3_start = Utc.with_ymd_and_hms(2026, 8, 20, 0, 0, 0).unwrap();
        assert_eq!(
            store
                .today_completed_minutes(
                    day2_start.timestamp_millis(),
                    day3_start.timestamp_millis()
                )
                .unwrap(),
            0
        );
    }
}

#[test]
fn task_tag_sync_roundtrip() {
    use crate::sync::ChangeLogStore;
    let a = SqliteStore::open_in_memory().unwrap();
    let task = Task::new("带标签");
    let tag1 = Tag::new("红");
    let tag2 = Tag::new("蓝");
    let (t1, t2) = (tag1.id.clone(), tag2.id.clone());
    a.upsert_task(task.clone()).unwrap();
    a.upsert_tag(tag1).unwrap();
    a.upsert_tag(tag2).unwrap();
    // 乱序 + 重复传入 → 载荷应排序去重(同集合 → 同载荷)
    a.set_tags_for_task(&task.id, &[t2.clone(), t1.clone(), t2.clone()])
        .unwrap();

    let change = a
        .list_pending(100)
        .unwrap()
        .into_iter()
        .find(|c| c.entity == EntityKind::TaskTag)
        .expect("打标签后应有 task_tag pending 变更");
    assert_eq!(change.entity_id, task.id.as_str());
    let payload: crate::model::TaskTagLink =
        serde_json::from_value(change.payload.clone()).unwrap();
    let mut expect = vec![t1.clone(), t2.clone()];
    expect.sort_by(|a, b| a.0.cmp(&b.0));
    assert_eq!(payload.tag_ids, expect, "载荷应排序去重(与 id 顺序无关)");
    assert_eq!(payload.revision, 1);

    // 应用到第二台设备:关联落地,且不回推(pull 落库即 synced)
    let b = SqliteStore::open_in_memory().unwrap();
    b.upsert_task(task.clone()).unwrap();
    b.upsert_tag(Tag {
        id: t1.clone(),
        ..Tag::new("红")
    })
    .unwrap();
    b.upsert_tag(Tag {
        id: t2.clone(),
        ..Tag::new("蓝")
    })
    .unwrap();
    b.apply_remote(&change).unwrap();
    let tags_b = b
        .list_tags_for_tasks(std::slice::from_ref(&task.id))
        .unwrap();
    assert_eq!(tags_b[&task.id].len(), 2);
    assert!(b
        .list_pending(100)
        .unwrap()
        .iter()
        .all(|c| c.entity != EntityKind::TaskTag));

    // 清空标签 → 空集 tombstone;B 应用后关联消失
    a.set_tags_for_task(&task.id, &[]).unwrap();
    let tomb = a
        .list_pending(100)
        .unwrap()
        .into_iter()
        .find(|c| c.entity == EntityKind::TaskTag)
        .unwrap();
    let tp: crate::model::TaskTagLink = serde_json::from_value(tomb.payload.clone()).unwrap();
    assert!(tp.tag_ids.is_empty());
    assert_eq!(tp.revision, 2);
    b.apply_remote(&tomb).unwrap();
    let tags_b2 = b
        .list_tags_for_tasks(std::slice::from_ref(&task.id))
        .unwrap();
    assert!(!tags_b2.contains_key(&task.id));
}

#[test]
fn delete_task_emits_empty_task_tag_tombstone() {
    let a = SqliteStore::open_in_memory().unwrap();
    let task = Task::new("待删");
    let tag = Tag::new("标签");
    let tag_id = tag.id.clone();
    a.upsert_task(task.clone()).unwrap();
    a.upsert_tag(tag).unwrap();
    a.set_tags_for_task(&task.id, &[tag_id]).unwrap();
    a.delete_task(&task.id).unwrap();

    let change = a
        .list_pending(100)
        .unwrap()
        .into_iter()
        .find(|c| c.entity == EntityKind::TaskTag)
        .expect("删任务应带出关联 tombstone");
    let payload: crate::model::TaskTagLink =
        serde_json::from_value(change.payload.clone()).unwrap();
    assert!(payload.tag_ids.is_empty(), "任务删除后关联载荷应为空集");
    assert_eq!(payload.revision, 2, "tombstone 应在原 revision 上 +1");
}
