//! resolveSyncDefaults 单一来源测试(2026-11-20 开发默认值批)。
//! applySyncDefaultsOnce 是一行 invoke 胶水,依赖 Tauri IPC,不在此测
//! (与 accountDevices.test.ts 同模式:纯函数入库,胶水靠目检)。

import { describe, expect, test } from "vitest";
import { resolveSyncDefaults } from "./syncDefaults";

describe("resolveSyncDefaults", () => {
  test("双值齐备:原样透传", () => {
    expect(
      resolveSyncDefaults({
        VITE_SYNC_DEFAULT_URL: "http://192.168.1.10:8080",
        VITE_SYNC_DEFAULT_TOKEN: "tok-1",
      }),
    ).toEqual({ url: "http://192.168.1.10:8080", token: "tok-1" });
  });

  test("仅地址有值:令牌为 null(令牌本就不强制)", () => {
    expect(
      resolveSyncDefaults({ VITE_SYNC_DEFAULT_URL: "http://vm:8080" }),
    ).toEqual({ url: "http://vm:8080", token: null });
  });

  test("地址缺失:双 null(空配置自动写入不触发)", () => {
    expect(resolveSyncDefaults({})).toEqual({ url: null, token: null });
    expect(
      resolveSyncDefaults({ VITE_SYNC_DEFAULT_TOKEN: "tok-only" }),
    ).toEqual({ url: null, token: null });
  });

  test("空串与纯空白视同缺失;首尾空白被 trim", () => {
    expect(
      resolveSyncDefaults({
        VITE_SYNC_DEFAULT_URL: "   ",
        VITE_SYNC_DEFAULT_TOKEN: "",
      }),
    ).toEqual({ url: null, token: null });
    expect(
      resolveSyncDefaults({
        VITE_SYNC_DEFAULT_URL: "  http://vm:8080 \t",
        VITE_SYNC_DEFAULT_TOKEN: " tok ",
      }),
    ).toEqual({ url: "http://vm:8080", token: "tok" });
  });
});
