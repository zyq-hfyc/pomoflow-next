# CLAUDE.md — pomoflow-next

> 给 Claude / AI agent 看的本仓库 orientation,不是给人类看的 README。

## 这是什么

`pomoflow-next` 是 PomoFlow 的**新一代多端仓库** —— 桌面端 Tauri 2 + Rust、
移动端 Flutter、云端 sync-server(axum + PostgreSQL),local-first,多端同步已落地。
与上一代 [`pomoflow`](../pomoflow/) 仓库(TypeScript + Python + PyInstaller)并行共存,
各自维护各自的发布线。

## 权威架构文档

架构原则 / ADR / 同步协议设计 → 一律查 [`pomoflow/docs/architecture.md`](../pomoflow/docs/architecture.md)
(原仓库),不要在本仓库另起一份互相矛盾的 ADR。

## 当前阶段(P0~P3 功能主线完成,余部署/上架尾巴)

> 阶段编号以权威文档 §13 为准:P1 = 云同步 + 账号,P2 = 桌面端,P3 = 移动端,
> P4 = 微服务群,P5 = K8s/商店,P6 = 社交化;P0.5 / P1a~d 是执行期自增子编号,
> 见协作任务清单。

**已完成**:

- **P0/P0.5 地基**:core(模型/LWW 同步/存储/校验/统计/重复/排序)+
  同步协议(seq 游标 Push/Pull)+ 双端 mock 闭环
- **P1 云同步 + 账号**:sync-server(axum + PG)已自部署(VMware VM 内网,
  局域网/端口转发访问;Tailscale 组网 runbook 已备好但用户未执行);12 类业务
  实体全量 LWW + 冲突可视化(**通知文案模板除外** —— 桌面单行/移动
  SharedPreferences,任何一端都不同步);注册/登录/JWT Access/Refresh/
  邮箱验证码/头像/注销冷静期/设备会话管理
- **P2 桌面端(0.2.0 已发布)**:v1 全功能 + 自动同步 + 垃圾箱 + 子任务 +
  年度复盘 + 随手记
- **P3 Android 线(0.2.0 首发)**:Flutter 移动端,真机四轮 E2E 通过
- **migrate-v1 一键迁移**(范围见 [docs/migration.md](./docs/migration.md))

**未完成**:

- P1:腾讯云公网正式部署(HTTPS 反代/安全组/PG 备份)
- P3:iOS(需 macOS 构建链,Windows 主机做不了)/ 鸿蒙 / 商店上架
- P4 微服务群(Analytics/Membership/Notification/Admin)未开工
  (数据导出/账号注销已随 ADR-012 提前落地);P5/P6 未开工

具体进度看根目录 [`README.md`](./README.md) 与
[`docs/协作任务清单.md`](./docs/协作任务清单.md)(跨会话进度真相源)。

## 目录地图

```
crates/core/         域模型 + 同步 + 存储 trait,纯 Rust lib,可独立单元测试
apps/desktop/        Tauri 2 桌面端
apps/mobile/         Flutter 移动端(Android)
services/sync-server/ 云端同步服务(axum + PostgreSQL)
tools/migrate-v1/    v1 SQLite → v2 store 迁移 CLI
docs/                本仓库内文档
```

## 协作约定(本仓库)

- **不要 commit 用户的工具链配置**:`.cargo/config.toml` 和 `.cargo/config.local.toml`
  已在 `.gitignore` 里。各机器 owner 各自配置。
- **不要修改 `rust-toolchain.toml` 的 `channel = "stable"`**:这是 CI 兼容写法。
  本机如果需要强制 GNU toolchain,用 `RUSTUP_TOOLCHAIN=stable-x86_64-pc-windows-gnu` 环境变量。
- **workspace 现有 4 个 member**:`crates/core` / `apps/desktop` /
  `tools/migrate-v1` / `services/sync-server`(`Cargo.toml` 头注释有各阶段
  加入记录)。新增 crate 先评估是否真有必要,`crates/core` 保持纯 lib 性质不变。
- **业务规则权威已交接**:v1 复刻语义已定稿进 `crates/core`,新功能业务规则
  以 core 为准;仅维护复刻语义时回查 v1 `crud.py` / `models.py`,不要另起炉灶。
