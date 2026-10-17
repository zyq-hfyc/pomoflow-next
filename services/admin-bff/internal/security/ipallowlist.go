// Package security 包含管理后台的访问边界安全组件。
package security

import (
	"errors"
	"fmt"
	"net"
	"strings"
)

// IPAllowlist 按实际客户端 IP 限制后台访问。
// 只有直连对端属于 trustedProxies 时才解析 X-Forwarded-For，其他来源的
// 转发头一律忽略，防止客户端伪造白名单地址。
type IPAllowlist struct {
	allowed        []*net.IPNet
	trustedProxies []*net.IPNet
}

// NewIPAllowlist 解析 CIDR 配置。allowCIDRs 不能为空（默认拒绝）；
// proxyCIDRs 为空表示不接收任何代理转发头。
func NewIPAllowlist(allowCIDRs, proxyCIDRs string) (*IPAllowlist, error) {
	allowed, err := parseCIDRList(allowCIDRs, false)
	if err != nil {
		return nil, fmt.Errorf("invalid admin IP allowlist: %w", err)
	}
	proxies, err := parseCIDRList(proxyCIDRs, true)
	if err != nil {
		return nil, fmt.Errorf("invalid trusted proxy list: %w", err)
	}
	return &IPAllowlist{allowed: allowed, trustedProxies: proxies}, nil
}

// Allowed 返回有效客户端 IP 及其是否通过白名单。
// 格式错误的地址或代理链返回空 IP 并拒绝，绝不猜测放行。
func (l *IPAllowlist) Allowed(remoteAddr, xForwardedFor string) (string, bool) {
	remoteIP := parseRemoteIP(remoteAddr)
	if remoteIP == nil {
		return "", false
	}

	clientIP := remoteIP
	if len(l.trustedProxies) > 0 && ipInAny(remoteIP, l.trustedProxies) {
		clientIP = forwardedClientIP(xForwardedFor, l.trustedProxies)
		if clientIP == nil {
			return "", false
		}
	}

	canonical := clientIP.String()
	return canonical, ipInAny(clientIP, l.allowed)
}

func parseRemoteIP(remoteAddr string) net.IP {
	if host, _, err := net.SplitHostPort(remoteAddr); err == nil {
		return net.ParseIP(host)
	}
	// 单测与非 net/http 调用方可直接传不带端口的 IP。
	return net.ParseIP(remoteAddr)
}

func forwardedClientIP(xff string, trustedProxies []*net.IPNet) net.IP {
	if strings.TrimSpace(xff) == "" {
		return nil
	}
	parts := strings.Split(xff, ",")
	chain := make([]net.IP, 0, len(parts))
	for _, part := range parts {
		ip := net.ParseIP(strings.TrimSpace(part))
		if ip == nil {
			return nil
		}
		chain = append(chain, ip)
	}

	// 从离服务端最近的一跳向回找第一个非可信代理；可信代理追加的
	// 更右侧节点不能被当成最终客户端。
	for i := len(chain) - 1; i >= 0; i-- {
		if !ipInAny(chain[i], trustedProxies) {
			return chain[i]
		}
	}
	// 整条链都是可信代理时，最左项是链中最早出现的地址。
	return chain[0]
}

func parseCIDRList(raw string, allowEmpty bool) ([]*net.IPNet, error) {
	if strings.TrimSpace(raw) == "" {
		if allowEmpty {
			return nil, nil
		}
		return nil, errors.New("must not be empty")
	}
	parts := strings.Split(raw, ",")
	result := make([]*net.IPNet, 0, len(parts))
	for _, part := range parts {
		cidr := strings.TrimSpace(part)
		if cidr == "" {
			return nil, errors.New("contains an empty CIDR")
		}
		_, network, err := net.ParseCIDR(cidr)
		if err != nil {
			return nil, fmt.Errorf("%q: %w", cidr, err)
		}
		result = append(result, network)
	}
	return result, nil
}

func ipInAny(ip net.IP, networks []*net.IPNet) bool {
	for _, network := range networks {
		if network.Contains(ip) {
			return true
		}
	}
	return false
}
