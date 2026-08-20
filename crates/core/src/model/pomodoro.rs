//! 番茄钟会话记录 —— 每次"开始专注 → 结束"产出一条
//!
//! 与 v1 `PomodoroSession` 字段对齐;新增 `id` / `revision` / `deleted_at` 用于 sync。

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

use super::{Id, Timestamp};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct PomodoroSession {
    pub id: Id,
    /// 归属用户(多租户隔离,ADR-007;本地 = 本机用户 UUID,Store 写入时盖章)
    #[serde(default = "crate::model::nil_user_id")]
    pub user_id: Id,
    pub task_id: Option<Id>,
    pub project_id: Option<Id>,
    /// 专注时长(分钟)
    pub duration: u32,
    pub started_at: DateTime<Utc>,
    pub ended_at: DateTime<Utc>,
    /// true = 自然结束到时;false = 用户中途手动停止
    pub is_completed: bool,
    /// 创建时间(v1 created_date)
    #[serde(default)]
    pub created_at: Timestamp,

    #[serde(default)]
    pub revision: u64,
    #[serde(default)]
    pub deleted_at: Option<Timestamp>,
    #[serde(default)]
    pub updated_at: Timestamp,
}

impl PomodoroSession {
    pub fn new(task_id: Option<Id>, project_id: Option<Id>, duration: u32) -> Self {
        let now = Utc::now();
        Self {
            id: Id::new(),
            user_id: Id::nil(),
            task_id,
            project_id,
            duration,
            started_at: now,
            ended_at: now,
            is_completed: false,
            created_at: Timestamp::now(),
            revision: 1,
            deleted_at: None,
            updated_at: Timestamp::now(),
        }
    }
}
