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
    let keys: Vec<(super::EntityKind, String)> = changes
        .iter()
        .map(|c| (c.entity, c.entity_id.clone()))
        .collect();
    let locals = store.local_candidates(&keys)?;
    let mut overridden: Vec<PullOverridden> = Vec::new();
    let mut winners: Vec<&Change> = Vec::new();
    for (remote, local) in changes.iter().zip(locals) {
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
    // 引擎本身无独立单测:它的行为由 tests/sync_e2e.rs 的七场景端到端锁定。
}
