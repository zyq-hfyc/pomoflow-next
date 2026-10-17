package store

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/auth"
)

// Postgres 是 Admin BFF 自有表的 pgx 实现。
type Postgres struct {
	pool *pgxpool.Pool
}

// ConnectPostgres 建连、Ping 并执行幂等 schema。
func ConnectPostgres(ctx context.Context, databaseURL, schema string) (*Postgres, error) {
	pool, err := pgxpool.New(ctx, databaseURL)
	if err != nil {
		return nil, fmt.Errorf("create admin postgres pool: %w", err)
	}
	if err := pool.Ping(ctx); err != nil {
		pool.Close()
		return nil, fmt.Errorf("ping admin postgres: %w", err)
	}
	if _, err := pool.Exec(ctx, schema); err != nil {
		pool.Close()
		return nil, fmt.Errorf("apply admin schema: %w", err)
	}
	return &Postgres{pool: pool}, nil
}

func (p *Postgres) Close() {
	p.pool.Close()
}

func (p *Postgres) GetAdminUser(ctx context.Context, issuer, subject string) (AdminUser, error) {
	var user AdminUser
	var lastLogin *int64
	err := p.pool.QueryRow(ctx, `
		SELECT issuer, subject, display_name, role, status, created_ms, updated_ms, last_login_ms
		FROM admin_users WHERE issuer = $1 AND subject = $2`, issuer, subject).
		Scan(&user.Issuer, &user.Subject, &user.DisplayName, &user.Role, &user.Status,
			&user.CreatedMS, &user.UpdatedMS, &lastLogin)
	if errors.Is(err, pgx.ErrNoRows) {
		return AdminUser{}, ErrNotFound
	}
	if err != nil {
		return AdminUser{}, fmt.Errorf("get admin user: %w", err)
	}
	if lastLogin != nil {
		user.LastLoginMS = *lastLogin
	}
	return user, nil
}

func (p *Postgres) BootstrapEmergencyAdmin(ctx context.Context, issuer, subject, displayName string, nowMS int64) error {
	tag, err := p.pool.Exec(ctx, `
		INSERT INTO admin_users
			(issuer, subject, display_name, role, status, created_ms, updated_ms)
		SELECT $1, $2, $3, 'emergency_admin', 'active', $4, $4
		WHERE NOT EXISTS (SELECT 1 FROM admin_users)
		ON CONFLICT (issuer, subject) DO NOTHING`, issuer, subject, displayName, nowMS)
	if err != nil {
		return fmt.Errorf("bootstrap emergency admin: %w", err)
	}
	if tag.RowsAffected() == 1 {
		return nil
	}
	// 已存在同一身份是正常登录；否则说明首个管理员引导窗口已经关闭。
	if _, err := p.GetAdminUser(ctx, issuer, subject); err == nil {
		return nil
	} else if !errors.Is(err, ErrNotFound) {
		return err
	}
	return ErrBootstrapClosed
}

func (p *Postgres) MarkAdminLogin(ctx context.Context, issuer, subject string, nowMS int64) error {
	_, err := p.pool.Exec(ctx, `
		UPDATE admin_users SET last_login_ms = $3, updated_ms = $3
		WHERE issuer = $1 AND subject = $2`, issuer, subject, nowMS)
	return wrapError("mark admin login", err)
}

func (p *Postgres) CreateOIDCState(ctx context.Context, stateHash, issuer, nonceHash string, nowMS, expiresMS int64) error {
	_, err := p.pool.Exec(ctx, `
		INSERT INTO admin_oidc_states (state_hash, issuer, nonce_hash, created_ms, expires_ms)
		VALUES ($1, $2, $3, $4, $5)`, stateHash, issuer, nonceHash, nowMS, expiresMS)
	return wrapError("create OIDC state", err)
}

func (p *Postgres) ConsumeOIDCState(ctx context.Context, stateHash string, nowMS int64) (OIDCState, error) {
	var state OIDCState
	err := p.pool.QueryRow(ctx, `
		DELETE FROM admin_oidc_states
		WHERE state_hash = $1 AND expires_ms > $2
		RETURNING issuer, nonce_hash`, stateHash, nowMS).
		Scan(&state.Issuer, &state.NonceHash)
	if errors.Is(err, pgx.ErrNoRows) {
		return OIDCState{}, ErrNotFound
	}
	if err != nil {
		return OIDCState{}, fmt.Errorf("consume OIDC state: %w", err)
	}
	return state, nil
}

