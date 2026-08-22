//! 同步协议 —— ChangeLog + Last-Writer-Wins 合并
//!
//! ## 设计目标
//!
//! 多端同步走"每端持有完整数据快照 + 双向同步"的简化模型(类似 CRDT 但简单些)。
//! 对每条实体的修改用 ChangeLog 表达,合并时按以下规则收敛:
//!
//! - **同 ID 实体的同字段**:取 [`revision`] 较大者;revision 相同时取
//!   [`updated_at`] 较大者;再相同则取 [`device_id`] 字典序较大者(打破循环)。
//! - **软删除**:`deleted_at` 也参与 LWW(一个设备删除,另一设备也合并为删除)。
//! - **不可逆操作**(比如"完成番茄"):用 revision 单调递增保证不被旧值覆盖。
//!
//! ## P0 范围
//!
//! 仅落地 [`lww`] 算法 + 一个最小 [`ChangeLog`] 容器;协议层消息格式留到 P2 云端
//! 设计时再定(决定是 JSON over HTTP 还是 Protobuf / gRPC)。

pub mod engine;
pub mod lww;

pub use lww::{resolve_conflict, Resolution};

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::error::{CoreError, CoreResult};
use crate::model::Id;

/// 单条变更记录 —— 表达"设备 X 在时间 T 把实体 E 改成了内容 V"。
///
/// P0 阶段 `payload` 用 `serde_json::Value` 兜底,避免循环依赖 model;
/// P2 协议层可改成 `Vec<u8>` + 显式类型 tag,带 schema 版本号。
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Change {
    pub id: Uuid,
    pub device_id: String,
    pub entity: EntityKind,
    pub entity_id: String,
    pub revision: u64,
    pub updated_at: DateTime<Utc>,
    /// 完整实体快照(修改后的最终状态)。LWW 合并直接用这个替换。
    pub payload: serde_json::Value,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum EntityKind {
    Task,
    Project,
    Tag,
    /// 任务↔标签关联(以 task_id 为键,tag 集合为载荷整体 LWW,见 TaskTagLink)
    TaskTag,
    SubTask,
    PomodoroSession,
    Motto,
    DailyReview,
    WeeklyReview,
    MonthlyReview,
}

/// 一端对外发送的"自上次同步以来的全部变更"。
#[derive(Debug, Clone, Default, PartialEq, Serialize, Deserialize)]
pub struct ChangeLog {
    pub device_id: String,
    pub changes: Vec<Change>,
}

impl ChangeLog {
    pub fn new(device_id: impl Into<String>) -> Self {
        Self {
            device_id: device_id.into(),
            changes: Vec::new(),
        }
    }

    pub fn push(&mut self, change: Change) {
        self.changes.push(change);
    }

    pub fn len(&self) -> usize {
        self.changes.len()
    }

    pub fn is_empty(&self) -> bool {
        self.changes.is_empty()
    }
}

/// 把一组 `ChangeLog` 合并为"对每条实体的最终快照"。
///
/// 输入是多个设备推送来的变更,输出 `Vec<(EntityKind, String, Value)>` 即
/// "每个受影响实体的最终状态"。应用层把它批量写回 Store 即可。
///
/// ## 算法
///
/// 1. 按 `(entity_kind, entity_id)` 分组
/// 2. 组内按 [`lww::resolve_conflict`] 取胜者
/// 3. 收集所有胜者,带 conflict 标记(供调试 / 上报)
pub fn merge_changelogs(logs: &[ChangeLog]) -> CoreResult<MergeReport> {
    use std::collections::HashMap;

    let mut groups: HashMap<(EntityKind, String), Vec<&Change>> = HashMap::new();
    for log in logs {
        for change in &log.changes {
            groups
                .entry((change.entity, change.entity_id.clone()))
                .or_default()
                .push(change);
        }
    }

    let mut winners = Vec::new();
    let mut conflicts = 0;

    for ((entity, id), group) in groups {
        let mut iter = group.into_iter();
        let first = iter
            .next()
            .ok_or_else(|| CoreError::sync("internal: empty change group"))?;

        let mut current = first;
        let mut had_conflict = false;
        for next in iter {
            match lww::resolve_conflict(current, next) {
                Resolution::Left => {} // current 保持
                Resolution::Right => {
                    current = next;
                    had_conflict = true;
                }
                Resolution::Tie => {
                    // 两条 record 字段完全一致(包括 device_id),忽略 next
                }
            }
        }
        if had_conflict {
            conflicts += 1;
        }
        winners.push(MergeWinner {
            entity,
            entity_id: id,
            change: current.clone(),
        });
    }

    Ok(MergeReport { winners, conflicts })
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct MergeWinner {
    pub entity: EntityKind,
    pub entity_id: String,
    pub change: Change,
}

#[derive(Debug, Clone, Default, PartialEq, Serialize, Deserialize)]
pub struct MergeReport {
    pub winners: Vec<MergeWinner>,
    pub conflicts: u64,
}

// === 同步协议 wire 消息(ADR-011:游标用服务端全局 seq) =====================
//
// 客户端 ↔ Sync Service 的请求/响应。序列化 JSON(§14.1④,起步格式)。
// Push 流程:客户端 `list_pending` 组包 → 服务端逐条 LWW → Accepted 落库 /
// Conflicted 附权威 Change 让客户端就地收敛 / Dropped 拒收。
// Pull 流程:带 `SyncCursor`(server_changelog.seq)增量拉**其他设备**的变更。

/// 客户端 → 云端:推送本地 pending 变更(实体全量快照,含 tombstone)。
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct PushRequest {
    pub user_id: Id,
    pub device_id: String,
    pub changes: Vec<Change>,
}

/// 服务端对单条 Change 的裁决。
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum ApplyOutcome {
    /// 传入胜出并已落库(附云端的 change_id 幂等去重)。
    Accepted {
        entity: EntityKind,
        entity_id: String,
        revision: u64,
    },
    /// 库内现存实体胜出;附权威 Change(完整快照),客户端应用它就地收敛。
    Conflicted { entity_id: String, winner: Change },
    /// 拒收(校验失败 / 非法载荷)。客户端按已处理论处,不再重推。
    Dropped { entity_id: String, reason: String },
}

/// 云端 → 客户端:逐条裁决结果。
/// 注意:**不携带游标**——push 后直接把游标跳到最新 seq 会漏掉其它设备在
/// push 期间落库的中间变更;游标只能由 pull 逐批推进(ADR-011)。
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct PushResponse {
    pub results: Vec<ApplyOutcome>,
}

/// 客户端 → 云端:增量拉取其它设备的变更。
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct PullRequest {
    pub user_id: Id,
    pub device_id: String,
    pub since: SyncCursor,
}

/// 云端 → 客户端:变更批次(排除请求方自己的 device,防回环)。
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct PullResponse {
    pub changes: Vec<Change>,
    pub next_cursor: SyncCursor,
}

/// 同步游标 = 服务端 changelog 的全局单调 seq(ADR-011;不用时间戳,
/// 同秒边界会漏变更)。客户端持久化在本地 meta 表。
#[derive(Debug, Clone, Copy, Default, PartialEq, Eq, Serialize, Deserialize)]
pub struct SyncCursor {
    pub last_seq: u64,
}

/// 同步端点抽象 —— 桌面(SqliteStore)与内存 mock(e2e)各自实现;
/// 云端 Sync Service 在 P1a 复用同一套引擎语义。
///
/// 语义契约:
/// - `list_pending`:待推送变更(实体全量快照,含软删 tombstone;
///   复盘的"删除"表达为 content="" 的快照,ADR-010),按 updated_at 升序。
/// - `apply_remote`:应用一条**已裁定远端胜出**的变更,落库并标 synced
///   (revision/updated_at 按权威载荷原样写入,不本地 bump)。
/// - `mark_synced`:把已裁决实体行标为 synced。
/// - `local_candidate`:取本地行的竞争快照(含软删行),无此行返回 None。
pub trait ChangeLogStore {
    fn list_pending(&self, limit: usize) -> CoreResult<Vec<Change>>;
    fn apply_remote(&self, change: &Change) -> CoreResult<()>;
    fn mark_synced(&self, keys: &[(EntityKind, String)]) -> CoreResult<()>;
    fn local_candidate(&self, kind: EntityKind, id: &str) -> CoreResult<Option<Change>>;
}

// === 实体同步元信息(内部;存储实现组 Change 快照用) ========================

/// 参与同步的实体元信息:list_pending / local_candidate 组 Change 用。
pub(crate) trait SyncEntity: serde::Serialize {
    fn kind() -> EntityKind;
    /// 同步键:UUID 实体用 id,复盘用自然键(ADR-010)
    fn sync_key(&self) -> String;
    fn rev(&self) -> u64;
    fn upd(&self) -> crate::model::Timestamp;
}

macro_rules! impl_sync_entity {
    ($t:ty, $kind:expr, key $key:ident) => {
        impl SyncEntity for $t {
            fn kind() -> EntityKind {
                $kind
            }
            fn sync_key(&self) -> String {
                self.$key.as_str().to_string()
            }
            fn rev(&self) -> u64 {
                self.revision
            }
            fn upd(&self) -> crate::model::Timestamp {
                self.updated_at
            }
        }
    };
    ($t:ty, $kind:expr, keystr $key:ident) => {
        impl SyncEntity for $t {
            fn kind() -> EntityKind {
                $kind
            }
            fn sync_key(&self) -> String {
                self.$key.clone()
            }
            fn rev(&self) -> u64 {
                self.revision
            }
            fn upd(&self) -> crate::model::Timestamp {
                self.updated_at
            }
        }
    };
}

impl_sync_entity!(crate::model::Task, EntityKind::Task, key id);
impl_sync_entity!(crate::model::Project, EntityKind::Project, key id);
impl_sync_entity!(crate::model::Tag, EntityKind::Tag, key id);
impl_sync_entity!(crate::model::TaskTagLink, EntityKind::TaskTag, key task_id);
impl_sync_entity!(crate::model::SubTask, EntityKind::SubTask, key id);
impl_sync_entity!(
    crate::model::PomodoroSession,
    EntityKind::PomodoroSession,
    key id
);
impl_sync_entity!(crate::model::Motto, EntityKind::Motto, key id);
impl_sync_entity!(
    crate::model::DailyReview,
    EntityKind::DailyReview,
    keystr date
);
impl_sync_entity!(
    crate::model::WeeklyReview,
    EntityKind::WeeklyReview,
    keystr week_start
);
impl_sync_entity!(
    crate::model::MonthlyReview,
    EntityKind::MonthlyReview,
    keystr year_month
);

/// 实体 → 待推送 Change 快照(origin 为空回落本机 device)。
pub(crate) fn change_of<E: SyncEntity>(
    entity: &E,
    origin: String,
    fallback_device: &str,
) -> CoreResult<Change> {
    Ok(Change {
        id: Uuid::new_v4(),
        device_id: if origin.is_empty() {
            fallback_device.to_string()
        } else {
            origin
        },
        entity: E::kind(),
        entity_id: entity.sync_key(),
        revision: entity.rev(),
        updated_at: entity.upd().0,
        payload: serde_json::to_value(entity)
            .map_err(|e| CoreError::storage(format!("serialize change: {e}")))?,
    })
}
