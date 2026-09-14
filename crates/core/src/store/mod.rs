//! 存储抽象 —— `Store` trait + 内存实现 + SQLite 实现
//!
//! ## 用途
//!
//! - 业务逻辑(`validate` / 未来的 service 层)只依赖这个 trait,不关心底层是
//!   SQLite、PostgreSQL 还是内存 mock
//! - P0 提供 `InMemoryStore` 供单元测试与"跑一遍流程"使用
//! - P1.2 起 `sqlite::SqliteStore` 作为桌面端持久化(P1.5 起迁移工具 `tools/migrate-v1`
//!   也复用,见 `crate::store::sqlite` 模块头注释)
//! - P2+ 云端提供 Postgres / DynamoDB 实现
//!
//! ## trait 设计原则
//!
//! - **读写分离**:CRUD 都返回 `CoreResult`,错误统一走 [`CoreError`]
//! - **同步 trait(非 async)**:当前不引入 Tokio 依赖;P1 真需要异步再权衡
//!   (rusqlite 本身是同步 API)

pub mod migrate;
pub mod sqlite;

use std::collections::HashMap;
use std::sync::{Arc, RwLock};

use chrono::Datelike;
use serde::{Deserialize, Serialize};

use crate::error::{CoreError, CoreResult};
use crate::model::{
    DailyReview, Id, Journal, MonthlyReview, Motto, NotificationTemplate, PomodoroSession,
    Priority, Project, SubTask, Tag, Task, TaskTagLink, Timestamp, WeeklyReview, YearlyReview,
};
use crate::sync::{change_of, Change, ChangeLogStore, EntityKind, SyncEntity};

pub use sqlite::SqliteStore;

/// 任务 ↔ 标签 关联查询的入参 / 出参。
#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct TagLink {
    pub task_id: Id,
    pub tag_id: Id,
}

/// 任务查询条件(全字段可选)。
///
/// 与 v1 `/api/tasks?project_id=&tag_id=&status=&limit=&priority=&date=` 对齐:
/// - `priority`:高/中/低 三档过滤
/// - `date`:`today` / `tomorrow` / `this_week` / `month` 由后端展开为 due_date 范围
///   (实现统一在 sqlite impl 里处理)。
/// - serde **snake_case**(与 api.ts 的 TaskQuery 字段名一致;早期误加 camelCase
///   rename 导致 month_start_ms 等多词键被静默丢弃,筛选失效)
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct TaskQuery {
    pub project_id: Option<Id>,
    pub tag_id: Option<Id>,
    pub status: Option<crate::model::TaskStatus>,
    pub limit: Option<usize>,
    /// v1 番茄钟页右侧任务清单支持按优先级筛选。
    pub priority: Option<Priority>,
    /// v1 番茄钟页右侧任务清单支持按 due_date 维度筛选(today / tomorrow / this_week / month)。
    pub date: Option<TaskDateFilter>,
    /// 番茄钟页右侧任务清单限定"当月任务"。month_end 单独传,跟 `date` 互不冲突。
    pub month_start_ms: Option<i64>,
    pub month_end_ms: Option<i64>,
    /// 请求方本地时区偏移(分钟,东正西负;东八区 +480)。`date` 过滤按此取
    /// 本地日界 —— due_date 存 UTC,纯日期任务(本地午夜转 UTC)在东八区会
    /// 落在 UTC 前一天,按 UTC 日界过滤会错一天(v1 存本地日期字符串无此问题)。
    pub tz_offset_min: Option<i32>,
    /// 按重复模板过滤(重复编排层用):列出该模板的全部实例。
    pub repeat_parent: Option<Id>,
}

/// 番茄钟页右侧任务清单支持的日期过滤维度 —— 与 v1 `timerFilter.date` 一一对应。
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum TaskDateFilter {
    Today,
    Tomorrow,
    ThisWeek,
}

