//! SQLite 版本化迁移 —— `PRAGMA user_version` 驱动。
//!
//! ## 设计(对齐 v1 `database.py::migrate_db` 的语义,机制升级为版本化)
//!
//! - `SCHEMA_SQL`(sqlite.rs)永远是**最新结构**:`CREATE TABLE IF NOT EXISTS`
//!   对新库一次建成;旧库的表已存在,IF NOT EXISTS 不动它们。
//! - 每个迁移函数负责把**旧一版结构**推进一版:内部用 `has_column` /
//!   `has_table` 做幂等检查(SQLite 的 `ADD COLUMN` 不支持 IF NOT EXISTS),
//!   所以"新库跑全部迁移"是安全的 no-op。
//! - 每个迁移在事务里执行,成功后 `user_version = 迁移序号`;失败回滚。
//! - **迁移前备份**由调用方(桌面端 / migrate-v1)负责:先查
//!   [`needs_migration`],为真则把 db 文件复制为 `*.bak` 再 open —— 文件复制
//!   留在应用层,core 保持只碰 rusqlite。
//!
//! ## 加新迁移的步骤
//!
//! 1. 把新列 / 新表直接写进 `SCHEMA_SQL`(新库一次到位)。
//! 2. 在 `MIGRATIONS` 末尾 append 一个 `migration_00N_*` 函数:幂等 ALTER +
//!    数据回填。
//! 3. 老库升级路径:`user_version` 只会落在已跑过的版本上,新函数自动补跑。

use std::path::Path;

use rusqlite::Connection;

use crate::error::{CoreError, CoreResult};

type MigrationFn = fn(&Connection) -> CoreResult<()>;

/// 有序迁移列表 —— `MIGRATIONS[i]` 把库从版本 i 推进到 i+1。
const MIGRATIONS: &[MigrationFn] = &[
    migration_001_repeat_meta_and_audit,
    migration_002_sync_foundation,
    migration_003_task_tag_sync,
    migration_004_conflict_log,
    migration_005_journal,
];

/// 当前代码支持的最新 schema 版号(= 已应用迁移数)。
pub fn latest_version() -> usize {
    MIGRATIONS.len()
}

/// 读取库的 `user_version`(未迁移的新库为 0)。
pub fn current_version(conn: &Connection) -> CoreResult<usize> {
    let v: i64 = conn
        .query_row("PRAGMA user_version", [], |row| row.get(0))
        .map_err(|e| CoreError::storage(format!("read user_version: {e}")))?;
    usize::try_from(v).map_err(|_| CoreError::storage(format!("user_version 越界: {v}")))
}

/// 从版本 0 起依次应用未跑过的迁移,返回最终版本。
///
/// 每个迁移一个事务;任何一步失败即回滚并返回错误,库停留在上一个完整版本。
pub fn run_migrations(conn: &Connection) -> CoreResult<usize> {
    let mut version = current_version(conn)?;
    for (i, migration) in MIGRATIONS.iter().enumerate() {
        if i < version {
            continue;
        }
        conn.execute_batch("BEGIN")
            .map_err(|e| CoreError::storage(format!("begin migration {}: {e}", i + 1)))?;
        match migration(conn) {
            Ok(()) => {
                // PRAGMA 不能用绑定参数,版本号来自常量长度,无注入面
                conn.execute_batch(&format!("PRAGMA user_version = {};", i + 1))
                    .map_err(|e| CoreError::storage(format!("set user_version: {e}")))?;
                conn.execute_batch("COMMIT")
                    .map_err(|e| CoreError::storage(format!("commit migration {}: {e}", i + 1)))?;
                version = i + 1;
            }
            Err(e) => {
                // 回滚失败只能放弃(连接即将被丢弃/重建),错误仍以迁移失败为准
                let _ = conn.execute_batch("ROLLBACK");
                return Err(CoreError::storage(format!(
                    "migration {} 失败(已回滚): {e}",
                    i + 1
                )));
            }
        }
    }
    Ok(version)
}

