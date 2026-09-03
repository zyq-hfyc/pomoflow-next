import 'package:flutter/material.dart';

/// 优先级(对齐桌面端 Priority:high/medium/low/none)。
enum PfPriority { high, medium, low, none }

extension PfPriorityX on PfPriority {
  String get label => switch (this) {
    PfPriority.high => '高',
    PfPriority.medium => '中',
    PfPriority.low => '低',
    PfPriority.none => '无',
  };

  /// 优先级点颜色(原型 .pdot:高 danger/中 warn/低 #4D8EE0/无 #C9BFB4)。
  Color dotColor(Color danger, Color warn, Color low, Color none) =>
      switch (this) {
        PfPriority.high => danger,
        PfPriority.medium => warn,
        PfPriority.low => low,
        PfPriority.none => none,
      };
}

/// 同步元信息集合 — 在 P3d-B-Phase-2 与 sqflite `tasks` 表对齐:
/// - `revision`:本地写每次 +1,服务端用做 LWW 裁决;
/// - `updatedAt`:本次写时间(默认 epoch 表示「无」,provider 写入时覆盖);
/// - `originDevice`:首次写入该行的设备(`AuthProvider.deviceId`);
/// - `syncState`:本端 `'pending'|'synced'|'tombstone'`;
/// - `userId`:首次写入该行的账号 id(后续 `SyncClient` 落 server 时携带)。
///
/// P1 多实体同步起由 Task / PomodoroSession 共用(原名 PfTaskSyncMeta)。
@immutable
class PfSyncMeta {
  const PfSyncMeta({
    this.revision = 1,
    this.updatedAt,
    this.originDevice = '',
    this.syncState = 'synced',
    this.userId = '',
  });

  final int revision;
  final DateTime? updatedAt;
  final String originDevice;
  final String syncState;
  final String userId;
}

/// 任务(P3d-B-Phase-2 同步版):id 已经切 String,与 server `core::Task.id`
/// `Uuid` 对齐;5 同步字段挂在 [syncMeta] 子结构里 → 接下来每条 mutator 调用
/// `copyWith` 后由 provider 自动 bumpRevision + 标 pending(Commit 4)。
@immutable
class PfTask {
  const PfTask({
    required this.id,
    required this.title,
    this.priority = PfPriority.none,
    this.project = '',
    this.dueLabel = '',
    this.tags = const [],
    this.estimatedPomos = 0,
    this.completedPomos = 0,
    this.description = '',
    this.pomodoroDuration = 0,
    this.repeat = 'none',
    this.repeatConfig = '',
    this.repeatParentId = '',
    this.repeatEndDate,
    this.reminder = 'none',
    this.dueAt,
    this.subtaskCount = 0,
    this.completed = false,
    this.completedAt,
    this.deletedAt,
    this.syncMeta = const PfSyncMeta(),
  });

  /// UUID 14 字符短码(16 字节 Random.secure → base64Url 截前 14 位);
  /// UI 不直接显示,只做对比 / 透传给 SyncClient。
  final String id;

  final String title;
  final PfPriority priority;
  final String project;
  final String dueLabel; // 「今天/明天/本周/每天」演示粒度
  final List<String> tags;
  final int estimatedPomos;
  final int completedPomos;

  /// 任务描述(多行;core `description` 对齐)。P0 修复:此前 push 恒发
  /// 空串,桌面写的描述会被 mobile 的任意一次编辑覆盖丢失。
  final String description;

  /// 单番茄时长(分钟,0 = 未设 → 用全局设置;对齐 core
  /// `pomodoro_duration: Option<u32>` 的「覆盖全局」语义)。
  final int pomodoroDuration;

  /// 重复(none/daily/weekdays/weekly/monthly/yearly/custom,对齐 core
  /// Repeat snake 名)。模板 = 带规则且非实例;实例生成见 repeat_service。
  final String repeat;

  /// 自定义重复规则 JSON(repeat == 'custom' 时有值;键名与桌面/v1 的
  /// camelCase 同构:{interval, type, startDate, endDate, weekdays?, monthDays?})。
  final String repeatConfig;

  /// 重复模板 id('' = 模板本身 / 普通任务;对齐 core
  /// `repeat_parent_id: Option<Id>`,实例指向模板)。
  final String repeatParentId;

  /// 重复终止时间(null = 未设;对齐 core `repeat_end_date`,模板上由
  /// computeRepeatEndDate 按规则算出)。
  final DateTime? repeatEndDate;

  /// 提醒(none/on_time/minutes5/minutes30/hour1/day1/days2,core Reminder
  /// serde 值;桌面同款 7 档)。触发引擎(到点弹通知)后续独立批次。
  final String reminder;

  /// 到期日(含时分;null = 无)。桌面对齐 core `due_date: Option<DateTime<Utc>>`
  /// 的完整 datetime 语义 —— 此前 dueLabel 只有「今天/明天」标签粒度。
  final DateTime? dueAt;

  final int subtaskCount;
  final bool completed;

  /// 完成时刻(null = 未完成;对齐 core `completed_at`)。toggleDone 完成
  /// 时盖 now,取消清空 —— 统计「完成任务」的区间口径以此为准。
  final DateTime? completedAt;

  /// 软删除时刻(null = 活任务;对齐 core `deleted_at`)。UI 永不渲染墓碑
  /// (DB listTasks 已滤),此字段只随同步流转。
  final DateTime? deletedAt;

  bool get isDeleted => deletedAt != null;

  /// 重复实例判定(桌面 repeat_service `is_template` 同构):
  /// 带规则且非实例 = 模板(实例生成/重排的载体)。
  bool get isRepeatTemplate => repeat != 'none' && repeatParentId.isEmpty;