/// 把 `TaskDateFilter` 展开为 `[start_ms, end_ms)` UTC 毫秒区间,两个实现
/// (Sqlite / InMemory)共用 —— 2026-09-14 前只有 Sqlite 走本地日界,InMemory
/// 按 UTC 算(注释自认),同一查询两实现结果不同,会掩盖前端 tz bug。
///
/// `tz_offset_min`(东正西负,东八区 +480)决定"今天/明天/本周"的日界:
/// 按请求方**本地**日历取今日 0 点再换算回 UTC —— due_date 存 UTC,纯日期
/// 任务(本地午夜)在东八区落在 UTC 前一天,若按 UTC 日界过滤会错一天。
pub(crate) fn date_filter_range(f: TaskDateFilter, tz_offset_min: i32) -> (i64, i64) {
    let offset = chrono::FixedOffset::east_opt(tz_offset_min * 60)
        .unwrap_or_else(|| chrono::FixedOffset::east_opt(0).unwrap());
    let now_local = chrono::Utc::now().with_timezone(&offset);
    let today_start = now_local
        .date_naive()
        .and_hms_opt(0, 0, 0)
        .unwrap()
        .and_local_timezone(offset)
        .single()
        .unwrap_or(now_local)
        .with_timezone(&chrono::Utc);
    match f {
        TaskDateFilter::Today => {
            let end = today_start + chrono::Duration::days(1);
            (today_start.timestamp_millis(), end.timestamp_millis())
        }
        TaskDateFilter::Tomorrow => {
            let start = today_start + chrono::Duration::days(1);
            let end = today_start + chrono::Duration::days(2);
            (start.timestamp_millis(), end.timestamp_millis())
        }
        TaskDateFilter::ThisWeek => {
            // 周一为一周开始(本地日历)
            let weekday = now_local.date_naive().weekday().num_days_from_monday() as i64;
            let week_start = today_start - chrono::Duration::days(weekday);
            let week_end = week_start + chrono::Duration::days(7);
            (week_start.timestamp_millis(), week_end.timestamp_millis())
        }
    }
}

/// 存储抽象 —— 任何具体实现(SQLite / 内存 / Postgres)都满足这套接口。
///
/// 注释中的 `Send + Sync` 是给后续 P1 多线程场景做准备的:P0 单线程测试用不上,
/// 但 trait 加 `where Self: Send + Sync` 会让 `InMemoryStore` 失去灵活性,所以
/// 选择"trait 不强制,具体实现各自决定"——与 `Arc<dyn Store>` 模式配合。
pub trait Store: std::fmt::Debug {
    // --- Tasks ---
    fn list_tasks(&self, q: &TaskQuery) -> CoreResult<Vec<Task>>;
    /// 统计专用:全量任务(软删过滤,**无分页上限**)。
    ///
    /// v1 统计是全表过滤 COUNT/聚合,不走分页;`list_tasks` 的 limit 会夹紧到
    /// ≤5000,任务数超限时最老任务被静默截断,统计数字会偏低 —— 所以单独提供。
    fn list_tasks_for_stats(&self) -> CoreResult<Vec<Task>>;
    fn get_task(&self, id: &Id) -> CoreResult<Task>;
    fn upsert_task(&self, task: Task) -> CoreResult<Task>;
    fn delete_task(&self, id: &Id) -> CoreResult<()>;
    /// 列出已软删除的任务(P2 垃圾箱 UI 拉实),按删除时间倒序。
    fn list_deleted_tasks(&self) -> CoreResult<Vec<Task>>;
    /// 还原软删除的任务(清 deleted_at + bump revision + 标 pending 推送)。
    fn restore_task(&self, id: &Id) -> CoreResult<()>;
    /// 硬删除任务(从 DB 物理删除;不可恢复 —— 与 LWW 同步收敛后多端都不再有)。
    fn purge_task(&self, id: &Id) -> CoreResult<()>;

