// business_handlers.go —— 看板 / 用户治理 / 审计 / 授权管理的业务接口。
//
// 职责边界(ADR-008):本层只做参数校验、RBAC(路由链)、审计与上游代理;
// 业务数据一律来自 sync-server /internal/*(服务 token),BFF 不直连业务库。
// 会员域(Membership 服务)尚未建设,/api/memberships* 统一返回 503。
package httpapi

import (
	"encoding/json"
	"errors"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/auth"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/store"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/upstream"
)

// 审计模块名,与前端审计页筛选项保持一致。
const (
	moduleUsers         = "users"
	moduleAuthorization = "authorization"
)

// internalUserPath 拼上游用户路径,userID 走 PathEscape 防路径拼接注入。
func internalUserPath(userID, suffix string) string {
	return "/internal/users/" + url.PathEscape(userID) + suffix
}

// proxyUpstreamError 把上游错误转成 BFF 统一错误信封。
// 上游 message 为受控文案(不透传底层 DB 错误),可以展示给管理员。
func (s *Server) proxyUpstreamError(c *gin.Context, err error) {
	var ue *upstream.UpstreamError
	if errors.As(err, &ue) {
		writeError(c, ue.Status, ue.Code, ue.Message)
		return
	}
	internalError(c, err)
}

// -----------------------------------------------------------------------------
// 看板
// -----------------------------------------------------------------------------

// dashboardDayMS 把 "YYYY-MM-DD" 解析为 UTC 当日零点的毫秒时间戳。
func dashboardDayMS(value string) (int64, bool) {
	day, err := time.ParseInLocation("2006-01-02", value, time.UTC)
	if err != nil || day.IsZero() {
		return 0, false
	}
	return day.UnixMilli(), true
}

// metricsOverview 是 sync-server /internal/metrics/overview 的响应子集
// (只解 BFF 需要的字段,上游加字段不破坏这里)。
type metricsOverview struct {
	GeneratedAtMS int64 `json:"generated_at_ms"`
	Metrics       struct {
		TotalUsers    int64 `json:"total_users"`
		NewUsers      int64 `json:"new_users"`
		ActiveUsers   int64 `json:"active_users"`
		PushedChanges int64 `json:"pushed_changes"`
		SyncUsers     int64 `json:"sync_users"`
		SyncDevices   int64 `json:"sync_devices"`
	} `json:"metrics"`
	Trends []struct {
		Bucket        string `json:"bucket"`
		NewUsers      int64  `json:"new_users"`
		ActiveUsers   int64  `json:"active_users"`
		PushedChanges int64  `json:"pushed_changes"`
	} `json:"trends"`
}

