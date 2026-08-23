import 'package:flutter/foundation.dart';

import '../models/task.dart';

/// 任务/手账内存仓库(UI 高保真批次;P3c 换 SQLite + LWW 同步引擎)。
///
/// 同时持有专注屏状态(选中任务/今日番茄数/日复盘),供 Dock 四屏共享。
class TaskProvider extends ChangeNotifier {
  TaskProvider([this._tasks = const [], this._journals = const []]);

  /// 原型演示数据(pomoflow-mobile-prototype.html tasks 数组)。
  factory TaskProvider.demo() => TaskProvider(
    const [
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
    ],
    const [
      PfJournal(id: 1, kind: JournalKind.todo, title: '给妈妈买生日礼物', tags: ['生活']),
      PfJournal(
        id: 2,
        kind: JournalKind.note,
        title: '',
        content: '移动端 Dock 交互参考记账 App 的悬浮胶囊,中间凸起按钮承载最高频动作「新建」。',
      ),
    ],
  );

  final List<PfTask> _tasks;
  final List<PfJournal> _journals;
  int _nextId = 100;

  List<PfTask> get tasks => List.unmodifiable(_tasks);
  List<PfJournal> get journals => List.unmodifiable(_journals);

  // === 专注屏共享状态 ==========================================================

  int? _focusTaskId;
  PfTask? get focusTask =>
      _tasks.where((t) => t.id == _focusTaskId).firstOrNull;

  int todayPomos = 6; // 今日已完成番茄(原型初值)
  String todayReview = '上午两个番茄写完了需求初稿，下午会议偏多。';

  // === 任务视图(§4.2 六视图) ==================================================

  static const taskViews = ['今天', '明天', '本周', '计划', '已完成', '手账'];

  List<PfTask> viewTasks(String view) => switch (view) {
    '今天' => _tasks.where((t) => t.dueLabel == '今天' && !t.completed).toList(),
    '明天' => _tasks.where((t) => t.dueLabel == '明天' && !t.completed).toList(),
    '本周' => _tasks.where((t) => !t.completed).toList(),
    '计划' => _tasks.where((t) => !t.completed).toList(),
    '已完成' => _tasks.where((t) => t.completed).toList(),
    _ => const [],
  };

  // === 写操作(内存) ==========================================================

  void addTask(PfTask task) {
    _tasks.insert(0, task);
    _nextId++;
    notifyListeners();
  }

  void addJournal(PfJournal entry) {
    _journals.insert(0, entry);
    _nextId++;
    notifyListeners();
  }

  void toggleDone(int id) {
    final i = _tasks.indexWhere((t) => t.id == id);
    if (i < 0) return;
    _tasks[i] = _tasks[i].copyWith(completed: !_tasks[i].completed);
    notifyListeners();
  }

  void setFocusTask(int? id) {
    _focusTaskId = id;
    notifyListeners();
  }

  /// 一个番茄完成(计时器走完调用)。
  void completePomodoro() {
    todayPomos++;
    final t = focusTask;
    if (t != null) {
      final i = _tasks.indexWhere((x) => x.id == t.id);
      if (i >= 0) {
        _tasks[i] = _tasks[i].copyWith(
          completedPomos: _tasks[i].completedPomos + 1,
        );
      }
    }
    notifyListeners();
  }

  void saveReview(String text) {
    todayReview = text;
    notifyListeners();
  }

  int nextId() => _nextId;
}
