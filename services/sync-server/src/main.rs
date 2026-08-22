//! PomoFlow Sync Service —— 桌面端同步的云端落地。
//!
//! 端点:
//! - `POST /v1/sync/push`  推送 pending 变更,服务端逐条 LWW 裁决(ADR-009)
//! - `POST /v1/sync/pull`  seq 游标增量拉取,排除本设备(ADR-011)
//! - `POST /v1/auth/*`     账号体系(P1b,ADR-007:register/login/refresh/logout)
//! - `GET  /healthz`       存活探针
//!
//! 认证:Bearer Token 二选一 —— JWT(设置 `JWT_SECRET` 启用,多账号)或
//! 静态 `SYNC_TOKEN`(`SYNC_TOKEN` → `SYNC_USER_ID` 单账号,P1a 兼容回落)。
//!
//! 与桌面端共享 `pomoflow-core` 的域模型与合并算法(ADR-005)——两端零漂移。

mod auth;
mod auth_handlers;
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
    let jwt_secret = std::env::var("JWT_SECRET")
        .ok()
        .filter(|s| !s.trim().is_empty());

    let pool = PgPoolOptions::new()
        .max_connections(8)
        .acquire_timeout(std::time::Duration::from_secs(5))
        .connect(&database_url)
        .await
        .map_err(|e| format!("连接 PostgreSQL 失败(检查 DATABASE_URL): {e}"))?;

    // 启动时幂等建表:schema.sql 全部是 CREATE TABLE/INDEX IF NOT EXISTS,
    // 新库与"旧数据卷升级"(initdb 只在首次建卷时跑,新表不会自动出现)
    // 都靠这一步收敛到最新结构。
    sqlx::raw_sql(include_str!("../schema.sql"))
        .execute(&pool)
        .await
        .map_err(|e| format!("应用 schema.sql 失败: {e}"))?;

    log::info!(
        "sync-server listening on 0.0.0.0:{port}, user={}, auth={}",
        user_id.as_str(),
        if jwt_secret.is_some() { "jwt+static" } else { "static" }
    );

    let app = Router::new()
        .route("/v1/sync/push", post(handlers::push))
        .route("/v1/sync/pull", post(handlers::pull))
        .route("/v1/auth/register", post(auth_handlers::register))
        .route("/v1/auth/login", post(auth_handlers::login))
        .route("/v1/auth/refresh", post(auth_handlers::refresh))
        .route("/v1/auth/logout", post(auth_handlers::logout))
        .route("/v1/auth/change-password", post(auth_handlers::change_password))
        .route("/v1/auth/sessions", post(auth_handlers::sessions))
        .route("/v1/auth/sessions/revoke", post(auth_handlers::revoke_session))
        .route(
            "/v1/auth/sessions/revoke-others",
            post(auth_handlers::revoke_others),
        )
        .route("/healthz", get(handlers::healthz))
        .with_state(AppState {
            pool,
            token,
            user_id,
            jwt_secret,
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
