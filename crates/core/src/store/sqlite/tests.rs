//! store 层测试(原 sqlite.rs tests 模块,#[cfg(test)] 由 mod.rs 声明)。
//! (2026-09-15 巨石拆分:自 store/sqlite.rs 按域切出,内容零改动)

use super::*;
use crate::model::Task;

#[test]
fn upsert_and_get_task_roundtrip() {
    let store = SqliteStore::open_in_memory().unwrap();
    let task = Task::new("写代码");
    let id = task.id.clone();
    store.upsert_task(task.clone()).unwrap();
    let got = store.get_task(&id).unwrap();
    assert_eq!(got.title, "写代码");
}

#[test]
fn soft_delete_marks_deleted_at() {
    let store = SqliteStore::open_in_memory().unwrap();
    let task = Task::new("已删除");
    let id = task.id.clone();
    store.upsert_task(task).unwrap();
    store.delete_task(&id).unwrap();
    assert!(store.list_tasks(&TaskQuery::default()).unwrap().is_empty());
    let got = store.get_task(&id).unwrap();
    assert!(got.deleted_at.is_some());
}

#[test]
fn tag_unique_name_conflict() {
    let store = SqliteStore::open_in_memory().unwrap();
    store.upsert_tag(Tag::new("urgent")).unwrap();
    let dup = Tag::new("urgent");
    let err = store.upsert_tag(dup).unwrap_err();
    assert!(matches!(err, CoreError::Conflict(_)));
}

#[test]
fn today_minutes_buckets_by_started_at() {
    // 23:50 开始、次日 00:15 结束的会话归**开始日**(v1/stats 一致;
    // 修复前按 ended_at 会归到次日)
    let store = SqliteStore::open_in_memory().unwrap();
    let mut s = PomodoroSession::new(None, None, 25);
    s.started_at = Utc.with_ymd_and_hms(2026, 8, 18, 15, 50, 0).unwrap();
    s.ended_at = Utc.with_ymd_and_hms(2026, 8, 18, 16, 15, 0).unwrap();
    s.is_completed = true;
    store.upsert_pomodoro(s).unwrap();

    let day1_start = Utc.with_ymd_and_hms(2026, 8, 18, 0, 0, 0).unwrap();
    let day2_start = Utc.with_ymd_and_hms(2026, 8, 19, 0, 0, 0).unwrap();
    assert_eq!(
        store
            .today_completed_minutes(day1_start.timestamp_millis(), day2_start.timestamp_millis())
            .unwrap(),
        25
    );
    let day3_start = Utc.with_ymd_and_hms(2026, 8, 20, 0, 0, 0).unwrap();
    assert_eq!(
        store
            .today_completed_minutes(day2_start.timestamp_millis(), day3_start.timestamp_millis())
            .unwrap(),
        0
    );
}

