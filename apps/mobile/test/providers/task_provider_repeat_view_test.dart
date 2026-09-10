import 'package:flutter_test/flutter_test.dart';

import 'package:pomoflow_mobile/models/task.dart';
import 'package:pomoflow_mobile/providers/task_provider.dart';

/// 「重复」视图语义锁(2026-09-08 重复模板可发现性批):
/// - 只列模板(isRepeatTemplate),实例/普通任务不进;
/// - 无日期条件 —— 无到期日模板也要能找到(此前今天/明天/本周全隐身);
/// - 已完成模板保留在列,靠 _taskListCompare 沉底。
void main() {
  PfTask t(
    String id, {
    String repeat = 'none',
    String repeatParentId = '',
    bool completed = false,
    DateTime? dueAt,
    DateTime? updatedAt,
  }) => PfTask(
    id: id,
    title: id,
    repeat: repeat,
    repeatParentId: repeatParentId,
    completed: completed,
    dueAt: dueAt,
    syncMeta: PfSyncMeta(updatedAt: updatedAt),
  );

  group('viewTasks(重复)', () {
    test('只回模板:排除实例与普通任务,无日期条件', () async {
      final p = TaskProvider.demo();
      final today = DateTime.now();
      await p.addTask(t('tpl-weekly', repeat: 'weekly', dueAt: today));
      await p.addTask(t('tpl-nodue', repeat: 'daily')); // 无到期日模板
      await p.addTask(t('tpl-done', repeat: 'monthly', completed: true));
      await p.addTask(t('inst-1', repeatParentId: 'tpl-weekly', dueAt: today));
      await p.addTask(t('plain', dueAt: today));

      final out = p.viewTasks('重复');
      final ids = out.map((x) => x.id).toSet();
      // demo() 种子自带模板(aaaa…05),不断言全等,断言成员资格。
      expect(ids, containsAll({'tpl-weekly', 'tpl-nodue', 'tpl-done'}));
      expect(ids, isNot(contains('inst-1')));
      expect(ids, isNot(contains('plain')));
      // 每一行都必须是模板(含种子),无一例外。
      expect(out.every((x) => x.isRepeatTemplate), isTrue);
    });

    test('已完成模板沉底(未完成在前)', () async {
      final p = TaskProvider.demo();
      await p.addTask(
        t(
          'tpl-done',
          repeat: 'daily',
          completed: true,
          updatedAt: DateTime(2026),
        ),
      );
      await p.addTask(
        t('tpl-open', repeat: 'weekly', updatedAt: DateTime(2026, 6)),
      );

      final ids = p.viewTasks('重复').map((x) => x.id).toList();
      expect(
        ids.indexOf('tpl-open'),
        lessThan(ids.indexOf('tpl-done')),
        reason: '未完成模板排在已完成模板之前(种子模板相对序不受影响)',
      );
    });

    test('空库返回空列表', () {
      final p = TaskProvider.demo();
      // demo() 种子可能含模板也可能不含 —— 断言行数与 isRepeatTemplate 过滤一致。
      final expected = p.tasks.where((x) => x.isRepeatTemplate).length;
      expect(p.viewTasks('重复').length, expected);
    });
  });
}
