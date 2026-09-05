import 'dart:convert';
import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:path_provider/path_provider.dart';
import 'package:share_plus/share_plus.dart';

import '../services/stats_agg.dart';

/// P3c 统计页 CSV 导出:把 `aggregateStats` 结果写成 UTF-8 CSV,
/// 用 share_plus 拉起系统分享面板(微信/邮件/文件管理器等)。
///
/// CSV 结构(与桌面 xlsx 任务导出区分,这里是**统计摘要**):
///   - 概览段:维度/总分钟/番茄数/已完成任务/日均分钟/活跃天数/最长连续/环比
///   - 趋势段:标签/分钟
///   - 项目分布段:项目/分钟/占比
class StatsExporter {
  /// 导出并分享。失败时抛异常,由调用方展示 SnackBar。
  static Future<void> shareCsv(PfStatsSummary s, String dim) async {
    if (kIsWeb) {
      throw UnsupportedError('web 平台暂不支持文件分享');
    }
    final csv = _buildCsv(s, dim);
    final tmp = await getTemporaryDirectory();
    final fileName =
        'pomoflow_stats_${dim}_${DateTime.now().millisecondsSinceEpoch}.csv';
    final path = '${tmp.path}/$fileName';
    final file = File(path);
    await file.writeAsString(csv, encoding: utf8);
    await Share.shareXFiles([
      XFile(path, mimeType: 'text/csv', name: fileName),
    ], subject: 'PomoFlow 统计导出 · $dim');
  }

  static String _buildCsv(PfStatsSummary s, String dim) {
    final buf = StringBuffer();
    // 概览
    buf.writeln('维度,总专注分钟,番茄数,已完成任务,日均分钟,活跃天数,最长连续,环比上期');
    buf.writeln(
      '${_escape(dim)},${s.totalMinutes},${s.pomos},${s.doneTasks},${s.avgMinutes},${s.activeDays},${s.streak},${_escape(s.trendPct)}',
    );
    buf.writeln();
    // 趋势
    buf.writeln('趋势标签,专注分钟');
    for (var i = 0; i < s.trendLabels.length; i++) {
      final min = i < s.trendMins.length ? s.trendMins[i] : 0;
      buf.writeln('${_escape(s.trendLabels[i])},$min');
    }
    buf.writeln();
    // 项目分布
    buf.writeln('项目,分钟,占比');
    for (final (name, ratio) in s.projectShares) {
      final minutes = (ratio * s.totalMinutes).round();
      buf.writeln('${_escape(name)},$minutes,${(ratio * 100).round()}%');
    }
    return buf.toString();
  }

  /// 简单 CSV 转义:含逗号/换行/引号时包引号,引号内引号双写。
  static String _escape(String value) {
    if (value.contains(',') ||
        value.contains('"') ||
        value.contains('\n') ||
        value.contains('\r')) {
      return '"${value.replaceAll('"', '""')}"';
    }
    return value;
  }
}
