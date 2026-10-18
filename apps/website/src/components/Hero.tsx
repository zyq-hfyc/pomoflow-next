export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero-grid">
        <div className="hero-blob hero-blob-1" aria-hidden="true" />
        <div className="hero-blob hero-blob-2" aria-hidden="true" />
        <div>
          <span className="hero-badge">本地优先 · 多端云同步</span>
          <h1 id="hero-heading">
            专注每一个
            <br />
            <em>25 分钟</em>
          </h1>
          <p className="hero-lead">
            PomoFlow 把番茄钟、任务管理和年度复盘装进一个安静的应用。数据留在你手里,
            桌面与手机之间无缝同步。
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary btn-lg" href="#downloads">
              下载最新版
            </a>
            <a className="btn btn-ghost btn-lg" href="#features">
              了解功能
            </a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-dial">
            <div className="dial-ring" />
            <div className="dial-face">
              <span className="dial-time">25:00</span>
              <span className="dial-label">专注中</span>
            </div>
            <span className="hero-chip hero-chip-1">
              <span className="hero-chip-dot" style={{ background: 'var(--success)' }} />
              今日 6 个番茄
            </span>
            <span className="hero-chip hero-chip-2">
              <span className="hero-chip-dot" style={{ background: 'var(--accent-400)' }} />
              任务 · 写周报
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
