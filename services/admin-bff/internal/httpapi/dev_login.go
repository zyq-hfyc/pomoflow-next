package httpapi

// 仅限本地联调的假登录:ADMIN_DEV_FAKE_LOGIN=1 且 ADMIN_COOKIE_SECURE=false
// 才会挂载 /api/auth/dev-login(config.Load 已强校验)。生产路径永远到不了
// 这里;这不是授权边界的例外 —— 会话仍走 admin_sessions 真会话表,
// RBAC / CSRF / 审计链路与真实 OIDC 登录完全一致,只是身份来源换成固定
// 的 dev 身份,并把 bootstrap 窗口换成显式 upsert。

import (
	"context"
	"errors"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/auth"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/store"
)

const (
	// devIssuer / devSubject 是固定的假登录身份;issuer 用假域名,
	// 与任何真实 IdP 都不可能撞上。
	devIssuer        = "http://dev.local"
	devSubject       = "dev-admin"
	devBackupSubject = "dev-backup-emergency"
	devBackupRole    = auth.RoleEmergencyAdmin
	devDefaultRole   = auth.RoleEmergencyAdmin
)

// devStubSSO 顶掉 auth.NewOIDCService(dev 模式没有 IdP 可做 discovery)。
// /api/auth/login 若被误访问,会被引到前端的 OIDC 错误页而不是 500。
type devStubSSO struct{ loginURL string }

// NewDevStubSSO 构造 dev 模式的 OIDC 替身。
func NewDevStubSSO(publicURL string) SSO {
	return devStubSSO{loginURL: strings.TrimRight(publicURL, "/") + "/login?error=oidc"}
}

func (d devStubSSO) AuthCodeURL(string, string) string { return d.loginURL }

func (d devStubSSO) Exchange(context.Context, string) (auth.OIDCIdentity, error) {
	return auth.OIDCIdentity{}, errors.New("dev fake login: OIDC disabled, use /api/auth/dev-login")
}

// handleDevLogin 用固定 dev 身份换一张真会话:?role= 指定本次会话的角色
// (默认 emergency_admin,便于看全所有页面)。每次登录都会:
//  1. 把 dev-backup-emergency 重置为 active 的应急超管 —— 保证「最后一个
//     应急管理员」保护永远不会卡住 dev-admin 的角色切换实验;
//  2. 把 dev-admin upsert 成 ?role= 指定的角色(强制 active)。
func (s *Server) handleDevLogin(c *gin.Context) {
	if !s.cfg.DevFakeLogin {
		c.JSON(http.StatusNotFound, gin.H{"error": gin.H{
			"code": "NOT_FOUND", "message": "dev login is disabled",
		}})
		return
	}
	role := auth.Role(c.DefaultQuery("role", string(devDefaultRole)))
	if !role.Valid() {
		names := make([]string, 0, len(auth.ValidRoles()))
		for _, candidate := range auth.ValidRoles() {
			names = append(names, string(candidate))
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": gin.H{
			"code":    "INVALID_ROLE",
			"message": "role must be one of: " + strings.Join(names, ", "),
		}})
		return
	}

	ctx := c.Request.Context()
	nowMS := s.now().UnixMilli()
	// 先保后备应急超管,再改 dev-admin 的角色:两步都是 SaveAdminUser
	// upsert,任何一步触发最后应急保护都会因后备先行而通过。
	if _, err := s.store.SaveAdminUser(ctx, store.AdminUser{
		Issuer: devIssuer, Subject: devBackupSubject,
		DisplayName: "Dev Backup Emergency", Role: devBackupRole,
	}, nowMS); err != nil {
		internalError(c, err)
		return
	}
	user, err := s.store.SaveAdminUser(ctx, store.AdminUser{
		Issuer: devIssuer, Subject: devSubject,
		DisplayName: "Dev Admin", Role: role,
	}, nowMS)
	if err != nil {
		internalError(c, err)
		return
	}
	if err := s.store.MarkAdminLogin(ctx, user.Issuer, user.Subject, nowMS); err != nil {
		internalError(c, err)
		return
	}

	sessionToken, err := auth.NewRandomToken()
	if err != nil {
		internalError(c, err)
		return
	}
	csrfToken, err := auth.NewRandomToken()
	if err != nil {
		internalError(c, err)
		return
	}
	now := s.now()
	sessionID, err := s.store.CreateSession(ctx, auth.HashToken(sessionToken),
		auth.HashToken(csrfToken), user.Issuer, user.Subject, currentClientIP(c),
		c.Request.UserAgent(), now.UnixMilli(), now.Add(s.cfg.SessionTTL).UnixMilli())
	if err != nil {
		internalError(c, err)
		return
	}
	identity := store.SessionIdentity{
		Session: auth.Session{ID: sessionID, Issuer: user.Issuer, Subject: user.Subject},
		User:    *user,
	}
	if err := s.recordAudit(c, &identity, "auth", "dev_login", "admin_user",
		user.Issuer+":"+user.Subject, "ok", "", gin.H{"role": string(role), "dev": true}); err != nil {
		_ = s.store.RevokeSession(ctx, sessionID, now.UnixMilli())
		internalError(c, err)
		return
	}

	setCookie(c, sessionCookieOptions{
		name: sessionCookieName, value: sessionToken, path: "/",
		maxAge: int(s.cfg.SessionTTL.Seconds()), httpOnly: true, secure: s.cfg.CookieSecure,
		sameSite: http.SameSiteStrictMode,
	})
	setCookie(c, sessionCookieOptions{
		name: csrfCookieName, value: csrfToken, path: "/",
		maxAge: int(s.cfg.SessionTTL.Seconds()), httpOnly: false, secure: s.cfg.CookieSecure,
		sameSite: http.SameSiteStrictMode,
	})
	c.Redirect(http.StatusFound, s.cfg.PublicURL)
}
