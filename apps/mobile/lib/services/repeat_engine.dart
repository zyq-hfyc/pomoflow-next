import 'dart:convert';

/// 重复任务日期引擎 —— `crates/core/src/repeat.rs` 的 Dart 移植
/// (v1 `backend/app/crud.py` 语义;本文件是纯函数,无 I/O,单测与 core
/// `repeat.rs` 测试集逐例对拍)。
///
/// ## core 语义(逐条保持,含怪癖)
///
/// - [kRepeatMaxInstances] = 50 硬上限,所有规则共用。
/// - 实例日期**不含模板 due 当天**,保留 due 的时:分(秒归零 —— v1 `make()`
///   只传 hour/minute)。
/// - `daily` / `weekdays` / `weekly` / `monthly`:从 due+1 起算到**当年 12-31**;
///   `weekdays` 只取周一~周五;`monthly` 同月同日,缺日月份(31 号遇 2 月)
///   **跳过**;`yearly` due 年+1 起算 **+5 年**,2/29 非闰年**跳过**。
/// - `custom`(JSON `{interval, type, startDate, endDate, weekdays?, monthDays?}`):
///   - 解析失败 / 缺 `endDate` → 空(不生成)
///   - `interval` 夹紧 0..=99,**步进 = interval+1**(0=每周期,1=隔 1 周期)
///   - `start` 缺省取 due;时:分取自 `start`(配了 startDate 就用它的时间)
///   - `week`:weekdays 1(一)~7(日)多选,从 start 所在周的周一起按步进取周,
///     日期须满足 **start_d < d <= end_d**(严格大于起点、含终点)
///   - `month`:monthDays 1~31 多选,非法日(2/30)跳过
///   - `year`:同月同日按年步进,y 上界 end.year+1,日须 <= end_d
/// - [computeRepeatEndDate]:yearly → due+5 年(2/29 **钳制到 2/28**,
///   与实例生成的"跳过"不同,v1 两处行为就不一致,保持);custom → endDate;
///   其余 → 当年 12-31 23:59。
///
/// ## 墙钟表示
///
/// 日期算术全部在 `tzOffsetMin`(东正西负,东八区 +480)的**本地墙钟**上做:
/// 内部用 UTC 标记的 DateTime 当"墙钟容器"(组件即墙钟值),公开 API 收发
/// epoch 语义的普通 DateTime(与 [PfTask.dueAt] 同约定,时区标签无关紧要)。
const int kRepeatMaxInstances = 50;

// === 墙钟 ↔ epoch(tzOffsetMin 东正西负)==

/// epoch 毫秒 → 请求方本地墙钟(core `to_wall`)。
DateTime _toWall(int epochMs, int tzOffsetMin) =>
    DateTime.fromMillisecondsSinceEpoch(
      epochMs + tzOffsetMin * 60000,
      isUtc: true,
    );

/// 墙钟 → epoch 毫秒(core `from_wall`)。
int _fromWallMs(DateTime wall, int tzOffsetMin) =>
    wall.millisecondsSinceEpoch - tzOffsetMin * 60000;

// === 安全日期构造 ===

/// 构造日期;无效(2/30、非闰年 2/29)返回 null。Dart 的 DateTime 构造会
/// 静默归一化(2/30 → 3/2),必须回读组件校验(v1 `_safe_date`)。
DateTime? _safeDate(int year, int month, int day) {
  final dt = DateTime.utc(year, month, day);
  return dt.year == year && dt.month == month && dt.day == day ? dt : null;
}

/// 墙钟替换年份;2/29 等边界回退到 2/28(v1 `_safe_dt_replace_year`)。
DateTime? _replaceYearWall(DateTime wall, int year) {
  final d =
      _safeDate(year, wall.month, wall.day) ?? _safeDate(year, wall.month, 28);
  if (d == null) return null;
  return DateTime.utc(d.year, d.month, d.day, wall.hour, wall.minute);
}

