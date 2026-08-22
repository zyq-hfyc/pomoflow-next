<script lang="ts">
  // 设置 → 账号 tab 入口:未登录显示认证卡片;已登录显示账号管理中心。
  // 登录态以 SQLite meta 的 token 对为准(getSyncConfig().auth)。

  import { onMount } from "svelte";
  import { getDict } from "../../../lib/i18n.svelte";
  import { getSyncConfig, type AuthStatus } from "../../../lib/api";
  import AuthCard from "./AuthCard.svelte";
  import AccountCenter from "./AccountCenter.svelte";

  const t = $derived(getDict());

  let auth = $state<AuthStatus | null>(null);
  let loaded = $state(false);

  onMount(async () => {
    try {
      const cfg = await getSyncConfig();
      auth = cfg.auth;
    } catch {
      auth = null;
    } finally {
      loaded = true;
    }
  });

  function onLoggedIn(s: AuthStatus) {
    auth = s;
  }
  function onLoggedOut() {
    auth = null;
  }
</script>

<h2 class="tab-title">{t.settings.account.title}</h2>

{#if !loaded}
  <p class="loading">{t.common.loading}</p>
{:else if auth}
  <AccountCenter onLoggedOut={onLoggedOut} />
{:else}
  <AuthCard onLoggedIn={onLoggedIn} />
{/if}

<style>
  .tab-title {
    margin: 0 0 1.5rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text);
  }
  .loading {
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }
</style>
