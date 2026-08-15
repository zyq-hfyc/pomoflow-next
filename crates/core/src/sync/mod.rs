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

pub mod lww;

pub use lww::{resolve_conflict, Resolution};

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::error::{CoreError, CoreResult};

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
    PomodoroSession,
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
        let first = iter.next().ok_or_else(|| {
            CoreError::sync("internal: empty change group")
        })?;

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

    Ok(MergeReport {
        winners,
        conflicts,
    })
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