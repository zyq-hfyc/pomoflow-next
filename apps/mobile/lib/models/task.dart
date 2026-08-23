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

/// 任务(本批 UI 高保真用内存模型;P3c 换 core 域模型 + 同步)。
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
  });

  final int id;
  final String title;
  final PfPriority priority;
  final String project;
  final String dueLabel; // 「今天/明天/本周/每天」演示粒度
  final List<String> tags;
  final int estimatedPomos;
  final int completedPomos;
  final int subtaskCount;
  final bool completed;

  String get pomoLabel => '$completedPomos/$estimatedPomos';

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

  final int id;
  final JournalKind kind;
  final String title;
  final String content;
  final List<String> tags;
}
