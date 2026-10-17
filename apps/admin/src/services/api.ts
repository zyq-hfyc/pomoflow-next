export class ApiError extends Error {
  readonly status: number
  readonly code: string
  readonly requestID: string

  constructor(status: number, code: string, message: string, requestID = '') {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.requestID = requestID
  }
}

export interface ApiOptions extends Omit<RequestInit, 'body' | 'method'> {
  method?: string
  body?: BodyInit | Record<string, unknown>
}

export function getCookie(name: string): string {
  const prefix = `${name}=`
  const entry = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))
  if (!entry) return ''
  try {
    return decodeURIComponent(entry.slice(prefix.length))
  } catch {
    return ''
  }
}

/**
 * 唯一 BFF 请求边界：同源 session cookie + 写操作 CSRF + 请求关联 ID。
 * 成功返回 JSON data；错误保留后端机器码和 request_id，禁止各页面各自解析。
 */
export async function apiFetch<T = unknown>(path: string, options: ApiOptions = {}): Promise<T> {
  const method = (options.method ?? 'GET').toUpperCase()
  const headers = new Headers(options.headers)
  headers.set('Accept', 'application/json')
  if (!headers.has('X-Request-ID')) {
    headers.set('X-Request-ID', crypto.randomUUID())
  }

  let body: BodyInit | undefined
  if (options.body !== undefined && options.body !== null) {
    if (typeof options.body === 'string' || options.body instanceof FormData || options.body instanceof Blob) {
      body = options.body
    } else {
      body = JSON.stringify(options.body)
      headers.set('Content-Type', 'application/json')
    }
  }
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    const csrf = getCookie('pomoflow_admin_csrf')
    if (csrf) headers.set('X-CSRF-Token', csrf)
  }

  const response = await fetch(path, {
    ...options,
    method,
    body,
    headers,
    credentials: 'same-origin',
  })
  const text = response.status === 204 ? '' : await response.text()
  let payload: unknown
  if (text) {
    try {
      payload = JSON.parse(text)
    } catch {
      payload = text
    }
  }

  if (!response.ok) {
    const envelope = typeof payload === 'object' && payload !== null
      ? (payload as { error?: { code?: string; message?: string; request_id?: string } }).error
      : undefined
    throw new ApiError(
      response.status,
      envelope?.code ?? 'HTTP_ERROR',
      envelope?.message ?? (typeof payload === 'string' && payload ? payload : `HTTP ${response.status}`),
      envelope?.request_id ?? '',
    )
  }
  return payload as T
}
