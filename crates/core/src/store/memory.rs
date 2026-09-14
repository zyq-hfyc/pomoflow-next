//! `InMemoryStore` —— 单元测试 / e2e 闭环用内存实现。
//!
//! (2026-09-15 巨石拆分:自 store/mod.rs 切出,内容零改动;行为契约与
//! SqliteStore 对齐的锁见 mod.rs tests 与 sqlite/tests.rs。)

use super::*;

#[derive(Debug, Clone)]
pub struct InMemoryStore {
    inner: Arc<RwLock<Inner>>,
    /// 本机用户(写入盖章;e2e 里同账号两设备共用同一个)
    user_id: Id,
    /// 本设备标识(ADR-009 tie-break / Change.device_id)
    device_id: String,
}

#[derive(Debug, Default)]
struct Inner {
    tasks: HashMap<Id, Task>,
    projects: HashMap<Id, Project>,
    tags: HashMap<Id, Tag>,
    task_tags: HashMap<Id, Vec<Id>>,
    /// 任务↔标签关联的同步元信息:task_id → (revision, updated_at)。
    /// 关联数据本身在 `task_tags`(单一事实源),这里只存 LWW 元数据,
    /// 与 SqliteStore 的 `task_tag_sync` 表语义对齐。
    task_tag_meta: HashMap<Id, (u64, Timestamp)>,
    pomodoros: HashMap<Id, PomodoroSession>,
    subtasks: HashMap<Id, SubTask>,
    daily_reviews: HashMap<String, DailyReview>,
    weekly_reviews: HashMap<String, WeeklyReview>,
    monthly_reviews: HashMap<String, MonthlyReview>,
    yearly_reviews: HashMap<String, YearlyReview>,
    mottos: HashMap<Id, Motto>,
    journals: HashMap<Id, Journal>,
    notification_template: Option<NotificationTemplate>,
    /// 同步:待推送行(键 "kind/<id-or-natural-key>")
    pending: std::collections::HashSet<String>,
    /// 每行最后写入设备(tie-break 用)
    origin: HashMap<String, String>,
    /// 冲突日志(P2 冲突可视化)
    conflicts: Vec<ConflictRecord>,
}

impl Inner {
    /// 本地写入触及一行:pending + 记录 origin。
    fn touch(&mut self, kind: &str, key: &str, device: &str) {
        let k = format!("{kind}/{key}");
        self.pending.insert(k.clone());
        self.origin.insert(k, device.to_string());
    }
    /// 已裁决:清除 pending。
    fn settle(&mut self, kind: &str, key: &str) {
        self.pending.remove(&format!("{kind}/{key}"));
    }
    fn origin_of(&self, kind: &str, key: &str) -> String {
        self.origin
            .get(&format!("{kind}/{key}"))
            .cloned()
            .unwrap_or_default()
    }
}

impl Default for InMemoryStore {
    fn default() -> Self {
        Self {
            inner: Arc::new(RwLock::new(Inner::default())),
            user_id: Id::new(),
            device_id: Id::new().0,
        }
    }
}

impl InMemoryStore {
    pub fn new() -> Self {
        Self::default()
    }

    /// e2e 专用:指定归属用户与设备标识(同账号多设备共用 user_id)。
    pub fn with_user_device(user_id: Id, device_id: impl Into<String>) -> Self {
        Self {
            inner: Arc::new(RwLock::new(Inner::default())),
            user_id,
            device_id: device_id.into(),
        }
    }

    pub fn local_user_id(&self) -> &Id {
        &self.user_id
    }

