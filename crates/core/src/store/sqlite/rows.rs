//! row_to_* 行解析器(SQLite 行 → 域实体)。
//! (2026-09-15 巨石拆分:自 store/sqlite.rs 按域切出,内容零改动)

use super::*;

pub(super) fn row_to_task_tag_link(row: &Row<'_>) -> rusqlite::Result<(TaskTagLink, String)> {
    let task_id_s: String = row.get("task_id")?;
    let task_id = Id::parse(&task_id_s).ok_or_else(|| {
        core_err(CoreError::storage(format!(
            "invalid task_tag task_id: {task_id_s}"
        )))
    })?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);
    let joined: Option<String> = row.get("tag_ids")?;
    let mut tag_ids: Vec<Id> = joined
        .map(|s| {
            s.split(',')
                .filter(|p| !p.is_empty())
                .map(|p| Id(p.to_string()))
                .collect()
        })
        .unwrap_or_default();
    tag_ids.sort_by(|a, b| a.0.cmp(&b.0));
    tag_ids.dedup_by(|a, b| a.0 == b.0);
    Ok((
        TaskTagLink {
            task_id,
            tag_ids,
            user_id,
            revision: row.get::<_, i64>("revision")? as u64,
            updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
        },
        row.get("origin_device")?,
    ))
}

// === 枚举 ↔ 字符串 ===

pub(super) fn row_to_task(row: &Row<'_>) -> rusqlite::Result<Task> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s)
        .ok_or_else(|| core_err(CoreError::storage(format!("invalid task id: {id_s}"))))?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    let deleted_at_ms: Option<i64> = row.get("deleted_at_ms")?;
    let updated_at_ms: i64 = row.get("updated_at_ms")?;
    let due_date_ms: Option<i64> = row.get("due_date_ms")?;
    let completed_at_ms: Option<i64> = row.get("completed_at_ms")?;
    let repeat_end_date_ms: Option<i64> = row.get("repeat_end_date_ms")?;
    let pomodoro_duration: Option<i64> = row.get("pomodoro_duration")?;

    let project_id_s: Option<String> = row.get("project_id")?;
    let project_id = match project_id_s {
        Some(s) => Some(
            Id::parse(&s)
                .ok_or_else(|| core_err(CoreError::storage(format!("invalid project_id: {s}"))))?,
        ),
        None => None,
    };
    let repeat_parent_s: Option<String> = row.get("repeat_parent_id")?;
    let repeat_parent_id = match repeat_parent_s {
        Some(s) => Some(Id::parse(&s).ok_or_else(|| {
            core_err(CoreError::storage(format!("invalid repeat_parent_id: {s}")))
        })?),
        None => None,
    };

    let priority_s: String = row.get("priority")?;
    let status_s: String = row.get("status")?;
    let reminder_s: String = row.get("reminder")?;
    let repeat_kind_s: String = row.get("repeat_kind")?;

    let make = || {
        core_try(Ok(Task {
            id: id.clone(),
            user_id: user_id.clone(),
            title: row.get("title")?,
            description: row.get("description")?,
            project_id: project_id.clone(),
            priority: priority_parse(&priority_s).map_err(core_err)?,
            status: task_status_parse(&status_s).map_err(core_err)?,
            due_date: due_date_ms.map(dt_from_ms).transpose().map_err(core_err)?,
            estimated_pomodoros: row.get::<_, i64>("estimated_pomodoros")? as u32,
            completed_pomodoros: row.get::<_, i64>("completed_pomodoros")? as u32,
            pomodoro_duration: pomodoro_duration.map(|v| v as u32),
            reminder: reminder_parse(&reminder_s).map_err(core_err)?,
            repeat: repeat_parse(&repeat_kind_s).map_err(core_err)?,
            repeat_config: row.get("repeat_config")?,
            repeat_parent_id: repeat_parent_id.clone(),
            repeat_end_date: repeat_end_date_ms
                .map(dt_from_ms)
                .transpose()
                .map_err(core_err)?,
            completed_at: completed_at_ms
                .map(dt_from_ms)
                .transpose()
                .map_err(core_err)?,
            created_at: ts_from_ms(row.get("created_at_ms")?).map_err(core_err)?,
            revision: row.get::<_, i64>("revision")? as u64,
            deleted_at: deleted_at_ms
                .map(ts_from_ms)
                .transpose()
                .map_err(core_err)?,
            updated_at: ts_from_ms(updated_at_ms).map_err(core_err)?,
        }))
    };
    make()
}