/// 判断路径上的库是否需要迁移(桌面端 / 迁移工具据此决定是否先做 `.bak` 备份)。
///
/// 文件不存在 → `false`(open 时自然会建新库,无需备份);
/// 只读打开失败 / 读 version 失败 → 按需要迁移处理(保守:宁可多备份一次)。
pub fn needs_migration(path: impl AsRef<Path>) -> bool {
    let path = path.as_ref();
    if !path.exists() {
        return false;
    }
    let Ok(conn) = Connection::open_with_flags(path, rusqlite::OpenFlags::SQLITE_OPEN_READ_ONLY)
    else {
        return true;
    };
    match current_version(&conn) {
        Ok(v) => v < latest_version(),
        Err(_) => true,
    }
}

// === 幂等 DDL helper ========================================================
//
// 表名 / 列名全部来自本文件常量,不接受外部输入,format! 拼 DDL 无注入面。

fn has_table(conn: &Connection, table: &str) -> CoreResult<bool> {
    let count: i64 = conn
        .query_row(
            "SELECT COUNT(*) FROM sqlite_master WHERE type = 'table' AND name = ?",
            [table],
            |row| row.get(0),
        )
        .map_err(|e| CoreError::storage(format!("has_table {table}: {e}")))?;
    Ok(count > 0)
}

fn has_column(conn: &Connection, table: &str, column: &str) -> CoreResult<bool> {
    let mut stmt = conn
        .prepare(&format!("PRAGMA table_info({table})"))
        .map_err(|e| CoreError::storage(format!("pragma table_info({table}): {e}")))?;
    let mut rows = stmt
        .query([])
        .map_err(|e| CoreError::storage(format!("query table_info({table}): {e}")))?;
    while let Some(row) = rows
        .next()
        .map_err(|e| CoreError::storage(format!("row table_info({table}): {e}")))?
    {
        let name: String = row
            .get(1)
            .map_err(|e| CoreError::storage(format!("column name: {e}")))?;
        if name == column {
            return Ok(true);
        }
    }
    Ok(false)
}

fn add_column(conn: &Connection, table: &str, column: &str, ddl: &str) -> CoreResult<()> {
    // 表不存在 → 说明是 SCHEMA_SQL 刚建的最新结构(或空库),跳过;
    // 真实 open() 流程里 SCHEMA_SQL 先跑,此处只是防御。
    if !has_table(conn, table)? || has_column(conn, table, column)? {
        return Ok(());
    }
    conn.execute_batch(&format!("ALTER TABLE {table} ADD COLUMN {column} {ddl};"))
        .map_err(|e| CoreError::storage(format!("add {table}.{column}: {e}")))
}

/// `created_at_ms` 回填:旧库没有创建时间,用最近更新时间近似(v1 语义:
/// created_date 在 INSERT 时落,历史数据缺失时用 updated_date 兜底)。
fn backfill_created_at(conn: &Connection, table: &str) -> CoreResult<()> {
    conn.execute_batch(&format!(
        "UPDATE {table} SET created_at_ms = updated_at_ms WHERE created_at_ms = 0;"
    ))
    .map_err(|e| CoreError::storage(format!("backfill {table}.created_at_ms: {e}")))
}

// === 迁移 1:重复任务元数据 + 排序列 + 审计时间 + 通知模板表 ==================

