<script lang="ts">
  // 设置页「主题背景」标签 —— v1 components/Settings/ThemeSetting.tsx 移植。
  //
  // 三个独立区块(主题与背景互不影响选中态):
  //   - 预设主题 ×8:决定 accent 主色(名称走词典 t.settings.theme.presetName)
  //   - 预设背景 ×8:只覆盖 --bg-page
  //   - 自定义背景:上传压缩(compressImageToBackgroundUrl,失败提示)→ 只覆盖 --bg-page
  // 底部:非出厂状态时显示「恢复默认」(resetTheme)。

  import { Upload, RotateCcw, Check, X } from "lucide-svelte";
  import { getDict } from "../../lib/i18n.svelte";
  import {
    getThemeId,
    getBackground,
    setTheme,
    setBackgroundPreset,
    setBackgroundCustom,
    clearBackground,
    resetTheme,
    compressImageToBackgroundUrl,
    PRESET_BACKGROUNDS,
  } from "../../lib/theme.svelte";
  import { THEME_PRESETS } from "../../lib/theme/themes";

  const t = $derived(getDict());
  const themeId = $derived(getThemeId());
  const background = $derived(getBackground());

  let compressFail = $state(false);

  async function handleFile(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    compressFail = false;
    const url = await compressImageToBackgroundUrl(file);
    if (url) {
      setBackgroundCustom(url);
    } else {
      compressFail = true;
    }
    input.value = ""; // 允许重复上传同一文件
  }

  // 主题与背景图独立:互不影响 active 状态
  const activePresetBgId = $derived(
    background?.kind === "preset" ? background.id : null,
  );
  const isCustomBg = $derived(background?.kind === "custom");
  // 「恢复默认」目标 = 默认主题 + preset-bg-1(出厂状态)
  const isDefault = $derived(
    themeId === "default" &&
      background?.kind === "preset" &&
      background.id === "preset-bg-1",
  );

  // 缩略图:custom 显示上传图,preset 显示对应预设图,null 不显示
  const thumbStyle = $derived.by(() => {
    if (background?.kind === "preset") {
      const found = PRESET_BACKGROUNDS.find((p) => p.id === background.id);
      return found ? `background-image: ${found.url}` : null;
    }
    if (background?.kind === "custom") {
      return `background-image: ${background.url}`;
    }
    return null;
  });
</script>

