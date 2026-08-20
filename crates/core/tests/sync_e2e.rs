//! 同步闭环 e2e —— P0 验收 #5「两端 mock 跑通 push → 合并 → pull」。
//!
//! `FakeCloud` 是纯内存的云端语义(权威快照 + server_changelog 单调 seq +
//! change_id 幂等去重),合并一律走 `core::sync::lww::resolve_conflict`
//! (ADR-009:revision → updated_at → device_id)—— 与将来真 Sync Service
//! 用同一段代码。设备端是 `InMemoryStore`(实现 `ChangeLogStore`)。
//!
//! 七场景(ADR-006/009/010/011 的活文档):
//! 1. 单端修改收敛
//! 2. 并发修改按 revision 裁决,输家经 Conflicted 收敛
//! 3. 时钟回拨:updated_at 更大但 revision 更小 → 仍按 revision 收敛(ADR-009)
//! 4. 删除传播:任务 tombstone 胜过并发旧改;复盘"空内容"删除传播(ADR-010)
//! 5. 离线多次修改只推最终快照
//! 6. pull 回环过滤(不见自己的变更)+ 游标分页(ADR-011)
//! 7. 重复 push(change_id 幂等)不产生重复下发

use pomoflow_core::model::{DailyReview, Id, Task, Timestamp};
use pomoflow_core::store::{InMemoryStore, Store, TaskQuery};
use pomoflow_core::sync::engine::{apply_pull_response, apply_push_outcomes, build_push_request};
use pomoflow_core::sync::{
    lww::resolve_conflict, ApplyOutcome, Change, ChangeLogStore, EntityKind, PushResponse,
    Resolution, SyncCursor,
};
use std::collections::HashSet;

// === 内存 fake 云端 ==========================================================

struct FakeCloud {
    /// 每 (entity, entity_id) 的最新权威 Change(全量快照)
    authoritative: Vec<Change>,
    /// server_changelog:seq 单调递增,只记"新落库的版本"(ADR-011)
    log: Vec<(u64, Change)>,
    /// 已见 change_id(重复 push 幂等)
    seen: HashSet<uuid::Uuid>,
}

impl FakeCloud {
    fn new() -> Self {
        Self {
            authoritative: Vec::new(),
            log: Vec::new(),
            seen: HashSet::new(),
        }
    }

    fn push(&mut self, req: &pomoflow_core::sync::PushRequest) -> PushResponse {
        let mut results = Vec::new();
        for change in &req.changes {
            // 幂等:同一条 change(客户端重试)直接按已受理返回,不重复记 log
            if !self.seen.insert(change.id) {
                let rev = self
                    .authoritative
                    .iter()
                    .rev()
                    .find(|c| c.entity == change.entity && c.entity_id == change.entity_id)
                    .map(|c| c.revision)
                    .unwrap_or(change.revision);
                results.push(ApplyOutcome::Accepted {
                    entity: change.entity,
                    entity_id: change.entity_id.clone(),
                    revision: rev,
                });
                continue;
            }

            let stored = self
                .authoritative
                .iter()
                .rev()
                .find(|c| c.entity == change.entity && c.entity_id == change.entity_id);

            let incoming_wins = match stored {
                None => true,
                Some(s) => !matches!(resolve_conflict(s, change), Resolution::Left),
            };

            if incoming_wins {
                let seq = self.log.last().map(|(s, _)| s + 1).unwrap_or(1);
                self.log.push((seq, change.clone()));
                // 覆盖权威表(同键只保留最新)
                self.authoritative
                    .retain(|c| !(c.entity == change.entity && c.entity_id == change.entity_id));
                self.authoritative.push(change.clone());
                results.push(ApplyOutcome::Accepted {
                    entity: change.entity,
                    entity_id: change.entity_id.clone(),
                    revision: change.revision,
                });
            } else {
                results.push(ApplyOutcome::Conflicted {
                    entity_id: change.entity_id.clone(),
                    winner: stored.unwrap().clone(),
                });
            }
        }
        PushResponse { results }
    }

    /// 拉取:seq 游标 + 排除请求方自己的设备(防回环);limit 模拟分页。
    fn pull(&self, device: &str, since: SyncCursor, limit: usize) -> (Vec<Change>, SyncCursor) {
        let mut changes = Vec::new();
        let mut cursor = since;
        for (seq, c) in &self.log {
            if *seq > cursor.last_seq && c.device_id != device {
                changes.push(c.clone());
                cursor.last_seq = *seq;
                if changes.len() >= limit {
                    break;
                }
            }
        }
        (changes, cursor)
    }
}

