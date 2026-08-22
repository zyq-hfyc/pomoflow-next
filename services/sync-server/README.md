# PomoFlow Sync Service(P1a)

桌面端 ↔ 云端同步的**云端落地**:Push/Pull 两个端点,合并裁决复用
`pomoflow-core` 的 LWW(`revision → updated_at → device_id`,ADR-009),
与桌面端同一段代码、零漂移(ADR-005)。协议契约见
`pomoflow/docs/同步协议详细设计.md`。

## 端点

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/v1/sync/push` | 推送 pending 变更;逐条 LWW 裁决,`Accepted / Conflicted(附权威快照) / Dropped`;`change_id` 幂等 |
| POST | `/v1/sync/pull` | `SyncCursor{last_seq}` 游标增量拉取,排除请求方设备,分页 ≤500/批 |
| POST | `/v1/auth/register` | 注册(需 `JWT_SECRET`;首账号可采纳存量数据,见下文账号体系) |
| POST | `/v1/auth/login` | 登录 → access(JWT,15 分钟)+ refresh(30 天,轮换制) |
| POST | `/v1/auth/refresh` | 刷新:旧 refresh 吊销 + 新一对签发 |
| POST | `/v1/auth/logout` | 吊销指定 refresh token(幂等) |
| POST | `/v1/auth/change-password` | 改密码:验旧密码 → 全端踢出 → 给当前设备新令牌对 |
| POST | `/v1/auth/sessions` | 会话列表(refresh 认证;`current` 标记调用方) |
| POST | `/v1/auth/sessions/revoke` | 踢出指定会话(不能踢当前) |
| POST | `/v1/auth/sessions/revoke-others` | 退出其他所有设备(保留当前) |
| GET | `/healthz` | 存活探针(含 DB 连通) |

认证:HTTP `Authorization: Bearer <token>`,两种 token 都认(ADR-007):
- **JWT**(账号模式,设置 `JWT_SECRET` 启用):token 由 login 签发,负载即用户身份;
- **静态 `SYNC_TOKEN`**(P1a 兼容回落):token → `SYNC_USER_ID` 固定映射。

服务端强制请求体 `user_id` 与 token 身份一致,不符即 403(多租户第一道闸)。

## 设计说明(P1a 简化)

设计文档 §8 原写"PG 表 = 本地 schema 同构";实现取**通用快照表 + changelog**:

- `snapshots(user_id, entity, entity_id, revision, updated_ms, device_id, payload JSONB)`
- `changelog(seq BIGSERIAL, user_id, change_id UNIQUE, device_id, change JSONB)`

理由:合并只依赖 Change 元信息,payload 对服务端不透明;镜像 10 张实体表在
当前阶段只增加维护成本(每加字段两端改)。**当 P1b/P4 需要 admin 查询、
Analytics 按字段统计时,再从快照展开实体表**(数据已在 JSONB 里,可回填)。
此偏差待后续以 ADR 固化。

---

## 部署指南(VMware Ubuntu,每步含命令说明)

> 目标拓扑:
>
> ```text
> Windows 宿主机                         Ubuntu VM(VMware)
> ┌─────────────────┐   局域网 HTTP    ┌──────────────────────────────┐
> │ PomoFlow 桌面端  │ ───────────────▶ │ docker compose               │
> │ (设置→数据同步)  │   :8080          │  ├─ postgres:16(数据卷持久) │
> └─────────────────┘                  │  └─ sync-server(axum 服务)  │
>                                      └──────────────────────────────┘
> ```
>
> 全程约 10-15 分钟(预编译路径:时间主要花在上传部署包和拉 postgres 镜像)。

### 服务器环境要求(部署前先核对,避免装到一半把小盘 VM 搞挂)

| 项目 | 最低要求 | 推荐 | 依据 / 说明 |
|------|----------|------|-------------|
| CPU | 1 vCPU | 2 vCPU | sync-server 运行时是单进程异步 IO,很轻 |
| 内存 | 1 GB(纯命令行服务器) | 2-4 GB | ⚠️ Ubuntu **桌面版**的 GNOME 图形环境自身就吃 1-2G;VM 只给 2G 又装桌面版会很卡 |
| 磁盘(系统盘**可用**空间) | **10 GB**(走预编译路径) | 20 GB+ | ⚠️ 若走"服务器端构建"路径需 **≥30 GB 可用**:Rust 构建缓存+镜像层实测占 10-20G。**2026-08-22 事故:40G 整盘被构建缓存塞满,GDM 无法启动,只能停机扩盘修复** |
| 软件 | Docker Engine ≥ 20.10(含 compose 插件) | 同左 | 安装方法见步骤 1 |
| 网络 | 能拉取 `postgres:16-alpine`、`debian:bookworm-slim` | 同左 | 国内需先配镜像加速器(步骤 1.5);预编译路径**不需要**拉 Rust 镜像 |

### 部署方式二选一(默认且推荐 A)

| 方式 | 服务器上要做的 | 服务器磁盘需求 | 首次启动耗时 | 适用场景 |
|------|----------------|----------------|--------------|----------|
| **A. 本地编译,上传即部署(默认)** | `COPY` 一个静态二进制,秒级 | 可用 ≥10 GB | <1 分钟 | 日常迭代、小盘 VM、后续腾讯云 |
| B. 服务器端源码构建(兜底) | 下载 Rust 工具链并编译全部依赖 | 可用 ≥30 GB | 5-15 分钟,且留下 10-20G 缓存 | 本地实在无法交叉编译时才用 |

- 方式 A:按本指南步骤 2 在 Windows 上产出二进制和部署包,服务器 `docker compose up -d --build`。
- 方式 B 命令:`docker compose -f docker-compose.build.yml up -d --build`(其余步骤两方式完全相同)。

### 步骤 0:准备 VM 网络(桥接,拿局域网 IP)

VMware 虚拟机设置 → 网络适配器 → 选 **桥接模式(Bridged)**。
作用:让 VM 直接出现在家庭/办公局域网里,拥有自己的 192.168.x.x 地址,
Windows 宿主机上的 PomoFlow 才能直连它(NAT 模式外面进不来)。

```bash
# 查看虚拟机的局域网 IP(找形如 192.168.x.x 的条目,通常在 ens33/enp0s3 网卡下)
ip addr
```

记下这个 IP,后文用 `<VM的IP>` 代替。**桌面端填的服务器地址就是它**。

```bash
# 放行 8080 端口的入站防火墙(如果系统启用了 ufw;没启用会提示 skip,无害)
# --permanent 让规则重启后仍生效
sudo ufw allow 8080/tcp
```

### 步骤 1:安装 Docker

```bash
# 官方一键脚本:自动识别 Ubuntu 版本,安装 docker 引擎 + docker compose 插件
curl -fsSL https://get.docker.com | sudo sh
```

```bash
# 把当前用户加入 docker 组 —— 以后执行 docker 命令不再需要加 sudo
sudo usermod -aG docker $USER
```

```bash
# 让上面的组变更在当前终端立即生效(否则要退出 SSH 重新登录才生效;
# 注意:只对当前这个终端有效,新开的终端需重新登录过一次)
newgrp docker
```

```bash
# 验证安装:不带 sudo 能打印版本号即成功
docker --version
```

### 步骤 1.5:配置国内镜像加速器(国内网络必做)

Docker 默认从 docker.io 拉镜像,国内直连会被拒(`connection refused`)。
写入加速器配置后所有镜像(postgres / rust / debian)都走国内源:

```bash
# 创建 docker 配置目录(-p 表示已存在也不报错)
sudo mkdir -p /etc/docker

