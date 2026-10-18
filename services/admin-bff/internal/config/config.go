// Package config 负责 Admin BFF 的环境变量加载与启动时校验。
package config

import (
	"errors"
	"fmt"
	"net/url"
	"os"
	"strconv"
	"strings"
	"time"
)

// Config 是进程级不可变配置；密钥只从环境变量读取。
type Config struct {
	Port                 int
	DatabaseURL          string
	OIDCIssuer           string
	OIDCClientID         string
	OIDCClientSecret     string
	OIDCRedirectURL      string
	PublicURL            string
	CookieSecure         bool
	IPAllowlist          string
	TrustedProxyCIDRs    string
	SessionTTL           time.Duration
	BootstrapSubject     string
	BootstrapDisplayName string
	SyncServerURL        string
	MembershipServiceURL string
	AnalyticsServiceURL  string
	InternalServiceToken string
	// DevFakeLogin 启用仅限本地回环联调的假登录(无 OIDC)。
	// 只在 CookieSecure=false 时可用,生产配置永远到不了这条路径。
	DevFakeLogin bool
}

// Load 读取并校验配置。任何必需密钥或 URL 缺失都在监听端口前失败。
func Load() (Config, error) {
	var cfg Config
	var err error

	cfg.Port, err = intEnv("PORT", 8090, 1, 65535)
	if err != nil {
		return Config{}, err
	}
	if cfg.DatabaseURL, err = required("DATABASE_URL"); err != nil {
		return Config{}, err
	}

	cfg.CookieSecure, err = boolEnv("ADMIN_COOKIE_SECURE", true)
	if err != nil {
		return Config{}, err
	}
	if cfg.DevFakeLogin, err = boolEnv("ADMIN_DEV_FAKE_LOGIN", false); err != nil {
		return Config{}, err
	}
	if cfg.DevFakeLogin && cfg.CookieSecure {
		return Config{}, errors.New("ADMIN_DEV_FAKE_LOGIN requires ADMIN_COOKIE_SECURE=false (local loopback only)")
	}

	// OIDC 配置:生产必填;dev 假登录模式改为可选(填了也只会指向 stub)。
	if cfg.DevFakeLogin {
		if cfg.OIDCIssuer, err = optionalURL("ADMIN_OIDC_ISSUER", false); err != nil {
			return Config{}, err
		}
		cfg.OIDCClientID = valueOr("ADMIN_OIDC_CLIENT_ID", "")
		cfg.OIDCClientSecret = valueOr("ADMIN_OIDC_CLIENT_SECRET", "")
		if cfg.OIDCRedirectURL, err = optionalURL("ADMIN_OIDC_REDIRECT_URL", false); err != nil {
			return Config{}, err
		}
	} else {
		if cfg.OIDCIssuer, err = requiredURL("ADMIN_OIDC_ISSUER", false); err != nil {
			return Config{}, err
		}
		if cfg.OIDCClientID, err = required("ADMIN_OIDC_CLIENT_ID"); err != nil {
			return Config{}, err
		}
		if cfg.OIDCClientSecret, err = required("ADMIN_OIDC_CLIENT_SECRET"); err != nil {
			return Config{}, err
		}
		if cfg.OIDCRedirectURL, err = requiredURL("ADMIN_OIDC_REDIRECT_URL", false); err != nil {
			return Config{}, err
		}
	}
	if cfg.PublicURL, err = requiredURL("ADMIN_PUBLIC_URL", true); err != nil {
		return Config{}, err
	}
	if cfg.InternalServiceToken, err = required("INTERNAL_SERVICE_TOKEN"); err != nil {
		return Config{}, err
	}

	if cfg.CookieSecure {
		for key, raw := range map[string]string{
			"ADMIN_OIDC_REDIRECT_URL": cfg.OIDCRedirectURL,
			"ADMIN_PUBLIC_URL":        cfg.PublicURL,
		} {
			if !strings.HasPrefix(raw, "https://") {
				return Config{}, fmt.Errorf("%s must use HTTPS when ADMIN_COOKIE_SECURE=true", key)
			}
		}
	}

	cfg.IPAllowlist = valueOr("ADMIN_IP_ALLOWLIST", "127.0.0.1/32,::1/128")
	cfg.TrustedProxyCIDRs = os.Getenv("ADMIN_TRUSTED_PROXY_CIDRS")
	ttlMinutes, err := intEnv("ADMIN_SESSION_TTL_MINUTES", 480, 15, 720)
	if err != nil {
		return Config{}, err
	}
	cfg.SessionTTL = time.Duration(ttlMinutes) * time.Minute
	cfg.BootstrapSubject = strings.TrimSpace(os.Getenv("ADMIN_BOOTSTRAP_SUBJECT"))
	cfg.BootstrapDisplayName = strings.TrimSpace(os.Getenv("ADMIN_BOOTSTRAP_DISPLAY_NAME"))
	cfg.SyncServerURL = valueOr("SYNC_SERVER_URL", "http://127.0.0.1:8080")
	cfg.MembershipServiceURL = valueOr("MEMBERSHIP_SERVICE_URL", "http://127.0.0.1:8091")
	cfg.AnalyticsServiceURL = valueOr("ANALYTICS_SERVICE_URL", "http://127.0.0.1:8092")
	for key, raw := range map[string]string{
		"SYNC_SERVER_URL":        cfg.SyncServerURL,
		"MEMBERSHIP_SERVICE_URL": cfg.MembershipServiceURL,
		"ANALYTICS_SERVICE_URL":  cfg.AnalyticsServiceURL,
	} {
		if err := validateAbsoluteURL(raw, false); err != nil {
			return Config{}, fmt.Errorf("%s: %w", key, err)
		}
	}
	return cfg, nil
}