// === 同步驱动(push 循环到空 → pull 循环到空) ================================

fn full_push(cloud: &mut FakeCloud, dev: &InMemoryStore) {
    loop {
        let req = build_push_request(dev.local_user_id(), dev.local_device_id(), dev, 100).unwrap();
        if req.changes.is_empty() {
            break;
        }
        let resp = cloud.push(&req);
        apply_push_outcomes(dev, &req.changes, &resp).unwrap();
    }
}

fn pull_all(cloud: &FakeCloud, dev: &InMemoryStore) {
    let mut cursor = SyncCursor::default();
    loop {
        let (changes, next) = cloud.pull(dev.local_device_id(), cursor, 10);
        let done = changes.is_empty();
        apply_pull_response(dev, &changes).unwrap();
        cursor = next;
        if done {
            break;
        }
    }
}

// === 设备侧助手 =============================================================

fn new_task(dev: &InMemoryStore, title: &str) -> Id {
    let t = Task::new(title);
    let id = t.id.clone();
    dev.upsert_task(t).unwrap();
    id
}

fn edit_task(dev: &InMemoryStore, id: &Id, title: &str, revision: u64, updated_at: Timestamp) {
    let mut t = dev.get_task(id).unwrap();
    t.title = title.to_string();
    t.revision = revision;
    t.updated_at = updated_at;
    dev.upsert_task(t).unwrap();
}

fn task_title(dev: &InMemoryStore, id: &Id) -> Option<String> {
    dev.get_task(id).ok().map(|t| t.title)
}

fn fixed_time(secs: i64) -> Timestamp {
    use chrono::TimeZone;
    // 基准取 2023-11(过去),保证所有假时间都早于 delete 内部的真实 now
    Timestamp(chrono::Utc.timestamp_opt(1_700_000_000 + secs, 0).unwrap())
}

// === 场景 ===================================================================

/// 1. A 改 → push → B pull → 两端一致;A/B 队列清空。
#[test]
fn converges_single_edit() {
    let user = Id::new();
    let a = InMemoryStore::with_user_device(user.clone(), "dev-a");
    let b = InMemoryStore::with_user_device(user, "dev-b");
    let mut cloud = FakeCloud::new();

    let id = new_task(&a, "写周报");
    full_push(&mut cloud, &a);
    assert!(
        a.list_pending(100).unwrap().is_empty(),
        "push 后 A 队列清空"
    );

    pull_all(&cloud, &b);
    assert_eq!(task_title(&b, &id).as_deref(), Some("写周报"));
    assert!(
        b.list_pending(100).unwrap().is_empty(),
        "pull 落库即 synced"
    );

    // 用户归属盖章:两端同账号
    assert_eq!(
        a.get_task(&id).unwrap().user_id,
        b.get_task(&id).unwrap().user_id
    );
}

/// 2. 并发修改(A rev3 / B rev2)→ A 胜;B 经 pull 应用权威版本,不再回推。
#[test]
fn conflict_resolved_by_revision() {
    let user = Id::new();
    let a = InMemoryStore::with_user_device(user.clone(), "dev-a");
    let b = InMemoryStore::with_user_device(user, "dev-b");
    let mut cloud = FakeCloud::new();

    let id = new_task(&a, "v1");
    full_push(&mut cloud, &a);
    pull_all(&cloud, &b);

    // 双方离线各自修改:A 升到 rev3,B 升到 rev2
    edit_task(&a, &id, "A 的版本", 3, fixed_time(100));
    edit_task(&b, &id, "B 的版本", 2, fixed_time(200));

    full_push(&mut cloud, &a);
    pull_all(&cloud, &b);
    assert_eq!(task_title(&b, &id).as_deref(), Some("A 的版本"));

    // B 的旧版本不再回推(输家在 pull 比较时被丢弃,本地保持 synced)。
    // 云端该实体共 2 条 log:初始 v1 + A 的 rev3;B 的 rev2 从未出现
    full_push(&mut cloud, &b);
    let b_entries: Vec<&Change> = cloud
        .log
        .iter()
        .filter(|(_, c)| c.entity_id == id.as_str())
        .map(|(_, c)| c)
        .collect();
    assert_eq!(b_entries.len(), 2);
    assert!(
        b_entries.iter().all(|c| c.revision != 2),
        "B 的 rev2 不应出现在云端"
    );
    assert_eq!(task_title(&a, &id).as_deref(), Some("A 的版本"));
}

