//! 发布分发(ADR-013):版本与安装包资产的管理面 + 公开下载面。
//!
//! - 管理面 `/internal/releases*`:Admin BFF 经服务间通道调用(ADR-008),
//!   由 main.rs 的 service-token route_layer 统一覆盖;上传为**原始字节流**
//!   (无 multipart),逐帧落盘 + 滚动 sha256。
//! - 公开面 `/api/public/*`:无鉴权只读,官网与各端下载入口;
//!   下载 URL 只暴露资产 UUID,存储路径永不出库。

use std::collections::HashMap;
use std::net::SocketAddr;

use axum::body::Body;
use axum::extract::{ConnectInfo, DefaultBodyLimit, Path, Query, State};
use axum::http::{header, HeaderMap, StatusCode};
use axum::response::{IntoResponse, Response};
use axum::routing::{delete, get, post};
use axum::{Json, Router};
use http_body_util::BodyExt;
use percent_encoding::{percent_decode_str, utf8_percent_encode, NON_ALPHANUMERIC};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use sqlx::PgPool;
use tokio::io::AsyncWriteExt;
use tokio_util::io::ReaderStream;

use crate::state::AppState;

type ApiError = (StatusCode, String);

fn internal(e: sqlx::Error) -> ApiError {
    log::error!("database error: {e}");
    (
        StatusCode::INTERNAL_SERVER_ERROR,
        crate::errors::INTERNAL_ERROR_MESSAGE.to_string(),
    )
}

/// 平台清单(官网下载区的固定顺序即此序)
pub const PLATFORMS: [&str; 6] = ["windows", "linux", "mac", "ios", "android", "harmony"];

/// 安装包扩展白名单(单段;`.tar.gz` 这类多段扩展末段不在表内 → 自然拒绝)
const EXT_WHITELIST: [&str; 12] = [
    "exe", "msi", "zip", "appimage", "deb", "rpm", "dmg", "pkg", "ipa", "apk", "hap", "app",
];

/// 展示名最大字节数
const DISPLAY_NAME_MAX_BYTES: usize = 200;
/// 内部列表单页上限(发布频率极低,无需分页)
const RELEASES_LIST_LIMIT: i64 = 200;

// ============ 纯逻辑助手(含单测) ============

fn parse_platform(s: &str) -> Option<&'static str> {
    PLATFORMS.iter().copied().find(|p| *p == s)
}

/// 取文件名最后一段扩展(不含点)并校验白名单,返回小写形式。
fn validate_ext(filename: &str) -> Option<&'static str> {
    let (_, ext) = filename.rsplit_once('.')?;
    if ext.is_empty() || ext.len() > 8 {
        return None;
    }
    let lower = ext.to_ascii_lowercase();
    EXT_WHITELIST.iter().copied().find(|w| *w == lower)
}

/// 展示名清洗:剥控制字符与 `"` `\` `/`(防头注入与路径混淆),去两端空白与
/// 尾部点,按 UTF-8 字符边界截 200 字节。仅用于 Content-Disposition 与展示,
/// 磁盘文件名永远是服务端生成的 `{uuid}.{ext}`。
fn sanitize_display_name(name: &str) -> String {
    let cleaned: String = name
        .chars()
        .filter(|c| !c.is_control() && !matches!(c, '"' | '\\' | '/'))
        .collect();
    let trimmed = cleaned.trim().trim_end_matches(['.', ' ']);
    let mut out = String::new();
    for c in trimmed.chars() {
        if out.len() + c.len_utf8() > DISPLAY_NAME_MAX_BYTES {
            break;
        }
        out.push(c);
    }
    out
}

/// 版本号格式:非空、≤50 字符、仅字母数字与 `.-_+`。
fn valid_version(v: &str) -> bool {
    let v = v.trim();
    !v.is_empty()
        && v.len() <= 50
        && v.chars()
            .all(|c| c.is_ascii_alphanumeric() || matches!(c, '.' | '-' | '_' | '+'))
}