    pub fn local_device_id(&self) -> &str {
        &self.device_id
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
                // 2026-09-14 起与 SqliteStore 同源:走 date_filter_range 本地日界
                // (此前按 UTC 算,同一查询两实现结果不同)
                Some(f) => {
                    let (start_ms, end_ms) = date_filter_range(f, q.tz_offset_min.unwrap_or(0));
                    t.due_date.is_some_and(|d| {
                        let ms = d.timestamp_millis();
                        ms >= start_ms && ms < end_ms
                    })
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

    fn upsert_task(&self, mut task: Task) -> CoreResult<Task> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if task.user_id.is_nil() {
            task.user_id = self.user_id.clone();
        }
        g.touch("task", task.id.as_str(), &self.device_id);
        g.tasks.insert(task.id.clone(), task.clone());
        Ok(task)
    }

    fn delete_task(&self, id: &Id) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        // 软删除:不真删数据,只设 deleted_at;sync 时由 LWW 决定最终状态
        if let Some(task) = g.tasks.get_mut(id) {
            task.deleted_at = Some(crate::model::Timestamp::now());
            task.revision = task.revision.saturating_add(1);
            g.touch("task", id.as_str(), &self.device_id);
        }
        // 关联标签清空 + 空集 tombstone(载荷=空集合,ADR-010;与 SqliteStore 对齐)
        g.task_tags.remove(id);
        if let Some((rev, _)) = g.task_tag_meta.get(id).cloned() {
            g.task_tag_meta
                .insert(id.clone(), (rev + 1, Timestamp::now()));
            g.touch("task_tag", id.as_str(), &self.device_id);
        }
        Ok(())
    }

