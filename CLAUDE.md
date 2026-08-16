# CLAUDE.md — pomoflow-next

> 给 Claude / AI agent 看的本仓库 orientation,不是给人类看的 README。

## 这是什么

`pomoflow-next` 是 PomoFlow 的**新一代桌面端仓库**,技术栈 Tauri 2 + Rust。
与上一代 [`pomoflow`](../pomoflow/) 仓库(TypeScript + Python + PyInstaller)并行共存,
各自维护各自的发布线。

## 权威架构文档

架构原则 / ADR / 同步协议设计 → 一律查 [`pomoflow/docs/architecture.md`](../pomoflow/docs/architecture.md)
(原仓库),不要在本仓库另起一份互相矛盾的 ADR。

## 当前阶段(v1 功能复刻完成,准备 P2 云同步)

**已完成**:v1 全功能复刻 —— core(模型/同步/存储/校验/统计/重复/排序)+
桌面端(计时器/任务页含手账/统计页/设置 7 标签/双语/主题/xlsx 导出/帮助页)+
migrate-v1 全表迁移。v1 是功能规格权威,复刻语义以 v1 源码为准。
**没在做**:云端同步(P2+)

具体进度看根目录 [`README.md`](./README.md)。

## 目录地图

```
crates/core/         域模型 + 同步 + 存储 trait,纯 Rust lib,可独立单元测试
apps/desktop/        Tauri 2 桌面端(P1)
tools/migrate-v1/    v1 SQLite → v2 store 迁移 CLI(P0/P1 之间)
docs/                本仓库内文档
```

## 协作约定(本仓库)

- **不要 commit 用户的工具链配置**:`.cargo/config.toml` 和 `.cargo/config.local.toml`
  已在 `.gitignore` 里。各机器 owner 各自配置。
- **不要修改 `rust-toolchain.toml` 的 `channel = "stable"`**:这是 CI 兼容写法。
  本机如果需要强制 GNU toolchain,用 `RUSTUP_TOOLCHAIN=stable-x86_64-pc-windows-gnu` 环境变量。
- **不要加 binary crate 到 workspace members**:`Cargo.toml` 的 `members` 只声明
  `crates/core`。`apps/desktop` / `tools/migrate-v1` 在它们各自的 P1 / P0 完成时再加。
- **业务规则从 v1 `crud.py` / `models.py` 翻译过来**,不要另起炉灶。
- **共享语义而非共享代码**:logo / 主题 token / i18n 文案 / 数据模型语义文档
  在 P1 UI 阶段从 `pomoflow/` 仓库**手工搬运**到本仓库,不跨仓库 git import。

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

- `cargo check --all-targets` —— 类型检查,本地一定过
- `cargo test --all-targets` —— 单元 + 集成测试,**Windows 上 WinLibs dlltool 触发文件系统 1006 错误**,
  推荐装 VS Build Tools 或 Linux 跑
- `cargo clippy --all-targets -- -D warnings` —— 零警告

## 开发流程

1. **改代码前**:用 `gh search` / Context7 查已有实现(本项目内已 `crates/core/*`,仓库外查 crates.io)
2. **TDD**:核心算法(LWW / 合并)先写单测再写实现
3. **commit**:Conventional Commits,小颗粒,单一意图
4. **验证**:`cargo check` + 单测,再给人看效果,人确认后再 commit/push

## 不要做的事

- ❌ 不要把 v1 Python 代码 import 到本仓库(物理隔离)
- ❌ 不要在 `crates/core` 加任何 I/O(磁盘 / 网络 / 系统调用),保持纯 Rust lib 性质
- ❌ 不要给 model 加 `Serialize` 之外的 I/O 派生(如 `diesel::AsExpression`),core 是平台无关
- ❌ 不要 lock `Cargo.lock` 入库(workspace 全 lib,等出现 bin crate 再评估)