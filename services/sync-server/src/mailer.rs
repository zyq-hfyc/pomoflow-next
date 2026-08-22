//! 邮件发送(P1d)—— MailSender trait + 两个实现。
//!
//! - `SmtpSender`:个人邮箱 SMTP(QQ: smtp.qq.com:465 / 163: smtp.163.com:465,
//!   USER=邮箱、PASS=授权码),lettre + rustls(无原生 OpenSSL 依赖)。
//! - `LogSender`:SMTP 未配置时的开发模式 —— 验证码打服务端日志(info 级),
//!   VMware 本地联调用,不真发信。
//!
//! 环境变量:SMTP_HOST / SMTP_PORT(默认 465)/ SMTP_USER / SMTP_PASS /
//! SMTP_FROM(缺省用 SMTP_USER)。换商业邮件服务时只需新增一个实现。

use std::sync::Arc;

use lettre::message::header::ContentType;
use lettre::message::Message;
use lettre::transport::smtp::authentication::Credentials;
use lettre::{AsyncSmtpTransport, AsyncTransport, Tokio1Executor};

/// 发件抽象:send 失败返回人类可读错误(写日志 + 上层转 5xx)。
/// trait 带 async fn 不能做 dyn 对象,这里手写 boxed future(Send),
/// `Arc<dyn MailSender>` 进 AppState 供所有请求共享。
pub trait MailSender: Send + Sync {
    fn send<'a>(
        &'a self,
        to: &'a str,
        subject: &'a str,
        body: &'a str,
    ) -> std::pin::Pin<Box<dyn std::future::Future<Output = Result<(), String>> + Send + 'a>>;
    /// 展示名(启动日志与 README 说明用)
    fn mode(&self) -> &'static str;
}

/// SMTP 实现(465 隐式 TLS;rustls)。
pub struct SmtpSender {
    transport: AsyncSmtpTransport<Tokio1Executor>,
    from: String,
}

impl SmtpSender {
    pub fn new(host: &str, port: u16, user: &str, pass: &str, from: &str) -> Result<Self, String> {
        let transport = AsyncSmtpTransport::<Tokio1Executor>::relay(host)
            .map_err(|e| format!("SMTP host 非法({host}): {e}"))?
            .port(port)
            .credentials(Credentials::new(user.to_string(), pass.to_string()))
            .build();
        Ok(Self {
            transport,
            from: from.to_string(),
        })
    }
}

impl MailSender for SmtpSender {
    fn send<'a>(
        &'a self,
        to: &'a str,
        subject: &'a str,
        body: &'a str,
    ) -> std::pin::Pin<Box<dyn std::future::Future<Output = Result<(), String>> + Send + 'a>> {
        Box::pin(async move {
            let mail = Message::builder()
                .from(
                    self.from
                        .parse()
                        .map_err(|e| format!("SMTP_FROM 非法({}): {e}", self.from))?,
                )
                .to(to
                    .parse()
                    .map_err(|e| format!("收件地址非法({to}): {e}"))?)
                .subject(subject)
                .header(ContentType::TEXT_PLAIN)
                .body(body.to_string())
                .map_err(|e| format!("组邮件失败: {e}"))?;
            self.transport
                .send(mail)
                .await
                .map(|_| ())
                .map_err(|e| format!("SMTP 发送失败: {e}"))
        })
    }

    fn mode(&self) -> &'static str {
        "smtp"
    }
}

/// 日志模式(开发):不真发信,验证码打 info 日志。
pub struct LogSender;

impl MailSender for LogSender {
    fn send<'a>(
        &'a self,
        to: &'a str,
        subject: &'a str,
        body: &'a str,
    ) -> std::pin::Pin<Box<dyn std::future::Future<Output = Result<(), String>> + Send + 'a>> {
        Box::pin(async move {
            log::info!("[mail:log-mode] to={to} subject={subject}\n{body}");
            Ok(())
        })
    }

    fn mode(&self) -> &'static str {
        "log"
    }
}

/// 按环境变量构建:SMTP_HOST 配置了 → SMTP;否则 → 日志模式。
pub fn build_from_env() -> Result<Arc<dyn MailSender>, String> {
    let host = std::env::var("SMTP_HOST").ok().filter(|v| !v.trim().is_empty());
    match host {
        Some(host) => {
            let port: u16 = std::env::var("SMTP_PORT")
                .ok()
                .and_then(|v| v.parse().ok())
                .unwrap_or(465);
            let user = std::env::var("SMTP_USER").unwrap_or_default();
            let pass = std::env::var("SMTP_PASS").unwrap_or_default();
            let from = std::env::var("SMTP_FROM")
                .ok()
                .filter(|v| !v.trim().is_empty())
                .unwrap_or_else(|| user.clone());
            if user.is_empty() || pass.is_empty() {
                return Err("SMTP_HOST 已配置但 SMTP_USER/SMTP_PASS 缺失".into());
            }
            Ok(Arc::new(SmtpSender::new(&host, port, &user, &pass, &from)?))
        }
        None => Ok(Arc::new(LogSender)),
    }
}
