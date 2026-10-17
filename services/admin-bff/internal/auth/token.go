package auth

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"fmt"
)

// SessionTokenBytes 是随机会话/CSRF/state 凭证的字节数（256 位）。
const SessionTokenBytes = 32

// NewRandomToken 生成 URL 安全的 256 位随机凭证。
// 原文只出现在 HttpOnly/CSRF cookie 或 OIDC 跳转中，数据库只存摘要。
func NewRandomToken() (string, error) {
	buf := make([]byte, SessionTokenBytes)
	if _, err := rand.Read(buf); err != nil {
		return "", fmt.Errorf("generate random token: %w", err)
	}
	return base64.RawURLEncoding.EncodeToString(buf), nil
}

// HashToken 返回会话/CSRF token 的 SHA-256 十六进制摘要。
func HashToken(token string) string {
	sum := sha256.Sum256([]byte(token))
	return hex.EncodeToString(sum[:])
}

// HashSessionID 返回审计日志可引用的会话标识摘要。
// 与会话 token 使用不同域分离，避免跨用途摘要相等。
func HashSessionID(token string) string {
	sum := sha256.Sum256([]byte("pomoflow-admin/session-id\x00" + token))
	return hex.EncodeToString(sum[:])
}
