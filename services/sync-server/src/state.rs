//! 服务状态与配置(环境变量)。

use pomoflow_core::model::Id;
use sqlx::PgPool;

/// 运行配置:全部来自环境变量(容器友好)。
///
/// - `DATABASE_URL`:PostgreSQL 连接串
/// - `SYNC_TOKEN`:MVP 认证 —— 单账号静态 Bearer Token(ADR-007 的完整
///   注册/JWT/Refresh 体系是 P1b;当前 token → 固定 user 的映射)
/// - `SYNC_USER_ID`:该 token 对应的用户 UUID(与桌面端 meta.user_id 对齐)
/// - `PORT`:监听端口(默认 8080)
#[derive(Clone)]
pub struct AppState {
    pub pool: PgPool,
    pub token: String,
    pub user_id: Id,
}

impl AppState {
    pub fn user_str(&self) -> &str {
        self.user_id.as_str()
    }
}

/// 单次 pull 的最大返回条数(分页;客户端循环拉取)。
pub const PULL_LIMIT: i64 = 500;
