import '../models/session.dart';
import '../models/task.dart';

/// 统计聚合(纯函数,单测锁口径)。
///
/// 数据源:`TaskProvider.sessions`(append-only 专注会话,含桌面端同步
/// 下来的)+ `tasks`(项目归属 / 完成态)。本地时区口径,与 focus 页
/// todayPomos 派生一致。
///
/// 桌面端权威口径见 `crates/core/src/stats.rs`(trend/overview/
/// distribution);mobile 是轻量版,维度范围定义对齐:
/// 今天/本周(周一起)/本月/本季/半年/全年。
///
/// 已知口径妥协:「完成任务」卡 = 当前**全量**已完成数 —— mobile tasks
/// 表暂无 completed_at 列,无法按区间过滤;P2 补列后改区间口径。

/// 一个维度的聚合结果。
class PfStatsSummary {
  const PfStatsSummary({
    required this.trendMins,
    required this.trendLabels,
    required this.trendTitle,
    required this.totalMinutes,
    required this.pomos,
    required this.doneTasks,
    required this.avgMinutes,
    required this.activeDays,
    required this.streak,
    required this.trendPct,
    required this.projectShares,
  });

  /// 趋势图数据:最近 7 天每日专注分钟(含今天;固定 7 桶,柱状图 UI 不变)。
  final List<int> trendMins;

  /// 趋势图 x 轴标签(7 个,dd 日期)。
  final List<String> trendLabels;

  /// 趋势图标题后缀。
  final String trendTitle;

  final int totalMinutes;
  final int pomos;

  /// 全量已完成任务数(口径妥协,见文件头注释)。
  final int doneTasks;

  /// 日均分钟(总分钟 / 维度自然天数;今天维度 = 当日分钟)。
  final int avgMinutes;

  /// 范围内有会话的不同日数。
  final int activeDays;

  /// 历史最长连续专注天数(不限当前维度,streak 惯例)。
  final int streak;

  /// 环比上期:+12% / -5% / —(上期为 0)。
  final String trendPct;

  /// 项目分钟占比(降序;task 无关联会话归「未关联」)。
  final List<(String, double)> projectShares;
}

/// 六维度(与 stats_page chips 一一对应)。
const statsDims = ['今天', '本周', '本月', '本季', '半年', '全年'];

/// 聚合入口。
PfStatsSummary aggregateStats({
  required List<PfSession> sessions,
  required List<PfTask> tasks,
  required String dim,
  DateTime? now,
}) {
  final base = now ?? DateTime.now();
  final (start, end) = _dimRange(dim, base);
  final (prevStart, _) = _dimRange(dim, _shiftBack(dim, base));

  final inRange = sessions
      .where((s) => !s.startedAt.isBefore(start) && s.startedAt.isBefore(end))
      .toList();
  final prevRange = sessions
      .where((s) =>
          !s.startedAt.isBefore(prevStart) && s.startedAt.isBefore(start))
      .toList();

  final totalMinutes =
      inRange.fold<int>(0, (a, s) => a + s.durationMinutes);
  final prevMinutes =
      prevRange.fold<int>(0, (a, s) => a + s.durationMinutes);

  // 趋势:最近 7 天每日分钟(含今天)。
  final trendMins = List<int>.filled(7, 0);
  final trendLabels = List<String>.filled(7, '');
  final byDay = <String, int>{};
  for (final s in sessions) {
    final key = _dayKey(s.startedAt);
    byDay[key] = (byDay[key] ?? 0) + s.durationMinutes;
  }
  for (var i = 0; i < 7; i++) {
    final d = DateTime(base.year, base.month, base.day - (6 - i));
    trendMins[i] = byDay[_dayKey(d)] ?? 0;
    trendLabels[i] = '${d.day}'.padLeft(2, '0');
  }

  final dayCount = end.difference(start).inDays;
  final activeDays = inRange.map((s) => _dayKey(s.startedAt)).toSet().length;

  return PfStatsSummary(
    trendMins: trendMins,
    trendLabels: trendLabels,
    trendTitle: '近 7 天',
    totalMinutes: totalMinutes,
    pomos: inRange.length,
    doneTasks: tasks.where((t) => t.completed && !t.isDeleted).length,
    avgMinutes: dayCount <= 1
        ? totalMinutes
        : (totalMinutes / dayCount).round(),
    activeDays: activeDays,
    streak: _longestStreak(sessions, base),
    trendPct: _pct(totalMinutes, prevMinutes),
    projectShares: _projectShares(inRange, tasks),
  );
}

