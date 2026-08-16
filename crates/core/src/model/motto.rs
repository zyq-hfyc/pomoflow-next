//! 座右铭实体 —— 用户自定义名言(番茄钟页轮播用)
//!
//! v1 `models.py:Motto`:text + author + audit 字段。
//! v2 加 UUID `id` + LWW 同步元数据(revision / deleted_at / updated_at)。

use serde::{Deserialize, Serialize};

use super::{Id, Timestamp};

/// 座右铭 —— 用户自定义名人名言,番茄钟页优先轮播。
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Motto {
    pub id: Id,
    #[serde(default)]
    pub text: String,
    /// 作者可空(匿名 / 自创)
    #[serde(default)]
    pub author: Option<String>,
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

impl Motto {
    /// 新建座右铭 —— revision=1, updated_at=now。
    pub fn new(text: impl Into<String>, author: Option<String>) -> Self {
        Self {
            id: Id::new(),
            text: text.into(),
            author,
            created_at: Timestamp::now(),
            revision: 1,
            deleted_at: None,
            updated_at: Timestamp::now(),
        }
    }
}
