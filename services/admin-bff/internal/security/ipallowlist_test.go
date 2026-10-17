package security

import "testing"

func TestIPAllowlistDirectClient(t *testing.T) {
	t.Parallel()
	list, err := NewIPAllowlist("127.0.0.1/32,10.20.0.0/16,::1/128", "")
	if err != nil {
		t.Fatal(err)
	}
	tests := []struct {
		name   string
		remote string
		wantIP string
		allow  bool
	}{
		{"IPv4 loopback", "127.0.0.1:12345", "127.0.0.1", true},
		{"IPv4 VPC", "10.20.3.4:9999", "10.20.3.4", true},
		{"outside allowlist", "192.168.1.2:9999", "192.168.1.2", false},
		{"IPv6 loopback", "[::1]:443", "::1", true},
		{"malformed remote", "not-an-ip", "", false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			gotIP, allowed := list.Allowed(tt.remote, "")
			if gotIP != tt.wantIP || allowed != tt.allow {
				t.Fatalf("Allowed(%q) = (%q, %v), want (%q, %v)", tt.remote, gotIP, allowed, tt.wantIP, tt.allow)
			}
		})
	}
}

func TestIPAllowlistIgnoresForwardedHeaderFromUntrustedClient(t *testing.T) {
	t.Parallel()
	list, err := NewIPAllowlist("10.0.0.1/32", "10.10.0.0/16")
	if err != nil {
		t.Fatal(err)
	}
	// 直连客户端不能借 XFF 伪装成白名单地址。
	ip, allowed := list.Allowed("192.168.1.8:1000", "10.0.0.1")
	if allowed || ip != "192.168.1.8" {
		t.Fatalf("untrusted client spoofed XFF: ip=%q allowed=%v", ip, allowed)
	}
}

func TestIPAllowlistTrustedProxyChain(t *testing.T) {
	t.Parallel()
	list, err := NewIPAllowlist("10.0.0.1/32,2001:db8::1/128", "10.10.0.0/16")
	if err != nil {
		t.Fatal(err)
	}
	tests := []struct {
		name    string
		xff     string
		wantIP  string
		allowed bool
	}{
		{"single client", "10.0.0.1", "10.0.0.1", true},
		{"trusted intermediary", "10.0.0.1, 10.10.2.2", "10.0.0.1", true},
		{"rightmost untrusted is effective peer", "10.0.0.1, 172.16.0.9", "172.16.0.9", false},
		{"IPv6 client", "2001:db8::1", "2001:db8::1", true},
		{"malformed chain fails closed", "10.0.0.1, garbage", "", false},
		{"empty chain fails closed", "", "", false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ip, allowed := list.Allowed("10.10.1.1:443", tt.xff)
			if ip != tt.wantIP || allowed != tt.allowed {
				t.Fatalf("Allowed(xff=%q) = (%q, %v), want (%q, %v)", tt.xff, ip, allowed, tt.wantIP, tt.allowed)
			}
		})
	}
}

func TestIPAllowlistRejectsBadConfiguration(t *testing.T) {
	t.Parallel()
	for _, tt := range []struct{ name, allow, proxies string }{
		{"empty allowlist", "", ""},
		{"invalid allow CIDR", "10.0.0.1", ""},
		{"invalid proxy CIDR", "10.0.0.1/32", "bad"},
	} {
		t.Run(tt.name, func(t *testing.T) {
			if _, err := NewIPAllowlist(tt.allow, tt.proxies); err == nil {
				t.Fatal("expected configuration error")
			}
		})
	}
}
