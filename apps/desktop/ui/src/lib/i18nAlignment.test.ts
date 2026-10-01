//! i18n 中/英词典 key 对齐单测(测试空白 Top6 补全,2026-10-01)。
//!
//! `Dict = typeof zh` 已在类型层锁形状,但运行时仍有两类漏网:
//! ① 断言绕过(as Dict / @ts-ignore)造成的 key 漂移;② 值为空串的
//! 「假装翻译」。本测试在运行时递归比对:key 集合完全一致 + 路径类型
//! 一致(字符串叶 vs 嵌套组)+ 叶子非空。

import { describe, expect, test } from "vitest";
import { zh } from "./i18n/zh";
import { en } from "./i18n/en";

/** 递归收集 key 路径:字符串叶 "a.b.c",嵌套组 "a.b"(带类型标注)。 */
function keyPaths(obj: Record<string, unknown>, prefix = ""): Map<string, string> {
  const out = new Map<string, string>();
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "string") {
      out.set(path, "leaf");
    } else if (v && typeof v === "object") {
      out.set(path, "group");
      for (const [p, t] of keyPaths(v as Record<string, unknown>, path)) {
        out.set(p, t);
      }
    } else {
      out.set(path, typeof v);
    }
  }
  return out;
}

describe("i18n · zh/en 词典对齐", () => {
  const zhPaths = keyPaths(zh as unknown as Record<string, unknown>);
  const enPaths = keyPaths(en as unknown as Record<string, unknown>);

  test("key 集合完全一致(互无缺失)", () => {
    const onlyZh = [...zhPaths.keys()].filter((k) => !enPaths.has(k));
    const onlyEn = [...enPaths.keys()].filter((k) => !zhPaths.has(k));
    expect(onlyZh, `en 缺失:${onlyZh.join(", ")}`).toEqual([]);
    expect(onlyEn, `zh 缺失:${onlyEn.join(", ")}`).toEqual([]);
  });

  test("同一路径的节点类型一致(叶子/分组不串)", () => {
    const mismatched = [...zhPaths.entries()]
      .filter(([k, t]) => enPaths.has(k) && enPaths.get(k) !== t)
      .map(([k]) => k);
    expect(mismatched, `类型不一致:${mismatched.join(", ")}`).toEqual([]);
  });

  test("叶子值非空(无「假装翻译」占位)", () => {
    // 有意空值白名单:英文无度量词,StatCard 对空 unit 不渲染单位 —
    // 与 v1 en 词典逐字一致(v1 frontend/src/i18n/en.ts:134 同款空串)。
    const INTENTIONAL_EMPTY = new Set(["stats.unitCount"]);
    const emptyOf = (dict: Record<string, unknown>, paths: Map<string, string>) => {
      const get = (o: Record<string, unknown>, path: string): unknown =>
        path.split(".").reduce<unknown>((acc, k) => (acc as Record<string, unknown>)?.[k], o);
      return [...paths.keys()].filter(
        (k) => paths.get(k) === "leaf" && get(dict, k) === "" && !INTENTIONAL_EMPTY.has(k),
      );
    };
    expect(emptyOf(zh as unknown as Record<string, unknown>, zhPaths)).toEqual([]);
    expect(emptyOf(en as unknown as Record<string, unknown>, enPaths)).toEqual([]);
  });
});