#[test]
fn task_tag_sync_roundtrip() {
    use crate::sync::ChangeLogStore;
    let a = SqliteStore::open_in_memory().unwrap();
    let task = Task::new("带标签");
    let tag1 = Tag::new("红");
    let tag2 = Tag::new("蓝");
    let (t1, t2) = (tag1.id.clone(), tag2.id.clone());
    a.upsert_task(task.clone()).unwrap();
    a.upsert_tag(tag1).unwrap();
    a.upsert_tag(tag2).unwrap();
    // 乱序 + 重复传入 → 载荷应排序去重(同集合 → 同载荷)
    a.set_tags_for_task(&task.id, &[t2.clone(), t1.clone(), t2.clone()])
        .unwrap();

    let change = a
        .list_pending(100)
        .unwrap()
        .into_iter()
        .find(|c| c.entity == EntityKind::TaskTag)
        .expect("打标签后应有 task_tag pending 变更");
    assert_eq!(change.entity_id, task.id.as_str());
    let payload: crate::model::TaskTagLink =
        serde_json::from_value(change.payload.clone()).unwrap();
    let mut expect = vec![t1.clone(), t2.clone()];
    expect.sort_by(|a, b| a.0.cmp(&b.0));
    assert_eq!(payload.tag_ids, expect, "载荷应排序去重(与 id 顺序无关)");
    assert_eq!(payload.revision, 1);

    // 应用到第二台设备:关联落地,且不回推(pull 落库即 synced)
    let b = SqliteStore::open_in_memory().unwrap();
    b.upsert_task(task.clone()).unwrap();
    b.upsert_tag(Tag {
        id: t1.clone(),
        ..Tag::new("红")
    })
    .unwrap();
    b.upsert_tag(Tag {
        id: t2.clone(),
        ..Tag::new("蓝")
    })
    .unwrap();
    b.apply_remote(&change).unwrap();
    let tags_b = b
        .list_tags_for_tasks(std::slice::from_ref(&task.id))
        .unwrap();
    assert_eq!(tags_b[&task.id].len(), 2);
    assert!(b
        .list_pending(100)
        .unwrap()
        .iter()
        .all(|c| c.entity != EntityKind::TaskTag));

    // 清空标签 → 空集 tombstone;B 应用后关联消失
    a.set_tags_for_task(&task.id, &[]).unwrap();
    let tomb = a
        .list_pending(100)
        .unwrap()
        .into_iter()
        .find(|c| c.entity == EntityKind::TaskTag)
        .unwrap();
    let tp: crate::model::TaskTagLink = serde_json::from_value(tomb.payload.clone()).unwrap();
    assert!(tp.tag_ids.is_empty());
    assert_eq!(tp.revision, 2);
    b.apply_remote(&tomb).unwrap();
    let tags_b2 = b
        .list_tags_for_tasks(std::slice::from_ref(&task.id))
        .unwrap();
    assert!(!tags_b2.contains_key(&task.id));
}

#[test]
fn delete_task_emits_empty_task_tag_tombstone() {
    let a = SqliteStore::open_in_memory().unwrap();
    let task = Task::new("待删");
    let tag = Tag::new("标签");
    let tag_id = tag.id.clone();
    a.upsert_task(task.clone()).unwrap();
    a.upsert_tag(tag).unwrap();
    a.set_tags_for_task(&task.id, &[tag_id]).unwrap();
    a.delete_task(&task.id).unwrap();

    let change = a
        .list_pending(100)
        .unwrap()
        .into_iter()
        .find(|c| c.entity == EntityKind::TaskTag)
        .expect("删任务应带出关联 tombstone");
    let payload: crate::model::TaskTagLink =
        serde_json::from_value(change.payload.clone()).unwrap();
    assert!(payload.tag_ids.is_empty(), "任务删除后关联载荷应为空集");
    assert_eq!(payload.revision, 2, "tombstone 应在原 revision 上 +1");
}

#[test]
fn journal_sqlite_roundtrip_and_pending() {
    use crate::sync::ChangeLogStore;

    let a = SqliteStore::open_in_memory().unwrap();
    let mut j = crate::model::Journal::new("note", "小记一条");
    j.content = "内容带逗号,与 csv 测试".into();
    j.tags = vec!["生活".into(), "随记".into()];
    j.status = crate::model::TaskStatus::Completed;
    let jid = j.id.clone();
    a.upsert_journal(j).unwrap();

    // 行映射 roundtrip:tags_csv ↔ Vec<String> + status 列 ↔ TaskStatus
    let listed = a.list_journals().unwrap();
    assert_eq!(listed.len(), 1);
    assert_eq!(listed[0].tags, vec!["生活".to_string(), "随记".to_string()]);
    assert_eq!(listed[0].content, "内容带逗号,与 csv 测试");
    assert_eq!(listed[0].status, crate::model::TaskStatus::Completed);

    // pending → Change payload 可反序列化回 Journal(push 方向)
    let change = a
        .list_pending(100)
        .unwrap()
        .into_iter()
        .find(|c| c.entity == EntityKind::Journal)
        .expect("新建手账应入 pending 队列");
    assert_eq!(change.entity_id, jid.as_str());
    let payload: crate::model::Journal = serde_json::from_value(change.payload).unwrap();
    assert_eq!(payload.kind, "note");
    assert_eq!(payload.status, crate::model::TaskStatus::Completed);

    // 远端权威 apply_remote(synced 落行,不再 pending)+ 软删收敛
    a.mark_synced(&[(EntityKind::Journal, jid.as_str().to_string())])
        .unwrap();
    a.delete_journal(&jid).unwrap();
    let b = SqliteStore::open_in_memory().unwrap();
    let tomb = a
        .local_candidate(EntityKind::Journal, jid.as_str())
        .unwrap()
        .expect("墓碑行应可作 candidate 查出");
    b.apply_remote(&tomb).unwrap();
    assert!(
        b.list_journals().unwrap().is_empty(),
        "B 应用墓碑后不再列出"
    );
    let row = b
        .local_candidate(EntityKind::Journal, jid.as_str())
        .unwrap()
        .expect("墓碑行本体保留");
    let after: crate::model::Journal = serde_json::from_value(row.payload).unwrap();
    assert!(after.deleted_at.is_some());
    assert!(after.revision >= 2);
}

