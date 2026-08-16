<script lang="ts">
  // 标签多选 —— chip 列表,点一下切换选中。
  //
  // 用法:
  //   <TagPicker
  //     tags={allTags}
  //     selected={selectedIds}
  //     onChange={(ids) => selectedIds = ids}
  //   />
  //
  // 设计要点:
  //   - 不调用后端,只暴露 onChange;父组件负责 set_tags_for_task 持久化。
  //   - chip 颜色取 tag.color(空字符串回落到 --color-accent)。
  //   - 选中态加 ✓;空选中列表允许。
  //   - 无 tags 时显示提示语,不报错。

  import type { Tag } from "../../lib/api";
  import { getDict } from "../../lib/i18n.svelte";

  const t = $derived(getDict());

  interface Props {
    tags: Tag[];
    selected: string[];
    onChange: (next: string[]) => void;
  }

  let { tags, selected, onChange }: Props = $props();

  const selectedSet = $derived(new Set(selected));

  function toggle(id: string) {
    const next = new Set(selectedSet);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange([...next]);
  }

  function chipStyle(color: string | null | undefined): string {
    const c = color && color.length > 0 ? color : "var(--color-accent)";
    return `--chip-color: ${c};`;
  }
</script>

{#if tags.length === 0}
  <div class="empty">{t.task.detailNoTagsAvailable}</div>
{:else}
  <div class="chips" role="group" aria-label={t.task.tagPickerAria}>
    {#each tags as tag (tag.id)}
      {@const isOn = selectedSet.has(tag.id)}
      <button
        type="button"
        class="chip"
        class:on={isOn}
        style={chipStyle(tag.color)}
        onclick={() => toggle(tag.id)}
        aria-pressed={isOn}
      >
        {#if isOn}<span class="check">✓</span>{/if}
        <span class="name">{tag.name}</span>
      </button>
    {/each}
  </div>
{/if}

<style>
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .empty {
    font-size: 0.8rem;
    color: var(--color-text-muted);
    padding: 0.5rem 0;
  }
  .chip {
    --chip-color: var(--color-accent);
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.7rem;
    border-radius: 999px;
    border: 1px solid var(--chip-color);
    background: transparent;
    color: var(--chip-color);
    font-size: 0.8rem;
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
  }
  .chip:hover {
    background: color-mix(in srgb, var(--chip-color) 12%, transparent);
  }
  .chip.on {
    background: var(--chip-color);
    color: #fff;
  }
  .check {
    font-weight: 700;
    font-size: 0.75rem;
  }
  .name {
    line-height: 1;
  }
</style>