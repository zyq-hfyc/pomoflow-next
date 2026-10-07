//! 富文本内容工具(2026-10-06 富文本批)—— 随手记 content 的 Tiptap JSON
//! 存储格式与旧纯文本数据的互转/探测/摘要提取。
//!
//! 存储契约:
//! - journal.content 是字符串。新富文本 = Tiptap doc JSON 序列化串;
//!   旧数据 = 纯文本(无标记升级迁移,读时判别)。
//! - 判别:可 JSON.parse 且 { type: "doc" } → 富文本,否则纯文本。
//! - 纯文本打开时包装成 doc(每个非空行一段),首次保存即升级为 JSON。
//! - 列表卡片摘要 / 搜索匹配走 docToPlainText,绝不直接展示 JSON 原文。
//!
//! 本文件零依赖(不 import tiptap),保证纯函数可单测;FontSize 等编辑器
//! 扩展在 components/Tasks/richTextExtensions.ts。

/** Tiptap doc 的最小结构约束(深遍历只用 type/content/text)。 */
interface DocNode {
  type?: string;
  content?: DocNode[];
  text?: string;
}

/** content 是否为 Tiptap doc JSON 串。 */
export function isRichDoc(content: string | null | undefined): boolean {
  if (!content) return false;
  const s = content.trimStart();
  if (!s.startsWith("{")) return false;
  try {
    const v = JSON.parse(s);
    return !!v && typeof v === "object" && v.type === "doc";
  } catch {
    return false;
  }
}

/**
 * content(JSON 或纯文本)→ Tiptap doc 对象(编辑器 initialContent 用)。
 * 纯文本按行拆段落;空内容 → 单空段落 doc。
 */
export function contentToDoc(content: string | null | undefined): Record<string, unknown> {
  if (isRichDoc(content)) return JSON.parse(content as string);
  const text = (content ?? "").trim();
  if (!text) return { type: "doc", content: [{ type: "paragraph" }] };
  return {
    type: "doc",
    content: text
      .split(/\r?\n/)
      .map((line) =>
        line.length > 0
          ? { type: "paragraph", content: [{ type: "text", text: line }] }
          : { type: "paragraph" },
      ),
  };
}

/**
 * doc JSON(对象或序列化串)→ 纯文本。深遍历 text 节点,块级节点之间
 * 补一个空格(列表/标题不与正文粘连);非法输入回空串。
 */
export function docToPlainText(doc: unknown): string {
  let root: DocNode | null = null;
  if (typeof doc === "string") {
    try {
      root = JSON.parse(doc) as DocNode;
    } catch {
      return "";
    }
  } else if (doc && typeof doc === "object") {
    root = doc as DocNode;
  }
  if (!root) return "";
  const parts: string[] = [];
  const walk = (node: DocNode) => {
    if (typeof node.text === "string") parts.push(node.text);
    for (const child of node.content ?? []) {
      walk(child);
      // 块级容器(非 text)的子树结束后补空格分隔
      if (child.type && child.type !== "text") parts.push(" ");
    }
  };
  walk(root);
  return parts.join("").replace(/\s+/g, " ").trim();
}

/**
 * 列表卡片摘要:富文本提取纯文本,纯文本原样;压平空白后按 maxLen 截断。
 */
export function journalPreview(content: string | null | undefined, maxLen = 140): string {
  const plain = isRichDoc(content)
    ? docToPlainText(JSON.parse(content as string))
    : (content ?? "").replace(/\s+/g, " ").trim();
  if (plain.length <= maxLen) return plain;
  return plain.slice(0, maxLen).trimEnd() + "…";
}

/**
 * 「有可见内容」判定:纯文本看 trim;富文本看提取出的纯文本是否非空
 * (只有空段落/无 text 节点的 doc 视为空 —— 新建草稿「至少填一项」口径)。
 */
export function hasVisibleContent(content: string | null | undefined): boolean {
  if (!content) return false;
  if (isRichDoc(content)) return docToPlainText(JSON.parse(content)).length > 0;
  return content.trim().length > 0;
}

/**
 * content(JSON 或纯文本)→ 完整纯文本(不截断)。
 * 面板校验/回滚用;摘要截断请用 journalPreview。
 */
export function contentPlainText(content: string | null | undefined): string {
  if (!content) return "";
  if (isRichDoc(content)) return docToPlainText(JSON.parse(content));
  return content;
}
