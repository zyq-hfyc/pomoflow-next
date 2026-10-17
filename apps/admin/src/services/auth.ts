import { apiFetch } from './api'
import type { AdminSession } from '../types'

export const loginURL = '/api/auth/login'

export function getMe(): Promise<AdminSession> {
  return apiFetch<AdminSession>('/api/auth/me')
}

export function logout(): Promise<void> {
  return apiFetch<void>('/api/auth/logout', { method: 'POST' })
}
