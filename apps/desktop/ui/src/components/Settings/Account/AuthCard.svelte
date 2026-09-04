<script lang="ts">
  // 认证卡片(P1d,按参考原型规格移植):登录 / 注册 / 找回密码 三模式。
  //
  // 与原型的差异(已拍板裁剪,见 ADR-012):
  // - 邮箱登录 = 邮箱+密码(原型为验证码免密)
  // - 账号注册无手机号/短信;无用户协议勾选、无「记住我」
  // - 微信渠道展示二维码占位 + 「待资质」(模型已预留,不发起请求)

  import { QrCode } from "lucide-svelte";
  import { getDict, fmt } from "../../../lib/i18n.svelte";
  import {
    authLogin,
    authLoginEmail,
    authRegister,
    authRegisterEmail,
    authSendEmailCode,
    authResetPassword,
    type AuthStatus,
  } from "../../../lib/api";
  import StrengthBar from "./StrengthBar.svelte";
  import { createCooldown } from "./cooldown.svelte";

  let { onLoggedIn }: { onLoggedIn: (s: AuthStatus) => void } = $props();

  const t = $derived(getDict());
  const cooldown = createCooldown(60);
  $effect(() => () => cooldown.destroy());

  type Mode = "login" | "register" | "forgot";
  let mode = $state<Mode>("login");
  let loginTab = $state<"account" | "email" | "wechat">("account");
  let regTab = $state<"email" | "account" | "wechat">("email");

  // 登录/注册表单
  let username = $state("");
  let email = $state("");
  let password = $state("");
  let password2 = $state("");
  let code = $state("");

  // 找回密码
  let forgotAccount = $state("");
  let forgotCode = $state("");
  let forgotStep = $state<1 | 2 | 3>(1);

  let busy = $state<string | null>(null);
  let error = $state<string | null>(null);

  const titles = $derived.by(() => {
    const a = t.settings.account;
    return {
      login: [a.welcome, a.welcomeSub],
      register: [a.createTitle, a.createSub],
      forgot: [a.forgotTitle, a.forgotSub],
    } as Record<Mode, [string, string]>;
  });

  const stepLabels = $derived([
    t.settings.account.step1,
    t.settings.account.step2,
    t.settings.account.step3,
  ]);

  function switchMode(m: Mode) {
    mode = m;
    error = null;
    if (m === "forgot") forgotStep = 1;
  }

  const emailOk = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim());

  async function sendCode(purpose: "register" | "reset") {
    if (busy || cooldown.active) return;
    const target = purpose === "reset" ? forgotAccount : email;
    if (!emailOk(target)) {
      error = t.settings.account.invalidEmail;
      return;
    }
    busy = "send";
    error = null;
    try {
      await authSendEmailCode(target.trim(), purpose);
      cooldown.start();
      if (purpose === "reset") forgotStep = 2;
    } catch (e) {
      error = String(e);
    } finally {
      busy = null;
    }
  }

  async function doLogin() {
    if (busy) return;
    busy = "login";
    error = null;
    try {
      const st =
        loginTab === "email"
          ? await authLoginEmail(email.trim(), password)
          : await authLogin(username.trim(), password);
      onLoggedIn(st);
    } catch (e) {
      error = String(e);
    } finally {
      busy = null;
    }
  }

  async function doRegister() {
    if (busy) return;
    if (password !== password2) {
      error = t.settings.sync.passMismatch;
      return;
    }
    busy = "register";
    error = null;
    try {
      const st =
        regTab === "email"
          ? await authRegisterEmail(email.trim(), code.trim(), password)
          : await authRegister(username.trim(), password);
      onLoggedIn(st);
    } catch (e) {
      error = String(e);
    } finally {
      busy = null;
    }
  }

  async function doReset() {
    if (busy) return;
    if (!forgotAccount.trim() || !forgotCode.trim() || !password) {
      error = t.settings.account.forgotMissing;
      return;
    }
    if (password !== password2) {
      error = t.settings.sync.passMismatch;
      return;
    }
    busy = "reset";
    error = null;
    try {
      await authResetPassword(forgotAccount.trim(), forgotCode.trim(), password);
      forgotStep = 3;
    } catch (e) {
      error = String(e);
    } finally {
      busy = null;
    }
  }
