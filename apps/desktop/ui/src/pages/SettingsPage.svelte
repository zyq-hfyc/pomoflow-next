<script lang="ts">
  // 设置页 —— v1 SettingsPage.tsx 布局移植:左侧二级菜单 + 右侧表单卡。
  //
  // 8 个标签(与 v1 一致,account 排第一,内容为占位文案):账号 / 计时 / 清单 /
  // 标签 / 主题 / 名言 / 通知 / 语言。
  // 菜单激活态:accent-50 底 + accent-600 字 + 左侧指示条(词典 t.settings.tab.*)。
  // 各标签内容在 components/Settings/*(本文件只负责骨架与切换)。

  import type { Component } from "svelte";
  import {
    UserRound,
    Clock,
    ListTodo,
    Tag,
    Palette,
    Quote,
    Bell,
    Languages,
  } from "lucide-svelte";
  import { getDict } from "../lib/i18n.svelte";
  import TimerSetting from "../components/Settings/TimerSetting.svelte";
  import ProjectManager from "../components/Settings/ProjectManager.svelte";
  import TagManager from "../components/Settings/TagManager.svelte";
  import ThemeSetting from "../components/Settings/ThemeSetting.svelte";
  import MottoManager from "../components/Settings/MottoManager.svelte";
  import NotificationTemplateSetting from "../components/Settings/NotificationTemplateSetting.svelte";
  import LanguageSetting from "../components/Settings/LanguageSetting.svelte";

  const t = $derived(getDict());

  type SettingTab =
    | "account"
    | "timer"
    | "lists"
    | "tags"
    | "theme"
    | "motto"
    | "notification"
    | "language";

  let activeTab = $state<SettingTab>("timer");

  // lucide-svelte 1.x 导出 Svelte 4 SvelteComponentTyped,与 Svelte 5 Component
  // 类型不兼容 —— 与 ProjectSidebar 同款,赋值处 `as any` 绕过(运行期正常)。
  const tabs = $derived<{ key: SettingTab; icon: Component<any>; label: string }[]>([
    { key: "account", icon: UserRound as any, label: t.settings.tab.account },
    { key: "timer", icon: Clock as any, label: t.settings.tab.timer },
    { key: "lists", icon: ListTodo as any, label: t.settings.tab.lists },
    { key: "tags", icon: Tag as any, label: t.settings.tab.tags },
    { key: "theme", icon: Palette as any, label: t.settings.tab.theme },
    { key: "motto", icon: Quote as any, label: t.settings.tab.motto },
    { key: "notification", icon: Bell as any, label: t.settings.tab.notification },
    { key: "language", icon: Languages as any, label: t.settings.tab.language },
  ]);
</script>

<svelte:head>
  <title>{t.page.settings}</title>
</svelte:head>

<div class="settings-page page-veil">
  <!-- 左侧二级菜单:激活态 accent-50 + 左侧指示条 -->
  <aside class="menu">
    <nav class="menu-nav">
      {#each tabs as item (item.key)}
        {@const active = activeTab === item.key}
        <button
          type="button"
          class="menu-item"
          class:active
          aria-current={active ? "true" : undefined}
          onclick={() => (activeTab = item.key)}
        >
          {#if active}<span class="indicator" aria-hidden="true"></span>{/if}
          <item.icon size={16} />
          {item.label}
        </button>
      {/each}
    </nav>
  </aside>

  <!-- 右侧内容卡 -->
  <main class="content">
    <div class="card">
      {#if activeTab === "account"}
        <!-- v1 SettingsPage:156-160 —— 账号占位 -->
        <div class="account-placeholder">
          <p>{t.settings.accountNotOpen}</p>
        </div>
      {:else if activeTab === "timer"}
        <TimerSetting />
      {:else if activeTab === "lists"}
        <ProjectManager />
      {:else if activeTab === "tags"}
        <TagManager />
      {:else if activeTab === "theme"}
        <ThemeSetting />
      {:else if activeTab === "motto"}
        <MottoManager />
      {:else if activeTab === "notification"}
        <NotificationTemplateSetting />
      {:else if activeTab === "language"}
        <LanguageSetting />
      {/if}
    </div>
  </main>
</div>

<style>
  .settings-page {
    display: flex;
    flex-direction: column;
    height: auto;
  }
  @media (min-width: 1024px) {
    .settings-page {
      flex-direction: row;
      height: calc(100vh - var(--topbar-height, 43px));
    }
  }

  .account-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 16rem;
    color: var(--color-text-muted);
  }
  .account-placeholder p {
    margin: 0;
  }

  .menu {
    flex-shrink: 0;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: 1rem 0.5rem;
  }
  @media (min-width: 1024px) {
    .menu {
      width: 208px;
      border-bottom: none;
      border-right: 1px solid var(--color-border);
    }
  }
  .menu-nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
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
  .indicator {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 20px;
    border-radius: 0 999px 999px 0;
    background: var(--color-accent-500);
  }

  .content {
    flex: 1;
    min-width: 0;
    overflow-y: auto;
    padding: 4rem 1.5rem 1.25rem;
  }
  @media (min-width: 1024px) {
    .content {
      padding: 4rem 2rem 1.25rem;
    }
  }
  .card {
    max-width: 42rem;
    margin: 0 auto;
    background: color-mix(in srgb, var(--color-surface) 88%, transparent);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
  }
  @media (min-width: 1024px) {
    .card {
      padding: 2rem;
    }
  }
</style>
