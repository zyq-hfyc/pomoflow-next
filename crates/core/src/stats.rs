//! 统计聚合 —— v1 `backend/app/crud.py:496-729` 的纯 Rust 翻译。
//!
//! ## v1 语义(必须逐条保持)
//!
//! 1. **会话过滤**(趋势/总览/今日):`is_completed == true && task_id 非空` ——
//!    中途放弃的会话与"无任务专注"一律不计。
//! 2. **日分桶用本地时区**:v1 是 `date(started_at, 'localtime')`;这里由调用方传
//!    `tz_offset_min`(分钟,东正西负),core 纯算术换算,不引 chrono::Local。
//! 3. **分组键**:day = `YYYY-MM-DD`;week = 该日所在周的**周一**日期;month = `YYYY-MM`。
//!    跨年周边界自然正确(周一日期本身唯一)。
//! 4. **区间过滤**(start_date/end_date 均为 `YYYY-MM-DD`,**双端包含**):
//!    - 会话:按本地日 ∈ [start, end]
//!    - completed_tasks:`status == completed && completed_at` 的 **UTC 日** ∈ [start, end]
//!      (v1 用 naive datetime 直接比较存储的 UTC 值,语义即 UTC 日界)
//!    - 项目分布:`completed_pomodoros > 0 && due_date` 的 **本地日** ∈ [start, end]
//!      且 **project_id 非空**,按项目累加 `completed_pomodoros × pomodoro_duration`
//!      (duration NULL 按 0,直译 v1 `or 0`)—— **与番茄会话无关**,
//!      无项目的任务不计入(没有归属维度)。due 用本地日(v1 存本地日期字符串,
//!      语义即本地日界;v2 存 UTC 时刻,须换算回请求方本地日,否则东八区
//!      "1 号到期"的任务会落到上一个月的环图里)。
//! 5. **总览(overview)**:today/week/month 三档分钟数+会话数(本地日 `>=` 各自起点),
//!    total_sessions = 全部符合条件的会话数(无时间界),
//!    total_tasks_completed = 全部 completed 任务数(无时间界)。

use chrono::{DateTime, Datelike, NaiveDate, TimeZone, Utc};
use serde::{Deserialize, Serialize};

use crate::model::{PomodoroSession, Project, Task, TaskStatus};

/// 趋势聚合粒度 —— 与 v1 `/api/stats/range?group=` 参数一致。
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum StatsGroup {
    Day,
    Week,
    Month,
}

/// 趋势上一个桶:key 是日(YYYY-MM-DD)/周一日期(YYYY-MM-DD)/月(YYYY-MM)。
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct RangeTrendPoint {
    pub key: String,
    pub minutes: u32,
    pub sessions: u32,
}

