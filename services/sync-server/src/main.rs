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
mod email_codes;
mod email_handlers;
mod errors;
mod handlers;
mod mailer;
mod state;

use std::net::SocketAddr;

use axum::extract::DefaultBodyLimit;
use axum::routing::{get, post};
use axum::Router;
use pomoflow_core::model::Id;
use sqlx::postgres::PgPoolOptions;
use state::AppState;
use tower_http::cors::{Any, CorsLayer};

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
    // 验证码 HMAC pepper:建议独立配置;未设时回落 JWT_SECRET(并告警)
    let code_pepper = std::env::var("CODE_PEPPER")
        .ok()
        .filter(|s| !s.trim().is_empty())
        .unwrap_or_else(|| {
            log::warn!("CODE_PEPPER 未配置,回落使用 JWT_SECRET(建议独立生成:openssl rand -hex 32)");
            jwt_secret.clone().unwrap_or_default()
        });
    let mailer = mailer::build_from_env().expect("邮件通道构建失败(检查 SMTP_* 配置)");

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
        "sync-server listening on 0.0.0.0:{port}, user={}, auth={}, mail={}",
        user_id.as_str(),
        if jwt_secret.is_some() { "jwt+static" } else { "static" },
        mailer.mode()
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
        .route("/v1/auth/email/send-code", post(email_handlers::send_code))
        .route("/v1/auth/register-email", post(email_handlers::register_email))
        .route("/v1/auth/login-email", post(email_handlers::login_email))
        .route("/v1/auth/reset-password", post(email_handlers::reset_password))
        .route("/v1/auth/email/bind", post(email_handlers::bind_email))
        .route("/v1/auth/profile", get(email_handlers::get_profile).post(email_handlers::update_profile))
        .route("/v1/auth/username", post(email_handlers::update_username))
        .route("/v1/auth/deletion/request", post(email_handlers::deletion_request))
        .route("/v1/auth/deletion/cancel", post(email_handlers::deletion_cancel))
        .route(
            "/v1/auth/avatar",
            get(email_handlers::get_avatar)
                .post(email_handlers::set_avatar)
                .delete(email_handlers::delete_avatar),
        )
        .route("/v1/auth/export", get(email_handlers::export_data))
        .route("/v1/auth/login-logs", get(email_handlers::login_logs))
        .route("/healthz", get(handlers::healthz))
        // CORS:Flutter Web(Chrome 预览)跨域;桌面端/Android 原生不走 CORS。
        // 开发期 Any;P5 正式部署收敛到 nginx/gateway 层指定 origin。
        .layer(
            CorsLayer::new()
                .allow_origin(Any)
                .allow_methods(Any)
                .allow_headers(Any),
        )
        // 头像上传(PATCH /v1/auth/avatar):base64 + JSON envelope 后约 2.7 MB,
        // 超过 axum 默认 2 MB body limit 会 413。其它路由不需要这么大,综合放宽 8 MB。
        .layer(DefaultBodyLimit::max(8 * 1024 * 1024))
        .with_state(AppState {
            pool: pool.clone(),
            token,
            user_id,
            jwt_secret,
            code_pepper,
            mailer,
        });

    // 周期维护:启动一次 + 每 24h —— 过期验证码清理 + 到期注销账号级联删除
    tokio::spawn(cleanup_task(pool));
    // 注意:ConnectInfo 需要 into_make_service_with_connect_info,
    // send_code 依赖它取请求方 IP 做频控
    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(
        listener,
        app.into_make_service_with_connect_info::<SocketAddr>(),
    )
    .with_graceful_shutdown(shutdown_signal())
    .await?;
    Ok(())
}

/// 周期维护(启动 + 每 24h):
/// ① 清理过期超 24h 的验证码行;② 冷静期(15 天)已过的注销账号级联删除。
async fn cleanup_task(pool: sqlx::PgPool) {
    loop {
        let now = chrono::Utc::now().timestamp_millis();

        let cutoff = now - 86_400_000;
        match sqlx::query("DELETE FROM email_codes WHERE expires_ms < $1")
            .bind(cutoff)
            .execute(&pool)
            .await
        {
            Ok(r) if r.rows_affected() > 0 => {
                log::info!("cleaned {} expired email codes", r.rows_affected());
            }
            Ok(_) => {}
            Err(e) => log::warn!("email code cleanup failed: {e}"),
        }

        // 登录记录保留 180 天
        let _ = sqlx::query("DELETE FROM login_logs WHERE created_ms < $1")
            .bind(now - 180 * 86_400_000)
            .execute(&pool)
            .await;

        // 到期注销:先删关联数据,最后删用户行(顺序避免用户行没了查不到 id)
        let expired_cutoff = now - email_handlers::DELETION_COOLDOWN_MS;
        let due: Vec<String> = sqlx::query_scalar(
            "SELECT id FROM users WHERE deletion_requested_ms IS NOT NULL
             AND deletion_requested_ms < $1",
        )
        .bind(expired_cutoff)
        .fetch_all(&pool)
        .await
        .unwrap_or_default();
        if !due.is_empty() {
            for table in [
                "refresh_tokens",
                "auth_identities",
                "snapshots",
                "changelog",
            ] {
                let n = sqlx::query(&format!(
                    "DELETE FROM {table} WHERE user_id = ANY($1)"
                ))
                .bind(&due)
                .execute(&pool)
                .await
                .map(|r| r.rows_affected())
                .unwrap_or(0);
                log::info!("deletion sweep: {table} removed {n} rows");
            }
            // 该批账号邮箱的历史验证码一并清掉
            let _ = sqlx::query(
                "DELETE FROM email_codes WHERE email IN (
                     SELECT email FROM users WHERE id = ANY($1) AND email IS NOT NULL)",
            )
            .bind(&due)
            .execute(&pool)
            .await;
            let n = sqlx::query("DELETE FROM users WHERE id = ANY($1)")
                .bind(&due)
                .execute(&pool)
                .await
                .map(|r| r.rows_affected())
                .unwrap_or(0);
            log::warn!("deletion sweep: {} accounts permanently deleted", n);
        }

        tokio::time::sleep(std::time::Duration::from_secs(24 * 3600)).await;
    }
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
