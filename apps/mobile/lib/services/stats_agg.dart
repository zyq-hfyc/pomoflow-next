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
/// 「完成任务」= 区间口径(completed_at 落在维度内);v8 之前的老数据
/// completed_at=0 不计 —— 保守可接受。

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

  /// 区间内完成的任务数(completed_at 落在维度范围内;v8 列落地后
  /// 从全量妥协口径升级 —— 老数据 completed_at=0 不计,保守可接受)。
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

  // 计数口径(对齐桌面 core::stats counts_session):自然完成 && 关联任务。
  // 放弃会话(is_completed=false)与无任务专注(taskId 空)不计 —— 否则
  // 同一账号桌面/移动端同日统计数字永久性对不上(桌面同步过来也会被剔除)。
  bool counts(PfSession s) => s.isCompleted && s.taskId.isNotEmpty;

  final inRange = sessions
      .where(
        (s) =>
            counts(s) &&
            !s.startedAt.isBefore(start) &&
            s.startedAt.isBefore(end),
      )
      .toList();
  final prevRange = sessions
      .where(
        (s) =>
            counts(s) &&
            !s.startedAt.isBefore(prevStart) &&
            s.startedAt.isBefore(start),
      )
      .toList();

  final totalMinutes = inRange.fold<int>(0, (a, s) => a + s.durationMinutes);
  final prevMinutes = prevRange.fold<int>(0, (a, s) => a + s.durationMinutes);

  // 趋势桶(桌面 statsRanges DIMENSIONS 同款粒度映射):今天/本周/本月
  // = 按日,本季 = 按周(周一锚),半年/全年 = 按月。桶只建在有数据的键上
  // (桌面 BTreeMap 同款,不补零);标签:日/周 = M/D,月 = M。
  final group = _dimGroup(dim);
  final byBucket = <String, int>{};
  for (final s in inRange) {
    final k = _bucketKey(s.startedAt, group);
    byBucket[k] = (byBucket[k] ?? 0) + s.durationMinutes;
  }
  final bucketKeys = byBucket.keys.toList()..sort();
  final trendMins = [for (final k in bucketKeys) byBucket[k]!];
  final trendLabels = [for (final k in bucketKeys) _bucketLabel(k, group)];

  final dayCount = end.difference(start).inDays;
  // 活跃"时段" = 有数据的桶数(桌面同口径;日粒度下等同活跃天数)。
  final activeDays = bucketKeys.length;

  // 区间内完成的任务(completed_at 落在 [start, end);老行 0 不计)。
  final doneTasks = tasks
      .where(
        (t) =>
            !t.isDeleted &&
            t.completedAt != null &&
            !t.completedAt!.isBefore(start) &&
            t.completedAt!.isBefore(end),
      )
      .length;

  return PfStatsSummary(
    trendMins: trendMins,
    trendLabels: trendLabels,
    trendTitle: switch (group) {
      'week' => '按周',
      'month' => '按月',
      _ => '按日',
    },
    totalMinutes: totalMinutes,
    pomos: inRange.length,
    doneTasks: doneTasks,
    avgMinutes: dayCount <= 1
        ? totalMinutes
        : (totalMinutes / dayCount).round(),
    activeDays: activeDays,
    // 最长连续 = 连续非空桶的最长段(桌面 StatsPage 同口径;日粒度下
    // 等同历史最长连续天数)。
    streak: _bucketStreak(bucketKeys, group),
    trendPct: _pct(totalMinutes, prevMinutes),
    projectShares: _projectSharesByTasks(tasks, start, end),
  );
}

/// 维度 → 趋势粒度(桌面 statsRanges DIMENSIONS 同表)。
String _dimGroup(String dim) => switch (dim) {
  '本季' => 'week',
  '半年' || '全年' => 'month',
  _ => 'day',
};

/// 会话时刻 → 桶键。day = yyyy-mm-dd;week = 所在周周一日期(桌面
/// group_key Monday 对齐);month = yyyy-mm。
String _bucketKey(DateTime t, String group) {
  final day = DateTime(t.year, t.month, t.day);
  return switch (group) {
    'week' => _dayKey(day.subtract(Duration(days: day.weekday - 1))),
    'month' =>
      '${t.year.toString().padLeft(4, '0')}-'
          '${t.month.toString().padLeft(2, '0')}',
    _ => _dayKey(day),
  };
}

/// 桶键 → 图表标签(桌面 keyLabel 同款):日/周 = M/D,月 = M。
String _bucketLabel(String key, String group) {
  if (group == 'month') {
    return '${int.parse(key.substring(5, 7))}';
  }
  final d = _dayKeyToDate(key);
  return '${d.month}/${d.day}';
}

