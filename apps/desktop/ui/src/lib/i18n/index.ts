/** i18n 入口：DICTS / Lang / DEFAULT_LANG。自 v1 pomoflow/frontend/src/i18n/index.ts 原样移植。 */
import { zh, type Dict } from './zh'
import { en } from './en'

export type Lang = 'zh' | 'en'
export type { Dict }

export const DICTS: Record<Lang, Dict> = { zh, en }
export const DEFAULT_LANG: Lang = 'zh'
