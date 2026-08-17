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
