//! v1 → v2 迁移集成测试。
//!
//! 流程:
//! 1. 在 `std::env::temp_dir()` 下建一个 v1 fixture(SQLAlchemy 默认 schema + 中文 enum)
//! 2. 调用 `migrate_v1::run(...)`(公开入口,跳过 clap CLI)
//! 3. 用 `pomoflow_core::store::SqliteStore` 直接打开 v2 db,逐条字段核验
//!
//! 覆盖:
//! - 行数对齐(8 张表)
//! - 字段映射(priority / status / reminder / repeat enum)
//! - 外键重映射(project.parent_id、task.project_id、pomodoros.task_id+project_id)
//! - 任务 ↔ 标签多对多保留
//! - 时间戳字段(round-trip 校验)
//! - dry-run 不写文件

use std::path::PathBuf;
use std::sync::atomic::{AtomicUsize, Ordering};

use anyhow::Result;
use pomoflow_core::model::{Priority, Reminder, Repeat, TaskStatus};
use pomoflow_core::store::{SqliteStore, Store, TaskQuery};
use rusqlite::Connection;

use migrate_v1::{run, Args};

/// 全局递增计数器,给每个 fixture 一个唯一文件名,避免并发测试串扰。
static COUNTER: AtomicUsize = AtomicUsize::new(0);

fn temp_path(suffix: &str) -> PathBuf {
    let n = COUNTER.fetch_add(1, Ordering::SeqCst);
    let pid = std::process::id();
    std::env::temp_dir().join(format!("pomoflow-migrate-test-{pid}-{n}.{suffix}"))
}

