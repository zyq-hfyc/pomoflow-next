import { useState } from 'react'
import { assetDownloadUrl, type PublicAsset, type PublicRelease } from '../api'
import { formatBytes, formatDate } from '../lib/format'
import {
  PLATFORMS,
  detectPlatform,
  isPlatformId,
  platformLabel,
  type PlatformId,
} from '../lib/platforms'

export interface DownloadsState {
  status: 'loading' | 'error' | 'ready'
  releases: PublicRelease[]
}

interface DownloadsProps {
  state: DownloadsState
  onRetry: () => void
}

function PlatformCard({ platform, asset, detected }: {
  platform: (typeof PLATFORMS)[number]
  asset: PublicAsset | undefined
  detected: boolean
}) {
  if (!asset) {
    return (
      <div className="platform-card is-unavailable" aria-disabled="true">
        <div className="platform-head">
          <span className="platform-label">{platform.label}</span>
          {detected && <span className="platform-tag">当前平台</span>}
        </div>
        <span className="platform-note">{platform.note}</span>
        <span className="platform-cta is-missing">敬请期待</span>
      </div>
    )
  }
  return (
    <a
      className={detected ? 'platform-card is-detected' : 'platform-card'}
      href={assetDownloadUrl(asset)}
      download
    >
      <div className="platform-head">
        <span className="platform-label">{platform.label}</span>
        {detected && <span className="platform-tag">当前平台</span>}
      </div>
      <span className="platform-file" title={asset.filename}>
        {asset.filename}
      </span>
      <span className="platform-cta">
        {formatBytes(asset.size_bytes)} · 下载
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 4v12" />
          <path d="m6 12 6 6 6-6" />
          <path d="M5 21h14" />
        </svg>
      </span>
    </a>
  )
}

function HistoryList({ releases }: { releases: PublicRelease[] }) {
  return (
    <details className="history">
      <summary>历史版本({releases.length})</summary>
      <ul className="history-list">
        {releases.map((release) => (
          <li key={release.id} className="history-item">
            <span className="history-version">v{release.version}</span>
            <span className="history-date">{formatDate(release.published_ms)}</span>
            <span className="history-assets">
              {release.assets
                .filter(
                  (asset): asset is PublicAsset & { platform: PlatformId } =>
                    isPlatformId(asset.platform),
                )
                .map((asset) => (
                  <a key={asset.id} href={assetDownloadUrl(asset)} download>
                    {platformLabel(asset.platform)} · {formatBytes(asset.size_bytes)}
                  </a>
                ))}
            </span>
          </li>
        ))}
      </ul>
    </details>
  )
}

export function Downloads({ state, onRetry }: DownloadsProps) {
  // UA 只在浏览器端可取,惰性初始化保证 SSR/测试环境安全。
  const [detected] = useState(() => detectPlatform(navigator.userAgent))

  return (
    <section id="downloads" className="section section-alt" aria-labelledby="downloads-heading">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">Downloads</span>
          <h2 id="downloads-heading">选择你的平台</h2>
          <p className="section-lead">免费下载,数据本地优先。同一账号即可在所有设备间同步。</p>
        </div>

        {state.status === 'loading' && (
          <div className="platform-grid" aria-hidden="true">
            {PLATFORMS.map((platform) => (
              <div key={platform.id} className="platform-card skeleton" />
            ))}
          </div>
        )}

        {state.status === 'error' && (
          <div className="state-box state-box-error" role="alert">
            版本列表加载失败,请稍后重试。
            <br />
            <button type="button" className="btn btn-ghost btn-sm" onClick={onRetry}>
              重试
            </button>
          </div>
        )}

        {state.status === 'ready' && state.releases.length === 0 && (
          <div className="state-box">正式版本尚未发布,敬请期待。</div>
        )}

        {state.status === 'ready' && state.releases.length > 0 && (
          <>
            <div className="release-meta">
              <span className="release-version">
                最新版 <code>v{state.releases[0].version}</code>
              </span>
              <span className="release-date">
                {formatDate(state.releases[0].published_ms)} 发布
              </span>
            </div>
            {state.releases[0].notes.trim() !== '' && (
              <p className="release-notes">{state.releases[0].notes}</p>
            )}

            <div className="platform-grid">
              {PLATFORMS.map((platform) => (
                <PlatformCard
                  key={platform.id}
                  platform={platform}
                  asset={state.releases[0].assets.find((a) => a.platform === platform.id)}
                  detected={detected === platform.id}
                />
              ))}
            </div>

            {state.releases.length > 1 && <HistoryList releases={state.releases.slice(1)} />}
          </>
        )}
      </div>
    </section>
  )
}
