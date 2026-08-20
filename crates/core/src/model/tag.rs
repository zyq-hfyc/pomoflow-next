//! 标签实体
//!
//! 标签和任务是 N:N,通过 v1 的 `task_tag` 关联表表达;
//! v2 这里仍然走单独 `task_tags` 表(Store trait 实现里落地)。

use serde::{Deserialize, Serialize};

use super::{Id, Timestamp};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Tag {
    pub id: Id,
    /// 归属用户(多租户隔离,ADR-007;本地 = 本机用户 UUID,Store 写入时盖章)
    #[serde(default = "crate::model::nil_user_id")]
    pub user_id: Id,
    /// v1 唯一,这里也是(Store 实现约束)
    pub name: String,
    #[serde(default)]
    pub color: String,
    /// 全局排序权重(小在前;v1 display_order,拖拽排序用)
    #[serde(default)]
    pub display_order: u32,
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

impl Tag {
    pub fn new(name: impl Into<String>) -> Self {
        Self {
            id: Id::new(),
            user_id: Id::nil(),
            name: name.into(),
            color: String::new(),
            display_order: 0,
            created_at: Timestamp::now(),
            revision: 1,
            deleted_at: None,
            updated_at: Timestamp::now(),
        }
    }
}
