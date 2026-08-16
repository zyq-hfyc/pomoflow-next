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
  });

  // === 路由渲染 ===
  const route = $derived(currentRoute());
</script>

<main class="app">
  <header class="topbar">
    <div class="brand">
      <span class="logo" aria-hidden="true">🍅</span>
      <h1>PomoFlow</h1>
    </div>
    <nav class="nav" aria-label={t.nav.mainNav}>
      {#each ROUTES as r (r.path)}
        <button
          class="nav-item"
          class:active={route === r.path}
          onclick={() => navigate(r.path)}
          aria-current={route === r.path ? "page" : undefined}
        >
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
  .app {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background: var(--color-bg);
    color: var(--color-text);
  }

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-surface);
    box-shadow: var(--shadow-sm);
    flex-shrink: 0;
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
    color: var(--color-text);
  }
  .logo { font-size: 1.5rem; }

  .nav {
    display: flex;
    gap: 0.25rem;
  }
  .nav-item {
    padding: 0.4rem 1rem;
    border: none;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-text-muted);
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .nav-item:hover {
    background: var(--color-border);
    color: var(--color-text);
  }
  .nav-item.active {
    background: var(--color-accent);
    color: #fff;
  }

  .outlet {
    flex: 1;
    overflow: auto;
  }
</style>