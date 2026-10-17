// business_test.go —— 业务接口(BFF → sync-server /internal/*)全链路测试。
//
// 验证重点:服务 token 透传、查询串白名单、错误归一化、审计落库、
// 看板 null 口径(不造假数)、会员 503 占位、RBAC 与最后应急管理员保护。
package httpapi

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/auth"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/config"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/store"
)

const testServiceToken = "svc-token"

// upstreamStub 是 sync-server /internal/* 的替身:记录最后一次请求,
// 按预设状态码与响应体回包。
type upstreamStub struct {
	server *httptest.Server

	method, path, rawQuery  string
	authHeader, contentType string
	body                    string
	status                  int
	responseBody            string
}

func newUpstreamStub(t *testing.T, status int, response string) *upstreamStub {
	t.Helper()
	stub := &upstreamStub{status: status, responseBody: response}
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		raw, _ := io.ReadAll(r.Body)
		// httptest 下 router.ServeHTTP 同步执行,无并发访问。
		stub.method, stub.path, stub.rawQuery = r.Method, r.URL.Path, r.URL.RawQuery
		stub.authHeader = r.Header.Get("Authorization")
		stub.contentType = r.Header.Get("Content-Type")
		stub.body = string(raw)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(stub.status)
		_, _ = w.Write([]byte(stub.responseBody))
	})
	stub.server = httptest.NewServer(mux)
	t.Cleanup(stub.server.Close)
	return stub
}

// newBusinessTestServer 起一套「应急超管 + upstream 替身」的完整测试环境并完成登录。
func newBusinessTestServer(t *testing.T, upstreamStatus int, upstreamResponse string) (*gin.Engine, *fakeStore, *upstreamStub, *http.Cookie, *http.Cookie) {
	t.Helper()
	gin.SetMode(gin.TestMode)
	stub := newUpstreamStub(t, upstreamStatus, upstreamResponse)
	st := newFakeStore()
	sso := &fakeSSO{issuer: "https://sso.example.com", subject: "admin-1"}
	st.users[identityKey(sso.issuer, sso.subject)] = store.AdminUser{
		Issuer: sso.issuer, Subject: sso.subject, DisplayName: "Root Admin",
		Role: auth.RoleEmergencyAdmin, Status: "active",
	}
	cfg := testConfig()
	cfg.SyncServerURL = stub.server.URL
	cfg.InternalServiceToken = testServiceToken
	router, err := NewRouter(cfg, st, sso)
	if err != nil {
		t.Fatal(err)
	}
	session, csrf := login(t, router)
	return router, st, stub, session, csrf
}

func requestWithBody(t *testing.T, router http.Handler, method, target, body string,
	headers map[string]string, cookies ...*http.Cookie) *httptest.ResponseRecorder {
	t.Helper()
	req := httptest.NewRequest(method, target, strings.NewReader(body))
	req.RemoteAddr = "127.0.0.1:12345"
	for key, value := range headers {
		req.Header.Set(key, value)
	}
	for _, cookie := range cookies {
		req.AddCookie(cookie)
	}
	recorder := httptest.NewRecorder()
	router.ServeHTTP(recorder, req)
	return recorder
}

func postJSON(t *testing.T, router http.Handler, target, body string,
	session, csrf *http.Cookie) *httptest.ResponseRecorder {
	t.Helper()
	return requestWithBody(t, router, http.MethodPost, target, body, map[string]string{
		"Content-Type": "application/json",
		"X-CSRF-Token": csrf.Value,
	}, session, csrf)
}

func decodeBody(t *testing.T, recorder *httptest.ResponseRecorder) gin.H {
	t.Helper()
	var body gin.H
	if err := json.Unmarshal(recorder.Body.Bytes(), &body); err != nil {
		t.Fatalf("decode response %q: %v", recorder.Body.String(), err)
	}
	return body
}

func errorObject(t *testing.T, recorder *httptest.ResponseRecorder) gin.H {
	t.Helper()
	body := decodeBody(t, recorder)
	errObj, ok := body["error"].(map[string]any)
	if !ok {
		t.Fatalf("expected error envelope, got %q", recorder.Body.String())
	}
	return errObj
}

