// release_handlers_test.go —— 发布分发接口(ADR-013)全链路测试。
//
// 验证重点:RBAC(仅应急超管)、CSRF 链、cap 预检 413 不透传、
// ~8MB 原始字节穿透(证无请求侧 LimitReader)、审计落库、错误归一。
package httpapi

import (
	"net/http"
	"net/url"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/auth"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/store"
)

// newReleaseTestServer 应急超管 + 可调上传上限 + 可控下载基址。
func newReleaseTestServer(t *testing.T, upstreamStatus int, upstreamResponse string,
	uploadMax int64) (*gin.Engine, *fakeStore, *upstreamStub, *http.Cookie, *http.Cookie) {
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
	cfg.ReleaseUploadMaxBytes = uploadMax
	cfg.ReleaseDownloadBaseURL = "https://download.example.com"
	router, err := NewRouter(cfg, st, sso)
	if err != nil {
		t.Fatal(err)
	}
	session, csrf := login(t, router)
	return router, st, stub, session, csrf
}

func TestReleasesDeniedWithoutPermission(t *testing.T) {
	// security_admin 没有 releases:manage(precedent:audit:export)
	router, _, _ := newAuthTestServer(t)
	session, _ := login(t, router)

	resp := requestWithBody(t, router, http.MethodGet, "/api/releases", "", nil, session)
	if resp.Code != http.StatusForbidden {
		t.Fatalf("status=%d body=%s", resp.Code, resp.Body.String())
	}
	assertEqual(t, "error code", errorObject(t, resp)["code"], "FORBIDDEN")
}

func TestListReleasesInjectsDownloadBase(t *testing.T) {
	router, _, stub, session, _ := newReleaseTestServer(t, http.StatusOK,
		`{"items": [{"id": "rel-1", "version": "0.2.1", "status": "published", "assets": []}]}`, 512<<20)

	resp := requestWithBody(t, router, http.MethodGet, "/api/releases", "", nil, session)
	if resp.Code != http.StatusOK {
		t.Fatalf("status=%d body=%s", resp.Code, resp.Body.String())
	}
	assertEqual(t, "upstream path", stub.path, "/internal/releases")
	body := decodeBody(t, resp)
	assertEqual(t, "download base passthrough", body["download_base_url"], "https://download.example.com")
	items, ok := body["items"].([]any)
	if !ok || len(items) != 1 {
		t.Fatalf("items = %v", body["items"])
	}
}

func TestCreateReleaseValidationsAndAudit(t *testing.T) {
	router, st, stub, session, csrf := newReleaseTestServer(t, http.StatusCreated,
		`{"id": "rel-1", "version": "0.2.1", "status": "draft", "assets": []}`, 512<<20)

	resp := postJSON(t, router, "/api/releases",
		`{"version": "0.2.1", "notes": "首个发布", "reason": "ship it"}`, session, csrf)
	if resp.Code != http.StatusCreated {
		t.Fatalf("create status=%d body=%s", resp.Code, resp.Body.String())
	}
	assertEqual(t, "upstream path", stub.path, "/internal/releases")
	assertEqual(t, "upstream body has version", strings.Contains(stub.body, `"version":"0.2.1"`), true)

	blank := postJSON(t, router, "/api/releases", `{"version": "   "}`, session, csrf)
	assertEqual(t, "blank version", blank.Code, http.StatusBadRequest)
	assertEqual(t, "error code", errorObject(t, blank)["code"], "VERSION_REQUIRED")

	// blank version 在审计前就被拦:最后一条审计就是成功的 create
	last := st.audits[len(st.audits)-1]
	assertEqual(t, "audit module", last.Module, "releases")
	assertEqual(t, "audit action", last.Action, "create")
	assertEqual(t, "audit target", last.TargetID, "0.2.1")
	assertEqual(t, "audit result", last.Result, "ok")
}

func TestUploadRequiresCSRFAndPlatform(t *testing.T) {
	router, _, stub, session, csrf := newReleaseTestServer(t, http.StatusCreated, `{}`, 512<<20)

	noCSRF := requestWithBody(t, router, http.MethodPost,
		"/api/releases/rel-1/assets?platform=windows", "payload",
		map[string]string{"Content-Type": "application/octet-stream"}, session)
	assertEqual(t, "missing csrf", noCSRF.Code, http.StatusForbidden)
	assertEqual(t, "error code", errorObject(t, noCSRF)["code"], "CSRF_REJECTED")

	noPlatform := requestWithBody(t, router, http.MethodPost,
		"/api/releases/rel-1/assets", "payload", map[string]string{
			"Content-Type": "application/octet-stream", "X-CSRF-Token": csrf.Value,
		}, session, csrf)
	assertEqual(t, "missing platform", noPlatform.Code, http.StatusBadRequest)
	assertEqual(t, "error code", errorObject(t, noPlatform)["code"], "PLATFORM_REQUIRED")
	if stub.path != "" {
		t.Fatal("upstream must not be called for invalid uploads")
	}
}