/// 版本比较:数字段按数值("0.2.10" > "0.2.9");段类型不一致回退字符串序;
/// 前缀相等时长版更高("1.0.1" > "1.0");prerelease(连字符)低于同级正式版。
fn compare_versions(a: &str, b: &str) -> std::cmp::Ordering {
    use std::cmp::Ordering::*;
    fn core(v: &str) -> (&str, bool) {
        match v.split_once('-') {
            Some((c, _)) => (c, true),
            None => (v, false),
        }
    }
    let (ca, pa) = core(a.trim());
    let (cb, pb) = core(b.trim());
    let mut sa = ca.split('.');
    let mut sb = cb.split('.');
    loop {
        match (sa.next(), sb.next()) {
            (None, None) => break,
            (Some(_), None) => return Greater,
            (None, Some(_)) => return Less,
            (Some(x), Some(y)) => {
                let ord = match (x.parse::<i64>(), y.parse::<i64>()) {
                    (Ok(nx), Ok(ny)) => nx.cmp(&ny),
                    _ => x.cmp(y),
                };
                if ord != Equal {
                    return ord;
                }
            }
        }
    }
    if pa != pb {
        return if pa { Less } else { Greater };
    }
    a.trim().cmp(b.trim())
}

fn to_hex(bytes: &[u8]) -> String {
    bytes.iter().map(|b| format!("{b:02x}")).collect()
}

fn cap_message(cap: u64) -> String {
    format!("安装包超过上限 {} MiB", cap / 1024 / 1024)
}

// ============ 响应结构(平铺,对齐 internal_handlers 风格) ============

/// 资产行(fetch_assets 组装用;release_id 走分组键,不进结构体)
struct AssetRow {
    id: String,
    platform: String,
    filename: String,
    size_bytes: i64,
    sha256: String,
    download_count: i64,
    created_ms: i64,
}

#[derive(Deserialize)]
struct CreateReleaseBody {
    version: String,
    #[serde(default)]
    notes: String,
}

#[derive(Serialize)]
struct InternalAssetJson {
    id: String,
    platform: String,
    filename: String,
    size_bytes: i64,
    sha256: String,
    download_count: i64,
    created_ms: i64,
    /// 公开下载相对路径(BFF 拼 RELEASE_DOWNLOAD_BASE_URL 供后台复制链接)
    download_path: String,
}

#[derive(Serialize)]
struct InternalReleaseJson {
    id: String,
    version: String,
    notes: String,
    status: String,
    created_ms: i64,
    published_ms: Option<i64>,
    assets: Vec<InternalAssetJson>,
}

#[derive(Serialize)]
struct InternalReleaseListResponse {
    items: Vec<InternalReleaseJson>,
}

#[derive(Serialize)]
struct PublishResponse {
    id: String,
    status: String,
}

#[derive(Serialize)]
struct AssetJson {
    id: String,
    platform: String,
    filename: String,
    size_bytes: i64,
    download_count: i64,
}

#[derive(Serialize)]
struct PublicReleaseJson {
    id: String,
    version: String,
    notes: String,
    published_ms: i64,
    assets: Vec<AssetJson>,
}

#[derive(Serialize)]
struct PublicReleasesResponse {
    items: Vec<PublicReleaseJson>,
}

// ============ 路由 ============

/// 管理面(并入 /internal,由 main.rs 的 service-token route_layer 覆盖)。
/// `upload_cap` 挂在**方法路由层**:内层扩展覆盖 main.rs 最外层的全局 8MB
/// DefaultBodyLimit —— 若只改全局,所有端点被放宽;若不挂这层,大包必 413。
pub fn internal_router(upload_cap: u64) -> Router<AppState> {
    let cap = usize::try_from(upload_cap).unwrap_or(usize::MAX);
    Router::new()
        .route(
            "/internal/releases",
            get(list_releases).post(create_release),
        )
        .route(
            "/internal/releases/{id}/assets",
            post(upload_asset).layer(DefaultBodyLimit::max(cap)),
        )
        .route("/internal/releases/{id}/publish", post(publish_release))
        .route("/internal/releases/{id}/unpublish", post(unpublish_release))
        .route("/internal/releases/{id}", delete(delete_release))
        .route("/internal/assets/{id}", delete(delete_asset))
}

