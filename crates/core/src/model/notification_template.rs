//! 通知文案模板 —— 全库单行配置(固定 id = "1")
//!
//! v1 `models.py:NotificationTemplate` + `routers/notification_template.py`:
//! - 6 种风格:default / cute / self_dep / strive / funny / custom
//! - 预设风格(frontend)文案随 UI 语言解析;只有 `custom` 持久化用户自定义文本
//! - `reminder_body` 支持 `{task_title}` 占位符,发送时替换
//!
//! v2 后端只负责存取;风格预设表与占位替换在前端 `lib/notificationStyles.ts`。

use serde::{Deserialize, Serialize};

use super::{Id, Timestamp};

/// 通知文案模板(单行)。
///
/// 所有文案字段 `Option`:预设风格下后端不存文本,前端按语言解析;
/// 仅 `custom` 风格会写入用户文本。
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct NotificationTemplate {
    /// 固定为 "1"(单行配置)
    pub id: Id,
    /// 风格:default / cute / self_dep / strive / funny / custom
    #[serde(default = "default_style")]
    pub style: String,
    /// 风格说明(可选,用户自定义描述)
    #[serde(default)]
    pub style_description: Option<String>,
    #[serde(default)]
    pub focus_end_title: Option<String>,
    #[serde(default)]
    pub focus_end_body: Option<String>,
    #[serde(default)]
    pub break_end_title: Option<String>,
    #[serde(default)]
    pub break_end_body: Option<String>,
    #[serde(default)]
    pub reminder_title: Option<String>,
    /// 支持 `{task_title}` 占位符
    #[serde(default)]
    pub reminder_body: Option<String>,

    #[serde(default)]
    pub updated_at: Timestamp,
}

fn default_style() -> String {
    "default".to_string()
}

impl NotificationTemplate {
    /// 默认行(id = "1",style = "default")—— 表为空时 GET 返回这份
    /// (v1 `_DEFAULTS` 对齐:文案由前端预设表按语言给出,后端不落默认文本)。
    pub fn default_row() -> Self {
        Self {
            id: Id("1".to_string()),
            style: default_style(),
            style_description: None,
            focus_end_title: None,
            focus_end_body: None,
            break_end_title: None,
            break_end_body: None,
            reminder_title: None,
            reminder_body: None,
            updated_at: Timestamp::now(),
        }
    }
}
