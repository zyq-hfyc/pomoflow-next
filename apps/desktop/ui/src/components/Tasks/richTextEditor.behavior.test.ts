//! RichTextEditor 编辑器行为测试(headless,2026-10-06 富文本批)。
//!
//! 直接以 buildExtensions(组件同款配置)实例化 Tiptap Editor 跑命令:
//! 行内样式(B/I/S/U/颜色/高亮/字号)、块样式(标题/引用/对齐)、列表
//! (无序/有序/任务)、链接、表格、撤销重做、旧纯文本升级、JSON 往返。
//! 组件层(RichTextEditor.test.ts)只锁挂载与工具栏接线 —— 编辑器内核
//! 行为全部锁在这里,单一扩展来源防漂移。

import { describe, expect, test, beforeEach } from "vitest";
import { Editor } from "@tiptap/core";
import { buildExtensions } from "./richTextExtensions";
import { contentToDoc, docToPlainText } from "../../lib/richText";

let editor: Editor;

beforeEach(() => {
  editor?.destroy();
  editor = new Editor({
    element: document.createElement("div"),
    extensions: buildExtensions("记你想记..."),
    content: contentToDoc(""),
  });
});

describe("行内样式", () => {
  test("加粗/斜体/删除线/下划线 marks 落 JSON", () => {
    editor.chain().insertContent("文字").run();
    editor.chain().selectAll().run();
    editor.chain().focus().toggleBold().toggleItalic().toggleStrike().toggleUnderline().run();
    const marks = editor.getJSON().content![0].content![0].marks!.map((m) => m.type);
    expect(marks).toEqual(expect.arrayContaining(["bold", "italic", "strike", "underline"]));
  });

  test("颜色/高亮/字号经 textStyle+highlight 落 attrs", () => {
    editor.chain().insertContent("彩字").run();
    editor.chain().selectAll().run();
    editor
      .chain()
      .focus()
      .setColor("#ff0000")
      .setHighlight({ color: "#fef08a" })
      .setFontSize("20px")
      .run();
    const textNode = editor.getJSON().content![0].content![0];
    const ts = textNode.marks!.find((m) => m.type === "textStyle");
    const hl = textNode.marks!.find((m) => m.type === "highlight");
    expect(ts?.attrs).toMatchObject({ color: "#ff0000", fontSize: "20px" });
    expect(hl?.attrs).toMatchObject({ color: "#fef08a" });
  });

  test("清除:unsetColor/unsetHighlight/unsetFontSize", () => {
    editor.chain().insertContent("字").run();
    editor.chain().selectAll().run();
    editor.chain().focus().setColor("#ff0000").setFontSize("24px").setHighlight({ color: "#fff000" }).run();
    editor.chain().focus().unsetColor().unsetFontSize().unsetHighlight().run();
    expect(editor.getJSON().content![0].content![0].marks ?? []).toEqual([]);
  });
});

describe("块级样式", () => {
  test("标题 1/2/3 与引用", () => {
    editor.chain().insertContent("题").run();
    editor.chain().selectAll().run();
    editor.chain().focus().toggleHeading({ level: 2 }).run();
    expect(editor.getJSON().content![0]).toMatchObject({ type: "heading", attrs: { level: 2 } });
    editor.chain().focus().toggleBlockquote().run();
    expect(editor.getJSON().content![0].type).toBe("blockquote");
  });

  test("对齐:textAlign attr 落 paragraph;unsetTextAlign 清回默认", () => {
    editor.chain().insertContent("对齐").run();
    editor.chain().selectAll().run();
    editor.chain().focus().setTextAlign("center").run();
    expect(editor.getJSON().content![0].attrs).toMatchObject({ textAlign: "center" });
    editor.chain().focus().unsetTextAlign().run();
    expect(editor.getJSON().content![0].attrs?.textAlign ?? null).toBeNull();
  });

  test("分隔线/代码块节点", () => {
    editor.chain().focus().setHorizontalRule().run();
    expect(editor.getJSON().content!.some((n) => n.type === "horizontalRule")).toBe(true);
    editor.chain().focus().toggleCodeBlock().run();
    expect(editor.getJSON().content!.some((n) => n.type === "codeBlock")).toBe(true);
  });
});

