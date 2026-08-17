<script lang="ts">
  // 设置页「中英切换」标签 —— v1 components/Settings/LanguageSetting.tsx 移植。
  // 两张大选项卡(中文 / English),点击即时 setLang,当前项 accent 高亮 + 徽标。
  // label/sub 用语言原生名(不随界面语言变,与 v1 一致)。

  import { Check } from "lucide-svelte";
  import { getDict, getLang, setLang } from "../../lib/i18n.svelte";
  type Lang = "zh" | "en";

  const t = $derived(getDict());
  const lang = $derived(getLang());

  // v1 语义:label 用语言原生名、sub 用「另一门语言的名字」硬编码
  // (v1 LanguageSetting.tsx:8-11:英文卡 sub='英文'),不随界面语言变
  const OPTIONS: { key: Lang; label: string; sub: string }[] = [
    { key: "zh", label: "中文", sub: "Chinese" },
    { key: "en", label: "English", sub: "英文" },
  ];
</script>

<div>
  <h2 class="tab-title">{t.settings.language.title}</h2>
  <p class="desc">{t.settings.language.desc}</p>

  <div class="options">
    {#each OPTIONS as opt (opt.key)}
      {@const active = lang === opt.key}
      <button
        type="button"
        class="option"
        class:active
        aria-pressed={active}
        onclick={() => setLang(opt.key)}
      >
        {#if active}
          <span class="badge"><Check size={16} /></span>
        {/if}
        <span class="label">{opt.label}</span>
        <span class="sub">{opt.sub}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .tab-title {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text);
  }
  .desc {
    margin: 0 0 1.25rem;
    font-size: 0.85rem;
    color: var(--color-text-muted);
    line-height: 1.5;
  }

  .options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    max-width: 28rem;
  }
  .option {
    position: relative;
    height: 64px;
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.1rem;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
  }
  .option:hover {
    border-color: var(--color-neutral-300);
  }
  .option.active {
    border-color: var(--color-accent-500);
    background: var(--color-accent-50);
  }
  .badge {
    position: absolute;
    top: 6px;
    right: 6px;
    color: var(--color-accent-500);
    display: inline-flex;
  }
  .label {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
  }
  .sub {
    font-size: 0.75rem;
    color: var(--color-neutral-400);
  }
</style>
