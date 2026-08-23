import 'dart:async';

import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

import '../models/task.dart';

/// 本轮 P3d-B-Phase-1 sqflite 落盘层 + P3d-B-Phase-2 同步位元数据。
///
/// Schema v1(P3d-Phase-1):
///   tasks(id PK INTEGER, title, priority, project, due_label, completed,
///         estimated, completed_cnt, subtask_cnt, tags_csv, is_focus)
///   journals(id PK INTEGER, kind, title, content, tags_csv)
///   meta(k PK, v) —— schema_version / seed_done / next_id / today_pomos /
///                    today_review
///
/// Schema v2(P3d-Phase-2 增量,本批):
///   tasks 增 5 列:`revision INTEGER DEFAULT 1`、`sync_state TEXT DEFAULT 'synced'`
///     (取值:`'pending' | 'synced' | 'tombstone'`)、`origin_device TEXT DEFAULT ''`、
///     `payload TEXT DEFAULT ''`(server Task JSON 缓存)、`user_id TEXT DEFAULT ''`
///   meta 表新增键 `last_seq` —— LWW pull cursor
///
/// P3d-Phase-2 进一步(version 3)会把 `id INTEGER → TEXT` 全局迁移做 ID 字符串化,
/// 也把 `tags_csv TEXT → task_tags / journal_tags` 关联表对齐 core。本批不动。
///
/// tags_csv 仍是逗号分隔(原型阶段)。
class AppDatabase {
  AppDatabase._(this._db);
  final Database _db;

  /// schema v1 → v2:`tasks` 加 5 列 + meta last_seq 行初始化。
  /// schema v2 → v3(下批):tasks.id INTEGER → TEXT 类型整体迁移。
  static const _schemaVersion = 2;
  static const _dbFileName = 'pomoflow.db';

  /// 打开/创建数据库 + migrate + 返回包装。
  /// 调用方传入 [openFactory] 以便测试(默认 [databaseFactory])。
  static Future<AppDatabase> open({
    DatabaseFactory? factory,
    String? path,
  }) async {
    final f = factory ?? databaseFactory;
    final dbPath = path ?? await _defaultPath();
    final db = await f.openDatabase(
      dbPath,
      options: OpenDatabaseOptions(
        version: _schemaVersion,
        onCreate: (db, version) async => _createSchema(db),
        onUpgrade: (db, oldVersion, newVersion) async {
          // v1 → v2:tasks 增 5 列 + meta last_seq 行。
          if (oldVersion < 2) {
            await _v1ToV2(db);
          }
          // v2 → v3(下批):id INTEGER → TEXT 类型切换 + 关联表。
          // 留 TODO 防遗漏。
        },
      ),
    );
    return AppDatabase._(db);
  }

  static Future<String> _defaultPath() async {
    final dir = await getApplicationDocumentsDirectory();
    return p.join(dir.path, _dbFileName);
  }

  static Future<void> _createSchema(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY,
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
    await db.execute('CREATE INDEX IF NOT EXISTS idx_tasks_focus ON tasks(is_focus)');
    await db.execute('''
      CREATE TABLE IF NOT EXISTS journals (
        id INTEGER PRIMARY KEY,
        kind TEXT NOT NULL,
        title TEXT NOT NULL DEFAULT '',
        content TEXT NOT NULL DEFAULT '',
        tags_csv TEXT NOT NULL DEFAULT ''
      )
    ''');
    await db.execute('''
      CREATE TABLE IF NOT EXISTS meta (
        k TEXT PRIMARY KEY,
        v TEXT NOT NULL DEFAULT ''
      )
    ''');
    await db.insert('meta', {'k': 'schema_version', 'v': '$_schemaVersion'});
    await db.insert('meta', {'k': 'last_seq', 'v': '0'});
  }

  /// v1 → v2 升级:为已存在的 tasks 表补 5 列(meta v1 没 last_seq 行也补一下)。
  static Future<void> _v1ToV2(Database db) async {
    Future<void> addColumnIfMissing(String sql) async {
      // sqflite 的 ALTER ADD COLUMN 没原生 IF NOT EXISTS,所以先探测列存不存在。
      final cols = await db.rawQuery('PRAGMA table_info(tasks)');
      // PRAGMA table_info 返回 cid / name / type / notnull / dflt_value / pk
      // 这里仅取 name 列。
      final names = cols.map((r) => r['name'] as String).toSet();
      final match = RegExp(r'ADD COLUMN\s+(\w+)').firstMatch(sql);
      final colName = match?.group(1);
      if (colName != null && !names.contains(colName)) {
        await db.execute(sql);
      }
    }

    await addColumnIfMissing(
      'ALTER TABLE tasks ADD COLUMN revision INTEGER NOT NULL DEFAULT 1',
    );
    await addColumnIfMissing(
      "ALTER TABLE tasks ADD COLUMN sync_state TEXT NOT NULL DEFAULT 'synced'",
    );
    await addColumnIfMissing(
      "ALTER TABLE tasks ADD COLUMN origin_device TEXT NOT NULL DEFAULT ''",
    );
    await addColumnIfMissing(
      "ALTER TABLE tasks ADD COLUMN payload TEXT NOT NULL DEFAULT ''",
    );
    await addColumnIfMissing(
      "ALTER TABLE tasks ADD COLUMN user_id TEXT NOT NULL DEFAULT ''",
    );

    // meta.last_seq 兜底插入(只是 INSERT OR IGNORE 语义,冲突算法用 replace 保证幂等)。
    await db.insert(
      'meta',
      {'k': 'last_seq', 'v': '0'},
      conflictAlgorithm: ConflictAlgorithm.ignore,
    );
    // 既然是 v1→v2 迁移,把 schema_version 顶到 2。
    await db.insert('meta', {'k': 'schema_version', 'v': '2'},
        conflictAlgorithm: ConflictAlgorithm.replace);
  }

