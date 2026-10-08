/**
 * @file        : vite.config.ts
 * @description : إعداد Vite الأساسي للمشروع مع دعم Tailwind CSS 4 و نظام Alias.
 * @updated     : [
 *   { "date": "2026-09-26T17:31:00+03:00", "version": "1.1.0", "by": ["BomBa"], "comment": "تفعيل إضافة Tailwind CSS 4 وضبط مسارات Alias" },
 *   { "date": "2026-10-04", "version": "1.2.0", "by": ["BomBa"], "comment": "السماح بـ host المعاينة (e2b.app) في سيرفر التطوير فقط" },
 *   { "date": "2026-10-08", "version": "1.3.0", "by": ["BomBa"], "comment": "تقسيم الحزمة — manualChunks لمكتبات الفرع" }
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
  build: {
    rollupOptions: {
      output: {
        // فصل مكتبات الفرع عن كود التطبيق — تحميل متوازٍ وكاش أطول عمراً بين الإصدارات
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) return 'react-vendor'
          if (id.includes('@tanstack')) return 'tanstack-vendor'
          if (id.includes('i18next')) return 'i18n-vendor'
          if (id.includes('lucide-react')) return 'icons-vendor'
          if (id.includes('@radix-ui')) return 'radix-vendor'
          return 'vendor'
        },
      },
    },
  },
  server: {
    // السماح باستضافة نطاق المعاينة (sandbox) في وضع التطوير فقط — ما بيأثرش على الإنتاج
    allowedHosts: ['.e2b.app'],
  },
})