func subObject(t *testing.T, parent gin.H, key string) gin.H {
	t.Helper()
	child, ok := parent[key].(map[string]any)
	if !ok {
		t.Fatalf("field %q is not an object: %v", key, parent[key])
	}
	return child
}

func assertEqual(t *testing.T, what string, got, want any) {
	t.Helper()
	if got != want {
		t.Fatalf("%s = %v, want %v", what, got, want)
	}
}

func TestDashboardProxiesMetricsAndKeepsNullGaps(t *testing.T) {
	upstreamBody := `{
		"generated_at_ms": 1767000000000,
		"metrics": {"total_users": 120, "new_users": 5, "active_users": 30,
			"pushed_changes": 400, "sync_users": 25, "sync_devices": 40},
		"trends": [{"bucket": "2026-01-01", "new_users": 5, "active_users": 30, "pushed_changes": 400}]
	}`
	router, _, stub, session, _ := newBusinessTestServer(t, http.StatusOK, upstreamBody)

	resp := requestWithBody(t, router, http.MethodGet,
		"/api/dashboard?from=2026-01-01&to=2026-01-07&granularity=day", "", nil, session)
	if resp.Code != http.StatusOK {
		t.Fatalf("dashboard status=%d body=%s", resp.Code, resp.Body.String())
	}
	body := decodeBody(t, resp)

	assertEqual(t, "upstream path", stub.path, "/internal/metrics/overview")
	assertEqual(t, "service token header", stub.authHeader, "Bearer "+testServiceToken)
	query, err := url.ParseQuery(stub.rawQuery)
	if err != nil {
		t.Fatal(err)
	}
	assertEqual(t, "from_ms forwarded", query.Get("from_ms"), "1767225600000") // 2026-01-01 UTC
	// 右端点 +1 天:to(2026-01-07)当天被完整覆盖 → 2026-01-08 00:00 UTC
	assertEqual(t, "to_ms forwarded", query.Get("to_ms"), "1767830400000")

	metrics := subObject(t, body, "metrics")
	assertEqual(t, "total_users", metrics["total_users"], float64(120))
	assertEqual(t, "pushed_changes", metrics["pushed_changes"], float64(400))
	// Analytics 未上线的口径一律 null,前端渲染 "—",不造假数
	for _, gap := range []string{"dau", "wau", "mau", "d1_retention", "d7_retention",
		"d30_retention", "pulled_changes"} {
		if metrics[gap] != nil {
			t.Fatalf("metrics.%s must be null until Analytics ships, got %v", gap, metrics[gap])
		}
	}
	trends, ok := body["trends"].([]any)
	if !ok || len(trends) != 1 {
		t.Fatalf("trends = %v", body["trends"])
	}
	firstDay, ok := trends[0].(map[string]any)
	if !ok {
		t.Fatalf("trends[0] is not an object: %v", trends[0])
	}
	if firstDay["pulled_changes"] != nil {
		t.Fatalf("trend pulled_changes must be null, got %v", firstDay["pulled_changes"])
	}
	assertEqual(t, "stale", body["stale"], false)
	assertEqual(t, "generated_at_ms", body["generated_at_ms"], float64(1767000000000))
}

func TestDashboardRejectsBadRanges(t *testing.T) {
	router, _, stub, session, _ := newBusinessTestServer(t, http.StatusOK, "{}")
	cases := []struct {
		name, query, wantCode string
	}{
		{"bad from", "from=20260101&to=2026-01-07", "INVALID_FROM"},
		{"bad to", "from=2026-01-01&to=next-week", "INVALID_TO"},
		{"reversed range", "from=2026-01-07&to=2026-01-01", "INVALID_RANGE"},
		{"unsupported granularity", "from=2026-01-01&to=2026-01-07&granularity=hour", "UNSUPPORTED_GRANULARITY"},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			resp := requestWithBody(t, router, http.MethodGet, "/api/dashboard?"+tc.query, "", nil, session)
			if resp.Code != http.StatusBadRequest {
				t.Fatalf("status=%d body=%s", resp.Code, resp.Body.String())
			}
			assertEqual(t, "error code", errorObject(t, resp)["code"], tc.wantCode)
		})
	}
	if stub.path != "" {
		t.Fatal("upstream must not be called for invalid ranges")
	}
}

