//! 业务规则校验
//!
//! 与 v1 `schemas.py` 的边界约束一一对应(字段长度 / 数值范围),集中放置
//! 以便同步给所有调用方(桌面 command 层 / 未来云端 / migrate 工具)。
//! v1 上限速查:
//!
//! | 字段 | v1 约束 |
//! |------|---------|
//! | task.title | 1–200 字符 |
//! | task.description | ≤5000 |
//! | task.estimated_pomodoros | 0–1000(默认 1) |
//! | task.pomodoro_duration | 1–1000 分钟(默认 25) |
//! | project.name / tag.name | 1–200 |
//! | subtask.title | 1–500 |
//! | motto.text | 1–500;motto.author ≤64 |
//! | session.duration | 1–1000 分钟 |
//! | list limit | ≤5000(v1 default 1000) |

use crate::error::{CoreError, CoreResult};
use crate::model::{Motto, Project, SubTask, Tag, Task};

/// 任务必填项与取值范围(v1 `TaskBase` 对齐)。
pub fn validate_task(task: &Task) -> CoreResult<()> {
    validate_title(&task.title, "task.title", 200)?;
    if task.description.chars().count() > 5000 {
        return Err(CoreError::validation("task.description 不能超过 5000 字符"));
    }
    if task.estimated_pomodoros > 1000 {
        return Err(CoreError::validation(format!(
            "task.estimated_pomodoros 必须在 0..=1000 之间,当前 {}",
            task.estimated_pomodoros
        )));
    }
    if let Some(d) = task.pomodoro_duration {
        if !(1..=1000).contains(&d) {
            return Err(CoreError::validation(format!(
                "task.pomodoro_duration 必须在 1..=1000 分钟之间,当前 {d}"
            )));
        }
    }
    Ok(())
}

/// 项目创建 / 更新校验(v1 `ProjectBase`)。层级上限见 [`validate_project_depth`]。
pub fn validate_project(project: &Project) -> CoreResult<()> {
    validate_title(&project.name, "project.name", 200)
}

/// 标签创建 / 更新校验(v1 `TagBase`;唯一性由 Store 约束)。
pub fn validate_tag(tag: &Tag) -> CoreResult<()> {
    validate_title(&tag.name, "tag.name", 200)
}

/// 子任务校验(v1 `SubTaskBase`)。
pub fn validate_subtask(subtask: &SubTask) -> CoreResult<()> {
    validate_title(&subtask.title, "subtask.title", 500)
}

/// 座右铭校验(v1 `MottoUpsert`)。
pub fn validate_motto(motto: &Motto) -> CoreResult<()> {
    validate_title(&motto.text, "motto.text", 500)?;
    if let Some(author) = &motto.author {
        if author.chars().count() > 64 {
            return Err(CoreError::validation("motto.author 不能超过 64 字符"));
        }
    }
    Ok(())
}

/// 番茄会话时长校验(v1 `PomodoroStart.duration`:1–1000)。
pub fn validate_session_duration(duration: u32) -> CoreResult<()> {
    if !(1..=1000).contains(&duration) {
        return Err(CoreError::validation(format!(
            "session.duration 必须在 1..=1000 分钟之间,当前 {duration}"
        )));
    }
    Ok(())
}

/// 列表 limit 夹紧(v1:1–5000,default 1000)。
pub fn clamp_limit(limit: Option<usize>) -> usize {
    match limit {
        None => 1000,
        Some(0) => 1,
        Some(n) => n.min(5000),
    }
}

/// 项目层级校验 —— UI 限制 ≤ 3 级(v1 `MAX_PROJECT_DEPTH`)。
///
/// 需要在 `Store` 配合下做"沿 parent_id 上溯根节点"才能判断,所以这里只接受
/// `parent_path_len`,具体查询留给调用方。
pub fn validate_project_depth(parent_depth: usize, new_project: &Project) -> CoreResult<()> {
    const MAX_DEPTH: usize = 3;
    validate_project(new_project)?;
    let new_depth = parent_depth + 1;
    if new_depth > MAX_DEPTH {
        return Err(CoreError::validation(format!(
            "项目层级超过 {} 层(当前 {}),UI 不支持更深嵌套",
            MAX_DEPTH, new_depth
        )));
    }
    Ok(())
}

/// 通用标题校验:trim 后非空 + 长度上限。
fn validate_title(value: &str, field: &str, max_chars: usize) -> CoreResult<()> {
    if value.trim().is_empty() {
        return Err(CoreError::validation(format!("{field} 不能为空")));
    }
    if value.chars().count() > max_chars {
        return Err(CoreError::validation(format!(
            "{field} 不能超过 {max_chars} 字符"
        )));
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn empty_title_rejected() {
        let mut t = Task::new("ok");
        t.title = "   ".into();
        assert!(validate_task(&t).is_err());
    }

    #[test]
    fn task_title_over_200_rejected() {
        let mut t = Task::new("ok");
        t.title = "长".repeat(201);
        assert!(validate_task(&t).is_err());
        t.title = "长".repeat(200);
        validate_task(&t).unwrap();
    }

    #[test]
    fn task_description_over_5000_rejected() {
        let mut t = Task::new("ok");
        t.description = "字".repeat(5001);
        assert!(validate_task(&t).is_err());
    }

    #[test]
    fn estimated_pomodoros_over_1000_rejected() {
        let mut t = Task::new("ok");
        t.estimated_pomodoros = 1001;
        assert!(validate_task(&t).is_err());
        t.estimated_pomodoros = 1000;
        validate_task(&t).unwrap();
    }

    #[test]
    fn duration_bounds_v1_aligned() {
        let mut t = Task::new("ok");
        // v1 是 1..=1000(旧实现误写 240)
        t.pomodoro_duration = Some(0);
        assert!(validate_task(&t).is_err());
        t.pomodoro_duration = Some(1000);
        validate_task(&t).unwrap();
        t.pomodoro_duration = Some(1001);
        assert!(validate_task(&t).is_err());
        validate_session_duration(500).unwrap();
        assert!(validate_session_duration(0).is_err());
    }

    #[test]
    fn project_and_tag_name_bounds() {
        let mut p = Project::new("ok");
        p.name = "".into();
        assert!(validate_project(&p).is_err());
        p.name = "名".repeat(201);
        assert!(validate_project(&p).is_err());
        p.name = "名".repeat(200);
        validate_project(&p).unwrap();

        let mut tag = Tag::new("ok");
        tag.name = "名".repeat(201);
        assert!(validate_tag(&tag).is_err());
    }

    #[test]
    fn subtask_title_bounds() {
        let tid = crate::model::Id::new();
        let mut s = SubTask::new(tid, "ok");
        s.title = "题".repeat(501);
        assert!(validate_subtask(&s).is_err());
        s.title = "题".repeat(500);
        validate_subtask(&s).unwrap();
    }

    #[test]
    fn motto_bounds() {
        let mut m = Motto::new("ok", None);
        m.text = "文".repeat(501);
        assert!(validate_motto(&m).is_err());
        m.text = "文".repeat(500);
        m.author = Some("a".repeat(65));
        assert!(validate_motto(&m).is_err());
        m.author = Some("a".repeat(64));
        validate_motto(&m).unwrap();
    }

    #[test]
    fn limit_clamp() {
        assert_eq!(clamp_limit(None), 1000);
        assert_eq!(clamp_limit(Some(0)), 1);
        assert_eq!(clamp_limit(Some(6000)), 5000);
        assert_eq!(clamp_limit(Some(30)), 30);
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
