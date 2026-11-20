#!/usr/bin/env bash
# PomoFlow 生产库每日备份(腾讯云)—— pg_dump 自定义格式 + gzip,滚动保留 14 天。
#
# cron(每日 04:00;crontab -e):
#   0 4 * * * /opt/pomoflow/services/sync-server/deploy/backup.sh >> /opt/pomoflow/data/backups/backup.log 2>&1
#
# 恢复演练(验证矩阵 V9,建议每季度实际跑一次确认备份可用):
#   gunzip -c data/backups/pomoflow-<时间戳>.dump.gz > /tmp/restore.dump
#   docker run --rm -v /tmp/restore.dump:/restore.dump \
#     postgres:16-alpine \
#     pg_restore --no-owner --dbname="postgres://pomoflow:<POSTGRES_PASSWORD>@host.docker.internal:5432/pomoflow" /restore.dump
#   # 或恢复进一次性库后 psql 抽查 users/snapshots 行数与生产对齐
#
# 依赖:
#   - 宿主机 postgresql-client(pg_dump 大版本须与容器 server 一致,装 16:
#     apt install postgresql-client-16;Ubuntu 22.04 默认源无 16 时用 PGDG apt 源)
#   - 脚本定位:本文件在 services/sync-server/deploy/ 下,备份与 .env 都按
#     相对路径解析,整目录一起拷贝即可用
set -euo pipefail

DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$(dirname "$DEPLOY_DIR")"                    # services/sync-server/
BACKUP_DIR="$APP_DIR/data/backups"
ENV_FILE="$APP_DIR/.env"
KEEP_DAYS=14
STAMP="$(date +%Y%m%d-%H%M%S)"
OUT="$BACKUP_DIR/pomoflow-$STAMP.dump.gz"

[ -f "$ENV_FILE" ] || { echo "[backup] 找不到 $ENV_FILE"; exit 1; }
# 密码从 .env 读,不写死在脚本里(.env 不进仓库)
PGPASSWORD="$(grep -E '^POSTGRES_PASSWORD=' "$ENV_FILE" | head -1 | cut -d= -f2-)"
[ -n "$PGPASSWORD" ] || { echo "[backup] .env 缺 POSTGRES_PASSWORD"; exit 1; }
export PGPASSWORD

mkdir -p "$BACKUP_DIR"
pg_dump -Fc -h 127.0.0.1 -p 5432 -U pomoflow -d pomoflow | gzip > "$OUT"
find "$BACKUP_DIR" -name 'pomoflow-*.dump.gz' -mtime +"$KEEP_DAYS" -delete
echo "[$(date '+%F %T')] backup ok: $OUT ($(du -h "$OUT" | cut -f1))"