/// v1 fixture —— 复刻 SQLAlchemy 默认生成的 schema,字段、子表都覆盖到。
fn build_v1_fixture(path: &std::path::Path) -> Result<()> {
    let conn = Connection::open(path)?;

    // v1 用 INTEGER PK,created_by / created_date / updated_by / updated_date 审计字段
    // 都建上(只是 NOT NULL,但调用方用 NULL 写入;真实 v1 db 由 SQLAlchemy default 给值)。
    conn.execute_batch(
        r#"
        CREATE TABLE projects (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            color TEXT NOT NULL DEFAULT '',
            parent_id INTEGER,
            display_order INTEGER NOT NULL DEFAULT 0,
            created_by TEXT,
            created_date TEXT,
            updated_by TEXT,
            updated_date TEXT
        );

        CREATE TABLE tags (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            color TEXT NOT NULL DEFAULT '',
            display_order INTEGER NOT NULL DEFAULT 0,
            created_by TEXT,
            created_date TEXT,
            updated_by TEXT,
            updated_date TEXT
        );

        CREATE TABLE tasks (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            project_id INTEGER,
            priority TEXT NOT NULL DEFAULT 'none',
            status TEXT NOT NULL DEFAULT 'active',
            due_date TEXT,
            estimated_pomodoros INTEGER NOT NULL DEFAULT 0,
            completed_pomodoros INTEGER NOT NULL DEFAULT 0,
            pomodoro_duration INTEGER,
            reminder TEXT,
            repeat TEXT,
            repeat_parent_id INTEGER,
            repeat_end_date TEXT,
            repeat_config TEXT,
            completed_at TEXT,
            created_by TEXT,
            created_date TEXT,
            updated_by TEXT,
            updated_date TEXT
        );

        CREATE TABLE subtasks (
            id INTEGER PRIMARY KEY,
            task_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            is_completed INTEGER NOT NULL DEFAULT 0,
            created_by TEXT,
            created_date TEXT,
            updated_by TEXT,
            updated_date TEXT
        );

        CREATE TABLE mottos (
            id INTEGER PRIMARY KEY,
            text TEXT NOT NULL,
            author TEXT,
            created_by TEXT,
            created_date TEXT,
            updated_by TEXT,
            updated_date TEXT
        );

        CREATE TABLE task_tag (
            task_id INTEGER NOT NULL,
            tag_id INTEGER NOT NULL,
            PRIMARY KEY (task_id, tag_id)
        );

        CREATE TABLE pomodoro_sessions (
            id INTEGER PRIMARY KEY,
            task_id INTEGER,
            project_id INTEGER,
            duration INTEGER NOT NULL,
            started_at TEXT,
            ended_at TEXT,
            is_completed INTEGER NOT NULL DEFAULT 0,
            created_by TEXT,
            created_date TEXT,
            updated_by TEXT,
            updated_date TEXT
        );

        CREATE TABLE daily_reviews (
            id INTEGER PRIMARY KEY,
            date TEXT NOT NULL UNIQUE,
            content TEXT,
            created_by TEXT,
            created_date TEXT,
            updated_by TEXT,
            updated_date TEXT
        );

        CREATE TABLE weekly_reviews (
            id INTEGER PRIMARY KEY,
            week_start TEXT NOT NULL UNIQUE,
            content TEXT,
            created_by TEXT,
            created_date TEXT,
            updated_by TEXT,
            updated_date TEXT
        );

        CREATE TABLE monthly_reviews (
            id INTEGER PRIMARY KEY,
            year_month TEXT NOT NULL UNIQUE,
            content TEXT,
            created_by TEXT,
            created_date TEXT,
            updated_by TEXT,
            updated_date TEXT
        );
        "#,
    )?;

    // —— 2 个项目(parent ↔ child)
    conn.execute(
        "INSERT INTO projects (id, name, color, parent_id, display_order)
         VALUES (1, 'Root', '#888888', NULL, 0)",
        [],
    )?;
    conn.execute(
        "INSERT INTO projects (id, name, color, parent_id, display_order)
         VALUES (2, 'Child', '#cccccc', 1, 0)",
        [],
    )?;

    // —— 3 个标签(用于多对多)
    conn.execute(
        "INSERT INTO tags (id, name, color) VALUES (10, 'urgent', '#ff0000')",
        [],
    )?;
    conn.execute(
        "INSERT INTO tags (id, name, color) VALUES (11, 'review', '#00ff00')",
        [],
    )?;
    conn.execute(
        "INSERT INTO tags (id, name, color) VALUES (12, 'blocked', '#0000ff')",
        [],
    )?;

    // —— 4 个任务,覆盖各种 enum / 状态 / 关联
    conn.execute(
        "INSERT INTO tasks (
            id, title, description, project_id, priority, status,
            due_date, estimated_pomodoros, completed_pomodoros, pomodoro_duration,
            reminder, repeat, completed_at
         ) VALUES (
            100, '写方案', '整理需求', 2, 'high', 'active',
            '2026-01-15 00:00:00.000000', 4, 0, 25,
            '准时', '每周', NULL
         )",
        [],
    )?;
    conn.execute(
        "INSERT INTO tasks (
            id, title, description, project_id, priority, status,
            estimated_pomodoros, completed_pomodoros, pomodoro_duration,
            reminder, repeat, completed_at
         ) VALUES (
            101, '复盘昨日', NULL, 1, 'medium', 'completed',
            2, 2, 25,
            '提前5分钟', '不重复', '2026-01-14 17:00:00.000000'
         )",
        [],
    )?;
    conn.execute(
        "INSERT INTO tasks (
            id, title, description, project_id, priority, status,
            due_date, estimated_pomodoros, completed_pomodoros,
            reminder, repeat
         ) VALUES (
            102, '低优任务', NULL, 1, 'low', 'active',
            '2026-02-01', 1, 0,
            '30分钟', '每月'
         )",
        [],
    )?;
    conn.execute(
        "INSERT INTO tasks (
            id, title, project_id, priority, status
         ) VALUES (103, '空项目任务', NULL, 'none', 'active')",
        [],
    )?;
    // —— 重复任务:模板 100 已有 repeat=每周;补一个自定义重复模板 + 实例
    conn.execute(
        "INSERT INTO tasks (
            id, title, project_id, priority, status, due_date,
            estimated_pomodoros, completed_pomodoros, pomodoro_duration,
            repeat, repeat_config, created_date
         ) VALUES (
            104, '自定义重复模板', 1, 'medium', 'active', '2026-03-02 09:00:00.000000',
            1, 0, 25, '自定义',
            '{\"interval\":1,\"type\":\"week\",\"startDate\":\"2026-03-02\",\"endDate\":\"2026-05-02\",\"weekdays\":[1,3,5]}',
            '2026-03-01 08:00:00.000000'
         )",
        [],
    )?;
    conn.execute(
        "INSERT INTO tasks (
            id, title, project_id, priority, status, due_date,
            estimated_pomodoros, completed_pomodoros, pomodoro_duration,
            repeat, repeat_parent_id
         ) VALUES (
            105, '自定义重复模板', 1, 'medium', 'active', '2026-03-04 09:00:00.000000',
            1, 0, 25, '', 104
         )",
        [],
    )?;

    // —— 子任务(无排序列,按 rowid 顺序)
    conn.execute(
        "INSERT INTO subtasks (task_id, title, is_completed) VALUES (100, '列大纲', 1)",
        [],
    )?;
    conn.execute(
        "INSERT INTO subtasks (task_id, title, is_completed) VALUES (100, '查资料', 0)",
        [],
    )?;

    // —— 座右铭
    conn.execute(
        "INSERT INTO mottos (text, author) VALUES ('种一棵树最好的时间是十年前', '非洲谚语')",
        [],
    )?;

    // —— task_tag 多对多
    conn.execute(
        "INSERT INTO task_tag (task_id, tag_id) VALUES (100, 10)",
        [],
    )?;
    conn.execute(
        "INSERT INTO task_tag (task_id, tag_id) VALUES (100, 11)",
        [],
    )?;
    conn.execute(
        "INSERT INTO task_tag (task_id, tag_id) VALUES (101, 11)",
        [],
    )?;

    // —— 3 个番茄
    conn.execute(
        "INSERT INTO pomodoro_sessions
            (id, task_id, project_id, duration, started_at, ended_at, is_completed)
         VALUES (1000, 100, 2, 25, '2026-01-14 10:00:00.000000', '2026-01-14 10:25:00.000000', 1)",
        [],
    )?;
    conn.execute(
        "INSERT INTO pomodoro_sessions
            (id, task_id, project_id, duration, started_at, ended_at, is_completed)
         VALUES (1001, 100, 2, 25, '2026-01-14 10:30:00.000000', '2026-01-14 10:55:00.000000', 1)",
        [],
    )?;
    conn.execute(
        "INSERT INTO pomodoro_sessions
            (id, task_id, project_id, duration, started_at, ended_at, is_completed)
         VALUES (1002, 101, 1, 25, '2026-01-14 14:00:00.000000', '2026-01-14 14:25:00.000000', 1)",
        [],
    )?;

    // —— 复盘
    conn.execute(
        "INSERT INTO daily_reviews (date, content) VALUES ('2026-01-14', '专注了 4 个番茄')",
        [],
    )?;
    conn.execute(
        "INSERT INTO weekly_reviews (week_start, content) VALUES ('2026-01-12', '本周主推方案')",
        [],
    )?;
    conn.execute(
        "INSERT INTO monthly_reviews (year_month, content) VALUES ('2026-01', '1 月总结')",
        [],
    )?;

    Ok(())
}

