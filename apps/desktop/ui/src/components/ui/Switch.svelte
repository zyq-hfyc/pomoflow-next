<script lang="ts">
  // 开关控件 —— v1 components/ui/Switch.tsx 的 Svelte 5 移植。
  //
  // 纯受控组件:checked 状态由父级持有,切换通过 onChange 回传。
  // 视觉:40×22 胶囊轨道 + 16px 白色滑块,开启时轨道染 accent 主色。

  interface Props {
    checked: boolean;
    onChange: (v: boolean) => void;
    /** 无可见 label 时必传(无障碍);有可见 label 时可省 */
    label?: string;
    disabled?: boolean;
  }

  let { checked, onChange, label, disabled = false }: Props = $props();
</script>

<button
  type="button"
  class="switch"
  class:on={checked}
  role="switch"
  aria-checked={checked}
  aria-label={label}
  {disabled}
  onclick={() => onChange(!checked)}
>
  <span class="knob"></span>
</button>

<style>
  /* v1 Switch:30-38 —— 轨道 neutral-300 无边框,滑块 18px */
  .switch {
    position: relative;
    width: 40px;
    height: 22px;
    flex-shrink: 0;
    padding: 0;
    border: none;
    border-radius: 999px;
    background: var(--color-neutral-300, #d2ccc2);
    cursor: pointer;
    transition: background 0.15s;
  }
  .switch.on {
    background: var(--color-accent-500);
  }
  .switch:focus-visible {
    outline: none;
    box-shadow: var(--shadow-focus);
  }
  .switch:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .knob {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--color-neutral-0);
    box-shadow: var(--shadow-xs);
    transition: transform 0.15s;
  }
  .switch.on .knob {
    transform: translateX(18px);
  }
</style>
