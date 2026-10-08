<script lang="ts">
  // 账号页(一级导航,位于「帮助与反馈」前)。
  //
  // 布局与设置页同款(页面级左菜单 + 右内容区,视觉语言统一):
  // - 已登录:菜单头部 = 头像+昵称+邮箱;菜单项 = 个人资料/安全设置/第三方账号/
  //   登录设备/数据同步/账号注销;底部 = 退出登录;右侧 = AccountCenter 对应分区
  //   (「数据同步」段例外:状态自持,直挂 SyncSetting,不走 AccountCenter)。
  // - 未登录:菜单头部 = 「登录 | 注册」;菜单项 = 「账号」+「数据同步」
  //   (自部署静态 Token 用户不登录也要能配同步,故 sync 段未登录可见);
  //   右侧 = 认证卡片(登录 / 注册 / 找回密码)居中,或 SyncSetting。
  // 登录成功 / 退出登录 → 就地切换形态,不跳路由;顶栏头像同步(accountState)。
  // 深链:页外组件(顶栏 SyncIndicator)经 accountNav 一次性信号落指定段,
  //   $effect 消费(不能 onMount —— 已在 /account 时 navigate 不 remount)。

  import { onMount, type Component } from "svelte";
  import {
    UserRound,
    ShieldCheck,
    Link2,
    MonitorSmartphone,
    RefreshCw,
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
  import {
    pendingAccountSection,
    clearAccountSectionRequest,
  } from "../lib/accountNav.svelte";
  import { resetJournals } from "../lib/journalsStore.svelte";
  import AuthCard from "../components/Settings/Account/AuthCard.svelte";
  import AccountCenter from "../components/Settings/Account/AccountCenter.svelte";
  import SyncSetting from "../components/Settings/SyncSetting.svelte";

  const t = $derived(getDict());
  const acct = $derived(accountState());

  type Section = "profile" | "security" | "thirdparty" | "devices" | "sync" | "danger";
  let section = $state<Section>("profile");
  let profile = $state<AccountProfile | null>(null);
  let loggingOut = $state(false);
  let staleNotice = $state("");

  const display = $derived(profile?.display_name || profile?.username || "…");

  // AccountCenter 的 section 是不含 "sync" 的窄 union(同步段直挂,不经它),
  // 这里派生收窄过类型检查;运行时 sync 分支在模板里已短路,它收不到 "sync"。
  const centerSection = $derived<"profile" | "security" | "thirdparty" | "devices" | "danger">(
    section === "sync" ? "profile" : section,
  );

  // 深链消费:响应式一次性信号(发起方先 requestAccountSection 再 navigate;
  // 已在 /account 时页面不 remount,onMount 消费会丢,故必须 $effect)。
  $effect(() => {
    const p = pendingAccountSection();
    if (!p) return;
    section = p;
    clearAccountSectionRequest(); // 二次触发读到 null → no-op,无循环
  });

  async function loadProfile() {
    try {
      profile = await authGetProfile();
    } catch {
      profile = null;
    }
  }

  // lucide-svelte 1.x 导出 Svelte 4 SvelteComponentTyped,与 Svelte 5 Component
  // 类型不兼容 —— 与 SettingsPage / ProjectSidebar 同款,赋值处 `as any` 绕过(运行期正常)。
  const menuItems = $derived<{ key: Section; icon: Component<any>; label: string; danger?: boolean }[]>([
    { key: "profile", icon: UserRound as any, label: t.settings.account.profile },
    { key: "security", icon: ShieldCheck as any, label: t.settings.account.security },
    { key: "thirdparty", icon: Link2 as any, label: t.settings.account.thirdparty },
    { key: "devices", icon: MonitorSmartphone as any, label: t.settings.account.devices },
    // 数据同步(2026-10-08 从设置页迁入;文案复用 settings.tab.sync):插危险区前,
    // 视觉动线 = 账号域 → 同步 → 危险区垫底
    { key: "sync", icon: RefreshCw as any, label: t.settings.tab.sync },
    { key: "danger", icon: TriangleAlert as any, label: t.settings.account.dangerZone, danger: true },
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
      resetJournals(); // M4:清随手记缓存,防换账号先渲染上一账号数据
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
        <!-- 未登录:账号(认证卡片)+ 数据同步(静态 Token 自部署也要能配) -->
        {@const syncActive = section === "sync"}
        <button
          type="button"
          class="menu-item"
          class:active={!syncActive}
          aria-current={!syncActive ? "true" : undefined}
          onclick={() => (section = "profile")}
        >
          {#if !syncActive}<span class="indicator" aria-hidden="true"></span>{/if}
          <UserRound size={16} />
          {t.settings.account.title}
        </button>
        <button
          type="button"
          class="menu-item"
          class:active={syncActive}
          aria-current={syncActive ? "true" : undefined}
          onclick={() => (section = "sync")}
        >
          {#if syncActive}<span class="indicator" aria-hidden="true"></span>{/if}
          <RefreshCw size={16} />
          {t.settings.tab.sync}
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
    {#if section === "sync"}
      <!-- 数据同步段:状态/错误自持,已/未登录均可用,不走 AccountCenter -->
      <div class="sync-holder">
        <SyncSetting onGoAuth={() => (section = "profile")} />
      </div>
    {:else if acct.loaded && acct.user}
      <AccountCenter {profile} section={centerSection} reloadProfile={loadProfile} />
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
    padding: 0.75rem 0.75rem 1rem;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 0.75rem;
    /* 用户 2026-09-07 反馈:账号信息居中显示更美观;flex 列+居中对齐
       适用于「已登录 / 未登录」两种形态。 */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
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

  /* 数据同步段:与 AccountCenter 的 .ac-content 同宽居中(视觉对齐账号域) */
  .sync-holder {
    max-width: 46rem;
    margin: 0 auto;
    padding: 0 0 3rem;
  }
</style>
