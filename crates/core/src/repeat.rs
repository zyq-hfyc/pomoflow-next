//! 重复任务日期引擎 —— v1 `backend/app/crud.py:123-319` 的纯 Rust 翻译。
//!
//! ## v1 语义(逐条保持,含怪癖)
//!
//! - [`REPEAT_MAX_INSTANCES`] = 50 硬上限,所有规则共用。
//! - 实例日期**不含模板 due 当天**,保留 due 的时:分(秒归零 —— v1 `make()`
//!   只传 hour/minute,构造出的 datetime 秒为 0)。
//! - `daily` / `weekday` / `weekly` / `monthly`:从 due+1 起算到**当年 12-31** 为止;
//!   `weekday` 只取周一~周五;`monthly` 同月同日,缺日月份(如 31 号遇 2 月)
//!   **跳过**;`yearly` due 年+1 起算 **+5 年**,2/29 在非闰年**跳过**。
//! - `custom`(JSON `{interval, type, startDate, endDate, weekdays?, monthDays?}`):
//!   - 解析失败 / 缺 `endDate` → 空(不生成)
//!   - `interval` 夹紧 0..=99,**步进 = interval+1**(0=每周期,1=隔 1 周期)
//!   - `start` 缺省取 due;时:分取自 `start`(配了 startDate 就用它的时间)
//!   - `week`:weekdays 1(一)~7(日)多选,从 start 所在周的周一起按步进取周,
//!     日期须满足 **start_d < d <= end_d**(严格大于起点、含终点)
//!   - `month`:monthDays 1~31 多选,非法日(2/30)跳过
//!   - `year`:同月同日按年步进,y 上界 end.year+1,日须 <= end_d
//! - [`compute_repeat_end_date`]:yearly → due+5 年(2/29 **钳制到 2/28**,
//!   与实例生成的"跳过"不同,v1 两处行为就不一致,保持);custom → endDate;
//!   其余 → 当年 12-31 23:59。

use chrono::{DateTime, Datelike, NaiveDate, Timelike, Utc};
use serde::Deserialize;

use crate::model::{Repeat, Task};

/// 单个模板最多预生成的实例数(v1 REPEAT_MAX_INSTANCES)。
pub const REPEAT_MAX_INSTANCES: usize = 50;

// === 安全日期构造 ===

/// 构造日期;无效(如 2/30、非闰年 2/29)返回 None(v1 `_safe_date`)。
fn safe_date(y: i32, m: u32, d: u32) -> Option<NaiveDate> {
    NaiveDate::from_ymd_opt(y, m, d)
}

/// 替换年份;2/29 等边界回退到 2/28(v1 `_safe_dt_replace_year`)。
fn replace_year(dt: DateTime<Utc>, year: i32) -> Option<DateTime<Utc>> {
    let naive = dt.naive_utc();
    NaiveDate::from_ymd_opt(year, naive.month(), naive.day())
        .or_else(|| NaiveDate::from_ymd_opt(year, naive.month(), 28))
        .and_then(|d| d.and_hms_opt(naive.hour(), naive.minute(), 0))
        .map(|n| DateTime::<Utc>::from_naive_utc_and_offset(n, Utc))
}

/// 由日期 + 时:分构造 UTC 时刻(秒归零,对齐 v1 `make()`)。
fn at_hm(d: NaiveDate, hour: u32, minute: u32) -> Option<DateTime<Utc>> {
    d.and_hms_opt(hour, minute, 0)
        .map(|n| DateTime::<Utc>::from_naive_utc_and_offset(n, Utc))
}

