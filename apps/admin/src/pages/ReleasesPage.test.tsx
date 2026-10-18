import { App as AntApp } from 'antd'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import ReleasesPage from './ReleasesPage'
import * as admin from '../services/admin'
import type { Release } from '../types'

vi.mock('../services/admin', () => ({
  listReleases: vi.fn(),
  createRelease: vi.fn(),
  uploadReleaseAsset: vi.fn(),
  publishRelease: vi.fn(),
  unpublishRelease: vi.fn(),
  deleteRelease: vi.fn(),
  deleteReleaseAsset: vi.fn(),
}))

const draft: Release = {
  id: 'rel-1',
  version: '0.2.1',
  notes: '',
  status: 'draft',
  created_ms: 1_767_000_000_000,
  published_ms: null,
  assets: [],
}

function renderPage() {
  return render(
    <AntApp>
      <ReleasesPage />
    </AntApp>,
  )
}

describe('ReleasesPage', () => {
  beforeEach(() => {
    vi.mocked(admin.listReleases).mockResolvedValue({
      items: [draft],
      download_base_url: 'https://download.example.com',
    })
  })

  test('渲染版本列表、状态徽标与发布按钮', async () => {
    renderPage()
    expect(await screen.findByText('v0.2.1')).toBeInTheDocument()
    expect(screen.getByText('草稿')).toBeInTheDocument()
    // antd 会在两个 CJK 按钮字间插空格,可访问名是「发 布」
    expect(screen.getByRole('button', { name: /发\s*布/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /新\s*建\s*版\s*本/ })).toBeInTheDocument()
  })

  test('点击发布调用 publishRelease 并刷新列表', async () => {
    vi.mocked(admin.publishRelease).mockResolvedValue({ id: 'rel-1', status: 'published' })
    renderPage()

    fireEvent.click(await screen.findByRole('button', { name: /发\s*布/ }))

    await waitFor(() => {
      expect(admin.publishRelease).toHaveBeenCalledWith('rel-1')
      expect(admin.listReleases).toHaveBeenCalledTimes(2)
    })
  })
})