/// 公开面(无鉴权只读)
pub fn public_router() -> Router<AppState> {
    Router::new()
        .route("/api/public/releases", get(public_releases))
        .route("/api/public/releases/latest", get(public_latest))
        .route("/api/public/download/{asset_id}", get(download))
}

// ============ 管理面 handlers ============

/// 全状态版本列表(管理台;发布频率极低,固定上限不分页)
async fn list_releases(
    State(app): State<AppState>,
) -> Result<Json<InternalReleaseListResponse>, ApiError> {
    type ReleaseRow = (String, String, String, String, i64, Option<i64>);
    let releases: Vec<ReleaseRow> = sqlx::query_as(
        "SELECT id, version, notes, status, created_ms, published_ms \
         FROM releases ORDER BY created_ms DESC LIMIT $1",
    )
    .bind(RELEASES_LIST_LIMIT)
    .fetch_all(&app.pool)
    .await
    .map_err(internal)?;

    let ids: Vec<String> = releases.iter().map(|r| r.0.clone()).collect();
    let mut assets = fetch_assets(&app.pool, &ids).await?;

    let items = releases
        .into_iter()
        .map(|(id, version, notes, status, created_ms, published_ms)| {
            let own = assets.remove(&id).unwrap_or_default();
            InternalReleaseJson {
                id,
                version,
                notes,
                status,
                created_ms,
                published_ms,
                assets: own
                    .into_iter()
                    .map(|a| InternalAssetJson {
                        download_path: format!("/api/public/download/{}", a.id),
                        id: a.id,
                        platform: a.platform,
                        filename: a.filename,
                        size_bytes: a.size_bytes,
                        sha256: a.sha256,
                        download_count: a.download_count,
                        created_ms: a.created_ms,
                    })
                    .collect(),
            }
        })
        .collect();

    Ok(Json(InternalReleaseListResponse { items }))
}

/// 资产批量拉取并按 release_id 分组(内部列表 / 公开列表共用)
async fn fetch_assets(
    pool: &PgPool,
    release_ids: &[String],
) -> Result<HashMap<String, Vec<AssetRow>>, ApiError> {
    if release_ids.is_empty() {
        return Ok(HashMap::new());
    }
    type Row = (String, String, String, String, i64, String, i64, i64);
    let rows: Vec<Row> = sqlx::query_as(
        "SELECT id, release_id, platform, filename, size_bytes, sha256, download_count, created_ms \
         FROM release_assets WHERE release_id = ANY($1) ORDER BY created_ms",
    )
    .bind(release_ids.to_vec())
    .fetch_all(pool)
    .await
    .map_err(internal)?;

    let mut grouped: HashMap<String, Vec<AssetRow>> = HashMap::new();
    for (id, release_id, platform, filename, size_bytes, sha256, download_count, created_ms) in rows
    {
        let asset = AssetRow {
            id,
            platform,
            filename,
            size_bytes,
            sha256,
            download_count,
            created_ms,
        };
        grouped.entry(release_id).or_default().push(asset);
    }
    Ok(grouped)
}

