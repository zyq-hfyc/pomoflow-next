# PomoFlow 腾讯云部署 Runbook(手工敲命令版)

> 适用:公网 IP `119.29.172.134`,域名先用 `119.29.172.134.nip.io` 过渡,
> 买了正式域名后只需改 Caddyfile 一行(见 §6.3)。
> 写作日期:2026-11-23。本文是**操作手册**,每个代码块都可直接 SSH 进服务器后
> 原样粘贴执行;标 ⚠️ 的地方停下来看清再敲,标 🔖 的值要**当场抄进密码管理器**。

## 架构(部署完成后的样子)

```
互联网 ──HTTPS:443──> Caddy ──HTTP:8080(本机回环)──> sync-server ──> PostgreSQL:5432(本机回环)
                              │
                              └── 静态安装包卷 /opt/pomoflow/release-files(更新分发)
```

安全组只开 22 / 80 / 443;8080 和 5432 **永远不暴露公网**。

---

## 0. 开始之前

### 0.1 腾讯云控制台:配置安全组(网页操作,不是命令)

控制台 → 轻量应用服务器/CVM → 防火墙(安全组)→ 添加规则:

| 端口 | 协议 | 来源 | 用途 |
|------|------|------|------|
| 22 | TCP | 先 0.0.0.0/0(部署完可收紧到你的常用 IP) | SSH |
| 80 | TCP | 0.0.0.0/0 | HTTP→HTTPS 跳转 + 证书签发验证 |
| 443 | TCP | 0.0.0.0/0 | HTTPS 业务入口 |

**不要开** 5432(PG)、8080(sync-server)—— 它们只接受本机连接。

### 0.2 SSH 登录

在你自己的电脑上:

```bash
ssh root@119.29.172.134
# 或 ubuntu@119.29.172.134(轻量服务器默认用户名常为 ubuntu)
```

下文所有命令默认你已登录服务器、以 root 操作;若用 ubuntu 用户,在需要权限的命令前加 `sudo`。

### 0.3 确认系统(首次必做)

```bash
cat /etc/os-release
free -h          # 看内存多大,决定 §1.2 的 swap 要不要做
```

本 runbook 以 **Ubuntu 22.04 / 24.04** 为准(Debian 同样适用)。
内存 **2G 及以下**必须做 §1.2 的 swap,否则后面编译 Rust 会因内存不足被杀。

---

## 1. 基础环境

### 1.1 系统更新 + 基础工具

```bash
apt update && apt upgrade -y
apt install -y curl git build-essential pkg-config libssl-dev uuid-runtime
```

### 1.2 加 2G swap(内存 ≤2G 才做;4G 以上跳过本节)

```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab    # 重启后仍生效
free -h                                            # Swap 一行应显示 2.0Gi
```

### 1.3 安装 Rust 工具链

```bash
curl https://sh.rustup.rs -sSf | sh -s -- -y --default-toolchain stable
source "$HOME/.cargo/env"
rustc --version    # 应输出 1.8x 以上
```

---

## 2. PostgreSQL

### 2.1 安装并启动

```bash
apt install -y postgresql
systemctl enable --now postgresql
ss -lntp | grep 5432     # 确认只监听 127.0.0.1:5432 —— 是则安全,若显示 0.0.0.0 立即停下排查
```

### 2.2 建专用账号和数据库

先想一个**数据库密码**(或让机器生成一个):

```bash
openssl rand -hex 24
```

🔖 **把输出的值抄进密码管理器,标记为「PG 密码」**。然后进 psql:

```bash
sudo -u postgres psql
```

在 psql 里执行(把 `<PG密码>` 换成刚才抄下的值):

```sql
CREATE USER pomoflow WITH PASSWORD '<PG密码>';
CREATE DATABASE pomoflow OWNER pomoflow;
\q
```

> 数据库表结构**不需要手动初始化** —— sync-server 启动时会自动执行
> 幂等的 `schema.sql`(全部 `CREATE TABLE/INDEX IF NOT EXISTS`,见
> `services/sync-server/src/main.rs` 启动段)。

---

## 3. 拿到源码并构建 sync-server

`sync-server` 依赖同仓库的 `crates/core`(workspace path 依赖),所以要上传
的不是单个目录,而是最小 workspace 子集。二选一:

### 3.1 方式 A:服务器直接 git clone(仓库为 public 时最省事)

```bash
cd /opt
git clone https://github.com/zyq-hfyc/pomoflow-next.git
cd pomoflow-next
```

### 3.2 方式 B:本地打包上传(私有仓库时)

**在你自己的电脑上**(Git Bash):

```bash
cd /d/study/ai_coding/myproject/pomoflow-next
tar czf /tmp/pomoflow-src.tgz \
  Cargo.toml Cargo.lock rust-toolchain.toml \
  crates/core services/sync-server
scp /tmp/pomoflow-src.tgz root@119.29.172.134:/opt/
```

**回到服务器**:

```bash
cd /opt && tar xzf pomoflow-src.tgz -C pomoflow-src --one-top-level 2>/dev/null || \
  (mkdir -p pomoflow-src && tar xzf pomoflow-src.tgz -C pomoflow-src)
cd pomoflow-src
```

