import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ApiError } from '../services/api'
import { getMe, logout as logoutRequest } from '../services/auth'
import type { AdminSession, Permission } from '../types'

type AuthState =
  | { status: 'loading'; session: null }
  | { status: 'authenticated'; session: AdminSession }
  | { status: 'anonymous'; session: null }
  | { status: 'error'; session: null; error: string }

interface AuthContextValue {
  state: AuthState
  reload: () => Promise<void>
  logout: () => Promise<void>
  hasPermission: (permission: Permission) => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: 'loading', session: null })

  const reload = useCallback(async () => {
    try {
      const session = await getMe()
      setState({ status: 'authenticated', session })
    } catch (error) {
      if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
        setState({ status: 'anonymous', session: null })
      } else {
        setState({ status: 'error', session: null, error: error instanceof Error ? error.message : '加载失败' })
      }
    }
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  const logout = useCallback(async () => {
    await logoutRequest()
    setState({ status: 'anonymous', session: null })
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    state,
    reload,
    logout,
    hasPermission: (permission) => state.status === 'authenticated' && state.session.permissions.includes(permission),
  }), [state, reload, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}