func (p *Postgres) CreateSession(ctx context.Context, tokenHash, csrfHash, issuer, subject, ip, userAgent string, nowMS, expiresMS int64) (int64, error) {
	var id int64
	err := p.pool.QueryRow(ctx, `
		INSERT INTO admin_sessions
			(token_hash, csrf_hash, issuer, subject, created_ms, expires_ms, ip, user_agent)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING id`, tokenHash, csrfHash, issuer, subject, nowMS, expiresMS, ip, userAgent).
		Scan(&id)
	if err != nil {
		return 0, fmt.Errorf("create admin session: %w", err)
	}
	return id, nil
}

func (p *Postgres) GetSessionIdentity(ctx context.Context, tokenHash string) (SessionIdentity, error) {
	var identity SessionIdentity
	var revoked *int64
	var lastLogin *int64
	err := p.pool.QueryRow(ctx, `
		SELECT s.id, s.issuer, s.subject, s.csrf_hash, s.expires_ms, s.revoked_ms,
		       u.display_name, u.role, u.status, u.created_ms, u.updated_ms, u.last_login_ms
		FROM admin_sessions s
		JOIN admin_users u ON u.issuer = s.issuer AND u.subject = s.subject
		WHERE s.token_hash = $1`, tokenHash).
		Scan(&identity.Session.ID, &identity.Session.Issuer, &identity.Session.Subject,
			&identity.Session.CSRFHash, &identity.Session.ExpiresMS, &revoked,
			&identity.User.DisplayName, &identity.User.Role, &identity.User.Status,
			&identity.User.CreatedMS, &identity.User.UpdatedMS, &lastLogin)
	if errors.Is(err, pgx.ErrNoRows) {
		return SessionIdentity{}, ErrNotFound
	}
	if err != nil {
		return SessionIdentity{}, fmt.Errorf("get admin session: %w", err)
	}
	if revoked != nil {
		identity.Session.RevokedMS = *revoked
	}
	if lastLogin != nil {
		identity.User.LastLoginMS = *lastLogin
	}
	identity.User.Issuer = identity.Session.Issuer
	identity.User.Subject = identity.Session.Subject
	return identity, nil
}

func (p *Postgres) RevokeSession(ctx context.Context, sessionID int64, nowMS int64) error {
	_, err := p.pool.Exec(ctx, `
		UPDATE admin_sessions SET revoked_ms = COALESCE(revoked_ms, $2)
		WHERE id = $1`, sessionID, nowMS)
	return wrapError("revoke admin session", err)
}

