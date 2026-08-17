//! 番茄钟页右侧栏筛选器 —— 模块级单例(v1 存在 AppContext,timerFilter)。
//!
//! v1 语义:筛选状态挂在全局 context,切到任务页/统计页再回来时保留。
//! Svelte 5 下用 .svelte.ts 模块级 $state 单例实现同样的生命周期
//! (随应用存活,不随组件销毁)。
//!
//! `TimerFilter` 类型定义在这里(TimerRightSidebar 复用):类型不能从
//! .svelte 文件 import 进 .ts 模块,svelte-check 会报 TS2614。

export type Priority = "high" | "medium" | "low";
export type DateFilter = "today" | "tomorrow" | "this_week";

export interface TimerFilter {
  project: string | null;
  tag: string | null;
  priority: Priority | null;
  date: DateFilter | null;
}

export const timerFilter = $state<TimerFilter>({
  project: null,
  tag: null,
  priority: null,
  date: null,
});
