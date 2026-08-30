import 'dart:convert';
import 'dart:math' as math;

import 'package:flutter/foundation.dart';

import '../data/database.dart';
import '../models/session.dart';
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
    final demoSessions = _demoSessions(DateTime.now());
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
      .._sessions.addAll(demoSessions)
      ..todayPomos = demoSessions
          .where((s) => _localDay(s.startedAt) == _localDay(DateTime.now()))
          .length
      ..todayReview = '上午两个番茄写完了需求初稿,下午会议偏多。';
  }

  /// web demo 的演示会话:今天 3 条 + 近几天若干(统计页有图可看),
  /// 任务归属对应上面 5 个 demo 任务(id 固定字符串)。
  static List<PfSession> _demoSessions(DateTime now) {
    PfSession at(int daysAgo, int hour, int minutes,
            {String taskId = ''}) =>
        PfSession(
          id: 'ds${daysAgo}_$hour${taskId.isEmpty ? '' : taskId.hashCode % 97}',
          taskId: taskId,
          durationMinutes: minutes,
          startedAt: DateTime(
              now.year, now.month, now.day - daysAgo, hour),
          endedAt: DateTime(now.year, now.month, now.day - daysAgo, hour)
              .add(Duration(minutes: minutes)),
        );

    // 全部关联 demo 任务(计数口径要求 task_id 非空,无任务的会话不计)。
    return [
      at(0, 9, 25, taskId: 't01aaaa0000zzzz'),
      at(0, 11, 50, taskId: 't02bbbb0000zzzz'),
      at(0, 15, 25, taskId: 't05eeee0000zzzz'),
      at(1, 10, 50, taskId: 't01aaaa0000zzzz'),
      at(2, 9, 25, taskId: 't04dddd0000zzzz'),
      at(3, 14, 75, taskId: 't03cccc0000zzzz'),
      at(4, 10, 50, taskId: 't02bbbb0000zzzz'),
      at(6, 16, 25, taskId: 't01aaaa0000zzzz'),
    ];
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
    final sessions = await db.listSessions();

    // 首次启动 seed:meta.seed_done 缺失时插入 demo 5 task + 2 journal。
    final seeded = await db.getMeta('seed_done');
    String todayReview = (await db.getMeta('today_review')) ?? '';

    final p = TaskProvider._mem();
    // 装配修复(真机 E2E 抓出):必须把 db 挂回 provider —— 此前漏了这一行,
    // _db 恒 null → mutator 全走内存、SyncClient 报「demo 模式」、重启丢数据。
    p._db = db;
    p._tasks.addAll(tasks);
    p._journals.addAll(journals);
    p._sessions.addAll(sessions);
    // todayPomos 权威 = sessions 表按本地日派生(P1);sessions 为空的老库回退
    // v4 时代的 meta.today_pomos 计数。
    final todayCount = sessions
        .where((s) => _localDay(s.startedAt) == _localDay(DateTime.now()))
        .length;
    p.todayPomos = todayCount > 0
        ? todayCount
        : int.tryParse((await db.getMeta('today_pomos')) ?? '0') ?? 0;
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

  /// P3d-B-Phase-2:SyncClient 单例访问 db 的入口。`null` 走内存 demo 路径。
  AppDatabase? get db => _db;

  // === 同步上下文(main.dart Builder 里与 SyncClient.configure 一起注入)===
  // mutator 末尾 markPending 需要 origin_device / user_id;之前传空串导致
  // push 无身份。Provider 树在此之后才建,故用 setter 而非构造参数。
  String Function()? _deviceIdProvider;
  String? Function()? _userIdProvider;

  /// main() 里 TaskProvider 先于 Provider 树 open(),之后在 Builder 里补注身份。
  void setSyncContext({
    String Function()? deviceId,
    String? Function()? userId,
  }) {
    _deviceIdProvider = deviceId;
    _userIdProvider = userId;
  }

  final List<PfTask> _tasks = [];
  final List<PfJournal> _journals = [];
  final List<PfSession> _sessions = [];

  List<PfTask> get tasks => List.unmodifiable(_tasks);
  List<PfJournal> get journals => List.unmodifiable(_journals);

  /// 全量番茄会话(P1 起为统计权威源;append-only)。
  List<PfSession> get sessions => List.unmodifiable(_sessions);

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

  // === 写操作(本地 + DB;P3d-B-Phase-2 commit 4:mutator 末尾标 pending)=====

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
      await _markPending(db, t.id);
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
      // journals 表本批未加同步列,**P1 接入 Journal 同步时再 markPending 落地**;
      // 当前 markPending 跳过 journal 列不存在的情况。
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
      await _markPending(db, updated.id);
    }
    notifyListeners();
  }

  /// 编辑任务(业务字段):内存替换 + DB 更新 + 标 pending(LWW 常规通道)。
  /// id / syncMeta / completed / completedPomos 由 copyWith 语义保留。
  Future<void> editTask(PfTask task) async {
    final i = _tasks.indexWhere((t) => t.id == task.id);
    if (i < 0) return;
    _tasks[i] = task;
    final db = _db;
    if (db != null) {
      await db.updateTask(task);
      await _markPending(db, task.id);
    }
    notifyListeners();
  }

  /// 软删除任务:内存移除 + DB 盖墓碑标 pending(行保留,否则对端/服务端
  /// 旧快照会在 pull 时复活)。若删的是当前专注任务,一并解除专注。
  Future<void> deleteTask(String id) async {
    _tasks.removeWhere((t) => t.id == id);
    if (_focusTaskId == id) _focusTaskId = null;
    final db = _db;
    if (db != null) {
      try {
        await db.softDeleteTask(
          id: id,
          originDevice: _deviceIdProvider?.call() ?? '',
          userId: _userIdProvider?.call() ?? '',
        );
      } on Exception catch (e) {
        debugPrint('softDeleteTask failed for $id: $e');
      }
    }
    notifyListeners();
  }

  Future<void> setFocusTask(String? id) async {
    _focusTaskId = id;
    final db = _db;
    if (db != null) {
      await db.setFocus(id);
      // setFocus 是 UI 局部状态,不参与 LWW 同步,跳过 markPending。
    }
    notifyListeners();
  }

  /// 一个番茄自然走完(focus_page 计时器归零时调用;休息结束不落 session)。
  ///
  /// P1 起双写:
  /// - `pomodoro_sessions` 落一条 append-only 会话行 + 标 pending(跨设备同步);
  /// - 任务行 `completed_pomodoros` +1(原有语义,照旧 LWW)。
  /// `todayPomos` 改由 sessions 按本地日派生,不再写 meta。
  Future<void> completePomodoro({
    int durationMinutes = 25,
    DateTime? startedAt,
  }) async {
    final db = _db;
    final end = DateTime.now();
    final start =
        startedAt ?? end.subtract(Duration(minutes: durationMinutes));

    if (db != null) {
      final id = await _allocateId();
      final s = PfSession(
        id: id,
        taskId: focusTask?.id ?? '',
        durationMinutes: durationMinutes,
        startedAt: start,
        endedAt: end,
      );
      _sessions.insert(0, s);
      await db.insertSession(s);
      await _markSessionPending(db, id);
      todayPomos = (await db.sessionsOnDay(_localDay(end))).length;
    } else {
      // web demo 内存路径:同样落内存 session(统计页与 todayPomos 同源)。
      _sessions.insert(
        0,
        PfSession(
          id: _uuid14(),
          taskId: focusTask?.id ?? '',
          durationMinutes: durationMinutes,
          startedAt: start,
          endedAt: end,
        ),
      );
      todayPomos += 1;
    }

    final t = focusTask;
    if (t != null) {
      final i = _tasks.indexWhere((x) => x.id == t.id);
      if (i >= 0) {
        final updated = _tasks[i].copyWith(
          completedPomos: _tasks[i].completedPomos + 1,
        );
        _tasks[i] = updated;
        if (db != null) {
          await db.updateTask(updated);
          await _markPending(db, updated.id);
        }
      }
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

  Future<String> _allocateId() async => _uuid14();

  /// 14 字符 UUID 短码:用 Random.secure 生成 12 字节 → base64Url(16 字符)截前 14 位。
  /// 12 字节 = 96 位随机,生日前缀碰撞概率 ≈ 2⁻⁹⁶(可忽略)。
  static String _uuid14() {
    final rnd = math.Random.secure();
    final bytes = List<int>.generate(12, (_) => rnd.nextInt(256));
    final b64 = base64Url.encode(bytes).replaceAll('=', '');
    return b64.substring(0, 14);
  }

  /// mutator 末尾调用:bump revision + sync_state='pending' + updated_at_ms=now
  /// + origin_device/user_id 盖章(setSyncContext 注入的身份)。
  /// payload 不在此写 —— push 时由 SyncClient 从行内业务列现构造(见
  /// sync_client.dart 注释)。web 平台不调(demo() 内存)。
  Future<void> _markPending(AppDatabase db, String id) async {
    try {
      await db.markTaskPending(
        id: id,
        originDevice: _deviceIdProvider?.call() ?? '',
        userId: _userIdProvider?.call() ?? '',
      );
    } on Exception catch (e) {
      // 不再静默吞 —— schema 级错误会以静默失效告终(v5 缺列事故教训),
      // 打日志让回归可见,但也不阻塞 UI 主流程。
      debugPrint('markTaskPending failed for $id: $e');
    }
  }

  /// session 行标 pending(append-only,不 bump revision)。
  Future<void> _markSessionPending(AppDatabase db, String id) async {
    try {
      await db.markSessionPending(
        id: id,
        originDevice: _deviceIdProvider?.call() ?? '',
        userId: _userIdProvider?.call() ?? '',
      );
    } on Exception catch (e) {
      debugPrint('markSessionPending failed for $id: $e');
    }
  }

  /// 本地日 yyyy-mm-dd(与 DB sessionsOnDay 的 localtime 口径一致)。
  static String _localDay(DateTime d) =>
      '${d.year.toString().padLeft(4, '0')}-'
      '${d.month.toString().padLeft(2, '0')}-'
      '${d.day.toString().padLeft(2, '0')}';

  /// 计数口径(对齐桌面 core::stats counts_session):自然完成 && 关联任务。
  /// 不选任务的专注 / 中途放弃的会话不进「今日番茄」与统计 —— 两端同数。
  static bool _countsSession(PfSession s) => s.isCompleted && s.taskId.isNotEmpty;

  /// 同步 pull 落库后刷新内存(同步入口在 runOnce 成功后调用)。
  ///
  /// 根因修复:pullOnce 只写 DB 不动 provider —— 同步下来的任务/会话要
  /// 重启才可见,且 focus 页今日番茄(DB 派生)与统计页(内存派生)分叉。
  /// 重新水合 + todayPomos 与 DB 同源重算;_focusTaskId 保留(对端删了
  /// 专注任务时 focusTask getter 自然返回 null 兜底)。
  Future<void> reloadFromDb() async {
    final db = _db;
    if (db == null) return;
    final tasks = await db.listTasks();
    final sessions = await db.listSessions();
    _tasks
      ..clear()
      ..addAll(tasks);
    _sessions
      ..clear()
      ..addAll(sessions);
    final today = _localDay(DateTime.now());
    todayPomos = sessions
        .where((s) =>
            _localDay(s.startedAt) == today &&
            _countsSession(s))
        .length;
    notifyListeners();
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