/// 宽松解析 v1 存的 ISO 字符串:日期 / 日期T时分 / 带秒带 Z 均可,naive 视作 UTC。
fn parse_dt(s: &str) -> Option<DateTime<Utc>> {
    let s = s.trim();
    if let Ok(d) = NaiveDate::parse_from_str(s, "%Y-%m-%d") {
        return at_hm(d, 0, 0);
    }
    // 去掉可能的时区后缀(Z / +08:00)按 naive 解析再视为 UTC(v1 fromisoformat
    // 语义:存的都是 naive 本地时钟值)
    let trimmed = s
        .trim_end_matches('Z')
        .split_once("+")
        .map(|(a, _)| a)
        .unwrap_or(s);
    for fmt in [
        "%Y-%m-%dT%H:%M",
        "%Y-%m-%d %H:%M",
        "%Y-%m-%dT%H:%M:%S",
        "%Y-%m-%d %H:%M:%S",
    ] {
        if let Ok(n) = chrono::NaiveDateTime::parse_from_str(trimmed, fmt) {
            return Some(DateTime::<Utc>::from_naive_utc_and_offset(n, Utc));
        }
    }
    DateTime::parse_from_rfc3339(s)
        .ok()
        .map(|d| d.with_timezone(&Utc))
}

// === 自定义规则 ===

/// `repeat_config` JSON 的类型化镜像(只取 v1 用到的字段)。
#[derive(Debug, Clone, PartialEq, Eq, Deserialize)]
#[serde(rename_all = "camelCase")]
struct CustomConfig {
    #[serde(default = "default_interval")]
    interval: i64,
    #[serde(rename = "type", default = "default_type")]
    rtype: String,
    start_date: Option<String>,
    end_date: Option<String>,
    #[serde(default)]
    weekdays: Vec<serde_json::Value>,
    #[serde(default)]
    month_days: Vec<serde_json::Value>,
}

fn default_interval() -> i64 {
    1
}

fn default_type() -> String {
    "day".to_string()
}

impl CustomConfig {
    /// 解析 JSON;非法/缺字段返回 None(v1 `_cfg` 空 dict → 不生成)。
    fn parse(config: Option<&str>) -> Option<Self> {
        let json = config?.trim();
        if json.is_empty() {
            return None;
        }
        serde_json::from_str::<CustomConfig>(json).ok()
    }

    /// interval 夹紧 0..=99,步进 = interval+1。
    fn step(&self) -> i64 {
        self.interval.clamp(0, 99) + 1
    }

    /// weekdays 1(一)~7(日)→ 周偏移 0..=6,升序去重。
    fn weekday_offsets(&self) -> Vec<i64> {
        let mut set = std::collections::BTreeSet::new();
        for w in &self.weekdays {
            if let Some(n) = w.as_i64() {
                if (1..=7).contains(&n) {
                    set.insert(n - 1);
                }
            }
        }
        set.into_iter().collect()
    }

    /// monthDays 1..=31 升序去重。
    fn month_days(&self) -> Vec<u32> {
        let mut set = std::collections::BTreeSet::new();
        for d in &self.month_days {
            if let Some(n) = d.as_i64() {
                if (1..=31).contains(&n) {
                    set.insert(n as u32);
                }
            }
        }
        set.into_iter().collect()
    }
}

