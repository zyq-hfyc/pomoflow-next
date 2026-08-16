//! 存储抽象 —— `Store` trait + 内存实现
//!
//! ## 用途
//!
//! - 业务逻辑(`validate` / 未来的 service 层)只依赖这个 trait,不关心底层是
//!   SQLite、PostgreSQL 还是内存 mock
//! - P0 提供 `InMemoryStore` 供单元测试与"跑一遍流程"使用
//! - P1 在 `apps/desktop/src/store_sqlite.rs` 提供 `rusqlite` 实现
//! - P2+ 云端提供 Postgres / DynamoDB 实现
//!
//! ## trait 设计原则
//!
//! - **读写分离**:CRUD 都返回 `CoreResult`,错误统一走 [`CoreError`]
//! - **同步 trait(非 async)**:当前不引入 Tokio 依赖;P1 真需要异步再权衡
//!   (rusqlite 本身是同步 API)
use std::collections::HashMap;
use std::sync::{Arc, RwLock};

use serde::{Deserialize, Serialize};

use crate::error::{CoreError, CoreResult};
use crate::model::{
    DailyReview, Id, MonthlyReview, PomodoroSession, Project, Tag, Task, WeeklyReview,
};

/// 任务 ↔ 标签 关联查询的入参 / 出参。
#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct TagLink {
    pub task_id: Id,
    pub tag_id: Id,
}

/// 任务查询条件(全字段可选)。
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TaskQuery {
    pub project_id: Option<Id>,
    pub tag_id: Option<Id>,
    pub status: Option<crate::model::TaskStatus>,
    pub limit: Option<usize>,
}

/// 存储抽象 —— 任何具体实现(SQLite / 内存 / Postgres)都满足这套接口。
///
/// 注释中的 `Send + Sync` 是给后续 P1 多线程场景做准备的:P0 单线程测试用不上,
/// 但 trait 加 `where Self: Send + Sync` 会让 `InMemoryStore` 失去灵活性,所以
/// 选择"trait 不强制,具体实现各自决定"——与 `Arc<dyn Store>` 模式配合。
pub trait Store: std::fmt::Debug {
    // --- Tasks ---
    fn list_tasks(&self, q: &TaskQuery) -> CoreResult<Vec<Task>>;
    fn get_task(&self, id: &Id) -> CoreResult<Task>;
    fn upsert_task(&self, task: Task) -> CoreResult<Task>;
    fn delete_task(&self, id: &Id) -> CoreResult<()>;

    // --- Projects ---
    fn list_projects(&self) -> CoreResult<Vec<Project>>;
    fn get_project(&self, id: &Id) -> CoreResult<Project>;
    fn upsert_project(&self, project: Project) -> CoreResult<Project>;
    fn delete_project(&self, id: &Id) -> CoreResult<()>;

    // --- Tags ---
    fn list_tags(&self) -> CoreResult<Vec<Tag>>;
    fn get_tag(&self, id: &Id) -> CoreResult<Tag>;
    fn upsert_tag(&self, tag: Tag) -> CoreResult<Tag>;
    fn delete_tag(&self, id: &Id) -> CoreResult<()>;

    // --- Task ↔ Tag links ---
    fn list_tags_for_task(&self, task_id: &Id) -> CoreResult<Vec<Tag>>;
    fn set_tags_for_task(&self, task_id: &Id, tag_ids: &[Id]) -> CoreResult<()>;

    // --- Pomodoro sessions ---
    fn list_pomodoros(&self) -> CoreResult<Vec<PomodoroSession>>;
    fn upsert_pomodoro(&self, session: PomodoroSession) -> CoreResult<PomodoroSession>;
    fn delete_pomodoro(&self, id: &Id) -> CoreResult<()>;

    // --- Reviews ---
    fn get_daily_review(&self, date: &str) -> CoreResult<Option<DailyReview>>;
    fn upsert_daily_review(&self, review: DailyReview) -> CoreResult<DailyReview>;

    fn get_weekly_review(&self, week_start: &str) -> CoreResult<Option<WeeklyReview>>;
    fn upsert_weekly_review(&self, review: WeeklyReview) -> CoreResult<WeeklyReview>;

    fn get_monthly_review(&self, year_month: &str) -> CoreResult<Option<MonthlyReview>>;
    fn upsert_monthly_review(&self, review: MonthlyReview) -> CoreResult<MonthlyReview>;
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
    daily_reviews: HashMap<String, DailyReview>,
    weekly_reviews: HashMap<String, WeeklyReview>,
    monthly_reviews: HashMap<String, MonthlyReview>,
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
            .cloned()
            .collect();
        if let Some(tag_id) = &q.tag_id {
            out.retain(|t| {
                g.task_tags
                    .get(&t.id)
                    .is_some_and(|tags| tags.contains(tag_id))
            });
        }
        out.sort_by_key(|t| std::cmp::Reverse(t.updated_at.0));
        if let Some(limit) = q.limit {
            out.truncate(limit);
        }
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
        Ok(g.projects
            .values()
            .filter(|p| p.deleted_at.is_none())
            .cloned()
            .collect())
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
        if let Some(p) = g.projects.get_mut(id) {
            p.deleted_at = Some(crate::model::Timestamp::now());
        }
        Ok(())
    }

    fn list_tags(&self) -> CoreResult<Vec<Tag>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        Ok(g.tags
            .values()
            .filter(|t| t.deleted_at.is_none())
            .cloned()
            .collect())
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
