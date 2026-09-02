import 'package:flutter_test/flutter_test.dart';
import 'package:pomoflow_mobile/data/database.dart';
import 'package:pomoflow_mobile/models/subtask.dart';
import 'package:pomoflow_mobile/models/task.dart';
import 'package:pomoflow_mobile/services/repeat_service.dart';
import 'package:pomoflow_mobile/services/sync_wire.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';

/// 重复实例编排单测(ffi 内存库全链)—— 锁桌面 repeat_service.rs /
/// commands.rs 的编排语义:实例字段复制/重置、pending 落行、
/// active/all 两档删除、purge 级联与未推送墓碑保护。
void main() {
  setUpAll(() {
    sqfliteFfiInit();
    databaseFactory = databaseFactoryFfi;
  });

  const tz = 480; // 东八区

  /// 墙钟字符串 → epoch 语义 DateTime(见 repeat_engine_test 同名助手)。
  DateTime dueAtOf(String wall) {
    final p = DateTime.parse(wall);
    final w = DateTime.utc(p.year, p.month, p.day, p.hour, p.minute);
    return DateTime.fromMillisecondsSinceEpoch(
      w.millisecondsSinceEpoch - tz * 60000,
    );
  }

  Future<PfTask> insertTemplate(
    AppDatabase db, {
    String repeat = 'daily',
    String repeatConfig = '',
    DateTime? dueAt,
    List<String> tags = const ['工作'],
    bool withSubtask = true,
  }) async {
    final t = PfTask(
      id: uuidV4(),
      title: '健身打卡',
      priority: PfPriority.high,
      project: '日常',
      description: '模板描述',
      dueAt: dueAt ?? dueAtOf('2026-12-30T09:30'),
      repeat: repeat,
      repeatConfig: repeatConfig,
      tags: tags,
      estimatedPomos: 2,
      pomodoroDuration: 30,
      reminder: 'minutes30',
      syncMeta: const PfSyncMeta(
        syncState: 'pending',
        originDevice: 'dev-a',
        userId: 'u-1',
      ),
    );
    await db.insertTask(t);
    if (withSubtask) {
      await db.insertSubtask(
        PfSubTask(
          id: uuidV4(),
          taskId: t.id,
          title: '热身',
          position: 0,
          isCompleted: true, // 模板侧勾过 → 实例必须重置 false
          syncMeta: const PfSyncMeta(
            syncState: 'pending',
            originDevice: 'dev-a',
            userId: 'u-1',
          ),
        ),
      );
    }
    return t;
  }

  test('generateInstances:字段复制/重置 + pending 落行 + 子任务/标签拷贝', () async {
    final db = await AppDatabase.open(path: ':memory:');
    try {
      final parent = await insertTemplate(db); // daily 12-30 → 仅 12-31 一条
      final n = await RepeatService.generateInstances(
        db,
        parent,
        tzOffsetMin: tz,
        originDevice: 'dev-a',
        userId: 'u-1',
        now: DateTime.fromMillisecondsSinceEpoch(1746000000000),
      );
      expect(n, 1);

      final visible = await db.listTasks();
      final inst = visible.singleWhere((t) => t.repeatParentId == parent.id);
      // 复制:标题/描述/项目/优先级/番茄参数/提醒
      expect(inst.title, '健身打卡');
      expect(inst.description, '模板描述');
      expect(inst.project, '日常');
      expect(inst.priority, PfPriority.high);
      expect(inst.estimatedPomos, 2);
      expect(inst.pomodoroDuration, 30);
      expect(inst.reminder, 'minutes30');
      // 重置:completed=false / 番茄 0 / repeat 摘除 / 链接模板
      expect(inst.completed, isFalse);
      expect(inst.completedPomos, 0);
      expect(inst.repeat, 'none');
      expect(inst.repeatConfig, '');
      expect(inst.repeatParentId, parent.id);
      // due = 墙钟 2026-12-31 09:30(东八区)
      expect(
        DateTime.fromMillisecondsSinceEpoch(
          inst.dueAt!.millisecondsSinceEpoch + tz * 60000,
          isUtc: true,
        ).toString().substring(0, 16),
        '2026-12-31 09:30',
      );
      expect(inst.subtaskCount, 1);
      // 子任务拷贝且重置未完成
      final subs = await db.listSubtasksForTask(inst.id);
      expect(subs, hasLength(1));
      expect(subs.first.title, '热身');
      expect(subs.first.isCompleted, isFalse);

      // 直接以 revision 1 / pending 落行(不额外 bump —— 桌面新实例同构;
      // listPendingTasks 只回 pending 行,进结果即证明 sync_state)
      final pending = await db.listPendingTasks();
      final row = pending.singleWhere((r) => r['id'] == inst.id);
      expect((row['revision'] as int), 1);
      // 标签同步行(tag_names → tag_ids 解析)
      final tagRow = await db.raw.query(
        'task_tag_sync',
        where: 'task_id = ?',
        whereArgs: [inst.id],
      );
      expect(tagRow, hasLength(1));
      // wire push:实例行带真实 repeat_parent_id(v18 修复主断言)
      final payload = coreTaskPayload(row, 'u-1');
      expect(payload['repeat_parent_id'], parent.id);
    } finally {
      await db.close();
    }
  });

  test('generateInstances:无规则/无 due → 0 条不报错', () async {
    final db = await AppDatabase.open(path: ':memory:');
    try {
      final none = await insertTemplate(db, repeat: 'none');
      // 无 due 直接入库(不走 insertTemplate 的 dueAt 兜底)。
      final noDue = PfTask(
        id: uuidV4(),
        title: '无到期日的重复模板',
        repeat: 'daily',
        syncMeta: const PfSyncMeta(
          syncState: 'pending',
          originDevice: 'dev-a',
          userId: 'u-1',
        ),
      );
      await db.insertTask(noDue);
      expect(
        await RepeatService.generateInstances(
          db,
          none,
          tzOffsetMin: tz,
          originDevice: 'dev-a',
          userId: 'u-1',
        ),
        0,
      );
      expect(
        await RepeatService.generateInstances(
          db,
          noDue,
          tzOffsetMin: tz,
          originDevice: 'dev-a',
          userId: 'u-1',
        ),
        0,
      );
    } finally {
      await db.close();
    }
  });

  test('deleteActiveInstances 保留已完成;deleteAllInstances 全清', () async {
    final db = await AppDatabase.open(path: ':memory:');
    try {
      // custom 配一条 3 天的窗口,生成 2 条实例
      const cfg =
          '{"interval":0,"type":"day","startDate":"2026-12-28T09:30",'
          '"endDate":"2026-12-30"}';
      final parent = await insertTemplate(
        db,
        repeat: 'custom',
        repeatConfig: cfg,
        dueAt: dueAtOf('2026-12-28T09:30'),
        withSubtask: false,
      );
      expect(
        await RepeatService.generateInstances(
          db,
          parent,
          tzOffsetMin: tz,
          originDevice: 'dev-a',
          userId: 'u-1',
        ),
        2, // 12-29 / 12-30
      );
      var ids = await db.repeatInstanceIds(parent.id);
      expect(ids, hasLength(2));

      // 第一条标记完成(模拟用户做完当天实例)
      await db.raw.update(
        'tasks',
        {'completed': 1},
        where: 'id = ?',
        whereArgs: [ids.first],
      );

      // active 档:只清未完成,完成的保留(桌面 delete_active_instances)。
      // repeatInstanceIds 默认 activeOnly 会把已完成行也滤掉,这里用
      // activeOnly: false 看「未删」全集。
      await RepeatService.deleteActiveInstances(
        db,
        parent.id,
        originDevice: 'dev-a',
        userId: 'u-1',
      );
      final survivors = await db.repeatInstanceIds(
        parent.id,
        activeOnly: false,
      );
      expect(survivors, [ids.first]); // 完成的那条还在(active 那条已墓碑)

      // all 档:连已完成一起清(模板删除级联)
      await RepeatService.deleteAllInstances(
        db,
        parent.id,
        originDevice: 'dev-a',
        userId: 'u-1',
      );
      expect(await db.repeatInstanceIds(parent.id), isEmpty);
      // 墓碑可推送(pending 通道,revision 被 softDelete bump)
      final tombstones = (await db.listPendingTasks())
          .where((r) => (r['repeat_parent_id'] as String?) == parent.id)
          .toList();
      expect(tombstones, hasLength(2));
      for (final r in tombstones) {
        expect((r['deleted_at_ms'] as int), greaterThan(0));
        expect((r['revision'] as int), 2);
      }
    } finally {
      await db.close();
    }
  });

  test('purgeTask 级联清实例行,但保留未推送(pending)的墓碑', () async {
    final db = await AppDatabase.open(path: ':memory:');
    try {
      final parent = await insertTemplate(
        db,
        withSubtask: false,
        tags: const [],
      );
      await RepeatService.generateInstances(
        db,
        parent,
        tzOffsetMin: tz,
        originDevice: 'dev-a',
        userId: 'u-1',
      );
      final ids = await db.repeatInstanceIds(parent.id);
      expect(ids, hasLength(1));

      // 模板删除级联:全部变墓碑 + pending
      await RepeatService.deleteAllInstances(
        db,
        parent.id,
        originDevice: 'dev-a',
        userId: 'u-1',
      );
      // 模板自身也墓碑(deleteTask 主流程)
      await db.softDeleteTask(
        id: parent.id,
        originDevice: 'dev-a',
        userId: 'u-1',
      );

      // 实例墓碑还在 pending(未推送)→ purge 模板必须**保留**它们,
      // 否则服务端活实例会在 pull 时拉回复活。
      await db.purgeTask(parent.id);
      final left = await db.raw.query(
        'tasks',
        where: 'repeat_parent_id = ?',
        whereArgs: [parent.id],
      );
      expect(left, hasLength(1));
      expect(left.first['sync_state'], 'pending');

      // 已同步(synced)的实例墓碑 → purge 一并硬删
      await db.markTasksSynced(ids);
      await db.purgeTask(parent.id);
      final left2 = await db.raw.query(
        'tasks',
        where: 'repeat_parent_id = ?',
        whereArgs: [parent.id],
      );
      expect(left2, isEmpty);
    } finally {
      await db.close();
    }
  });
}
