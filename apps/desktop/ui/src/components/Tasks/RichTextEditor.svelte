<script lang="ts">
  // 富文本编辑器(2026-10-06 富文本批)—— 随手记编辑框的 Tiptap 实现,
  // 按《编辑器功能规格说明》落地:
  //   - 主工具栏:撤销/重做 + 段落样式/字号 + B/I/S/U + 颜色/高亮 +
  //     对齐×4 + 无序/有序/任务列表 + ⋯更多;
  //   - 更多菜单:链接 / 引用块 / 代码块 / 分隔线 / 表格(先行列数,
  //     光标在表格内追加行列操作)/ Ctrl+K 链接弹层;
  //   - Markdown 快捷输入(StarterKit + TaskItem 自带:# / - / 1. / > /
  //     ``` / --- / [ ] );
  //   - 自动保存:停笔 2 秒 + 失焦 + Ctrl+S → onCommit(草稿每 change
  //     即经 onUpdate 上报 JSON + 纯文本);
  //   - 占位文案(tiptap Placeholder,空内容显示)。
  //
  // 刻意不做(规格有、本批范围外):
  //   - 图片插入:base64 内联会撑爆 journal.content 20000 上限、同步
  //     载荷膨胀且移动端无法渲染 —— 待附件实体(存储+同步)设计后接入;
  //   - 置顶/收藏:journal 模型无 isPinned/isFavorite 字段,涉及
  //     schema + 同步协议,单独排批;
  //   - 公式:规格标「按需扩展」。
  //
  // 集成要点(面板/宿主必读):
  //   - content 只在挂载时消费(宿主用 {#key} 控制重挂载 —— 切目标
  //     或回滚草稿时改 key 即可);编辑器内部 doc 是唯一编辑真相;
  //   - editor 实例不放 $state:Svelte 5 深代理会弄坏 ProseMirror
  //     内部对象;工具栏激活态靠 version 事务计数触发重算;
  //   - 工具栏按钮一律 onmousedown preventDefault:不抢选区/焦点,
  //     有选区点按钮样式作用于选区才成立(规格 §2.3 行为要求)。

  import { onMount, untrack } from "svelte";
  import { Editor } from "@tiptap/core";
  import {
    Undo2,
    Redo2,
    Bold,
    Italic,
    Strikethrough,
    Underline as UnderlineIcon,
    List,
    ListOrdered,
    ListChecks,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Link2,
    Quote,
    Minus,
    Table as TableIcon,
    Code,
    MoreHorizontal,
  } from "lucide-svelte";
  import { buildExtensions } from "./richTextExtensions";
  import { contentToDoc } from "../../lib/richText";
  import { getDict } from "../../lib/i18n.svelte";

  interface Props {
    /** 初始内容(Tiptap JSON 串或旧纯文本);仅挂载时消费。 */
    content: string;
    placeholder?: string;
    autofocus?: boolean;
    /** 每次内容变更:上报 doc JSON 序列化串 + 提取的纯文本。 */
    onUpdate: (json: string, plainText: string) => void;
    /** 落库时机:停笔 2 秒 / 失焦 / Ctrl+S。 */
    onCommit: () => void;
  }

  let {
    content,
    placeholder = "",
    autofocus = false,
    onUpdate,
    onCommit,
  }: Props = $props();

  const t = $derived(getDict());
  const et = $derived(t.notes.editor);

  let editorEl = $state<HTMLElement | null>(null);
  let editor: Editor | null = null; // 刻意非响应式(见头注释)
  let version = $state(0); // 事务计数 → 工具栏激活态重算

  let moreOpen = $state(false);
  let linkOpen = $state(false);
  let linkUrl = $state("");
  let tableOpen = $state(false);
  let tableRows = $state(3);
  let tableCols = $state(3);

  let saveTimer: ReturnType<typeof setTimeout> | null = null;
  const AUTOSAVE_MS = 2000;

  function clearSaveTimer() {
    if (saveTimer !== null) {
      clearTimeout(saveTimer);
      saveTimer = null;
    }
  }
  /** 停笔 2 秒 → 落库。 */
  function scheduleCommit() {
    clearSaveTimer();
    saveTimer = setTimeout(() => {
      saveTimer = null;
      onCommit();
    }, AUTOSAVE_MS);
  }
  /** 立即落库(失焦/Ctrl+S),并取消防抖。 */
  function commitNow() {
    clearSaveTimer();
    onCommit();
  }

  /** 创建编辑器实例(首次挂载与 reset 重建共用)。 */
  function mountEditor(initContent: string, initialAutofocus: boolean) {
    editor = new Editor({
      element: editorEl!,
      extensions: buildExtensions(placeholder),
      content: contentToDoc(initContent),
      autofocus: initialAutofocus,
      editorProps: {
        attributes: { class: "rt-body" },
        handleKeyDown: (_view, event) => {
          const mod = event.ctrlKey || event.metaKey;
          if (mod && (event.key === "s" || event.key === "S")) {
            event.preventDefault();
            commitNow();
            return true;
          }
          if (mod && (event.key === "k" || event.key === "K")) {
            event.preventDefault();
            openLink();
            return true;
          }
          if (event.key === "Escape") {
            if (linkOpen || tableOpen || moreOpen) {
              closeAll();
              return true;
            }
          }
          return false;
        },
      },
      onUpdate: ({ editor: e }) => {
        version++;
        onUpdate(JSON.stringify(e.getJSON()), e.getText());
        scheduleCommit();
      },
      onSelectionUpdate: () => version++,
      onBlur: () => commitNow(),
    });
    version++;
  }

  onMount(() => {
    const init = untrack(() => content);
    mountEditor(init, autofocus);

    // Esc 关闭弹层(编辑器未聚焦时也要生效)。
    const onWindowKeydown = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onWindowKeydown);

    return () => {
      window.removeEventListener("keydown", onWindowKeydown);
      clearSaveTimer();
      editor?.destroy();
      editor = null;
    };
  });

  /**
   * 宿主重置内容(切换目标/回滚草稿时经 bind:this 调用)。
   * 销毁重建实例 —— ProseMirror history 无清空 API,只有重建才能保证
   * 上一篇的 undo 栈不穿越到本篇;重建后聚焦并把光标放到文末。
   * 新建落库回声场景**不要**调用 —— 草稿即库内值,重建会打断输入焦点。
   */
  export function reset(newContent: string) {
    if (!editorEl || !editor) return;
    editor.destroy();
    mountEditor(newContent, false);
    editor?.commands.focus("end");
  }

  /** 立即落库(宿主强制保存用,如页面隐藏前);取消在途防抖。 */
  export function flush() {
    commitNow();
  }

  /** 编辑器句柄(测试钩子;宿主勿直接用命令绕开 onUpdate/onCommit)。 */
  export function getEditor(): Editor | null {
    return editor;
  }

  // === 工具栏状态(经 version 触发重算;editor 未挂载时全部回落安全值)===
  function active(name: string, attrs?: Record<string, unknown>): boolean {
    void version;
    return editor?.isActive(name, attrs) ?? false;
  }
  function markAttr(mark: string, key: string): string {
    void version;
    const v = editor?.getAttributes(mark)[key];
    return typeof v === "string" ? v : "";
  }
  function canHistory(kind: "undo" | "redo"): boolean {
    void version;
    if (!editor) return false;
    return kind === "undo" ? editor.can().undo() : editor.can().redo();
  }

  function styleValue(): string {
    if (active("heading", { level: 1 })) return "h1";
    if (active("heading", { level: 2 })) return "h2";
    if (active("heading", { level: 3 })) return "h3";
    if (active("blockquote")) return "quote";
    return "p";
  }
  function fontSizeValue(): string {
    return markAttr("textStyle", "fontSize");
  }
  function colorValue(): string {
    const v = markAttr("textStyle", "color");
    return /^#[0-9a-fA-F]{6}$/.test(v) ? v : "#1f1d1b";
  }
  function highlightValue(): string {
    const v = markAttr("highlight", "color");
    return /^#[0-9a-fA-F]{6}$/.test(v) ? v : "#fef08a";
  }
  function alignActive(dir: "left" | "center" | "right" | "justify"): boolean {
    if (dir === "left") {
      // 左对齐是默认态:其余三者都不 active 即视为左对齐
      return (
        !active({ textAlign: "center" } as never) &&
        !active({ textAlign: "right" } as never) &&
        !active({ textAlign: "justify" } as never)
      );
    }
    void version;
    return editor?.isActive({ textAlign: dir }) ?? false;
  }

  /** 执行编辑器命令并刷新工具栏。 */
  function run(fn: (e: Editor) => void) {
    if (!editor) return;
    fn(editor);
    version++;
  }

  function applyStyle(v: string) {
    run((e) => {
      const c = e.chain().focus();
      if (v === "p") c.setParagraph().run();
      else if (v === "h1" || v === "h2" || v === "h3")
        c.toggleHeading({ level: Number(v[1]) as 1 | 2 | 3 }).run();
      else if (v === "quote") c.toggleBlockquote().run();
    });
  }
  function applyFontSize(v: string) {
    run((e) => {
      const c = e.chain().focus();
      if (v) c.setFontSize(v).run();
      else c.unsetFontSize().run();
    });
  }

  function closeAll() {
    moreOpen = false;
    linkOpen = false;
    tableOpen = false;
  }

  function openLink() {
    linkUrl = markAttr("link", "href");
    linkOpen = true;
    moreOpen = false;
    tableOpen = false;
  }
  function applyLink() {
    const url = linkUrl.trim();
    linkOpen = false;
    if (!editor || !url) return;
    run((e) => {
      if (e.state.selection.empty) {
        // 无选区:插入以 URL 为显示文本的链接节点(规格 §3 链接)
        e.chain()
          .focus()
          .insertContent({
            type: "text",
            text: url,
            marks: [{ type: "link", attrs: { href: url } }],
          })
          .run();
      } else {
        e.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
      }
    });
  }
  function removeLink() {
    linkOpen = false;
    run((e) => e.chain().focus().extendMarkRange("link").unsetLink().run());
  }

  function insertTable() {
    tableOpen = false;
    run((e) =>
      e
        .chain()
        .focus()
        .insertTable({
          rows: Math.max(1, Math.min(10, tableRows)),
          cols: Math.max(1, Math.min(8, tableCols)),
          withHeaderRow: true,
        })
        .run(),
    );
  }

  const FONT_SIZES = ["12px", "14px", "15px", "16px", "18px", "20px", "24px"];
