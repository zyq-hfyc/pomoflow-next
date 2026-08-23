<script lang="ts">
  // 账号管理中心(P1d,按参考原型 widget.html 规格移植)。
  //
  // 相对原型的裁剪(ADR-012):无头像/签名/手机号;无 2FA;第三方只留微信(待资质);
  // 无账号注销区(danger zone,P4)。设备元信息为设备自报名+登录时间(无 IP 地理)。

  import { MonitorSmartphone, QrCode } from "lucide-svelte";
  import { getDict, fmt } from "../../../lib/i18n.svelte";
  import {
    authChangePassword,
    authUpdateProfile,
    authUpdateUsername,
    authRequestDeletion,
    authCancelDeletion,
    authSetAvatar,
    authDeleteAvatar,
    authExportData,
    listTasks,
    listProjects,
    exportTasksXlsx,
    type TaskView,
    type Project,
    authGetLoginLogs,
    type LoginLogItem,
    authBindEmail,
    authSendEmailCode,
    authListSessions,
    authRevokeSession,
    authRevokeOthers,
    type AccountProfile,
    type SessionInfo,
  } from "../../../lib/api";
  import { open as openDialog, save as saveDialog } from "@tauri-apps/plugin-dialog";
  import AccountModal from "./AccountModal.svelte";
  import StrengthBar from "./StrengthBar.svelte";
  import { createCooldown } from "./cooldown.svelte";
  import { accountState, refreshAvatar } from "../../../lib/accountState.svelte";

  type Section = "profile" | "security" | "thirdparty" | "devices" | "danger";
  let {
    profile,
    section,
    reloadProfile,
  }: {
    profile: AccountProfile | null;
    section: Section;
    reloadProfile: () => Promise<void>;
  } = $props();

  const t = $derived(getDict());
  const cooldown = createCooldown(60);
  $effect(() => () => cooldown.destroy());

  let sessions = $state<SessionInfo[] | null>(null);
  let loginLogs = $state<LoginLogItem[] | null>(null);
  let error = $state<string | null>(null);
  let notice = $state("");
  let busy = $state(false);
  // 头像走全局共享状态(顶部导航头像与本页联动)
  const avatarUrl = $derived(accountState().avatar);

  // 弹窗状态:nickname / username / email(绑定换绑) / password / bio /
  // deletion(注销确认)/ cancelDeletion(撤销注销)
  let modal = $state<null | "nickname" | "username" | "email" | "password" | "bio" | "deletion" | "cancelDeletion">(null);
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

  const display = $derived(
    profile ? profile.display_name || profile.username : "",
  );

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

  function openModal(kind: typeof modal) {
    error = null;
    mNick = profile?.display_name ?? "";
    mUser = profile?.username ?? "";
    mPass = mNewPass = mNewPass2 = mEmail = mCode = "";
    mBio = profile?.bio ?? "";
    mConfirmText = "";
    mAgreed = false;
    modal = kind;
  }

  async function saveNickname() {
    if (busy) return;
    busy = true;
    error = null;
    try {
      await authUpdateProfile(mNick, null);
      await reloadProfile();
      modal = null;
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
      await reloadProfile();
      modal = null;
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  const deletionEffective = $derived.by(() => {
    if (!profile?.deletion_requested_ms) return "";
    const d = new Date(profile.deletion_requested_ms + 15 * 86_400_000);
    return d.toLocaleDateString();
  });

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
      await reloadProfile();
      modal = null;
      notice = t.settings.account.deletionRequested;
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
      await reloadProfile();
      modal = null;
      notice = t.settings.account.deletionCancelled;
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
      busy = null;
    }
  }

  async function saveUsername() {
    if (busy) return;
    busy = true;
    error = null;
    try {
      await authUpdateUsername(mUser.trim(), mPass);
      await reloadProfile();
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
      await reloadProfile();
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

  // 头像随共享状态;设备区进入时拉会话(prop section 响应式)
  $effect(() => {
    void loadAvatar();
  });

  async function loadAvatar() {
    await refreshAvatar(); // 旧后端无此端点 → 内部静默降级为 null(首字母)
  }

  async function uploadAvatar() {
    if (busy) return;
    const picked = await openDialog({
      multiple: false,
      filters: [{ name: "Image", extensions: ["jpg", "jpeg", "png"] }],
    });
    if (!picked) return; // 用户取消
    busy = true;
    error = null;
    try {
      await authSetAvatar(picked);
      await loadAvatar();
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  async function removeAvatar() {
    if (busy) return;
    busy = true;
    error = null;
    try {
      await authDeleteAvatar();
      await loadAvatar();
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  // 导出反馈:就地显示在按钮下方(此前写全局 notice,用户停在危险区时
  // 提示滚在内容区顶部看不见 —— 2026-08-23 用户实测"没有任何提示")
  let exportNote = $state("");
  let exportOk = $state(false);

  async function exportData() {
    if (busy) return;
    exportNote = "";
    let path: string | null = null;
    try {
      path = await saveDialog({
        defaultPath: `pomoflow-backup-${new Date().toISOString().slice(0, 10)}.json`,
        filters: [{ name: "JSON", extensions: ["json"] }],
      });
    } catch (e) {
      exportOk = false;
      exportNote = String(e);
      return;
    }
    if (!path) return; // 用户取消
    busy = true;
    error = null;
    try {
      await authExportData(path);
      exportOk = true;
      exportNote = `${t.settings.account.exportDone} → ${path}`;
    } catch (e) {
      exportOk = false;
      exportNote = String(e);
    } finally {
      busy = false;
    }
  }
  // 任务报表导出(xlsx,复用任务页同款 9 列格式;本地数据,与 JSON 云备份互补)
  async function exportTasks() {
    if (busy) return;
    exportNote = "";
    let path: string | null = null;
    try {
      path = await saveDialog({
        defaultPath: `pomoflow-tasks-${new Date().toISOString().slice(0, 10)}.xlsx`,
        filters: [{ name: "xlsx", extensions: ["xlsx"] }],
      });
    } catch (e) {
      exportOk = false;
      exportNote = String(e);
      return;
    }
    if (!path) return;
    busy = true;
    error = null;
    try {
      const [tasks, projects] = await Promise.all([
        listTasks({}),
        listProjects(),
      ]);
      const headers = [
        t.export.index, t.export.title, t.export.project, t.export.priority,
        t.export.dueDate, t.export.estimated, t.export.tags, t.export.subtasks,
        t.export.status,
      ];
      const rows = (tasks as TaskView[]).map((task) => ({
        title: task.title,
        project: (projects as Project[]).find((p) => p.id === task.project_id)?.name ?? "",
        priority: t.priority[task.priority ?? "none"] ?? "",
        dueDate: task.due_date ? new Date(task.due_date).toLocaleDateString() : "",
        estimated: task.estimated_pomodoros ?? 0,
        tags: (task.tags ?? []).map((x) => x.name).join(", "),
        subtasks: (task.subtasks ?? []).map((x) => x.title).join("\n"),
        status: task.status === "completed" ? t.export.statusCompleted : t.export.statusActive,
      }));
      await exportTasksXlsx(path, t.nav.tasks, headers, rows);
      exportOk = true;
      exportNote = `${t.settings.account.exportTasksDone} → ${path}`;
    } catch (e) {
      exportOk = false;
      exportNote = String(e);
    } finally {
      busy = false;
    }
  }

  $effect(() => {
    if (section === "devices" && sessions === null) void loadSessions();
  });
  $effect(() => {
    if (section === "devices" && loginLogs === null) void loadLoginLogs();
  });

  async function loadLoginLogs() {
    try {
      loginLogs = await authGetLoginLogs();
    } catch {
      loginLogs = null; // 旧后端无此端点 → 静默不显示
    }
  }

  const methodText = (m: string) =>
    ({
      username: t.settings.account.methodUser,
      email: t.settings.account.methodEmail,
      register_username: t.settings.account.methodRegUser,
      register_email: t.settings.account.methodRegEmail,
    })[m] ?? m;
</script>

<div class="ac-content">
    {#if notice}<div class="notice">✓ {notice}</div>{/if}
    {#if error}<div class="err" role="alert">⚠ {error}</div>{/if}

    {#if section === "profile"}
      <div class="ac-section-title">{t.settings.account.profile}</div>
      <div class="ac-section-desc">{t.settings.account.profileDesc}</div>
      <div class="ac-card">
        <div class="avatar-block">
          <div class="avatar-lg">
            {#if avatarUrl}<img class="avatar-img" src={avatarUrl} alt="" />{:else}{display.slice(0, 1).toUpperCase() || "?"}{/if}
          </div>
          <div class="avatar-side">
            <div class="avatar-title">{t.settings.account.avatar}</div>
            <div class="avatar-actions">
              <button type="button" class="ac-btn-primary-sm" disabled={busy} onclick={() => void uploadAvatar()}>
                {t.settings.account.avatarUpload}
              </button>
              <button type="button" class="ac-btn-sm" disabled={busy || !avatarUrl} onclick={() => void removeAvatar()}>
                {t.settings.account.avatarRemove}
              </button>
            </div>
            <div class="avatar-hint">{t.settings.account.avatarHint}</div>
          </div>
        </div>
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
        <div class="ac-field">
          <div>
            <div class="ac-field-label">{t.settings.account.bioLabel}</div>
            <div class="ac-field-desc">{t.settings.account.bioDesc}</div>
          </div>
          <div class="ac-field-side">
            <span class="ac-field-value">{profile?.bio || "—"}</span>
            <button type="button" class="ac-btn-sm" onclick={() => openModal("bio")}>
              {t.settings.account.edit}
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
    {:else if section === "devices"}
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
                  {ss.device_name || (ss.device_id ?? "?").slice(0, 8)}
                  {#if ss.current}<span class="device-current">{t.settings.sync.currentDevice}</span>{/if}
                </div>
                <div class="device-meta">
                  {fmt(t.settings.account.deviceAt, {
                    time: ss.created_ms ? new Date(ss.created_ms).toLocaleString() : "—",
                  })}
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

      {#if loginLogs !== null && loginLogs.length > 0}
        <div class="logs-card">
          <div class="logs-title">{t.settings.account.loginLogsTitle}</div>
          {#each loginLogs as lg (lg.created_ms + lg.method)}
            <div class="log-row">
              <span class="log-time">{new Date(lg.created_ms).toLocaleString()}</span>
              <span class="log-device">{lg.device_name || "—"}</span>
              <span class="log-method">{methodText(lg.method)}</span>
              {#if lg.ok}
                <span class="ac-badge bound">{t.settings.account.loginOk}</span>
              {:else}
                <span class="ac-badge unbound" title={lg.detail}>{t.settings.account.loginFail}</span>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    {:else if section === "danger"}
      <div class="ac-section-title danger-text">{t.settings.account.dangerZone}</div>
      <div class="ac-section-desc">{t.settings.account.dangerDesc}</div>

      {#if profile?.deletion_requested_ms}
        <div class="deletion-pending">
          <span>⚠ {t.settings.account.deletionPending}</span>
          <strong>{deletionEffective}</strong>
          <button type="button" class="ac-btn-sm" disabled={busy} onclick={() => openModal("cancelDeletion")}>
            {t.settings.account.deletionCancelBtn}
          </button>
        </div>
      {/if}

      <div class="danger-zone">
        <div class="ac-field">
          <div>
            <div class="ac-field-label danger-text">{t.settings.account.deleteAccount}</div>
            <div class="ac-field-desc danger-text">{t.settings.account.deleteAccountDesc}</div>
          </div>
          <button
            type="button"
            class="ac-btn-danger-sm"
            disabled={busy || !!profile?.deletion_requested_ms}
            onclick={() => openModal("deletion")}
          >
            {t.settings.account.deleteAccount}
          </button>
        </div>
      </div>

      <div class="danger-zone">
        <div class="ac-field">
          <div>
            <div class="ac-field-label">{t.settings.account.exportData}</div>
            <div class="ac-field-desc">{t.settings.account.exportDataDesc}</div>
          </div>
          <button type="button" class="ac-btn-sm" disabled={busy} onclick={() => void exportData()}>
            {t.settings.account.exportBtn} JSON
          </button>
        </div>
        <div class="ac-field">
          <div>
            <div class="ac-field-label">{t.settings.account.exportTasks}</div>
            <div class="ac-field-desc">{t.settings.account.exportTasksDesc}</div>
          </div>
          <button type="button" class="ac-btn-sm" disabled={busy} onclick={() => void exportTasks()}>
            {t.settings.account.exportBtn} xlsx
          </button>
        </div>
        {#if exportNote}
          <div class="export-note" class:ok={exportOk}>
            {exportOk ? "✓" : "⚠"} {exportNote}
          </div>
        {/if}
      </div>

      <div class="danger-notes">
        <div class="notes-title">{t.settings.account.deleteNotesTitle}</div>
        <ol class="notes-list">
          <li>{t.settings.account.deleteNote1}</li>
          <li>{t.settings.account.deleteNote2}</li>
          <li>{t.settings.account.deleteNote3}</li>
          <li>{t.settings.account.deleteNote4}</li>
        </ol>
      </div>
    {/if}
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
  open={modal === "bio"}
  title={t.settings.account.editBio}
  desc={t.settings.account.bioDesc}
  onClose={() => (modal = null)}
>
  <input class="modal-input" maxlength="50" bind:value={mBio} placeholder={t.settings.account.bioPh} />
  <div class="bio-counter">{mBio.length} / 50</div>
  <div class="ac-modal-btns">
    <button type="button" class="cancel" onclick={() => (modal = null)}>{t.settings.account.cancel}</button>
    <button type="button" class="confirm" disabled={busy} onclick={() => void saveBio()}>{t.settings.account.save}</button>
  </div>
</AccountModal>

<AccountModal
  open={modal === "deletion"}
  title={t.settings.account.deleteAccount}
  desc={t.settings.account.deleteModalDesc}
  onClose={() => (modal = null)}
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
    <button type="button" class="cancel" onclick={() => (modal = null)}>{t.settings.account.cancel}</button>
    <button type="button" class="confirm danger" disabled={busy} onclick={() => void requestDeletion()}>
      {t.settings.account.deleteConfirmBtn}
    </button>
  </div>
</AccountModal>

<AccountModal
  open={modal === "cancelDeletion"}
  title={t.settings.account.deletionCancelBtn}
  desc={t.settings.account.deletionCancelDesc}
  onClose={() => (modal = null)}
>
  <input class="modal-input" type="password" bind:value={mPass} placeholder={t.settings.account.curPass} autocomplete="current-password" />
  <div class="ac-modal-btns">
    <button type="button" class="cancel" onclick={() => (modal = null)}>{t.settings.account.cancel}</button>
    <button type="button" class="confirm" disabled={busy} onclick={() => void cancelDeletion()}>{t.settings.account.confirm}</button>
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
  .ac-content {
    max-width: 46rem;
    margin: 0 auto;
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

  .logs-card {
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 14px 20px 6px;
    margin-top: 16px;
    background: var(--color-surface);
  }
  .logs-title {
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--color-text);
  }
  .log-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
    border-bottom: 1px solid color-mix(in srgb, var(--color-border) 50%, transparent);
    font-size: 12px;
  }
  .log-row:last-child {
    border-bottom: none;
  }
  .log-time {
    color: var(--color-text-muted);
    white-space: nowrap;
  }
  .log-device {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--color-text);
  }
  .log-method {
    color: var(--color-text-muted);
    white-space: nowrap;
  }

  .avatar-block {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 16px 0 20px;
    border-bottom: 1px solid color-mix(in srgb, var(--color-border) 60%, transparent);
  }
  .avatar-lg {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--color-accent-500) 14%, transparent);
    color: var(--color-accent-600);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 500;
    overflow: hidden;
    flex-shrink: 0;
  }
  .avatar-img,
  :global(.av-img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .avatar-side {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .avatar-title {
    font-size: 13px;
    font-weight: 500;
  }
  .avatar-actions {
    display: flex;
    gap: 8px;
  }
  .avatar-hint {
    font-size: 11px;
    color: var(--color-text-muted);
  }

  .ac-nav-item.danger {
    color: #a32d2d;
  }
  .ac-nav-item.danger.active {
    background: #fcebeb;
    color: #a32d2d;
  }
  .danger-text {
    color: #a32d2d;
  }
  .danger-zone {
    border: 1px solid #f09595;
    border-radius: 12px;
    padding: 4px 20px;
    background: #fcebeb;
    margin-bottom: 16px;
  }
  .deletion-pending {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    padding: 10px 14px;
    border-radius: 8px;
    background: #fef3c7;
    color: #92400e;
    font-size: 13px;
  }
  .export-note {
    padding: 8px 0 10px;
    font-size: 12px;
    line-height: 1.5;
    color: #a32d2d;
    word-break: break-all;
    border-top: 1px solid color-mix(in srgb, #f09595 45%, transparent);
  }
  .export-note.ok {
    color: #0f6e56;
  }

  .danger-notes {
    padding: 16px;
    background: var(--color-neutral-50, #f5f5f5);
    border-radius: 12px;
  }
  .notes-title {
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  .notes-list {
    margin: 0;
    padding-left: 20px;
    font-size: 12px;
    line-height: 1.8;
    color: var(--color-text-muted);
  }
  :global(.bio-counter) {
    text-align: right;
    font-size: 11px;
    color: var(--color-text-muted);
    margin: -6px 0 8px;
  }
  :global(.delete-agree) {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--color-text-muted);
    margin-bottom: 12px;
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

</style>