/// 建版本(draft;version 唯一,重复 409)
async fn create_release(
    State(app): State<AppState>,
    Json(body): Json<CreateReleaseBody>,
) -> Result<(StatusCode, Json<InternalReleaseJson>), ApiError> {
    let version = body.version.trim().to_string();
    if !valid_version(&version) {
        return Err((
            StatusCode::BAD_REQUEST,
            "版本号非法:非空、≤50 字符、仅字母数字与 .-_+".to_string(),
        ));
    }
    let id = uuid::Uuid::new_v4().to_string();
    let now = chrono::Utc::now().timestamp_millis();
    let inserted = sqlx::query(
        "INSERT INTO releases (id, version, notes, status, created_ms) \
         VALUES ($1, $2, $3, 'draft', $4) ON CONFLICT (version) DO NOTHING",
    )
    .bind(&id)
    .bind(&version)
    .bind(body.notes.trim())
    .bind(now)
    .execute(&app.pool)
    .await
    .map_err(internal)?;
    if inserted.rows_affected() == 0 {
        return Err((StatusCode::CONFLICT, "版本号已存在".to_string()));
    }
    Ok((
        StatusCode::CREATED,
        Json(InternalReleaseJson {
            id,
            version,
            notes: body.notes.trim().to_string(),
            status: "draft".to_string(),
            created_ms: now,
            published_ms: None,
            assets: Vec::new(),
        }),
    ))
}

#[derive(Deserialize)]
struct UploadAssetQuery {
    platform: String,
    #[serde(default)]
    filename: Option<String>,
}