/// 项目时间分布一行(来自"完成任务"口径,不是会话)。
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct ProjectStat {
    pub project_id: String,
    pub project_name: String,
    pub project_color: String,
    pub total_minutes: u32,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct RangeSummary {
    pub total_minutes: u32,
    pub total_sessions: u32,
    pub completed_tasks: u32,
}

/// `/stats/range` 的完整返回。
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct RangeStats {
    pub trend: Vec<RangeTrendPoint>,
    pub summary: RangeSummary,
    pub projects: Vec<ProjectStat>,
}

/// `/stats/overview` 的返回(v1 `OverviewStat`)。
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct OverviewStats {
    pub today_minutes: u32,
    pub today_sessions: u32,
    pub week_minutes: u32,
    pub week_sessions: u32,
    pub month_minutes: u32,
    pub total_sessions: u32,
    pub total_tasks_completed: u32,
}

// === helper ===

/// 会话是否计入统计(v1 过滤条件)。
fn counts_session(s: &PomodoroSession) -> bool {
    s.deleted_at.is_none() && s.is_completed && s.task_id.is_some()
}

/// UTC 时刻在 `tz_offset_min` 时区下的本地日历日。
fn local_date_of(dt: DateTime<Utc>, tz_offset_min: i32) -> Option<NaiveDate> {
    let local_secs = dt.timestamp() + tz_offset_min as i64 * 60;
    Utc.timestamp_opt(local_secs, 0)
        .single()
        .map(|d| d.date_naive())
}

/// 解析 `YYYY-MM-DD`;非法返回 None(调用方决定如何降级)。
fn parse_date(s: &str) -> Option<NaiveDate> {
    NaiveDate::parse_from_str(s, "%Y-%m-%d").ok()
}

/// 分组键(v1 `_group_key`):day=当日 / week=周一 / month=YYYY-MM。
fn group_key(day: NaiveDate, group: StatsGroup) -> String {
    match group {
        StatsGroup::Day => day.to_string(),
        StatsGroup::Week => {
            let monday = day - chrono::Duration::days(day.weekday().num_days_from_monday() as i64);
            monday.to_string()
        }
        StatsGroup::Month => format!("{:04}-{:02}", day.year(), day.month()),
    }
}

fn sat_u32(v: u64) -> u32 {
    u32::try_from(v).unwrap_or(u32::MAX)
}

// === 区间统计 ===

/// 按日期区间 + 粒度聚合(v1 `get_range_stats`)。
///
/// `start_date`/`end_date` 双端包含;`tz_offset_min` 只影响**会话**的日分桶,
/// 任务的 completed_at / due_date 按 UTC 日比较(v1 naive 比较语义)。
pub fn range_stats(
    sessions: &[PomodoroSession],
    tasks: &[Task],
    projects: &[Project],
    start_date: &str,
    end_date: &str,
    group: StatsGroup,
    tz_offset_min: i32,
) -> RangeStats {
    let (Some(start), Some(end)) = (parse_date(start_date), parse_date(end_date)) else {
        return RangeStats {
            trend: Vec::new(),
            summary: RangeSummary {
                total_minutes: 0,
                total_sessions: 0,
                completed_tasks: 0,
            },
            projects: Vec::new(),
        };
    };

    // --- 趋势:本地日分桶 + 分组合并 ---
    use std::collections::BTreeMap;
    let mut bucket: BTreeMap<String, (u64, u64)> = BTreeMap::new();
    for s in sessions.iter().filter(|s| counts_session(s)) {
        let Some(local_day) = local_date_of(s.started_at, tz_offset_min) else {
            continue;
        };
        if local_day < start || local_day > end {
            continue;
        }
        let entry = bucket.entry(group_key(local_day, group)).or_insert((0, 0));
        entry.0 += s.duration as u64;
        entry.1 += 1;
    }
    let trend: Vec<RangeTrendPoint> = bucket
        .into_iter()
        .map(|(key, (minutes, sessions))| RangeTrendPoint {
            key,
            minutes: sat_u32(minutes),
            sessions: sat_u32(sessions),
        })
        .collect();

    let total_minutes = trend.iter().map(|t| t.minutes as u64).sum::<u64>();
    let total_sessions = trend.iter().map(|t| t.sessions as u64).sum::<u64>();

    // --- completed_tasks:completed_at 的 UTC 日 ∈ [start, end] ---
    let completed_tasks = tasks
        .iter()
        .filter(|t| {
            t.deleted_at.is_none()
                && t.status == TaskStatus::Completed
                && t.completed_at
                    .map(|c| {
                        let d = c.date_naive();
                        d >= start && d <= end
                    })
                    .unwrap_or(false)
        })
        .count();

    // --- 项目分布:due_date 的本地日 ∈ [start, end] ---
    let projects = project_stats_by_completed_pomodoros(tasks, projects, start, end, tz_offset_min);

    RangeStats {
        trend,
        summary: RangeSummary {
            total_minutes: sat_u32(total_minutes),
            total_sessions: sat_u32(total_sessions),
            completed_tasks: sat_u32(completed_tasks as u64),
        },
        projects,
    }
}

/// 项目时间分布(v1 `_project_stats_by_completed_pomodoros`,v1 12bc45a 同步):
/// 按 Task.due_date 的**本地日**(tz_offset_min 换算)∈ [start, end] 且
/// `completed_pomodoros > 0` 过滤,按项目累加 `completed_pomodoros × pomodoro_duration`
/// (duration NULL 按 0)。不要求任务整体完成 —— 8 个番茄已完成 7 个即计入
/// 7 个番茄的时长;没有清单的任务不计入(无 project_id 归属维度)。
///
/// 输出按 total_minutes 降序、同名稳定(v1 是 DB 顺序,这里给确定序,不影响语义)。
pub fn project_stats_by_completed_pomodoros(
    tasks: &[Task],
    projects: &[Project],
    start: NaiveDate,
    end: NaiveDate,
    tz_offset_min: i32,
) -> Vec<ProjectStat> {
    use std::collections::HashMap;
    let mut minutes_by_pid: HashMap<&str, u64> = HashMap::new();
    for t in tasks.iter().filter(|t| {
        t.deleted_at.is_none()
            && t.completed_pomodoros > 0
            && t.project_id.is_some()
            && t.due_date.is_some_and(|d| {
                local_date_of(d, tz_offset_min).is_some_and(|day| day >= start && day <= end)
            })
    }) {
        let pid = t.project_id.as_ref().unwrap().as_str();
        let minutes = t.completed_pomodoros as u64 * t.pomodoro_duration.unwrap_or(0) as u64;
        *minutes_by_pid.entry(pid).or_insert(0) += minutes;
    }

    let mut out: Vec<ProjectStat> = projects
        .iter()
        .filter(|p| p.deleted_at.is_none())
        .filter_map(|p| {
            minutes_by_pid.get(p.id.as_str()).map(|&m| ProjectStat {
                project_id: p.id.to_string(),
                project_name: p.name.clone(),
                project_color: p.color.clone(),
                total_minutes: sat_u32(m),
            })
        })
        .collect();
    out.sort_by(|a, b| {
        b.total_minutes
            .cmp(&a.total_minutes)
            .then_with(|| a.project_name.cmp(&b.project_name))
    });
    out
}

// === 总览 ===

/// 今日/本周/本月 + 全时段总览(v1 `get_overview_stats`)。
///
/// `today`/`week_start`/`month_start` 是调用方本地时区下的日期(YYYY-MM-DD);
/// 会话按本地日 `>=` 各起点计入(无上界,即"从那天到现在")。
pub fn overview_stats(
    sessions: &[PomodoroSession],
    tasks: &[Task],
    today: &str,
    week_start: &str,
    month_start: &str,
    tz_offset_min: i32,
) -> OverviewStats {
    let today = parse_date(today);
    let week_start = parse_date(week_start);
    let month_start = parse_date(month_start);

    let mut today_min = 0u64;
    let mut today_cnt = 0u64;
    let mut week_min = 0u64;
    let mut week_cnt = 0u64;
    let mut month_min = 0u64;
    let mut total_cnt = 0u64;

    for s in sessions.iter().filter(|s| counts_session(s)) {
        total_cnt += 1;
        let Some(day) = local_date_of(s.started_at, tz_offset_min) else {
            continue;
        };
        // v1:today 用相等比较(==),week/month 用 >= 起点(会话不会来自未来,
        // 但时区换算后本地日可能"超前"声明的 today,相等比较更严谨)
        if today.is_some_and(|t| day == t) {
            today_min += s.duration as u64;
            today_cnt += 1;
        }
        if week_start.is_some_and(|w| day >= w) {
            week_min += s.duration as u64;
            week_cnt += 1;
        }
        if month_start.is_some_and(|m| day >= m) {
            month_min += s.duration as u64;
        }
    }

    let total_tasks_completed = tasks
        .iter()
        .filter(|t| t.deleted_at.is_none() && t.status == TaskStatus::Completed)
        .count();

    OverviewStats {
        today_minutes: sat_u32(today_min),
        today_sessions: sat_u32(today_cnt),
        week_minutes: sat_u32(week_min),
        week_sessions: sat_u32(week_cnt),
        month_minutes: sat_u32(month_min),
        total_sessions: sat_u32(total_cnt),
        total_tasks_completed: sat_u32(total_tasks_completed as u64),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::model::{Id, Timestamp};

    /// 构造一条已完成、绑定任务的会话(started/ended 用同一时刻)。
    fn session(started: DateTime<Utc>, minutes: u32) -> PomodoroSession {
        PomodoroSession {
            id: Id::new(),
            user_id: Id::nil(),
            task_id: Some(Id::new()),
            project_id: None,
            duration: minutes,
            started_at: started,
            ended_at: started,
            is_completed: true,
            created_at: Timestamp(started),
            revision: 1,
            deleted_at: None,
            updated_at: Timestamp(started),
        }
    }

    fn dt(s: &str) -> DateTime<Utc> {
        DateTime::parse_from_rfc3339(s).unwrap().with_timezone(&Utc)
    }

    fn completed_task(due: &str, project: Option<Id>, pomos: u32, dur: Option<u32>) -> Task {
        let mut t = Task::new("t");
        t.status = TaskStatus::Completed;
        t.due_date = Some(dt(&format!("{due}T12:00:00Z")));
        t.completed_at = Some(dt(&format!("{due}T15:00:00Z")));
        t.project_id = project;
        t.completed_pomodoros = pomos;
        t.pomodoro_duration = dur;
        t
    }

    const UTC0: i32 = 0;

    #[test]
    fn day_bucketing_by_local_timezone() {
        // 2026-01-15 23:30 UTC:东八区(+480)落到 1-16;UTC+0 落在 1-15
        let s = vec![session(dt("2026-01-15T23:30:00Z"), 25)];
        let empty: Vec<Task> = Vec::new();
        let no_projects: Vec<Project> = Vec::new();

        let r = range_stats(
            &s,
            &empty,
            &no_projects,
            "2026-01-01",
            "2026-01-31",
            StatsGroup::Day,
            480,
        );
        assert_eq!(r.trend.len(), 1);
        assert_eq!(r.trend[0].key, "2026-01-16");

        let r = range_stats(
            &s,
            &empty,
            &no_projects,
            "2026-01-01",
            "2026-01-31",
            StatsGroup::Day,
            UTC0,
        );
        assert_eq!(r.trend[0].key, "2026-01-15");

        // 西五区(-300):23:30Z → 18:30 同日
        let r = range_stats(
            &s,
            &empty,
            &no_projects,
            "2026-01-01",
            "2026-01-31",
            StatsGroup::Day,
            -300,
        );
        assert_eq!(r.trend[0].key, "2026-01-15");
    }

    #[test]
    fn excludes_incomplete_and_taskless_sessions() {
        let mut s1 = session(dt("2026-01-15T10:00:00Z"), 25);
        s1.is_completed = false; // 中途放弃
        let mut s2 = session(dt("2026-01-15T11:00:00Z"), 25);
        s2.task_id = None; // 无任务专注
        let s3 = session(dt("2026-01-15T12:00:00Z"), 30);

        let empty: Vec<Task> = Vec::new();
        let no_projects: Vec<Project> = Vec::new();
        let r = range_stats(
            &[s1, s2, s3],
            &empty,
            &no_projects,
            "2026-01-01",
            "2026-01-31",
            StatsGroup::Day,
            UTC0,
        );
        assert_eq!(r.summary.total_minutes, 30);
        assert_eq!(r.summary.total_sessions, 1);
    }

    #[test]
    fn week_key_is_monday() {
        // 2026-01-12 是周一;15(周四)、18(周日)→ 01-12;19(周一)→ 01-19
        let s = vec![
            session(dt("2026-01-15T10:00:00Z"), 25),
            session(dt("2026-01-18T10:00:00Z"), 25),
            session(dt("2026-01-19T10:00:00Z"), 50),
        ];
        let empty: Vec<Task> = Vec::new();
        let no_projects: Vec<Project> = Vec::new();
        let r = range_stats(
            &s,
            &empty,
            &no_projects,
            "2026-01-01",
            "2026-01-31",
            StatsGroup::Week,
            UTC0,
        );
        assert_eq!(r.trend.len(), 2);
        assert_eq!(r.trend[0].key, "2026-01-12");
        assert_eq!(r.trend[0].minutes, 50); // 周四+周日合并
        assert_eq!(r.trend[1].key, "2026-01-19");
        assert_eq!(r.trend[1].minutes, 50);
    }

    #[test]
    fn month_key_and_range_bounds_inclusive() {
        let s = vec![
            session(dt("2026-01-01T00:30:00Z"), 10), // start 当天(计入)
            session(dt("2026-01-31T23:00:00Z"), 20), // end 当天(计入)
            session(dt("2026-02-01T00:30:00Z"), 40), // 区间外
        ];
        let empty: Vec<Task> = Vec::new();
        let no_projects: Vec<Project> = Vec::new();
        let r = range_stats(
            &s,
            &empty,
            &no_projects,
            "2026-01-01",
            "2026-01-31",
            StatsGroup::Month,
            UTC0,
        );
        assert_eq!(r.trend.len(), 1);
        assert_eq!(r.trend[0].key, "2026-01");
        assert_eq!(r.trend[0].minutes, 30);
    }

    #[test]
    fn completed_tasks_counts_by_utc_day_in_range() {
        let mut in_range = completed_task("2026-01-10", None, 1, Some(25));
        in_range.title = "边界内".into();
        let mut on_end = completed_task("2026-01-31", None, 1, Some(25));
        on_end.title = "end 当天".into();
        let mut after = completed_task("2026-02-02", None, 1, Some(25));
        after.title = "区间外".into();
        let mut active = Task::new("未完成");
        active.due_date = Some(dt("2026-01-15T12:00:00Z"));

        let no_sessions: Vec<PomodoroSession> = Vec::new();
        let no_projects: Vec<Project> = Vec::new();
        let r = range_stats(
            &no_sessions,
            &[in_range, on_end, after, active],
            &no_projects,
            "2026-01-01",
            "2026-01-31",
            StatsGroup::Day,
            UTC0,
        );
        assert_eq!(r.summary.completed_tasks, 2);
    }

    #[test]
    fn project_distribution_counts_completed_pomodoros_not_whole_tasks() {
        let pid = Id::new();
        let other = Id::new();
        let mut proj = Project::new("工作");
        proj.id = pid.clone();
        proj.color = "#ff0000".into();
        let mut proj2 = Project::new("生活");
        proj2.id = other.clone();

        // 未整体完成的进行中任务:8 个番茄完成 7 个 → 计入 7×25=175 分钟(v1 12bc45a 口径)
        let mut partial = Task::new("进行中,8 番茄完成 7");
        partial.project_id = Some(other.clone());
        partial.due_date = Some(dt("2026-01-20T12:00:00Z"));
        partial.estimated_pomodoros = 8;
        partial.completed_pomodoros = 7;
        partial.pomodoro_duration = Some(25);

        let tasks = vec![
            completed_task("2026-01-10", Some(pid.clone()), 3, Some(25)), // 75 分钟
            completed_task("2026-01-20", Some(pid.clone()), 1, None), // duration NULL → 0 分钟(直译 v1 or 0)
            completed_task("2026-01-20", Some(other.clone()), 2, Some(30)), // 60 分钟
            completed_task("2026-02-05", Some(pid.clone()), 5, Some(25)), // due 区间外
            completed_task("2026-01-20", None, 9, Some(25)),          // 无项目 → 不计
            partial,                                                  // active + 7 番茄 → 175 分钟
        ];

        let no_sessions: Vec<PomodoroSession> = Vec::new();
        let r = range_stats(
            &no_sessions,
            &tasks,
            &[proj, proj2],
            "2026-01-01",
            "2026-01-31",
            StatsGroup::Day,
            UTC0,
        );
        assert_eq!(r.projects.len(), 2);
        // 降序:生活 60+175=235 在前,工作 75 在后
        assert_eq!(r.projects[0].project_name, "生活");
        assert_eq!(r.projects[0].total_minutes, 235);
        assert_eq!(r.projects[1].project_name, "工作");
        assert_eq!(r.projects[1].total_minutes, 75);
        assert_eq!(r.projects[1].project_color, "#ff0000");
    }

    #[test]
    fn project_distribution_due_day_uses_local_calendar() {
        // 东八区:due 2026-02-01T02:00Z = 本地 2026-02-01 10:00 → 归 2 月;
        // UTC 日是 1-31,修复前(UTC 日界)会错归 1 月
        let pid = Id::new();
        let mut proj = Project::new("工作");
        proj.id = pid.clone();
        let mut t = Task::new("跨月边界");
        t.project_id = Some(pid.clone());
        t.due_date = Some(dt("2026-02-01T02:00:00Z"));
        t.completed_pomodoros = 2;
        t.pomodoro_duration = Some(25);

        let feb = range_stats(
            &[],
            &[t.clone()],
            &[proj.clone()],
            "2026-02-01",
            "2026-02-28",
            StatsGroup::Day,
            480,
        );
        assert_eq!(feb.projects.len(), 1);
        assert_eq!(feb.projects[0].total_minutes, 50);

        let jan = range_stats(
            &[],
            &[t],
            &[proj],
            "2026-01-01",
            "2026-01-31",
            StatsGroup::Day,
            480,
        );
        assert!(jan.projects.is_empty());
    }

    #[test]
    fn overview_periods_and_all_time_totals() {
        // today=2026-01-15(周四), week_start=01-12, month_start=01-01
        let s = vec![
            session(dt("2026-01-15T09:00:00Z"), 25), // today/week/month
            session(dt("2026-01-13T09:00:00Z"), 25), // week/month
            session(dt("2026-01-02T09:00:00Z"), 30), // month
            session(dt("2025-12-20T09:00:00Z"), 45), // 仅全时段
        ];
        let mut done = Task::new("已完成");
        done.status = TaskStatus::Completed;

        let o = overview_stats(
            &s,
            &[done, Task::new("进行中")],
            "2026-01-15",
            "2026-01-12",
            "2026-01-01",
            UTC0,
        );
        assert_eq!(o.today_minutes, 25);
        assert_eq!(o.today_sessions, 1);
        assert_eq!(o.week_minutes, 50);
        assert_eq!(o.week_sessions, 2);
        assert_eq!(o.month_minutes, 80);
        assert_eq!(o.total_sessions, 4);
        assert_eq!(o.total_tasks_completed, 1);
    }

    #[test]
    fn overview_respects_local_timezone() {
        // 2026-01-15 23:30 UTC,东八区 → 1-16:不计入 "今天=1-15"
        let s = vec![session(dt("2026-01-15T23:30:00Z"), 25)];
        let o = overview_stats(&s, &[], "2026-01-15", "2026-01-12", "2026-01-01", 480);
        assert_eq!(o.today_minutes, 0);
        // 但计入周/月
        assert_eq!(o.week_minutes, 25);
        assert_eq!(o.month_minutes, 25);
    }

    #[test]
    fn invalid_dates_yield_empty_stats() {
        let r = range_stats(&[], &[], &[], "bad", "2026-01-31", StatsGroup::Day, UTC0);
        assert!(r.trend.is_empty());
        assert_eq!(r.summary.total_minutes, 0);
    }
}
