#!/usr/bin/env bash
# 首版发布脚本 —— 无 admin-bff 期的手动发布通道:建版本 → 传安装包 → publish。
# 管理面 /internal/* 不经公网 nginx(已 404),**在服务器上对本机回环执行**:
#   cd services/sync-server/deploy && ./first-release.sh <版本号> <安装包目录>
# (admin-bff 上云后本脚本退役,发布走后台页面)
#
# 安装包目录命名约定(tauri-action 产物 + 移动端 APK;缺哪个平台跳哪个,
# 至少一个;ios/harmony 当前无构建线,槽位留空):
#   windows: PomoFlow_<版本>_x64-setup.exe      (NSIS)
#   linux  : PomoFlow_<版本>_amd64.deb
#   mac    : PomoFlow_<版本>_aarch64.dmg
#   android: PomoFlow_<版本>-android.apk
#
# 验证:浏览器/curl 访问 http://<IP>/api/public/releases/latest 应见本版本。
set -euo pipefail

VERSION="${1:?用法: first-release.sh <版本号> <安装包目录>}"
SRC_DIR="${2:?用法: first-release.sh <版本号> <安装包目录>}"
BASE="${BASE:-http://127.0.0.1:8080}"

DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$(dirname "$DEPLOY_DIR")/.env"
[ -f "$ENV_FILE" ] || { echo "找不到 $ENV_FILE"; exit 1; }
TOKEN="$(grep -E '^INTERNAL_SERVICE_TOKEN=' "$ENV_FILE" | head -1 | cut -d= -f2-)"
[ -n "$TOKEN" ] || { echo ".env 缺 INTERNAL_SERVICE_TOKEN"; exit 1; }
AUTH="Authorization: Bearer $TOKEN"

command -v jq >/dev/null || { echo "需要 jq: sudo apt install jq"; exit 1; }
[ -d "$SRC_DIR" ] || { echo "安装包目录不存在: $SRC_DIR"; exit 1; }

echo "== 建版本 $VERSION =="
CREATE_RESP="$(curl -sf -X POST "$BASE/internal/releases" -H "$AUTH" \
  -H 'Content-Type: application/json' \
  -d "{\"version\":\"$VERSION\",\"notes\":\"PomoFlow $VERSION\"}")" || {
  echo "建版本失败(版本号已存在?)—— 列表现状:"
  curl -sf "$BASE/internal/releases" -H "$AUTH" | jq '.items[].version'
  exit 1
}
RID="$(printf '%s' "$CREATE_RESP" | jq -r .id)"
echo "release id: $RID"

# upload <本地文件名> <平台> —— 4xx/5xx 直接终止(set -e),错误体透出
upload() {
  local f="$1" p="$2" path="$SRC_DIR/$1"
  if [ ! -f "$path" ]; then
    echo "-- 跳过 $p(缺 $f)"
    return 0
  fi
  echo "-- 上传 $p: $f($(du -h "$path" | cut -f1))"
  curl -sf -X POST --fail-with-body --data-binary "@$path" \
    "$BASE/internal/releases/$RID/assets?platform=$p&filename=$f" \
    -H "$AUTH" >/dev/null
}

upload "PomoFlow_${VERSION}_x64-setup.exe" windows
upload "PomoFlow_${VERSION}_amd64.deb" linux
upload "PomoFlow_${VERSION}_aarch64.dmg" mac
upload "PomoFlow_${VERSION}-android.apk" android

echo "== publish =="
curl -sf -X POST "$BASE/internal/releases/$RID/publish" -H "$AUTH" >/dev/null
echo "完成:GET $BASE/api/public/releases/latest 应已包含 $VERSION"
