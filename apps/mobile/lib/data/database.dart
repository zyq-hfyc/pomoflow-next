import 'dart:async';

import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

import '../models/project.dart';
import '../models/session.dart';
import '../models/subtask.dart';
import '../models/task.dart';
import '../services/sync_wire.dart' show uuidV4;

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
///
/// Schema v5(P1 多实体同步批):
///   - **修复**:`tasks.updated_at_ms` 缺列 —— v2 起的 ChangeLogStore 代码全面
///     引用该列但从未在任何 DDL 里创建,native 路径 `markTaskPending` 必抛且被
///     上层 `catch (_)` 吞掉(同步静默失效)。v5 补列根治。
///   - 新表 `pomodoro_sessions`(core::PomodoroSession 对齐,含 5 同步列 +
///     `updated_at_ms`)。
class AppDatabase {
  AppDatabase._(this._db);
  final Database _db;

  /// schema v1 → v2:tasks 加 5 同步列 + meta last_seq 行。
  /// schema v2 → v3:tasks.id INTEGER → TEXT(id 字符串化)。
  /// schema v3 → v4:journals.id INTEGER → TEXT。
  /// schema v4 → v5:tasks 补 updated_at_ms 列 + 新建 pomodoro_sessions 表。
  /// schema v5 → v6:tasks 补 deleted_at_ms 列(软删除,对齐桌面 store 同名列)。
  /// schema v6 → v7:清非法 id 行(14 字符短码 → 标准 UUID 切换)。
  /// schema v7 → v8:tasks 补 completed_at_ms 列(区间口径「完成任务」前置)。
  /// schema v8 → v9:tasks 补 pomodoro_duration + repeat 列(任务级计时参数)。
  /// schema v9 → v10:新建 projects 表(project 实体化,任务项目归属跨端)。
  /// schema v10 → v11:新建 tags + task_tag_sync 表(标签跨端,对齐桌面表名)。
  /// schema v11 → v12:新建 subtasks 表(子任务实体 + 详情勾选 UI)。
  static const _schemaVersion = 12;
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
          // v2 → v3:tasks.id INTEGER → TEXT 类型整体迁移(id 字符串化)。
          if (oldVersion < 3) {
            await _v2ToV3(db);
          }
          // v3 → v4:journals.id INTEGER → TEXT(P1 batch 同步前一次性补)。
          if (oldVersion < 4) {
            await _v3ToV4(db);
          }
          // v4 → v5:tasks 补 updated_at_ms 缺列 + 新建 pomodoro_sessions 表。
          if (oldVersion < 5) {
            await _v4ToV5(db);
          }
          // v5 → v6:tasks 补 deleted_at_ms 列(软删除)。
          if (oldVersion < 6) {
            await _v5ToV6(db);
          }
          // v6 → v7:清非法 id 行(id 切标准 UUID v4 的配套清毒)。
          if (oldVersion < 7) {
            await _v6ToV7(db);
          }
          // v7 → v8:tasks 补 completed_at_ms 列(完成时刻,0=未完成)。
          if (oldVersion < 8) {
            await _v7ToV8(db);
          }
          // v8 → v9:tasks 补任务级计时参数两列。
          if (oldVersion < 9) {
            await _v8ToV9(db);
          }
          // v9 → v10:新建 projects 表。
          if (oldVersion < 10) {
            await _v9ToV10(db);
          }
          // v10 → v11:新建 tags + task_tag_sync 表。
          if (oldVersion < 11) {
            await _v10ToV11(db);
          }
          // v11 → v12:新建 subtasks 表。
          if (oldVersion < 12) {
            await _v11ToV12(db);
          }
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
        user_id TEXT NOT NULL DEFAULT '',
        updated_at_ms INTEGER NOT NULL DEFAULT 0,
        deleted_at_ms INTEGER NOT NULL DEFAULT 0,
        completed_at_ms INTEGER NOT NULL DEFAULT 0,
        pomodoro_duration INTEGER NOT NULL DEFAULT 0,
        repeat TEXT NOT NULL DEFAULT 'none'
      )
    ''');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_tasks_focus ON tasks(is_focus)');
    await _createSessionsTable(db);
    await _createProjectsTable(db);
    await _createTagsTable(db);
    await _createTaskTagSyncTable(db);
    await _createSubtasksTable(db);
    await db.execute('''
      CREATE TABLE IF NOT EXISTS journals (
        id TEXT PRIMARY KEY,
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
    await _addColumnIfMissing(
      db, 'tasks', 'ALTER TABLE tasks ADD COLUMN revision INTEGER NOT NULL DEFAULT 1');
    await _addColumnIfMissing(
      db, 'tasks', "ALTER TABLE tasks ADD COLUMN sync_state TEXT NOT NULL DEFAULT 'synced'");
    await _addColumnIfMissing(
      db, 'tasks', "ALTER TABLE tasks ADD COLUMN origin_device TEXT NOT NULL DEFAULT ''");
    await _addColumnIfMissing(
      db, 'tasks', "ALTER TABLE tasks ADD COLUMN payload TEXT NOT NULL DEFAULT ''");
    await _addColumnIfMissing(
      db, 'tasks', "ALTER TABLE tasks ADD COLUMN user_id TEXT NOT NULL DEFAULT ''");

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

  /// v2 → v3 升级:`tasks.id INTEGER → TEXT` 类型整体迁移。
  /// SQLite 标准做法:创建新表 + INSERT SELECT 复制(id 转 string)+ DROP 旧表 + RENAME 新表。
  static Future<void> _v2ToV3(Database db) async {
    await db.execute('''
      CREATE TABLE tasks_v3 (
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
    // cast(id AS TEXT) SQLite 默认就支持,字面量转字符串等价。
    await db.execute('''
      INSERT INTO tasks_v3
        (id, title, priority, project, due_label, completed,
         estimated, completed_cnt, subtask_cnt, tags_csv, is_focus,
         revision, sync_state, origin_device, payload, user_id)
      SELECT
        CAST(id AS TEXT), title, priority, project, due_label, completed,
        estimated, completed_cnt, subtask_cnt, tags_csv, is_focus,
        revision, sync_state, origin_device, payload, user_id
      FROM tasks
    ''');
    await db.execute('DROP TABLE tasks');
    await db.execute('ALTER TABLE tasks_v3 RENAME TO tasks');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_tasks_focus ON tasks(is_focus)');
    // bump schema_version → 3
    await db.insert('meta', {'k': 'schema_version', 'v': '3'},
        conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// sqflite 的 ALTER ADD COLUMN 没原生 IF NOT EXISTS,先探测列再补(幂等)。
  /// PRAGMA table_info 返回 cid / name / type / notnull / dflt_value / pk,
  /// 这里仅取 name 列。
  static Future<void> _addColumnIfMissing(
      Database db, String table, String sql) async {
    final cols = await db.rawQuery('PRAGMA table_info($table)');
    final names = cols.map((r) => r['name'] as String).toSet();
    final match = RegExp(r'ADD COLUMN\s+(\w+)').firstMatch(sql);
    final colName = match?.group(1);
    if (colName != null && !names.contains(colName)) {
      await db.execute(sql);
    }
  }

  /// v4 → v5 升级:tasks 补 `updated_at_ms` 缺列(修复 ChangeLogStore 引用不存在的列)
  /// + 新建 pomodoro_sessions 表。
  static Future<void> _v4ToV5(Database db) async {
    await _addColumnIfMissing(
      db, 'tasks', 'ALTER TABLE tasks ADD COLUMN updated_at_ms INTEGER NOT NULL DEFAULT 0');
    await _createSessionsTable(db);
    await db.insert('meta', {'k': 'schema_version', 'v': '5'},
        conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// v5 → v6 升级:tasks 补 `deleted_at_ms` 软删除列(0 = 未删,对齐桌面 store)。
  static Future<void> _v5ToV6(Database db) async {
    await _addColumnIfMissing(
      db, 'tasks', 'ALTER TABLE tasks ADD COLUMN deleted_at_ms INTEGER NOT NULL DEFAULT 0');
    await db.insert('meta', {'k': 'schema_version', 'v': '6'},
        conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// v6 → v7 升级:**清毒**——id 全面切标准 UUID v4 的配套迁移。
  /// 旧 14 字符 base64Url 短码行:从未成功同步过(push 通之前生成的),
  /// 且推上服务端会毒死桌面端(Id::parse 拒收 → list_tasks 整页炸)。
  /// 直接删除 + 重置 seed_done(种子 id 已换合法 UUID,重新播种)。
  static Future<void> _v6ToV7(Database db) async {
    await db.execute('DELETE FROM tasks WHERE LENGTH(id) != 36');
    await db.execute('DELETE FROM pomodoro_sessions WHERE LENGTH(id) != 36');
    await db.delete('meta', where: "k = 'seed_done'");
    await db.insert('meta', {'k': 'schema_version', 'v': '7'},
        conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// v7 → v8 升级:tasks 补 `completed_at_ms` 完成时刻列(0 = 未完成/未知)。
  /// 老库里已完成的行没有历史时刻,回填 0(区间口径下不计,保守可接受)。
  static Future<void> _v7ToV8(Database db) async {
    await _addColumnIfMissing(
      db, 'tasks', 'ALTER TABLE tasks ADD COLUMN completed_at_ms INTEGER NOT NULL DEFAULT 0');
    await db.insert('meta', {'k': 'schema_version', 'v': '8'},
        conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// v11 → v12 升级:新建 subtasks 表(子任务实体)。
  static Future<void> _v11ToV12(Database db) async {
    await _createSubtasksTable(db);
    await db.insert('meta', {'k': 'schema_version', 'v': '12'},
        conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// subtasks:core::SubTask 对齐(N:1 Task;position 同 task 内升序)。
  static Future<void> _createSubtasksTable(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS subtasks (
        id TEXT PRIMARY KEY,
        task_id TEXT NOT NULL,
        title TEXT NOT NULL,
        is_completed INTEGER NOT NULL DEFAULT 0,
        position INTEGER NOT NULL DEFAULT 0,
        revision INTEGER NOT NULL DEFAULT 1,
        sync_state TEXT NOT NULL DEFAULT 'synced',
        updated_at_ms INTEGER NOT NULL DEFAULT 0,
        deleted_at_ms INTEGER NOT NULL DEFAULT 0,
        origin_device TEXT NOT NULL DEFAULT '',
        payload TEXT NOT NULL DEFAULT '',
        user_id TEXT NOT NULL DEFAULT ''
      )
    ''');
    await db.execute(
      'CREATE INDEX IF NOT EXISTS idx_subtasks_task ON subtasks(task_id)',
    );
  }

  /// v10 → v11 升级:新建 tags + task_tag_sync 表(标签跨端)。
  static Future<void> _v10ToV11(Database db) async {
    await _createTagsTable(db);
    await _createTaskTagSyncTable(db);
    await _createSubtasksTable(db);
    await db.insert('meta', {'k': 'schema_version', 'v': '11'},
        conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// tags:core::Tag 平铺子集(名字 + 颜色)。
  static Future<void> _createTagsTable(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS tags (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        color TEXT NOT NULL DEFAULT '',
        revision INTEGER NOT NULL DEFAULT 1,
        sync_state TEXT NOT NULL DEFAULT 'synced',
        updated_at_ms INTEGER NOT NULL DEFAULT 0,
        origin_device TEXT NOT NULL DEFAULT '',
        payload TEXT NOT NULL DEFAULT '',
        user_id TEXT NOT NULL DEFAULT ''
      )
    ''');
  }

  /// task_tag_sync:以 task_id 为键的标签集合整体 LWW(列名对齐桌面
  /// sqlite.rs 同名表;tag_ids 存 csv,推送前排序去重消除顺序伪冲突)。
  static Future<void> _createTaskTagSyncTable(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS task_tag_sync (
        task_id TEXT PRIMARY KEY,
        tag_ids TEXT NOT NULL DEFAULT '',
        revision INTEGER NOT NULL DEFAULT 1,
        sync_state TEXT NOT NULL DEFAULT 'synced',
        updated_at_ms INTEGER NOT NULL DEFAULT 0,
        origin_device TEXT NOT NULL DEFAULT '',
        payload TEXT NOT NULL DEFAULT '',
        user_id TEXT NOT NULL DEFAULT ''
      )
    ''');
  }

  /// v9 → v10 升级:新建 projects 表(project 实体化)。
  static Future<void> _v9ToV10(Database db) async {
    await _createProjectsTable(db);
    await db.insert('meta', {'k': 'schema_version', 'v': '10'},
        conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// projects(P1 实体化):core::Project 平铺子集(name/color,无层级 ——
  /// mobile 端平铺;桌面的 parent_id 树拉下来落在 payload 里不展开)。
  static Future<void> _createProjectsTable(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        color TEXT NOT NULL DEFAULT '',
        revision INTEGER NOT NULL DEFAULT 1,
        sync_state TEXT NOT NULL DEFAULT 'synced',
        updated_at_ms INTEGER NOT NULL DEFAULT 0,
        origin_device TEXT NOT NULL DEFAULT '',
        payload TEXT NOT NULL DEFAULT '',
        user_id TEXT NOT NULL DEFAULT ''
      )
    ''');
  }

  /// v8 → v9 升级:任务级计时参数(单番茄时长覆盖全局 + 重复标记)。
  static Future<void> _v8ToV9(Database db) async {
    await _addColumnIfMissing(
      db, 'tasks', 'ALTER TABLE tasks ADD COLUMN pomodoro_duration INTEGER NOT NULL DEFAULT 0');
    await _addColumnIfMissing(
      db, 'tasks', "ALTER TABLE tasks ADD COLUMN repeat TEXT NOT NULL DEFAULT 'none'");
    await db.insert('meta', {'k': 'schema_version', 'v': '9'},
        conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// pomodoro_sessions(P1 多实体同步):core::PomodoroSession 对齐。
  /// `task_id`/`project_id` 用 `''` 表示 core 的 `None`;时间列 epoch 毫秒。
  static Future<void> _createSessionsTable(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS pomodoro_sessions (
        id TEXT PRIMARY KEY,
        task_id TEXT NOT NULL DEFAULT '',
        project_id TEXT NOT NULL DEFAULT '',
        duration INTEGER NOT NULL DEFAULT 25,
        started_at_ms INTEGER NOT NULL DEFAULT 0,
        ended_at_ms INTEGER NOT NULL DEFAULT 0,
        is_completed INTEGER NOT NULL DEFAULT 1,
        created_at_ms INTEGER NOT NULL DEFAULT 0,
        revision INTEGER NOT NULL DEFAULT 1,
        sync_state TEXT NOT NULL DEFAULT 'synced',
        updated_at_ms INTEGER NOT NULL DEFAULT 0,
        origin_device TEXT NOT NULL DEFAULT '',
        payload TEXT NOT NULL DEFAULT '',
        user_id TEXT NOT NULL DEFAULT ''
      )
    ''');
    await db.execute(
      'CREATE INDEX IF NOT EXISTS idx_sessions_started ON pomodoro_sessions(started_at_ms)',
    );
  }

  /// v3 → v4 升级:`journals.id INTEGER → TEXT` 同结构迁移。
  static Future<void> _v3ToV4(Database db) async {
    await db.execute('''
      CREATE TABLE journals_v4 (
        id TEXT PRIMARY KEY,
        kind TEXT NOT NULL,
        title TEXT NOT NULL DEFAULT '',
        content TEXT NOT NULL DEFAULT '',
        tags_csv TEXT NOT NULL DEFAULT ''
      )
    ''');
    await db.execute('''
      INSERT INTO journals_v4 (id, kind, title, content, tags_csv)
      SELECT CAST(id AS TEXT), kind, title, content, tags_csv
      FROM journals
    ''');
    await db.execute('DROP TABLE journals');
    await db.execute('ALTER TABLE journals_v4 RENAME TO journals');
    await db.insert('meta', {'k': 'schema_version', 'v': '4'},
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

  /// 展示用全量任务(软删除墓碑行不出现;行本身保留供 LWW 同步)。
  Future<List<PfTask>> listTasks() async {
    final rows = await _db.query(
      'tasks',
      where: 'deleted_at_ms = 0',
      orderBy: 'id ASC',
    );
    return rows.map(_taskFromRow).toList();
  }

  /// 回收站:已软删除的行,按删除时间倒序(最近的在前)。
  Future<List<PfTask>> listDeletedTasks() async {
    final rows = await _db.query(
      'tasks',
      where: 'deleted_at_ms > 0',
      orderBy: 'deleted_at_ms DESC',
    );
    return rows.map(_taskFromRow).toList();
  }

  /// 恢复:清墓碑 + bump revision + 标 pending —— 恢复就是一次普通编辑,
  /// 走 LWW 常规通道(对端同步后任务重新出现)。
  Future<void> restoreTask({
    required String id,
    required String originDevice,
    required String userId,
  }) async {
    final nowMs = DateTime.now().millisecondsSinceEpoch;
    await _db.rawUpdate(
      '''UPDATE tasks
         SET deleted_at_ms = 0,
             revision = revision + 1,
             sync_state = 'pending',
             updated_at_ms = ?,
             origin_device = ?,
             user_id = ?
         WHERE id = ? AND deleted_at_ms > 0''',
      [nowMs, originDevice, userId, id],
    );
  }

  /// 彻底删除:硬删本地行。服务端快照已是墓碑(revision 最新),
  /// 其他端/新设备拉到的是墓碑照样隐藏 —— 无需服务端操作。
  Future<void> purgeTask(String id) async {
    await _db.delete('tasks', where: 'id = ?', whereArgs: [id]);
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

  Future<void> setFocus(String? id) async {
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

  /// === Phase-2 ChangeLogStore 适配(P3d-Phase-2 P0,Tasks 实体,id 已切 String)===
  ///
  /// 与桌面端 `crates/core/src/store/sqlite.rs` SqliteStore::ChangeLogStore
  /// 实现对齐;不在 dart 端抽 trait(单 store 无分发开销)。

  /// 当前未推送的变更(`sync_state = 'pending'`),按 updated_at_ms 升序。
  /// 返回行含**业务列 + 同步元信息列**(P1 起 SyncClient 在 push 时用
  /// `sync_wire.coreTaskPayload` 从业务列现构造 core JSON —— 不依赖预写 payload)。
  Future<List<Map<String, Object?>>> listPendingTasks({int limit = 200}) async {
    final rows = await _db.rawQuery(
      '''SELECT id, title, priority, project, due_label, completed,
                estimated, completed_cnt, subtask_cnt, tags_csv,
                revision, updated_at_ms, deleted_at_ms, completed_at_ms,
                pomodoro_duration, repeat,
                origin_device, user_id, payload
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
  Future<void> applyRemoteTask({
    required String id,
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
  Future<void> markTasksSynced(List<String> ids) async {
    if (ids.isEmpty) return;
    final placeholders = List.filled(ids.length, '?').join(',');
    await _db.rawUpdate(
      "UPDATE tasks SET sync_state = 'synced' WHERE id IN ($placeholders)",
      ids,
    );
  }

  /// Pull 时与远端比 LWW 取本地候选(id 是 String)。
  Future<Map<String, Object?>?> localTaskCandidate(String id) async {
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
  /// updated_at_ms=now + 身份盖章。is_focus 等其他字段不变;payload 不在此写
  /// —— push 时由 SyncClient 从行内业务列现构造(core wire 映射在那一层)。
  Future<void> markTaskPending({
    required String id,
    required String originDevice,
    required String userId,
  }) async {
    final nowMs = DateTime.now().millisecondsSinceEpoch;
    await _db.rawUpdate(
      '''UPDATE tasks
         SET revision = revision + 1,
             sync_state = 'pending',
             updated_at_ms = ?,
             origin_device = ?,
             user_id = ?
         WHERE id = ?''',
      [nowMs, originDevice, userId, id],
    );
  }

  /// 软删除:盖 deleted_at_ms 墓碑 + bump revision + 标 pending —— 删除和编辑
  /// 走**同一条 LWW 通道**(core ADR:删除只是实体状态,不是特殊操作)。
  /// 行保留,否则其他端/服务端的旧快照会在 pull 时让任务"复活"。
  Future<void> softDeleteTask({
    required String id,
    required String originDevice,
    required String userId,
  }) async {
    final nowMs = DateTime.now().millisecondsSinceEpoch;
    await _db.rawUpdate(
      '''UPDATE tasks
         SET deleted_at_ms = ?,
             revision = revision + 1,
             sync_state = 'pending',
             updated_at_ms = ?,
             origin_device = ?,
             user_id = ?
         WHERE id = ? AND deleted_at_ms = 0''',
      [nowMs, nowMs, originDevice, userId, id],
    );
  }

  // === pomodoro_sessions(P1 多实体同步)======================================

  Future<List<PfSession>> listSessions() async {
    final rows = await _db.query('pomodoro_sessions', orderBy: 'started_at_ms ASC');
    return rows.map(_sessionFromRow).toList();
  }

  /// 本地日(yyyy-mm-dd)内**计数口径**的会话 —— todayPomos 派生。
  /// 口径对齐桌面 core::stats counts_session:自然完成 && 关联任务
  /// (不选任务的专注 / 放弃会话两端都不计,数字才一致)。
  Future<List<PfSession>> sessionsOnDay(String localDay) async {
    final rows = await _db.query(
      'pomodoro_sessions',
      where: "strftime('%Y-%m-%d', started_at_ms / 1000, 'unixepoch', 'localtime') = ?"
          " AND is_completed = 1 AND task_id != ''",
      whereArgs: [localDay],
      orderBy: 'started_at_ms ASC',
    );
    return rows.map(_sessionFromRow).toList();
  }

  Future<void> insertSession(PfSession s) async {
    await _db.insert('pomodoro_sessions', _sessionToRow(s));
  }

  /// === ChangeLogStore:session 实体(与 tasks 四方法同形,LWW 复用)===

  Future<List<Map<String, Object?>>> listPendingSessions({int limit = 200}) async {
    final rows = await _db.rawQuery(
      '''SELECT id, task_id, project_id, duration, started_at_ms, ended_at_ms,
                is_completed, created_at_ms, revision, updated_at_ms,
                origin_device, user_id, payload
         FROM pomodoro_sessions
         WHERE sync_state = 'pending'
         ORDER BY updated_at_ms ASC
         LIMIT ?''',
      [limit],
    );
    return rows;
  }

  Future<void> applyRemoteSession({
    required String id,
    required int revision,
    required int updatedAtMs,
    required String originDevice,
    required String userId,
    required String payload,
    required Map<String, Object?> fields,
  }) async {
    await _db.transaction((txn) async {
      final exists = (await txn.query('pomodoro_sessions',
              where: 'id = ?', whereArgs: [id], limit: 1))
          .isNotEmpty;
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
        await txn.update('pomodoro_sessions', row, where: 'id = ?', whereArgs: [id]);
      } else {
        row['id'] = id;
        await txn.insert('pomodoro_sessions', row);
      }
    });
  }

  Future<void> markSessionsSynced(List<String> ids) async {
    if (ids.isEmpty) return;
    final placeholders = List.filled(ids.length, '?').join(',');
    await _db.rawUpdate(
      "UPDATE pomodoro_sessions SET sync_state = 'synced' WHERE id IN ($placeholders)",
      ids,
    );
  }

  Future<Map<String, Object?>?> localSessionCandidate(String id) async {
    final rows = await _db.query(
      'pomodoro_sessions',
      columns: ['id', 'revision', 'updated_at_ms', 'origin_device', 'payload'],
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    return rows.isEmpty ? null : rows.first;
  }

  /// session 写入后标 pending(append-only 实体,通常只在插入时调一次)。
  Future<void> markSessionPending({
    required String id,
    required String originDevice,
    required String userId,
  }) async {
    final nowMs = DateTime.now().millisecondsSinceEpoch;
    await _db.rawUpdate(
      '''UPDATE pomodoro_sessions
         SET sync_state = 'pending',
             updated_at_ms = ?,
             origin_device = ?,
             user_id = ?
         WHERE id = ?''',
      [nowMs, originDevice, userId, id],
    );
  }

  // === projects(P1 实体化)====================================================

  /// 未删除的项目(墓碑行过滤;名字 → id 映射 / push resolve 用)。
  Future<List<PfProject>> listProjects() async {
    final rows = await _db.query(
      'projects',
      where: "sync_state != 'tombstone'",
      orderBy: 'name ASC',
    );
    return rows
        .map((r) => PfProject(
              id: r['id'] as String,
              name: r['name'] as String,
              color: (r['color'] as String?) ?? '',
              syncMeta: PfSyncMeta(
                revision: (r['revision'] as int?) ?? 1,
                updatedAt: (r['updated_at_ms'] as int? ?? 0) > 0
                    ? DateTime.fromMillisecondsSinceEpoch(
                        r['updated_at_ms'] as int)
                    : null,
                originDevice: (r['origin_device'] as String?) ?? '',
                syncState: (r['sync_state'] as String?) ?? 'synced',
                userId: (r['user_id'] as String?) ?? '',
              ),
            ))
        .toList();
  }

  Future<PfProject?> findProjectByName(String name) async {
    final rows = await _db.query(
      'projects',
      where: "name = ? AND sync_state != 'tombstone'",
      whereArgs: [name],
      limit: 1,
    );
    if (rows.isEmpty) return null;
    return PfProject(
      id: rows.first['id'] as String,
      name: name,
      color: (rows.first['color'] as String?) ?? '',
    );
  }

  /// pull task 时 project_id → 名字(展示列)。
  Future<String?> findProjectNameById(String id) async {
    final rows = await _db.query(
      'projects',
      columns: ['name'],
      where: "id = ? AND sync_state != 'tombstone'",
      whereArgs: [id],
      limit: 1,
    );
    if (rows.isEmpty) return null;
    return rows.first['name'] as String?;
  }

  /// 懒建项目(push resolve 时):同步创建的实体行,直接标 pending。
  Future<void> insertPendingProject({
    required String id,
    required String name,
    required String originDevice,
    required String userId,
  }) async {
    final nowMs = DateTime.now().millisecondsSinceEpoch;
    await _db.insert('projects', {
      'id': id,
      'name': name,
      'color': '',
      'revision': 1,
      'sync_state': 'pending',
      'updated_at_ms': nowMs,
      'origin_device': originDevice,
      'payload': '',
      'user_id': userId,
    });
  }

  Future<List<Map<String, Object?>>> listPendingProjects({int limit = 100}) async {
    return _db.rawQuery(
      '''SELECT id, name, color, revision, updated_at_ms,
                origin_device, user_id, payload
         FROM projects
         WHERE sync_state = 'pending'
         ORDER BY updated_at_ms ASC
         LIMIT ?''',
      [limit],
    );
  }

  Future<void> applyRemoteProject({
    required String id,
    required int revision,
    required int updatedAtMs,
    required String originDevice,
    required String userId,
    required String payload,
    required Map<String, Object?> fields,
  }) async {
    await _db.transaction((txn) async {
      final exists = (await txn.query('projects',
              where: 'id = ?', whereArgs: [id], limit: 1))
          .isNotEmpty;
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
        await txn.update('projects', row, where: 'id = ?', whereArgs: [id]);
      } else {
        row['id'] = id;
        await txn.insert('projects', row);
      }
    });
  }

  Future<void> markProjectsSynced(List<String> ids) async {
    if (ids.isEmpty) return;
    final placeholders = List.filled(ids.length, '?').join(',');
    await _db.rawUpdate(
      "UPDATE projects SET sync_state = 'synced' WHERE id IN ($placeholders)",
      ids,
    );
  }

  Future<Map<String, Object?>?> localProjectCandidate(String id) async {
    final rows = await _db.query(
      'projects',
      columns: ['id', 'revision', 'updated_at_ms', 'origin_device', 'payload'],
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    return rows.isEmpty ? null : rows.first;
  }

  // === tags + task_tag_sync(P1 标签跨端)=======================================

  /// 标签名 → 实体(轻量 record;tag 无独立模型)。
  Future<({String id, String color})?> findTagByName(String name) async {
    final rows = await _db.query(
      'tags',
      where: "name = ? AND sync_state != 'tombstone'",
      whereArgs: [name],
      limit: 1,
    );
    if (rows.isEmpty) return null;
    return (
      id: rows.first['id'] as String,
      color: (rows.first['color'] as String?) ?? '',
    );
  }

  /// 懒建标签(名 → 实体 id;无则建 pending 行)。返回 id。
  Future<String> ensureTag({
    required String name,
    required String originDevice,
    required String userId,
  }) async {
    final found = await findTagByName(name);
    if (found != null) return found.id;
    final id = uuidV4();
    await _db.insert('tags', {
      'id': id,
      'name': name,
      'color': '',
      'revision': 1,
      'sync_state': 'pending',
      'updated_at_ms': DateTime.now().millisecondsSinceEpoch,
      'origin_device': originDevice,
      'payload': '',
      'user_id': userId,
    });
    return id;
  }

  Future<String?> findTagNameById(String id) async {
    final rows = await _db.query(
      'tags',
      columns: ['name'],
      where: "id = ? AND sync_state != 'tombstone'",
      whereArgs: [id],
      limit: 1,
    );
    if (rows.isEmpty) return null;
    return rows.first['name'] as String?;
  }

  Future<List<Map<String, Object?>>> listPendingTags({int limit = 200}) async {
    return _db.rawQuery(
      '''SELECT id, name, color, revision, updated_at_ms,
                origin_device, user_id, payload
         FROM tags WHERE sync_state = 'pending'
         ORDER BY updated_at_ms ASC LIMIT ?''',
      [limit],
    );
  }

  Future<void> applyRemoteTag({
    required String id,
    required int revision,
    required int updatedAtMs,
    required String originDevice,
    required String userId,
    required String payload,
    required Map<String, Object?> fields,
  }) async {
    await _db.transaction((txn) async {
      final exists = (await txn.query('tags',
              where: 'id = ?', whereArgs: [id], limit: 1))
          .isNotEmpty;
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
        await txn.update('tags', row, where: 'id = ?', whereArgs: [id]);
      } else {
        row['id'] = id;
        await txn.insert('tags', row);
      }
    });
  }

  Future<void> markTagsSynced(List<String> ids) async {
    if (ids.isEmpty) return;
    final placeholders = List.filled(ids.length, '?').join(',');
    await _db.rawUpdate(
      "UPDATE tags SET sync_state = 'synced' WHERE id IN ($placeholders)",
      ids,
    );
  }

  Future<Map<String, Object?>?> localTagCandidate(String id) async {
    final rows = await _db.query(
      'tags',
      columns: ['id', 'revision', 'updated_at_ms', 'origin_device', 'payload'],
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    return rows.isEmpty ? null : rows.first;
  }

  // --- task_tag_sync(以 task_id 为键的集合整体 LWW)--------------------------

  /// mutator 维护:任务的标签名集合 → 懒解析 tag id → upsert task_tag_sync
  /// 并标 pending。**变更检测**:集合与已存 csv 相同则不 bump(消除伪冲突)。
  Future<void> syncTaskTagForTask({
    required String taskId,
    required List<String> tagNames,
    required String originDevice,
    required String userId,
  }) async {
    final ids = <String>[];
    for (final name in tagNames) {
      if (name.isEmpty) continue;
      ids.add(await ensureTag(
        name: name,
        originDevice: originDevice,
        userId: userId,
      ));
    }
    ids.sort();
    final csv = ids.join(',');
    final existing = await _db.query(
      'task_tag_sync',
      where: 'task_id = ?',
      whereArgs: [taskId],
      limit: 1,
    );
    if (existing.isNotEmpty && (existing.first['tag_ids'] as String?) == csv) {
      return; // 集合未变,不产生伪变更
    }
    final nowMs = DateTime.now().millisecondsSinceEpoch;
    if (existing.isEmpty) {
      await _db.insert('task_tag_sync', {
        'task_id': taskId,
        'tag_ids': csv,
        'revision': 1,
        'sync_state': 'pending',
        'updated_at_ms': nowMs,
        'origin_device': originDevice,
        'payload': '',
        'user_id': userId,
      });
    } else {
      await _db.update(
        'task_tag_sync',
        {
          'tag_ids': csv,
          'revision': ((existing.first['revision'] as int?) ?? 1) + 1,
          'sync_state': 'pending',
          'updated_at_ms': nowMs,
          'origin_device': originDevice,
          'user_id': userId,
        },
        where: 'task_id = ?',
        whereArgs: [taskId],
      );
    }
  }

  Future<List<Map<String, Object?>>> listPendingTaskTags(
      {int limit = 200}) async {
    return _db.rawQuery(
      '''SELECT task_id, tag_ids, revision, updated_at_ms,
                origin_device, user_id, payload
         FROM task_tag_sync WHERE sync_state = 'pending'
         ORDER BY updated_at_ms ASC LIMIT ?''',
      [limit],
    );
  }

  /// pull 收敛:tag_ids 集合 → 名字 join 回 tasks.tags_csv(展示列)+
  /// task_tag_sync 行标 synced。
  Future<void> applyRemoteTaskTag({
    required String taskId,
    required List<String> tagIds,
    required int revision,
    required int updatedAtMs,
    required String originDevice,
    required String userId,
    required String payload,
  }) async {
    final names = <String>[];
    for (final id in tagIds) {
      final name = await findTagNameById(id);
      if (name != null) names.add(name);
    }
    await _db.transaction((txn) async {
      await txn.update(
        'tasks',
        {'tags_csv': names.join(',')},
        where: 'id = ?',
        whereArgs: [taskId],
      );
      final existing = await txn.query('task_tag_sync',
          where: 'task_id = ?', whereArgs: [taskId], limit: 1);
      final row = {
        'tag_ids': tagIds.join(','),
        'revision': revision,
        'updated_at_ms': updatedAtMs,
        'origin_device': originDevice,
        'user_id': userId,
        'payload': payload,
        'sync_state': 'synced',
      };
      if (existing.isEmpty) {
        await txn.insert('task_tag_sync', {'task_id': taskId, ...row});
      } else {
        await txn
            .update('task_tag_sync', row, where: 'task_id = ?', whereArgs: [taskId]);
      }
    });
  }

  Future<void> markTaskTagsSynced(List<String> taskIds) async {
    if (taskIds.isEmpty) return;
    final placeholders = List.filled(taskIds.length, '?').join(',');
    await _db.rawUpdate(
      "UPDATE task_tag_sync SET sync_state = 'synced' WHERE task_id IN ($placeholders)",
      taskIds,
    );
  }

  Future<Map<String, Object?>?> localTaskTagCandidate(String taskId) async {
    final rows = await _db.query(
      'task_tag_sync',
      columns: ['task_id', 'revision', 'updated_at_ms', 'origin_device', 'payload'],
      where: 'task_id = ?',
      whereArgs: [taskId],
      limit: 1,
    );
    return rows.isEmpty ? null : rows.first;
  }

  // === subtasks(P1 子任务实体)=================================================

  /// 任务的子任务(未删,position 升序)。
  Future<List<PfSubTask>> listSubtasksForTask(String taskId) async {
    final rows = await _db.query(
      'subtasks',
      where: 'task_id = ? AND deleted_at_ms = 0',
      whereArgs: [taskId],
      orderBy: 'position ASC, id ASC',
    );
    return rows.map(_subtaskFromRow).toList();
  }

  Future<void> insertSubtask(PfSubTask s) async {
    await _db.insert('subtasks', {
      'id': s.id,
      'task_id': s.taskId,
      'title': s.title,
      'is_completed': s.isCompleted ? 1 : 0,
      'position': s.position,
      'revision': s.syncMeta.revision,
      'sync_state': s.syncMeta.syncState,
      'updated_at_ms': s.syncMeta.updatedAt?.millisecondsSinceEpoch ?? 0,
      'origin_device': s.syncMeta.originDevice,
      'payload': '',
      'user_id': s.syncMeta.userId,
    });
  }

  /// 勾选/编辑统一入口:bump revision + 标 pending。
  /// sqflite 无原生列自增更新,读 revision 再写(本地单写者,
  /// 竞态窗口可忽略;与 markTaskPending 同模式)。
  Future<void> markSubtaskPending({
    required String id,
    Map<String, Object?> fields = const {},
    required String originDevice,
    required String userId,
  }) async {
    final nowMs = DateTime.now().millisecondsSinceEpoch;
    final rows = await _db.query('subtasks',
        columns: ['revision'], where: 'id = ?', whereArgs: [id], limit: 1);
    if (rows.isEmpty) return;
    await _db.update(
      'subtasks',
      {
        ...fields,
        'revision': ((rows.first['revision'] as int?) ?? 1) + 1,
        'sync_state': 'pending',
        'updated_at_ms': nowMs,
        'origin_device': originDevice,
        'user_id': userId,
      },
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  /// 软删除子任务(墓碑 + bump revision,与任务软删同通道)。
  Future<void> softDeleteSubtask({
    required String id,
    required String originDevice,
    required String userId,
  }) async {
    final nowMs = DateTime.now().millisecondsSinceEpoch;
    final rows = await _db.query('subtasks',
        columns: ['revision'], where: 'id = ?', whereArgs: [id], limit: 1);
    await _db.update(
      'subtasks',
      {
        'deleted_at_ms': nowMs,
        'revision': ((rows.first['revision'] as int?) ?? 1) + 1,
        'sync_state': 'pending',
        'updated_at_ms': nowMs,
        'origin_device': originDevice,
        'user_id': userId,
      },
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  /// 任务的未删子任务数(冗余列 tasks.subtask_cnt 的维护源)。
  Future<int> activeSubtaskCount(String taskId) async {
    final rows = await _db.rawQuery(
      'SELECT COUNT(*) AS c FROM subtasks WHERE task_id = ? AND deleted_at_ms = 0',
      [taskId],
    );
    return (rows.first['c'] as int?) ?? 0;
  }

  // --- ChangeLogStore ---

  Future<List<Map<String, Object?>>> listPendingSubtasks(
      {int limit = 200}) async {
    return _db.rawQuery(
      '''SELECT id, task_id, title, is_completed, position,
                revision, updated_at_ms, deleted_at_ms,
                origin_device, user_id, payload
         FROM subtasks WHERE sync_state = 'pending'
         ORDER BY updated_at_ms ASC LIMIT ?''',
      [limit],
    );
  }

  Future<void> applyRemoteSubtask({
    required String id,
    required int revision,
    required int updatedAtMs,
    required String originDevice,
    required String userId,
    required String payload,
    required Map<String, Object?> fields,
  }) async {
    await _db.transaction((txn) async {
      final exists = (await txn.query('subtasks',
              where: 'id = ?', whereArgs: [id], limit: 1))
          .isNotEmpty;
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
        await txn.update('subtasks', row, where: 'id = ?', whereArgs: [id]);
      } else {
        row['id'] = id;
        await txn.insert('subtasks', row);
      }
    });
  }

  Future<void> markSubtasksSynced(List<String> ids) async {
    if (ids.isEmpty) return;
    final placeholders = List.filled(ids.length, '?').join(',');
    await _db.rawUpdate(
      "UPDATE subtasks SET sync_state = 'synced' WHERE id IN ($placeholders)",
      ids,
    );
  }

  Future<Map<String, Object?>?> localSubtaskCandidate(String id) async {
    final rows = await _db.query(
      'subtasks',
      columns: ['id', 'revision', 'updated_at_ms', 'origin_device', 'payload'],
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    return rows.isEmpty ? null : rows.first;
  }

  PfSubTask _subtaskFromRow(Map<String, Object?> r) => PfSubTask(
        id: r['id'] as String,
        taskId: r['task_id'] as String,
        title: (r['title'] as String?) ?? '',
        isCompleted: ((r['is_completed'] as int?) ?? 0) == 1,
        position: (r['position'] as int?) ?? 0,
        syncMeta: PfSyncMeta(
          revision: (r['revision'] as int?) ?? 1,
          updatedAt: r['updated_at_ms'] != null &&
                  (r['updated_at_ms'] as int) > 0
              ? DateTime.fromMillisecondsSinceEpoch(r['updated_at_ms'] as int)
              : null,
          originDevice: (r['origin_device'] as String?) ?? '',
          syncState: (r['sync_state'] as String?) ?? 'synced',
          userId: (r['user_id'] as String?) ?? '',
        ),
      );

  // === journals ================================================================
  // PfJournal.id 字符串化已在 models/task.dart 完成;schema v3 不动 journals
  // 表,等 P1 Journal 同步批一次性 ALTER(避免本批 commit 3 UI 调用点爆炸)。

  Future<List<PfJournal>> listJournals() async {
    final rows = await _db.query('journals', orderBy: 'id ASC');
    return rows.map(_journalFromRow).toList();
  }

  Future<int> insertJournal(PfJournal j) async {
    final row = _journalToRow(j);
    return _db.insert('journals', row);
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
    'revision': t.syncMeta.revision,
    'sync_state': t.syncMeta.syncState,
    'origin_device': t.syncMeta.originDevice,
    'payload': '', // 远端缓存语义,见文件尾注释
    'user_id': t.syncMeta.userId,
    'updated_at_ms': t.syncMeta.updatedAt?.millisecondsSinceEpoch ?? 0,
    'deleted_at_ms': t.deletedAt?.millisecondsSinceEpoch ?? 0,
    'completed_at_ms': t.completedAt?.millisecondsSinceEpoch ?? 0,
    'pomodoro_duration': t.pomodoroDuration,
    'repeat': t.repeat,
  };

  PfTask _taskFromRow(Map<String, Object?> r) => PfTask(
    id: r['id'] as String,
    title: r['title'] as String,
    priority: _priorityFrom(r['priority'] as String),
    project: (r['project'] as String?) ?? '',
    dueLabel: (r['due_label'] as String?) ?? '',
    tags: _splitCsv((r['tags_csv'] as String?) ?? ''),
    estimatedPomos: (r['estimated'] as int?) ?? 0,
    completedPomos: (r['completed_cnt'] as int?) ?? 0,
    subtaskCount: (r['subtask_cnt'] as int?) ?? 0,
    completed: ((r['completed'] as int?) ?? 0) == 1,
    deletedAt: r['deleted_at_ms'] != null && (r['deleted_at_ms'] as int) > 0
        ? DateTime.fromMillisecondsSinceEpoch(r['deleted_at_ms'] as int)
        : null,
    completedAt:
        r['completed_at_ms'] != null && (r['completed_at_ms'] as int) > 0
            ? DateTime.fromMillisecondsSinceEpoch(r['completed_at_ms'] as int)
            : null,
    pomodoroDuration: (r['pomodoro_duration'] as int?) ?? 0,
    repeat: (r['repeat'] as String?) ?? 'none',
    syncMeta: PfSyncMeta(
      revision: (r['revision'] as int?) ?? 1,
      updatedAt: r['updated_at_ms'] != null && (r['updated_at_ms'] as int) > 0
          ? DateTime.fromMillisecondsSinceEpoch(r['updated_at_ms'] as int)
          : null,
      originDevice: (r['origin_device'] as String?) ?? '',
      syncState: (r['sync_state'] as String?) ?? 'synced',
      userId: (r['user_id'] as String?) ?? '',
    ),
  );

  Map<String, Object?> _journalToRow(PfJournal j) => {
    'id': j.id,
    'kind': _kindText(j.kind),
    'title': j.title,
    'content': j.content,
    'tags_csv': _csv(j.tags),
  };

  Map<String, Object?> _sessionToRow(PfSession s) => {
    'id': s.id,
    'task_id': s.taskId,
    'project_id': s.projectId,
    'duration': s.durationMinutes,
    'started_at_ms': s.startedAt.millisecondsSinceEpoch,
    'ended_at_ms': s.endedAt.millisecondsSinceEpoch,
    'is_completed': s.isCompleted ? 1 : 0,
    'created_at_ms': s.startedAt.millisecondsSinceEpoch,
    'revision': s.syncMeta.revision,
    'sync_state': s.syncMeta.syncState,
    'updated_at_ms': s.syncMeta.updatedAt?.millisecondsSinceEpoch ?? 0,
    'origin_device': s.syncMeta.originDevice,
    'payload': '',
    'user_id': s.syncMeta.userId,
  };

  PfSession _sessionFromRow(Map<String, Object?> r) => PfSession(
    id: r['id'] as String,
    taskId: (r['task_id'] as String?) ?? '',
    projectId: (r['project_id'] as String?) ?? '',
    durationMinutes: (r['duration'] as int?) ?? 25,
    startedAt: DateTime.fromMillisecondsSinceEpoch((r['started_at_ms'] as int?) ?? 0),
    endedAt: DateTime.fromMillisecondsSinceEpoch((r['ended_at_ms'] as int?) ?? 0),
    isCompleted: ((r['is_completed'] as int?) ?? 1) == 1,
    syncMeta: PfSyncMeta(
      revision: (r['revision'] as int?) ?? 1,
      updatedAt: r['updated_at_ms'] != null && (r['updated_at_ms'] as int) > 0
          ? DateTime.fromMillisecondsSinceEpoch(r['updated_at_ms'] as int)
          : null,
      originDevice: (r['origin_device'] as String?) ?? '',
      syncState: (r['sync_state'] as String?) ?? 'synced',
      userId: (r['user_id'] as String?) ?? '',
    ),
  );

  PfJournal _journalFromRow(Map<String, Object?> r) => PfJournal(
    id: r['id'] as String,
    kind: _kindFrom(r['kind'] as String),
    title: (r['title'] as String?) ?? '',
    content: (r['content'] as String?) ?? '',
    tags: _splitCsv((r['tags_csv'] as String?) ?? ''),
  );

  // payload 列语义(P1 起):**远端权威 JSON 的缓存**,只在 applyRemoteTask /
  // applyRemoteSession(pull / Conflicted 收敛)写入;本地新写行留空串,
  // push 时由 SyncClient + sync_wire 从业务列现构造 —— 单一事实源在行列,
  // 不会出现"payload 缓存与列值漂移"。
}
