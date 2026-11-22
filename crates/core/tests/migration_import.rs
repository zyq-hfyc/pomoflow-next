//! 离线迁移导入集成测试 —— InMemoryStore / SqliteStore::open_in_memory 双实现
//! 跑同组用例(与 store 层 parity 测试同风格)。
//!
//! 锁定的关键语义(见 crate::migration 模块文档):
//! 1. 全量信封导入空库 → 逐类 applied 计数 + getter 可读回;
//! 2. **revision / updated_at 保真**,复盘导两次 revision 不变(专用写路径的
//!    回归意义:若走 upsert_*_review pending 分支会被强制 revision 碾压云端);
//! 3. 导入行标 pending(revision == 载荷),下轮推送上云;
//! 4. 按 id upsert 覆盖,其余行保留;
//! 5. 行级非法 id → skipped_invalid 跳过,不整批失败;
//! 6. 行级存储冲突(同名 tag)→ skipped_error + first_error,继续;
//! 7. task_tags 载荷保真 + pending;
//! 8. collect → parse → apply 往返,逐实体相等;
//! 9. notification_template 强制 id="1",theme_present 透传;
//! 10. 6 个新导出 getter 双实现 parity。

use chrono::TimeZone;
use pomoflow_core::migration::{
    apply_import, collect_migration_data, parse_envelope, MigrationEnvelope, MigrationImport,
};
use pomoflow_core::model::{
    DailyReview, Id, Journal, MonthlyReview, Motto, NotificationTemplate, PomodoroSession, Project,
    SubTask, Tag, Task, TaskTagLink, Timestamp, WeeklyReview, YearlyReview,
};
use pomoflow_core::store::{InMemoryStore, SqliteStore, Store, TaskQuery};
use pomoflow_core::sync::{ChangeLogStore, EntityKind};

// === 固定测试键(结构合法的 v4 UUID,便于断言) ===============================

const P1: &str = "00000000-0000-4000-8000-000000000001";
const T1: &str = "00000000-0000-4000-8000-000000000002";
const T2: &str = "00000000-0000-4000-8000-000000000003";
const K1: &str = "00000000-0000-4000-8000-000000000004";
const K2: &str = "00000000-0000-4000-8000-000000000005";
const S1: &str = "00000000-0000-4000-8000-000000000006";
const PM1: &str = "00000000-0000-4000-8000-000000000007";
const M1: &str = "00000000-0000-4000-8000-000000000008";
const J1: &str = "00000000-0000-4000-8000-000000000009";

fn id(v: &str) -> Id {
    Id::parse(v).expect("固定测试 id 必须是合法 UUID")
}

/// 毫秒精确时间戳:往返 sqlite 的 ms 列零抖动,元数据保真断言的前提。
fn ms(v: i64) -> Timestamp {
    Timestamp(
        chrono::Utc
            .timestamp_millis_opt(v)
            .single()
            .expect("valid ms"),
    )
}

// === 信封 fixture =============================================================

