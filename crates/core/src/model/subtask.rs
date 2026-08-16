//! 子任务实体 —— Task 的 N:1 子条目,可选完成。
//!
//! 字段对齐 v1 `backend/app/models.py:SubTask`,适配:
//! - 主键改 UUID
//! - 加 `revision` / `deleted_at` / `updated_at` 走 LWW 同步
//! - 加 `position` 用于拖拽排序(P1.8.2 之后接 UI)

use serde::{Deserialize, Serialize};

use super::{Id, Timestamp};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct SubTask {
    pub id: Id,

    /// 所属 Task;不为空(应用层保证)。
    pub task_id: Id,

    pub title: String,

    #[serde(default)]
    pub is_completed: bool,

    /// 排序权重(同 task 内升序);前端 UI 拖拽时更新。
    #[serde(default)]
    pub position: u32,

    // === sync 元数据 ===
    #[serde(default)]
    pub revision: u64,
    #[serde(default)]
    pub deleted_at: Option<Timestamp>,
    #[serde(default)]
    pub updated_at: Timestamp,
}

impl SubTask {
    /// 新建子任务的最简构造器(revision 1,position 0,未完成)。
    pub fn new(task_id: Id, title: impl Into<String>) -> Self {
        Self {
            id: Id::new(),
            task_id,
            title: title.into(),
            is_completed: false,
            position: 0,
            revision: 1,
            deleted_at: None,
            updated_at: Timestamp::now(),
        }
    }
}