func TestListUsersForwardsAllowlistedQueryOnly(t *testing.T) {
	router, _, stub, session, _ := newBusinessTestServer(t, http.StatusOK,
		`{"items": [{"id": "u-1", "username": "alice"}], "total": 1}`)

	resp := requestWithBody(t, router, http.MethodGet,
		"/api/users?query=ali&status=active&page=2&page_size=50&injected=1", "", nil, session)
	if resp.Code != http.StatusOK {
		t.Fatalf("users status=%d body=%s", resp.Code, resp.Body.String())
	}
	assertEqual(t, "upstream path", stub.path, "/internal/users")
	query, err := url.ParseQuery(stub.rawQuery)
	if err != nil {
		t.Fatal(err)
	}
	assertEqual(t, "query", query.Get("query"), "ali")
	assertEqual(t, "status", query.Get("status"), "active")
	assertEqual(t, "page", query.Get("page"), "2")
	assertEqual(t, "page_size", query.Get("page_size"), "50")
	if _, exists := query["injected"]; exists {
		t.Fatal("non-allowlisted params must not be forwarded")
	}
	body := decodeBody(t, resp)
	assertEqual(t, "total passthrough", body["total"], float64(1))
}

func TestBanRequiresNonEmptyReason(t *testing.T) {
	router, _, stub, session, csrf := newBusinessTestServer(t, http.StatusOK, `{}`)
	cases := []struct {
		name, body, wantCode string
	}{
		{"blank reason", `{"reason": "   "}`, "REASON_REQUIRED"},
		{"missing reason", `{}`, "REASON_REQUIRED"},
		{"not json", `reason`, "INVALID_BODY"},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			resp := postJSON(t, router, "/api/users/u-1/ban", tc.body, session, csrf)
			if resp.Code != http.StatusBadRequest {
				t.Fatalf("status=%d body=%s", resp.Code, resp.Body.String())
			}
			assertEqual(t, "error code", errorObject(t, resp)["code"], tc.wantCode)
		})
	}
	if stub.path != "" {
		t.Fatal("upstream must not be called when reason is missing")
	}
}

func TestBanProxiesUpstreamAndAudits(t *testing.T) {
	router, st, stub, session, csrf := newBusinessTestServer(t, http.StatusOK,
		`{"banned_ms": 1767000000000, "revoked_sessions": 2}`)

	resp := postJSON(t, router, "/api/users/u-9/ban", `{"reason": "policy violation"}`, session, csrf)
	if resp.Code != http.StatusOK {
		t.Fatalf("ban status=%d body=%s", resp.Code, resp.Body.String())
	}
	assertEqual(t, "upstream path", stub.path, "/internal/users/u-9/ban")
	assertEqual(t, "service token header", stub.authHeader, "Bearer "+testServiceToken)

	var upstreamReq struct {
		Reason string `json:"reason"`
		Actor  string `json:"actor"`
	}
	if err := json.Unmarshal([]byte(stub.body), &upstreamReq); err != nil {
		t.Fatalf("upstream request %q: %v", stub.body, err)
	}
	assertEqual(t, "upstream reason", upstreamReq.Reason, "policy violation")
	assertEqual(t, "upstream actor", upstreamReq.Actor, "https://sso.example.com:admin-1")

	body := decodeBody(t, resp)
	assertEqual(t, "revoked passthrough", body["revoked_sessions"], float64(2))

	last := st.audits[len(st.audits)-1]
	assertEqual(t, "audit module", last.Module, "users")
	assertEqual(t, "audit action", last.Action, "ban")
	assertEqual(t, "audit target", last.TargetID, "u-9")
	assertEqual(t, "audit result", last.Result, "ok")
	assertEqual(t, "audit reason", last.Reason, "policy violation")
}

