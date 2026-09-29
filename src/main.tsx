/**
 * @file        : src/main.tsx
 * @description : نقطة تشغيل تطبيق React.
 * @updated     : [
 *   { "date": "2026-09-26T16:45:00Z", "version": "1.3.0", "by": ["BomBa"], "comment": "توحيد استيرادات نقطة التشغيل عبر Alias" }
 * ]
 */

import { App, createRoot, StrictMode } from '@a'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element is missing.')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