/// 由日期 + 时:分构造墙钟时刻(秒归零,对齐 v1 `make()`)。
DateTime _atHm(DateTime date, int hour, int minute) =>
    DateTime.utc(date.year, date.month, date.day, hour, minute);

final RegExp _dateOnlyRe = RegExp(r'^\d{4}-\d{2}-\d{2}$');
final RegExp _zoneSuffixRe = RegExp(r'(Z|[+-]\d{2}:?\d{2})$');

/// 宽松解析 v1/前端存的 ISO 字符串为**本地墙钟**(core `parse_wall`):
/// 日期 / 日期T时分(可带秒,空格分隔亦可)/ 带时区后缀 RFC3339 均可;
/// naive 串按墙钟理解,带偏移的换算到请求方墙钟。
DateTime? _parseWall(String s, int tzOffsetMin) {
  final t = s.trim();
  if (t.isEmpty) return null;
  if (_dateOnlyRe.hasMatch(t)) {
    final d = DateTime.tryParse(t);
    return d == null ? null : DateTime.utc(d.year, d.month, d.day);
  }
  final dt = DateTime.tryParse(t);
  if (dt == null) return null;
  if (!_zoneSuffixRe.hasMatch(t)) {
    // naive:组件即墙钟(秒保留 —— end_date 展示口径)。
    return DateTime.utc(
      dt.year,
      dt.month,
      dt.day,
      dt.hour,
      dt.minute,
      dt.second,
    );
  }
  return _toWall(dt.millisecondsSinceEpoch, tzOffsetMin);
}

// === 自定义规则 ===

/// `repeat_config` JSON 的类型化镜像(只取 v1 用到的字段;键名 camelCase)。
class _CustomConfig {
  const _CustomConfig({
    required this.interval,
    required this.type,
    this.startDate,
    this.endDate,
    this.weekdays = const [],
    this.monthDays = const [],
  });

  final int interval;
  final String type;
  final String? startDate;
  final String? endDate;
  final List<num> weekdays;
  final List<num> monthDays;

  /// 解析 JSON;非法/缺字段/字段类型不符返回 null(core serde 整体拒收语义)。
  static _CustomConfig? parse(String? config) {
    final json = config?.trim();
    if (json == null || json.isEmpty) return null;
    final Object? decoded;
    try {
      decoded = jsonDecode(json);
    } on FormatException {
      return null;
    }
    if (decoded is! Map) return null;

    int? interval;
    if (decoded['interval'] != null) {
      if (decoded['interval'] is! num) return null;
      interval = (decoded['interval'] as num).toInt();
    }
    var type = 'day';
    if (decoded['type'] != null) {
      if (decoded['type'] is! String) return null;
      type = decoded['type'] as String;
    }
    final startDate = decoded['startDate'];
    if (startDate != null && startDate is! String) return null;
    final endDate = decoded['endDate'];
    if (endDate != null && endDate is! String) return null;
    final weekdays = decoded['weekdays'];
    if (weekdays != null && weekdays is! List) return null;
    final monthDays = decoded['monthDays'];
    if (monthDays != null && monthDays is! List) return null;

    return _CustomConfig(
      interval: interval ?? 1,
      type: type,
      startDate: startDate as String?,
      endDate: endDate as String?,
      weekdays: (weekdays as List?)?.cast<num>() ?? const [],
      monthDays: (monthDays as List?)?.cast<num>() ?? const [],
    );
  }

  /// interval 夹紧 0..=99,步进 = interval+1。
  int get step => interval.clamp(0, 99) + 1;

  /// weekdays 1(一)~7(日)→ 周偏移 0..=6,升序去重。
  List<int> get weekdayOffsets =>
      weekdays
          .where((w) => w >= 1 && w <= 7)
          .map((w) => w.toInt() - 1)
          .toSet()
          .toList()
        ..sort();

