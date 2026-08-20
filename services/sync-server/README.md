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
| GET | `/healthz` | 存活探针(含 DB 连通) |

认证:HTTP `Authorization: Bearer <SYNC_TOKEN>`(MVP 单账号;注册/JWT/Refresh
多账号体系是 P1b,ADR-007)。服务端强制请求 `user_id` 与 token 一致,不符即 403。

## 设计说明(P1a 简化)

设计文档 §8 原写"PG 表 = 本地 schema 同构";实现取**通用快照表 + changelog**:

- `snapshots(user_id, entity, entity_id, revision, updated_ms, device_id, payload JSONB)`
- `changelog(seq BIGSERIAL, user_id, change_id UNIQUE, device_id, change JSONB)`

理由:合并只依赖 Change 元信息,payload 对服务端不透明;镜像 10 张实体表在
当前阶段只增加维护成本(每加字段两端改)。**当 P1b/P4 需要 admin 查询、
Analytics 按字段统计时,再从快照展开实体表**(数据已在 JSONB 里,可回填)。
此偏差待后续以 ADR 固化。

## 部署(VMware Ubuntu 开发环境)

VM 网络用**桥接模式**(拿局域网 IP,宿主机 Windows 上的 PomoFlow 才连得到)。

```bash
# 1. 装 Docker(Ubuntu 22.04/24.04)
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER && newgrp docker

# 2. 起服务(仓库根目录)
cd pomoflow-next/services/sync-server
cp .env.example .env
#    编辑 .env:SYNC_USER_ID 换成你桌面端的 meta.user_id(桌面端接入后可查;
#    现阶段先用 .env 里的占位 UUID 也行,桌面端下一批支持在设置里填)
#    SYNC_TOKEN 换强随机值
docker compose up -d --build

# 3. 验证
curl http://127.0.0.1:8080/healthz
curl -H "Authorization: Bearer <SYNC_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"user_id":"<UUID>","device_id":"probe","since":{"last_seq":0}}' \
     http://127.0.0.1:8080/v1/sync/pull
```

宿主机 Windows 访问:`http://<Ubuntu 局域网 IP>:8080`(防火墙放行 8080:
`sudo ufw allow 8080/tcp`)。

## 迁移到腾讯云

代码不变,只换环境:安全组只放行 443(8080 不直接暴露),前置 nginx/caddy
做 HTTPS 反代,`POSTGRES_PASSWORD/SYNC_TOKEN` 换强值,PG 端口映射删除,
`pgdata` 卷配定期备份(`pg_dump` cron 到对象存储)。

## 本地开发(不用 Docker 跑 PG 的场景)

```bash
export DATABASE_URL=postgres://pomoflow:pomoflow-dev@127.0.0.1:5432/pomoflow
export SYNC_TOKEN=dev SYNC_USER_ID=<uuid>
cargo run -p sync-server
```
