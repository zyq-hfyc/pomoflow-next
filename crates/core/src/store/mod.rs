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
    DailyReview, Id, MonthlyReview, Motto, NotificationTemplate, PomodoroSession, Priority,
    Project, SubTask, Tag, Task, WeeklyReview,
};

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
    fn upsert_pomodoro(&self, session: PomodoroSession) -> CoreResult<PomodoroSession>;
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

    // --- NotificationTemplate(全库单行配置,id 固定 "1") ---
    /// 读通知文案模板;表为空返回 None(调用方回落 `default_row()`)。
    fn get_notification_template(&self) -> CoreResult<Option<NotificationTemplate>>;
    fn upsert_notification_template(
        &self,
        template: NotificationTemplate,
    ) -> CoreResult<NotificationTemplate>;

    // --- Pomodoro stats(番茄钟页"今日专注分钟"用) ---
    /// 返回今日完成的番茄分钟数(把所有 is_completed=1 且 ended_at 在当天区间内的
    /// session 的 duration_minutes 求和)。后端按本地"今天 00:00 ~ 次日 00:00 UTC"
    /// 区间聚合。
    fn today_completed_minutes(&self, start_ms: i64, end_ms: i64) -> CoreResult<u32>;
}

/// `InMemoryStore` —— 用于单元测试 + "先把流程跑通"的占位实现。
///
/// 用 `Arc<RwLock<...>>` 包装可克隆的内部状态,这样 `Store` 实例可以多线程
/// 共享(后续 Tauri command 处理并发请求时复用同一份)。P0 测试不依赖多线程。
#[derive(Debug, Default, Clone)]
pub struct InMemoryStore {
    inner: Arc<RwLock<Inner>>,
}

#[derive(Debug, Default)]
struct Inner {
    tasks: HashMap<Id, Task>,
    projects: HashMap<Id, Project>,
    tags: HashMap<Id, Tag>,
    task_tags: HashMap<Id, Vec<Id>>,
    pomodoros: HashMap<Id, PomodoroSession>,
    subtasks: HashMap<Id, SubTask>,
    daily_reviews: HashMap<String, DailyReview>,
    weekly_reviews: HashMap<String, WeeklyReview>,
    monthly_reviews: HashMap<String, MonthlyReview>,
    mottos: HashMap<Id, Motto>,
    notification_template: Option<NotificationTemplate>,
}

impl InMemoryStore {
    pub fn new() -> Self {
        Self::default()
    }
}

