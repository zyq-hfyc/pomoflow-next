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
    this.subtaskCount = 0,
    this.completed = false,
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
  final int subtaskCount;
  final bool completed;

  /// Phase-2 同步元信息。`copyWith` 业务字段时 syncMeta 默认保留不变;
  /// provider 在 mutator 末尾手动覆写(revision + 1 / syncState='pending' /
  /// updatedAt=now)。
  final PfSyncMeta syncMeta;

  String get pomoLabel => '$completedPomos/$estimatedPomos';

  /// 业务字段 copy。**id 与 syncMeta 不可变**(由 SyncClient / provider 决定)。
  PfTask copyWith({
    String? title,
    PfPriority? priority,
    String? project,
    String? dueLabel,
    List<String>? tags,
    int? estimatedPomos,
    int? completedPomos,
    int? subtaskCount,
    bool? completed,
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
    subtaskCount: subtaskCount ?? this.subtaskCount,
    completed: completed ?? this.completed,
    syncMeta: syncMeta ?? this.syncMeta,
  );
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
  });

  /// P3d-B-Phase-2 顺手切 String(下批 Journal 同步时不返工)。
  final String id;
  final JournalKind kind;
  final String title;
  final String content;
  final List<String> tags;
}