  /// 重复实例(指向模板;编辑/完成只动这一条,不触发重排)。
  bool get isRepeatInstance => repeatParentId.isNotEmpty;

  /// Phase-2 同步元信息。`copyWith` 业务字段时 syncMeta 默认保留不变;
  /// provider 在 mutator 末尾手动覆写(revision + 1 / syncState='pending' /
  /// updatedAt=now)。
  final PfSyncMeta syncMeta;

  String get pomoLabel => '$completedPomos/$estimatedPomos';

  /// 业务字段 copy。**id 与 syncMeta 不可变**(由 SyncClient / provider 决定)。
  /// [clearCompletedAt]/[clearDueAt]:copyWith 的 null 会被 `??` 吞,
  /// 清空要显式传。
  PfTask copyWith({
    String? title,
    PfPriority? priority,
    String? project,
    String? dueLabel,
    List<String>? tags,
    int? estimatedPomos,
    int? completedPomos,
    String? description,
    int? pomodoroDuration,
    String? repeat,
    String? repeatConfig,
    String? repeatParentId,
    DateTime? repeatEndDate,
    bool clearRepeatEndDate = false,
    String? reminder,
    DateTime? dueAt,
    bool clearDueAt = false,
    int? subtaskCount,
    bool? completed,
    DateTime? completedAt,
    bool clearCompletedAt = false,
    DateTime? deletedAt,
    PfSyncMeta? syncMeta,
  }) => PfTask(
    id: id,
    title: title ?? this.title,
    priority: priority ?? this.priority,
    project: project ?? this.project,
    dueLabel: dueLabel ?? this.dueLabel,
    tags: tags ?? this.tags,
    estimatedPomos: estimatedPomos ?? this.estimatedPomos,
    completedPomos: completedPomos ?? this.completedPomos,
    description: description ?? this.description,
    pomodoroDuration: pomodoroDuration ?? this.pomodoroDuration,
    repeat: repeat ?? this.repeat,
    repeatConfig: repeatConfig ?? this.repeatConfig,
    repeatParentId: repeatParentId ?? this.repeatParentId,
    repeatEndDate: clearRepeatEndDate
        ? null
        : (repeatEndDate ?? this.repeatEndDate),
    reminder: reminder ?? this.reminder,
    dueAt: clearDueAt ? null : (dueAt ?? this.dueAt),
    subtaskCount: subtaskCount ?? this.subtaskCount,
    completed: completed ?? this.completed,
    completedAt: clearCompletedAt ? null : (completedAt ?? this.completedAt),
    deletedAt: deletedAt ?? this.deletedAt,
    syncMeta: syncMeta ?? this.syncMeta,
  );

  /// 到期日本地格式化(yyyy-MM-dd HH:mm);无到期日返回空串。
  String get dueAtLabel {
    final d = dueAt;
    if (d == null) return '';
    String two(int n) => n.toString().padLeft(2, '0');
    return '${d.year}-${two(d.month)}-${two(d.day)} ${two(d.hour)}:${two(d.minute)}';
  }

  /// 提醒中文标签(core serde 值 → 展示;与桌面词典同文案)。
  String get reminderLabel => switch (reminder) {
    'on_time' => '准时',
    'minutes5' => '提前 5 分钟',
    'minutes30' => '提前 30 分钟',
    'hour1' => '提前 1 小时',
    'day1' => '提前 1 天',
    'days2' => '提前 2 天',
    _ => '不提醒',
  };

  /// 重复中文标签(custom 显示「自定义」;具体规则在 repeatConfig)。
  String get repeatLabel => switch (repeat) {
    'daily' => '每天',
    'weekdays' => '工作日',
    'weekly' => '每周',
    'monthly' => '每月',
    'yearly' => '每年',
    'custom' => '自定义',
    _ => '不重复',
  };
}

/// 手账条目类型(§5.4 快速新建 5 类中的 4 类轻量项 + 小记)。
enum JournalKind { todo, wish, plan, note }

extension JournalKindX on JournalKind {
  String get label => switch (this) {
    JournalKind.todo => '待办',
    JournalKind.wish => '愿望',
    JournalKind.plan => '年度规划',
    JournalKind.note => '小记',
  };

  String get emoji => switch (this) {
    JournalKind.todo => '☑️',
    JournalKind.wish => '⭐',
    JournalKind.plan => '🗓️',
    JournalKind.note => '✍️',
  };
}

@immutable
class PfJournal {
  const PfJournal({
    required this.id,
    required this.kind,
    required this.title,
    this.content = '',
    this.tags = const [],
    this.createdAt,
    this.deletedAt,
    this.syncMeta = const PfSyncMeta(),
  });

  /// P3d-B-Phase-2 顺手切 String(Journal 同步批已接上,对齐 core `Journal.id`)。
  final String id;
  final JournalKind kind;
  final String title;
  final String content;
  final List<String> tags;

  /// 创建时间(列表展示序;core created_at,老本地行 = epoch 0 不参与排序失真)
  final DateTime? createdAt;

  /// 软删除墓碑(远端 tombstone 收敛用;本地 UI 永远读未删行)
  final DateTime? deletedAt;
  final PfSyncMeta syncMeta;

  PfJournal copyWith({
    JournalKind? kind,
    String? title,
    String? content,
    List<String>? tags,
    DateTime? createdAt,
    DateTime? deletedAt,
    PfSyncMeta? syncMeta,
  }) => PfJournal(
    id: id,
    kind: kind ?? this.kind,
    title: title ?? this.title,
    content: content ?? this.content,
    tags: tags ?? this.tags,
    createdAt: createdAt ?? this.createdAt,
    deletedAt: deletedAt ?? this.deletedAt,
    syncMeta: syncMeta ?? this.syncMeta,
  );
}