/// 自定义规则实例日期(v1 `_compute_custom_dates`)。
fn compute_custom_dates(
    due: DateTime<Utc>,
    config: Option<&str>,
    max_count: usize,
) -> Vec<DateTime<Utc>> {
    let Some(cfg) = CustomConfig::parse(config) else {
        return Vec::new();
    };
    let step = cfg.step();
    let start = cfg.start_date.as_deref().and_then(parse_dt).unwrap_or(due);
    let Some(end) = cfg.end_date.as_deref().and_then(parse_dt) else {
        return Vec::new(); // 无 endDate → 不生成(v1 语义)
    };
    let start_d = start.date_naive();
    let end_d = end.date_naive();
    let (hour, minute) = (start.hour(), start.minute());

    let mut dates: Vec<DateTime<Utc>> = Vec::new();

    match cfg.rtype.as_str() {
        "day" => {
            let mut cur = start_d + chrono::Duration::days(step);
            while cur <= end_d && dates.len() < max_count {
                if let Some(dt) = at_hm(cur, hour, minute) {
                    dates.push(dt);
                }
                cur += chrono::Duration::days(step);
            }
        }
        "week" => {
            let offsets = cfg.weekday_offsets();
            // start 所在周的周一,整体按步进取周
            let week_start =
                start_d - chrono::Duration::days(start_d.weekday().num_days_from_monday() as i64);
            let mut cur_week = week_start + chrono::Duration::weeks(step);
            while cur_week <= end_d && dates.len() < max_count {
                for wd in &offsets {
                    let Some(d) = cur_week.checked_add_days(chrono::Days::new(*wd as u64)) else {
                        continue;
                    };
                    if start_d < d && d <= end_d {
                        if let Some(dt) = at_hm(d, hour, minute) {
                            dates.push(dt);
                        }
                        if dates.len() >= max_count {
                            break;
                        }
                    }
                }
                cur_week += chrono::Duration::weeks(step);
            }
        }
        "month" => {
            let days = cfg.month_days();
            let mut y = start.year();
            let mut m = start.month() as i64 + step;
            while dates.len() < max_count {
                while m > 12 {
                    m -= 12;
                    y += 1;
                }
                if NaiveDate::from_ymd_opt(y, m as u32, 1).is_none_or(|f| f > end_d) {
                    break;
                }
                for day in &days {
                    if let Some(d) = safe_date(y, m as u32, *day) {
                        if start_d < d && d <= end_d {
                            if let Some(dt) = at_hm(d, hour, minute) {
                                dates.push(dt);
                            }
                            if dates.len() >= max_count {
                                break;
                            }
                        }
                    }
                }
                m += step;
            }
        }
        "year" => {
            let mut y = start.year() + step as i32;
            while i64::from(y) <= i64::from(end.year()) + 1 && dates.len() < max_count {
                if let Some(d) = safe_date(y, start.month(), start.day()) {
                    if d <= end_d {
                        if let Some(dt) = at_hm(d, hour, minute) {
                            dates.push(dt);
                        }
                    }
                }
                y += step as i32;
            }
        }
        _ => {}
    }
    dates
}

// === 入口 ===

/// 计算重复实例日期(不含 due 当天),上限 [`REPEAT_MAX_INSTANCES`]。
///
/// `rule == None`(不重复)或无 due → 空。
pub fn compute_repeat_dates(
    rule: Repeat,
    due: Option<DateTime<Utc>>,
    config: Option<&str>,
) -> Vec<DateTime<Utc>> {
    let Some(due) = due else {
        return Vec::new();
    };
    let (hour, minute) = (due.hour(), due.minute());
    let mut dates: Vec<DateTime<Utc>> = Vec::new();
    let end_of_year = NaiveDate::from_ymd_opt(due.year(), 12, 31).unwrap_or(due.date_naive());

    match rule {
        Repeat::None => {}
        Repeat::Custom => return compute_custom_dates(due, config, REPEAT_MAX_INSTANCES),
        Repeat::Daily | Repeat::Weekdays => {
            let mut cur = due.date_naive() + chrono::Duration::days(1);
            while cur <= end_of_year && dates.len() < REPEAT_MAX_INSTANCES {
                if rule == Repeat::Daily || cur.weekday().num_days_from_monday() < 5 {
                    if let Some(dt) = at_hm(cur, hour, minute) {
                        dates.push(dt);
                    }
                }
                cur += chrono::Duration::days(1);
            }
        }
        Repeat::Weekly => {
            let mut cur = due.date_naive() + chrono::Duration::days(7);
            while cur <= end_of_year && dates.len() < REPEAT_MAX_INSTANCES {
                if let Some(dt) = at_hm(cur, hour, minute) {
                    dates.push(dt);
                }
                cur += chrono::Duration::days(7);
            }
        }
        Repeat::Monthly => {
            let (day, mut y, mut m) = (due.day(), due.year(), due.month());
            while dates.len() < REPEAT_MAX_INSTANCES {
                m += 1;
                if m > 12 {
                    m = 1;
                    y += 1;
                }
                let Some(d) = safe_date(y, m, day) else {
                    continue; // 该月无此日(31 号遇短月)→ 跳过
                };
                if d > end_of_year {
                    break;
                }
                if let Some(dt) = at_hm(d, hour, minute) {
                    dates.push(dt);
                }
            }
        }
        Repeat::Yearly => {
            let mut y = due.year() + 1;
            let end_year = due.year() + 5;
            while y <= end_year && dates.len() < REPEAT_MAX_INSTANCES {
                // 2/29 在非闰年 _safe_date 返回 None → 跳过该年
                if let Some(d) = safe_date(y, due.month(), due.day()) {
                    if let Some(dt) = at_hm(d, hour, minute) {
                        dates.push(dt);
                    }
                }
                y += 1;
            }
        }
    }
    dates
}

