//! Tiptap 编辑器扩展(2026-10-06 富文本批)—— FontSize(字号)+ 统一扩展工厂。
//!
//! 官方没有字号扩展:通过 TextStyle 全局属性 `fontSize` 实现
//! (`<span style="font-size: 15px">`),配套 setFontSize/unsetFontSize
//! 命令。color 由 @tiptap/extension-color 走同一 textStyle 通道。
//!
//! buildExtensions 是组件与 headless 测试共用的单一来源:RichTextEditor
//! 挂载与行为测试(richTextEditor.behavior.test.ts)用同一份配置,防止
//! 「测试测的是另一套扩展」式漂移。

import { Extension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Placeholder from "@tiptap/extension-placeholder";
import type { AnyExtension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      /** 设置字号(如 "15px");无选区时作用于后续输入。 */
      setFontSize: (size: string) => ReturnType;
      /** 清除字号(回默认)。 */
      unsetFontSize: () => ReturnType;
    };
  }
}

export const FontSize = Extension.create<{ types: string[] }>({
  name: "fontSize",

  addOptions() {
    return { types: ["textStyle"] };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element: HTMLElement) => element.style.fontSize || null,
            renderHTML: (attributes: Record<string, unknown>) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize as string}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (size) =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontSize: size }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          // 清完字号顺手移除全空 textStyle 残留(否则留
          // {color:null,fontSize:null} 空 mark 进 JSON)
          chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run(),
    };
  },
});

/**
 * 编辑器扩展全集(组件与 headless 测试共用)。
 *
 * 覆盖规格:段落/标题1-3/引用/代码块(StarterKit)、B/I/S/U、颜色、高亮、
 * 字号、对齐、无序/有序/任务列表(可嵌套 + `[] ` 输入规则)、链接、分隔线、
 * 表格、Markdown 快捷输入(StarterKit 自带)、撤销重做(history)、占位文案。
 * 图片刻意缺席 —— base64 内联会撑爆 journal.content 20000 上限且移动端
 * 无法渲染,留待附件实体设计后接入(见 RichTextEditor 头注释)。
 */
export function buildExtensions(placeholder: string): AnyExtension[] {
  return [
    StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
    Underline,
    TaskList,
    TaskItem.configure({ nested: true }),
    Link.configure({ openOnClick: false }),
    Highlight.configure({ multicolor: true }),
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    TextStyle,
    Color,
    FontSize,
    Table.configure({ resizable: false }),
    TableRow,
    TableHeader,
    TableCell,
    Placeholder.configure({ placeholder }),
  ];
}