  /// monthDays 1..=31 升序去重。
  List<int> get monthDayList =>
      monthDays
          .where((d) => d >= 1 && d <= 31)
          .map((d) => d.toInt())
          .toSet()
          .toList()
        ..sort();
}

/// 自定义规则实例墙钟日期(v1 `_compute_custom_dates`)。
List<DateTime> _computeCustomDates(
  DateTime dueWall,
  String? config,
  int tzOffsetMin,
) {
  final cfg = _CustomConfig.parse(config);
  if (cfg == null) return const [];
  final step = cfg.step;
  final start = (cfg.startDate != null && cfg.startDate!.isNotEmpty)
      ? _parseWall(cfg.startDate!, tzOffsetMin)
      : null;
  final startWall = start ?? dueWall;
  final end = (cfg.endDate != null && cfg.endDate!.isNotEmpty)
      ? _parseWall(cfg.endDate!, tzOffsetMin)
      : null;
  if (end == null) return const []; // 无 endDate → 不生成(v1 语义)
  final startD = DateTime.utc(startWall.year, startWall.month, startWall.day);
  final endD = DateTime.utc(end.year, end.month, end.day);
  final hour = startWall.hour;
  final minute = startWall.minute;

  final dates = <DateTime>[];
  switch (cfg.type) {
    case 'day':
      var cur = startD.add(Duration(days: step));
      while (!cur.isAfter(endD) && dates.length < kRepeatMaxInstances) {
        dates.add(_atHm(cur, hour, minute));
        cur = cur.add(Duration(days: step));
      }
    case 'week':
      final offsets = cfg.weekdayOffsets;
      // start 所在周的周一,整体按步进取周(Dart weekday 1=一..7=日)。
      final weekStart = startD.subtract(Duration(days: startD.weekday - 1));
      var curWeek = weekStart.add(Duration(days: step * 7));
      while (!curWeek.isAfter(endD) && dates.length < kRepeatMaxInstances) {
        for (final wd in offsets) {
          final d = curWeek.add(Duration(days: wd));
          if (startD.isBefore(d) && !d.isAfter(endD)) {
            dates.add(_atHm(d, hour, minute));
            if (dates.length >= kRepeatMaxInstances) break;
          }
        }
        curWeek = curWeek.add(Duration(days: step * 7));
      }
    case 'month':
      final days = cfg.monthDayList;
      var y = startWall.year;
      var m = startWall.month + step;
      while (dates.length < kRepeatMaxInstances) {
        while (m > 12) {
          m -= 12;
          y += 1;
        }
        if (DateTime.utc(y, m, 1).isAfter(endD)) break;
        for (final day in days) {
          final d = _safeDate(y, m, day);
          if (d != null && startD.isBefore(d) && !d.isAfter(endD)) {
            dates.add(_atHm(d, hour, minute));
            if (dates.length >= kRepeatMaxInstances) break;
          }
        }
        m += step;
      }
    case 'year':
      var y = startWall.year + step;
      while (y <= end.year + 1 && dates.length < kRepeatMaxInstances) {
        final d = _safeDate(y, startWall.month, startWall.day);
        if (d != null && !d.isAfter(endD)) {
          dates.add(_atHm(d, hour, minute));
        }
        y += step;
      }
    default:
      break; // 未知 type → 不生成(core `_ => {}`)
  }
  return dates;
}

// === 入口 ===

