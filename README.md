# PomoFlow Next

> 新一代 PomoFlow 桌面端 —— Tauri 2 + Rust,local-first,准备多端同步。

## 这是什么

`pomoflow-next` 是 PomoFlow 的下一代桌面端,与上一代 [`pomoflow`](https://github.com/zyq-hfyc/pomoflow)
**并行共存**:

| 仓库 | 技术栈 | 目标用户 |
|------|--------|---------|
| [`pomoflow`](https://github.com/zyq-hfyc/pomoflow) | TypeScript + Python + PyInstaller | 「不需要同步」的用户,继续维护 v1.x |
| **`pomoflow-next`**(本仓库) | Tauri 2 + Rust + 薄 Web UI | 「准备多端同步」的用户,v2 渐进 |

## 当前进度(v1 功能复刻完成,同步线 P0.5/P1a 进行中)

- ✅ Cargo workspace(`crates/core` + `apps/desktop` + `tools/migrate-v1` + `services/sync-server`)
- ✅ `crates/core`:域模型 + LWW 同步 + 存储(含版本化 SQLite 迁移) + 业务校验 +
  统计聚合 + 重复任务日期引擎 + 拖拽排序校验
- ✅ 同步地基(P0.5):实体 `user_id` 归属、`sync_state` 待推送队列、Push/Pull 协议
  (seq 游标)、同步引擎、双端 mock 七场景闭环 —— 契约见
  [docs/同步协议详细设计.md](https://github.com/zyq-hfyc/pomoflow/blob/main/docs/同步协议详细设计.md)
  (ADR-009/010/011)
- ✅ `services/sync-server` 云端同步服务(P1a 服务端):axum + PostgreSQL,
  Push/Pull + LWW 裁决(与桌面共享 core 代码)—— **部署见
  [services/sync-server/README.md](./services/sync-server/README.md)**
- ✅ `apps/desktop` Tauri 2 桌面端:v1 全功能 —— 计时器(挂钟制/自动链/任务接续/
  提醒)、任务页(6 视图 + 重复任务引擎 + 手账月历复盘)、统计页(6 维度 + SVG 图表)、
  设置页(7 标签:计时/清单树拖拽/标签/8 主题背景/名言/通知文案/中英双语)、xlsx 导出、
  帮助页、托盘/通知/开机自启
- ✅ `tools/migrate-v1`:v1 SQLite → v2 store 一键迁移(全表,含重复实例/子任务/名言)
- ✅ CI + 三平台 Release(tag 触发)
- ⏳ 进行中:同步闭环实测 —— 桌面端接线已完成(设置 → 数据同步:服务器地址/Token、
  本机标识、立即同步),待服务端实机部署后双端验证;
  任务全景见 [docs/协作任务清单.md](./docs/协作任务清单.md)

完整路线与 ADR 见 [docs/architecture.md § 13](https://github.com/zyq-hfyc/pomoflow/blob/main/docs/architecture.md)
(权威文档在原仓库,本仓库只做执行)。

## 仓库结构

```
pomoflow-next/
├── crates/core/                # 域模型 + 同步 + 存储抽象(纯 Rust lib)
├── apps/desktop/               # Tauri 2 桌面端(P1)
├── tools/migrate-v1/           # v1 → v2 数据迁移 CLI
├── services/sync-server/       # 云端同步服务(P1a,部署说明在其 README)
├── docs/                       # 仓库内文档(含协作任务清单)
├── Cargo.toml                  # workspace root
├── rust-toolchain.toml         # Rust 版本锁
└── .github/workflows/          # CI / Release
```

## 开发环境要求

### Rust 工具链

- Rust **stable**(由 [`rust-toolchain.toml`](./rust-toolchain.toml) 锁版本,目前为 1.97)
- 安装方式:`https://rustup.rs/` → `rustup-init.exe`

### C / C++ 链接工具链(本机 Windows 必装)

Rust 需要链接 C runtime,Windows 上需要以下其中之一:

| 工具链 | 适用 | 安装 |
|--------|------|------|
| **Visual Studio Build Tools 2022** | 官方,稳定,长期推荐 | `winget install Microsoft.VisualStudio.2022.BuildTools` |
| **WinLibs MinGW UCRT** | 轻量,~150MB,适合本机快速上手 | `winget install BrechtSanders.WinLibs.POSIX.UCRT` |
| **MSYS2 + mingw-w64-x86_64-gcc** | 全套,适合日常开发 | `winget install MSYS2.MSYS2` + `pacman -S mingw-w64-x86_64-gcc` |

### 本仓库当前运行验证

**类型检查(无链接):**

```bash
cargo check --all-targets
```

`cargo check` 已在本机 + toolchain + 依赖下验证通过,crates/core 全部模块可编译。

**完整构建/测试:**

```bash
cargo test --all-targets      # 跑单元 + 集成测试
cargo build --release         # release 构建
cargo clippy --all-targets -- -D warnings   # clippy 零警告
```

> ⚠️ 本机在 `cargo build/test` 阶段会遇到 WinLibs dlltool 的 Windows 文件系统 1006 错误。
> 推荐使用 Visual Studio Build Tools(稳定链路),或暂时把本仓库代码挪到有 VS Build Tools 的机器上跑完整测试。

### IDE / 编辑器

- VS Code + `rust-analyzer` 扩展
- IntelliJ IDEA / CLion + Rust 插件

## 快速开始

```bash
# 1. 克隆(本仓库当前是本地仓库,后续 push 到 zyq-hfyc/pomoflow-next 后改为 git clone)
git clone https://github.com/zyq-hfyc/pomoflow-next.git
cd pomoflow-next

# 2. 验证 crates/core 可编译
cargo check --all-targets

# 3. 跑测试
cargo test --all-targets
```

## 与 v1 的数据迁移

`tools/migrate-v1` CLI 把 v1 `pomoflow.db`(SQLite)一键导入 v2 store
(项目树/标签/任务含重复实例与子任务/番茄会话/三档复盘/名言,全量):

```bash
cargo run -p migrate-v1 -- --from path/to/pomoflow.db --to "%APPDATA%\pomoflow\store.db" --dry-run
cargo run -p migrate-v1 -- --from path/to/pomoflow.db --to "%APPDATA%\pomoflow\store.db"
```

详见 [docs/migration.md](./docs/migration.md)。

## 贡献

- 提交风格:Conventional Commits(`feat:` / `fix:` / `refactor:` / `docs:` / `test:` / `chore:` / `perf:`)
- 不要直接 push 到 main,先开 PR
- CI 必须通过(cargo check + cargo test + cargo clippy)

## License

MIT