//! 认证原语(P1b,ADR-007)—— 密码哈希 / JWT / refresh token。
//!
//! - 密码:argon2id(PHC 串自带随机盐,无需另存);
//! - Access Token:JWT HS256,短寿命(15 分钟),claims 只放 `sub`(user_id);
//! - Refresh Token:24 随机字节的 hex(48 字符),库里只存 SHA-256 摘要,
//!   轮换式(每次 refresh 换新,旧的立即吊销)。
//!
//! 全部纯函数/纯计算,单测不打 DB。

use argon2::password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString};
use argon2::Argon2;
use jsonwebtoken::{DecodingKey, EncodingKey, Header, Validation};
use rand::RngCore;
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};

/// Access Token 寿命(秒):短寿命 + 客户端 401 时自动 refresh 重试。
pub const ACCESS_TTL_SECS: i64 = 15 * 60;
/// Refresh Token 寿命(秒):30 天,轮换制(每次使用即换新)。
pub const REFRESH_TTL_SECS: i64 = 30 * 24 * 3600;

// === 密码(argon2id) ========================================================

/// 生成 argon2id PHC 串(每次调用带新随机盐)。
pub fn hash_password(password: &str) -> Result<String, String> {
    let salt = SaltString::generate(&mut OsRng);
    Argon2::default()
        .hash_password(password.as_bytes(), &salt)
        .map(|h| h.to_string())
        .map_err(|e| format!("hash password: {e}"))
}

/// 校验密码;哈希串损坏按"不匹配"处理(不 panic)。
pub fn verify_password(password: &str, phc: &str) -> bool {
    let Ok(parsed) = PasswordHash::new(phc) else {
        return false;
    };
    Argon2::default()
        .verify_password(password.as_bytes(), &parsed)
        .is_ok()
}

// === Access Token(JWT HS256)===============================================

#[derive(Debug, Serialize, Deserialize)]
pub struct AccessClaims {
    /// 用户 UUID(字符串形式)
    pub sub: String,
    pub iat: i64,
    pub exp: i64,
}

/// 签发 Access Token。
pub fn issue_access(secret: &str, user_id: &str) -> Result<String, String> {
    let now = chrono::Utc::now().timestamp();
    let claims = AccessClaims {
        sub: user_id.to_string(),
        iat: now,
        exp: now + ACCESS_TTL_SECS,
    };
    jsonwebtoken::encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_bytes()),
    )
    .map_err(|e| format!("sign jwt: {e}"))
}

/// 校验 Access Token,有效返回 user_id。
/// exp 由 `Validation::default()` 自动校验;算法锁定 HS256。
pub fn verify_access(secret: &str, token: &str) -> Option<String> {
    let mut validation = Validation::new(jsonwebtoken::Algorithm::HS256);
    validation.validate_exp = true;
    // 不要求 aud(我们不发 aud)
    validation.validate_aud = false;
    let data = jsonwebtoken::decode::<AccessClaims>(
        token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &validation,
    )
    .ok()?;
    Some(data.claims.sub)
}

// === Refresh Token(随机串 + SHA-256 摘要)==================================

/// 生成 refresh token 原文(48 个十六进制字符 = 24 随机字节)。
pub fn new_refresh_token() -> String {
    let mut bytes = [0u8; 24];
    rand::thread_rng().fill_bytes(&mut bytes);
    hex(&bytes)
}

/// SHA-256 摘要的 hex(库里只存这个)。
pub fn sha256_hex(input: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(input.as_bytes());
    hex(&hasher.finalize())
}

fn hex(bytes: &[u8]) -> String {
    let mut s = String::with_capacity(bytes.len() * 2);
    for b in bytes {
        s.push_str(&format!("{b:02x}"));
    }
    s
}

// === 输入校验 ================================================================

/// 用户名:3..=32,字母/数字/下划线/连字符(注册与登录共用同一把尺)。
pub fn valid_username(name: &str) -> bool {
    let n = name.trim();
    (3..=32).contains(&n.len())
        && n.chars()
            .all(|c| c.is_ascii_alphanumeric() || c == '_' || c == '-')
}

/// 密码:8..=128。
pub fn valid_password(pw: &str) -> bool {
    (8..=128).contains(&pw.len())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn password_hash_roundtrip() {
        let phc = hash_password("correct horse").unwrap();
        assert!(phc.starts_with("$argon2"));
        assert!(verify_password("correct horse", &phc));
        assert!(!verify_password("wrong", &phc));
        assert!(!verify_password("correct horse", "not-a-hash"));
    }

    #[test]
    fn jwt_roundtrip_and_rejection() {
        let tok = issue_access("secret-a", "11111111-1111-1111-1111-111111111111").unwrap();
        assert_eq!(
            verify_access("secret-a", &tok).as_deref(),
            Some("11111111-1111-1111-1111-111111111111")
        );
        // 错误密钥 / 篡改 → 拒绝
        assert!(verify_access("secret-b", &tok).is_none());
        assert!(verify_access("secret-a", "garbage").is_none());
    }

    #[test]
    fn jwt_expired_token_rejected() {
        let now = chrono::Utc::now().timestamp();
        let claims = AccessClaims {
            sub: "u".into(),
            iat: now - 2 * ACCESS_TTL_SECS,
            exp: now - ACCESS_TTL_SECS,
        };
        let tok = jsonwebtoken::encode(
            &Header::default(),
            &claims,
            &EncodingKey::from_secret("s".as_bytes()),
        )
        .unwrap();
        assert!(verify_access("s", &tok).is_none(), "过期 token 必须被拒");
    }

    #[test]
    fn refresh_token_random_and_hash() {
        let a = new_refresh_token();
        let b = new_refresh_token();
        assert_eq!(a.len(), 48);
        assert_ne!(a, b, "两次生成必须不同");
        assert_eq!(sha256_hex("abc"), sha256_hex("abc"));
        // SHA-256("abc") 的已知向量
        assert_eq!(
            sha256_hex("abc"),
            "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
        );
    }

    #[test]
    fn username_password_validation() {
        assert!(valid_username("yong_cheng-1"));
        assert!(!valid_username("ab")); // 太短
        assert!(!valid_username("a".repeat(33).as_str())); // 太长
        assert!(!valid_username("有空格"));
        assert!(valid_password("12345678"));
        assert!(!valid_password("1234567")); // 太短
        assert!(!valid_password(&"x".repeat(129)));
    }
}