/// 覆盖 12 类实体 + 通知文案 + 主题的信封;行 id 固定、revision 有别于构造
/// 默认值(保真断言靠 revision=7/5 这类"非默认"数值才有分辨力)。
fn fixture_envelope() -> MigrationEnvelope {
    let mut project = Project::new("项目A");
    project.id = id(P1);
    project.revision = 3;
    project.created_at = ms(100);
    project.updated_at = ms(110);

    let mut tag1 = Tag::new("工作");
    tag1.id = id(T1);
    tag1.revision = 2;
    tag1.created_at = ms(120);
    tag1.updated_at = ms(121);
    let mut tag2 = Tag::new("生活");
    tag2.id = id(T2);
    tag2.revision = 1;
    tag2.created_at = ms(122);
    tag2.updated_at = ms(123);

    let mut task = Task::new("写周报");
    task.id = id(K1);
    task.project_id = Some(id(P1));
    task.revision = 7;
    task.created_at = ms(1000);
    task.updated_at = ms(1010);

    let link = TaskTagLink {
        task_id: id(K1),
        tag_ids: vec![id(T2), id(T1)], // 故意乱序:导入侧排序去重后 [T1, T2]
        user_id: Id::nil(),
        revision: 4,
        updated_at: ms(2000),
    };

    let mut subtask = SubTask::new(id(K1), "先列大纲");
    subtask.id = id(S1);
    subtask.revision = 2;
    subtask.created_at = ms(3000);
    subtask.updated_at = ms(3010);

    let mut pomodoro = PomodoroSession::new(Some(id(K1)), None, 25);
    pomodoro.id = id(PM1);
    pomodoro.revision = 1;
    pomodoro.created_at = ms(4000);
    pomodoro.updated_at = ms(4000);

    let mut motto = Motto::new("千里之行始于足下", Some("老子".to_string()));
    motto.id = id(M1);
    motto.revision = 2;
    motto.created_at = ms(5000);
    motto.updated_at = ms(5010);

    let mut journal = Journal::new("todo", "买牛奶");
    journal.id = id(J1);
    journal.revision = 3;
    journal.created_at = ms(6000);
    journal.updated_at = ms(6010);

    let daily = DailyReview {
        id: Id::new(),
        user_id: Id::nil(),
        date: "2026-07-04".into(),
        content: "专注 4 个番茄".into(),
        revision: 5,
        deleted_at: None,
        updated_at: ms(7000),
    };
    let weekly = WeeklyReview {
        id: Id::new(),
        user_id: Id::nil(),
        week_start: "2026-07-06".into(),
        content: "周复盘".into(),
        revision: 6,
        deleted_at: None,
        updated_at: ms(7100),
    };
    let monthly = MonthlyReview {
        id: Id::new(),
        user_id: Id::nil(),
        year_month: "2026-07".into(),
        content: "月复盘".into(),
        revision: 7,
        deleted_at: None,
        updated_at: ms(7200),
    };
    let yearly = YearlyReview {
        id: Id::new(),
        user_id: Id::nil(),
        year: "2026".into(),
        content: "年度复盘".into(),
        revision: 8,
        deleted_at: None,
        updated_at: ms(7300),
    };

    let mut template = NotificationTemplate::default_row();
    template.style = "cute".into();

    MigrationEnvelope {
        format: "pomoflow-migration".into(),
        version: 1,
        exported_at: "2026-11-20T00:00:00Z".into(),
        app_version: Some("0.2.0".into()),
        data: pomoflow_core::migration::MigrationData {
            projects: vec![project],
            tags: vec![tag1, tag2],
            tasks: vec![task],
            task_tags: vec![link],
            subtasks: vec![subtask],
            pomodoros: vec![pomodoro],
            mottos: vec![motto],
            journals: vec![journal],
            daily_reviews: vec![daily],
            weekly_reviews: vec![weekly],
            monthly_reviews: vec![monthly],
            yearly_reviews: vec![yearly],
        },
        notification_template: Some(template),
        theme: Some(serde_json::json!({
            "theme": "ocean",
            "background": "preset:preset-bg-3"
        })),
    }
}

/// 剥掉 user_id 再比较:归属是各 store 开库时盖章的本机用户(open_in_memory
/// 每次随机,ADR-007),不属于迁移载荷/getter 逻辑的比对范围。
fn rows_without_owner(value: &serde_json::Value) -> serde_json::Value {
    match value {
        serde_json::Value::Array(items) => {
            serde_json::Value::Array(items.iter().map(rows_without_owner).collect())
        }
        serde_json::Value::Object(map) => serde_json::Value::Object(
            map.iter()
                .filter(|(k, _)| k.as_str() != "user_id")
                .map(|(k, v)| (k.clone(), v.clone()))
                .collect(),
        ),
        other => other.clone(),
    }
}

fn assert_same_rows(a: serde_json::Value, b: serde_json::Value, what: &str) {
    assert_eq!(rows_without_owner(&a), rows_without_owner(&b), "{what}");
}

fn both_stores() -> Vec<(&'static str, InMemoryStore, SqliteStore)> {
    vec![(
        "mem+sqlite",
        InMemoryStore::with_user_device(Id::new(), "dev-mem"),
        SqliteStore::open_in_memory().expect("open_in_memory"),
    )]
}

// === 用例 1 + 3:全量导入空库 → 计数 / 读回 / pending ========================