/// 维度 → [start, end) 本地时区半开区间。
(DateTime, DateTime) _dimRange(String dim, DateTime base) => switch (dim) {
      '今天' => (
        DateTime(base.year, base.month, base.day),
        DateTime(base.year, base.month, base.day + 1),
      ),
      '本周' => () {
        // 周一为一周起点(与桌面 calendar.ts 口径一致)。
        final monday = DateTime(base.year, base.month, base.day)
            .subtract(Duration(days: base.weekday - 1));
        return (monday, monday.add(const Duration(days: 7)));
      }(),
      '本月' => (
        DateTime(base.year, base.month),
        DateTime(base.year, base.month + 1),
      ),
      '本季' => () {
        final qFirstMonth = (base.month - 1) ~/ 3 * 3 + 1;
        return (
          DateTime(base.year, qFirstMonth),
          DateTime(base.year, qFirstMonth + 3),
        );
      }(),
      '半年' => (
        DateTime(base.year, base.month - 5),
        DateTime(base.year, base.month + 1),
      ),
      _ => (
        DateTime(base.year),
        DateTime(base.year + 1),
      ),
    };

/// 上一个等长维度的锚点(用于环比)。
DateTime _shiftBack(String dim, DateTime base) => switch (dim) {
      '今天' => base.subtract(const Duration(days: 1)),
      '本周' => base.subtract(const Duration(days: 7)),
      '本月' => DateTime(base.year, base.month - 1, base.day),
      '本季' => DateTime(base.year, base.month - 3, base.day),
      '半年' => DateTime(base.year, base.month - 6, base.day),
      _ => DateTime(base.year - 1, base.month, base.day),
    };

/// 历史最长连续专注天数(有会话的日集合扫描;与"到今天是否连续"无关)。
int _longestStreak(List<PfSession> sessions, DateTime base) {
  if (sessions.isEmpty) return 0;
  final days = sessions.map((s) => _dayKey(s.startedAt)).toSet();
  final sorted = days.map(_dayKeyToDate).toList()..sort();
  var best = 1;
  var run = 1;
  for (var i = 1; i < sorted.length; i++) {
    if (sorted[i].difference(sorted[i - 1]).inDays == 1) {
      run += 1;
      if (run > best) best = run;
    } else {
      run = 1;
    }
  }
  return best;
}

String _pct(int cur, int prev) {
  if (prev == 0) return '—';
  final delta = (cur - prev) / prev * 100;
  final sign = delta >= 0 ? '+' : '';
  return '$sign${delta.round()}%';
}

/// 项目分钟占比(降序;task 不在列表/无 taskId → 未关联)。
List<(String, double)> _projectShares(
    List<PfSession> inRange, List<PfTask> tasks) {
  final projectOf = <String, String>{};
  for (final t in tasks) {
    projectOf[t.id] = t.project;
  }
  final minutes = <String, int>{};
  for (final s in inRange) {
    final name = (projectOf[s.taskId] ?? '').isNotEmpty
        ? projectOf[s.taskId]!
        : '未关联';
    minutes[name] = (minutes[name] ?? 0) + s.durationMinutes;
  }
  final total = minutes.values.fold<int>(0, (a, b) => a + b);
  if (total == 0) return const [];
  final entries = minutes.entries.toList()
    ..sort((a, b) => b.value.compareTo(a.value));
  return [
    for (final e in entries) (e.key, e.value / total),
  ];
}

String _dayKey(DateTime d) =>
    '${d.year.toString().padLeft(4, '0')}-'
    '${d.month.toString().padLeft(2, '0')}-'
    '${d.day.toString().padLeft(2, '0')}';

DateTime _dayKeyToDate(String key) => DateTime.parse(key);
