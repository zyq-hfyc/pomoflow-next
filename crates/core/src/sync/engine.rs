//! 同步引擎 —— Push/Pull 的客户端侧编排(纯 trait,无 I/O)。
//!
//! 桌面端(P1a)把 `ChangeLogStore` 指向 SqliteStore、把 HTTP 传输接上即得完整
//! 同步;`tests/sync_e2e.rs` 用 InMemoryStore + 内存 fake cloud 走同一引擎,
//! 即 P0 验收 #5 的"两端 mock 闭环"。
//!
//! ## 一次完整同步的时序
//!
//! ```text
//! 1. push  = build_push_request(...)        → 传输层发 PushRequest
//! 2.       ← apply_push_outcomes(...)        处理逐条裁决:
//!            Accepted/Dropped → mark_synced(不再重推)
//!            Conflicted      → apply_remote(winner) 就地收敛
//! 3. loop  pull(游标) → apply_pull_response(...)
//!            每条远端变更先 local_candidate 与本地行同源 LWW:
//!            远端胜 → apply_remote + synced;本地胜 → 保留 pending 下轮再推
//! 4.       推进本地持久化游标(next_cursor)
//! ```

use super::{ChangeLogStore, PushRequest, PushResponse};
use crate::error::{CoreError, CoreResult};
use crate::model::Id;

/// 变更实体 id 的域校验(脏数据防线的判据)。多数实体 UUID 主键;复盘家族
/// 以周期串为同步自然键(daily/weekly = 日期,monthly = `YYYY-MM`,yearly =
/// 年份),拿 UUID 去卡会把合法复盘整族误杀(2026-11-20 CI 抓过一次)。此闸
/// 只为拦「移动端老数字串 id 经云回流」这类垃圾,格式合法即放行。
fn entity_id_in_domain(entity: super::EntityKind, entity_id: &str) -> bool {
    match entity {
        super::EntityKind::DailyReview | super::EntityKind::WeeklyReview => {
            chrono::NaiveDate::parse_from_str(entity_id, "%Y-%m-%d").is_ok()
        }
        super::EntityKind::MonthlyReview => {
            let b = entity_id.as_bytes();
            b.len() == 7
                && b[4] == b'-'
                && b.iter()
                    .enumerate()
                    .all(|(i, c)| i == 4 || c.is_ascii_digit())
        }
        super::EntityKind::YearlyReview => {
            entity_id.len() == 4 && entity_id.bytes().all(|b| b.is_ascii_digit())
        }
        _ => Id::parse(entity_id).is_some(),
    }
}

/// 组装推送请求:收集本地 pending 变更(实体快照,含 tombstone)。
pub fn build_push_request(
    user_id: &Id,
    device_id: &str,
    store: &dyn ChangeLogStore,
    limit: usize,
) -> CoreResult<PushRequest> {
    Ok(PushRequest {
        user_id: user_id.clone(),
        device_id: device_id.to_string(),
        changes: store.list_pending(limit)?,
    })
}

/// 应用推送裁决:
/// - `Accepted` / `Dropped` → 该行标记 synced(拒收也不重推,避免死循环);
/// - `Conflicted` → 库内实体胜出,把权威快照应用回本地(同一套 LWW 语义)。
///
/// `pushed` 必须是与 `PushRequest.changes` 同序的原始变更列表(与
/// `resp.results` 按下标一一对应)。
///
/// 2026-09-14 批量化:winners 经 `apply_remotes` 一次应用、synced keys 一次
/// `mark_synced`(此前逐条各调一次,一批 N 条 = 2N 次锁往返)。
pub fn apply_push_outcomes(
    store: &dyn ChangeLogStore,
    pushed: &[Change],
    resp: &PushResponse,
) -> CoreResult<()> {
    if pushed.len() != resp.results.len() {
        return Err(CoreError::sync(format!(
            "push/results 长度不一致: pushed={} results={}",
            pushed.len(),
            resp.results.len()
        )));
    }
    let mut synced_keys: Vec<(super::EntityKind, String)> = Vec::new();
    let mut winners: Vec<Change> = Vec::new();
    for (change, outcome) in pushed.iter().zip(resp.results.iter()) {
        match outcome {
            super::ApplyOutcome::Accepted { .. } | super::ApplyOutcome::Dropped { .. } => {
                synced_keys.push((change.entity, change.entity_id.clone()));
            }
            super::ApplyOutcome::Conflicted { winner, .. } => {
                winners.push(winner.clone());
            }
        }
    }
    store.apply_remotes(&winners)?;
    store.mark_synced(&synced_keys)?;
    Ok(())
}

