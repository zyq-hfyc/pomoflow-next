import 'package:flutter/foundation.dart';

import '../data/database.dart';
import '../models/task.dart';

/// 任务/手账数据仓库 —— P3d-Phase-1 落 sqflite 持久化(支持 web 内存兜底)。
///
/// 公开读 API 不变(`tasks / journals / focusTask / todayPomos / todayReview /
/// viewTasks`),UI 层无需改动;mutator 全部 async,UI 调用 `unawaited(provider.X())`。
///
/// 启动流程(`TaskProvider.open()`):
///   - web 平台 → 直接 `TaskProvider.demo()` 内存(P3d-Phase-2 才接 web SQLite);
///   - 否则 → `await AppDatabase.open()` → 反序列化 → seed 首次(若 `seed_done` 缺失)。
///
/// 后续 P3d-Phase-2 (`SyncClient`):
///   - 在本 Provider 上加 `ChangeLogStore` 4 方法(`list_pending / apply_remote /
///     mark_synced / local_candidate`),cursor `last_seq` 推 `meta.last_seq`;
///   - model 替换 `PfTask{int id, bool completed}` → core `Task{String Id, TaskStatus,
///     revision, updated_at, deleted_at}`,届时统一一次性迁移;
///   - 本轮 schema 命名已对齐(`sync_state` 列在 Phase 2 加,`task_tag_sync` 关联表
///     在 Phase 2 加)。
class TaskProvider extends ChangeNotifier {
  /// 仅内存工厂(web 兜底 + 测试用)。
  factory TaskProvider.demo() {
    final p = TaskProvider._mem();
    return p
      .._tasks.addAll(const [
        PfTask(
          id: 1,
          title: '撰写产品需求文档',
          priority: PfPriority.high,
          project: '产品设计',
          dueLabel: '今天',
          estimatedPomos: 4,
          completedPomos: 2,
          subtaskCount: 2,
        ),
        PfTask(
          id: 2,
          title: '修复登录页会话失效',
          priority: PfPriority.high,
          project: '研发',
          dueLabel: '今天',
          estimatedPomos: 2,
        ),
        PfTask(
          id: 3,
          title: '周会材料准备',
          priority: PfPriority.medium,
          project: '运营',
          dueLabel: '明天',
          estimatedPomos: 1,
        ),
        PfTask(
          id: 4,
          title: '阅读《置身钉内》第3章',
          priority: PfPriority.low,
          project: '学习',
          dueLabel: '今天',
          estimatedPomos: 3,
          completedPomos: 0,
          subtaskCount: 1,
        ),
        PfTask(
          id: 5,
          title: '健身打卡',
          priority: PfPriority.none,
          project: '日常',
          dueLabel: '每天',
          estimatedPomos: 1,
        ),
      ])
      .._journals.addAll(const [
        PfJournal(id: 1, kind: JournalKind.todo, title: '给妈妈买生日礼物', tags: ['生活']),
        PfJournal(
          id: 2,
          kind: JournalKind.note,
          title: '',
          content: '移动端 Dock 交互参考记账 App 的悬浮胶囊,中间凸起按钮承载最高频动作「新建」。',
        ),
      ])
      ..todayPomos = 6
      ..todayReview = '上午两个番茄写完了需求初稿,下午会议偏多。'
      .._nextId = 100;
  }

  /// 工厂入口:web 走 demo() 内存,否则走 sqflite + seed_v1。
  static Future<TaskProvider> open() async {
    if (kIsWeb) return TaskProvider.demo();
    final db = await AppDatabase.open();
    return _hydrate(db);
  }

  static Future<TaskProvider> _hydrate(AppDatabase db) async {
    final tasks = await db.listTasks();
    final journals = await db.listJournals();

    // 首次启动 seed:meta.seed_done 缺失时插入 demo 5 task + 2 journal。
    final seeded = await db.getMeta('seed_done');
    int todayPomos = int.tryParse((await db.getMeta('today_pomos')) ?? '0') ?? 0;
    String todayReview = (await db.getMeta('today_review')) ?? '';
    int nextIdDb = int.tryParse((await db.getMeta('next_id')) ?? '100') ?? 100;

    final p = TaskProvider._mem();
    p._tasks.addAll(tasks);
    p._journals.addAll(journals);
    p._nextId = nextIdDb;
    p.todayPomos = todayPomos;
    p.todayReview = todayReview;

    if (seeded == null) {
      final demo = TaskProvider.demo();
      for (final t in demo._tasks) {
        await db.insertTask(t);
      }
      for (final j in demo._journals) {
        await db.insertJournal(j);
      }
      await db.setMeta('seed_done', '1');
      await db.setMeta('next_id', '100');
      await db.setMeta('today_pomos', '${demo.todayPomos}');
      await db.setMeta('today_review', demo.todayReview);
      // 重新拉一次(包含 seed 后的全量数据)
      final all = await db.listTasks();
      final allJ = await db.listJournals();
      p._tasks
        ..clear()
        ..addAll(all);
      p._journals
        ..clear()
        ..addAll(allJ);
    }
    return p;
  }

  /// 私有构造函数:仅在工厂内用。
  TaskProvider._mem();

  AppDatabase? _db; // null = pure memory (web / test)

