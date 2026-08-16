<script lang="ts">
  // 品牌番茄图标 —— 与 v1 TomatoIcon.tsx 同款 SVG。
  //
  // filled=true  → 主体用 currentColor(跟随主题 accent);
  // filled=false → 主体用浅灰 #e5e7eb,呈现"未点亮"状态。
  // 绿叶/茎与高光固定色,与品牌 LOGO 一致。

  interface Props {
    size?: number;
    filled?: boolean;
  }

  let { size = 14, filled = true }: Props = $props();
</script>

<svg
  viewBox="0 0 32 32"
  width={size}
  height={size}
  aria-hidden="true"
>
  <circle cx="16" cy="20" r="10" fill={filled ? 'currentColor' : '#e5e7eb'} />
  <ellipse cx="13" cy="18" rx="2.6" ry="4.5" fill="#ffffff" opacity="0.28" />
  <path
    d="M16 10 C 14 8, 12 6, 14 5 C 16 4, 18 5, 16 7 C 18 5, 20 6, 19 8 C 18 10, 16 10, 16 10 Z"
    fill="#7fa086"
  />
  <path d="M16 8 L 16 4" stroke="#5f6f5a" stroke-width="1.3" stroke-linecap="round" />
</svg>