//! aggregateDevices 单一来源测试(2026-09-15 批 4d)。

import { describe, expect, test } from "vitest";
import { aggregateDevices } from "./accountDevices";
import type { SessionInfo } from "./api";

function sess(p: Partial<SessionInfo> & Pick<SessionInfo, "id">): SessionInfo {
  return {
    device_id: "dev-a",
    device_name: "A 机",
    created_ms: 1000,
    current: false,
    ...p,
  } as SessionInfo;
}

describe("aggregateDevices", () => {
  test("同设备多会话聚成一行,current 优先于更新的非 current", () => {
    const rows = aggregateDevices([
      sess({ id: 1, created_ms: 3000, current: false }),
      sess({ id: 2, created_ms: 1000, current: true }), // 旧但是 current
    ]);
    expect(rows).toHaveLength(1);
    expect(rows[0].ss.current).toBe(true); // current 优先
    expect(rows[0].ids).toEqual([1, 2]);
  });

  test("无 current 时取 created_ms 最新;设备按最近登录降序", () => {
    const rows = aggregateDevices([
      sess({ id: 1, device_id: "dev-b", created_ms: 500 }),
      sess({ id: 2, device_id: "dev-a", created_ms: 900 }),
      sess({ id: 3, device_id: "dev-b", created_ms: 2000 }),
    ]);
    expect(rows.map((r) => r.ss.device_id)).toEqual(["dev-b", "dev-a"]);
    expect(rows[0].ss.created_ms).toBe(2000);
    expect(rows[0].ids).toEqual([1, 3]);
  });

  test("id 为 null 的会话不进 ids;空输入返回空数组", () => {
    const rows = aggregateDevices([sess({ id: null as unknown as number })]);
    expect(rows[0].ids).toEqual([]);
    expect(aggregateDevices([])).toEqual([]);
  });
});