/// 上传安装包(原始字节流):临时文件逐帧落盘 + 滚动 sha256 → rename 成正式名
/// → 同(版本,平台)替换旧资产。**本路由单独放宽 body limit(见 internal_router)**。
async fn upload_asset(
    State(app): State<AppState>,
    Path(release_id): Path<String>,
    Query(q): Query<UploadAssetQuery>,
    headers: HeaderMap,
    request: axum::extract::Request,
) -> Result<Json<InternalAssetJson>, ApiError> {
    let Some(platform) = parse_platform(&q.platform) else {
        return Err((
            StatusCode::BAD_REQUEST,
            format!("platform 非法,合法值:{}", PLATFORMS.join("/")),
        ));
    };
    // 展示名:X-Filename 头(BFF QueryEscape 转发)优先,query 兜底
    let raw_name = headers
        .get("x-filename")
        .and_then(|v| v.to_str().ok())
        .map(|v| percent_decode_str(v).decode_utf8_lossy().to_string())
        .or(q.filename)
        .unwrap_or_default();
    let display = sanitize_display_name(&raw_name);
    if display.is_empty() {
        return Err((
            StatusCode::BAD_REQUEST,
            "文件名缺失或全为非法字符".to_string(),
        ));
    }
    let Some(ext) = validate_ext(&display) else {
        return Err((
            StatusCode::BAD_REQUEST,
            format!("不支持的文件类型,白名单:{}", EXT_WHITELIST.join("/")),
        ));
    };
    let Some(dir) = app.release_files_dir.clone() else {
        return Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            "RELEASE_FILES_DIR 未配置,发布分发未启用".to_string(),
        ));
    };
    // Content-Length 头预检(流式计数器仍是最终权威:漏发/谎报长度时靠它拦)
    if let Some(len) = headers
        .get(header::CONTENT_LENGTH)
        .and_then(|v| v.to_str().ok())
        .and_then(|v| v.parse::<u64>().ok())
    {
        if len > app.release_upload_cap {
            return Err((
                StatusCode::PAYLOAD_TOO_LARGE,
                cap_message(app.release_upload_cap),
            ));
        }
    }
    // 版本必须存在(状态不限:已发布版本允许重传替换,属热修复通道;审计在 BFF 侧留痕)
    let exists: Option<String> = sqlx::query_scalar("SELECT id FROM releases WHERE id = $1")
        .bind(&release_id)
        .fetch_optional(&app.pool)
        .await
        .map_err(internal)?;
    if exists.is_none() {
        return Err((StatusCode::NOT_FOUND, "版本不存在".to_string()));
    }

    // 流式落盘:每条错误路径都必须清掉临时文件(客户端中途断开是常态失败模式)
    let tmp_path = dir.join(format!(".tmp-{}", uuid::Uuid::new_v4()));
    let mut hasher = Sha256::new();
    let stream_result: Result<u64, ApiError> = async {
        let mut file = tokio::fs::File::create(&tmp_path).await.map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("创建临时文件失败: {e}"),
            )
        })?;
        let mut body = request.into_body();
        let mut total: u64 = 0;
        while let Some(frame) = body.frame().await {
            let frame =
                frame.map_err(|e| (StatusCode::BAD_REQUEST, format!("读取上传流失败: {e}")))?;
            let bytes = frame
                .into_data()
                .map_err(|_| (StatusCode::BAD_REQUEST, "上传流包含非数据帧".to_string()))?;
            total += bytes.len() as u64;
            if total > app.release_upload_cap {
                return Err((
                    StatusCode::PAYLOAD_TOO_LARGE,
                    cap_message(app.release_upload_cap),
                ));
            }
            hasher.update(&bytes);
            file.write_all(&bytes)
                .await
                .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, format!("写盘失败: {e}")))?;
        }
        file.flush().await.map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("写盘刷洗失败: {e}"),
            )
        })?;
        Ok(total)
    }
    .await;
    let total = match stream_result {
        Ok(n) => n,
        Err(err) => {
            let _ = tokio::fs::remove_file(&tmp_path).await;
            return Err(err);
        }
    };
    if total == 0 {
        let _ = tokio::fs::remove_file(&tmp_path).await;
        return Err((StatusCode::BAD_REQUEST, "上传内容为空".to_string()));
    }
    let sha256 = to_hex(&hasher.finalize());

    // 改名落定(新 uuid,Windows 上不会撞已有目标)
    let storage_name = format!("{}.{ext}", uuid::Uuid::new_v4());
    let final_path = dir.join(&storage_name);
    if let Err(e) = tokio::fs::rename(&tmp_path, &final_path).await {
        let _ = tokio::fs::remove_file(&tmp_path).await;
        return Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("落盘改名失败: {e}"),
        ));
    }

    // 入库:同 (release_id, platform) 替换旧资产;任一步失败删新文件
    let asset_id = uuid::Uuid::new_v4().to_string();
    let now = chrono::Utc::now().timestamp_millis();
    let mut tx = app.pool.begin().await.map_err(internal)?;
    let old: Option<(String, String)> = sqlx::query_as(
        "SELECT id, storage_path FROM release_assets \
         WHERE release_id = $1 AND platform = $2 FOR UPDATE",
    )
    .bind(&release_id)
    .bind(platform)
    .fetch_optional(&mut *tx)
    .await
    .map_err(internal)?;
    if let Some((old_id, _)) = &old {
        sqlx::query("DELETE FROM release_assets WHERE id = $1")
            .bind(old_id)
            .execute(&mut *tx)
            .await
            .map_err(internal)?;
    }
    let insert = sqlx::query(
        "INSERT INTO release_assets \
         (id, release_id, platform, filename, ext, size_bytes, sha256, storage_path, download_count, created_ms) \
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0, $9)",
    )
    .bind(&asset_id)
    .bind(&release_id)
    .bind(platform)
    .bind(&display)
    .bind(ext)
    .bind(i64::try_from(total).unwrap_or(i64::MAX))
    .bind(&sha256)
    .bind(&storage_name)
    .bind(now)
    .execute(&mut *tx)
    .await;
    if let Err(e) = insert {
        let _ = tokio::fs::remove_file(&final_path).await;
        return Err(internal(e));
    }
    if let Err(e) = tx.commit().await {
        let _ = tokio::fs::remove_file(&final_path).await;
        return Err(internal(e));
    }
    // 成功后清理被替换的旧文件(best-effort,失败仅留孤儿文件不影响正确性)
    if let Some((_, old_path)) = old {
        if let Err(e) = tokio::fs::remove_file(dir.join(old_path)).await {
            log::warn!("旧安装包清理失败(孤儿文件): {e}");
        }
    }

    Ok(Json(InternalAssetJson {
        download_path: format!("/api/public/download/{asset_id}"),
        id: asset_id,
        platform: platform.to_string(),
        filename: display,
        size_bytes: i64::try_from(total).unwrap_or(i64::MAX),
        sha256,
        download_count: 0,
        created_ms: now,
    }))
}

