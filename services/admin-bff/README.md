# PomoFlow Admin BFF(管理后台后端)

P4 管理后台的 Go/gin BFF。ADR-008:管理台**永不直连业务库** ——
自有表(OIDC 会话/RBAC/审计)+ OIDC 登录 + IP 白名单 + 服务间 token,
业务数据经 sync-server 的 `/internal/*` 通道获取。

## 目录

```text
cmd/admin-bff/      入口:加载配置、连库、建路由、监听
internal/config/    环境变量加载与启动校验
internal/auth/      固定角色权限矩阵 / OIDC 客户端 / token 哈希
internal/store/     Store 接口 + Postgres 实现(自有表)
internal/security/  IP 白名单 / 可信代理
internal/upstream/  sync-server 服务间调用客户端(INTERNAL_SERVICE_TOKEN)
internal/httpapi/   gin 路由、中间件链、auth/业务 handler、全链路测试
schema.go           嵌入 schema.sql
schema.sql          自有表:admin_users / admin_sessions / admin_oidc_states / admin_audit_logs
```

## 环境变量

| 变量 | 必填 | 说明 |
| ------ | ------ | ------ |
| PORT | 否(8090) | 监听端口 |
| DATABASE_URL | 是 | BFF 自有表 PostgreSQL(BFF 可与 sync-server 共库,表不重叠) |
| ADMIN_OIDC_ISSUER | 是 | OIDC Issuer URL |
| ADMIN_OIDC_CLIENT_ID / _SECRET | 是 | OIDC 客户端凭据 |
| ADMIN_OIDC_REDIRECT_URL | 是 | 回跳 URL(须在 IdP 注册) |
| ADMIN_PUBLIC_URL | 是 | 前端 origin,登录/失败回跳 |
| INTERNAL_SERVICE_TOKEN | 是 | 与 sync-server 共享的服务间 token(openssl rand -hex 32) |
| SYNC_SERVER_URL | 否(127.0.0.1:8080) | sync-server 内网地址 |
| ADMIN_COOKIE_SECURE | 否(true) | false 仅限本地 http 联调 |
| ADMIN_IP_ALLOWLIST | 否(127.0.0.1/32,::1/128) | 管理 API 来源白名单(CIDR 列表) |
| ADMIN_TRUSTED_PROXY_CIDRs | 否 | 信任的代理网段(XFF 解析前提) |
| ADMIN_SESSION_TTL_MINUTES | 否(480) | 后台会话时长(15..720) |
| ADMIN_BOOTSTRAP_SUBJECT | 首次 | 首个应急超管的 IdP subject(引导窗口) |
| ADMIN_BOOTSTRAP_DISPLAY_NAME | 否 | 引导身份显示名 |
| ADMIN_DEV_FAKE_LOGIN | 否(false) | **仅本地联调**:跳过 OIDC 的假登录。强制要求 `ADMIN_COOKIE_SECURE=false`(否则启动失败),OIDC 四项随之可留空;登录入口 `GET /api/auth/dev-login?role=<role>` 换一张真会话(角色任意合法值,默认 emergency_admin),并自动种一个后备应急超管避免「最后一个应急管理员」保护挡住角色实验。生产配置到不了这条路径 |

## RBAC(固定角色,默认拒绝)

6 角色 × 9 权限点,矩阵只在 [internal/auth/rbac.go](internal/auth/rbac.go) 定义:

| 权限 | analyst | user_operator | membership_operator | auditor | security_admin | emergency_admin |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| dashboard:read | ✔ | | | | | ✔ |
| users:read | | ✔ | ✔ | | | ✔ |
| users:ban | | ✔ | | | | ✔ |
| users:revoke_sessions | | ✔ | | | | ✔ |
| code: membership:read/write | | | ✔ | | | ✔ |
| audit:read | | | | ✔ | ✔ | ✔ |
| audit:export | | | | | | ✔ |
| admin:grant | | | | | ✔(不能授应急) | ✔ |

硬约束(服务端强制,前端隐藏不算授权边界):

- **禁止自我提权/自我变更**:改自己角色或状态 → 403。
- **最后应急管理员保护**:对唯一 active 的 emergency_admin 降级/禁用 → 409。
- 角色每请求从 admin_users 重读,收回授权即时生效。

## 业务接口(经 /internal/* 通道)

| BFF 端点 | 上游 | 权限 |
| ------ | [sync-server /internal/*](../sync-server/) | ------ |
| GET /api/dashboard | /internal/metrics/overview | dashboard:read |
| GET /api/users | /internal/users | users:查询串白名单透传 |
| GET /api/users/:id | /internal/users/:id | users:read |
| POST ban / unban / sessions/revoke | 对应上游 POST | users:ban / revoke_sessions |
| GET /api/memberships* | —— | 有权限也 503(服务未建设) |
| GET /api/audit | BFF 自有表 | audit:read |
| GET/POST /api/admin-users* | BFF 自有表 | admin:grant(自改/最后应急保护) |

上游非 2xx 归一化为 `{error:{code,message,request_id}}` 信封;上游 message
为受控文案,可直接展示。写操作全部落 admin_audit_logs(append-only)。

## 测试

`go test -race ./...` —— auth + 业务全链路(fakeStore + httptest 上游替身:
token 透传、查询白名单、错误归一化、看板 null 口径、会员 503、RBAC、
最后应急管理员保护、审计断言)。本机无 Go,门禁在 CI(admin-bff job)。
