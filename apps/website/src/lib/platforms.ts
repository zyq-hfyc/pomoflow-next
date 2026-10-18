/**
 * 平台元数据与 UA 探测 —— 纯函数,便于单测。
 * 平台 id 必须与 sync-server `PLATFORMS`(release_handlers.rs)逐字一致。
 */

export type PlatformId = 'windows' | 'linux' | 'mac' | 'ios' | 'android' | 'harmony'

export interface PlatformMeta {
  id: PlatformId
  label: string
  note: string
}

/** 官网展示顺序(用户阅读顺序,与服务端校验顺序无关)。 */
export const PLATFORMS: readonly PlatformMeta[] = [
  { id: 'windows', label: 'Windows', note: 'Windows 10 / 11' },
  { id: 'mac', label: 'macOS', note: 'Apple Silicon & Intel' },
  { id: 'linux', label: 'Linux', note: 'AppImage / deb / rpm' },
  { id: 'ios', label: 'iOS', note: 'TestFlight / ipa' },
  { id: 'android', label: 'Android', note: 'APK 直接安装' },
  { id: 'harmony', label: '鸿蒙 HarmonyOS', note: 'HAP 安装包' },
]

export function isPlatformId(value: string): value is PlatformId {
  return PLATFORMS.some((p) => p.id === value)
}

export function platformLabel(id: PlatformId): string {
  return PLATFORMS.find((p) => p.id === id)?.label ?? id
}

/**
 * 从 User-Agent 猜测当前平台;识别不了返回 null(不高亮任何卡片)。
 * 鸿蒙浏览器的 UA 通常同时含 "Android" 与 "HarmonyOS",故先判鸿蒙。
 */
export function detectPlatform(userAgent: string): PlatformId | null {
  const ua = userAgent.toLowerCase()
  if (ua.includes('harmonyos') || ua.includes('openharmony')) return 'harmony'
  if (/(iphone|ipad|ipod)/.test(ua)) return 'ios'
  if (ua.includes('android')) return 'android'
  if (/(macintosh|mac os x)/.test(ua)) return 'mac'
  if (/(windows|win32|win64|wow64)/.test(ua)) return 'windows'
  if (/(linux|x11)/.test(ua)) return 'linux'
  return null
}