async fn publish_release(
    State(app): State<AppState>,
    Path(release_id): Path<String>,
) -> Result<Json<PublishResponse>, ApiError> {
    let now = chrono::Utc::now().timestamp_millis();
    let r = sqlx::query(
        "UPDATE releases SET status = 'published', published_ms = COALESCE(published_ms, $2) \
         WHERE id = $1",
    )
    .bind(&release_id)
    .bind(now)
    .execute(&app.pool)
    .await
    .map_err(internal)?;
    if r.rows_affected() == 0 {
        return Err((StatusCode::NOT_FOUND, "版本不存在".to_string()));
    }
    Ok(Json(PublishResponse {
        id: release_id,
        status: "published".to_string(),
    }))
}

async fn unpublish_release(
    State(app): State<AppState>,
    Path(release_id): Path<String>,
) -> Result<Json<PublishResponse>, ApiError> {
    let r = sqlx::query("UPDATE releases SET status = 'unpublished' WHERE id = $1")
        .bind(&release_id)
        .execute(&app.pool)
        .await
        .map_err(internal)?;
    if r.rows_affected() == 0 {
        return Err((StatusCode::NOT_FOUND, "版本不存在".to_string()));
    }
    Ok(Json(PublishResponse {
        id: release_id,
        status: "unpublished".to_string(),
    }))
}

/// 删版本(仅 draft/unpublished;published 先下架 —— 防误删线上下载源)。
/// 行由 FK ON DELETE CASCADE 级联,文件 best-effort 清理。
async fn delete_release(
    State(app): State<AppState>,
    Path(release_id): Path<String>,
) -> Result<StatusCode, ApiError> {
    let status: Option<String> = sqlx::query_scalar("SELECT status FROM releases WHERE id = $1")
        .bind(&release_id)
        .fetch_optional(&app.pool)
        .await
        .map_err(internal)?;
    let Some(status) = status else {
        return Err((StatusCode::NOT_FOUND, "版本不存在".to_string()));
    };
    if status == "published" {
        return Err((
            StatusCode::CONFLICT,
            "已发布版本不可删除,请先下架".to_string(),
        ));
    }
    let paths: Vec<String> =
        sqlx::query_scalar("SELECT storage_path FROM release_assets WHERE release_id = $1")
            .bind(&release_id)
            .fetch_all(&app.pool)
            .await
            .map_err(internal)?;
    sqlx::query("DELETE FROM releases WHERE id = $1")
        .bind(&release_id)
        .execute(&app.pool)
        .await
        .map_err(internal)?;
    if let Some(dir) = app.release_files_dir.clone() {
        for p in paths {
            if let Err(e) = tokio::fs::remove_file(dir.join(p)).await {
                log::warn!("安装包清理失败(孤儿文件): {e}");
            }
        }
    }
    Ok(StatusCode::NO_CONTENT)
}

/// 删单个资产(同删除语义:published 版本先下架)
async fn delete_asset(
    State(app): State<AppState>,
    Path(asset_id): Path<String>,
) -> Result<StatusCode, ApiError> {
    let row: Option<(String, String)> = sqlx::query_as(
        "SELECT r.status, a.storage_path FROM release_assets a \
         JOIN releases r ON r.id = a.release_id WHERE a.id = $1",
    )
    .bind(&asset_id)
    .fetch_optional(&app.pool)
    .await
    .map_err(internal)?;
    let Some((status, storage_path)) = row else {
        return Err((StatusCode::NOT_FOUND, "资产不存在".to_string()));
    };
    if status == "published" {
        return Err((
            StatusCode::CONFLICT,
            "已发布版本的资产不可删除,请先下架".to_string(),
        ));
    }
    sqlx::query("DELETE FROM release_assets WHERE id = $1")
        .bind(&asset_id)
        .execute(&app.pool)
        .await
        .map_err(internal)?;
    if let Some(dir) = app.release_files_dir.clone() {
        if let Err(e) = tokio::fs::remove_file(dir.join(storage_path)).await {
            log::warn!("安装包清理失败(孤儿文件): {e}");
        }
    }
    Ok(StatusCode::NO_CONTENT)
}

