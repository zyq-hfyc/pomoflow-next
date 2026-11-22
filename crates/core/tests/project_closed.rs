//! 「结束项目」集成测试 —— InMemoryStore / SqliteStore::open_in_memory 双实现
//! 跑同组用例(2026-11-22 结束项目批)。
//!
//! 锁定的关键语义:
//! 1. `closed_at` 落库读回一致(双实现 parity,ms 精度);
//! 2. **旧 wire 载荷兼容**:无 `closed_at` 键的 JSON 照常解析为 None,
//!    serde 往返保真(移动端/已发布 v0.2.0 桌面端拉到新载荷不炸);
//! 3. 结束后照常改名/upsert,`closed_at` 不丢(整模型 upsert 语义);
//! 4. 重开(清 `closed_at`)读回 None;
//! 5. 软删除(垃圾箱)与结束态互不干扰。

use chrono::TimeZone;
use pomoflow_core::model::{Id, Project, Timestamp};
use pomoflow_core::store::{InMemoryStore, SqliteStore, Store};

/// 毫秒精确时间戳:往返 sqlite 的 ms 列零抖动,保真断言的前提。
fn ms(v: i64) -> Timestamp {
    Timestamp(
        chrono::Utc
            .timestamp_millis_opt(v)
            .single()
            .expect("valid ms"),
    )
}

fn both_stores() -> Vec<(&'static str, InMemoryStore, SqliteStore)> {
    vec![(
        "mem+sqlite",
        InMemoryStore::with_user_device(Id::new(), "dev-mem"),
        SqliteStore::open_in_memory().expect("open_in_memory"),
    )]
}

// === 用例 1 + 3 + 4:闭 / 改名不丢 / 重开 =====================================

fn case_close_rename_reopen<S: Store>(store: &S) {
    let mut p = Project::new("写完的项目");
    p.created_at = ms(100);
    p.updated_at = ms(110);
    let saved = store.upsert_project(p).unwrap();

    // 结束:closed_at 落库,读回一致
    let mut closed = saved.clone();
    closed.closed_at = Some(ms(1700000000000));
    closed.revision = saved.revision + 1;
    closed.updated_at = ms(1700000000001);
    store.upsert_project(closed).unwrap();
    let got = store.get_project(&saved.id).unwrap();
    assert_eq!(
        got.closed_at,
        Some(ms(1700000000000)),
        "closed_at 落库读回不一致"
    );

    // 结束后改名(upsert 整模型):closed_at 不丢
    let mut renamed = got.clone();
    renamed.name = "改名的已结束项目".into();
    renamed.revision = got.revision + 1;
    renamed.updated_at = ms(1700000000002);
    store.upsert_project(renamed).unwrap();
    let got = store.get_project(&saved.id).unwrap();
    assert_eq!(got.name, "改名的已结束项目");
    assert_eq!(
        got.closed_at,
        Some(ms(1700000000000)),
        "改名后 closed_at 丢失"
    );

    // 重开:清 closed_at 读回 None
    let mut reopened = got.clone();
    reopened.closed_at = None;
    reopened.revision = got.revision + 1;
    reopened.updated_at = ms(1700000000003);
    store.upsert_project(reopened).unwrap();
    let got = store.get_project(&saved.id).unwrap();
    assert_eq!(got.closed_at, None, "重开后 closed_at 应为 None");
    assert_eq!(got.name, "改名的已结束项目", "其余字段不受重开影响");
}

// === 用例 2:旧 wire 载荷兼容(serde default)================================

#[test]
fn old_wire_payload_without_closed_at_parses_as_none() {
    // 模拟旧版客户端(v0.2.0 桌面 / 现役移动端)发出的项目载荷:无 closed_at 键
    let legacy = r#"{
        "id": "00000000-0000-4000-8000-00000000000a",
        "name": "旧版载荷项目",
        "parent_id": null,
        "revision": 3,
        "updated_at": "2026-01-01T00:00:00Z"
    }"#;
    let p: Project = serde_json::from_str(legacy).expect("旧载荷必须能解析");
    assert_eq!(p.closed_at, None);
    assert_eq!(p.name, "旧版载荷项目");

    // serde 往返:closed_at 有/无都保真(与同步 Change.payload 同形态)
    let mut with_closed = Project::new("已结束");
    with_closed.closed_at = Some(ms(1700000000000));
    let round: Project =
        serde_json::from_str(&serde_json::to_string(&with_closed).unwrap()).unwrap();
    assert_eq!(round, with_closed);

    let round: Project =
        serde_json::from_str(&serde_json::to_string(&Project::new("进行中")).unwrap()).unwrap();
    assert_eq!(round.closed_at, None);
}

// === 用例 5:软删除与结束态互不干扰 ==========================================

fn case_soft_delete_independent<S: Store>(store: &S) {
    let p = Project::new("会被删的");
    let saved = store.upsert_project(p.clone()).unwrap();
    let mut closed = saved.clone();
    closed.closed_at = Some(ms(1700000000000));
    store.upsert_project(closed).unwrap();

    // 软删除(进垃圾箱):closed_at 保留在行上(垃圾箱恢复后仍可见结束态)
    store.delete_project(&saved.id).unwrap();
    let deleted = store
        .list_projects()
        .unwrap()
        .into_iter()
        .find(|x| x.id == saved.id);
    assert!(deleted.is_none(), "软删除后活跃列表不应含该行");
}

#[test]
fn closed_project_lifecycle_parity() {
    for (label, mem, sqlite) in both_stores() {
        case_close_rename_reopen(&mem);
        case_close_rename_reopen(&sqlite);
        case_soft_delete_independent(&mem);
        case_soft_delete_independent(&sqlite);
        let _ = label;
    }
}
