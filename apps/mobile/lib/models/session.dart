import 'package:flutter/material.dart';

import 'task.dart';

/// 番茄钟会话 —— 一次「开始专注 → 自然走完」产出一条。
///
/// 与 `crates/core/src/model/pomodoro.rs` 的 `PomodoroSession` 字段对齐
/// (P1 多实体同步);`taskId`/`projectId` 为空串表示 core 的 `None`。
///
/// 与任务行的区别:session 是**不可变事实**(append-only),本地只在
/// 计时器自然结束时插入,此后不再修改 —— revision 停在 1,LWW 冲突面极小。
@immutable
class PfSession {
  const PfSession({
    required this.id,
    required this.durationMinutes,
    required this.startedAt,
    required this.endedAt,
    this.taskId = '',
    this.projectId = '',
    this.isCompleted = true,
    this.syncMeta = const PfSyncMeta(),
  });

  /// UUID 14 字符短码(与 PfTask.id 同生成器,见 TaskProvider._uuid14)。
  final String id;
  final String taskId;
  final String projectId;

  /// 专注时长(分钟)。
  final int durationMinutes;
  final DateTime startedAt;
  final DateTime endedAt;

  /// true = 自然结束到时;false = 中途手动停止(P0 只落自然结束)。
  final bool isCompleted;

  final PfSyncMeta syncMeta;

  PfSession copyWith({PfSyncMeta? syncMeta}) => PfSession(
        id: id,
        taskId: taskId,
        projectId: projectId,
        durationMinutes: durationMinutes,
        startedAt: startedAt,
        endedAt: endedAt,
        isCompleted: isCompleted,
        syncMeta: syncMeta ?? this.syncMeta,
      );
}
