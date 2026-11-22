//! 离线数据迁移 —— 导出 / 导入的 Tauri 命令层。
//!
//! 职责只有三件:文件 I/O(全部 spawn_blocking)、信封组装(app_version /
//! exported_at / 通知文案 / 主题 blob)、xlsx 快照排版(人读,不可导回;
//! JSON 才是迁移真源,core::migration 定语义)。
//!
//! 并发约定:**导出/导入都拿 `sync_lock`** —— 导出要多表各查一次,不锁会
//! 撞上自动同步的写产生撕裂快照(任务有了、标签没跟);导入更要与同步互斥,
//! 否则 pending 扫描可能把半批导入推上云。

use pomoflow_core::migration::{
    apply_import, collect_migration_data, parse_envelope, MigrationEnvelope, MIGRATION_FORMAT,
    MIGRATION_VERSION,
};
use pomoflow_core::store::{SqliteStore, Store};
use pomoflow_core::CoreResult;
use rust_xlsxwriter::{Format, FormatBorder, Workbook};
use serde::Serialize;
use serde_json::Value;
use tauri::State;

use crate::commands::AppState;

/// 导出结果(前端只用来展示成功文案)。
#[derive(Debug, Serialize)]
pub struct ExportSummary {
    pub path: String,
    /// 12 类实体行数合计
    pub rows: usize,
}

/// 导入结果:core 报告 + 文件里携带的主题 blob(原样交前端校验回填)。
#[derive(Debug, Serialize)]
pub struct ImportResult {
    pub report: pomoflow_core::migration::ImportReport,
    pub theme: Option<Value>,
}

// === 组装(共用)==============================================================

/// 收集全量信封:12 类实体 + 通知文案(单行配置,不参与云同步)+ 主题 blob。
fn collect_envelope(store: &SqliteStore, theme: Option<Value>) -> CoreResult<MigrationEnvelope> {
    let template = store.get_notification_template()?;
    Ok(MigrationEnvelope {
        format: MIGRATION_FORMAT.to_string(),
        version: MIGRATION_VERSION,
        exported_at: chrono::Utc::now().to_rfc3339_opts(chrono::SecondsFormat::Secs, true),
        app_version: Some(env!("CARGO_PKG_VERSION").to_string()),
        data: collect_migration_data(store)?,
        notification_template: template,
        theme,
    })
}

fn count_rows(env: &MigrationEnvelope) -> usize {
    let d = &env.data;
    d.projects.len()
        + d.tags.len()
        + d.tasks.len()
        + d.task_tags.len()
        + d.subtasks.len()
        + d.pomodoros.len()
        + d.mottos.len()
        + d.journals.len()
        + d.daily_reviews.len()
        + d.weekly_reviews.len()
        + d.monthly_reviews.len()
        + d.yearly_reviews.len()
}

// === 导出 JSON ================================================================

#[tauri::command(async)]
pub async fn export_migration_json(
    path: String,
    theme: Option<Value>,
    state: State<'_, AppState>,
) -> Result<ExportSummary, String> {
    let store = state.store.clone();
    let lock = state.sync_lock.clone();
    let _guard = lock.lock().await; // 与同步互斥:保证多表读出的快照不撕裂
    tauri::async_runtime::spawn_blocking(move || {
        let env = collect_envelope(&store, theme).map_err(|e| e.to_string())?;
        let rows = count_rows(&env);
        let pretty = serde_json::to_string_pretty(&env).map_err(|e| format!("序列化失败: {e}"))?;
        std::fs::write(&path, pretty).map_err(|e| format!("写文件失败: {e}"))?;
        Ok(ExportSummary { path, rows })
    })
    .await
    .map_err(|e| format!("导出任务失败: {e}"))?
}

// === 导出 xlsx(人读快照)=====================================================

#[tauri::command(async)]
pub async fn export_migration_xlsx(
    path: String,
    state: State<'_, AppState>,
) -> Result<ExportSummary, String> {
    let store = state.store.clone();
    let lock = state.sync_lock.clone();
    let _guard = lock.lock().await;
    tauri::async_runtime::spawn_blocking(move || {
        let env = collect_envelope(&store, None).map_err(|e| e.to_string())?;
        let rows = count_rows(&env);
        build_xlsx(&path, &env)?;
        Ok(ExportSummary { path, rows })
    })
    .await
    .map_err(|e| format!("导出任务失败: {e}"))?
}