func required(key string) (string, error) {
	value := strings.TrimSpace(os.Getenv(key))
	if value == "" {
		return "", fmt.Errorf("%s must be set", key)
	}
	return value, nil
}

func requiredURL(key string, originOnly bool) (string, error) {
	raw, err := required(key)
	if err != nil {
		return "", err
	}
	if err := validateAbsoluteURL(raw, originOnly); err != nil {
		return "", fmt.Errorf("%s: %w", key, err)
	}
	return strings.TrimRight(raw, "/"), nil
}

// optionalURL 允许留空;填了就必须是合法绝对 URL。
func optionalURL(key string, originOnly bool) (string, error) {
	raw := strings.TrimSpace(os.Getenv(key))
	if raw == "" {
		return "", nil
	}
	if err := validateAbsoluteURL(raw, originOnly); err != nil {
		return "", fmt.Errorf("%s: %w", key, err)
	}
	return strings.TrimRight(raw, "/"), nil
}

func validateAbsoluteURL(raw string, originOnly bool) error {
	parsed, err := url.Parse(raw)
	if err != nil {
		return err
	}
	if (parsed.Scheme != "https" && parsed.Scheme != "http") || parsed.Host == "" {
		return errors.New("must be an absolute HTTP(S) URL")
	}
	if parsed.User != nil || parsed.RawQuery != "" || parsed.Fragment != "" {
		return errors.New("must not contain userinfo, query, or fragment")
	}
	if originOnly && parsed.Path != "" && parsed.Path != "/" {
		return errors.New("must be an origin without a path")
	}
	return nil
}

func valueOr(key, fallback string) string {
	if value := strings.TrimSpace(os.Getenv(key)); value != "" {
		return value
	}
	return fallback
}

func intEnv(key string, fallback, min, max int) (int, error) {
	raw := strings.TrimSpace(os.Getenv(key))
	if raw == "" {
		return fallback, nil
	}
	value, err := strconv.Atoi(raw)
	if err != nil || value < min || value > max {
		return 0, fmt.Errorf("%s must be an integer in [%d, %d]", key, min, max)
	}
	return value, nil
}

func boolEnv(key string, fallback bool) (bool, error) {
	raw := strings.TrimSpace(os.Getenv(key))
	if raw == "" {
		return fallback, nil
	}
	value, err := strconv.ParseBool(raw)
	if err != nil {
		return false, fmt.Errorf("%s must be a boolean", key)
	}
	return value, nil
}
