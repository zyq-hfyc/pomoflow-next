<script lang="ts">
  // 设置页「通知文案」标签 —— v1 components/Settings/NotificationTemplateSetting.tsx 移植。
  //
  // - 风格下拉 6 项(label 走词典 t.settings.notification.styleName)
  // - 选预设风格 → 6 个文案框自动填充当前语言预设文案(只读,跟随语言切换)
  // - 选自定义 → 框内显示数据库内容,可自由编辑 + 可选风格描述
  // - 保存:upsertNotificationTemplate(传 style + 用户可见的 6 字段;
  //   预设风格后端只存 style,文案由前端按语言解析)
  // - ✓ 已保存反馈(2 秒)

  import { onMount } from "svelte";
  import { Save } from "lucide-svelte";
  import * as api from "../../lib/api";
  import {
    STYLE_OPTIONS,
    STYLE_PRESETS,
    STYLE_PRESETS_EN,
    type NotificationStyleKey,
  } from "../../lib/notificationStyles";
  import { getDict, getLang } from "../../lib/i18n.svelte";
  import { refreshNotificationTemplate } from "../../lib/timer.svelte";

  const t = $derived(getDict());
  const lang = $derived(getLang());

  let style = $state<NotificationStyleKey>("default");
  let styleDesc = $state("");
  let rawTpl = $state<api.NotificationTemplate | null>(null);
  let fields = $state({
    focus_end_title: "",
    focus_end_body: "",
    break_end_title: "",
    break_end_body: "",
    reminder_title: "",
    reminder_body: "",
  });
  let saved = $state(false);
  let saveError = $state<string | null>(null);

  const isCustom = $derived(style === "custom");

  // 加载数据库保存的 style / styleDescription / 原始模板
  onMount(() => {
    void api
      .getNotificationTemplate()
      .then((tpl) => {
        style = (tpl.style as NotificationStyleKey) || "default";
        styleDesc = tpl.style_description || "";
        rawTpl = tpl;
      })
      .catch(() => {
        // 拉不到 → 保持 default 预设展示
      });
  });

  // 文案框内容:预设 = 当前语言预设(只读);自定义 = 数据库内容(可编辑)
  $effect(() => {
    if (isCustom) {
      if (rawTpl) {
        fields = {
          focus_end_title: rawTpl.focus_end_title || "",
          focus_end_body: rawTpl.focus_end_body || "",
          break_end_title: rawTpl.break_end_title || "",
          break_end_body: rawTpl.break_end_body || "",
          reminder_title: rawTpl.reminder_title || "",
          reminder_body: rawTpl.reminder_body || "",
        };
      }
    } else {
      const preset = (lang === "en" ? STYLE_PRESETS_EN : STYLE_PRESETS)[style];
      fields = {
        focus_end_title: preset.focus_end_title,
        focus_end_body: preset.focus_end_body,
        break_end_title: preset.break_end_title,
        break_end_body: preset.break_end_body,
        reminder_title: preset.reminder_title,
        reminder_body: preset.reminder_body,
      };
    }
  });

  async function handleSave() {
    saveError = null;
    const template: api.NotificationTemplate = {
      id: "1",
      style,
      style_description: isCustom ? styleDesc : null,
      focus_end_title: fields.focus_end_title,
      focus_end_body: fields.focus_end_body,
      break_end_title: fields.break_end_title,
      break_end_body: fields.break_end_body,
      reminder_title: fields.reminder_title,
      reminder_body: fields.reminder_body,
    };
    try {
      const savedTpl = await api.upsertNotificationTemplate(template);
      rawTpl = savedTpl;
      // v1 语义:保存后立即刷新运行中的模板缓存(storage 事件广播的等价物)
      // —— 完成通知/任务提醒马上用新文案,无需重启
      await refreshNotificationTemplate();
      saved = true;
      window.setTimeout(() => (saved = false), 2000);
    } catch (e) {
      saveError = String(e);
    }
  }
</script>

