# 🏗 PomoFlow 架构设计文档(目标架构)

> **文档定位**:本文档定义 PomoFlow 从当前「单机桌面应用」演进到的**目标架构**——一个 **本地优先(Local-first)+ 多端 + 云端同步 + 微服务 + 内网管理后台** 的系统。作为后续架构实施与迭代的**基线(_baseline_)**。
>
> - **现状**:Python(FastAPI)+ React,PyInstaller 打包成单文件 exe,本地 SQLite,无账号、无同步(见 `README.md`)。
> - **目标**:桌面 + 移动多端,离线全功能,登录后按用户做多端数据同步,云端弹性可扩展的微服务,独立内网管理后台。
> - **本文不涵盖**:功能需求细节(见 `设计文档.md`)、数据库字段级 schema(见 `数据库文档.md` / `database-schema.md`)、接口契约(见 `接口文档.md`,目标架构的接口契约待后续补充)。

---

## 一、设计目标与核心原则

### 设计目标

1. **多端覆盖**:桌面(Win / macOS / Linux)+ 移动(iOS / 安卓 / 鸿蒙),用户可单端使用。
2. **本地优先**:每端本地都有 SQLite,数据的增删改查**全部在本地完成**,离线完全可用。
3. **按需云端同步**:仅在用户登录、且有多端同步诉求时,本地数据按用户身份定期同步到云端;云端微服务弹性可扩展。
4. **内网管理后台**(不对用户开放):对接云端数据,做统计分析与会员权限管理。

### 核心原则(驱动选型的硬约束)

| 原则 | 含义 |
|------|------|
| **Local-first** | 网络是可选增强,不是可用性前提。本地 SQLite 是真相源之一。 |
| **性能 / 安全优先** | 关键路径用编译型、内存安全语言。 |
| **按领域选最优语言** | 不强求全栈统一,每个服务/端用它领域最强的语言。 |
| **AI 实施编码** | 人定目标、把控方向,AI 写代码。**不考虑招人难度与团队技术栈**——这释放了多语言红利。 |
| **关键逻辑单点定义** | 同步合并等易错逻辑,桌面与云端共享同一份代码,杜绝两端漂移。 |

---

## 二、架构总览

```
┌─────────────────┐   ┌──────────────────────┐   ┌─────────────────┐
│ 移动端 (Dart)    │   │ 桌面端 (Tauri + Rust)  │   │ 管理后台 (内网)   │
│ Flutter + Drift  │   │  ┌────────────────┐   │   │ React + AntD Pro │
│ iOS/安卓/鸿蒙    │   │  │ pomoflow_core  │◄──┼───┼─ (只读/管理)      │
│ 本地 SQLite      │   │  │ (Rust 共享crate)│   │   └────────┬────────┘
└────────┬─────────┘   │  └────────────────┘   │            │
         │              │  rusqlite 本地库       │            │ REST
         │              └──────────┬────────────┘            │
         │   HTTPS + JWT          │  HTTPS + JWT             │
         ▼                        ▼                          ▼
┌────────────────────────────────────────────────────────────────────┐
│                  云端微服务层 (按领域选语言 · 弹性扩缩)                 │
│                                                                     │
│  Gateway(APISIX) ──► Auth(Rust) ──► ┌────────────────────┐         │
│                                      │ Sync Service (Rust)│         │
│                                      │ pomoflow_core ◄────┼── 共享! │
│                                      └────────────────────┘         │
│  User / Membership / Notification (Go)   Analytics (Python)         │
│  Admin BFF (Go)                                                     │
│  服务间:gRPC(内部) · REST(对外) · NATS(事件)                          │
└─────────┬──────────────────────────────────┬─────────────────────────┘
          ▼                                  ▼
   PostgreSQL + Redis + 对象存储        NATS(事件总线)
```

---

## 三、技术选型总表

