//! Mobile(Flutter/Dart)push 的 payload 形状 ↔ core 反序列化兼容锁。
//!
//! mobile 端 `apps/mobile/lib/services/sync_wire.dart` 手拼 core JSON;
//! 这里的样例 = 该模块单测(`sync_wire_test.dart`)锁定的同一形状。
//! 双向锁死:mobile 侧锁"dart 生成的形状",本文件锁"该形状 serde 可收" ——
//! 任何一侧字段名/结构漂移都会先炸测试,而不是线上同步。
//!
//! 关键约定:无 `#[serde(default)]` 的必填字段(`project_id` / `due_date` /
//! `completed_at` / `id` / `user_id` / `title`)必须**显式出现**,哪怕是 null。

use pomoflow_core::model::{PomodoroSession, Task};

/// `sync_wire.dart coreTaskPayload` 的合法产物样例。
const TASK_JSON: &str = r#"{
  "id": "abc1230000zzzz",
  "user_id": "u-123",
  "title": "wire 测试任务",
  "description": "",
  "project_id": null,
  "priority": "high",
  "status": "completed",
  "due_date": "2026-08-25T04:00:00.000Z",
  "estimated_pomodoros": 3,
  "completed_pomodoros": 2,
  "pomodoro_duration": null,
  "reminder": "none",
  "repeat": "none",
  "repeat_config": null,
  "repeat_parent_id": null,
  "repeat_end_date": null,
  "completed_at": null,
  "created_at": "2026-05-02T03:30:00.123Z",
  "revision": 2,
  "deleted_at": null,
  "updated_at": "2026-05-02T03:30:00.123Z"
}"#;

/// `sync_wire.dart coreSessionPayload` 的合法产物样例。
const SESSION_JSON: &str = r#"{
  "id": "ses0000000zzz",
  "user_id": "u-9",
  "task_id": null,
  "project_id": null,
  "duration": 25,
  "started_at": "1970-01-01T00:00:01.000Z",
  "ended_at": "1970-01-01T00:25:01.000Z",
  "is_completed": true,
  "created_at": "1970-01-01T00:00:01.000Z",
  "revision": 1,
  "deleted_at": null,
  "updated_at": "1970-01-01T00:00:01.000Z"
}"#;

#[test]
fn mobile_task_payload_deserializes() {
    let v: serde_json::Value = serde_json::from_str(TASK_JSON).unwrap();
    let t: Task = serde_json::from_value(v).expect("mobile payload 必须能反序列化为 core::Task");
    assert_eq!(t.id.as_str(), "abc1230000zzzz");
    assert_eq!(t.title, "wire 测试任务");
    assert!(t.project_id.is_none());
    assert!(t.due_date.is_some());
    assert!(t.completed_at.is_none());
    assert_eq!(t.revision, 2);
    assert!(t.deleted_at.is_none());
}

#[test]
fn mobile_tombstone_task_payload_deserializes() {
    // mobile 软删除后的 push 变体:deleted_at 非空(墓碑),desktop 端
    // apply_remote 必须能照常反序列化并收敛隐藏。
    let mut obj = serde_json::from_str::<serde_json::Value>(TASK_JSON)
        .unwrap()
        .as_object()
        .unwrap()
        .clone();
    obj.insert(
        "deleted_at".into(),
        serde_json::json!("2026-08-25T12:00:00.000Z"),
    );
    let t: Task = serde_json::from_value(serde_json::Value::Object(obj))
        .expect("墓碑 payload 必须能反序列化");
    assert!(t.deleted_at.is_some());
}

#[test]
fn mobile_session_payload_deserializes() {
    let v: serde_json::Value = serde_json::from_str(SESSION_JSON).unwrap();
    let s: PomodoroSession =
        serde_json::from_value(v).expect("mobile payload 必须能反序列化为 core::PomodoroSession");
    assert_eq!(s.id.as_str(), "ses0000000zzz");
    assert!(s.task_id.is_none());
    assert_eq!(s.duration, 25);
    assert!(s.is_completed);
    assert_eq!(s.revision, 1);
}

#[test]
fn task_missing_required_string_is_rejected() {
    // Option 字段 serde 缺失时自动为 None(隐式),可省略;但 String 类
    // 必填字段(如 title)缺失必须拒收 —— 此用例证明测试装置真的在验
    // 反序列化行为,而不是恒真断言。
    let v: serde_json::Value = serde_json::from_str(TASK_JSON).unwrap();
    let mut obj = v.as_object().unwrap().clone();
    obj.remove("title");
    let err = serde_json::from_value::<Task>(serde_json::Value::Object(obj));
    assert!(err.is_err(), "缺 title 应被拒收");
}

#[test]
fn session_missing_required_fields_is_rejected() {
    // PomodoroSession 的 duration/started_at/ended_at 均为非 Option 必填。
    for key in ["duration", "started_at", "ended_at"] {
        let v: serde_json::Value = serde_json::from_str(SESSION_JSON).unwrap();
        let mut obj = v.as_object().unwrap().clone();
        obj.remove(key);
        let err = serde_json::from_value::<PomodoroSession>(serde_json::Value::Object(obj));
        assert!(err.is_err(), "缺 {key} 应被拒收");
    }
}