#[test]
fn full_migration_round_trip() -> Result<()> {
    let v1_path = temp_path("v1.db");
    let v2_path = temp_path("v2.db");
    build_v1_fixture(&v1_path)?;

    run(Args {
        from: v1_path.clone(),
        to: v2_path.clone(),
        dry_run: false,
        // 东八区:due "2026-01-15 00:00:00" 本地墙钟 → UTC 2026-01-14T16:00Z
        tz_offset_min: Some(480),
    })?;

    let v2 = SqliteStore::open(&v2_path)?;

    // —— 项目行数 + parent_id 重映射 + 顺序保留
    let projects = v2.list_projects()?;
    assert_eq!(projects.len(), 2, "projects row count");
    let child = projects.iter().find(|p| p.name == "Child").unwrap();
    let root = projects.iter().find(|p| p.name == "Root").unwrap();
    assert_eq!(
        child.parent_id.as_ref().unwrap(),
        &root.id,
        "child.parent_id must point to root's new UUID"
    );
    assert!(root.parent_id.is_none(), "root has no parent");

    // —— 标签行数
    let tags = v2.list_tags()?;
    assert_eq!(tags.len(), 3, "tags row count");
    let names: Vec<_> = tags.iter().map(|t| t.name.as_str()).collect();
    assert!(names.contains(&"urgent") && names.contains(&"review") && names.contains(&"blocked"));

    // —— 任务行数 + 字段映射
    let tasks = v2.list_tasks(&TaskQuery::default())?;
    assert_eq!(tasks.len(), 6, "tasks row count");

    let t100 = tasks.iter().find(|t| t.title == "写方案").unwrap();
    assert_eq!(t100.priority, Priority::High);
    assert_eq!(t100.status, TaskStatus::Active);
    assert_eq!(t100.reminder, Reminder::OnTime);
    assert_eq!(t100.repeat, Repeat::Weekly);
    assert_eq!(t100.estimated_pomodoros, 4);
    assert_eq!(t100.completed_pomodoros, 0);
    assert_eq!(t100.pomodoro_duration, Some(25));
    assert!(t100.due_date.is_some(), "due_date mapped");
    // v1 due 是本地墙钟:+8 换算后应为 UTC 前一天 16:00
    assert_eq!(
        t100.due_date
            .unwrap()
            .format("%Y-%m-%dT%H:%M:%SZ")
            .to_string(),
        "2026-01-14T16:00:00Z"
    );
    assert!(t100.completed_at.is_none());
    assert_eq!(t100.description, "整理需求");
    // 关联到 v1 project_id=2 (Child) → v2 应该指向 child 的新 UUID
    assert_eq!(t100.project_id.as_ref().unwrap(), &child.id);

    let t101 = tasks.iter().find(|t| t.title == "复盘昨日").unwrap();
    assert_eq!(t101.priority, Priority::Medium);
    assert_eq!(t101.status, TaskStatus::Completed);
    assert_eq!(t101.reminder, Reminder::Minutes5);
    assert_eq!(t101.repeat, Repeat::None); // 不重复 → None
    assert_eq!(t101.completed_pomodoros, 2);
    assert!(t101.completed_at.is_some(), "completed_at mapped");
    // completed_at 在 v1 是 utcnow 的 UTC 值 → 不做时区换算,原样 17:00Z
    assert_eq!(
        t101.completed_at
            .unwrap()
            .format("%Y-%m-%dT%H:%M:%SZ")
            .to_string(),
        "2026-01-14T17:00:00Z"
    );
    assert_eq!(t101.description, "");

    let t102 = tasks.iter().find(|t| t.title == "低优任务").unwrap();
    assert_eq!(t102.priority, Priority::Low);
    assert_eq!(t102.status, TaskStatus::Active);
    assert_eq!(t102.reminder, Reminder::Minutes30);
    assert_eq!(t102.repeat, Repeat::Monthly);
    assert!(t102.due_date.is_some());

    let t103 = tasks.iter().find(|t| t.title == "空项目任务").unwrap();
    assert_eq!(t103.priority, Priority::None);
    assert_eq!(t103.reminder, Reminder::None);
    assert_eq!(t103.repeat, Repeat::None);
    assert!(t103.project_id.is_none());

    // —— 重复任务:自定义规则映射 + 实例指向模板的新 UUID
    let t104 = tasks
        .iter()
        .find(|t| t.title == "自定义重复模板" && t.repeat == Repeat::Custom)
        .unwrap();
    assert!(t104
        .repeat_config
        .as_deref()
        .unwrap()
        .contains("\"type\":\"week\""));
    assert!(t104.due_date.is_some());
    let t105 = tasks
        .iter()
        .find(|t| t.title == "自定义重复模板" && t.repeat == Repeat::None)
        .unwrap();
    assert_eq!(
        t105.repeat_parent_id.as_ref().unwrap(),
        &t104.id,
        "实例的 repeat_parent_id 重映射到模板新 UUID"
    );

    // —— 子任务迁移 + position 按 rowid 顺序
    let subs = v2.list_subtasks_for_task(&t100.id)?;
    assert_eq!(subs.len(), 2, "subtasks row count");
    assert_eq!(subs[0].title, "列大纲");
    assert!(subs[0].is_completed);
    assert_eq!(subs[0].position, 0);
    assert_eq!(subs[1].title, "查资料");
    assert!(!subs[1].is_completed);
    assert_eq!(subs[1].position, 1);

    // —— 座右铭迁移
    let mottos = v2.list_mottos()?;
    assert_eq!(mottos.len(), 1, "mottos row count");
    assert_eq!(mottos[0].text, "种一棵树最好的时间是十年前");
    assert_eq!(mottos[0].author.as_deref(), Some("非洲谚语"));

    // —— 任务 ↔ 标签 多对多保留
    let t100_tags = v2.list_tags_for_task(&t100.id)?;
    let t100_names: Vec<_> = t100_tags.iter().map(|t| t.name.as_str()).collect();
    assert_eq!(t100_names.len(), 2);
    assert!(t100_names.contains(&"urgent") && t100_names.contains(&"review"));

    let t101_tags = v2.list_tags_for_task(&t101.id)?;
    assert_eq!(t101_tags.len(), 1);
    assert_eq!(t101_tags[0].name, "review");

    let t103_tags = v2.list_tags_for_task(&t103.id)?;
    assert!(t103_tags.is_empty());

    // —— 番茄会话行数 + 关联重映射
    let pomos = v2.list_pomodoros()?;
    assert_eq!(pomos.len(), 3, "pomodoros row count");
    let p1000 = pomos
        .iter()
        .find(|p| p.duration == 25 && p.started_at.timestamp() % 86400 == 36000)
        .unwrap();
    assert_eq!(p1000.task_id.as_ref().unwrap(), &t100.id);
    assert_eq!(p1000.project_id.as_ref().unwrap(), &child.id);
    assert!(p1000.is_completed);

    // —— 复盘
    assert!(v2
        .get_daily_review("2026-01-14")?
        .unwrap()
        .content
        .starts_with("专注"));
    assert!(v2
        .get_weekly_review("2026-01-12")?
        .unwrap()
        .content
        .starts_with("本周"));
    assert!(v2
        .get_monthly_review("2026-01")?
        .unwrap()
        .content
        .starts_with("1 月"));

    // 清理
    let _ = std::fs::remove_file(&v1_path);
    let _ = std::fs::remove_file(&v2_path);
    Ok(())
}

