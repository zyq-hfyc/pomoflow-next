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
    for (change, outcome) in pushed.iter().zip(resp.results.iter()) {
        match outcome {
            super::ApplyOutcome::Accepted { .. } | super::ApplyOutcome::Dropped { .. } => {
                store.mark_synced(&[(change.entity, change.entity_id.clone())])?;
            }
            super::ApplyOutcome::Conflicted { winner, .. } => {
                store.apply_remote(winner)?;
            }
        }
    }
    Ok(())
}

use super::Change;

/// 应用拉取批次:逐条与本地行竞争(同源 `lww::resolve_conflict`,ADR-009)。
/// 本地行不存在或本地胜 → 无事;远端胜/完全一致 → `apply_remote`(synced)。
/// 本地胜的行保持 pending,下一轮 push 会把本地版本推上去 —— 双向收敛。
pub fn apply_pull_response(store: &dyn ChangeLogStore, changes: &[Change]) -> CoreResult<()> {
    for remote in changes {
        if let Some(local) = store.local_candidate(remote.entity, &remote.entity_id)? {
            match super::resolve_conflict(&local, remote) {
                super::Resolution::Left => continue, // 本地胜,保持 pending
                super::Resolution::Right | super::Resolution::Tie => {
                    store.apply_remote(remote)?;
                }
            }
        } else {
            // 本地无此行(从未见过或本设备删过历史…软删行仍在,会走上面的比较)
            store.apply_remote(remote)?;
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    // 引擎本身无独立单测:它的行为由 tests/sync_e2e.rs 的七场景端到端锁定。
}