/// 计算重复实例日期(不含 due 当天;epoch 语义的普通 DateTime,
/// 与 [PfTask.dueAt] 同约定),上限 [kRepeatMaxInstances]。
///
/// `rule == 'none'`(不重复)或无 due → 空。日期算术在 `tzOffsetMin` 的
/// **本地墙钟**日历上进行(跨年年界等语义见 core repeat.rs 模块注释)。
List<DateTime> computeRepeatDates({
  required String rule,
  DateTime? dueAt,
  String? repeatConfig,
  required int tzOffsetMin,
}) {
  if (dueAt == null) return const [];
  final wall = _toWall(dueAt.millisecondsSinceEpoch, tzOffsetMin);
  final hour = wall.hour;
  final minute = wall.minute;
  final dates = <DateTime>[];
  final endOfYear = DateTime.utc(wall.year, 12, 31);

  switch (rule) {
    case 'none':
      break;
    case 'custom':
      return _computeCustomDates(wall, repeatConfig, tzOffsetMin)
          .map(
            (n) => DateTime.fromMillisecondsSinceEpoch(
              _fromWallMs(n, tzOffsetMin),
            ),
          )
          .toList();
    case 'daily':
    case 'weekdays':
      var cur = DateTime.utc(wall.year, wall.month, wall.day + 1);
      while (!cur.isAfter(endOfYear) && dates.length < kRepeatMaxInstances) {
        if (rule == 'daily' || cur.weekday <= 5) {
          dates.add(_atHm(cur, hour, minute));
        }
        cur = cur.add(const Duration(days: 1));
      }
    case 'weekly':
      var cur = DateTime.utc(wall.year, wall.month, wall.day + 7);
      while (!cur.isAfter(endOfYear) && dates.length < kRepeatMaxInstances) {
        dates.add(_atHm(cur, hour, minute));
        cur = cur.add(const Duration(days: 7));
      }
    case 'monthly':
      final day = wall.day;
      var y = wall.year;
      var m = wall.month;
      while (dates.length < kRepeatMaxInstances) {
        m += 1;
        if (m > 12) {
          m = 1;
          y += 1;
        }
        final d = _safeDate(y, m, day);
        if (d == null) continue; // 该月无此日(31 号遇短月)→ 跳过
        if (d.isAfter(endOfYear)) break;
        dates.add(_atHm(d, hour, minute));
      }
    case 'yearly':
      final endYear = wall.year + 5;
      var y = wall.year + 1;
      while (y <= endYear && dates.length < kRepeatMaxInstances) {
        // 2/29 在非闰年 _safeDate 返回 null → 跳过该年
        final d = _safeDate(y, wall.month, wall.day);
        if (d != null) {
          dates.add(_atHm(d, hour, minute));
        }
        y += 1;
      }
    default:
      break;
  }
  return dates
      .map(
        (n) => DateTime.fromMillisecondsSinceEpoch(_fromWallMs(n, tzOffsetMin)),
      )
      .toList();
}

/// 模板任务的重复终止时间(v1 `_compute_repeat_end_date`,墙钟算术后回 epoch)。
///
/// yearly → due+5 年(2/29 钳制 2/28);custom → config.endDate;
/// 其余 → 当年 12-31 23:59;无 due → null(调用方对 `repeat == 'none'`
/// 先行守卫,传进来也只会得到 12-31 —— 与 core 默认分支一致)。
DateTime? computeRepeatEndDate({
  required String rule,
  DateTime? dueAt,
  String? repeatConfig,
  required int tzOffsetMin,
}) {
  if (dueAt == null) return null;
  final wall = _toWall(dueAt.millisecondsSinceEpoch, tzOffsetMin);
  switch (rule) {
    case 'yearly':
      final w = _replaceYearWall(wall, wall.year + 5);
      return w == null
          ? dueAt
          : DateTime.fromMillisecondsSinceEpoch(_fromWallMs(w, tzOffsetMin));
    case 'custom':
      final cfg = _CustomConfig.parse(repeatConfig);
      if (cfg?.endDate == null) return null;
      final w = _parseWall(cfg!.endDate!, tzOffsetMin);
      return w == null
          ? null
          : DateTime.fromMillisecondsSinceEpoch(_fromWallMs(w, tzOffsetMin));
    default:
      final w = DateTime.utc(wall.year, 12, 31, 23, 59);
      return DateTime.fromMillisecondsSinceEpoch(_fromWallMs(w, tzOffsetMin));
  }
}