# 写入 daemon.json:registry-mirrors 是"拉镜像时优先走的国内中转站"列表,
# Docker 会按顺序尝试。tee 命令把单引号里的内容原样写进文件。
sudo tee /etc/docker/daemon.json <<'EOF'
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://docker.1panel.live"
  ]
}
EOF
```

```bash
# 重启 docker 守护进程,让配置生效
sudo systemctl restart docker
```

```bash
# 单独拉一次 postgres 镜像验证加速器可用(能下载就是通了)
docker pull postgres:16-alpine
```

> 若两个加速器都失效(国内镜像站时效性强):登录阿里云控制台
> `cr.console.aliyun.com → 镜像工具 → 镜像加速器`,拿到专属地址
> `https://<你的id>.mirror.aliyuncs.com` 替换进 daemon.json 再重启。

### 步骤 2:Windows 本地编译 + 打部署包(方式 A 核心,一次性配置约 10 分钟)

**2a. 一次性环境准备**(每台开发机只做一次,三条命令逐条执行):

```bash
# 安装 cargo-zigbuild:交叉编译驱动,用 zig 充当 Linux 链接器,
# 让 Windows 能直接产出 Linux 可执行文件(编译约 2-5 分钟,只装一次)
cargo install cargo-zigbuild --locked
```

