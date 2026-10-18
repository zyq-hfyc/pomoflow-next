// release_handlers.go —— 发布分发管理接口(ADR-013)。
//
// 与 business_handlers.go 同一职责边界:参数校验、RBAC(路由链)、审计与上游
// 代理;版本/资产数据全部来自 sync-server /internal/releases*。上传是唯一
// 非薄代理:原始字节流式穿透(DoStream),BFF 不解析、不落盘、不 Buffer。
package httpapi

import (
	"encoding/json"
	"net/http"
	"net/url"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

// 审计模块名,与前端筛选项保持一致。
const moduleReleases = "releases"

// internalReleasePath 拼上游发布路径,id 走 PathEscape 防路径拼接注入。
func internalReleasePath(releaseID, suffix string) string {
	return "/internal/releases/" + url.PathEscape(releaseID) + suffix
}

// handleListReleases 全状态列表(含资产),透传上游并注入下载基址,
// 前端拼 {download_base_url}/api/public/download/{asset_id} 生成「复制链接」。
func (s *Server) handleListReleases(c *gin.Context) {
	var payload struct {
		Items json.RawMessage `json:"items"`
	}
	if err := s.upstream.Do(c.Request.Context(), http.MethodGet, "/internal/releases",
		nil, nil, &payload); err != nil {
		s.proxyUpstreamError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"items":             payload.Items,
		"download_base_url": s.cfg.ReleaseDownloadBaseURL,
	})
}

type createReleaseRequest struct {
	Version string `json:"version"`
	Notes   string `json:"notes"`
	Reason  string `json:"reason"`
}

func (s *Server) handleCreateRelease(c *gin.Context) {
	identity := currentIdentity(c)

	var req createReleaseRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		writeError(c, http.StatusBadRequest, "INVALID_BODY", "body must be JSON with version")
		return
	}
	req.Version = strings.TrimSpace(req.Version)
	if req.Version == "" {
		writeError(c, http.StatusBadRequest, "VERSION_REQUIRED", "version is required")
		return
	}

	var raw json.RawMessage
	err := s.upstream.Do(c.Request.Context(), http.MethodPost, "/internal/releases",
		nil, gin.H{"version": req.Version, "notes": req.Notes}, &raw)
	if err != nil {
		if auditErr := s.recordAudit(c, &identity, moduleReleases, "create", "release",
			req.Version, "error", req.Reason, gin.H{"upstream_code": upstreamErrCode(err)}); auditErr != nil {
			internalError(c, auditErr)
			return
		}
		s.proxyUpstreamError(c, err)
		return
	}
	if err := s.recordAudit(c, &identity, moduleReleases, "create", "release",
		req.Version, "ok", req.Reason, nil); err != nil {
		internalError(c, err)
		return
	}
	c.Data(http.StatusCreated, "application/json; charset=utf-8", raw)
}

// handleUploadReleaseAsset 安装包上传:cap 预检(超限 413,省一次无效透传)后
// 原始字节流式转发。展示名从 query 带 X-Filename(QueryEscape)转发,
// sync-server percent-decode 后清洗入库;BFF 不碰文件名语义。
func (s *Server) handleUploadReleaseAsset(c *gin.Context) {
	releaseID := c.Param("id")
	identity := currentIdentity(c)
	platform := c.Query("platform")
	filename := c.Query("filename")
	if platform == "" {
		writeError(c, http.StatusBadRequest, "PLATFORM_REQUIRED", "platform query parameter is required")
		return
	}

	// BFF 侧预检:Content-Length 明确超限直接 413,不透传。
	// sync-server 的流式计数器仍是真权威(头缺失/虚标都兜得住)。
	if s.cfg.ReleaseUploadMaxBytes > 0 && c.Request.ContentLength > s.cfg.ReleaseUploadMaxBytes {
		writeError(c, http.StatusRequestEntityTooLarge, "PAYLOAD_TOO_LARGE",
			"安装包超过上限 "+strconv.FormatInt(s.cfg.ReleaseUploadMaxBytes>>20, 10)+" MiB")
		return
	}

	// 展示名与平台都走 query;sync-server 读 query filename(或 X-Filename 头)。
	query := url.Values{"platform": {platform}}
	if filename != "" {
		query.Set("filename", filename)
	}

	var payload struct {
		ID        string `json:"id"`
		SizeBytes int64  `json:"size_bytes"`
		Sha256    string `json:"sha256"`
		Filename  string `json:"filename"`
	}
	err := s.upstream.DoStream(c.Request.Context(), http.MethodPost,
		internalReleasePath(releaseID, "/assets"), query,
		c.Request.Body, c.Request.ContentLength, "application/octet-stream", &payload)
	if err != nil {
		if auditErr := s.recordAudit(c, &identity, moduleReleases, "upload_asset", "release",
			releaseID, "error", filename, gin.H{
				"platform": platform, "upstream_code": upstreamErrCode(err),
			}); auditErr != nil {
			internalError(c, auditErr)
			return
		}
		s.proxyUpstreamError(c, err)
		return
	}
	if err := s.recordAudit(c, &identity, moduleReleases, "upload_asset", "release",
		releaseID, "ok", filename, gin.H{
			"platform": platform, "size_bytes": payload.SizeBytes,
		}); err != nil {
		internalError(c, err)
		return
	}
	c.JSON(http.StatusCreated, payload)
}

