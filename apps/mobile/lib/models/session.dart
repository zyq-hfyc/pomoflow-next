import 'package:flutter/material.dart';

import 'task.dart';

/// 番茄钟会话 —— 「开始计时」即落行,自然走完/中途放弃时收尾。
///
/// 与 `crates/core/src/model/pomodoro.rs` 的 `PomodoroSession` 字段对齐
/// (P1 多实体同步);`taskId`/`projectId` 为空串表示 core 的 `None`。
///
/// 2026-09-05 J2 对齐批(桌面 start_pomodoro/stop_pomodoro 同构):开始即
/// 插 is_completed=false 行(ended_at 占位 started_at);停止时更新
/// ended_at + is_completed(各一次 revision bump)。计时中被杀进程 = 行
/// 永远停在 open 态,不计统计、历史可查(桌面同款)。
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

  /// true = 自然结束到时;false = 中途手动停止 / 计时中被杀(open 行)。
  final bool isCompleted;

  final PfSyncMeta syncMeta;

  PfSession copyWith({
    DateTime? endedAt,
    bool? isCompleted,
    PfSyncMeta? syncMeta,
  }) => PfSession(
    id: id,
    taskId: taskId,
    projectId: projectId,
    durationMinutes: durationMinutes,
    startedAt: startedAt,
    endedAt: endedAt ?? this.endedAt,
    isCompleted: isCompleted ?? this.isCompleted,
    syncMeta: syncMeta ?? this.syncMeta,
  );
}