/// v0(无 user_version 的旧库,含 P1.8.6b 的 ad-hoc repeat_config)→ v1:
///
/// - `tasks`:repeat_config / repeat_parent_id / repeat_end_date_ms / created_at_ms
/// - `projects` / `tags`:display_order / created_at_ms
/// - `pomodoros` / `subtasks` / `mottos`:created_at_ms
/// - 新表 `notification_templates`(单行配置)
///
/// 幂等:每一步都先查列/表是否存在,新库(SCHEMA_SQL 已建最新结构)全 no-op。
fn migration_001_repeat_meta_and_audit(conn: &Connection) -> CoreResult<()> {
    // --- tasks ---
    add_column(conn, "tasks", "repeat_config", "TEXT")?;
    add_column(conn, "tasks", "repeat_parent_id", "TEXT")?;
    add_column(conn, "tasks", "repeat_end_date_ms", "INTEGER")?;
    add_column(conn, "tasks", "created_at_ms", "INTEGER NOT NULL DEFAULT 0")?;
    backfill_created_at(conn, "tasks")?;
    conn.execute_batch(
        "CREATE INDEX IF NOT EXISTS idx_tasks_repeat_parent ON tasks(repeat_parent_id);
         CREATE INDEX IF NOT EXISTS idx_tasks_created ON tasks(created_at_ms DESC);",
    )
    .map_err(|e| CoreError::storage(format!("tasks indexes: {e}")))?;

    // --- projects / tags ---
    for table in ["projects", "tags"] {
        add_column(conn, table, "display_order", "INTEGER NOT NULL DEFAULT 0")?;
        add_column(conn, table, "created_at_ms", "INTEGER NOT NULL DEFAULT 0")?;
        backfill_created_at(conn, table)?;
        conn.execute_batch(&format!(
            "CREATE INDEX IF NOT EXISTS idx_{table}_display_order ON {table}(display_order);"
        ))
        .map_err(|e| CoreError::storage(format!("{table} display_order index: {e}")))?;
    }

    // --- pomodoros / subtasks / mottos ---
    for table in ["pomodoros", "subtasks", "mottos"] {
        add_column(conn, table, "created_at_ms", "INTEGER NOT NULL DEFAULT 0")?;
        backfill_created_at(conn, table)?;
    }

    // --- notification_templates(新表) ---
    if !has_table(conn, "notification_templates")? {
        conn.execute_batch(
            "CREATE TABLE notification_templates (
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
             );",
        )
        .map_err(|e| CoreError::storage(format!("create notification_templates: {e}")))?;
    }

    Ok(())
}

// === 迁移 2:同步地基(meta 表 + user_id/sync_state/origin_device + review revision) ===

/// SQLite 内生成 UUID v4 字符串(迁移里 user_id/device_id 的初值)。
const UUID_V4_SQL: &str = "lower(hex(randomblob(4)))||'-'||lower(hex(randomblob(2)))||'-4'||substr(lower(hex(randomblob(2))),2)||'-'||substr('89ab',abs(random())%4+1,1)||substr(lower(hex(randomblob(2))),2)||'-'||lower(hex(randomblob(6)))";

/// 参与同步的实体表与其"实体键列"(reviews 用自然键,见 ADR-010)。
const SYNC_TABLES: &[(&str, &str)] = &[
    ("tasks", "id"),
    ("projects", "id"),
    ("tags", "id"),
    ("subtasks", "id"),
    ("pomodoros", "id"),
    ("mottos", "id"),
    ("daily_reviews", "date"),
    ("weekly_reviews", "week_start"),
    ("monthly_reviews", "year_month"),
];

