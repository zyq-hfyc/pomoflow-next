//! 任务实体
//!
//! 字段集合参考 v1 `backend/app/models.py:Task`,做最小适配:
//! - 主键改 `UUID` (字符串)
//! - 加 `revision` + `deleted_at` (软删除)
//! - 业务状态字段保留:status / priority / completed_pomodoros / completed_at / ...

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

use super::{Id, Timestamp};

#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum TaskStatus {
    #[default]
    Active,
    Completed,
}

#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Priority {
    High,
    #[default]
    Medium,
    Low,
    None,
}

/// 提醒时机 —— v1 字符串取值,这里改成 enum 强制闭合。
/// 与 v1 取值一一对应(中文 UI 文案由前端 i18n 翻译)。
#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum Reminder {
    #[default]
    None,
    OnTime,
    Minutes5,
    Minutes30,
    Hour1,
    Day1,
    Days2,
}

/// 重复规则 —— v1 也是字符串枚举。
///
/// `Custom` 与 v1 `repeat_config` 字段配套:repeat="custom" 时,具体规则在
/// repeat_config 里(JSON 字符串,如 `{type:"week", weekdays:[1,3,5], ...}`)。
#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum Repeat {
    #[default]
    None,
    Daily,
    Weekdays,
    Weekly,
    Monthly,
    Yearly,
    /// 自定义规则 —— 实际配置存在 `Task.repeat_config` 字段(JSON)。
    Custom,
}

/// 任务主体 —— 所有 Option 字段对应 v1 可空列。
///
/// P0 阶段只放字段;业务方法(`mark_complete` / `bump_completed_pomodoros`)放 P1。
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Task {
    pub id: Id,
    /// 归属用户(多租户隔离,ADR-007;本地 = 本机用户 UUID,Store 写入时盖章)
    #[serde(default = "crate::model::nil_user_id")]
    pub user_id: Id,

    pub title: String,
    #[serde(default)]
    pub description: String,

    pub project_id: Option<Id>,

    #[serde(default)]
    pub priority: Priority,
    #[serde(default)]
    pub status: TaskStatus,

    pub due_date: Option<DateTime<Utc>>,

    #[serde(default)]
    pub estimated_pomodoros: u32,
    #[serde(default)]
    pub completed_pomodoros: u32,
    /// 单次专注分钟数(覆盖全局设置)
    #[serde(default)]
    pub pomodoro_duration: Option<u32>,

    #[serde(default)]
    pub reminder: Reminder,
    #[serde(default)]
    pub repeat: Repeat,
    /// 自定义重复规则 JSON 字符串(只在 `repeat = Custom` 时有值)。
    /// v1 用 string 列存,我们直接以 `String`  透传,具体 schema 由前端 dialog 决定。
    #[serde(default)]
    pub repeat_config: Option<String>,
    /// 重复模板 ID;重复实例指向模板任务,模板本身为 None(v1 repeat_parent_id)。
    #[serde(default)]
    pub repeat_parent_id: Option<Id>,
    /// 重复终止时间(模板任务上按规则计算;v1 repeat_end_date)。
    #[serde(default)]
    pub repeat_end_date: Option<DateTime<Utc>>,

    pub completed_at: Option<DateTime<Utc>>,
    /// 创建时间(v1 created_date;列表排序 & 自动接续任务排序用)。
    #[serde(default)]
    pub created_at: Timestamp,

    // === sync 元数据 ===
    /// LWW 合并用的单调递增版本号,本地写入分配
    #[serde(default)]
    pub revision: u64,
    /// 软删除时间戳;非 None 即视为已删除(LWW 也能处理)
    #[serde(default)]
    pub deleted_at: Option<Timestamp>,
    /// 最近一次本地写入时间
    #[serde(default)]
    pub updated_at: Timestamp,
}

impl Task {
    /// 新建活跃任务的最简构造器(revision 初始 1,updated_at 设为当前时刻)。
    pub fn new(title: impl Into<String>) -> Self {
        Self {
            id: Id::new(),
            user_id: Id::nil(),
            title: title.into(),
            description: String::new(),
            project_id: None,
            priority: Priority::default(),
            status: TaskStatus::default(),
            due_date: None,
            estimated_pomodoros: 0,
            completed_pomodoros: 0,
            pomodoro_duration: None,
            reminder: Reminder::default(),
            repeat: Repeat::default(),
            repeat_config: None,
            repeat_parent_id: None,
            repeat_end_date: None,
            completed_at: None,
            created_at: Timestamp::now(),
            revision: 1,
            deleted_at: None,
            updated_at: Timestamp::now(),
        }
    }
}
