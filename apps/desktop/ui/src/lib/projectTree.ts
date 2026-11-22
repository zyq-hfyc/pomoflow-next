//! 清单(项目)树 → 下拉选项平铺 —— v1 TaskForm/TaskDetailPanel 共用逻辑。
//!
//! 规则(v1 getProjectTreeOptions):
//!   - 深度优先遍历,子清单缩进一级(depth 供前端渲染 `'　'.repeat(depth)`)
//!   - 有子清单的父节点 `disabled: true`(任务只能挂到叶子清单)

import type { Project } from "./api";

export interface ProjectTreeOption {
  id: string;
  name: string;
  depth: number;
  /** 有子清单的父节点禁止选中(v1 行为)。 */
  disabled: boolean;
}

export function projectTreeOptions(projects: Project[]): ProjectTreeOption[] {
  const map = new Map<string, Project & { children: string[] }>();
  for (const p of projects) {
    map.set(p.id, { ...p, children: [] });
  }
  const roots: string[] = [];
  for (const p of projects) {
    if (p.parent_id && map.has(p.parent_id)) {
      map.get(p.parent_id)!.children.push(p.id);
    } else {
      roots.push(p.id);
    }
  }
  const result: ProjectTreeOption[] = [];
  const walk = (id: string, depth: number) => {
    const node = map.get(id)!;
    const hasChildren = node.children.length > 0;
    result.push({ id: node.id, name: node.name, depth, disabled: hasChildren });
    for (const childId of node.children) walk(childId, depth + 1);
  };
  for (const rootId of roots) walk(rootId, 0);
  return result;
}

// === 树展示(ProjectSidebar / ProjectManager 共用,2026-09-14 去重)=======

export interface ProjectTreeNode extends Project {
  children: ProjectTreeNode[];
  depth: number;
}

/**
 * 构建清单树:同父下按 display_order 排序(并列时 created_at / id 兜底稳定)。
 * 2026-09-14 去重:ProjectManager / ProjectSidebar 两份合一 —— 侧栏此前
 * 不排序,拖拽排序只在设置页生效、清单树里不生效。
 */
export function buildProjectTree(items: Project[]): ProjectTreeNode[] {
  const map = new Map<string, ProjectTreeNode>();
  const roots: ProjectTreeNode[] = [];
  for (const p of items) map.set(p.id, { ...p, children: [], depth: 0 });
  for (const p of items) {
    const node = map.get(p.id);
    if (!node) continue;
    if (p.parent_id && map.has(p.parent_id)) {
      map.get(p.parent_id)!.children.push(node);
    } else {
      roots.push(node);
    }
  }
  const sortByOrder = (nodes: ProjectTreeNode[]) => {
    nodes.sort(
      (a, b) =>
        (a.display_order ?? 0) - (b.display_order ?? 0) ||
        (a.created_at ?? "").localeCompare(b.created_at ?? "") ||
        a.id.localeCompare(b.id),
    );
    nodes.forEach((n) => sortByOrder(n.children));
  };
  sortByOrder(roots);
  const setDepth = (nodes: ProjectTreeNode[], depth: number) => {
    for (const node of nodes) {
      node.depth = depth;
      setDepth(node.children, depth + 1);
    }
  };
  setDepth(roots, 0);
  return roots;
}

/** 按 expanded 集(节点 id)平铺可见序列。 */
export function flattenProjectTree(
  nodes: ProjectTreeNode[],
  expanded: Set<string>,
): ProjectTreeNode[] {
  const result: ProjectTreeNode[] = [];
  for (const node of nodes) {
    result.push(node);
    if (expanded.has(node.id) && node.children.length > 0) {
      result.push(...flattenProjectTree(node.children, expanded));
    }
  }
  return result;
}

// === 结束项目(2026-11-22 批):归档 = 派生可见性 ===========================
//
// 任务不落任何标记 —— 任务属于「已结束项目或其子孙」即视为归档。
// 两个纯函数给 TasksPage / ProjectSidebar / TimerPage 共用。

/**
 * 已结束子树的全集:自身有 closed_at,或任一祖先有(祖先闭包推导,
 * 不批量写子项目)。parent 断链/成环按根处理,防御异常数据。
 */
export function closedSubtreeIds(projects: Project[]): Set<string> {
  const closedRoots = new Set(
    projects.filter((p) => !!p.closed_at).map((p) => p.id),
  );
  if (closedRoots.size === 0) return new Set();
  const parentOf = new Map<string, string | null>();
  for (const p of projects) parentOf.set(p.id, p.parent_id ?? null);
  const closed = new Set<string>();
  for (const p of projects) {
    let cur: string | null = p.id;
    const seen = new Set<string>();
    let isClosed = false;
    while (cur) {
      if (closedRoots.has(cur)) {
        isClosed = true;
        break;
      }
      if (seen.has(cur)) break; // 成环防御
      seen.add(cur);
      cur = parentOf.get(cur) ?? null;
    }
    if (isClosed) closed.add(p.id);
  }
  return closed;
}

/** 以 rootId 为根的子树 id 集(rootId 不在图中返回空集);浏览态按子树筛任务用。 */
export function subtreeIds(projects: Project[], rootId: string): Set<string> {
  if (!projects.some((p) => p.id === rootId)) return new Set();
  const children = new Map<string | null, string[]>();
  for (const p of projects) {
    const key = p.parent_id ?? null;
    if (!children.has(key)) children.set(key, []);
    children.get(key)!.push(p.id);
  }
  const result = new Set<string>();
  const stack = [rootId];
  while (stack.length > 0) {
    const cur = stack.pop()!;
    if (result.has(cur)) continue; // 成环防御
    result.add(cur);
    for (const kid of children.get(cur) ?? []) stack.push(kid);
  }
  return result;
}
