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

/// 任务↔标签关联的同步载荷(同步协议"已知范围外"项的落地)。
///
/// 关联表不逐行同步:以 `task_id` 为键、tag 集合为载荷**整体 LWW** ——
/// 与 Store 的 `set_tags_for_task` 全量替换语义天然对齐,无需逐关联 tombstone。
/// 空 `tag_ids` = 无标签/已清除(与 Review 空内容=删除同语义,ADR-010)。
///
/// 注意:`tag_ids` 指向的标签可能已被删除(task_tags 无外键,死引用在
/// 查询侧 JOIN 活标签时自然不可见);两侧都跑同一套删除级联,最终收敛一致。
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct TaskTagLink {
    pub task_id: Id,
    /// 关联标签集合(Store 写入前排序去重,消除顺序抖动导致的伪冲突)
    #[serde(default)]
    pub tag_ids: Vec<Id>,
    #[serde(default = "crate::model::nil_user_id")]
    pub user_id: Id,
    #[serde(default)]
    pub revision: u64,
    #[serde(default)]
    pub updated_at: Timestamp,
}
