import 'package:flutter_test/flutter_test.dart';
import 'package:pomoflow_mobile/services/repeat_engine.dart';

/// 重复日期引擎对拍单测 —— 逐例镜像 `crates/core/src/repeat.rs` 的测试集
/// (fixtures 同值;Dart 侧任何语义漂移都会在这里现形)。
void main() {
  /// 墙钟字符串 → epoch 语义 DateTime(在 [tz] 时区下;naive 串即墙钟)。
  DateTime dueAtOf(String wall, int tz) {
    final p = DateTime.parse(wall);
    final w = DateTime.utc(p.year, p.month, p.day, p.hour, p.minute, p.second);
    return DateTime.fromMillisecondsSinceEpoch(
      w.millisecondsSinceEpoch - tz * 60000,
    );
  }

  /// epoch DateTime → 墙钟字符串(断言可读;tz=0 时墙钟 == UTC)。
  String fmt(DateTime d, int tz) {
    final w = DateTime.fromMillisecondsSinceEpoch(
      d.millisecondsSinceEpoch + tz * 60000,
      isUtc: true,
    );
    String two(int n) => n.toString().padLeft(2, '0');
    return '${w.year}-${two(w.month)}-${two(w.day)} '
        '${two(w.hour)}:${two(w.minute)}';
  }

  List<String> datesOf(String rule, String due, {String? config, int tz = 0}) =>
      computeRepeatDates(
        rule: rule,
        dueAt: dueAtOf(due, tz),
        repeatConfig: config,
        tzOffsetMin: tz,
      ).map((d) => fmt(d, tz)).toList();

  group('基础规则(镜像 core repeat.rs)', () {
    test('no_due_or_no_rule_yields_empty', () {
      expect(
        computeRepeatDates(rule: 'daily', dueAt: null, tzOffsetMin: 0),
        isEmpty,
      );
      expect(
        computeRepeatDates(
          rule: 'none',
          dueAt: dueAtOf('2026-08-16T09:00', 0),
          tzOffsetMin: 0,
        ),
        isEmpty,
      );
    });

    test('daily_steps_to_end_of_year', () {
      // 12-30 起:12-31 一条就到年底
      expect(datesOf('daily', '2026-12-30T09:30'), ['2026-12-31 09:30']);
      // 8-16(周日)起:次日 8-17
      expect(datesOf('daily', '2026-08-16T09:30').first, '2026-08-17 09:30');
      // 秒归零(v1 make() 只传时分)
      final out = computeRepeatDates(
        rule: 'daily',
        dueAt: dueAtOf('2026-08-16T09:30:45', 0),
        tzOffsetMin: 0,
      );
      final wall = DateTime.fromMillisecondsSinceEpoch(
        out.first.millisecondsSinceEpoch,
        isUtc: true,
      );
      expect(wall.second, 0);
      expect('${wall.hour}:${wall.minute}', '9:30');
    });

    test('daily_caps_at_50', () {
      final out = computeRepeatDates(
        rule: 'daily',
        dueAt: dueAtOf('2026-01-01T09:00', 0),
        tzOffsetMin: 0,
      );
      expect(out.length, 50);
      expect(fmt(out[49], 0), '2026-02-20 09:00');
    });

    test('daily_new_year_boundary_uses_local_calendar', () {
      // 东八区纯日期 due 2026-01-01(本地午夜):年界按本地年算 → 正常生成
      final out = datesOf('daily', '2026-01-01T00:00', tz: 480);
      expect(out.length, 50);
      expect(out[0], '2026-01-02 00:00');
      expect(out.last, '2026-02-20 00:00');

      // 12-31 到期:年内已无剩余日期 → 0 实例
      expect(datesOf('daily', '2026-12-31T00:00', tz: 480), isEmpty);
      // 12-30 到期:恰好剩 12-31 一个
      expect(datesOf('daily', '2026-12-30T00:00', tz: 480), [
        '2026-12-31 00:00',
      ]);
    });

    test('weekday_skips_weekend', () {
      // 2026-08-14 周五 → 下一个是周一 8-17,再 8-18/19/20/21,跳过周末
      final out = datesOf('weekdays', '2026-08-14T09:00');
      expect(out.take(5), [
        '2026-08-17 09:00',
        '2026-08-18 09:00',
        '2026-08-19 09:00',
        '2026-08-20 09:00',
        '2026-08-21 09:00',
      ]);
      expect(
        out.any(
          (d) => d.startsWith('2026-08-22') || d.startsWith('2026-08-23'),
        ),
        isFalse,
      );
    });

    test('weekly_same_weekday_weekly', () {
      // 8-16 周日 → 8-23 / 8-30 ... 到 12-27 共 19 个周日
      final out = datesOf('weekly', '2026-08-16T10:00');
      expect(out.take(2), ['2026-08-23 10:00', '2026-08-30 10:00']);
      expect(out.length, 19);
    });

    test('monthly_skips_months_lacking_day_and_stops_at_year_end', () {
      // 31 号月重复 → 缺 31 号的月份整月跳过(不钳制到 30);次年 1-31 > 12-31 → 停
      expect(datesOf('monthly', '2026-01-31T08:00'), [
        '2026-03-31 08:00',
        '2026-05-31 08:00',
        '2026-07-31 08:00',
        '2026-08-31 08:00',
        '2026-10-31 08:00',
        '2026-12-31 08:00',
      ]);
    });

    test('yearly_five_years_and_skips_feb29', () {
      // due 取闰年 2028-02-29:2029-2031 非闰年跳过,2032 闰年且 <= 2028+5
      expect(datesOf('yearly', '2028-02-29T09:00'), ['2032-02-29 09:00']);
      final normal = datesOf('yearly', '2026-08-16T09:00');
      expect(normal.length, 5);
      expect(normal[0], '2027-08-16 09:00');
      expect(normal[4], '2031-08-16 09:00');
    });
  });

  group('custom(镜像 core repeat.rs custom 组)', () {
    test('custom_invalid_or_missing_end_yields_empty', () {
      expect(
        datesOf('custom', '2026-08-16T09:00', config: 'not json'),
        isEmpty,
      );
      expect(
        datesOf(
          'custom',
          '2026-08-16T09:00',
          config: '{"type":"day","interval":1,"startDate":"2026-08-16"}',
        ),
        isEmpty,
      );
    });

    test('custom_day_interval_zero_means_every_day', () {
      // interval 0 → 步进 1:每天,严格 > start;时间取 startDate(00:00)
      expect(
        datesOf(
          'custom',
          '2026-08-16T09:00',
          config: '{"interval":0,"type":"day","startDate":"2026-08-16","endDate":"2026-08-20"}',
        ),
        [
          '2026-08-17 00:00',
          '2026-08-18 00:00',
          '2026-08-19 00:00',
          '2026-08-20 00:00',
        ],
      );
    });

    test('custom_day_interval_one_skips_a_day', () {
      expect(
        datesOf(
          'custom',
          '2026-08-16T09:00',
          config: '{"interval":1,"type":"day","startDate":"2026-08-16","endDate":"2026-08-25"}',
        ),
        [
          '2026-08-18 00:00',
          '2026-08-20 00:00',
          '2026-08-22 00:00',
          '2026-08-24 00:00',
        ],
      );
    });

    test('custom_interval_clamped_to_99', () {
      // interval 999 → 夹到 99 → 步进 100 天:8-16 + 100 = 11-24
      expect(
        datesOf(
          'custom',
          '2026-08-16T09:00',
          config: '{"interval":999,"type":"day","startDate":"2026-08-16","endDate":"2026-12-31"}',
        ),
        ['2026-11-24 00:00'],
      );
    });

    test('custom_week_weekdays_and_strict_bounds', () {
      // start 8-16(周日,所在周周一 8-10);步进 1;周一周五;end 8-28
      expect(
        datesOf(
          'custom',
          '2026-08-16T09:00',
          config: '{"interval":0,"type":"week","startDate":"2026-08-16","endDate":"2026-08-28","weekdays":[1,5]}',
        ),
        [
          '2026-08-17 00:00',
          '2026-08-21 00:00',
          '2026-08-24 00:00',
          '2026-08-28 00:00',
        ],
      );
      // 严格起点:候选周从 start+step 周起,start 所在周永不生成
      expect(
        datesOf(
          'custom',
          '2026-08-16T09:00',
          config: '{"interval":0,"type":"week","startDate":"2026-08-16","endDate":"2026-08-16","weekdays":[1]}',
        ),
        isEmpty,
      );
    });

    test('custom_month_days_skip_invalid', () {
      // monthDays 29/31:2 月两日皆无效跳过;3 月取 29/31(升序);
      // 严格 start_d < d:1-31 当天已过不生成;m=4 时月首 > end → 停
      expect(
        datesOf(
          'custom',
          '2026-01-31T09:00',
          config: '{"interval":0,"type":"month","startDate":"2026-01-31","endDate":"2026-03-31","monthDays":[31,29]}',
        ),
        ['2026-03-29 00:00', '2026-03-31 00:00'],
      );
    });

    test('custom_year_same_month_day_stepped', () {
      expect(
        datesOf(
          'custom',
          '2026-08-16T09:00',
          config: '{"interval":1,"type":"year","startDate":"2026-08-16","endDate":"2031-12-31"}',
        ),
        ['2028-08-16 00:00', '2030-08-16 00:00'],
      );
    });

    test('custom_start_time_taken_from_config_start', () {
      // startDate 自带 14:30 → 实例时间用 14:30 而非 due 的 09:00
      expect(
        datesOf(
          'custom',
          '2026-08-16T09:00',
          config: '{"interval":0,"type":"day","startDate":"2026-08-16T14:30","endDate":"2026-08-17"}',
        ),
        ['2026-08-17 14:30'],
      );
    });

    test('custom_caps_at_50', () {
      expect(
        datesOf(
          'custom',
          '2026-01-01T09:00',
          config: '{"interval":0,"type":"day","startDate":"2026-01-01","endDate":"2030-12-31"}',
        ).length,
        50,
      );
    });
  });

  group('repeat_end_date(镜像 core end date 组)', () {
    DateTime? endOf(String rule, String due, String? config, {int tz = 0}) =>
        computeRepeatEndDate(
          rule: rule,
          dueAt: dueAtOf(due, tz),
          repeatConfig: config,
          tzOffsetMin: tz,
        );

    test('end_date_yearly_clamps_feb29', () {
      final e = endOf('yearly', '2028-02-29T09:00', null)!;
      expect(fmt(e, 0), '2033-02-28 09:00');
    });

    test('end_date_yearly_new_year_boundary_local', () {
      // 东八区 2026-01-01 本地午夜:终止时间应在本地 2031-01-01
      final e = endOf('yearly', '2026-01-01T00:00', null, tz: 480)!;
      expect(fmt(e, 480), '2031-01-01 00:00');
    });

    test('end_date_custom_takes_config_end', () {
      final e = endOf(
        'custom',
        '2026-08-16T09:00',
        '{"type":"week","endDate":"2026-10-01","weekdays":[1]}',
      )!;
      expect(fmt(e, 0), '2026-10-01 00:00');
      // 配置缺 endDate → null
      expect(endOf('custom', '2026-08-16T09:00', '{"type":"day"}'), isNull);
    });

    test('end_date_regular_rules_dec31', () {
      expect(
        fmt(endOf('daily', '2026-08-16T09:00', null)!, 0),
        '2026-12-31 23:59',
      );
      expect(computeRepeatEndDate(rule: 'daily', tzOffsetMin: 0), isNull);
    });
  });
}
