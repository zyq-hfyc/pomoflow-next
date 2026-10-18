import { apiFetch } from './api'
import type {
  AdminUser,
  AuditRecord,
  DashboardData,
  Membership,
  MembershipChange,
  Page,
  Release,
  ReleaseAsset,
  ReleaseList,
  Role,
  UserDetail,
  UserListItem,
} from '../types'

function queryString(params: Record<string, string | number | boolean | undefined>): string {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') query.set(key, String(value))
  }
  const text = query.toString()
  return text ? `?${text}` : ''
}

export function getDashboard(params: { from?: string; to?: string; granularity?: string } = {}) {
  return apiFetch<DashboardData>(`/api/dashboard${queryString(params)}`)
}

export function listUsers(params: Record<string, string | number | boolean | undefined> = {}) {
  return apiFetch<Page<UserListItem>>(`/api/users${queryString(params)}`)
}

export function getUser(userID: string) {
  return apiFetch<UserDetail>(`/api/users/${encodeURIComponent(userID)}`)
}

export function banUser(userID: string, reason: string) {
  return apiFetch<void>(`/api/users/${encodeURIComponent(userID)}/ban`, {
    method: 'POST', body: { reason },
  })
}

export function unbanUser(userID: string, reason: string) {
  return apiFetch<void>(`/api/users/${encodeURIComponent(userID)}/unban`, {
    method: 'POST', body: { reason },
  })
}

export function revokeUserSessions(userID: string, sessionID?: number) {
  return apiFetch<{ revoked: number }>(`/api/users/${encodeURIComponent(userID)}/sessions/revoke`, {
    method: 'POST', body: sessionID ? { session_id: sessionID } : {},
  })
}

export function listMemberships(params: Record<string, string | number | boolean | undefined> = {}) {
  return apiFetch<Page<Membership>>(`/api/memberships${queryString(params)}`)
}

export function changeMembershipLevel(userID: string, level: string, endsMS: number | null, reason: string) {
  return apiFetch<Membership>(`/api/memberships/${encodeURIComponent(userID)}/level`, {
    method: 'POST', body: { level, ends_ms: endsMS, reason },
  })
}

export function adjustEntitlement(userID: string, key: string, value: string | number | boolean, reason: string) {
  return apiFetch<Membership>(`/api/memberships/${encodeURIComponent(userID)}/entitlement`, {
    method: 'POST', body: { key, value, reason },
  })
}

export function renewMembership(userID: string, days: number, reason: string) {
  return apiFetch<Membership>(`/api/memberships/${encodeURIComponent(userID)}/renew`, {
    method: 'POST', body: { days, reason },
  })
}

export function listMembershipChanges(params: Record<string, string | number | boolean | undefined> = {}) {
  return apiFetch<Page<MembershipChange>>(`/api/memberships/changes${queryString(params)}`)
}

export function listAudit(params: Record<string, string | number | boolean | undefined> = {}) {
  return apiFetch<Page<AuditRecord>>(`/api/audit${queryString(params)}`)
}

export function listAdminUsers() {
  return apiFetch<AdminUser[]>('/api/admin-users')
}

export function grantAdminRole(input: {
  issuer: string
  subject: string
  display_name: string
  role: Role
  reason: string
}) {
  return apiFetch<AdminUser>('/api/admin-users/role', { method: 'POST', body: { ...input } })
}

export function setAdminStatus(issuer: string, subject: string, status: 'active' | 'disabled', reason: string) {
  return apiFetch<AdminUser>('/api/admin-users/status', {
    method: 'POST', body: { issuer, subject, status, reason },
  })
}

// ---- 发布分发(ADR-013)----

export function listReleases() {
  return apiFetch<ReleaseList>('/api/releases')
}

export function createRelease(version: string, notes: string) {
  return apiFetch<Release>('/api/releases', { method: 'POST', body: { version, notes } })
}

/**
 * 上传安装包:File 以 Blob 原样穿透 apiFetch(不设 Content-Type),
 * BFF 流式转发 sync-server;展示名走 query。
 */
export function uploadReleaseAsset(releaseID: string, platform: string, file: File) {
  const query = new URLSearchParams({ platform, filename: file.name })
  return apiFetch<ReleaseAsset>(
    `/api/releases/${encodeURIComponent(releaseID)}/assets?${query.toString()}`,
    { method: 'POST', body: file },
  )
}

export function publishRelease(releaseID: string) {
  return apiFetch<{ id: string; status: string }>(
    `/api/releases/${encodeURIComponent(releaseID)}/publish`,
    { method: 'POST', body: {} },
  )
}

export function unpublishRelease(releaseID: string) {
  return apiFetch<{ id: string; status: string }>(
    `/api/releases/${encodeURIComponent(releaseID)}/unpublish`,
    { method: 'POST', body: {} },
  )
}

export function deleteRelease(releaseID: string) {
  return apiFetch<{ ok: boolean }>(`/api/releases/${encodeURIComponent(releaseID)}`, {
    method: 'DELETE',
  })
}

export function deleteReleaseAsset(releaseID: string, assetID: string) {
  return apiFetch<{ ok: boolean }>(
    `/api/releases/${encodeURIComponent(releaseID)}/assets/${encodeURIComponent(assetID)}`,
    { method: 'DELETE' },
  )
}
