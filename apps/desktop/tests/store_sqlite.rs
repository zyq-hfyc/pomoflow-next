//! `SqliteStore` 集成测试 —— 直接打 SQLite,验证 `Store` trait 全套方法语义。
//!
//! 不引入 v1 / fixtures,每个 case 自造数据,跑完即扔。
//! 用 `SqliteStore::open_in_memory()` 避免副作用。
//!
//! P1.5:`SqliteStore` 已迁入 `pomoflow-core::store::SqliteStore`(不再走
//! `apps/desktop` 的本地模块),import 路径相应更新。

use pomoflow_core::model::{
    DailyReview, Id, MonthlyReview, PomodoroSession, Priority, Project, Reminder, Repeat, Tag,
    Task, TaskStatus, Timestamp, WeeklyReview,
};
use pomoflow_core::store::{SqliteStore, Store, TaskQuery};

fn store() -> SqliteStore {
    SqliteStore::open_in_memory().expect("open in-memory store")
}

fn now() -> Timestamp {
    Timestamp(chrono::Utc::now())
}

fn task_id(_label: &str) -> Id {
    Id::new()
}

fn project_id(_label: &str) -> Id {
    Id::new()
}

fn tag_id(_label: &str) -> Id {
    Id::new()
}

fn sample_task(id: Id, project_id: Id) -> Task {
    Task {
        id,
        user_id: Id::nil(),
        title: "Write tests".to_string(),
        description: "Cover CRUD + queries".to_string(),
        project_id: Some(project_id),
        priority: Priority::High,
        status: TaskStatus::Active,
        due_date: None,
        estimated_pomodoros: 3,
        completed_pomodoros: 0,
        pomodoro_duration: Some(25),
        reminder: Reminder::None,
        repeat: Repeat::None,
        repeat_config: None,
        repeat_parent_id: None,
        repeat_end_date: None,
        completed_at: None,
        created_at: now(),
        revision: 1,
        deleted_at: None,
        updated_at: now(),
    }
}

#[test]
fn tasks_round_trip() {
    let s = store();
    let pid = project_id("alpha");
    let tid = task_id("alpha");

    s.upsert_project(Project {
        id: pid.clone(),
        user_id: Id::nil(),
        name: "Work".to_string(),
        color: "#ff0000".to_string(),
        parent_id: None,
        display_order: 0,
        created_at: now(),
        revision: 1,
        deleted_at: None,
        updated_at: now(),
    })
    .unwrap();

    let task = sample_task(tid.clone(), pid.clone());
    s.upsert_task(task.clone()).unwrap();

    let fetched = s.get_task(&tid).unwrap();
    assert_eq!(fetched.id, tid);
    assert_eq!(fetched.title, "Write tests");
    assert_eq!(fetched.priority, Priority::High);
    assert_eq!(fetched.completed_pomodoros, 0);
    assert_eq!(fetched.estimated_pomodoros, 3);
    assert_eq!(fetched.project_id, Some(pid));
}

#[test]
fn task_list_excludes_soft_deleted() {
    let s = store();
    let pid = project_id("beta");
    s.upsert_project(Project {
        id: pid.clone(),
        user_id: Id::nil(),
        name: "Side".to_string(),
        color: "".into(),
        parent_id: None,
        display_order: 0,
        created_at: now(),
        revision: 1,
        deleted_at: None,
        updated_at: now(),
    })
    .unwrap();

    let t1 = sample_task(task_id("list-1"), pid.clone());
    let t2 = sample_task(task_id("list-2"), pid.clone());
    s.upsert_task(t1.clone()).unwrap();
    s.upsert_task(t2.clone()).unwrap();

    let mut listed = s.list_tasks(&TaskQuery::default()).unwrap();
    assert_eq!(listed.len(), 2);

    s.delete_task(&t1.id).unwrap();
    listed = s.list_tasks(&TaskQuery::default()).unwrap();
    assert_eq!(listed.len(), 1);
    assert_eq!(listed[0].id, t2.id);

    // get_task 仍能取到软删除记录
    let still = s.get_task(&t1.id).unwrap();
    assert!(still.deleted_at.is_some());
}