fn case_full_envelope_import<S>(store: &S)
where
    S: Store + MigrationImport + ChangeLogStore,
{
    let report = apply_import(store, &fixture_envelope()).expect("全量导入应成功");

    // 12 类逐类:total/applied 符合 fixture 行数、零跳过(tags 有 2 条)
    for (name, counts, expected) in [
        ("projects", &report.projects, 1),
        ("tags", &report.tags, 2),
        ("tasks", &report.tasks, 1),
        ("task_tags", &report.task_tags, 1),
        ("subtasks", &report.subtasks, 1),
        ("pomodoros", &report.pomodoros, 1),
        ("mottos", &report.mottos, 1),
        ("journals", &report.journals, 1),
        ("daily_reviews", &report.daily_reviews, 1),
        ("weekly_reviews", &report.weekly_reviews, 1),
        ("monthly_reviews", &report.monthly_reviews, 1),
        ("yearly_reviews", &report.yearly_reviews, 1),
    ] {
        assert_eq!(counts.total, expected, "{name}: total");
        assert_eq!(counts.applied, expected, "{name}: applied");
        assert_eq!(counts.skipped_invalid, 0, "{name}: invalid");
        assert_eq!(counts.skipped_error, 0, "{name}: error");
    }
    assert_eq!(report.notification_template.total, 1);
    assert!(report.theme_present, "theme blob 应随文件透传");

    // getter 读回:内容 + 保真的元数据 + user_id 归账本机
    let task = store.get_task(&id(K1)).expect("get_task");
    assert_eq!(task.title, "写周报");
    assert_eq!(task.revision, 7, "task revision 必须保真");
    assert_eq!(task.updated_at, ms(1010));
    assert_eq!(task.user_id, *store.local_user_id(), "导入归账本机用户");

    let link = &store.list_task_tag_links().expect("links")[0];
    assert_eq!(link.revision, 4);
    assert_eq!(link.tag_ids, vec![id(T1), id(T2)], "tag 集合排序去重");
    assert_eq!(link.user_id, *store.local_user_id());

    let daily = store
        .get_daily_review("2026-07-04")
        .expect("get_daily_review")
        .expect("daily row");
    assert_eq!(daily.content, "专注 4 个番茄");
    assert_eq!(daily.revision, 5, "复盘 revision 必须保真(专用写路径)");

    // 通知文案落库 + id 强制 "1"
    let template = store
        .get_notification_template()
        .expect("template")
        .expect("row");
    assert_eq!(template.id.as_str(), "1");
    assert_eq!(template.style, "cute");

    // 全部标 pending,且 pending 变更的 revision == 载荷(不是自增伪造)
    let pending = store.list_pending(200).expect("list_pending");
    let key_of = |c: &pomoflow_core::sync::Change| format!("{:?}/{}", c.entity, c.entity_id);
    let keys: std::collections::HashSet<String> = pending.iter().map(key_of).collect();
    for expected in [
        "Task/00000000-0000-4000-8000-000000000004",
        "Project/00000000-0000-4000-8000-000000000001",
        "Tag/00000000-0000-4000-8000-000000000002",
        "TaskTag/00000000-0000-4000-8000-000000000004",
        "SubTask/00000000-0000-4000-8000-000000000006",
        "PomodoroSession/00000000-0000-4000-8000-000000000007",
        "Motto/00000000-0000-4000-8000-000000000008",
        "Journal/00000000-0000-4000-8000-000000000009",
        "DailyReview/2026-07-04",
        "WeeklyReview/2026-07-06",
        "MonthlyReview/2026-07",
        "YearlyReview/2026",
    ] {
        assert!(
            keys.contains(expected),
            "pending 缺 {expected};实际 {keys:?}"
        );
    }
    let task_change = pending
        .iter()
        .find(|c| c.entity == EntityKind::Task)
        .expect("task pending change");
    assert_eq!(task_change.revision, 7, "pending 变更 revision == 载荷");
}

// === 用例 2:revision 保真 + 复盘导两次 revision 不变 =========================

fn case_double_import_keeps_revision<S>(store: &S)
where
    S: Store + MigrationImport + ChangeLogStore,
{
    let env = fixture_envelope();
    apply_import(store, &env).expect("第一次导入");
    let again = apply_import(store, &env).expect("第二次导入(幂等 upsert)");
    assert_eq!(again.tasks.applied, 1);
    assert_eq!(again.daily_reviews.applied, 1);

    // 走 Store::upsert_*_review(pending 分支 revision=1/+1)的话,这里会是
    // 6/1 而不是 5/5 —— 专用导入写路径的回归哨兵
    assert_eq!(store.get_task(&id(K1)).expect("task").revision, 7);
    assert_eq!(
        store
            .get_daily_review("2026-07-04")
            .expect("daily")
            .expect("row")
            .revision,
        5,
        "复盘导两次 revision 必须保持载荷原值"
    );
}

