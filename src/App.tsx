/**
 * @file        : src/App.tsx
 * @description : جذر التطبيق الذي يربط المزودات بشجرة التوجيه.
 * @updated     : [
 *   { "date": "2026-09-26T16:45:00Z", "version": "1.3.0", "by": ["BomBa"], "comment": "توحيد مزود الراوتر عبر Alias" }
 * ]
 */

import { RouterProvider, AppProviders, appRouter } from '@a'

/** @description يركّب مزودات التطبيق ثم يسلّم العرض لشجرة TanStack Router. */
export function App() {
  return (
    <AppProviders>
      <RouterProvider router={appRouter} />
    </AppProviders>
  )
}