```bash
# 安装 zig 工具链(pip 版,免手动下载配置;约 50MB)
python -m pip install ziglang
```

```bash
# 给 rustup 添加 musl 目标(静态链接的 Linux 目标,产物不依赖服务器任何库)
rustup target add x86_64-unknown-linux-musl
```

**2b. 每次发布前编译 + 打包**(改过代码就重跑,首次约 5 分钟,之后增量更快):

```bash
# 交叉编译 sync-server → services/sync-server/bin/sync-server
# (musl 静态链接,任意 x86_64 Linux 可直接运行;脚本会自动校验前置工具)
bash services/sync-server/build-local.sh
```

```bash
# 打部署包 → artifacts/pomoflow-sync-deploy-<日期>.tar.gz(约 15-20M,内含二进制)
# 脚本检测到 bin/sync-server 才走"免编译"路径;没有会打警告
bash services/sync-server/pack-deploy.sh
```

### 步骤 2.5:上传部署包到 VM

三种方式任选:

**方式 A:scp(在 Windows 的 Git Bash / PowerShell 里执行)**

```bash
# scp = 跨机器安全拷贝。把部署包传到 VM 的 /opt 目录
# 把 用户名 换成 VM 的登录用户(如 ubuntu/root),<VM的IP> 换成步骤 0 查到的 IP,
# <日期> 换成步骤 2b 打包输出里的实际日期
scp artifacts/pomoflow-sync-deploy-<日期>.tar.gz 用户名@<VM的IP>:/opt/
```

**方式 B:WinSCP / FileZilla**(图形界面拖拽,主机填 VM 的 IP、端口 22、SFTP 协议)

**方式 C:VMware 共享文件夹**(虚拟机设置 → 选项 → 共享文件夹,把存放部署包的目录共享进去)

### 步骤 3:解压部署包(VM 上执行)

```bash
# 进入上传目录
cd /opt

# 解压:会生成 pomoflow-next/ 目录(源码 + 预编译二进制 + docker 物料)
# 二进制位置:pomoflow-next/services/sync-server/bin/sync-server,compose 会自动 COPY 它
tar -xzf pomoflow-sync-deploy-<日期>.tar.gz

# 进入服务的部署目录(compose 文件所在处,后续命令都在这里执行)
cd pomoflow-next/services/sync-server
```

### 步骤 4:配置 .env(★ 关键步骤,决定能不能连上)

```bash
# 复制示例配置为正式配置(.env 被 compose 自动读取;.env 不入库,防止泄露密钥)
cp .env.example .env

# 用 nano 编辑(编辑完 Ctrl+O 保存、Ctrl+X 退出;vim 党随意)
nano .env
```

`.env` 里三个字段的作用:

| 字段 | 作用 | 怎么填 |
|------|------|--------|
| `POSTGRES_PASSWORD` | 数据库密码 | 随便改一个(仅容器内网通信用) |
| `SYNC_USER_ID` | **同步账号的身份 UUID**。服务端只认这一个用户;桌面端请求里的 user_id 与它不一致会直接 403 | **必须**填桌面端「设置 → 数据同步 → 用户 ID」复制过来的值(见下方操作顺序) |
| `SYNC_TOKEN` | 访问令牌,相当于密码 | 自己编一串强随机值(如 `openssl rand -hex 16` 生成),**桌面端要填同一个** |

> ⚠️ **操作顺序陷阱**:先在 Windows 桌面端「设置 → 数据同步」里复制「用户 ID」,
> 再回来填 `SYNC_USER_ID`。如果服务端先用了别的 UUID,桌面端会一直 403;
> 补救 = 改 .env 里这个值后重启(见步骤 8)。

