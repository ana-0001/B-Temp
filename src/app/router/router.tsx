/**
 * @file        : src/app/router/router.tsx
 * @description : إعداد شجرة TanStack Router الأساسية للتطبيق.
 * @updated     : [
 *   { "date": "2026-09-26T16:45:00Z", "version": "1.3.0", "by": ["BomBa"], "comment": "إضافة حالات التحميل والخطأ وإعدادات الراوتر" }
 * ]
 */


import {
  createRootRoute,
  createRoute,
  createRouter,

  // Components
   RootLayout, PublicLayout, // app/layouts

  // Screens
  HomeScreen, NotFoundScreen, ErrorScreen, SplashScreen
} from '@a'


// 1. تعريف جذر الراوتر الأساسي
const root = createRootRoute({
  component: RootLayout,
  pendingComponent: SplashScreen,
  errorComponent: ({ reset }) => <ErrorScreen onRetry={reset} />,
  notFoundComponent: NotFoundScreen,
});

// 2. بناء المسارات الفرعية وتجميع الشجرة مباشرة
const publicRoute = createRoute({ getParentRoute: () => root, id: 'public', component: PublicLayout });
const homeRoute = createRoute({ getParentRoute: () => publicRoute, path: '/', component: HomeScreen });

// 3. تصدير الراوتر النهائي وإعداداته
export const appRouter = createRouter({
  routeTree: root.addChildren([publicRoute.addChildren([homeRoute])]),
  defaultPreload: 'intent',
  defaultPendingComponent: SplashScreen,
  defaultNotFoundComponent: NotFoundScreen,
  scrollRestoration: true,
});
