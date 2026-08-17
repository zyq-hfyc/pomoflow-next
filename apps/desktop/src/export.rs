//! xlsx 导出 —— v1 `frontend/src/utils/exportTasks.ts`(ExcelJS)的 Rust 对应物。
//!
//! ## v1 格式(逐条保持)
//!
//! - 9 列:序号(6) / 任务描述(36) / 项目(16) / 优先级(8) / 到期日(14) /
//!   预计番茄数(12) / 标签(20) / 子任务(40) / 任务状态(12)
//! - 表头:加粗 + 水平垂直居中 + 浅灰底(#F3F4F6) + 底边框(#E5E7EB),行高 22
//! - 数据行:顶端对齐 + 自动换行(子任务多行展示);序号列居中
//! - 预计番茄数只导 estimated(v1 原样);标签逗号+空格连接;子任务换行连接
//! - i18n(表头/优先级/状态标签)由前端传入,Rust 不做本地化

use rust_xlsxwriter::{Format, FormatAlign, FormatBorder, Workbook};
use serde::Deserialize;
use tauri::State;

use crate::commands::AppState;

/// 一行导出数据(展示字段全部由前端本地化/格式化后传入)。
#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ExportRow {
    pub title: String,
    #[serde(default)]
    pub project: String,
    #[serde(default)]
    pub priority: String,
    #[serde(default)]
    pub due_date: String,
    /// 预计番茄数:数字单元格(v1 estimated_pomodoros,Excel 可直接求和)
    #[serde(default)]
    pub estimated: f64,
    #[serde(default)]
    pub tags: String,
    #[serde(default)]
    pub subtasks: String,
    #[serde(default)]
    pub status: String,
}

/// v1 列宽(字符数)
const COLUMN_WIDTHS: [f64; 9] = [6.0, 36.0, 16.0, 8.0, 14.0, 12.0, 20.0, 40.0, 12.0];

/// 把筛选后的任务列表写成 .xlsx(v1 exportTasksToExcel)。
///
/// `headers`:9 个本地化列名;`sheet_name`:本地化工作表名(如"任务清单");
/// `path`:前端 save 对话框选定的完整路径。
#[tauri::command]
pub fn export_tasks_xlsx(
    path: String,
    sheet_name: String,
    headers: Vec<String>,
    rows: Vec<ExportRow>,
    _state: State<'_, AppState>,
) -> Result<(), String> {
    if headers.len() < 9 {
        return Err(format!("需要 9 个列名,收到 {}", headers.len()));
    }
    inner_build(&path, &sheet_name, &headers, &rows).map_err(|e| e.to_string())
}

fn inner_build(
    path: &str,
    sheet_name: &str,
    headers: &[String],
    rows: &[ExportRow],
) -> Result<(), rust_xlsxwriter::XlsxError> {
    let mut workbook = Workbook::new();
    let sheet = workbook.add_worksheet();
    sheet.set_name(sheet_name)?;

    // 列宽
    for (i, w) in COLUMN_WIDTHS.iter().enumerate() {
        sheet.set_column_width(i as u16, *w)?;
    }

    // 表头:加粗 + 居中 + 浅灰底 + 浅灰底边框(v1 #E5E7EB),行高 22
    let header_fmt = Format::new()
        .set_bold()
        .set_align(FormatAlign::Center)
        .set_align(FormatAlign::VerticalCenter)
        .set_background_color(rust_xlsxwriter::Color::RGB(0xF3F4F6))
        .set_border_bottom(FormatBorder::Thin)
        .set_border_bottom_color(rust_xlsxwriter::Color::RGB(0xE5E7EB));
    for (i, h) in headers.iter().take(9).enumerate() {
        sheet.write_string_with_format(0, i as u16, h, &header_fmt)?;
    }
    sheet.set_row_height(0, 22.0)?;

    // 数据行:顶端对齐 + 自动换行;序号列居中
    let index_fmt = Format::new()
        .set_align(FormatAlign::Center)
        .set_align(FormatAlign::VerticalCenter)
        .set_text_wrap();
    let body_fmt = Format::new()
        .set_align(FormatAlign::Top)
        .set_align(FormatAlign::Left)
        .set_text_wrap();

    for (i, row) in rows.iter().enumerate() {
        let r = (i + 1) as u32;
        sheet.write_number_with_format(r, 0, (i + 1) as f64, &index_fmt)?;
        sheet.write_string_with_format(r, 1, &row.title, &body_fmt)?;
        sheet.write_string_with_format(r, 2, &row.project, &body_fmt)?;
        sheet.write_string_with_format(r, 3, &row.priority, &body_fmt)?;
        sheet.write_string_with_format(r, 4, &row.due_date, &body_fmt)?;
        sheet.write_number_with_format(r, 5, row.estimated, &body_fmt)?;
        sheet.write_string_with_format(r, 6, &row.tags, &body_fmt)?;
        sheet.write_string_with_format(r, 7, &row.subtasks, &body_fmt)?;
        sheet.write_string_with_format(r, 8, &row.status, &body_fmt)?;
    }

    workbook.save(path)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn writes_xlsx_with_header_and_rows() {
        let dir = std::env::temp_dir().join("pomoflow-export-test");
        std::fs::create_dir_all(&dir).unwrap();
        let path = dir.join("t.xlsx");
        let path_str = path.to_str().unwrap().to_string();

        let headers: Vec<String> = [
            "序号",
            "任务描述",
            "项目",
            "优先级",
            "到期日",
            "预计番茄数",
            "标签",
            "子任务",
            "任务状态",
        ]
        .iter()
        .map(|s| s.to_string())
        .collect();
        let rows = vec![ExportRow {
            title: "写方案".into(),
            project: "工作".into(),
            priority: "高".into(),
            due_date: "2026-08-16".into(),
            estimated: 4.0,
            tags: "urgent, review".into(),
            subtasks: "列大纲\n查资料".into(),
            status: "未完成".into(),
        }];

        build_xlsx_checked(&path_str, "任务清单", &headers, &rows).unwrap();
        let meta = std::fs::metadata(&path).unwrap();
        assert!(meta.len() > 1000, "xlsx 应有实质内容");
        let _ = std::fs::remove_file(&path);
    }

    /// 测试入口:与命令同语义(含列名校验)。
    fn build_xlsx_checked(
        path: &str,
        sheet_name: &str,
        headers: &[String],
        rows: &[ExportRow],
    ) -> Result<(), String> {
        if headers.len() < 9 {
            return Err(format!("需要 9 个列名,收到 {}", headers.len()));
        }
        inner_build(path, sheet_name, headers, rows).map_err(|e| e.to_string())
    }
}
