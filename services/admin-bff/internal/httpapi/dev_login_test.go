package httpapi

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/auth"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/store"
)

// newRouterWithDev 开着假登录建路由;空库即可,dev 身份由 handler 自己种。
func newRouterWithDev(t *testing.T, st store.Store) *gin.Engine {
	t.Helper()
	gin.SetMode(gin.TestMode)
	cfg := testConfig()
	cfg.DevFakeLogin = true
	router, err := NewRouter(cfg, st, NewDevStubSSO(cfg.PublicURL))
	if err != nil {
		t.Fatal(err)
	}
	return router
}

func hasPermission(permissions []auth.Permission, want auth.Permission) bool {
	for _, candidate := range permissions {
		if candidate == want {
			return true
		}
	}
	return false
}

func devLogin(t *testing.T, router http.Handler, role string) *httptest.ResponseRecorder {
	t.Helper()
	target := "/api/auth/dev-login"
	if role != "" {
		target += "?role=" + url.QueryEscape(role)
	}
	resp := request(t, router, http.MethodGet, target)
	if resp.Code != http.StatusFound || resp.Header().Get("Location") != "http://localhost:5173" {
		t.Fatalf("dev-login status=%d location=%q body=%s",
			resp.Code, resp.Header().Get("Location"), resp.Body.String())
	}
	return resp
}

func TestDevLoginDisabledByDefault(t *testing.T) {
	router, _, _ := newAuthTestServer(t)
	if got := request(t, router, http.MethodGet, "/api/auth/dev-login").Code; got != http.StatusNotFound {
		t.Fatalf("dev-login without the switch must 404, got %d", got)
	}
}

func TestDevLoginMintsSessionWithRequestedRole(t *testing.T) {
	router := newRouterWithDev(t, newFakeStore())

	resp := devLogin(t, router, "user_operator")
	session := responseCookie(t, resp, sessionCookieName)
	responseCookie(t, resp, csrfCookieName)

	me := request(t, router, http.MethodGet, "/api/auth/me", session)
	if me.Code != http.StatusOK {
		t.Fatalf("me status=%d body=%s", me.Code, me.Body.String())
	}
	var body struct {
		User struct {
			Issuer      string    `json:"issuer"`
			Subject     string    `json:"subject"`
			Role        auth.Role `json:"role"`
			DisplayName string    `json:"display_name"`
		} `json:"user"`
		Permissions []auth.Permission `json:"permissions"`
	}
	if err := json.Unmarshal(me.Body.Bytes(), &body); err != nil {
		t.Fatal(err)
	}
	if body.User.Issuer != devIssuer || body.User.Subject != devSubject {
		t.Fatalf("identity = %s/%s, want %s/%s", body.User.Issuer, body.User.Subject, devIssuer, devSubject)
	}
	if body.User.Role != auth.RoleUserOperator {
		t.Fatalf("role = %q, want user_operator", body.User.Role)
	}
	if !hasPermission(body.Permissions, auth.PermissionUsersBan) {
		t.Fatalf("user_operator permissions missing users:ban: %v", body.Permissions)
	}
	if hasPermission(body.Permissions, auth.PermissionAdminGrant) {
		t.Fatal("user_operator must not hold admin:grant")
	}
}

func TestDevLoginRejectsUnknownRole(t *testing.T) {
	router := newRouterWithDev(t, newFakeStore())
	resp := request(t, router, http.MethodGet, "/api/auth/dev-login?role=root")
	if resp.Code != http.StatusBadRequest {
		t.Fatalf("unknown role status=%d body=%s", resp.Code, resp.Body.String())
	}
}

func TestDevLoginSeedsBackupEmergencyAdmin(t *testing.T) {
	st := newFakeStore()
	router := newRouterWithDev(t, st)

	// 登录即重置后备应急超管:之后 dev-admin 切到任何角色都不会撞上
	// 「最后一个应急管理员」保护。
	devLogin(t, router, "auditor")
	backup, ok := st.users[identityKey(devIssuer, devBackupSubject)]
	if !ok {
		t.Fatal("backup emergency admin must be seeded on dev login")
	}
	if backup.Role != devBackupRole || backup.Status != "active" {
		t.Fatalf("backup = %s/%s, want active emergency_admin", backup.Status, backup.Role)
	}
	if dev := st.users[identityKey(devIssuer, devSubject)]; dev.Role != auth.RoleAuditor {
		t.Fatalf("dev-admin role = %q, want auditor", dev.Role)
	}

	// 再登录一次换角色:upsert 生效,且审计里留下 dev_login。
	devLogin(t, router, "security_admin")
	if dev := st.users[identityKey(devIssuer, devSubject)]; dev.Role != auth.RoleSecurityAdmin {
		t.Fatalf("second login role = %q, want security_admin", dev.Role)
	}
	found := false
	for _, entry := range st.audits {
		if entry.Module == "auth" && entry.Action == "dev_login" && entry.Result == "ok" {
			found = true
		}
	}
	if !found {
		t.Fatal("dev_login must be audited like real logins")
	}
}

func TestDevStubSSOSendsOIDCEntryToErrorPage(t *testing.T) {
	router := newRouterWithDev(t, newFakeStore())
	login := request(t, router, http.MethodGet, "/api/auth/login")
	if login.Code != http.StatusFound {
		t.Fatalf("login status=%d", login.Code)
	}
	if location := login.Header().Get("Location"); location != "http://localhost:5173/login?error=oidc" {
		t.Fatalf("stub SSO must bounce to error page, got %q", location)
	}
}