#[test]
fn dry_run_does_not_write_v2() -> Result<()> {
    let v1_path = temp_path("v1-dry.db");
    let v2_path = temp_path("v2-dry.db");
    build_v1_fixture(&v1_path)?;
    // dry-run 前确保 v2 不存在
    assert!(!v2_path.exists());

    run(Args {
        from: v1_path.clone(),
        to: v2_path.clone(),
        dry_run: true,
        tz_offset_min: None,
    })?;

    // dry-run 不写 v2
    assert!(!v2_path.exists(), "dry-run must not create v2 db");

    let _ = std::fs::remove_file(&v1_path);
    Ok(())
}

/// 确定性 UUID:同一 v1 库重跑迁移不产生重复数据(upsert 命中同一行)。
#[test]
fn rerun_is_idempotent() -> Result<()> {
    let v1_path = temp_path("v1-idem.db");
    let v2_path = temp_path("v2-idem.db");
    build_v1_fixture(&v1_path)?;

    for _ in 0..2 {
        run(Args {
            from: v1_path.clone(),
            to: v2_path.clone(),
            dry_run: false,
            tz_offset_min: Some(480),
        })?;
    }

    let v2 = SqliteStore::open(&v2_path)?;
    assert_eq!(v2.list_projects()?.len(), 2, "projects 不翻倍");
    assert_eq!(v2.list_tags()?.len(), 3, "tags 不翻倍");
    assert_eq!(
        v2.list_tasks(&TaskQuery::default())?.len(),
        6,
        "tasks 不翻倍"
    );
    assert_eq!(v2.list_pomodoros()?.len(), 3, "pomodoros 不翻倍");
    assert_eq!(v2.list_mottos()?.len(), 1, "mottos 不翻倍");

    // 外键重映射在重跑后仍正确(确定性 ID 稳定)
    let tasks = v2.list_tasks(&TaskQuery::default())?;
    let projects = v2.list_projects()?;
    let child = projects.iter().find(|p| p.name == "Child").unwrap();
    let t100 = tasks.iter().find(|t| t.title == "写方案").unwrap();
    assert_eq!(t100.project_id.as_ref().unwrap(), &child.id);

    let _ = std::fs::remove_file(&v1_path);
    let _ = std::fs::remove_file(&v2_path);
    Ok(())
}

#[test]
fn schema_check_rejects_non_v1_db() {
    let bogus_path = temp_path("bogus.db");
    let conn = Connection::open(&bogus_path).unwrap();
    conn.execute_batch("CREATE TABLE foo (id INTEGER PRIMARY KEY)")
        .unwrap();
    drop(conn);

    let v2_path = temp_path("v2-bogus.db");
    let err = run(Args {
        from: bogus_path.clone(),
        to: v2_path.clone(),
        dry_run: false,
        tz_offset_min: None,
    })
    .unwrap_err();
    let msg = format!("{err}");
    assert!(msg.contains("v1 schema missing tables"), "got: {msg}");

    let _ = std::fs::remove_file(&bogus_path);
    let _ = std::fs::remove_file(&v2_path);
}
