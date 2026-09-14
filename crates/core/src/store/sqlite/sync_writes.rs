//! 同步写入内核:upsert_*_marked(pending/synced 双态落库)。
//! (2026-09-15 巨石拆分:自 store/sqlite.rs 按域切出,内容零改动)

use super::*;

impl SqliteStore {
    /// pending=true:本地写入(sync_state='pending' 待推送);
    /// false:apply_remote 落权威快照(sync_state='synced',revision 原样)。
    pub(super) fn upsert_task_marked(&self, task: Task, pending: bool) -> CoreResult<Task> {
        let task = self.stamp(task);
        let mark = if pending { "pending" } else { "synced" };
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO tasks (
                id, user_id, title, description, project_id, priority, status,
                due_date_ms, estimated_pomodoros, completed_pomodoros, pomodoro_duration,
                reminder, repeat_kind, repeat_config, repeat_parent_id, repeat_end_date_ms,
                completed_at_ms, created_at_ms,
                revision, deleted_at_ms, updated_at_ms, sync_state, origin_device
             ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET
                title=excluded.title,
                description=excluded.description,
                project_id=excluded.project_id,
                priority=excluded.priority,
                status=excluded.status,
                due_date_ms=excluded.due_date_ms,
                estimated_pomodoros=excluded.estimated_pomodoros,
                completed_pomodoros=excluded.completed_pomodoros,
                pomodoro_duration=excluded.pomodoro_duration,
                reminder=excluded.reminder,
                repeat_kind=excluded.repeat_kind,
                repeat_config=excluded.repeat_config,
                repeat_parent_id=excluded.repeat_parent_id,
                repeat_end_date_ms=excluded.repeat_end_date_ms,
                completed_at_ms=excluded.completed_at_ms,
                created_at_ms=excluded.created_at_ms,
                revision=excluded.revision,
                deleted_at_ms=excluded.deleted_at_ms,
                updated_at_ms=excluded.updated_at_ms,
                user_id=excluded.user_id, sync_state=excluded.sync_state,
                origin_device=excluded.origin_device",
            params![
                task.id.as_str(),
                task.user_id.as_str(),
                task.title,
                task.description,
                task.project_id.as_ref().map(|p| p.as_str().to_string()),
                priority_str(task.priority),
                task_status_str(task.status),
                task.due_date.map(dt_to_ms),
                task.estimated_pomodoros as i64,
                task.completed_pomodoros as i64,
                task.pomodoro_duration.map(|v| v as i64),
                reminder_str(task.reminder),
                repeat_str(task.repeat),
                task.repeat_config,
                task.repeat_parent_id
                    .as_ref()
                    .map(|p| p.as_str().to_string()),
                task.repeat_end_date.map(dt_to_ms),
                task.completed_at.map(dt_to_ms),
                ts_to_ms(task.created_at),
                task.revision as i64,
                task.deleted_at.map(ts_to_ms),
                ts_to_ms(task.updated_at),
                mark,
                self.device_id,
            ],
        )
        .map_err(|e| CoreError::storage(format!("upsert_task: {e}")))?;
        Ok(task)
    }

