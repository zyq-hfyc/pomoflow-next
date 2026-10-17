import type { ReactNode } from 'react'
import { Button, Result, Spin } from 'antd'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'
import type { Permission } from '../types'

export function RequireAuth({ children }: { children: ReactNode }) {
  const { state, reload } = useAuth()
  const location = useLocation()
  if (state.status === 'loading') {
    return <div className="page-center"><Spin size="large" tip="正在验证管理会话" /></div>
  }
  if (state.status === 'anonymous') {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  if (state.status === 'error') {
    return (
      <div className="page-center">
        <Result
          status="error"
          title="管理服务暂时不可用"
          subTitle={state.error}
          extra={<Button type="primary" onClick={() => void reload()}>重试</Button>}
        />
      </div>
    )
  }
  return children
}

export function RequirePermission({ permission, children }: { permission: Permission; children: ReactNode }) {
  const { hasPermission } = useAuth()
  if (!hasPermission(permission)) {
    return <Result status="403" title="没有访问权限" subTitle="如需该权限，请联系安全与权限管理员。" />
  }
  return children
}
