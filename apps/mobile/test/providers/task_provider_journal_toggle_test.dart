import 'package:flutter_test/flutter_test.dart';

import 'package:pomoflow_mobile/models/task.dart';
import 'package:pomoflow_mobile/providers/task_provider.dart';

/// 手账待办勾选语义锁(待办勾选批):
/// - toggleJournalDone:active ↔ completed 双态翻转 + revision+1 + 标 pending
///   (对齐 editJournal 的同步语义,与任务 toggleDone 同构);
/// - editJournal 编辑不动 status(勾选态由 toggle 专管,编辑透传保留);
/// - addJournal 新建默认 active(模型缺省)。
void main() {
  // demo 种子的 kind=todo 手账「给妈妈买生日礼物」(status 默认 active)。
  const seedTodoId = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbb01';

  group('toggleJournalDone(内存路径,桌面 TaskCheckbox 勾选同构)', () {
    test('完成/取消双态翻转 + revision+1 + 标 pending', () async {
      final p = TaskProvider.demo();
      final before = p.journals.firstWhere((j) => j.id == seedTodoId);
      expect(before.status, 'active', reason: '种子待办默认未完成');

      await p.toggleJournalDone(seedTodoId);
      final done = p.journals.firstWhere((j) => j.id == seedTodoId);
      expect(done.status, 'completed');
      expect(done.isDone, isTrue);
      expect(done.syncMeta.revision, before.syncMeta.revision + 1);
      expect(done.syncMeta.syncState, 'pending');

      await p.toggleJournalDone(seedTodoId);
      final undone = p.journals.firstWhere((j) => j.id == seedTodoId);
      expect(undone.status, 'active');
      expect(undone.isDone, isFalse);
      expect(undone.syncMeta.revision, before.syncMeta.revision + 2);
      expect(undone.syncMeta.syncState, 'pending');
    });

    test('未知 id 静默返回(与 toggleDone 同语义)', () async {
      final p = TaskProvider.demo();
      await p.toggleJournalDone('no-such-journal');
      expect(p.journals, hasLength(2));
    });

    test('editJournal 编辑保留勾选态;addJournal 新建默认 active', () async {
      final p = TaskProvider.demo();
      await p.toggleJournalDone(seedTodoId);
      await p.editJournal(seedTodoId, title: '给妈妈买生日礼物(改)');
      final edited = p.journals.firstWhere((j) => j.id == seedTodoId);
      expect(edited.title, '给妈妈买生日礼物(改)');
      expect(edited.isDone, isTrue, reason: '编辑不重置勾选态');

      await p.addJournal(
        const PfJournal(id: '', kind: JournalKind.todo, title: '新待办'),
      );
      final added = p.journals.firstWhere((j) => j.title == '新待办');
      expect(added.status, 'active');
      expect(added.isDone, isFalse);
    });
  });
}
