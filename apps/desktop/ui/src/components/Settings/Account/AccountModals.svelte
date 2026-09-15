<script lang="ts">
  // 账号页弹窗机(2026-09-15 批 4d:自 AccountCenter 整体迁出)。
  //
  // 七个弹窗:nickname / username / email(绑定换绑)/ password / bio /
  // deletion(注销确认,需输入口令 + 勾选须知 + 邮箱验证码)/ cancelDeletion。
  // 表单态、busy/error、60s 验证码冷却全部段内自治;成功经 onNotice 交给
  // 父层横幅,失败显示在弹窗体内(AccountModal 新增 error 槽)。

  import {
    authBindEmail,
    authCancelDeletion,
    authChangePassword,
    authRequestDeletion,
    authSendEmailCode,
    authUpdateProfile,
    authUpdateUsername,
    type AccountProfile,
  } from "../../../lib/api";
  import { getDict, fmt } from "../../../lib/i18n.svelte";
  import { createCooldown } from "./cooldown.svelte";
  import AccountModal from "./AccountModal.svelte";
  import StrengthBar from "./StrengthBar.svelte";

  const t = $derived(getDict());

  let {
    modal,
    profile,
    onClose,
    onNotice,
  }: {
    modal: null | "nickname" | "username" | "email" | "password" | "bio" | "deletion" | "cancelDeletion";
    profile: AccountProfile | null;
    /** 成功提示(父层页面横幅显示) */
    onNotice: (msg: string) => void;
    onClose: () => void;
  } = $props();

  const cooldown = createCooldown(60);
  $effect(() => () => cooldown.destroy());

  let busy = $state(false);
  let error = $state<string | null>(null);
  let mNick = $state("");
  let mBio = $state("");
  let mUser = $state("");
  let mPass = $state(""); // 当前密码 / 旧密码(按弹窗用途)
  let mNewPass = $state("");
  let mNewPass2 = $state("");
  let mEmail = $state("");
  let mCode = $state("");
  // 注销确认:输入「注销账号」四字 + 勾选须知
  let mConfirmText = $state("");
  let mAgreed = $state(false);

  // 打开时按用途预填(原 openModal 逻辑;error 一并清空)
  $effect(() => {
    if (!modal) return;
    mNick = profile?.display_name ?? "";
    mUser = profile?.username ?? "";
    mPass = mNewPass = mNewPass2 = mEmail = mCode = "";
    mBio = profile?.bio ?? "";
    mConfirmText = "";
    mAgreed = false;
    error = null;
  });

  async function saveNickname() {
    if (busy) return;
    busy = true;
    error = null;
    try {
      await authUpdateProfile(mNick, null);
      onClose();
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  async function saveBio() {
    if (busy) return;
    busy = true;
    error = null;
    try {
      await authUpdateProfile(null, mBio);
      onClose();
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  async function requestDeletion() {
    if (busy) return;
    if (mConfirmText !== t.settings.account.deleteConfirmWord || !mAgreed) {
      error = t.settings.account.deleteNotConfirmed;
      return;
    }
    busy = true;
    error = null;
    try {
      await authRequestDeletion(mPass, profile?.email_verified ? mCode.trim() : null);
      onClose();
      onNotice(t.settings.account.deletionRequested);
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  async function cancelDeletion() {
    if (busy) return;
    busy = true;
    error = null;
    try {
      await authCancelDeletion(mPass);
      onClose();
      onNotice(t.settings.account.deletionCancelled);
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  async function sendDeletionCode() {
    if (busy || cooldown.active) return;
    if (!profile?.email) {
      error = t.settings.account.deleteNeedEmail;
      return;
    }
    busy = true;
    error = null;
    try {
      await authSendEmailCode(profile.email, "delete");
      cooldown.start();
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
      onClose();
      onNotice(t.settings.account.usernameChanged);
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
      onClose();
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
      onClose();
      onNotice(t.settings.sync.passChanged);
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
      busy = false;
    }
  }
</script>

<!-- 编辑弹窗们 -->
<AccountModal
  open={modal === "nickname"}
  title={t.settings.account.editNickname}
  desc={t.settings.account.nicknameDesc}
  error={error ?? ""}
  onClose={onClose}
>
  <input class="modal-input" maxlength="32" bind:value={mNick} />
  <div class="ac-modal-btns">
    <button type="button" class="cancel" onclick={onClose}>{t.settings.account.cancel}</button>
    <button type="button" class="confirm" disabled={busy} onclick={() => void saveNickname()}>{t.settings.account.save}</button>
  </div>
</AccountModal>

<AccountModal
  open={modal === "username"}
  title={t.settings.account.editUsername}
  desc={t.settings.account.usernameModalDesc}
  error={error ?? ""}
  onClose={onClose}
>
  <input class="modal-input" maxlength="32" bind:value={mUser} placeholder={t.settings.account.usernamePh} />
  <input class="modal-input" type="password" bind:value={mPass} placeholder={t.settings.account.curPass} autocomplete="current-password" />
  <div class="ac-modal-btns">
    <button type="button" class="cancel" onclick={onClose}>{t.settings.account.cancel}</button>
    <button type="button" class="confirm" disabled={busy} onclick={() => void saveUsername()}>{t.settings.account.save}</button>
  </div>
</AccountModal>

<AccountModal
  open={modal === "email"}
  title={profile?.email ? t.settings.account.editEmail : t.settings.account.bindEmailTitle}
  desc={t.settings.account.bindEmailDesc}
  error={error ?? ""}
  onClose={onClose}
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
    <button type="button" class="cancel" onclick={onClose}>{t.settings.account.cancel}</button>
    <button type="button" class="confirm" disabled={busy} onclick={() => void saveEmail()}>{t.settings.account.confirm}</button>
  </div>
</AccountModal>

<AccountModal
  open={modal === "bio"}
  title={t.settings.account.editBio}
  desc={t.settings.account.bioDesc}
  error={error ?? ""}
  onClose={onClose}
>
  <input class="modal-input" maxlength="50" bind:value={mBio} placeholder={t.settings.account.bioPh} />
  <div class="bio-counter">{mBio.length} / 50</div>
  <div class="ac-modal-btns">
    <button type="button" class="cancel" onclick={onClose}>{t.settings.account.cancel}</button>
    <button type="button" class="confirm" disabled={busy} onclick={() => void saveBio()}>{t.settings.account.save}</button>
  </div>
</AccountModal>

<AccountModal
  open={modal === "deletion"}
  title={t.settings.account.deleteAccount}
  desc={t.settings.account.deleteModalDesc}
  error={error ?? ""}
  onClose={onClose}
>
  {#if profile?.email_verified}
    <div class="code-row-m">
      <input class="modal-input code-m" inputmode="numeric" maxlength="6" bind:value={mCode} placeholder={t.settings.account.codePh} />
      <button type="button" class="ac-btn-sm" disabled={busy || cooldown.active} onclick={() => void sendDeletionCode()}>
        {cooldown.active
          ? fmt(t.settings.account.resend, { n: cooldown.remaining })
          : t.settings.account.sendCode}
      </button>
    </div>
  {/if}
  <input class="modal-input" type="password" bind:value={mPass} placeholder={t.settings.account.curPass} autocomplete="current-password" />
  <input class="modal-input" bind:value={mConfirmText} placeholder={t.settings.account.deleteConfirmPh} />
  <label class="delete-agree">
    <input type="checkbox" bind:checked={mAgreed} />
    {t.settings.account.deleteAgree}
  </label>
  <div class="ac-modal-btns">
    <button type="button" class="cancel" onclick={onClose}>{t.settings.account.cancel}</button>
    <button type="button" class="confirm danger" disabled={busy} onclick={() => void requestDeletion()}>
      {t.settings.account.deleteConfirmBtn}
    </button>
  </div>
</AccountModal>

<AccountModal
  open={modal === "cancelDeletion"}
  title={t.settings.account.deletionCancelBtn}
  desc={t.settings.account.deletionCancelDesc}
  error={error ?? ""}
  onClose={onClose}
>
  <input class="modal-input" type="password" bind:value={mPass} placeholder={t.settings.account.curPass} autocomplete="current-password" />
  <div class="ac-modal-btns">
    <button type="button" class="cancel" onclick={onClose}>{t.settings.account.cancel}</button>
    <button type="button" class="confirm" disabled={busy} onclick={() => void cancelDeletion()}>{t.settings.account.confirm}</button>
  </div>
</AccountModal>

<AccountModal
  open={modal === "password"}
  title={t.settings.account.changePw}
  desc={t.settings.account.changePwDesc}
  error={error ?? ""}
  onClose={onClose}
>
  <input class="modal-input" type="password" bind:value={mPass} placeholder={t.settings.account.curPass} autocomplete="current-password" />
  <input class="modal-input" type="password" bind:value={mNewPass} placeholder={t.settings.account.passwordPh} autocomplete="new-password" />
  <StrengthBar value={mNewPass} />
  <input class="modal-input" style="margin-top: 12px" type="password" bind:value={mNewPass2} placeholder={t.settings.account.confirmPh} autocomplete="new-password" />
  <div class="ac-modal-btns">
    <button type="button" class="cancel" onclick={onClose}>{t.settings.account.cancel}</button>
    <button type="button" class="confirm" disabled={busy} onclick={() => void savePassword()}>{t.settings.account.confirm}</button>
  </div>
</AccountModal>

<style>
  /* 弹窗内容样式(自 AccountCenter :global 规则转为本地作用域 —— 元素
     现在编译在本组件内,无需再 pierce) */
  .bio-counter {
    text-align: right;
    font-size: 11px;
    color: var(--color-text-muted);
    margin: -6px 0 8px;
  }
  .delete-agree {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--color-text-muted);
    margin-bottom: 12px;
  }
  .modal-input {
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
  .modal-input:focus {
    border-color: var(--color-accent-400);
  }
  .code-row-m {
    display: flex;
    gap: 8px;
  }
  .code-row-m .modal-input {
    flex: 1;
  }
  .code-m {
    text-align: center;
    letter-spacing: 0.15em;
  }
  .ac-btn-sm {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.4rem 1rem;
    border: 1px solid var(--color-accent-500);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    color: var(--color-accent-600);
    cursor: pointer;
    font-size: 0.85rem;
    transition:
      background 0.15s,
      color 0.15s,
      opacity 0.15s;
  }
  .ac-btn-sm:hover:not(:disabled) {
    background: var(--color-accent-500);
    color: #fff;
  }
  .ac-btn-sm:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .ac-modal-btns {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }
  .ac-modal-btns button {
    flex: 1;
    padding: 10px;
    font-size: 13px;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    font-family: inherit;
  }
  .ac-modal-btns .cancel {
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text);
  }
  .ac-modal-btns .confirm {
    background: var(--color-accent-500);
    border: none;
    color: #fff;
  }
  .ac-modal-btns .confirm:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
</style>
