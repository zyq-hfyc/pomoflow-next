import 'package:flutter_test/flutter_test.dart';
import 'package:pomoflow_mobile/models/review_period.dart';
import 'package:pomoflow_mobile/pages/journal_page/month_view.dart';

/// 月历改造批(2026-09-15)纯函数锁:日点三态 + ISO 周数。
void main() {
  group('dayDotStatus(日点颜色逻辑)', () {
    test('无任务/待办/复盘 → 空(灰点)', () {
      expect(
        dayDotStatus(hasTask: false, allDone: true, hasReview: false),
        DayDotStatus.empty,
      );
    });

    test('仅有复盘(无任务/待办)→ 绿(无可未完成项)', () {
      expect(
        dayDotStatus(hasTask: false, allDone: true, hasReview: true),
        DayDotStatus.done,
      );
    });

    test('任务/待办全完成 → 绿点', () {
      expect(
        dayDotStatus(hasTask: true, allDone: true, hasReview: false),
        DayDotStatus.done,
      );
      expect(
        dayDotStatus(hasTask: true, allDone: true, hasReview: true),
        DayDotStatus.done,
      );
    });

    test('任一未完成 → 红点(哪怕其余全完成)', () {
      expect(
        dayDotStatus(hasTask: true, allDone: false, hasReview: false),
        DayDotStatus.pending,
      );
      expect(
        dayDotStatus(hasTask: true, allDone: false, hasReview: true),
        DayDotStatus.pending,
      );
    });
  });

  group('isoWeekNumber(ISO 8601 周数)', () {
    test('2026-01-01 是周四 → 第 1 周', () {
      expect(isoWeekNumber(DateTime(2026, 1, 1)), 1);
    });

    test('2026-01-15(周四)→ 第 3 周', () {
      expect(isoWeekNumber(DateTime(2026, 1, 15)), 3);
    });

    test('周日属于本周:2026-01-04(周日)→ 第 1 周;01-05(周一)→ 第 2 周', () {
      expect(isoWeekNumber(DateTime(2026, 1, 4)), 1);
      expect(isoWeekNumber(DateTime(2026, 1, 5)), 2);
    });

    test('跨年:2027-01-01(周五)→ 属于 2026 年的第 53 周', () {
      // 2027-01-01 是周五,其所在 ISO 周的周四是 2026-12-31 → 2026 年第 53 周
      expect(isoWeekNumber(DateTime(2027, 1, 1)), 53);
    });

    test('已知锚点:2026-09-15(周二)→ 第 38 周', () {
      // 2026-09-15 所在周的周四是 2026-09-17;2026-01-01 是周四(第 1 周周四)
      // → 差 259 天 = 37 周 → 第 38 周
      expect(isoWeekNumber(DateTime(2026, 9, 15)), 38);
    });
  });
}