</script>

<div class="auth-wrap">
  <div class="auth-card">
    <div class="auth-logo">
      <div class="icon">🍅</div>
      <h1>{titles[mode][0]}</h1>
      <p>{titles[mode][1]}</p>
    </div>

    <div class="auth-tabs" role="tablist">
      <button type="button" role="tab" class="auth-tab" class:active={mode === "login"} onclick={() => switchMode("login")}>
        {t.settings.account.tabLogin}
      </button>
      <button type="button" role="tab" class="auth-tab" class:active={mode === "register"} onclick={() => switchMode("register")}>
        {t.settings.account.tabRegister}
      </button>
      <button type="button" role="tab" class="auth-tab" class:active={mode === "forgot"} onclick={() => switchMode("forgot")}>
        {t.settings.account.tabForgot}
      </button>
    </div>

    {#if mode === "login"}
      <div class="view-tabs">
        <button type="button" class="view-tab" class:active={loginTab === "account"} onclick={() => (loginTab = "account")}>
          {t.settings.account.loginAccount}
        </button>
        <button type="button" class="view-tab" class:active={loginTab === "email"} onclick={() => (loginTab = "email")}>
          {t.settings.account.loginEmail}
        </button>
        <button type="button" class="view-tab" class:active={loginTab === "wechat"} onclick={() => (loginTab = "wechat")}>
          {t.settings.account.loginWechat}
        </button>
      </div>

      {#if loginTab === "account"}
        <div class="form-group">
          <label class="form-label" for="f-username">{t.settings.account.username}</label>
          <input id="f-username" class="form-input" placeholder={t.settings.account.usernamePh} bind:value={username} autocomplete="username" />
        </div>
        <div class="form-group">
          <label class="form-label" for="f-password">{t.settings.account.password}</label>
          <input id="f-password" class="form-input" type="password" placeholder={t.settings.account.passwordPh} bind:value={password} autocomplete="current-password" />
        </div>
        <div class="form-row">
          <span class="link" role="button" tabindex="0" onclick={() => switchMode("forgot")} onkeydown={(e) => e.key === "Enter" && switchMode("forgot")}>
            {t.settings.account.forgotLink}
          </span>
        </div>
        <button class="btn-primary" disabled={busy !== null} onclick={() => void doLogin()}>
          {busy === "login" ? t.settings.sync.working : t.settings.account.login}
        </button>
      {:else if loginTab === "email"}
        <div class="form-group">
          <label class="form-label" for="f-email">{t.settings.account.email}</label>
          <input id="f-email" class="form-input" type="email" placeholder={t.settings.account.emailPh} bind:value={email} autocomplete="email" />
        </div>
        <div class="form-group">
          <label class="form-label" for="f-password">{t.settings.account.password}</label>
          <input id="f-password" class="form-input" type="password" placeholder={t.settings.account.passwordPh} bind:value={password} autocomplete="current-password" />
        </div>
        <div class="form-row">
          <span class="link" role="button" tabindex="0" onclick={() => switchMode("forgot")} onkeydown={(e) => e.key === "Enter" && switchMode("forgot")}>
            {t.settings.account.forgotLink}
          </span>
        </div>
        <button class="btn-primary" disabled={busy !== null} onclick={() => void doLogin()}>
          {busy === "login" ? t.settings.sync.working : t.settings.account.login}
        </button>
      {:else}
        <div class="qr-area">
          <div class="qr-box"><QrCode size={72} /></div>
          <div class="qr-tip">
            <strong>{t.settings.account.wechatScan}</strong>
            <span>{t.settings.account.wechatPending}</span>
          </div>
        </div>
      {/if}

      <div class="switch-link">
        {t.settings.account.noAccount}
        <span class="link" role="button" tabindex="0" onclick={() => switchMode("register")} onkeydown={(e) => e.key === "Enter" && switchMode("register")}>
          {t.settings.account.registerNow}
        </span>
      </div>
    {:else if mode === "register"}
      <div class="view-tabs">
        <button type="button" class="view-tab" class:active={regTab === "email"} onclick={() => (regTab = "email")}>
          {t.settings.account.regEmail}
        </button>
        <button type="button" class="view-tab" class:active={regTab === "account"} onclick={() => (regTab = "account")}>
          {t.settings.account.regAccount}
        </button>
        <button type="button" class="view-tab" class:active={regTab === "wechat"} onclick={() => (regTab = "wechat")}>
          {t.settings.account.regWechat}
        </button>
      </div>

      {#if regTab === "email"}
        <div class="form-group">
          <label class="form-label" for="f-email">{t.settings.account.email}</label>
          <input id="f-email" class="form-input" type="email" placeholder={t.settings.account.emailPh} bind:value={email} autocomplete="email" />
        </div>
        <div class="form-group">
          <label class="form-label" for="f-code">{t.settings.account.code}</label>
          <div class="code-row">
            <input id="f-code" class="form-input code-input" inputmode="numeric" maxlength="6" placeholder={t.settings.account.codePh} bind:value={code} />
            <button
              type="button"
              class="send-code-btn"
              disabled={busy !== null || cooldown.active}
              onclick={() => void sendCode("register")}
            >
              {cooldown.active
                ? fmt(t.settings.account.resend, { n: cooldown.remaining })
                : busy === "send"
                  ? t.settings.sync.working
                  : t.settings.account.sendCode}
            </button>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="f-password">{t.settings.account.password}</label>
          <input id="f-password" class="form-input" type="password" placeholder={t.settings.account.passwordPh} bind:value={password} autocomplete="new-password" />
          <StrengthBar value={password} />
        </div>
        <div class="form-group">
          <label class="form-label" for="f-password2">{t.settings.account.confirmPass}</label>
          <input id="f-password2" class="form-input" type="password" placeholder={t.settings.account.confirmPh} bind:value={password2} autocomplete="new-password" />
        </div>
        <button class="btn-primary" disabled={busy !== null} onclick={() => void doRegister()}>
          {busy === "register" ? t.settings.sync.working : t.settings.account.register}
        </button>
      {:else if regTab === "account"}
        <div class="form-group">
          <label class="form-label" for="f-username">{t.settings.account.username}</label>
          <input id="f-username" class="form-input" placeholder={t.settings.account.usernamePh} bind:value={username} autocomplete="username" />
        </div>
        <div class="form-group">
          <label class="form-label" for="f-password">{t.settings.account.password}</label>
          <input id="f-password" class="form-input" type="password" placeholder={t.settings.account.passwordPh} bind:value={password} autocomplete="new-password" />
          <StrengthBar value={password} />
        </div>
        <div class="form-group">
          <label class="form-label" for="f-password2">{t.settings.account.confirmPass}</label>
          <input id="f-password2" class="form-input" type="password" placeholder={t.settings.account.confirmPh} bind:value={password2} autocomplete="new-password" />
        </div>
        <button class="btn-primary" disabled={busy !== null} onclick={() => void doRegister()}>
          {busy === "register" ? t.settings.sync.working : t.settings.account.register}
        </button>
      {:else}
        <div class="qr-area">
          <div class="qr-box"><QrCode size={72} /></div>
          <div class="qr-tip">
            <strong>{t.settings.account.wechatScan}</strong>
            <span>{t.settings.account.wechatRegTip}</span>
            <span>{t.settings.account.wechatPending}</span>
          </div>
        </div>
      {/if}

      <div class="switch-link">
        {t.settings.account.hasAccount}
        <span class="link" role="button" tabindex="0" onclick={() => switchMode("login")} onkeydown={(e) => e.key === "Enter" && switchMode("login")}>
          {t.settings.account.goLogin}
        </span>
      </div>
    {:else}
      <!-- 找回密码:三步指示器 -->
      <div class="step-indicator">
        {#each [1, 2, 3] as n (n)}
          <div class="step-col">
            <div class="step-dot" class:active={forgotStep === n} class:done={forgotStep > n}>
              {forgotStep > n ? "✓" : n}
            </div>
            <div class="step-label" class:active={forgotStep >= n}>
              {stepLabels[n - 1]}
            </div>
          </div>
          {#if n < 3}<div class="step-line"></div>{/if}
        {/each}
      </div>

      {#if forgotStep === 1}
        <div class="form-group">
          <label class="form-label" for="f-forgot-account">{t.settings.account.forgotAccount}</label>
          <input id="f-forgot-account" class="form-input" placeholder={t.settings.account.forgotAccountPh} bind:value={forgotAccount} autocomplete="email" />
        </div>
        <div class="form-group">
          <label class="form-label" for="f-forgot-code">{t.settings.account.code}</label>
          <div class="code-row">
            <input id="f-forgot-code" class="form-input code-input" inputmode="numeric" maxlength="6" placeholder={t.settings.account.codePh} bind:value={forgotCode} />
            <button
              type="button"
              class="send-code-btn"
              disabled={busy !== null || cooldown.active}
              onclick={() => void sendCode("reset")}
            >
              {cooldown.active
                ? fmt(t.settings.account.resend, { n: cooldown.remaining })
                : busy === "send"
                  ? t.settings.sync.working
                  : t.settings.account.sendCode}
            </button>
          </div>
        </div>
        <button class="btn-primary" disabled={busy !== null || !forgotCode} onclick={() => (forgotStep = 2)}>
          {t.settings.account.next}
        </button>
        <button class="btn-secondary" onclick={() => switchMode("login")}>
          {t.settings.account.backToLogin}
        </button>
      {:else if forgotStep === 2}
        <div class="form-group">
          <label class="form-label" for="f-password">{t.settings.account.newPass}</label>
          <input id="f-password" class="form-input" type="password" placeholder={t.settings.account.passwordPh} bind:value={password} autocomplete="new-password" />
          <StrengthBar value={password} />
        </div>
        <div class="form-group">
          <label class="form-label" for="f-password2">{t.settings.account.newPass2}</label>
          <input class="form-input" type="password" placeholder={t.settings.account.confirmPh} bind:value={password2} autocomplete="new-password" />
        </div>
        <button class="btn-primary" disabled={busy !== null} onclick={() => void doReset()}>
          {busy === "reset" ? t.settings.sync.working : t.settings.account.resetBtn}
        </button>
        <button class="btn-secondary" disabled={busy !== null} onclick={() => (forgotStep = 1)}>
          {t.settings.account.prev}
        </button>
      {:else}
        <div class="done-area">
          <div class="success-icon">✓</div>
          <div class="success-text">{t.settings.account.resetOk}</div>
          <div class="success-sub">{t.settings.account.resetOkSub}</div>
          <button class="btn-primary" onclick={() => switchMode("login")}>
            {t.settings.account.backToLogin}
          </button>
        </div>
      {/if}
    {/if}

    {#if error}
      <div class="error" role="alert">⚠ {error}</div>
    {/if}
  </div>
</div>

<style>
  .auth-wrap {
    display: flex;
    justify-content: center;
    padding: 0.5rem 0 0;
  }
  .auth-card {
    width: 100%;
    /* 与登录后"个人资料"内容区同宽(用户指定),视觉宽度一致 */
    max-width: 46rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 2.5rem 3rem;
    box-shadow: var(--shadow-sm);
  }
  .auth-logo {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .auth-logo .icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: color-mix(in srgb, var(--color-accent-500) 12%, transparent);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
  .auth-logo h1 {
    font-size: 15px;
    font-weight: 500;
    margin-top: 10px;
    color: var(--color-text);
  }
  .auth-logo p {
    font-size: 13px;
    color: var(--color-text-muted);
    margin-top: 4px;
  }

  .auth-tabs {
    display: flex;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid var(--color-border);
  }
  .auth-tab {
    flex: 1;
    padding: 10px 4px;
    font-size: 13px;
    color: var(--color-text-muted);
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
  }
  .auth-tab.active {
    color: var(--color-accent-600);
    font-weight: 500;
    border-bottom-color: var(--color-accent-500);
  }

  .view-tabs {
    display: flex;
    margin-bottom: 1.25rem;
    background: var(--color-neutral-50, #f5f5f5);
    border-radius: 8px;
    padding: 3px;
  }
  .view-tab {
    flex: 1;
    padding: 7px 4px;
    font-size: 12px;
    color: var(--color-text-muted);
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .view-tab.active {
    background: var(--color-surface);
    color: var(--color-text);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
  }

  .form-group {
    margin-bottom: 18px;
  }
  .form-label {
    display: block;
    font-size: 12px;
    color: var(--color-text-muted);
    margin-bottom: 7px;
  }
  .form-input {
    width: 100%;
    padding: 11px 12px;
    font-size: 13px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: var(--color-surface);
    color: var(--color-text);
    outline: none;
    transition: border 0.2s;
    font-family: inherit;
  }
  .form-input:focus {
    border-color: var(--color-accent-400);
  }
  .code-row {
    display: flex;
    gap: 8px;
  }
  .code-row .form-input {
    flex: 1;
  }
  .code-input {
    text-align: center;
    letter-spacing: 0.15em;
  }
  .send-code-btn {
    white-space: nowrap;
    padding: 10px 14px;
    font-size: 12px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: transparent;
    color: var(--color-accent-600);
    cursor: pointer;
    font-family: inherit;
    transition: background 0.2s;
  }
  .send-code-btn:hover:not(:disabled) {
    background: color-mix(in srgb, var(--color-accent-500) 10%, transparent);
  }
  .send-code-btn:disabled {
    color: var(--color-text-muted);
    cursor: not-allowed;
  }

  .btn-primary {
    width: 100%;
    padding: 11px;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    background: var(--color-accent-500);
    color: #fff;
    cursor: pointer;
    transition: opacity 0.2s;
    font-family: inherit;
    margin-top: 10px;
  }
  .btn-primary:hover:not(:disabled) {
    opacity: 0.9;
  }
  .btn-primary:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
  .btn-secondary {
    width: 100%;
    padding: 11px;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: transparent;
    color: var(--color-text);
    cursor: pointer;
    font-family: inherit;
    margin-top: 6px;
  }
  .btn-secondary:hover:not(:disabled) {
    background: var(--color-neutral-50, #f5f5f5);
  }

  .form-row {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 18px;
    font-size: 12px;
  }
  .link {
    color: var(--color-accent-600);
    cursor: pointer;
  }
  .link:hover {
    text-decoration: underline;
  }
  .switch-link {
    text-align: center;
    font-size: 13px;
    color: var(--color-text-muted);
    margin-top: 1.5rem;
  }
  .switch-link .link {
    margin-left: 4px;
  }

  .qr-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
  }
  .qr-box {
    width: 150px;
    height: 150px;
    border: 2px dashed var(--color-border);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    opacity: 0.6;
  }
  .qr-tip {
    margin-top: 12px;
    text-align: center;
    font-size: 13px;
    color: var(--color-text-muted);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .qr-tip strong {
    color: var(--color-text);
    font-weight: 500;
  }

  .step-indicator {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  .step-col {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .step-dot {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid var(--color-border);
    background: var(--color-neutral-50, #f5f5f5);
    color: var(--color-text-muted);
  }
  .step-dot.active {
    background: var(--color-accent-500);
    color: #fff;
    border-color: var(--color-accent-500);
  }
  .step-dot.done {
    background: var(--color-accent-500);
    color: #fff;
    border-color: var(--color-accent-500);
  }
  .step-line {
    width: 40px;
    height: 1px;
    background: var(--color-border);
    margin: 0 6px;
    align-self: flex-start;
    margin-top: 12px;
  }
  .step-label {
    font-size: 11px;
    color: var(--color-text-muted);
    margin-top: 4px;
  }
  .step-label.active {
    color: var(--color-text);
  }

  .done-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
  }
  .success-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--color-accent-500) 12%, transparent);
    color: var(--color-accent-600);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 1rem;
  }
  .success-text {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 6px;
    color: var(--color-text);
  }
  .success-sub {
    font-size: 13px;
    color: var(--color-text-muted);
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .error {
    margin-top: 1rem;
    padding: 0.6rem 0.75rem;
    border-radius: 8px;
    background: #fee2e2;
    color: #991b1b;
    font-size: 13px;
  }
</style>
