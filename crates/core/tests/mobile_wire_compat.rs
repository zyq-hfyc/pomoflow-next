//! Mobile(Flutter/Dart)push 的 payload 形状 ↔ core 反序列化兼容锁。
//!
//! mobile 端 `apps/mobile/lib/services/sync_wire.dart` 手拼 core JSON;
//! 这里的样例 = 该模块单测(`sync_wire_test.dart`)锁定的同一形状。
//! 双向锁死:mobile 侧锁"dart 生成的形状",本文件锁"该形状 serde 可收" ——
//! 任何一侧字段名/结构漂移都会先炸测试,而不是线上同步。
//!
//! 关键约定:无 `#[serde(default)]` 的必填字段(`project_id` / `due_date` /
//! `completed_at` / `id` / `user_id` / `title`)必须**显式出现**,哪怕是 null。

use chrono::{DateTime, Utc};
use pomoflow_core::model::{PomodoroSession, Reminder, Repeat, Task};
use pomoflow_core::repeat::compute_repeat_dates;

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
fn mobile_due_at_reminder_custom_repeat_payload_deserializes() {
    // v17 起变体:due_at_ms 真值到期日 + 非 none 提醒 + 自定义重复配置
    // (mobile 编辑器产出的 camelCase JSON,startDate/endDate 为
    // "yyyy-MM-ddTHH:mm" 墙钟格式 —— 与桌面 datetime-local 一致)。
    let mut obj = serde_json::from_str::<serde_json::Value>(TASK_JSON)
        .unwrap()
        .as_object()
        .unwrap()
        .clone();
    obj.insert("due_date".into(), serde_json::json!("2026-09-02T10:00:00.000Z"));
    obj.insert("reminder".into(), serde_json::json!("minutes30"));
    obj.insert("repeat".into(), serde_json::json!("custom"));
    obj.insert(
        "repeat_config".into(),
        serde_json::json!(
            "{\"interval\":0,\"type\":\"week\",\"startDate\":\"2026-09-02T18:00\",\
             \"endDate\":\"2026-12-31T23:59\",\"weekdays\":[1,3,5]}"
        ),
    );
    let t: Task = serde_json::from_value(serde_json::Value::Object(obj))
        .expect("due/reminder/custom repeat payload 必须能反序列化");
    assert_eq!(t.reminder, Reminder::Minutes30);
    assert_eq!(t.repeat, Repeat::Custom);
    assert!(t.repeat_config.is_some());
    assert!(t.due_date.is_some());

    // repeat_config 必须能被 repeat 引擎消费并产出实例(东八区墙钟)。
    let due: DateTime<Utc> = "2026-09-02T10:00:00Z".parse().unwrap();
    let dates = compute_repeat_dates(
        t.repeat,
        Some(due),
        t.repeat_config.as_deref(),
        8 * 60,
    );
    assert!(!dates.is_empty(), "weekdays 1/3/5 自定义规则应生成实例");
}

#[test]
fn mobile_repeat_instance_payload_deserializes() {
    // v18 起变体:mobile 生成的重复实例(repeat_parent_id 指向模板 id,
    // repeat_end_date 为引擎算出的 iso)。此前 mobile 恒发 null —— 编辑桌面
    // 实例会把模板链接冲断,此锁防止该 wire 回退。
    let mut obj = serde_json::from_str::<serde_json::Value>(TASK_JSON)
        .unwrap()
        .as_object()
        .unwrap()
        .clone();
    obj.insert(
        "repeat_parent_id".into(),
        serde_json::json!("aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaa77"),
    );
    obj.insert(
        "repeat_end_date".into(),
        serde_json::json!("2026-12-31T15:59:00.000Z"),
    );
    let t: Task = serde_json::from_value(serde_json::Value::Object(obj))
        .expect("repeat instance payload 必须能反序列化");
    assert_eq!(
        t.repeat_parent_id.as_ref().map(|i| i.as_str()),
        Some("aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaa77")
    );
    assert!(t.repeat_end_date.is_some());
}

#[test]
fn mobile_reminder_all_variants_deserialize() {
    // Reminder serde 名无下划线前缀数字(minutes5/hour1/days2 …),
    // mobile `_reminderOptions` 的 key 必须逐个能收。
    for name in ["none", "on_time", "minutes5", "minutes30", "hour1", "day1", "days2"] {
        let mut obj = serde_json::from_str::<serde_json::Value>(TASK_JSON)
            .unwrap()
            .as_object()
            .unwrap()
            .clone();
        obj.insert("reminder".into(), serde_json::json!(name));
        let t: Task = serde_json::from_value(serde_json::Value::Object(obj))
            .unwrap_or_else(|e| panic!("reminder={name} 应可反序列化: {e}"));
        assert_eq!(serde_json::to_string(&t.reminder).unwrap(), format!("\"{name}\""));
    }
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