<div class="setting">
  <h2 class="tab-title">{t.settings.notification.title}</h2>

  <!-- 风格选择 -->
  <div class="block">
    <label class="label" for="notif-style">{t.settings.notification.styleLabel}</label>
    <select
      id="notif-style"
      bind:value={style}
      class="select"
    >
      {#each STYLE_OPTIONS as s (s.key)}
        <option value={s.key}>{t.settings.notification.styleName[s.key]}</option>
      {/each}
    </select>
    <p class="hint">
      {isCustom ? t.settings.notification.styleHintCustom : t.settings.notification.styleHintPreset}
    </p>
  </div>

  <!-- 自定义风格的描述输入 -->
  {#if isCustom}
    <div class="block">
      <label class="label" for="notif-style-desc">{t.settings.notification.styleDesc}</label>
      <input
        id="notif-style-desc"
        type="text"
        bind:value={styleDesc}
        placeholder={t.settings.notification.styleDescPlaceholder}
        class="text-input"
      />
    </div>
  {/if}

  <!-- 6 个文案框(预设风格只读,跟随语言) -->
  <div class="fields">
    <!-- 专注结束 -->
    <section>
      <h3 class="group-title">{t.settings.notification.focusEnd}</h3>
      <label class="label" for="ntf-fe-title">{t.settings.notification.titleLabel}</label>
      <input
        id="ntf-fe-title"
        type="text"
        bind:value={fields.focus_end_title}
        disabled={!isCustom}
        class="text-input mb"
      />
      <label class="label" for="ntf-fe-body">{t.settings.notification.bodyLabel}</label>
      <input
        id="ntf-fe-body"
        type="text"
        bind:value={fields.focus_end_body}
        disabled={!isCustom}
        class="text-input"
      />
    </section>

    <!-- 休息结束 -->
    <section>
      <h3 class="group-title">{t.settings.notification.breakEnd}</h3>
      <label class="label" for="ntf-be-title">{t.settings.notification.titleLabel}</label>
      <input
        id="ntf-be-title"
        type="text"
        bind:value={fields.break_end_title}
        disabled={!isCustom}
        class="text-input mb"
      />
      <label class="label" for="ntf-be-body">{t.settings.notification.bodyLabel}</label>
      <input
        id="ntf-be-body"
        type="text"
        bind:value={fields.break_end_body}
        disabled={!isCustom}
        class="text-input"
      />
    </section>

    <!-- 任务提醒 -->
    <section>
      <h3 class="group-title">{t.settings.notification.reminder}</h3>
      <label class="label" for="ntf-rm-title">{t.settings.notification.titleLabel}</label>
      <input
        id="ntf-rm-title"
        type="text"
        bind:value={fields.reminder_title}
        disabled={!isCustom}
        class="text-input mb"
      />
      <label class="label" for="ntf-rm-body">{t.settings.notification.bodyLabel}</label>
      <input
        id="ntf-rm-body"
        type="text"
        bind:value={fields.reminder_body}
        disabled={!isCustom}
        class="text-input"
      />
      <p class="hint">{t.settings.notification.placeholderHint}</p>
    </section>
  </div>

  <!-- 保存 -->
  <div class="save-row">
    <button type="button" class="save-btn" onclick={handleSave}>
      <Save size={14} />
      {t.settings.notification.save}
    </button>
    {#if saved}<span class="saved">{t.settings.notification.saved}</span>{/if}
    {#if saveError}<span class="save-error" role="alert">{saveError}</span>{/if}
  </div>
</div>

<style>
  .setting {
    max-width: 36rem;
  }
  .tab-title {
    margin: 0 0 1rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .block {
    margin-bottom: 1rem;
  }
  .label {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  .select,
  .text-input {
    width: 100%;
    padding: 0.4rem 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 0.875rem;
  }
  .select {
    cursor: pointer;
  }
  .text-input:disabled {
    background: var(--color-neutral-50);
    color: var(--color-text-muted);
    cursor: not-allowed;
  }
  .text-input:focus:not(:disabled),
  .select:focus {
    outline: none;
    border-color: var(--color-accent-400);
    box-shadow: var(--shadow-focus);
  }
  .mb {
    margin-bottom: 0.5rem;
  }

  .hint {
    margin: 0.3rem 0 0;
    font-size: 0.75rem;
    color: var(--color-neutral-400);
    line-height: 1.5;
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .group-title {
    margin: 0 0 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
  }

  .save-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }
  .save-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--radius-md);
    background: var(--color-neutral-900);
    color: #fff;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background 0.15s;
  }
  .save-btn:hover {
    background: var(--color-neutral-700);
  }
  .saved {
    font-size: 0.75rem;
    color: var(--color-success);
  }
  .save-error {
    font-size: 0.75rem;
    color: var(--color-error);
  }
</style>
