//! 公开下载限频器(ADR-013):固定窗口 per-IP 计数,纯内存。
//!
//! 设计要点:
//! - IPv4 按完整地址计;IPv6 按 /64 前缀归组(攻击者换 /128 喷射无效);
//! - 键表容量上限(10_000):满了先清扫过期窗口,仍满则**拒绝**(fail-closed),
//!   宁可误伤瞬时下载也不让无界 HashMap 变成内存泄漏面;
//! - 时钟可注入(`with_clock`),窗口滚动逻辑才能做纯逻辑单测。

use std::collections::HashMap;
use std::net::{IpAddr, Ipv4Addr};
use std::sync::Mutex;

/// 键表容量上限(超过先清扫,仍超则 fail-closed)
const MAX_KEYS: usize = 10_000;

/// 限频键:IPv4 全地址;IPv6 取 /64 前缀(前 8 字节)
#[derive(Clone, Copy, PartialEq, Eq, Hash)]
enum IpKey {
    V4(Ipv4Addr),
    V6Prefix([u8; 8]),
}

impl IpKey {
    fn of(ip: IpAddr) -> Self {
        match ip {
            IpAddr::V4(v4) => IpKey::V4(v4),
            IpAddr::V6(v6) => IpKey::V6Prefix(v6.octets()[0..8].try_into().expect("/64 前缀定长")),
        }
    }
}

struct Window {
    start_ms: i64,
    count: u32,
}

pub struct RateLimiter {
    max_per_window: u32,
    window_ms: i64,
    max_keys: usize,
    slots: Mutex<HashMap<IpKey, Window>>,
    now_ms: Box<dyn Fn() -> i64 + Send + Sync>,
}

impl RateLimiter {
    /// 生产构造:真实时钟(调用方给窗口参数,如 (60, 60_000) = 每分钟 60 次)。
    pub fn new(max_per_window: u32, window_ms: i64) -> Self {
        Self::with_clock(
            max_per_window,
            window_ms,
            Box::new(|| chrono::Utc::now().timestamp_millis()),
        )
    }

    /// 测试构造:注入时钟。
    pub fn with_clock(
        max_per_window: u32,
        window_ms: i64,
        now_ms: Box<dyn Fn() -> i64 + Send + Sync>,
    ) -> Self {
        Self {
            max_per_window,
            window_ms,
            max_keys: MAX_KEYS,
            slots: Mutex::new(HashMap::new()),
            now_ms,
        }
    }

    /// 记一次并判定是否放行;超窗滚动,超限拒绝。
    pub fn check(&self, ip: IpAddr) -> bool {
        let key = IpKey::of(ip);
        let now = (self.now_ms)();
        let mut slots = self.slots.lock().unwrap_or_else(|e| e.into_inner());

        // 过期窗口:就地滚动(删掉旧条目,视为新键)
        let expired = match slots.get(&key) {
            Some(w) => now >= w.start_ms + self.window_ms,
            None => false,
        };
        if expired {
            slots.remove(&key);
        }

        match slots.get_mut(&key) {
            Some(w) => {
                if w.count >= self.max_per_window {
                    return false;
                }
                w.count += 1;
                true
            }
            None => {
                // 新键:表满则先清扫过期,仍满 fail-closed
                if slots.len() >= self.max_keys {
                    slots.retain(|_, w| now < w.start_ms + self.window_ms);
                    if slots.len() >= self.max_keys {
                        log::warn!("release 限频表满({} 键),临时拒绝新来源", self.max_keys);
                        return false;
                    }
                }
                slots.insert(
                    key,
                    Window {
                        start_ms: now,
                        count: 1,
                    },
                );
                true
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::sync::atomic::{AtomicI64, Ordering};
    use std::sync::Arc;

    /// 假时钟:手动推进(Arc<AtomicI64> 满足闭包的 Send + Sync 约束)
    fn fake_clock() -> (Box<dyn Fn() -> i64 + Send + Sync>, Arc<AtomicI64>) {
        let t = Arc::new(AtomicI64::new(1_000_000));
        let t2 = t.clone();
        (Box::new(move || t2.load(Ordering::Relaxed)), t)
    }

    fn ip4(a: [u8; 4]) -> IpAddr {
        IpAddr::V4(Ipv4Addr::from(a))
    }

    #[test]
    fn allows_up_to_limit_then_denies() {
        let (clock, _) = fake_clock();
        let lim = RateLimiter::with_clock(3, 60_000, clock);
        assert!(lim.check(ip4([1, 2, 3, 4])));
        assert!(lim.check(ip4([1, 2, 3, 4])));
        assert!(lim.check(ip4([1, 2, 3, 4])));
        assert!(!lim.check(ip4([1, 2, 3, 4])));
    }

    #[test]
    fn window_rollover_resets_count() {
        let (clock, t) = fake_clock();
        let lim = RateLimiter::with_clock(2, 60_000, clock);
        assert!(lim.check(ip4([9, 9, 9, 9])));
        assert!(lim.check(ip4([9, 9, 9, 9])));
        assert!(!lim.check(ip4([9, 9, 9, 9])));
        t.store(t.load(Ordering::Relaxed) + 60_000, Ordering::Relaxed); // 推进整整一个窗口
        assert!(lim.check(ip4([9, 9, 9, 9]))); // 滚窗后计数清零,重新放行
    }

    #[test]
    fn distinct_ips_are_independent() {
        let (clock, _) = fake_clock();
        let lim = RateLimiter::with_clock(1, 60_000, clock);
        assert!(lim.check(ip4([1, 1, 1, 1])));
        assert!(!lim.check(ip4([1, 1, 1, 1])));
        assert!(lim.check(ip4([2, 2, 2, 2])));
    }

    #[test]
    fn ipv6_grouped_by_64_prefix() {
        let (clock, _) = fake_clock();
        let lim = RateLimiter::with_clock(1, 60_000, clock);
        let base: u128 = 0x2001_0DB8_0000_0000_0000_0000_0000_0000;
        let a = IpAddr::V6(base.into());
        let b = IpAddr::V6((base | 0x0001).into()); // 同 /64,不同 /128
        assert!(lim.check(a));
        assert!(!lim.check(b)); // 归组生效
    }

    #[test]
    fn fails_closed_when_key_table_full() {
        let (clock, t) = fake_clock();
        let lim = RateLimiter::with_clock(1, 60_000, clock);
        // 手动塞满键表(绕过 check 的清扫路径,直接测容量护栏)
        {
            let mut slots = lim.slots.lock().unwrap();
            for i in 0..lim.max_keys {
                slots.insert(
                    IpKey::V4(Ipv4Addr::from(u32::from_be_bytes([10, 0, 0, 0]) + i as u32)),
                    Window {
                        start_ms: 1_000_000,
                        count: 1,
                    },
                );
            }
        }
        // 新来源被拒(fail-closed)
        assert!(!lim.check(ip4([172, 16, 0, 1])));
        // 推进窗口使全部旧键过期 → 新键触发清扫腾位 → 放行
        t.store(t.load(Ordering::Relaxed) + 60_000, Ordering::Relaxed);
        assert!(lim.check(ip4([172, 16, 0, 1])));
    }
}