- **共享语义而非共享代码**:logo / 主题 token / i18n 文案 / 数据模型语义文档
  从 `pomoflow/` 仓库**手工搬运**到本仓库,不跨仓库 git import。

## 关键模块速查(crates/core)

| 模块 | 作用 |
|------|------|
| `model` | 域实体(Task / Project / Tag / PomodoroSession / Review / Motto / NotificationTemplate),UUID 主键 + revision + 软删除 |
| `sync::lww` | Last-Writer-Wins 合并核心,revision → updated_at → device_id 三层仲裁 |
| `sync::mod` | ChangeLog + `merge_changelogs` 函数 |
| `store` | `Store` trait + `InMemoryStore` + `SqliteStore`(9 表);`store::migrate` 版本化迁移(`PRAGMA user_version` 驱动) |
| `validate` | 业务规则校验(v1 schemas.py 上限:标题 200 / 描述 5000 / 时长 1..=1000 / 项目层级 ≤ 3 等) |
| `stats` | 统计聚合(趋势/总览/项目分布),v1 crud.py 翻译,tz 由前端传入 |
| `repeat` | 重复任务日期引擎(6 规则 + custom JSON),与 v1 Python 差分对拍验证 |
| `reorder` | 拖拽排序校验(项目树环/深度,标签平铺) |
| `error` | `CoreError` 统一错误类型,thiserror 派生 |

## 测试

- **CI(`.github/workflows/ci.yml`)**:push main 即跑全仓门禁 ——
  cargo fmt/clippy/test(workspace 全 4 crate)+ UI(svelte-check + vitest +
  tsc + vite build)+ mobile(flutter analyze + test),Ubuntu runner。本地
  cargo test 跑不了(下述 dlltool 问题)时,直接 push 看 CI。
- `cargo check --all-targets` —— 类型检查,本地一定过
- `cargo test --all-targets` —— 单元 + 集成测试,**Windows 上 WinLibs dlltool 触发文件系统 1006 错误**,
  推荐装 VS Build Tools 或 Linux 跑(或交给 CI)
- `cargo clippy --all-targets -- -D warnings` —— 零警告

**桌面 UI(`apps/desktop/ui`)**

- `npm run check` —— svelte-check;`npm run build` —— tsc + vite build
- `npm run test` —— vitest + jsdom 组件级测试(`*.test.ts`,纯 DOM,
  不需要浏览器也不需要后端)。**svelte-check/build 查不出「跑起来才炸」
  的问题**(如 effect 读+写同一个 `$state` 自激 → `effect_update_depth_exceeded`
  → 整页不再重绘),这类必须靠这层挡。
- **要真跑一遍 UI**(复现前端 bug、看交互效果):`MOCK_TAURI=1 npm run dev`
  → `http://localhost:1420/#/tasks`。用 `src/mock/tauri-api.ts` 顶掉 Tauri
  IPC,不必起 Rust;mock 里有任务页/手账页 fixture,缺的命令按文件头注释补。
  注意同一 URL 只有 hash 变化时浏览器不重新加载,对比前后两次要换查询串。

## 开发流程

1. **改代码前**:用 `gh search` / Context7 查已有实现(本项目内已 `crates/core/*`,仓库外查 crates.io)
2. **TDD**:核心算法(LWW / 合并)先写单测再写实现
3. **commit**:Conventional Commits,小颗粒,单一意图
4. **验证**:`cargo check` + 单测,再给人看效果,人确认后再 commit/push

## 不要做的事

- ❌ 不要把 v1 Python 代码 import 到本仓库(物理隔离)
- ❌ 不要在 `crates/core` 加任何 I/O(磁盘 / 网络 / 系统调用),保持纯 Rust lib 性质
- ❌ 不要给 model 加 `Serialize` 之外的 I/O 派生(如 `diesel::AsExpression`),core 是平台无关
- ❌ 不要把 `Cargo.lock` 移出版本控制 —— 自 P1.6 起已入库(bin crate 已出现,
  评估已落地;见 `.gitignore` 头注释)