生成强随机 token 可用:

```bash
# openssl rand -hex 16:生成 32 个十六进制字符的随机串,复制输出填进 SYNC_TOKEN
openssl rand -hex 16
```

### 步骤 5:启动服务

```bash
# 一键构建并启动:
#   --build  按 Dockerfile.prebuilt 构建服务镜像 —— 只是 COPY 部署包里自带的
#            静态二进制,秒级完成;不下载 Rust 工具链、不产生构建缓存(省 10-20G 磁盘)
#   -d       detached,后台运行,不占着终端
#   compose 会自动:①起 postgres(首次初始化时执行 schema.sql 建表)
#                 ②等 postgres 健康检查通过 ③起 sync-server 并连库
docker compose up -d --build
```

```bash
# 查看两个容器的运行状态(STATE 都应是 Up;postgres 显示 healthy)
docker compose ps
```

### 步骤 6:验证服务

```bash
# 健康检查:应返回 {"ok":true,...}(含数据库连通性;ok=false 说明连库失败,看日志排查)
curl http://127.0.0.1:8080/healthz
```

```bash
# 模拟一次桌面端的 pull 请求(带认证):
#   -H "Authorization: Bearer xxx"  ← 把 xxx 换成 .env 里的 SYNC_TOKEN
#   -d 后的 JSON:user_id 换成 .env 里的 SYNC_USER_ID;since 从 0 开始拉全量
# 预期返回 {"changes":[],"next_cursor":{...}} —— 空列表说明服务正常(还没数据)
curl -H "Authorization: Bearer <SYNC_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"user_id":"<SYNC_USER_ID>","device_id":"probe","since":{"last_seq":0}}' \
     http://127.0.0.1:8080/v1/sync/pull
```

到这一步服务端全部就绪。再从 **Windows 浏览器**访问
`http://<VM的IP>:8080/healthz` 验证局域网连通(不通 → 回查步骤 0 桥接/防火墙)。

### 步骤 7:Windows 桌面端连接

1. 打开 PomoFlow → 设置 → **数据同步**
2. 服务器地址:`http://<VM的IP>:8080`
3. 访问令牌:.env 里的 `SYNC_TOKEN`(同一个值)
4. 保存配置 → 点**立即同步**
5. 预期显示:`完成:推送 N 条,拉取 0 条...` —— N 是你本机全部存量数据
   (任务/项目/标签/番茄记录/复盘/名言),首次同步即全量上云
6. 第二台设备(或另一数据目录的客户端)同样配置后点立即同步 → 两边数据一致 = 闭环达成

### 步骤 7.5:在服务器上核对数据真的上云了(推荐做一次)

桌面端提示"推送 N 条"只代表服务端接受了请求;想亲眼看到数据,两招任选:

**方法一:模拟第二台设备拉一次(顺带验证 pull 链路)**

```bash
# device_id 故意填 "probe":pull 会排除"请求方自己"的变更,
# probe 什么都没推过,所以能拉到桌面端推上来的全量
# <SYNC_TOKEN> / <SYNC_USER_ID> 换成 .env 里的值
curl -s -H "Authorization: Bearer <SYNC_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"user_id":"<SYNC_USER_ID>","device_id":"probe","since":{"last_seq":0}}' \
     http://127.0.0.1:8080/v1/sync/pull
```

```bash
# 只数条数:输出一个数字,应等于桌面端提示的"推送 N 条"的 N
curl -s -H "Authorization: Bearer <SYNC_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"user_id":"<SYNC_USER_ID>","device_id":"probe","since":{"last_seq":0}}' \
     http://127.0.0.1:8080/v1/sync/pull | grep -o '"change_id"' | wc -l
```

**方法二:直接查 PostgreSQL(最权威)**

```bash
# ① 变更流水:推送一条记一行,总数应正好等于"推送 N 条"的 N
docker compose exec postgres psql -U pomoflow -d pomoflow \
  -c "SELECT count(*) AS changelog_rows, max(seq) FROM changelog;"
```

