import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pomoflow_mobile/data/database.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';

/// schema 迁移回归(v5 缺列事故的防复发锁)。
///
/// 用 sqflite_common_ffi 内存库跑**全链**:建 v1 库 → 逐级 open 升级 →
/// 断言 ChangeLogStore 引用的每一列都真实存在、mutator→pending→listPending
/// 端到端不抛。
void main() {
  setUpAll(() {
    sqfliteFfiInit();
    databaseFactory = databaseFactoryFfi;
  });

  test('fresh install reaches v5 with every ChangeLogStore column present',
      () async {
    final db = await AppDatabase.open(path: ':memory:');
    try {
      final cols = await db.raw.rawQuery('PRAGMA table_info(tasks)');
      final names = cols.map((r) => r['name'] as String).toSet();
      // ChangeLogStore 引用集(漏一个就是又一次 v5 事故)。
      expect(names, containsAll([
        'id', 'revision', 'sync_state', 'origin_device', 'payload',
        'user_id', 'updated_at_ms', 'deleted_at_ms', 'completed_at_ms',
      ]));
      final sessionCols = await db.raw
          .rawQuery('PRAGMA table_info(pomodoro_sessions)');
      final sessionNames =
          sessionCols.map((r) => r['name'] as String).toSet();
      expect(sessionNames, containsAll([
        'id', 'task_id', 'project_id', 'duration', 'started_at_ms',
        'ended_at_ms', 'is_completed', 'created_at_ms', 'revision',
        'sync_state', 'updated_at_ms', 'origin_device', 'payload', 'user_id',
      ]));
      expect(await db.getMeta('schema_version'), '9');
    } finally {
      await db.close();
    }
  });

  test('insert → markPending → listPending round-trip works end to end',
      () async {
    final db = await AppDatabase.open(path: ':memory:');
    try {
      await db.raw.insert('tasks', {
        'id': 't0000000000zz',
        'title': '迁移回归',
        'priority': 'high',
        'due_label': '今天',
        'completed': 0,
        'estimated': 2,
        'completed_cnt': 0,
        'subtask_cnt': 0,
        'tags_csv': '',
        'is_focus': 0,
      });
      // v5 事故现场:markTaskPending 在缺 updated_at_ms 列的库上必抛。
      await db.markTaskPending(
          id: 't0000000000zz', originDevice: 'dev-x', userId: 'u-1');
      final pending = await db.listPendingTasks();
      expect(pending, hasLength(1));
      expect(pending.first['origin_device'], 'dev-x');
      expect(pending.first['title'], '迁移回归');
      expect((pending.first['revision'] as int), 2);

      await db.markTasksSynced(['t0000000000zz']);
      expect(await db.listPendingTasks(), isEmpty);
    } finally {
      await db.close();
    }
  });

  test('legacy v4 database upgrades to v5 via onUpgrade chain', () async {
    // 手工造一个"v4 末期"文件库:tasks 有 5 同步列但**没有** updated_at_ms
    // (正是线上老库的真实形状),user_version=4。
    final tmp = await Directory.systemTemp.createTemp('pf_schema_test');
    final dbFile = '${tmp.path}${Platform.pathSeparator}legacy.db';
    final raw = await databaseFactoryFfi.openDatabase(dbFile);
    await raw.execute('''
      CREATE TABLE tasks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        priority TEXT NOT NULL DEFAULT 'none',
        project TEXT NOT NULL DEFAULT '',
        due_label TEXT NOT NULL DEFAULT '',
        completed INTEGER NOT NULL DEFAULT 0,
        estimated INTEGER NOT NULL DEFAULT 0,
        completed_cnt INTEGER NOT NULL DEFAULT 0,
        subtask_cnt INTEGER NOT NULL DEFAULT 0,
        tags_csv TEXT NOT NULL DEFAULT '',
        is_focus INTEGER NOT NULL DEFAULT 0,
        revision INTEGER NOT NULL DEFAULT 1,
        sync_state TEXT NOT NULL DEFAULT 'synced',
        origin_device TEXT NOT NULL DEFAULT '',
        payload TEXT NOT NULL DEFAULT '',
        user_id TEXT NOT NULL DEFAULT ''
      )
    ''');
    await raw.insert('tasks', {
      'id': 'cccccccc-cccc-4ccc-8ccc-cccccccccc01',
      'title': '老库任务',
    });
    // 短码毒行(v7 应清掉):id 非 36 位 UUID。
    await raw.insert('tasks', {'id': 'legacy00000zz', 'title': '短码毒行'});
    await raw.execute(
        "CREATE TABLE meta (k TEXT PRIMARY KEY, v TEXT NOT NULL DEFAULT '')");
    await raw.insert('meta', {'k': 'schema_version', 'v': '4'});
    await raw.insert('meta', {'k': 'last_seq', 'v': '0'});
    await raw.execute('''
      CREATE TABLE journals (
        id TEXT PRIMARY KEY,
        kind TEXT NOT NULL,
        title TEXT NOT NULL DEFAULT '',
        content TEXT NOT NULL DEFAULT '',
        tags_csv TEXT NOT NULL DEFAULT ''
      )
    ''');
    await raw.execute('PRAGMA user_version = 4');
    await raw.close();

    // 同一文件以 version=5 重开 → sqflite 触发 onUpgrade → _v4ToV5。
    final db = await AppDatabase.open(
        factory: databaseFactoryFfi, path: dbFile);
    try {
      final cols =
          await db.raw.rawQuery('PRAGMA table_info(tasks)');
      final names = cols.map((r) => r['name'] as String).toSet();
      expect(names, contains('updated_at_ms'),
          reason: 'v4→v5 必须补上 ChangeLogStore 引用的缺列');

      // 老行保留(UUID id)+ 短码毒行被 v7 清掉;markTaskPending 不再抛
      // (v5 事故正是抛在这里)。
      final rows = await db.raw.query('tasks');
      expect(rows, hasLength(1));
      expect(rows.first['title'], '老库任务');
      await db.markTaskPending(
          id: 'cccccccc-cccc-4ccc-8ccc-cccccccccc01',
          originDevice: 'dev-up',
          userId: 'u-1');
      final pending = await db.listPendingTasks();
      expect(pending, hasLength(1));

      // 新表同批就位;升级链一路推进到当前 schema(v4 库升完含 v6 软删除列)。
      await db.raw
          .rawQuery('PRAGMA table_info(pomodoro_sessions)');
      final v6cols = await db.raw.rawQuery('PRAGMA table_info(tasks)');
      expect(v6cols.map((r) => r['name']), contains('deleted_at_ms'));
      expect(await db.getMeta('schema_version'), '9');
    } finally {
      await db.close();
      await tmp.delete(recursive: true);
    }
  });

  test('soft delete tombstones flow: hide on list, push via pending, idempotent',
      () async {
    final db = await AppDatabase.open(path: ':memory:');
    try {
      await db.raw.insert('tasks', {
        'id': 'tomb0000000zz',
        'title': '将被删除',
        'priority': 'high',
      });
      await db.markTaskPending(
          id: 'tomb0000000zz', originDevice: 'dev-a', userId: 'u-1');
      await db.markTasksSynced(['tomb0000000zz']);

      // 软删除:盖墓碑 + bump revision + 标 pending。
      await db.softDeleteTask(
          id: 'tomb0000000zz', originDevice: 'dev-a', userId: 'u-1');

      // 展示层:墓碑行不出现。
      final visible = await db.listTasks();
      expect(visible.where((t) => t.id == 'tomb0000000zz'), isEmpty);

      // 推送层:墓碑进 pending 队列,带 deleted_at_ms 与 revision=3
      // (insert 后 markPending=2,软删再 bump=3)。
      final pending = await db.listPendingTasks();
      final row =
          pending.firstWhere((r) => r['id'] == 'tomb0000000zz');
      expect((row['deleted_at_ms'] as int), greaterThan(0));
      expect((row['revision'] as int), 3);

      // 幂等:重复删除不再 bump(WHERE deleted_at_ms = 0 保护)。
      await db.softDeleteTask(
          id: 'tomb0000000zz', originDevice: 'dev-a', userId: 'u-1');
      final pending2 = await db.listPendingTasks();
      final row2 =
          pending2.firstWhere((r) => r['id'] == 'tomb0000000zz');
      expect((row2['revision'] as int), 3);

      // 对端收敛:applyRemoteTask(远端权威)同样隐藏。
      await db.applyRemoteTask(
        id: 'tomb0000000zz',
        revision: 4,
        updatedAtMs: DateTime.now().millisecondsSinceEpoch,
        originDevice: 'dev-b',
        userId: 'u-1',
        payload: '{}',
        fields: {
          'title': '将被删除',
          'deleted_at_ms': DateTime.now().millisecondsSinceEpoch,
        },
      );
      expect((await db.listTasks())
          .where((t) => t.id == 'tomb0000000zz'), isEmpty);
    } finally {
      await db.close();
    }
  });
}
