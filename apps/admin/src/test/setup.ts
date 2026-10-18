import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// 未开启 vitest globals 时,testing-library 的自动 cleanup 不生效,手动注册。
// 卸载发生在 jsdom 还活着的时候,React 挂起的渲染在环境内同步收敛 ——
// 否则慢 CI 上调度器会在环境拆除后碰 window(unhandled `window is not defined`,
// 测试本身全过但进程退出 1,2026-10-18 CI admin-ui job 实证)。
afterEach(() => {
  cleanup()
})

// antd 响应式栅格依赖 matchMedia,jsdom 未实现 —— 提供最小桩(永远不匹配)。
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // 旧 API,antd 仍在用
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})