#[test]
fn task_query_filters_by_project_and_status() {
    let s = store();
    let p1 = project_id("p1");
    let p2 = project_id("p2");
    for pid in [&p1, &p2] {
        s.upsert_project(Project {
            id: pid.clone(),
            user_id: Id::nil(),
            name: "P".into(),
            color: "".into(),
            parent_id: None,
            display_order: 0,
            created_at: now(),
            revision: 1,
            deleted_at: None,
            updated_at: now(),
        })
        .unwrap();
    }

    let t_active = sample_task(task_id("fil-1"), p1.clone());
    let mut t_done = sample_task(task_id("fil-2"), p1.clone());
    let t_other = sample_task(task_id("fil-3"), p2.clone());
    t_done.status = TaskStatus::Completed;
    t_done.completed_at = Some(chrono::Utc::now());
    t_done.completed_pomodoros = 1;

    s.upsert_task(t_active.clone()).unwrap();
    s.upsert_task(t_done.clone()).unwrap();
    s.upsert_task(t_other.clone()).unwrap();

    let only_p1 = s
        .list_tasks(&TaskQuery {
            project_id: Some(p1.clone()),
            ..TaskQuery::default()
        })
        .unwrap();
    assert_eq!(only_p1.len(), 2);

    let only_done = s
        .list_tasks(&TaskQuery {
            status: Some(TaskStatus::Completed),
            ..TaskQuery::default()
        })
        .unwrap();
    assert_eq!(only_done.len(), 1);
    assert_eq!(only_done[0].id, t_done.id);

    let active_p1 = s
        .list_tasks(&TaskQuery {
            project_id: Some(p1.clone()),
            status: Some(TaskStatus::Active),
            ..TaskQuery::default()
        })
        .unwrap();
    assert_eq!(active_p1.len(), 1);
    assert_eq!(active_p1[0].id, t_active.id);
}

#[test]
fn tags_unique_among_active_and_reusable_after_soft_delete() {
    let s = store();
    let g1 = Tag {
        id: tag_id("dup"),
        user_id: Id::nil(),
        name: "work".to_string(),
        color: "#abc".into(),
        display_order: 0,
        created_at: now(),
        revision: 1,
        deleted_at: None,
        updated_at: now(),
    };
    s.upsert_tag(g1.clone()).unwrap();

    // 同名 active tag 应当 Conflict
    let g2 = Tag {
        id: tag_id("dup-other"),
        user_id: Id::nil(),
        name: "work".to_string(),
        color: "#def".into(),
        display_order: 1,
        created_at: now(),
        revision: 1,
        deleted_at: None,
        updated_at: now(),
    };
    let err = s.upsert_tag(g2).unwrap_err();
    assert!(matches!(err, pomoflow_core::error::CoreError::Conflict(_)));

    // 软删除后同名可复用
    s.delete_tag(&g1.id).unwrap();
    let g3 = Tag {
        id: tag_id("dup-third"),
        user_id: Id::nil(),
        name: "work".to_string(),
        color: "#def".into(),
        display_order: 2,
        created_at: now(),
        revision: 1,
        deleted_at: None,
        updated_at: now(),
    };
    let g3_id = g3.id.clone();
    s.upsert_tag(g3).unwrap();

    let listed = s.list_tags().unwrap();
    assert_eq!(listed.len(), 1);
    assert_eq!(listed[0].id, g3_id);
}

#[test]
fn task_tags_association() {
    let s = store();
    let pid = project_id("ass");
    s.upsert_project(Project {
        id: pid.clone(),
        user_id: Id::nil(),
        name: "P".into(),
        color: "".into(),
        parent_id: None,
        display_order: 0,
        created_at: now(),
        revision: 1,
        deleted_at: None,
        updated_at: now(),
    })
    .unwrap();

    let t = sample_task(task_id("ass"), pid.clone());
    s.upsert_task(t.clone()).unwrap();

    let g_a = Tag {
        id: tag_id("a"),
        user_id: Id::nil(),
        name: "urgent".into(),
        color: "".into(),
        display_order: 0,
        created_at: now(),
        revision: 1,
        deleted_at: None,
        updated_at: now(),
    };
    let g_b = Tag {
        id: tag_id("b"),
        user_id: Id::nil(),
        name: "frontend".into(),
        color: "".into(),
        display_order: 1,
        created_at: now(),
        revision: 1,
        deleted_at: None,
        updated_at: now(),
    };
    s.upsert_tag(g_a.clone()).unwrap();
    s.upsert_tag(g_b.clone()).unwrap();

    s.set_tags_for_task(&t.id, &[g_a.id.clone(), g_b.id.clone()])
        .unwrap();
    let tags = s.list_tags_for_task(&t.id).unwrap();
    assert_eq!(tags.len(), 2);

    // 替换为单个标签
    s.set_tags_for_task(&t.id, std::slice::from_ref(&g_a.id))
        .unwrap();
    let tags = s.list_tags_for_task(&t.id).unwrap();
    assert_eq!(tags.len(), 1);
    assert_eq!(tags[0].id, g_a.id);

    // 按 tag_id 过滤任务
    let with_a = s
        .list_tasks(&TaskQuery {
            tag_id: Some(g_a.id.clone()),
            ..TaskQuery::default()
        })
        .unwrap();
    assert_eq!(with_a.len(), 1);
    assert_eq!(with_a[0].id, t.id);

    let with_b = s
        .list_tasks(&TaskQuery {
            tag_id: Some(g_b.id.clone()),
            ..TaskQuery::default()
        })
        .unwrap();
    assert_eq!(with_b.len(), 0);
}