use super::Change;

/// pull 阶段「远端胜出 / 打平,覆盖了本地已有行」的记录(供冲突日志)。
/// 随批量 candidates 读取一次性带回(2026-09-14)—— 此前 sync_client 为记
/// 冲突日志对每条 pull 变更再逐条查一次 candidate,与引擎内部查询重复。
#[derive(Debug, Clone, PartialEq)]
pub struct PullOverridden {
    /// 被覆盖前的本地行快照
    pub local: Change,
    /// 胜出的远端变更
    pub remote: Change,
}

/// 应用拉取批次:整批先一次取回本地竞争快照(`local_candidates`,单锁),
/// 逐条与本地行竞争(同源 `lww::resolve_conflict`,ADR-009),胜者经
/// `apply_remotes` 一次应用。
///
/// 返回「远端覆盖了本地已有行」的清单(远端胜 / 打平;本地无行不产生覆盖),
/// 供上层写冲突日志。本地胜的行保持 pending,下一轮 push 会把本地版本推
/// 上去 —— 双向收敛。
pub fn apply_pull_response(
    store: &dyn ChangeLogStore,
    changes: &[Change],
) -> CoreResult<Vec<PullOverridden>> {
    if changes.is_empty() {
        return Ok(Vec::new());
    }
    // 脏数据防线(2026-11-20 随手记事故):远端变更实体 id 非法(移动端老
    // 数字串 id / E2E 测试种子经云回流)整条跳过 —— 不应用、不进库,一行垃圾
    // 不得打挂桌面端列表页。本引擎是双端 pull 的唯一咽喉,桌面与移动 FFI
    // 同享此闸;跳过的条目游标已在服务端推进,下轮不会重发。id 域按 kind 分
    // (见 `entity_id_in_domain`):复盘家族是周期串自然键,不能拿 UUID 卡。
    let clean: Vec<&Change> = changes
        .iter()
        .filter(|c| entity_id_in_domain(c.entity, &c.entity_id))
        .collect();
    if clean.is_empty() {
        return Ok(Vec::new());
    }
    let keys: Vec<(super::EntityKind, String)> = clean
        .iter()
        .map(|c| (c.entity, c.entity_id.clone()))
        .collect();
    let locals = store.local_candidates(&keys)?;
    let mut overridden: Vec<PullOverridden> = Vec::new();
    let mut winners: Vec<&Change> = Vec::new();
    for (remote, local) in clean.into_iter().zip(locals) {
        match local {
            Some(local) => match super::resolve_conflict(&local, remote) {
                super::Resolution::Left => {} // 本地胜,保持 pending
                super::Resolution::Right | super::Resolution::Tie => {
                    overridden.push(PullOverridden {
                        local,
                        remote: remote.clone(),
                    });
                    winners.push(remote);
                }
            },
            // 本地无此行(从未见过或本设备删过历史…软删行仍在,会走上面的比较)
            None => winners.push(remote),
        }
    }
    let winner_refs: Vec<Change> = winners.into_iter().cloned().collect();
    store.apply_remotes(&winner_refs)?;
    Ok(overridden)
}

#[cfg(test)]
mod tests {
    // 引擎行为由 tests/sync_e2e.rs 的七场景端到端锁定;此处只锁 2026-11-20
    // 随手记事故新增的 pull id 防线(远端变更实体 id 非法 → 整条跳过不入库)。

    use super::*;
    use crate::model::Journal;
    use crate::store::{InMemoryStore, Store};
    use crate::sync::EntityKind;

