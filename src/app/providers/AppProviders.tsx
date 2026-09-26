/**
 * @file        : src/app/providers/AppProviders.tsx
 * @description : مزودات التطبيق العامة مثل TanStack Query.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إنشاء مزودات التطبيق" }
 * ]
 */

import type { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../../lib/query/query-client'

/** @description يركّب مزودات الحالة المشتركة حول واجهة التطبيق. */
export function AppProviders({ children }: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