func (s *Server) handleDashboard(c *gin.Context) {
	const dayMS = 86_400_000
	from, to := c.Query("from"), c.Query("to")
	if granularity := c.Query("granularity"); granularity != "" && granularity != "day" {
		writeError(c, http.StatusBadRequest, "UNSUPPORTED_GRANULARITY", "only day granularity is supported")
		return
	}
	fromMS, ok := dashboardDayMS(from)
	if !ok {
		writeError(c, http.StatusBadRequest, "INVALID_FROM", "from must be a YYYY-MM-DD date")
		return
	}
	toMS, ok := dashboardDayMS(to)
	if !ok {
		writeError(c, http.StatusBadRequest, "INVALID_TO", "to must be a YYYY-MM-DD date")
		return
	}
	if toMS < fromMS {
		writeError(c, http.StatusBadRequest, "INVALID_RANGE", "to must not be earlier than from")
		return
	}

	// 上游窗口右开(to 当天完整覆盖:右端点 +1 天)
	var payload metricsOverview
	query := url.Values{
		"from_ms": {strconv.FormatInt(fromMS, 10)},
		"to_ms":   {strconv.FormatInt(toMS+dayMS, 10)},
	}
	if err := s.upstream.Do(c.Request.Context(), http.MethodGet, "/internal/metrics/overview",
		query, nil, &payload); err != nil {
		s.proxyUpstreamError(c, err)
		return
	}

	// DAU/WAU/MAU、留存、Pull 量级需要行为明细(Analytics 服务,P4 后续),
	// 主库算不出就置 null,前端渲染 "—" 并提示口径未上线,不造假数。
	trends := make([]gin.H, 0, len(payload.Trends))
	for _, t := range payload.Trends {
		trends = append(trends, gin.H{
			"bucket":         t.Bucket,
			"new_users":      t.NewUsers,
			"active_users":   t.ActiveUsers,
			"pushed_changes": t.PushedChanges,
			"pulled_changes": nil,
		})
	}
	metrics := payload.Metrics
	c.JSON(http.StatusOK, gin.H{
		"range": gin.H{
			"from":        from,
			"to":          to,
			"granularity": "day",
			"timezone":    "UTC",
		},
		"generated_at_ms":      payload.GeneratedAtMS,
		"source_updated_at_ms": payload.GeneratedAtMS,
		"stale":                false,
		"metrics": gin.H{
			"total_users":    metrics.TotalUsers,
			"new_users":      metrics.NewUsers,
			"active_users":   metrics.ActiveUsers,
			"dau":            nil,
			"wau":            nil,
			"mau":            nil,
			"d1_retention":   nil,
			"d7_retention":   nil,
			"d30_retention":  nil,
			"pushed_changes": metrics.PushedChanges,
			"pulled_changes": nil,
			"sync_users":     metrics.SyncUsers,
			"sync_devices":   metrics.SyncDevices,
		},
		"trends": trends,
	})
}

// -----------------------------------------------------------------------------
// 用户治理
// -----------------------------------------------------------------------------

func (s *Server) handleListUsers(c *gin.Context) {
	query := url.Values{}
	for _, key := range []string{"query", "status", "page", "page_size"} {
		if value := c.Query(key); value != "" {
			query.Set(key, value)
		}
	}
	var raw json.RawMessage
	if err := s.upstream.Do(c.Request.Context(), http.MethodGet, "/internal/users",
		query, nil, &raw); err != nil {
		s.proxyUpstreamError(c, err)
		return
	}
	c.Data(http.StatusOK, "application/json; charset=utf-8", raw)
}

// handleUserDetail 合并两个来源:上游账号画像 + 本库按目标的审计流水(operations)。
func (s *Server) handleUserDetail(c *gin.Context) {
	userID := c.Param("userID")
	if userID == "" {
		writeError(c, http.StatusBadRequest, "INVALID_USER_ID", "user id is required")
		return
	}
	var detail struct {
		Profile   json.RawMessage `json:"profile"`
		Sessions  json.RawMessage `json:"sessions"`
		LoginLogs json.RawMessage `json:"login_logs"`
		Sync      json.RawMessage `json:"sync"`
	}
	if err := s.upstream.Do(c.Request.Context(), http.MethodGet,
		internalUserPath(userID, ""), nil, nil, &detail); err != nil {
		s.proxyUpstreamError(c, err)
		return
	}
	operations, _, err := s.store.ListAudit(c.Request.Context(), store.AuditFilter{
		TargetType: "user",
		TargetID:   userID,
		Page:       1,
		PageSize:   50,
	})
	if err != nil {
		internalError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"profile":    detail.Profile,
		"sessions":   detail.Sessions,
		"login_logs": detail.LoginLogs,
		"sync":       detail.Sync,
		"operations": operations,
	})
}

// actorKey 是审计与上游 actor 使用的唯一身份串。
func actorKey(identity store.SessionIdentity) string {
	return identity.User.Issuer + ":" + identity.User.Subject
}

type reasonRequest struct {
	Reason string `json:"reason"`
}

