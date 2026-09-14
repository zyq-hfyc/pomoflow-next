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

use chrono::{DateTime, TimeZone, Utc};
use rusqlite::{params, Connection, OptionalExtension, Row};

use crate::error::{CoreError, CoreResult};
use crate::model::{
    DailyReview, Id, Journal, MonthlyReview, Motto, NotificationTemplate, PomodoroSession,
    Priority, Project, Reminder, Repeat, SubTask, Tag, Task, TaskStatus, TaskTagLink, Timestamp,
    WeeklyReview, YearlyReview,
};
use crate::store::{date_filter_range, ConflictRecord, Store, TaskQuery};
use crate::sync::{change_of, Change, ChangeLogStore, EntityKind};

/// IN 查询分块大小(2026-09-14):占位符数量有界 —— SQLite 变量上限随
/// 版本不同(旧版 999),500 足够小且不至于把一次查询碎成几十次。
const IN_CHUNK: usize = 500;

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

        // WAL + synchronous=NORMAL(2026-09-14 优化批,文件头「未来要做的事」
        // 清单项):读不阻塞写、checkpoint 批量落盘 —— auto-sync 与前台 command
        // 共用一把连接锁,默认 rollback journal 下同步扫描期间前台命令卡等锁。
        // journal_mode 是带结果行的 pragma,走 query_row;返回值即生效模式。
        let _journal_mode: String = conn
            .query_row("PRAGMA journal_mode = WAL", [], |r| r.get(0))
            .map_err(|e| CoreError::storage(format!("pragma journal_mode: {e}")))?;
        conn.execute_batch("PRAGMA synchronous = NORMAL;")
            .map_err(|e| CoreError::storage(format!("pragma synchronous: {e}")))?;

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

    /// 把 `<path>-wal` 里已提交的页合并回主库文件并截断 WAL(TRUNCATE)。
    ///
    /// 桌面端迁移前备份(`lib.rs::backup_store_file`)在打开 store 之前调用:
    /// WAL 模式下最近提交可能还在 -wal 里,不 checkpoint 就只拷主文件会得到
    /// 缺尾的 .bak。库不存在 / 从未进过 WAL 时为无害 no-op(空 checkpoint)。
    pub fn checkpoint_wal_file(path: impl AsRef<Path>) -> CoreResult<()> {
        let conn = Connection::open(path.as_ref())
            .map_err(|e| CoreError::storage(format!("open sqlite for checkpoint: {e}")))?;
        let _row: (i64, i64, i64) = conn
            .query_row("PRAGMA wal_checkpoint(TRUNCATE)", [], |r| {
                Ok((r.get(0)?, r.get(1)?, r.get(2)?))
            })
            .map_err(|e| CoreError::storage(format!("wal checkpoint: {e}")))?;
        Ok(())
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
impl Stamped for Journal {
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
impl Stamped for YearlyReview {
    fn user_id(&mut self) -> &mut Id {
        &mut self.user_id
    }
}

mod helpers;
mod rows;
/// SQLite schema —— 实体表 + 同步辅助表共 16 张,
/// 所有时间戳 ms INTEGER,所有枚举 TEXT。
///
/// 这里永远是**最新结构**(新库一次建成);旧库升级走 `migrate.rs` 的版本化迁移
// === 拆分模块(2026-09-15:自 3496 行巨石按域切出,内容零改动) =============
//
// - schema        建库 SCHEMA
// - helpers       时间/枚举串换算 + rusqlite 适配
// - rows          row_to_* 行解析器
// - store_*       `impl Store` 按实体域分片(Rust 允许同类型多 impl 块)
// - sync_writes   upsert_*_marked 同步写入内核
// - sync_changelog `impl ChangeLogStore`
// - tests         store 层测试
mod schema;
mod store_impl;
mod sync_changelog;
mod sync_writes;
#[cfg(test)]
mod tests;

// 供各分片 `use super::*` 取用
use helpers::*;
use rows::*;
pub(crate) use schema::SCHEMA_SQL;