/// 相邻桶判定( streak 用):日 = 差 1 天,周 = 差 7 天(周一锚),月 = 相邻月。
bool _bucketsAdjacent(String prev, String cur, String group) {
  if (group == 'month') {
    final pm = _monthKeyToDate(prev), cm = _monthKeyToDate(cur);
    final months = (cm.year - pm.year) * 12 + cm.month - pm.month;
    return months == 1;
  }
  final diff = _dayKeyToDate(cur).difference(_dayKeyToDate(prev)).inDays;
  return diff == (group == 'week' ? 7 : 1);
}

DateTime _monthKeyToDate(String key) =>
    DateTime(int.parse(key.substring(0, 4)), int.parse(key.substring(5, 7)));

/// 连续非空桶的最长段。
int _bucketStreak(List<String> sortedKeys, String group) {
  if (sortedKeys.isEmpty) return 0;
  var best = 1;
  var run = 1;
  for (var i = 1; i < sortedKeys.length; i++) {
    if (_bucketsAdjacent(sortedKeys[i - 1], sortedKeys[i], group)) {
      run += 1;
      if (run > best) best = run;
    } else {
      run = 1;
    }
  }
  return best;
}

/// 维度 → [start, end) 本地时区半开区间。
(DateTime, DateTime) _dimRange(String dim, DateTime base) => switch (dim) {
  '今天' => (
    DateTime(base.year, base.month, base.day),
    DateTime(base.year, base.month, base.day + 1),
  ),
  '本周' => () {
    // 周一为一周起点(与桌面 calendar.ts 口径一致)。
    final monday = DateTime(
      base.year,
      base.month,
      base.day,
    ).subtract(Duration(days: base.weekday - 1));
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
  // 自然半年(桌面 statsRanges 同口径):上半年 1/1-6/30、
  // 下半年 7/1-12/31,非滚动 6 个月。
  '半年' =>
    base.month <= 6
        ? (DateTime(base.year, 1), DateTime(base.year, 7))
        : (DateTime(base.year, 7), DateTime(base.year + 1)),
  _ => (DateTime(base.year), DateTime(base.year + 1)),
};

/// 上一个等长维度的锚点(用于环比)。
DateTime _shiftBack(String dim, DateTime base) => switch (dim) {
  '今天' => base.subtract(const Duration(days: 1)),
  '本周' => base.subtract(const Duration(days: 7)),
  '本月' => DateTime(base.year, base.month - 1, base.day),
  '本季' => DateTime(base.year, base.month - 3, base.day),
  // 上一自然半年的锚点:上半年 → 去年 7 月;下半年 → 今年 1 月。
  '半年' =>
    base.month <= 6
        ? DateTime(base.year - 1, 7, base.day)
        : DateTime(base.year, 1, base.day),
  _ => DateTime(base.year - 1, base.month, base.day),
};

String _pct(int cur, int prev) {
  if (prev == 0) return '—';
  final delta = (cur - prev) / prev * 100;
  final sign = delta >= 0 ? '+' : '';
  return '$sign${delta.round()}%';
}

/// 项目分钟占比(桌面 core::stats project_stats_by_completed_pomodoros
/// 同构,2026-09-05 对齐批):**按任务维度** —— dueAt 本地日 ∈ [start, end)
/// 且 completedPomos > 0 且有项目归属的任务,累加
/// completedPomos × pomodoroDuration(未设单番茄时长记 0;与实际会话无关,
/// 不要求任务整体完成 —— 8 番茄完成 7 计 7)。无清单任务无归属维度不计。
/// 排序:分钟降序 → 名称升序;输出占比(0..1)。
List<(String, double)> _projectSharesByTasks(
  List<PfTask> tasks,
  DateTime start,
  DateTime end,
) {
  final minutes = <String, int>{};
  for (final t in tasks) {
    if (t.isDeleted || t.project.isEmpty) continue;
    final d = t.dueAt;
    if (d == null || d.isBefore(start) || !d.isBefore(end)) continue;
    final m = t.completedPomos * t.pomodoroDuration;
    // 分钟数为 0(未设单番茄时长/无完成番茄)不进分布 —— 桌面
    // ProjectStat 无该项即不渲染,移动端占比 0% 无意义(对齐测试口径)。
    if (m <= 0) continue;
    minutes[t.project] = (minutes[t.project] ?? 0) + m;
  }
  final total = minutes.values.fold<int>(0, (a, b) => a + b);
  if (total == 0) return const [];
  final entries = minutes.entries.toList()
    ..sort((a, b) {
      final c = b.value.compareTo(a.value);
      return c != 0 ? c : a.key.compareTo(b.key);
    });
  return [for (final e in entries) (e.key, e.value / total)];
}

String _dayKey(DateTime d) =>
    '${d.year.toString().padLeft(4, '0')}-'
    '${d.month.toString().padLeft(2, '0')}-'
    '${d.day.toString().padLeft(2, '0')}';

DateTime _dayKeyToDate(String key) => DateTime.parse(key);