| 层 | 技术 | 语言 | 选型理由 |
|----|------|------|----------|
| 移动端 UI + 本地逻辑 | Flutter + Drift | Dart | iOS/安卓/**鸿蒙全覆盖**(鸿蒙官方支持) |
| 桌面端 UI 渲染层 | Svelte 5(或 React)+ TypeScript | TS | 薄展示层,运行时小、性能好 |
| 桌面端业务后端 | Tauri 2 + Rust | Rust | 性能/安全/跨三端体验一致 |
| 桌面本地库 | rusqlite / sqlx | Rust | 原生绑定,极快,不绕 IPC |
| **核心共享 crate** | **pomoflow-rs(Cargo workspace)** | **Rust** | 桌面 + 云端 Sync 共享域逻辑 |
| 云端 Sync / Auth Service | axum + tokio + sqlx | Rust | 高并发 + 低延迟 + 内存安全,与桌面共享 crate |
| 云端 User / Membership / Notification | gin / echo | Go | CRUD + 事件消费,简单高效 |
| 云端 Analytics Service | FastAPI + pandas / Polars | Python | 数据统计 / 建模 / 未来 ML 的主场 |
| 云端 Admin BFF | gin | Go | 给管理后台聚合 API |
| API 网关 | APISIX(现成) | Lua / Go | 不重复造轮子 |
| 云端主库 | PostgreSQL | — | 关系型 + JSONB + 逻辑复制 |
| 缓存 / 会话 / 分布式锁 | Redis | — | 同步去重、限流、Token 黑名单 |
| 事件总线 | NATS(Kafka 备选) | — | 服务解耦、异步通知、削峰 |
| 对象存储 | S3 / OSS | — | 备份、导入导出文件 |
| 认证 | JWT(Access)+ Refresh Token | — | 多端会话,Refresh 可吊销 |
| 管理后台前端 | React + Ant Design Pro | TypeScript | 组件全,后台开箱即用 |
| 部署 | Docker + Kubernetes + Helm | — | 弹性扩缩、滚动发布、自愈 |

---

## 四、客户端层

### 4.1 移动端:Flutter + Dart

```
Flutter (Dart)
├── UI 层(Widgets)
├── 业务逻辑层(Dart)
├── 本地数据层:Drift(类型安全 ORM)→ SQLite
└── 同步引擎(Dart 实现,按协议对接云端)
```

- **覆盖 iOS / 安卓 / 鸿蒙**:鸿蒙由华为官方维护 Flutter 分支,成熟度最高。
- **端内语言统一 Dart**:UI 与本地数据层(Drift)同语言。
- **同步客户端用 Dart 独立实现**:协议由 Rust `core` crate 定义并导出 schema(OpenAPI / Protobuf),移动端按 schema 对齐,保证与云端语义一致。

### 4.2 桌面端:Tauri 2 + Rust + Web UI

```
┌─────────────────────────────────────────┐
│  Web UI 渲染层 (Svelte 5 / React + TS)    │  薄展示层,经 Tauri IPC 调后端
├─────────────────────────────────────────┤
│  Rust 后端业务层 (Tauri 主进程)            │
│   ├─ pomoflow_core(共享 crate,见五)      │
│   ├─ rusqlite 本地 SQLite 访问             │  原生绑定,极快
│   ├─ 同步引擎(pull / push / 冲突合并)      │
│   └─ 系统能力(托盘 / 通知 / 自启动)        │
├─────────────────────────────────────────┤
│  本地 SQLite(离线全功能)                  │
└─────────────────────────────────────────┘
```

- **业务逻辑、数据访问、同步合并全部在 Rust**;Web UI 仅负责展示与交互。
- **本地 SQLite 用 `rusqlite`(同步 API,简单)或 `sqlx`(异步 + 编译期 SQL 检查)**——原生绑定,性能远超任何 JS/TS 方案。
- **三端体验一致**:同一套 Rust + WebView 代码在 Win/Mac/Linux 行为一致(WebView 差异是唯一变量,Tauri 2 的 Wry 已尽量抹平)。
- **前端 UI 推荐 Svelte 5**(运行时小、无虚拟 DOM、内存低,与 Tauri 轻量哲学契合);求生态求稳可用 React。前端是薄层,影响有限。
- **进阶选项**:若要连 UI 也用 Rust(全 Rust 栈、零 WebView 差异),可用 Slint 或 Dioxus(Dioxus 还能一套代码出到桌面/移动/Web)。生态较新,作为前沿备选。

### 4.3 本地优先(Local-first)

- 离线完全可用,所有 CRUD 直接读写本地 SQLite,不依赖网络。
- 登录前 / 未登录用户 = 纯本地应用(等价于当前单机版体验)。
- 网络仅在「登录 + 用户发起同步」时作为增强通道。

---

## 五、核心共享层:pomoflow-rs(Cargo workspace)

> 这是本架构**最重要的结构设计**。把桌面与云端都要用到的域逻辑抽成一个 Rust workspace,两端共享同一份代码。

```
pomoflow-rs/                       (Cargo workspace)
├── crates/
│   └── core/                      ★ 桌面 + 云端 Sync 共享
│       ├── model/                 # Task / Project / ... 带 sync 字段
│       ├── sync/                  # 同步协议消息、序列化格式
│       ├── merge/                 # LWW 合并算法(纯函数,可单测)
│       ├── changelog/             # 变更日志结构
│       └── validate/              # 业务校验
├── desktop/                       # Tauri 应用 → 依赖 core
└── sync-server/                   # 云端 Sync Service → 依赖 core
```

**共享带来的三个不可替代收益:**

1. **合并算法两端零漂移**:LWW 冲突合并是同步最易出 bug 处。桌面与云端用**同一个 `core/merge` crate 的同一段代码**,语义不可能不一致。其他方案(两端用不同语言重写合并逻辑)迟早漂移。
2. **协议天然一致**:同步消息的序列化 / 反序列化两端共享同一套类型定义,改一处两端同步。
3. **可测试性**:`core/merge` 是纯函数,单元测试即可覆盖所有冲突场景,桌面与云端都受益。

> 移动端(Flutter/Dart)无法直接复用 Rust crate,需独立实现同步客户端——但移动端本就是另一套 UI 技术栈。**桌面 + 云端这两个 Rust 节点之间的复用,已覆盖系统中最易错、最关键的部分。**

---

## 六、数据模型与同步架构

### 6.1 同步友好的数据模型

本地与云端 schema 一致。每张业务表必须带:

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | UUID | 全局唯一,**离线生成**(绝不用自增整数,否则多端撞主键) |
| `user_id` | UUID | 云端按用户隔离 |
| `created_at` | timestamp | 创建时间 |
| `updated_at` | timestamp | 最后修改时间(同步基准 / LWW 判定) |
| `deleted_at` | timestamp? | **软删除**(绝不物理删,否则无法同步删除操作) |
| `revision` | bigint | 单调递增版本号(冲突检测 / 幂等) |
| `sync_state` | enum | `pending` / `synced`(本地待同步队列标记) |

### 6.2 同步流程(增量 Push + Pull)

```
客户端定期触发 / 用户手动触发同步:
     │
     ├── PUSH  本地 sync_state=pending 的变更(增/改/删) → 云端 Sync Service
     │        云端按 updated_at 做 LWW 合并 → 落 PostgreSQL → 返回最新 revision
     │
     └── PULL  带 last_sync_at 游标 → 拉云端该用户 since last_sync 的所有变更
              → 合并到本地 SQLite → 推进 last_sync_at
```

- **冲突策略**:`updated_at` 时间戳 **Last-Write-Wins(LWW)**。任务管理类应用足够简单可靠;若未来出现高冲突协作场景(如多人实时共编),再升级为 CRDT。
- **幂等与去重**:用 `revision` + `id` 保证重复 push 不产生脏数据。
- **断点续传**:同步是增量的,以 `last_sync_at` 为游标,中断后下次接着传。
- **设备标识**:每端注册 `device_id`,支持「查看我的设备」「强制下线」。

### 6.3 现成同步方案(备选)

若不自研同步引擎,可评估成熟开源方案:**PowerSync**(SQLite ↔ PostgreSQL 自动双向同步)、**cr-sqlite**(给 SQLite 加 CRDT)、**ElectricSQL**。

> 建议:**MVP 用 Change-Log + LWW 自研**(逻辑简单、可控、无外部依赖);规模上来后再评估迁移 PowerSync。无论自研还是上 PowerSync,`pomoflow-rs/core` 中的域模型与校验逻辑都应保留共享。

---

## 七、云端微服务层

按领域拆分,每个服务独立部署、独立扩缩,用该领域最优语言。

| 微服务 | 语言 | 职责 | 关键点 |
|--------|------|------|--------|
| **API Gateway** | APISIX | 统一入口、JWT 校验、限流、路由 | 用成熟产品,不重复造轮子 |
| **Auth Service** | Rust | 注册 / 登录 / Token 签发吊销 / 多端会话 | 安全敏感,内存安全消除漏洞面 |
| **Sync Service** | Rust | 接收 / 下发增量变更、LWW 合并、冲突解决 | 核心服务,并发最高,**与桌面共享 `core` crate** |
| **User Service** | Go | 用户资料、设备管理 | CRUD |
| **Membership Service** | Go | 会员等级、权益、到期、权限 | 业务规则 |
| **Notification Service** | Go | 推送 / 邮件,消费 MQ 事件 | 事件驱动 |
| **Analytics Service** | Python | 聚合统计、留存分析、未来 ML / LLM | 数据科学主场 |
| **Admin BFF** | Go | 给管理后台聚合 API、RBAC、审计 | 内网 |

**通信**:
- 客户端 ↔ 网关:REST over HTTPS + JWT。
- 服务间内部:**gRPC**(强类型、高性能)。
- 异步事件:**NATS**(轻量)或 Kafka(数据量大时)——通知、统计聚合、审计均走事件。
- 协议契约:由 Rust `core` 生成 OpenAPI / Protobuf,各语言端按契约对接。

**弹性扩展**:
- 每个服务打包 Docker 镜像,K8s `Deployment` 管理,配 **HPA**(CPU / QPS 驱动自动扩缩)。
- **Sync Service** 流量最大,优先扩;**Analytics** 异步消费 MQ,解耦削峰。
- Rust / Go 服务均为编译型单二进制,镜像小、启动快,K8s 扩容秒级生效。

---

## 八、数据存储与基础设施

| 组件 | 选型 | 用途 |
|------|------|------|
| 云端主库 | PostgreSQL(主从 + 逻辑复制) | 业务数据,按 `user_id` 索引隔离 |
| 缓存 / 会话 / 锁 | Redis(哨兵 / 集群) | 同步去重、限流、Token 黑名单、分布式锁 |
| 事件总线 | NATS(或 Kafka) | 服务解耦、异步通知、统计聚合 |
| 对象存储 | S3 / OSS | 数据库备份、导入导出文件 |

---

## 九、认证与安全

- **登录态**:Access Token(短期,~15min)+ Refresh Token(长期,可吊销),会话存 Redis,支持主动登出。
- **多端共存**:一个用户多端同时在线,每端独立 `device_id` + 独立会话。
- **数据隔离**:云端所有查询强制带 `WHERE user_id = ?`,网关后强制注入用户身份。
- **传输**:全链路 HTTPS;移动端证书固定(防中间人)。
- **限流防刷**:网关层按用户 / IP 限流;同步接口做幂等。
- **加密敏感数据**:用户凭证等用 Rust 内存安全实现处理,杜绝内存类漏洞。

---

## 十、管理后台(内网,不对用户开放)

- **绝不直连生产库**:经 **Admin BFF**(独立微服务,RBAC + IP 白名单 + 审计日志)访问数据。
- **技术栈**:React + Ant Design Pro(TypeScript)。
- **功能模块**:
  - 数据看板:用户量、活跃、留存、同步量(读 PG 只读副本 + 预聚合表)。
  - 会员管理:等级授予、权益调整、到期续期。
  - 用户运营:封禁、强制下线、数据查询。
  - 审计:所有管理操作留痕。
- **部署**:独立子域 + VPC 内网 + SSO 登录 + 操作审计。

---

## 十一、部署与运维

- **环境**:Dev / Staging / Prod 三套 K8s 命名空间,Helm 管理配置。
- **数据库**:PostgreSQL 主从 + 定期备份到对象存储;Redis 哨兵 / 集群。
- **可观测性**:Prometheus + Grafana(指标)、Loki / ELK(日志)、Jaeger(链路追踪)。
- **CI/CD**:GitHub Actions → 构建镜像 → 推 Harbor → ArgoCD 滚动发布。
- **多端发布**:
  - 移动:iOS App Store / Google Play / 华为应用市场(鸿蒙)。
  - 桌面:GitHub Releases + Tauri 内置自动更新。

---

## 十二、关键架构决策记录(ADR)

> 固化"为什么这么选",作为基线依据与后续争议仲裁参考。

### ADR-001 桌面与移动采用独立技术栈,不强行统一

- **决策**:桌面用 Tauri+Rust,移动用 Flutter+Dart,两端语言不同。
- **理由**:每端用该平台最优技术(桌面 Rust 性能安全、移动 Flutter 覆盖鸿蒙);强行统一语言必然在某端妥协。两端通过统一的云端 API 契约对齐,而非统一语言。

### ADR-002 移动端选 Flutter(Dart),不选 uni-app / React Native

- **决策**:Flutter + Drift。
- **理由**:需求覆盖 iOS / 安卓 / **鸿蒙**。Flutter 鸿蒙为华为官方主线支持,成熟度最高。
- **不选 uni-app**:其杀手锏是「微信小程序」,本项目无小程序需求;且 App 端性能、鸿蒙适配深度不及 Flutter。
- **不选 React Native**:鸿蒙为社区移植,成熟度不及 Flutter 官方。

### ADR-003 桌面端选 Tauri 2 + Rust(业务逻辑写 Rust)

- **决策**:Rust 写全部业务逻辑与数据访问,Web UI(Svelte/React)仅作薄展示层,本地 SQLite 用 rusqlite 直连。
- **理由**:需求明确「性能、安全优先、三端体验一致」。Rust 编译型 + 内存安全 + 无 GC 抖动,跨三端行为一致,满足该约束。
- **不选 Electron+TS**:体积大、内存高、放弃 Rust 性能安全优势。
- **不选「Tauri+TS 业务」**:会让 Rust 退化为薄壳,浪费 Rust 优势。

### ADR-004 云端多语言微服务,按领域选型

- **决策**:Sync / Auth = Rust;User / Membership / Notification / Admin BFF = Go;Analytics = Python。
- **理由**:约束明确「AI 编码实施,不考虑招人与团队栈」→ 释放多语言红利,每个服务用它领域最强语言。
- **Sync 用 Rust 而非 Go**:Sync 是系统心脏(所有客户端打它),Rust 稳定低延迟 + 无 GC 抖动 + 内存安全收益最大,**且能与桌面共享 `core` crate**(见 ADR-005)。
- **Analytics 用 Python**:统计 / 建模 / 未来 ML 是 Python 主场,Go/Rust 数据科学生态无法比。

### ADR-005 关键域逻辑用 Rust `core` crate 桌面 + 云端共享

- **决策**:建 `pomoflow-rs` workspace,`core` crate 定义域模型 / 同步协议 / LWW 合并 / 校验,桌面 Tauri 后端与云端 Sync Service 同时依赖它。
- **理由**:同步合并是最易错处,两端共享同一份代码可保证**零漂移**;协议类型一处定义两端复用;合并算法可纯函数单测。这是 TS/Go/Python 方案结构上做不到的(只有 Rust 同时存在于桌面与云端)。

### ADR-006 同步用 Change-Log + LWW + UUID,不用 CRDT

- **决策**:增量 Push/Pull + `updated_at` LWW + UUID 主键 + 软删除。
- **理由**:任务管理类应用冲突粒度低,LWW 简单可靠、可控、无外部依赖。
- **何时升级**:若未来出现高冲突协作场景(多人实时共编),再评估 CRDT / PowerSync / cr-sqlite;`core` 中的域模型与校验逻辑不受影响。

### ADR-007 认证用 JWT(Access)+ Refresh Token,数据按 user_id 隔离

- **决策**:短期 Access + 可吊销 Refresh;云端所有查询强制 `user_id` 过滤。
- **理由**:多端会话 + 主动登出需求;最小权限隔离。

### ADR-008 管理后台经 Admin BFF 访问数据,不直连库

- **决策**:管理后台不直连生产库,通过带 RBAC + IP 白名单 + 审计的 Admin BFF。
- **理由**:杜绝误操作与注入面,满足"不对用户开放"的内网定位与审计要求。

### ADR-009 LWW tie-break 采用 revision → updated_at → device_id(修订 §14.1⑤)

- **决策**:仲裁顺序为 `revision` 优先,`updated_at` 次之,`device_id` 字典序兜底;
  **修订** §14.1⑤ 原定的 `updated_at → revision → id`。
- **理由**:设备时钟不可信(漂移/回拨)。updated_at 优先时,时钟超前的设备能靠
  "未来时间戳"永久压制他端的正当修改;revision 由写入端单调分配,以其为先可防
  旧数据靠未来时间获胜;三层全等时 device_id 字典序保证确定性收敛(禁止随机,
  与基线要求一致)。详见 `同步协议详细设计.md` §5(e2e 场景 3 锁定该行为)。

### ADR-010 复盘族同步:自然键 + 空内容即删除 + 补 revision

- **决策**:日/周/月复盘以自然键(date / week_start / year_month)为同步键;补
  `revision` 参与统一仲裁;**删除表达为 `content=""` 的 upsert**,不引入 tombstone。
- **理由**:空内容 upsert 天然可传播("删除"成为普通变更),且与"内容为空即未写"
  的 UI 语义一致,用户可见行为不变;tombstone 会给以日期为键的表引入多余的删除态。

### ADR-011 同步游标 = 服务端全局 seq;Push 响应不携带游标

- **决策**:游标为 `server_changelog.seq`(全局单调递增),不用时间戳;
  `PushResponse` 不返回游标,游标只能由 pull 逐批推进。
- **理由**:细化 §6.2 的 `last_sync_at`。时间游标存在同秒边界漏变更;若 push 后把
  游标直接跳到最新 seq,会漏掉其它设备在本次 push 期间落库的中间变更。
  幂等以 `(user_id, change_id)` 去重,网络重试重复 push 不产生重复下发。

---

## 十三、现状 → 目标迁移路径

当前(PomoFlow v1.x)与目标架构技术栈差异巨大(Python→Rust/Go/Python 微服务,React 桌面→Tauri,无后端→云端微服务),**这是新一代重写,不是渐进改造**。建议:

1. **并行共存**:保留现有单机 exe 服务「不需要同步」的用户;新一代多端版独立仓库 / 分支服务「需要多端同步」的用户。
2. **数据迁移工具**:提供「从单机版 SQLite 导出 → 导入新账号云端」的一次性迁移脚本(经 Admin BFF 或专用导入接口)。
3. **分阶段实施**:
   - **P0**:定义 `pomoflow-rs/core`(域模型 + 同步协议 + LWW 合并 + 单测)——这是地基。
   - **P1**:云端 Sync + Auth(Rust)+ User(Go)+ PG,跑通「桌面 ↔ 云端」单端同步闭环。
   - **P2**:桌面 Tauri+Rust 客户端完整功能 + 本地优先。
   - **P3**:移动 Flutter 客户端 + 多端同步验证。
   - **P4**:Analytics(Python)、Membership、Notification、Admin BFF + 管理后台。
   - **P5**:K8s 化部署、可观测性、CI/CD、多端商店上架。

---

## 十四、P0 产出物与验收标准

> P0 的目标:交付 `pomoflow-rs/core` crate——整个系统的地基。它必须能被桌面 Tauri 后端与云端 Sync Service 同时依赖,并把同步最易错的部分(合并算法)在这一阶段锁死、用单测覆盖。**P0 不碰任何 I/O 与 UI,只交付纯逻辑 + trait 抽象。**

### 14.1 产出物清单

**① crate 骨架**

```
pomoflow-rs/                       Cargo workspace
├── Cargo.toml                     [workspace], members = ["crates/core", "desktop", "sync-server"]
├── rustfmt.toml / clippy.toml
├── crates/
│   └── core/                      ★ P0 交付(lib crate)
│       ├── src/
│       │   ├── model.rs           域模型 + 同步元字段
│       │   ├── changelog.rs       变更日志抽象
│       │   ├── sync.rs            同步协议消息
│       │   ├── merge.rs           LWW 合并(纯函数)
│       │   ├── validate.rs        业务校验
│       │   └── store.rs           EntityStore / ChangeLogStore trait
│       └── tests/                 集成测试(冲突矩阵等)
├── desktop/                       占位(P1 实现)
└── sync-server/                   占位(P1 实现)
```

**② 域模型(`core::model`)**

- 对齐现有功能的实体:`Task`、`Project`、`Tag`、`SubTask`、`PomodoroSession`、`DailyReview`、`WeeklyReview`、`MonthlyReview`、`Motto`、`NotificationTemplate`(字段参照 `数据库文档.md`)。
- 每个实体**统一带同步元字段**:`id: Uuid`、`user_id: Uuid`、`created_at`、`updated_at`、`deleted_at: Option<DateTime<Utc>>`、`revision: i64`。
- 枚举:`Priority`、`TaskStatus`、`Reminder`、`Repeat` 等,与现状取值一致。
- 全部 `#[derive(Serialize, Deserialize, Clone, Debug)]`;时间用 `chrono::DateTime<Utc>`,`Uuid` 用 `uuid` crate。

**③ 变更日志(`core::changelog`)**

- `enum Op { Upsert(Entity), Delete { id, at } }`
- `struct Change { entity_type, entity_id, op, occurred_at, revision }`
- `trait ChangeLogStore { fn push; fn drain_since; fn peek; }` —— **只定义 trait**,具体存储(桌面 rusqlite / 云端 PG)由各端实现。

**④ 同步协议(`core::sync`)**

- `struct PushRequest { user_id, changes: Vec<Change> }`
- `struct PushResponse { results: Vec<ApplyOutcome>, latest_revision }`(每条变更返回 `Accepted | Conflicted | Dropped`)
- `struct PullRequest { user_id, since: SyncCursor }`
- `struct PullResponse { changes: Vec<Change>, next_cursor: SyncCursor }`
- `struct SyncCursor { last_sync_at, per_entity_revision: HashMap<_, i64> }`
- 序列化:**serde + JSON 起步**(零外部依赖、可读、易调试);接口稳定后再评估迁 Protocol Buffers(prost)换取跨语言强类型与性能。

**⑤ LWW 合并算法(`core::merge`)** —— P0 最重要的纯逻辑

- `fn merge_one(local: &Entity, remote: &Entity) -> Merged`(基于 `updated_at` 的 Last-Write-Wins)。
- `fn apply_changes(store: &mut dyn EntityStore, changes: &[Change]) -> ApplyReport`(应用一批变更,返回接纳/冲突统计)。
- 规则:**软删除 tombstone 优先传播**(`deleted_at` 非空即视为删除,必须同步);**tie-break**:`updated_at` 相同时以 `revision` 更大者赢,再相同以 `id`(Uuid 字节序)更大者赢——**确定性 tie-break,禁止随机**。
- **纯函数,无 I/O,无副作用**。

**⑥ 业务校验(`core::validate`)**

- `fn validate(task: &Task) -> Result<(), ValidationError>`(标题非空/长度、枚举合法、日期区间、番茄数非负等),每个实体一个。

**⑦ trait 抽象(`core::store`)** —— 为两端实现留接口

- `trait EntityStore { fn get; fn upsert; fn soft_delete; fn list_since; }`
- `core` 只定义 trait + 纯逻辑,**不绑定任何具体存储**。桌面用 `rusqlite` impl,云端用 `sqlx` impl(均在 P1)。

**⑧ 单元测试(验收核心)**

- `merge` 模块的**冲突矩阵**:local 新 vs remote 新、local 新 vs remote 旧、local 旧 vs remote 新、更新 vs 删除、删除 vs 删除、相同 `updated_at` 的 tie-break、`revision` 回退防护、tombstone 传播。
- `changelog` 队列行为(push/drain_since/顺序/幂等)。
- `validate` 边界(空标题/超长/非法枚举/负番茄数)。
- `sync` 协议往返(request/response 序列化 → 反序列化 round-trip 相等)。
- 覆盖率目标:`core` crate **≥ 90%**(纯逻辑,理应高)。

### 14.2 验收标准(Definition of Done)

P0 视为完成,当且仅当:

1. ✅ `cargo build -p pomoflow-core` 通过,`cargo clippy` 零 warning。
2. ✅ `cargo test -p pomoflow-core` 全绿,覆盖率 ≥ 90%(用 `cargo-tarpaulin` 或 `cargo-llvm-cov`)。
3. ✅ `merge` 冲突矩阵全部用例通过(见 ⑧ 清单)。
4. ✅ 协议消息可成功序列化/反序列化往返。
5. ✅ **两端 mock 闭环**:`desktop/` 与 `sync-server/` 各自实现一个**内存版** `EntityStore`,调 `core::merge` 与 `core::sync` 跑通一次「桌面 push → 云端合并 → 桌面 pull」的完整同步闭环(纯内存,无真实 DB)。**这是证明「core 真能被两端共享」的关键验收。**
6. ✅ `cargo doc -p pomoflow-core` 生成的文档清晰,每个 `pub` 类型/函数有 doc-comment。
7. ✅ ADR-006(LWW)的 tie-break 规则在代码注释与测试中显式落地,无歧义。

### 14.3 非目标(本阶段明确不做)

- ❌ 桌面 Tauri 应用、UI、rusqlite 实际集成(P1)。
- ❌ 云端 HTTP/axum、真实 PostgreSQL(P1)。
- ❌ 认证、JWT、网关(P1)。
- ❌ 移动端 Dart 同步客户端(P3,按本阶段导出的协议 schema 实现)。
- ❌ 高冲突场景的 CRDT 升级(ADR-006 已明确延后)。

### 14.4 本阶段需定稿的设计决策

- [ ] 序列化格式定稿(JSON 起步 / 直接 protobuf)。建议:**JSON 起步**。
- [ ] tie-break 规则确认(revision → id 字节序)。建议:如 ⑤ 所述。
- [ ] 时间库选择(`chrono` vs `time`)。建议:`chrono`。
- [ ] `core` 是否再拆细粒度子 crate。建议:**MVP 单 crate + 模块划分**,规模上来再拆。

---

## 十五、待定项 / 演进

- [ ] 同步协议契约(OpenAPI / Protobuf)详细定义——待 `core` crate 落地后导出。
- [ ] 是否引入 PowerSync / cr-sqlite 替代自研同步(规模上来后评估)。
- [ ] 桌面前端框架最终定稿(Svelte 5 vs React)——建议各做一个原型页对比性能后再定。
- [ ] 多端 UI 设计规范(桌面 Web 与移动 Flutter 的视觉/交互统一)。
- [ ] 会员体系与商业模式细节(影响 Membership Service 设计)。
- [ ] 数据合规:云端多用户数据加密策略(字段级加密 / TDE)。

---

> 本文档为目标架构 **v1.0 基线**。任何偏离本文档的架构决策,应通过新增 ADR 记录并更新本文档,保持基线与实现一致。