#[test]
fn pomodoros_serialise_correctly() {
    let s = store();
    let pid = project_id("pomo");
    let tid = task_id("pomo");
    s.upsert_project(Project {
        id: pid.clone(),
        user_id: Id::nil(),
        name: "P".into(),
        color: "".into(),
        parent_id: None,
        display_order: 0,
        created_at: now(),
        revision: 1,
        deleted_at: None,
        updated_at: now(),
    })
    .unwrap();
    s.upsert_task(sample_task(tid.clone(), pid.clone()))
        .unwrap();

    let started = chrono::Utc::now() - chrono::Duration::minutes(25);
    let session = PomodoroSession {
        id: Id::new(),
        user_id: Id::nil(),
        task_id: Some(tid.clone()),
        project_id: Some(pid.clone()),
        duration: 25,
        started_at: started,
        ended_at: chrono::Utc::now(),
        is_completed: true,
        created_at: now(),
        revision: 1,
        deleted_at: None,
        updated_at: now(),
    };
    s.upsert_pomodoro(session.clone()).unwrap();

    let listed = s.list_pomodoros().unwrap();
    assert_eq!(listed.len(), 1);
    assert_eq!(listed[0].duration, 25);
    assert!(listed[0].is_completed);
    assert_eq!(listed[0].task_id, Some(tid));

    s.delete_pomodoro(&session.id).unwrap();
    assert_eq!(s.list_pomodoros().unwrap().len(), 0);
}

#[test]
fn reviews_upsert_by_unique_key() {
    let s = store();

    let r1 = DailyReview {
        id: Id::new(),
        user_id: Id::nil(),
        date: "2026-08-16".to_string(),
        content: "first".into(),
        revision: 1,
        deleted_at: None,
        updated_at: now(),
    };
    s.upsert_daily_review(r1.clone()).unwrap();
    let got = s.get_daily_review("2026-08-16").unwrap().unwrap();
    assert_eq!(got.content, "first");

    // 同日期再 upsert 走更新
    let r2 = DailyReview {
        id: r1.id.clone(),
        user_id: Id::nil(),
        content: "updated".into(),
        updated_at: Timestamp(chrono::Utc::now()),
        ..r1
    };
    s.upsert_daily_review(r2).unwrap();
    let got = s.get_daily_review("2026-08-16").unwrap().unwrap();
    assert_eq!(got.content, "updated");

    let none = s.get_daily_review("2026-08-17").unwrap();
    assert!(none.is_none());

    // 周复盘
    let w = WeeklyReview {
        id: Id::new(),
        user_id: Id::nil(),
        week_start: "2026-08-10".into(),
        content: "Wk".into(),
        revision: 1,
        deleted_at: None,
        updated_at: now(),
    };
    s.upsert_weekly_review(w.clone()).unwrap();
    assert_eq!(
        s.get_weekly_review("2026-08-10").unwrap().unwrap().content,
        "Wk"
    );

    // 月复盘
    let m = MonthlyReview {
        id: Id::new(),
        user_id: Id::nil(),
        year_month: "2026-08".into(),
        content: "Aug".into(),
        revision: 1,
        deleted_at: None,
        updated_at: now(),
    };
    s.upsert_monthly_review(m.clone()).unwrap();
    assert_eq!(
        s.get_monthly_review("2026-08").unwrap().unwrap().content,
        "Aug"
    );
}

#[test]
fn get_missing_returns_not_found() {
    let s = store();
    let missing = Id::new();
    let err = s.get_task(&missing).unwrap_err();
    assert!(matches!(
        err,
        pomoflow_core::error::CoreError::NotFound { .. }
    ));
}

#[test]
fn task_limit_caps_result() {
    let s = store();
    let pid = project_id("limit");
    s.upsert_project(Project {
        id: pid.clone(),
        user_id: Id::nil(),
        name: "P".into(),
        color: "".into(),
        parent_id: None,
        display_order: 0,
        created_at: now(),
        revision: 1,
        deleted_at: None,
        updated_at: now(),
    })
    .unwrap();

    for i in 0..5 {
        let t = sample_task(task_id(&format!("lim-{i}")), pid.clone());
        s.upsert_task(t).unwrap();
    }

    let top = s
        .list_tasks(&TaskQuery {
            limit: Some(3),
            ..TaskQuery::default()
        })
        .unwrap();
    assert_eq!(top.len(), 3);
}
