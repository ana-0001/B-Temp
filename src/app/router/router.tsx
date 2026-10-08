/**
 * @file        : src/app/router/router.tsx
 * @description : تعريف شجرة الراوتر الأساسية للتطبيق وربطها بالـ layouts والشاشات الحالية.
 * @updated     : [{ "date": "2026-09-29", "version": "1.0.0", "by": ["BomBa"], "comment": "إعادة بناء الراوتر بما يتوافق مع بنية المشروع الحالية" }, { "date": "2026-10-08", "version": "1.1.0", "by": ["BomBa"], "comment": "تقسيم الكود — lazy loading للشاشات العامة عبر lazyRouteComponent" }]
 */

import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from '@/alias/core'
import { useSettingsStore } from '@/components/settings/settings.store'
import { PublicLayout } from '@/app/layouts/PublicLayout'
import { RootLayout } from '@/app/layouts/RootLayout'
import { ErrorScreen } from '@/screens/ErrorScreen'
import { SplashScreen } from '@/screens/SplashScreen'

// ⚡ تقسيم الكود — الشاشات العامة بتتحمل عند الحاجة والـ Splash بيظهر لحظة التحميل
// ErrorScreen يفضل eager عمداً — حدود الأخطاء لازم تكون متاحة فوراً حتى لو الشبكة وقعت
const HomeScreen = lazyRouteComponent(() => import('@/screens/HomeScreen'), 'HomeScreen')
const NotFoundScreen = lazyRouteComponent(() => import('@/screens/NotFoundScreen'), 'NotFoundScreen')

// ─────────────────────────────────────────────
// 🧭 Root route
// ─────────────────────────────────────────────

export const rootRoute = createRootRoute({
  component: RootLayout,
  pendingComponent: SplashScreen,
  errorComponent: ({ reset }) => <ErrorScreen onRetry={reset} />,
  notFoundComponent: NotFoundScreen,
})

// ─────────────────────────────────────────────
// 🌐 Public routes
// ─────────────────────────────────────────────

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

const englishHomeRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/en',
  beforeLoad: () => useSettingsStore.getState().setLanguage('en'),
  component: HomeScreen,
})

const arabicHomeRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/ar',
  beforeLoad: () => useSettingsStore.getState().setLanguage('ar'),
  component: HomeScreen,
})

// ─────────────────────────────────────────────
// 🧩 Route tree and router instance
// ─────────────────────────────────────────────

export const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([homeRoute, englishHomeRoute, arabicHomeRoute]),
])

export const appRouter = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPendingComponent: SplashScreen,
  defaultNotFoundComponent: NotFoundScreen,
  scrollRestoration: true,
})
