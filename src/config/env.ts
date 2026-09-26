/**
 * @file        : src/config/env.ts
 * @description : قراءة متغيرات البيئة العامة والتحقق منها بشكل مركزي.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إضافة إعداد البيئة" }
 * ]
 */

import { z } from 'zod'

const environmentSchema = z.object({
  VITE_APP_NAME: z.string().min(1).default('SPA Frontend'),
  VITE_API_BASE_URL: z.string().url().default('http://localhost:2001/api'),
})

const parsedEnvironment = environmentSchema.safeParse(import.meta.env)

if (!parsedEnvironment.success) {
  throw new Error('Environment configuration is invalid.')
}

export const ENV = parsedEnvironment.data