    #[test]
    fn pull_skips_remote_changes_with_invalid_entity_id() {
        let store = InMemoryStore::with_user_device(Id::new(), "dev-a");
        let good = Journal::new("note", "合法行");
        let mut bad_payload = serde_json::to_value(&good).expect("journal 序列化");
        // 线形即服务端原样:载荷 id 是任意字符串(移动端老数字串 id / 测试种子)
        bad_payload["id"] = serde_json::json!("j01xxxx0000zzzz");
        let changes = vec![
            Change {
                id: uuid::Uuid::new_v4(),
                device_id: "dev-b".into(),
                entity: EntityKind::Journal,
                entity_id: "j01xxxx0000zzzz".into(),
                revision: 1,
                updated_at: chrono::Utc::now(),
                payload: bad_payload,
            },
            Change {
                id: uuid::Uuid::new_v4(),
                device_id: "dev-b".into(),
                entity: EntityKind::Journal,
                entity_id: good.id.to_string(),
                revision: good.revision,
                updated_at: chrono::Utc::now(),
                payload: serde_json::to_value(&good).expect("journal 序列化"),
            },
        ];

        apply_pull_response(&store, &changes).expect("非法 id 应跳过而非报错");

        let list = store.list_journals().expect("list_journals");
        assert_eq!(list.len(), 1, "脏变更不入库,合法变更正常应用");
        assert_eq!(list[0].id, good.id);
    }

    /// 域判据表:UUID 键控实体拦数字串垃圾;复盘家族放行周期串自然键,
    /// 同时对垃圾同样关闸(2026-11-20 CI:第一版按 UUID 一刀切,复盘被误杀)。
    #[test]
    fn entity_id_domain_table_uuid_vs_period_strings() {
        assert!(!entity_id_in_domain(EntityKind::Journal, "j01xxxx0000zzzz"));
        assert!(!entity_id_in_domain(EntityKind::Journal, "42"));
        assert!(entity_id_in_domain(
            EntityKind::Journal,
            &Id::new().to_string()
        ));

        assert!(entity_id_in_domain(EntityKind::DailyReview, "2026-08-20"));
        assert!(entity_id_in_domain(EntityKind::WeeklyReview, "2026-08-17"));
        assert!(entity_id_in_domain(EntityKind::MonthlyReview, "2026-08"));
        assert!(entity_id_in_domain(EntityKind::YearlyReview, "2026"));

        assert!(!entity_id_in_domain(EntityKind::DailyReview, "42"));
        assert!(!entity_id_in_domain(EntityKind::MonthlyReview, "2026-8x"));
        assert!(!entity_id_in_domain(EntityKind::YearlyReview, "42"));
    }

    /// 端到端:复盘变更(entity_id = 日期串)必须过闸入库 —— 正是 CI 上
    /// review_delete_as_empty_content_propagates 挂掉的路径。
    #[test]
    fn pull_keeps_review_changes_keyed_by_period_strings() {
        let store = InMemoryStore::with_user_device(Id::new(), "dev-b");
        let review = crate::model::DailyReview {
            id: Id::new(),
            user_id: Id::nil(),
            date: "2026-08-20".into(),
            content: "今天专注 4 个番茄".into(),
            revision: 1,
            deleted_at: None,
            updated_at: crate::model::Timestamp(chrono::Utc::now()),
        };
        let change = Change {
            id: uuid::Uuid::new_v4(),
            device_id: "dev-a".into(),
            entity: EntityKind::DailyReview,
            entity_id: "2026-08-20".into(),
            revision: review.revision,
            updated_at: chrono::Utc::now(),
            payload: serde_json::to_value(&review).expect("review 序列化"),
        };

        apply_pull_response(&store, &[change]).expect("周期串键的复盘变更应放行");

        let got = store
            .get_daily_review("2026-08-20")
            .expect("get_daily_review");
        assert_eq!(
            got.map(|r| r.content).as_deref(),
            Some("今天专注 4 个番茄"),
            "复盘变更应过闸入库"
        );
    }
}