impl Store for InMemoryStore {
    fn list_tasks(&self, q: &TaskQuery) -> CoreResult<Vec<Task>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let mut out: Vec<Task> = g
            .tasks
            .values()
            .filter(|t| t.deleted_at.is_none())
            .filter(|t| {
                q.project_id
                    .as_ref()
                    .is_none_or(|p| t.project_id.as_ref() == Some(p))
            })
            .filter(|t| q.status.is_none_or(|s| t.status == s))
            .filter(|t| q.priority.is_none_or(|p| t.priority == p))
            .filter(|t| {
                q.repeat_parent
                    .as_ref()
                    .is_none_or(|p| t.repeat_parent_id.as_ref() == Some(p))
            })
            .filter(|t| {
                // 月份区间(可选,与 date 互不冲突)
                if q.month_start_ms.is_none() && q.month_end_ms.is_none() {
                    return true;
                }
                let Some(due) = t.due_date else {
                    return false;
                };
                let ms = due.timestamp_millis();
                q.month_start_ms.is_none_or(|s| ms >= s) && q.month_end_ms.is_none_or(|e| ms <= e)
            })
            .filter(|t| match q.date {
                None => true,
                Some(TaskDateFilter::Today) => {
                    let now = chrono::Utc::now();
                    let today_start = now.date_naive().and_hms_opt(0, 0, 0).unwrap().and_utc();
                    let today_end = today_start + chrono::Duration::days(1);
                    t.due_date
                        .is_some_and(|d| d >= today_start && d < today_end)
                }
                Some(TaskDateFilter::Tomorrow) => {
                    let now = chrono::Utc::now();
                    let today_start = now.date_naive().and_hms_opt(0, 0, 0).unwrap().and_utc();
                    let tomorrow_start = today_start + chrono::Duration::days(1);
                    let tomorrow_end = tomorrow_start + chrono::Duration::days(1);
                    t.due_date
                        .is_some_and(|d| d >= tomorrow_start && d < tomorrow_end)
                }
                Some(TaskDateFilter::ThisWeek) => {
                    // 周一到周日(本地化,这里按 UTC 周一算)
                    let now = chrono::Utc::now();
                    let weekday = now.date_naive().weekday().num_days_from_monday();
                    let week_start = now.date_naive() - chrono::Duration::days(weekday as i64);
                    let week_start_dt = week_start.and_hms_opt(0, 0, 0).unwrap().and_utc();
                    let week_end_dt = week_start_dt + chrono::Duration::days(7);
                    t.due_date
                        .is_some_and(|d| d >= week_start_dt && d < week_end_dt)
                }
            })
            .cloned()
            .collect();
        if let Some(tag_id) = &q.tag_id {
            out.retain(|t| {
                g.task_tags
                    .get(&t.id)
                    .is_some_and(|tags| tags.contains(tag_id))
            });
        }
        // v1 排序:created_date DESC(新建在前);id 兜底保证稳定
        out.sort_by(|a, b| {
            b.created_at
                .0
                .cmp(&a.created_at.0)
                .then_with(|| a.id.as_str().cmp(b.id.as_str()))
        });
        out.truncate(crate::validate::clamp_limit(q.limit));
        Ok(out)
    }

    fn list_tasks_for_stats(&self) -> CoreResult<Vec<Task>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let mut out: Vec<Task> = g
            .tasks
            .values()
            .filter(|t| t.deleted_at.is_none())
            .cloned()
            .collect();
        out.sort_by(|a, b| {
            b.created_at
                .0
                .cmp(&a.created_at.0)
                .then_with(|| a.id.as_str().cmp(b.id.as_str()))
        });
        Ok(out)
    }

    fn get_task(&self, id: &Id) -> CoreResult<Task> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        g.tasks.get(id).cloned().ok_or_else(|| CoreError::NotFound {
            entity: "task",
            id: id.to_string(),
        })
    }

    fn upsert_task(&self, task: Task) -> CoreResult<Task> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let stored = task.clone();
        g.tasks.insert(task.id.clone(), task);
        Ok(stored)
    }

    fn delete_task(&self, id: &Id) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        // 软删除:不真删数据,只设 deleted_at;sync 时由 LWW 决定最终状态
        if let Some(task) = g.tasks.get_mut(id) {
            task.deleted_at = Some(crate::model::Timestamp::now());
        }
        Ok(())
    }

    fn list_projects(&self) -> CoreResult<Vec<Project>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let mut out: Vec<Project> = g
            .projects
            .values()
            .filter(|p| p.deleted_at.is_none())
            .cloned()
            .collect();
        // v1 排序:(parent_id, display_order, id);None(顶层)排在 Some 之前
        out.sort_by(|a, b| {
            let order = match (a.parent_id.as_ref(), b.parent_id.as_ref()) {
                (None, None) => std::cmp::Ordering::Equal,
                (None, Some(_)) => std::cmp::Ordering::Less,
                (Some(_), None) => std::cmp::Ordering::Greater,
                (Some(pa), Some(pb)) => pa.as_str().cmp(pb.as_str()),
            };
            order
                .then_with(|| a.display_order.cmp(&b.display_order))
                .then_with(|| a.id.as_str().cmp(b.id.as_str()))
        });
        Ok(out)
    }

    fn get_project(&self, id: &Id) -> CoreResult<Project> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        g.projects
            .get(id)
            .cloned()
            .ok_or_else(|| CoreError::NotFound {
                entity: "project",
                id: id.to_string(),
            })
    }

    fn upsert_project(&self, project: Project) -> CoreResult<Project> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let stored = project.clone();
        g.projects.insert(project.id.clone(), project);
        Ok(stored)
    }

    fn delete_project(&self, id: &Id) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        // v1 FK 语义:整棵子树级联软删 + tasks/pomodoros 的 project_id 置空
        let mut subtree: Vec<Id> = vec![id.clone()];
        let mut i = 0;
        while i < subtree.len() {
            let cur = subtree[i].clone();
            for p in g.projects.values() {
                if p.deleted_at.is_none()
                    && p.parent_id.as_ref() == Some(&cur)
                    && !subtree.contains(&p.id)
                {
                    subtree.push(p.id.clone());
                }
            }
            i += 1;
        }
        let now = crate::model::Timestamp::now();
        for pid in &subtree {
            if let Some(p) = g.projects.get_mut(pid) {
                p.deleted_at = Some(now);
            }
            for t in g.tasks.values_mut() {
                if t.project_id.as_ref() == Some(pid) {
                    t.project_id = None;
                }
            }
            for s in g.pomodoros.values_mut() {
                if s.project_id.as_ref() == Some(pid) {
                    s.project_id = None;
                }
            }
        }
        Ok(())
    }

    fn reorder_projects(&self, items: &[crate::reorder::ReorderItem]) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let existing: Vec<(Id, Option<Id>)> = g
            .projects
            .values()
            .filter(|p| p.deleted_at.is_none())
            .map(|p| (p.id.clone(), p.parent_id.clone()))
            .collect();
        let existing_ids: std::collections::HashSet<Id> =
            existing.iter().map(|(id, _)| id.clone()).collect();
        crate::reorder::validate_ids_exist(items, &existing_ids)?;
        crate::reorder::validate_project_reorder(&crate::reorder::merge_graph(items, &existing))?;
        for it in items {
            if let Some(p) = g.projects.get_mut(&it.id) {
                p.parent_id = it.parent_id.clone();
                p.display_order = it.display_order;
                p.updated_at = crate::model::Timestamp::now();
                p.revision = p.revision.saturating_add(1);
            }
        }
        Ok(())
    }

    fn list_tags(&self) -> CoreResult<Vec<Tag>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let mut out: Vec<Tag> = g
            .tags
            .values()
            .filter(|t| t.deleted_at.is_none())
            .cloned()
            .collect();
        // v1 排序:(display_order, id)
        out.sort_by(|a, b| {
            a.display_order
                .cmp(&b.display_order)
                .then_with(|| a.id.as_str().cmp(b.id.as_str()))
        });
        Ok(out)
    }

    fn get_tag(&self, id: &Id) -> CoreResult<Tag> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        g.tags.get(id).cloned().ok_or_else(|| CoreError::NotFound {
            entity: "tag",
            id: id.to_string(),
        })
    }

    fn upsert_tag(&self, tag: Tag) -> CoreResult<Tag> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        // 唯一性:name 不能重复(v1 行为对齐)
        if g.tags
            .values()
            .any(|t| t.name == tag.name && t.id != tag.id && t.deleted_at.is_none())
        {
            return Err(CoreError::Conflict(format!(
                "tag name '{}' already exists",
                tag.name
            )));
        }
        let stored = tag.clone();
        g.tags.insert(tag.id.clone(), tag);
        Ok(stored)
    }

    fn delete_tag(&self, id: &Id) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if let Some(t) = g.tags.get_mut(id) {
            t.deleted_at = Some(crate::model::Timestamp::now());
        }
        Ok(())
    }

    fn reorder_tags(&self, items: &[crate::reorder::ReorderItem]) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let existing_ids: std::collections::HashSet<Id> = g
            .tags
            .values()
            .filter(|t| t.deleted_at.is_none())
            .map(|t| t.id.clone())
            .collect();
        crate::reorder::validate_ids_exist(items, &existing_ids)?;
        for it in items {
            if let Some(t) = g.tags.get_mut(&it.id) {
                t.display_order = it.display_order;
                t.updated_at = crate::model::Timestamp::now();
                t.revision = t.revision.saturating_add(1);
            }
        }
        Ok(())
    }

    fn list_tags_for_task(&self, task_id: &Id) -> CoreResult<Vec<Tag>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let tag_ids = g.task_tags.get(task_id).cloned().unwrap_or_default();
        Ok(tag_ids
            .into_iter()
            .filter_map(|tid| g.tags.get(&tid).cloned())
            .filter(|t| t.deleted_at.is_none())
            .collect())
    }

    fn list_tags_for_tasks(&self, task_ids: &[Id]) -> CoreResult<HashMap<Id, Vec<Tag>>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let mut out: HashMap<Id, Vec<Tag>> = HashMap::new();
        for tid in task_ids {
            if let Some(tag_ids) = g.task_tags.get(tid) {
                let tags: Vec<Tag> = tag_ids
                    .iter()
                    .filter_map(|t| g.tags.get(t).cloned())
                    .filter(|t| t.deleted_at.is_none())
                    .collect();
                if !tags.is_empty() {
                    out.insert(tid.clone(), tags);
                }
            }
        }
        Ok(out)
    }

    fn set_tags_for_task(&self, task_id: &Id, tag_ids: &[Id]) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        // 校验所有 tag_id 存在(可选;为减少 InMemoryStore 复杂度,这里只插入)
        g.task_tags.insert(task_id.clone(), tag_ids.to_vec());
        Ok(())
    }

    fn list_pomodoros(&self) -> CoreResult<Vec<PomodoroSession>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        Ok(g.pomodoros
            .values()
            .filter(|s| s.deleted_at.is_none())
            .cloned()
            .collect())
    }

    fn list_pomodoros_between(
        &self,
        start_ms: i64,
        end_ms: i64,
    ) -> CoreResult<Vec<PomodoroSession>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let mut out: Vec<PomodoroSession> = g
            .pomodoros
            .values()
            .filter(|s| s.deleted_at.is_none())
            .filter(|s| {
                let ms = s.started_at.timestamp_millis();
                ms >= start_ms && ms < end_ms
            })
            .cloned()
            .collect();
        out.sort_by_key(|s| std::cmp::Reverse(s.started_at));
        Ok(out)
    }

    fn upsert_pomodoro(&self, session: PomodoroSession) -> CoreResult<PomodoroSession> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let stored = session.clone();
        g.pomodoros.insert(session.id.clone(), session);
        Ok(stored)
    }

    fn delete_pomodoro(&self, id: &Id) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if let Some(s) = g.pomodoros.get_mut(id) {
            s.deleted_at = Some(crate::model::Timestamp::now());
        }
        Ok(())
    }

    fn get_daily_review(&self, date: &str) -> CoreResult<Option<DailyReview>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        Ok(g.daily_reviews.get(date).cloned())
    }

    fn upsert_daily_review(&self, review: DailyReview) -> CoreResult<DailyReview> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let stored = review.clone();
        g.daily_reviews.insert(review.date.clone(), review);
        Ok(stored)
    }

    fn list_daily_reviews_between(
        &self,
        start_date: &str,
        end_date: &str,
    ) -> CoreResult<Vec<DailyReview>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let mut out: Vec<DailyReview> = g
            .daily_reviews
            .values()
            .filter(|r| r.date.as_str() >= start_date && r.date.as_str() <= end_date)
            .cloned()
            .collect();
        out.sort_by(|a, b| a.date.cmp(&b.date));
        Ok(out)
    }

    fn delete_daily_review(&self, date: &str) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        g.daily_reviews.remove(date);
        Ok(())
    }

    fn get_weekly_review(&self, week_start: &str) -> CoreResult<Option<WeeklyReview>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        Ok(g.weekly_reviews.get(week_start).cloned())
    }

    fn upsert_weekly_review(&self, review: WeeklyReview) -> CoreResult<WeeklyReview> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let stored = review.clone();
        g.weekly_reviews.insert(review.week_start.clone(), review);
        Ok(stored)
    }

    fn list_weekly_reviews_between(
        &self,
        start_week: &str,
        end_week: &str,
    ) -> CoreResult<Vec<WeeklyReview>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let mut out: Vec<WeeklyReview> = g
            .weekly_reviews
            .values()
            .filter(|r| r.week_start.as_str() >= start_week && r.week_start.as_str() <= end_week)
            .cloned()
            .collect();
        out.sort_by(|a, b| a.week_start.cmp(&b.week_start));
        Ok(out)
    }

    fn delete_weekly_review(&self, week_start: &str) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        g.weekly_reviews.remove(week_start);
        Ok(())
    }

    fn get_monthly_review(&self, year_month: &str) -> CoreResult<Option<MonthlyReview>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        Ok(g.monthly_reviews.get(year_month).cloned())
    }

    fn upsert_monthly_review(&self, review: MonthlyReview) -> CoreResult<MonthlyReview> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let stored = review.clone();
        g.monthly_reviews.insert(review.year_month.clone(), review);
        Ok(stored)
    }

    fn delete_monthly_review(&self, year_month: &str) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        g.monthly_reviews.remove(year_month);
        Ok(())
    }

    fn list_subtasks_for_task(&self, task_id: &Id) -> CoreResult<Vec<SubTask>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let mut out: Vec<SubTask> = g
            .subtasks
            .values()
            .filter(|s| s.deleted_at.is_none() && &s.task_id == task_id)
            .cloned()
            .collect();
        out.sort_by_key(|s| s.position);
        Ok(out)
    }

    fn list_subtasks_for_tasks(&self, task_ids: &[Id]) -> CoreResult<HashMap<Id, Vec<SubTask>>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let mut out: HashMap<Id, Vec<SubTask>> = HashMap::new();
        for tid in task_ids {
            let mut subs: Vec<SubTask> = g
                .subtasks
                .values()
                .filter(|s| s.deleted_at.is_none() && &s.task_id == tid)
                .cloned()
                .collect();
            if !subs.is_empty() {
                subs.sort_by_key(|s| s.position);
                out.insert(tid.clone(), subs);
            }
        }
        Ok(out)
    }

    fn upsert_subtask(&self, subtask: SubTask) -> CoreResult<SubTask> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let stored = subtask.clone();
        g.subtasks.insert(subtask.id.clone(), subtask);
        Ok(stored)
    }

    fn delete_subtask(&self, id: &Id) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if let Some(s) = g.subtasks.get_mut(id) {
            s.deleted_at = Some(crate::model::Timestamp::now());
        }
        Ok(())
    }

    fn list_mottos(&self) -> CoreResult<Vec<Motto>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let mut out: Vec<Motto> = g
            .mottos
            .values()
            .filter(|m| m.deleted_at.is_none())
            .cloned()
            .collect();
        // v1 crud.py:833 按 id 升序(= 创建序)返回
        out.sort_by_key(|m| m.created_at.0);
        Ok(out)
    }

    fn upsert_motto(&self, motto: Motto) -> CoreResult<Motto> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let stored = motto.clone();
        g.mottos.insert(motto.id.clone(), motto);
        Ok(stored)
    }

    fn delete_motto(&self, id: &Id) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if let Some(m) = g.mottos.get_mut(id) {
            m.deleted_at = Some(crate::model::Timestamp::now());
        }
        Ok(())
    }

    fn get_notification_template(&self) -> CoreResult<Option<NotificationTemplate>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        Ok(g.notification_template.clone())
    }

    fn upsert_notification_template(
        &self,
        template: NotificationTemplate,
    ) -> CoreResult<NotificationTemplate> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        g.notification_template = Some(template.clone());
        Ok(template)
    }

    fn today_completed_minutes(&self, start_ms: i64, end_ms: i64) -> CoreResult<u32> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let mut total: u64 = 0;
        for s in g.pomodoros.values() {
            if s.deleted_at.is_some() || !s.is_completed {
                continue;
            }
            let ended_ms = s.ended_at.timestamp_millis();
            if ended_ms >= start_ms && ended_ms < end_ms {
                total = total.saturating_add(s.duration as u64);
            }
        }
        u32::try_from(total).map_err(|_| CoreError::storage("today minutes overflow"))
    }
}

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
}
