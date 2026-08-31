import 'package:flutter/material.dart';

import 'task.dart';

/// 项目实体(P1 实体化)—— core::Project 的平铺子集。
///
/// mobile 端无层级(parent_id 树是桌面 UI 概念,拉下来的 payload 里保留
/// 不展开);mobile 的项目语义 = "任务归属的名字 + 颜色"。
@immutable
class PfProject {
  const PfProject({
    required this.id,
    required this.name,
    this.color = '',
    this.syncMeta = const PfSyncMeta(),
  });

  final String id;
  final String name;
  final String color;

  final PfSyncMeta syncMeta;
}
