# PomoFlow sync-server 镜像(多阶段:构建 + 精简运行时)
# 构建上下文必须是仓库根(.dockerignore 黑名单负责瘦身;
# workspace 四成员的 manifest 必须齐全,否则 cargo 解析直接失败):
#   docker build -f services/sync-server/Dockerfile -t pomoflow-sync-server .

FROM rust:1-slim AS build
WORKDIR /app
# 整仓源码(几 MB):根清单 + lock(toolchain)+ 四个 workspace 成员
COPY . .
RUN cargo build --release --locked -p sync-server

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/*
COPY --from=build /app/target/release/sync-server /usr/local/bin/sync-server
EXPOSE 8080
CMD ["sync-server"]
