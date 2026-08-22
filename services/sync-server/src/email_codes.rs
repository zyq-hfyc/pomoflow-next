//! 邮箱验证码(P1d,ADR-012)—— 生成 / 摘要 / 校验 / 频控参数。
//!
//! - 6 位数字码,库里只存 `HMAC-SHA256(CODE_PEPPER, "{email}:{code}")` 的 hex:
//!   6 位数字空间仅 10^6,裸哈希可被离线穷举;加 pepper 后拖库也无法预建表。
//!   摘要里掺 email,防同一码被挪用到其他邮箱。
//! - 单次有效;校验失败 `attempts` 递增,达上限作废;TTL 10 分钟。
//! - 发送频控(按 email_codes 行数统计,单机无 Redis):
//!   每邮箱 60s 间隔 / 5 次每小时 / 10 次每天;每 IP 10 次每小时。
//!
//! 纯函数部分单测不打 DB;DB 读写辅助在 auth_handlers.rs。

use hmac::{Hmac, Mac};
use rand::RngCore;
use sha2::Sha256;

type HmacSha256 = Hmac<Sha256>;

/// 验证码有效期(毫秒):10 分钟。
pub const CODE_TTL_MS: i64 = 10 * 60 * 1000;
/// 单条验证码的校验失败上限:≥5 作废(在线爆破在 TTL 窗口内不可行)。
pub const CODE_MAX_ATTEMPTS: i32 = 5;

// 发送频控(DB 行数统计窗口)
/// 同一 (email, purpose) 两次发码的最小间隔。
pub const PER_EMAIL_INTERVAL_MS: i64 = 60 * 1000;
/// 同一邮箱每小时发送上限。
pub const PER_EMAIL_PER_HOUR: i64 = 5;
/// 同一邮箱每天发送上限。
pub const PER_EMAIL_PER_DAY: i64 = 10;
/// 同一 IP 每小时发送上限。
pub const PER_IP_PER_HOUR: i64 = 10;

/// 邮箱规范化:去首尾空白 + 转小写(入库/查询统一走这里)。
pub fn normalize_email(input: &str) -> String {
    input.trim().to_lowercase()
}

/// 极简结构校验:x@y.z,长度 ≤254(不做全量 RFC;挡住明显乱输)。
pub fn valid_email(input: &str) -> bool {
    let n = normalize_email(input);
    if n.len() > 254 || n.is_empty() {
        return false;
    }
    let mut parts = n.split('@');
    let local = parts.next().unwrap_or_default();
    let domain = parts.next().unwrap_or_default();
    let rest = parts.next();
    !local.is_empty()
        && !domain.is_empty()
        && rest.is_none()
        && domain.contains('.')
        && !domain.starts_with('.')
        && !domain.ends_with('.')
        && !local.contains(char::is_whitespace)
        && !domain.contains(char::is_whitespace)
}

/// 生成 6 位数字验证码(均匀随机,前导零保留)。
pub fn gen_code() -> String {
    let mut bytes = [0u8; 4];
    rand::thread_rng().fill_bytes(&mut bytes);
    let n = u32::from_le_bytes(bytes) % 1_000_000;
    format!("{n:06}")
}

/// 验证码摘要:HMAC-SHA256(pepper, "{email}:{code}") 的 hex。
pub fn code_hash(pepper: &str, email: &str, code: &str) -> String {
    let mut mac = HmacSha256::new_from_slice(pepper.as_bytes())
        .expect("HMAC 可接受任意长度密钥");
    mac.update(format!("{email}:{code}").as_bytes());
    let out = mac.finalize().into_bytes();
    let mut s = String::with_capacity(out.len() * 2);
    for b in out {
        s.push_str(&format!("{b:02x}"));
    }
    s
}

/// 校验输入是否为 6 位数字(进 DB 比对前的第一道过滤)。
pub fn looks_like_code(input: &str) -> bool {
    input.len() == 6 && input.chars().all(|c| c.is_ascii_digit())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn email_validation() {
        assert!(valid_email("a.b@example.com"));
        assert!(valid_email("  UPPER@Example.COM ")); // 规范化后小写
        assert!(!valid_email("no-at-sign"));
        assert!(!valid_email("a@b")); // 域名无点
        assert!(!valid_email("a@b@c.com"));
        assert!(!valid_email("a b@c.com"));
        assert!(!valid_email("@c.com"));
        assert!(!valid_email("a@.com"));
        assert!(!valid_email(&format!("{}@c.com", "x".repeat(250))));
        assert_eq!(normalize_email("  A@B.CO "), "a@b.co");
    }

    #[test]
    fn code_format() {
        for _ in 0..50 {
            let c = gen_code();
            assert_eq!(c.len(), 6, "6 位,前导零保留");
            assert!(c.chars().all(|ch| ch.is_ascii_digit()));
        }
        assert!(looks_like_code("012345"));
        assert!(!looks_like_code("12345"));
        assert!(!looks_like_code("12345a"));
    }

    #[test]
    fn hmac_hash_deterministic_and_peppered() {
        let a = code_hash("pepper", "a@b.com", "123456");
        assert_eq!(a, code_hash("pepper", "a@b.com", "123456"));
        assert_eq!(a.len(), 64, "SHA-256 hex");
        // 换 pepper / 换邮箱 / 换码 → 摘要不同(防穷举与挪用)
        assert_ne!(a, code_hash("pepper2", "a@b.com", "123456"));
        assert_ne!(a, code_hash("pepper", "c@d.com", "123456"));
        assert_ne!(a, code_hash("pepper", "a@b.com", "654321"));
    }

    /// RFC 4231 测试向量 #1(HMAC-SHA256):锁实现正确性。
    #[test]
    fn hmac_rfc4231_vector() {
        let key = [0x0b; 20];
        let mut mac = HmacSha256::new_from_slice(&key).unwrap();
        mac.update(b"Hi There");
        assert_eq!(
            hex_of(mac.finalize().into_bytes().as_slice()),
            "b0344c61d8db38535ca8afceaf0bf12b881dc200c9833da726e9376c2e32cff7"
        );
    }

    fn hex_of(bytes: &[u8]) -> String {
        bytes.iter().map(|b| format!("{b:02x}")).collect()
    }
}
