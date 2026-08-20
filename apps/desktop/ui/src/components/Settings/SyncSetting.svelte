<script lang="ts">
  // 设置页「数据同步」标签(P1a)—— 服务器连接 / 本机标识 / 立即同步。
  //
  // 配置(服务器地址 + Token)存 SQLite meta(与 Rust 侧同步引擎同侧);
  // 本机标识的 user_id 需要用户填进服务端 .env 的 SYNC_USER_ID(两端一致,
  // 否则服务端 403),所以这里展示 + 一键复制。
  // 「立即同步」走 sync_now 命令:push 推到清空 → pull 拉到空批 → 游标推进。

  import { onMount } from "svelte";
  import { RefreshCw } from "lucide-svelte";
  import {
    getSyncConfig,
    setSyncConfig,
    getSyncIdentity,
    syncNow,
  } from "../../lib/api";
  import { getDict, fmt } from "../../lib/i18n.svelte";

  const t = $derived(getDict());

  let serverUrl = $state("");
  let token = $state("");
  let identity = $state<{ user_id: string; device_id: string } | null>(null);

  let savedFlash = $state(false);
  let syncing = $state(false);
  let resultText = $state("");
  let error = $state<string | null>(null);
  let copiedField = $state<"user" | "device" | null>(null);

  onMount(async () => {
    try {
      const [cfg, id] = await Promise.all([getSyncConfig(), getSyncIdentity()]);
      serverUrl = cfg.server_url ?? "";
      token = cfg.token ?? "";
      identity = id;
    } catch (e) {
      error = String(e);
    }
  });

  async function save() {
    error = null;
    savedFlash = false;
    try {
      await setSyncConfig(serverUrl || null, token || null);
      savedFlash = true;
      setTimeout(() => (savedFlash = false), 1500);
    } catch (e) {
      error = String(e);
    }
  }

  async function copy(text: string, field: "user" | "device") {
    try {
      await navigator.clipboard.writeText(text);
      copiedField = field;
      setTimeout(() => (copiedField = null), 1200);
    } catch {
      // 剪贴板不可用时静默(可手动选中复制)
    }
  }

  async function onSyncNow() {
    if (syncing) return;
    if (!serverUrl.trim() || !token.trim()) {
      error = t.settings.sync.notConfigured;
      return;
    }
    syncing = true;
    error = null;
    resultText = "";
    try {
      const r = await syncNow();
      resultText = fmt(t.settings.sync.result, {
        pushed: r.pushed,
        pulled: r.pulled,
        conflicts: r.conflicts,
        dropped: r.dropped,
      });
    } catch (e) {
      error = String(e);
    } finally {
      syncing = false;
    }
  }
</script>

<div>
  <h2 class="tab-title">{t.settings.sync.title}</h2>

  <!-- 服务器连接 -->
  <section class="group">
    <h3 class="group-title">{t.settings.sync.serverSection}</h3>
    <div class="group-body">
      <div class="form-row">
        <span class="row-label">{t.settings.sync.serverUrl}</span>
        <input
          class="input"
          type="text"
          bind:value={serverUrl}
          placeholder={t.settings.sync.serverUrlPh}
          spellcheck="false"
        />
      </div>
      <div class="form-row">
        <span class="row-label">{t.settings.sync.token}</span>
        <input
          class="input"
          type="password"
          bind:value={token}
          placeholder={t.settings.sync.tokenPh}
          spellcheck="false"
          autocomplete="off"
        />
      </div>
      <div class="form-row">
        <span class="row-label"></span>
        <div class="actions">
          <button type="button" class="action" onclick={() => void save()}>
            {savedFlash ? t.settings.sync.saved : t.settings.sync.save}
          </button>
          <button
            type="button"
            class="action primary"
            disabled={syncing}
            onclick={() => void onSyncNow()}
          >
            <RefreshCw size={14} class={syncing ? "spin" : ""} />
            {syncing ? t.settings.sync.syncing : t.settings.sync.syncNow}
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- 本机标识 -->
  <section class="group">
    <h3 class="group-title">{t.settings.sync.identitySection}</h3>
    <div class="group-body">
      <div class="form-row">
        <span class="row-label">{t.settings.sync.userId}</span>
        <div class="id-cell">
          <code class="id-text">{identity?.user_id ?? "…"}</code>
          <button
            type="button"
            class="copy"
            onclick={() => identity && void copy(identity.user_id, "user")}
          >
            {copiedField === "user" ? t.settings.sync.copied : t.settings.sync.copy}
          </button>
        </div>
      </div>
      <div class="form-row">
        <span class="row-label">{t.settings.sync.deviceId}</span>
        <div class="id-cell">
          <code class="id-text">{identity?.device_id ?? "…"}</code>
          <button
            type="button"
            class="copy"
            onclick={() => identity && void copy(identity.device_id, "device")}
          >
            {copiedField === "device" ? t.settings.sync.copied : t.settings.sync.copy}
          </button>
        </div>
      </div>
      <p class="hint">{t.settings.sync.identityHint}</p>
    </div>
  </section>

  {#if resultText}
    <div class="result" role="status">{resultText}</div>
  {/if}
  {#if error}
    <div class="error" role="alert">⚠ {error}</div>
  {/if}
</div>

<style>
  .tab-title {
    margin: 0 0 1.5rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .group {
    margin-bottom: 1.5rem;
  }
  .group:last-of-type {
    margin-bottom: 0;
  }
  .group-title {
    margin: 0 0 0.5rem;
    padding: 0 0.25rem;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-muted);
  }
  .group-body {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    background: var(--color-surface);
    overflow: hidden;
  }
  .form-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 1.5rem;
    padding: 0.75rem 1rem;
    min-height: 56px;
  }
  .form-row + .form-row {
    border-top: 1px solid var(--color-border);
  }
  .row-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
  }

  .input {
    width: 100%;
    max-width: 320px;
    padding: 0.35rem 0.6rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.15s;
  }
  .input:focus {
    border-color: var(--color-accent-400);
    box-shadow: var(--shadow-focus);
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }
  .action {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.4rem 1rem;
    border: 1px solid var(--color-accent-500);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    color: var(--color-accent-600);
    cursor: pointer;
    font-size: 0.85rem;
    transition: background 0.15s, color 0.15s, opacity 0.15s;
  }
  .action:hover {
    background: var(--color-accent-500);
    color: #fff;
  }
  .action.primary {
    background: var(--color-accent-500);
    color: #fff;
  }
  .action.primary:hover {
    background: var(--color-accent-600);
  }
  .action:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .id-cell {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }
  .id-text {
    font-family: var(--font-family-num, monospace);
    font-size: 0.75rem;
    color: var(--color-text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 260px;
  }
  .copy {
    border: none;
    background: transparent;
    color: var(--color-accent-600);
    font-size: 0.75rem;
    cursor: pointer;
    padding: 0.15rem 0.35rem;
    border-radius: 4px;
    flex-shrink: 0;
  }
  .copy:hover {
    background: var(--color-accent-50);
  }

  .hint {
    margin: 0.75rem 0 0;
    padding: 0 0.25rem;
    font-size: 0.75rem;
    line-height: 1.6;
    color: var(--color-text-muted);
  }

  .result {
    margin-top: 1rem;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-lg);
    background: color-mix(in srgb, var(--color-accent-500) 8%, transparent);
    color: var(--color-accent-700);
    font-size: 0.85rem;
  }

  .error {
    margin-top: 1rem;
    color: #991b1b;
    background: #fee2e2;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-lg);
    font-size: 0.875rem;
  }

  .spin {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