/// v1 → v2 同步地基:
/// - 建 `meta` 表并生成 `user_id`(本机用户)/`device_id`(设备标识);
/// - 九张实体表补 `user_id` / `sync_state` / `origin_device` 列,存量行回填
///   user_id 并全部置 pending(登录首同步即全量上云;不登录零开销);
/// - 三个复盘表补 `revision`(LWW 仲裁用,ADR-010);
/// - 建 pending partial index(list_pending 扫描用)。
///
/// 幂等:每步先查列/表存在;新库(SCHEMA_SQL 已建最新结构)补跑 meta 与回填。
fn migration_002_sync_foundation(conn: &Connection) -> CoreResult<()> {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS meta (
               key TEXT PRIMARY KEY NOT NULL,
               value TEXT NOT NULL
             );",
    )
    .map_err(|e| CoreError::storage(format!("create meta: {e}")))?;

    conn.execute_batch(&format!(
        "INSERT OR IGNORE INTO meta(key, value) VALUES ('user_id', {UUID_V4_SQL});
         INSERT OR IGNORE INTO meta(key, value) VALUES ('device_id', {UUID_V4_SQL});
         INSERT OR IGNORE INTO meta(key, value) VALUES ('last_sync_seq', '0');"
    ))
    .map_err(|e| CoreError::storage(format!("seed meta: {e}")))?;

    let user_id: String = conn
        .query_row("SELECT value FROM meta WHERE key = 'user_id'", [], |r| {
            r.get(0)
        })
        .map_err(|e| CoreError::storage(format!("read meta.user_id: {e}")))?;

    for (table, _key) in SYNC_TABLES {
        add_column(conn, table, "user_id", "TEXT NOT NULL DEFAULT ''")?;
        add_column(conn, table, "sync_state", "TEXT NOT NULL DEFAULT 'pending'")?;
        add_column(conn, table, "origin_device", "TEXT NOT NULL DEFAULT ''")?;
        // 存量行归属本机用户;全部视为待推送
        conn.execute_batch(&format!(
            "UPDATE {table} SET user_id = '{user_id}' WHERE user_id = '';"
        ))
        .map_err(|e| CoreError::storage(format!("backfill {table}.user_id: {e}")))?;
    }

    for table in ["daily_reviews", "weekly_reviews", "monthly_reviews"] {
        add_column(conn, table, "revision", "INTEGER NOT NULL DEFAULT 1")?;
    }

    conn.execute_batch(
        "CREATE INDEX IF NOT EXISTS idx_tasks_pending ON tasks(id) WHERE sync_state = 'pending';
         CREATE INDEX IF NOT EXISTS idx_projects_pending ON projects(id) WHERE sync_state = 'pending';
         CREATE INDEX IF NOT EXISTS idx_tags_pending ON tags(id) WHERE sync_state = 'pending';
         CREATE INDEX IF NOT EXISTS idx_subtasks_pending ON subtasks(id) WHERE sync_state = 'pending';
         CREATE INDEX IF NOT EXISTS idx_pomodoros_pending ON pomodoros(id) WHERE sync_state = 'pending';
         CREATE INDEX IF NOT EXISTS idx_mottos_pending ON mottos(id) WHERE sync_state = 'pending';
         CREATE INDEX IF NOT EXISTS idx_daily_reviews_pending ON daily_reviews(date) WHERE sync_state = 'pending';
         CREATE INDEX IF NOT EXISTS idx_weekly_reviews_pending ON weekly_reviews(week_start) WHERE sync_state = 'pending';
         CREATE INDEX IF NOT EXISTS idx_monthly_reviews_pending ON monthly_reviews(year_month) WHERE sync_state = 'pending';",
    )
    .map_err(|e| CoreError::storage(format!("pending indexes: {e}")))?;

    Ok(())
}

// === 迁移 3:任务↔标签关联同步(task_tag_sync)=================================

/// v2 → v3:
/// - 建 `task_tag_sync`(per-task 的 LWW 元信息;关联数据仍在 task_tags 单一事实源);
/// - **存量关联回填**:每个打过标签的 task 一行 pending(revision=1)—— 此前
///   `task_tags` 不参与同步是已知缺口(v1 同步协议详细设计"已知范围外"),
///   升级后首次同步即把历史标签关联全量补推上云;
/// - pending partial index(list_pending 扫描用)。
///
/// 幂等:CREATE TABLE/INDEX IF NOT EXISTS + INSERT OR IGNORE(主键 task_id 兜底,
/// 已同步行不会被重置回 pending)。
fn migration_003_task_tag_sync(conn: &Connection) -> CoreResult<()> {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS task_tag_sync (
           task_id TEXT PRIMARY KEY,
           user_id TEXT NOT NULL DEFAULT '',
           revision INTEGER NOT NULL DEFAULT 1,
           updated_at_ms INTEGER NOT NULL,
           sync_state TEXT NOT NULL DEFAULT 'pending',
           origin_device TEXT NOT NULL DEFAULT ''
         );
         CREATE INDEX IF NOT EXISTS idx_task_tag_sync_pending
           ON task_tag_sync(sync_state) WHERE sync_state = 'pending';
         INSERT OR IGNORE INTO task_tag_sync
           (task_id, user_id, revision, updated_at_ms, sync_state, origin_device)
         SELECT DISTINCT tt.task_id, t.user_id, 1,
                CAST((julianday('now') - 2440587.5) * 86400000 AS INTEGER),
                'pending', ''
         FROM task_tags tt JOIN tasks t ON t.id = tt.task_id;",
    )
    .map_err(|e| CoreError::storage(format!("task_tag_sync: {e}")))?;
    Ok(())
}

// === 迁移 4:conflict_log 表(P2 冲突可视化) ===

