<script lang="ts">
  // 帮助页 —— v1 `pomoflow/frontend/src/pages/HelpPage.tsx` 移植(P1 阶段 H)。
  //
  // 三个标签(左菜单 + 右内容卡):
  //   - 用户手册:7 节(timer/tasks/reminder/repeat/journal/stats/settings)
  //   - 常见问题:13 条 Q/A
  //   - 联系我们:联系方式 + 问题反馈邮件格式指引
  // 全部文案走词典 t.help.*(已在阶段 D 随词典全量移植)。

  import { BookOpen, HelpCircle, Mail } from "lucide-svelte";
  import { getDict } from "../lib/i18n.svelte";

  const t = $derived(getDict());

  type HelpTab = "manual" | "faq" | "contact";

  let activeTab = $state<HelpTab>("manual");

  /** 用户手册各 section 渲染顺序(与词典 help.manual 的 key 对应)。 */
  const MANUAL_SECTIONS = [
    "timer",
    "tasks",
    "reminder",
    "repeat",
    "journal",
    "stats",
    "settings",
  ] as const;
</script>

<svelte:head>
  <title>{t.nav.help} - PomoFlow</title>
</svelte:head>

<div class="help-page page-veil">
  <!-- 左侧菜单 -->
  <aside class="menu">
    <nav class="menu-nav">
      {#each [{ key: "manual" as HelpTab, icon: BookOpen as any }, { key: "faq" as HelpTab, icon: HelpCircle as any }, { key: "contact" as HelpTab, icon: Mail as any }] as item (item.key)}
        {@const active = activeTab === item.key}
        <button
          type="button"
          class="menu-item"
          class:active
          aria-current={active ? "true" : undefined}
          onclick={() => (activeTab = item.key)}
        >
          <item.icon size={16} />
          {t.help.tab[item.key]}
        </button>
      {/each}
    </nav>
  </aside>

  <!-- 右侧内容卡 -->
  <main class="content">
    <div class="card">
      {#if activeTab === "manual"}
        <div class="manual">
          <h2>{t.help.tab.manual}</h2>
          {#each MANUAL_SECTIONS as sec (sec)}
            {@const section = t.help.manual[sec]}
            <section>
              <h3>{section.title}</h3>
              <ul>
                {#each section.items as raw, i (i)}
                  {@const item = raw as { text: string; sub?: string }}
                  <li>
                    {item.text}
                    {#if item.sub}
                      <br />
                      <span class="sub">{item.sub}</span>
                    {/if}
                  </li>
                {/each}
              </ul>
            </section>
          {/each}
        </div>
      {:else if activeTab === "faq"}
        <div class="faq">
          <h2>{t.help.tab.faq}</h2>
          {#each t.help.faq.items as item, i (i)}
            <section>
              <h3>Q: {item.q}</h3>
              <p>A: {item.a}</p>
            </section>
          {/each}
        </div>
      {:else}
        {@const c = t.help.contact}
        <div class="contact">
          <h2>{t.help.tab.contact}</h2>
          <p>{c.intro}</p>
          <div class="info-box">
            <div class="row">
              <span class="lbl">{c.emailLabel}</span>
              <span>522988349@qq.com</span>
            </div>
            <div class="row">
              <span class="lbl">{c.phoneLabel}</span>
              <span>18688994926</span>
            </div>
            <div class="row">
              <span class="lbl">{c.workHoursLabel}</span>
              <span>{c.workHours}</span>
            </div>
          </div>

          <div class="feedback">
            <h3>{c.feedbackTitle}</h3>
            <p>{c.feedbackDesc}</p>
            <div class="info-box">
              <div>
                <span class="lbl xs">{c.subjectLabel}</span>
                <div class="mono">{c.subjectFormat}</div>
                <div class="hint">{c.subjectHint}</div>
              </div>
              <div>
                <span class="lbl xs">{c.bodyLabel}</span>
                <ul class="body-items">
                  {#each c.bodyItems as it, i (i)}
                    <li>{it}</li>
                  {/each}
                </ul>
              </div>
              <div>
                <span class="lbl xs">{c.exampleLabel}</span>
                <div class="mono muted">{c.exampleText}</div>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </main>
</div>

<style>
  .help-page {
    display: flex;
    flex-direction: column;
    height: auto;
  }
  @media (min-width: 1024px) {
    .help-page {
      flex-direction: row;
      height: calc(100vh - 4rem);
    }
  }

  .menu {
    flex-shrink: 0;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: 1rem 0.5rem;
  }
  @media (min-width: 1024px) {
    .menu {
      width: 224px;
      border-bottom: none;
      border-right: 1px solid var(--color-border);
    }
  }
  .menu-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: var(--radius-md);
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

  .content {
    flex: 1;
    min-width: 0;
    overflow-y: auto;
    padding: 1.5rem 1.5rem 3rem;
  }
  .card {
    max-width: 48rem;
    margin: 0 auto;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
  }

  .card h2 {
    margin: 0 0 1.25rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text);
  }
  .card section {
    margin-bottom: 1.25rem;
  }
  .card h3 {
    margin: 0 0 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-text);
  }
  .card p,
  .card li {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    line-height: 1.6;
  }
  .manual ul,
  .body-items {
    margin: 0;
    padding-left: 1.25rem;
    list-style: disc;
  }
  .manual li {
    margin-bottom: 0.375rem;
  }
  .sub {
    font-size: 0.75rem;
    color: var(--color-neutral-400);
    margin-left: 1rem;
  }

  .info-box {
    background: var(--color-neutral-50);
    border-radius: var(--radius-lg);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    font-size: 0.875rem;
    color: var(--color-text);
  }
  .lbl {
    color: var(--color-text-muted);
  }
  .lbl.xs {
    font-size: 0.75rem;
  }
  .mono {
    margin-top: 0.25rem;
    font-family: var(--font-family-num);
    font-size: 0.75rem;
    color: var(--color-text);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: 0.375rem 0.75rem;
    white-space: pre-line;
  }
  .mono.muted {
    color: var(--color-text-muted);
  }
  .hint {
    font-size: 0.75rem;
    color: var(--color-neutral-400);
    margin-top: 0.25rem;
  }
  .body-items li {
    font-size: 0.75rem;
  }
  .feedback {
    border-top: 1px solid var(--color-border);
    padding-top: 1rem;
  }
</style>