```bash
# ② 权威快照按实体类型分组:看任务/项目/标签/番茄记录/复盘/名言各占多少
#    ⚠️ 快照行数可能 < N 属正常:同一实体多次修改会被 UPSERT 成一行(LWW 只留赢家),
#    changelog 流水才是逐条记录的 N
docker compose exec postgres psql -U pomoflow -d pomoflow \
  -c "SELECT entity, count(*) FROM snapshots GROUP BY entity ORDER BY count(*) DESC;"
```

```bash
# ③ 抽查内容:看前 160 字符,确认是自己的真实数据(标题/项目名等)
docker compose exec postgres psql -U pomoflow -d pomoflow \
  -c "SELECT entity, left(change::text,160) FROM changelog ORDER BY seq LIMIT 2;"
```

### 步骤 8:日常运维命令

```bash
# 看服务实时日志(-f 跟随输出;Ctrl+C 退出查看)
docker compose logs -f sync-server

# 重启服务(改了 .env 后必须重启才生效)
docker compose up -d

# 停止全部容器(数据在 pgdata 卷里,不会丢)
docker compose down

# 更新到新版本部署包:Windows 重新 pack-deploy + 上传覆盖解压后,重新构建启动
docker compose up -d --build
```

### 常见故障排查

| 现象 | 原因 | 处置 |
|------|------|------|
| `permission denied ... docker.sock` | 当前用户不在 docker 组 | `sudo usermod -aG docker $USER && newgrp docker`(或命令前加 sudo) |
| 拉镜像 `connection refused` | 国内连不上 docker.io | 完成步骤 1.5 的加速器配置并重启 docker |
| `failed to load manifest for workspace member` | 部署包是旧版(修复前打的) | 重新上传 `artifacts/` 里最新的 tar.gz 重解压 |
| compose build 报 `bin/sync-server` COPY 失败 | 部署包没带预编译二进制(Windows 侧漏跑 `build-local.sh`) | Windows 补跑 `build-local.sh` + `pack-deploy.sh` 重传;或临时改用 `docker compose -f docker-compose.build.yml up -d --build`(需 ≥30G 可用磁盘) |
| 容器启动报 `exec /usr/local/bin/sync-server: ...: executable file not found` | Windows 打的 tar 丢失执行位(644),二进制 COPY 进镜像后不可执行 | **已根治**:Dockerfile.prebuilt 里有 `RUN chmod +x`,更新部署包重新 `docker compose up -d --build` 即可;旧包临时处置 = 服务器上 `chmod +x services/sync-server/bin/sync-server` 后重 build |
| 服务器磁盘 100% / GDM 起不来(黑屏卡 logo) | 走过服务器端构建路径,Rust 构建缓存+镜像层(10-20G)塞满磁盘 | TTY 登录(`Ctrl+Alt+F3`)→ `docker builder prune -f` 清缓存 → `df -h /` 确认;根治 = 改走方式 A(本地编译);磁盘不够就先扩容 |
| 桌面端同步报 **403** | 请求的 user_id ≠ 服务端 `SYNC_USER_ID` | 把桌面端「用户 ID」填进 .env 的 `SYNC_USER_ID`,`docker compose up -d` 重启 |
| 桌面端报网络错误/连不上 | VM 不是桥接 / 防火墙没放行 / IP 填错 | 回查步骤 0;Windows 浏览器测 `http://<VM的IP>:8080/healthz` |
| `healthz` 返回 `"ok":false` | 服务连不上数据库 | `docker compose logs sync-server` 看具体报错;`docker compose ps` 看 postgres 是否 healthy |
| 端口被占用(`port is already allocated`) | 8080 被别的进程占 | 改 compose 里 `ports: ["8080:8080"]` 冒号左边的宿主端口(如 8081),桌面端地址同步改 |

### 账号体系启用(可选,P1b;按步骤逐条执行)

> 默认不启用(纯静态 Token,与 P1a 行为一致)。启用后桌面端可"注册/登录账号",
> access token 15 分钟自动轮换,refresh 30 天且每次使用即作废(轮换制)。

**步骤 A:服务端配置密钥(VM 上执行)**

