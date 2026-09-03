//! 复盘实体 —— 日 / 周 / 月 / 年 四种粒度
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
    /// 归属用户(多租户隔离,ADR-007;本地 = 本机用户 UUID,Store 写入时盖章)
    #[serde(default = "crate::model::nil_user_id")]
    pub user_id: Id,
    /// 唯一约束日期(同步自然键)
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
    /// 归属用户(多租户隔离,ADR-007;本地 = 本机用户 UUID,Store 写入时盖章)
    #[serde(default = "crate::model::nil_user_id")]
    pub user_id: Id,
    /// 周一日期(同步自然键)
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
    /// 归属用户(多租户隔离,ADR-007;本地 = 本机用户 UUID,Store 写入时盖章)
    #[serde(default = "crate::model::nil_user_id")]
    pub user_id: Id,
    /// 年月 `YYYY-MM`(同步自然键)
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

/// 年复盘 —— 主键是 `YYYY`(v2 新增粒度,移动端复盘入口重构批)
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct YearlyReview {
    pub id: Id,
    /// 归属用户(多租户隔离,ADR-007;本地 = 本机用户 UUID,Store 写入时盖章)
    #[serde(default = "crate::model::nil_user_id")]
    pub user_id: Id,
    /// 年份 `YYYY`(同步自然键)
    pub year: String,
    #[serde(default)]
    pub content: String,

    #[serde(default)]
    pub revision: u64,
    #[serde(default)]
    pub deleted_at: Option<Timestamp>,
    #[serde(default)]
    pub updated_at: Timestamp,
}
