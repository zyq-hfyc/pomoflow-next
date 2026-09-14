//! Store trait 的全部方法(单一大 impl 块)。
//!
//! 例外说明:trait impl 在 Rust 中不可拆多个块(E0119),故本文件约 1100 行
//! 为 800 行红线内允许的例外;域分片 banner 保留,可快速定位。
//! (2026-09-15 巨石拆分:自 store/sqlite.rs 切出,方法体零改动)

use super::*;

impl Store for SqliteStore {
    // === 任务 CRUD + 软删/回收站 ==========================================

    fn list_tasks(&self, q: &TaskQuery) -> CoreResult<Vec<Task>> {
        let conn = self.lock()?;

        // 基础 SQL —— list 时过滤软删除,再叠加动态过滤条件
        let mut sql = String::from(
            "SELECT t.* FROM tasks t \
             WHERE t.deleted_at_ms IS NULL",
        );
        let mut args: Vec<Box<dyn rusqlite::ToSql>> = Vec::new();

        if let Some(pid) = &q.project_id {
            sql.push_str(" AND t.project_id = ?");
            args.push(Box::new(pid.as_str().to_string()));
        }
        if let Some(s) = q.status {
            sql.push_str(" AND t.status = ?");
            args.push(Box::new(task_status_str(s).to_string()));
        }
        if let Some(tag_id) = &q.tag_id {
            sql.push_str(
                " AND EXISTS (SELECT 1 FROM task_tags tt WHERE tt.task_id = t.id AND tt.tag_id = ?)",
            );
            args.push(Box::new(tag_id.as_str().to_string()));
        }
        if let Some(p) = q.priority {
            sql.push_str(" AND t.priority = ?");
            args.push(Box::new(priority_str(p).to_string()));
        }
        if let Some(rp) = &q.repeat_parent {
            sql.push_str(" AND t.repeat_parent_id = ?");
            args.push(Box::new(rp.as_str().to_string()));
        }
        // 月份区间(v1 番茄钟右侧"当月任务"用)
        if let Some(start) = q.month_start_ms {
            sql.push_str(" AND t.due_date_ms >= ?");
            args.push(Box::new(start));
        }
        if let Some(end) = q.month_end_ms {
            sql.push_str(" AND t.due_date_ms <= ?");
            args.push(Box::new(end));
        }
        // 日期维度(today / tomorrow / this_week) —— 在 SQL 里展开
        if let Some(date_filter) = q.date {
            let (start, end) = date_filter_range(date_filter, q.tz_offset_min.unwrap_or(0));
            sql.push_str(" AND t.due_date_ms >= ? AND t.due_date_ms < ?");
            args.push(Box::new(start));
            args.push(Box::new(end));
        }

        sql.push_str(" ORDER BY t.created_at_ms DESC, t.id");
        // v1:limit 1–5000,缺省 1000
        sql.push_str(&format!(" LIMIT {}", crate::validate::clamp_limit(q.limit)));

        let mut stmt = conn
            .prepare(&sql)
            .map_err(|e| CoreError::storage(format!("prepare list_tasks: {e}")))?;

        let arg_refs: Vec<&dyn rusqlite::ToSql> = args.iter().map(|b| b.as_ref()).collect();

        let rows = stmt
            .query_map(&arg_refs[..], row_to_task)
            .map_err(|e| CoreError::storage(format!("query list_tasks: {e}")))?;

        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CoreError::storage(format!("row list_tasks: {e}")))?);
        }
        Ok(out)
    }

    fn list_tasks_for_stats(&self) -> CoreResult<Vec<Task>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                // 全量(无 LIMIT):统计聚合与 v1 全表过滤语义一致
                "SELECT * FROM tasks WHERE deleted_at_ms IS NULL
                 ORDER BY created_at_ms DESC, id",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_tasks_for_stats: {e}")))?;
        let rows = stmt
            .query_map([], row_to_task)
            .map_err(|e| CoreError::storage(format!("query: {e}")))?;
        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CoreError::storage(format!("row: {e}")))?);
        }
        Ok(out)
    }

    fn get_task(&self, id: &Id) -> CoreResult<Task> {
        let conn = self.lock()?;
        conn.query_row(
            "SELECT * FROM tasks WHERE id = ?",
            params![id.as_str()],
            row_to_task,
        )
        .optional()
        .map_err(|e| CoreError::storage(format!("get_task: {e}")))?
        .ok_or_else(|| CoreError::NotFound {
            entity: "task",
            id: id.to_string(),
        })
    }

    fn upsert_task(&self, task: Task) -> CoreResult<Task> {
        self.upsert_task_marked(task, true)
    }

    fn delete_task(&self, id: &Id) -> CoreResult<()> {
        let conn = self.lock()?;
        // 三条语句同事务(2026-09-14):中途失败不留「tombstone 已打、关联
        // 未清」的半更新状态
        let tx = conn
            .unchecked_transaction()
            .map_err(|e| CoreError::storage(format!("begin delete_task tx: {e}")))?;
        // 软删即 tombstone:revision+1 + pending,让"删除"作为变更被推送(ADR-006)
        tx.execute(
            "UPDATE tasks SET deleted_at_ms = ?, updated_at_ms = ?,
                revision = revision + 1, sync_state = 'pending', origin_device = ?
             WHERE id = ?",
            params![now_ms(), now_ms(), self.device_id, id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("delete_task: {e}")))?;
        // 关联标签一并清掉,并把关联同步行写成空集 tombstone(revision+1 + pending,
        // 载荷=空集合,ADR-010 同语义);没打过标签的任务无行,UPDATE 自动 no-op
        tx.execute(
            "DELETE FROM task_tags WHERE task_id = ?",
            params![id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("delete_task task_tags: {e}")))?;
        tx.execute(
            "UPDATE task_tag_sync SET revision = revision + 1, updated_at_ms = ?,
                sync_state = 'pending', origin_device = ?
             WHERE task_id = ?",
            params![now_ms(), self.device_id, id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("delete_task task_tag_sync: {e}")))?;
        tx.commit()
            .map_err(|e| CoreError::storage(format!("commit delete_task: {e}")))?;
        Ok(())
    }

    fn list_deleted_tasks(&self) -> CoreResult<Vec<Task>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                "SELECT * FROM tasks WHERE deleted_at_ms IS NOT NULL
                 ORDER BY deleted_at_ms DESC, id ASC",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_deleted_tasks: {e}")))?;
        let rows = stmt
            .query_map([], row_to_task)
            .map_err(|e| CoreError::storage(format!("query list_deleted_tasks: {e}")))?;
        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CoreError::storage(format!("row: {e}")))?);
        }
        Ok(out)
    }

    fn restore_task(&self, id: &Id) -> CoreResult<()> {
        let conn = self.lock()?;
        // 清 deleted_at + bump revision + 标 pending → 服务端会把这个"还原"当
        // 一条普通变更推进,多端 LWW 收敛(若两端同时还原/还原,revision 大者胜)。
        let changed = conn
            .execute(
                "UPDATE tasks SET deleted_at_ms = NULL, updated_at_ms = ?,
                    revision = revision + 1, sync_state = 'pending', origin_device = ?
                 WHERE id = ? AND deleted_at_ms IS NOT NULL",
                params![now_ms(), self.device_id, id.as_str()],
            )
            .map_err(|e| CoreError::storage(format!("restore_task: {e}")))?;
        if changed == 0 {
            // 行不存在 或 已是活动态 —— 与 LWW 收敛语义一致:不抛错,no-op。
            return Ok(());
        }
        Ok(())
    }

    fn purge_task(&self, id: &Id) -> CoreResult<()> {
        let conn = self.lock()?;
        // 物理删除:同时清掉 task_tags + task_tag_sync 两张关联表;revisions 同步行
        // 通过外键 / 显式 SQL 清(无外键定义)。重复实例(重复任务)的 subtasks / sessions
        // 由上游 repeat_service.delete_all_instances 调用方保证先清。
        // 三条语句同事务(2026-09-14):中途失败不留孤儿关联。
        let tx = conn
            .unchecked_transaction()
            .map_err(|e| CoreError::storage(format!("begin purge_task tx: {e}")))?;
        tx.execute(
            "DELETE FROM task_tags WHERE task_id = ?",
            params![id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("purge_task task_tags: {e}")))?;
        tx.execute(
            "DELETE FROM task_tag_sync WHERE task_id = ?",
            params![id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("purge_task task_tag_sync: {e}")))?;
        let changed = tx
            .execute("DELETE FROM tasks WHERE id = ?", params![id.as_str()])
            .map_err(|e| CoreError::storage(format!("purge_task: {e}")))?;
        if changed == 0 {
            return Err(CoreError::NotFound {
                entity: "task",
                id: id.to_string(),
            });
        }
        tx.commit()
            .map_err(|e| CoreError::storage(format!("commit purge_task: {e}")))?;
        Ok(())
    }

    fn list_projects(&self) -> CoreResult<Vec<Project>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                // v1 排序:(parent_id, display_order, id);SQLite ASC 下 NULL parent 排最前
                "SELECT * FROM projects WHERE deleted_at_ms IS NULL
                 ORDER BY parent_id ASC, display_order ASC, id ASC",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_projects: {e}")))?;
        let rows = stmt
            .query_map([], row_to_project)
            .map_err(|e| CoreError::storage(format!("query list_projects: {e}")))?;
        rows.map(|r| r.map_err(|e| CoreError::storage(format!("row: {e}"))))
            .collect()
    }

    fn get_project(&self, id: &Id) -> CoreResult<Project> {
        let conn = self.lock()?;
        conn.query_row(
            "SELECT * FROM projects WHERE id = ?",
            params![id.as_str()],
            row_to_project,
        )
        .optional()
        .map_err(|e| CoreError::storage(format!("get_project: {e}")))?
        .ok_or_else(|| CoreError::NotFound {
            entity: "project",
            id: id.to_string(),
        })
    }

    fn upsert_project(&self, project: Project) -> CoreResult<Project> {
        self.upsert_project_marked(project, true)
    }

    fn delete_project(&self, id: &Id) -> CoreResult<()> {
        let conn = self.lock()?;
        // v1 FK 语义:删除项目 → 整棵子树级联删 + 相关 tasks/pomodoros 的
        // project_id 置空(ON DELETE CASCADE / SET NULL)。
        // 级联触及的每一行都要 revision+1 + pending,变更才能被同步。
        let mut stmt = conn
            .prepare("SELECT id, parent_id FROM projects WHERE deleted_at_ms IS NULL")
            .map_err(|e| CoreError::storage(format!("prepare delete_project: {e}")))?;
        let rows: Vec<(String, Option<String>)> = stmt
            .query_map([], |r| Ok((r.get(0)?, r.get(1)?)))
            .map_err(|e| CoreError::storage(format!("query: {e}")))?
            .filter_map(|r| r.ok())
            .collect();
        drop(stmt);

        // BFS 收集子树
        let mut subtree = vec![id.as_str().to_string()];
        let mut frontier = vec![id.as_str().to_string()];
        while let Some(cur) = frontier.pop() {
            for (pid, parent) in &rows {
                if parent.as_deref() == Some(cur.as_str()) && !subtree.contains(pid) {
                    subtree.push(pid.clone());
                    frontier.push(pid.clone());
                }
            }
        }

        let tx = conn
            .unchecked_transaction()
            .map_err(|e| CoreError::storage(format!("begin tx: {e}")))?;
        for pid in &subtree {
            tx.execute(
                "UPDATE projects SET deleted_at_ms = ?, updated_at_ms = ?,
                    revision = revision + 1, sync_state = 'pending', origin_device = ?
                 WHERE id = ?",
                params![now_ms(), now_ms(), self.device_id, pid],
            )
            .map_err(|e| CoreError::storage(format!("cascade delete project: {e}")))?;
            tx.execute(
                "UPDATE tasks SET project_id = NULL, updated_at_ms = ?,
                    revision = revision + 1, sync_state = 'pending', origin_device = ?
                 WHERE project_id = ?",
                params![now_ms(), self.device_id, pid],
            )
            .map_err(|e| CoreError::storage(format!("detach tasks: {e}")))?;
            tx.execute(
                "UPDATE pomodoros SET project_id = NULL, updated_at_ms = ?,
                    revision = revision + 1, sync_state = 'pending', origin_device = ?
                 WHERE project_id = ?",
                params![now_ms(), self.device_id, pid],
            )
            .map_err(|e| CoreError::storage(format!("detach pomodoros: {e}")))?;
        }
        tx.commit()
            .map_err(|e| CoreError::storage(format!("delete_project commit: {e}")))
    }

    fn reorder_projects(&self, items: &[crate::reorder::ReorderItem]) -> CoreResult<()> {
        let conn = self.lock()?;
        // 取全图(未软删):提交项新 parent 覆盖,未涉及节点原状参与环/深度校验
        let mut stmt = conn
            .prepare("SELECT id, parent_id FROM projects WHERE deleted_at_ms IS NULL")
            .map_err(|e| CoreError::storage(format!("prepare reorder_projects: {e}")))?;
        let existing: Vec<(String, Option<String>)> = stmt
            .query_map([], |r| Ok((r.get(0)?, r.get(1)?)))
            .map_err(|e| CoreError::storage(format!("query: {e}")))?
            .filter_map(|r| r.ok())
            .collect();
        drop(stmt);

        let parse_pair = |(id_s, parent_s): &(String, Option<String>)| -> Option<(Id, Option<Id>)> {
            let id = Id::parse(id_s)?;
            let parent = match parent_s {
                Some(s) => Some(Id::parse(s)?),
                None => None,
            };
            Some((id, parent))
        };
        let existing: Vec<(Id, Option<Id>)> = existing.iter().filter_map(parse_pair).collect();
        let existing_ids: std::collections::HashSet<Id> =
            existing.iter().map(|(id, _)| id.clone()).collect();
        crate::reorder::validate_ids_exist(items, &existing_ids)?;
        crate::reorder::validate_project_reorder(&crate::reorder::merge_graph(items, &existing))?;

        // 校验通过后单事务更新;任何一步失败整体回滚(v1 行为)
        let tx = conn
            .unchecked_transaction()
            .map_err(|e| CoreError::storage(format!("begin tx: {e}")))?;
        for it in items {
            tx.execute(
                "UPDATE projects
                 SET parent_id = ?, display_order = ?, updated_at_ms = ?,
                     revision = revision + 1, sync_state = 'pending', origin_device = ?
                 WHERE id = ?",
                params![
                    it.parent_id.as_ref().map(|p| p.as_str().to_string()),
                    it.display_order as i64,
                    now_ms(),
                    self.device_id,
                    it.id.as_str()
                ],
            )
            .map_err(|e| CoreError::storage(format!("reorder_projects update: {e}")))?;
        }
        tx.commit()
            .map_err(|e| CoreError::storage(format!("reorder_projects commit: {e}")))
    }

    fn list_tags(&self) -> CoreResult<Vec<Tag>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                // v1 排序:(display_order, id) —— 用户拖拽顺序优先
                "SELECT * FROM tags WHERE deleted_at_ms IS NULL ORDER BY display_order ASC, id ASC",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_tags: {e}")))?;
        let rows = stmt
            .query_map([], row_to_tag)
            .map_err(|e| CoreError::storage(format!("query list_tags: {e}")))?;
        rows.map(|r| r.map_err(|e| CoreError::storage(format!("row: {e}"))))
            .collect()
    }

    fn get_tag(&self, id: &Id) -> CoreResult<Tag> {
        let conn = self.lock()?;
        conn.query_row(
            "SELECT * FROM tags WHERE id = ?",
            params![id.as_str()],
            row_to_tag,
        )
        .optional()
        .map_err(|e| CoreError::storage(format!("get_tag: {e}")))?
        .ok_or_else(|| CoreError::NotFound {
            entity: "tag",
            id: id.to_string(),
        })
    }

    fn upsert_tag(&self, tag: Tag) -> CoreResult<Tag> {
        // 唯一约束通过 partial unique index 实现 —— 软删除的不算冲突。
        // 但 active 同名 tag 已存在时返回 Conflict。
        {
            let conn = self.lock()?;
            let conflict: Option<String> = conn
                .query_row(
                    "SELECT id FROM tags
                     WHERE name = ? COLLATE NOCASE
                       AND deleted_at_ms IS NULL
                       AND id != ?",
                    params![tag.name, tag.id.as_str()],
                    |row| row.get(0),
                )
                .optional()
                .map_err(|e| CoreError::storage(format!("check tag name: {e}")))?;

            if conflict.is_some() {
                return Err(CoreError::Conflict(format!(
                    "tag name '{}' already exists",
                    tag.name
                )));
            }
        }
        self.upsert_tag_marked(tag, true)
    }

    fn delete_tag(&self, id: &Id) -> CoreResult<()> {
        let conn = self.lock()?;
        // 软删 + 关联清理同事务(2026-09-14):中途失败不留半更新
        let tx = conn
            .unchecked_transaction()
            .map_err(|e| CoreError::storage(format!("begin delete_tag tx: {e}")))?;
        tx.execute(
            "UPDATE tags SET deleted_at_ms = ?, updated_at_ms = ?,
                revision = revision + 1, sync_state = 'pending', origin_device = ?
             WHERE id = ?",
            params![now_ms(), now_ms(), self.device_id, id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("delete_tag: {e}")))?;
        // 顺手清掉 task_tags 关联(可选,但符合预期;task_tags 本身不参与同步,P1a 处理)
        tx.execute(
            "DELETE FROM task_tags WHERE tag_id = ?",
            params![id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("cleanup task_tags: {e}")))?;
        tx.commit()
            .map_err(|e| CoreError::storage(format!("commit delete_tag: {e}")))?;
        Ok(())
    }

    fn reorder_tags(&self, items: &[crate::reorder::ReorderItem]) -> CoreResult<()> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare("SELECT id FROM tags WHERE deleted_at_ms IS NULL")
            .map_err(|e| CoreError::storage(format!("prepare reorder_tags: {e}")))?;
        let existing_ids: std::collections::HashSet<Id> = stmt
            .query_map([], |r| r.get::<_, String>(0))
            .map_err(|e| CoreError::storage(format!("query: {e}")))?
            .filter_map(|r| r.ok())
            .filter_map(|s| Id::parse(&s))
            .collect();
        drop(stmt);
        crate::reorder::validate_ids_exist(items, &existing_ids)?;

        let tx = conn
            .unchecked_transaction()
            .map_err(|e| CoreError::storage(format!("begin tx: {e}")))?;
        for it in items {
            tx.execute(
                "UPDATE tags SET display_order = ?, updated_at_ms = ?,
                    revision = revision + 1, sync_state = 'pending', origin_device = ?
                 WHERE id = ?",
                params![
                    it.display_order as i64,
                    now_ms(),
                    self.device_id,
                    it.id.as_str()
                ],
            )
            .map_err(|e| CoreError::storage(format!("reorder_tags update: {e}")))?;
        }
        tx.commit()
            .map_err(|e| CoreError::storage(format!("reorder_tags commit: {e}")))
    }

    fn list_tags_for_task(&self, task_id: &Id) -> CoreResult<Vec<Tag>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                "SELECT t.* FROM tags t
                 JOIN task_tags tt ON tt.tag_id = t.id
                 WHERE tt.task_id = ? AND t.deleted_at_ms IS NULL
                 ORDER BY t.name",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_tags_for_task: {e}")))?;
        let rows = stmt
            .query_map(params![task_id.as_str()], row_to_tag)
            .map_err(|e| CoreError::storage(format!("query: {e}")))?;
        rows.map(|r| r.map_err(|e| CoreError::storage(format!("row: {e}"))))
            .collect()
    }

    fn list_tags_for_tasks(&self, task_ids: &[Id]) -> CoreResult<HashMap<Id, Vec<Tag>>> {
        let mut out: HashMap<Id, Vec<Tag>> = HashMap::new();
        if task_ids.is_empty() {
            return Ok(out);
        }
        let conn = self.lock()?;
        // 用 IN (...) 一次查所有 task_tag 关联,内存里再 join tags。
        // 分块查(2026-09-14):占位符数量有界(SQLite 变量上限随版本不同),
        // 同一 task 的标签必落在同一块,块内 ORDER BY 语义不变。
        for chunk in task_ids.chunks(IN_CHUNK) {
            let placeholders = std::iter::repeat_n("?", chunk.len())
                .collect::<Vec<_>>()
                .join(",");
            let sql = format!(
                "SELECT tt.task_id, t.* FROM tags t
                 JOIN task_tags tt ON tt.tag_id = t.id
                 WHERE tt.task_id IN ({placeholders}) AND t.deleted_at_ms IS NULL
                 ORDER BY t.name"
            );
            let mut stmt = conn
                .prepare(&sql)
                .map_err(|e| CoreError::storage(format!("prepare list_tags_for_tasks: {e}")))?;
            let mut rows = stmt
                .query(rusqlite::params_from_iter(chunk.iter().map(|i| i.as_str())))
                .map_err(|e| CoreError::storage(format!("query: {e}")))?;
            while let Some(row) = rows
                .next()
                .map_err(|e| CoreError::storage(format!("row: {e}")))?
            {
                let task_id_s: String = row
                    .get::<_, String>(0)
                    .map_err(|e| CoreError::storage(format!("row.task_id: {e}")))?;
                let tag =
                    row_to_tag(row).map_err(|e| CoreError::storage(format!("row_to_tag: {e}")))?;
                out.entry(Id(task_id_s)).or_default().push(tag);
            }
        }
        Ok(out)
    }

    fn set_tags_for_task(&self, task_id: &Id, tag_ids: &[Id]) -> CoreResult<()> {
        // 本地写:revision 自增 + pending(0 → 1 起步),origin = 本机设备
        let cur: u64 = {
            let conn = self.lock()?;
            conn.query_row(
                "SELECT revision FROM task_tag_sync WHERE task_id = ?",
                params![task_id.as_str()],
                |row| row.get::<_, i64>(0),
            )
            .optional()
            .map_err(|e| CoreError::storage(format!("read task_tag revision: {e}")))?
            .map(|v| v.unsigned_abs())
            .unwrap_or(0)
        };
        let device = self.device_id.clone();
        self.set_tags_for_task_marked(task_id, tag_ids, cur + 1, Timestamp::now(), &device, true)
    }
    fn get_pomodoro(&self, id: &Id) -> CoreResult<PomodoroSession> {
        // 单条查找(2026-09-14):stop_pomodoro 此前 list 全表后内存 find
        let conn = self.lock()?;
        conn.query_row(
            "SELECT * FROM pomodoros WHERE id = ?",
            params![id.as_str()],
            row_to_pomodoro,
        )
        .optional()
        .map_err(|e| CoreError::storage(format!("get_pomodoro: {e}")))?
        .ok_or_else(|| CoreError::NotFound {
            entity: "pomodoro_session",
            id: id.to_string(),
        })
    }

    fn list_pomodoros(&self) -> CoreResult<Vec<PomodoroSession>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                "SELECT * FROM pomodoros WHERE deleted_at_ms IS NULL ORDER BY started_at_ms DESC",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_pomodoros: {e}")))?;
        let rows = stmt
            .query_map([], row_to_pomodoro)
            .map_err(|e| CoreError::storage(format!("query: {e}")))?;
        rows.map(|r| r.map_err(|e| CoreError::storage(format!("row: {e}"))))
            .collect()
    }

    fn list_pomodoros_between(
        &self,
        start_ms: i64,
        end_ms: i64,
    ) -> CoreResult<Vec<PomodoroSession>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                "SELECT * FROM pomodoros
                 WHERE deleted_at_ms IS NULL
                   AND started_at_ms >= ? AND started_at_ms < ?
                 ORDER BY started_at_ms DESC",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_pomodoros_between: {e}")))?;
        let rows = stmt
            .query_map(params![start_ms, end_ms], row_to_pomodoro)
            .map_err(|e| CoreError::storage(format!("query: {e}")))?;
        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CoreError::storage(format!("row: {e}")))?);
        }
        Ok(out)
    }

    fn count_pomodoros(&self) -> CoreResult<u64> {
        // counts 口径(v1 过滤:已完成 && 绑任务 && 未软删;stats 模块注释 §1)
        let conn = self.lock()?;
        let n: i64 = conn
            .query_row(
                "SELECT COUNT(*) FROM pomodoros
                 WHERE deleted_at_ms IS NULL AND is_completed = 1 AND task_id IS NOT NULL",
                [],
                |r| r.get(0),
            )
            .map_err(|e| CoreError::storage(format!("count_pomodoros: {e}")))?;
        u64::try_from(n).map_err(|_| CoreError::storage("count_pomodoros overflow"))
    }

    fn upsert_pomodoro(&self, session: PomodoroSession) -> CoreResult<PomodoroSession> {
        self.upsert_pomodoro_marked(session, true)
    }

    fn delete_pomodoro(&self, id: &Id) -> CoreResult<()> {
        let conn = self.lock()?;
        conn.execute(
            "UPDATE pomodoros SET deleted_at_ms = ?, updated_at_ms = ?,
                revision = revision + 1, sync_state = 'pending', origin_device = ?
             WHERE id = ?",
            params![now_ms(), now_ms(), self.device_id, id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("delete_pomodoro: {e}")))?;
        Ok(())
    }
    fn get_daily_review(&self, date: &str) -> CoreResult<Option<DailyReview>> {
        let conn = self.lock()?;
        conn.query_row(
            "SELECT * FROM daily_reviews WHERE date = ?",
            params![date],
            row_to_daily_review,
        )
        .optional()
        .map_err(|e| CoreError::storage(format!("get_daily_review: {e}")))
    }

    fn upsert_daily_review(&self, review: DailyReview) -> CoreResult<DailyReview> {
        self.upsert_daily_review_marked(review, true)
    }

    fn list_daily_reviews_between(
        &self,
        start_date: &str,
        end_date: &str,
    ) -> CoreResult<Vec<DailyReview>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                "SELECT * FROM daily_reviews
                 WHERE date >= ? AND date <= ? ORDER BY date ASC",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_daily_reviews_between: {e}")))?;
        let rows = stmt
            .query_map(params![start_date, end_date], row_to_daily_review)
            .map_err(|e| CoreError::storage(format!("query: {e}")))?;
        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CoreError::storage(format!("row: {e}")))?);
        }
        Ok(out)
    }

    fn delete_daily_review(&self, date: &str) -> CoreResult<()> {
        // ADR-010:删除 = content='' 的 upsert(变更可同步),revision+1 + pending;
        // 行不存在则无内容可删,静默返回(远端若有内容,由 pull 比较收敛)
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO daily_reviews
                (id, user_id, date, content, revision, updated_at_ms, sync_state, origin_device)
             VALUES (?, ?, ?, '', 1, ?, 'pending', ?)
             ON CONFLICT(date) DO UPDATE SET
                content = '', updated_at_ms = excluded.updated_at_ms, revision = revision + 1,
                user_id = excluded.user_id, sync_state = 'pending',
                origin_device = excluded.origin_device",
            params![
                Id::new().as_str(),
                self.user_id.as_str(),
                date,
                now_ms(),
                self.device_id
            ],
        )
        .map_err(|e| CoreError::storage(format!("delete_daily_review: {e}")))?;
        Ok(())
    }

    fn get_weekly_review(&self, week_start: &str) -> CoreResult<Option<WeeklyReview>> {
        let conn = self.lock()?;
        conn.query_row(
            "SELECT * FROM weekly_reviews WHERE week_start = ?",
            params![week_start],
            row_to_weekly_review,
        )
        .optional()
        .map_err(|e| CoreError::storage(format!("get_weekly_review: {e}")))
    }

    fn upsert_weekly_review(&self, review: WeeklyReview) -> CoreResult<WeeklyReview> {
        self.upsert_weekly_review_marked(review, true)
    }

    fn list_weekly_reviews_between(
        &self,
        start_week: &str,
        end_week: &str,
    ) -> CoreResult<Vec<WeeklyReview>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                "SELECT * FROM weekly_reviews
                 WHERE week_start >= ? AND week_start <= ? ORDER BY week_start ASC",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_weekly_reviews_between: {e}")))?;
        let rows = stmt
            .query_map(params![start_week, end_week], row_to_weekly_review)
            .map_err(|e| CoreError::storage(format!("query: {e}")))?;
        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CoreError::storage(format!("row: {e}")))?);
        }
        Ok(out)
    }

    fn delete_weekly_review(&self, week_start: &str) -> CoreResult<()> {
        // ADR-010:删除 = content='' 的 upsert(同 delete_daily_review)
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO weekly_reviews
                (id, user_id, week_start, content, revision, updated_at_ms, sync_state, origin_device)
             VALUES (?, ?, ?, '', 1, ?, 'pending', ?)
             ON CONFLICT(week_start) DO UPDATE SET
                content = '', updated_at_ms = excluded.updated_at_ms, revision = revision + 1,
                user_id = excluded.user_id, sync_state = 'pending',
                origin_device = excluded.origin_device",
            params![
                Id::new().as_str(),
                self.user_id.as_str(),
                week_start,
                now_ms(),
                self.device_id
            ],
        )
        .map_err(|e| CoreError::storage(format!("delete_weekly_review: {e}")))?;
        Ok(())
    }

    fn get_monthly_review(&self, year_month: &str) -> CoreResult<Option<MonthlyReview>> {
        let conn = self.lock()?;
        conn.query_row(
            "SELECT * FROM monthly_reviews WHERE year_month = ?",
            params![year_month],
            row_to_monthly_review,
        )
        .optional()
        .map_err(|e| CoreError::storage(format!("get_monthly_review: {e}")))
    }

    fn upsert_monthly_review(&self, review: MonthlyReview) -> CoreResult<MonthlyReview> {
        self.upsert_monthly_review_marked(review, true)
    }

    fn delete_monthly_review(&self, year_month: &str) -> CoreResult<()> {
        // ADR-010:删除 = content='' 的 upsert(同 delete_daily_review)
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO monthly_reviews
                (id, user_id, year_month, content, revision, updated_at_ms, sync_state, origin_device)
             VALUES (?, ?, ?, '', 1, ?, 'pending', ?)
             ON CONFLICT(year_month) DO UPDATE SET
                content = '', updated_at_ms = excluded.updated_at_ms, revision = revision + 1,
                user_id = excluded.user_id, sync_state = 'pending',
                origin_device = excluded.origin_device",
            params![
                Id::new().as_str(),
                self.user_id.as_str(),
                year_month,
                now_ms(),
                self.device_id
            ],
        )
        .map_err(|e| CoreError::storage(format!("delete_monthly_review: {e}")))?;
        Ok(())
    }

    fn get_yearly_review(&self, year: &str) -> CoreResult<Option<YearlyReview>> {
        let conn = self.lock()?;
        conn.query_row(
            "SELECT * FROM yearly_reviews WHERE year = ?",
            params![year],
            row_to_yearly_review,
        )
        .optional()
        .map_err(|e| CoreError::storage(format!("get_yearly_review: {e}")))
    }

    fn upsert_yearly_review(&self, review: YearlyReview) -> CoreResult<YearlyReview> {
        self.upsert_yearly_review_marked(review, true)
    }

    fn delete_yearly_review(&self, year: &str) -> CoreResult<()> {
        // ADR-010:删除 = content='' 的 upsert(同 delete_daily_review)
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO yearly_reviews
                (id, user_id, year, content, revision, updated_at_ms, sync_state, origin_device)
             VALUES (?, ?, ?, '', 1, ?, 'pending', ?)
             ON CONFLICT(year) DO UPDATE SET
                content = '', updated_at_ms = excluded.updated_at_ms, revision = revision + 1,
                user_id = excluded.user_id, sync_state = 'pending',
                origin_device = excluded.origin_device",
            params![
                Id::new().as_str(),
                self.user_id.as_str(),
                year,
                now_ms(),
                self.device_id
            ],
        )
        .map_err(|e| CoreError::storage(format!("delete_yearly_review: {e}")))?;
        Ok(())
    }
    fn list_subtasks_for_task(&self, task_id: &Id) -> CoreResult<Vec<SubTask>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                "SELECT * FROM subtasks
                 WHERE task_id = ? AND deleted_at_ms IS NULL
                 ORDER BY position ASC, updated_at_ms ASC",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_subtasks: {e}")))?;
        let rows = stmt
            .query_map(params![task_id.as_str()], row_to_subtask)
            .map_err(|e| CoreError::storage(format!("query list_subtasks: {e}")))?;
        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CoreError::storage(format!("row list_subtasks: {e}")))?);
        }
        Ok(out)
    }

    fn list_subtasks_for_tasks(&self, task_ids: &[Id]) -> CoreResult<HashMap<Id, Vec<SubTask>>> {
        let mut out: HashMap<Id, Vec<SubTask>> = HashMap::new();
        if task_ids.is_empty() {
            return Ok(out);
        }
        let conn = self.lock()?;
        // 分块查(2026-09-14):占位符数量有界;同一 task 的子任务必落在
        // 同一块,块内 ORDER BY 语义不变。
        for chunk in task_ids.chunks(IN_CHUNK) {
            let placeholders = std::iter::repeat_n("?", chunk.len())
                .collect::<Vec<_>>()
                .join(",");
            let sql = format!(
                "SELECT * FROM subtasks
                 WHERE task_id IN ({placeholders}) AND deleted_at_ms IS NULL
                 ORDER BY task_id, position ASC, updated_at_ms ASC"
            );
            let mut stmt = conn
                .prepare(&sql)
                .map_err(|e| CoreError::storage(format!("prepare list_subtasks_for_tasks: {e}")))?;
            let mut rows = stmt
                .query(rusqlite::params_from_iter(chunk.iter().map(|i| i.as_str())))
                .map_err(|e| CoreError::storage(format!("query: {e}")))?;
            while let Some(row) = rows
                .next()
                .map_err(|e| CoreError::storage(format!("row: {e}")))?
            {
                let task_id_s: String = row
                    .get::<_, String>("task_id")
                    .map_err(|e| CoreError::storage(format!("row.task_id: {e}")))?;
                let st = row_to_subtask(row)
                    .map_err(|e| CoreError::storage(format!("row_to_subtask: {e}")))?;
                out.entry(Id(task_id_s)).or_default().push(st);
            }
        }
        Ok(out)
    }

    fn upsert_subtask(&self, subtask: SubTask) -> CoreResult<SubTask> {
        self.upsert_subtask_marked(subtask, true)
    }

    fn delete_subtask(&self, id: &Id) -> CoreResult<()> {
        let conn = self.lock()?;
        // 软删除 tombstone:revision+1 + pending
        conn.execute(
            "UPDATE subtasks SET deleted_at_ms = ?, updated_at_ms = ?,
                revision = revision + 1, sync_state = 'pending', origin_device = ?
             WHERE id = ? AND deleted_at_ms IS NULL",
            params![now_ms(), now_ms(), self.device_id, id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("delete_subtask: {e}")))?;
        Ok(())
    }

    // --- Mottos ---

    fn list_mottos(&self) -> CoreResult<Vec<Motto>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare("SELECT * FROM mottos WHERE deleted_at_ms IS NULL ORDER BY created_at_ms ASC")
            .map_err(|e| CoreError::storage(format!("prepare list_mottos: {e}")))?;
        let rows = stmt
            .query_map([], row_to_motto)
            .map_err(|e| CoreError::storage(format!("query list_mottos: {e}")))?;
        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CoreError::storage(format!("row list_mottos: {e}")))?);
        }
        Ok(out)
    }

    fn upsert_motto(&self, motto: Motto) -> CoreResult<Motto> {
        self.upsert_motto_marked(motto, true)
    }

    fn delete_motto(&self, id: &Id) -> CoreResult<()> {
        let conn = self.lock()?;
        conn.execute(
            "UPDATE mottos SET deleted_at_ms = ?, updated_at_ms = ?,
                revision = revision + 1, sync_state = 'pending', origin_device = ?
             WHERE id = ? AND deleted_at_ms IS NULL",
            params![now_ms(), now_ms(), self.device_id, id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("delete_motto: {e}")))?;
        Ok(())
    }

    fn get_journal(&self, id: &Id) -> CoreResult<Journal> {
        // 单条查找(2026-09-14):upsert_journal / toggle_journal 此前 list
        // 全表后内存 find
        let conn = self.lock()?;
        conn.query_row(
            "SELECT * FROM journals WHERE id = ?",
            params![id.as_str()],
            row_to_journal,
        )
        .optional()
        .map_err(|e| CoreError::storage(format!("get_journal: {e}")))?
        .ok_or_else(|| CoreError::NotFound {
            entity: "journal",
            id: id.to_string(),
        })
    }

    fn list_journals(&self) -> CoreResult<Vec<Journal>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                "SELECT * FROM journals WHERE deleted_at_ms IS NULL ORDER BY created_at_ms ASC",
            )
            .map_err(|e| CoreError::storage(format!("prepare list_journals: {e}")))?;
        let rows = stmt
            .query_map([], row_to_journal)
            .map_err(|e| CoreError::storage(format!("query list_journals: {e}")))?;
        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CoreError::storage(format!("row list_journals: {e}")))?);
        }
        Ok(out)
    }

    fn upsert_journal(&self, journal: Journal) -> CoreResult<Journal> {
        self.upsert_journal_marked(journal, true)
    }

    fn delete_journal(&self, id: &Id) -> CoreResult<()> {
        let conn = self.lock()?;
        conn.execute(
            "UPDATE journals SET deleted_at_ms = ?, updated_at_ms = ?,
                revision = revision + 1, sync_state = 'pending', origin_device = ?
             WHERE id = ? AND deleted_at_ms IS NULL",
            params![now_ms(), now_ms(), self.device_id, id.as_str()],
        )
        .map_err(|e| CoreError::storage(format!("delete_journal: {e}")))?;
        Ok(())
    }
    fn today_completed_minutes(&self, start_ms: i64, end_ms: i64) -> CoreResult<u32> {
        let conn = self.lock()?;
        // 按 started_at 分桶(与 stats::overview / range 一致;v1 全部按 started_at):
        // 若按 ended_at,23:55 开始、次日 0:20 结束的会话会在番茄钟页算"今天"、
        // 统计页算"昨天",两页数字对不上
        let total: i64 = conn
            .query_row(
                "SELECT COALESCE(SUM(duration_minutes), 0) FROM pomodoros
                 WHERE deleted_at_ms IS NULL
                   AND is_completed = 1
                   AND started_at_ms >= ? AND started_at_ms < ?",
                params![start_ms, end_ms],
                |row| row.get(0),
            )
            .map_err(|e| CoreError::storage(format!("today_completed_minutes: {e}")))?;
        u32::try_from(total).map_err(|_| CoreError::storage("today minutes overflow"))
    }

    // --- NotificationTemplate(单行配置) ---

    fn get_notification_template(&self) -> CoreResult<Option<NotificationTemplate>> {
        let conn = self.lock()?;
        conn.query_row(
            "SELECT * FROM notification_templates WHERE id = '1'",
            [],
            row_to_notification_template,
        )
        .optional()
        .map_err(|e| CoreError::storage(format!("get_notification_template: {e}")))
    }

    fn upsert_notification_template(
        &self,
        template: NotificationTemplate,
    ) -> CoreResult<NotificationTemplate> {
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO notification_templates
                (id, style, style_description,
                 focus_end_title, focus_end_body, break_end_title, break_end_body,
                 reminder_title, reminder_body, updated_at_ms)
             VALUES (?,?,?,?,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET
                style=excluded.style, style_description=excluded.style_description,
                focus_end_title=excluded.focus_end_title, focus_end_body=excluded.focus_end_body,
                break_end_title=excluded.break_end_title, break_end_body=excluded.break_end_body,
                reminder_title=excluded.reminder_title, reminder_body=excluded.reminder_body,
                updated_at_ms=excluded.updated_at_ms",
            params![
                template.id.as_str(),
                template.style,
                template.style_description,
                template.focus_end_title,
                template.focus_end_body,
                template.break_end_title,
                template.break_end_body,
                template.reminder_title,
                template.reminder_body,
                ts_to_ms(template.updated_at),
            ],
        )
        .map_err(|e| CoreError::storage(format!("upsert_notification_template: {e}")))?;
        Ok(template)
    }

    // --- conflict_log(P2 冲突可视化) ---

    fn insert_conflict(&self, record: ConflictRecord) -> CoreResult<()> {
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO conflict_log
             (entity, entity_id, entity_title, direction, remote_device,
              local_updated_ms, remote_updated_ms, occurred_at_ms)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            params![
                record.entity,
                record.entity_id,
                record.entity_title,
                record.direction,
                record.remote_device,
                record.local_updated_ms,
                record.remote_updated_ms,
                record.occurred_at_ms,
            ],
        )
        .map_err(|e| CoreError::storage(format!("insert_conflict: {e}")))?;
        Ok(())
    }

    fn list_recent_conflicts(&self, limit: usize) -> CoreResult<Vec<ConflictRecord>> {
        let conn = self.lock()?;
        let mut stmt = conn
            .prepare(
                "SELECT entity, entity_id, entity_title, direction, remote_device,
                        local_updated_ms, remote_updated_ms, occurred_at_ms
                 FROM conflict_log
                 ORDER BY occurred_at_ms DESC
                 LIMIT ?",
            )
            .map_err(|e| CoreError::storage(format!("list_recent_conflicts: {e}")))?;
        let rows = stmt
            .query_map(params![limit as i64], |row| {
                Ok(ConflictRecord {
                    entity: row.get(0)?,
                    entity_id: row.get(1)?,
                    entity_title: row.get(2)?,
                    direction: row.get(3)?,
                    remote_device: row.get(4)?,
                    local_updated_ms: row.get(5)?,
                    remote_updated_ms: row.get(6)?,
                    occurred_at_ms: row.get(7)?,
                })
            })
            .map_err(|e| CoreError::storage(format!("list_recent_conflicts query: {e}")))?;
        rows.collect::<Result<Vec<_>, _>>()
            .map_err(|e| CoreError::storage(format!("list_recent_conflicts collect: {e}")))
    }

    fn clear_conflicts(&self) -> CoreResult<()> {
        let conn = self.lock()?;
        conn.execute("DELETE FROM conflict_log", [])
            .map_err(|e| CoreError::storage(format!("clear_conflicts: {e}")))?;
        Ok(())
    }

    fn trim_conflicts(&self, cutoff_ms: i64) -> CoreResult<usize> {
        let conn = self.lock()?;
        let n = conn
            .execute(
                "DELETE FROM conflict_log WHERE occurred_at_ms < ?",
                params![cutoff_ms],
            )
            .map_err(|e| CoreError::storage(format!("trim_conflicts: {e}")))?;
        Ok(n)
    }

    fn count_conflicts(&self) -> CoreResult<usize> {
        let conn = self.lock()?;
        let count: i64 = conn
            .query_row("SELECT COUNT(*) FROM conflict_log", [], |row| row.get(0))
            .map_err(|e| CoreError::storage(format!("count_conflicts: {e}")))?;
        usize::try_from(count).map_err(|_| CoreError::storage("conflict count overflow"))
    }
}