func TestBanUpstreamErrorIsNormalizedAndAudited(t *testing.T) {
	// sync-server 内部端点错误体是纯文本(受控文案)
	router, st, _, session, csrf := newBusinessTestServer(t, http.StatusNotFound, "user not found")

	resp := postJSON(t, router, "/api/users/u-missing/ban", `{"reason": "policy violation"}`, session, csrf)
	if resp.Code != http.StatusNotFound {
		t.Fatalf("ban status=%d body=%s", resp.Code, resp.Body.String())
	}
	errObj := errorObject(t, resp)
	assertEqual(t, "normalized code", errObj["code"], "NOT_FOUND")
	assertEqual(t, "upstream message passthrough", errObj["message"], "user not found")
	if requestID, _ := errObj["request_id"].(string); requestID == "" {
		t.Fatal("error envelope must carry request_id")
	}

	last := st.audits[len(st.audits)-1]
	assertEqual(t, "audit result", last.Result, "error")
	var detail struct {
		UpstreamCode string `json:"upstream_code"`
	}
	if err := json.Unmarshal(last.Detail, &detail); err != nil {
		t.Fatalf("audit detail %s: %v", last.Detail, err)
	}
	assertEqual(t, "audit upstream code", detail.UpstreamCode, "NOT_FOUND")
}

func TestUserDetailMergesAuditOperations(t *testing.T) {
	router, st, stub, session, _ := newBusinessTestServer(t, http.StatusOK,
		`{"profile": {"id": "u-9", "username": "bob", "masked_email": "b***@x.com"},
		  "sessions": [], "login_logs": [], "sync": {"device_count": 1}}`)

	if err := st.AppendAudit(context.Background(), store.AuditEntry{
		Module: "users", Action: "ban", TargetType: "user", TargetID: "u-9",
		Result: "ok", Reason: "policy violation", CreatedMS: 1767000000000,
	}); err != nil {
		t.Fatal(err)
	}

	resp := requestWithBody(t, router, http.MethodGet, "/api/users/u-9", "", nil, session)
	if resp.Code != http.StatusOK {
		t.Fatalf("detail status=%d body=%s", resp.Code, resp.Body.String())
	}
	assertEqual(t, "upstream path", stub.path, "/internal/users/u-9")
	body := decodeBody(t, resp)
	profile := subObject(t, body, "profile")
	assertEqual(t, "profile passthrough", profile["username"], "bob")
	operations, ok := body["operations"].([]any)
	if !ok || len(operations) != 1 {
		t.Fatalf("operations = %v", body["operations"])
	}
	firstOp := operations[0].(map[string]any)
	assertEqual(t, "operation action", firstOp["action"], "ban")
	assertEqual(t, "operation target", firstOp["target_id"], "u-9")
}

func TestRevokeSessionsForwardsOptionalSessionID(t *testing.T) {
	router, st, stub, session, csrf := newBusinessTestServer(t, http.StatusOK, `{"revoked": 1}`)

	single := postJSON(t, router, "/api/users/u-9/sessions/revoke", `{"session_id": 7}`, session, csrf)
	if single.Code != http.StatusOK {
		t.Fatalf("revoke status=%d body=%s", single.Code, single.Body.String())
	}
	assertEqual(t, "upstream body", strings.TrimSpace(stub.body), `{"session_id":7}`)

	all := postJSON(t, router, "/api/users/u-9/sessions/revoke", `{}`, session, csrf)
	if all.Code != http.StatusOK {
		t.Fatalf("revoke-all status=%d body=%s", all.Code, all.Body.String())
	}
	assertEqual(t, "upstream body for all", strings.TrimSpace(stub.body), `{}`)

	last := st.audits[len(st.audits)-1]
	assertEqual(t, "audit action", last.Action, "revoke_sessions")
	assertEqual(t, "audit module", last.Module, "users")
}

