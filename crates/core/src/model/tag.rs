//! 标签实体
//!
//! 标签和任务是 N:N,通过 v1 的 `task_tag` 关联表表达;
//! v2 这里仍然走单独 `task_tags` 表(Store trait 实现里落地)。

use serde::{Deserialize, Serialize};

use super::{Id, Timestamp};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Tag {
    pub id: Id,
    /// v1 唯一,这里也是(Store 实现约束)
    pub name: String,
    #[serde(default)]
    pub color: String,

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
            name: name.into(),
            color: String::new(),
            revision: 1,
            deleted_at: None,
            updated_at: Timestamp::now(),
        }
    }
}
