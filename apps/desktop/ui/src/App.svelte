<script lang="ts">
  // P1.7:根 App —— 导航栏 + hash 路由出口 + 全局 timer tick 驱动。
  //
  // 拆分理由:把 P1.3-P1.5 塞在一个文件里的 687 行 App.svelte 拆成:
  //   - App.svelte(本文件):壳 + 导航 + 路由 outlet + 全局 tick 副作用
  //   - pages/TimerPage.svelte:番茄钟主页(圆环 + 控制)
  //   - pages/TasksPage.svelte:任务 CRUD(从原 App.svelte 迁过来;journal 视图 = 手账)
  //   - pages/StatsPage.svelte:统计(占位,P1.9 接 Recharts)
  //   - pages/SettingsPage.svelte:设置(从原 system 面板迁过来 + 番茄钟参数)
  //
  // 全局 tick:`$effect` 监听 `running`,true 时每秒 `tick()`,false 时清掉 interval。
  // 这样 timer 状态在所有页面共享,路由切换不丢进度。

  import { onMount } from "svelte";
  import {
    Clock,
    ListTodo,
    ChartColumn,
    Settings,
    HelpCircle,
  } from "lucide-svelte";
  import { currentRoute, navigate, ROUTES } from "./lib/router.svelte";
  import { getDict } from "./lib/i18n.svelte";
  import {
    getTimerState,
    tick as timerTick,
    recalibrateOnVisible,
    refreshNotificationTemplate,
    initTodayStatsSync,
  } from "./lib/timer.svelte";
  import { initReminders } from "./lib/reminders.svelte";
  import { initTheme } from "./lib/theme.svelte";
  import TomatoIcon from "./components/ui/TomatoIcon.svelte";
  import TimerPage from "./pages/TimerPage.svelte";
  import TasksPage from "./pages/TasksPage.svelte";
  import StatsPage from "./pages/StatsPage.svelte";
  import SettingsPage from "./pages/SettingsPage.svelte";
  import HelpPage from "./pages/HelpPage.svelte";

  // === i18n 词典(响应式;setLang 后整棵导航栏重渲染) ===
  const t = $derived(getDict());

  // 主题:恢复 localStorage 配置并应用到 <html data-theme> / --bg-page
  initTheme();

  // === 全局 timer tick ===
  // `$effect` 在 setup 函数返回的 cleanup 里清掉 interval,组件销毁时不会泄漏。
  $effect(() => {
    const state = getTimerState();
    if (!state.running) return;
    const id = setInterval(() => timerTick(), 1000);
    return () => clearInterval(id);
  });

  onMount(() => {
    // 回前台立即校准剩余时间(v1 visibilitychange;后台/睡眠不漂移)
    void refreshNotificationTemplate();
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) recalibrateOnVisible();
    });
    // 今日统计重同步(启动/回前台/跨午夜,v1 AppContext)
    initTodayStatsSync();
    // 任务提醒引擎(30s 轮询 + 专注抑制/补弹 + 启动补弹)
    initReminders();
    // 通知权限预请求(v1 TimerPage:73-77 / useReminders:116-120:
    // 进页面即请求,而不是等首次发通知时才弹权限框)
    void (async () => {
      try {
        const { isPermissionGranted, requestPermission } = await import(
          "@tauri-apps/plugin-notification"
        );
        if (!(await isPermissionGranted())) await requestPermission();
      } catch {
        // 权限请求失败不打断启动,发通知时还会再试
      }
    })();
  });

  // === 路由渲染 ===
  const route = $derived(currentRoute());

  // v1 Navbar:每个菜单带图标,激活态 = accent 文字 + 2px 底部指示条
  const NAV_ICONS: Record<string, unknown> = {
    timer: Clock,
    tasks: ListTodo,
    stats: ChartColumn,
    settings: Settings,
    help: HelpCircle,
  };
</script>

<main class="app app-bg">
  <header class="topbar">
    <!-- v1:logo(品牌番茄 SVG)+ 字标居左,导航紧跟其后靠左 -->
    <div class="brand">
      <span class="logo" aria-hidden="true"><TomatoIcon size={26} /></span>
      <h1>PomoFlow</h1>
    </div>
    <nav class="nav" aria-label={t.nav.mainNav}>
      {#each ROUTES as r (r.path)}
        {@const Icon = NAV_ICONS[r.labelKey] as any}
        <button
          class="nav-item"
          class:active={route === r.path}
          onclick={() => navigate(r.path)}
          aria-current={route === r.path ? "page" : undefined}
        >
          <Icon size={18} />
          {t.nav[r.labelKey]}
        </button>
      {/each}
    </nav>
  </header>

  <div class="outlet">
    {#if route === "/timer"}
      <TimerPage />
    {:else if route === "/tasks"}
      <TasksPage />
    {:else if route === "/stats"}
      <StatsPage />
    {:else if route === "/settings"}
      <SettingsPage />
    {:else if route === "/help"}
      <HelpPage />
    {:else}
      <TimerPage />
    {/if}
  </div>
</main>

<style>
  /* 背景由全局 .app-bg(app.css)提供:var(--bg-page) = 主题渐变或
     背景图(theme store 注入 <html> 内联)。这里绝不能再铺不透明底色,
     否则会像 v2 早期 bug 一样把预设/自定义背景整层盖住 */
  .app {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    color: var(--color-text);
  }

  .topbar {
    display: flex;
    align-items: center;
    min-height: var(--topbar-height, 50px);
    padding: 0 1.5rem;
    border-bottom: 1px solid var(--color-border);
    background: color-mix(in srgb, var(--color-surface) 85%, transparent);
    backdrop-filter: blur(8px);
    box-shadow: var(--shadow-sm);
    flex-shrink: 0;
    gap: 1.25rem;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .brand h1 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--color-accent-700);
  }
  .logo {
    display: inline-flex;
    color: var(--color-accent-500);
  }

  /* v1 Navbar:菜单靠左(紧跟 logo),激活 = accent 文字 + 2px 底部指示条 */
  .nav {
    display: flex;
    gap: 0.25rem;
    align-self: stretch;
  }
  .nav-item {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0 0.9rem;
    border: none;
    border-radius: 0;
    background: transparent;
    color: var(--color-text-muted);
    font-size: 0.9rem;
    cursor: pointer;
    transition: color 0.15s;
  }
  .nav-item:hover {
    color: var(--color-text);
  }
  .nav-item.active {
    color: var(--color-accent-600);
    font-weight: 600;
  }
  .nav-item.active::after {
    content: "";
    position: absolute;
    left: 0.5rem;
    right: 0.5rem;
    bottom: 0;
    height: 2px;
    border-radius: 1px;
    background: var(--color-accent-500);
  }

  .outlet {
    flex: 1;
    overflow: auto;
  }
</style>