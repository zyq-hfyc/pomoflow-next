#!/usr/bin/env bash
# 打包「服务器最小部署集」—— 排除 target/.git/node_modules 等本地噪音。
#
# 背景:整仓库 21G+(构建产物),服务器只需要源码子集 + docker compose 即可构建。
# 产物:target/pomoflow-sync-deploy-<日期>.tar.gz(约几 MB)
#
# 用法(仓库根或任意目录均可,脚本自定位):
#   bash services/sync-server/pack-deploy.sh
# 上传(三选一):
#   scp target/pomoflow-sync-deploy-*.tar.gz user@<vm-ip>:/opt/
#   或 WinSCP 拖拽 / VMware 共享文件夹
# 服务器解压部署:
#   tar -xzf pomoflow-sync-deploy-*.tar.gz
#   cd pomoflow-next/services/sync-server
#   cp .env.example .env && vim .env     # 填 SYNC_USER_ID / SYNC_TOKEN
#   docker compose up -d --build
set -euo pipefail

cd "$(dirname "$0")/../.."   # 仓库根
STAMP="$(date +%Y%m%d)"
OUT="target/pomoflow-sync-deploy-${STAMP}.tar.gz"
mkdir -p target

tar -czf "$OUT" \
  --exclude='pomoflow-next/target' \
  --exclude='pomoflow-next/.git' \
  --exclude='pomoflow-next/.claude' \
  --exclude='pomoflow-next/.github' \
  --exclude='pomoflow-next/docs' \
  --exclude='*/node_modules' \
  --exclude='*/dist' \
  -C .. pomoflow-next

SIZE="$(du -h "$OUT" | cut -f1)"
echo "✔ $OUT($SIZE)"
echo "  上传: scp $OUT user@<vm-ip>:/opt/"
