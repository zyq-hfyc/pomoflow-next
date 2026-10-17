package httpapi

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/http/httptest"
	"net/url"
	"sort"
	"strings"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/auth"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/config"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/store"
)

var _ store.Store = (*fakeStore)(nil)

type fakeSSO struct {
	issuer  string
	subject string
	nonce   string
}

func (f *fakeSSO) AuthCodeURL(state, nonce string) string {
	f.nonce = nonce
	return "https://sso.example.com/authorize?state=" + url.QueryEscape(state) + "&nonce=" + url.QueryEscape(nonce)
}

func (f *fakeSSO) Exchange(_ context.Context, code string) (auth.OIDCIdentity, error) {
	if code != "good" {
		return auth.OIDCIdentity{}, errors.New("bad code")
	}
	return auth.OIDCIdentity{
		Issuer:      f.issuer,
		Subject:     f.subject,
		DisplayName: "Test Admin",
		Nonce:       f.nonce,
	}, nil
}

type fakeStore struct {
	users    map[string]store.AdminUser
	states   map[string]store.OIDCState
	sessions map[string]store.SessionIdentity
	audits   []store.AuditEntry
	nextID   int64
}

func newFakeStore() *fakeStore {
	return &fakeStore{
		users:    make(map[string]store.AdminUser),
		states:   make(map[string]store.OIDCState),
		sessions: make(map[string]store.SessionIdentity),
		nextID:   1,
	}
}

func identityKey(issuer, subject string) string { return issuer + "\x00" + subject }

func (f *fakeStore) GetAdminUser(_ context.Context, issuer, subject string) (store.AdminUser, error) {
	user, ok := f.users[identityKey(issuer, subject)]
	if !ok {
		return store.AdminUser{}, store.ErrNotFound
	}
	return user, nil
}

func (f *fakeStore) BootstrapEmergencyAdmin(_ context.Context, issuer, subject, displayName string, nowMS int64) error {
	if len(f.users) != 0 {
		return store.ErrBootstrapClosed
	}
	f.users[identityKey(issuer, subject)] = store.AdminUser{
		Issuer: issuer, Subject: subject, DisplayName: displayName,
		Role: auth.RoleEmergencyAdmin, Status: "active", CreatedMS: nowMS, UpdatedMS: nowMS,
	}
	return nil
}

func (f *fakeStore) MarkAdminLogin(_ context.Context, issuer, subject string, nowMS int64) error {
	key := identityKey(issuer, subject)
	user, ok := f.users[key]
	if !ok {
		return store.ErrNotFound
	}
	user.LastLoginMS = nowMS
	f.users[key] = user
	return nil
}

func (f *fakeStore) CreateOIDCState(_ context.Context, stateHash, issuer, nonceHash string, _, _ int64) error {
	f.states[stateHash] = store.OIDCState{Issuer: issuer, NonceHash: nonceHash}
	return nil
}

func (f *fakeStore) ConsumeOIDCState(_ context.Context, stateHash string, _ int64) (store.OIDCState, error) {
	state, ok := f.states[stateHash]
	if !ok {
		return store.OIDCState{}, store.ErrNotFound
	}
	delete(f.states, stateHash)
	return state, nil
}

func (f *fakeStore) CreateSession(_ context.Context, tokenHash, csrfHash, issuer, subject, _, _ string, _, expiresMS int64) (int64, error) {
	user, err := f.GetAdminUser(context.Background(), issuer, subject)
	if err != nil {
		return 0, err
	}
	id := f.nextID
	f.nextID++
	f.sessions[tokenHash] = store.SessionIdentity{
		Session: auth.Session{ID: id, Issuer: issuer, Subject: subject, CSRFHash: csrfHash, ExpiresMS: expiresMS},
		User:    user,
	}
	return id, nil
}

func (f *fakeStore) GetSessionIdentity(_ context.Context, tokenHash string) (store.SessionIdentity, error) {
	identity, ok := f.sessions[tokenHash]
	if !ok {
		return store.SessionIdentity{}, store.ErrNotFound
	}
	return identity, nil
}

func (f *fakeStore) RevokeSession(_ context.Context, sessionID int64, nowMS int64) error {
	for key, identity := range f.sessions {
		if identity.Session.ID == sessionID {
			identity.Session.RevokedMS = nowMS
			f.sessions[key] = identity
			return nil
		}
	}
	return store.ErrNotFound
}