// handleReleaseTransition publish/unpublish 薄代理。
func (s *Server) handleReleaseTransition(action string) gin.HandlerFunc {
	return func(c *gin.Context) {
		releaseID := c.Param("id")
		identity := currentIdentity(c)

		var raw json.RawMessage
		err := s.upstream.Do(c.Request.Context(), http.MethodPost,
			internalReleasePath(releaseID, "/"+action), nil, gin.H{}, &raw)
		if err != nil {
			if auditErr := s.recordAudit(c, &identity, moduleReleases, action, "release",
				releaseID, "error", "", gin.H{"upstream_code": upstreamErrCode(err)}); auditErr != nil {
				internalError(c, auditErr)
				return
			}
			s.proxyUpstreamError(c, err)
			return
		}
		if err := s.recordAudit(c, &identity, moduleReleases, action, "release",
			releaseID, "ok", "", nil); err != nil {
			internalError(c, err)
			return
		}
		c.Data(http.StatusOK, "application/json; charset=utf-8", raw)
	}
}

func (s *Server) handleDeleteRelease(c *gin.Context) {
	releaseID := c.Param("id")
	identity := currentIdentity(c)

	var raw json.RawMessage
	err := s.upstream.Do(c.Request.Context(), http.MethodDelete,
		internalReleasePath(releaseID, ""), nil, nil, &raw)
	if err != nil {
		if auditErr := s.recordAudit(c, &identity, moduleReleases, "delete", "release",
			releaseID, "error", "", gin.H{"upstream_code": upstreamErrCode(err)}); auditErr != nil {
			internalError(c, auditErr)
			return
		}
		s.proxyUpstreamError(c, err)
		return
	}
	if err := s.recordAudit(c, &identity, moduleReleases, "delete", "release",
		releaseID, "ok", "", nil); err != nil {
		internalError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"ok": true})
}

// handleDeleteReleaseAsset 删单平台资产(仅 draft);资产归属由上游校验,
// 路由挂在 /releases/:id 下只是为了审计上下文完整。
func (s *Server) handleDeleteReleaseAsset(c *gin.Context) {
	releaseID := c.Param("id")
	assetID := c.Param("assetID")
	identity := currentIdentity(c)

	var raw json.RawMessage
	err := s.upstream.Do(c.Request.Context(), http.MethodDelete,
		"/internal/assets/"+url.PathEscape(assetID), nil, nil, &raw)
	if err != nil {
		if auditErr := s.recordAudit(c, &identity, moduleReleases, "delete_asset", "release",
			releaseID, "error", assetID, gin.H{"upstream_code": upstreamErrCode(err)}); auditErr != nil {
			internalError(c, auditErr)
			return
		}
		s.proxyUpstreamError(c, err)
		return
	}
	if err := s.recordAudit(c, &identity, moduleReleases, "delete_asset", "release",
		releaseID, "ok", assetID, nil); err != nil {
		internalError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"ok": true})
}
