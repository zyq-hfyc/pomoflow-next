//! 认证原语(P1b,ADR-007)—— 密码哈希 / JWT / refresh token。
//!
//! - 密码:argon2id(PHC 串自带随机盐,无需另存);
//! - Access Token:JWT HS256,短寿命(15 分钟),claims 放 `sub`(user_id)、
//!   可选 `sid`(refresh_tokens.id,新 token 必带)与 `iat_ms`(毫秒边界);
//! - Refresh Token:24 随机字节的 hex(48 字符),库里只存 SHA-256 摘要,
//!   轮换式(每次 refresh 换新,旧的立即吊销)。
//!
//! 全部纯函数/纯计算,单测不打 DB。

use argon2::password_hash::{
    rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString,
};
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

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct AccessClaims {
    /// 用户 UUID(字符串形式)
    pub sub: String,
    pub iat: i64,
    pub exp: i64,
    /// 绑定的 refresh_tokens.id;旧 token 没有此字段,过渡期内按账号状态校验。
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub sid: Option<i64>,
    /// 毫秒级签发时间(扩展 claim);标准 iat 仍是秒。旧 token 缺省时回落 iat * 1000。
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub iat_ms: Option<i64>,
}

impl AccessClaims {
    pub fn issued_at_ms(&self) -> i64 {
        self.iat_ms.unwrap_or_else(|| self.iat.saturating_mul(1000))
    }
}

/// 签发 Access Token;新 token 绑定具体 refresh 会话,旧式无 sid token 仍可解码。
/// `min_issued_ms` 用于强制下线后的同毫秒边界:新 token 可从 cutoff 起生效。
pub fn issue_access(
    secret: &str,
    user_id: &str,
    sid: Option<i64>,
    min_issued_ms: Option<i64>,
) -> Result<String, String> {
    let now = chrono::Utc::now();
    let now_ms = now.timestamp_millis();
    let issued_at_ms = min_issued_ms.map_or(now_ms, |minimum| now_ms.max(minimum));
    let claims = AccessClaims {
        sub: user_id.to_string(),
        iat: now.timestamp(),
        exp: now.timestamp() + ACCESS_TTL_SECS,
        sid,
        iat_ms: Some(issued_at_ms),
    };
    jsonwebtoken::encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_bytes()),
    )
    .map_err(|e| format!("sign jwt: {e}"))
}

/// 校验并解码 Access Token。这里只验签名/exp,不触 DB;账号与会话授权由调用方完成。
/// exp 由 `Validation::default()` 自动校验;算法锁定 HS256。
pub fn verify_access(secret: &str, token: &str) -> Option<AccessClaims> {
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
    Some(data.claims)
}

// === Access DB 授权的纯状态判定(不触 DB)===================================

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum AccessDenial {
    AccountMissing,
    AccountBanned,
    AccessRevoked,
    SessionMissing,
    SessionWrongUser,
    SessionRevoked,
    SessionExpired,
}

#[derive(Debug, Clone, Copy)]
pub struct AccountStatus {
    pub banned_ms: Option<i64>,
    pub access_revoked_before_ms: Option<i64>,
}

#[derive(Debug, Clone)]
pub struct SessionStatus {
    pub user_id: String,
    pub revoked_ms: Option<i64>,
    pub expires_ms: i64,
}

/// 所有 access(含旧式无 sid token)都必须通过的账号状态检查。
/// 新 token 用毫秒级 iat_ms;legacy token 回落为标准 iat 秒 * 1000。
pub fn check_account_access(
    issued_at_ms: i64,
    account: Option<AccountStatus>,
) -> Result<(), AccessDenial> {
    let Some(account) = account else {
        return Err(AccessDenial::AccountMissing);
    };
    if account.banned_ms.is_some() {
        return Err(AccessDenial::AccountBanned);
    }
    if account
        .access_revoked_before_ms
        .is_some_and(|cutoff| issued_at_ms < cutoff)
    {
        return Err(AccessDenial::AccessRevoked);
    }
    Ok(())
}

