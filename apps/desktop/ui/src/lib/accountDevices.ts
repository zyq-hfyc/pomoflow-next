/**
 * 账号会话 → 设备聚合(2026-09-15 批 4d 自 AccountCenter 抽出,逻辑零改动)。
 */
import type { SessionInfo } from "./api";

export interface DeviceEntry {
  /** 该设备展示用的代表会话(current 优先,否则最新) */
  ss: SessionInfo;
  /** 该设备全部 session id(下线用) */
  ids: number[];
}

/** 同 device_id 只留最新一条(current 优先),否则每次登录一行 token,
 *  同一设备在"在线设备"里出现多条(与 mobile account_page 同款修复)。 */
export function aggregateDevices(sessions: SessionInfo[]): DeviceEntry[] {
  const byDev = new Map<string, { ss: SessionInfo; ids: number[] }>();
  for (const ss of sessions) {
    const key = ss.device_id ?? "";
    const cur = byDev.get(key);
    if (!cur) {
      byDev.set(key, { ss, ids: ss.id != null ? [ss.id] : [] });
    } else {
      if (ss.id != null) cur.ids.push(ss.id);
      if (
        ss.current ||
        (!cur.ss.current && (ss.created_ms ?? 0) > (cur.ss.created_ms ?? 0))
      ) {
        cur.ss = ss;
      }
    }
  }
  const list = [...byDev.values()];
  list.sort((a, b) => (b.ss.created_ms ?? 0) - (a.ss.created_ms ?? 0));
  return list;
}