/// 模板任务的重复终止时间(v1 `_compute_repeat_end_date`)。
///
/// yearly → due+5 年(2/29 钳制 2/28);custom → config.endDate;
/// 其余 → 当年 12-31 23:59;无 due / 不重复 → None。
pub fn compute_repeat_end_date(task: &Task) -> Option<DateTime<Utc>> {
    let due = task.due_date?;
    match task.repeat {
        Repeat::Yearly => Some(replace_year(due, due.year() + 5).unwrap_or(due)),
        Repeat::Custom => CustomConfig::parse(task.repeat_config.as_deref())
            .and_then(|c| c.end_date.as_deref().and_then(parse_dt)),
        _ => NaiveDate::from_ymd_opt(due.year(), 12, 31)?
            .and_hms_opt(23, 59, 0)
            .map(|n| DateTime::<Utc>::from_naive_utc_and_offset(n, Utc)),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::model::Task;

    fn dt(s: &str) -> DateTime<Utc> {
        parse_dt(s).unwrap()
    }

    fn dates_of(rule: Repeat, due: &str) -> Vec<String> {
        compute_repeat_dates(rule, Some(dt(due)), None)
            .iter()
            .map(|d| d.format("%Y-%m-%d %H:%M").to_string())
            .collect()
    }

    #[test]
    fn no_due_or_no_rule_yields_empty() {
        assert!(compute_repeat_dates(Repeat::Daily, None, None).is_empty());
        assert!(compute_repeat_dates(Repeat::None, Some(dt("2026-08-16T09:00")), None).is_empty());
    }

    #[test]
    fn daily_steps_to_end_of_year() {
        // 12-30 起:12-31 一条就到年底
        assert_eq!(
            dates_of(Repeat::Daily, "2026-12-30T09:30"),
            ["2026-12-31 09:30"]
        );
        // 8-16(周日)起:次日 8-17
        assert_eq!(
            dates_of(Repeat::Daily, "2026-08-16T09:30").first().unwrap(),
            "2026-08-17 09:30"
        );
        // 秒归零(v1 make() 只传时分)
        assert_eq!(
            compute_repeat_dates(Repeat::Daily, Some(dt("2026-08-16T09:30:45")), None)[0]
                .format("%H:%M:%S")
                .to_string(),
            "09:30:00"
        );
    }

    #[test]
    fn daily_caps_at_50() {
        let out = compute_repeat_dates(Repeat::Daily, Some(dt("2026-01-01T09:00")), None);
        assert_eq!(out.len(), 50);
        // 从 1-02 起 50 个:第 50 个 = 1-02 + 49 天 = 2-20
        assert_eq!(out[49].format("%Y-%m-%d").to_string(), "2026-02-20");
    }

    #[test]
    fn weekday_skips_weekend() {
        // 2026-08-14 周五 → 下一个是周一 8-17,再 8-18/19/20/21,跳过 8-22(六)/23(日)
        let out = dates_of(Repeat::Weekdays, "2026-08-14T09:00");
        assert_eq!(
            &out[..5],
            &[
                "2026-08-17 09:00",
                "2026-08-18 09:00",
                "2026-08-19 09:00",
                "2026-08-20 09:00",
                "2026-08-21 09:00"
            ]
        );
        assert!(!out
            .iter()
            .any(|d| d.starts_with("2026-08-22") || d.starts_with("2026-08-23")));
    }

    #[test]
    fn weekly_same_weekday_weekly() {
        // 8-16 周日 → 8-23 / 8-30 ...
        let out = dates_of(Repeat::Weekly, "2026-08-16T10:00");
        assert_eq!(&out[..2], &["2026-08-23 10:00", "2026-08-30 10:00"]);
        assert_eq!(out.len(), 19); // 8-23 起到 12-27,共 19 个周日
    }

    #[test]
    fn monthly_skips_months_lacking_day_and_stops_at_year_end() {
        // v1 语义:31 号月重复 → 缺 31 号的月份**整月跳过**(不钳制到 30);
        // 次年 1-31 > 12-31 → 停
        let out = dates_of(Repeat::Monthly, "2026-01-31T08:00");
        assert_eq!(
            out,
            [
                "2026-03-31 08:00",
                "2026-05-31 08:00",
                "2026-07-31 08:00",
                "2026-08-31 08:00",
                "2026-10-31 08:00",
                "2026-12-31 08:00"
            ]
        );
    }

    #[test]
    fn yearly_five_years_and_skips_feb29() {
        // due 取闰年 2028-02-29:2029-2031 非闰年跳过,2032 闰年且 <= 2028+5 → 唯一实例
        let out = dates_of(Repeat::Yearly, "2028-02-29T09:00");
        assert_eq!(out, ["2032-02-29 09:00"]);

        let normal = dates_of(Repeat::Yearly, "2026-08-16T09:00");
        assert_eq!(normal.len(), 5);
        assert_eq!(normal[0], "2027-08-16 09:00");
        assert_eq!(normal[4], "2031-08-16 09:00");
    }

    // === custom ===

    fn custom_dates(due: &str, cfg: &str) -> Vec<String> {
        compute_repeat_dates(Repeat::Custom, Some(dt(due)), Some(cfg))
            .iter()
            .map(|d| d.format("%Y-%m-%d %H:%M").to_string())
            .collect()
    }

    #[test]
    fn custom_invalid_or_missing_end_yields_empty() {
        assert!(custom_dates("2026-08-16T09:00", "not json").is_empty());
        assert!(custom_dates(
            "2026-08-16T09:00",
            r#"{"type":"day","interval":1,"startDate":"2026-08-16"}"#
        )
        .is_empty());
    }

    #[test]
    fn custom_day_interval_zero_means_every_day() {
        // interval 0 → 步进 1:每天,严格 > start。
        // v1 语义:startDate 只有日期时 fromisoformat 得 00:00,实例时间也是 00:00
        // (时间取自 startDate 本身,不是 due)
        let out = custom_dates(
            "2026-08-16T09:00",
            r#"{"interval":0,"type":"day","startDate":"2026-08-16","endDate":"2026-08-20"}"#,
        );
        assert_eq!(
            out,
            [
                "2026-08-17 00:00",
                "2026-08-18 00:00",
                "2026-08-19 00:00",
                "2026-08-20 00:00"
            ]
        );
    }

    #[test]
    fn custom_day_interval_one_skips_a_day() {
        let out = custom_dates(
            "2026-08-16T09:00",
            r#"{"interval":1,"type":"day","startDate":"2026-08-16","endDate":"2026-08-25"}"#,
        );
        assert_eq!(
            out,
            [
                "2026-08-18 00:00",
                "2026-08-20 00:00",
                "2026-08-22 00:00",
                "2026-08-24 00:00"
            ]
        );
    }

    #[test]
    fn custom_interval_clamped_to_99() {
        // interval 999 → 夹到 99 → 步进 100 天:8-16 + 100 = 11-24,仍在 end 内 → 1 条
        let out = custom_dates(
            "2026-08-16T09:00",
            r#"{"interval":999,"type":"day","startDate":"2026-08-16","endDate":"2026-12-31"}"#,
        );
        assert_eq!(out, ["2026-11-24 00:00"]);
    }

    #[test]
    fn custom_week_weekdays_and_strict_bounds() {
        // start 8-16(周日,所在周周一 8-10);步进 1;周一周五;end 8-28
        // 第一个候选周:8-17 那周 → 8-17(一)、8-21(五);下周 8-24、8-28
        let out = custom_dates(
            "2026-08-16T09:00",
            r#"{"interval":0,"type":"week","startDate":"2026-08-16","endDate":"2026-08-28","weekdays":[1,5]}"#,
        );
        assert_eq!(
            out,
            [
                "2026-08-17 00:00",
                "2026-08-21 00:00",
                "2026-08-24 00:00",
                "2026-08-28 00:00"
            ]
        );

        // 严格起点:候选周从 start+step 周起,start 所在周(周一 8-10)永不生成
        let same_week = custom_dates(
            "2026-08-16T09:00",
            r#"{"interval":0,"type":"week","startDate":"2026-08-16","endDate":"2026-08-16","weekdays":[1]}"#,
        );
        assert!(same_week.is_empty());
    }

    #[test]
    fn custom_month_days_skip_invalid() {
        // monthDays 29/31:2 月两日皆无效跳过;3 月取 29/31(升序);
        // 严格 start_d < d:1-31 当天已过不生成;m=4 时月首 > end → 停
        let out = custom_dates(
            "2026-01-31T09:00",
            r#"{"interval":0,"type":"month","startDate":"2026-01-31","endDate":"2026-03-31","monthDays":[31,29]}"#,
        );
        assert_eq!(out, ["2026-03-29 00:00", "2026-03-31 00:00"]);
    }

    #[test]
    fn custom_year_same_month_day_stepped() {
        // 2026-08-16 起,interval 1(每 2 年):2028、2030;end 2031-12-31
        let out = custom_dates(
            "2026-08-16T09:00",
            r#"{"interval":1,"type":"year","startDate":"2026-08-16","endDate":"2031-12-31"}"#,
        );
        assert_eq!(out, ["2028-08-16 00:00", "2030-08-16 00:00"]);
    }

    #[test]
    fn custom_start_time_taken_from_config_start() {
        // startDate 自带 14:30 → 实例时间用 14:30 而非 due 的 09:00
        let out = custom_dates(
            "2026-08-16T09:00",
            r#"{"interval":0,"type":"day","startDate":"2026-08-16T14:30","endDate":"2026-08-17"}"#,
        );
        assert_eq!(out, ["2026-08-17 14:30"]);
    }

    #[test]
    fn custom_caps_at_50() {
        let out = custom_dates(
            "2026-01-01T09:00",
            r#"{"interval":0,"type":"day","startDate":"2026-01-01","endDate":"2030-12-31"}"#,
        );
        assert_eq!(out.len(), 50);
    }

    // === end date ===

    fn task_with(rule: Repeat, due: &str, config: Option<&str>) -> Task {
        let mut t = Task::new("模板");
        t.repeat = rule;
        t.due_date = Some(dt(due));
        t.repeat_config = config.map(|s| s.to_string());
        t
    }

    #[test]
    fn end_date_yearly_clamps_feb29() {
        let t = task_with(Repeat::Yearly, "2028-02-29T09:00", None);
        assert_eq!(
            compute_repeat_end_date(&t)
                .unwrap()
                .format("%Y-%m-%d")
                .to_string(),
            "2033-02-28"
        );
    }

    #[test]
    fn end_date_custom_takes_config_end() {
        let t = task_with(
            Repeat::Custom,
            "2026-08-16T09:00",
            Some(r#"{"type":"week","endDate":"2026-10-01","weekdays":[1]}"#),
        );
        assert_eq!(
            compute_repeat_end_date(&t)
                .unwrap()
                .format("%Y-%m-%d")
                .to_string(),
            "2026-10-01"
        );
    }

    #[test]
    fn end_date_regular_rules_dec31() {
        let t = task_with(Repeat::Daily, "2026-08-16T09:00", None);
        assert_eq!(
            compute_repeat_end_date(&t)
                .unwrap()
                .format("%Y-%m-%d %H:%M")
                .to_string(),
            "2026-12-31 23:59"
        );
        let none = task_with(Repeat::Daily, "2026-08-16T09:00", None);
        let _ = none; // (rule 无 due 的分支)
        let no_due = Task::new("无 due");
        assert!(compute_repeat_end_date(&no_due).is_none());
    }
}