/// 带 sid access 的会话检查:行必须存在、属于该用户、未吊销且未过期。
pub fn check_session_access(
    user_id: &str,
    session: Option<SessionStatus>,
    now_ms: i64,
) -> Result<(), AccessDenial> {
    let Some(session) = session else {
        return Err(AccessDenial::SessionMissing);
    };
    if session.user_id != user_id {
        return Err(AccessDenial::SessionWrongUser);
    }
    if session.revoked_ms.is_some() {
        return Err(AccessDenial::SessionRevoked);
    }
    if session.expires_ms <= now_ms {
        return Err(AccessDenial::SessionExpired);
    }
    Ok(())
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
        let tok = issue_access(
            "secret-a",
            "11111111-1111-1111-1111-111111111111",
            Some(7),
            None,
        )
        .unwrap();
        let claims = verify_access("secret-a", &tok).unwrap();
        assert_eq!(claims.sub, "11111111-1111-1111-1111-111111111111");
        assert_eq!(claims.sid, Some(7));
        assert!(claims.iat_ms.is_some());
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
            sid: None,
            iat_ms: None,
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

    #[test]
    fn access_claims_sid_serialization_and_legacy_compatibility() {
        let with_sid = AccessClaims {
            sub: "u".into(),
            iat: 10,
            exp: 20,
            sid: Some(42),
            iat_ms: None,
        };
        let value = serde_json::to_value(&with_sid).unwrap();
        assert_eq!(value["sid"], 42);
        assert_eq!(
            serde_json::from_value::<AccessClaims>(value).unwrap(),
            with_sid
        );

        let legacy = AccessClaims {
            sid: None,
            ..with_sid
        };
        let value = serde_json::to_value(&legacy).unwrap();
        assert!(value.get("sid").is_none(), "旧格式不应多出 null sid");
        let decoded: AccessClaims = serde_json::from_value(serde_json::json!({
            "sub": "u",
            "iat": 10,
            "exp": 20
        }))
        .unwrap();
        assert_eq!(decoded, legacy);
    }

    #[test]
    fn account_access_status_checks_missing_banned_and_cutoff() {
        let active = AccountStatus {
            banned_ms: None,
            access_revoked_before_ms: None,
        };
        assert_eq!(check_account_access(10_000, Some(active)), Ok(()));
        assert_eq!(
            check_account_access(10_000, None),
            Err(AccessDenial::AccountMissing)
        );
        assert_eq!(
            check_account_access(
                10_000,
                Some(AccountStatus {
                    banned_ms: Some(1),
                    ..active
                })
            ),
            Err(AccessDenial::AccountBanned)
        );
        assert_eq!(
            check_account_access(
                10_000,
                Some(AccountStatus {
                    access_revoked_before_ms: Some(10_001),
                    ..active
                })
            ),
            Err(AccessDenial::AccessRevoked)
        );
        assert_eq!(
            check_account_access(
                10_000,
                Some(AccountStatus {
                    access_revoked_before_ms: Some(10_000),
                    ..active
                })
            ),
            Ok(()),
            "签发时间恰好等于 cutoff 不属于早于 cutoff"
        );
    }

    #[test]
    fn precise_iat_ms_allows_new_login_without_letting_legacy_token_cross_cutoff() {
        let account = AccountStatus {
            banned_ms: None,
            access_revoked_before_ms: Some(10_001),
        };
        let legacy = AccessClaims {
            sub: "u".into(),
            iat: 10,
            exp: 20,
            sid: None,
            iat_ms: None,
        };
        assert_eq!(legacy.issued_at_ms(), 10_000);
        assert_eq!(
            check_account_access(legacy.issued_at_ms(), Some(account)),
            Err(AccessDenial::AccessRevoked),
            "旧 token 只有秒级 iat,同秒强制下线也必须被拒绝"
        );
        let old_precise = AccessClaims {
            iat_ms: Some(10_000),
            ..legacy.clone()
        };
        assert_eq!(
            check_account_access(old_precise.issued_at_ms(), Some(account)),
            Err(AccessDenial::AccessRevoked)
        );
        let new_same_jwt_second = AccessClaims {
            iat_ms: Some(10_001),
            ..legacy
        };
        assert_eq!(
            check_account_access(new_same_jwt_second.issued_at_ms(), Some(account)),
            Ok(()),
            "新登录即使仍在同一 JWT 秒,也可凭精确签发时间通过"
        );

        let minimum = chrono::Utc::now().timestamp_millis() + 5_000;
        let token = issue_access("s", "u", Some(1), Some(minimum)).unwrap();
        let claims = verify_access("s", &token).unwrap();
        assert_eq!(claims.iat_ms, Some(minimum));
        assert_eq!(
            check_account_access(
                claims.issued_at_ms(),
                Some(AccountStatus {
                    access_revoked_before_ms: Some(minimum),
                    ..account
                })
            ),
            Ok(())
        );
    }

    #[test]
    fn session_access_status_checks_all_rejection_cases() {
        let active = SessionStatus {
            user_id: "user-a".into(),
            revoked_ms: None,
            expires_ms: 2_000,
        };
        assert_eq!(
            check_session_access("user-a", Some(active.clone()), 1_000),
            Ok(())
        );
        assert_eq!(
            check_session_access("user-a", None, 1_000),
            Err(AccessDenial::SessionMissing)
        );
        assert_eq!(
            check_session_access("user-b", Some(active.clone()), 1_000),
            Err(AccessDenial::SessionWrongUser)
        );
        assert_eq!(
            check_session_access(
                "user-a",
                Some(SessionStatus {
                    revoked_ms: Some(999),
                    ..active.clone()
                }),
                1_000
            ),
            Err(AccessDenial::SessionRevoked)
        );
        assert_eq!(
            check_session_access("user-a", Some(active.clone()), 2_000),
            Err(AccessDenial::SessionExpired),
            "expires_ms = now 时已经过期"
        );
        assert_eq!(
            check_session_access("user-a", Some(active), 2_001),
            Err(AccessDenial::SessionExpired)
        );
    }
}