    // --- Projects ---
    fn list_projects(&self) -> CoreResult<Vec<Project>>;
    fn get_project(&self, id: &Id) -> CoreResult<Project>;
    fn upsert_project(&self, project: Project) -> CoreResult<Project>;
    fn delete_project(&self, id: &Id) -> CoreResult<()>;
    /// 拖拽排序(v1 POST /projects/reorder):全量校验(id 存在/无自指/无环/
    /// 深度 <3,校验图含未涉及节点)后单事务更新 parent_id + display_order,
    /// 失败整体回滚。标签无层级,见 [`Store::reorder_tags`]。
    fn reorder_projects(&self, items: &[crate::reorder::ReorderItem]) -> CoreResult<()>;

    // --- Tags ---
    fn list_tags(&self) -> CoreResult<Vec<Tag>>;
    fn get_tag(&self, id: &Id) -> CoreResult<Tag>;
    fn upsert_tag(&self, tag: Tag) -> CoreResult<Tag>;
    fn delete_tag(&self, id: &Id) -> CoreResult<()>;
    /// 标签拖拽排序:只更新 display_order(无层级),id 存在性校验 + 事务。
    fn reorder_tags(&self, items: &[crate::reorder::ReorderItem]) -> CoreResult<()>;

    // --- Task ↔ Tag links ---
    fn list_tags_for_task(&self, task_id: &Id) -> CoreResult<Vec<Tag>>;
    /// 批量:返回 task_id → tags 映射(未关联的 task 不在结果里)。供 list_tasks embed 用。
    fn list_tags_for_tasks(&self, task_ids: &[Id]) -> CoreResult<HashMap<Id, Vec<Tag>>>;
    fn set_tags_for_task(&self, task_id: &Id, tag_ids: &[Id]) -> CoreResult<()>;

    // --- Pomodoro sessions ---
    fn list_pomodoros(&self) -> CoreResult<Vec<PomodoroSession>>;
    /// 按 started_at 毫秒区间过滤(统计页窄查询):`start_ms <= started_at_ms < end_ms`,
    /// 过滤软删除。
    fn list_pomodoros_between(
        &self,
        start_ms: i64,
        end_ms: i64,
    ) -> CoreResult<Vec<PomodoroSession>>;
    /// counts 口径(is_completed && task_id 非空 && 未软删,v1 过滤条件)的
    /// 全时段会话数。overview 的 total_sessions 用 SQL COUNT,免全表反序列化
    /// (2026-09-14)。
    fn count_pomodoros(&self) -> CoreResult<u64>;
    fn upsert_pomodoro(&self, session: PomodoroSession) -> CoreResult<PomodoroSession>;
    /// 单条取会话(2026-09-14;命令层此前 list 全表后内存 find,会话只增不减)
    fn get_pomodoro(&self, id: &Id) -> CoreResult<PomodoroSession>;
    fn delete_pomodoro(&self, id: &Id) -> CoreResult<()>;

    // --- Reviews ---
    // 注:复盘族三表走**硬删除**(v1 DELETE 语义),与任务族的软删除不同 ——
    // 复盘以日期为自然键,内容为空即"无复盘",没有同步去重的诉求。
    fn get_daily_review(&self, date: &str) -> CoreResult<Option<DailyReview>>;
    fn upsert_daily_review(&self, review: DailyReview) -> CoreResult<DailyReview>;
    /// 日期区间查询(v1 GET /daily-reviews?start&end,双端包含 YYYY-MM-DD)。
    fn list_daily_reviews_between(
        &self,
        start_date: &str,
        end_date: &str,
    ) -> CoreResult<Vec<DailyReview>>;
    fn delete_daily_review(&self, date: &str) -> CoreResult<()>;

    fn get_weekly_review(&self, week_start: &str) -> CoreResult<Option<WeeklyReview>>;
    fn upsert_weekly_review(&self, review: WeeklyReview) -> CoreResult<WeeklyReview>;
    /// 周一日期区间查询(v1 GET /weekly-reviews?year&month 展开,双端包含)。
    fn list_weekly_reviews_between(
        &self,
        start_week: &str,
        end_week: &str,
    ) -> CoreResult<Vec<WeeklyReview>>;
    fn delete_weekly_review(&self, week_start: &str) -> CoreResult<()>;

