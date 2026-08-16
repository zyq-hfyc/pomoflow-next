//! 拖拽排序校验 —— v1 `backend/app/crud.py:872-978`(`_validate_project_reorder`)翻译。
//!
//! ## v1 语义
//!
//! - `MAX_PROJECT_DEPTH = 3`:项目树深度 ∈ {0,1,2},最多三级。
//! - 校验图 = **新提交的 items + 未涉及节点保持原状**(合并成临时父子图)。
//! - 三类失败(抛 Validation):
//!   1. 提交的 id 有不存在的
//!   2. 自指(自身为父)
//!   3. 环(DFS 沿 parent 链向上,带缓存 + 栈内检测)
//!   4. 深度 ≥ 3
//! - 怪癖(v1 原样):parent 不在图中(悬空引用)按**根**处理(depth 0),不算错误。
//! - 标签排序无层级,只更新 display_order,只做存在性检查。

use std::collections::{HashMap, HashSet};

use serde::{Deserialize, Serialize};

use crate::error::{CoreError, CoreResult};
use crate::model::Id;

/// 项目树最大深度(v1 MAX_PROJECT_DEPTH):depth ∈ {0,1,2}。
pub const MAX_PROJECT_DEPTH: usize = 3;

/// 单个节点的新位置(v1 schemas.ReorderItem):
/// tags 只用 id + display_order;project 还会用 parent_id。
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct ReorderItem {
    pub id: Id,
    #[serde(default)]
    pub parent_id: Option<Id>,
    #[serde(default)]
    pub display_order: u32,
}

/// 校验拖拽后的项目父子图(纯函数,不碰存储)。
///
/// `parent_by_id` 是**全图**(调用方合并:提交项的新 parent + 未涉及节点原状),
/// 值为 None 表示顶层。自指 / 环 / 深度超限返回 [`CoreError::Validation`]。
pub fn validate_project_reorder(parent_by_id: &HashMap<Id, Option<Id>>) -> CoreResult<()> {
    // 自指检查
    for (pid, parent) in parent_by_id {
        if parent.as_ref() == Some(pid) {
            return Err(CoreError::validation(format!(
                "project {pid} cannot be its own parent"
            )));
        }
    }

    // 环 + 深度:DFS 沿 parent 链向上,栈内出现即环,结果入缓存
    let mut depth_cache: HashMap<Id, usize> = HashMap::new();

    fn depth_of(
        pid: &Id,
        parent_by_id: &HashMap<Id, Option<Id>>,
        cache: &mut HashMap<Id, usize>,
        stack: &mut HashSet<Id>,
    ) -> CoreResult<usize> {
        if let Some(d) = cache.get(pid) {
            return Ok(*d);
        }
        if stack.contains(pid) {
            return Err(CoreError::validation(format!(
                "cycle detected at project {pid}"
            )));
        }
        stack.insert(pid.clone());
        let d = match parent_by_id.get(pid) {
            // None(顶层)或悬空引用(父不在图中)→ 根(v1 原样:parent not in map → 0)
            None | Some(None) => 0,
            Some(Some(parent)) => {
                if parent_by_id.contains_key(parent) {
                    depth_of(parent, parent_by_id, cache, stack)? + 1
                } else {
                    0
                }
            }
        };
        stack.remove(pid);
        cache.insert(pid.clone(), d);
        Ok(d)
    }

    for pid in parent_by_id.keys() {
        let d = depth_of(pid, parent_by_id, &mut depth_cache, &mut HashSet::new())?;
        if d >= MAX_PROJECT_DEPTH {
            return Err(CoreError::validation(format!(
                "project {pid} would exceed max depth {MAX_PROJECT_DEPTH}"
            )));
        }
    }
    Ok(())
}

/// 把提交项与库里现有父子关系合并成校验用全图。
///
/// `existing`:库里所有未软删项目的 (id, parent);提交项的新 parent 覆盖原值。
pub fn merge_graph(
    submitted: &[ReorderItem],
    existing: &[(Id, Option<Id>)],
) -> HashMap<Id, Option<Id>> {
    let mut graph: HashMap<Id, Option<Id>> = existing.iter().cloned().collect();
    for item in submitted {
        graph.insert(item.id.clone(), item.parent_id.clone());
    }
    graph
}

