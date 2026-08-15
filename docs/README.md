# pomoflow-next 文档

本目录放**本仓库内**的文档。所有架构原则、ADR(架构决策记录)、同步协议设计 → 一律查
原 `pomoflow` 仓库的 [`docs/architecture.md`](https://github.com/zyq-hfyc/pomoflow/blob/main/docs/architecture.md),
那是唯一权威来源。本仓库不另起 ADR,以免双份互相漂移。

## 本目录文件

| 文件 | 何时写 |
|------|--------|
| `migration.md` | P1 阶段:`tools/migrate-v1` CLI 完成时写用户操作手册(v1 → v2 数据迁移步骤) |
| `release.md` | P1 阶段:首次跨平台 release 后写打包流程 / 签名 / 自动更新策略 |
| `adr/` | **不创建**。所有 ADR 在原 `pomoflow/docs/architecture.md` 维护 |

## 跨仓库引用清单

- 权威架构 → [pomoflow/docs/architecture.md](https://github.com/zyq-hfyc/pomoflow/blob/main/docs/architecture.md)
- 数据模型语义参考 → [pomoflow/docs/database-schema.md](https://github.com/zyq-hfyc/pomoflow/blob/main/docs/database-schema.md)
- v1 业务规则(参考) → [pomoflow/backend/app/crud.py](https://github.com/zyq-hfyc/pomoflow/blob/main/backend/app/crud.py) + [models.py](https://github.com/zyq-hfyc/pomoflow/blob/main/backend/app/models.py)