    fn list_deleted_tasks(&self) -> CoreResult<Vec<Task>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let mut out: Vec<Task> = g
            .tasks
            .values()
            .filter(|t| t.deleted_at.is_some())
            .cloned()
            .collect();
        // 按 deleted_at 倒序(最近删的在前);fallback id 升序保证稳定
        out.sort_by(|a, b| match (b.deleted_at, a.deleted_at) {
            (Some(bt), Some(at)) => bt.0.cmp(&at.0),
            (Some(_), None) => std::cmp::Ordering::Less,
            (None, Some(_)) => std::cmp::Ordering::Greater,
            (None, None) => a.id.0.cmp(&b.id.0),
        });
        Ok(out)
    }

    fn restore_task(&self, id: &Id) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let task = g.tasks.get(id).ok_or_else(|| CoreError::NotFound {
            entity: "task",
            id: id.to_string(),
        })?;
        if task.deleted_at.is_none() {
            return Ok(()); // 已是活动态,no-op
        }
        let task = g.tasks.get_mut(id).unwrap();
        task.deleted_at = None;
        task.revision = task.revision.saturating_add(1);
        g.touch("task", id.as_str(), &self.device_id);
        Ok(())
    }

    fn purge_task(&self, id: &Id) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if g.tasks.remove(id).is_none() {
            return Err(CoreError::NotFound {
                entity: "task",
                id: id.to_string(),
            });
        }
        g.task_tags.remove(id);
        g.task_tag_meta.remove(id);
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

    fn upsert_project(&self, mut project: Project) -> CoreResult<Project> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if project.user_id.is_nil() {
            project.user_id = self.user_id.clone();
        }
        g.touch("project", project.id.as_str(), &self.device_id);
        g.projects.insert(project.id.clone(), project.clone());
        Ok(project)
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
        let mut touched_projects: Vec<String> = Vec::new();
        let mut touched_tasks: Vec<String> = Vec::new();
        let mut touched_pomodoros: Vec<String> = Vec::new();
        for pid in &subtree {
            if let Some(p) = g.projects.get_mut(pid) {
                p.deleted_at = Some(now);
                p.revision = p.revision.saturating_add(1);
                touched_projects.push(pid.as_str().to_string());
            }
            for t in g.tasks.values_mut() {
                if t.project_id.as_ref() == Some(pid) {
                    t.project_id = None;
                    t.revision = t.revision.saturating_add(1);
                    touched_tasks.push(t.id.as_str().to_string());
                }
            }
            for s in g.pomodoros.values_mut() {
                if s.project_id.as_ref() == Some(pid) {
                    s.project_id = None;
                    s.revision = s.revision.saturating_add(1);
                    touched_pomodoros.push(s.id.as_str().to_string());
                }
            }
        }
        for k in touched_projects {
            g.touch("project", &k, &self.device_id);
        }
        for k in touched_tasks {
            g.touch("task", &k, &self.device_id);
        }
        for k in touched_pomodoros {
            g.touch("pomodoro_session", &k, &self.device_id);
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
                g.touch("project", it.id.as_str(), &self.device_id);
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

    fn upsert_tag(&self, mut tag: Tag) -> CoreResult<Tag> {
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
        if tag.user_id.is_nil() {
            tag.user_id = self.user_id.clone();
        }
        g.touch("tag", tag.id.as_str(), &self.device_id);
        g.tags.insert(tag.id.clone(), tag.clone());
        Ok(tag)
    }

    fn delete_tag(&self, id: &Id) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if let Some(t) = g.tags.get_mut(id) {
            t.deleted_at = Some(crate::model::Timestamp::now());
            t.revision = t.revision.saturating_add(1);
            g.touch("tag", id.as_str(), &self.device_id);
        }
        // 与 SqliteStore 对齐:清掉 task_tags 关联(此前靠 list_tags_for_task
        // 过滤掩盖,两实现行为不一致;2026-09-14 修)
        for ids in g.task_tags.values_mut() {
            ids.retain(|t| t != id);
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
                g.touch("tag", it.id.as_str(), &self.device_id);
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
        // 排序去重:同集合 → 同载荷,消除顺序抖动(与 SqliteStore 同规格)
        let mut sorted: Vec<Id> = tag_ids.to_vec();
        sorted.sort_by(|a, b| a.0.cmp(&b.0));
        sorted.dedup_by(|a, b| a.0 == b.0);
        // 同步元信息:空集合且无历史行 → 不建行(不给没打过标签的任务造噪音)
        let has = g.task_tag_meta.contains_key(task_id);
        if !sorted.is_empty() || has {
            let (rev, _) = g
                .task_tag_meta
                .get(task_id)
                .cloned()
                .unwrap_or((0, Timestamp::now()));
            g.task_tag_meta
                .insert(task_id.clone(), (rev + 1, Timestamp::now()));
            g.touch("task_tag", task_id.as_str(), &self.device_id);
        }
        if sorted.is_empty() {
            g.task_tags.remove(task_id);
        } else {
            g.task_tags.insert(task_id.clone(), sorted);
        }
        Ok(())
    }

    fn get_pomodoro(&self, id: &Id) -> CoreResult<PomodoroSession> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        g.pomodoros
            .get(id)
            .cloned()
            .ok_or_else(|| CoreError::NotFound {
                entity: "pomodoro_session",
                id: id.to_string(),
            })
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

    fn count_pomodoros(&self) -> CoreResult<u64> {
        // counts 口径(v1 过滤:已完成 && 绑任务 && 未软删;stats 模块注释 §1)
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        Ok(g.pomodoros
            .values()
            .filter(|s| s.deleted_at.is_none() && s.is_completed && s.task_id.is_some())
            .count() as u64)
    }

    fn upsert_pomodoro(&self, mut session: PomodoroSession) -> CoreResult<PomodoroSession> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if session.user_id.is_nil() {
            session.user_id = self.user_id.clone();
        }
        g.touch("pomodoro_session", session.id.as_str(), &self.device_id);
        g.pomodoros.insert(session.id.clone(), session.clone());
        Ok(session)
    }

    fn delete_pomodoro(&self, id: &Id) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if let Some(s) = g.pomodoros.get_mut(id) {
            s.deleted_at = Some(crate::model::Timestamp::now());
            s.revision = s.revision.saturating_add(1);
            g.touch("pomodoro_session", id.as_str(), &self.device_id);
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

    fn upsert_daily_review(&self, mut review: DailyReview) -> CoreResult<DailyReview> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if review.user_id.is_nil() {
            review.user_id = self.user_id.clone();
        }
        // pending 写入:revision 存储管理(插入 1 / 更新 +1,ADR-010)
        review.revision = g
            .daily_reviews
            .get(&review.date)
            .map(|r| r.revision + 1)
            .unwrap_or(1);
        g.touch("daily_review", &review.date, &self.device_id);
        g.daily_reviews.insert(review.date.clone(), review.clone());
        Ok(review)
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
        // ADR-010:删除 = content='' 的 upsert(变更可同步)
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        match g.daily_reviews.get_mut(date) {
            Some(r) => {
                r.content = String::new();
                r.revision += 1;
                r.updated_at = crate::model::Timestamp::now();
            }
            None => {
                g.daily_reviews.insert(
                    date.to_string(),
                    DailyReview {
                        id: Id::new(),
                        user_id: self.user_id.clone(),
                        date: date.to_string(),
                        content: String::new(),
                        revision: 1,
                        deleted_at: None,
                        updated_at: crate::model::Timestamp::now(),
                    },
                );
            }
        }
        g.touch("daily_review", date, &self.device_id);
        Ok(())
    }

    fn get_weekly_review(&self, week_start: &str) -> CoreResult<Option<WeeklyReview>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        Ok(g.weekly_reviews.get(week_start).cloned())
    }

    fn upsert_weekly_review(&self, mut review: WeeklyReview) -> CoreResult<WeeklyReview> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if review.user_id.is_nil() {
            review.user_id = self.user_id.clone();
        }
        review.revision = g
            .weekly_reviews
            .get(&review.week_start)
            .map(|r| r.revision + 1)
            .unwrap_or(1);
        g.touch("weekly_review", &review.week_start, &self.device_id);
        g.weekly_reviews
            .insert(review.week_start.clone(), review.clone());
        Ok(review)
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
        // ADR-010:删除 = content='' 的 upsert(同 delete_daily_review)
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        match g.weekly_reviews.get_mut(week_start) {
            Some(r) => {
                r.content = String::new();
                r.revision += 1;
                r.updated_at = crate::model::Timestamp::now();
            }
            None => {
                g.weekly_reviews.insert(
                    week_start.to_string(),
                    WeeklyReview {
                        id: Id::new(),
                        user_id: self.user_id.clone(),
                        week_start: week_start.to_string(),
                        content: String::new(),
                        revision: 1,
                        deleted_at: None,
                        updated_at: crate::model::Timestamp::now(),
                    },
                );
            }
        }
        g.touch("weekly_review", week_start, &self.device_id);
        Ok(())
    }

    fn get_monthly_review(&self, year_month: &str) -> CoreResult<Option<MonthlyReview>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        Ok(g.monthly_reviews.get(year_month).cloned())
    }

    fn upsert_monthly_review(&self, mut review: MonthlyReview) -> CoreResult<MonthlyReview> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if review.user_id.is_nil() {
            review.user_id = self.user_id.clone();
        }
        review.revision = g
            .monthly_reviews
            .get(&review.year_month)
            .map(|r| r.revision + 1)
            .unwrap_or(1);
        g.touch("monthly_review", &review.year_month, &self.device_id);
        g.monthly_reviews
            .insert(review.year_month.clone(), review.clone());
        Ok(review)
    }

    fn delete_monthly_review(&self, year_month: &str) -> CoreResult<()> {
        // ADR-010:删除 = content='' 的 upsert(同 delete_daily_review)
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        match g.monthly_reviews.get_mut(year_month) {
            Some(r) => {
                r.content = String::new();
                r.revision += 1;
                r.updated_at = crate::model::Timestamp::now();
            }
            None => {
                g.monthly_reviews.insert(
                    year_month.to_string(),
                    MonthlyReview {
                        id: Id::new(),
                        user_id: self.user_id.clone(),
                        year_month: year_month.to_string(),
                        content: String::new(),
                        revision: 1,
                        deleted_at: None,
                        updated_at: crate::model::Timestamp::now(),
                    },
                );
            }
        }
        g.touch("monthly_review", year_month, &self.device_id);
        Ok(())
    }

    fn get_yearly_review(&self, year: &str) -> CoreResult<Option<YearlyReview>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        Ok(g.yearly_reviews.get(year).cloned())
    }

    fn upsert_yearly_review(&self, mut review: YearlyReview) -> CoreResult<YearlyReview> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if review.user_id.is_nil() {
            review.user_id = self.user_id.clone();
        }
        review.revision = g
            .yearly_reviews
            .get(&review.year)
            .map(|r| r.revision + 1)
            .unwrap_or(1);
        g.touch("yearly_review", &review.year, &self.device_id);
        g.yearly_reviews.insert(review.year.clone(), review.clone());
        Ok(review)
    }

    fn delete_yearly_review(&self, year: &str) -> CoreResult<()> {
        // ADR-010:删除 = content='' 的 upsert(同 delete_daily_review)
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        match g.yearly_reviews.get_mut(year) {
            Some(r) => {
                r.content = String::new();
                r.revision += 1;
                r.updated_at = crate::model::Timestamp::now();
            }
            None => {
                g.yearly_reviews.insert(
                    year.to_string(),
                    YearlyReview {
                        id: Id::new(),
                        user_id: self.user_id.clone(),
                        year: year.to_string(),
                        content: String::new(),
                        revision: 1,
                        deleted_at: None,
                        updated_at: crate::model::Timestamp::now(),
                    },
                );
            }
        }
        g.touch("yearly_review", year, &self.device_id);
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

    fn upsert_subtask(&self, mut subtask: SubTask) -> CoreResult<SubTask> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if subtask.user_id.is_nil() {
            subtask.user_id = self.user_id.clone();
        }
        g.touch("sub_task", subtask.id.as_str(), &self.device_id);
        g.subtasks.insert(subtask.id.clone(), subtask.clone());
        Ok(subtask)
    }

    fn delete_subtask(&self, id: &Id) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if let Some(s) = g.subtasks.get_mut(id) {
            s.deleted_at = Some(crate::model::Timestamp::now());
            s.revision = s.revision.saturating_add(1);
            g.touch("sub_task", id.as_str(), &self.device_id);
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

    fn upsert_motto(&self, mut motto: Motto) -> CoreResult<Motto> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if motto.user_id.is_nil() {
            motto.user_id = self.user_id.clone();
        }
        g.touch("motto", motto.id.as_str(), &self.device_id);
        g.mottos.insert(motto.id.clone(), motto.clone());
        Ok(motto)
    }

    fn delete_motto(&self, id: &Id) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if let Some(m) = g.mottos.get_mut(id) {
            m.deleted_at = Some(crate::model::Timestamp::now());
            m.revision = m.revision.saturating_add(1);
            g.touch("motto", id.as_str(), &self.device_id);
        }
        Ok(())
    }

    fn get_journal(&self, id: &Id) -> CoreResult<Journal> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        g.journals
            .get(id)
            .cloned()
            .ok_or_else(|| CoreError::NotFound {
                entity: "journal",
                id: id.to_string(),
            })
    }

    fn list_journals(&self) -> CoreResult<Vec<Journal>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let mut out: Vec<Journal> = g
            .journals
            .values()
            .filter(|j| j.deleted_at.is_none())
            .cloned()
            .collect();
        out.sort_by_key(|j| j.created_at.0);
        Ok(out)
    }

    fn upsert_journal(&self, mut journal: Journal) -> CoreResult<Journal> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if journal.user_id.is_nil() {
            journal.user_id = self.user_id.clone();
        }
        g.touch("journal", journal.id.as_str(), &self.device_id);
        g.journals.insert(journal.id.clone(), journal.clone());
        Ok(journal)
    }

    fn delete_journal(&self, id: &Id) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        if let Some(j) = g.journals.get_mut(id) {
            j.deleted_at = Some(crate::model::Timestamp::now());
            j.revision = j.revision.saturating_add(1);
            g.touch("journal", id.as_str(), &self.device_id);
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
            // 按 started_at 分桶(与 SqliteStore / stats 一致)
            let started_ms = s.started_at.timestamp_millis();
            if started_ms >= start_ms && started_ms < end_ms {
                total = total.saturating_add(s.duration as u64);
            }
        }
        u32::try_from(total).map_err(|_| CoreError::storage("today minutes overflow"))
    }

    fn insert_conflict(&self, record: ConflictRecord) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        g.conflicts.push(record);
        Ok(())
    }

    fn list_recent_conflicts(&self, limit: usize) -> CoreResult<Vec<ConflictRecord>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let mut recent: Vec<ConflictRecord> =
            g.conflicts.iter().rev().take(limit).cloned().collect();
        recent.reverse();
        Ok(recent)
    }

    fn clear_conflicts(&self) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        g.conflicts.clear();
        Ok(())
    }

    fn trim_conflicts(&self, cutoff_ms: i64) -> CoreResult<usize> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let before = g.conflicts.len();
        g.conflicts.retain(|r| r.occurred_at_ms >= cutoff_ms);
        Ok(before - g.conflicts.len())
    }

    fn count_conflicts(&self) -> CoreResult<usize> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        Ok(g.conflicts.len())
    }
}

