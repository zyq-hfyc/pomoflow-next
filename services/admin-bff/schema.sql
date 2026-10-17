-- PomoFlow Admin BFF · 自有表（幂等，可由服务启动时执行）
--
-- 只保存后台身份、会话、OIDC 一次性 state 与审计；用户业务数据仍由
-- sync-server / Membership / Analytics 的内部接口提供，Admin BFF 不直连
-- 业务库，也不保存任务、复盘、随手记等用户正文。

-- 后台授权身份。OIDC 的 sub 只在 issuer 内唯一，因此主键必须包含 issuer。
CREATE TABLE IF NOT EXISTS admin_users (
  issuer        TEXT NOT NULL,
  subject       TEXT NOT NULL,
  display_name  TEXT NOT NULL DEFAULT '',
  role          TEXT NOT NULL CHECK (role IN (
    'analyst', 'user_operator', 'membership_operator',
    'auditor', 'security_admin', 'emergency_admin'
  )),
  status        TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
  created_ms    BIGINT NOT NULL,
  updated_ms    BIGINT NOT NULL,
  last_login_ms BIGINT,
  PRIMARY KEY (issuer, subject)
);

CREATE INDEX IF NOT EXISTS idx_admin_users_role_status ON admin_users(role, status);

-- 后台会话：cookie 中是高熵随机 token，数据库只存 SHA-256 摘要。
-- CSRF 使用 double-submit cookie + 请求头，数据库同样只存摘要。
CREATE TABLE IF NOT EXISTS admin_sessions (
  id           BIGSERIAL PRIMARY KEY,
  token_hash   TEXT NOT NULL UNIQUE,
  issuer       TEXT NOT NULL,
  subject      TEXT NOT NULL,
  csrf_hash    TEXT NOT NULL,
  created_ms   BIGINT NOT NULL,
  expires_ms   BIGINT NOT NULL,
  revoked_ms   BIGINT,
  ip           TEXT NOT NULL DEFAULT '',
  user_agent   TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_admin_sessions_identity ON admin_sessions(issuer, subject, expires_ms);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expiry ON admin_sessions(expires_ms) WHERE revoked_ms IS NULL;

-- OIDC authorization code flow 的一次性 state/nonce；回调消费后立即删除。
CREATE TABLE IF NOT EXISTS admin_oidc_states (
  state_hash  TEXT PRIMARY KEY,
  issuer      TEXT NOT NULL,
  nonce_hash  TEXT NOT NULL,
  created_ms  BIGINT NOT NULL,
  expires_ms  BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_admin_oidc_states_expiry ON admin_oidc_states(expires_ms);

-- 管理操作审计：只能追加，后台不提供 UPDATE/DELETE API。
-- detail 只允许脱敏摘要/变更前后值；禁止写入密码、令牌、验证码和用户正文。
CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id            BIGSERIAL PRIMARY KEY,
  request_id    TEXT NOT NULL,
  actor_issuer  TEXT NOT NULL DEFAULT '',
  actor_subject TEXT NOT NULL DEFAULT '',
  actor_role    TEXT NOT NULL DEFAULT '',
  session_id    BIGINT,
  ip            TEXT NOT NULL DEFAULT '',
  module        TEXT NOT NULL,
  action        TEXT NOT NULL,
  target_type   TEXT NOT NULL DEFAULT '',
  target_id     TEXT NOT NULL DEFAULT '',
  result        TEXT NOT NULL CHECK (result IN ('ok', 'denied', 'error')),
  reason        TEXT NOT NULL DEFAULT '',
  detail        JSONB NOT NULL DEFAULT '{}',
  created_ms    BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_admin_audit_created ON admin_audit_logs(created_ms DESC);
CREATE INDEX IF NOT EXISTS idx_admin_audit_actor ON admin_audit_logs(actor_issuer, actor_subject, created_ms DESC);
CREATE INDEX IF NOT EXISTS idx_admin_audit_target ON admin_audit_logs(target_type, target_id, created_ms DESC);
CREATE INDEX IF NOT EXISTS idx_admin_audit_request ON admin_audit_logs(request_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_module_action ON admin_audit_logs(module, action, created_ms DESC);
