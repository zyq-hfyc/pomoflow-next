<script lang="ts">
  // 座右铭卡片 —— 番茄钟主页底部展示,支持手动换一条。
  //
  // 轮播逻辑(与 v1 MottoCard.tsx 对齐):
  //   - 有自定义名言 → 优先逐条轮播自定义(每条只播一次,不重复);
  //     自定义全部播完一轮后,重置进度,允许重新轮播(新一轮)。
  //   - 无自定义名言 → 随机轮播内置名言。

  import { onMount } from "svelte";
  import { RefreshCw, Quote } from "lucide-svelte";
  import { BUILTIN_MOTTOS, randomBuiltin, type Motto as BuiltinMotto } from "../../lib/mottos";
  import * as api from "../../lib/api";
  import type { Motto as ApiMotto } from "../../lib/api";
  import { getDict } from "../../lib/i18n.svelte";
  import { mottoVersion } from "../../lib/mottoVersion.svelte";
import { syncState } from "../../lib/syncState.svelte";

  const t = $derived(getDict());

  let custom = $state<ApiMotto[]>([]);
  let playedIds = $state<Set<string>>(new Set());
  let current = $state<BuiltinMotto | null>(null);

  async function loadCustom() {
    try {
      custom = await api.listMottos();
    } catch {
      custom = [];
    }
  }

  onMount(() => {
    loadCustom();
  });

  // 设置页增删自定义名言 → 立即重拉(v1 storage 事件广播语义);
  // 同步拉到别端的名言库变化 → 也重拉
  $effect(() => {
    void mottoVersion.n;
    void syncState().rev;
    void loadCustom();
  });

  // 第一次拿到 custom 后初始化当前名言
  $effect(() => {
    if (current) return;
    if (custom.length > 0) {
      const m = custom[0];
      current = {
        text: m.text,
        author: m.author?.trim() ? m.author : t.settings.motto.defaultAuthor,
      };
      const next = new Set(playedIds);
      next.add(m.id);
      playedIds = next;
    } else {
      current = randomBuiltin();
    }
  });

  function next() {
    if (custom.length > 0) {
      let unplayed = custom.filter((c) => !playedIds.has(c.id));
      if (unplayed.length === 0) {
        // 自定义一轮轮完,重置进度
        playedIds = new Set();
        unplayed = custom;
      }
      const m = unplayed[0];
      current = {
        text: m.text,
        author: m.author?.trim() ? m.author : t.settings.motto.defaultAuthor,
      };
      const next = new Set(playedIds);
      next.add(m.id);
      playedIds = next;
    } else {
      current = randomBuiltin();
    }
  }
</script>

{#if current}
  <div class="motto-card">
    <div class="row">
      <span class="quote-icon"><Quote size={20} /></span>
      <div class="text-wrap">
        <div class="text">{current.text}</div>
        <div class="author">—— {current.author}</div>
      </div>
      <button
        type="button"
        class="refresh"
        onclick={next}
        aria-label={t.timer.mottoRefresh}
        title={t.timer.mottoRefresh}
      >
        <RefreshCw size={14} />
      </button>
    </div>
  </div>
{/if}

<style>
  .motto-card {
    width: 100%;
    background: color-mix(in srgb, var(--color-surface, #fff) 70%, transparent);
    border: 1px solid color-mix(in srgb, var(--color-border, #e5e2dd) 70%, transparent);
    border-radius: var(--radius-xl, 16px);
    padding: 1rem 1.25rem;
    backdrop-filter: blur(4px);
  }
  .row {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .quote-icon {
    color: var(--color-accent, #e74c3c);
    flex-shrink: 0;
    margin-top: 0.2rem;
    opacity: 0.8;
    display: inline-flex;
  }
  .text-wrap {
    flex: 1;
    min-width: 0;
  }
  .text {
    font-size: 1.05rem;
    font-weight: 500;
    color: var(--color-text, #1f1d1b);
    line-height: 1.6;
    font-family: "STKaiti", "KaiTi", "楷体", "PingFang SC", "Microsoft YaHei", serif;
  }
  .author {
    font-size: 0.85rem;
    color: var(--color-text-muted, #6b6864);
    margin-top: 0.25rem;
    text-align: right;
    font-family: "STKaiti", "KaiTi", "楷体", "PingFang SC", "Microsoft YaHei", serif;
  }
  .refresh {
    flex-shrink: 0;
    color: var(--color-text-muted, #6b6864);
    background: transparent;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    border-radius: 4px;
    transition: color 0.12s, background 0.12s;
  }
  .refresh:hover {
    color: var(--color-accent, #e74c3c);
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 10%, transparent);
  }
</style>