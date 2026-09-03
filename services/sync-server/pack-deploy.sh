#!/usr/bin/env bash
# 打包「服务器最小部署集」—— 排除 target/.git/node_modules 等本地噪音。
#
# 背景:服务器只需要 源码子集 + 预编译二进制 + docker compose 物料即可部署;
#       服务器端编译会吃 10-20G 磁盘(2026-08-22 事故),默认不走。
# 产物:artifacts/pomoflow-sync-deploy-<日期>.tar.gz(有预编译二进制时约 15-20M)
# 排除本地构建噪音:根/nested target、mobile build/.dart_tool/.gradle、
# node_modules/dist —— 2026-09-03 修复:mobile 构建目录 3.1G 曾把包撑到 1.2G。
#
# 用法(仓库根或任意目录均可,脚本自定位):
#   bash services/sync-server/build-local.sh    # ① 先在本地交叉编译出二进制(改代码后需重跑)
#   bash services/sync-server/pack-deploy.sh    # ② 再打部署包
# 上传(三选一):
#   scp artifacts/pomoflow-sync-deploy-*.tar.gz yongchao@<vm-ip>:/home/yongchao/
#   或 WinSCP 拖拽 / VMware 共享文件夹
# 服务器解压部署:
#   tar -xzf pomoflow-sync-deploy-*.tar.gz
#   cd pomoflow-next/services/sync-server
#   cp .env.example .env && vim .env     # 填 SYNC_USER_ID / SYNC_TOKEN
#   docker compose up -d --build         # 预编译路径:秒级,仅拷贝二进制
set -euo pipefail

cd "$(dirname "$0")/../.."   # 仓库根
STAMP="$(date +%Y%m%d)"
OUT="artifacts/pomoflow-sync-deploy-${STAMP}.tar.gz"
mkdir -p artifacts

BIN="services/sync-server/bin/sync-server"
if [ -f "$BIN" ]; then
  echo "✔ 检测到预编译二进制 → 部署包走「免编译」路径(服务器构建秒级、零缓存)"
else
  echo "⚠ 未找到 $BIN"
  echo "  部署包将退回「服务器端构建」模式:需在服务器上编译 Rust,"
  echo "  构建缓存+镜像层实测占 10-20G 磁盘,40G 小盘会被塞满(2026-08-22 事故)。"
  echo "  强烈建议先在本地执行: bash services/sync-server/build-local.sh"
fi

tar -czf "$OUT" \
  --exclude='pomoflow-next/target' \
  --exclude='pomoflow-next/apps/desktop/target' \
  --exclude='pomoflow-next/tools/migrate-v1/target' \
  --exclude='pomoflow-next/apps/mobile/build' \
  --exclude='pomoflow-next/apps/mobile/.dart_tool' \
  --exclude='pomoflow-next/.git' \
  --exclude='pomoflow-next/.claude' \
  --exclude='pomoflow-next/.github' \
  --exclude='pomoflow-next/docs' \
  --exclude='pomoflow-next/artifacts' \
  --exclude='*/.env' \
  --exclude='*/node_modules' \
  --exclude='*/dist' \
  --exclude='*/.gradle' \
  -C .. pomoflow-next

SIZE="$(du -h "$OUT" | cut -f1)"
echo "✔ $OUT($SIZE)"
echo "  上传: scp $OUT yongchao@<vm-ip>:/home/yongchao/"
