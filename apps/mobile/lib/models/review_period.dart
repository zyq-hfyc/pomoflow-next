/// 复盘周期类型 + 纯函数键引擎。
///
/// 四种粒度(日/周/月/年)的「日期 → 同步自然键 / 键步进 / 键解析校验 /
/// 展示文案」全部集中在此,UI(sheet / 复盘页)与测试共用。
/// 键语义对齐 core::review:date=yyyy-mm-dd、week_start=周一 yyyy-mm-dd、
/// year_month=yyyy-mm、year=YYYY(4 位)。
library;

/// 复盘周期粒度。
enum ReviewPeriod { daily, weekly, monthly, yearly }

/// 复盘周期扩展:标签 / 编辑区标题。
extension ReviewPeriodX on ReviewPeriod {
  /// Tab 短标签。
  String get label => switch (this) {
    ReviewPeriod.daily => '日',
    ReviewPeriod.weekly => '周',
    ReviewPeriod.monthly => '月',
    ReviewPeriod.yearly => '年',
  };

  /// 编辑区标题(不带「今日/本周」等时间指涉 —— 页面可导航到任意周期段)。
  String get title => switch (this) {
    ReviewPeriod.daily => '日复盘',
    ReviewPeriod.weekly => '周复盘',
    ReviewPeriod.monthly => '月复盘',
    ReviewPeriod.yearly => '年复盘',
  };
}

String _pad2(int v) => v.toString().padLeft(2, '0');
String _ymd(DateTime d) =>
    '${d.year.toString().padLeft(4, '0')}-${_pad2(d.month)}-${_pad2(d.day)}';

/// 日期归一(丢时分秒,只留年月日)。
DateTime dayOf(DateTime d) => DateTime(d.year, d.month, d.day);

/// 该日期所在周的周一(ISO 周,周一为起点)。
DateTime mondayOf(DateTime d) =>
    dayOf(d.subtract(Duration(days: d.weekday - 1)));

/// 日期 → 该周期自然键。
String reviewKeyOf(ReviewPeriod p, DateTime date) {
  switch (p) {
    case ReviewPeriod.daily:
      return _ymd(dayOf(date));
    case ReviewPeriod.weekly:
      return _ymd(mondayOf(date));
    case ReviewPeriod.monthly:
      return '${date.year.toString().padLeft(4, '0')}-${_pad2(date.month)}';
    case ReviewPeriod.yearly:
      return date.year.toString().padLeft(4, '0');
  }
}

/// 当前时刻的自然键。
String currentReviewKey(ReviewPeriod p) => reviewKeyOf(p, DateTime.now());

/// 键 → 锚点日期(日=当天,周=周一,月=当月 1 号,年=当年元旦)。
/// 非法键(格式错 / 不存在的日期 / 周键不是周一)→ null。
DateTime? parseReviewKey(ReviewPeriod p, String key) {
  final ok = switch (p) {
    ReviewPeriod.daily => RegExp(r'^(\d{4})-(\d{2})-(\d{2})$').firstMatch(key),
    ReviewPeriod.weekly => RegExp(r'^(\d{4})-(\d{2})-(\d{2})$').firstMatch(key),
    ReviewPeriod.monthly => RegExp(r'^(\d{4})-(\d{2})$').firstMatch(key),
    ReviewPeriod.yearly => RegExp(r'^(\d{4})$').firstMatch(key),
  };
  if (ok == null) return null;
  final y = int.parse(ok.group(1)!);
  final m = p == ReviewPeriod.yearly ? 1 : int.parse(ok.group(2)!);
  final d = (p == ReviewPeriod.daily || p == ReviewPeriod.weekly)
      ? int.parse(ok.group(3)!)
      : 1;
  final anchor = DateTime(y, m, d);
  // Dart 会把 2026-02-30 归一成 3 月 2 日 —— 组件回代校验拒绝幻影日期。
  if (anchor.year != y || anchor.month != m || anchor.day != d) return null;
  if (p == ReviewPeriod.weekly && anchor.weekday != DateTime.monday) {
    return null; // week_start 语义上必须是周一
  }
  return anchor;
}

/// 键合法性(= parse 得出非 null)。
bool isValidReviewKey(ReviewPeriod p, String key) =>
    parseReviewKey(p, key) != null;

/// 键在周期轴上步进 [delta] 步(复盘页 ‹ › 导航)。
///
/// 组件式加减(Dart 自动归一跨月/跨年),不吃 Duration 的绝对时间运算,
/// 规避夏令时半日漂移;非法键回退当前周期键。
String stepReviewKey(ReviewPeriod p, String key, int delta) {
  final anchor = parseReviewKey(p, key) ?? _nowAnchor(p);
  final stepped = switch (p) {
    ReviewPeriod.daily => DateTime(
      anchor.year,
      anchor.month,
      anchor.day + delta,
    ),
    ReviewPeriod.weekly => DateTime(
      anchor.year,
      anchor.month,
      anchor.day + 7 * delta,
    ),
    ReviewPeriod.monthly => DateTime(anchor.year, anchor.month + delta, 1),
    ReviewPeriod.yearly => DateTime(anchor.year + delta, 1, 1),
  };
  return reviewKeyOf(p, stepped);
}

DateTime _nowAnchor(ReviewPeriod p) => switch (p) {
  ReviewPeriod.daily => dayOf(DateTime.now()),
  ReviewPeriod.weekly => mondayOf(DateTime.now()),
  ReviewPeriod.monthly => DateTime(
    DateTime.now().year,
    DateTime.now().month,
    1,
  ),
  ReviewPeriod.yearly => DateTime(DateTime.now().year, 1, 1),
};

/// 键 → 编辑区副标题(给用户看的周期段描述)。
String reviewKeyLabel(ReviewPeriod p, String key) {
  switch (p) {
    case ReviewPeriod.daily:
      return key;
    case ReviewPeriod.weekly:
      return '周一 $key 起';
    case ReviewPeriod.monthly:
      return key;
    case ReviewPeriod.yearly:
      return '$key 年';
  }
}
