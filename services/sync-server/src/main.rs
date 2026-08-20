//! PomoFlow Sync Service(P1a)—— 桌面端同步的云端落地。
//!
//! 端点:
//! - `POST /v1/sync/push` 推送 pending 变更,服务端逐条 LWW 裁决(ADR-009)
//! - `POST /v1/sync/pull` seq 游标增量拉取,排除本设备(ADR-011)
//! - `GET  /healthz`      存活探针
//!
//! 认证:MVP 为静态 Bearer Token(`SYNC_TOKEN` → `SYNC_USER_ID` 单账号);
//! 注册/JWT/Refresh 多账号体系是 P1b(ADR-007)。
//!
//! 与桌面端共享 `pomoflow-core` 的域模型与合并算法(ADR-005)——两端零漂移。

mod handlers;
mod state;

use std::net::SocketAddr;

use axum::routing::{get, post};
use axum::Router;
use pomoflow_core::model::Id;
use sqlx::postgres::PgPoolOptions;
use state::AppState;

fn env_or(key: &str, default: &str) -> String {
    std::env::var(key).unwrap_or_else(|_| default.to_string())
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    env_logger::Builder::from_env(env_logger::Env::default().default_filter_or("info")).init();

    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL 必须设置");
    let token = std::env::var("SYNC_TOKEN").expect("SYNC_TOKEN 必须设置");
    let user_id = Id::parse(&std::env::var("SYNC_USER_ID").expect("SYNC_USER_ID 必须设置"))
        .expect("SYNC_USER_ID 必须是 UUID");
    let port: u16 = env_or("PORT", "8080").parse().expect("PORT 非法");

    let pool = PgPoolOptions::new()
        .max_connections(8)
        .acquire_timeout(std::time::Duration::from_secs(5))
        .connect(&database_url)
        .await
        .map_err(|e| format!("连接 PostgreSQL 失败(检查 DATABASE_URL): {e}"))?;

    log::info!(
        "sync-server listening on 0.0.0.0:{port}, user={}",
        user_id.as_str()
    );

    let app = Router::new()
        .route("/v1/sync/push", post(handlers::push))
        .route("/v1/sync/pull", post(handlers::pull))
        .route("/healthz", get(handlers::healthz))
        .with_state(AppState {
            pool,
            token,
            user_id,
        });

    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await?;
    Ok(())
}

async fn shutdown_signal() {
    let ctrl_c = async {
        let _ = tokio::signal::ctrl_c().await;
    };
    #[cfg(unix)]
    let terminate = async {
        if let Ok(mut sig) =
            tokio::signal::unix::signal(tokio::signal::unix::SignalKind::terminate())
        {
            sig.recv().await;
        }
    };
    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();
    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }
    log::info!("shutdown signal received");
}
