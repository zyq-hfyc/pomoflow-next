//! 手账实体 —— 移动端「待办 / 愿望 / 年度规划 / 小记」四类随手记
//!
//! v1 **没有**手账实体(移动端 SQLite 本地表 `journals` 独立存在,从未上云),
//! 属于 v2 新语义:`kind` 四档字符串沿用移动端既有取值,tags 为自由文本
//! (逗号分隔 csv 的 serde 形态),**不**与 tag 实体建关联。

use serde::{Deserialize, Serialize};

use super::{Id, Timestamp};

/// 手账一条 —— 按类型分四档展示,内容自由。
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Journal {
    pub id: Id,
    /// 归属用户(多租户隔离,ADR-007;本地 = 本机用户 UUID,Store 写入时盖章)
    #[serde(default = "crate::model::nil_user_id")]
    pub user_id: Id,
    /// 四档固定取值:`todo` / `wish` / `plan` / `note`(移动端 JournalKind)
    #[serde(default = "journal_default_kind")]
    pub kind: String,
    #[serde(default)]
    pub title: String,
    #[serde(default)]
    pub content: String,
    /// 自由文本标签(移动端 tags_csv;不关联 tag 实体)
    #[serde(default)]
    pub tags: Vec<String>,
    /// 创建时间
    #[serde(default)]
    pub created_at: Timestamp,

    #[serde(default)]
    pub revision: u64,
    #[serde(default)]
    pub deleted_at: Option<Timestamp>,
    #[serde(default)]
    pub updated_at: Timestamp,
}

fn journal_default_kind() -> String {
    "note".to_string()
}

/// kind 合法取值(与移动端 JournalKind 一一对应)。
pub const JOURNAL_KINDS: [&str; 4] = ["todo", "wish", "plan", "note"];

impl Journal {
    /// 新建手账 —— revision=1, updated_at=now。
    pub fn new(kind: impl Into<String>, title: impl Into<String>) -> Self {
        let now = Timestamp::now();
        Self {
            id: Id::new(),
            user_id: Id::nil(),
            kind: kind.into(),
            title: title.into(),
            content: String::new(),
            tags: Vec::new(),
            created_at: now,
            revision: 1,
            deleted_at: None,
            updated_at: now,
        }
    }
}