/// 校验提交的 id 全部存在(缺失返回第一个 Missing)。
pub fn validate_ids_exist(
    submitted: &[ReorderItem],
    existing_ids: &HashSet<Id>,
) -> CoreResult<()> {
    let missing: Vec<String> = submitted
        .iter()
        .filter(|it| !existing_ids.contains(&it.id))
        .map(|it| it.id.to_string())
        .collect();
    if missing.is_empty() {
        Ok(())
    } else {
        Err(CoreError::Validation(format!(
            "projects not found: {missing:?}"
        )))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn id() -> Id {
        Id::new()
    }

    fn graph(edges: &[(Id, Option<Id>)]) -> HashMap<Id, Option<Id>> {
        edges.iter().cloned().collect()
    }

    #[test]
    fn depth_two_accepted() {
        // 3 级链 root → child → grandchild:depth 0/1/2,全部 < 3,通过
        let root = id();
        let child = id();
        let grand = id();
        let g = graph(&[
            (root.clone(), None),
            (child.clone(), Some(root.clone())),
            (grand.clone(), Some(child.clone())),
        ]);
        assert!(validate_project_reorder(&g).is_ok());
    }

    #[test]
    fn depth_three_rejected() {
        // 4 级链:最深处 depth = 3 → 拒绝
        let a = id();
        let b = id();
        let c = id();
        let d = id();
        let g = graph(&[
            (a.clone(), None),
            (b.clone(), Some(a)),
            (c.clone(), Some(b)),
            (d.clone(), Some(c)),
        ]);
        let err = validate_project_reorder(&g).unwrap_err();
        assert!(matches!(err, CoreError::Validation(_)));
        assert!(err.to_string().contains("max depth"));
    }

    #[test]
    fn self_parent_rejected() {
        let a = id();
        let g = graph(&[(a.clone(), Some(a.clone()))]);
        let err = validate_project_reorder(&g).unwrap_err();
        assert!(err.to_string().contains("its own parent"));
    }

    #[test]
    fn cycle_detected() {
        // a → b → c → a
        let a = id();
        let b = id();
        let c = id();
        let g = graph(&[
            (a.clone(), Some(c.clone())),
            (b.clone(), Some(a.clone())),
            (c.clone(), Some(b.clone())),
        ]);
        let err = validate_project_reorder(&g).unwrap_err();
        assert!(err.to_string().contains("cycle"));
    }

    #[test]
    fn untouched_nodes_count_toward_depth() {
        // 未提交节点构成深层链,把提交节点"拖进去"后超深:
        // r → c1 → c2(未提交,库里原状);提交 (r 的 child = c2 所在子树)
        let r = id();
        let c1 = id();
        let c2 = id();
        let moved = id();
        // 现状:c2 挂 c1(未动);moved 将挂到 c2 下(提交)
        let existing = vec![(r.clone(), None), (c1.clone(), Some(r)), (c2.clone(), Some(c1))];
        let submitted = vec![ReorderItem {
            id: moved.clone(),
            parent_id: Some(c2),
            display_order: 0,
        }];
        let g = merge_graph(&submitted, &existing);
        // moved depth = 3 → 拒绝(说明未提交节点并入了校验图)
        assert!(validate_project_reorder(&g).is_err());
    }

    #[test]
    fn dangling_parent_treated_as_root() {
        // 悬空 parent(不在图中)按根处理 —— v1 原样,不报错
        let ghost = id();
        let a = id();
        let g = graph(&[(a, Some(ghost))]);
        assert!(validate_project_reorder(&g).is_ok());
    }

    #[test]
    fn ids_existence_check() {
        let a = id();
        let b = id();
        let mut existing = HashSet::new();
        existing.insert(a.clone());
        assert!(validate_ids_exist(
            &[ReorderItem {
                id: a,
                parent_id: None,
                display_order: 0
            }],
            &existing
        )
        .is_ok());
        let err = validate_ids_exist(
            &[ReorderItem {
                id: b.clone(),
                parent_id: None,
                display_order: 0
            }],
            &existing,
        )
        .unwrap_err();
        assert!(err.to_string().contains("not found"));
    }
}