// === 用例 4:同 id 覆盖,其余保留 ==============================================

fn case_upsert_semantics<S>(store: &S)
where
    S: Store + MigrationImport + ChangeLogStore,
{
    // 目标库先有:同 id 的旧任务(revision 更高也不该赢 —— 按 id 覆盖)+
    // 一条与迁移文件无关的任务(必须保留)
    let mut existing = Task::new("旧标题");
    existing.id = id(K1);
    existing.revision = 99;
    existing.updated_at = ms(90000);
    store.upsert_task(existing.clone()).expect("seed old");
    let mut bystander = Task::new("无关任务");
    bystander.id = id(K2);
    store.upsert_task(bystander).expect("seed bystander");

    let report = apply_import(store, &fixture_envelope()).expect("导入");
    assert_eq!(report.tasks.applied, 1);

    let after = store.get_task(&id(K1)).expect("task");
    assert_eq!(after.title, "写周报", "同 id 被文件载荷覆盖");
    assert_eq!(after.revision, 7, "覆盖以载荷为准,不看本地旧行 revision");
    assert_eq!(
        store.get_task(&id(K2)).expect("bystander").title,
        "无关任务",
        "不同 id 的既有行保留"
    );
    assert_eq!(report.tasks.total, 1);
}

// === 用例 5:行级非法 id 跳过 =================================================

fn case_skips_invalid_rows<S>(store: &S)
where
    S: Store + MigrationImport + ChangeLogStore,
{
    let mut env = fixture_envelope();
    // 非法任务 id(非 UUID)
    env.data.tasks[0].id = Id("not-a-uuid".into());
    // 非法复盘自然键(月份 13)+ 合法日期但内部 id 是垃圾(读路径 row_to_*
    // 会对 id 列做 Id::parse,脏 id 不许入库)
    env.data.daily_reviews[0].date = "2026-13-99".into();
    env.data.weekly_reviews[0].id = Id("j01xxxx0000zzzz".into());

    let report = apply_import(store, &env).expect("行级垃圾不整批失败");
    assert_eq!(
        report.tasks.skipped_invalid, 1,
        "非法任务 id 计 skipped_invalid"
    );
    assert_eq!(report.tasks.applied, 0);
    assert_eq!(report.daily_reviews.skipped_invalid, 1);
    assert_eq!(
        report.weekly_reviews.skipped_invalid, 1,
        "内部 id 垃圾同样拒入"
    );
    // 其余行照常
    assert_eq!(report.projects.applied, 1);
    assert_eq!(report.yearly_reviews.applied, 1);
    assert!(
        store.get_daily_review("2026-13-99").is_err()
            || store.get_daily_review("2026-13-99").expect("q").is_none(),
        "非法日期行不得入库"
    );
    assert_eq!(
        store
            .list_tasks(&TaskQuery::default())
            .expect("tasks")
            .len(),
        0,
        "唯一一条任务非法 → 任务表为空"
    );
}

// === 用例 6:同名 tag 存储冲突 fail-soft ======================================

fn case_tag_conflict_fail_soft<S>(store: &S)
where
    S: Store + MigrationImport + ChangeLogStore,
{
    // 目标库已有不同 id 的同名 tag → 唯一约束冲突
    let mut existing = Tag::new("工作");
    existing.id = Id::new();
    store.upsert_tag(existing).expect("seed 同名 tag");

    let report = apply_import(store, &fixture_envelope()).expect("导入整体成功");
    assert_eq!(report.tags.skipped_error, 1, "同名冲突计入 skipped_error");
    assert_eq!(report.tags.applied, 1, "另一条 tag 照常落库");
    let err = report.tags.first_error.expect("first_error");
    assert!(
        err.to_lowercase().contains("conflict"),
        "first_error 指明冲突:{err}"
    );
    assert_eq!(report.tasks.applied, 1, "冲突不影响其余实体");
}

// === 用例 7:task_tags 载荷保真(并入用例 1 已覆盖;此处锁空集合行为) ========

