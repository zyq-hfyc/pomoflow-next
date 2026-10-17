import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ApiError, apiFetch, getCookie } from './api'

describe('apiFetch', () => {
  beforeEach(() => {
    document.cookie = 'pomoflow_admin_csrf=csrf-value; path=/'
  })

  afterEach(() => {
    vi.restoreAllMocks()
    document.cookie = 'pomoflow_admin_csrf=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  })

  test('GET 使用同源凭证且不带 CSRF', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    await expect(apiFetch<{ ok: boolean }>('/api/example')).resolves.toEqual({ ok: true })
    const init = fetchMock.mock.calls[0][1]
    expect(init?.credentials).toBe('same-origin')
    expect(new Headers(init?.headers).has('X-CSRF-Token')).toBe(false)
  })

  test('POST 自动带 CSRF、JSON 与请求 ID', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ saved: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    await apiFetch('/api/example', { method: 'POST', body: { reason: 'test' } })
    const init = fetchMock.mock.calls[0][1]
    const headers = new Headers(init?.headers)
    expect(headers.get('X-CSRF-Token')).toBe('csrf-value')
    expect(headers.get('Content-Type')).toBe('application/json')
    expect(headers.get('X-Request-ID')).toMatch(/[0-9a-f-]{36}/)
    expect(init?.body).toBe(JSON.stringify({ reason: 'test' }))
  })

  test('错误信封保留机器码与 request_id', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          error: { code: 'ACCOUNT_BANNED', message: 'blocked', request_id: 'req-1' },
        }),
        { status: 403, headers: { 'Content-Type': 'application/json' } },
      ),
    )
    const error = await apiFetch('/api/example').catch((value) => value)
    expect(error).toBeInstanceOf(ApiError)
    expect(error).toMatchObject({ status: 403, code: 'ACCOUNT_BANNED', requestID: 'req-1' })
  })

  test('204 返回 undefined', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 204 }))
    await expect(apiFetch('/api/example', { method: 'POST' })).resolves.toBeUndefined()
  })
})

describe('getCookie', () => {
  test('读取并解码 cookie', () => {
    document.cookie = 'pomoflow_admin_csrf=hello%20world; path=/'
    expect(getCookie('pomoflow_admin_csrf')).toBe('hello world')
  })
})