    pub(super) fn upsert_project_marked(
        &self,
        project: Project,
        pending: bool,
    ) -> CoreResult<Project> {
        let project = self.stamp(project);
        let mark = if pending { "pending" } else { "synced" };
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO projects
                (id, user_id, name, color, parent_id, display_order, created_at_ms,
                 revision, deleted_at_ms, updated_at_ms, sync_state, origin_device)
             VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET
                name=excluded.name, color=excluded.color, parent_id=excluded.parent_id,
                display_order=excluded.display_order, created_at_ms=excluded.created_at_ms,
                revision=excluded.revision, deleted_at_ms=excluded.deleted_at_ms,
                updated_at_ms=excluded.updated_at_ms,
                user_id=excluded.user_id, sync_state=excluded.sync_state,
                origin_device=excluded.origin_device",
            params![
                project.id.as_str(),
                project.user_id.as_str(),
                project.name,
                project.color,
                project.parent_id.as_ref().map(|p| p.as_str().to_string()),
                project.display_order as i64,
                ts_to_ms(project.created_at),
                project.revision as i64,
                project.deleted_at.map(ts_to_ms),
                ts_to_ms(project.updated_at),
                mark,
                self.device_id,
            ],
        )
        .map_err(|e| CoreError::storage(format!("upsert_project: {e}")))?;
        Ok(project)
    }

    pub(super) fn upsert_tag_marked(&self, tag: Tag, pending: bool) -> CoreResult<Tag> {
        let tag = self.stamp(tag);
        let mark = if pending { "pending" } else { "synced" };
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO tags
                (id, user_id, name, color, display_order, created_at_ms,
                 revision, deleted_at_ms, updated_at_ms, sync_state, origin_device)
             VALUES (?,?,?,?,?,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET
                name=excluded.name, color=excluded.color,
                display_order=excluded.display_order, created_at_ms=excluded.created_at_ms,
                revision=excluded.revision,
                deleted_at_ms=excluded.deleted_at_ms, updated_at_ms=excluded.updated_at_ms,
                user_id=excluded.user_id, sync_state=excluded.sync_state,
                origin_device=excluded.origin_device",
            params![
                tag.id.as_str(),
                tag.user_id.as_str(),
                tag.name,
                tag.color,
                tag.display_order as i64,
                ts_to_ms(tag.created_at),
                tag.revision as i64,
                tag.deleted_at.map(ts_to_ms),
                ts_to_ms(tag.updated_at),
                mark,
                self.device_id,
            ],
        )
        .map_err(|e| CoreError::storage(format!("upsert_tag: {e}")))?;
        Ok(tag)
    }

    pub(super) fn upsert_subtask_marked(
        &self,
        subtask: SubTask,
        pending: bool,
    ) -> CoreResult<SubTask> {
        let subtask = self.stamp(subtask);
        let mark = if pending { "pending" } else { "synced" };
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO subtasks
              (id, user_id, task_id, title, is_completed, position, created_at_ms,
               revision, deleted_at_ms, updated_at_ms, sync_state, origin_device)
             VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET
                task_id=excluded.task_id,
                title=excluded.title,
                is_completed=excluded.is_completed,
                position=excluded.position,
                created_at_ms=excluded.created_at_ms,
                revision=excluded.revision,
                deleted_at_ms=excluded.deleted_at_ms,
                updated_at_ms=excluded.updated_at_ms,
                user_id=excluded.user_id, sync_state=excluded.sync_state,
                origin_device=excluded.origin_device",
            params![
                subtask.id.as_str(),
                subtask.user_id.as_str(),
                subtask.task_id.as_str(),
                subtask.title,
                subtask.is_completed as i64,
                subtask.position as i64,
                ts_to_ms(subtask.created_at),
                subtask.revision as i64,
                subtask.deleted_at.map(ts_to_ms),
                ts_to_ms(subtask.updated_at),
                mark,
                self.device_id,
            ],
        )
        .map_err(|e| CoreError::storage(format!("upsert_subtask: {e}")))?;
        Ok(subtask)
    }

    pub(super) fn upsert_pomodoro_marked(
        &self,
        session: PomodoroSession,
        pending: bool,
    ) -> CoreResult<PomodoroSession> {
        let session = self.stamp(session);
        let mark = if pending { "pending" } else { "synced" };
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO pomodoros (
                id, user_id, task_id, project_id, duration_minutes,
                started_at_ms, ended_at_ms, is_completed, created_at_ms,
                revision, deleted_at_ms, updated_at_ms, sync_state, origin_device
             ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET
                task_id=excluded.task_id, project_id=excluded.project_id,
                duration_minutes=excluded.duration_minutes,
                started_at_ms=excluded.started_at_ms, ended_at_ms=excluded.ended_at_ms,
                is_completed=excluded.is_completed, created_at_ms=excluded.created_at_ms,
                revision=excluded.revision, deleted_at_ms=excluded.deleted_at_ms,
                updated_at_ms=excluded.updated_at_ms,
                user_id=excluded.user_id, sync_state=excluded.sync_state,
                origin_device=excluded.origin_device",
            params![
                session.id.as_str(),
                session.user_id.as_str(),
                session.task_id.as_ref().map(|t| t.as_str().to_string()),
                session.project_id.as_ref().map(|p| p.as_str().to_string()),
                session.duration as i64,
                dt_to_ms(session.started_at),
                dt_to_ms(session.ended_at),
                session.is_completed as i64,
                ts_to_ms(session.created_at),
                session.revision as i64,
                session.deleted_at.map(ts_to_ms),
                ts_to_ms(session.updated_at),
                mark,
                self.device_id,
            ],
        )
        .map_err(|e| CoreError::storage(format!("upsert_pomodoro: {e}")))?;
        Ok(session)
    }

    pub(super) fn upsert_motto_marked(&self, motto: Motto, pending: bool) -> CoreResult<Motto> {
        let motto = self.stamp(motto);
        let mark = if pending { "pending" } else { "synced" };
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO mottos
              (id, user_id, text, author, created_at_ms,
               revision, deleted_at_ms, updated_at_ms, sync_state, origin_device)
             VALUES (?,?,?,?,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET
                text=excluded.text,
                author=excluded.author,
                created_at_ms=excluded.created_at_ms,
                revision=excluded.revision,
                deleted_at_ms=excluded.deleted_at_ms,
                updated_at_ms=excluded.updated_at_ms,
                user_id=excluded.user_id, sync_state=excluded.sync_state,
                origin_device=excluded.origin_device",
            params![
                motto.id.as_str(),
                motto.user_id.as_str(),
                motto.text,
                motto.author,
                ts_to_ms(motto.created_at),
                motto.revision as i64,
                motto.deleted_at.map(ts_to_ms),
                ts_to_ms(motto.updated_at),
                mark,
                self.device_id,
            ],
        )
        .map_err(|e| CoreError::storage(format!("upsert_motto: {e}")))?;
        Ok(motto)
    }

    /// 手账 marked 写入(pending 本地 / synced 远端权威)。
    pub(super) fn upsert_journal_marked(
        &self,
        journal: Journal,
        pending: bool,
    ) -> CoreResult<Journal> {
        let journal = self.stamp(journal);
        let mark = if pending { "pending" } else { "synced" };
        let tags_csv = journal.tags.join(",");
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO journals
              (id, user_id, kind, status, title, content, tags_csv, created_at_ms,
               revision, deleted_at_ms, updated_at_ms, sync_state, origin_device)
             VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET
                kind=excluded.kind,
                status=excluded.status,
                title=excluded.title,
                content=excluded.content,
                tags_csv=excluded.tags_csv,
                created_at_ms=excluded.created_at_ms,
                revision=excluded.revision,
                deleted_at_ms=excluded.deleted_at_ms,
                updated_at_ms=excluded.updated_at_ms,
                user_id=excluded.user_id, sync_state=excluded.sync_state,
                origin_device=excluded.origin_device",
            params![
                journal.id.as_str(),
                journal.user_id.as_str(),
                journal.kind,
                task_status_str(journal.status),
                journal.title,
                journal.content,
                tags_csv,
                ts_to_ms(journal.created_at),
                journal.revision as i64,
                journal.deleted_at.map(ts_to_ms),
                ts_to_ms(journal.updated_at),
                mark,
                self.device_id,
            ],
        )
        .map_err(|e| CoreError::storage(format!("upsert_journal: {e}")))?;
        Ok(journal)
    }

    /// 复盘族 marked 写入。pending 路径 revision 由存储管理(插入 1、更新 +1);
    /// remote 路径按权威载荷原样落库(ADR-010)。
    pub(super) fn upsert_daily_review_marked(
        &self,
        review: DailyReview,
        pending: bool,
    ) -> CoreResult<DailyReview> {
        let review = self.stamp(review);
        let conn = self.lock()?;
        if pending {
            conn.execute(
                "INSERT INTO daily_reviews
                    (id, user_id, date, content, revision, updated_at_ms, sync_state, origin_device)
                 VALUES (?, ?, ?, ?, 1, ?, 'pending', ?)
                 ON CONFLICT(date) DO UPDATE SET
                    content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                    revision = revision + 1, user_id=excluded.user_id,
                    sync_state='pending', origin_device=excluded.origin_device",
                params![
                    review.id.as_str(),
                    review.user_id.as_str(),
                    review.date,
                    review.content,
                    ts_to_ms(review.updated_at),
                    self.device_id
                ],
            )
        } else {
            conn.execute(
                "INSERT INTO daily_reviews
                    (id, user_id, date, content, revision, updated_at_ms, sync_state, origin_device)
                 VALUES (?, ?, ?, ?, ?, ?, 'synced', ?)
                 ON CONFLICT(date) DO UPDATE SET
                    content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                    revision=excluded.revision, user_id=excluded.user_id,
                    sync_state='synced', origin_device=excluded.origin_device",
                params![
                    review.id.as_str(),
                    review.user_id.as_str(),
                    review.date,
                    review.content,
                    review.revision as i64,
                    ts_to_ms(review.updated_at),
                    self.device_id
                ],
            )
        }
        .map_err(|e| CoreError::storage(format!("upsert_daily_review: {e}")))?;
        Ok(review)
    }

    pub(super) fn upsert_weekly_review_marked(
        &self,
        review: WeeklyReview,
        pending: bool,
    ) -> CoreResult<WeeklyReview> {
        let review = self.stamp(review);
        let conn = self.lock()?;
        if pending {
            conn.execute(
                "INSERT INTO weekly_reviews
                    (id, user_id, week_start, content, revision, updated_at_ms, sync_state, origin_device)
                 VALUES (?, ?, ?, ?, 1, ?, 'pending', ?)
                 ON CONFLICT(week_start) DO UPDATE SET
                    content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                    revision = revision + 1, user_id=excluded.user_id,
                    sync_state='pending', origin_device=excluded.origin_device",
                params![
                    review.id.as_str(),
                    review.user_id.as_str(),
                    review.week_start,
                    review.content,
                    ts_to_ms(review.updated_at),
                    self.device_id
                ],
            )
        } else {
            conn.execute(
                "INSERT INTO weekly_reviews
                    (id, user_id, week_start, content, revision, updated_at_ms, sync_state, origin_device)
                 VALUES (?, ?, ?, ?, ?, ?, 'synced', ?)
                 ON CONFLICT(week_start) DO UPDATE SET
                    content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                    revision=excluded.revision, user_id=excluded.user_id,
                    sync_state='synced', origin_device=excluded.origin_device",
                params![
                    review.id.as_str(),
                    review.user_id.as_str(),
                    review.week_start,
                    review.content,
                    review.revision as i64,
                    ts_to_ms(review.updated_at),
                    self.device_id
                ],
            )
        }
        .map_err(|e| CoreError::storage(format!("upsert_weekly_review: {e}")))?;
        Ok(review)
    }

    pub(super) fn upsert_monthly_review_marked(
        &self,
        review: MonthlyReview,
        pending: bool,
    ) -> CoreResult<MonthlyReview> {
        let review = self.stamp(review);
        let conn = self.lock()?;
        if pending {
            conn.execute(
                "INSERT INTO monthly_reviews
                    (id, user_id, year_month, content, revision, updated_at_ms, sync_state, origin_device)
                 VALUES (?, ?, ?, ?, 1, ?, 'pending', ?)
                 ON CONFLICT(year_month) DO UPDATE SET
                    content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                    revision = revision + 1, user_id=excluded.user_id,
                    sync_state='pending', origin_device=excluded.origin_device",
                params![
                    review.id.as_str(),
                    review.user_id.as_str(),
                    review.year_month,
                    review.content,
                    ts_to_ms(review.updated_at),
                    self.device_id
                ],
            )
        } else {
            conn.execute(
                "INSERT INTO monthly_reviews
                    (id, user_id, year_month, content, revision, updated_at_ms, sync_state, origin_device)
                 VALUES (?, ?, ?, ?, ?, ?, 'synced', ?)
                 ON CONFLICT(year_month) DO UPDATE SET
                    content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                    revision=excluded.revision, user_id=excluded.user_id,
                    sync_state='synced', origin_device=excluded.origin_device",
                params![
                    review.id.as_str(),
                    review.user_id.as_str(),
                    review.year_month,
                    review.content,
                    review.revision as i64,
                    ts_to_ms(review.updated_at),
                    self.device_id
                ],
            )
        }
        .map_err(|e| CoreError::storage(format!("upsert_monthly_review: {e}")))?;
        Ok(review)
    }

    pub(super) fn upsert_yearly_review_marked(
        &self,
        review: YearlyReview,
        pending: bool,
    ) -> CoreResult<YearlyReview> {
        let review = self.stamp(review);
        let conn = self.lock()?;
        if pending {
            conn.execute(
                "INSERT INTO yearly_reviews
                    (id, user_id, year, content, revision, updated_at_ms, sync_state, origin_device)
                 VALUES (?, ?, ?, ?, 1, ?, 'pending', ?)
                 ON CONFLICT(year) DO UPDATE SET
                    content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                    revision = revision + 1, user_id=excluded.user_id,
                    sync_state='pending', origin_device=excluded.origin_device",
                params![
                    review.id.as_str(),
                    review.user_id.as_str(),
                    review.year,
                    review.content,
                    ts_to_ms(review.updated_at),
                    self.device_id
                ],
            )
        } else {
            conn.execute(
                "INSERT INTO yearly_reviews
                    (id, user_id, year, content, revision, updated_at_ms, sync_state, origin_device)
                 VALUES (?, ?, ?, ?, ?, ?, 'synced', ?)
                 ON CONFLICT(year) DO UPDATE SET
                    content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                    revision=excluded.revision, user_id=excluded.user_id,
                    sync_state='synced', origin_device=excluded.origin_device",
                params![
                    review.id.as_str(),
                    review.user_id.as_str(),
                    review.year,
                    review.content,
                    review.revision as i64,
                    ts_to_ms(review.updated_at),
                    self.device_id
                ],
            )
        }
        .map_err(|e| CoreError::storage(format!("upsert_yearly_review: {e}")))?;
        Ok(review)
    }
}
