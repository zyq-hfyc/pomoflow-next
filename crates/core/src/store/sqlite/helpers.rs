//! 时间/枚举串换算 + rusqlite 适配 helper。
//! (2026-09-15 巨石拆分:自 store/sqlite.rs 按域切出,内容零改动)

use super::*;

pub(super) fn now_ms() -> i64 {
    Utc::now().timestamp_millis()
}

pub(super) fn ts_to_ms(ts: Timestamp) -> i64 {
    ts.0.timestamp_millis()
}

pub(super) fn ts_from_ms(ms: i64) -> CoreResult<Timestamp> {
    Utc.timestamp_millis_opt(ms)
        .single()
        .map(Timestamp)
        .ok_or_else(|| CoreError::storage(format!("invalid timestamp ms: {ms}")))
}

pub(super) fn dt_to_ms(dt: DateTime<Utc>) -> i64 {
    dt.timestamp_millis()
}

pub(super) fn dt_from_ms(ms: i64) -> CoreResult<DateTime<Utc>> {
    Utc.timestamp_millis_opt(ms)
        .single()
        .ok_or_else(|| CoreError::storage(format!("invalid datetime ms: {ms}")))
}

pub(super) fn task_status_str(s: TaskStatus) -> &'static str {
    match s {
        TaskStatus::Active => "active",
        TaskStatus::Completed => "completed",
    }
}

pub(super) fn task_status_parse(s: &str) -> CoreResult<TaskStatus> {
    match s {
        "active" => Ok(TaskStatus::Active),
        "completed" => Ok(TaskStatus::Completed),
        other => Err(CoreError::storage(format!("unknown TaskStatus: {other}"))),
    }
}

pub(super) fn priority_str(p: Priority) -> &'static str {
    match p {
        Priority::High => "high",
        Priority::Medium => "medium",
        Priority::Low => "low",
        Priority::None => "none",
    }
}

pub(super) fn priority_parse(s: &str) -> CoreResult<Priority> {
    match s {
        "high" => Ok(Priority::High),
        "medium" => Ok(Priority::Medium),
        "low" => Ok(Priority::Low),
        "none" => Ok(Priority::None),
        other => Err(CoreError::storage(format!("unknown Priority: {other}"))),
    }
}

pub(super) fn reminder_str(r: Reminder) -> &'static str {
    match r {
        Reminder::None => "none",
        Reminder::OnTime => "on_time",
        Reminder::Minutes5 => "minutes5",
        Reminder::Minutes30 => "minutes30",
        Reminder::Hour1 => "hour1",
        Reminder::Day1 => "day1",
        Reminder::Days2 => "days2",
    }
}

pub(super) fn reminder_parse(s: &str) -> CoreResult<Reminder> {
    match s {
        "none" => Ok(Reminder::None),
        "on_time" => Ok(Reminder::OnTime),
        "minutes5" => Ok(Reminder::Minutes5),
        "minutes30" => Ok(Reminder::Minutes30),
        "hour1" => Ok(Reminder::Hour1),
        "day1" => Ok(Reminder::Day1),
        "days2" => Ok(Reminder::Days2),
        other => Err(CoreError::storage(format!("unknown Reminder: {other}"))),
    }
}

pub(super) fn repeat_str(r: Repeat) -> &'static str {
    match r {
        Repeat::None => "none",
        Repeat::Daily => "daily",
        Repeat::Weekdays => "weekdays",
        Repeat::Weekly => "weekly",
        Repeat::Monthly => "monthly",
        Repeat::Yearly => "yearly",
        Repeat::Custom => "custom",
    }
}

pub(super) fn repeat_parse(s: &str) -> CoreResult<Repeat> {
    match s {
        "none" => Ok(Repeat::None),
        "daily" => Ok(Repeat::Daily),
        "weekdays" => Ok(Repeat::Weekdays),
        "weekly" => Ok(Repeat::Weekly),
        "monthly" => Ok(Repeat::Monthly),
        "yearly" => Ok(Repeat::Yearly),
        "custom" => Ok(Repeat::Custom),
        other => Err(CoreError::storage(format!("unknown Repeat: {other}"))),
    }
}

// === 行解析 ===

/// `CoreError` → `rusqlite::Error` 转换。提供给 `row_to_*` 内部 `?` 链路使用。
pub(super) fn core_err(e: CoreError) -> rusqlite::Error {
    rusqlite::Error::ToSqlConversionFailure(e.into())
}

/// `CoreResult<T>` → `rusqlite::Result<T>` 适配器,用于把 `Ok(Task { ... })` 这种
/// 整体表达式喂给 `query_row` / `query_map`。
#[allow(dead_code)] // 保留作为 `core_try` 的 alias,有些场景(测试)直接用更顺
pub(super) fn adapt<T>(r: CoreResult<T>) -> rusqlite::Result<T> {
    r.map_err(core_err)
}

/// `Try` 风格 helper,让 `?` 能从 `CoreError` 跳到 `rusqlite::Error`。
pub(super) fn core_try<T>(r: CoreResult<T>) -> rusqlite::Result<T> {
    r.map_err(core_err)
}
