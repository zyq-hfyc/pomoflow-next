# v1 → v2 数据迁移指南

把上一代 PomoFlow(v1,Python + SQLite)的 `pomoflow.db` 一键导入本代(Tauri 2)
的 `store.db`。全程只读 v1 库、只写 v2 库,失败不破坏 v1 数据。

## 什么时候需要

- 你在用 v1(PomoFlow 1.x),想把数据搬到 PomoFlow 2.x 继续使用
- v2 首次启动会创建空库;迁移 = 把 v1 的历史灌进去

## 迁移步骤

### 1. 找到 v1 数据库

v1 的 `pomoflow.db` 在 v1 程序目录(便携版)或其工作目录下,常见位置:

- v1 解压目录旁:`PomoFlow/pomoflow.db`
- 源码运行:`pomoflow/backend/pomoflow.db`

### 2. 先 dry-run(只统计不写)

```bash
# 在 pomoflow-next 仓库根
cargo run -p migrate-v1 --release -- \
  --from "C:\path\to\v1\pomoflow.db" \
  --to "%APPDATA%\pomoflow\store.db" \
  --dry-run
```

输出各表行数(projects / tags / tasks / task_tag / subtasks / pomodoros /
daily_rev / weekly_rev / monthly_rev / mottos),与 v1 里的数据量对一下。

### 3. 正式迁移

```bash
# 先退出 PomoFlow 2(托盘右键 → 退出),避免库被占用
cargo run -p migrate-v1 --release -- \
  --from "C:\path\to\v1\pomoflow.db" \
  --to "%APPDATA%\pomoflow\store.db"
```

- v2 目标库已存在时会**增量合并**(id 重新生成,重复执行不会产生重复行,
  但同一 v1 记录跑两次会生成两份新 id —— 建议只跑一次,或先备份/删除目标库)
- 迁移内容:项目树(parent 关系)/ 标签(display_order)/ 任务(含重复模板与
  实例的挂接、repeat_config、created 顺序)/ 任务-标签关联 / 子任务 /
  番茄会话 / 日·周·月复盘 / 自定义名言

### 4. 验证

启动 PomoFlow 2:任务清单、手账复盘、统计数字应与 v1 一致。

## 语义映射要点

| v1 | v2 |
|----|----|
| INTEGER 自增主键 | UUID v4(外键经映射表重指) |
| 中文枚举(准时/每天/自定义…) | Rust enum(serde snake_case) |
| `repeat_parent_id` | 迁移时重指向模板的新 UUID(模板先迁,实例后迁) |
| `subtasks`(无排序列) | 按 `(task_id, rowid)` 顺序编 `position` |
| 硬删除 | 软删除(`deleted_at_ms`;复盘族仍硬删,与 v1 一致) |

老版本 v1 库缺 `subtasks` / `mottos` 表时自动跳过对应数据(告警提示)。

## 回滚

迁移不修改 v1 库;v2 侧删掉 `store.db` 即回到空库重来。
桌面端在**结构迁移**前会自动留 `store.db.<时间戳>.bak` 备份。