fn case_task_tag_empty_set_link<S>(store: &S)
where
    S: Store + MigrationImport + ChangeLogStore,
{
    // ADR-010:空集合 = 清除语义。迁移文件里若带空集合行(源机曾打标签后
    // 清空),导入不炸即可;内存实现保留行、SQLite 实现不建行(与各自写入
    // 侧语义一致),此差异已登记,不属正确性问题。
    let mut env = fixture_envelope();
    env.data.task_tags[0].tag_ids = Vec::new();
    let report = apply_import(store, &env).expect("空集合行导入不失败");
    assert_eq!(report.task_tags.applied, 1);
}

// === 用例 8:collect → parse → apply 往返 =====================================

fn case_collect_apply_roundtrip<S>(store_a: &S, store_b: &S)
where
    S: Store + MigrationImport + ChangeLogStore,
{
    // A 库经业务 Store API 灌种子(与 fixture 同数据),B 库走文件往返导入
    let env = fixture_envelope();
    for p in &env.data.projects {
        store_a.upsert_project(p.clone()).expect("seed project");
    }
    for t in &env.data.tags {
        store_a.upsert_tag(t.clone()).expect("seed tag");
    }
    for t in &env.data.tasks {
        store_a.upsert_task(t.clone()).expect("seed task");
    }
    store_a
        .set_tags_for_task(&id(K1), &[id(T2), id(T1)])
        .expect("seed tags");
    for s in &env.data.subtasks {
        store_a.upsert_subtask(s.clone()).expect("seed subtask");
    }
    for p in &env.data.pomodoros {
        store_a.upsert_pomodoro(p.clone()).expect("seed pomodoro");
    }
    for m in &env.data.mottos {
        store_a.upsert_motto(m.clone()).expect("seed motto");
    }
    for j in &env.data.journals {
        store_a.upsert_journal(j.clone()).expect("seed journal");
    }
    for r in &env.data.daily_reviews {
        store_a.upsert_daily_review(r.clone()).expect("seed daily");
    }
    for r in &env.data.weekly_reviews {
        store_a
            .upsert_weekly_review(r.clone())
            .expect("seed weekly");
    }
    for r in &env.data.monthly_reviews {
        store_a
            .upsert_monthly_review(r.clone())
            .expect("seed monthly");
    }
    for r in &env.data.yearly_reviews {
        store_a
            .upsert_yearly_review(r.clone())
            .expect("seed yearly");
    }

    // collect → 序列化 → parse(真文件链路)→ apply 进 B
    let mut exported = MigrationEnvelope {
        format: pomoflow_core::migration::MIGRATION_FORMAT.into(),
        version: pomoflow_core::migration::MIGRATION_VERSION,
        exported_at: "2026-11-20T00:00:00Z".into(),
        app_version: None,
        data: collect_migration_data(store_a).expect("collect"),
        notification_template: None,
        theme: None,
    };
    exported.notification_template = store_a
        .get_notification_template()
        .expect("template")
        .or_else(|| Some(NotificationTemplate::default_row()));
    let text = serde_json::to_string(&exported).expect("serialize");
    let parsed = parse_envelope(&text).expect("parse 回读");
    apply_import(store_b, &parsed).expect("apply 进 B");

    // 逐实体相等(task_tag 的 updated_at 是 A 库写入瞬间的 now,种子路径两侧
    // 元数据同源,B 侧保真 → 全等成立;user_id 归属各库盖章,剥掉再比)
    assert_same_rows(
        serde_json::to_value(store_a.list_projects().expect("a")).unwrap(),
        serde_json::to_value(store_b.list_projects().expect("b")).unwrap(),
        "projects 往返",
    );
    assert_same_rows(
        serde_json::to_value(store_a.list_tags().expect("a")).unwrap(),
        serde_json::to_value(store_b.list_tags().expect("b")).unwrap(),
        "tags 往返",
    );
    assert_same_rows(
        serde_json::to_value(store_a.list_tasks(&TaskQuery::default()).expect("a")).unwrap(),
        serde_json::to_value(store_b.list_tasks(&TaskQuery::default()).expect("b")).unwrap(),
        "tasks 往返",
    );
    assert_same_rows(
        serde_json::to_value(store_a.list_subtasks().expect("a")).unwrap(),
        serde_json::to_value(store_b.list_subtasks().expect("b")).unwrap(),
        "subtasks 往返",
    );
    assert_same_rows(
        serde_json::to_value(store_a.list_pomodoros().expect("a")).unwrap(),
        serde_json::to_value(store_b.list_pomodoros().expect("b")).unwrap(),
        "pomodoros 往返",
    );
    assert_same_rows(
        serde_json::to_value(store_a.list_mottos().expect("a")).unwrap(),
        serde_json::to_value(store_b.list_mottos().expect("b")).unwrap(),
        "mottos 往返",
    );
    assert_same_rows(
        serde_json::to_value(store_a.list_journals().expect("a")).unwrap(),
        serde_json::to_value(store_b.list_journals().expect("b")).unwrap(),
        "journals 往返",
    );
    assert_same_rows(
        serde_json::to_value(store_a.list_daily_reviews().expect("a")).unwrap(),
        serde_json::to_value(store_b.list_daily_reviews().expect("b")).unwrap(),
        "daily_reviews 往返",
    );
    assert_same_rows(
        serde_json::to_value(store_a.list_weekly_reviews().expect("a")).unwrap(),
        serde_json::to_value(store_b.list_weekly_reviews().expect("b")).unwrap(),
        "weekly_reviews 往返",
    );
    assert_same_rows(
        serde_json::to_value(store_a.list_monthly_reviews().expect("a")).unwrap(),
        serde_json::to_value(store_b.list_monthly_reviews().expect("b")).unwrap(),
        "monthly_reviews 往返",
    );
    assert_same_rows(
        serde_json::to_value(store_a.list_yearly_reviews().expect("a")).unwrap(),
        serde_json::to_value(store_b.list_yearly_reviews().expect("b")).unwrap(),
        "yearly_reviews 往返",
    );
    // task_tag:两侧 now() 来源不同(内存纳秒 / sqlite 毫秒截断),比三元组
    let strip = |s: &S| -> Vec<(Id, Vec<Id>, u64)> {
        let mut v: Vec<_> = s
            .list_task_tag_links()
            .expect("links")
            .into_iter()
            .map(|l| (l.task_id, l.tag_ids, l.revision))
            .collect();
        v.sort_by_key(|x| x.0.to_string());
        v
    };
    assert_eq!(strip(store_a), strip(store_b));
}

