import 'package:flutter/material.dart';

import 'task.dart';

/// 子任务(P1 实体化)—— Task 的 N:1 子条目,可选完成。
/// 对齐 `crates/core/src/model/subtask.rs`。
@immutable
class PfSubTask {
  const PfSubTask({
    required this.id,
    required this.taskId,
    required this.title,
    this.isCompleted = false,
    this.position = 0,
    this.syncMeta = const PfSyncMeta(),
  });

  final String id;
  final String taskId;
  final String title;
  final bool isCompleted;

  /// 同 task 内升序排序权重。
  final int position;

  final PfSyncMeta syncMeta;
}
