//! 业务规则校验
//!
//! 与 v1 `crud.py` 里的业务约束一一对应,集中放置以便同步给所有调用方
//! (桌面 / 未来云端 / migrate 工具)。

use crate::error::{CoreError, CoreResult};
use crate::model::{Project, Task};

/// 任务必填项与取值范围。
///
/// v1 行为:
/// - `title` 不能为空
/// - `priority` 必须在枚举内
/// - `estimated_pomodoros` ≥ 0(无显式上限)
/// - `pomodoro_duration` 若提供,> 0 且 ≤ 240 分钟(防止误填 24h 当专注时长)
pub fn validate_task(task: &Task) -> CoreResult<()> {
    if task.title.trim().is_empty() {
        return Err(CoreError::validation("task.title 不能为空"));
    }
    if task.title.chars().count() > 500 {
        return Err(CoreError::validation("task.title 不能超过 500 字符"));
    }
    if let Some(d) = task.pomodoro_duration {
        if d == 0 || d > 240 {
            return Err(CoreError::validation(format!(
                "task.pomodoro_duration 必须在 1..=240 分钟之间,当前 {}",
                d
            )));
        }
    }
    Ok(())
}

/// 项目层级校验 —— UI 限制 ≤ 3 级(v1 行为)。
///
/// 需要在 `Store` 配合下做"沿 parent_id 上溯根节点"才能判断,所以这里只接受
/// `parent_path_len`,具体查询留给调用方。
pub fn validate_project_depth(parent_depth: usize, new_project: &Project) -> CoreResult<()> {
    const MAX_DEPTH: usize = 3;
    let new_depth = parent_depth + 1;
    if new_depth > MAX_DEPTH {
        return Err(CoreError::validation(format!(
            "项目层级超过 {} 层(当前 {}),UI 不支持更深嵌套",
            MAX_DEPTH, new_depth
        )));
    }
    if new_project.name.trim().is_empty() {
        return Err(CoreError::validation("project.name 不能为空"));
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn empty_title_rejected() {
        let mut t = Task::new("");
        t.title = "   ".into();
        assert!(validate_task(&t).is_err());
    }

    #[test]
    fn invalid_duration_rejected() {
        let mut t = Task::new("ok");
        t.pomodoro_duration = Some(0);
        assert!(validate_task(&t).is_err());
        t.pomodoro_duration = Some(500);
        assert!(validate_task(&t).is_err());
    }

    #[test]
    fn depth_over_three_rejected() {
        let p = Project::new("child");
        let err = validate_project_depth(3, &p).unwrap_err();
        assert!(matches!(err, CoreError::Validation(_)));
    }

    #[test]
    fn depth_three_accepted() {
        let p = Project::new("child");
        validate_project_depth(2, &p).unwrap();
    }
}
