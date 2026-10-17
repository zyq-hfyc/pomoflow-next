package httpapi

import (
	"crypto/subtle"
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/auth"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/store"
)

const (
	requestIDContextKey = "pomoflow.request_id"
	identityContextKey  = "pomoflow.identity"
	clientIPContextKey  = "pomoflow.client_ip"
)

func requestIDMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestID := strings.TrimSpace(c.GetHeader("X-Request-ID"))
		if !validRequestID(requestID) {
			var err error
			requestID, err = auth.NewRandomToken()
			if err != nil {
				internalError(c, err)
				return
			}
		}
		c.Set(requestIDContextKey, requestID)
		c.Header("X-Request-ID", requestID)
		c.Next()
	}
}

func validRequestID(value string) bool {
	if len(value) < 8 || len(value) > 80 {
		return false
	}
	for _, r := range value {
		if (r < 'a' || r > 'z') && (r < 'A' || r > 'Z') && (r < '0' || r > '9') &&
			r != '-' && r != '_' && r != '.' && r != ':' {
			return false
		}
	}
	return true
}

func securityHeadersMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("X-Content-Type-Options", "nosniff")
		c.Header("X-Frame-Options", "DENY")
		c.Header("Referrer-Policy", "no-referrer")
		c.Header("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'")
		c.Next()
	}
}

func (s *Server) ipAllowlistMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ip, allowed := s.allowlist.Allowed(c.Request.RemoteAddr, c.GetHeader("X-Forwarded-For"))
		if !allowed {
			writeError(c, http.StatusForbidden, "IP_NOT_ALLOWED", "admin access is not allowed from this network")
			return
		}
		c.Set(clientIPContextKey, ip)
		c.Next()
	}
}

func (s *Server) authRequiredMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := c.Cookie(sessionCookieName)
		if err != nil || token == "" {
			writeError(c, http.StatusUnauthorized, "UNAUTHORIZED", "admin session required")
			return
		}
		identity, err := s.store.GetSessionIdentity(c.Request.Context(), auth.HashToken(token))
		if errors.Is(err, store.ErrNotFound) {
			writeError(c, http.StatusUnauthorized, "UNAUTHORIZED", "admin session required")
			return
		}
		if err != nil {
			internalError(c, err)
			return
		}
		if !identity.Session.Valid(s.now().UnixMilli()) {
			writeError(c, http.StatusUnauthorized, "SESSION_EXPIRED", "admin session expired")
			return
		}
		if !identity.User.Active() {
			writeError(c, http.StatusForbidden, "ADMIN_DISABLED", "admin identity disabled")
			return
		}
		c.Set(identityContextKey, identity)
		c.Next()
	}
}

func (s *Server) csrfRequiredMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		identity := currentIdentity(c)
		header := c.GetHeader("X-CSRF-Token")
		cookie, _ := c.Cookie(csrfCookieName)
		matched := subtle.ConstantTimeCompare([]byte(header), []byte(cookie)) == 1
		if header == "" || !matched || !identity.Session.CSRFValid(header) {
			_ = s.recordAudit(c, &identity, "auth", "csrf", "", "", "denied", "csrf rejected", nil)
			writeError(c, http.StatusForbidden, "CSRF_REJECTED", "CSRF token rejected")
			return
		}
		c.Next()
	}
}

func (s *Server) requirePermission(permission auth.Permission) gin.HandlerFunc {
	return func(c *gin.Context) {
		identity := currentIdentity(c)
		if !auth.HasPermission(identity.User.Role, permission) {
			_ = s.recordAudit(c, &identity, "authz", c.FullPath(), "", "", "denied", string(permission), nil)
			writeError(c, http.StatusForbidden, "FORBIDDEN", "permission denied")
			return
		}
		c.Next()
	}
}

func currentIdentity(c *gin.Context) store.SessionIdentity {
	value, ok := c.Get(identityContextKey)
	if !ok {
		return store.SessionIdentity{}
	}
	identity, _ := value.(store.SessionIdentity)
	return identity
}

func currentRequestID(c *gin.Context) string {
	value, _ := c.Get(requestIDContextKey)
	requestID, _ := value.(string)
	return requestID
}

func currentClientIP(c *gin.Context) string {
	value, _ := c.Get(clientIPContextKey)
	ip, _ := value.(string)
	return ip
}

func currentTime(s *Server) time.Time {
	return s.now()
}
