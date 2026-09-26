/**
 * @file        : src/app/router/router.tsx
 * @description : إعداد شجرة TanStack Router الأساسية للتطبيق.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "ربط الشاشة الرئيسية بالغلاف الجذري" }
 * ]
 */

import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { RootLayout } from '../layouts/RootLayout'
import { PublicLayout } from '../layouts/PublicLayout'
import { HomeScreen } from '../../screens/HomeScreen'
import { NotFoundScreen } from '../../screens/NotFoundScreen'

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundScreen,
})

const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public',
  component: PublicLayout,
})

const homeRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/',
  component: HomeScreen,
})

const routeTree = rootRoute.addChildren([publicRoute.addChildren([homeRoute])])

export const appRouter = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundScreen,
})
