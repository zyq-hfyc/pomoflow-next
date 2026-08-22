<script lang="ts">
  // 账号管理中心(P1d,按参考原型 widget.html 规格移植)。
  //
  // 相对原型的裁剪(ADR-012):无头像/签名/手机号;无 2FA;第三方只留微信(待资质);
  // 无账号注销区(danger zone,P4)。设备元信息为设备自报名+登录时间(无 IP 地理)。

  import { UserRound, ShieldCheck, Link2, MonitorSmartphone, QrCode } from "lucide-svelte";
  import { getDict, fmt } from "../../../lib/i18n.svelte";
  import {
    authLogout,
    authChangePassword,
    authGetProfile,
    authUpdateDisplayName,
    authUpdateUsername,
    authBindEmail,
    authSendEmailCode,
    authListSessions,
    authRevokeSession,
    authRevokeOthers,
    type AccountProfile,
    type SessionInfo,
  } from "../../../lib/api";
  import AccountModal from "./AccountModal.svelte";
  import StrengthBar from "./StrengthBar.svelte";
  import { createCooldown } from "./cooldown.svelte";

  let { onLoggedOut }: { onLoggedOut: () => void } = $props();

  const t = $derived(getDict());
  const cooldown = createCooldown(60);
  $effect(() => () => cooldown.destroy());

  type Section = "profile" | "security" | "thirdparty" | "devices";
  let section = $state<Section>("profile");
  let profile = $state<AccountProfile | null>(null);
  let sessions = $state<SessionInfo[] | null>(null);
  let error = $state<string | null>(null);
  let notice = $state("");
  let busy = $state(false);
  let loggingOut = $state(false);

  // 弹窗状态:nickname / username / email(绑定换绑) / password
  let modal = $state<null | "nickname" | "username" | "email" | "password">(null);
  let mNick = $state("");
  let mUser = $state("");
  let mPass = $state(""); // 当前密码 / 旧密码(按弹窗用途)
  let mNewPass = $state("");
  let mNewPass2 = $state("");
  let mEmail = $state("");
  let mCode = $state("");

  const display = $derived(
    profile ? profile.display_name || profile.username : "",
  );

  async function loadProfile() {
    try {
      profile = await authGetProfile();
    } catch (e) {
      error = String(e);
    }
  }

  async function loadSessions() {
    if (busy) return;
    busy = true;
    error = null;
    try {
      sessions = await authListSessions();
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  async function logout() {
    if (loggingOut) return;
    loggingOut = true;
    try {
      await authLogout();
      onLoggedOut();
    } catch (e) {
      error = String(e);
    } finally {
      loggingOut = false;
    }
  }

  function openModal(kind: typeof modal) {
    error = null;
    mNick = profile?.display_name ?? "";
    mUser = profile?.username ?? "";
    mPass = mNewPass = mNewPass2 = mEmail = mCode = "";
    modal = kind;
  }

  async function saveNickname() {
    if (busy) return;
    busy = true;
    error = null;
    try {
      await authUpdateDisplayName(mNick);
      await loadProfile();
      modal = null;
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  async function saveUsername() {
    if (busy) return;
    busy = true;
    error = null;
    try {
      await authUpdateUsername(mUser.trim(), mPass);
      await loadProfile();
      modal = null;
      notice = t.settings.account.usernameChanged;
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  async function saveEmail() {
    if (busy) return;
    busy = true;
    error = null;
    try {
      await authBindEmail(mEmail.trim(), mCode.trim(), mPass);
      await loadProfile();
      modal = null;
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  async function savePassword() {
    if (busy) return;
    if (mNewPass !== mNewPass2) {
      error = t.settings.sync.passMismatch;
      return;
    }
    busy = true;
    error = null;
    try {
      await authChangePassword(mPass, mNewPass);
      modal = null;
      notice = t.settings.sync.passChanged;
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  async function sendCode() {
    if (busy || cooldown.active) return;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mEmail.trim())) {
      error = t.settings.account.invalidEmail;
      return;
    }
    busy = true;
    error = null;
    try {
      await authSendEmailCode(mEmail.trim(), "bind");
      cooldown.start();
    } catch (e) {
      error = String(e);
    } finally {
      busy = null;
    }
  }

  async function kick(id: number) {
    if (busy) return;
    busy = true;
    error = null;
    try {
      await authRevokeSession(id);
      sessions = await authListSessions();
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  async function revokeOthers() {
    if (busy) return;
    busy = true;
    error = null;
    try {
      const n = await authRevokeOthers();
      sessions = await authListSessions();
      notice = fmt(t.settings.sync.revokedFmt, { n });
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  const pwChangedText = $derived.by(() => {
    if (!profile?.password_changed_ms) return "";
    return fmt(t.settings.account.lastChanged, {
      time: new Date(profile.password_changed_ms).toLocaleDateString(),
    });
  });

  // 挂载即拉资料;设备区进入时拉会话
  $effect(() => {
    void loadProfile();
  });
  $effect(() => {
    if (section === "devices" && sessions === null) void loadSessions();
  });
</script>

<div class="ac-wrap">
  <!-- 左侧导航 -->
  <aside class="ac-sidebar">
    <div class="ac-sidebar-header">
      <div class="av">{display.slice(0, 1).toUpperCase() || "?"}</div>
      <div class="name">{display}</div>
      <div class="email">{profile?.email ?? profile?.username ?? "…"}</div>
    </div>
    <nav class="ac-nav">
      <button type="button" class="ac-nav-item" class:active={section === "profile"} onclick={() => (section = "profile")}>
        <UserRound size={16} />{t.settings.account.profile}
      </button>
      <button type="button" class="ac-nav-item" class:active={section === "security"} onclick={() => (section = "security")}>
        <ShieldCheck size={16} />{t.settings.account.security}
      </button>
      <button type="button" class="ac-nav-item" class:active={section === "thirdparty"} onclick={() => (section = "thirdparty")}>
        <Link2 size={16} />{t.settings.account.thirdparty}
      </button>
      <button type="button" class="ac-nav-item" class:active={section === "devices"} onclick={() => (section = "devices")}>
        <MonitorSmartphone size={16} />{t.settings.account.devices}
      </button>
    </nav>
    <div class="ac-sidebar-footer">
      <button type="button" class="ac-btn-sm" disabled={loggingOut} onclick={() => void logout()}>
        {loggingOut ? t.settings.sync.loggingOut : t.settings.sync.logout}
      </button>
    </div>
  </aside>

  <!-- 右侧内容 -->
  <div class="ac-content">
    {#if notice}<div class="notice">✓ {notice}</div>{/if}
    {#if error}<div class="err" role="alert">⚠ {error}</div>{/if}

    {#if section === "profile"}
      <div class="ac-section-title">{t.settings.account.profile}</div>
      <div class="ac-section-desc">{t.settings.account.profileDesc}</div>
      <div class="ac-card">
        <div class="ac-field">
          <div>
            <div class="ac-field-label">{t.settings.account.nickname}</div>
            <div class="ac-field-desc">{t.settings.account.nicknameDesc}</div>
          </div>
          <div class="ac-field-side">
            <span class="ac-field-value">{profile?.display_name || "—"}</span>
            <button type="button" class="ac-btn-sm" onclick={() => openModal("nickname")}>
              {t.settings.account.edit}
            </button>
          </div>
        </div>
        <div class="ac-field">
          <div>
            <div class="ac-field-label">{t.settings.account.usernameLabel}</div>
            <div class="ac-field-desc">{t.settings.account.usernameDesc}</div>
          </div>
          <div class="ac-field-side">
            <span class="ac-field-value">{profile?.username ?? "…"}</span>
            <button type="button" class="ac-btn-sm" onclick={() => openModal("username")}>
              {t.settings.account.edit}
            </button>
          </div>
        </div>
        <div class="ac-field">
          <div>
            <div class="ac-field-label">{t.settings.account.emailLabel}</div>
            <div class="ac-field-desc">{t.settings.account.emailDesc}</div>
          </div>
          <div class="ac-field-side">
            <span class="ac-field-value">{profile?.email ?? t.settings.account.unbound}</span>
            {#if profile?.email_verified}<span class="ac-badge bound">{t.settings.account.verified}</span>{/if}
            <button type="button" class="ac-btn-sm" onclick={() => openModal("email")}>
              {profile?.email ? t.settings.account.edit : t.settings.account.bindBtn}
            </button>
          </div>
        </div>
      </div>
    {:else if section === "security"}
      <div class="ac-section-title">{t.settings.account.security}</div>
      <div class="ac-section-desc">{t.settings.account.securityDesc}</div>
      <div class="ac-card">
        <div class="ac-field">
          <div>
            <div class="ac-field-label">{t.settings.account.loginPassword}</div>
            {#if pwChangedText}<div class="ac-field-desc">{pwChangedText}</div>{/if}
          </div>
          <button type="button" class="ac-btn-primary-sm" onclick={() => openModal("password")}>
            {t.settings.account.changePw}
          </button>
        </div>
        <div class="ac-field">
          <div>
            <div class="ac-field-label">{t.settings.account.emailLabel}</div>
            <div class="ac-field-desc">{profile?.email ?? t.settings.account.unbound}</div>
          </div>
          {#if profile?.email_verified}
            <span class="ac-badge bound">{t.settings.account.verified}</span>
          {:else}
            <span class="ac-badge unbound">{t.settings.account.unbound}</span>
          {/if}
        </div>
      </div>
    {:else if section === "thirdparty"}
      <div class="ac-section-title">{t.settings.account.thirdparty}</div>
      <div class="ac-section-desc">{t.settings.account.thirdpartyDesc}</div>
      <div class="ac-card">
        <div class="ac-field">
          <div class="ac-field-left">
            <div class="device-icon"><QrCode size={18} /></div>
            <div>
              <div class="ac-field-label">{t.settings.account.wechatRow}</div>
              <div class="ac-field-desc">{t.settings.account.wechatRowDesc}</div>
            </div>
          </div>
          <span class="ac-badge unbound">{t.settings.account.wechatPendingBadge}</span>
        </div>
      </div>
    {:else}
      <div class="ac-section-title">{t.settings.account.devices}</div>
      <div class="ac-section-desc">{t.settings.account.devicesDesc}</div>
      <div class="ac-card">
        {#if sessions === null}
          <div class="ac-field">
            <span class="ac-field-desc">{t.common.loading}</span>
            <button type="button" class="ac-btn-sm" disabled={busy} onclick={() => void loadSessions()}>
              {t.settings.sync.devicesReload}
            </button>
          </div>
        {:else}
          {#each sessions as ss (ss.id)}
            <div class="device-row">
              <div class="device-icon"><MonitorSmartphone size={18} /></div>
              <div class="device-info">
                <div class="device-name">
                  {ss.device_name || ss.device_id.slice(0, 8)}
                  {#if ss.current}<span class="device-current">{t.settings.sync.currentDevice}</span>{/if}
                </div>
                <div class="device-meta">
                  {fmt(t.settings.account.deviceAt, { time: new Date(ss.created_ms).toLocaleString() })}
                </div>
              </div>
              {#if !ss.current}
                <button type="button" class="ac-btn-sm" disabled={busy} onclick={() => void kick(ss.id)}>
                  {t.settings.sync.kick}
                </button>
              {/if}
            </div>
          {/each}
          {#if sessions.length <= 1}
            <div class="device-row">
              <div class="device-meta">{t.settings.sync.noOtherDevices}</div>
            </div>
          {/if}
        {/if}
      </div>
      {#if sessions && sessions.some((s) => !s.current)}
        <div class="devices-footer">
          <button type="button" class="ac-btn-danger-sm" disabled={busy} onclick={() => void revokeOthers()}>
            {t.settings.sync.revokeOthers}
          </button>
        </div>
      {/if}
    {/if}
  </div>
</div>

<!-- 编辑弹窗们 -->
<AccountModal
  open={modal === "nickname"}
  title={t.settings.account.editNickname}
  desc={t.settings.account.nicknameDesc}
  onClose={() => (modal = null)}
>
  <input class="modal-input" maxlength="32" bind:value={mNick} />
  <div class="ac-modal-btns">
    <button type="button" class="cancel" onclick={() => (modal = null)}>{t.settings.account.cancel}</button>
    <button type="button" class="confirm" disabled={busy} onclick={() => void saveNickname()}>{t.settings.account.save}</button>
  </div>
</AccountModal>

<AccountModal
  open={modal === "username"}
  title={t.settings.account.editUsername}
  desc={t.settings.account.usernameModalDesc}
  onClose={() => (modal = null)}
>
  <input class="modal-input" maxlength="32" bind:value={mUser} placeholder={t.settings.account.usernamePh} />
  <input class="modal-input" type="password" bind:value={mPass} placeholder={t.settings.account.curPass} autocomplete="current-password" />
  <div class="ac-modal-btns">
    <button type="button" class="cancel" onclick={() => (modal = null)}>{t.settings.account.cancel}</button>
    <button type="button" class="confirm" disabled={busy} onclick={() => void saveUsername()}>{t.settings.account.save}</button>
  </div>
</AccountModal>

<AccountModal
  open={modal === "email"}
  title={profile?.email ? t.settings.account.editEmail : t.settings.account.bindEmailTitle}
  desc={t.settings.account.bindEmailDesc}
  onClose={() => (modal = null)}
>
  <input class="modal-input" type="email" bind:value={mEmail} placeholder={t.settings.account.emailPh} autocomplete="email" />
  <div class="code-row-m">
    <input class="modal-input code-m" inputmode="numeric" maxlength="6" bind:value={mCode} placeholder={t.settings.account.codePh} />
    <button type="button" class="ac-btn-sm" disabled={busy || cooldown.active} onclick={() => void sendCode()}>
      {cooldown.active
        ? fmt(t.settings.account.resend, { n: cooldown.remaining })
        : t.settings.account.sendCode}
    </button>
  </div>
  <input class="modal-input" type="password" bind:value={mPass} placeholder={t.settings.account.curPass} autocomplete="current-password" />
  <div class="ac-modal-btns">
    <button type="button" class="cancel" onclick={() => (modal = null)}>{t.settings.account.cancel}</button>
    <button type="button" class="confirm" disabled={busy} onclick={() => void saveEmail()}>{t.settings.account.confirm}</button>
  </div>
</AccountModal>

<AccountModal
  open={modal === "password"}
  title={t.settings.account.changePw}
  desc={t.settings.account.changePwDesc}
  onClose={() => (modal = null)}
>
  <input class="modal-input" type="password" bind:value={mPass} placeholder={t.settings.account.curPass} autocomplete="current-password" />
  <input class="modal-input" type="password" bind:value={mNewPass} placeholder={t.settings.account.passwordPh} autocomplete="new-password" />
  <StrengthBar value={mNewPass} />
  <input class="modal-input" style="margin-top: 12px" type="password" bind:value={mNewPass2} placeholder={t.settings.account.confirmPh} autocomplete="new-password" />
  <div class="ac-modal-btns">
    <button type="button" class="cancel" onclick={() => (modal = null)}>{t.settings.account.cancel}</button>
    <button type="button" class="confirm" disabled={busy} onclick={() => void savePassword()}>{t.settings.account.confirm}</button>
  </div>
</AccountModal>

<style>
  .ac-wrap {
    display: flex;
    border: 1px solid var(--color-border);
    border-radius: 16px;
    overflow: hidden;
    background: var(--color-surface);
  }
  .ac-sidebar {
    width: 180px;
    flex-shrink: 0;
    background: var(--color-neutral-50, #f5f5f5);
    border-right: 1px solid var(--color-border);
    padding: 16px 0;
    display: flex;
    flex-direction: column;
  }
  .ac-sidebar-header {
    padding: 0 20px 16px;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 12px;
  }
  .ac-sidebar-header .av {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--color-accent-500) 14%, transparent);
    color: var(--color-accent-600);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  .ac-sidebar-header .name {
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text);
  }
  .ac-sidebar-header .email {
    font-size: 11px;
    color: var(--color-text-muted);
    margin-top: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ac-nav {
    padding: 0 8px;
    flex: 1;
  }
  .ac-nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 10px 12px;
    font-size: 13px;
    color: var(--color-text-muted);
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s;
    margin-bottom: 2px;
  }
  .ac-nav-item:hover {
    background: color-mix(in srgb, var(--color-text) 4%, transparent);
  }
  .ac-nav-item.active {
    background: color-mix(in srgb, var(--color-accent-500) 12%, transparent);
    color: var(--color-accent-600);
    font-weight: 500;
  }
  .ac-sidebar-footer {
    padding: 12px 16px 0;
    border-top: 1px solid var(--color-border);
  }

  .ac-content {
    flex: 1;
    padding: 24px;
    min-width: 0;
  }
  .ac-section-title {
    font-size: 15px;
    font-weight: 500;
    color: var(--color-text);
    margin-bottom: 4px;
  }
  .ac-section-desc {
    font-size: 13px;
    color: var(--color-text-muted);
    margin-bottom: 20px;
  }
  .ac-card {
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 4px 20px;
    margin-bottom: 16px;
    background: var(--color-surface);
  }
  .ac-field {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 0;
    border-bottom: 1px solid color-mix(in srgb, var(--color-border) 60%, transparent);
  }
  .ac-field:last-child {
    border-bottom: none;
  }
  .ac-field-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .ac-field-side {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ac-field-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text);
  }
  .ac-field-desc {
    font-size: 12px;
    color: var(--color-text-muted);
    margin-top: 2px;
  }
  .ac-field-value {
    font-size: 13px;
    color: var(--color-text-muted);
    max-width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ac-btn-sm {
    padding: 6px 16px;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: transparent;
    color: var(--color-text);
    cursor: pointer;
    font-family: inherit;
    white-space: nowrap;
  }
  .ac-btn-sm:hover:not(:disabled) {
    background: var(--color-neutral-50, #f5f5f5);
  }
  .ac-btn-primary-sm {
    padding: 6px 16px;
    font-size: 12px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    background: var(--color-accent-500);
    color: #fff;
    cursor: pointer;
    font-family: inherit;
    white-space: nowrap;
  }
  .ac-btn-primary-sm:hover {
    opacity: 0.9;
  }
  .ac-btn-danger-sm {
    padding: 6px 16px;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid #e24b4a;
    border-radius: 8px;
    background: transparent;
    color: #e24b4a;
    cursor: pointer;
    font-family: inherit;
    white-space: nowrap;
  }
  .ac-btn-danger-sm:hover:not(:disabled) {
    background: #fcebeb;
  }
  .ac-btn-sm:disabled,
  .ac-btn-primary-sm:disabled,
  .ac-btn-danger-sm:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .ac-badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 8px;
    font-size: 11px;
    border-radius: 6px;
    font-weight: 500;
    white-space: nowrap;
  }
  .ac-badge.bound {
    background: color-mix(in srgb, var(--color-accent-500) 12%, transparent);
    color: var(--color-accent-600);
  }
  .ac-badge.unbound {
    background: var(--color-neutral-100, #eee);
    color: var(--color-text-muted);
  }

  .device-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 0;
    border-bottom: 1px solid color-mix(in srgb, var(--color-border) 60%, transparent);
  }
  .device-row:last-child {
    border-bottom: none;
  }
  .device-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--color-neutral-50, #f5f5f5);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--color-accent-600);
  }
  .device-info {
    flex: 1;
    min-width: 0;
  }
  .device-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text);
  }
  .device-current {
    font-size: 11px;
    color: var(--color-accent-600);
    font-weight: 500;
    margin-left: 6px;
  }
  .device-meta {
    font-size: 11px;
    color: var(--color-text-muted);
    margin-top: 2px;
  }
  .devices-footer {
    text-align: right;
  }

  .notice {
    margin-bottom: 14px;
    padding: 8px 12px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--color-accent-500) 10%, transparent);
    color: var(--color-accent-600);
    font-size: 13px;
  }
  .err {
    margin-bottom: 14px;
    padding: 8px 12px;
    border-radius: 8px;
    background: #fee2e2;
    color: #991b1b;
    font-size: 13px;
  }

  /* 弹窗内表单(AccountModal slot 内容) */
  :global(.modal-input) {
    width: 100%;
    padding: 10px 12px;
    font-size: 13px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    outline: none;
    margin-bottom: 12px;
    background: var(--color-surface);
    color: var(--color-text);
    font-family: inherit;
  }
  :global(.modal-input:focus) {
    border-color: var(--color-accent-400);
  }
  :global(.code-row-m) {
    display: flex;
    gap: 8px;
  }
  :global(.code-row-m .modal-input) {
    flex: 1;
  }
  :global(.code-m) {
    text-align: center;
    letter-spacing: 0.15em;
  }
  :global(.ac-modal-btns) {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }
  :global(.ac-modal-btns button) {
    flex: 1;
    padding: 10px;
    font-size: 13px;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    font-family: inherit;
  }
  :global(.ac-modal-btns .cancel) {
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text);
  }
  :global(.ac-modal-btns .confirm) {
    background: var(--color-accent-500);
    border: none;
    color: #fff;
  }
  :global(.ac-modal-btns .confirm:disabled) {
    opacity: 0.55;
    cursor: not-allowed;
  }

  @media (max-width: 720px) {
    .ac-wrap {
      flex-direction: column;
    }
    .ac-sidebar {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid var(--color-border);
    }
  }
</style>
