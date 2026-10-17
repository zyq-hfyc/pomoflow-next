package httpapi

import (
	"context"
	"crypto/subtle"
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/auth"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/store"
)

const (
	sessionCookieName     = "pomoflow_admin_session"
	csrfCookieName        = "pomoflow_admin_csrf"
	oauthStateCookieName  = "pomoflow_admin_oauth_state"
	oauthStateTTL         = 10 * time.Minute
)

func (s *Server) handleLogin(c *gin.Context) {
	state, err := auth.NewRandomToken()
	if err != nil {
		internalError(c, err)
		return
	}
	nonce, err := auth.NewRandomToken()
	if err != nil {
		internalError(c, err)
		return
	}
	now := s.now()
	if err := s.store.CreateOIDCState(c.Request.Context(), auth.HashToken(state), s.cfg.OIDCIssuer,
		auth.HashToken(nonce), now.UnixMilli(), now.Add(oauthStateTTL).UnixMilli()); err != nil {
		internalError(c, err)
		return
	}
	setCookie(c, sessionCookieOptions{
		name: oauthStateCookieName, value: state, path: "/api/auth/callback",
		maxAge: int(oauthStateTTL.Seconds()), httpOnly: true, secure: s.cfg.CookieSecure,
		sameSite: http.SameSiteLaxMode,
	})
	c.Redirect(http.StatusFound, s.sso.AuthCodeURL(state, nonce))
}

