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
  /// schema v12 → v13:tasks 补 description 列(P0 覆盖隐患修复)+
  /// 新建 daily_reviews / mottos 表(复盘与座右铭跨端)。
  /// schema v13 → v14:新建 conflict_log 表(P2 冲突可视化 —— pull/push
  /// 探测到 LWW 另一方胜出时落行,UI 列表展示「刚被覆盖的字段」)。
  /// schema v14 → v15:新建 weekly_reviews / monthly_reviews 表(P3 周/月复盘
  /// 与桌面端同步;日复盘已存在,这里补全另外两种周期)。
  /// schema v15 → v16:projects 补 parent_id / display_order 列(P3 项目层级
  /// 与桌面端同步对齐,3 级嵌套 + 拖拽改父)。
  /// schema v17 → v18:tasks 补 repeat_parent_id / repeat_end_date_ms 列
  /// (重复实例引擎:实例指向模板 + 模板终止时间;''/0 = 非实例/未设)。
  static const _schemaVersion = 19;
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
          // v12 → v13:tasks 补 description 列。
          if (oldVersion < 13) {
            await _v12ToV13(db);
          }
          // v13 → v14:新建 conflict_log 表(LWW 另一方胜出记录)。
          if (oldVersion < 14) {
            await _v13ToV14(db);
          }
          // v14 → v15:新建 weekly_reviews / monthly_reviews 表。
          if (oldVersion < 15) {
            await _v14ToV15(db);
          }
          // v15 → v16:projects 补 parent_id / display_order。
          if (oldVersion < 16) {
            await _v15ToV16(db);
          }
          // v16 → v17:tasks 补 due_at_ms / reminder / repeat_config
          //(到期日完整 datetime + 提醒 + 自定义重复,对齐桌面 core::Task)。
          if (oldVersion < 17) {
            await _v16ToV17(db);
          }
          // v17 → v18:tasks 补 repeat_parent_id / repeat_end_date_ms
          //(重复实例引擎,对齐桌面 core::Task 同名字段)。
          if (oldVersion < 18) {
            await _v17ToV18(db);
          }
          // v18 → v19:journals 补 8 同步列(手账跨端同步,对齐 core::Journal;
          //存量行回填 created_at = 迁移时刻、标 pending,下轮同步全量上云)。
          if (oldVersion < 19) {
            await _v18ToV19(db);
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
        repeat TEXT NOT NULL DEFAULT 'none',
        description TEXT NOT NULL DEFAULT '',
        due_at_ms INTEGER NOT NULL DEFAULT 0,
        reminder TEXT NOT NULL DEFAULT 'none',
        repeat_config TEXT NOT NULL DEFAULT '',
        repeat_parent_id TEXT NOT NULL DEFAULT '',
        repeat_end_date_ms INTEGER NOT NULL DEFAULT 0
      )
    ''');
    await db.execute(
      'CREATE INDEX IF NOT EXISTS idx_tasks_focus ON tasks(is_focus)',
    );
    await _createSessionsTable(db);
    await _createProjectsTable(db);
    // P3 项目层级:新建空库自动种 5 个默认顶级项目(平铺,display_order 1-5)
    // —— 让 task_create_sheet 不再走硬编码列表,新装用户即可看到。
    await _seedDefaultProjects(db);
    await _createTagsTable(db);
    await _createTaskTagSyncTable(db);
    await _createSubtasksTable(db);
    await _createDailyReviewsTable(db);
    await _createWeeklyReviewsTable(db);
    await _createMonthlyReviewsTable(db);
    await _createMottosTable(db);
    await _createConflictLogTable(db);
    await db.execute('''
      CREATE TABLE IF NOT EXISTS journals (
        id TEXT PRIMARY KEY,
        kind TEXT NOT NULL,
        title TEXT NOT NULL DEFAULT '',
        content TEXT NOT NULL DEFAULT '',
        tags_csv TEXT NOT NULL DEFAULT '',
        created_at_ms INTEGER NOT NULL DEFAULT 0,
        revision INTEGER NOT NULL DEFAULT 1,
        sync_state TEXT NOT NULL DEFAULT 'synced',
        updated_at_ms INTEGER NOT NULL DEFAULT 0,
        origin_device TEXT NOT NULL DEFAULT '',
        user_id TEXT NOT NULL DEFAULT '',
        deleted_at_ms INTEGER NOT NULL DEFAULT 0,
        payload TEXT NOT NULL DEFAULT ''
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
      db,
      'tasks',
      'ALTER TABLE tasks ADD COLUMN revision INTEGER NOT NULL DEFAULT 1',
    );
    await _addColumnIfMissing(
      db,
      'tasks',
      "ALTER TABLE tasks ADD COLUMN sync_state TEXT NOT NULL DEFAULT 'synced'",
    );
    await _addColumnIfMissing(
      db,
      'tasks',
      "ALTER TABLE tasks ADD COLUMN origin_device TEXT NOT NULL DEFAULT ''",
    );
    await _addColumnIfMissing(
      db,
      'tasks',
      "ALTER TABLE tasks ADD COLUMN payload TEXT NOT NULL DEFAULT ''",
    );
    await _addColumnIfMissing(
      db,
      'tasks',
      "ALTER TABLE tasks ADD COLUMN user_id TEXT NOT NULL DEFAULT ''",
    );

    // meta.last_seq 兜底插入(只是 INSERT OR IGNORE 语义,冲突算法用 replace 保证幂等)。
    await db.insert('meta', {
      'k': 'last_seq',
      'v': '0',
    }, conflictAlgorithm: ConflictAlgorithm.ignore);
    // 既然是 v1→v2 迁移,把 schema_version 顶到 2。
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '2',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
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
    await db.execute(
      'CREATE INDEX IF NOT EXISTS idx_tasks_focus ON tasks(is_focus)',
    );
    // bump schema_version → 3
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '3',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// sqflite 的 ALTER ADD COLUMN 没原生 IF NOT EXISTS,先探测列再补(幂等)。
  /// PRAGMA table_info 返回 cid / name / type / notnull / dflt_value / pk,
  /// 这里仅取 name 列。
  static Future<void> _addColumnIfMissing(
    Database db,
    String table,
    String sql,
  ) async {
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
      db,
      'tasks',
      'ALTER TABLE tasks ADD COLUMN updated_at_ms INTEGER NOT NULL DEFAULT 0',
    );
    await _createSessionsTable(db);
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '5',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// v5 → v6 升级:tasks 补 `deleted_at_ms` 软删除列(0 = 未删,对齐桌面 store)。
  static Future<void> _v5ToV6(Database db) async {
    await _addColumnIfMissing(
      db,
      'tasks',
      'ALTER TABLE tasks ADD COLUMN deleted_at_ms INTEGER NOT NULL DEFAULT 0',
    );
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '6',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// v6 → v7 升级:**清毒**——id 全面切标准 UUID v4 的配套迁移。
  /// 旧 14 字符 base64Url 短码行:从未成功同步过(push 通之前生成的),
  /// 且推上服务端会毒死桌面端(Id::parse 拒收 → list_tasks 整页炸)。
  /// 直接删除 + 重置 seed_done(种子 id 已换合法 UUID,重新播种)。
  static Future<void> _v6ToV7(Database db) async {
    await db.execute('DELETE FROM tasks WHERE LENGTH(id) != 36');
    await db.execute('DELETE FROM pomodoro_sessions WHERE LENGTH(id) != 36');
    await db.delete('meta', where: "k = 'seed_done'");
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '7',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// v7 → v8 升级:tasks 补 `completed_at_ms` 完成时刻列(0 = 未完成/未知)。
  /// 老库里已完成的行没有历史时刻,回填 0(区间口径下不计,保守可接受)。
  static Future<void> _v7ToV8(Database db) async {
    await _addColumnIfMissing(
      db,
      'tasks',
      'ALTER TABLE tasks ADD COLUMN completed_at_ms INTEGER NOT NULL DEFAULT 0',
    );
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '8',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// v12 → v13 升级:tasks 补 description 列(桌面写的任务描述此前被
  /// mobile push 的空串覆盖 —— LWW 数据丢失隐患,P0 修复的存储侧)+
  /// 新建 daily_reviews / mottos 两表。
  static Future<void> _v12ToV13(Database db) async {
    await _addColumnIfMissing(
      db,
      'tasks',
      "ALTER TABLE tasks ADD COLUMN description TEXT NOT NULL DEFAULT ''",
    );
    await _createDailyReviewsTable(db);
    await _createMottosTable(db);
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '13',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// v14 → v15 升级:新建 weekly_reviews / monthly_reviews 表。
  static Future<void> _v14ToV15(Database db) async {
    await _createWeeklyReviewsTable(db);
    await _createMonthlyReviewsTable(db);
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '15',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// v15 → v16 升级:projects 加 parent_id / display_order(对齐 core)。
  /// 老行 parent_id=null(顶级项目);display_order 按 name 回填保证稳定顺序;
  /// 老库若无 5 个默认项目,顺手种一次(对齐新装体验)。
  static Future<void> _v15ToV16(Database db) async {
    await _addColumnIfMissing(
      db,
      'projects',
      "ALTER TABLE projects ADD COLUMN parent_id TEXT NOT NULL DEFAULT ''",
    );
    await _addColumnIfMissing(
      db,
      'projects',
      "ALTER TABLE projects ADD COLUMN display_order INTEGER NOT NULL DEFAULT 0",
    );
    await db.rawUpdate('''
      UPDATE projects
      SET display_order = (
        SELECT COUNT(*) FROM projects AS p2 WHERE p2.name <= projects.name
      )''');
    await _seedDefaultProjects(db);
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '16',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// v16 → v17 升级:到期日 datetime + 提醒 + 自定义重复(core::Task 对齐)。
  ///
  /// 老数据回填 due_at_ms:「今天/明天/后天」标签 → 对应本地日 12:00
  /// (与旧 wire `dueLabelToIso` 同近似;「每天/本周/空」= 无到期,保持 0)。
  static Future<void> _v16ToV17(Database db) async {
    await _addColumnIfMissing(
      db,
      'tasks',
      'ALTER TABLE tasks ADD COLUMN due_at_ms INTEGER NOT NULL DEFAULT 0',
    );
    await _addColumnIfMissing(
      db,
      'tasks',
      "ALTER TABLE tasks ADD COLUMN reminder TEXT NOT NULL DEFAULT 'none'",
    );
    await _addColumnIfMissing(
      db,
      'tasks',
      "ALTER TABLE tasks ADD COLUMN repeat_config TEXT NOT NULL DEFAULT ''",
    );
    final now = DateTime.now();
    DateTime? dayFor(String label) => switch (label) {
      '今天' => now,
      '明天' => now.add(const Duration(days: 1)),
      '后天' => now.add(const Duration(days: 2)),
      _ => null,
    };
    final rows = await db.query('tasks', columns: ['id', 'due_label']);
    for (final r in rows) {
      final day = dayFor((r['due_label'] as String?) ?? '');
      if (day == null) continue;
      final noon = DateTime(day.year, day.month, day.day, 12);
      await db.update(
        'tasks',
        {'due_at_ms': noon.millisecondsSinceEpoch},
        where: 'id = ?',
        whereArgs: [r['id']],
      );
    }
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '17',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// v17 → v18 升级:tasks 补 repeat_parent_id / repeat_end_date_ms
  /// (重复实例引擎;老行 '' / 0 = 模板或普通任务 / 未设,无需回填)。
  static Future<void> _v17ToV18(Database db) async {
    await _addColumnIfMissing(
      db,
      'tasks',
      "ALTER TABLE tasks ADD COLUMN repeat_parent_id TEXT NOT NULL DEFAULT ''",
    );
    await _addColumnIfMissing(
      db,
      'tasks',
      'ALTER TABLE tasks ADD COLUMN repeat_end_date_ms INTEGER NOT NULL DEFAULT 0',
    );
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '18',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// v18 → v19 升级:journals 补 8 同步列 + payload 缓存列(手账跨端同步)。
  /// 存量本地行:created_at 回填迁移时刻(原排序按 id,同刻 + id 兜底不乱序)、
  /// sync_state 标 pending → 下轮同步把既有手账全量推上服务端(数据晋升)。
  static Future<void> _v18ToV19(Database db) async {
    const alters = [
      "ALTER TABLE journals ADD COLUMN created_at_ms INTEGER NOT NULL DEFAULT 0",
      "ALTER TABLE journals ADD COLUMN revision INTEGER NOT NULL DEFAULT 1",
      "ALTER TABLE journals ADD COLUMN sync_state TEXT NOT NULL DEFAULT 'pending'",
      "ALTER TABLE journals ADD COLUMN updated_at_ms INTEGER NOT NULL DEFAULT 0",
      'ALTER TABLE journals ADD COLUMN origin_device TEXT NOT NULL DEFAULT \'\'',
      'ALTER TABLE journals ADD COLUMN user_id TEXT NOT NULL DEFAULT \'\'',
      "ALTER TABLE journals ADD COLUMN deleted_at_ms INTEGER NOT NULL DEFAULT 0",
      'ALTER TABLE journals ADD COLUMN payload TEXT NOT NULL DEFAULT \'\'',
    ];
    for (final sql in alters) {
      await _addColumnIfMissing(db, 'journals', sql);
    }
    final now = DateTime.now().millisecondsSinceEpoch;
    await db.execute(
      "UPDATE journals SET created_at_ms = ?, updated_at_ms = ?, "
      "sync_state = 'pending' WHERE created_at_ms = 0",
      [now, now],
    );
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '19',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// conflict_log 表(同 _v13ToV14 内 SQL;抽出供 _createSchema 用)。
  static Future<void> _createConflictLogTable(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS conflict_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        entity TEXT NOT NULL,
        entity_id TEXT NOT NULL,
        entity_title TEXT NOT NULL DEFAULT '',
        direction TEXT NOT NULL,
        remote_device TEXT NOT NULL DEFAULT '',
        local_updated_ms INTEGER NOT NULL DEFAULT 0,
        remote_updated_ms INTEGER NOT NULL DEFAULT 0,
        occurred_at_ms INTEGER NOT NULL
      )
    ''');
    await db.execute(
      'CREATE INDEX IF NOT EXISTS idx_conflict_log_occurred '
      'ON conflict_log(occurred_at_ms DESC)',
    );
  }

  /// daily_reviews:core::DailyReview(date 为同步自然键;同日期两端各建
  /// 行时本地按 date 取 LWW 胜者内容)。
  static Future<void> _createDailyReviewsTable(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS daily_reviews (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        content TEXT NOT NULL DEFAULT '',
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
      'CREATE UNIQUE INDEX IF NOT EXISTS idx_daily_reviews_date ON daily_reviews(date)',
    );
  }

  /// weekly_reviews:core::WeeklyReview(week_start 为同步自然键,格式 YYYY-MM-DD)。
  static Future<void> _createWeeklyReviewsTable(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS weekly_reviews (
        id TEXT PRIMARY KEY,
        week_start TEXT NOT NULL,
        content TEXT NOT NULL DEFAULT '',
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
      'CREATE UNIQUE INDEX IF NOT EXISTS idx_weekly_reviews_week_start ON weekly_reviews(week_start)',
    );
  }

  /// monthly_reviews:core::MonthlyReview(year_month 为同步自然键,格式 YYYY-MM)。
  static Future<void> _createMonthlyReviewsTable(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS monthly_reviews (
        id TEXT PRIMARY KEY,
        year_month TEXT NOT NULL,
        content TEXT NOT NULL DEFAULT '',
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
      'CREATE UNIQUE INDEX IF NOT EXISTS idx_monthly_reviews_year_month ON monthly_reviews(year_month)',
    );
  }

  /// mottos:core::Motto(focus 页轮播)。
  static Future<void> _createMottosTable(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS mottos (
        id TEXT PRIMARY KEY,
        text TEXT NOT NULL,
        author TEXT NOT NULL DEFAULT '',
        revision INTEGER NOT NULL DEFAULT 1,
        sync_state TEXT NOT NULL DEFAULT 'synced',
        updated_at_ms INTEGER NOT NULL DEFAULT 0,
        deleted_at_ms INTEGER NOT NULL DEFAULT 0,
        origin_device TEXT NOT NULL DEFAULT '',
        payload TEXT NOT NULL DEFAULT '',
        user_id TEXT NOT NULL DEFAULT ''
      )
    ''');
  }

  /// v13 → v14 升级:新建 conflict_log 表(LWW 另一方胜出记录,P2 冲突可视化)。
  /// 表结构:
  ///   id INTEGER PK —— 单调递增,UI 列表去重用
  ///   entity / entity_id —— 哪个实体的哪一行
  ///   entity_title —— 落库时的标题快照(任务改名后仍能显示原标题供辨认)
  ///   direction —— 'overrode' = pull 时本地被远端覆盖;'lost' = push 时
  ///               服务端 Conflicted 告知本地胜出方非我
  ///   remote_device —— 胜出方所在设备 ID(短码,UI 提示用)
  ///   local_updated_ms / remote_updated_ms —— LWW 三层仲裁的时间维度,
  ///                                          帮助调试「我刚改的为啥被覆盖」
  ///   occurred_at_ms —— 本次落库时刻(不是变更时刻)
  static Future<void> _v13ToV14(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS conflict_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        entity TEXT NOT NULL,
        entity_id TEXT NOT NULL,
        entity_title TEXT NOT NULL DEFAULT '',
        direction TEXT NOT NULL,
        remote_device TEXT NOT NULL DEFAULT '',
        local_updated_ms INTEGER NOT NULL DEFAULT 0,
        remote_updated_ms INTEGER NOT NULL DEFAULT 0,
        occurred_at_ms INTEGER NOT NULL
      )
    ''');
    await db.execute(
      'CREATE INDEX IF NOT EXISTS idx_conflict_log_occurred '
      'ON conflict_log(occurred_at_ms DESC)',
    );
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '14',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// v11 → v12 升级:新建 subtasks 表(子任务实体)。
  static Future<void> _v11ToV12(Database db) async {
    await _createSubtasksTable(db);
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '12',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
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
    await _createDailyReviewsTable(db);
    await _createMottosTable(db);
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '11',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
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
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '10',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// projects(P1 实体化):core::Project 平铺子集(name/color,无层级 ——
  /// mobile 端平铺;桌面的 parent_id 树拉下来落在 payload 里不展开)。
  static Future<void> _createProjectsTable(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        color TEXT NOT NULL DEFAULT '',
        parent_id TEXT NOT NULL DEFAULT '',
        display_order INTEGER NOT NULL DEFAULT 0,
        revision INTEGER NOT NULL DEFAULT 1,
        sync_state TEXT NOT NULL DEFAULT 'synced',
        updated_at_ms INTEGER NOT NULL DEFAULT 0,
        origin_device TEXT NOT NULL DEFAULT '',
        payload TEXT NOT NULL DEFAULT '',
        user_id TEXT NOT NULL DEFAULT ''
      )
    ''');
  }

  /// 种 5 个默认顶级项目 —— 让新装用户首次进入 task_create_sheet 即可下拉选中。
  /// INSERT OR IGNORE:已有同名项目(用户改过 / 同步过来)不覆盖。
  static Future<void> _seedDefaultProjects(Database db) async {
    final defaults = ['产品设计', '研发', '运营', '学习', '日常'];
    for (var i = 0; i < defaults.length; i++) {
      await db.rawInsert(
        'INSERT OR IGNORE INTO projects (id, name, parent_id, display_order, sync_state) '
        "VALUES (?, ?, '', ?, 'synced')",
        ['default-${defaults[i]}', defaults[i], i + 1],
      );
    }
  }

  /// v8 → v9 升级:任务级计时参数(单番茄时长覆盖全局 + 重复标记)。
  static Future<void> _v8ToV9(Database db) async {
    await _addColumnIfMissing(
      db,
      'tasks',
      'ALTER TABLE tasks ADD COLUMN pomodoro_duration INTEGER NOT NULL DEFAULT 0',
    );
    await _addColumnIfMissing(
      db,
      'tasks',
      "ALTER TABLE tasks ADD COLUMN repeat TEXT NOT NULL DEFAULT 'none'",
    );
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '9',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
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
    await db.insert('meta', {
      'k': 'schema_version',
      'v': '4',
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  Database get raw => _db;

  Future<void> close() => _db.close();

  // === meta ===================================================================

  Future<String?> getMeta(String k) async {
    final rows = await _db.query(
      'meta',
      where: 'k = ?',
      whereArgs: [k],
      limit: 1,
    );
    if (rows.isEmpty) return null;
    return rows.first['v'] as String?;
  }

  Future<void> setMeta(String k, String v) async {
    await _db.insert('meta', {
      'k': k,
      'v': v,
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  /// LWW 同步 cursor:服务端 `SyncCursor{ last_seq: u64 }`。
  /// 返回 0 表示尚未同步过。
  Future<int> getLastSeq() async {
    final s = await getMeta('last_seq');
    return int.tryParse(s ?? '0') ?? 0;
  }

  Future<void> setLastSeq(int seq) => setMeta('last_seq', '$seq');

  /// 防回退写:仅当新 seq 大于当前才落库(stale/duplicate 响应不会拉低进度)。
  /// 服务端 cursor 单调,但客户端 reorder / 重试时可能拿到旧的响应,
  /// 旧 setLastSeq 无条件覆盖会让下次拉取从更早位置重放 → 浪费带宽 + 重复 apply。
  Future<void> setLastSeqIfHigher(int seq) async {
    final cur = await getLastSeq();
    if (seq > cur) await setMeta('last_seq', '$seq');
  }

  Future<int> nextId() async {
    final cur = int.tryParse((await getMeta('next_id')) ?? '100') ?? 100;
    final nx = cur + 1;
    await setMeta('next_id', '$nx');
    return cur;
  }

  // === conflict_log(P2 冲突可视化)==========================================

  /// 落一条冲突记录。direction='overrode' = pull 时本地被远端覆盖;
  /// 'lost' = push 时服务端 Conflicted 告知本地不是胜出方。
  Future<void> insertConflict({
    required String entity,
    required String entityId,
    required String entityTitle,
    required String direction,
    required String remoteDevice,
    required int localUpdatedMs,
    required int remoteUpdatedMs,
  }) async {
    await _db.insert('conflict_log', {
      'entity': entity,
      'entity_id': entityId,
      'entity_title': entityTitle,
      'direction': direction,
      'remote_device': remoteDevice,
      'local_updated_ms': localUpdatedMs,
      'remote_updated_ms': remoteUpdatedMs,
      'occurred_at_ms': DateTime.now().millisecondsSinceEpoch,
    });
  }

  /// 最近 N 条冲突记录(按 occurred_at_ms DESC),UI 列表展示。
  Future<List<Map<String, Object?>>> listRecentConflicts({
    int limit = 50,
  }) async {
    final rows = await _db.query(
      'conflict_log',
      orderBy: 'occurred_at_ms DESC',
      limit: limit,
    );
    return rows;
  }

  /// 清空冲突记录(UI 「全部已读」按钮)。
  Future<void> clearConflicts() => _db.delete('conflict_log');

  /// 未读冲突条数(用作小红点)。
  Future<int> countConflicts() async {
    final r = await _db.rawQuery('SELECT COUNT(*) AS c FROM conflict_log');
    return (r.first['c'] as int?) ?? 0;
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
  /// 硬删(从 DB 物理删除,不可恢复)。同时清掉模板名下的实例行
  /// (桌面 purge_task 级联 delete_all_instances),但只删**已同步**的行
  /// (sync_state != 'pending')—— 未推送的墓碑被硬删后,服务端的活实例
  /// 会在 pull 时整行拉回复活。
  Future<void> purgeTask(String id) async {
    await _db.delete(
      'tasks',
      where: "id = ? OR (repeat_parent_id = ? AND sync_state != 'pending')",
      whereArgs: [id, id],
    );
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
                pomodoro_duration, repeat, description,
                due_at_ms, reminder, repeat_config,
                repeat_parent_id, repeat_end_date_ms,
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
      final exists = (await txn.query(
        'tasks',
        where: 'id = ?',
        whereArgs: [id],
        limit: 1,
      )).isNotEmpty;
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

  /// 模板名下的实例 id 列表(repeat_service 编排用)。
  /// [activeOnly] = true 只取未完成未删(重排前的清理,完成的保留);
  /// false 取全部未删(模板删除的级联,含已完成)。
  Future<List<String>> repeatInstanceIds(
    String parentId, {
    bool activeOnly = true,
  }) async {
    final rows = await _db.query(
      'tasks',
      columns: ['id'],
      where: activeOnly
          ? "repeat_parent_id = ? AND deleted_at_ms = 0 AND completed = 0"
          : "repeat_parent_id = ? AND deleted_at_ms = 0",
      whereArgs: [parentId],
    );
    return rows.map((r) => r['id'] as String).toList();
  }

  // === pomodoro_sessions(P1 多实体同步)======================================

  Future<List<PfSession>> listSessions() async {
    final rows = await _db.query(
      'pomodoro_sessions',
      orderBy: 'started_at_ms ASC',
    );
    return rows.map(_sessionFromRow).toList();
  }

  /// 本地日(yyyy-mm-dd)内**计数口径**的会话 —— todayPomos 派生。
  /// 口径对齐桌面 core::stats counts_session:自然完成 && 关联任务
  /// (不选任务的专注 / 放弃会话两端都不计,数字才一致)。
  Future<List<PfSession>> sessionsOnDay(String localDay) async {
    final rows = await _db.query(
      'pomodoro_sessions',
      where:
          "strftime('%Y-%m-%d', started_at_ms / 1000, 'unixepoch', 'localtime') = ?"
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

  Future<List<Map<String, Object?>>> listPendingSessions({
    int limit = 200,
  }) async {
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
      final exists = (await txn.query(
        'pomodoro_sessions',
        where: 'id = ?',
        whereArgs: [id],
        limit: 1,
      )).isNotEmpty;
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
        await txn.update(
          'pomodoro_sessions',
          row,
          where: 'id = ?',
          whereArgs: [id],
        );
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
      orderBy: 'display_order ASC, name ASC',
    );
    return rows
        .map(
          (r) => PfProject(
            id: r['id'] as String,
            name: r['name'] as String,
            color: (r['color'] as String?) ?? '',
            parentId: (r['parent_id'] as String?) ?? '',
            displayOrder: (r['display_order'] as int?) ?? 0,
            syncMeta: PfSyncMeta(
              revision: (r['revision'] as int?) ?? 1,
              updatedAt: (r['updated_at_ms'] as int? ?? 0) > 0
                  ? DateTime.fromMillisecondsSinceEpoch(
                      r['updated_at_ms'] as int,
                    )
                  : null,
              originDevice: (r['origin_device'] as String?) ?? '',
              syncState: (r['sync_state'] as String?) ?? 'synced',
              userId: (r['user_id'] as String?) ?? '',
            ),
          ),
        )
        .toList();
  }

  /// 新建/更新项目(按 name upsert + 标 pending;同时维护 parent_id/display_order)。
  Future<void> upsertProject({
    required String id,
    required String name,
    String color = '',
    String parentId = '',
    int displayOrder = 0,
    required String originDevice,
    required String userId,
  }) async {
    final nowMs = DateTime.now().millisecondsSinceEpoch;
    final existing = await _db.query(
      'projects',
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    if (existing.isEmpty) {
      await _db.insert('projects', {
        'id': id,
        'name': name,
        'color': color,
        'parent_id': parentId,
        'display_order': displayOrder,
        'revision': 1,
        'sync_state': 'pending',
        'updated_at_ms': nowMs,
        'origin_device': originDevice,
        'payload': '',
        'user_id': userId,
      });
    } else {
      await _db.update(
        'projects',
        {
          'name': name,
          'color': color,
          'parent_id': parentId,
          'display_order': displayOrder,
          'revision': ((existing.first['revision'] as int?) ?? 1) + 1,
          'sync_state': 'pending',
          'updated_at_ms': nowMs,
          'origin_device': originDevice,
          'user_id': userId,
        },
        where: 'id = ?',
        whereArgs: [id],
      );
    }
  }

  /// 软删除项目(标 tombstone + pending)。
  Future<void> softDeleteProject({
    required String id,
    required String originDevice,
    required String userId,
  }) async {
    final nowMs = DateTime.now().millisecondsSinceEpoch;
    await _db.update(
      'projects',
      {
        'sync_state': 'tombstone',
        'deleted_at_ms': nowMs,
        'revision': 1,
        'updated_at_ms': nowMs,
        'origin_device': originDevice,
        'user_id': userId,
      },
      where: 'id = ?',
      whereArgs: [id],
    );
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

  Future<List<Map<String, Object?>>> listPendingProjects({
    int limit = 100,
  }) async {
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
      final exists = (await txn.query(
        'projects',
        where: 'id = ?',
        whereArgs: [id],
        limit: 1,
      )).isNotEmpty;
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
      final exists = (await txn.query(
        'tags',
        where: 'id = ?',
        whereArgs: [id],
        limit: 1,
      )).isNotEmpty;
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
      ids.add(
        await ensureTag(name: name, originDevice: originDevice, userId: userId),
      );
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

  Future<List<Map<String, Object?>>> listPendingTaskTags({
    int limit = 200,
  }) async {
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
      final existing = await txn.query(
        'task_tag_sync',
        where: 'task_id = ?',
        whereArgs: [taskId],
        limit: 1,
      );
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
        await txn.update(
          'task_tag_sync',
          row,
          where: 'task_id = ?',
          whereArgs: [taskId],
        );
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
      columns: [
        'task_id',
        'revision',
        'updated_at_ms',
        'origin_device',
        'payload',
      ],
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
    final rows = await _db.query(
      'subtasks',
      columns: ['revision'],
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
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
    final rows = await _db.query(
      'subtasks',
      columns: ['revision'],
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
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

  Future<List<Map<String, Object?>>> listPendingSubtasks({
    int limit = 200,
  }) async {
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
      final exists = (await txn.query(
        'subtasks',
        where: 'id = ?',
        whereArgs: [id],
        limit: 1,
      )).isNotEmpty;
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
      updatedAt: r['updated_at_ms'] != null && (r['updated_at_ms'] as int) > 0
          ? DateTime.fromMillisecondsSinceEpoch(r['updated_at_ms'] as int)
          : null,
      originDevice: (r['origin_device'] as String?) ?? '',
      syncState: (r['sync_state'] as String?) ?? 'synced',
      userId: (r['user_id'] as String?) ?? '',
    ),
  );

  // === daily_reviews + mottos(P1 复盘与座右铭跨端)============================

  /// 某日期的复盘内容(null = 未写)。
  Future<String?> dailyReviewContent(String date) async {
    final rows = await _db.query(
      'daily_reviews',
      columns: ['content'],
      where: 'date = ? AND deleted_at_ms = 0',
      whereArgs: [date],
      limit: 1,
    );
    if (rows.isEmpty) return null;
    return (rows.first['content'] as String?) ?? '';
  }

  /// 保存(或更新)某日期复盘:按 date upsert + 标 pending。
  /// 今日复盘 focus 页的「今日回顾」卡走这里(此前存 meta.today_review
  /// 不同步 —— 桌面看不到)。
  Future<void> upsertDailyReview({
    required String date,
    required String content,
    required String originDevice,
    required String userId,
  }) async {
    final nowMs = DateTime.now().millisecondsSinceEpoch;
    final existing = await _db.query(
      'daily_reviews',
      where: 'date = ?',
      whereArgs: [date],
      limit: 1,
    );
    if (existing.isEmpty) {
      await _db.insert('daily_reviews', {
        'id': uuidV4(),
        'date': date,
        'content': content,
        'revision': 1,
        'sync_state': 'pending',
        'updated_at_ms': nowMs,
        'origin_device': originDevice,
        'user_id': userId,
      });
    } else {
      await _db.update(
        'daily_reviews',
        {
          'content': content,
          'revision': ((existing.first['revision'] as int?) ?? 1) + 1,
          'sync_state': 'pending',
          'updated_at_ms': nowMs,
          'origin_device': originDevice,
          'user_id': userId,
        },
        where: 'date = ?',
        whereArgs: [date],
      );
    }
  }

  Future<List<Map<String, Object?>>> listPendingDailyReviews({
    int limit = 50,
  }) async {
    return _db.rawQuery(
      '''SELECT id, date, content, revision, updated_at_ms, deleted_at_ms,
                origin_device, user_id, payload
         FROM daily_reviews WHERE sync_state = 'pending'
         ORDER BY updated_at_ms ASC LIMIT ?''',
      [limit],
    );
  }

  /// pull 收敛:按 date upsert(同日期两端各建行时,LWW 胜者内容落地,
  /// 本地行 id 换成胜者 id,保证后续 push 不再分叉)。
  Future<void> applyRemoteDailyReview({
    required String id,
    required String date,
    required int revision,
    required int updatedAtMs,
    required String originDevice,
    required String userId,
    required String payload,
    required Map<String, Object?> fields,
  }) async {
    await _db.transaction((txn) async {
      final existing = await txn.query(
        'daily_reviews',
        where: 'date = ?',
        whereArgs: [date],
        limit: 1,
      );
      final row = <String, Object?>{
        ...fields,
        'id': id,
        'date': date,
        'revision': revision,
        'updated_at_ms': updatedAtMs,
        'origin_device': originDevice,
        'user_id': userId,
        'payload': payload,
        'sync_state': 'synced',
      };
      if (existing.isEmpty) {
        await txn.insert('daily_reviews', row);
      } else {
        final rowId = existing.first['id'] as String;
        if (rowId != id) {
          // 同日期异 id(两端各建):删旧行,落胜者行 —— 消除自然键分叉。
          await txn.delete(
            'daily_reviews',
            where: 'id = ?',
            whereArgs: [rowId],
          );
          await txn.insert('daily_reviews', row);
        } else {
          await txn.update(
            'daily_reviews',
            row,
            where: 'id = ?',
            whereArgs: [id],
          );
        }
      }
    });
  }

  Future<void> markDailyReviewsSynced(List<String> ids) async {
    if (ids.isEmpty) return;
    final placeholders = List.filled(ids.length, '?').join(',');
    await _db.rawUpdate(
      "UPDATE daily_reviews SET sync_state = 'synced' WHERE id IN ($placeholders)",
      ids,
    );
  }

  Future<Map<String, Object?>?> localDailyReviewCandidate(String id) async {
    final rows = await _db.query(
      'daily_reviews',
      columns: ['id', 'revision', 'updated_at_ms', 'origin_device', 'payload'],
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    return rows.isEmpty ? null : rows.first;
  }

  // --- weekly_reviews ---

  /// 某周的周复盘内容(null = 未写)。
  Future<String?> weeklyReviewContent(String weekStart) async {
    final rows = await _db.query(
      'weekly_reviews',
      columns: ['content'],
      where: 'week_start = ? AND deleted_at_ms = 0',
      whereArgs: [weekStart],
      limit: 1,
    );
    if (rows.isEmpty) return null;
    return (rows.first['content'] as String?) ?? '';
  }

  /// 保存(或更新)某周复盘:按 week_start upsert + 标 pending。
  Future<void> upsertWeeklyReview({
    required String weekStart,
    required String content,
    required String originDevice,
    required String userId,
  }) async {
    final nowMs = DateTime.now().millisecondsSinceEpoch;
    final existing = await _db.query(
      'weekly_reviews',
      where: 'week_start = ?',
      whereArgs: [weekStart],
      limit: 1,
    );
    if (existing.isEmpty) {
      await _db.insert('weekly_reviews', {
        'id': uuidV4(),
        'week_start': weekStart,
        'content': content,
        'revision': 1,
        'sync_state': 'pending',
        'updated_at_ms': nowMs,
        'origin_device': originDevice,
        'user_id': userId,
      });
    } else {
      await _db.update(
        'weekly_reviews',
        {
          'content': content,
          'revision': ((existing.first['revision'] as int?) ?? 1) + 1,
          'sync_state': 'pending',
          'updated_at_ms': nowMs,
          'origin_device': originDevice,
          'user_id': userId,
        },
        where: 'week_start = ?',
        whereArgs: [weekStart],
      );
    }
  }

  Future<List<Map<String, Object?>>> listPendingWeeklyReviews({
    int limit = 50,
  }) async {
    return _db.rawQuery(
      '''SELECT id, week_start, content, revision, updated_at_ms, deleted_at_ms,
                origin_device, user_id, payload
         FROM weekly_reviews WHERE sync_state = 'pending'
         ORDER BY updated_at_ms ASC LIMIT ?''',
      [limit],
    );
  }

  Future<void> applyRemoteWeeklyReview({
    required String id,
    required String weekStart,
    required int revision,
    required int updatedAtMs,
    required String originDevice,
    required String userId,
    required String payload,
    required Map<String, Object?> fields,
  }) async {
    await _db.transaction((txn) async {
      final existing = await txn.query(
        'weekly_reviews',
        where: 'week_start = ?',
        whereArgs: [weekStart],
        limit: 1,
      );
      final row = <String, Object?>{
        ...fields,
        'id': id,
        'week_start': weekStart,
        'revision': revision,
        'updated_at_ms': updatedAtMs,
        'origin_device': originDevice,
        'user_id': userId,
        'payload': payload,
        'sync_state': 'synced',
      };
      if (existing.isEmpty) {
        await txn.insert('weekly_reviews', row);
      } else {
        final rowId = existing.first['id'] as String;
        if (rowId != id) {
          await txn.delete(
            'weekly_reviews',
            where: 'id = ?',
            whereArgs: [rowId],
          );
          await txn.insert('weekly_reviews', row);
        } else {
          await txn.update(
            'weekly_reviews',
            row,
            where: 'id = ?',
            whereArgs: [id],
          );
        }
      }
    });
  }

  Future<void> markWeeklyReviewsSynced(List<String> ids) async {
    if (ids.isEmpty) return;
    final placeholders = List.filled(ids.length, '?').join(',');
    await _db.rawUpdate(
      "UPDATE weekly_reviews SET sync_state = 'synced' WHERE id IN ($placeholders)",
      ids,
    );
  }

  Future<Map<String, Object?>?> localWeeklyReviewCandidate(String id) async {
    final rows = await _db.query(
      'weekly_reviews',
      columns: ['id', 'revision', 'updated_at_ms', 'origin_device', 'payload'],
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    return rows.isEmpty ? null : rows.first;
  }

  // --- monthly_reviews ---

  /// 某月复盘内容(null = 未写)。
  Future<String?> monthlyReviewContent(String yearMonth) async {
    final rows = await _db.query(
      'monthly_reviews',
      columns: ['content'],
      where: 'year_month = ? AND deleted_at_ms = 0',
      whereArgs: [yearMonth],
      limit: 1,
    );
    if (rows.isEmpty) return null;
    return (rows.first['content'] as String?) ?? '';
  }

  /// 保存(或更新)某月复盘:按 year_month upsert + 标 pending。
  Future<void> upsertMonthlyReview({
    required String yearMonth,
    required String content,
    required String originDevice,
    required String userId,
  }) async {
    final nowMs = DateTime.now().millisecondsSinceEpoch;
    final existing = await _db.query(
      'monthly_reviews',
      where: 'year_month = ?',
      whereArgs: [yearMonth],
      limit: 1,
    );
    if (existing.isEmpty) {
      await _db.insert('monthly_reviews', {
        'id': uuidV4(),
        'year_month': yearMonth,
        'content': content,
        'revision': 1,
        'sync_state': 'pending',
        'updated_at_ms': nowMs,
        'origin_device': originDevice,
        'user_id': userId,
      });
    } else {
      await _db.update(
        'monthly_reviews',
        {
          'content': content,
          'revision': ((existing.first['revision'] as int?) ?? 1) + 1,
          'sync_state': 'pending',
          'updated_at_ms': nowMs,
          'origin_device': originDevice,
          'user_id': userId,
        },
        where: 'year_month = ?',
        whereArgs: [yearMonth],
      );
    }
  }

  Future<List<Map<String, Object?>>> listPendingMonthlyReviews({
    int limit = 50,
  }) async {
    return _db.rawQuery(
      '''SELECT id, year_month, content, revision, updated_at_ms, deleted_at_ms,
                origin_device, user_id, payload
         FROM monthly_reviews WHERE sync_state = 'pending'
         ORDER BY updated_at_ms ASC LIMIT ?''',
      [limit],
    );
  }

  Future<void> applyRemoteMonthlyReview({
    required String id,
    required String yearMonth,
    required int revision,
    required int updatedAtMs,
    required String originDevice,
    required String userId,
    required String payload,
    required Map<String, Object?> fields,
  }) async {
    await _db.transaction((txn) async {
      final existing = await txn.query(
        'monthly_reviews',
        where: 'year_month = ?',
        whereArgs: [yearMonth],
        limit: 1,
      );
      final row = <String, Object?>{
        ...fields,
        'id': id,
        'year_month': yearMonth,
        'revision': revision,
        'updated_at_ms': updatedAtMs,
        'origin_device': originDevice,
        'user_id': userId,
        'payload': payload,
        'sync_state': 'synced',
      };
      if (existing.isEmpty) {
        await txn.insert('monthly_reviews', row);
      } else {
        final rowId = existing.first['id'] as String;
        if (rowId != id) {
          await txn.delete(
            'monthly_reviews',
            where: 'id = ?',
            whereArgs: [rowId],
          );
          await txn.insert('monthly_reviews', row);
        } else {
          await txn.update(
            'monthly_reviews',
            row,
            where: 'id = ?',
            whereArgs: [id],
          );
        }
      }
    });
  }

  Future<void> markMonthlyReviewsSynced(List<String> ids) async {
    if (ids.isEmpty) return;
    final placeholders = List.filled(ids.length, '?').join(',');
    await _db.rawUpdate(
      "UPDATE monthly_reviews SET sync_state = 'synced' WHERE id IN ($placeholders)",
      ids,
    );
  }

  Future<Map<String, Object?>?> localMonthlyReviewCandidate(String id) async {
    final rows = await _db.query(
      'monthly_reviews',
      columns: ['id', 'revision', 'updated_at_ms', 'origin_device', 'payload'],
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    return rows.isEmpty ? null : rows.first;
  }

  // --- mottos ---

  /// 未删除的座右铭(focus 页轮播;编辑入口在桌面,mobile P0 只读)。
  Future<List<(String, String)>> listMottos() async {
    final rows = await _db.query(
      'mottos',
      columns: ['text', 'author'],
      where: 'deleted_at_ms = 0',
      orderBy: 'id ASC',
    );
    return [
      for (final r in rows)
        ((r['text'] as String?) ?? '', (r['author'] as String?) ?? ''),
    ];
  }

  Future<List<Map<String, Object?>>> listPendingMottos({
    int limit = 200,
  }) async {
    return _db.rawQuery(
      '''SELECT id, text, author, revision, updated_at_ms, deleted_at_ms,
                origin_device, user_id, payload
         FROM mottos WHERE sync_state = 'pending'
         ORDER BY updated_at_ms ASC LIMIT ?''',
      [limit],
    );
  }

  Future<void> applyRemoteMotto({
    required String id,
    required int revision,
    required int updatedAtMs,
    required String originDevice,
    required String userId,
    required String payload,
    required Map<String, Object?> fields,
  }) async {
    await _db.transaction((txn) async {
      final exists = (await txn.query(
        'mottos',
        where: 'id = ?',
        whereArgs: [id],
        limit: 1,
      )).isNotEmpty;
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
        await txn.update('mottos', row, where: 'id = ?', whereArgs: [id]);
      } else {
        row['id'] = id;
        await txn.insert('mottos', row);
      }
    });
  }

  Future<void> markMottosSynced(List<String> ids) async {
    if (ids.isEmpty) return;
    final placeholders = List.filled(ids.length, '?').join(',');
    await _db.rawUpdate(
      "UPDATE mottos SET sync_state = 'synced' WHERE id IN ($placeholders)",
      ids,
    );
  }

  Future<Map<String, Object?>?> localMottoCandidate(String id) async {
    final rows = await _db.query(
      'mottos',
      columns: ['id', 'revision', 'updated_at_ms', 'origin_device', 'payload'],
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    return rows.isEmpty ? null : rows.first;
  }

  // === journals ================================================================
  // v19 起接入跨端同步(对齐 core::Journal):8 同步列 + payload 缓存列。
  // mobile 是手账唯一 UI 入口;桌面端只存同步数据。

  Future<List<PfJournal>> listJournals() async {
    final rows = await _db.query(
      'journals',
      where: 'deleted_at_ms = 0',
      // 新建在前(provider _journals.insert(0) 同语义;core 侧 ASC 供导出)
      orderBy: 'created_at_ms DESC, id DESC',
    );
    return rows.map(_journalFromRow).toList();
  }

  Future<int> insertJournal(PfJournal j) async {
    final row = _journalToRow(j);
    return _db.insert('journals', row);
  }

  /// 远端 tombstone / 本地软删(journals 无删除 UI,当前只有远端来源)。
  Future<void> softDeleteJournal({
    required String id,
    required String originDevice,
    required String userId,
  }) async {
    await _db.rawUpdate(
      'UPDATE journals SET deleted_at_ms = ?, revision = revision + 1, '
      "sync_state = 'pending', updated_at_ms = ?, origin_device = ?, user_id = ? "
      'WHERE id = ? AND deleted_at_ms = 0',
      [
        DateTime.now().millisecondsSinceEpoch,
        DateTime.now().millisecondsSinceEpoch,
        originDevice,
        userId,
        id,
      ],
    );
  }

  Future<List<Map<String, Object?>>> listPendingJournals({
    int limit = 200,
  }) async {
    return _db.rawQuery(
      '''SELECT id, kind, title, content, tags_csv, created_at_ms,
                revision, updated_at_ms, deleted_at_ms,
                origin_device, user_id, payload
         FROM journals WHERE sync_state = 'pending'
         ORDER BY updated_at_ms ASC LIMIT ?''',
      [limit],
    );
  }

  Future<void> applyRemoteJournal({
    required String id,
    required int revision,
    required int updatedAtMs,
    required String originDevice,
    required String userId,
    required String payload,
    required Map<String, Object?> fields,
  }) async {
    await _db.transaction((txn) async {
      final exists = (await txn.query(
        'journals',
        where: 'id = ?',
        whereArgs: [id],
        limit: 1,
      )).isNotEmpty;
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
        await txn.update('journals', row, where: 'id = ?', whereArgs: [id]);
      } else {
        row['id'] = id;
        await txn.insert('journals', row);
      }
    });
  }

  Future<void> markJournalsSynced(List<String> ids) async {
    if (ids.isEmpty) return;
    final placeholders = List.filled(ids.length, '?').join(',');
    await _db.rawUpdate(
      "UPDATE journals SET sync_state = 'synced' WHERE id IN ($placeholders)",
      ids,
    );
  }

  Future<Map<String, Object?>?> localJournalCandidate(String id) async {
    final rows = await _db.query(
      'journals',
      columns: ['id', 'revision', 'updated_at_ms', 'origin_device', 'payload'],
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    return rows.isEmpty ? null : rows.first;
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
    'description': t.description,
    'due_at_ms': t.dueAt?.millisecondsSinceEpoch ?? 0,
    'reminder': t.reminder,
    'repeat_config': t.repeatConfig,
    'repeat_parent_id': t.repeatParentId,
    'repeat_end_date_ms': t.repeatEndDate?.millisecondsSinceEpoch ?? 0,
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
    description: (r['description'] as String?) ?? '',
    dueAt: r['due_at_ms'] != null && (r['due_at_ms'] as int) > 0
        ? DateTime.fromMillisecondsSinceEpoch(r['due_at_ms'] as int)
        : null,
    reminder: (r['reminder'] as String?) ?? 'none',
    repeatConfig: (r['repeat_config'] as String?) ?? '',
    repeatParentId: (r['repeat_parent_id'] as String?) ?? '',
    repeatEndDate:
        r['repeat_end_date_ms'] != null && (r['repeat_end_date_ms'] as int) > 0
        ? DateTime.fromMillisecondsSinceEpoch(r['repeat_end_date_ms'] as int)
        : null,
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
    'created_at_ms': j.createdAt?.millisecondsSinceEpoch ?? 0,
    'revision': j.syncMeta.revision,
    'sync_state': j.syncMeta.syncState,
    'updated_at_ms': j.syncMeta.updatedAt?.millisecondsSinceEpoch ?? 0,
    'origin_device': j.syncMeta.originDevice,
    'user_id': j.syncMeta.userId,
    'deleted_at_ms': j.deletedAt?.millisecondsSinceEpoch ?? 0,
    'payload': '',
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
    startedAt: DateTime.fromMillisecondsSinceEpoch(
      (r['started_at_ms'] as int?) ?? 0,
    ),
    endedAt: DateTime.fromMillisecondsSinceEpoch(
      (r['ended_at_ms'] as int?) ?? 0,
    ),
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
    createdAt:
        (r['created_at_ms'] as int?) != null && (r['created_at_ms'] as int) > 0
        ? DateTime.fromMillisecondsSinceEpoch(r['created_at_ms'] as int)
        : null,
    deletedAt:
        (r['deleted_at_ms'] as int?) != null && (r['deleted_at_ms'] as int) > 0
        ? DateTime.fromMillisecondsSinceEpoch(r['deleted_at_ms'] as int)
        : null,
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

  // payload 列语义(P1 起):**远端权威 JSON 的缓存**,只在 applyRemoteTask /
  // applyRemoteSession(pull / Conflicted 收敛)写入;本地新写行留空串,
  // push 时由 SyncClient + sync_wire 从业务列现构造 —— 单一事实源在行列,
  // 不会出现"payload 缓存与列值漂移"。
}
