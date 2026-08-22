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
  id         BIGSERIAL PRIMARY KEY,
  user_id    TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  device_id  TEXT NOT NULL DEFAULT '',
  created_ms BIGINT NOT NULL,
  expires_ms BIGINT NOT NULL,
  revoked_ms BIGINT
);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user ON refresh_tokens(user_id);