describe("列表", () => {
  test("无序/有序/任务列表节点类型", () => {
    editor.chain().focus().toggleBulletList().run();
    editor.chain().insertContent("甲").run();
    expect(editor.getJSON().content!.some((n) => n.type === "bulletList")).toBe(true);
    editor.chain().focus().toggleOrderedList().run();
    expect(editor.getJSON().content!.some((n) => n.type === "orderedList")).toBe(true);
    editor.chain().focus().toggleTaskList().run();
    expect(editor.getJSON().content!.some((n) => n.type === "taskList")).toBe(true);
  });

  test("任务项勾选状态落 checked attr", () => {
    editor.chain().focus().toggleTaskList().run();
    editor.chain().insertContent("买菜").run();
    editor.chain().focus().updateAttributes("taskItem", { checked: true }).run();
    const taskList = editor.getJSON().content!.find((n) => n.type === "taskList");
    expect(taskList?.content![0].attrs).toMatchObject({ checked: true });
  });
});

describe("链接与表格", () => {
  test("有选区 setLink 落 mark;unsetLink 移除", () => {
    editor.chain().insertContent("点我").run();
    editor.chain().selectAll().run();
    editor.chain().focus().extendMarkRange("link").setLink({ href: "https://example.com" }).run();
    const link = editor.getJSON().content![0].content![0].marks!.find((m) => m.type === "link");
    expect(link?.attrs).toMatchObject({ href: "https://example.com" });
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    expect(editor.getJSON().content![0].content![0].marks ?? []).toEqual([]);
  });

  test("insertTable 3×2 带表头;行列操作", () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 2, withHeaderRow: true }).run();
    const table = editor.getJSON().content!.find((n) => n.type === "table");
    expect(table?.content).toHaveLength(3);
    expect(table?.content![0].content![0].type).toBe("tableHeader");
    editor.chain().focus().addRowAfter().run();
    expect(editor.getJSON().content!.find((n) => n.type === "table")?.content).toHaveLength(4);
    editor.chain().focus().deleteTable().run();
    expect(editor.getJSON().content!.some((n) => n.type === "table")).toBe(false);
  });
});

describe("历史与存储契约", () => {
  test("撤销/重做(history)", () => {
    editor.chain().insertContent("第一句").run();
    expect(editor.getText()).toContain("第一句");
    editor.chain().undo().run();
    expect(editor.getText()).not.toContain("第一句");
    editor.chain().redo().run();
    expect(editor.getText()).toContain("第一句");
  });

  test("旧纯文本 → contentToDoc 升级 → getJSON 序列化 → docToPlainText 还原", () => {
    const legacy = "第一行\n第二行";
    editor.commands.setContent(contentToDoc(legacy));
    const json = JSON.stringify(editor.getJSON());
    // 序列化串可被判别为富文本并完整提取原文
    expect(docToPlainText(JSON.parse(json))).toBe("第一行 第二行");
  });

  test("getText 与 docToPlainText 语义等价(多块文档)", () => {
    editor.commands.setContent({
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 1 }, content: [{ type: "text", text: "题" }] },
        { type: "paragraph", content: [{ type: "text", text: "段一" }] },
        {
          type: "taskList",
          content: [
            {
              type: "taskItem",
              attrs: { checked: false },
              content: [{ type: "paragraph", content: [{ type: "text", text: "办" }] }],
            },
          ],
        },
      ],
    });
    // getText 块间默认分隔符与 docToPlainText 的空格分隔都归一化后比对
    const expected = editor
      .getText({ blockSeparator: " " })
      .replace(/\s+/g, " ")
      .trim();
    expect(docToPlainText(editor.getJSON())).toBe(expected);
  });
});