func (f *fakeStore) AppendAudit(_ context.Context, entry store.AuditEntry) error {
	f.audits = append(f.audits, entry)
	return nil
}

func (f *fakeStore) ListAudit(_ context.Context, filter store.AuditFilter) ([]store.AuditRecord, int, error) {
	matches := func(entry store.AuditEntry) bool {
		if filter.Module != "" && entry.Module != filter.Module {
			return false
		}
		if filter.Action != "" && entry.Action != filter.Action {
			return false
		}
		if filter.TargetType != "" && entry.TargetType != filter.TargetType {
			return false
		}
		if filter.TargetID != "" && entry.TargetID != filter.TargetID {
			return false
		}
		if filter.Result != "" && entry.Result != filter.Result {
			return false
		}
		if filter.Actor != "" && entry.ActorIssuer != filter.Actor && entry.ActorSubject != filter.Actor {
			return false
		}
		if filter.FromMS != 0 && entry.CreatedMS < filter.FromMS {
			return false
		}
		if filter.ToMS != 0 && entry.CreatedMS > filter.ToMS {
			return false
		}
		return true
	}
	// 新→旧(追加序的逆序);ID 与写入顺序一致。
	records := []store.AuditRecord{}
	for i := len(f.audits) - 1; i >= 0; i-- {
		if matches(f.audits[i]) {
			records = append(records, store.AuditRecord{ID: int64(i + 1), AuditEntry: f.audits[i]})
		}
	}
	total := len(records)
	page := filter.Page
	if page < 1 {
		page = 1
	}
	size := filter.PageSize
	if size < 1 {
		size = 20
	}
	start := (page - 1) * size
	if start > len(records) {
		start = len(records)
	}
	end := start + size
	if end > len(records) {
		end = len(records)
	}
	return records[start:end], total, nil
}

func (f *fakeStore) ListAdminUsers(_ context.Context) ([]store.AdminUser, error) {
	users := make([]store.AdminUser, 0, len(f.users))
	for _, user := range f.users {
		users = append(users, user)
	}
	sort.Slice(users, func(i, j int) bool {
		if users[i].CreatedMS != users[j].CreatedMS {
			return users[i].CreatedMS < users[j].CreatedMS
		}
		return users[i].Subject < users[j].Subject
	})
	return users, nil
}

func (f *fakeStore) SaveAdminUser(_ context.Context, user store.AdminUser, nowMS int64) (*store.AdminUser, error) {
	key := identityKey(user.Issuer, user.Subject)
	current, exists := f.users[key]
	if exists && current.Role == auth.RoleEmergencyAdmin &&
		current.Status == "active" && user.Role != auth.RoleEmergencyAdmin {
		if !f.hasOtherActiveEmergencyAdmin(user.Issuer, user.Subject) {
			return nil, store.ErrLastEmergencyAdmin
		}
	}
	user.Status = "active"
	user.UpdatedMS = nowMS
	if !exists {
		user.CreatedMS = nowMS
	}
	f.users[key] = user
	saved := user
	return &saved, nil
}

func (f *fakeStore) UpdateAdminStatus(_ context.Context, issuer, subject, status string, nowMS int64) (store.AdminUser, error) {
	if status != "active" && status != "disabled" {
		return store.AdminUser{}, fmt.Errorf("invalid admin status %q", status)
	}
	key := identityKey(issuer, subject)
	user, ok := f.users[key]
	if !ok {
		return store.AdminUser{}, store.ErrNotFound
	}
	if status == "disabled" && user.Role == auth.RoleEmergencyAdmin && user.Status == "active" {
		if !f.hasOtherActiveEmergencyAdmin(issuer, subject) {
			return store.AdminUser{}, store.ErrLastEmergencyAdmin
		}
	}
	user.Status = status
	user.UpdatedMS = nowMS
	f.users[key] = user
	return user, nil
}

func (f *fakeStore) hasOtherActiveEmergencyAdmin(issuer, subject string) bool {
	for key, user := range f.users {
		if key == identityKey(issuer, subject) {
			continue
		}
		if user.Role == auth.RoleEmergencyAdmin && user.Status == "active" {
			return true
		}
	}
	return false
}