func TestUploadPrechecksOversizeWithoutForwarding(t *testing.T) {
	router, _, stub, session, csrf := newReleaseTestServer(t, http.StatusCreated, `{}`, 1<<20)

	// Content-Length 2MiB > 预检 1MiB:413 且不透传
	big := strings.Repeat("x", 2<<20)
	resp := requestWithBody(t, router, http.MethodPost,
		"/api/releases/rel-1/assets?platform=windows", big, map[string]string{
			"Content-Type": "application/octet-stream", "X-CSRF-Token": csrf.Value,
		}, session, csrf)
	assertEqual(t, "oversize status", resp.Code, http.StatusRequestEntityTooLarge)
	assertEqual(t, "error code", errorObject(t, resp)["code"], "PAYLOAD_TOO_LARGE")
	if stub.path != "" {
		t.Fatal("oversize upload must not reach upstream")
	}
}

func TestUploadStreamsLargeBodyThrough(t *testing.T) {
	router, st, stub, session, csrf := newReleaseTestServer(t, http.StatusCreated,
		`{"id": "asset-1", "size_bytes": 8388608, "sha256": "ab12", "filename": "PomoFlow.exe"}`, 512<<20)

	const size = 8 << 20 // 8MiB:远超响应侧 4MiB LimitReader,证请求方向无上限
	body := strings.Repeat("PF", 4<<20)
	target := "/api/releases/rel-1/assets?platform=windows&filename=" +
		url.QueryEscape("PomoFlow_0.2.0_x64-setup.exe")
	resp := requestWithBody(t, router, http.MethodPost, target, body, map[string]string{
		"Content-Type": "application/octet-stream", "X-CSRF-Token": csrf.Value,
	}, session, csrf)
	if resp.Code != http.StatusCreated {
		t.Fatalf("upload status=%d body=%s", resp.Code, resp.Body.String())
	}
	assertEqual(t, "upstream path", stub.path, "/internal/releases/rel-1/assets")
	assertEqual(t, "service token header", stub.authHeader, "Bearer "+testServiceToken)
	query, err := url.ParseQuery(stub.rawQuery)
	if err != nil {
		t.Fatal(err)
	}
	assertEqual(t, "platform forwarded", query.Get("platform"), "windows")
	assertEqual(t, "filename forwarded", query.Get("filename"), "PomoFlow_0.2.0_x64-setup.exe")
	if len(stub.body) != size {
		t.Fatalf("upstream received %d bytes, want %d(无请求侧 LimitReader)", len(stub.body), size)
	}

	last := st.audits[len(st.audits)-1]
	assertEqual(t, "audit module", last.Module, "releases")
	assertEqual(t, "audit action", last.Action, "upload_asset")
	assertEqual(t, "audit result", last.Result, "ok")
}

func TestReleaseUpstreamErrorIsNormalizedAndAudited(t *testing.T) {
	router, st, _, session, csrf := newReleaseTestServer(t, http.StatusConflict,
		"version already exists", 512<<20)

	resp := postJSON(t, router, "/api/releases", `{"version": "0.2.0"}`, session, csrf)
	assertEqual(t, "status passthrough", resp.Code, http.StatusConflict)
	errObj := errorObject(t, resp)
	assertEqual(t, "normalized message", errObj["message"], "version already exists")

	last := st.audits[len(st.audits)-1]
	assertEqual(t, "audit result", last.Result, "error")
}

func TestReleaseTransitionsProxyAndAudit(t *testing.T) {
	router, st, stub, session, csrf := newReleaseTestServer(t, http.StatusOK,
		`{"id": "rel-1", "status": "published", "published_ms": 1}`, 512<<20)

	publish := postJSON(t, router, "/api/releases/rel-1/publish", `{}`, session, csrf)
	if publish.Code != http.StatusOK {
		t.Fatalf("publish status=%d body=%s", publish.Code, publish.Body.String())
	}
	assertEqual(t, "publish path", stub.path, "/internal/releases/rel-1/publish")
	last := st.audits[len(st.audits)-1]
	assertEqual(t, "publish audit action", last.Action, "publish")
	assertEqual(t, "publish audit result", last.Result, "ok")

	unpublish := postJSON(t, router, "/api/releases/rel-1/unpublish", `{}`, session, csrf)
	assertEqual(t, "unpublish status", unpublish.Code, http.StatusOK)

	delAsset := requestWithBody(t, router, http.MethodDelete, "/api/releases/rel-1/assets/asset-9",
		"", map[string]string{"X-CSRF-Token": csrf.Value}, session, csrf)
	if delAsset.Code != http.StatusOK {
		t.Fatalf("delete asset status=%d body=%s", delAsset.Code, delAsset.Body.String())
	}
	assertEqual(t, "delete asset path", stub.path, "/internal/assets/asset-9")

	delRelease := requestWithBody(t, router, http.MethodDelete, "/api/releases/rel-1",
		"", map[string]string{"X-CSRF-Token": csrf.Value}, session, csrf)
	assertEqual(t, "delete release status", delRelease.Code, http.StatusOK)
	assertEqual(t, "delete release path", stub.path, "/internal/releases/rel-1")

	last = st.audits[len(st.audits)-1]
	assertEqual(t, "delete audit action", last.Action, "delete")
}
