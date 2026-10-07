//! richText 纯函数单测(2026-10-06 富文本批)。
//!
//! 锁定存储契约:content = Tiptap JSON 串(新)或纯文本(旧);判别/互转/
//! 摘要/纯文本提取/空判定。列表卡片与「至少填一项」校验全靠这组函数,
//! 绝不直接把 JSON 原文糊到 UI 上。

import { describe, expect, test } from "vitest";
import {
  isRichDoc,
  contentToDoc,
  docToPlainText,
  journalPreview,
  hasVisibleContent,
  contentPlainText,
} from "./richText";

const RICH = JSON.stringify({
  type: "doc",
  content: [
    { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "标题" }] },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "第一段" },
        { type: "text", text: "加粗", marks: [{ type: "bold" }] },
      ],
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          content: [{ type: "paragraph", content: [{ type: "text", text: "待办一" }] }],
        },
      ],
    },
  ],
});

describe("isRichDoc · 格式判别", () => {
  test("JSON + type:doc → true;纯文本/非 doc JSON/非法串 → false", () => {
    expect(isRichDoc(RICH)).toBe(true);
    expect(isRichDoc("  " + RICH)).toBe(true); // 前导空白容忍
    expect(isRichDoc("冬天去")).toBe(false);
    expect(isRichDoc('{"foo":1}')).toBe(false);
    expect(isRichDoc("{not json")).toBe(false);
    expect(isRichDoc("")).toBe(false);
    expect(isRichDoc(null)).toBe(false);
    expect(isRichDoc(undefined)).toBe(false);
  });
});

describe("contentToDoc · 旧纯文本升级", () => {
  test("富文本原样解析", () => {
    expect(contentToDoc(RICH)).toEqual(JSON.parse(RICH));
  });
  test("纯文本按行拆段落", () => {
    expect(contentToDoc("第一行\n第二行")).toEqual({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "第一行" }] },
        { type: "paragraph", content: [{ type: "text", text: "第二行" }] },
      ],
    });
  });
  test("空内容 → 单空段落", () => {
    expect(contentToDoc("")).toEqual({ type: "doc", content: [{ type: "paragraph" }] });
    expect(contentToDoc(null)).toEqual({ type: "doc", content: [{ type: "paragraph" }] });
  });
});

describe("docToPlainText · 纯文本提取", () => {
  test("递归提取 text 节点,块级间补空格", () => {
    const plain = docToPlainText(JSON.parse(RICH));
    expect(plain).toContain("标题");
    expect(plain).toContain("第一段加粗");
    expect(plain).toContain("待办一");
    // 三个块各自成段(被空格分开,不粘连)
    expect(plain.indexOf("标题") < plain.indexOf("第一段加粗")).toBe(true);
    expect(plain.indexOf("第一段加粗") < plain.indexOf("待办一")).toBe(true);
  });
  test("字符串入参(序列化 doc)同样工作;非法输入回空串", () => {
    expect(docToPlainText(RICH)).toContain("标题");
    expect(docToPlainText("{bad")).toBe("");
    expect(docToPlainText(null)).toBe("");
  });
});

describe("journalPreview · 卡片摘要", () => {
  test("富文本提取纯文本,绝不露 JSON 原文", () => {
    const p = journalPreview(RICH);
    expect(p).toContain("标题");
    expect(p).not.toContain('"type"');
    expect(p).not.toContain("taskList");
  });
  test("纯文本原样(压平空白);超长截断加省略号", () => {
    expect(journalPreview("  冬天\n去  ")).toBe("冬天 去");
    const long = "长".repeat(200);
    const p = journalPreview(long, 140);
    expect(p.length).toBe(141); // 140 字 + …
    expect(p.endsWith("…")).toBe(true);
  });
});

describe("hasVisibleContent / contentPlainText · 校验轨", () => {
  test("空段落 doc 视为无内容;有文字即 true", () => {
    const emptyDoc = JSON.stringify({ type: "doc", content: [{ type: "paragraph" }] });
    expect(hasVisibleContent(emptyDoc)).toBe(false);
    expect(hasVisibleContent(RICH)).toBe(true);
    expect(hasVisibleContent("  ")).toBe(false);
    expect(hasVisibleContent("字")).toBe(true);
    expect(hasVisibleContent(null)).toBe(false);
  });
  test("contentPlainText:富文本提取,纯文本原样", () => {
    expect(contentPlainText(RICH)).toContain("待办一");
    expect(contentPlainText("原文")).toBe("原文");
    expect(contentPlainText(null)).toBe("");
  });
});
