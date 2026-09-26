/**
 * @file        : vite.config.ts
 * @description : إعداد Vite الأساسي للمشروع.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إنشاء إعداد Vite" }
 * ]
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@a': new URL('./src/alias/index.ts', import.meta.url).pathname,
      '@ui': new URL('./src/alias/ui.ts', import.meta.url).pathname,
      '@icons': new URL('./src/alias/icons.ts', import.meta.url).pathname,
      '@store': new URL('./src/alias/store.ts', import.meta.url).pathname,
      '@const': new URL('./src/alias/constants.ts', import.meta.url).pathname,
    },
  },
})