func TestMembershipsReturn503UntilServiceShips(t *testing.T) {
	router, _, stub, session, csrf := newBusinessTestServer(t, http.StatusOK, `{}`)

	read := requestWithBody(t, router, http.MethodGet, "/api/memberships?page=1", "", nil, session)
	if read.Code != http.StatusServiceUnavailable {
		t.Fatalf("list status=%d body=%s", read.Code, read.Body.String())
	}
	assertEqual(t, "error code", errorObject(t, read)["code"], "MEMBERSHIP_UNAVAILABLE")

	write := postJSON(t, router, "/api/memberships/u-9/level",
		`{"level": "pro", "ends_ms": 1, "reason": "adjust"}`, session, csrf)
	if write.Code != http.StatusServiceUnavailable {
		t.Fatalf("write status=%d body=%s", write.Code, write.Body.String())
	}
	changes := requestWithBody(t, router, http.MethodGet, "/api/memberships/changes", "", nil, session)
	if changes.Code != http.StatusServiceUnavailable {
		t.Fatalf("changes status=%d body=%s", changes.Code, changes.Body.String())
	}
	if stub.path != "" {
		t.Fatal("membership endpoints must not hit sync-server")
	}
}

func TestMembershipDeniedWithoutPermission(t *testing.T) {
	// security_admin 没有 membership:* 权限:权限不足必须是 403 而不是 503
	// (business 服务器的登录身份是应急超管、全权限,测不了这个分支)
	router, _, _ := newAuthTestServer(t)
	session, _ := login(t, router)

	resp := requestWithBody(t, router, http.MethodGet, "/api/memberships", "", nil, session)
	if resp.Code != http.StatusForbidden {
		t.Fatalf("status=%d body=%s", resp.Code, resp.Body.String())
	}
	assertEqual(t, "error code", errorObject(t, resp)["code"], "FORBIDDEN")
}

func TestGrantRoleValidationsAndAudit(t *testing.T) {
	router, st, _, session, csrf := newBusinessTestServer(t, http.StatusOK, `{}`)
	const grantPath = "/api/admin-users/role"
	const issuer = "https://sso.example.com"

	t.Run("self grant forbidden", func(t *testing.T) {
		body := `{"issuer": "` + issuer + `", "subject": "admin-1", "role": "analyst", "reason": "self demote"}`
		resp := postJSON(t, router, grantPath, body, session, csrf)
		if resp.Code != http.StatusForbidden {
			t.Fatalf("status=%d body=%s", resp.Code, resp.Body.String())
		}
		assertEqual(t, "error code", errorObject(t, resp)["code"], "SELF_GRANT_FORBIDDEN")
	})
	t.Run("unknown role rejected", func(t *testing.T) {
		body := `{"issuer": "` + issuer + `", "subject": "op-1", "role": "root", "reason": "escalate"}`
		resp := postJSON(t, router, grantPath, body, session, csrf)
		assertEqual(t, "status", resp.Code, http.StatusBadRequest)
		assertEqual(t, "error code", errorObject(t, resp)["code"], "INVALID_ROLE")
	})
	t.Run("reason required", func(t *testing.T) {
		body := `{"issuer": "` + issuer + `", "subject": "op-1", "role": "analyst", "reason": ""}`
		resp := postJSON(t, router, grantPath, body, session, csrf)
		assertEqual(t, "status", resp.Code, http.StatusBadRequest)
		assertEqual(t, "error code", errorObject(t, resp)["code"], "REASON_REQUIRED")
	})
	t.Run("valid grant persists and audits", func(t *testing.T) {
		body := `{"issuer": "` + issuer + `", "subject": "op-1", "display_name": "Ops One", "role": "user_operator", "reason": "join user ops"}`
		resp := postJSON(t, router, grantPath, body, session, csrf)
		if resp.Code != http.StatusOK {
			t.Fatalf("status=%d body=%s", resp.Code, resp.Body.String())
		}
		granted := st.users[identityKey(issuer, "op-1")]
		assertEqual(t, "granted role", granted.Role, auth.RoleUserOperator)
		assertEqual(t, "granted status", granted.Status, "active")
		last := st.audits[len(st.audits)-1]
		assertEqual(t, "audit module", last.Module, "authorization")
		assertEqual(t, "audit action", last.Action, "grant_role")
		assertEqual(t, "audit target", last.TargetID, issuer+":op-1")
		assertEqual(t, "audit result", last.Result, "ok")
	})
	t.Run("list admin users returns bare array", func(t *testing.T) {
		// 前端 listAdminUsers() 的契约:直接是 AdminUser[],不是 {items} 包装
		resp := requestWithBody(t, router, http.MethodGet, "/api/admin-users", "", nil, session)
		if resp.Code != http.StatusOK {
			t.Fatalf("status=%d body=%s", resp.Code, resp.Body.String())
		}
		var list []store.AdminUser
		if err := json.Unmarshal(resp.Body.Bytes(), &list); err != nil {
			t.Fatalf("admin-users %q: %v", resp.Body.String(), err)
		}
		if len(list) < 2 { // 至少:登录的 admin-1 + 刚授予的 op-1
			t.Fatalf("expected at least 2 admin users, got %d", len(list))
		}
	})
}