/// 年复盘(复盘入口重构批):upsert → pending 队列 payload 带自然键 year;
/// 远端 apply 原样落 synced;删除 = content=''(ADR-010);自然键 candidate。
#[test]
fn yearly_review_roundtrip_and_pending() {
    use crate::sync::ChangeLogStore;

    let a = SqliteStore::open_in_memory().unwrap();
    let mut y = crate::model::YearlyReview {
        id: crate::model::Id::new(),
        user_id: crate::model::Id::nil(),
        year: "2026".into(),
        content: String::new(),
        revision: 0,
        deleted_at: None,
        updated_at: crate::model::Timestamp::now(),
    };
    y.content = "今年专注了 800 个番茄".into();
    let saved = a.upsert_yearly_review(y).unwrap();
    assert_eq!(saved.year, "2026");
    assert_eq!(
        a.get_yearly_review("2026").unwrap().unwrap().content,
        "今年专注了 800 个番茄"
    );

    // pending Change:sync key 是自然键 year(非 UUID id)
    let change = a
        .list_pending(100)
        .unwrap()
        .into_iter()
        .find(|c| c.entity == EntityKind::YearlyReview)
        .expect("年复盘应入 pending 队列");
    assert_eq!(change.entity_id, "2026");
    let payload: crate::model::YearlyReview =
        serde_json::from_value(change.payload.clone()).unwrap();
    assert_eq!(payload.year, "2026");

    // 胜者 apply_remote(synced 落行)+ mark_synced 不再重推
    let b = SqliteStore::open_in_memory().unwrap();
    b.apply_remote(&change).unwrap();
    let got = b.get_yearly_review("2026").unwrap().expect("胜者应落库");
    assert_eq!(got.content, "今年专注了 800 个番茄");
    b.mark_synced(&[(EntityKind::YearlyReview, "2026".to_string())])
        .unwrap();
    assert!(
        !b.list_pending(100)
            .unwrap()
            .iter()
            .any(|c| c.entity == EntityKind::YearlyReview),
        "mark_synced 后不再 pending"
    );

    // 删除 = content='' 的 upsert(ADR-010),revision 上升仍可作 candidate
    b.delete_yearly_review("2026").unwrap();
    let gone = b
        .get_yearly_review("2026")
        .unwrap()
        .expect("行保留(硬删语义走空内容)");
    assert_eq!(gone.content, "");
    assert!(gone.revision >= 2);
    let cand = b
        .local_candidate(EntityKind::YearlyReview, "2026")
        .unwrap()
        .expect("空内容行应可作 candidate 查出");
    let cand_payload: crate::model::YearlyReview = serde_json::from_value(cand.payload).unwrap();
    assert_eq!(cand_payload.content, "");
}