// ============ 公开面 handlers ============

async fn public_releases(
    State(app): State<AppState>,
) -> Result<Json<PublicReleasesResponse>, ApiError> {
    let items = published_releases(&app.pool).await?;
    Ok(Json(PublicReleasesResponse { items }))
}

async fn public_latest(State(app): State<AppState>) -> Result<Json<PublicReleaseJson>, ApiError> {
    let items = published_releases(&app.pool).await?;
    items
        .into_iter()
        .next()
        .ok_or_else(|| (StatusCode::NOT_FOUND, "暂无发布版本".to_string()))
        .map(Json)
}

/// 已发布版本(版本号降序)+ 各平台资产
async fn published_releases(pool: &PgPool) -> Result<Vec<PublicReleaseJson>, ApiError> {
    type ReleaseRow = (String, String, String, i64);
    let releases: Vec<ReleaseRow> = sqlx::query_as(
        "SELECT id, version, notes, COALESCE(published_ms, created_ms) \
         FROM releases WHERE status = 'published'",
    )
    .fetch_all(pool)
    .await
    .map_err(internal)?;

    let ids: Vec<String> = releases.iter().map(|r| r.0.clone()).collect();
    let mut grouped = fetch_assets(pool, &ids).await?;

    let mut items: Vec<PublicReleaseJson> = releases
        .into_iter()
        .map(|(id, version, notes, published_ms)| {
            let own = grouped.remove(&id).unwrap_or_default();
            PublicReleaseJson {
                id,
                version,
                notes,
                published_ms,
                assets: own
                    .into_iter()
                    .map(|a| AssetJson {
                        id: a.id,
                        platform: a.platform,
                        filename: a.filename,
                        size_bytes: a.size_bytes,
                        download_count: a.download_count,
                    })
                    .collect(),
            }
        })
        .collect();
    items.sort_by(|a, b| compare_versions(&b.version, &a.version));
    Ok(items)
}

/// 流式下载:先自增计数(best-effort)再回流;响应开始后不得再做任何副作用。
async fn download(
    State(app): State<AppState>,
    Path(asset_id): Path<String>,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
) -> Result<Response, ApiError> {
    if !app.release_limiter.check(addr.ip()) {
        return Ok((
            StatusCode::TOO_MANY_REQUESTS,
            [("Retry-After", "60")],
            "下载过于频繁,请一分钟后再试",
        )
            .into_response());
    }
    let Some(dir) = app.release_files_dir.clone() else {
        return Err((StatusCode::NOT_FOUND, "资产不存在".to_string()));
    };
    let row: Option<(String, String, i64, String)> = sqlx::query_as(
        "SELECT a.storage_path, a.filename, a.size_bytes, r.status \
         FROM release_assets a JOIN releases r ON r.id = a.release_id WHERE a.id = $1",
    )
    .bind(&asset_id)
    .fetch_optional(&app.pool)
    .await
    .map_err(internal)?;
    let Some((storage_path, filename, size_bytes, status)) = row else {
        return Err((StatusCode::NOT_FOUND, "资产不存在".to_string()));
    };
    if status != "published" {
        return Err((StatusCode::NOT_FOUND, "资产不存在".to_string()));
    }
    let _ =
        sqlx::query("UPDATE release_assets SET download_count = download_count + 1 WHERE id = $1")
            .bind(&asset_id)
            .execute(&app.pool)
            .await;

    let file = match tokio::fs::File::open(dir.join(&storage_path)).await {
        Ok(f) => f,
        Err(e) => {
            log::error!("安装包文件缺失({storage_path}): {e}");
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                "文件暂不可用".to_string(),
            ));
        }
    };
    // Content-Disposition:ASCII 兜底 + RFC 5987 UTF-8(中文文件名)
    let ascii: String = filename
        .chars()
        .map(|c| {
            if c.is_ascii_alphanumeric() || matches!(c, '.' | '_' | '-') {
                c
            } else {
                '_'
            }
        })
        .collect();
    let encoded = utf8_percent_encode(&filename, NON_ALPHANUMERIC).to_string();
    Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "application/octet-stream")
        .header(header::CONTENT_LENGTH, size_bytes.to_string())
        .header("X-Content-Type-Options", "nosniff")
        .header(
            header::CONTENT_DISPOSITION,
            format!("attachment; filename=\"{ascii}\"; filename*=UTF-8''{encoded}"),
        )
        .body(Body::from_stream(ReaderStream::new(file)))
        .map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("构造响应失败: {e}"),
            )
        })
}