func TestSecurityAdminCannotGrantEmergencyAdmin(t *testing.T) {
	// newAuthTestServer 的登录身份是 security_admin:不能授予应急超管
	router, _, _ := newAuthTestServer(t)
	session, csrf := login(t, router)

	body := `{"issuer": "https://sso.example.com", "subject": "op-2", "role": "emergency_admin", "reason": "promote backup"}`
	resp := postJSON(t, router, "/api/admin-users/role", body, session, csrf)
	if resp.Code != http.StatusForbidden {
		t.Fatalf("status=%d body=%s", resp.Code, resp.Body.String())
	}
	assertEqual(t, "error code", errorObject(t, resp)["code"], "ROLE_NOT_GRANTABLE")
}

func TestLastEmergencyAdminCannotBeDemotedOrDisabled(t *testing.T) {
	// security_admin(actor)对唯一 active 应急管理员降级/禁用都必须 409
	router, st, _ := newAuthTestServer(t)
	st.users[identityKey("https://sso.example.com", "the-last-emergency")] = store.AdminUser{
		Issuer: "https://sso.example.com", Subject: "the-last-emergency",
		DisplayName: "Last", Role: auth.RoleEmergencyAdmin, Status: "active",
	}
	session, csrf := login(t, router)

	demote := `{"issuer": "https://sso.example.com", "subject": "the-last-emergency", "role": "analyst", "reason": "rotate roles"}`
	resp := postJSON(t, router, "/api/admin-users/role", demote, session, csrf)
	if resp.Code != http.StatusConflict {
		t.Fatalf("demote status=%d body=%s", resp.Code, resp.Body.String())
	}
	assertEqual(t, "error code", errorObject(t, resp)["code"], "LAST_EMERGENCY_ADMIN")

	disable := `{"issuer": "https://sso.example.com", "subject": "the-last-emergency", "status": "disabled", "reason": "offboard"}`
	resp = postJSON(t, router, "/api/admin-users/status", disable, session, csrf)
	if resp.Code != http.StatusConflict {
		t.Fatalf("disable status=%d body=%s", resp.Code, resp.Body.String())
	}
	assertEqual(t, "error code", errorObject(t, resp)["code"], "LAST_EMERGENCY_ADMIN")
}