</script>

<div class="rt-root">
  <!-- 主工具栏 -->
  <div class="rt-toolbar" role="toolbar" aria-label={et.aria}>
    <button
      type="button"
      class="rt-btn"
      title={et.undo}
      aria-label={et.undo}
      disabled={!canHistory("undo")}
      onmousedown={(e) => e.preventDefault()}
      onclick={() => run((e) => e.chain().focus().undo().run())}
    >
      <Undo2 size={17} />
    </button>
    <button
      type="button"
      class="rt-btn"
      title={et.redo}
      aria-label={et.redo}
      disabled={!canHistory("redo")}
      onmousedown={(e) => e.preventDefault()}
      onclick={() => run((e) => e.chain().focus().redo().run())}
    >
      <Redo2 size={17} />
    </button>

    <span class="rt-sep"></span>

    <select
      class="rt-select"
      title={et.style}
      aria-label={et.style}
      value={styleValue()}
      onchange={(e) => applyStyle(e.currentTarget.value)}
      onmousedown={(e) => e.stopPropagation()}
    >
      <option value="p">{et.styleParagraph}</option>
      <option value="h1">{et.styleH1}</option>
      <option value="h2">{et.styleH2}</option>
      <option value="h3">{et.styleH3}</option>
      <option value="quote">{et.styleQuote}</option>
    </select>
    <select
      class="rt-select"
      title={et.fontSize}
      aria-label={et.fontSize}
      value={fontSizeValue()}
      onchange={(e) => applyFontSize(e.currentTarget.value)}
      onmousedown={(e) => e.stopPropagation()}
    >
      <option value="">{et.fontSizeDefault}</option>
      {#each FONT_SIZES as s (s)}
        <option value={s}>{s.replace("px", "")}</option>
      {/each}
    </select>

    <span class="rt-sep"></span>

    <button
      type="button"
      class="rt-btn"
      class:on={active("bold")}
      title={et.bold}
      aria-label={et.bold}
      onmousedown={(e) => e.preventDefault()}
      onclick={() => run((e) => e.chain().focus().toggleBold().run())}
    >
      <Bold size={17} />
    </button>
    <button
      type="button"
      class="rt-btn"
      class:on={active("italic")}
      title={et.italic}
      aria-label={et.italic}
      onmousedown={(e) => e.preventDefault()}
      onclick={() => run((e) => e.chain().focus().toggleItalic().run())}
    >
      <Italic size={17} />
    </button>
    <button
      type="button"
      class="rt-btn"
      class:on={active("strike")}
      title={et.strike}
      aria-label={et.strike}
      onmousedown={(e) => e.preventDefault()}
      onclick={() => run((e) => e.chain().focus().toggleStrike().run())}
    >
      <Strikethrough size={17} />
    </button>
    <button
      type="button"
      class="rt-btn"
      class:on={active("underline")}
      title={et.underline}
      aria-label={et.underline}
      onmousedown={(e) => e.preventDefault()}
      onclick={() => run((e) => e.chain().focus().toggleUnderline().run())}
    >
      <UnderlineIcon size={17} />
    </button>

    <span class="rt-color" title={et.textColor}>
      <input
        type="color"
        class="rt-color-input"
        aria-label={et.textColor}
        value={colorValue()}
        onchange={(e) =>
          run((ed) => ed.chain().focus().setColor(e.currentTarget.value).run())}
      />
      <button
        type="button"
        class="rt-mini"
        title={et.colorReset}
        aria-label={et.colorReset}
        onmousedown={(e) => e.preventDefault()}
        onclick={() =>
          run((e) => e.chain().focus().unsetColor().removeEmptyTextStyle().run())}
        >×</button
      >
    </span>
    <span class="rt-color" title={et.highlight}>
      <input
        type="color"
        class="rt-color-input hl"
        class:on={active("highlight")}
        aria-label={et.highlight}
        value={highlightValue()}
        onchange={(e) =>
          run((ed) =>
            ed.chain().focus().setHighlight({ color: e.currentTarget.value }).run(),
          )}
      />
      <button
        type="button"
        class="rt-mini"
        title={et.highlightReset}
        aria-label={et.highlightReset}
        onmousedown={(e) => e.preventDefault()}
        onclick={() => run((e) => e.chain().focus().unsetHighlight().run())}
        >×</button
      >
    </span>

    <span class="rt-sep"></span>

    <button
      type="button"
      class="rt-btn"
      class:on={alignActive("left")}
      title={et.alignLeft}
      aria-label={et.alignLeft}
      onmousedown={(e) => e.preventDefault()}
      onclick={() => run((e) => e.chain().focus().unsetTextAlign().run())}
    >
      <AlignLeft size={17} />
    </button>
    <button
      type="button"
      class="rt-btn"
      class:on={alignActive("center")}
      title={et.alignCenter}
      aria-label={et.alignCenter}
      onmousedown={(e) => e.preventDefault()}
      onclick={() => run((e) => e.chain().focus().setTextAlign("center").run())}
    >
      <AlignCenter size={17} />
    </button>
    <button
      type="button"
      class="rt-btn"
      class:on={alignActive("right")}
      title={et.alignRight}
      aria-label={et.alignRight}
      onmousedown={(e) => e.preventDefault()}
      onclick={() => run((e) => e.chain().focus().setTextAlign("right").run())}
    >
      <AlignRight size={17} />
    </button>
    <button
      type="button"
      class="rt-btn"
      class:on={alignActive("justify")}
      title={et.alignJustify}
      aria-label={et.alignJustify}
      onmousedown={(e) => e.preventDefault()}
      onclick={() => run((e) => e.chain().focus().setTextAlign("justify").run())}
    >
      <AlignJustify size={17} />
    </button>

    <span class="rt-sep"></span>

    <button
      type="button"
      class="rt-btn"
      class:on={active("bulletList")}
      title={et.bulletList}
      aria-label={et.bulletList}
      onmousedown={(e) => e.preventDefault()}
      onclick={() => run((e) => e.chain().focus().toggleBulletList().run())}
    >
      <List size={17} />
    </button>
    <button
      type="button"
      class="rt-btn"
      class:on={active("orderedList")}
      title={et.orderedList}
      aria-label={et.orderedList}
      onmousedown={(e) => e.preventDefault()}
      onclick={() => run((e) => e.chain().focus().toggleOrderedList().run())}
    >
      <ListOrdered size={17} />
    </button>
    <button
      type="button"
      class="rt-btn"
      class:on={active("taskList")}
      title={et.taskList}
      aria-label={et.taskList}
      onmousedown={(e) => e.preventDefault()}
      onclick={() => run((e) => e.chain().focus().toggleTaskList().run())}
    >
      <ListChecks size={17} />
    </button>

    <button
      type="button"
      class="rt-btn"
      class:on={moreOpen}
      title={et.more}
      aria-label={et.more}
      onmousedown={(e) => e.preventDefault()}
      onclick={() => {
        moreOpen = !moreOpen;
        linkOpen = false;
        tableOpen = false;
      }}
    >
      <MoreHorizontal size={17} />
    </button>
  </div>

  <!-- 更多格式菜单(点击项即关并执行;Esc / 遮罩点击关闭) -->
  {#if moreOpen}
    <button
      type="button"
      class="rt-overlay"
      aria-label={et.cancel}
      onclick={() => (moreOpen = false)}
      tabindex="-1"
    ></button>
    <div class="rt-menu" role="menu">
      <button type="button" role="menuitem" onclick={openLink}>
        <Link2 size={15} /> {et.link}
      </button>
      <button
        type="button"
        role="menuitem"
        onclick={() => {
          moreOpen = false;
          run((e) => e.chain().focus().toggleBlockquote().run());
        }}
      >
        <Quote size={15} /> {et.quote}
      </button>
      <button
        type="button"
        role="menuitem"
        onclick={() => {
          moreOpen = false;
          run((e) => e.chain().focus().toggleCodeBlock().run());
        }}
      >
        <Code size={15} /> {et.codeBlock}
      </button>
      <button
        type="button"
        role="menuitem"
        onclick={() => {
          moreOpen = false;
          run((e) => e.chain().focus().setHorizontalRule().run());
        }}
      >
        <Minus size={15} /> {et.hr}
      </button>
      <button
        type="button"
        role="menuitem"
        onclick={() => {
          moreOpen = false;
          tableOpen = true;
        }}
      >
        <TableIcon size={15} /> {et.table}
      </button>
      {#if active("table")}
        <span class="rt-menu-sep"></span>
        <button
          type="button"
          role="menuitem"
          onclick={() => {
            moreOpen = false;
            run((e) => e.chain().focus().addRowAfter().run());
          }}>{et.tableAddRow}</button
        >
        <button
          type="button"
          role="menuitem"
          onclick={() => {
            moreOpen = false;
            run((e) => e.chain().focus().addColumnAfter().run());
          }}>{et.tableAddCol}</button
        >
        <button
          type="button"
          role="menuitem"
          onclick={() => {
            moreOpen = false;
            run((e) => e.chain().focus().deleteRow().run());
          }}>{et.tableDelRow}</button
        >
        <button
          type="button"
          role="menuitem"
          onclick={() => {
            moreOpen = false;
            run((e) => e.chain().focus().deleteColumn().run());
          }}>{et.tableDelCol}</button
        >
        <button
          type="button"
          role="menuitem"
          onclick={() => {
            moreOpen = false;
            run((e) => e.chain().focus().deleteTable().run());
          }}>{et.tableDelete}</button
        >
      {/if}
    </div>
  {/if}

  <!-- 链接弹层 -->
  {#if linkOpen}
    <button
      type="button"
      class="rt-overlay"
      aria-label={et.cancel}
      onclick={() => (linkOpen = false)}
      tabindex="-1"
    ></button>
    <div class="rt-dialog">
      <input
        class="rt-input"
        type="url"
        bind:value={linkUrl}
        placeholder={et.linkPlaceholder}
        aria-label={et.link}
        onkeydown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            applyLink();
          }
        }}
      />
      <button type="button" class="rt-ok" onclick={applyLink}>{et.apply}</button>
      {#if active("link")}
        <button type="button" class="rt-link-del" onclick={removeLink}>
          {et.linkRemove}
        </button>
      {/if}
    </div>
  {/if}

  <!-- 表格尺寸弹层 -->
  {#if tableOpen}
    <button
      type="button"
      class="rt-overlay"
      aria-label={et.cancel}
      onclick={() => (tableOpen = false)}
      tabindex="-1"
    ></button>
    <div class="rt-dialog">
      <label class="rt-num">
        {et.tableRows}
        <input type="number" min="1" max="10" bind:value={tableRows} />
      </label>
      <label class="rt-num">
        {et.tableCols}
        <input type="number" min="1" max="8" bind:value={tableCols} />
      </label>
      <button type="button" class="rt-ok" onclick={insertTable}>{et.insert}</button>
    </div>
  {/if}

  <!-- 编辑区(Tiptap 挂载点) -->
  <div class="rt-editor" bind:this={editorEl}></div>
</div>

<style>
  .rt-root {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: var(--radius-lg, 12px);
    background: var(--color-surface, #fff);
  }
  .rt-root:focus-within {
    border-color: var(--color-accent, #e74c3c);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent, #e74c3c) 12%, transparent);
  }

  .rt-toolbar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2px;
    padding: 0.3rem 0.5rem;
    border-bottom: 1px solid var(--color-border, #e5e2dd);
  }
  .rt-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--color-text, #1f1d1b);
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
  }
  .rt-btn:hover:not(:disabled) {
    background: var(--color-bg, #fafaf7);
  }
  .rt-btn:disabled {
    opacity: 0.35;
    cursor: default;
  }
  .rt-btn.on {
    background: var(--color-accent, #e74c3c);
    color: #fff;
  }
  .rt-sep {
    width: 1px;
    height: 18px;
    background: var(--color-border, #e5e2dd);
    margin: 0 4px;
  }
  .rt-select {
    font-size: 0.78rem;
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: 8px;
    padding: 0.2rem 0.35rem;
    background: var(--color-surface, #fff);
    color: var(--color-text, #1f1d1b);
    outline: none;
  }
  .rt-color {
    display: inline-flex;
    align-items: center;
  }
  .rt-color-input {
    width: 26px;
    height: 26px;
    padding: 2px;
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
  }
  .rt-color-input.hl {
    border-bottom: 3px solid #fde047;
  }
  .rt-color-input.hl.on {
    border-color: var(--color-accent, #e74c3c);
  }
  .rt-mini {
    border: none;
    background: transparent;
    color: var(--color-text-muted, #6b6864);
    cursor: pointer;
    font-size: 0.8rem;
    padding: 0 2px;
  }
  .rt-mini:hover {
    color: var(--color-accent, #e74c3c);
  }

  .rt-overlay {
    position: fixed;
    inset: 0;
    z-index: 40;
    background: transparent;
    border: none;
    cursor: default;
  }
  .rt-menu {
    position: absolute;
    top: 2.4rem;
    right: 0.5rem;
    z-index: 50;
    display: flex;
    flex-direction: column;
    min-width: 150px;
    padding: 0.3rem;
    background: var(--color-surface, #fff);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: 8px;
    box-shadow: var(--shadow-md, 0 6px 20px rgba(0, 0, 0, 0.1));
  }
  .rt-menu > button {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.4rem 0.55rem;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--color-text, #1f1d1b);
    font-size: 0.82rem;
    cursor: pointer;
    text-align: left;
  }
  .rt-menu > button:hover {
    background: var(--color-bg, #fafaf7);
  }
  .rt-menu-sep {
    height: 1px;
    background: var(--color-border, #e5e2dd);
    margin: 0.25rem 0;
  }
  .rt-dialog {
    position: absolute;
    top: 2.4rem;
    right: 0.5rem;
    z-index: 50;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.55rem;
    background: var(--color-surface, #fff);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: 8px;
    box-shadow: var(--shadow-md, 0 6px 20px rgba(0, 0, 0, 0.1));
  }
  .rt-input {
    font-size: 0.82rem;
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: 8px;
    padding: 0.3rem 0.5rem;
    width: 210px;
    outline: none;
    background: var(--color-surface, #fff);
    color: var(--color-text, #1f1d1b);
  }
  .rt-num {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.8rem;
    color: var(--color-text-muted, #6b6864);
  }
  .rt-num input {
    width: 3rem;
    font-size: 0.82rem;
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: 8px;
    padding: 0.25rem 0.35rem;
    outline: none;
  }
  .rt-ok {
    font-size: 0.8rem;
    padding: 0.3rem 0.65rem;
    border: none;
    border-radius: 8px;
    background: var(--color-accent, #e74c3c);
    color: #fff;
    cursor: pointer;
  }
  .rt-link-del {
    font-size: 0.78rem;
    border: none;
    background: transparent;
    color: var(--color-text-muted, #6b6864);
    cursor: pointer;
  }
  .rt-link-del:hover {
    color: var(--color-accent, #e74c3c);
  }

  /* 编辑区(ProseMirror) */
  .rt-editor {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 0.75rem 0.9rem 2.5rem;
  }
  .rt-editor :global(.ProseMirror) {
    outline: none;
    min-height: 10rem;
    font-size: 0.9rem;
    line-height: 1.65;
    color: var(--color-text, #1f1d1b);
  }
  /* 占位文案(tiptap Placeholder 标记) */
  .rt-editor :global(.ProseMirror p.is-editor-empty:first-child::before) {
    content: attr(data-placeholder);
    color: #a0a0a0;
    float: left;
    height: 0;
    pointer-events: none;
  }
  .rt-editor :global(.ProseMirror h1) {
    font-size: 1.5rem;
    margin: 0.6em 0 0.3em;
  }
  .rt-editor :global(.ProseMirror h2) {
    font-size: 1.25rem;
    margin: 0.6em 0 0.3em;
  }
  .rt-editor :global(.ProseMirror h3) {
    font-size: 1.1rem;
    margin: 0.6em 0 0.3em;
  }
  .rt-editor :global(.ProseMirror p) {
    margin: 0.25em 0;
  }
  .rt-editor :global(.ProseMirror blockquote) {
    border-left: 3px solid var(--color-border, #e5e2dd);
    margin: 0.4em 0;
    padding: 0.1em 0 0.1em 0.8em;
    color: var(--color-text-muted, #6b6864);
  }
  .rt-editor :global(.ProseMirror hr) {
    border: none;
    border-top: 1px solid var(--color-border, #e5e2dd);
    margin: 0.8em 0;
  }
  .rt-editor :global(.ProseMirror pre) {
    background: var(--color-bg, #fafaf7);
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: 8px;
    padding: 0.6rem 0.75rem;
    font-size: 0.82rem;
    overflow-x: auto;
  }
  .rt-editor :global(.ProseMirror code) {
    background: var(--color-bg, #fafaf7);
    border-radius: 4px;
    padding: 0.1em 0.3em;
    font-size: 0.85em;
  }
  .rt-editor :global(.ProseMirror a) {
    color: var(--color-accent, #e74c3c);
    text-decoration: underline;
    cursor: pointer;
  }
  .rt-editor :global(.ProseMirror ul[data-type="taskList"]) {
    list-style: none;
    padding-left: 0.2rem;
  }
  .rt-editor :global(.ProseMirror ul[data-type="taskList"] li) {
    display: flex;
    gap: 0.45rem;
    align-items: flex-start;
  }
  .rt-editor :global(.ProseMirror ul[data-type="taskList"] li > label) {
    margin-top: 0.2rem;
    user-select: none;
  }
  .rt-editor :global(.ProseMirror ul[data-type="taskList"] li[data-checked="true"] > div) {
    text-decoration: line-through;
    color: var(--color-text-muted, #6b6864);
  }
  .rt-editor :global(.ProseMirror table) {
    border-collapse: collapse;
    margin: 0.5em 0;
    width: 100%;
  }
  .rt-editor :global(.ProseMirror th),
  .rt-editor :global(.ProseMirror td) {
    border: 1px solid var(--color-border, #e5e2dd);
    padding: 0.35rem 0.5rem;
    font-size: 0.85rem;
    text-align: left;
    vertical-align: top;
  }
  .rt-editor :global(.ProseMirror th) {
    background: var(--color-bg, #fafaf7);
    font-weight: 600;
  }
  .rt-editor :global(.ProseMirror .selectedCell) {
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 8%, transparent);
  }
</style>