```bash
# ① 生成 64 字符强随机密钥:openssl 随机读 32 字节输出为十六进制
openssl rand -hex 32

# ② 把输出粘贴进 .env 末尾(JWT_SECRET=后面),编辑器中操作
nano /opt/pomoflow-next/services/sync-server/.env
```

```bash
# ③ 重启服务让配置生效(改 .env 必须重启;预编译路径秒级)
cd /opt/pomoflow-next/services/sync-server && docker compose up -d
```

```bash
# ④ 验证账号体系已启用:未带认证调 login,返回 401/400 而非 503 即说明端点在
curl -s -o /dev/null -w "%{http_code}\n" \
     -H "Content-Type: application/json" \
     -d '{"username":"probe","password":"probe-pass"}' \
     http://127.0.0.1:8080/v1/auth/login
```

**步骤 B:桌面端注册首账号(Windows 上执行)**

1. 先确保设置 → 数据同步里**服务器地址与静态令牌已保存**(注册请求要带
   静态令牌作为运维凭证 —— 服务端据此把**第一个账号的 user_id 直接设为
   SYNC_USER_ID**,你本机 98 条存量数据无缝并入该账号,无需任何数据迁移);
2. 账号区填用户名(3-32 位字母/数字/`_`/`-`)和密码(≥8 位)→ 点**注册**;
3. 显示"已登录"即成功;之后的同步自动用账号令牌,静态令牌仅作兜底保留。

**步骤 C:第二台设备** —— 同样填服务器地址,**直接用账号登录**(不要注册);
服务端校验账号 user_id 与本机数据归属一致后才放行(第一台采纳过的账号
= 同一个 SYNC_USER_ID,天然一致)。

**步骤 D(P1c,可选):改密码与设备管理** —— 登录后设置页会出现:

- 「修改密码」:验旧密码后**全部设备强制重新登录**(本机自动换取新令牌不掉线);
- 「设备管理」:列出所有登录中的设备(名称 = 平台·设备短码 + 登录时间),
  可单独踢出,或一键「退出其他设备」。

> ⚠️ 陷阱:第二台设备如果**没先在服务器保存过静态令牌**就点注册,会注册出
> 一个**全新 UUID 的第二账号**,与本机数据归属不一致 → 登录会被拒。记住:
> **账号只注册一次,其余设备一律登录。**
>
> ⚠️ `JWT_SECRET` 更换 = 所有已登录客户端立即失效(access 验不过、refresh
> 也解不开),需全部重新登录。密钥一旦启用务必进密码管理器保存。

### 升级顺序(⚠️ 新增实体类型后必读)

`EntityKind` 新增变体(如 `task_tag`)后,**先升级服务端、再升级桌面端**:

1. Windows 本地 `build-local.sh` 重编服务端二进制 → `pack-deploy.sh` → VM 上
   `docker compose up -d --build`(秒级);
2. 之后再更新桌面客户端。

原因:旧服务端二进制反序列化 PushRequest 时遇到不认识的实体名会拒绝整个请求
(桌面端同步直接报错),直到服务端升级为止。反向(新服务端 + 旧客户端)无害。

### 迁移到腾讯云(测试完成后)

代码不变,只换环境与安全等级:

1. **HTTPS**:安全组只放行 443,8080 不直接暴露;前置 nginx/caddy 做反代 + 证书
2. **PG 收内网**:删掉 compose 里 postgres 的 `ports: 127.0.0.1:5432` 映射(纯容器内网)
3. **密钥换强值**:`POSTGRES_PASSWORD` / `SYNC_TOKEN` 重新生成
4. **备份**:`pgdata` 卷配定期 `pg_dump` cron 到对象存储
5. 数据迁移:直接把 VM 的 `pgdata` 卷导出(`docker compose exec postgres pg_dump ...`)到云上导入,或从桌面端重新全量推送

### 本地开发(不用 Docker 跑 PG 的场景)

```bash
export DATABASE_URL=postgres://pomoflow:pomoflow-dev@127.0.0.1:5432/pomoflow  # 指向本地 PG
export SYNC_TOKEN=dev SYNC_USER_ID=<uuid>                                      # MVP 认证三元组
cargo run -p sync-server                                                       # 直接跑服务
```
