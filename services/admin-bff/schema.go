// Package adminbff 暴露 Admin BFF 的嵌入式数据库 schema。
package adminbff

import _ "embed"

// Schema 是 Admin BFF 自有表的幂等建表语句。
//
//go:embed schema.sql
var Schema string
