//! Last-Writer-Wins 合并核心
//!
//! ## 仲裁规则(严格顺序)
//!
//! 1. `revision` 大的胜出(revision 单调递增,本地每次写入 +1)
//! 2. 若 `revision` 相等,`updated_at` 大的胜出(纳秒精度,极少撞)
//! 3. 若两者都相等,**`device_id` 字典序大的胜出**(打破循环,保证确定性)
//!
//! ## 反直觉的边界 case
//!
//! - **同设备先后两条**:revision 单调递增,第二条总胜,无需特殊处理。
//! - **跨设备同时分配相同 revision**:`updated_at` 兜底;极小概率仍撞,
//!   由 device_id 字典序打破(全局确定性)。
//! - **一方删除(deletion tombstone)**:删除也走 LWW(`deleted_at` 非空),
//!   被另一端的"复活"操作可能被删除覆盖——这正是我们要的语义
//!   ("最近一次操作生效",不复活被显式删除的内容)。

use chrono::{DateTime, Utc};

use super::Change;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Resolution {
    Left,
    Right,
    Tie,
}

/// 比较两条 Change,返回胜者。
///
/// 返回 `Tie` 表示两条记录完全等价(连 `device_id` 都相等),调用方可任选一条
/// 或跳过。
pub fn resolve_conflict<'a>(left: &'a Change, right: &'a Change) -> Resolution {
    // 1. revision 仲裁
    match left.revision.cmp(&right.revision) {
        std::cmp::Ordering::Greater => return Resolution::Left,
        std::cmp::Ordering::Less => return Resolution::Right,
        std::cmp::Ordering::Equal => {}
    }

    // 2. updated_at 兜底
    match left.updated_at.cmp(&right.updated_at) {
        std::cmp::Ordering::Greater => return Resolution::Left,
        std::cmp::Ordering::Less => return Resolution::Right,
        std::cmp::Ordering::Equal => {}
    }

    // 3. device_id 字典序打破循环
    match left.device_id.cmp(&right.device_id) {
        std::cmp::Ordering::Greater => Resolution::Left,
        std::cmp::Ordering::Less => Resolution::Right,
        std::cmp::Ordering::Equal => Resolution::Tie,
    }
}

/// 实用工具:取一对 timestamp + device_id 的"虚拟 revision",便于不构造完整 Change
/// 也能复算 LWW(P0 测试用)。
pub fn compare_timestamps(
    left_rev: u64,
    left_at: DateTime<Utc>,
    left_dev: &str,
    right_rev: u64,
    right_at: DateTime<Utc>,
    right_dev: &str,
) -> Resolution {
    let l = Change {
        id: uuid::Uuid::nil(),
        device_id: left_dev.to_string(),
        entity: crate::sync::EntityKind::Task,
        entity_id: String::new(),
        revision: left_rev,
        updated_at: left_at,
        payload: serde_json::Value::Null,
    };
    let r = Change {
        id: uuid::Uuid::nil(),
        device_id: right_dev.to_string(),
        entity: crate::sync::EntityKind::Task,
        entity_id: String::new(),
        revision: right_rev,
        updated_at: right_at,
        payload: serde_json::Value::Null,
    };
    resolve_conflict(&l, &r)
}

#[cfg(test)]
mod tests {
    use super::*;

    fn at(s: &str) -> DateTime<Utc> {
        use chrono::NaiveDateTime;
        NaiveDateTime::parse_from_str(s, "%Y-%m-%d %H:%M:%S%.f")
            .unwrap()
            .and_utc()
    }

    fn make(rev: u64, ts: DateTime<Utc>, dev: &str) -> Change {
        Change {
            id: uuid::Uuid::nil(),
            device_id: dev.to_string(),
            entity: crate::sync::EntityKind::Task,
            entity_id: "x".to_string(),
            revision: rev,
            updated_at: ts,
            payload: serde_json::json!({}),
        }
    }

    #[test]
    fn higher_revision_wins() {
        let l = make(2, at("2026-01-01 00:00:00.000"), "dev-a");
        let r = make(1, at("2026-01-02 00:00:00.000"), "dev-b");
        // l.revision > r.revision,即使 l.updated_at 更早也应胜出
        assert_eq!(resolve_conflict(&l, &r), Resolution::Left);
        assert_eq!(resolve_conflict(&r, &l), Resolution::Right);
    }

    #[test]
    fn updated_at_breaks_revision_tie() {
        let l = make(5, at("2026-01-01 00:00:00.000"), "dev-a");
        let r = make(5, at("2026-01-02 00:00:00.000"), "dev-b");
        assert_eq!(resolve_conflict(&l, &r), Resolution::Right);
    }

    #[test]
    fn device_id_breaks_full_tie() {
        let ts = at("2026-01-01 00:00:00.000");
        let l = make(7, ts, "dev-a");
        let r = make(7, ts, "dev-b");
        // device_id 字典序: "dev-b" > "dev-a",所以 Right 胜
        assert_eq!(resolve_conflict(&l, &r), Resolution::Right);
    }

    #[test]
    fn perfect_tie_returns_tie() {
        let ts = at("2026-01-01 00:00:00.000");
        let l = make(7, ts, "dev-a");
        let r = make(7, ts, "dev-a");
        assert_eq!(resolve_conflict(&l, &r), Resolution::Tie);
    }
}
