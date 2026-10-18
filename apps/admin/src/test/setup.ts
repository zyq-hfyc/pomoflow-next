import '@testing-library/jest-dom/vitest'

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
