<script lang="ts">
  // 账号页(一级导航,位于「帮助与反馈」前)。
  //
  // 布局与设置页同款(页面级左菜单 + 右内容区,视觉语言统一):
  // - 已登录:菜单头部 = 头像+昵称+邮箱;菜单项 = 个人资料/安全设置/第三方账号/
  //   登录设备/账号注销;底部 = 退出登录;右侧 = AccountCenter 对应分区。
  // - 未登录:菜单头部 = 「登录 | 注册」;菜单项只有「账号」;右侧 = 认证卡片
  //   (登录 / 注册 / 找回密码)居中,留白充足。
  // 登录成功 / 退出登录 → 就地切换形态,不跳路由;顶栏头像同步(accountState)。

  import { onMount } from "svelte";
  import {
    UserRound,
    ShieldCheck,
    Link2,
    MonitorSmartphone,
    TriangleAlert,
    LogOut,
  } from "lucide-svelte";
  import { getDict } from "../lib/i18n.svelte";
  import { authGetProfile, authLogout, type AuthStatus, type AccountProfile } from "../lib/api";
  import {
    accountState,
    loadAccountState,
    setAccountUser,
    refreshAvatar,
  } from "../lib/accountState.svelte";
  import AuthCard from "../components/Settings/Account/AuthCard.svelte";
  import AccountCenter from "../components/Settings/Account/AccountCenter.svelte";

  const t = $derived(getDict());
  const acct = $derived(accountState());

  type Section = "profile" | "security" | "thirdparty" | "devices" | "danger";
  let section = $state<Section>("profile");
  let profile = $state<AccountProfile | null>(null);
  let loggingOut = $state(false);
  let staleNotice = $state("");

  const display = $derived(profile?.display_name || profile?.username || "…");

  async function loadProfile() {
    try {
      profile = await authGetProfile();
    } catch {
      profile = null;
    }
  }

  const menuItems = $derived<{ key: Section; icon: unknown; label: string; danger?: boolean }[]>([
    { key: "profile", icon: UserRound, label: t.settings.account.profile },
    { key: "security", icon: ShieldCheck, label: t.settings.account.security },
    { key: "thirdparty", icon: Link2, label: t.settings.account.thirdparty },
    { key: "devices", icon: MonitorSmartphone, label: t.settings.account.devices },
    { key: "danger", icon: TriangleAlert, label: t.settings.account.dangerZone, danger: true },
  ]);

  onMount(async () => {
    await loadAccountState();
    // 登录态自愈:本地 meta 记着"已登录",但服务端账号可能已被清库/注销/
    // 重置密码全端踢出 —— 主动核验一次;服务端明确拒绝则清本地登录态。
    // (网络不通/未配服务器不视为失效,保留离线容忍)
    if (acct.user) {
      try {
        await authGetProfile();
        await loadProfile();
      } catch (e) {
        const msg = String(e);
        const offline = msg.includes("网络错误") || msg.includes("保存服务器地址");
        if (!offline) {
          await authLogout().catch(() => {});
          setAccountUser(null);
          staleNotice = t.settings.account.staleLoginCleared;
        }
      }
    }
  });

  function onLoggedIn(s: AuthStatus) {
    setAccountUser(s);
    void refreshAvatar();
    section = "profile";
    void loadProfile();
  }

  async function onLogout() {
    if (loggingOut) return;
    loggingOut = true;
    try {
      await authLogout();
      setAccountUser(null);
      profile = null;
    } finally {
      loggingOut = false;
    }
  }
</script>

<svelte:head>
  <title>{t.page.account}</title>
</svelte:head>

