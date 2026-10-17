export type Role =
  | 'analyst'
  | 'user_operator'
  | 'membership_operator'
  | 'auditor'
  | 'security_admin'
  | 'emergency_admin'

export type Permission =
  | 'dashboard:read'
  | 'users:read'
  | 'users:ban'
  | 'users:revoke_sessions'
  | 'membership:read'
  | 'membership:write'
  | 'audit:read'
  | 'audit:export'
  | 'admin:grant'

export interface AdminIdentity {
  issuer: string
  subject: string
  display_name: string
  role: Role
}

export interface AdminSession {
  user: AdminIdentity
  permissions: Permission[]
  session_expires_ms: number
}

export interface Page<T> {
  items: T[]
  total: number
}

export interface DashboardData {
  range: { from: string; to: string; granularity: 'day' | 'week' | 'month'; timezone: string }
  generated_at_ms: number
  source_updated_at_ms: number | null
  stale: boolean
  metrics: {
    total_users: number
    new_users: number
    active_users: number
    // dau/wau/mau、留存、pulled 需要行为明细(Analytics 服务,P4 后续),
    // 未上线期间 BFF 置 null,前端渲染 "—"
    dau: number | null
    wau: number | null
    mau: number | null
    d1_retention: number | null
    d7_retention: number | null
    d30_retention: number | null
    pushed_changes: number
    pulled_changes: number | null
    sync_users: number
    sync_devices: number
  }
  trends: Array<{
    bucket: string
    new_users: number
    active_users: number
    pushed_changes: number
    pulled_changes: number | null
  }>
}

export interface UserListItem {
  id: string
  username: string
  display_name: string
  masked_email: string | null
  email_verified: boolean
  status: 'active' | 'banned' | 'deletion_pending'
  created_ms: number
  last_login_ms: number | null
  last_sync_ms: number | null
  membership: { level: string; status: string; ends_ms: number | null } | null
}

export interface UserSession {
  id: number
  device_id: string
  device_name: string
  created_ms: number
  expires_ms: number
  revoked_ms: number | null
}

export interface LoginLog {
  id: number
  device_id: string
  device_name: string
  masked_ip: string
  method: string
  ok: boolean
  detail: string
  created_ms: number
}

export interface SyncEntityMetadata {
  entity: string
  record_count: number
  latest_revision: number
  latest_updated_ms: number
}

export interface SyncMetadata {
  device_count: number
  change_count: number
  latest_seq: number | null
  last_sync_ms: number | null
  entities: SyncEntityMetadata[]
}

export interface UserDetail {
  profile: UserListItem & { deletion_requested_ms: number | null; ban_reason: string }
  sessions: UserSession[]
  login_logs: LoginLog[]
  sync: SyncMetadata
  operations: AuditRecord[]
}

export interface Membership {
  user_id: string
  username: string
  masked_email: string | null
  level: string
  status: 'active' | 'expired' | 'none'
  starts_ms: number | null
  ends_ms: number | null
  source: string
  entitlements: Record<string, string | number | boolean>
  updated_ms: number | null
  updated_by: string
}

export interface MembershipChange {
  id: number
  user_id: string
  change_type: 'grant' | 'level_change' | 'entitlement_change' | 'renew'
  before: Record<string, unknown>
  after: Record<string, unknown>
  reason: string
  actor: string
  result: string
  created_ms: number
}

export interface AuditRecord {
  id: number
  request_id: string
  actor_issuer: string
  actor_subject: string
  actor_role: Role | ''
  ip: string
  module: string
  action: string
  target_type: string
  target_id: string
  result: 'ok' | 'denied' | 'error'
  reason: string
  detail: Record<string, unknown>
  created_ms: number
}

export interface AdminUser extends AdminIdentity {
  status: 'active' | 'disabled'
  created_ms: number
  updated_ms: number
  last_login_ms: number | null
}
