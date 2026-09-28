/**
 * @file        : vite.config.ts
 * @description : إعداد Vite الأساسي للمشروع مع دعم Tailwind CSS 4 و نظام Alias.
 * @updated     : [
 *   { "date": "2026-09-26T17:31:00+03:00", "version": "1.1.0", "by": ["BomBa"], "comment": "تفعيل إضافة Tailwind CSS 4 وضبط مسارات Alias" }
 * ]
 */

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      '@a': fileURLToPath(new URL('./src/alias/index.ts', import.meta.url)),
    },
  },
})
