<script lang="ts">
  // 测试夹具:NoteDetailPanel 的 `journal` 是父层 prop,Svelte 5 不能在
  // mount 之后改 prop —— 用它包一层持有 $state,暴露 setJournal 供测试
  // 模拟「refresh 回灌同 id 新对象」时刻(2026-09-14 优化批)。
  import NoteDetailPanel from "./NoteDetailPanel.svelte";
  import type { Journal } from "../../lib/api";

  let journal = $state<Journal | null>(null);
  let onClose = $state<() => void>(() => {});
  let onChanged = $state<() => void>(() => {});
  let onCreated = $state<(j: Journal) => void>(() => {});

  export function setJournal(
    j: Journal | null,
    hooks?: {
      onClose?: () => void;
      onChanged?: () => void;
      onCreated?: (j: Journal) => void;
    },
  ) {
    journal = j;
    if (hooks?.onClose) onClose = hooks.onClose;
    if (hooks?.onChanged) onChanged = hooks.onChanged;
    if (hooks?.onCreated) onCreated = hooks.onCreated;
  }
</script>

<NoteDetailPanel {journal} {onClose} {onChanged} {onCreated} />
