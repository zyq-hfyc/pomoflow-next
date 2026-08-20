//! 清单(项目)实体 —— 支持嵌套(parent_id 自引用)
//!
//! v1 已经支持任意层嵌套,但 UI 限制展示 3 级。
//! 这里无限深度,UI 层负责截断展示。`validate` 模块负责校验层级上限。

use serde::{Deserialize, Serialize};

use super::{Id, Timestamp};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Project {
    pub id: Id,
    /// 归属用户(多租户隔离,ADR-007;本地 = 本机用户 UUID,Store 写入时盖章)
    #[serde(default = "crate::model::nil_user_id")]
    pub user_id: Id,
    pub name: String,
    /// 主题色,前端消费;v1 用 hex 字符串,这里保持字符串
    #[serde(default)]
    pub color: String,
    /// 父项目 ID;顶层为 None
    pub parent_id: Option<Id>,
    /// 同级排序权重(小在前;v1 display_order,拖拽排序用)
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

impl Project {
    pub fn new(name: impl Into<String>) -> Self {
        Self {
            id: Id::new(),
            user_id: Id::nil(),
            name: name.into(),
            color: String::new(),
            parent_id: None,
            display_order: 0,
            created_at: Timestamp::now(),
            revision: 1,
            deleted_at: None,
            updated_at: Timestamp::now(),
        }
    }
}
