//! 重复任务编排层 —— v1 `backend/app/crud.py:287-331, 334-379` 的翻译。
//!
//! 纯日期算术在 `pomoflow_core::repeat`(已对拍验证);本模块只做 `&dyn Store`
//! 编排(读模板的标签/子任务 → 批量写实例),保持 core 无 I/O。
//!
//! ## v1 语义
//!
//! - **生成**:模板(repeat 非空且自身非实例)→ 按日期逐个建实例:复制
//!   标题/描述/项目/优先级/预估/时长/提醒,due=计算日,status=active,
//!   completed_pomodoros=0,repeat=None;**同步复制模板当前标签**与
//!   **全部子任务(重置未完成)**。
//! - **删除**:只删该模板下 status=active 的实例(已完成的保留);
//!   v2 统一软删(子任务/标签关联随实例自然隐藏)。
//! - **级联**:删模板 → 实例全部删除(v1 FK CASCADE)。

use pomoflow_core::error::CoreResult;
use pomoflow_core::model::{
    Id, Repeat, SubTask, Task, TaskStatus, Timestamp,
};
use pomoflow_core::repeat;
use pomoflow_core::store::{Store, TaskQuery};

/// 是否为"重复模板"(自身非实例且带规则)。
fn is_template(task: &Task) -> bool {
    task.repeat != Repeat::None && task.repeat_parent_id.is_none()
}

/// 按模板预生成重复实例(v1 generate_repeat_instances)。
///
/// 调用时机:模板创建后 / repeat 规则变化重生成(此时模板已落库,标签为最新)。
/// 返回生成的实例数。
pub fn generate_instances(store: &dyn Store, parent: &Task) -> CoreResult<usize> {
    if !is_template(parent) {
        return Ok(0);
    }
    let dates = repeat::compute_repeat_dates(
        parent.repeat,
        parent.due_date,
        parent.repeat_config.as_deref(),
    );
    if dates.is_empty() {
        return Ok(0);
    }
    let parent_tags = store.list_tags_for_task(&parent.id)?;
    let parent_subtasks = store.list_subtasks_for_task(&parent.id)?;
    let now = Timestamp::now();
    let count = dates.len();

    for due in dates {
        let inst = Task {
            id: Id::new(),
            title: parent.title.clone(),
            description: parent.description.clone(),
            project_id: parent.project_id.clone(),
            priority: parent.priority,
            status: TaskStatus::Active,
            due_date: Some(due),
            estimated_pomodoros: parent.estimated_pomodoros,
            completed_pomodoros: 0,
            pomodoro_duration: parent.pomodoro_duration,
            reminder: parent.reminder,
            repeat: Repeat::None,
            repeat_config: None,
            repeat_parent_id: Some(parent.id.clone()),
            repeat_end_date: None,
            completed_at: None,
            created_at: now,
            revision: 1,
            deleted_at: None,
            updated_at: now,
        };
        let saved = store.upsert_task(inst)?;
        // 复制模板当前标签
        if !parent_tags.is_empty() {
            let tag_ids: Vec<Id> = parent_tags.iter().map(|t| t.id.clone()).collect();
            store.set_tags_for_task(&saved.id, &tag_ids)?;
        }
        // 复制子任务(全部重置为未完成;v1 is_completed=False)
        for st in &parent_subtasks {
            store.upsert_subtask(SubTask {
                id: Id::new(),
                task_id: saved.id.clone(),
                title: st.title.clone(),
                is_completed: false,
                position: st.position,
                created_at: now,
                revision: 1,
                deleted_at: None,
                updated_at: now,
            })?;
        }
    }
    Ok(count)
}

/// 删除模板下所有 active 实例(完成的保留;v1 delete_repeat_instances)。
pub fn delete_active_instances(store: &dyn Store, parent_id: &Id) -> CoreResult<usize> {
    let instances = store.list_tasks(&TaskQuery {
        repeat_parent: Some(parent_id.clone()),
        status: Some(TaskStatus::Active),
        ..TaskQuery::default()
    })?;
    let n = instances.len();
    for inst in instances {
        store.delete_task(&inst.id)?;
    }
    Ok(n)
}

