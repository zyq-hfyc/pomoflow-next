<script lang="ts">
  // NoteDetailPanel 测试替身(2026-10-06 富文本批):与 RichTextEditor 同
  // props/实例契约的纯 textarea(含 reset 出口)。面板逻辑(草稿/失焦/
  // 校验/竞态)与 Tiptap 实现解耦测试 —— 编辑器行为见
  // richTextEditor.behavior.test.ts 与 RichTextEditor.test.ts。
  import { untrack } from "svelte";

  interface Props {
    content: string;
    placeholder?: string;
    autofocus?: boolean;
    onUpdate: (json: string, plainText: string) => void;
    onCommit: () => void;
  }
  let { content = "", placeholder = "", onUpdate, onCommit }: Props = $props();

  let local = $state(untrack(() => content));

  /** 与 RichTextEditor.reset 同语义(切目标/回滚时面板调用)。 */
  export function reset(c: string) {
    local = c;
  }
</script>

<textarea
  class="content"
  value={local}
  {placeholder}
  oninput={(e) => onUpdate(e.currentTarget.value, e.currentTarget.value)}
  onblur={() => onCommit()}
></textarea>
