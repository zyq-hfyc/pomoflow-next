//! 服务状态与配置(环境变量)。

use pomoflow_core::model::Id;
use sqlx::PgPool;

/// 运行配置:全部来自环境变量(容器友好)。
///
/// - `DATABASE_URL`:PostgreSQL 连接串
/// - `SYNC_TOKEN`:静态 Bearer Token(运维通道 + 首账号采纳凭证 + 旧客户端回落)
/// - `SYNC_USER_ID`:该 token 对应的用户 UUID(与桌面端 meta.user_id 对齐)
/// - `JWT_SECRET`:HS256 签名密钥;**设置了才启用账号体系**(register/login/
///   refresh),不设则只认静态 Token(与 P1a 行为完全一致)
/// - `PORT`:监听端口(默认 8080)
#[derive(Clone)]
pub struct AppState {
    pub pool: PgPool,
    pub token: String,
    pub user_id: Id,
    /// None = 账号体系未启用(纯静态 Token 模式)
    pub jwt_secret: Option<String>,
}

impl AppState {
    pub fn user_str(&self) -> &str {
        self.user_id.as_str()
    }
}

/// 单次 pull 的最大返回条数(分页;客户端循环拉取)。
pub const PULL_LIMIT: i64 = 500;