// banUnban 是 ban/unban 共用骨架:reason 必填(给审计与被冻结说明)、
// actor 传后台身份(上游落 banned_by)、结果与审计都落库。
func (s *Server) banUnban(c *gin.Context, action string) {
	userID := c.Param("userID")
	identity := currentIdentity(c)

	var req reasonRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		writeError(c, http.StatusBadRequest, "INVALID_BODY", "body must be JSON with reason")
		return
	}
	reason := strings.TrimSpace(req.Reason)
	if reason == "" {
		writeError(c, http.StatusBadRequest, "REASON_REQUIRED", "reason is required")
		return
	}

	var raw json.RawMessage
	err := s.upstream.Do(c.Request.Context(), http.MethodPost,
		internalUserPath(userID, "/"+action),
		nil, gin.H{"reason": reason, "actor": actorKey(identity)}, &raw)
	if err != nil {
		auditErr := s.recordAudit(c, &identity, moduleUsers, action, "user", userID,
			"error", reason, gin.H{"upstream_code": upstreamErrCode(err)})
		if auditErr != nil {
			internalError(c, auditErr)
			return
		}
		s.proxyUpstreamError(c, err)
		return
	}
	if err := s.recordAudit(c, &identity, moduleUsers, action, "user", userID,
		"ok", reason, nil); err != nil {
		internalError(c, err)
		return
	}
	// 上游 BanResponse/UnbanResponse 原样回传(包含 banned_ms/revoked_sessions 等)
	c.Data(http.StatusOK, "application/json; charset=utf-8", raw)
}

func (s *Server) handleBan(c *gin.Context)   { s.banUnban(c, "ban") }
func (s *Server) handleUnban(c *gin.Context) { s.banUnban(c, "unban") }

