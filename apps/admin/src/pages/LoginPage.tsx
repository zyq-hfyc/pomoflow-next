import { Button, Card, Typography } from 'antd'
import { SafetyCertificateOutlined } from '@ant-design/icons'
import { Navigate, useSearchParams } from 'react-router-dom'
import { loginURL } from '../services/auth'
import { useAuth } from '../app/AuthContext'

const errorText: Record<string, string> = {
  oidc: 'SSO 验证失败或登录状态已过期，请重新发起登录。',
  unauthorized: '该 SSO 身份未被授予后台权限，请联系安全与权限管理员。',
}

export default function LoginPage() {
  const { state } = useAuth()
  const [params] = useSearchParams()
  if (state.status === 'authenticated') return <Navigate to="/" replace />
  const error = params.get('error')

  return (
    <main className="login-page">
      <Card className="login-card" variant="borderless">
        <div className="login-mark"><SafetyCertificateOutlined /></div>
        <Typography.Title level={2}>PomoFlow 管理后台</Typography.Title>
        <Typography.Paragraph type="secondary">
          仅限内部管理员，通过企业 SSO 登录。所有访问与操作均按权限控制并留审计。
        </Typography.Paragraph>
        {error && <div className="login-error" role="alert">{errorText[error] ?? '登录失败，请重试。'}</div>}
        <Button type="primary" size="large" block href={loginURL}>
          使用企业 SSO 登录
        </Button>
        {/* 仅 vite dev server 渲染(生产构建 DEV=false,不会进产物):
            本地没有 IdP,用 BFF 的假登录换一张真会话,?role= 可切角色。 */}
        {import.meta.env.DEV && (
          <Button block href="/api/auth/dev-login" style={{ marginTop: 12 }}>
            本地联调登录(dev,免 SSO)
          </Button>
        )}
        <Typography.Text type="secondary" className="login-footnote">
          后台不对普通用户开放，请勿分享管理链接或会话。
        </Typography.Text>
      </Card>
    </main>
  )
}