/// 新建 conflict_log 表与索引。不参与同步,仅本地记录 LWW 覆盖事件。
fn migration_004_conflict_log(conn: &Connection) -> CoreResult<()> {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS conflict_log (
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
         CREATE INDEX IF NOT EXISTS idx_conflict_log_occurred
           ON conflict_log(occurred_at_ms DESC);",
    )
    .map_err(|e| CoreError::storage(format!("conflict_log: {e}")))?;
    Ok(())
}

/// v4 → v5:手账表(v2 新实体,移动端待办/愿望/年度规划/小记)。
/// 桌面端旧库没有这张表;新库由 SCHEMA_SQL 一次建成,此处幂等兜底。
fn migration_005_journal(conn: &Connection) -> CoreResult<()> {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS journals (
           id TEXT PRIMARY KEY NOT NULL,
           kind TEXT NOT NULL DEFAULT 'note',
           title TEXT NOT NULL DEFAULT '',
           content TEXT NOT NULL DEFAULT '',
           tags_csv TEXT NOT NULL DEFAULT '',
           created_at_ms INTEGER NOT NULL DEFAULT 0,
           revision INTEGER NOT NULL DEFAULT 1,
           deleted_at_ms INTEGER,
           updated_at_ms INTEGER NOT NULL,
           user_id TEXT NOT NULL DEFAULT '',
           sync_state TEXT NOT NULL DEFAULT 'pending',
           origin_device TEXT NOT NULL DEFAULT ''
         );
         CREATE INDEX IF NOT EXISTS idx_journals_updated
           ON journals(updated_at_ms DESC);",
    )
    .map_err(|e| CoreError::storage(format!("journal: {e}")))?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    /// 模拟"旧结构库":手写 v0 时代的 tasks/projects 表(无新列、无 user_version),
    /// 按 `SqliteStore::open` 的真实流程先跑 SCHEMA_SQL(旧表 IF NOT EXISTS 不动,
    /// 缺的表按最新结构补建),再跑迁移,旧表应被补齐全部列并写入版本号。
    #[test]
    fn migrates_legacy_db_to_latest() {
        let conn = Connection::open_in_memory().unwrap();
        // v0 时代的 tasks / projects(与 migration 1 之前的老 SCHEMA_SQL 一致,
        // 不含 repeat_config / display_order / created_at_ms 等新列)
        conn.execute_batch(
            "CREATE TABLE tasks (
               id TEXT PRIMARY KEY NOT NULL,
               title TEXT NOT NULL,
               description TEXT NOT NULL DEFAULT '',
               project_id TEXT,
               priority TEXT NOT NULL DEFAULT 'none',
               status TEXT NOT NULL DEFAULT 'active',
               due_date_ms INTEGER,
               estimated_pomodoros INTEGER NOT NULL DEFAULT 0,
               completed_pomodoros INTEGER NOT NULL DEFAULT 0,
               pomodoro_duration INTEGER,
               reminder TEXT NOT NULL DEFAULT 'none',
               repeat_kind TEXT NOT NULL DEFAULT 'none',
               completed_at_ms INTEGER,
               revision INTEGER NOT NULL DEFAULT 1,
               deleted_at_ms INTEGER,
               updated_at_ms INTEGER NOT NULL
             );
             INSERT INTO tasks (id, title, updated_at_ms)
             VALUES ('a', '旧任务', 1700000000000);
             CREATE TABLE projects (
               id TEXT PRIMARY KEY NOT NULL,
               name TEXT NOT NULL,
               color TEXT NOT NULL DEFAULT '',
               parent_id TEXT,
               revision INTEGER NOT NULL DEFAULT 1,
               deleted_at_ms INTEGER,
               updated_at_ms INTEGER NOT NULL
             );
             CREATE INDEX IF NOT EXISTS idx_projects_parent ON projects(parent_id);",
        )
        .unwrap();
        conn.execute_batch(crate::store::sqlite::SCHEMA_SQL)
            .unwrap();

        let version = run_migrations(&conn).unwrap();
        assert_eq!(version, latest_version());

        // tasks 补齐新列,created_at 回填为 updated_at
        assert!(has_column(&conn, "tasks", "repeat_parent_id").unwrap());
        assert!(has_column(&conn, "tasks", "repeat_end_date_ms").unwrap());
        assert!(has_column(&conn, "tasks", "created_at_ms").unwrap());
        let (created, repeat_parent): (i64, Option<String>) = conn
            .query_row(
                "SELECT created_at_ms, repeat_parent_id FROM tasks WHERE id = 'a'",
                [],
                |row| Ok((row.get(0)?, row.get(1)?)),
            )
            .unwrap();
        assert_eq!(created, 1700000000000);
        assert!(repeat_parent.is_none());

        // projects / tags / pomodoros / subtasks / mottos 补齐
        for table in ["projects", "tags", "pomodoros", "subtasks", "mottos"] {
            assert!(
                has_column(&conn, table, "created_at_ms").unwrap(),
                "{table} 应有 created_at_ms"
            );
        }
        assert!(has_column(&conn, "projects", "display_order").unwrap());
        assert!(has_column(&conn, "tags", "display_order").unwrap());
        assert!(has_table(&conn, "notification_templates").unwrap());

        // 版本号落库;再跑一次是 no-op
        assert_eq!(current_version(&conn).unwrap(), latest_version());
        assert_eq!(run_migrations(&conn).unwrap(), latest_version());
    }

    /// 新库(最新 SCHEMA_SQL 建成)跑迁移应是纯 no-op 且版本到位。
    #[test]
    fn fresh_schema_migrations_are_noop() {
        let conn = Connection::open_in_memory().unwrap();
        conn.execute_batch(crate::store::sqlite::SCHEMA_SQL)
            .unwrap();
        let version = run_migrations(&conn).unwrap();
        assert_eq!(version, latest_version());
    }

    /// v2 库(已有 task_tags 存量关联,版本停在 2)升级 v3:
    /// task_tag_sync 按task 回填 pending 行(集合为载荷,不逐关联),幂等可重跑。
    #[test]
    fn migration_003_backfills_task_tag_sync() {
        let conn = Connection::open_in_memory().unwrap();
        conn.execute_batch(crate::store::sqlite::SCHEMA_SQL)
            .unwrap();
        // 模拟 v2 存量:两个任务共 3 条关联,版本停在 2
        conn.execute_batch(
            "INSERT INTO tasks (id, user_id, title, updated_at_ms) VALUES
               ('t1', 'u1', '任务1', 1), ('t2', 'u2', '任务2', 1);
             INSERT INTO tags (id, user_id, name, updated_at_ms) VALUES
               ('g1', 'u1', '红', 1), ('g2', 'u1', '蓝', 1);
             INSERT INTO task_tags (task_id, tag_id) VALUES
               ('t1','g1'), ('t1','g2'), ('t2','g1');
             PRAGMA user_version = 2;",
        )
        .unwrap();

        assert_eq!(run_migrations(&conn).unwrap(), latest_version());

        // 每个 task 一行(t1/t2),非逐关联 3 行;全部 pending、revision=1
        let (rows, pending): (i64, i64) = conn
            .query_row(
                "SELECT COUNT(*), SUM(CASE WHEN sync_state = 'pending' THEN 1 ELSE 0 END)
                 FROM task_tag_sync",
                [],
                |r| Ok((r.get(0)?, r.get(1)?)),
            )
            .unwrap();
        assert_eq!((rows, pending), (2, 2));
        let (user_id, rev): (String, i64) = conn
            .query_row(
                "SELECT user_id, revision FROM task_tag_sync WHERE task_id = 't1'",
                [],
                |r| Ok((r.get(0)?, r.get(1)?)),
            )
            .unwrap();
        assert_eq!((user_id.as_str(), rev), ("u1", 1));

        // 已同步的行不被重跑回填重置;重复迁移行数不变
        conn.execute_batch("UPDATE task_tag_sync SET sync_state = 'synced';")
            .unwrap();
        assert_eq!(run_migrations(&conn).unwrap(), latest_version());
        let synced: i64 = conn
            .query_row(
                "SELECT COUNT(*) FROM task_tag_sync WHERE sync_state = 'synced'",
                [],
                |r| r.get(0),
            )
            .unwrap();
        assert_eq!(synced, 2, "INSERT OR IGNORE 不应把已同步行重置回 pending");
    }
}
