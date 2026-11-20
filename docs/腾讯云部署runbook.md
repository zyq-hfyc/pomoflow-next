# 腾讯云生产部署 runbook(2026-11-20)

> 生产环境 = 腾讯云 Ubuntu 22.04/24.04,IP 直连(暂无域名,纯 HTTP 内测接受);
> 测试环境 = VMware VM Ubuntu,**原地不动**,继续用仓库 base compose。
> 两环境隔离 = 测试版客户端自配地址(现状不变),生产受管版(managed)
> 构建期烘焙生产地址且无配置 UI;机制见 [架构决策摘要](#环境隔离机制)。

## 0. 前置认知(顺序敏感,别跳步)

- **游标是全局单键**:pull 游标 + pending 队列不分服务器。老设备切服务器
  必须双复位,否则推不上/拉不下静默丢数据 —— 客户端已内置「换服亲和复位」
  (桌面 `ensure_server_affinity` / 移动端 `_ensureServerAffinity`,LWW 幂等,
  全量重推/重拉安全)。**数据迁移就是靠它**:VM 数据不用 dump,设备升级
  managed 包登录生产后自动全量重推。
- **桌面内测单账号**:桌面归属守卫要求登录账号 = 本机 `local_user_id`,
  天然单账号。owner 账号必须在**任何内测用户注册之前**预建(步骤 5);
  其他内测用户只发移动端 APK。
- **不烘焙任何密钥进客户端**:managed 包里只有服务器地址,没有 token。

## 1. 服务器初始化

Docker 官方 apt 源装 docker-ce + compose 插件(**不用 docker.io 旧包**):

```bash
# 按 https://docs.docker.com/engine/install/ubuntu/ 执行后校验:
docker compose version   # 必须 ≥ v2.24(prod override 用了 !override 标签)
```

compose 过旧且不便升级时:放弃 override,手写一份独立完整 prod compose
(把 base 复制改端口/挂载/变量),别硬上。

## 2. 目录与物料

```bash
# 服务器
mkdir -p /opt/pomoflow/data/{website-dist,releases,backups}
```

```bash
# Windows 本地(sync-server 二进制 + 部署包;pack-deploy 排除 dist)
bash services/sync-server/build-local.sh
bash services/sync-server/pack-deploy.sh
scp services/sync-server/pomoflow-sync-server-*.tar.gz user@<IP>:/opt/pomoflow/
```

```bash
# 服务器解压部署包后,官网 dist 单独构建上传(**必须先于首启**:
# WEBSITE_DIST_DIR 启动即校验目录存在,fail-fast)
cd apps/website && npm ci && npm run build
scp -r apps/website/dist/* user@<IP>:/opt/pomoflow/data/website-dist/
# deploy/ 物料也传上去(compose 同目录放 deploy/)
scp -r services/sync-server/deploy user@<IP>:/opt/pomoflow/services/sync-server/
```

## 3. `.env`(服务器手工创建,不进仓库)

`/opt/pomoflow/services/sync-server/.env`,密钥全用强随机:

```bash
POSTGRES_PASSWORD=$(openssl rand -hex 32)
SYNC_TOKEN=$(openssl rand -hex 32)
JWT_SECRET=$(openssl rand -hex 32)          # 必配:启用账号体系
CODE_PEPPER=$(openssl rand -hex 32)
INTERNAL_SERVICE_TOKEN=$(openssl rand -hex 32)  # 首版发布/未来 admin-bff
# SYNC_USER_ID = owner 桌面端「设置 → 账号 → 数据同步 → 本机标识」里的
# user_id(get_sync_identity;预建账号 id 要与它一致才能过桌面归属守卫)
# SMTP 内测期不配:验证码从 docker compose logs 取,转告用户
```

其余变量说明见 `services/sync-server/.env.example`。

## 4. 首启

```bash
cd /opt/pomoflow/services/sync-server
docker compose -f docker-compose.yml -f deploy/docker-compose.prod.yml up -d
curl -s http://127.0.0.1:8080/healthz
```

## 5. 预建 owner 账号(抢在任何内测用户注册之前)

首个携带 `Bearer SYNC_TOKEN` 的注册请求且 users 表为空 → 账号 id 被
采纳为 `SYNC_USER_ID`(首账号采纳)。全程 loopback:

```bash
# ① 发验证码(邮箱换成 owner 邮箱;SMTP 未配时验证码打进日志)
curl -s -X POST http://127.0.0.1:8080/v1/auth/email/send-code \
  -H 'Content-Type: application/json' \
  -d '{"email":"<owner邮箱>","purpose":"register"}'
docker compose logs sync-server | grep -i code     # 取验证码
# ② 带 SYNC_TOKEN 邮箱注册(采纳生效)
curl -s -X POST http://127.0.0.1:8080/v1/auth/register-email \
  -H 'Content-Type: application/json' -H "Authorization: Bearer <SYNC_TOKEN>" \
  -d '{"email":"<owner邮箱>","code":"<验证码>","password":"<密码>"}'
```

> 字段权威:`services/sync-server/src/email_handlers.rs`
> (`SendCodeRequest` / `RegisterEmailRequest`)。

## 6. nginx

```bash
sudo apt install -y nginx
sudo cp /opt/pomoflow/services/sync-server/deploy/nginx-pomoflow.conf \
  /etc/nginx/sites-available/pomoflow
sudo ln -sf /etc/nginx/sites-available/pomoflow /etc/nginx/sites-enabled/pomoflow
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

## 7. 安全组(腾讯云控制台)

| 端口 | 规则 |
|------|------|
| 80 | 对公网开放(HTTP 入口) |
| 22 | 限自家出口 IP |
| 8080 / 5432 | **不加规则**(公网不通;容器侧已绑 127.0.0.1 双保险) |

## 8. 备份 cron

```bash
crontab -e
# 每日 04:00;滚动保留 14 天;恢复演练命令见脚本头注释
0 4 * * * /opt/pomoflow/services/sync-server/deploy/backup.sh >> /opt/pomoflow/data/backups/backup.log 2>&1
```

## 9. 首版安装包

```bash
# Windows 本地构建产物(GitHub release 或本地 tauri build)+ 移动端 APK
scp PomoFlow_0.2.0_x64-setup.exe PomoFlow_0.2.0_amd64.deb \
    PomoFlow_0.2.0_aarch64.dmg user@<IP>:/tmp/artifacts/
# 移动端 managed APK 构建:apps/mobile/docs/RELEASE.md
scp PomoFlow_0.2.0-android.apk user@<IP>:/tmp/artifacts/

# 服务器上发布(命名约定见脚本头注释)
cd /opt/pomoflow/services/sync-server/deploy
./first-release.sh 0.2.0 /tmp/artifacts
curl -s http://127.0.0.1:8080/api/public/releases/latest | head
```

## 冒烟清单(验证矩阵 V7)

```bash
# 公网侧(本机浏览器/curl <IP>)
curl http://<IP>/healthz                       # ok
curl http://<IP>/                              # 官网 HTML
curl http://<IP>/api/public/releases           # 版本列表
curl -s -o /dev/null -w '%{http_code}' http://<IP>/internal/users   # 404
# 端口不通:
nc -zv <IP> 8080; nc -zv <IP> 5432             # 都应失败
# 服务器回环侧:JWT push/pull roundtrip(装 managed 包实登即测,V8)
```

## 数据迁移(VM → 生产)

1. owner 各设备先装「烘焙 VM 地址」的 managed 构建对 VM 同步 —— 验证
   机制本身(旧地址残留被覆盖、首次同步全量重推/重拉,数据与迁移前一致)
2. 再装「烘焙生产地址」的构建 → 登录预建 owner 账号 → 首次同步触发
   亲和复位,自动完成迁移
3. 老测试设备不升级就连 VM,两环境 LWW 独立互不影响

## 内测用户接入

- **仅发移动端 managed APK**(桌面内测期不支持第二账号 —— 归属守卫,已知产品边界)
- 用户注册邮箱后,owner 从 `docker compose logs` 取验证码转告(SMTP 未配)
- 桌面暂不对内测开放;admin-bff 上云后走后台管理

## 后续触发器

有域名 → certbot TLS(nginx 配置骨架已备)→ GitHub secret 换 https
→ 配 SMTP 开自助注册 → admin-bff 上云(另批)。