/// WAL 落地锁(2026-09-14 优化批):文件库 open 即启用 WAL —— journal_mode
/// 是文件头持久属性,全新连接读出也应是 wal;checkpoint_wal_file 对同一库
/// 可执行(迁移前备份依赖它把 -wal 合并回主文件)。内存库无 journal 概念,
/// 不在本测覆盖。
#[test]
fn file_open_enables_wal_and_checkpoint_runs() {
    let dir = std::env::temp_dir().join(format!(
        "pomoflow_wal_{}_{}",
        std::process::id(),
        std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_nanos()
    ));
    std::fs::create_dir_all(&dir).unwrap();
    let path = dir.join("wal.db");
    {
        let _store = SqliteStore::open(&path).unwrap();
    }
    let conn = Connection::open(&path).unwrap();
    let mode: String = conn
        .query_row("PRAGMA journal_mode", [], |r| r.get(0))
        .unwrap();
    assert_eq!(mode, "wal", "文件库 open 后 journal_mode 应为 wal");
    drop(conn);
    SqliteStore::checkpoint_wal_file(&path).expect("checkpoint 应成功");
    let _ = std::fs::remove_dir_all(&dir);
}

/// 批量 candidates(2026-09-14):结果与逐条语义一致,缺行 = None。
#[test]
fn local_candidates_bulk_matches_single() {
    use crate::sync::ChangeLogStore;

    let store = SqliteStore::open_in_memory().unwrap();
    let a = Task::new("A");
    let b = Task::new("B");
    let (aid, bid) = (a.id.clone(), b.id.clone());
    store.upsert_task(a).unwrap();
    store.upsert_task(b).unwrap();
    let ghost = crate::model::Id::new();
    let keys = vec![
        (EntityKind::Task, aid.as_str().to_string()),
        (EntityKind::Task, bid.as_str().to_string()),
        (EntityKind::Task, ghost.as_str().to_string()),
    ];
    let bulk = store.local_candidates(&keys).unwrap();
    assert_eq!(bulk.len(), 3);
    assert!(bulk[0].is_some() && bulk[1].is_some());
    assert!(bulk[2].is_none(), "无行键应为 None");
    for (k, single) in keys.iter().zip(bulk.iter()) {
        let mut one = store.local_candidate(k.0, &k.1).unwrap();
        // Change.id 是每次 change_of 现生成的 UUID(非稳定键):对齐后比语义字段
        if let (Some(s), Some(o)) = (single.as_ref(), one.as_mut()) {
            o.id = s.id;
        }
        assert_eq!(&one, single);
    }
}

/// 冲突日志保留期(2026-09-14):trim 只删 cutoff 之前的条目。
#[test]
fn trim_conflicts_removes_only_older_than_cutoff() {
    let store = SqliteStore::open_in_memory().unwrap();
    let rec = |occurred: i64| ConflictRecord {
        entity: "task".into(),
        entity_id: "t1".into(),
        entity_title: "标题".into(),
        direction: "overrode".into(),
        remote_device: "dev-b".into(),
        local_updated_ms: occurred - 1,
        remote_updated_ms: occurred,
        occurred_at_ms: occurred,
    };
    store.insert_conflict(rec(1000)).unwrap();
    store.insert_conflict(rec(2000)).unwrap();
    let removed = store.trim_conflicts(1500).unwrap();
    assert_eq!(removed, 1);
    assert_eq!(store.count_conflicts().unwrap(), 1);
    assert_eq!(
        store.list_recent_conflicts(10).unwrap()[0].occurred_at_ms,
        2000
    );
}

/// 迁移 008(2026-09-14):热路径索引存在 + pending 索引已按 updated_at_ms
/// 列序重建(内存库即可,索引在 sqlite_master 可查)。
#[test]
fn migration_008_creates_query_indexes() {
    let store = SqliteStore::open_in_memory().unwrap();
    let conn = store.lock().unwrap();
    let mut stmt = conn
        .prepare("SELECT name FROM sqlite_master WHERE type = 'index' AND name LIKE 'idx_%'")
        .unwrap();
    let names: std::collections::HashSet<String> = stmt
        .query_map([], |r| r.get::<_, String>(0))
        .unwrap()
        .filter_map(|r| r.ok())
        .collect();
    drop(stmt);
    for expect in [
        "idx_pomodoros_project",
        "idx_tasks_due_date",
        "idx_journals_created",
        "idx_mottos_created",
        "idx_journals_pending",
        "idx_yearly_reviews_pending",
    ] {
        assert!(names.contains(expect), "缺索引 {expect}");
    }
    let sql: String = conn
        .query_row(
            "SELECT sql FROM sqlite_master WHERE name = 'idx_tasks_pending'",
            [],
            |r| r.get(0),
        )
        .unwrap();
    assert!(
        sql.contains("updated_at_ms"),
        "idx_tasks_pending 应为 (updated_at_ms) 列序:{sql}"
    );
}

