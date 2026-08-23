<script lang="ts">
  // 顶栏同步状态指示器:小图标 + 悬停详情。
  // 状态: syncing(旋转)/ ok(绿✓)/ error(红⚠)/ idle(灰·从未同步)
  // 点击 → 跳转设置→数据同步。

  import { RefreshCw, Check, AlertTriangle } from "lucide-svelte";
  import { getDict } from "../../lib/i18n.svelte";
  import { syncState } from "../../lib/syncState.svelte";
  import { navigate } from "../../lib/router.svelte";

  const t = $derived(getDict());
  const s = $derived(syncState());

  const status = $derived.by(() => {
    if (s.syncing) return "syncing" as const;
    if (!s.last) return "idle" as const;
    return s.last.ok ? ("ok" as const) : ("error" as const);
  });

  const tooltip = $derived.by(() => {
    const time = s.last ? new Date(s.last.at_ms).toLocaleTimeString() : "—";
    if (status === "syncing") return t.settings.sync.indicatorSyncing;
    if (status === "idle") return t.settings.sync.indicatorIdle;
    if (!s.last!.ok) return `${time} ${s.last!.error ?? ""}`;
    return `${time} ↑${s.last!.pushed} ↓${s.last!.pulled}`;
  });
</script>

<button
  type="button"
  class="sync-indicator {status}"
  title={tooltip}
  aria-label={t.settings.sync.title}
  onclick={() => navigate("/settings")}
>
  {#if status === "syncing"}
    <RefreshCw size={14} class="spin" />
  {:else if status === "ok"}
    <Check size={14} />
  {:else if status === "error"}
    <AlertTriangle size={14} />
  {:else}
    <RefreshCw size={14} class="dim" />
  {/if}
</button>

<style>
  .sync-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s;
  }
  .sync-indicator:hover {
    background: var(--color-neutral-100, #eee);
  }

  .sync-indicator.ok {
    color: #1d9e75;
  }
  .sync-indicator.error {
    color: #e24b4a;
  }
  .sync-indicator.syncing,
  .sync-indicator.idle {
    color: var(--color-text-muted);
  }

  .spin {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .dim {
    opacity: 0.4;
  }
</style>
