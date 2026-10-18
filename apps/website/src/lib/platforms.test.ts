import { describe, expect, it } from 'vitest'
import { PLATFORMS, detectPlatform, isPlatformId, platformLabel } from './platforms'

describe('detectPlatform', () => {
  it('识别 Windows UA', () => {
    expect(detectPlatform('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0')).toBe('windows')
  })

  it('识别 macOS UA', () => {
    expect(detectPlatform('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1')).toBe('mac')
  })

  it('识别 iPhone UA', () => {
    expect(detectPlatform('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)')).toBe('ios')
  })

  it('识别 Android UA', () => {
    expect(detectPlatform('Mozilla/5.0 (Linux; Android 14; Pixel 8) Chrome/126.0')).toBe('android')
  })

  it('鸿蒙 UA 同时含 Android 与 HarmonyOS 时优先判鸿蒙', () => {
    expect(
      detectPlatform(
        'Mozilla/5.0 (Linux; Android 12; HarmonyOS; HUAWEI Mate 60) HuaweiBrowser/14.0',
      ),
    ).toBe('harmony')
  })

  it('识别 Linux 桌面 UA', () => {
    expect(detectPlatform('Mozilla/5.0 (X11; Linux x86_64; rv:127.0) Gecko/20100101')).toBe('linux')
  })

  it('大小写不敏感', () => {
    expect(detectPlatform('WINDOWS NT 10.0')).toBe('windows')
  })

  it('识别不了返回 null', () => {
    expect(detectPlatform('Mozilla/5.0 (unknown OS) jsdom/26.1')).toBeNull()
    expect(detectPlatform('')).toBeNull()
  })
})

describe('平台元数据', () => {
  it('平台集合与服务端 PLATFORMS 一致(顺序为官网展示顺序,可与服务端不同)', () => {
    expect(PLATFORMS.map((p) => p.id)).toEqual([
      'windows',
      'mac',
      'linux',
      'ios',
      'android',
      'harmony',
    ])
    // 集合层面与服务端六值对齐,防止两端拼写漂移。
    expect([...PLATFORMS.map((p) => p.id)].sort()).toEqual(
      ['windows', 'linux', 'mac', 'ios', 'android', 'harmony'].sort(),
    )
  })

  it('isPlatformId 只认六个合法值', () => {
    expect(isPlatformId('windows')).toBe(true)
    expect(isPlatformId('harmony')).toBe(true)
    expect(isPlatformId('Windows')).toBe(false)
    expect(isPlatformId('win11')).toBe(false)
  })

  it('platformLabel 返回展示名', () => {
    expect(platformLabel('harmony')).toBe('鸿蒙 HarmonyOS')
  })
})
