package config

import (
	"testing"
	"time"
)

var envKeys = []string{
	"PORT", "DATABASE_URL", "ADMIN_OIDC_ISSUER", "ADMIN_OIDC_CLIENT_ID",
	"ADMIN_OIDC_CLIENT_SECRET", "ADMIN_OIDC_REDIRECT_URL", "ADMIN_PUBLIC_URL",
	"ADMIN_COOKIE_SECURE", "ADMIN_IP_ALLOWLIST", "ADMIN_TRUSTED_PROXY_CIDRS",
	"ADMIN_SESSION_TTL_MINUTES", "ADMIN_BOOTSTRAP_SUBJECT", "ADMIN_BOOTSTRAP_DISPLAY_NAME",
	"SYNC_SERVER_URL", "MEMBERSHIP_SERVICE_URL", "ANALYTICS_SERVICE_URL", "INTERNAL_SERVICE_TOKEN",
	"ADMIN_DEV_FAKE_LOGIN", "RELEASE_DOWNLOAD_BASE_URL", "RELEASE_UPLOAD_MAX_BYTES",
}

func clearEnv(t *testing.T) {
	t.Helper()
	for _, key := range envKeys {
		t.Setenv(key, "")
	}
}

func setValidEnv(t *testing.T) {
	t.Helper()
	clearEnv(t)
	t.Setenv("DATABASE_URL", "postgres://admin@localhost/pomoflow")
	t.Setenv("ADMIN_OIDC_ISSUER", "https://sso.example.com")
	t.Setenv("ADMIN_OIDC_CLIENT_ID", "pomoflow-admin")
	t.Setenv("ADMIN_OIDC_CLIENT_SECRET", "secret")
	t.Setenv("ADMIN_OIDC_REDIRECT_URL", "https://admin.example.com/api/auth/callback")
	t.Setenv("ADMIN_PUBLIC_URL", "https://admin.example.com")
	t.Setenv("INTERNAL_SERVICE_TOKEN", "internal-secret")
}

func TestLoadValidDefaults(t *testing.T) {
	setValidEnv(t)
	cfg, err := Load()
	if err != nil {
		t.Fatal(err)
	}
	if cfg.Port != 8090 {
		t.Fatalf("Port = %d, want 8090", cfg.Port)
	}
	if !cfg.CookieSecure {
		t.Fatal("CookieSecure must default to true")
	}
	if cfg.SessionTTL != 8*time.Hour {
		t.Fatalf("SessionTTL = %v, want 8h", cfg.SessionTTL)
	}
	if cfg.IPAllowlist != "127.0.0.1/32,::1/128" {
		t.Fatalf("unexpected default allowlist %q", cfg.IPAllowlist)
	}
	if cfg.SyncServerURL != "http://127.0.0.1:8080" {
		t.Fatalf("unexpected sync URL %q", cfg.SyncServerURL)
	}
	if cfg.ReleaseDownloadBaseURL != "http://127.0.0.1:8080" {
		t.Fatalf("unexpected download base URL %q", cfg.ReleaseDownloadBaseURL)
	}
	if cfg.ReleaseUploadMaxBytes != 512<<20 {
		t.Fatalf("ReleaseUploadMaxBytes = %d, want 512MiB", cfg.ReleaseUploadMaxBytes)
	}
}

func TestLoadMissingRequired(t *testing.T) {
	for _, key := range []string{
		"DATABASE_URL", "ADMIN_OIDC_ISSUER", "ADMIN_OIDC_CLIENT_ID",
		"ADMIN_OIDC_CLIENT_SECRET", "ADMIN_OIDC_REDIRECT_URL", "ADMIN_PUBLIC_URL",
		"INTERNAL_SERVICE_TOKEN",
	} {
		t.Run(key, func(t *testing.T) {
			setValidEnv(t)
			t.Setenv(key, "")
			if _, err := Load(); err == nil {
				t.Fatalf("Load should reject missing %s", key)
			}
		})
	}
}

func TestLoadRejectsInvalidValues(t *testing.T) {
	tests := []struct{ key, value string }{
		{"PORT", "0"},
		{"PORT", "not-a-number"},
		{"ADMIN_SESSION_TTL_MINUTES", "5"},
		{"ADMIN_SESSION_TTL_MINUTES", "10000"},
		{"ADMIN_COOKIE_SECURE", "maybe"},
		{"ADMIN_OIDC_ISSUER", "not-a-url"},
		{"ADMIN_PUBLIC_URL", "http://admin.example.com/base"},
	}
	for _, tt := range tests {
		t.Run(tt.key+"="+tt.value, func(t *testing.T) {
			setValidEnv(t)
			t.Setenv(tt.key, tt.value)
			if _, err := Load(); err == nil {
				t.Fatal("expected configuration error")
			}
		})
	}
}

func TestLoadExplicitDevelopmentCookie(t *testing.T) {
	setValidEnv(t)
	t.Setenv("ADMIN_COOKIE_SECURE", "false")
	t.Setenv("ADMIN_PUBLIC_URL", "http://localhost:5173")
	t.Setenv("ADMIN_OIDC_REDIRECT_URL", "http://localhost:5173/api/auth/callback")
	cfg, err := Load()
	if err != nil {
		t.Fatal(err)
	}
	if cfg.CookieSecure {
		t.Fatal("explicit development CookieSecure=false not honored")
	}
}

func TestLoadDevFakeLoginRequiresInsecureCookies(t *testing.T) {
	setValidEnv(t)
	t.Setenv("ADMIN_DEV_FAKE_LOGIN", "true")
	if _, err := Load(); err == nil {
		t.Fatal("dev fake login must be rejected while ADMIN_COOKIE_SECURE=true")
	}
}

func TestLoadDevFakeLoginMakesOIDCOptional(t *testing.T) {
	setValidEnv(t)
	t.Setenv("ADMIN_DEV_FAKE_LOGIN", "true")
	t.Setenv("ADMIN_COOKIE_SECURE", "false")
	t.Setenv("ADMIN_PUBLIC_URL", "http://localhost:5173")
	for _, key := range []string{
		"ADMIN_OIDC_ISSUER", "ADMIN_OIDC_CLIENT_ID",
		"ADMIN_OIDC_CLIENT_SECRET", "ADMIN_OIDC_REDIRECT_URL",
	} {
		t.Setenv(key, "")
	}
	cfg, err := Load()
	if err != nil {
		t.Fatal(err)
	}
	if !cfg.DevFakeLogin {
		t.Fatal("DevFakeLogin not honored")
	}
	if cfg.OIDCIssuer != "" || cfg.OIDCClientID != "" || cfg.OIDCClientSecret != "" || cfg.OIDCRedirectURL != "" {
		t.Fatal("dev fake login should tolerate empty OIDC configuration")
	}
}
