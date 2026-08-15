//! P0 集成冒烟测试 —— 跑一遍"建项目 + 建任务 + 关联标签 + 同步合并"全流程
//!
//! 验证四个模块协同工作:
//! - model:实体构造与序列化
//! - store:CRUD 与查询
//! - validate:业务规则拦截
//! - sync:多端 changelog 合并

use pomoflow_core::model::{Project, Tag, Task};
use pomoflow_core::store::{InMemoryStore, Store, TaskQuery};
use pomoflow_core::sync::{merge_changelogs, Change, ChangeLog, EntityKind};
use pomoflow_core::validate::validate_task;
use pomoflow_core::{CoreError, Id};

#[test]
fn full_flow_smoke() {
    let store = InMemoryStore::new();

    // 1. 建项目
    let proj = Project::new("工作");
    let proj_id = proj.id.clone();
    store.upsert_project(proj).unwrap();

    // 2. 建标签
    let tag = Tag::new("urgent");
    let tag_id = tag.id.clone();
    store.upsert_tag(tag).unwrap();

    // 3. 建任务并校验
    let mut task = Task::new("写架构设计文档");
    task.project_id = Some(proj_id.clone());
    validate_task(&task).expect("valid task");
    let task_id = task.id.clone();
    store.upsert_task(task).unwrap();

    // 4. 关联标签
    store
        .set_tags_for_task(&task_id, std::slice::from_ref(&tag_id))
        .unwrap();
    let tags = store.list_tags_for_task(&task_id).unwrap();
    assert_eq!(tags.len(), 1);
    assert_eq!(tags[0].name, "urgent");

    // 5. 按 project 过滤查询
    let q = TaskQuery {
        project_id: Some(proj_id.clone()),
        ..Default::default()
    };
    let tasks = store.list_tasks(&q).unwrap();
    assert_eq!(tasks.len(), 1);

    // 6. 软删除后从查询中消失
    store.delete_task(&task_id).unwrap();
    let tasks = store.list_tasks(&q).unwrap();
    assert!(tasks.is_empty(), "deleted task should not appear in list");
}

#[test]
fn sync_merge_two_devices() {
    // 设备 A 修改 revision=2,t=10:00;设备 B 修改 revision=2,t=11:00
    // 期望:B 胜(revision 相同时 updated_at 大的胜)
    let payload_a = serde_json::json!({"title": "from A"});
    let payload_b = serde_json::json!({"title": "from B"});

    use chrono::{TimeZone, Utc};
    let ts_a = Utc.with_ymd_and_hms(2026, 1, 1, 10, 0, 0).unwrap();
    let ts_b = Utc.with_ymd_and_hms(2026, 1, 1, 11, 0, 0).unwrap();

    let mut log_a = ChangeLog::new("device-a");
    log_a.push(Change {
        id: uuid::Uuid::new_v4(),
        device_id: "device-a".into(),
        entity: EntityKind::Task,
        entity_id: "task-1".into(),
        revision: 2,
        updated_at: ts_a,
        payload: payload_a.clone(),
    });

    let mut log_b = ChangeLog::new("device-b");
    log_b.push(Change {
        id: uuid::Uuid::new_v4(),
        device_id: "device-b".into(),
        entity: EntityKind::Task,
        entity_id: "task-1".into(),
        revision: 2,
        updated_at: ts_b,
        payload: payload_b.clone(),
    });

    let report = merge_changelogs(&[log_a, log_b]).unwrap();
    assert_eq!(report.winners.len(), 1);
    assert_eq!(report.conflicts, 1);
    // B 胜
    assert_eq!(report.winners[0].change.device_id, "device-b");
    assert_eq!(report.winners[0].change.payload, payload_b);
}

#[test]
fn id_format_parse() {
    let id = Id::new();
    assert!(Id::parse(id.as_str()).is_some());
    assert!(Id::parse("not-a-uuid").is_none());
}

#[test]
fn unique_tag_name_violation_returns_conflict() {
    let store = InMemoryStore::new();
    store.upsert_tag(Tag::new("urgent")).unwrap();
    let err = store.upsert_tag(Tag::new("urgent")).unwrap_err();
    assert!(matches!(err, CoreError::Conflict(_)));
}