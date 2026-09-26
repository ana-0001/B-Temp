/**
 * @file        : src/alias/store.ts
 * @description : نقطة الاستيراد المركزية للحالة المحلية وعميل البيانات.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "ربط مخازن الحالة وعميل Query" }
 * ]
 */

export { queryClient } from '../lib/query/query-client'
export { useSettingsStore } from '../stores/settingsStore'
export { useUIStore } from '../stores/uiStore'
export { useAuthStore } from '../stores/authStore'
export { createHTTPClient } from '../services/http/axiosClient'
export type { I_HTTPClientOptions, I_HTTPError } from '../services/http/axiosClient'
