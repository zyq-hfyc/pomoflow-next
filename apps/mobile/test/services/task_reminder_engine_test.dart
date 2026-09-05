import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:pomoflow_mobile/models/task.dart';
import 'package:pomoflow_mobile/providers/notification_template_provider.dart';
import 'package:pomoflow_mobile/services/task_reminder_engine.dart';

/// 提醒触发引擎单测 —— 桌面 reminders.svelte.ts(v1 useReminders 移植)
/// 语义的 Dart 侧锁:提前量表 / 过滤口径 / 去重 / 专注抑制 / 先记后发 / TTL。
void main() {
  setUp(() {
    SharedPreferences.setMockInitialValues({});
    TaskReminderEngine.resetForTest();
  });

  /// 固定时基:2026-09-03 12:00 本地。任务到期 18:00(6h 后)。
  final now = DateTime(2026, 9, 3, 12, 0);
  final nowMs = now.millisecondsSinceEpoch;

  PfTask task({
    required String id,
    String reminder = 'none',
    DateTime? dueAt,
    bool completed = false,
    bool deleted = false,
  }) => PfTask(
    id: id,
    title: '任务 $id',
    reminder: reminder,
    dueAt: dueAt,
    completed: completed,
    deletedAt: deleted ? now : null,
  );

  group('kReminderOffsetMs(桌面 OFFSETS_MS 同表)', () {
    test('6 档提前量精确对齐', () {
      expect(kReminderOffsetMs['on_time'], 0);
      expect(kReminderOffsetMs['minutes5'], 5 * 60 * 1000);
      expect(kReminderOffsetMs['minutes30'], 30 * 60 * 1000);
      expect(kReminderOffsetMs['hour1'], 60 * 60 * 1000);
      expect(kReminderOffsetMs['day1'], 24 * 60 * 60 * 1000);
      expect(kReminderOffsetMs['days2'], 2 * 24 * 60 * 60 * 1000);
      // none 不在表里 → 视为无效档位
      expect(kReminderOffsetMs.containsKey('none'), isFalse);
    });
  });

  group('dueReminders 过滤口径', () {
    test('none / 无到期日 / 已完成 / 已删除 全部跳过', () {
      final due = DateTime(2026, 9, 3, 11, 0); // 已过
      final out = dueReminders(
        tasks: [
          task(id: 'a', reminder: 'none', dueAt: due),
          task(id: 'b', reminder: 'minutes30'),
          task(id: 'c', reminder: 'minutes30', dueAt: due, completed: true),
          task(id: 'd', reminder: 'minutes30', dueAt: due, deleted: true),
        ],
        nowMs: nowMs,
        firedKeys: {},
      );
      expect(out, isEmpty);
    });

    test('到点命中:提醒时间点 = 到期日 − 提前量', () {
      final due = DateTime(2026, 9, 3, 12, 29); // −30s 后即到提醒点
      final out = dueReminders(
        tasks: [task(id: 'a', reminder: 'minutes30', dueAt: due)],
        nowMs: nowMs,
        firedKeys: {},
      );
      expect(out, hasLength(1));
      expect(out.first.task.id, 'a');
      expect(out.first.reminderMs, due.millisecondsSinceEpoch - 30 * 60 * 1000);
    });

    test('未到提醒时间点跳过;准时档 reminderMs = 到期毫秒', () {
      final out = dueReminders(
        tasks: [
          // 18:00 到期,提前 30 分钟 → 17:30 提醒,12:00 未到
          task(
            id: 'future',
            reminder: 'minutes30',
            dueAt: DateTime(2026, 9, 3, 18),
          ),
          // 准时档,11:00 已过 → 命中且 reminderMs == dueMs
          task(
            id: 'ontime',
            reminder: 'on_time',
            dueAt: DateTime(2026, 9, 3, 11),
          ),
        ],
        nowMs: nowMs,
        firedKeys: {},
      );
      expect(out, hasLength(1));
      expect(out.first.task.id, 'ontime');
      expect(
        out.first.reminderMs,
        DateTime(2026, 9, 3, 11).millisecondsSinceEpoch,
      );
    });

    test('去重键命中跳过;专注中整轮为空', () {
      final due = DateTime(2026, 9, 3, 11);
      final t = task(id: 'a', reminder: 'minutes30', dueAt: due);
      final key = reminderDedupKey(
        'a',
        due.millisecondsSinceEpoch - 30 * 60 * 1000,
      );
      expect(
        dueReminders(tasks: [t], nowMs: nowMs, firedKeys: {key}),
        isEmpty,
        reason: '已触发过的键不再重复',
      );
      expect(
        dueReminders(tasks: [t], nowMs: nowMs, firedKeys: {}, isFocusing: true),
        isEmpty,
        reason: '专注中抑制,交给专注结束后的补弹',
      );
    });
  });

  group('stableNotificationId / reminderDedupKey', () {
    test('去重键格式 = taskId:reminderMs', () {
      expect(reminderDedupKey('abc', 123), 'abc:123');
    });

    test('通知 id 为正整数且跨调用稳定、不同键不同值', () {
      final a = stableNotificationId('t1:100');
      expect(a, stableNotificationId('t1:100'));
      expect(a, greaterThan(0));
      expect(a, lessThanOrEqualTo(0x7fffffff));
      expect(
        stableNotificationId('t1:100'),
        isNot(stableNotificationId('t1:101')),
      );
      expect(
        stableNotificationId('t1:100'),
        isNot(stableNotificationId('t2:100')),
      );
    });
  });

  group('runReminderCheck(壳:去重持久化 + 发射)', () {
    test('到点发射 → {task_title} 替换 → 二轮不重复', () async {
      final due = DateTime(2026, 9, 3, 11);
      final fired = <(int, String, String)>[];
      final tasks = [task(id: 'a', reminder: 'on_time', dueAt: due)];

      final sent1 = await runReminderCheck(
        tasks: tasks,
        templateTitle: '任务提醒 📌',
        templateBody: '「{task_title}」提醒时间已到',
        nowMs: () => nowMs,
        fire: (id, title, body) async => fired.add((id, title, body)),
      );
      expect(sent1, 1);
      expect(fired, hasLength(1));
      expect(fired.first.$2, '任务提醒 📌');
      expect(fired.first.$3, '「任务 a」提醒时间已到');
      // 通知 id 可复算(去重键派生)
      final key = reminderDedupKey('a', due.millisecondsSinceEpoch);
      expect(fired.first.$1, stableNotificationId(key));

      // 二轮:去重表已持久化(SharedPreferences mock)→ 不再发射
      final sent2 = await runReminderCheck(
        tasks: tasks,
        templateTitle: '任务提醒 📌',
        templateBody: '「{task_title}」提醒时间已到',
        nowMs: () => nowMs,
        fire: (id, title, body) async => fired.add((id, title, body)),
      );
      expect(sent2, 0);
      expect(fired, hasLength(1));
    });

    test('专注中不标记 —— 结束后下一轮仍能补弹', () async {
      final due = DateTime(2026, 9, 3, 11);
      final tasks = [task(id: 'a', reminder: 'on_time', dueAt: due)];
      final fired = <(int, String, String)>[];

      final during = await runReminderCheck(
        tasks: tasks,
        templateTitle: 't',
        templateBody: 'b',
        nowMs: () => nowMs,
        isFocusing: true,
        fire: (id, title, body) async => fired.add((id, title, body)),
      );
      expect(during, 0);

      final after = await runReminderCheck(
        tasks: tasks,
        templateTitle: 't',
        templateBody: 'b',
        nowMs: () => nowMs,
        fire: (id, title, body) async => fired.add((id, title, body)),
      );
      expect(after, 1, reason: '专注中未标记 → 结束后补弹');
    });

    test('单条发射失败不中断后续', () async {
      final tasks = [
        task(id: 'a', reminder: 'on_time', dueAt: DateTime(2026, 9, 3, 10)),
        task(id: 'b', reminder: 'on_time', dueAt: DateTime(2026, 9, 3, 11)),
      ];
      var sent = 0;
      final n = await runReminderCheck(
        tasks: tasks,
        templateTitle: 't',
        templateBody: 'b',
        nowMs: () => nowMs,
        fire: (id, title, body) async {
          // 第一次调用抛错(平台通道失败),第二次照常成功
          if (sent == 0) {
            sent++;
            throw Exception('platform channel boom');
          }
          sent++;
        },
      );
      expect(n, 1, reason: '失败的不计入 sent');
      expect(sent, 2, reason: '第二条仍被调用');
    });

    test('7 天 TTL 清理:过期去重记录被移除', () async {
      final prefs = await SharedPreferences.getInstance();
      const oldKey = 'zzz:1';
      const liveKey = 'aaa:2';
      await prefs.setString(
        'pf_fired_reminders',
        '{"$oldKey":${nowMs - 8 * 24 * 60 * 60 * 1000},"$liveKey":$nowMs}',
      );

      await runReminderCheck(
        tasks: const [],
        templateTitle: 't',
        templateBody: 'b',
        nowMs: () => nowMs,
        fire: (id, title, body) async {},
      );

      final raw = prefs.getString('pf_fired_reminders')!;
      expect(raw.contains(oldKey), isFalse);
      expect(raw.contains(liveKey), isTrue);
    });

    test('损坏的去重 JSON 按空表处理不抛', () async {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('pf_fired_reminders', 'not-json{');
      final due = DateTime(2026, 9, 3, 11);
      final n = await runReminderCheck(
        tasks: [task(id: 'a', reminder: 'on_time', dueAt: due)],
        templateTitle: 't',
        templateBody: 'b',
        nowMs: () => nowMs,
        fire: (id, title, body) async {},
      );
      expect(n, 1);
    });
  });

  group('FocusGuard', () {
    test('running && focusMode 双条件', () {
      FocusGuard.update(running: true, focusMode: true);
      expect(FocusGuard.isFocusing, isTrue);
      FocusGuard.update(running: true, focusMode: false); // 休息计时不算
      expect(FocusGuard.isFocusing, isFalse);
      FocusGuard.update(running: false, focusMode: true); // 暂停不算
      expect(FocusGuard.isFocusing, isFalse);
    });
  });

  group('通知模板(桌面默认风格逐字对齐,2026-09-05 起只读)', () {
    test('默认文案与桌面 notificationStyles.ts default 预设一致', () {
      final p = NotificationTemplateProvider();
      expect(p.focusTitle, '专注结束');
      expect(p.focusBody, '番茄钟结束了，休息一下吧');
      expect(p.breakTitle, '休息结束');
      expect(p.breakBody, '休息结束，满满的能量开启新的任务专注。');
      expect(p.reminderTitle, 'PomoFlow 任务提醒');
      expect(p.reminderBody, contains('{task_title}'));
    });

    test('旧版自定义值经 initialize 恢复(short 优先于 long 作为休息文案)', () async {
      SharedPreferences.setMockInitialValues({
        'notif_reminder_title': 'T',
        'notif_reminder_body': '「{task_title}」!',
        'notif_short_title': '小憩结束',
        'notif_long_title': '长休结束',
      });
      final p = NotificationTemplateProvider();
      await p.initialize();
      expect(p.reminderTitle, 'T');
      expect(p.reminderBody, '「{task_title}」!');
      expect(p.breakTitle, '小憩结束'); // short 优先、long 兜底
      expect(p.breakBody, '休息结束，满满的能量开启新的任务专注。');
    });

    test('substitute 占位符替换(无任务退空串)', () {
      const body = '任务「{task_title}」提醒时间已到';
      expect(
        NotificationTemplateProvider.substitute(body, taskTitle: '写周报'),
        '任务「写周报」提醒时间已到',
      );
      expect(NotificationTemplateProvider.substitute(body), '任务「」提醒时间已到');
    });
  });
}