<div class="setting">
  <h2 class="tab-title">{t.settings.theme.title}</h2>
  <p class="desc">{t.settings.theme.desc}</p>

  <!-- 预设主题:决定 accent 主色 -->
  <section class="block">
    <h3 class="block-title">{t.settings.theme.preset}</h3>
    <div class="grid">
      {#each THEME_PRESETS as p (p.id)}
        {@const active = themeId === p.id}
        <button
          type="button"
          class="card"
          class:active
          style="background: {p.preview}"
          title={t.settings.theme.presetName[p.id]}
          aria-pressed={active}
          onclick={() => setTheme(p.id)}
        >
          {#if active}
            <span class="badge"><Check size={11} strokeWidth={3} /></span>
          {/if}
          <span class="card-name">{t.settings.theme.presetName[p.id]}</span>
        </button>
      {/each}
    </div>
  </section>

  <!-- 预设背景:只覆盖背景层 -->
  <section class="block">
    <h3 class="block-title">{t.settings.theme.presetBg}</h3>
    <div class="grid">
      {#each PRESET_BACKGROUNDS as p (p.id)}
        {@const active = activePresetBgId === p.id}
        <button
          type="button"
          class="card cover"
          class:active
          style="background-image: {p.url}"
          title={t.settings.theme.presetBgName[p.id]}
          aria-pressed={active}
          onclick={() => setBackgroundPreset(p.id)}
        >
          {#if active}
            <span class="badge"><Check size={11} strokeWidth={3} /></span>
          {/if}
          <span class="card-name corner">{t.settings.theme.presetBgName[p.id]}</span>
        </button>
      {/each}
    </div>
    <p class="hint">{t.settings.theme.presetBgHint}</p>
    {#if activePresetBgId}
      <p class="used">
        <Check size={13} />
        {t.settings.theme.presetBgUsed}
      </p>
    {/if}
  </section>

  <!-- 自定义背景 -->
  <section class="block">
    <h3 class="block-title">{t.settings.theme.custom}</h3>
    <div class="custom-row">
      <label class="upload-btn">
        <input type="file" accept="image/*" onchange={handleFile} class="file-input" />
        <Upload size={14} />
        {t.settings.theme.upload}
      </label>
      {#if background && thumbStyle}
        <div
          class="thumb"
          style={thumbStyle}
          aria-label={isCustomBg ? t.settings.theme.bgUsed : t.settings.theme.presetBgUsed}
        ></div>
        <span class="used">
          <Check size={13} />
          {isCustomBg ? t.settings.theme.bgUsed : t.settings.theme.presetBgUsed}
        </span>
        <button type="button" class="clear-btn" onclick={clearBackground}>
          <X size={12} />
          {t.settings.theme.clearBg}
        </button>
      {/if}
    </div>
    {#if compressFail}
      <p class="fail" role="alert">{t.settings.theme.compressFail}</p>
    {/if}
    <p class="hint">{t.settings.theme.customHint}</p>
  </section>

  <!-- 一键回到出厂状态 -->
  {#if !isDefault}
    <button type="button" class="reset-btn" onclick={resetTheme}>
      <RotateCcw size={12} />
      {t.settings.theme.reset}
    </button>
  {/if}
</div>

<style>
  .setting {
    max-width: 36rem;
  }
  .tab-title {
    margin: 0 0 0.25rem;
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

  .block {
    margin-bottom: 1.5rem;
  }
  .block-title {
    margin: 0 0 0.75rem;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
  }
  .card {
    position: relative;
    height: 64px;
    border: 2px solid var(--color-border);
    border-radius: var(--radius-lg);
    background-size: cover;
    background-position: center;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 0.35rem;
    transition: transform 0.15s, border-color 0.15s, box-shadow 0.15s;
  }
  .card:hover {
    border-color: var(--color-neutral-300);
    transform: scale(1.02);
  }
  .card.active {
    border-color: var(--color-accent-500);
    box-shadow: var(--shadow-md);
    transform: scale(1.03);
  }
  .badge {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-accent-500);
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-xs);
  }
  .card-name {
    font-size: 10px;
    font-weight: 500;
    color: var(--color-neutral-700);
    background: color-mix(in srgb, #fff 70%, transparent);
    border-radius: var(--radius-sm);
    padding: 1px 6px;
    backdrop-filter: blur(2px);
  }
  .card-name.corner {
    position: absolute;
    bottom: 4px;
    left: 4px;
  }

  .hint {
    margin: 0.5rem 0 0;
    font-size: 0.75rem;
    color: var(--color-neutral-400);
    line-height: 1.5;
  }
  .used {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    margin: 0.5rem 0 0;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-accent-600);
  }

  .custom-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  .file-input {
    display: none;
  }
  .upload-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--radius-lg);
    background: var(--color-accent-500);
    color: #fff;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    box-shadow: var(--shadow-xs);
    transition: background 0.15s;
  }
  .upload-btn:hover {
    background: var(--color-accent-600);
  }
  .thumb {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    background-size: cover;
    background-position: center;
    flex-shrink: 0;
  }
  .clear-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    border: none;
    background: transparent;
    color: var(--color-text-muted);
    font-size: 0.75rem;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    transition: color 0.12s;
  }
  .clear-btn:hover {
    color: var(--color-error);
  }
  .fail {
    margin: 0.5rem 0 0;
    font-size: 0.75rem;
    color: var(--color-error);
  }

  .reset-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    border: none;
    background: transparent;
    color: var(--color-neutral-400);
    font-size: 0.75rem;
    cursor: pointer;
    padding: 0.25rem 0;
    transition: color 0.12s;
  }
  .reset-btn:hover {
    color: var(--color-accent-600);
  }
</style>