  final List<PfTask> _tasks = [];
  final List<PfJournal> _journals = [];
  int _nextId = 100;

  List<PfTask> get tasks => List.unmodifiable(_tasks);
  List<PfJournal> get journals => List.unmodifiable(_journals);

  // === 专注屏共享状态 ==========================================================

  int? _focusTaskId;
  PfTask? get focusTask {
    for (final t in _tasks) {
      if (t.id == _focusTaskId) return t;
    }
    return null;
  }

  int todayPomos = 0;
  String todayReview = '';

  // === 任务视图(§4.2 六视图) ==================================================

  static const taskViews = ['今天', '明天', '本周', '计划', '已完成', '手账'];

  List<PfTask> viewTasks(String view) => switch (view) {
        '今天' => _tasks.where((t) => t.dueLabel == '今天' && !t.completed).toList(),
        '明天' => _tasks.where((t) => t.dueLabel == '明天' && !t.completed).toList(),
        '本周' => _tasks.where((t) => !t.completed).toList(),
        '计划' => _tasks.where((t) => !t.completed).toList(),
        '已完成' => _tasks.where((t) => t.completed).toList(),
        _ => const <PfTask>[],
      };

  // === 写操作(本地 + DB) =====================================================

  Future<void> addTask(PfTask task) async {
    final id = task.id == 0 ? await _allocateId() : task.id;
    final t = task.id == 0
        ? PfTask(
            id: id,
            title: task.title,
            priority: task.priority,
            project: task.project,
            dueLabel: task.dueLabel,
            tags: task.tags,
            estimatedPomos: task.estimatedPomos,
            completedPomos: task.completedPomos,
            subtaskCount: task.subtaskCount,
            completed: task.completed,
          )
        : task;
    _tasks.insert(0, t);
    final db = _db;
    if (db != null) {
      await db.raw.insert('tasks', _rowFromTask(t));
    }
    notifyListeners();
  }

  Future<void> addJournal(PfJournal entry) async {
    final id = entry.id == 0 ? await _allocateId() : entry.id;
    final j = entry.id == 0
        ? PfJournal(
            id: id,
            kind: entry.kind,
            title: entry.title,
            content: entry.content,
            tags: entry.tags,
          )
        : entry;
    _journals.insert(0, j);
    final db = _db;
    if (db != null) {
      await db.raw.insert('journals', _rowFromJournal(j));
    }
    notifyListeners();
  }

  Future<void> toggleDone(int id) async {
    final i = _tasks.indexWhere((t) => t.id == id);
    if (i < 0) return;
    final updated = _tasks[i].completed
        ? _tasks[i].copyWith(completed: false)
        : _tasks[i].copyWith(completed: true);
    _tasks[i] = updated;
    final db = _db;
    if (db != null) {
      await db.updateTask(updated);
    }
    notifyListeners();
  }

  Future<void> setFocusTask(int? id) async {
    _focusTaskId = id;
    final db = _db;
    if (db != null) {
      await db.setFocus(id);
    }
    notifyListeners();
  }

  /// 一个番茄完成(计时器走完调用)。
  Future<void> completePomodoro() async {
    todayPomos += 1;
    final t = focusTask;
    if (t != null) {
      final i = _tasks.indexWhere((x) => x.id == t.id);
      if (i >= 0) {
        final updated = _tasks[i].copyWith(
          completedPomos: _tasks[i].completedPomos + 1,
        );
        _tasks[i] = updated;
        final db = _db;
    if (db != null) {
          await db.updateTask(updated);
        }
      }
    }
    final db = _db;
    if (db != null) {
      await db.setMeta('today_pomos', '$todayPomos');
    }
    notifyListeners();
  }

  Future<void> saveReview(String text) async {
    todayReview = text;
    final db = _db;
    if (db != null) {
      await db.setMeta('today_review', text);
    }
    notifyListeners();
  }

  Future<int> nextId() async => await _allocateId();

  Future<int> _allocateId() async {
    final db = _db;
    if (db == null) {
      _nextId += 1;
      return _nextId;
    }
    return db.nextId();
  }

  // === 映射(把 PfTask / PfJournal 转 sqflite row) ==============================

  static Map<String, Object?> _rowFromTask(PfTask t) {
    String pText(PfPriority p) => switch (p) {
          PfPriority.high => 'high',
          PfPriority.medium => 'medium',
          PfPriority.low => 'low',
          PfPriority.none => 'none',
        };
    return {
      'id': t.id,
      'title': t.title,
      'priority': pText(t.priority),
      'project': t.project,
      'due_label': t.dueLabel,
      'completed': t.completed ? 1 : 0,
      'estimated': t.estimatedPomos,
      'completed_cnt': t.completedPomos,
      'subtask_cnt': t.subtaskCount,
      'tags_csv': t.tags.join(','),
      'is_focus': 0,
    };
  }

  static Map<String, Object?> _rowFromJournal(PfJournal j) {
    String kText(JournalKind k) => switch (k) {
          JournalKind.todo => 'todo',
          JournalKind.wish => 'wish',
          JournalKind.plan => 'plan',
          JournalKind.note => 'note',
        };
    return {
      'id': j.id,
      'kind': kText(j.kind),
      'title': j.title,
      'content': j.content,
      'tags_csv': j.tags.join(','),
    };
  }
}
