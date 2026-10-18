import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// 未开启 vitest globals 时,testing-library 的自动 cleanup 不生效,手动注册。
afterEach(() => {
  cleanup()
})