  Database get raw => _db;

  Future<void> close() => _db.close();

  // === meta ===================================================================

  Future<String?> getMeta(String k) async {
    final rows = await _db.query('meta', where: 'k = ?', whereArgs: [k], limit: 1);
    if (rows.isEmpty) return null;
    return rows.first['v'] as String?;
  }

  Future<void> setMeta(String k, String v) async {
    await _db.insert('meta', {'k': k, 'v': v}, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// LWW 同步 cursor:服务端 `SyncCursor{ last_seq: u64 }`。
  /// 返回 0 表示尚未同步过。
  Future<int> getLastSeq() async {
    final s = await getMeta('last_seq');
    return int.tryParse(s ?? '0') ?? 0;
  }

  Future<void> setLastSeq(int seq) => setMeta('last_seq', '$seq');

  Future<int> nextId() async {
    final cur = int.tryParse((await getMeta('next_id')) ?? '100') ?? 100;
    final nx = cur + 1;
    await setMeta('next_id', '$nx');
    return cur;
  }

  // === tasks ===================================================================

  Future<List<PfTask>> listTasks() async {
    final rows = await _db.query('tasks', orderBy: 'id ASC');
    return rows.map(_taskFromRow).toList();
  }

  Future<int> insertTask(PfTask t) async {
    return _db.insert('tasks', _taskToRow(t));
  }

  Future<void> updateTask(PfTask t) async {
    await _db.update(
      'tasks',
      _taskToRow(t),
      where: 'id = ?',
      whereArgs: [t.id],
    );
  }

  Future<void> setFocus(int? id) async {
    await _db.transaction((txn) async {
      await txn.update('tasks', {'is_focus': 0});
      if (id != null) {
        await txn.update(
          'tasks',
          {'is_focus': 1},
          where: 'id = ?',
          whereArgs: [id],
        );
      }
    });
  }

  /// === Phase-2 ChangeLogStore 适配(P3d-Phase-2 P0,Tasks 实体)===
  ///
  /// 与桌面端 `crates/core/src/store/sqlite.rs` SqliteStore::ChangeLogStore
  /// 实现对齐;不在 dart 端抽 trait(单 store 无分发开销)。
  ///
  /// 注意:本批 schema_version=2 阶段,tasks.id 仍是 INTEGER PRIMARY KEY;
  /// v3 commit 后切 TEXT。Signatures 用 `int id`。
  /// P0 阶段就先把增 5 列(sync_state / revision / origin_device / payload /
  /// user_id)写到位 + methods 接好,下批 id 切字符串只需改签 + row mapper,
  /// 4 方法语义不动。

  /// 当前未推送的变更(`sync_state = 'pending'`),按 updated_at_ms 升序。
  /// 返回 `Map<id, Map<column, value>>` 形式(包含 revision / updated_at_ms
  /// / origin_device / user_id / payload),SyncClient 直接拼 Change。
  Future<List<Map<String, Object?>>> listPendingTasks({int limit = 200}) async {
    final rows = await _db.rawQuery(
      '''SELECT id, revision, updated_at_ms, origin_device, user_id, payload
         FROM tasks
         WHERE sync_state = 'pending'
         ORDER BY updated_at_ms ASC
         LIMIT ?''',
      [limit],
    );
    return rows;
  }

  /// 应用一条来自服务端的 Task 变更:
  /// - 如果行已存在,revision / updated_at_ms / origin_device / user_id /
  ///   payload / 业务字段全部以 **远端权威值** 覆盖(`sync_state = 'synced'`,
  ///   服务端做了 LWW 裁决才下发这里,我们照单全收)
  /// - 如果不存在,INSERT
  ///
  /// ⚠️ 本批 id 是 int;签名用 int。等 v3 commit 切 string 后调 [applyRemoteTaskString]。
  Future<void> applyRemoteTask({
    required int id,
    required int revision,
    required int updatedAtMs,
    required String originDevice,
    required String userId,
    required String payload,
    required Map<String, Object?> fields,
  }) async {
    await _db.transaction((txn) async {
      final exists = (await txn.query('tasks',
              where: 'id = ?', whereArgs: [id], limit: 1)).isNotEmpty;
      final row = <String, Object?>{
        ...fields,
        'revision': revision,
        'updated_at_ms': updatedAtMs,
        'origin_device': originDevice,
        'user_id': userId,
        'payload': payload,
        'sync_state': 'synced',
      };
      if (exists) {
        await txn.update('tasks', row, where: 'id = ?', whereArgs: [id]);
      } else {
        row['id'] = id;
        await txn.insert('tasks', row);
      }
    });
  }

  /// 推 push 后服务端接受,本地把对应行标 `sync_state='synced'`。
  Future<void> markTasksSynced(List<int> ids) async {
    if (ids.isEmpty) return;
    final placeholders = List.filled(ids.length, '?').join(',');
    await _db.rawUpdate(
      "UPDATE tasks SET sync_state = 'synced' WHERE id IN ($placeholders)",
      ids,
    );
  }

  /// Pull 时与远端比 LWW 取本地候选。本批本端 i64 隐含;下批 id 切 string 后
  /// 返回的 `id` 字段同步改 String,但语义不变。
  Future<Map<String, Object?>?> localTaskCandidate(int id) async {
    final rows = await _db.query(
      'tasks',
      columns: ['id', 'revision', 'updated_at_ms', 'origin_device', 'payload'],
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    return rows.isEmpty ? null : rows.first;
  }

  /// 本端 mutator 写完后调用:bump revision + sync_state='pending' +
  /// updated_at_ms=now + payload=JSON。is_focus 等其他字段不变。
  Future<void> markTaskPending({
    required int id,
    required String payload,
    required String originDevice,
    required String userId,
  }) async {
    final nowMs = DateTime.now().millisecondsSinceEpoch;
    await _db.rawUpdate(
      '''UPDATE tasks
         SET revision = revision + 1,
             sync_state = 'pending',
             updated_at_ms = ?,
             payload = ?,
             origin_device = ?,
             user_id = ?
         WHERE id = ?''',
      [nowMs, payload, originDevice, userId, id],
    );
  }

  // === journals ================================================================

  Future<List<PfJournal>> listJournals() async {
    final rows = await _db.query('journals', orderBy: 'id ASC');
    return rows.map(_journalFromRow).toList();
  }

  Future<int> insertJournal(PfJournal j) async {
    return _db.insert('journals', _journalToRow(j));
  }

  // === Row mappers =============================================================

  static String _priorityText(PfPriority p) => switch (p) {
    PfPriority.high => 'high',
    PfPriority.medium => 'medium',
    PfPriority.low => 'low',
    PfPriority.none => 'none',
  };

  static PfPriority _priorityFrom(String s) => switch (s) {
    'high' => PfPriority.high,
    'medium' => PfPriority.medium,
    'low' => PfPriority.low,
    _ => PfPriority.none,
  };

  static String _kindText(JournalKind k) => switch (k) {
    JournalKind.todo => 'todo',
    JournalKind.wish => 'wish',
    JournalKind.plan => 'plan',
    JournalKind.note => 'note',
  };

  static JournalKind _kindFrom(String s) => switch (s) {
    'todo' => JournalKind.todo,
    'wish' => JournalKind.wish,
    'plan' => JournalKind.plan,
    _ => JournalKind.note,
  };

  static String _csv(List<String> items) => items.join(',');
  static List<String> _splitCsv(String s) =>
      s.isEmpty ? const [] : s.split(',').where((x) => x.isNotEmpty).toList();

  Map<String, Object?> _taskToRow(PfTask t) => {
    'id': t.id,
    'title': t.title,
    'priority': _priorityText(t.priority),
    'project': t.project,
    'due_label': t.dueLabel,
    'completed': t.completed ? 1 : 0,
    'estimated': t.estimatedPomos,
    'completed_cnt': t.completedPomos,
    'subtask_cnt': t.subtaskCount,
    'tags_csv': _csv(t.tags),
    'is_focus': 0,
    // v2 同步元信息列:默认值,v2 commit 内默认已 'synced' / revision=1
    'revision': 1,
    'sync_state': 'synced',
    'origin_device': '',
    'payload': '',
    'user_id': '',
  };

  PfTask _taskFromRow(Map<String, Object?> r) => PfTask(
    id: r['id'] as int,
    title: r['title'] as String,
    priority: _priorityFrom(r['priority'] as String),
    project: (r['project'] as String?) ?? '',
    dueLabel: (r['due_label'] as String?) ?? '',
    tags: _splitCsv((r['tags_csv'] as String?) ?? ''),
    estimatedPomos: (r['estimated'] as int?) ?? 0,
    completedPomos: (r['completed_cnt'] as int?) ?? 0,
    subtaskCount: (r['subtask_cnt'] as int?) ?? 0,
    completed: ((r['completed'] as int?) ?? 0) == 1,
  );

  Map<String, Object?> _journalToRow(PfJournal j) => {
    'id': j.id,
    'kind': _kindText(j.kind),
    'title': j.title,
    'content': j.content,
    'tags_csv': _csv(j.tags),
  };

  PfJournal _journalFromRow(Map<String, Object?> r) => PfJournal(
    id: r['id'] as int,
    kind: _kindFrom(r['kind'] as String),
    title: (r['title'] as String?) ?? '',
    content: (r['content'] as String?) ?? '',
    tags: _splitCsv((r['tags_csv'] as String?) ?? ''),
  );
}
