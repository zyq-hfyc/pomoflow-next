package auth

import "crypto/subtle"

// Session 是 Admin BFF 的数据库会话视图；不包含任何 token 原文。
type Session struct {
	ID        int64
	Issuer    string
	Subject   string
	CSRFHash  string
	ExpiresMS int64
	RevokedMS int64
}

// Valid 检查会话是否未吊销且未过期；到期时刻本身即失效。
func (s Session) Valid(nowMS int64) bool {
	return s.RevokedMS == 0 && nowMS < s.ExpiresMS
}

// CSRFValid 校验写操作的 double-submit token。
// 即使传入值错误，也比较固定长度摘要，避免按内容提前返回。
func (s Session) CSRFValid(token string) bool {
	if s.CSRFHash == "" || token == "" {
		return false
	}
	provided := HashToken(token)
	return subtle.ConstantTimeCompare([]byte(s.CSRFHash), []byte(provided)) == 1
}