    fn get_monthly_review(&self, year_month: &str) -> CoreResult<Option<MonthlyReview>>;
    fn upsert_monthly_review(&self, review: MonthlyReview) -> CoreResult<MonthlyReview>;
    fn delete_monthly_review(&self, year_month: &str) -> CoreResult<()>;

    fn get_yearly_review(&self, year: &str) -> CoreResult<Option<YearlyReview>>;
    fn upsert_yearly_review(&self, review: YearlyReview) -> CoreResult<YearlyReview>;
    fn delete_yearly_review(&self, year: &str) -> CoreResult<()>;

    // --- SubTasks ---
    /// 列出某 Task 下所有未软删的子任务,按 position 升序。
    fn list_subtasks_for_task(&self, task_id: &Id) -> CoreResult<Vec<SubTask>>;
    /// 批量:返回 task_id → subtasks 映射(未关联的 task 不在结果里)。供 list_tasks embed 用。
    fn list_subtasks_for_tasks(&self, task_ids: &[Id]) -> CoreResult<HashMap<Id, Vec<SubTask>>>;
    fn upsert_subtask(&self, subtask: SubTask) -> CoreResult<SubTask>;
    /// 软删除(id 不存在时静默返回 Ok,与现有 delete_task / delete_tag 风格一致)。
    fn delete_subtask(&self, id: &Id) -> CoreResult<()>;

    // --- Mottos ---
    /// 列出所有未软删的座右铭,按 created_at 升序(v1 id 升序 = 创建序)。
    fn list_mottos(&self) -> CoreResult<Vec<Motto>>;
    fn upsert_motto(&self, motto: Motto) -> CoreResult<Motto>;
    fn delete_motto(&self, id: &Id) -> CoreResult<()>;

    // --- Journals(手账:v2 新实体,仅移动端有 UI,桌面端只存同步) ---
    /// 列出所有未软删的手账,按 created_at 升序(移动端列表展示序)。
    fn list_journals(&self) -> CoreResult<Vec<Journal>>;
    fn upsert_journal(&self, journal: Journal) -> CoreResult<Journal>;
    /// 单条取随手记(2026-09-14;upsert/toggle 编辑路径此前 list 全表找 id)
    fn get_journal(&self, id: &Id) -> CoreResult<Journal>;
    fn delete_journal(&self, id: &Id) -> CoreResult<()>;

    // --- NotificationTemplate(全库单行配置,id 固定 "1") ---
    /// 读通知文案模板;表为空返回 None(调用方回落 `default_row()`)。
    fn get_notification_template(&self) -> CoreResult<Option<NotificationTemplate>>;
    fn upsert_notification_template(
        &self,
        template: NotificationTemplate,
    ) -> CoreResult<NotificationTemplate>;

    // --- Pomodoro stats(番茄钟页"今日专注分钟"用) ---
    /// 返回今日完成的番茄分钟数(把所有 is_completed=1 且 started_at 在当天区间内
    /// [start_ms, end_ms) 的 session 的 duration_minutes 求和)。start/end 是前端按
    /// 本地时区算好的 UTC 毫秒窗口;按 started_at 分桶与 stats::overview / range
    /// 一致(v1 语义),跨午夜会话归到开始日。
    fn today_completed_minutes(&self, start_ms: i64, end_ms: i64) -> CoreResult<u32>;

    // --- conflict_log(P2 冲突可视化) ---
    /// 记录一次 LWW 覆盖/输掉事件。
    fn insert_conflict(&self, record: ConflictRecord) -> CoreResult<()>;
    /// 最近 N 条冲突记录,按时间倒序。
    fn list_recent_conflicts(&self, limit: usize) -> CoreResult<Vec<ConflictRecord>>;
    /// 清空全部冲突记录。
    fn clear_conflicts(&self) -> CoreResult<()>;
    /// 清理 `cutoff_ms` 之前的冲突日志条目,返回删除数(同步成功后调用;
    /// 纯本地日志无同步语义,2026-09-14 加保留期策略)。
    fn trim_conflicts(&self, cutoff_ms: i64) -> CoreResult<usize>;
    /// 当前冲突记录总数。
    fn count_conflicts(&self) -> CoreResult<usize>;
}

