import { useCallback, useEffect, useState } from 'react'
import { Downloads, type DownloadsState } from './components/Downloads'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { TopBar } from './components/TopBar'
import { fetchPublicReleases, type PublicRelease } from './api'

export function App() {
  const [state, setState] = useState<DownloadsState>({ status: 'loading', releases: [] })

  const load = useCallback((signal?: AbortSignal) => {
    fetchPublicReleases(signal)
      .then((releases: PublicRelease[]) => setState({ status: 'ready', releases }))
      .catch((err: unknown) => {
        // 卸载/StrictMode 双跑导致的 abort 不算错误,保持 loading 由下一次请求接管。
        if (err instanceof DOMException && err.name === 'AbortError') return
        setState({ status: 'error', releases: [] })
      })
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    load(controller.signal)
    return () => controller.abort()
  }, [load])

  const retry = useCallback(() => {
    setState({ status: 'loading', releases: [] })
    load()
  }, [load])

  return (
    <div id="top">
      <TopBar />
      <main>
        <Hero />
        <Features />
        <Downloads state={state} onRetry={retry} />
      </main>
      <Footer />
    </div>
  )
}
