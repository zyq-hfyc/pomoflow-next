import 'dart:async';

import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

import '../models/task.dart';

/// 本轮 P3d-Phase-1 sqflite 落盘层。
///
/// Schema(P3d-Phase-1 / 后续 Phase-2 升 LWW):
///   tasks(id PK, title, priority, project, due_label, completed, estimated,
///         completed_cnt, subtask_cnt, tags_csv, is_focus)
///   journals(id PK, kind, title, content, tags_csv)
///   meta(k PK, v) —— schema_version / seed_done / next_id / today_pomos /
///                    today_review / last_seq(Phase 2 LWW cursor)
///
/// tags_csv 用逗号分隔是**简化版**(原型阶段);
/// Phase 2 升级为 task_tags / journal_tags 关联表对齐 core crates/core/src/store/sqlite.rs。
class AppDatabase {
  AppDatabase._(this._db);
  final Database _db;

  static const _schemaVersion = 1;
  static const _dbFileName = 'pomoflow.db';

  /// 打开/创建数据库 + migrate + 返回包装。
  /// 调用方传入 [openFactory] 以便测试(默认 [openDatabase])。
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
          // Phase 1 only v1,后续 Phase 2 这里加 ALTER TABLE 升级分支。
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
        is_focus INTEGER NOT NULL DEFAULT 0
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
        v TEXT NOT NULL
      )
    ''');
    await db.insert('meta', {'k': 'schema_version', 'v': '$_schemaVersion'});
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

  Future<int?> insertTask(PfTask t) async {
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
    'is_focus': 0, // main flow 通过 setFocus 单事务翻转
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
