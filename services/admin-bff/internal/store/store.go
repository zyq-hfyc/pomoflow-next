// Package store 定义 Admin BFF 自有数据的持久化边界。
package store

import (
	"context"
	"encoding/json"
	"errors"
	"time"

	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/auth"
)

var (
	// ErrNotFound 表示请求的身份、会话或 state 不存在/已失效。
	ErrNotFound = errors.New("store: not found")
	// ErrBootstrapClosed 表示授权表已有记录，不能再通过 env 引导超管。
	ErrBootstrapClosed = errors.New("store: bootstrap closed")
	// ErrLastEmergencyAdmin 表示操作会移除最后一个有效应急管理员。
	ErrLastEmergencyAdmin = errors.New("store: last emergency admin")
)

// AdminUser 是后台授权身份，不是普通用户账号。
type AdminUser struct {
	Issuer      string    `json:"issuer"`
	Subject     string    `json:"subject"`
	DisplayName string    `json:"display_name"`
	Role        auth.Role `json:"role"`
	Status      string    `json:"status"`
	CreatedMS   int64     `json:"created_ms"`
	UpdatedMS   int64     `json:"updated_ms"`
	LastLoginMS int64     `json:"last_login_ms"`
}

func (u AdminUser) Active() bool {
	return u.Status == "active"
}

// OIDCState 是授权码流程的一次性 state/nonce 摘要。
type OIDCState struct {
	Issuer    string
	NonceHash string
}

// SessionIdentity 是一次请求鉴权所需的会话与当前角色。
// 角色每次从 admin_users 重读，收回授权后旧 session 不能继续提权。
type SessionIdentity struct {
	Session auth.Session
	User    AdminUser
}

// AuditEntry 是一条只追加的管理操作审计。
type AuditEntry struct {
	RequestID    string          `json:"request_id"`
	ActorIssuer  string          `json:"actor_issuer"`
	ActorSubject string          `json:"actor_subject"`
	ActorRole    auth.Role       `json:"actor_role"`
	SessionID    int64           `json:"-"`
	IP           string          `json:"ip"`
	Module       string          `json:"module"`
	Action       string          `json:"action"`
	TargetType   string          `json:"target_type"`
	TargetID     string          `json:"target_id"`
	Result       string          `json:"result"`
	Reason       string          `json:"reason"`
	Detail       json.RawMessage `json:"detail"`
	CreatedMS    int64           `json:"created_ms"`
}

// AuditRecord 是审计查询返回项。
type AuditRecord struct {
	ID int64 `json:"id"`
	AuditEntry
}

// AuditFilter 是审计列表的筛选与分页条件;空串/0 表示不筛该维度。
type AuditFilter struct {
	Actor      string
	Module     string
	Action     string
	TargetType string
	TargetID   string
	Result     string
	FromMS     int64
	ToMS       int64
	Page       int
	PageSize   int
}

// Store 是 Admin BFF 自有表的持久化接口。
// 所有 nowMS 由调用方注入，便于确定性测试；生产用 time.Now。
type Store interface {
	GetAdminUser(ctx context.Context, issuer, subject string) (AdminUser, error)
	BootstrapEmergencyAdmin(ctx context.Context, issuer, subject, displayName string, nowMS int64) error
	MarkAdminLogin(ctx context.Context, issuer, subject string, nowMS int64) error

	CreateOIDCState(ctx context.Context, stateHash, issuer, nonceHash string, nowMS, expiresMS int64) error
	ConsumeOIDCState(ctx context.Context, stateHash string, nowMS int64) (OIDCState, error)

	CreateSession(ctx context.Context, tokenHash, csrfHash, issuer, subject, ip, userAgent string, nowMS, expiresMS int64) (int64, error)
	GetSessionIdentity(ctx context.Context, tokenHash string) (SessionIdentity, error)
	RevokeSession(ctx context.Context, sessionID int64, nowMS int64) error

	AppendAudit(ctx context.Context, entry AuditEntry) error
	ListAudit(ctx context.Context, filter AuditFilter) ([]AuditRecord, int, error)

	ListAdminUsers(ctx context.Context) ([]AdminUser, error)
	SaveAdminUser(ctx context.Context, user AdminUser, nowMS int64) (*AdminUser, error)
	UpdateAdminStatus(ctx context.Context, issuer, subject, status string, nowMS int64) (AdminUser, error)
}

// NowMS 提供统一的毫秒时间戳。
func NowMS() int64 { return time.Now().UnixMilli() }
