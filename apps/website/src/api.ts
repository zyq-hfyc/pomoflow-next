/**
 * 公开只读接口封装 —— 直连 sync-server(同源托管或 vite dev proxy),
 * 不经 admin-bff(BFF 的 15s/4MiB 代理上限不适合安装包下载)。
 */

export interface PublicAsset {
  id: string
  platform: string
  filename: string
  size_bytes: number
  download_count: number
}

export interface PublicRelease {
  id: string
  version: string
  notes: string
  published_ms: number
  assets: PublicAsset[]
}

const PUBLIC_RELEASES_URL = '/api/public/releases'

export function assetDownloadUrl(asset: PublicAsset): string {
  return `/api/public/download/${encodeURIComponent(asset.id)}`
}

/** 拉取全部已发布版本(服务端已按版本号降序)。 */
export async function fetchPublicReleases(signal?: AbortSignal): Promise<PublicRelease[]> {
  const res = await fetch(PUBLIC_RELEASES_URL, {
    headers: { Accept: 'application/json' },
    signal,
  })
  if (!res.ok) {
    throw new Error(`公开接口返回 ${res.status}`)
  }
  const body = (await res.json()) as { items?: PublicRelease[] }
  if (!Array.isArray(body.items)) {
    throw new Error('公开接口响应格式异常')
  }
  return body.items
}
