/**
 * @file        : src/main.tsx
 * @description : نقطة تشغيل تطبيق React.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إنشاء نقطة التشغيل" }
 * ]
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element is missing.')
}

try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (error) {
  rootElement.innerHTML = `
    <main style="min-height:100vh;padding:32px;font-family:system-ui,sans-serif;color:#8b1e1e;background:#fff5f5">
      <h1>تعذر تحميل التطبيق</h1>
      <p>حدث خطأ أثناء تشغيل واجهة React.</p>
      <pre style="white-space:pre-wrap">${String(error)}</pre>
    </main>
  `
  console.error(error)
}
