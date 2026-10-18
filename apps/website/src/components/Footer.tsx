export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="footer-brand">
          <svg width="16" height="16" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <circle cx="16" cy="16" r="12" stroke="var(--accent-500)" strokeWidth="3" />
            <path
              d="M16 9v7l5 3"
              stroke="var(--accent-500)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          PomoFlow
        </span>
        <nav className="footer-links" aria-label="页脚导航">
          <a href="#features">功能</a>
          <a href="#downloads">下载</a>
          <a href="#top">回到顶部</a>
        </nav>
        <span className="footer-copy">© 2026 PomoFlow · 本地优先的番茄钟与任务管理</span>
      </div>
    </footer>
  )
}
