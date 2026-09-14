//! ChangeLogStore impl:list_pending / apply / mark_synced / candidates。
//! (2026-09-15 巨石拆分:自 store/sqlite.rs 按域切出,内容零改动)

use super::*;

impl ChangeLogStore for SqliteStore {
    fn list_pending(&self, limit: usize) -> CoreResult<Vec<Change>> {
        let conn = self.lock()?;
        let mut out: Vec<Change> = Vec::new();

        macro_rules! scan {
            ($table:literal, $rowfn:ident) => {
                if out.len() < limit {
                    let sql = format!(
                        "SELECT * FROM {} WHERE sync_state = 'pending' \
                         ORDER BY updated_at_ms ASC LIMIT {}",
                        $table,
                        limit - out.len()
                    );
                    let mut stmt = conn.prepare(&sql).map_err(|e| {
                        CoreError::storage(format!("prepare pending {}: {e}", $table))
                    })?;
                    let rows = stmt
                        .query_map([], |row| {
                            let entity = $rowfn(row)?;
                            let origin: String = row.get("origin_device")?;
                            Ok((entity, origin))
                        })
                        .map_err(|e| {
                            CoreError::storage(format!("query pending {}: {e}", $table))
                        })?;
                    for r in rows {
                        let (entity, origin) = r.map_err(|e| {
                            CoreError::storage(format!("row pending {}: {e}", $table))
                        })?;
                        out.push(change_of(&entity, origin, &self.device_id)?);
                    }
                }
            };
        }

        scan!("tasks", row_to_task);
        scan!("projects", row_to_project);
        scan!("tags", row_to_tag);
        scan!("subtasks", row_to_subtask);
        scan!("pomodoros", row_to_pomodoro);
        scan!("mottos", row_to_motto);
        scan!("journals", row_to_journal);
        scan!("daily_reviews", row_to_daily_review);
        scan!("weekly_reviews", row_to_weekly_review);
        scan!("monthly_reviews", row_to_monthly_review);
        scan!("yearly_reviews", row_to_yearly_review);

        // task_tag:关联载荷从 task_tags 现查组装(空集合 = 清除 tombstone,ADR-010)
        if out.len() < limit {
            let sql = format!(
                "SELECT s.task_id, s.revision, s.updated_at_ms, s.origin_device, s.user_id,
                        (SELECT GROUP_CONCAT(tag_id) FROM task_tags WHERE task_id = s.task_id)
                            AS tag_ids
                 FROM task_tag_sync s
                 WHERE s.sync_state = 'pending'
                 ORDER BY s.updated_at_ms ASC LIMIT {}",
                limit - out.len()
            );
            let mut stmt = conn
                .prepare(&sql)
                .map_err(|e| CoreError::storage(format!("prepare pending task_tag_sync: {e}")))?;
            let rows = stmt
                .query_map([], row_to_task_tag_link)
                .map_err(|e| CoreError::storage(format!("query pending task_tag_sync: {e}")))?;
            for r in rows {
                let (link, origin) =
                    r.map_err(|e| CoreError::storage(format!("row pending task_tag_sync: {e}")))?;
                out.push(change_of(&link, origin, &self.device_id)?);
            }
        }
        Ok(out)
    }

    fn apply_remote(&self, change: &Change) -> CoreResult<()> {
        macro_rules! apply {
            ($t:ty, $marked:ident) => {{
                let mut entity: $t = serde_json::from_value(change.payload.clone())
                    .map_err(|e| CoreError::Validation(format!("apply_remote payload: {e}")))?;
                if entity.user_id.is_nil() {
                    entity.user_id = self.user_id.clone();
                }
                self.$marked(entity, false)?;
            }};
        }
        match change.entity {
            EntityKind::Task => apply!(Task, upsert_task_marked),
            EntityKind::Project => apply!(Project, upsert_project_marked),
            EntityKind::Tag => apply!(Tag, upsert_tag_marked),
            EntityKind::SubTask => apply!(SubTask, upsert_subtask_marked),
            EntityKind::PomodoroSession => apply!(PomodoroSession, upsert_pomodoro_marked),
            EntityKind::Motto => apply!(Motto, upsert_motto_marked),
            EntityKind::Journal => apply!(Journal, upsert_journal_marked),
            EntityKind::DailyReview => apply!(DailyReview, upsert_daily_review_marked),
            EntityKind::WeeklyReview => apply!(WeeklyReview, upsert_weekly_review_marked),
            EntityKind::MonthlyReview => apply!(MonthlyReview, upsert_monthly_review_marked),
            EntityKind::YearlyReview => apply!(YearlyReview, upsert_yearly_review_marked),
            // 关联实体走专用内核(键是 task_id,载荷是 tag 集合,非整实体 upsert)
            EntityKind::TaskTag => {
                let mut link: TaskTagLink = serde_json::from_value(change.payload.clone())
                    .map_err(|e| CoreError::Validation(format!("apply_remote payload: {e}")))?;
                if link.user_id.is_nil() {
                    link.user_id = self.user_id.clone();
                }
                let origin = change.device_id.clone();
                self.set_tags_for_task_marked(
                    &link.task_id,
                    &link.tag_ids,
                    link.revision,
                    link.updated_at,
                    &origin,
                    false,
                )?;
            }
        }
        Ok(())
    }

