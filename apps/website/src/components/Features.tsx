import type { ReactNode } from 'react'

interface Feature {
  title: string
  description: string
  span: 'span-4' | 'span-2'
  icon: ReactNode
}

function TimerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="13" r="8" />
      <path d="M12 13V9" />
      <path d="M9 2h6" />
    </svg>
  )
}

function TasksIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 6 2 2 3-3" />
      <path d="m3 17 2 2 3-3" />
      <path d="M12 7h9" />
      <path d="M12 18h9" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M22 20H2" />
    </svg>
  )
}

function SyncIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 0 1-15.5 6.2" />
      <path d="M3 12A9 9 0 0 1 18.5 5.8" />
      <path d="M18.5 2v4h-4" />
      <path d="M5.5 22v-4h4" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4.5 5v6c0 5 3.2 8.6 7.5 10 4.3-1.4 7.5-5 7.5-10V5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

const FEATURES: Feature[] = [
  {
    title: '番茄钟专注',
    description:
      '25 分钟专注 + 5 分钟休息的可定制节奏,白噪音与提醒齐备,让"开始"变得毫不费力。',
    span: 'span-4',
    icon: <TimerIcon />,
  },
  {
    title: '任务与项目管理',
    description: '项目三层嵌套、标签、子任务、重复任务与拖拽排序,复杂计划也能轻装上阵。',
    span: 'span-2',
    icon: <TasksIcon />,
  },
  {
    title: '统计与年度复盘',
    description: '趋势、分布、总览一目了然,年末还有一份专属于你的年度报告。',
    span: 'span-2',
    icon: <ChartIcon />,
  },
  {
    title: '多端云同步',
    description: 'Windows / macOS / Linux / iOS / Android / 鸿蒙全端覆盖,账号登录即同步。',
    span: 'span-2',
    icon: <SyncIcon />,
  },
  {
    title: '本地优先 · 数据自主',
    description: '数据先落本机、后上云端,随时一键导出,你的专注记录永远属于你。',
    span: 'span-2',
    icon: <ShieldIcon />,
  },
]

export function Features() {
  return (
    <section id="features" className="section" aria-labelledby="features-heading">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">Features</span>
          <h2 id="features-heading">为专注而生的完整工具链</h2>
          <p className="section-lead">
            不只是计时器——从任务拆解、专注执行到复盘回顾,PomoFlow 陪你走完整个循环。
          </p>
        </div>
        <div className="bento">
          {FEATURES.map((feature) => (
            <article key={feature.title} className={`bento-card ${feature.span}`}>
              <span className="bento-icon" aria-hidden="true">
                {feature.icon}
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
