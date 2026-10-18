// Package upstream 封装 Admin BFF 对内部业务服务(sync-server 等)的服务间调用。
//
// 鉴权模型(ADR-008):双方共享 INTERNAL_SERVICE_TOKEN,由**接收方**做常量时间
// 比对(sync-server internal_handlers::require_service_token ↔ 本仓库 auth 包);
// 本包只负责在请求头携带 Bearer 并归一化非 2xx 响应为 *UpstreamError。
package upstream

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"
)

// 默认响应体上限:业务响应远小于此,防异常上游拖爆内存。
const maxResponseBytes = 4 << 20

// Client 是单个内部服务的调用客户端;零值不可用,经 New 构造。
type Client struct {
	baseURL    string
	token      string
	http       *http.Client
	streamHTTP *http.Client
}

// New 构造客户端;baseURL 形如 http://127.0.0.1:8080(不带尾斜杠)。
func New(baseURL, token string) *Client {
	return &Client{
		baseURL: strings.TrimRight(baseURL, "/"),
		token:   token,
		// 内网服务间调用,15s 足够覆盖 DB 查询慢查询;不设重试(写操作重试会重复执行)。
		http: &http.Client{Timeout: 15 * time.Second},
		// 流式上传(ADR-013):Timeout=0 —— 大文件传输时长不受 15s 全局上限截断;
		// ResponseHeaderTimeout 兜上游无响应,总时长由请求 ctx 界定
		// (浏览器断开 → ctx 取消 → 管道中断,sync-server 侧清理临时文件)。
		streamHTTP: &http.Client{
			Transport: &http.Transport{ResponseHeaderTimeout: 15 * time.Second},
		},
	}
}

// UpstreamError 是上游非 2xx 响应的归一化错误。
// Code/Message 优先取上游错误信封 {error:{code,message}};上游返回纯文本时
// Code 按状态码推导、Message 保留上游文本(sync-server 内部端点为受控文案)。
type UpstreamError struct {
	Status  int
	Code    string
	Message string
}

func (e *UpstreamError) Error() string {
	return fmt.Sprintf("upstream %d %s: %s", e.Status, e.Code, e.Message)
}

// Do 执行一次服务间请求:2xx 时把响应体 JSON 解进 out(out 为 nil 则丢弃),
// 非 2xx 返回 *UpstreamError。query 为 nil 表示无查询串;body 为 nil 表示无请求体。
func (c *Client) Do(ctx context.Context, method, path string, query url.Values, body, out any) error {
	var payload io.Reader
	if body != nil {
		raw, err := json.Marshal(body)
		if err != nil {
			return fmt.Errorf("encode upstream request: %w", err)
		}
		payload = bytes.NewReader(raw)
	}
	req, err := http.NewRequestWithContext(ctx, method, c.baseURL+path, payload)
	if err != nil {
		return fmt.Errorf("build upstream request: %w", err)
	}
	req.Header.Set("Authorization", "Bearer "+c.token)
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	if query != nil {
		req.URL.RawQuery = query.Encode()
	}

	resp, err := c.http.Do(req)
	if err != nil {
		return fmt.Errorf("call upstream %s %s: %w", method, path, err)
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(io.LimitReader(resp.Body, maxResponseBytes))
	if err != nil {
		return fmt.Errorf("read upstream response: %w", err)
	}
	if resp.StatusCode < 200 || resp.StatusCode > 299 {
		return newUpstreamError(resp.StatusCode, data)
	}
	if out != nil && len(data) > 0 {
		if err := json.Unmarshal(data, out); err != nil {
			return fmt.Errorf("decode upstream response: %w", err)
		}
	}
	return nil
}

// DoStream 把原始字节流式转发给上游(ADR-013 安装包上传),不经内存聚合;
// 响应侧与 Do 一致:LimitReader + 非 2xx 归一为 *UpstreamError(响应是小 JSON)。
// 与 Do 的差异:请求体原样透传(不 JSON 化、**请求方向无 LimitReader**,
// 大小由 sync-server 流式计数器裁定);Content-Length 必须显式赋值 ——
// Go 对任意 io.Reader 不推断长度,漏了就发 chunked,上游的头预检失效。
func (c *Client) DoStream(ctx context.Context, method, path string, query url.Values,
	body io.Reader, contentLength int64, contentType string, out any) error {
	req, err := http.NewRequestWithContext(ctx, method, c.baseURL+path, body)
	if err != nil {
		return fmt.Errorf("build upstream request: %w", err)
	}
	req.ContentLength = contentLength
	req.Header.Set("Authorization", "Bearer "+c.token)
	if contentType != "" {
		req.Header.Set("Content-Type", contentType)
	}
	if query != nil {
		req.URL.RawQuery = query.Encode()
	}

	resp, err := c.streamHTTP.Do(req)
	if err != nil {
		return fmt.Errorf("call upstream %s %s: %w", method, path, err)
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(io.LimitReader(resp.Body, maxResponseBytes))
	if err != nil {
		return fmt.Errorf("read upstream response: %w", err)
	}
	if resp.StatusCode < 200 || resp.StatusCode > 299 {
		return newUpstreamError(resp.StatusCode, data)
	}
	if out != nil && len(data) > 0 {
		if err := json.Unmarshal(data, out); err != nil {
			return fmt.Errorf("decode upstream response: %w", err)
		}
	}
	return nil
}

func newUpstreamError(status int, data []byte) *UpstreamError {
	e := &UpstreamError{
		Status:  status,
		Code:    codeForStatus(status),
		Message: strings.TrimSpace(string(data)),
	}
	var envelope struct {
		Error struct {
			Code    string `json:"code"`
			Message string `json:"message"`
		} `json:"error"`
	}
	if json.Unmarshal(data, &envelope) == nil && envelope.Error.Code != "" {
		e.Code = envelope.Error.Code
		e.Message = envelope.Error.Message
	}
	if len(e.Message) > 500 {
		e.Message = e.Message[:500]
	}
	return e
}

func codeForStatus(status int) string {
	switch {
	case status == http.StatusBadRequest:
		return "BAD_REQUEST"
	case status == http.StatusForbidden:
		return "FORBIDDEN"
	case status == http.StatusNotFound:
		return "NOT_FOUND"
	case status == http.StatusServiceUnavailable:
		return "SERVICE_UNAVAILABLE"
	default:
		return "UPSTREAM_ERROR"
	}
}