func testConfig() config.Config {
	return config.Config{
		DatabaseURL:          "unused",
		OIDCIssuer:           "https://sso.example.com",
		PublicURL:            "http://localhost:5173",
		CookieSecure:         false,
		IPAllowlist:          "127.0.0.1/32",
		SessionTTL:           time.Hour,
		BootstrapSubject:     "bootstrap",
		BootstrapDisplayName: "Bootstrap",
	}
}

func newAuthTestServer(t *testing.T) (*gin.Engine, *fakeStore, *fakeSSO) {
	t.Helper()
	gin.SetMode(gin.TestMode)
	st := newFakeStore()
	sso := &fakeSSO{issuer: "https://sso.example.com", subject: "admin-1"}
	st.users[identityKey(sso.issuer, sso.subject)] = store.AdminUser{
		Issuer: sso.issuer, Subject: sso.subject, DisplayName: "Test Admin",
		Role: auth.RoleSecurityAdmin, Status: "active",
	}
	router, err := NewRouter(testConfig(), st, sso)
	if err != nil {
		t.Fatal(err)
	}
	return router, st, sso
}

func request(t *testing.T, router http.Handler, method, target string, cookies ...*http.Cookie) *httptest.ResponseRecorder {
	t.Helper()
	req := httptest.NewRequest(method, target, nil)
	req.RemoteAddr = "127.0.0.1:12345"
	for _, cookie := range cookies {
		req.AddCookie(cookie)
	}
	recorder := httptest.NewRecorder()
	router.ServeHTTP(recorder, req)
	return recorder
}

func responseCookie(t *testing.T, recorder *httptest.ResponseRecorder, name string) *http.Cookie {
	t.Helper()
	for _, cookie := range recorder.Result().Cookies() {
		if cookie.Name == name {
			return cookie
		}
	}
	t.Fatalf("response has no cookie %q", name)
	return nil
}

func login(t *testing.T, router http.Handler) (*http.Cookie, *http.Cookie) {
	t.Helper()
	login := request(t, router, http.MethodGet, "/api/auth/login")
	if login.Code != http.StatusFound {
		t.Fatalf("login status = %d, body=%s", login.Code, login.Body.String())
	}
	location, err := url.Parse(login.Header().Get("Location"))
	if err != nil {
		t.Fatal(err)
	}
	state := location.Query().Get("state")
	oauthCookie := responseCookie(t, login, oauthStateCookieName)
	callback := request(t, router, http.MethodGet,
		"/api/auth/callback?state="+url.QueryEscape(state)+"&code=good", oauthCookie)
	if callback.Code != http.StatusFound || callback.Header().Get("Location") != "http://localhost:5173" {
		t.Fatalf("callback status=%d location=%q body=%s", callback.Code, callback.Header().Get("Location"), callback.Body.String())
	}
	return responseCookie(t, callback, sessionCookieName), responseCookie(t, callback, csrfCookieName)
}

func TestOIDCLoginCallbackAndMe(t *testing.T) {
	router, st, _ := newAuthTestServer(t)
	session, _ := login(t, router)
	me := request(t, router, http.MethodGet, "/api/auth/me", session)
	if me.Code != http.StatusOK {
		t.Fatalf("me status=%d body=%s", me.Code, me.Body.String())
	}
	var body struct {
		User struct {
			Role auth.Role `json:"role"`
		} `json:"user"`
		Permissions []auth.Permission `json:"permissions"`
	}
	if err := json.Unmarshal(me.Body.Bytes(), &body); err != nil {
		t.Fatal(err)
	}
	if body.User.Role != auth.RoleSecurityAdmin {
		t.Fatalf("role = %q", body.User.Role)
	}
	if len(body.Permissions) == 0 {
		t.Fatal("permissions must not be empty")
	}
	if len(st.audits) == 0 || st.audits[len(st.audits)-1].Action != "login" {
		t.Fatal("successful login must be audited")
	}
}

func TestOIDCStateCannotBeReplayed(t *testing.T) {
	router, _, _ := newAuthTestServer(t)
	loginResponse := request(t, router, http.MethodGet, "/api/auth/login")
	location, _ := url.Parse(loginResponse.Header().Get("Location"))
	state := location.Query().Get("state")
	oauthCookie := responseCookie(t, loginResponse, oauthStateCookieName)
	path := "/api/auth/callback?state=" + url.QueryEscape(state) + "&code=good"
	first := request(t, router, http.MethodGet, path, oauthCookie)
	if first.Code != http.StatusFound {
		t.Fatalf("first callback failed: %s", first.Body.String())
	}
	replay := request(t, router, http.MethodGet, path, oauthCookie)
	if replay.Code != http.StatusFound || !strings.Contains(replay.Header().Get("Location"), "/login?error=oidc") {
		t.Fatalf("replayed state must be rejected, got %d %q", replay.Code, replay.Header().Get("Location"))
	}
}

