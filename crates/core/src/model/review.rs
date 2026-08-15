//! 复盘实体 —— 日 / 周 / 月 三种粒度
//!
//! v1 用日期 / 周一日期 / YYYY-MM 作为"主键",v2 这里仍然保持字符串形式的
//! "自然日期主键",同时加 UUID `id` 用于 sync(同一日期在不同设备上可能
//! 写不同内容,需要合并)。

use serde::{Deserialize, Serialize};

use super::{Id, Timestamp};

/// 日复盘 —— 主键是日期 `YYYY-MM-DD`
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct DailyReview {
    pub id: Id,
    /// 唯一约束日期
    pub date: String,
    #[serde(default)]
    pub content: String,

    #[serde(default)]
    pub revision: u64,
    #[serde(default)]
    pub deleted_at: Option<Timestamp>,
    #[serde(default)]
    pub updated_at: Timestamp,
}

/// 周复盘 —— 主键是周一日期 `YYYY-MM-DD`
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct WeeklyReview {
    pub id: Id,
    pub week_start: String,
    #[serde(default)]
    pub content: String,

    #[serde(default)]
    pub revision: u64,
    #[serde(default)]
    pub deleted_at: Option<Timestamp>,
    #[serde(default)]
    pub updated_at: Timestamp,
}

/// 月复盘 —— 主键是 `YYYY-MM`
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct MonthlyReview {
    pub id: Id,
    pub year_month: String,
    #[serde(default)]
    pub content: String,

    #[serde(default)]
    pub revision: u64,
    #[serde(default)]
    pub deleted_at: Option<Timestamp>,
    #[serde(default)]
    pub updated_at: Timestamp,
}