//! i18n 语言 store —— 中/英切换。localStorage 持久化,Svelte 5 runes。
//!
//! 设计要点(参照 settings.svelte.ts 模式,平移 v1 LanguageContext + useT() 语义):
//! - 模块级 `$state` 持有当前语言;组件里 `const t = $derived(getDict())`
//!   拿到响应式词典对象,之后 `t.nav.timer` 访问(类型安全,语言切换即重渲染)。
//! - localStorage key 与 v1 相同(`pomoflow-lang`),默认 zh;非法值回落默认。
//! - setLang 同步 `document.documentElement.lang`,便于辅助技术与浏览器。
//! - `fmt(tpl, vars)` 是 v1 同款占位符替换(字面替换 `{key}` 的所有出现),
//!   供 journal/monthPanel/colorAria 等带参文案使用。

import { DEFAULT_LANG, DICTS, type Dict, type Lang } from "./i18n";

const STORAGE_KEY = "pomoflow-lang";

function loadInitial(): Lang {
  if (typeof localStorage === "undefined") return DEFAULT_LANG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "en" || raw === "zh") return raw;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

let _lang = $state<Lang>(loadInitial());

export function getLang(): Lang {
  return _lang;
}

/// 切换语言:更新响应式状态 + 落盘 + 同步 `<html lang>`。
export function setLang(l: Lang): void {
  _lang = l;
  if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }
  if (typeof document !== "undefined") {
    document.documentElement.lang = l;
  }
}

/// 当前词典对象。组件里 `const t = $derived(getDict())`。
export function getDict(): Dict {
  return DICTS[_lang];
}

/// t() = getDict() 的短别名(对应 v1 useT() 习惯):`const t = $derived(t())`。
export const t = getDict;

/// 模板占位符替换:fmt("颜色 {color}", { color: "#fff" }) → "颜色 #fff"。
/// v1 同款语义:按 `{key}` 字面替换所有出现,值支持 string | number。
export function fmt(tpl: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce(
    (s, [k, v]) => s.split(`{${k}}`).join(String(v)),
    tpl,
  );
}

// 模块加载时同步一次 `<html lang>`(v1 由 Provider 挂载时的 effect 完成)。
if (typeof document !== "undefined") {
  document.documentElement.lang = _lang;
}
