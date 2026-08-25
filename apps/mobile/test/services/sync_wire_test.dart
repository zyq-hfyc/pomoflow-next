import 'package:flutter_test/flutter_test.dart';
import 'package:pomoflow_mobile/services/sync_wire.dart';

/// P1 wire 映射单测。
///
/// 字段权威 = `crates/core/src/model/{task,pomodoro}.rs`;对向的 serde
/// 兼容锁在 `crates/core/tests/mobile_wire_compat.rs`(dart 侧样例 JSON
/// 喂给 serde 反序列化),两边共同锁住 wire 形状不漂移。
void main() {
  group('msToIso / isoToMs', () {
    test('round-trips and emits Z suffix with 3-digit ms', () {
      const ms = 1746149400123;
      final iso = msToIso(ms);
      expect(iso.endsWith('Z'), isTrue);
      expect(RegExp(r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$')
          .hasMatch(iso), isTrue);
      expect(isoToMs(iso), ms);
    });

    test('empty or malformed iso yields 0', () {
      expect(isoToMs(''), 0);
      expect(isoToMs('not-a-date'), 0);
    });
  });

  group('dueLabelToIso / dueDateToLabel', () {
    final now = DateTime(2026, 8, 25, 9, 30);

    test('今天/明天/后天 map to day-12:00-local → UTC instant', () {
      for (final (label, day) in [
        ('今天', 25),
        ('明天', 26),
        ('后天', 27),
      ]) {
        final iso = dueLabelToIso(label, now: now);
        expect(iso, isNotNull, reason: label);
        // toLocal():Z 后缀 parse 回 UTC 表示,跨时区机器上以本地日断言才稳定。
        final parsed = DateTime.parse(iso!).toLocal();
        expect(parsed.year, 2026);
        expect(parsed.month, 8);
        expect(parsed.day, day);
      }
    });

    test('每天/每周/空/未知 → null(core 里"无截止")', () {
      expect(dueLabelToIso('每天', now: now), isNull);
      expect(dueLabelToIso('本周', now: now), isNull);
      expect(dueLabelToIso('', now: now), isNull);
    });

    test('round-trips label through iso', () {
      final iso = dueLabelToIso('明天', now: now)!;
      expect(dueDateToLabel(iso, now: now), '明天');
    });

    test('昨天 and far dates fall back to date string / label', () {
      // 拿"now 的前一天"生成的今天 → 相对 now 即昨天。
      final yesterday =
          dueLabelToIso('今天', now: now.subtract(const Duration(days: 1)))!;
      expect(dueDateToLabel(yesterday, now: now), '昨天');
      final far = DateTime(2026, 12, 24, 12).toUtc().toIso8601String();
      expect(dueDateToLabel(far, now: now), '2026-12-24');
      expect(dueDateToLabel(null, now: now), '');
      expect(dueDateToLabel('garbage', now: now), '');
    });
  });

  group('coreTaskPayload', () {
    test('emits every core::Task required field explicitly (even null)', () {
      final row = <String, Object?>{
        'id': 'abc1230000zzzz',
        'title': 'wire 测试任务',
        'priority': 'high',
        'due_label': '今天',
        'completed': 1,
        'estimated': 3,
        'completed_cnt': 2,
        'revision': 2,
        'updated_at_ms': 1746149400123,
      };
      final p = coreTaskPayload(row, 'u-123');

      // 无 serde default 的字段必须在 JSON 里显式出现(哪怕 null)——
      // 缺了 serde 会拒收。字段清单 = task.rs 必填集合。
      for (final key in [
        'id', 'user_id', 'title', 'project_id', 'due_date', 'completed_at',
      ]) {
        expect(p.containsKey(key), isTrue, reason: '$key 必须显式出现');
      }
      expect(p['user_id'], 'u-123');
      expect(p['project_id'], isNull);
      expect(p['completed_at'], isNull);
      expect(p['status'], 'completed');
      expect(p['priority'], 'high');
      expect(p['estimated_pomodoros'], 3);
      expect(p['completed_pomodoros'], 2);
      expect(p['revision'], 2);
      expect(p['deleted_at'], isNull);
      // due_date 由 due_label 映射而来
      expect(p['due_date'], isNotNull);
      // created_at/updated_at 同源 updated_at_ms
      expect(p['updated_at'], msToIso(1746149400123));
      expect(p['created_at'], msToIso(1746149400123));
    });

    test('active task with no due label', () {
      final p = coreTaskPayload(<String, Object?>{
        'id': 'x', 'title': 't', 'priority': 'none',
        'due_label': '', 'completed': 0,
      }, 'u');
      expect(p['status'], 'active');
      expect(p['due_date'], isNull);
    });
  });

  group('coreSessionPayload', () {
    test('empty-string refs become core null; ints/bools typed', () {
      final p = coreSessionPayload(<String, Object?>{
        'id': 'ses0000000zzz',
        'task_id': '',
        'project_id': '',
        'duration': 25,
        'started_at_ms': 1000,
        'ended_at_ms': 1000 + 25 * 60 * 1000,
        'is_completed': 1,
        'created_at_ms': 1000,
        'revision': 1,
        'updated_at_ms': 1000,
      }, 'u-9');

      for (final key in [
        'id', 'user_id', 'task_id', 'project_id', 'duration',
        'started_at', 'ended_at', 'is_completed', 'created_at',
      ]) {
        expect(p.containsKey(key), isTrue, reason: '$key 必须显式出现');
      }
      expect(p['task_id'], isNull);
      expect(p['project_id'], isNull);
      expect(p['is_completed'], isTrue);
      expect(p['duration'], 25);
      expect(p['started_at'], msToIso(1000));
    });
  });

  group('taskFieldsFromCore', () {
    test('maps core fields; never touches project/tags/subtask', () {
      final f = taskFieldsFromCore(<String, dynamic>{
        'title': '桌面端任务',
        'priority': 'low',
        'status': 'active',
        'due_date': dueLabelToIso('今天'),
        'estimated_pomodoros': 4,
        'completed_pomodoros': 1,
      });
      expect(f['title'], '桌面端任务');
      expect(f['priority'], 'low');
      expect(f['completed'], 0);
      expect(f['due_label'], '今天');
      expect(f['estimated'], 4);
      expect(f['completed_cnt'], 1);
      expect(f.containsKey('project'), isFalse);
      expect(f.containsKey('tags_csv'), isFalse);
      expect(f.containsKey('subtask_cnt'), isFalse);
    });

    test('null payload → empty map', () {
      expect(taskFieldsFromCore(null), const {});
    });
  });

  group('sessionFieldsFromCore', () {
    test('maps iso→ms and refs null→empty', () {
      final f = sessionFieldsFromCore(<String, dynamic>{
        'task_id': 'task-1',
        'project_id': null,
        'duration': 50,
        'started_at': msToIso(2000),
        'ended_at': msToIso(2000 + 50 * 60 * 1000),
        'is_completed': true,
        'created_at': msToIso(2000),
      });
      expect(f['task_id'], 'task-1');
      expect(f['project_id'], '');
      expect(f['duration'], 50);
      expect(f['started_at_ms'], 2000);
      expect(f['ended_at_ms'], 2000 + 50 * 60 * 1000);
      expect(f['is_completed'], 1);
    });
  });
}
