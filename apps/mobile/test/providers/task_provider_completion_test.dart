import 'package:flutter_test/flutter_test.dart';

import 'package:pomoflow_mobile/models/task.dart';
import 'package:pomoflow_mobile/providers/task_provider.dart';

/// 完成链语义锁(2026-09-05 桌面对齐批):
/// - completePomodoro:计数 +1,达预估自动 completed + completed_at
///   (桌面 stop_pomodoro 同构;estimated=0 一个番茄即完成,v1 语义);
/// - pickNextAutoTask:候选池口径与排序(桌面 pickNextAutoTask 同构)。
void main() {
  PfTask t(
    String id, {
    PfPriority priority = PfPriority.none,
    DateTime? dueAt,
    bool completed = false,
    int estimated = 1,
    int completedPomos = 0,
    DateTime? updatedAt,
  }) => PfTask(
    id: id,
    title: id,
    priority: priority,
    dueAt: dueAt,
    completed: completed,
    estimatedPomos: estimated,
    completedPomos: completedPomos,
    syncMeta: PfSyncMeta(updatedAt: updatedAt),
  );

  group('start/stopPomodoro(内存路径,桌面 start/stop_pomodoro 同构)', () {
    late TaskProvider p;

    setUp(() async {
      p = TaskProvider.demo();
      await p.addTask(t('target-a', estimated: 3));
      await p.addTask(t('target-b', estimated: 2, completedPomos: 1));
      await p.addTask(t('target-c', estimated: 0));
      await p.setFocusTask(null);
    });

    PfTask byId(String id) => p.tasks.firstWhere((x) => x.id == id);

    test('开始即落 open 行(ended_at 占位);完成后计数/收尾', () async {
      await p.setFocusTask('target-a');
      final base = p.todayPomos;
      final id = await p.startPomodoro(durationMinutes: 25, taskId: 'target-a');
      final open = p.sessions.first;
      expect(open.id, id);
      expect(open.isCompleted, isFalse); // open 行:被杀进程即留此态
      expect(open.endedAt, open.startedAt);
      await p.stopPomodoro(id, isCompleted: true);
      final task = byId('target-a');
      expect(task.completedPomos, 1);
      expect(task.completed, isFalse);
      expect(task.completedAt, isNull);
      expect(p.todayPomos, base + 1);
      expect(p.sessions.first.isCompleted, isTrue);
      expect(
        p.sessions.first.endedAt.isAfter(p.sessions.first.startedAt),
        isTrue,
      );
    });

    test('达预估自动完成并盖 completed_at', () async {
      await p.setFocusTask('target-b');
      final before = DateTime.now();
      final id = await p.startPomodoro(durationMinutes: 25, taskId: 'target-b');
      await p.stopPomodoro(id, isCompleted: true);
      final task = byId('target-b');
      expect(task.completedPomos, 2);
      expect(task.completed, isTrue);
      expect(task.completedAt, isNotNull);
      expect(
        task.completedAt!.isAfter(before.subtract(const Duration(seconds: 1))),
        isTrue,
      );
    });

    test('estimated=0:一个番茄即完成(v1 语义)', () async {
      await p.setFocusTask('target-c');
      final id = await p.startPomodoro(durationMinutes: 25, taskId: 'target-c');
      await p.stopPomodoro(id, isCompleted: true);
      expect(byId('target-c').completed, isTrue);
    });

    test('放弃 stop(false):收尾但不计番茄/今日', () async {
      await p.setFocusTask('target-a');
      final base = p.todayPomos;
      final id = await p.startPomodoro(durationMinutes: 25, taskId: 'target-a');
      await p.stopPomodoro(id, isCompleted: false);
      final s = p.sessions.first;
      expect(s.isCompleted, isFalse);
      expect(byId('target-a').completedPomos, 0);
      expect(p.todayPomos, base);
    });

    test('无任务专注:todayPomos +1,任务不动', () async {
      await p.setFocusTask(null);
      final base = p.todayPomos;
      final id = await p.startPomodoro(durationMinutes: 25);
      await p.stopPomodoro(id, isCompleted: true);
      expect(byId('target-a').completedPomos, 0);
      expect(p.todayPomos, base + 1);
    });
  });

  group('pickNextAutoTask(桌面 pickNextAutoTask 同构)', () {
    final today = DateTime.now();
    DateTime day(int offset) =>
        DateTime(today.year, today.month, today.day + offset, 12);

    test('过滤口径:已完成/无到期日/未来到期/本月外 均不入池', () {
      final out = TaskProvider.pickNextAutoTask([
        t('done', dueAt: day(0), completed: true),
        t('nodue'),
        t('future', dueAt: day(3)), // 到期日在未来 → 不自动接续
        t('lastmonth', dueAt: day(-40)), // 出本月 → 不接(桌面同口径)
        t('overdue', dueAt: day(-1)), // 逾期在本月 → 入池
      ]);
      expect(out?.id, 'overdue');
    });

    test('排序:优先级 高>中>低>无 → updated_at 升序', () {
      final out = TaskProvider.pickNextAutoTask([
        t(
          'low',
          priority: PfPriority.low,
          dueAt: day(0),
          updatedAt: DateTime(2026),
        ),
        t('none', dueAt: day(0), updatedAt: DateTime(2025)),
        t(
          'high-new',
          priority: PfPriority.high,
          dueAt: day(0),
          updatedAt: DateTime(2026, 9),
        ),
        t(
          'high-old',
          priority: PfPriority.high,
          dueAt: day(0),
          updatedAt: DateTime(2026, 1),
        ),
        t(
          'mid',
          priority: PfPriority.medium,
          dueAt: day(0),
          updatedAt: DateTime(2024),
        ),
      ]);
      expect(out?.id, 'high-old', reason: '高优先级里取 updated 更早的');
    });

    test('空池返回 null(圆环回全局时长)', () {
      expect(TaskProvider.pickNextAutoTask([]), isNull);
      expect(
        TaskProvider.pickNextAutoTask([t('future', dueAt: day(9))]),
        isNull,
      );
    });
  });
}
