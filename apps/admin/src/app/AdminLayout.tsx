import { useMemo } from 'react'
import { Button, Dropdown } from 'antd'
import {
  AuditOutlined,
  CloudUploadOutlined,
  CrownOutlined,
  DashboardOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { ProLayout } from '@ant-design/pro-components'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import type { Permission } from '../types'

const menu: Array<{ path: string; name: string; icon: React.ReactNode; permission: Permission }> = [
  { path: '/', name: '数据看板', icon: <DashboardOutlined />, permission: 'dashboard:read' },
  { path: '/users', name: '用户运营', icon: <TeamOutlined />, permission: 'users:read' },
  { path: '/memberships', name: '会员管理', icon: <CrownOutlined />, permission: 'membership:read' },
  { path: '/audit', name: '审计中心', icon: <AuditOutlined />, permission: 'audit:read' },
  { path: '/releases', name: '发布分发', icon: <CloudUploadOutlined />, permission: 'releases:manage' },
  { path: '/authorization', name: '后台授权', icon: <SafetyCertificateOutlined />, permission: 'admin:grant' },
]

export default function AdminLayout() {
  const { state, logout, hasPermission } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const session = state.status === 'authenticated' ? state.session : null
  const routes = useMemo(() => menu.filter((item) => hasPermission(item.permission)), [hasPermission])

  return (
    <ProLayout
      title="PomoFlow 后管"
      logo={false}
      layout="side"
      fixedHeader
      fixSiderbar
      location={{ pathname: location.pathname }}
      route={{ path: '/', routes }}
      menuItemRender={(item, dom) => item.path ? <Link to={item.path}>{dom}</Link> : dom}
      actionsRender={() => [
        <Dropdown
          key="account"
          menu={{
            items: [{ key: 'logout', icon: <LogoutOutlined />, label: '退出登录', onClick: () => {
              void logout().then(() => navigate('/login', { replace: true }))
            } }],
          }}
        >
          <Button type="text">{session?.user.display_name ?? session?.user.subject}</Button>
        </Dropdown>,
      ]}
      contentStyle={{ padding: 24 }}
    >
      <Outlet />
    </ProLayout>
  )
}
