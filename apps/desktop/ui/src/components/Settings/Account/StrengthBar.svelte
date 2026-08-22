<script lang="ts">
  // 密码强度条(参考原型规格):三段色条 + 弱/中/强文案。
  // 强度规则照搬原型:长度≥8 / 含字母 / 含数字 / 含符号,满足 0-1 弱、2 中、3+ 强。
  let { value }: { value: string } = $props();

  import { getDict } from "../../../lib/i18n.svelte";
  const t = $derived(getDict());

  const strength = $derived.by(() => {
    let n = 0;
    if (value.length >= 8) n += 1;
    if (/[A-Za-z]/.test(value)) n += 1;
    if (/[0-9]/.test(value)) n += 1;
    if (/[^A-Za-z0-9]/.test(value)) n += 1;
    return n; // 0..4
  });
  const level = $derived(strength <= 1 ? "weak" : strength === 2 ? "mid" : "strong");
</script>

{#if value.length > 0}
  <div class="pw-strength">
    <div class="pw-bar {level}"></div>
    <div class="pw-bar {strength >= 2 ? level : ''}"></div>
    <div class="pw-bar {strength >= 3 ? level : ''}"></div>
    <span class="pw-hint">
      {t.settings.account.strengthPrefix}
      {level === "weak" ? t.settings.account.strengthWeak : level === "mid" ? t.settings.account.strengthMid : t.settings.account.strengthStrong}
    </span>
  </div>
{/if}

<style>
  .pw-strength {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 6px;
  }
  .pw-bar {
    flex: 1;
    max-width: 48px;
    height: 3px;
    border-radius: 2px;
    background: var(--color-border);
  }
  .pw-bar.weak {
    background: #e24b4a;
  }
  .pw-bar.mid {
    background: #ef9f27;
  }
  .pw-bar.strong {
    background: #1d9e75;
  }
  .pw-hint {
    margin-left: 6px;
    font-size: 11px;
    color: var(--color-text-muted);
    white-space: nowrap;
  }
</style>
