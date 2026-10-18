import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { App } from './App'

// 只给两个平台资产:验证「缺资产置灰敬请期待」与「下载链接构造」两条链路。
vi.mock('./api', () => ({
  assetDownloadUrl: (asset: { id: string }) => `/api/public/download/${asset.id}`,
  fetchPublicReleases: vi.fn(async () => [
    {
      id: 'r-latest',
      version: '0.3.0',
      notes: '新增年度复盘与随手记。',
      published_ms: Date.UTC(2026, 0, 15, 12),
      assets: [
        {
          id: 'asset-win',
          platform: 'windows',
          filename: 'PomoFlow_0.3.0_x64.exe',
          size_bytes: 24_117_248,
          download_count: 3,
        },
        {
          id: 'asset-apk',
          platform: 'android',
          filename: 'PomoFlow_0.3.0.apk',
          size_bytes: 18_874_368,
          download_count: 9,
        },
      ],
    },
    {
      id: 'r-old',
      version: '0.2.0',
      notes: '',
      published_ms: Date.UTC(2025, 11, 1, 12),
      assets: [],
    },
  ]),
}))

describe('App 官网单页', () => {
  it('渲染主标题、功能与下载分区', async () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { level: 1, name: /专注每一个/ }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: '为专注而生的完整工具链' }))
    expect(await screen.findByText('PomoFlow_0.3.0_x64.exe')).toBeInTheDocument()
  })

  it('最新版缺资产的四个平台置灰「敬请期待」', async () => {
    render(<App />)
    await screen.findByText('PomoFlow_0.3.0_x64.exe')
    expect(screen.getAllByText('敬请期待')).toHaveLength(4)
  })

  it('下载链接指向公开下载端点', async () => {
    render(<App />)
    const link = await screen.findByRole('link', { name: /PomoFlow_0\.3\.0\.apk/ })
    expect(link).toHaveAttribute('href', '/api/public/download/asset-apk')
  })

  it('历史版本列出旧版与平台链接', async () => {
    render(<App />)
    expect(await screen.findByText('历史版本(1)')).toBeInTheDocument()
    expect(screen.getByText('v0.2.0')).toBeInTheDocument()
  })
})