func (p *Postgres) AppendAudit(ctx context.Context, entry AuditEntry) error {
	detail := entry.Detail
	if len(detail) == 0 {
		detail = []byte("{}")
	}
	if !json.Valid(detail) {
		return errors.New("audit detail must be valid JSON")
	}
	switch entry.Result {
	case "ok", "denied", "error":
	default:
		return fmt.Errorf("invalid audit result %q", entry.Result)
	}
	_, err := p.pool.Exec(ctx, `
		INSERT INTO admin_audit_logs
			(request_id, actor_issuer, actor_subject, actor_role, session_id, ip,
			 module, action, target_type, target_id, result, reason, detail, created_ms)
		VALUES ($1, $2, $3, $4, NULLIF($5, 0), $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
		entry.RequestID, entry.ActorIssuer, entry.ActorSubject, entry.ActorRole,
		entry.SessionID, entry.IP, entry.Module, entry.Action, entry.TargetType,
		entry.TargetID, entry.Result, entry.Reason, detail, entry.CreatedMS)
	return wrapError("append admin audit", err)
}

// ListAudit 按筛选条件返回审计记录(新→旧)与过滤后的总数。
// 空串/0 的筛选维度不参与过滤;分页超界返回空页而非错误。
func (p *Postgres) ListAudit(ctx context.Context, filter AuditFilter) ([]AuditRecord, int, error) {
	page := filter.Page
	if page < 1 {
		page = 1
	}
	size := filter.PageSize
	if size < 1 {
		size = 20
	}
	if size > 200 {
		size = 200
	}
	rows, err := p.pool.Query(ctx, `
		SELECT id, request_id, actor_issuer, actor_subject, actor_role,
		       COALESCE(session_id, 0), ip, module, action, target_type, target_id,
		       result, reason, detail, created_ms, COUNT(*) OVER() AS total_count
		FROM admin_audit_logs
		WHERE ($1::text = '' OR actor_issuer ILIKE '%' || $1 || '%' OR actor_subject ILIKE '%' || $1 || '%')
		  AND ($2::text = '' OR module = $2)
		  AND ($3::text = '' OR action = $3)
		  AND ($4::text = '' OR target_type = $4)
		  AND ($5::text = '' OR target_id = $5)
		  AND ($6::text = '' OR result = $6)
		  AND ($7::bigint = 0 OR created_ms >= $7)
		  AND ($8::bigint = 0 OR created_ms <= $8)
		ORDER BY created_ms DESC, id DESC
		LIMIT $9 OFFSET $10`,
		filter.Actor, filter.Module, filter.Action, filter.TargetType, filter.TargetID,
		filter.Result, filter.FromMS, filter.ToMS, size, (page-1)*size)
	if err != nil {
		return nil, 0, wrapError("list audit logs", err)
	}
	defer rows.Close()

	records := []AuditRecord{}
	total := 0
	for rows.Next() {
		var rec AuditRecord
		var detail []byte
		if err := rows.Scan(&rec.ID, &rec.RequestID, &rec.ActorIssuer, &rec.ActorSubject,
			&rec.ActorRole, &rec.SessionID, &rec.IP, &rec.Module, &rec.Action,
			&rec.TargetType, &rec.TargetID, &rec.Result, &rec.Reason, &detail,
			&rec.CreatedMS, &total); err != nil {
			return nil, 0, wrapError("scan audit log", err)
		}
		rec.Detail = json.RawMessage(detail)
		records = append(records, rec)
	}
	if err := rows.Err(); err != nil {
		return nil, 0, wrapError("iterate audit logs", err)
	}
	return records, total, nil
}

func (p *Postgres) ListAdminUsers(ctx context.Context) ([]AdminUser, error) {
	rows, err := p.pool.Query(ctx, `
		SELECT issuer, subject, display_name, role, status, created_ms, updated_ms, COALESCE(last_login_ms, 0)
		FROM admin_users
		ORDER BY created_ms ASC, subject ASC`)
	if err != nil {
		return nil, wrapError("list admin users", err)
	}
	defer rows.Close()

	users := []AdminUser{}
	for rows.Next() {
		var user AdminUser
		if err := rows.Scan(&user.Issuer, &user.Subject, &user.DisplayName, &user.Role,
			&user.Status, &user.CreatedMS, &user.UpdatedMS, &user.LastLoginMS); err != nil {
			return nil, wrapError("scan admin user", err)
		}
		users = append(users, user)
	}
	if err := rows.Err(); err != nil {
		return nil, wrapError("iterate admin users", err)
	}
	return users, nil
}

// SaveAdminUser 按 (issuer, subject) upsert 管理员身份(授予/变更角色)。
// 新身份一律落 active;目标当前是应急管理员且新角色不同时,要求至少还有
// 另一个 active 的应急管理员,否则返回 ErrLastEmergencyAdmin(事务 + FOR UPDATE 防并发)。
func (p *Postgres) SaveAdminUser(ctx context.Context, user AdminUser, nowMS int64) (*AdminUser, error) {
	tx, err := p.pool.Begin(ctx)
	if err != nil {
		return nil, wrapError("begin save admin user", err)
	}
	defer func() { _ = tx.Rollback(ctx) }()

	var currentRole, currentStatus string
	err = tx.QueryRow(ctx, `
		SELECT role, status FROM admin_users
		WHERE issuer = $1 AND subject = $2 FOR UPDATE`,
		user.Issuer, user.Subject).Scan(&currentRole, &currentStatus)
	if err != nil && !errors.Is(err, pgx.ErrNoRows) {
		return nil, wrapError("lock admin user for save", err)
	}
	if err == nil &&
		currentRole == string(auth.RoleEmergencyAdmin) &&
		currentStatus == "active" &&
		user.Role != auth.RoleEmergencyAdmin {
		if err := ensureOtherActiveEmergencyAdmin(ctx, tx, user.Issuer, user.Subject); err != nil {
			return nil, err
		}
	}

	user.Status = "active"
	var saved AdminUser
	err = tx.QueryRow(ctx, `
		INSERT INTO admin_users (issuer, subject, display_name, role, status, created_ms, updated_ms)
		VALUES ($1, $2, $3, $4, $5, $6, $6)
		ON CONFLICT (issuer, subject) DO UPDATE SET
			display_name = EXCLUDED.display_name,
			role = EXCLUDED.role,
			status = EXCLUDED.status,
			updated_ms = EXCLUDED.updated_ms
		RETURNING issuer, subject, display_name, role, status, created_ms, updated_ms, COALESCE(last_login_ms, 0)`,
		user.Issuer, user.Subject, user.DisplayName, string(user.Role), user.Status, nowMS).
		Scan(&saved.Issuer, &saved.Subject, &saved.DisplayName, &saved.Role,
			&saved.Status, &saved.CreatedMS, &saved.UpdatedMS, &saved.LastLoginMS)
	if err != nil {
		return nil, wrapError("upsert admin user", err)
	}
	if err := tx.Commit(ctx); err != nil {
		return nil, wrapError("commit save admin user", err)
	}
	return &saved, nil
}

// UpdateAdminStatus 启用/禁用管理员身份(软撤销,不动 session 行 —— 每请求
// 重读角色自然失效)。禁用当前 active 的应急管理员前检查是否最后一个。
func (p *Postgres) UpdateAdminStatus(ctx context.Context, issuer, subject, status string, nowMS int64) (AdminUser, error) {
	switch status {
	case "active", "disabled":
	default:
		return AdminUser{}, fmt.Errorf("invalid admin status %q", status)
	}
	tx, err := p.pool.Begin(ctx)
	if err != nil {
		return AdminUser{}, wrapError("begin update admin status", err)
	}
	defer func() { _ = tx.Rollback(ctx) }()

	var role, currentStatus string
	err = tx.QueryRow(ctx, `
		SELECT role, status FROM admin_users
		WHERE issuer = $1 AND subject = $2 FOR UPDATE`, issuer, subject).
		Scan(&role, &currentStatus)
	if errors.Is(err, pgx.ErrNoRows) {
		return AdminUser{}, ErrNotFound
	}
	if err != nil {
		return AdminUser{}, wrapError("lock admin user for status", err)
	}
	if status == "disabled" && role == string(auth.RoleEmergencyAdmin) && currentStatus == "active" {
		if err := ensureOtherActiveEmergencyAdmin(ctx, tx, issuer, subject); err != nil {
			return AdminUser{}, err
		}
	}

	var user AdminUser
	err = tx.QueryRow(ctx, `
		UPDATE admin_users SET status = $3, updated_ms = $4
		WHERE issuer = $1 AND subject = $2
		RETURNING issuer, subject, display_name, role, status, created_ms, updated_ms, COALESCE(last_login_ms, 0)`,
		issuer, subject, status, nowMS).
		Scan(&user.Issuer, &user.Subject, &user.DisplayName, &user.Role,
			&user.Status, &user.CreatedMS, &user.UpdatedMS, &user.LastLoginMS)
	if err != nil {
		return AdminUser{}, wrapError("update admin status", err)
	}
	if err := tx.Commit(ctx); err != nil {
		return AdminUser{}, wrapError("commit update admin status", err)
	}
	return user, nil
}

// ensureOtherActiveEmergencyAdmin 要求调用方已锁住目标行且目标为 active 应急管理员。
func ensureOtherActiveEmergencyAdmin(ctx context.Context, tx pgx.Tx, issuer, subject string) error {
	var count int
	if err := tx.QueryRow(ctx, `
		SELECT COUNT(*) FROM admin_users
		WHERE role = $1 AND status = 'active'
		  AND NOT (issuer = $2 AND subject = $3)`,
		string(auth.RoleEmergencyAdmin), issuer, subject).Scan(&count); err != nil {
		return wrapError("count emergency admins", err)
	}
	if count == 0 {
		return ErrLastEmergencyAdmin
	}
	return nil
}

func wrapError(operation string, err error) error {
	if err == nil {
		return nil
	}
	return fmt.Errorf("%s: %w", operation, err)
}