/// 冲突日志记录(不参与同步,仅本地展示)。
#[derive(Debug, Clone, PartialEq)]
pub struct ConflictRecord {
    pub entity: String,
    pub entity_id: String,
    pub entity_title: String,
    pub direction: String,
    pub remote_device: String,
    pub local_updated_ms: i64,
    pub remote_updated_ms: i64,
    pub occurred_at_ms: i64,
}

/// `InMemoryStore` —— 用于单元测试 + "先把流程跑通"的占位实现。
///
/// 用 `Arc<RwLock<...>>` 包装可克隆的内部状态,这样 `Store` 实例可以多线程
// 内存实现(2026-09-15 巨石拆分:自本文件切出)
mod memory;
pub use memory::InMemoryStore;

#[cfg(test)]
mod tests {
    use super::*;
    use crate::model::Task;

    #[test]
    fn upsert_and_get_task() {
        let s = InMemoryStore::new();
        let task = Task::new("写代码");
        let id = task.id.clone();
        s.upsert_task(task.clone()).unwrap();
        let got = s.get_task(&id).unwrap();
        assert_eq!(got.title, "写代码");
    }

    #[test]
    fn soft_delete_marks_deleted_at() {
        let s = InMemoryStore::new();
        let task = Task::new("已删除");
        let id = task.id.clone();
        s.upsert_task(task).unwrap();
        s.delete_task(&id).unwrap();
        // 删除后 list_tasks 应当不再返回
        assert!(s.list_tasks(&TaskQuery::default()).unwrap().is_empty());
        // 但 get_task 仍能拿到(用于同步 / 审计)
        let got = s.get_task(&id).unwrap();
        assert!(got.deleted_at.is_some());
    }

    #[test]
    fn tag_unique_name() {
        let s = InMemoryStore::new();
        s.upsert_tag(Tag::new("urgent")).unwrap();
        let dup = Tag::new("urgent");
        let err = s.upsert_tag(dup).unwrap_err();
        assert!(matches!(err, CoreError::Conflict(_)));
    }

    #[test]
    fn delete_tag_removes_task_tag_links() {
        // 与 SqliteStore 对齐(2026-09-14):此前 InMemory 不清 task_tags,
        // 靠 list_tags_for_task 的过滤掩盖,两实现行为不一致
        let s = InMemoryStore::new();
        let task = Task::new("t");
        let tag = Tag::new("g");
        let tid = task.id.clone();
        let gid = tag.id.clone();
        s.upsert_task(task).unwrap();
        s.upsert_tag(tag).unwrap();
        s.set_tags_for_task(&tid, std::slice::from_ref(&gid))
            .unwrap();
        assert_eq!(s.list_tags_for_task(&tid).unwrap().len(), 1);
        s.delete_tag(&gid).unwrap();
        assert!(
            s.list_tags_for_task(&tid).unwrap().is_empty(),
            "删标签后任务的关联应被清掉"
        );
    }

    #[test]
    fn get_journal_and_get_pomodoro_not_found() {
        let s = InMemoryStore::new();
        let id = Id::new();
        assert!(matches!(
            s.get_journal(&id).unwrap_err(),
            CoreError::NotFound {
                entity: "journal",
                ..
            }
        ));
        assert!(matches!(
            s.get_pomodoro(&id).unwrap_err(),
            CoreError::NotFound {
                entity: "pomodoro_session",
                ..
            }
        ));
    }

