import 'package:flutter/material.dart';

import 'task.dart';

/// 项目实体(P1 实体化)—— core::Project 的平铺子集。
///
/// mobile 端 parent_id 默认 ''(顶级);3 级嵌套 + 拖拽改父由桌面 UI 处理,
/// mobile 通过 PfProjectTree 派生展示层级(缩进)。
@immutable
class PfProject {
  const PfProject({
    required this.id,
    required this.name,
    this.color = '',
    this.parentId = '',
    this.displayOrder = 0,
    this.syncMeta = const PfSyncMeta(),
  });

  final String id;
  final String name;
  final String color;
  final String parentId;
  final int displayOrder;

  final PfSyncMeta syncMeta;
}

/// 派生层级节点 —— 给 UI 展示缩进用(不持久化,每次从扁平列表重建)。
@immutable
class PfProjectNode {
  const PfProjectNode({
    required this.project,
    required this.depth,
    required this.children,
  });

  final PfProject project;
  final int depth;

  /// 子节点(已递归构造完成)。
  final List<PfProjectNode> children;
}

/// 扁平项目列表 → 树形节点列表(按 (parent_id, display_order) 稳定排序)。
///
/// parent_id 为空/缺失的项目挂到根;循环引用防御性 break(防止 corrupt 数据
/// 让递归爆栈)。深度上限 3(core ADR-005:层级 ≤ 3,UI 渲染限制)。
///
/// 返回的节点按 **DFS 前序** 平铺(depth 反映真实缩进),UI 直接用 [depth] 决定
/// 左侧缩进值。
List<PfProjectNode> buildProjectTree(
  List<PfProject> projects, {
  int maxDepth = 3,
}) {
  // 防御性:剔除自指(防 DB 数据 corrupt)
  final safe = projects.where((p) => p.parentId != p.id).toList();
  final byParent = <String, List<PfProject>>{};
  for (final p in safe) {
    byParent.putIfAbsent(p.parentId, () => []).add(p);
  }
  for (final list in byParent.values) {
    list.sort((a, b) {
      final c = a.displayOrder.compareTo(b.displayOrder);
      return c != 0 ? c : a.name.compareTo(b.name);
    });
  }
  final out = <PfProjectNode>[];
  final visited = <String>{};

  void walk(PfProject p, int depth) {
    if (depth > maxDepth) return;
    if (visited.contains(p.id)) return; // 防循环
    visited.add(p.id);
    out.add(PfProjectNode(project: p, depth: depth, children: const []));
    if (depth + 1 > maxDepth) return;
    for (final child in byParent[p.id] ?? const []) {
      walk(child, depth + 1);
    }
  }

  for (final root in byParent[''] ?? const []) {
    walk(root, 0);
  }
  // 兜底:parent 指向已删/自指/孤儿 → 作为顶级兜底显示
  for (final p in safe) {
    if (!visited.contains(p.id)) {
      walk(p, 0);
    }
  }
  return out;
}
