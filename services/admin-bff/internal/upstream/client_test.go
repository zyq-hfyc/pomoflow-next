// client_test.go —— DoStream 流式上传转发测试(ADR-013)。
//
// 验证重点:字节原样、ContentLength 显式传播(不因 io.Reader 无长度退化成
// chunked)、Bearer 头、非 2xx 归一为 *UpstreamError。
package upstream

import (
	"bytes"
	"context"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

// opaqueReader 抹掉 Len():强制走「io.Reader 无长度」路径,
// 证明 req.ContentLength 是 DoStream 显式赋的,不是 net/http 推断的。
type opaqueReader struct{ r io.Reader }

func (o opaqueReader) Read(p []byte) (int, error) { return o.r.Read(p) }

func TestDoStreamForwardsBytesLengthAndAuth(t *testing.T) {
	payload := strings.Repeat("PF", 4<<20) // 8 MiB
	var gotLength int64
	var gotBody bytes.Buffer
	var gotAuth, gotContentType string
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		gotLength = r.ContentLength
		gotAuth = r.Header.Get("Authorization")
		gotContentType = r.Header.Get("Content-Type")
		_, _ = io.Copy(&gotBody, r.Body)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		_, _ = w.Write([]byte(`{"id": "asset-1", "size_bytes": 8388608}`))
	}))
	defer server.Close()

	client := New(server.URL, "svc-token")
	var out struct {
		ID        string `json:"id"`
		SizeBytes int64  `json:"size_bytes"`
	}
	err := client.DoStream(context.Background(), http.MethodPost, "/internal/releases/rel-1/assets",
		nil, opaqueReader{r: strings.NewReader(payload)}, int64(len(payload)),
		"application/octet-stream", &out)
	if err != nil {
		t.Fatalf("DoStream: %v", err)
	}
	if gotLength != int64(len(payload)) {
		t.Fatalf("upstream ContentLength = %d, want %d", gotLength, len(payload))
	}
	if gotAuth != "Bearer svc-token" {
		t.Fatalf("Authorization = %q", gotAuth)
	}
	if gotContentType != "application/octet-stream" {
		t.Fatalf("Content-Type = %q", gotContentType)
	}
	if gotBody.Len() != len(payload) || gotBody.String() != payload {
		t.Fatalf("body not forwarded byte-for-byte (got %d bytes)", gotBody.Len())
	}
	if out.ID != "asset-1" || out.SizeBytes != 8388608 {
		t.Fatalf("response decode = %+v", out)
	}
}

func TestDoStreamNormalizesUpstreamError(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _ = io.Copy(io.Discard, r.Body)
		http.Error(w, "version already exists", http.StatusConflict)
	}))
	defer server.Close()

	client := New(server.URL, "svc-token")
	err := client.DoStream(context.Background(), http.MethodPost, "/internal/releases",
		nil, strings.NewReader("{}"), 2, "application/json", nil)
	if err == nil {
		t.Fatal("expected upstream error")
	}
	ue, ok := err.(*UpstreamError)
	if !ok {
		t.Fatalf("error type = %T, want *UpstreamError", err)
	}
	if ue.Status != http.StatusConflict {
		t.Fatalf("Status = %d, want 409", ue.Status)
	}
	if ue.Message != "version already exists" {
		t.Fatalf("Message = %q", ue.Message)
	}
}