    fn mark_synced(&self, keys: &[(EntityKind, String)]) -> CoreResult<()> {
        let mut by: HashMap<EntityKind, Vec<String>> = HashMap::new();
        for (k, id) in keys {
            by.entry(*k).or_default().push(id.clone());
        }
        let conn = self.lock()?;
        // 同批 keys 一个事务:此前 N 条 = N 次自动提交(WAL 下虽不再逐次 fsync,
        // 事务开销与中间态暴露仍在)
        let tx = conn
            .unchecked_transaction()
            .map_err(|e| CoreError::storage(format!("begin mark_synced tx: {e}")))?;
        macro_rules! mark {
            ($table:literal, $keycol:literal, $ids:expr) => {{
                let ids = $ids;
                if !ids.is_empty() {
                    let placeholders = std::iter::repeat_n("?", ids.len())
                        .collect::<Vec<_>>()
                        .join(",");
                    let sql = format!(
                        "UPDATE {} SET sync_state = 'synced' WHERE {} IN ({})",
                        $table, $keycol, placeholders
                    );
                    tx.execute(&sql, rusqlite::params_from_iter(ids.iter()))
                        .map_err(|e| CoreError::storage(format!("mark_synced {}: {e}", $table)))?;
                }
            }};
        }
        for (kind, ids) in by {
            match kind {
                EntityKind::Task => mark!("tasks", "id", ids),
                EntityKind::Project => mark!("projects", "id", ids),
                EntityKind::Tag => mark!("tags", "id", ids),
                EntityKind::SubTask => mark!("subtasks", "id", ids),
                EntityKind::PomodoroSession => mark!("pomodoros", "id", ids),
                EntityKind::Motto => mark!("mottos", "id", ids),
                EntityKind::Journal => mark!("journals", "id", ids),
                EntityKind::DailyReview => mark!("daily_reviews", "date", ids),
                EntityKind::WeeklyReview => mark!("weekly_reviews", "week_start", ids),
                EntityKind::MonthlyReview => mark!("monthly_reviews", "year_month", ids),
                EntityKind::YearlyReview => mark!("yearly_reviews", "year", ids),
                EntityKind::TaskTag => mark!("task_tag_sync", "task_id", ids),
            }
        }
        tx.commit()
            .map_err(|e| CoreError::storage(format!("commit mark_synced: {e}")))?;
        Ok(())
    }

    fn local_candidate(&self, kind: EntityKind, id: &str) -> CoreResult<Option<Change>> {
        let conn = self.lock()?;
        self.candidate_of(&conn, kind, id)
    }

    fn local_candidates(&self, keys: &[(EntityKind, String)]) -> CoreResult<Vec<Option<Change>>> {
        // 单锁批量:pull 一批此前逐条查(每条一次锁往返),整批只锁一次(2026-09-14)
        let conn = self.lock()?;
        let mut out = Vec::with_capacity(keys.len());
        for (kind, id) in keys {
            out.push(self.candidate_of(&conn, *kind, id)?);
        }
        Ok(out)
    }
}

impl SqliteStore {
    /// 单条 candidate 探测内核(`local_candidate` / `local_candidates` 共用;
    /// 调用方需已持锁)。
    fn candidate_of(
        &self,
        conn: &Connection,
        kind: EntityKind,
        id: &str,
    ) -> CoreResult<Option<Change>> {
        macro_rules! probe {
            ($table:literal, $keycol:literal, $rowfn:ident) => {{
                let hit = conn
                    .query_row(
                        &format!("SELECT * FROM {} WHERE {} = ?", $table, $keycol),
                        params![id],
                        |row| {
                            let entity = $rowfn(row)?;
                            let origin: String =
                                row.get::<_, String>("origin_device").unwrap_or_default();
                            Ok((entity, origin))
                        },
                    )
                    .optional()
                    .map_err(|e| CoreError::storage(format!("candidate {}: {e}", $table)))?;
                hit.map(|(entity, origin)| change_of(&entity, origin, &self.device_id))
                    .transpose()
            }};
        }
        match kind {
            EntityKind::Task => probe!("tasks", "id", row_to_task),
            EntityKind::Project => probe!("projects", "id", row_to_project),
            EntityKind::Tag => probe!("tags", "id", row_to_tag),
            EntityKind::SubTask => probe!("subtasks", "id", row_to_subtask),
            EntityKind::PomodoroSession => probe!("pomodoros", "id", row_to_pomodoro),
            EntityKind::Motto => probe!("mottos", "id", row_to_motto),
            EntityKind::Journal => probe!("journals", "id", row_to_journal),
            EntityKind::DailyReview => probe!("daily_reviews", "date", row_to_daily_review),
            EntityKind::WeeklyReview => {
                probe!("weekly_reviews", "week_start", row_to_weekly_review)
            }
            EntityKind::MonthlyReview => {
                probe!("monthly_reviews", "year_month", row_to_monthly_review)
            }
            EntityKind::YearlyReview => {
                probe!("yearly_reviews", "year", row_to_yearly_review)
            }
            EntityKind::TaskTag => {
                let hit = conn
                    .query_row(
                        "SELECT s.task_id, s.revision, s.updated_at_ms, s.origin_device,
                                s.user_id,
                                (SELECT GROUP_CONCAT(tag_id) FROM task_tags
                                 WHERE task_id = s.task_id) AS tag_ids
                         FROM task_tag_sync s WHERE s.task_id = ?",
                        params![id],
                        row_to_task_tag_link,
                    )
                    .optional()
                    .map_err(|e| CoreError::storage(format!("candidate task_tag_sync: {e}")))?;
                hit.map(|(link, origin)| change_of(&link, origin, &self.device_id))
                    .transpose()
            }
        }
    }
}