/// 13 张表:Info(format/版本/时间/各实体行数)+ 12 实体。原生字段直出不做
/// 本地化 —— 这份快照只给人看,不进导入链路。
fn build_xlsx(path: &str, env: &MigrationEnvelope) -> Result<(), String> {
    fn to_val<T: Serialize>(v: &T) -> Result<Value, String> {
        serde_json::to_value(v).map_err(|e| format!("xlsx 快照序列化失败: {e}"))
    }
    let data = &env.data;
    let sheets: [(&str, Value); 12] = [
        ("Projects", to_val(&data.projects)?),
        ("Tags", to_val(&data.tags)?),
        ("Tasks", to_val(&data.tasks)?),
        ("TaskTags", to_val(&data.task_tags)?),
        ("Subtasks", to_val(&data.subtasks)?),
        ("Pomodoros", to_val(&data.pomodoros)?),
        ("Mottos", to_val(&data.mottos)?),
        ("Journals", to_val(&data.journals)?),
        ("DailyReviews", to_val(&data.daily_reviews)?),
        ("WeeklyReviews", to_val(&data.weekly_reviews)?),
        ("MonthlyReviews", to_val(&data.monthly_reviews)?),
        ("YearlyReviews", to_val(&data.yearly_reviews)?),
    ];
    write_xlsx_workbook(path, env, &sheets).map_err(|e| format!("生成 xlsx 失败: {e}"))
}

/// 纯 xlsx 写层:信封元信息 + 已序列化的实体行,XlsxError 原样上抛。
fn write_xlsx_workbook(
    path: &str,
    env: &MigrationEnvelope,
    sheets: &[(&str, Value)],
) -> Result<(), rust_xlsxwriter::XlsxError> {
    let mut workbook = Workbook::new();

    let info = workbook.add_worksheet();
    info.set_name("Info")?;
    let header_fmt = header_format();
    info.write_string_with_format(0, 0, "format", &header_fmt)?;
    info.write_string_with_format(0, 1, MIGRATION_FORMAT, &header_fmt)?;
    info.write_string(1, 0, "version")?;
    info.write_number(1, 1, f64::from(MIGRATION_VERSION))?;
    info.write_string(2, 0, "exported_at")?;
    info.write_string(2, 1, &env.exported_at)?;
    info.write_string(3, 0, "app_version")?;
    info.write_string(3, 1, env.app_version.as_deref().unwrap_or(""))?;
    info.write_string(4, 0, "note")?;
    info.write_string(4, 1, "xlsx 是只读快照,不可导回;迁移请用 JSON 文件")?;
    let mut row = 5u32;
    info.write_string_with_format(row, 0, "entity", &header_fmt)?;
    info.write_string_with_format(row, 1, "rows", &header_fmt)?;
    for (name, value) in sheets {
        row += 1;
        let count = value.as_array().map(|a| a.len()).unwrap_or(0);
        info.write_string(row, 0, *name)?;
        info.write_number(row, 1, count as f64)?;
    }
    let _ = env.notification_template.as_ref().map(|t| {
        let _ = info.write_string(5, 0, "notification_template");
        let _ = info.write_string(5, 1, t.style.as_str());
    });

    for (name, value) in sheets {
        write_entity_sheet(&mut workbook, name, value)?;
    }
    workbook.save(path)
}

/// 表头样式(与 export.rs 任务清单快照同款:灰底 + 底边框)。
fn header_format() -> Format {
    Format::new()
        .set_bold()
        .set_background_color(rust_xlsxwriter::Color::RGB(0xF3F4F6))
        .set_border_bottom(FormatBorder::Thin)
        .set_border_bottom_color(rust_xlsxwriter::Color::RGB(0xE5E7EB))
}

/// 单实体 sheet:表头取首行对象的键序(结构体 serde → 键稳定),泛型写单元格。
fn write_entity_sheet(
    workbook: &mut Workbook,
    name: &str,
    rows: &Value,
) -> Result<(), rust_xlsxwriter::XlsxError> {
    let sheet = workbook.add_worksheet();
    sheet.set_name(name)?;
    let empty = Vec::new();
    let arr = rows.as_array().unwrap_or(&empty);
    let Some(first) = arr.first() else {
        return Ok(());
    };
    let keys: Vec<String> = first
        .as_object()
        .map(|o| o.keys().cloned().collect())
        .unwrap_or_default();
    let header_fmt = header_format();
    for (c, k) in keys.iter().enumerate() {
        sheet.write_string_with_format(0, c as u16, k, &header_fmt)?;
    }
    let null = Value::Null;
    for (i, item) in arr.iter().enumerate() {
        let r = (i + 1) as u32;
        for (c, k) in keys.iter().enumerate() {
            let cell = item.as_object().and_then(|o| o.get(k)).unwrap_or(&null);
            write_cell(sheet, r, c as u16, cell)?;
        }
    }
    Ok(())
}