pub(super) fn row_to_project(row: &Row<'_>) -> rusqlite::Result<Project> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s)
        .ok_or_else(|| core_err(CoreError::storage(format!("invalid project id: {id_s}"))))?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    let parent_id_s: Option<String> = row.get("parent_id")?;
    let parent_id = match parent_id_s {
        Some(s) => Some(
            Id::parse(&s)
                .ok_or_else(|| core_err(CoreError::storage(format!("invalid parent_id: {s}"))))?,
        ),
        None => None,
    };

    core_try(Ok(Project {
        id,
        user_id,
        name: row.get("name")?,
        color: row.get("color")?,
        parent_id,
        display_order: row.get::<_, i64>("display_order")? as u32,
        created_at: ts_from_ms(row.get("created_at_ms")?).map_err(core_err)?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: row
            .get::<_, Option<i64>>("deleted_at_ms")?
            .map(ts_from_ms)
            .transpose()
            .map_err(core_err)?,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

pub(super) fn row_to_tag(row: &Row<'_>) -> rusqlite::Result<Tag> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s)
        .ok_or_else(|| core_err(CoreError::storage(format!("invalid tag id: {id_s}"))))?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    core_try(Ok(Tag {
        id,
        user_id,
        name: row.get("name")?,
        color: row.get("color")?,
        display_order: row.get::<_, i64>("display_order")? as u32,
        created_at: ts_from_ms(row.get("created_at_ms")?).map_err(core_err)?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: row
            .get::<_, Option<i64>>("deleted_at_ms")?
            .map(ts_from_ms)
            .transpose()
            .map_err(core_err)?,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

pub(super) fn row_to_pomodoro(row: &Row<'_>) -> rusqlite::Result<PomodoroSession> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s)
        .ok_or_else(|| core_err(CoreError::storage(format!("invalid pomodoro id: {id_s}"))))?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    let task_id_s: Option<String> = row.get("task_id")?;
    let task_id = match task_id_s {
        Some(s) => Some(
            Id::parse(&s)
                .ok_or_else(|| core_err(CoreError::storage(format!("invalid task_id: {s}"))))?,
        ),
        None => None,
    };
    let project_id_s: Option<String> = row.get("project_id")?;
    let project_id = match project_id_s {
        Some(s) => Some(
            Id::parse(&s)
                .ok_or_else(|| core_err(CoreError::storage(format!("invalid project_id: {s}"))))?,
        ),
        None => None,
    };

    core_try(Ok(PomodoroSession {
        id,
        user_id,
        task_id,
        project_id,
        duration: row.get::<_, i64>("duration_minutes")? as u32,
        started_at: dt_from_ms(row.get("started_at_ms")?).map_err(core_err)?,
        ended_at: dt_from_ms(row.get("ended_at_ms")?).map_err(core_err)?,
        is_completed: row.get::<_, i64>("is_completed")? != 0,
        created_at: ts_from_ms(row.get("created_at_ms")?).map_err(core_err)?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: row
            .get::<_, Option<i64>>("deleted_at_ms")?
            .map(ts_from_ms)
            .transpose()
            .map_err(core_err)?,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

pub(super) fn row_to_daily_review(row: &Row<'_>) -> rusqlite::Result<DailyReview> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s).ok_or_else(|| {
        core_err(CoreError::storage(format!(
            "invalid daily_review id: {id_s}"
        )))
    })?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    core_try(Ok(DailyReview {
        id,
        user_id,
        date: row.get("date")?,
        content: row.get("content")?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: None,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

pub(super) fn row_to_weekly_review(row: &Row<'_>) -> rusqlite::Result<WeeklyReview> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s).ok_or_else(|| {
        core_err(CoreError::storage(format!(
            "invalid weekly_review id: {id_s}"
        )))
    })?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    core_try(Ok(WeeklyReview {
        id,
        user_id,
        week_start: row.get("week_start")?,
        content: row.get("content")?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: None,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

pub(super) fn row_to_monthly_review(row: &Row<'_>) -> rusqlite::Result<MonthlyReview> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s).ok_or_else(|| {
        core_err(CoreError::storage(format!(
            "invalid monthly_review id: {id_s}"
        )))
    })?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    core_try(Ok(MonthlyReview {
        id,
        user_id,
        year_month: row.get("year_month")?,
        content: row.get("content")?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: None,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

pub(super) fn row_to_yearly_review(row: &Row<'_>) -> rusqlite::Result<YearlyReview> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s).ok_or_else(|| {
        core_err(CoreError::storage(format!(
            "invalid yearly_review id: {id_s}"
        )))
    })?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    core_try(Ok(YearlyReview {
        id,
        user_id,
        year: row.get("year")?,
        content: row.get("content")?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: None,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

pub(super) fn row_to_subtask(row: &Row<'_>) -> rusqlite::Result<SubTask> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s)
        .ok_or_else(|| core_err(CoreError::storage(format!("invalid subtask id: {id_s}"))))?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    let task_id_s: String = row.get("task_id")?;
    let task_id = Id::parse(&task_id_s).ok_or_else(|| {
        core_err(CoreError::storage(format!(
            "invalid subtask task_id: {task_id_s}"
        )))
    })?;

    core_try(Ok(SubTask {
        id,
        user_id,
        task_id,
        title: row.get("title")?,
        is_completed: row.get::<_, i64>("is_completed")? != 0,
        position: row.get::<_, i64>("position")? as u32,
        created_at: ts_from_ms(row.get("created_at_ms")?).map_err(core_err)?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: row
            .get::<_, Option<i64>>("deleted_at_ms")?
            .map(ts_from_ms)
            .transpose()
            .map_err(core_err)?,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

pub(super) fn row_to_motto(row: &Row<'_>) -> rusqlite::Result<Motto> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s)
        .ok_or_else(|| core_err(CoreError::storage(format!("invalid motto id: {id_s}"))))?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);

    core_try(Ok(Motto {
        id,
        user_id,
        text: row.get("text")?,
        author: row.get::<_, Option<String>>("author")?,
        created_at: ts_from_ms(row.get("created_at_ms")?).map_err(core_err)?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: row
            .get::<_, Option<i64>>("deleted_at_ms")?
            .map(ts_from_ms)
            .transpose()
            .map_err(core_err)?,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

pub(super) fn row_to_journal(row: &Row<'_>) -> rusqlite::Result<Journal> {
    let id_s: String = row.get("id")?;
    let id = Id::parse(&id_s)
        .ok_or_else(|| core_err(CoreError::storage(format!("invalid journal id: {id_s}"))))?;
    let user_id_s: String = row.get("user_id")?;
    let user_id = Id::parse(&user_id_s).unwrap_or_else(Id::nil);
    let tags_csv: String = row.get("tags_csv")?;
    let status_s: String = row.get("status")?;

    core_try(Ok(Journal {
        id,
        user_id,
        kind: row.get("kind")?,
        status: task_status_parse(&status_s).map_err(core_err)?,
        title: row.get("title")?,
        content: row.get("content")?,
        tags: if tags_csv.is_empty() {
            Vec::new()
        } else {
            tags_csv
                .split(',')
                .filter(|s| !s.is_empty())
                .map(String::from)
                .collect()
        },
        created_at: ts_from_ms(row.get("created_at_ms")?).map_err(core_err)?,
        revision: row.get::<_, i64>("revision")? as u64,
        deleted_at: row
            .get::<_, Option<i64>>("deleted_at_ms")?
            .map(ts_from_ms)
            .transpose()
            .map_err(core_err)?,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

pub(super) fn row_to_notification_template(
    row: &Row<'_>,
) -> rusqlite::Result<NotificationTemplate> {
    // id 固定 '1',不是 UUID —— 直接读字符串,不走 Id::parse
    core_try(Ok(NotificationTemplate {
        id: Id(row.get::<_, String>("id")?),
        style: row.get("style")?,
        style_description: row.get::<_, Option<String>>("style_description")?,
        focus_end_title: row.get::<_, Option<String>>("focus_end_title")?,
        focus_end_body: row.get::<_, Option<String>>("focus_end_body")?,
        break_end_title: row.get::<_, Option<String>>("break_end_title")?,
        break_end_body: row.get::<_, Option<String>>("break_end_body")?,
        reminder_title: row.get::<_, Option<String>>("reminder_title")?,
        reminder_body: row.get::<_, Option<String>>("reminder_body")?,
        updated_at: ts_from_ms(row.get("updated_at_ms")?).map_err(core_err)?,
    }))
}

// === Store trait impl ===
