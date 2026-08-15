//! 统一错误类型
//!
//! 所有公开 API 返回 `CoreResult<T> = Result<T, CoreError>`。
//! `thiserror` 派生 `Display` + `Error`,下游可自由加 `?` / `map_err`。

use thiserror::Error;

pub type CoreResult<T> = Result<T, CoreError>;

#[derive(Debug, Error)]
pub enum CoreError {
    /// 必填字段缺失、格式错误、引用不存在等业务校验失败
    #[error("validation error: {0}")]
    Validation(String),

    /// 实体未找到(查询/更新/删除的目标 ID 不存在)
    #[error("not found: {entity}#{id}")]
    NotFound { entity: &'static str, id: String },

    /// 唯一约束冲突(Project.name 唯一、Tag.name 唯一等)
    #[error("conflict: {0}")]
    Conflict(String),

    /// 存储层 IO / 解码错误(由具体 Store 实现包装后上抛)
    #[error("storage error: {0}")]
    Storage(String),

    /// 同步协议错误(revision 缺失、ChangeLog 反序列化失败、设备 ID 非法)
    #[error("sync error: {0}")]
    Sync(String),

    /// JSON 序列化 / 反序列化失败(中间传递用,正常路径不该发生)
    #[error("serialization error: {0}")]
    Serialization(#[from] serde_json::Error),
}

impl CoreError {
    pub fn validation(msg: impl Into<String>) -> Self {
        Self::Validation(msg.into())
    }

    pub fn storage(msg: impl Into<String>) -> Self {
        Self::Storage(msg.into())
    }

    pub fn sync(msg: impl Into<String>) -> Self {
        Self::Sync(msg.into())
    }
}
