import { describe, expect, it } from 'vitest'
import { formatBytes, formatDate } from './format'

describe('formatBytes', () => {
  it('小于 1KB 用字节展示', () => {
    expect(formatBytes(0)).toBe('0 B')
    expect(formatBytes(512)).toBe('512 B')
  })

  it('KB / MB 换算保留一位小数', () => {
    expect(formatBytes(1536)).toBe('1.5 KB')
    expect(formatBytes(5 * 1024 * 1024)).toBe('5.0 MB')
  })

  it('超过 1GB 用 GB', () => {
    expect(formatBytes(1536 * 1024 * 1024)).toBe('1.5 GB')
  })

  it('非法输入返回占位符', () => {
    expect(formatBytes(-1)).toBe('—')
    expect(formatBytes(Number.NaN)).toBe('—')
  })
})

describe('formatDate', () => {
  it('按本地时区展示中文日期', () => {
    // 取正午 UTC,保证 UTC 与 UTC+8 同日,断言不受 CI 时区影响。
    expect(formatDate(Date.UTC(2026, 0, 15, 12))).toContain('2026')
  })
})
