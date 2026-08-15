<script lang="ts">
  // P1.1:Hello 窗口,展示 Svelte 5 runes + Tauri 2 集成链路是否通畅。
  // P1.3 起:替换为 Task CRUD UI,从 Rust commands 拉数据。

  // Svelte 5 runes 写法(替代旧的 let / $: 响应式)
  let phase = $state<"boot" | "ready">("boot");
  let buildMode = $state<string>("");

  $effect(() => {
    // 启动时探测 build mode —— dev 下是 dev,build 后是 production
    buildMode = import.meta.env.DEV ? "dev" : "production";
    phase = "ready";
  });
</script>

<main class="hero">
  <div class="logo" aria-hidden="true">🍅</div>
  <h1>Hello PomoFlow</h1>
  <p class="subtitle">Tauri 2 + Svelte 5 脚手架就位</p>

  {#if phase === "ready"}
    <div class="meta">
      <span class="badge">build: {buildMode}</span>
      <span class="badge">phase: P1.1 scaffold</span>
    </div>
  {/if}

  <p class="hint">
    下一步 P1.2 起接入 SQLite + 任务 CRUD。
    <br />
    Rust 端 <code>crates/core</code> 已就绪,UI ↔ 后端桥接在 P1.3 接通。
  </p>
</main>

<style>
  .hero {
    text-align: center;
    max-width: 480px;
    padding: 2rem;
  }

  .logo {
    font-size: 4rem;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .subtitle {
    margin: 0 0 1.5rem 0;
    color: var(--color-text-muted);
    font-size: 1rem;
  }

  .meta {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 999px;
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    box-shadow: var(--shadow-sm);
  }

  .hint {
    margin: 0;
    color: var(--color-text-muted);
    font-size: 0.875rem;
    line-height: 1.6;
  }

  code {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 0.1rem 0.4rem;
    font-size: 0.85em;
    color: var(--color-accent);
  }
</style>