func (s *Server) handleCallback(c *gin.Context) {
	stateCookie, err := c.Cookie(oauthStateCookieName)
	state := c.Query("state")
	if err != nil || stateCookie == "" || state == "" ||
		subtle.ConstantTimeCompare([]byte(stateCookie), []byte(state)) != 1 {
		s.failCallback(c, "oidc")
		return
	}
	consumed, err := s.store.ConsumeOIDCState(c.Request.Context(), auth.HashToken(state), s.now().UnixMilli())
	if errors.Is(err, store.ErrNotFound) {
		s.failCallback(c, "oidc")
		return
	}
	if err != nil {
		internalError(c, err)
		return
	}
	clearCookie(c, oauthStateCookieName, "/api/auth/callback", s.cfg.CookieSecure, http.SameSiteLaxMode)

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()
	identity, err := s.sso.Exchange(ctx, c.Query("code"))
	if err != nil || identity.Issuer != s.cfg.OIDCIssuer || consumed.Issuer != s.cfg.OIDCIssuer ||
		subtle.ConstantTimeCompare([]byte(consumed.NonceHash), []byte(auth.HashToken(identity.Nonce))) != 1 {
		s.failCallback(c, "oidc")
		return
	}

	user, err := s.store.GetAdminUser(c.Request.Context(), identity.Issuer, identity.Subject)
	if errors.Is(err, store.ErrNotFound) {
		if s.cfg.BootstrapSubject == "" || s.cfg.BootstrapSubject != identity.Subject {
			s.failCallback(c, "unauthorized")
			return
		}
		displayName := s.cfg.BootstrapDisplayName
		if displayName == "" {
			displayName = identity.DisplayName
		}
		if err := s.store.BootstrapEmergencyAdmin(c.Request.Context(), identity.Issuer,
			identity.Subject, displayName, s.now().UnixMilli()); err != nil {
			if errors.Is(err, store.ErrBootstrapClosed) {
				s.failCallback(c, "unauthorized")
				return
			}
			internalError(c, err)
			return
		}
		user, err = s.store.GetAdminUser(c.Request.Context(), identity.Issuer, identity.Subject)
	}
	if err != nil {
		internalError(c, err)
		return
	}
	if !user.Active() {
		s.failCallback(c, "unauthorized")
		return
	}
	if err := s.store.MarkAdminLogin(c.Request.Context(), user.Issuer, user.Subject, s.now().UnixMilli()); err != nil {
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
	sessionID, err := s.store.CreateSession(c.Request.Context(), auth.HashToken(sessionToken),
		auth.HashToken(csrfToken), user.Issuer, user.Subject, currentClientIP(c),
		c.Request.UserAgent(), now.UnixMilli(), now.Add(s.cfg.SessionTTL).UnixMilli())
	if err != nil {
		internalError(c, err)
		return
	}
	identityWithSession := store.SessionIdentity{
		Session: auth.Session{ID: sessionID, Issuer: user.Issuer, Subject: user.Subject},
		User:    user,
	}
	if err := s.recordAudit(c, &identityWithSession, "auth", "login", "admin_user",
		user.Issuer+":"+user.Subject, "ok", "", nil); err != nil {
		_ = s.store.RevokeSession(c.Request.Context(), sessionID, now.UnixMilli())
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

func (s *Server) handleMe(c *gin.Context) {
	identity := currentIdentity(c)
	c.JSON(http.StatusOK, gin.H{
		"user": gin.H{
			"issuer":       identity.User.Issuer,
			"subject":      identity.User.Subject,
			"display_name": identity.User.DisplayName,
			"role":         identity.User.Role,
		},
		"permissions":        identity.User.Role.Permissions(),
		"session_expires_ms": identity.Session.ExpiresMS,
	})
}

func (s *Server) handleLogout(c *gin.Context) {
	identity := currentIdentity(c)
	if err := s.store.RevokeSession(c.Request.Context(), identity.Session.ID, s.now().UnixMilli()); err != nil {
		internalError(c, err)
		return
	}
	if err := s.recordAudit(c, &identity, "auth", "logout", "admin_user",
		identity.User.Issuer+":"+identity.User.Subject, "ok", "", nil); err != nil {
		internalError(c, err)
		return
	}
	clearCookie(c, sessionCookieName, "/", s.cfg.CookieSecure, http.SameSiteStrictMode)
	clearCookie(c, csrfCookieName, "/", s.cfg.CookieSecure, http.SameSiteStrictMode)
	c.Status(http.StatusNoContent)
}

func (s *Server) failCallback(c *gin.Context, code string) {
	c.Redirect(http.StatusFound, s.cfg.PublicURL+"/login?error="+code)
}

func (s *Server) recordAudit(c *gin.Context, identity *store.SessionIdentity, module, action,
	targetType, targetID, result, reason string, detail any) error {
	var actor store.SessionIdentity
	if identity != nil {
		actor = *identity
	}
	var detailJSON []byte
	if detail != nil {
		var err error
		detailJSON, err = json.Marshal(detail)
		if err != nil {
			return err
		}
	}
	return s.store.AppendAudit(c.Request.Context(), store.AuditEntry{
		RequestID:    currentRequestID(c),
		ActorIssuer:  actor.User.Issuer,
		ActorSubject: actor.User.Subject,
		ActorRole:    actor.User.Role,
		SessionID:    actor.Session.ID,
		IP:           currentClientIP(c),
		Module:       module,
		Action:       action,
		TargetType:   targetType,
		TargetID:     targetID,
		Result:       result,
		Reason:       reason,
		Detail:       detailJSON,
		CreatedMS:    s.now().UnixMilli(),
	})
}

type sessionCookieOptions struct {
	name     string
	value    string
	path     string
	maxAge   int
	httpOnly bool
	secure   bool
	sameSite http.SameSite
}

func setCookie(c *gin.Context, options sessionCookieOptions) {
	http.SetCookie(c.Writer, &http.Cookie{
		Name: options.name, Value: options.value, Path: options.path,
		MaxAge: options.maxAge, HttpOnly: options.httpOnly, Secure: options.secure,
		SameSite: options.sameSite,
	})
}

func clearCookie(c *gin.Context, name, path string, secure bool, sameSite http.SameSite) {
	http.SetCookie(c.Writer, &http.Cookie{
		Name: name, Value: "", Path: path, MaxAge: -1,
		Expires: time.Unix(1, 0), HttpOnly: true, Secure: secure, SameSite: sameSite,
	})
}