// === InMemoryStore 的同步语义(e2e 闭环用,与 SqliteStore 行为对齐) ==========

/// EntityKind serde 名(与 Inner.pending/origin 的键前缀一致)。
fn kind_str(k: EntityKind) -> &'static str {
    match k {
        EntityKind::Task => "task",
        EntityKind::Project => "project",
        EntityKind::Tag => "tag",
        EntityKind::SubTask => "sub_task",
        EntityKind::PomodoroSession => "pomodoro_session",
        EntityKind::Motto => "motto",
        EntityKind::Journal => "journal",
        EntityKind::TaskTag => "task_tag",
        EntityKind::DailyReview => "daily_review",
        EntityKind::WeeklyReview => "weekly_review",
        EntityKind::MonthlyReview => "monthly_review",
        EntityKind::YearlyReview => "yearly_review",
    }
}

fn cand<E: SyncEntity>(e: &E, kind: &str, id: &str, g: &Inner, device: &str) -> CoreResult<Change> {
    change_of(e, g.origin_of(kind, id), device)
}

impl ChangeLogStore for InMemoryStore {
    fn list_pending(&self, limit: usize) -> CoreResult<Vec<Change>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        let mut out: Vec<Change> = Vec::new();
        macro_rules! collect {
            ($map:expr, $kind:literal, $key:ident) => {
                for e in $map.values() {
                    if out.len() >= limit {
                        break;
                    }
                    let key = e.$key.to_string();
                    if !g.pending.contains(&format!("{}/{}", $kind, key)) {
                        continue;
                    }
                    out.push(cand(e, $kind, &key, &g, &self.device_id)?);
                }
            };
        }
        collect!(g.tasks, "task", id);
        collect!(g.projects, "project", id);
        collect!(g.tags, "tag", id);
        collect!(g.subtasks, "sub_task", id);
        collect!(g.pomodoros, "pomodoro_session", id);
        collect!(g.mottos, "motto", id);
        collect!(g.journals, "journal", id);
        collect!(g.daily_reviews, "daily_review", date);
        collect!(g.weekly_reviews, "weekly_review", week_start);
        collect!(g.monthly_reviews, "monthly_review", year_month);
        // task_tag:以 task_id 为键,载荷 = 当前 tag 集合(task_tags 写入侧已排序
        // 去重;空集合 = 清除 tombstone,ADR-010)
        for (task_id, (rev, upd)) in g.task_tag_meta.iter() {
            if out.len() >= limit {
                break;
            }
            if !g
                .pending
                .contains(&format!("task_tag/{}", task_id.as_str()))
            {
                continue;
            }
            let link = TaskTagLink {
                task_id: task_id.clone(),
                tag_ids: g.task_tags.get(task_id).cloned().unwrap_or_default(),
                user_id: self.user_id.clone(),
                revision: *rev,
                updated_at: *upd,
            };
            out.push(cand(
                &link,
                "task_tag",
                task_id.as_str(),
                &g,
                &self.device_id,
            )?);
        }
        out.sort_by_key(|c| c.updated_at);
        Ok(out)
    }

    fn apply_remote(&self, change: &Change) -> CoreResult<()> {
        let kind = kind_str(change.entity);
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        macro_rules! decode {
            ($t:ty) => {{
                let mut e: $t = serde_json::from_value(change.payload.clone())
                    .map_err(|e| CoreError::Validation(format!("apply_remote payload: {e}")))?;
                if e.user_id.is_nil() {
                    e.user_id = self.user_id.clone();
                }
                e
            }};
        }
        // 远端已裁定胜出:按权威载荷原样落库(revision 不 bump),settle pending
        match change.entity {
            EntityKind::Task => {
                let e = decode!(Task);
                g.tasks.insert(e.id.clone(), e);
            }
            EntityKind::Project => {
                let e = decode!(Project);
                g.projects.insert(e.id.clone(), e);
            }
            EntityKind::Tag => {
                let e = decode!(Tag);
                g.tags.insert(e.id.clone(), e);
            }
            EntityKind::SubTask => {
                let e = decode!(SubTask);
                g.subtasks.insert(e.id.clone(), e);
            }
            EntityKind::PomodoroSession => {
                let e = decode!(PomodoroSession);
                g.pomodoros.insert(e.id.clone(), e);
            }
            EntityKind::Motto => {
                let e = decode!(Motto);
                g.mottos.insert(e.id.clone(), e);
            }
            EntityKind::Journal => {
                let e = decode!(Journal);
                g.journals.insert(e.id.clone(), e);
            }
            EntityKind::DailyReview => {
                let e = decode!(DailyReview);
                g.daily_reviews.insert(e.date.clone(), e);
            }
            EntityKind::WeeklyReview => {
                let e = decode!(WeeklyReview);
                g.weekly_reviews.insert(e.week_start.clone(), e);
            }
            EntityKind::MonthlyReview => {
                let e = decode!(MonthlyReview);
                g.monthly_reviews.insert(e.year_month.clone(), e);
            }
            EntityKind::YearlyReview => {
                let e = decode!(YearlyReview);
                g.yearly_reviews.insert(e.year.clone(), e);
            }
            // 关联实体:按权威载荷原样落库(revision 不 bump),settle pending
            EntityKind::TaskTag => {
                let mut e = decode!(TaskTagLink);
                let mut sorted = e.tag_ids.clone();
                sorted.sort_by(|a, b| a.0.cmp(&b.0));
                sorted.dedup_by(|a, b| a.0 == b.0);
                e.tag_ids = sorted;
                g.task_tag_meta
                    .insert(e.task_id.clone(), (e.revision, e.updated_at));
                if e.tag_ids.is_empty() {
                    g.task_tags.remove(&e.task_id);
                } else {
                    g.task_tags.insert(e.task_id.clone(), e.tag_ids.clone());
                }
            }
        }
        g.settle(kind, &change.entity_id);
        g.origin.insert(
            format!("{kind}/{}", change.entity_id),
            change.device_id.clone(),
        );
        Ok(())
    }

    fn mark_synced(&self, keys: &[(EntityKind, String)]) -> CoreResult<()> {
        let mut g = self
            .inner
            .write()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        for (kind, key) in keys {
            g.settle(kind_str(*kind), key);
        }
        Ok(())
    }

    fn local_candidate(&self, kind: EntityKind, id: &str) -> CoreResult<Option<Change>> {
        let g = self
            .inner
            .read()
            .map_err(|e| CoreError::storage(e.to_string()))?;
        macro_rules! probe {
            ($map:expr, $kind:literal, $key:expr) => {
                match $key.and_then(|k| $map.get(k)) {
                    Some(e) => Some(cand(e, $kind, id, &g, &self.device_id)?),
                    None => None,
                }
            };
        }
        Ok(match kind {
            EntityKind::Task => probe!(g.tasks, "task", Id::parse(id).as_ref()),
            EntityKind::Project => probe!(g.projects, "project", Id::parse(id).as_ref()),
            EntityKind::Tag => probe!(g.tags, "tag", Id::parse(id).as_ref()),
            EntityKind::SubTask => probe!(g.subtasks, "sub_task", Id::parse(id).as_ref()),
            EntityKind::PomodoroSession => {
                probe!(g.pomodoros, "pomodoro_session", Id::parse(id).as_ref())
            }
            EntityKind::Motto => probe!(g.mottos, "motto", Id::parse(id).as_ref()),
            EntityKind::Journal => probe!(g.journals, "journal", Id::parse(id).as_ref()),
            EntityKind::DailyReview => probe!(g.daily_reviews, "daily_review", Some(id)),
            EntityKind::WeeklyReview => probe!(g.weekly_reviews, "weekly_review", Some(id)),
            EntityKind::MonthlyReview => probe!(g.monthly_reviews, "monthly_review", Some(id)),
            EntityKind::YearlyReview => probe!(g.yearly_reviews, "yearly_review", Some(id)),
            EntityKind::TaskTag => {
                match Id::parse(id).and_then(|k| g.task_tag_meta.get(&k).map(|m| (k, m.0, m.1))) {
                    Some((task_id, rev, upd)) => {
                        let tag_ids = g.task_tags.get(&task_id).cloned().unwrap_or_default();
                        let link = TaskTagLink {
                            task_id,
                            tag_ids,
                            user_id: self.user_id.clone(),
                            revision: rev,
                            updated_at: upd,
                        };
                        Some(cand(&link, "task_tag", id, &g, &self.device_id)?)
                    }
                    None => None,
                }
            }
        })
    }
}