### 3.3 编译(约 3~8 分钟,有 swap 就不怕)

```bash
cargo build --release -p sync-server --locked
cp target/release/sync-server /opt/sync-server-bin    # 先放到 /opt,后面搬进正式目录
```

🔖 无需抄写;记好产物路径 `/opt/sync-server-bin`。

---

## 4. 正式目录 + 秘密清单 + 环境文件

### 4.1 建目录和专用运行用户

```bash
useradd --system --home /opt/pomoflow --shell /usr/sbin/nologin pomoflow
mkdir -p /opt/pomoflow/bin /opt/pomoflow/release-files /opt/pomoflow/backups
mv /opt/sync-server-bin /opt/pomoflow/bin/sync-server
chown -R pomoflow:pomoflow /opt/pomoflow
chmod 750 /opt/pomoflow/bin/sync-server
```

### 4.2 生成 5 个秘密值(逐条跑,逐条 🔖 抄进密码管理器)

```bash
openssl rand -hex 32   # 🔖 1. SYNC_TOKEN(数据同步令牌)
openssl rand -hex 32   # 🔖 2. JWT_SECRET(登录会话签名)
openssl rand -hex 32   # 🔖 3. CODE_PEPPER(邮箱验证码 HMAC)
openssl rand -hex 32   # 🔖 4. INTERNAL_SERVICE_TOKEN(管理面令牌,之后还要填进 GitHub)
uuidgen                # 🔖 5. SYNC_USER_ID(同步体系用户 UUID)
```

### 4.3 写环境文件

```bash
nano /opt/pomoflow/pomoflow.env
```

粘贴以下内容并把 5 个 `<...>` 换成 4.2 抄下的值(`SYNC_USER_ID` 用 uuidgen 的输出):

```ini
# === 必填 ===
DATABASE_URL=postgres://pomoflow:<PG密码>@127.0.0.1:5432/pomoflow
SYNC_TOKEN=<1. SYNC_TOKEN>
SYNC_USER_ID=<5. SYNC_USER_ID>
JWT_SECRET=<2. JWT_SECRET>
CODE_PEPPER=<3. CODE_PEPPER>
INTERNAL_SERVICE_TOKEN=<4. INTERNAL_SERVICE_TOKEN>
RELEASE_FILES_DIR=/opt/pomoflow/release-files

# === 可调(默认即可)===
PORT=8080
MAX_RELEASE_UPLOAD_BYTES=536870912
```

> - **SMTP_\* 本次不配**:验证码邮件会退化为「只打日志」(LogSender),
>   邮箱注册/找回密码暂不可用,密码登录不受影响。要开通时加
>   `SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS/SMTP_FROM` 五个变量(QQ 邮箱
>   SMTP 授权码即可),加完 `systemctl restart sync-server`。
> - 端口/上传上限等默认值见 `services/sync-server/src/main.rs:44-91`。

保存后收紧权限:

```bash
chown pomoflow:pomoflow /opt/pomoflow/pomoflow.env
chmod 600 /opt/pomoflow/pomoflow.env
```

---

## 5. systemd 常驻服务

```bash
nano /etc/systemd/system/sync-server.service
```

粘贴:

```ini
[Unit]
Description=PomoFlow sync-server
After=network.target postgresql.service

[Service]
User=pomoflow
Group=pomoflow
EnvironmentFile=/opt/pomoflow/pomoflow.env
ExecStart=/opt/pomoflow/bin/sync-server
Restart=always
RestartSec=3
# 加固:只允许写 release-files 与 backups
NoNewPrivileges=true
ProtectSystem=strict
ReadWritePaths=/opt/pomoflow/release-files /opt/pomoflow/backups

[Install]
WantedBy=multi-user.target
```

启动并设开机自启:

```bash
systemctl daemon-reload
systemctl enable --now sync-server
systemctl status sync-server --no-pager     # 应为 active (running)
journalctl -u sync-server -n 20 --no-pager  # 应看到 "listening on 0.0.0.0:8080 ... internal=on release=on"
```

⚠️ 若启动失败:`journalctl -u sync-server -e` 看最后一行报错。常见:
`DATABASE_URL` 密码打错(连接失败)、env 文件漏项(必需变量缺失会 fail-fast)。

本机冒烟:

```bash
curl -sS http://127.0.0.1:8080/api/public/releases    # 应返回 [] (空列表 JSON)
```

---

## 6. Caddy(HTTPS 反代,nip.io 过渡域名)

### 6.1 安装

```bash
apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  | tee /etc/apt/sources.list.d/caddy-stable.list
apt update && apt install -y caddy
```

### 6.2 配置反代

```bash
nano /etc/caddy/Caddyfile
```

**清空示例内容**,只保留:

```caddyfile
119.29.172.134.nip.io {
	reverse_proxy 127.0.0.1:8080
}
```

```bash
systemctl reload caddy
journalctl -u caddy -n 20 --no-pager   # 应看到 certificate obtained successfully 字样
```