// ============ 单测(纯逻辑;CI cargo test 无 PG,DB 路径不在本文件测) ============

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_platform_accepts_exactly_the_six_values() {
        for p in PLATFORMS {
            assert_eq!(parse_platform(p), Some(p));
        }
        assert_eq!(parse_platform("Windows"), None); // 大小写敏感,规范化在 BFF/前端
        assert_eq!(parse_platform("windows11"), None);
        assert_eq!(parse_platform(""), None);
    }

    #[test]
    fn validate_ext_checks_whitelist_on_last_segment() {
        assert_eq!(validate_ext("PomoFlow-0.2.0-setup.exe"), Some("exe"));
        assert_eq!(validate_ext("POMOFLOW.DMG"), Some("dmg"));
        assert_eq!(validate_ext("app.apk"), Some("apk"));
        assert_eq!(validate_ext("installer"), None); // 无扩展
        assert_eq!(validate_ext("archive.tar.gz"), None); // gz 不在白名单(多段 v1 不支持)
        assert_eq!(validate_ext("file."), None); // 空扩展
        assert_eq!(validate_ext("x.abcdefghi"), None); // 超 8 字符
    }

    #[test]
    fn sanitize_display_name_strips_hostile_chars_keeps_cjk() {
        assert_eq!(
            sanitize_display_name("  安装包 0.2.0.exe  "),
            "安装包 0.2.0.exe"
        );
        assert_eq!(sanitize_display_name("a\"b\\c/d.exe"), "abcd.exe");
        assert_eq!(sanitize_display_name("x\u{0000}\u{0007}y.exe"), "xy.exe");
        assert_eq!(sanitize_display_name("name.. ."), "name"); // 尾点尾空格
        assert_eq!(sanitize_display_name("../../etc/passwd"), "....etcpasswd");
        // 200 字节上限按字符边界截断,不 panic
        let long = "中".repeat(300);
        let got = sanitize_display_name(&long);
        assert!(got.len() <= DISPLAY_NAME_MAX_BYTES);
        assert!(got.chars().all(|c| c == '中'));
    }

    #[test]
    fn valid_version_shape() {
        assert!(valid_version("0.2.0"));
        assert!(valid_version("1.0.0-beta+build.1"));
        assert!(valid_version("  v2026.10.18  "));
        assert!(!valid_version(""));
        assert!(!valid_version("版本 1")); // 非 ASCII
        assert!(!valid_version(&"a".repeat(51)));
    }

    #[test]
    fn compare_versions_numeric_and_prerelease() {
        use std::cmp::Ordering::*;
        assert_eq!(compare_versions("0.2.10", "0.2.9"), Greater);
        assert_eq!(compare_versions("1.0.0", "1.0.0"), Equal);
        assert_eq!(compare_versions("1.0.0-beta", "1.0.0"), Less);
        assert_eq!(compare_versions("1.0", "1.0.1"), Less);
        assert_eq!(compare_versions("2.0", "1.9.9"), Greater);
        // 段类型不一致回退字符串序
        assert_eq!(compare_versions("a.b", "a.c"), Less);
        assert_eq!(compare_versions("abc", "abd"), Less);
    }
}
