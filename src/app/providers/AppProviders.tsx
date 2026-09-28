/**
 * @file        : src/app/providers/AppProviders.tsx
 * @description : مزودات التطبيق العامة مثل TanStack Query.
 * @updated     : [
 *   { "date": "2026-09-26T16:45:00Z", "version": "1.3.0", "by": ["BomBa"], "comment": "توحيد استيراد مزود Query عبر Alias" }
 * ]
 */

import { QueryClientProvider, queryClient, type PropsWithChildren } from '@a'

/** @description يركّب مزودات الحالة المشتركة حول واجهة التطبيق. */
export function AppProviders({ children }: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