/// 3. 时钟回拨(ADR-009):B 的 updated_at 更大但 revision 更小 → 仍输。
#[test]
fn clock_skew_loses_to_revision() {
    let user = Id::new();
    let a = InMemoryStore::with_user_device(user.clone(), "dev-a");
    let b = InMemoryStore::with_user_device(user, "dev-b");
    let mut cloud = FakeCloud::new();

    let id = new_task(&a, "v1");
    full_push(&mut cloud, &a);
    pull_all(&cloud, &b);

    // A 正常改(rev3,时间较早);B 时钟快一年但只有 rev2
    edit_task(&a, &id, "A rev3", 3, fixed_time(100));
    full_push(&mut cloud, &a);
    edit_task(&b, &id, "B 时钟超前", 2, fixed_time(31_536_000));

    // B push:云端存的是 rev3 → B 的 rev2 输 → Conflicted → B 就地收敛
    let req = build_push_request(b.local_user_id(), b.local_device_id(), &b, 100).unwrap();
    let resp = cloud.push(&req);
    assert!(matches!(resp.results[0], ApplyOutcome::Conflicted { .. }));
    apply_push_outcomes(&b, &req.changes, &resp).unwrap();

    assert_eq!(task_title(&b, &id).as_deref(), Some("A rev3"));
    assert!(b.list_pending(100).unwrap().is_empty(), "收敛后队列清空");
}

/// 4a. 任务删除传播:tombstone(rev2,时间更晚)胜过 B 的并发旧改(rev2,时间早)。
#[test]
fn delete_tombstone_beats_stale_edit() {
    let user = Id::new();
    let a = InMemoryStore::with_user_device(user.clone(), "dev-a");
    let b = InMemoryStore::with_user_device(user, "dev-b");
    let mut cloud = FakeCloud::new();

    let id = new_task(&a, "要删的任务");
    full_push(&mut cloud, &a);
    pull_all(&cloud, &b);

    // B 离线改名(rev2,早期);A 删除(rev2,更晚 —— delete 内部 now)
    edit_task(&b, &id, "B 改名", 2, fixed_time(100));
    a.delete_task(&id).unwrap();

    full_push(&mut cloud, &a);
    pull_all(&cloud, &b);

    // B 侧被 tombstone 覆盖:任务消失(软删过滤)
    assert!(
        b.list_tasks(&TaskQuery::default()).unwrap().is_empty(),
        "B 应看到任务被删除"
    );
    assert!(b.list_pending(100).unwrap().is_empty(), "B 的旧改被丢弃");
}

/// 4b. 复盘"删除 = 空内容"传播(ADR-010)。
#[test]
fn review_delete_as_empty_content_propagates() {
    let user = Id::new();
    let a = InMemoryStore::with_user_device(user.clone(), "dev-a");
    let b = InMemoryStore::with_user_device(user.clone(), "dev-b");
    let mut cloud = FakeCloud::new();

    a.upsert_daily_review(DailyReview {
        id: Id::new(),
        user_id: user.clone(),
        date: "2026-08-20".into(),
        content: "今天专注 4 个番茄".into(),
        revision: 1,
        deleted_at: None,
        updated_at: fixed_time(1),
    })
    .unwrap();
    full_push(&mut cloud, &a);
    pull_all(&cloud, &b);
    assert_eq!(
        b.get_daily_review("2026-08-20").unwrap().unwrap().content,
        "今天专注 4 个番茄"
    );

    // A 删除 → content='' upsert(revision+1)
    a.delete_daily_review("2026-08-20").unwrap();
    full_push(&mut cloud, &a);
    pull_all(&cloud, &b);
    let after = b.get_daily_review("2026-08-20").unwrap().unwrap();
    assert!(after.content.is_empty(), "B 侧复盘被清空(空内容即删除)");
    assert!(after.revision >= 2);
}

