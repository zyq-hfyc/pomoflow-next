# P1b 桌面端自动同步 + 启动同步 · 端到端验证 runbook

> **目的**:补多年 × 项「P1b 自动同步 + 启动同步」从代码到端到端验证。
>
> 状态(2026-08-23):
> - ✅ Rust 后端代码完整:`apps/desktop/src/sync_client.rs:286-355 spawn_auto_sync` 已有
>   启动 3s 后首次同步 + 每 30s 重读 meta 配置的循环;
> - ✅ Tauri 接线完整:`apps/desktop/src/lib.rs:149 sync_client::spawn_auto_sync(...)` 已在
>   `setup` 块启动;`spawn_auto_sync` 用 `tauri::async_runtime::spawn` 异步长驻;
> - ✅ UI 设置页完整:`apps/desktop/ui/src/components/Settings/SyncSetting.svelte:34` 开关,
>   `set_sync_config` 写 `auto_sync_enabled` + `sync_interval_min` 到 SQLite meta;
> - ✅ 服务端二进制已重编(`bash services/sync-server/build-local.sh`,2026-08-23
>   22:07 mtime,5.6M,21 个 endpoint 全 baked in);
> - ❌ **未做**:端到端跑一遍。本 runbook 就是补这一步。

## 1. 部署新二进制

新二进制含 P1d 全部改动(CORS / 邮箱 / 头像 / 注销 / 导出 / 登录记录 / post_with_auto_refresh),
老二进制是 2026-08-23 11:39 mtime,期间已合 5 个服务端 commit(895ff9a CORS、
1e13897 P1d 补全、09d9b4f 邮箱、5d3c79d register token 修复、b2fbb03 body limit)
都没进老二进制。

```bash
# 0. 上传新二进制 + 部署包
cd ~/projects/pomoflow-next
ls -la services/sync-server/bin/sync-server  # 确认 5.6M,mtime 2026-08-23 22:07

bash services/sync-server/pack-deploy.sh  # 产出 artifacts/pomoflow-sync-deploy-*.tar.gz
# 部署包走老链路即可,bin/sync-server 已是新版

# 1. 上 VM 替换
scp artifacts/pomoflow-sync-deploy-<stamp>.tar.gz <vm>:/tmp/
ssh <vm> "cd /opt/pomoflow && tar xzf /tmp/pomoflow-sync-deploy-<stamp>.tar.gz --overwrite"

# 2. 重启容器
ssh <vm> "cd /opt/pomoflow && docker compose up -d --build"
# (deploy 走 prebuilt 二进制,compose up 不重新编译,秒级启动)

# 3. 验证 healthz(应该立刻 200 OK)
curl -s http://<vm-ip>:8080/healthz
# 期望:{"ok":true,"service":"sync-server"}
```

## 2. 端到端验证(自动同步 + 启动同步)

### 2.1 服务端正确性(curl push/pull)

```bash
# 拿 token + user_id
RESP=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"username":"<test-user>","password":"<test-pwd>","device_id":"runbook-cli","device_name":"Runbook CLI"}' \
  http://<vm-ip>:8080/v1/auth/login)
TOKEN=$(echo $RESP | python -c 'import json,sys;print(json.load(sys.stdin)["access_token"])')
USER=$(echo $RESP | python -c 'import json,sys;print(json.load(sys.stdin)["user_id"])')
echo "TOKEN=${TOKEN:0:20}…  USER=$USER"

# push 一条 task(模拟桌面端写)
CHID=$(uuidgen | tr -d '-' | cut -c1-22)
TID=$(uuidgen)
curl -s -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"user_id\":\"$USER\",
    \"device_id\":\"runbook-cli\",
    \"changes\":[{
      \"id\":\"$CHID\",
      \"device_id\":\"runbook-cli\",
      \"entity\":\"task\",
      \"entity_id\":\"$TID\",
      \"revision\":1,
      \"updated_at\":\"2026-08-23T12:34:56.000Z\",
      \"payload\":{
        \"id\":\"$TID\",
        \"user_id\":\"$USER\",
        \"title\":\"runbook smoke task\",
        \"priority\":\"none\",
        \"status\":\"active\",
        \"estimated_pomodoros\":0,
        \"completed_pomodoros\":0
      }
    }]
  }" \
  http://<vm-ip>:8080/v1/sync/push
# 期望:results 数组有一个 Accepted{entity_id=..., revision=1}

# pull(用排除自己 device_id 'runbook-cli' 拿不到东西,改用 probe 模拟第二端)
curl -s -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" \
  -d "{\"user_id\":\"$USER\",\"device_id\":\"probe\",\"since\":{\"last_seq\":0}}" \
  http://<vm-ip>:8080/v1/sync/pull
# 期望:changes 数组含上面 push 的 task(只是 device_id 不同时看得到)
```

