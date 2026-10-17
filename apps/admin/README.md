# PomoFlow Admin(管理后台前端)

P4 管理后台的 React + antd SPA。**不直连业务库**:所有数据经
[services/admin-bff](../../services/admin-bff/)(同源反向代理)获取,
鉴权走 OIDC 会话 Cookie + CSRF 双提交。

## 技术栈

- React 19 + TypeScript + Vite
- antd 5 + @ant-design/plots(看板折线)
- vitest + @testing-library/react(组件测试)
- oxlint(lint)

## 页面

| 路由 | 页面 | 所需权限(服务端强制) |
| ------ | ------ | ------ |
| /dashboard | 数据看板 | dashboard:read |
| /users | 用户列表 / 封禁 / 踢下线 | users:read / users:ban / users:revoke_sessions |
| /memberships | 会员管理(占位,503) | membership:read / membership:write |
| /audit | 审计流水 | audit:read |
| /authorization | 后台授权管理 | admin:grant |

菜单按 `/api/auth/me` 返回的 permissions 过滤显示;**隐藏不构成授权边界**,
真正的拦截在 BFF 路由链上。

## 数据口径约定(诚实展示)

- DAU/WAU/MAU、留存、Pull 变更量:**Analytics 服务未上线**,后端置
  `null`,前端渲染 "—" 并提示口径待上线,不用估算值填充。
- 会员域:**Membership 服务未建设**,接口统一 503,页面展示「未部署」。
- 用户邮箱 / IP 一律为脱敏值(`a***@domain` / `1.2.*.*`),后台拿不到明文。

## 本地开发

```bash
npm ci
npm run dev        # 需要本地起 admin-bff 并配同源代理(见 vite.config.ts)
npm test           # vitest 组件测试
npm run lint       # oxlint
npm run build      # tsc -b && vite build
```

登录流程:`/login` → 跳 BFF `/api/auth/login` → OIDC → 回跳携带会话
Cookie(HttpOnly)+ CSRF Cookie(前端写操作带 `X-CSRF-Token` 头)。