/// 5. 离线多次修改:只推最终快照,中间态不泄漏到云端。
#[test]
fn offline_edits_push_final_snapshot_only() {
    let user = Id::new();
    let a = InMemoryStore::with_user_device(user.clone(), "dev-a");
    let b = InMemoryStore::with_user_device(user, "dev-b");
    let mut cloud = FakeCloud::new();

    let id = new_task(&a, "v1");
    full_push(&mut cloud, &a);
    pull_all(&cloud, &b);

    edit_task(&a, &id, "v2", 2, fixed_time(10));
    edit_task(&a, &id, "v3", 3, fixed_time(20));
    edit_task(&a, &id, "最终版", 4, fixed_time(30));
    full_push(&mut cloud, &a);

    // 云端对该实体只记 2 条(初始 v1 + 最终版),v2/v3 从未到达
    let entries = cloud
        .log
        .iter()
        .filter(|(_, c)| c.entity_id == id.as_str())
        .count();
    assert_eq!(entries, 2, "中间态不应到达云端");

    pull_all(&cloud, &b);
    assert_eq!(task_title(&b, &id).as_deref(), Some("最终版"));
}

/// 6. pull 不回环(过滤自己设备)+ 游标分页续传(ADR-011)。
#[test]
fn pull_filters_own_device_and_paginates() {
    let user = Id::new();
    let a = InMemoryStore::with_user_device(user.clone(), "dev-a");
    let b = InMemoryStore::with_user_device(user, "dev-b");
    let mut cloud = FakeCloud::new();

    let _ta = new_task(&a, "A 的任务");
    full_push(&mut cloud, &a);

    // A 拉取:只有自己的变更 → 空(不回环),但游标可推进
    let (changes, cursor) = cloud.pull("dev-a", SyncCursor::default(), 10);
    assert!(changes.is_empty(), "不见自己的变更");
    let _ = cursor;

    // B 批量建 5 个任务,A 以 limit=2 分页拉完
    for i in 0..5 {
        new_task(&b, &format!("B-{i}"));
    }
    full_push(&mut cloud, &b);

    let mut cursor = SyncCursor::default();
    let mut got = 0;
    loop {
        let (batch, next) = cloud.pull("dev-a", cursor, 2);
        let done = batch.is_empty();
        apply_pull_response(&a, &batch).unwrap();
        cursor = next;
        got += batch.len();
        if done {
            break;
        }
    }
    assert_eq!(got, 5, "分页拉全 5 条");
    let a_titles: Vec<String> = a
        .list_tasks(&TaskQuery::default())
        .unwrap()
        .iter()
        .map(|t| t.title.clone())
        .collect();
    assert!(a_titles.contains(&"B-0".to_string()) && a_titles.contains(&"B-4".to_string()));
    assert!(a_titles.contains(&"A 的任务".to_string()));
}

/// 7. 网络重试重复 push(change_id 幂等):云端不重复记 log,B 只收一次。
#[test]
fn duplicate_push_is_idempotent() {
    let user = Id::new();
    let a = InMemoryStore::with_user_device(user.clone(), "dev-a");
    let b = InMemoryStore::with_user_device(user, "dev-b");
    let mut cloud = FakeCloud::new();

    new_task(&a, "幂等任务");
    let req = build_push_request(a.local_user_id(), a.local_device_id(), &a, 100).unwrap();
    let resp = cloud.push(&req);
    apply_push_outcomes(&a, &req.changes, &resp).unwrap();
    let log_len = cloud.log.len();

    // 模拟:响应丢失,客户端原样重发(队列已清空也强行重放同一批):
    let replay = pomoflow_core::sync::PushRequest {
        user_id: req.user_id.clone(),
        device_id: req.device_id.clone(),
        changes: req.changes.clone(),
    };
    let resp2 = cloud.push(&replay);
    assert_eq!(resp2.results.len(), replay.changes.len());
    assert_eq!(cloud.log.len(), log_len, "重复 push 不新增 log");

    pull_all(&cloud, &b);
    let b_tasks = b.list_tasks(&TaskQuery::default()).unwrap();
    assert_eq!(b_tasks.len(), 1, "重放不产生重复数据");
    assert_eq!(b_tasks[0].title, "幂等任务");
    let _ = EntityKind::Task; // EntityKind 可用性锚点
}

// 让 clippy 满意:ChangeLogStore trait 在测试中经由引擎间接使用,
// 这里显式引用一次设备侧实现,避免 unused import 误报。
#[test]
fn changelog_store_impl_available() {
    let s = InMemoryStore::new();
    let _: Box<dyn ChangeLogStore> = Box::new(s);
}
