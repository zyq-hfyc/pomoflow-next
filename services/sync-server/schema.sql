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
  created_ms    BIGINT NOT NULL,
  banned_ms     BIGINT,
  banned_reason TEXT NOT NULL DEFAULT '',
  banned_by     TEXT NOT NULL DEFAULT '',
  access_revoked_before_ms BIGINT
);

-- P4 后管前置安全:封禁信息 + access 强制下线水位(旧数据卷幂等升级)。
ALTER TABLE users ADD COLUMN IF NOT EXISTS banned_ms BIGINT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS banned_reason TEXT NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS banned_by TEXT NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS access_revoked_before_ms BIGINT;

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
-- 个性签名(原型规格:最多 50 字,2026-08-22 用户决策从 P6 提前落地)
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT NOT NULL DEFAULT '';
-- 账号注销:非空 = 已申请,冷静期 15 天(原型规格;每日任务到期级联删除)
ALTER TABLE users ADD COLUMN IF NOT EXISTS deletion_requested_ms BIGINT;
-- 头像(原型规格:JPG/PNG ≤2MB;PG BYTEA 直存 —— 个人规模免对象存储,
-- P6 社交化规模化时再迁 COS + CDN,ADR-012)
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar BYTEA;
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_mime TEXT;
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

-- 登录记录(P1d,用户要求):每次登录/注册(成功与失败)各一行;
-- 失败且账号不存在时 user_id 为空(仅 psql 可查);每日任务清理 180 天前旧记录
CREATE TABLE IF NOT EXISTS login_logs (
  id          BIGSERIAL PRIMARY KEY,
  user_id     TEXT NOT NULL DEFAULT '',
  device_id   TEXT NOT NULL DEFAULT '',
  device_name TEXT NOT NULL DEFAULT '',
  ip          TEXT NOT NULL DEFAULT '',
  method      TEXT NOT NULL,            -- username | email | register_username | register_email
  ok          BOOLEAN NOT NULL,
  detail      TEXT NOT NULL DEFAULT '', -- 失败原因(成功为空)
  created_ms  BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_login_logs_user ON login_logs(user_id, created_ms DESC);

-- ============================================================
-- 发布分发(官网下载 + 后管上传联动;ADR-013)
-- 版本与安装包资产是业务数据,归 sync-server(ADR-008 精神);
-- 文件实体存 RELEASE_FILES_DIR 本地卷,DB 只存相对路径。
-- ============================================================

-- 发布版本:后管建 draft → 传资产 → publish 官网可见;unpublish 可下架
CREATE TABLE IF NOT EXISTS releases (
  id           TEXT PRIMARY KEY,        -- UUID
  version      TEXT NOT NULL UNIQUE,    -- 展示/排序用版本号("0.2.0")
  notes        TEXT NOT NULL DEFAULT '',-- 发布说明(官网展示)
  status       TEXT NOT NULL DEFAULT 'draft'
               CHECK (status IN ('draft', 'published', 'unpublished')),
  created_ms   BIGINT NOT NULL,
  published_ms BIGINT                   -- 首次发布时间(下架后保留)
);

-- 安装包资产:每版本每平台至多一个(UNIQUE)→ 重传即替换
CREATE TABLE IF NOT EXISTS release_assets (
  id             TEXT PRIMARY KEY,      -- UUID(下载 URL 只暴露这个)
  release_id     TEXT NOT NULL REFERENCES releases(id) ON DELETE CASCADE,
  platform       TEXT NOT NULL
                 CHECK (platform IN ('windows', 'linux', 'mac', 'ios', 'android', 'harmony')),
  filename       TEXT NOT NULL,         -- 原始展示名(已清洗,仅用于头与展示)
  ext            TEXT NOT NULL,         -- 白名单内小写扩展(无点,如 "exe")
  size_bytes     BIGINT NOT NULL,
  sha256         TEXT NOT NULL,         -- 上传时滚动计算(hex)
  storage_path   TEXT NOT NULL,         -- 相对 RELEASE_FILES_DIR("{uuid}.{ext}")
  download_count BIGINT NOT NULL DEFAULT 0,
  created_ms     BIGINT NOT NULL,
  UNIQUE (release_id, platform)
);

CREATE INDEX IF NOT EXISTS idx_release_assets_release ON release_assets (release_id);
