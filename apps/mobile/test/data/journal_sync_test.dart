import 'package:flutter_test/flutter_test.dart';
import 'package:pomoflow_mobile/data/database.dart';
import 'package:pomoflow_mobile/models/task.dart';
import 'package:pomoflow_mobile/services/sync_wire.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';

/// 手账 v19 同步链路单测(ffi 内存库):pending 落行 → push payload →
/// 远端权威 applyRemoteJournal 收敛 → 墓碑过滤。锁 core::Journal 契约
/// (对侧锁:crates/core/tests/mobile_wire_compat.rs)。
void main() {
  setUpAll(() {
    sqfliteFfiInit();
    databaseFactory = databaseFactoryFfi;
  });

  test('insert → pending → payload → applyRemote 全链', () async {
    final db = await AppDatabase.open(path: ':memory:');
    try {
      final now = DateTime.now();
      await db.insertJournal(
        PfJournal(
          id: 'jjjjjjjj-jjjj-4jjj-8jjj-jjjjjjjjjj03',
          kind: JournalKind.wish,
          title: '去北海道看雪',
          content: '冬天或春天都行',
          tags: const ['旅行', '长期'],
          createdAt: now,
          syncMeta: PfSyncMeta(
            syncState: 'pending',
            originDevice: 'dev-a',
            userId: 'u-1',
            updatedAt: now,
          ),
        ),
      );

      // pending 队列可查,payload 形状对齐 core serde
      final pending = await db.listPendingJournals();
      expect(pending, hasLength(1));
      final payload = coreJournalPayload(pending.first, 'u-1');
      expect(payload['kind'], 'wish');
      expect(payload['tags'], ['旅行', '长期']);
      expect(payload['user_id'], 'u-1');

      // push 成功 → markJournalsSynced
      await db.markJournalsSynced(['jjjjjjjj-jjjj-4jjj-8jjj-jjjjjjjjjj03']);
      expect(await db.listPendingJournals(), isEmpty);

      // 远端编辑回来(权威):applyRemoteJournal 更新业务列 + synced 落行
      await db.applyRemoteJournal(
        id: 'jjjjjjjj-jjjj-4jjj-8jjj-jjjjjjjjjj03',
        revision: 5,
        updatedAtMs: now.millisecondsSinceEpoch,
        originDevice: 'dev-desktop',
        userId: 'u-1',
        payload: '{"kind":"wish"}',
        fields: journalFieldsFromCore(<String, dynamic>{
          'kind': 'wish',
          'title': '去北海道看雪(改)',
          'content': '改期到春天',
          'tags': ['旅行'],
          'created_at': '2026-09-01T00:00:00.000Z',
          'deleted_at': null,
        }),
      );
      final listed = await db.listJournals();
      expect(listed, hasLength(1));
      expect(listed.first.title, '去北海道看雪(改)');
      expect(listed.first.tags, ['旅行']);
      expect(listed.first.syncMeta.syncState, 'synced');

      // 远端墓碑:list 不再返回(行本体保留供复活/排障)
      await db.applyRemoteJournal(
        id: 'jjjjjjjj-jjjj-4jjj-8jjj-jjjjjjjjjj03',
        revision: 6,
        updatedAtMs: now.millisecondsSinceEpoch + 1000,
        originDevice: 'dev-desktop',
        userId: 'u-1',
        payload: '{"deleted_at":"2026-09-02T00:00:00.000Z"}',
        fields: journalFieldsFromCore(<String, dynamic>{
          'deleted_at': '2026-09-02T00:00:00.000Z',
        }),
      );
      expect(await db.listJournals(), isEmpty);
      final cand = await db.localJournalCandidate(
        'jjjjjjjj-jjjj-4jjj-8jjj-jjjjjjjjjj03',
      );
      expect(cand, isNotNull, reason: '墓碑行本体应保留');
    } finally {
      await db.close();
    }
  });

  test('listJournals 新建在前(与 provider insert(0) 同语义)', () async {
    final db = await AppDatabase.open(path: ':memory:');
    try {
      final t0 = DateTime.now();
      for (final (i, kind) in ['note', 'wish'].indexed) {
        await db.insertJournal(
          PfJournal(
            id: 'jjjjjjjj-jjjj-4jjj-8jjj-jjjjjjjjjj0$i',
            kind: JournalKind.values.byName(kind),
            title: '条目 $i',
            createdAt: t0.add(Duration(seconds: i)),
            syncMeta: const PfSyncMeta(syncState: 'synced'),
          ),
        );
      }
      final list = await db.listJournals();
      expect(list.first.title, '条目 1', reason: 'created_at DESC,新建在前');
    } finally {
      await db.close();
    }
  });
}
