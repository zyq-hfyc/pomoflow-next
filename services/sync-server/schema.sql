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
