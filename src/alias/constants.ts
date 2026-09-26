/**
 * @file        : src/alias/constants.ts
 * @description : الثوابت العامة ومسارات التطبيق.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إنشاء الثوابت العامة" }
 * ]
 */

export { ENV } from '../config/env'

export const ROUTES = {
  HOME: '/',
} as const

export const APP_NAME = 'SPA Frontend'
export const DEFAULT_LANGUAGE = 'en' as const
export const DEFAULT_THEME = 'light' as const
export const SUPPORTED_LANGUAGES = ['ar', 'en'] as const