/// 删除模板时级联删除全部实例(含已完成;v1 FK CASCADE)。
pub fn delete_all_instances(store: &dyn Store, parent_id: &Id) -> CoreResult<usize> {
    let instances = store.list_tasks(&TaskQuery {
        repeat_parent: Some(parent_id.clone()),
        ..TaskQuery::default()
    })?;
    let n = instances.len();
    for inst in instances {
        store.delete_task(&inst.id)?;
    }
    Ok(n)
}

#[cfg(test)]
mod tests {
    use super::*;
    use pomoflow_core::model::Tag;
    use pomoflow_core::store::InMemoryStore;

    fn template(rule: Repeat, due: &str) -> Task {
        let mut t = Task::new("模板任务");
        t.repeat = rule;
        t.due_date = Some(
            chrono::NaiveDateTime::parse_from_str(due, "%Y-%m-%dT%H:%M")
                .unwrap()
                .and_utc(),
        );
        t
    }

    #[test]
    fn generates_instances_with_tags_and_subtasks() {
        let store = InMemoryStore::new();
        let parent = template(Repeat::Daily, "2026-12-29T09:00");
        let pid = parent.id.clone();
        store.upsert_task(parent.clone()).unwrap();
        // 模板先链标签 + 子任务(对齐 v1 create 顺序)
        let tag = Tag::new("urgent");
        let tag_id = tag.id.clone();
        store.upsert_tag(tag).unwrap();
        store
            .set_tags_for_task(&pid, std::slice::from_ref(&tag_id))
            .unwrap();
        store
            .upsert_subtask(SubTask::new(pid.clone(), "第一步"))
            .unwrap();

        let n = generate_instances(&store, &parent).unwrap();
        // 12-29 起:daily 到年底 = 12-30、12-31 两实例
        assert_eq!(n, 2);
        let insts = store
            .list_tasks(&TaskQuery {
                repeat_parent: Some(pid.clone()),
                ..TaskQuery::default()
            })
            .unwrap();
        assert_eq!(insts.len(), 2);
        // 实例字段
        assert_eq!(insts[0].title, "模板任务");
        assert_eq!(insts[0].repeat, Repeat::None);
        assert_eq!(insts[0].repeat_parent_id.as_ref(), Some(&pid));
        assert_eq!(insts[0].status, TaskStatus::Active);
        // 标签与子任务复制
        let tags = store.list_tags_for_task(&insts[0].id).unwrap();
        assert_eq!(tags.len(), 1);
        assert_eq!(tags[0].name, "urgent");
        let subs = store.list_subtasks_for_task(&insts[0].id).unwrap();
        assert_eq!(subs.len(), 1);
        assert_eq!(subs[0].title, "第一步");
        assert!(!subs[0].is_completed);
    }

    #[test]
    fn completed_instances_survive_active_delete() {
        let store = InMemoryStore::new();
        let parent = template(Repeat::Daily, "2026-12-29T09:00");
        let pid = parent.id.clone();
        store.upsert_task(parent.clone()).unwrap();
        generate_instances(&store, &parent).unwrap();

        let insts = store
            .list_tasks(&TaskQuery {
                repeat_parent: Some(pid.clone()),
                ..TaskQuery::default()
            })
            .unwrap();
        // 完成第一个实例
        let mut done = insts[0].clone();
        done.status = TaskStatus::Completed;
        store.upsert_task(done).unwrap();

        let deleted = delete_active_instances(&store, &pid).unwrap();
        assert_eq!(deleted, 1);
        let remain = store
            .list_tasks(&TaskQuery {
                repeat_parent: Some(pid.clone()),
                ..TaskQuery::default()
            })
            .unwrap();
        assert_eq!(remain.len(), 1);
        assert_eq!(remain[0].status, TaskStatus::Completed);
    }

    #[test]
    fn non_template_yields_nothing() {
        let store = InMemoryStore::new();
        let mut inst = template(Repeat::Daily, "2026-12-29T09:00");
        inst.repeat_parent_id = Some(Id::new()); // 自身是实例
        assert_eq!(generate_instances(&store, &inst).unwrap(), 0);
        let mut plain = Task::new("普通任务"); // 无规则
        plain.due_date = inst.due_date;
        assert_eq!(generate_instances(&store, &plain).unwrap(), 0);
    }
}
