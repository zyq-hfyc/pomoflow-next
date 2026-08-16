//! 域模型 —— 纯数据结构 + 字段约束
//!
//! ## 设计原则
//!
//! - **每个实体有 UUID 主键**(`String` 内包装),与 v1 的 `INTEGER PK` 不兼容,
//!   保证后续多端同步可路由到具体设备。
//! - **`revision: u64` 单调递增**,由本地写入时分配,作为 LWW 合并仲裁依据。
//! - **`deleted_at: Option<DateTime<Utc>>` 软删除字段**——同步对端删除时不删数据,
//!   而是标记;LWW 合并后两边才收敛。
//! - **不带任何外键约束**——`project_id` / `task_id` 等都是普通字段,关联一致性
//!   由应用层 [`validate`](crate::validate) 模块负责。
//!
//! ## P0 范围
//!
//! 本阶段只实现最简骨架(每个实体一个 struct + 默认值 + Debug/Clone/Serialize),
//! 字段集合按 v1 `models.py` 一一对应。**业务方法(如"完成一个任务")放到 P1**。

pub mod motto;
pub mod notification_template;
pub mod pomodoro;
pub mod project;
pub mod review;
pub mod subtask;
pub mod tag;
pub mod task;

pub use motto::Motto;
pub use notification_template::NotificationTemplate;
pub use pomodoro::PomodoroSession;
pub use project::Project;
pub use review::{DailyReview, MonthlyReview, WeeklyReview};
pub use subtask::SubTask;
pub use tag::Tag;
pub use task::{Priority, Reminder, Repeat, Task, TaskStatus};

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

/// 实体通用 ID 类型 —— UUID v4 字符串形式。
///
/// 用 `String` 而非 `uuid::Uuid` 类型是为了直接 `Serialize` 成普通 JSON 字符串,
/// 简化跨语言同步(Flutter / Web 都能直接读写)。生成和校验在构造器里集中。
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct Id(pub String);

impl Id {
    /// 生成新 UUID v4 作为实体 ID。
    pub fn new() -> Self {
        Self(Uuid::new_v4().to_string())
    }

    /// 从字符串恢复 ID(校验格式,非法返回 None)。
    pub fn parse(s: &str) -> Option<Self> {
        Uuid::parse_str(s).ok().map(|_| Self(s.to_string()))
    }

    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl Default for Id {
    /// 手动实现而不是 `#[derive(Default)]`,保证新 ID 真的是 UUID v4,
    /// 而不是空字符串或 `Id(String::default())`。
    fn default() -> Self {
        Self::new()
    }
}

impl std::fmt::Display for Id {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(&self.0)
    }
}

/// 审计时间戳 —— 所有实体必带,记录本地最近一次写入时间。
///
/// LWW 合并时不仅看 `revision`,还要看 `updated_at` 做兜底(防止两个设备同时
/// 分配相同 revision——理论上 `revision` 单调递增不会撞,但兜底没坏处)。
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(transparent)]
pub struct Timestamp(pub DateTime<Utc>);

impl Timestamp {
    pub fn now() -> Self {
        Self(Utc::now())
    }
}

impl Default for Timestamp {
    fn default() -> Self {
        Self::now()
    }
}

/// `Task` 的「展示视图」:把任务本身 + 它的标签 + 子任务拍平到一个 JSON 对象里。
///
/// `#[serde(flatten)]` 让前端拿到与 `Task` 同构的字段(没有 wrapper),只多了
/// `tags` / `subtasks` 两个可选数组。`#[serde(default)]` 让旧客户端(只想要
/// Task 字段)无感升级,缺这两个字段时不报错。
///
/// 用法:`list_tasks` / `get_task` 命令返回 `Vec<TaskView>`,与 v1 FastAPI
/// `TaskOut.from_orm` embed tags/subtasks 的行为对齐。
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TaskView {
    #[serde(flatten)]
    pub task: Task,

    #[serde(default)]
    pub tags: Vec<Tag>,

    #[serde(default)]
    pub subtasks: Vec<SubTask>,
}

impl TaskView {
    pub fn new(task: Task) -> Self {
        Self {
            task,
            tags: Vec::new(),
            subtasks: Vec::new(),
        }
    }
}