// === 用例 9:通知文案强制 id + theme 缺省 =====================================

fn case_notification_and_theme<S>(store: &S)
where
    S: Store + MigrationImport + ChangeLogStore,
{
    let mut env = fixture_envelope();
    env.notification_template
        .as_mut()
        .expect("fixture template")
        .id = Id("2".into());
    env.theme = None;

    let report = apply_import(store, &env).expect("导入");
    assert_eq!(report.notification_template.applied, 1);
    assert!(!report.theme_present, "theme 缺省 → theme_present=false");
    let template = store.get_notification_template().expect("q").expect("row");
    assert_eq!(
        template.id.as_str(),
        "1",
        "单行行键恒为 \"1\",文件里的值被覆盖"
    );
    assert_eq!(template.style, "cute");
}

// === 用例 10:6 个新导出 getter 双实现 parity =================================

fn case_new_getters_parity(mem: &InMemoryStore, sql: &SqliteStore) {
    let env = fixture_envelope();
    for store in [mem as &dyn Store, sql as &dyn Store] {
        for p in &env.data.projects {
            store.upsert_project(p.clone()).expect("seed");
        }
        for t in &env.data.tags {
            store.upsert_tag(t.clone()).expect("seed");
        }
        for t in &env.data.tasks {
            store.upsert_task(t.clone()).expect("seed");
        }
        store
            .set_tags_for_task(&id(K1), &[id(T1), id(T2)])
            .expect("seed");
        for s in &env.data.subtasks {
            store.upsert_subtask(s.clone()).expect("seed");
        }
        for r in &env.data.daily_reviews {
            store.upsert_daily_review(r.clone()).expect("seed");
        }
        for r in &env.data.weekly_reviews {
            store.upsert_weekly_review(r.clone()).expect("seed");
        }
        for r in &env.data.monthly_reviews {
            store.upsert_monthly_review(r.clone()).expect("seed");
        }
        for r in &env.data.yearly_reviews {
            store.upsert_yearly_review(r.clone()).expect("seed");
        }
    }
    // 子任务与四类复盘:全行 serde 相等(时间戳均为毫秒精确值;user_id 剥离)
    assert_same_rows(
        serde_json::to_value(mem.list_subtasks().expect("q")).unwrap(),
        serde_json::to_value(sql.list_subtasks().expect("q")).unwrap(),
        "list_subtasks parity",
    );
    assert_same_rows(
        serde_json::to_value(mem.list_daily_reviews().expect("q")).unwrap(),
        serde_json::to_value(sql.list_daily_reviews().expect("q")).unwrap(),
        "list_daily_reviews parity",
    );
    assert_same_rows(
        serde_json::to_value(mem.list_weekly_reviews().expect("q")).unwrap(),
        serde_json::to_value(sql.list_weekly_reviews().expect("q")).unwrap(),
        "list_weekly_reviews parity",
    );
    assert_same_rows(
        serde_json::to_value(mem.list_monthly_reviews().expect("q")).unwrap(),
        serde_json::to_value(sql.list_monthly_reviews().expect("q")).unwrap(),
        "list_monthly_reviews parity",
    );
    assert_same_rows(
        serde_json::to_value(mem.list_yearly_reviews().expect("q")).unwrap(),
        serde_json::to_value(sql.list_yearly_reviews().expect("q")).unwrap(),
        "list_yearly_reviews parity",
    );
    // task_tag:updated_at 是写入瞬间 now()(内存纳秒 / sqlite 毫秒截断),
    // 对齐载荷三元组
    let strip = |links: Vec<TaskTagLink>| -> Vec<(Id, Vec<Id>, u64)> {
        let mut v: Vec<_> = links
            .into_iter()
            .map(|l| (l.task_id, l.tag_ids, l.revision))
            .collect();
        v.sort_by_key(|x| x.0.to_string());
        v
    };
    assert_eq!(
        strip(mem.list_task_tag_links().expect("q")),
        strip(sql.list_task_tag_links().expect("q")),
    );
}