### 2.2 桌面端自动同步 E2E(`cargo tauri dev`)

```bash
# 1. 启 dev 模式,设置 → 数据同步:
#    - 服务器地址:http://<vm-ip>:8080
#    - 静态 token:<SYNC_TOKEN>(或登录账号用 JWT)
#    - 自动同步:开
#    - 间隔:1(分钟,跑通最快)
cd apps/desktop
cargo tauri dev

# 2. 等 3 秒(STARTUP_DELAY)→ 首次自动同步
#    验证:状态行显示「已同步 · hh:mm · 推送 X / 拉取 Y」
#    服务端日志:INFO sync completed pushed=X pulled=Y

# 3. 改间隔为 1 分钟,等 30s(TICK)→ 不应再同步(还没到 1 分钟)
#    验证:状态时间戳不刷新

# 4. 改间隔为 1,等 60s(>1 分钟)→ 应再同步一次
#    验证:状态时间戳刷新

# 5. 关自动同步,等 1 分钟 → 不应再同步
#    验证:状态时间戳停止刷新

# 6. 改地址/token 错误,等 30s → 状态行显示错误
#    验证:AppState.svelte 捕获 sync://auto 事件 ok=false 状态

# 7. 启时同步
#    - 启 tauri dev 之前先把任务改了(PomodoroSession complete 一条)
#    - 启 tauri dev → 等 3s → 看到 push 了一条
#    验证:启动同步 = STARTUP_DELAY 内的首次同步
```

### 2.3 30s 配置热更新

```bash
# 设 5 分钟 → 改 1 分钟 → 不重启 dev,30s 内立刻按 1 分钟节拍同步
# 验证:UI 状态行 ≤30s 反映新节拍(spawn_auto_sync line 304 每次 tick 重读 meta)
```

## 3. 验收清单

| 项 | 验证方法 | 通过条件 |
|---|----------|---------|
| 二进制含 P1d 全部改动 | `strings bin/sync-server \| grep auth/avatar` | 输出含 21 个 endpoint 路径 |
| 健康检查 | `curl /healthz` | `{"ok":true,...}` |
| Push round-trip | curl 2.1 步骤 | results 数组有 Accepted |
| Pull 排除自己 | curl 2.1 步骤 | 排除 device_id='runbook-cli' 时 changes=[] |
| 启动同步 | tauri dev 启动 3s 后自动同步一次 | UI 状态行刷新 |
| 30s tick | tauri dev 运行时 | 配置未到点不同步,到点同步 |
| 间隔配置热更新 | 改间隔后 ≤30s 生效 | UI 状态行按新节拍刷新 |
| 错误恢复 | 故意配错地址 | 状态显示错误信息,token 等自动恢复后下次同步成功 |
| 关闭自动同步 | 关闭开关 | UI 状态时间戳停止刷新 |

## 4. 故障排除

| 现象 | 排查 |
|------|------|
| UI 状态行不刷新 | `app.data.localStorage['sync://auto']` 看事件;查 `tauri.conf.json` 的 `withGlobalTauri` |
| 服务端 401 | JWT 过期 — `auth_change_password` 或重启容器清 token(再 login) |
| 服务端 403 user mismatch | desktop 端 user_id 与 login 响应不一致 — 重启 desktop 重新 login |
| 二进制没更新 | 重编时 cargo-zigbuild 静默失败 → `bash build-local.sh` 重跑;`stat -c '%y'` 看 mtime |
| 同步看似成功但 desktop 数据空 | 桌面端 `migrate::needs_migration` 重置 db → `~/.local/share/pomoflow/store.db` 删了再启 |

## 5. 验证完成后

勾掉 `docs/协作任务清单.md` 的 P1b × 项(本次实现已完整,只是缺端到端验证)。
下批可选:P3d-B-Phase-3 iOS/Android 真机编译前置,或桌面 P1b+ 腾讯云部署物料。
