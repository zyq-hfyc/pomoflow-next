import 'package:flutter_test/flutter_test.dart';
import 'package:pomoflow_mobile/data/database.dart';
import 'package:pomoflow_mobile/models/task.dart';
import 'package:pomoflow_mobile/services/api_client.dart';
import 'package:pomoflow_mobile/services/sync_client.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';

/// 换服务器复位(2026-11-20 腾讯云生产部署批):pull 游标(meta last_seq)
/// 与 pending 队列都是全局单份、不分服务器 —— 切服不复位,老设备推不上/
/// 拉不下,静默丢数据。锁两个层面:
/// - DB 层 [AppDatabase.resetSyncForServerSwitch]:全部实体表回到 pending
///   (含墓碑,与桌面 core `mark_all_pending` 同语义);
/// - service 层 [SyncClient] 亲和检测(meta `sync_affinity_url`):缺失
///   (升级首跑)只记录不复位;不一致 = 切服 → 游标归零 + 全量 pending +
///   登录态清理。入口是真实触发路径 pushOnce(拉向 pullOnce 同一函数)。
void main() {
  setUpAll(() {
    sqfliteFfiInit();
    databaseFactory = databaseFactoryFfi;
  });

  PfJournal journal(
    String id,
    String title,
    String syncState, [
    int deletedAtMs = 0,
  ]) {
    final now = DateTime.now();
    return PfJournal(
      id: id,
      kind: JournalKind.wish,
      title: title,
      content: '',
      tags: const [],
      createdAt: now,
      syncMeta: PfSyncMeta(
        syncState: syncState,
        originDevice: 'dev-a',
        userId: 'u-1',
        updatedAt: now,
      ),
    );
  }

  test('resetSyncForServerSwitch:synced 行 + 墓碑全部回到 pending', () async {
    final db = await AppDatabase.open(path: ':memory:');
    const idA = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaa01';
    const idB = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaa02';
    try {
      await db.insertJournal(journal(idA, '甲', 'synced'));
      await db.insertJournal(journal(idB, '乙', 'synced'));
      await db.markJournalsSynced([idA, idB]);
      expect(await db.listPendingJournals(), isEmpty);

      // 本地软删乙 → 墓碑行(deleted_at_ms > 0),push 队列照常可见
      await db.softDeleteJournal(
        id: idB,
        originDevice: 'dev-a',
        userId: 'u-1',
      );
      expect(await db.listPendingJournals(), hasLength(1));
      await db.markJournalsSynced([idB]);

      // 复位:两行(含墓碑)全部回 pending,payload 元信息不动
      await db.resetSyncForServerSwitch();
      final pending = await db.listPendingJournals();
      expect(pending.map((r) => r['id'] as String), [idA, idB]);
      expect(
        pending.map((r) => (r['deleted_at_ms'] as int) > 0),
        [false, true],
      );

      // 幂等:复位可重复执行
      await db.resetSyncForServerSwitch();
      expect(await db.listPendingJournals(), hasLength(2));
    } finally {
      await db.close();
    }
  });

  test('亲和检测:缺失只记录;同址不动;切服即复位', () async {
    SharedPreferences.setMockInitialValues({});
    final db = await AppDatabase.open(path: ':memory:');
    const vmUrl = 'http://192.168.1.10:8080';
    const prodUrl = 'http://prod.example.com';
    var authResetCalls = 0;
    SyncClient.authResetOverride = () async {
      authResetCalls += 1;
    };
    addTearDown(() {
      SyncClient.authResetOverride = null;
    });
    SyncClient.configure(
      db: () => db,
      deviceId: () => 'dev-a',
      userId: () => null, // 未登录:pushOnce 走完亲和检测后早退,不触网
    );
    try {
      // ① 升级首跑:affinity 缺失 → 只记录,游标/登录态不动
      await ApiClient.instance.setServerUrl(vmUrl);
      await db.setLastSeq(42);
      await SyncClient.instance.pushOnce();
      expect(await db.getMeta('sync_affinity_url'), vmUrl);
      expect(await db.getLastSeq(), 42);
      expect(authResetCalls, 0);

      // ② 同址重复跑:无动作
      await SyncClient.instance.pushOnce();
      expect(authResetCalls, 0);

      // ③ 切服(VM → 生产):游标归零 + 全量 pending + 清登录态
      await db.insertJournal(journal(
        'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaa03',
        '丙',
        'synced',
      ));
      await db.markJournalsSynced(['aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaa03']);
      await db.setLastSeq(42);
      await ApiClient.instance.setServerUrl(prodUrl);
      await SyncClient.instance.pushOnce();
      expect(await db.getLastSeq(), 0);
      expect(await db.getMeta('sync_affinity_url'), prodUrl);
      expect(authResetCalls, 1);
      expect(await db.listPendingJournals(), hasLength(1));
    } finally {
      await db.close();
    }
  });
}