Caddy 会自动向 Let's Encrypt 申请证书(HTTP-01 验证走安全组的 80 端口)并自动续期。

⚠️ **nip.io 已知风险**:Let's Encrypt 对 `nip.io` 下所有子域共享每周签发配额,
全世界的用户一起用,可能撞限。撞限表现:`journalctl -u caddy` 里 certificate
obtained 失败,重试即可(每天配额刷新);或把域名临时换成
`119.29.172.134.sslip.io`(同类服务,配额独立)。**尽早买正式域名是一劳永逸的解。**

### 6.3 以后买了正式域名(提前记录,到时候只改这里)

腾讯云买好域名并完成备案后,把解析 A 记录指向 119.29.172.134,然后:

```bash
nano /etc/caddy/Caddyfile    # 把第一行换成你的域名,如 pomoflow.example.cn
systemctl reload caddy       # 新证书自动签发
```

同时把 GitHub secret `POMOFLOW_PROD_SERVER_URL` 换成 `https://新域名`。

### 6.4 外部冒烟

在你**自己的电脑**上:

```bash
curl -sS https://119.29.172.134.nip.io/api/public/releases
# 应返回 [] 且无证书告警 —— HTTPS 链路全通
```

---

## 7. 管理面连通性验证(带令牌)

在服务器上(把 `<管理面令牌>` 换成 §4.2 的第 4 项):

```bash
curl -sS -H "Authorization: Bearer <管理面令牌>" \
  http://127.0.0.1:8080/internal/releases
# 应返回 {"items":[]} —— 鉴权与数据库读写全通
```

不带令牌应被拒(对照验证):

```bash
curl -sS http://127.0.0.1:8080/internal/releases
# 应返回 403
```

---

## 8. PostgreSQL 每日备份

```bash
nano /opt/pomoflow/backup.sh
```

粘贴:

```bash
#!/bin/bash
# PomoFlow PG 每日备份:保留 7 天
set -euo pipefail
OUT=/opt/pomoflow/backups/pomoflow-$(date +%F).sql.gz
sudo -u postgres pg_dump pomoflow | gzip > "$OUT"
find /opt/pomoflow/backups -name 'pomoflow-*.sql.gz' -mtime +7 -delete
```

```bash
chmod 700 /opt/pomoflow/backup.sh
nano /etc/cron.d/pomoflow-backup
```

粘贴(每天 03:17 执行,输出进日志):

```cron
17 3 * * * root /opt/pomoflow/backup.sh >> /var/log/pomoflow-backup.log 2>&1
```

手动验证一次:

```bash
/opt/pomoflow/backup.sh && ls -lh /opt/pomoflow/backups/
# 应出现 pomoflow-2026-11-23.sql.gz 之类,几百 KB 级
```

恢复方法(登记备查,勿执行):

```bash
gunzip < /opt/pomoflow/backups/pomoflow-YYYY-MM-DD.sql.gz | sudo -u postgres psql pomoflow
```

---

## 9. 部署完成后:GitHub Secrets 收尾(网页操作)

仓库 Settings → Secrets and variables → Actions,确认/更新三项:

| Secret | 值 | 来源 |
|--------|-----|------|
| `POMOFLOW_PROD_SERVER_URL` | `https://119.29.172.134.nip.io` | 本次部署(买了域名后换成正式域名) |
| `TAURI_SIGNING_PRIVATE_KEY` | `pomoflow.key` 文件的**全部文本** | `C:\Users\yongc\.tauri\pomoflow.key`(密码为空,无需 PASSWORD 项) |
| `INTERNAL_SERVICE_TOKEN` | §4.2 第 4 项的值 | 与服务器 `pomoflow.env` 里完全一致 |

全部就绪后的发布链路:打 `v*` tag → CI 三平台构建签名 → GitHub Release 草稿
+ **自动入库本服务器(draft)** → 你在管理面 publish → 存量客户端应用内收到更新。

---

## 10. 日常运维速查

```bash
# 看服务状态 / 日志
systemctl status sync-server
journalctl -u sync-server -f          # 实时日志(Ctrl+C 退出)

# 发布新版本 sync-server 时:重跑 §3.3 编译,然后
systemctl restart sync-server

# 改环境变量后
nano /opt/pomoflow/pomoflow.env && systemctl restart sync-server

# 磁盘检查(安装包会占空间)
du -sh /opt/pomoflow/release-files /opt/pomoflow/backups
```

### 故障排查速查表

| 症状 | 首查 |
|------|------|
| `systemctl start sync-server` 失败 | `journalctl -u sync-server -e`:必需 env 缺失 / DATABASE_URL 密码错 |
| Caddy 签证书失败 | 安全组 80 是否开放;nip.io 配额(换 sslip.io 试) |
| 外部 curl 超时 | 安全组 443 未放行;Caddy 未起(`systemctl status caddy`) |
| CI 入库步骤 warn | GitHub secret `INTERNAL_SERVICE_TOKEN` 与服务器不一致 |
| 客户端连不上同步 | `curl https://.../api/public/releases` 是否通;受管版烘焙地址是否本机 |