/// 统计窗口取数(生产路径)与全表扫描 + 纯函数的 differential 锁(2026-09-14):
/// 同一份数据跨三个时区,overview / range 的窗口路径结果必须与全量一致 ——
/// 覆盖跨时区日界(23:30Z 东八区落次日)、放弃/无任务会话、月界外数据。
#[test]
fn stats_windowed_path_matches_full_scan() {
    use crate::stats::{self, StatsGroup};

    let store = SqliteStore::open_in_memory().unwrap();
    let mk = |started: &str, minutes: u32, completed: bool, with_task: bool| {
        let started = DateTime::parse_from_rfc3339(started)
            .unwrap()
            .with_timezone(&Utc);
        PomodoroSession {
            id: crate::model::Id::new(),
            user_id: crate::model::Id::nil(),
            task_id: with_task.then(crate::model::Id::new),
            project_id: None,
            duration: minutes,
            started_at: started,
            ended_at: started,
            is_completed: completed,
            created_at: crate::model::Timestamp(started),
            revision: 1,
            deleted_at: None,
            updated_at: crate::model::Timestamp(started),
        }
    };
    for s in [
        mk("2026-01-15T09:00:00Z", 25, true, true),
        mk("2026-01-15T23:30:00Z", 40, true, true), // 东八区落在次日
        mk("2025-12-20T09:00:00Z", 45, true, true), // 仅全时段
        mk("2026-01-13T10:00:00Z", 25, false, true), // 中途放弃
        mk("2026-01-13T11:00:00Z", 25, true, false), // 无任务专注
    ] {
        store.upsert_pomodoro(s).unwrap();
    }
    let mut done = Task::new("已完成");
    done.status = TaskStatus::Completed;
    store.upsert_task(done).unwrap();
    let projects: Vec<Project> = Vec::new();

    for tz in [0i32, 480, -300] {
        let all = store.list_pomodoros().unwrap();
        let tasks = store.list_tasks_for_stats().unwrap();
        let full =
            stats::overview_stats(&all, &tasks, "2026-01-15", "2026-01-12", "2026-01-01", tz);

        // 生产窗口路径:三档起点最早者(此处 = month_start)本地 00:00 换算
        let month = chrono::NaiveDate::parse_from_str("2026-01-01", "%Y-%m-%d").unwrap();
        let since = month
            .and_hms_opt(0, 0, 0)
            .unwrap()
            .and_utc()
            .timestamp_millis()
            - tz as i64 * 60_000;
        let recent = store.list_pomodoros_between(since, i64::MAX).unwrap();
        let total = store.count_pomodoros().unwrap();
        let windowed = stats::overview_stats_windowed(
            &recent,
            &tasks,
            "2026-01-15",
            "2026-01-12",
            "2026-01-01",
            tz,
            total,
        );
        assert_eq!(full, windowed, "tz={tz}");

        // range 同理(生产路径本就是窗口查询)
        let full_r = stats::range_stats(
            &all,
            &tasks,
            &projects,
            "2026-01-01",
            "2026-01-31",
            StatsGroup::Day,
            tz,
        );
        let end = chrono::NaiveDate::parse_from_str("2026-01-31", "%Y-%m-%d").unwrap();
        let until = (end + chrono::Duration::days(1))
            .and_hms_opt(0, 0, 0)
            .unwrap()
            .and_utc()
            .timestamp_millis()
            - tz as i64 * 60_000;
        let win_sessions = store.list_pomodoros_between(since, until).unwrap();
        let win_r = stats::range_stats(
            &win_sessions,
            &tasks,
            &projects,
            "2026-01-01",
            "2026-01-31",
            StatsGroup::Day,
            tz,
        );
        assert_eq!(full_r, win_r, "tz={tz}");
    }
}