func TestLogoutRequiresCSRFAndRevokesSession(t *testing.T) {
	router, _, _ := newAuthTestServer(t)
	session, csrf := login(t, router)
	denied := request(t, router, http.MethodPost, "/api/auth/logout", session, csrf)
	if denied.Code != http.StatusForbidden {
		t.Fatalf("logout without CSRF status=%d", denied.Code)
	}
	req := httptest.NewRequest(http.MethodPost, "/api/auth/logout", nil)
	req.RemoteAddr = "127.0.0.1:12345"
	req.AddCookie(session)
	req.AddCookie(csrf)
	req.Header.Set("X-CSRF-Token", csrf.Value)
	recorder := httptest.NewRecorder()
	router.ServeHTTP(recorder, req)
	if recorder.Code != http.StatusNoContent {
		t.Fatalf("logout status=%d body=%s", recorder.Code, recorder.Body.String())
	}
	me := request(t, router, http.MethodGet, "/api/auth/me", session)
	if me.Code != http.StatusUnauthorized {
		t.Fatalf("revoked session should be unauthorized, got %d", me.Code)
	}
}

func TestBootstrapOnlyWorksForFirstAdmin(t *testing.T) {
	gin.SetMode(gin.TestMode)
	st := newFakeStore()
	sso := &fakeSSO{issuer: "https://sso.example.com", subject: "bootstrap"}
	router, err := NewRouter(testConfig(), st, sso)
	if err != nil {
		t.Fatal(err)
	}
	login(t, router)
	if got := st.users[identityKey(sso.issuer, "bootstrap")].Role; got != auth.RoleEmergencyAdmin {
		t.Fatalf("bootstrap role = %q", got)
	}

	// 授权表非空后，即便继续配置 bootstrap subject，也不能再引导第二个身份。
	sso2 := &fakeSSO{issuer: "https://sso.example.com", subject: "bootstrap"}
	cfg := testConfig()
	cfg.OIDCIssuer = "https://other-issuer.example.com"
	sso2.issuer = cfg.OIDCIssuer
	router2, err := NewRouter(cfg, st, sso2)
	if err != nil {
		t.Fatal(err)
	}
	loginResponse := request(t, router2, http.MethodGet, "/api/auth/login")
	location, _ := url.Parse(loginResponse.Header().Get("Location"))
	state := location.Query().Get("state")
	oauthCookie := responseCookie(t, loginResponse, oauthStateCookieName)
	callback := request(t, router2, http.MethodGet,
		"/api/auth/callback?state="+url.QueryEscape(state)+"&code=good", oauthCookie)
	if !strings.Contains(callback.Header().Get("Location"), "/login?error=unauthorized") {
		t.Fatalf("second bootstrap should be closed, location=%q", callback.Header().Get("Location"))
	}
}

func TestIPAllowlistRejectsBeforeAuth(t *testing.T) {
	router, _, _ := newAuthTestServer(t)
	req := httptest.NewRequest(http.MethodGet, "/api/auth/login", nil)
	req.RemoteAddr = "192.0.2.10:12345"
	recorder := httptest.NewRecorder()
	router.ServeHTTP(recorder, req)
	if recorder.Code != http.StatusForbidden {
		t.Fatalf("outside allowlist status=%d", recorder.Code)
	}
	if !strings.Contains(recorder.Body.String(), "IP_NOT_ALLOWED") {
		t.Fatalf("unexpected error body %s", recorder.Body.String())
	}
}

func TestSessionExpiryIsChecked(t *testing.T) {
	router, st, _ := newAuthTestServer(t)
	session, _ := login(t, router)
	for key, identity := range st.sessions {
		identity.Session.ExpiresMS = 1
		st.sessions[key] = identity
	}
	me := request(t, router, http.MethodGet, "/api/auth/me", session)
	if me.Code != http.StatusUnauthorized {
		t.Fatalf("expired session status=%d", me.Code)
	}
}
