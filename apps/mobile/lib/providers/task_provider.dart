import 'dart:convert';
import 'dart:math' as math;

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
/// P3d-B-Phase-2 模型迁移:`PfTask.id: int → String`(UUID 14 字符);
///
/// 下批 P3d-B-Phase-2 v4 计划:`Commit 4` 在此基础上:
///   - 4 个 mutator(addTask / toggleDone / completePomodoro / setFocusTask)
///     末尾调 `db.markTaskPending(...)` → bump revision + 标 pending + 写 payload
class TaskProvider extends ChangeNotifier {
  /// 仅内存工厂(web 兜底 + 测试用)。
  /// demo() 任务 id 用固定字符串 UUID 短码(16 字节 Random.secure).
  factory TaskProvider.demo() {
    final p = TaskProvider._mem();
    final demo = _seedIds();
    return p
      .._tasks.addAll([
        PfTask(
          id: demo.$1.id1,
          title: '撰写产品需求文档',
          priority: PfPriority.high,
          project: '产品设计',
          dueLabel: '今天',
          estimatedPomos: 4,
          completedPomos: 2,
          subtaskCount: 2,
        ),
        PfTask(
          id: demo.$1.id2,
          title: '修复登录页会话失效',
          priority: PfPriority.high,
          project: '研发',
          dueLabel: '今天',
          estimatedPomos: 2,
        ),
        PfTask(
          id: demo.$1.id3,
          title: '周会材料准备',
          priority: PfPriority.medium,
          project: '运营',
          dueLabel: '明天',
          estimatedPomos: 1,
        ),
        PfTask(
          id: demo.$1.id4,
          title: '阅读《置身钉内》第3章',
          priority: PfPriority.low,
          project: '学习',
          dueLabel: '今天',
          estimatedPomos: 3,
          completedPomos: 0,
          subtaskCount: 1,
        ),
        PfTask(
          id: demo.$1.id5,
          title: '健身打卡',
          priority: PfPriority.none,
          project: '日常',
          dueLabel: '每天',
          estimatedPomos: 1,
        ),
      ])
      .._journals.addAll([
        PfJournal(
          id: demo.$2.id1,
          kind: JournalKind.todo,
          title: '给妈妈买生日礼物',
          tags: const ['生活'],
        ),
        PfJournal(
          id: demo.$2.id2,
          kind: JournalKind.note,
          title: '',
          content:
              '移动端 Dock 交互参考记账 App 的悬浮胶囊,中间凸起按钮承载最高频动作「新建」。',
        ),
      ])
      ..todayPomos = 6
      ..todayReview = '上午两个番茄写完了需求初稿,下午会议偏多。';
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

    final p = TaskProvider._mem();
    p._tasks.addAll(tasks);
    p._journals.addAll(journals);
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
      await db.setMeta('today_pomos', '${demo.todayPomos}');
      await db.setMeta('today_review', demo.todayReview);
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

  List<PfTask> get tasks => List.unmodifiable(_tasks);
  List<PfJournal> get journals => List.unmodifiable(_journals);

  // === 专注屏共享状态 ==========================================================

  String? _focusTaskId;
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
  // ⚠️ P3d-B-Phase-2 commit 4 计划在 4 个 mutator 末尾接 `db.markTaskPending()`
  // 触发 sync_state='pending'。本批只做 ID 类型迁移不接 sync 钩子。

  Future<void> addTask(PfTask task) async {
    final id = task.id.isEmpty ? await _allocateId() : task.id;
    final t = id == task.id
        ? task
        : PfTask(
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
            syncMeta: task.syncMeta,
          );
    _tasks.insert(0, t);
    final db = _db;
    if (db != null) {
      await db.raw.insert('tasks', _rowFromTask(t));
    }
    notifyListeners();
  }

  Future<void> addJournal(PfJournal entry) async {
    final id = entry.id.isEmpty ? await _allocateId() : entry.id;
    final j = id == entry.id
        ? entry
        : PfJournal(
            id: id,
            kind: entry.kind,
            title: entry.title,
            content: entry.content,
            tags: entry.tags,
          );
    _journals.insert(0, j);
    final db = _db;
    if (db != null) {
      await db.raw.insert('journals', _rowFromJournal(j));
    }
    notifyListeners();
  }

  Future<void> toggleDone(String id) async {
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

  Future<void> setFocusTask(String? id) async {
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

  Future<String> nextId() async => await _allocateId();

  Future<String> _allocateId() async {
    return _uuid14();
  }

  /// 14 字符 UUID 短码:用 Random.secure 生成 12 字节 → base64Url(16 字符)截前 14 位。
  /// 12 字节 = 96 位随机,生日前缀碰撞概率 ≈ 2⁻⁹⁶(可忽略)。
  static String _uuid14() {
    final rnd = math.Random.secure();
    final bytes = List<int>.generate(12, (_) => rnd.nextInt(256));
    final b64 = base64Url.encode(bytes).replaceAll('=', '');
    return b64.substring(0, 14);
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

/// 14 字符串 uuid 给 demo() 取稳定 seed id(固定字符串常量,跨重启不变)。
class _DemoIds {
  const _DemoIds(this.id1, this.id2, this.id3, this.id4, this.id5);
  final String id1, id2, id3, id4, id5;
}

class _DemoJIds {
  const _DemoJIds(this.id1, this.id2);
  final String id1, id2;
}

/// 固定字符串(避免 demo() 每次启动换 id 引发 schema_version 缓存过期)。
(_DemoIds, _DemoJIds) _seedIds() {
  return (
    const _DemoIds(
      't01aaaa0000zzzz',
      't02bbbb0000zzzz',
      't03cccc0000zzzz',
      't04dddd0000zzzz',
      't05eeee0000zzzz',
    ),
    const _DemoJIds('j01xxxx0000zzzz', 'j02yyyy0000zzzz'),
  );
}
