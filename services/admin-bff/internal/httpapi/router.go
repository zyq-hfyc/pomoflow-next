// Package httpapi 提供 Admin BFF 的 HTTP 边界。
package httpapi

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/auth"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/config"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/security"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/store"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/upstream"
)

// SSO 是可替换的 OIDC 客户端边界；生产为 auth.OIDCService，测试用假实现。
type SSO interface {
	AuthCodeURL(state, nonce string) string
	Exchange(ctx context.Context, code string) (auth.OIDCIdentity, error)
}

// Server 持有请求处理所需的不可变依赖。
type Server struct {
	cfg       config.Config
	store     store.Store
	sso       SSO
	allowlist *security.IPAllowlist
	upstream  *upstream.Client
	now       func() time.Time
}

// NewRouter 构建 Admin BFF 路由。业务接口统一挂在 /api 下并经过 IP 白名单。
func NewRouter(cfg config.Config, st store.Store, sso SSO) (*gin.Engine, error) {
	allowlist, err := security.NewIPAllowlist(cfg.IPAllowlist, cfg.TrustedProxyCIDRs)
	if err != nil {
		return nil, err
	}
	s := &Server{
		cfg:       cfg,
		store:     st,
		sso:       sso,
		allowlist: allowlist,
		upstream:  upstream.New(cfg.SyncServerURL, cfg.InternalServiceToken),
		now:       time.Now,
	}

	router := gin.New()
	router.Use(requestIDMiddleware(), securityHeadersMiddleware(), gin.Recovery())
	router.GET("/healthz", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})

	api := router.Group("/api", s.ipAllowlistMiddleware())

	authRoutes := api.Group("/auth")
	authRoutes.GET("/login", s.handleLogin)
	authRoutes.GET("/callback", s.handleCallback)
	authRoutes.GET("/me", s.authRequiredMiddleware(), s.handleMe)
	authRoutes.POST("/logout", s.authRequiredMiddleware(), s.csrfRequiredMiddleware(), s.handleLogout)
	// 假登录只在 ADMIN_DEV_FAKE_LOGIN=1(且 CookieSecure=false)时存在。
	if cfg.DevFakeLogin {
		authRoutes.GET("/dev-login", s.handleDevLogin)
	}

	s.mountDashboardRoutes(api)
	s.mountUserRoutes(api)
	s.mountMembershipRoutes(api)
	s.mountAuditRoutes(api)
	s.mountAuthorizationRoutes(api)
	return router, nil
}

// mountDashboardRoutes 看板:只读。
func (s *Server) mountDashboardRoutes(api *gin.RouterGroup) {
	api.GET("/dashboard", s.authRequiredMiddleware(),
		s.requirePermission(auth.PermissionDashboardRead), s.handleDashboard)
}

// mountUserRoutes 用户治理:读走 users:read,写分别绑到 ban / revoke_sessions。
func (s *Server) mountUserRoutes(api *gin.RouterGroup) {
	users := api.Group("/users", s.authRequiredMiddleware(), s.requirePermission(auth.PermissionUsersRead))
	users.GET("", s.handleListUsers)
	users.GET("/:userID", s.handleUserDetail)

	api.POST("/users/:userID/ban", s.authRequiredMiddleware(), s.csrfRequiredMiddleware(),
		s.requirePermission(auth.PermissionUsersBan), s.handleBan)
	api.POST("/users/:userID/unban", s.authRequiredMiddleware(), s.csrfRequiredMiddleware(),
		s.requirePermission(auth.PermissionUsersBan), s.handleUnban)
	api.POST("/users/:userID/sessions/revoke", s.authRequiredMiddleware(), s.csrfRequiredMiddleware(),
		s.requirePermission(auth.PermissionUsersRevokeSessions), s.handleRevokeSessions)
}

// mountMembershipRoutes 会员域占位:Membership 服务未建设,有权限也统一 503。
// 路由与权限链先行落地,服务上线后只换 handler 不动鉴权结构。
func (s *Server) mountMembershipRoutes(api *gin.RouterGroup) {
	memberships := api.Group("/memberships", s.authRequiredMiddleware(),
		s.requirePermission(auth.PermissionMembershipRead))
	memberships.GET("", s.handleMembershipUnavailable)
	memberships.GET("/changes", s.handleMembershipUnavailable)

	membershipWrites := api.Group("/memberships", s.authRequiredMiddleware(),
		s.csrfRequiredMiddleware(), s.requirePermission(auth.PermissionMembershipWrite))
	membershipWrites.POST("/:userID/level", s.handleMembershipUnavailable)
	membershipWrites.POST("/:userID/entitlement", s.handleMembershipUnavailable)
	membershipWrites.POST("/:userID/renew", s.handleMembershipUnavailable)
}

// mountAuditRoutes 审计:只读(audit:export 留给后续导出端点)。
func (s *Server) mountAuditRoutes(api *gin.RouterGroup) {
	api.GET("/audit", s.authRequiredMiddleware(),
		s.requirePermission(auth.PermissionAuditRead), s.handleListAudit)
}

// mountAuthorizationRoutes 后台授权管理:读与写都要求 admin:grant。
func (s *Server) mountAuthorizationRoutes(api *gin.RouterGroup) {
	api.GET("/admin-users", s.authRequiredMiddleware(),
		s.requirePermission(auth.PermissionAdminGrant), s.handleListAdminUsers)

	grant := api.Group("/admin-users", s.authRequiredMiddleware(), s.csrfRequiredMiddleware(),
		s.requirePermission(auth.PermissionAdminGrant))
	grant.POST("/role", s.handleGrantAdminRole)
	grant.POST("/status", s.handleSetAdminStatus)
}