func TestSetAdminStatusValidations(t *testing.T) {
	router, st, _, session, csrf := newBusinessTestServer(t, http.StatusOK, `{}`)
	const statusPath = "/api/admin-users/status"
	const issuer = "https://sso.example.com"
	st.users[identityKey(issuer, "op-2")] = store.AdminUser{
		Issuer: issuer, Subject: "op-2", DisplayName: "Ops Two",
		Role: auth.RoleUserOperator, Status: "active",
	}

	self := `{"issuer": "` + issuer + `", "subject": "admin-1", "status": "disabled", "reason": "self off"}`
	resp := postJSON(t, router, statusPath, self, session, csrf)
	assertEqual(t, "self status", resp.Code, http.StatusForbidden)
	assertEqual(t, "error code", errorObject(t, resp)["code"], "SELF_STATUS_CHANGE_FORBIDDEN")

	invalid := `{"issuer": "` + issuer + `", "subject": "op-2", "status": "paused", "reason": "why not"}`
	resp = postJSON(t, router, statusPath, invalid, session, csrf)
	assertEqual(t, "invalid status", resp.Code, http.StatusBadRequest)
	assertEqual(t, "error code", errorObject(t, resp)["code"], "INVALID_STATUS")

	unknown := `{"issuer": "` + issuer + `", "subject": "ghost", "status": "disabled", "reason": "offboard"}`
	resp = postJSON(t, router, statusPath, unknown, session, csrf)
	assertEqual(t, "unknown admin", resp.Code, http.StatusNotFound)
	assertEqual(t, "error code", errorObject(t, resp)["code"], "ADMIN_NOT_FOUND")

	disable := `{"issuer": "` + issuer + `", "subject": "op-2", "status": "disabled", "reason": "offboarding"}`
	resp = postJSON(t, router, statusPath, disable, session, csrf)
	if resp.Code != http.StatusOK {
		t.Fatalf("disable status=%d body=%s", resp.Code, resp.Body.String())
	}
	assertEqual(t, "persisted status", st.users[identityKey(issuer, "op-2")].Status, "disabled")
	last := st.audits[len(st.audits)-1]
	assertEqual(t, "audit module", last.Module, "authorization")
	assertEqual(t, "audit action", last.Action, "set_status")
	assertEqual(t, "audit result", last.Result, "ok")
}

func TestAuditListFiltersByModule(t *testing.T) {
	router, st, _, session, _ := newBusinessTestServer(t, http.StatusOK, `{}`)
	entries := []store.AuditEntry{
		{Module: "users", Action: "ban", TargetType: "user", TargetID: "u-1", Result: "ok", CreatedMS: 3000},
		{Module: "auth", Action: "login", TargetType: "admin_user", TargetID: "iss:sub", Result: "ok", CreatedMS: 2000},
		{Module: "users", Action: "unban", TargetType: "user", TargetID: "u-2", Result: "denied", CreatedMS: 1000},
	}
	for _, entry := range entries {
		if err := st.AppendAudit(context.Background(), entry); err != nil {
			t.Fatal(err)
		}
	}

	resp := requestWithBody(t, router, http.MethodGet, "/api/audit?module=users", "", nil, session)
	if resp.Code != http.StatusOK {
		t.Fatalf("audit status=%d body=%s", resp.Code, resp.Body.String())
	}
	body := decodeBody(t, resp)
	assertEqual(t, "filtered total", body["total"], float64(2))
	items, ok := body["items"].([]any)
	if !ok || len(items) != 2 {
		t.Fatalf("items = %v", body["items"])
	}
	// 新→旧:ban(3000) 在 unban(1000) 前
	first := items[0].(map[string]any)
	assertEqual(t, "newest first", first["action"], "ban")

	all := requestWithBody(t, router, http.MethodGet, "/api/audit?target_id=u-2&result=denied", "", nil, session)
	assertEqual(t, "combined filter total", decodeBody(t, all)["total"], float64(1))
}

func TestAuditDeniedWithoutPermission(t *testing.T) {
	// user_operator 没有 audit:read
	gin.SetMode(gin.TestMode)
	st := newFakeStore()
	sso := &fakeSSO{issuer: "https://sso.example.com", subject: "ops-1"}
	st.users[identityKey(sso.issuer, sso.subject)] = store.AdminUser{
		Issuer: sso.issuer, Subject: sso.subject, DisplayName: "Ops",
		Role: auth.RoleUserOperator, Status: "active",
	}
	cfg := testConfig()
	cfg.SyncServerURL = "http://127.0.0.1:1"
	cfg.InternalServiceToken = testServiceToken
	router, err := NewRouter(cfg, st, sso)
	if err != nil {
		t.Fatal(err)
	}
	session, _ := login(t, router)

	resp := requestWithBody(t, router, http.MethodGet, "/api/audit", "", nil, session)
	if resp.Code != http.StatusForbidden {
		t.Fatalf("status=%d body=%s", resp.Code, resp.Body.String())
	}
	assertEqual(t, "error code", errorObject(t, resp)["code"], "FORBIDDEN")
}
