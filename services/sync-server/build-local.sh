#!/usr/bin/env bash
# 在 Windows 本地交叉编译 sync-server → Linux 静态二进制,服务器免编译部署。
#
# 产出:services/sync-server/bin/sync-server
#   musl 静态链接,不依赖服务器上任何库/工具链,任何 x86_64 Linux 直接可跑。
# 之后运行 pack-deploy.sh 打包(自动带上此二进制),服务器上
#   docker compose up -d --build  只是拷贝二进制,秒级启动、零构建缓存。
#
# ── 一次性环境准备(每台开发机只做一次)──────────────────────────────
#   cargo install cargo-zigbuild --locked   # 交叉编译驱动(用 zig 当链接器)
#   python -m pip install ziglang           # zig 工具链(pip 版免手动下载安装)
#   rustup target add x86_64-unknown-linux-musl
#
# 用法: bash services/sync-server/build-local.sh
set -euo pipefail
cd "$(dirname "$0")/../.."   # 仓库根

TARGET=x86_64-unknown-linux-musl

command -v cargo-zigbuild >/dev/null \
  || { echo "✘ 缺少 cargo-zigbuild,先执行:cargo install cargo-zigbuild --locked"; exit 1; }

# zig 优先用 PATH 里的;没有则找 pip 装的 ziglang(把 zig.exe 所在目录挂进 PATH)。
# 注意:Python 返回的是 Windows 反斜杠路径,Git Bash 的 PATH 解析不了,
# 必须用 cygpath 转成 POSIX 格式(/d/... )再挂,否则 command -v zig 永远找不到。
if ! command -v zig >/dev/null; then
  ZIG_DIR="$(python -c 'import ziglang,os;print(os.path.dirname(ziglang.__file__))' 2>/dev/null \
    | cygpath -u -f - 2>/dev/null || true)"
  [ -n "$ZIG_DIR" ] && export PATH="$ZIG_DIR:$PATH"
fi
command -v zig >/dev/null \
  || { echo "✘ 缺少 zig,先执行:python -m pip install ziglang"; exit 1; }

rustup target add "$TARGET"
echo "▶ cargo zigbuild --release --locked -p sync-server --target $TARGET"
cargo zigbuild --release --locked -p sync-server --target "$TARGET"

mkdir -p services/sync-server/bin
cp "target/$TARGET/release/sync-server" services/sync-server/bin/sync-server
echo "✔ 产物:services/sync-server/bin/sync-server($(du -h services/sync-server/bin/sync-server | cut -f1))"
echo "  下一步:bash services/sync-server/pack-deploy.sh 打部署包(会自动带上此二进制)"
