//! P1d 新端点的结构化错误信封(旧端点维持 `(StatusCode, String)`,不动)。
//!
//! ```json
//! HTTP 429
//! { "error": { "code": "RATE_LIMITED", "message": "...", "retry_after_secs": 58 } }
//! ```
//!
//! 机器码供客户端(Flutter/桌面)分支处理;message 人类可读。

use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use axum::Json;
use serde_json::json;

pub const ACCOUNT_BANNED_CODE: &str = "ACCOUNT_BANNED";
pub const ACCOUNT_BANNED_MESSAGE: &str = "账号已被封禁";
pub const INTERNAL_ERROR_MESSAGE: &str = "internal server error";

#[derive(Debug)]
pub struct ApiErr {
    pub status: StatusCode,
    pub code: &'static str,
    pub message: String,
    pub retry_after_secs: Option<u64>,
}

impl ApiErr {
    fn new(status: StatusCode, code: &'static str, message: impl Into<String>) -> Self {
        Self {
            status,
            code,
            message: message.into(),
            retry_after_secs: None,
        }
    }

    pub fn bad_request(code: &'static str, message: impl Into<String>) -> Self {
        Self::new(StatusCode::BAD_REQUEST, code, message)
    }

    pub fn unauthorized(message: impl Into<String>) -> Self {
        Self::new(StatusCode::UNAUTHORIZED, "UNAUTHORIZED", message)
    }

    pub fn account_banned() -> Self {
        Self::new(
            StatusCode::FORBIDDEN,
            ACCOUNT_BANNED_CODE,
            ACCOUNT_BANNED_MESSAGE,
        )
    }

    pub fn not_found(message: impl Into<String>) -> Self {
        Self::new(StatusCode::NOT_FOUND, "NOT_FOUND", message)
    }

    pub fn conflict(code: &'static str, message: impl Into<String>) -> Self {
        Self::new(StatusCode::CONFLICT, code, message)
    }

    pub fn internal(message: impl Into<String>) -> Self {
        Self::new(StatusCode::INTERNAL_SERVER_ERROR, "INTERNAL", message)
    }

    /// 429 频控(附重试秒数)。
    pub fn rate_limited(message: impl Into<String>, retry_after_secs: u64) -> Self {
        Self {
            status: StatusCode::TOO_MANY_REQUESTS,
            code: "RATE_LIMITED",
            message: message.into(),
            retry_after_secs: Some(retry_after_secs),
        }
    }

    pub fn db(e: sqlx::Error) -> Self {
        log::error!("database error: {e}");
        Self::internal(INTERNAL_ERROR_MESSAGE)
    }
}

impl IntoResponse for ApiErr {
    fn into_response(self) -> Response {
        let body = json!({
            "error": {
                "code": self.code,
                "message": self.message,
                "retry_after_secs": self.retry_after_secs,
            }
        });
        let mut resp = (self.status, Json(body)).into_response();
        if let Some(secs) = self.retry_after_secs {
            if let Ok(v) = secs.to_string().parse() {
                resp.headers_mut().insert("Retry-After", v);
            }
        }
        resp
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn db_error_response_does_not_leak_database_details() {
        let error = ApiErr::db(sqlx::Error::RowNotFound);
        assert_eq!(error.status, StatusCode::INTERNAL_SERVER_ERROR);
        assert_eq!(error.code, "INTERNAL");
        assert_eq!(error.message, INTERNAL_ERROR_MESSAGE);
    }
}