    /// date 过滤双实现 parity(2026-09-14):同一批 due 边界相对量,两个 store
    /// 在三个时区下的 Today/Tomorrow/ThisWeek 结果必须一致 —— 此前 InMemory
    /// 按 UTC 日界,Sqlite 按本地日界,东八区会差一天(掩盖前端 tz bug)。
    /// (相对 now ± 构造 due,两端同调 date_filter_range,无需冻结时钟。)
    #[test]
    fn date_filter_parity_between_stores() {
        use crate::model::TaskStatus;
        use chrono::{DateTime, Utc};
        use std::collections::HashSet;

        let now = chrono::Utc::now();
        let dues: Vec<Option<DateTime<Utc>>> = vec![
            Some(now - chrono::Duration::hours(48)), // 前天
            Some(now - chrono::Duration::hours(12)), // 可能昨天/今天(随时刻)
            Some(now + chrono::Duration::hours(6)),  // 今天内
            Some(now + chrono::Duration::hours(30)), // 明天内
            Some(now + chrono::Duration::days(8)),   // 下周
            None,                                    // 无到期日
        ];
        for tz in [0i32, 480, -300] {
            let mem = InMemoryStore::new();
            let sql = SqliteStore::open_in_memory().unwrap();
            for (i, due) in dues.iter().enumerate() {
                let mut t = Task::new(format!("t{i}"));
                t.due_date = *due;
                t.status = TaskStatus::Active;
                mem.upsert_task(t.clone()).unwrap();
                sql.upsert_task(t).unwrap();
            }
            for f in [
                TaskDateFilter::Today,
                TaskDateFilter::Tomorrow,
                TaskDateFilter::ThisWeek,
            ] {
                let q = TaskQuery {
                    date: Some(f),
                    tz_offset_min: Some(tz),
                    ..TaskQuery::default()
                };
                let ids = |v: Vec<Task>| -> HashSet<String> {
                    v.into_iter().map(|t| t.id.as_str().to_string()).collect()
                };
                assert_eq!(
                    ids(mem.list_tasks(&q).unwrap()),
                    ids(sql.list_tasks(&q).unwrap()),
                    "date filter {f:?} tz={tz} 两实现结果不一致"
                );
            }
        }
    }
}

#[test]
fn task_tag_sync_semantics_matches_sqlite() {
    use crate::sync::ChangeLogStore;
    let a = InMemoryStore::with_user_device(Id::new(), "dev-a");
    let task = Task::new("t");
    let tag = Tag::new("g");
    let tag_id = tag.id.clone();
    let task_id = task.id.clone();
    a.upsert_task(task).unwrap();
    a.upsert_tag(tag.clone()).unwrap();
    // 重复传入 → 载荷去重
    a.set_tags_for_task(&task_id, &[tag_id.clone(), tag_id.clone()])
        .unwrap();
    let ch = a
        .list_pending(100)
        .unwrap()
        .into_iter()
        .find(|c| c.entity == EntityKind::TaskTag)
        .expect("应有 task_tag pending 变更");
    let p: TaskTagLink = serde_json::from_value(ch.payload.clone()).unwrap();
    assert_eq!(p.tag_ids, vec![tag_id]);
    assert_eq!(p.revision, 1);

    let b = InMemoryStore::with_user_device(a.local_user_id().clone(), "dev-b");
    // 关联变更只带集合不带标签实体 —— 标签本身走自己的 Tag 变更,这里手工补齐
    b.upsert_tag(tag).unwrap();
    b.apply_remote(&ch).unwrap();
    let m = b
        .list_tags_for_tasks(std::slice::from_ref(&task_id))
        .unwrap();
    assert_eq!(m[&task_id].len(), 1);
    assert!(b
        .list_pending(100)
        .unwrap()
        .iter()
        .all(|c| c.entity != EntityKind::TaskTag));

    // 删除任务 → 空集 tombstone(revision 递增)
    a.delete_task(&task_id).unwrap();
    let tomb = a
        .list_pending(100)
        .unwrap()
        .into_iter()
        .find(|c| c.entity == EntityKind::TaskTag)
        .unwrap();
    let tp: TaskTagLink = serde_json::from_value(tomb.payload.clone()).unwrap();
    assert!(tp.tag_ids.is_empty());
    assert_eq!(tp.revision, 2);
}
