import { App as AntApp, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './app/AuthContext'
import AdminLayout from './app/AdminLayout'
import { RequireAuth, RequirePermission } from './app/guards'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import UsersPage from './pages/UsersPage'
import MembershipsPage from './pages/MembershipsPage'
import AuditPage from './pages/AuditPage'
import AuthorizationPage from './pages/AuthorizationPage'
import './App.css'

function Home() {
  const { hasPermission } = useAuth()
  if (hasPermission('dashboard:read')) return <DashboardPage />
  if (hasPermission('users:read')) return <Navigate to="/users" replace />
  if (hasPermission('membership:read')) return <Navigate to="/memberships" replace />
  if (hasPermission('audit:read')) return <Navigate to="/audit" replace />
  if (hasPermission('admin:grant')) return <Navigate to="/authorization" replace />
  return <div>当前角色没有可用菜单，请联系安全与权限管理员。</div>
}

export default function App() {
  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#6554c0', borderRadius: 10 } }}>
      <AntApp>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<RequireAuth><AdminLayout /></RequireAuth>}>
                <Route index element={<Home />} />
                <Route path="users" element={<RequirePermission permission="users:read"><UsersPage /></RequirePermission>} />
                <Route path="memberships" element={<RequirePermission permission="membership:read"><MembershipsPage /></RequirePermission>} />
                <Route path="audit" element={<RequirePermission permission="audit:read"><AuditPage /></RequirePermission>} />
                <Route path="authorization" element={<RequirePermission permission="admin:grant"><AuthorizationPage /></RequirePermission>} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </AntApp>
    </ConfigProvider>
  )
}