// === #[test] 入口:每用例双实现各跑一遍 =======================================

#[test]
fn full_envelope_import() {
    for (_, mem, sql) in both_stores() {
        case_full_envelope_import(&mem);
        case_full_envelope_import(&sql);
    }
}

#[test]
fn double_import_keeps_revision() {
    for (_, mem, sql) in both_stores() {
        case_double_import_keeps_revision(&mem);
        case_double_import_keeps_revision(&sql);
    }
}

#[test]
fn upsert_semantics() {
    for (_, mem, sql) in both_stores() {
        case_upsert_semantics(&mem);
        case_upsert_semantics(&sql);
    }
}

#[test]
fn skips_invalid_rows() {
    for (_, mem, sql) in both_stores() {
        case_skips_invalid_rows(&mem);
        case_skips_invalid_rows(&sql);
    }
}

#[test]
fn tag_conflict_fail_soft() {
    for (_, mem, sql) in both_stores() {
        case_tag_conflict_fail_soft(&mem);
        case_tag_conflict_fail_soft(&sql);
    }
}

#[test]
fn task_tag_empty_set_link() {
    for (_, mem, sql) in both_stores() {
        case_task_tag_empty_set_link(&mem);
        case_task_tag_empty_set_link(&sql);
    }
}

#[test]
fn collect_apply_roundtrip() {
    // 内存对共享同一 user(逐实体全等含 user_id;SQLite 对走各自默认用户,
    // 同库默认值一致)
    let user = Id::new();
    let mem_a = InMemoryStore::with_user_device(user.clone(), "dev-a");
    let mem_b = InMemoryStore::with_user_device(user, "dev-b");
    case_collect_apply_roundtrip(&mem_a, &mem_b);
    let sql_a = SqliteStore::open_in_memory().expect("sqlite a");
    let sql_b = SqliteStore::open_in_memory().expect("sqlite b");
    case_collect_apply_roundtrip(&sql_a, &sql_b);
}

#[test]
fn notification_and_theme() {
    for (_, mem, sql) in both_stores() {
        case_notification_and_theme(&mem);
        case_notification_and_theme(&sql);
    }
}

#[test]
fn new_getters_parity_between_impls() {
    let (_, mem, sql) = both_stores().remove(0);
    case_new_getters_parity(&mem, &sql);
}
