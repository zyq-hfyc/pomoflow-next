import 'package:flutter_test/flutter_test.dart';
import 'package:pomoflow_mobile/models/review_period.dart';

/// 复盘周期纯函数引擎回归锁(键语义对齐 core::review)。
void main() {
  group('reviewKeyOf', () {
    test('daily → yyyy-mm-dd', () {
      expect(
        reviewKeyOf(ReviewPeriod.daily, DateTime(2026, 9, 4)),
        '2026-09-04',
      );
    });

    test('weekly → 吸附所在周周一(周日归上周)', () {
      // 2026-09-04 是周五 → 周一 2026-08-31
      expect(
        reviewKeyOf(ReviewPeriod.weekly, DateTime(2026, 9, 4)),
        '2026-08-31',
      );
      // 周日 2026-09-06 仍属 08-31 那周
      expect(
        reviewKeyOf(ReviewPeriod.weekly, DateTime(2026, 9, 6)),
        '2026-08-31',
      );
      // 周一本身不变
      expect(
        reviewKeyOf(ReviewPeriod.weekly, DateTime(2026, 8, 31)),
        '2026-08-31',
      );
    });

    test('monthly → yyyy-mm;yearly → 4 位 yyyy', () {
      expect(
        reviewKeyOf(ReviewPeriod.monthly, DateTime(2026, 11, 20)),
        '2026-11',
      );
      expect(reviewKeyOf(ReviewPeriod.yearly, DateTime(2026, 3, 3)), '2026');
    });
  });

  group('parseReviewKey / isValidReviewKey', () {
    test('合法键解析出锚点(日=当天,周=周一,月=1 号,年=元旦)', () {
      expect(
        parseReviewKey(ReviewPeriod.daily, '2026-09-04'),
        DateTime(2026, 9, 4),
      );
      expect(
        parseReviewKey(ReviewPeriod.weekly, '2026-08-31')!.weekday,
        DateTime.monday,
      );
      expect(
        parseReviewKey(ReviewPeriod.monthly, '2026-09'),
        DateTime(2026, 9, 1),
      );
      expect(parseReviewKey(ReviewPeriod.yearly, '2026'), DateTime(2026, 1, 1));
    });

    test('幻影日期 / 格式错 / 周键非周一 → null', () {
      expect(parseReviewKey(ReviewPeriod.daily, '2026-02-30'), isNull);
      expect(parseReviewKey(ReviewPeriod.daily, '2026-9-4'), isNull);
      expect(parseReviewKey(ReviewPeriod.monthly, '2026-13'), isNull);
      expect(parseReviewKey(ReviewPeriod.monthly, '2026-9'), isNull);
      expect(parseReviewKey(ReviewPeriod.yearly, '20266'), isNull);
      expect(parseReviewKey(ReviewPeriod.yearly, '26'), isNull);
      // 2026-09-04 是周五,不能作 week_start
      expect(parseReviewKey(ReviewPeriod.weekly, '2026-09-04'), isNull);
      expect(isValidReviewKey(ReviewPeriod.daily, '2026-09-04'), isTrue);
      expect(isValidReviewKey(ReviewPeriod.daily, 'bogus'), isFalse);
    });
  });

  group('stepReviewKey', () {
    test('daily 跨月/跨年进退', () {
      expect(stepReviewKey(ReviewPeriod.daily, '2026-01-31', 1), '2026-02-01');
      expect(stepReviewKey(ReviewPeriod.daily, '2026-12-31', 1), '2027-01-01');
      expect(stepReviewKey(ReviewPeriod.daily, '2026-03-01', -1), '2026-02-28');
    });

    test('weekly 一次一整周(7 天)', () {
      expect(stepReviewKey(ReviewPeriod.weekly, '2026-08-31', 1), '2026-09-07');
      expect(
        stepReviewKey(ReviewPeriod.weekly, '2026-09-07', -2),
        '2026-08-24',
      );
    });

    test('monthly 跨年归一;yearly 一次一年', () {
      expect(stepReviewKey(ReviewPeriod.monthly, '2026-12', 1), '2027-01');
      expect(stepReviewKey(ReviewPeriod.monthly, '2027-01', -1), '2026-12');
      expect(stepReviewKey(ReviewPeriod.yearly, '2026', 1), '2027');
      expect(stepReviewKey(ReviewPeriod.yearly, '2026', -10), '2016');
    });

    test('非法键回退当前周期(产物仍是合法键,不抛)', () {
      // 两次独立取 now 可能跨午夜,不做逐字相等,锁语义即可。
      final stepped = stepReviewKey(ReviewPeriod.daily, 'bogus', 1);
      expect(isValidReviewKey(ReviewPeriod.daily, stepped), isTrue);
      expect(
        isValidReviewKey(
          ReviewPeriod.weekly,
          stepReviewKey(ReviewPeriod.weekly, '', -3),
        ),
        isTrue,
      );
      expect(
        isValidReviewKey(
          ReviewPeriod.monthly,
          stepReviewKey(ReviewPeriod.monthly, 'x', 1),
        ),
        isTrue,
      );
      expect(
        isValidReviewKey(
          ReviewPeriod.yearly,
          stepReviewKey(ReviewPeriod.yearly, '99', 1),
        ),
        isTrue,
      );
    });
  });

  group('reviewKeyOf ↔ parseReviewKey round-trip', () {
    test('四种周期任意日期往返', () {
      final dates = [
        DateTime(2024, 2, 29), // 闰日
        DateTime(2026, 1, 1),
        DateTime(2026, 12, 31),
        DateTime(2026, 9, 4),
      ];
      for (final p in ReviewPeriod.values) {
        for (final d in dates) {
          final key = reviewKeyOf(p, d);
          expect(isValidReviewKey(p, key), isTrue, reason: '$p $key');
        }
      }
      // 闰日按周粒度归到所在周周一,解析合法
      expect(
        reviewKeyOf(ReviewPeriod.weekly, DateTime(2024, 2, 29)),
        '2024-02-26',
      );
    });
  });

  group('reviewKeyLabel', () {
    test('四粒度展示文案', () {
      expect(reviewKeyLabel(ReviewPeriod.daily, '2026-09-04'), '2026-09-04');
      expect(
        reviewKeyLabel(ReviewPeriod.weekly, '2026-08-31'),
        '周一 2026-08-31 起',
      );
      expect(reviewKeyLabel(ReviewPeriod.monthly, '2026-09'), '2026-09');
      expect(reviewKeyLabel(ReviewPeriod.yearly, '2026'), '2026 年');
    });
  });
}