<div class="account-page page-veil">
  {#if staleNotice}<div class="stale" role="status">⚠ {staleNotice}</div>{/if}

  <!-- 左侧菜单(与设置页同款视觉) -->
  <aside class="menu">
    <div class="menu-header">
      {#if acct.user}
        <div class="menu-avatar">
          {#if acct.avatar}
            <img src={acct.avatar ?? ""} alt="" />
          {:else}
            {display.slice(0, 1).toUpperCase()}
          {/if}
        </div>
        <div class="menu-name">{display}</div>
        <div class="menu-sub">{profile?.email ?? profile?.username ?? "…"}</div>
      {:else}
        <div class="menu-avatar ghost"><UserRound size={18} /></div>
        <div class="menu-name">
          {t.settings.account.tabLogin} | {t.settings.account.tabRegister}
        </div>
      {/if}
    </div>

    <nav class="menu-nav">
      {#if acct.user}
        {#each menuItems as item (item.key)}
          {@const active = section === item.key}
          <button
            type="button"
            class="menu-item"
            class:active
            class:danger={item.danger}
            aria-current={active ? "true" : undefined}
            onclick={() => (section = item.key)}
          >
            {#if active}<span class="indicator" aria-hidden="true"></span>{/if}
            <item.icon size={16} />
            {item.label}
          </button>
        {/each}
      {:else}
        <button type="button" class="menu-item active" aria-current="true">
          <span class="indicator" aria-hidden="true"></span>
          <UserRound size={16} />
          {t.settings.account.title}
        </button>
      {/if}
    </nav>

    {#if acct.user}
      <div class="menu-footer">
        <button
          type="button"
          class="menu-item logout"
          disabled={loggingOut}
          onclick={() => void onLogout()}
        >
          <LogOut size={16} />
          {loggingOut ? t.settings.sync.loggingOut : t.settings.sync.logout}
        </button>
      </div>
    {/if}
  </aside>

  <!-- 右侧内容区 -->
  <main class="content">
    {#if acct.loaded && acct.user}
      <AccountCenter {profile} {section} reloadProfile={loadProfile} />
    {:else if acct.loaded}
      <div class="auth-holder">
        <AuthCard onLoggedIn={onLoggedIn} />
      </div>
    {:else}
      <p class="loading">{t.common.loading}</p>
    {/if}
  </main>
</div>

<style>
  /* 布局:与设置页同款(上为横排、宽屏左右分栏) */
  .account-page {
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--topbar-height, 43px));
    overflow: hidden;
  }
  @media (min-width: 1024px) {
    .account-page {
      flex-direction: row;
    }
  }

  .stale {
    position: absolute;
    top: 0.75rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    padding: 0.5rem 0.9rem;
    border-radius: 8px;
    background: #fef3c7;
    color: #92400e;
    font-size: 0.78rem;
    box-shadow: var(--shadow-sm);
  }

  /* ===== 左侧菜单(样式对齐 SettingsPage)===== */
  .menu {
    flex-shrink: 0;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: 1rem 0.5rem;
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 1024px) {
    .menu {
      width: 224px;
      border-bottom: none;
      border-right: 1px solid var(--color-border);
    }
  }

  .menu-header {
    padding: 0.5rem 0.75rem 1rem;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 0.75rem;
  }
  .menu-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--color-accent-500) 14%, transparent);
    color: var(--color-accent-600);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }
  .menu-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .menu-avatar.ghost {
    color: var(--color-text-muted);
    background: var(--color-neutral-100, #eee);
  }
  .menu-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .menu-sub {
    font-size: 0.72rem;
    color: var(--color-text-muted);
    margin-top: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .menu-nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
  }
  .menu-item {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: var(--radius-lg);
    background: transparent;
    color: var(--color-text-muted);
    font-size: 0.875rem;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .menu-item:hover {
    background: var(--color-neutral-50);
    color: var(--color-text);
  }
  .menu-item.active {
    background: var(--color-accent-50);
    color: var(--color-accent-600);
    font-weight: 600;
  }
  .menu-item.danger {
    color: #a32d2d;
  }
  .menu-item.danger.active {
    background: #fcebeb;
  }
  .menu-item.logout {
    color: var(--color-text-muted);
  }
  .menu-item.logout:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .indicator {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 20px;
    border-radius: 999px 0 0 999px;
    background: var(--color-accent-500);
  }
  .menu-item.danger .indicator {
    background: #a32d2d;
  }

  /* ===== 右侧内容 ===== */
  .content {
    flex: 1;
    min-width: 0;
    overflow-y: auto;
    padding: 1.5rem 1.25rem 1.5rem;
  }
  @media (min-width: 1024px) {
    .content {
      padding: 1.75rem 2rem 1.5rem;
    }
  }
  .loading {
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }

  /* 未登录:认证卡片与资料内容同宽同起点(水平居中、顶部对齐) */
  .auth-holder {
    max-width: 46rem;
    margin: 0 auto;
    padding: 0 0 3rem;
  }
</style>
