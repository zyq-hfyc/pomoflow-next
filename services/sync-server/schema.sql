-- PomoFlow Sync Service · PostgreSQL schema
-- 容器首次启动时由 docker-entrypoint-initdb.d 自动执行(幂等,可重复跑)。
--
-- 设计(P1a 简化,详见服务 README):
-- - snapshots:每 (user, entity, entity_id) 的权威快照。payload 为实体全量
--   JSON,服务端不解析实体内部结构 —— 合并只看 revision/updated_at/device_id
--   元信息,与 core 的 LWW(ADR-009)完全对齐。
-- - changelog:seq 全局单调(游标,ADR-011)+ (user_id, change_id) 唯一
--   (推送幂等);行内存完整 Change JSON,pull 原样下发。

CREATE TABLE IF NOT EXISTS snapshots (
  user_id    TEXT NOT NULL,
  entity     TEXT NOT NULL,
  entity_id  TEXT NOT NULL,
  revision   BIGINT NOT NULL,
  updated_ms BIGINT NOT NULL,
  device_id  TEXT NOT NULL,
  payload    JSONB NOT NULL,
  PRIMARY KEY (user_id, entity, entity_id)
);

CREATE TABLE IF NOT EXISTS changelog (
  seq       BIGSERIAL PRIMARY KEY,
  user_id   TEXT NOT NULL,
  change_id TEXT NOT NULL,
  device_id TEXT NOT NULL,
  change    JSONB NOT NULL,
  UNIQUE (user_id, change_id)
);

-- pull 查询路径:user 内按 seq 递增扫描
CREATE INDEX IF NOT EXISTS idx_changelog_pull ON changelog (user_id, seq);

-- === 账号体系(P1b,ADR-007)===============================================
-- users:注册账号;password_hash 为 argon2 PHC 串。
-- 首个注册账号可"继承" SYNC_USER_ID(存量单账号数据无缝并入,见 auth_handlers)。
CREATE TABLE IF NOT EXISTS users (
  id            TEXT PRIMARY KEY,          -- UUID
  username      TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_ms    BIGINT NOT NULL
);

-- refresh_tokens:只存 SHA-256 摘要(库被拖走也拿不到原 token 可用);
-- revoked_ms 非空 = 已吊销(轮换时旧 token 立即作废)。
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id          BIGSERIAL PRIMARY KEY,
  user_id     TEXT NOT NULL,
  token_hash  TEXT NOT NULL UNIQUE,
  device_id   TEXT NOT NULL DEFAULT '',
  device_name TEXT NOT NULL DEFAULT '',
  created_ms  BIGINT NOT NULL,
  expires_ms  BIGINT NOT NULL,
  revoked_ms  BIGINT
);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user ON refresh_tokens(user_id);

-- P1c:会话管理需要友好设备名(旧数据卷升级;PG 支持 ADD COLUMN IF NOT EXISTS,
-- 新建表时上方定义已含该列,此句幂等无害)
ALTER TABLE refresh_tokens ADD COLUMN IF NOT EXISTS device_name TEXT NOT NULL DEFAULT '';

-- === P1d:邮箱渠道 + 第三方身份预留(ADR-012)================================

-- users 扩展:邮箱绑定(可空;部分唯一索引保证已绑定邮箱全局唯一)、
-- 显示名(空=回退 username)、邮箱验证时间、密码最后修改时间(安全提示卡用)
ALTER TABLE users ADD COLUMN IF NOT EXISTS display_name TEXT NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified_ms BIGINT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_changed_ms BIGINT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email) WHERE email IS NOT NULL;

-- 第三方身份(微信预留,本批不写入;资质到位后 provider='wechat_open')
CREATE TABLE IF NOT EXISTS auth_identities (
  id            BIGSERIAL PRIMARY KEY,
  user_id       TEXT NOT NULL,
  provider      TEXT NOT NULL,
  provider_uid  TEXT NOT NULL,          -- openid
  union_id      TEXT,                   -- 微信 unionid(多应用同主体对齐账号)
  profile       JSONB NOT NULL DEFAULT '{}',
  created_ms    BIGINT NOT NULL,
  last_login_ms BIGINT,
  UNIQUE (provider, provider_uid)
);

CREATE INDEX IF NOT EXISTS idx_auth_identities_user ON auth_identities(user_id);

-- 邮件验证码(注册/找回/换绑共用一表,purpose 区分;库里只存 HMAC-SHA256 摘要)
CREATE TABLE IF NOT EXISTS email_codes (
  id          BIGSERIAL PRIMARY KEY,
  email       TEXT NOT NULL,
  purpose     TEXT NOT NULL,            -- 'register' | 'reset' | 'bind'
  code_hash   TEXT NOT NULL,            -- HMAC-SHA256(CODE_PEPPER, email:code)
  attempts    INT  NOT NULL DEFAULT 0,  -- 校验失败计数,≥5 作废
  created_ms  BIGINT NOT NULL,
  expires_ms  BIGINT NOT NULL,          -- created + 10min
  used_ms     BIGINT,                   -- 非空=已消费(单次有效)
  request_ip  TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_email_codes_lookup ON email_codes (email, purpose, created_ms DESC);
CREATE INDEX IF NOT EXISTS idx_email_codes_ip ON email_codes (request_ip, created_ms DESC);
