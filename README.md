# PomoFlow Next

> 新一代 PomoFlow 多端体系 —— 桌面 Tauri 2 + Rust、移动 Flutter、云端 sync-server,local-first,多端同步已落地。

## 这是什么

`pomoflow-next` 是 PomoFlow 的下一代多端仓库(桌面 + 移动 + 云端),与上一代
[`pomoflow`](https://github.com/zyq-hfyc/pomoflow) **并行共存**:

| 仓库 | 技术栈 | 目标用户 |
|------|--------|---------|
| [`pomoflow`](https://github.com/zyq-hfyc/pomoflow) | TypeScript + Python + PyInstaller | 「不需要同步」的用户,继续维护 v1.x |
| **`pomoflow-next`**(本仓库) | Tauri 2 + Rust(桌面)+ Flutter(移动)+ axum(云端) | 「需要多端同步」的用户,v2 线 |

## 当前进度(P0~P3 功能主线完成,余部署/上架尾巴)

> 阶段编号见 [docs/architecture.md § 13](https://github.com/zyq-hfyc/pomoflow/blob/main/docs/architecture.md);
> 任务全景见 [docs/协作任务清单.md](./docs/协作任务清单.md)(跨会话进度真相源)。

- ✅ Cargo workspace 4 crate:`crates/core` + `apps/desktop` + `tools/migrate-v1` + `services/sync-server`
- ✅ `crates/core`:域模型 + LWW 同步 + 存储(含版本化 SQLite 迁移) + 业务校验 +
  统计聚合 + 重复任务日期引擎 + 拖拽排序校验
- ✅ 同步地基(P0.5):实体 `user_id` 归属、`sync_state` 待推送队列、Push/Pull 协议
  (seq 游标)、同步引擎、双端 mock 七场景闭环 —— 契约见
  [docs/同步协议详细设计.md](https://github.com/zyq-hfyc/pomoflow/blob/main/docs/同步协议详细设计.md)
  (ADR-009/010/011)
- ✅ `services/sync-server` 云端同步服务(P1):axum + PostgreSQL,Push/Pull + LWW
  裁决;账号体系(注册/登录/JWT/邮箱验证码/头像/注销冷静期/设备会话管理)——
  已自部署(内网),**部署见
  [services/sync-server/README.md](./services/sync-server/README.md)**
- ✅ `apps/desktop` Tauri 2 桌面端(P2,0.2.0 已发布):v1 全功能 + 云同步(12 类
  业务实体 LWW + 冲突可视化)+ 自动同步 + 垃圾箱 + 子任务 + 年度复盘 + 随手记
- ✅ `apps/mobile` Flutter 移动端(P3 Android,0.2.0 首发):本地优先 + 云端同步,
  与桌面数据互通;真机四轮 E2E 通过
- ✅ `tools/migrate-v1`:v1 SQLite → v2 store 一键迁移(范围见
  [docs/migration.md](./docs/migration.md))
- ✅ CI + 三平台 Release(tag 触发)
- ⏳ 尾巴:公网正式部署(域名 + HTTPS,规划中)、iOS(需 macOS 构建链)/ 鸿蒙 /
  商店上架;P4 微服务群(Analytics/Membership/Notification/Admin)未开工

完整路线与 ADR 见 [docs/architecture.md § 13](https://github.com/zyq-hfyc/pomoflow/blob/main/docs/architecture.md)
(权威文档在原仓库,本仓库只做执行)。

## 仓库结构

```
pomoflow-next/
├── crates/core/                # 域模型 + 同步 + 存储抽象(纯 Rust lib)
├── apps/desktop/               # Tauri 2 桌面端(P2)
├── apps/mobile/                # Flutter 移动端(P3 Android)
├── tools/migrate-v1/           # v1 → v2 数据迁移 CLI
├── services/sync-server/       # 云端同步服务(P1,部署说明在其 README)
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
# 1. 克隆
git clone https://github.com/zyq-hfyc/pomoflow-next.git
cd pomoflow-next

# 2. 验证 crates/core 可编译
cargo check --all-targets

# 3. 跑测试
cargo test --all-targets
```

## 启动桌面端客户端(apps/desktop)

### 前置条件(一次性)

| 依赖 | 版本 | 说明 |
|------|------|------|
| Rust 工具链 | stable | 见上文「开发环境要求」,与 `rust-toolchain.toml` 一致 |
| C/C++ 链接工具链 | — | 见上文「开发环境要求」(Windows 必装,否则编译阶段报链接错误) |
| Node.js(含 npm) | ≥ 20 | UI 侧构建用;本仓库统一用 npm,不需要 pnpm/yarn |
| Flutter SDK | Dart ^3.13(本机 3.47 验证) | 仅开发移动端时需要,详见 [apps/mobile/README.md](./apps/mobile/README.md) |

### 安装依赖(每台开发机一次)

```bash
# ① 安装 UI 依赖(Svelte 5 + Vite + Tauri 前端 API,约 1-2 分钟)
#    --prefix 表示在 apps/desktop/ui 子目录里执行,不用手动 cd 过去
npm --prefix apps/desktop/ui install

# ② 安装 tauri-cli 的 npm wrapper(提供 npm run dev / npm run build 入口)
npm --prefix apps/desktop install
```

### 开发模式启动(日常用这个)

```bash
# 在仓库根执行;--prefix 指到桌面端目录,等价于 cd apps/desktop && npm run dev
npm --prefix apps/desktop run dev
```

这条命令实际执行 `tauri dev`,会自动完成三件事:

1. 启动 Vite 开发服务器(localhost:1420)—— 改前端代码(Svelte/CSS/TS)**保存即热更新**,无需重启;
2. 编译 Rust 侧 —— 首次全量编译约几分钟,之后增量编译秒级;改 Rust 代码会自动重编并重启窗口;
3. 编译完成自动弹出 PomoFlow 主窗口。

- **预期**:终端输出 Rust 编译进度 → 最后打印 `Running \`target\...pomoflow-desktop.exe\`` → 窗口弹出。
- **退出**:直接关窗口,或回终端按 `Ctrl+C`。

### 打正式安装包(.exe)

```bash
# 在仓库根执行;等价于 cd apps/desktop && npm run build
# 实际执行 `tauri build`:tsc 类型检查 → vite 打包前端 → Rust release 编译 → NSIS 打安装包
# 首次约 5-10 分钟(release 全量编译),之后有增量缓存
npm --prefix apps/desktop run build
```

产物位置(注意在**仓库根** `target/`,不在 apps/desktop 下):

| 产物 | 路径 | 用途 |
|------|------|------|
| NSIS 安装包 | `target/release/bundle/nsis/PomoFlow_<版本>_x64-setup.exe` | 双击安装,带开始菜单/卸载项 |
| 绿色单文件 | `target/release/pomoflow-desktop.exe` | 免安装直接运行 |

> 已安装过旧版再装新版:直接运行新 setup.exe 覆盖安装即可,用户数据(SQLite store)不受影响。

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
- CI 必须通过(cargo fmt/clippy/test + UI svelte-check/vitest/tsc/vite build + flutter analyze/test)

## License

MIT