/// rust_xlsxwriter 的 write_* 是 fluent API(`&mut self`,返回 `&mut Worksheet`
/// 供链式调用),各臂统一收在该类型上,末尾丢弃即可。
fn write_cell(
    sheet: &mut rust_xlsxwriter::Worksheet,
    row: u32,
    col: u16,
    v: &Value,
) -> Result<(), rust_xlsxwriter::XlsxError> {
    match v {
        Value::Null => {
            sheet.write_string(row, col, "")?;
        }
        Value::Bool(b) => {
            sheet.write_boolean(row, col, *b)?;
        }
        Value::Number(n) => {
            sheet.write_number(row, col, n.as_f64().unwrap_or(0.0))?;
        }
        Value::String(s) => {
            sheet.write_string(row, col, s)?;
        }
        // 嵌套对象/数组(repeat / reminder / tags 等)转 JSON 串
        other => {
            sheet.write_string(row, col, other.to_string())?;
        }
    };
    Ok(())
}

// === 导入 =====================================================================

#[tauri::command(async)]
pub async fn import_migration(
    path: String,
    state: State<'_, AppState>,
) -> Result<ImportResult, String> {
    let store = state.store.clone();
    let lock = state.sync_lock.clone();
    let guard = lock.lock().await; // 与自动同步互斥:不让半批导入被扫去推云
    let result = tauri::async_runtime::spawn_blocking(move || import_from_path(&store, &path))
        .await
        .map_err(|e| format!("导入任务失败: {e}"))?;
    drop(guard);
    result
}

/// 读文件 → parse(core 两道闸)→ apply(fail-soft 报告)。
/// 解析错误把 core 的原文上抛(UI 直接展示,不让「格式不对」变成笼统失败)。
fn import_from_path(store: &SqliteStore, path: &str) -> Result<ImportResult, String> {
    let text = std::fs::read_to_string(path).map_err(|e| format!("读文件失败: {e}"))?;
    let env = parse_envelope(&text).map_err(|e| e.to_string())?;
    let theme = env.theme.clone();
    let report = apply_import(store, &env).map_err(|e| e.to_string())?;
    Ok(ImportResult { report, theme })
}

// === 测试 =====================================================================

#[cfg(test)]
mod tests {
    use super::*;
    use pomoflow_core::migration::MigrationData;
    use pomoflow_core::model::Task;

    fn fixture_envelope() -> MigrationEnvelope {
        let mut task = Task::new("迁移测试任务");
        task.revision = 7;
        MigrationEnvelope {
            format: MIGRATION_FORMAT.to_string(),
            version: MIGRATION_VERSION,
            exported_at: "2026-11-20T00:00:00Z".into(),
            app_version: Some("test".into()),
            data: MigrationData {
                tasks: vec![task],
                ..Default::default()
            },
            notification_template: None,
            theme: Some(serde_json::json!({"theme": "ocean"})),
        }
    }

    /// write_json 落盘 → parse_envelope 回读:任务行与主题 blob 原样往返。
    #[test]
    fn json_export_roundtrips_through_parse() {
        let env = fixture_envelope();
        let path = std::env::temp_dir().join("pomoflow-migration-json-test.json");
        let path_str = path.to_str().unwrap().to_string();
        let pretty = serde_json::to_string_pretty(&env).unwrap();
        std::fs::write(&path_str, pretty).unwrap();

        let text = std::fs::read_to_string(&path_str).unwrap();
        let parsed = parse_envelope(&text).expect("回读应过两道闸");
        assert_eq!(parsed.data.tasks.len(), 1);
        assert_eq!(parsed.data.tasks[0].title, "迁移测试任务");
        assert_eq!(parsed.data.tasks[0].revision, 7);
        assert_eq!(parsed.theme.as_ref().unwrap()["theme"], "ocean");
        let _ = std::fs::remove_file(&path);
    }

    /// build_xlsx:13 张 sheet 落盘且 Info 行数与信封一致(只读快照的可读性闸)。
    #[test]
    fn xlsx_snapshot_has_info_and_entity_sheets() {
        let env = fixture_envelope();
        let path = std::env::temp_dir().join("pomoflow-migration-xlsx-test.xlsx");
        let path_str = path.to_str().unwrap().to_string();
        build_xlsx(&path_str, &env).expect("build_xlsx");
        let meta = std::fs::metadata(&path).expect("xlsx 落盘");
        assert!(meta.len() > 1000, "xlsx 应有实质内容");
        assert_eq!(count_rows(&env), 1);
        let _ = std::fs::remove_file(&path);
    }
}