func (s *Server) handleRevokeSessions(c *gin.Context) {
	userID := c.Param("userID")
	identity := currentIdentity(c)

	var req struct {
		SessionID *int64 `json:"session_id"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		writeError(c, http.StatusBadRequest, "INVALID_BODY", "body must be JSON with optional session_id")
		return
	}

	body := gin.H{}
	if req.SessionID != nil {
		body["session_id"] = *req.SessionID
	}
	var raw json.RawMessage
	if err := s.upstream.Do(c.Request.Context(), http.MethodPost,
		internalUserPath(userID, "/sessions/revoke"), nil, body, &raw); err != nil {
		_ = s.recordAudit(c, &identity, moduleUsers, "revoke_sessions", "user", userID,
			"error", "", gin.H{"upstream_code": upstreamErrCode(err)})
		s.proxyUpstreamError(c, err)
		return
	}
	if err := s.recordAudit(c, &identity, moduleUsers, "revoke_sessions", "user", userID,
		"ok", "", nil); err != nil {
		internalError(c, err)
		return
	}
	c.Data(http.StatusOK, "application/json; charset=utf-8", raw)
}

// upstreamErrCode 提取上游错误码进审计 detail,不落上游 message(可能含堆叠细节)。
func upstreamErrCode(err error) string {
	var ue *upstream.UpstreamError
	if errors.As(err, &ue) {
		return ue.Code
	}
	return "TRANSPORT_ERROR"
}

// -----------------------------------------------------------------------------
// 会员域(占位:Membership 服务未建设)
// -----------------------------------------------------------------------------

// handleMembershipUnavailable 是 /api/memberships* 的统一占位:RBAC 已在路由链
// 生效(权限不足仍是 403),有权限但服务未部署才返回 503。
func (s *Server) handleMembershipUnavailable(c *gin.Context) {
	writeError(c, http.StatusServiceUnavailable, "MEMBERSHIP_UNAVAILABLE",
		"membership service is not deployed yet")
}

// -----------------------------------------------------------------------------
// 审计查询
// -----------------------------------------------------------------------------

func (s *Server) handleListAudit(c *gin.Context) {
	filter := store.AuditFilter{
		Actor:      c.Query("actor"),
		Module:     c.Query("module"),
		Action:     c.Query("action"),
		TargetType: c.Query("target_type"),
		TargetID:   c.Query("target_id"),
		Result:     c.Query("result"),
	}
	var err error
	if filter.FromMS, err = optionalMS(c.Query("from_ms")); err != nil {
		writeError(c, http.StatusBadRequest, "INVALID_FROM_MS", "from_ms must be a millisecond timestamp")
		return
	}
	if filter.ToMS, err = optionalMS(c.Query("to_ms")); err != nil {
		writeError(c, http.StatusBadRequest, "INVALID_TO_MS", "to_ms must be a millisecond timestamp")
		return
	}
	if filter.Page, err = optionalPositive(c.Query("page"), 1); err != nil {
		writeError(c, http.StatusBadRequest, "INVALID_PAGE", "page must be a positive integer")
		return
	}
	if filter.PageSize, err = optionalPositive(c.Query("page_size"), 20); err != nil {
		writeError(c, http.StatusBadRequest, "INVALID_PAGE_SIZE", "page_size must be a positive integer")
		return
	}

	records, total, err := s.store.ListAudit(c.Request.Context(), filter)
	if err != nil {
		internalError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"items": records, "total": total})
}

func optionalMS(raw string) (int64, error) {
	if raw == "" {
		return 0, nil
	}
	value, err := strconv.ParseInt(raw, 10, 64)
	if err != nil || value < 0 {
		return 0, err
	}
	return value, nil
}

func optionalPositive(raw string, fallback int) (int, error) {
	if raw == "" {
		return fallback, nil
	}
	value, err := strconv.Atoi(raw)
	if err != nil || value < 1 {
		return 0, err
	}
	return value, nil
}

// -----------------------------------------------------------------------------
// 后台授权管理
// -----------------------------------------------------------------------------

func (s *Server) handleListAdminUsers(c *gin.Context) {
	users, err := s.store.ListAdminUsers(c.Request.Context())
	if err != nil {
		internalError(c, err)
		return
	}
	c.JSON(http.StatusOK, users)
}

type grantRoleRequest struct {
	Issuer      string `json:"issuer"`
	Subject     string `json:"subject"`
	DisplayName string `json:"display_name"`
	Role        string `json:"role"`
	Reason      string `json:"reason"`
}

func (s *Server) handleGrantAdminRole(c *gin.Context) {
	identity := currentIdentity(c)

	var req grantRoleRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		writeError(c, http.StatusBadRequest, "INVALID_BODY", "body must be JSON grant payload")
		return
	}
	req.Issuer = strings.TrimSpace(req.Issuer)
	req.Subject = strings.TrimSpace(req.Subject)
	req.DisplayName = strings.TrimSpace(req.DisplayName)
	reason := strings.TrimSpace(req.Reason)
	if req.Issuer == "" || req.Subject == "" {
		writeError(c, http.StatusBadRequest, "IDENTITY_REQUIRED", "issuer and subject are required")
		return
	}
	if req.DisplayName == "" {
		req.DisplayName = req.Subject
	}
	role := auth.Role(req.Role)
	if !role.Valid() {
		writeError(c, http.StatusBadRequest, "INVALID_ROLE", "unknown role")
		return
	}
	if reason == "" {
		writeError(c, http.StatusBadRequest, "REASON_REQUIRED", "reason is required")
		return
	}

	targetKey := req.Issuer + ":" + req.Subject
	if targetKey == actorKey(identity) {
		_ = s.recordAudit(c, &identity, moduleAuthorization, "grant_role", "admin_user",
			targetKey, "denied", reason, gin.H{"role": req.Role, "cause": "self_grant"})
		writeError(c, http.StatusForbidden, "SELF_GRANT_FORBIDDEN", "cannot change your own role")
		return
	}
	if !auth.CanGrantRole(identity.User.Role, role) {
		_ = s.recordAudit(c, &identity, moduleAuthorization, "grant_role", "admin_user",
			targetKey, "denied", reason, gin.H{"role": req.Role, "cause": "not_grantable"})
		writeError(c, http.StatusForbidden, "ROLE_NOT_GRANTABLE", "your role cannot grant this role")
		return
	}

	saved, err := s.store.SaveAdminUser(c.Request.Context(), store.AdminUser{
		Issuer:      req.Issuer,
		Subject:     req.Subject,
		DisplayName: req.DisplayName,
		Role:        role,
	}, s.now().UnixMilli())
	if errors.Is(err, store.ErrLastEmergencyAdmin) {
		_ = s.recordAudit(c, &identity, moduleAuthorization, "grant_role", "admin_user",
			targetKey, "denied", reason, gin.H{"role": req.Role, "cause": "last_emergency_admin"})
		writeError(c, http.StatusConflict, "LAST_EMERGENCY_ADMIN",
			"cannot demote the last active emergency admin")
		return
	}
	if err != nil {
		internalError(c, err)
		return
	}
	if err := s.recordAudit(c, &identity, moduleAuthorization, "grant_role", "admin_user",
		targetKey, "ok", reason, gin.H{"role": req.Role}); err != nil {
		internalError(c, err)
		return
	}
	c.JSON(http.StatusOK, saved)
}

type setAdminStatusRequest struct {
	Issuer  string `json:"issuer"`
	Subject string `json:"subject"`
	Status  string `json:"status"`
	Reason  string `json:"reason"`
}

func (s *Server) handleSetAdminStatus(c *gin.Context) {
	identity := currentIdentity(c)

	var req setAdminStatusRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		writeError(c, http.StatusBadRequest, "INVALID_BODY", "body must be JSON status payload")
		return
	}
	req.Issuer = strings.TrimSpace(req.Issuer)
	req.Subject = strings.TrimSpace(req.Subject)
	reason := strings.TrimSpace(req.Reason)
	switch {
	case req.Issuer == "" || req.Subject == "":
		writeError(c, http.StatusBadRequest, "IDENTITY_REQUIRED", "issuer and subject are required")
		return
	case req.Status != "active" && req.Status != "disabled":
		writeError(c, http.StatusBadRequest, "INVALID_STATUS", "status must be active or disabled")
		return
	case reason == "":
		writeError(c, http.StatusBadRequest, "REASON_REQUIRED", "reason is required")
		return
	}

	targetKey := req.Issuer + ":" + req.Subject
	if targetKey == actorKey(identity) {
		_ = s.recordAudit(c, &identity, moduleAuthorization, "set_status", "admin_user",
			targetKey, "denied", reason, gin.H{"status": req.Status, "cause": "self_change"})
		writeError(c, http.StatusForbidden, "SELF_STATUS_CHANGE_FORBIDDEN",
			"cannot change your own admin status")
		return
	}

	updated, err := s.store.UpdateAdminStatus(c.Request.Context(), req.Issuer, req.Subject,
		req.Status, s.now().UnixMilli())
	if errors.Is(err, store.ErrNotFound) {
		writeError(c, http.StatusNotFound, "ADMIN_NOT_FOUND", "admin identity not found")
		return
	}
	if errors.Is(err, store.ErrLastEmergencyAdmin) {
		_ = s.recordAudit(c, &identity, moduleAuthorization, "set_status", "admin_user",
			targetKey, "denied", reason, gin.H{"status": req.Status, "cause": "last_emergency_admin"})
		writeError(c, http.StatusConflict, "LAST_EMERGENCY_ADMIN",
			"cannot disable the last active emergency admin")
		return
	}
	if err != nil {
		internalError(c, err)
		return
	}
	if err := s.recordAudit(c, &identity, moduleAuthorization, "set_status", "admin_user",
		targetKey, "ok", reason, gin.H{"status": req.Status}); err != nil {
		internalError(c, err)
		return
	}
	c.JSON(http.StatusOK, updated)
}
