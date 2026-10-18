export function TopBar() {
  return (
    <header className="topbar">
      <nav className="container topbar-nav" aria-label="主导航">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="3" />
              <path
                d="M16 9v7l5 3"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
          PomoFlow
        </a>
        <div className="topbar-links">
          <a href="#features">功能</a>
          <a href="#downloads">下载</a>
        </div>
        <a className="btn btn-primary btn-sm" href="#downloads">
          立即下载
        </a>
      </nav>
    </header>
  )
}
