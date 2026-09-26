/**
 * @file        : src/App.tsx
 * @description : جذر التطبيق الذي يربط المزودات بشجرة التوجيه.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "تفعيل App Shell والراوتر" }
 * ]
 */

import { RouterProvider } from '@tanstack/react-router'
import { AppProviders } from './app/providers/AppProviders'
import { appRouter } from './app/router/router'

/** @description يركّب مزودات التطبيق ثم يسلّم العرض لشجرة TanStack Router. */
export default function App() {
  return (
    <AppProviders>
      <RouterProvider router={appRouter} />
    </AppProviders>
  )
}
