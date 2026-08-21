# PomoFlow sync-server 镜像(多阶段:构建 + 精简运行时)
# 构建上下文必须是仓库根(含 crates/core 的 path 依赖):
#   docker build -f services/sync-server/Dockerfile -t pomoflow-sync-server .

FROM rust:1-slim AS build
WORKDIR /app
COPY Cargo.toml Cargo.lock rust-toolchain.toml ./
COPY crates ./crates
COPY services/sync-server ./services/sync-server
RUN cargo build --release --locked -p sync-server

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/*
COPY --from=build /app/target/release/sync-server /usr/local/bin/sync-server
EXPOSE 8080
CMD ["sync-server"]
