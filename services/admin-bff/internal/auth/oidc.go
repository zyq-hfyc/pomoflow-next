package auth

import (
	"context"
	"errors"
	"fmt"

	"github.com/coreos/go-oidc/v3/oidc"
	"golang.org/x/oauth2"
)

// OIDCIdentity 是经过 issuer 发现、签名校验和 authorization code 交换后的身份。
type OIDCIdentity struct {
	Issuer      string
	Subject     string
	DisplayName string
	Nonce       string
}

// OIDCService 封装成熟库 go-oidc + oauth2；不在本项目中手写 JWT 验签。
type OIDCService struct {
	issuer      string
	oauthConfig *oauth2.Config
	verifier    *oidc.IDTokenVerifier
}

func NewOIDCService(ctx context.Context, issuer, clientID, clientSecret, redirectURL string) (*OIDCService, error) {
	provider, err := oidc.NewProvider(ctx, issuer)
	if err != nil {
		return nil, fmt.Errorf("discover OIDC provider: %w", err)
	}
	return &OIDCService{
		issuer: issuer,
		oauthConfig: &oauth2.Config{
			ClientID:     clientID,
			ClientSecret: clientSecret,
			RedirectURL:  redirectURL,
			Endpoint:     provider.Endpoint(),
			Scopes:       []string{oidc.ScopeOpenID, "profile"},
		},
		verifier: provider.Verifier(&oidc.Config{ClientID: clientID}),
	}, nil
}

func (s *OIDCService) AuthCodeURL(state, nonce string) string {
	return s.oauthConfig.AuthCodeURL(state, oidc.Nonce(nonce))
}

func (s *OIDCService) Exchange(ctx context.Context, code string) (OIDCIdentity, error) {
	if code == "" {
		return OIDCIdentity{}, errors.New("missing authorization code")
	}
	token, err := s.oauthConfig.Exchange(ctx, code)
	if err != nil {
		return OIDCIdentity{}, fmt.Errorf("exchange OIDC authorization code: %w", err)
	}
	rawIDToken, ok := token.Extra("id_token").(string)
	if !ok || rawIDToken == "" {
		return OIDCIdentity{}, errors.New("OIDC response has no id_token")
	}
	idToken, err := s.verifier.Verify(ctx, rawIDToken)
	if err != nil {
		return OIDCIdentity{}, fmt.Errorf("verify OIDC id_token: %w", err)
	}
	var claims struct {
		Name              string `json:"name"`
		PreferredUsername string `json:"preferred_username"`
	}
	if err := idToken.Claims(&claims); err != nil {
		return OIDCIdentity{}, fmt.Errorf("decode OIDC claims: %w", err)
	}
	displayName := claims.Name
	if displayName == "" {
		displayName = claims.PreferredUsername
	}
	if displayName == "" {
		displayName = idToken.Subject
	}
	return OIDCIdentity{
		Issuer:      idToken.Issuer,
		Subject:     idToken.Subject,
		DisplayName: displayName,
		Nonce:       idToken.Nonce,
	}, nil
}
