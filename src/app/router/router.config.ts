/**
 * @file        : src/app/router/router.config.ts
 * @description : ثوابت ودوال مساعدة نقية مرتبطة بالمسارات الحالية.
 * @updated     : [{ "date": "2026-09-29", "version": "1.0.0", "by": ["BomBa"], "comment": "توحيد إعدادات المسارات وإزالة منطق المصادقة القديم" }]
 */

export const ROUTE_SUPPORTED_LANGUAGES = ['en', 'ar'] as const
export const ROUTE_DEFAULT_LANGUAGE = 'en' as const
export const ROUTE_PATHS = ['/', '/en', '/ar'] as const

export type T_RoutePath = (typeof ROUTE_PATHS)[number]
export type T_RouteLanguage = (typeof ROUTE_SUPPORTED_LANGUAGES)[number]

/** @description يحدد اللغة المستخدمة من المسار أو يرجع للغة المحفوظة/الافتراضية. */
export function getRouteLanguage(pathname: string, storedLanguage: T_RouteLanguage = ROUTE_DEFAULT_LANGUAGE): T_RouteLanguage {
  const pathLanguage = pathname.split('/').filter(Boolean)[0]
  return ROUTE_SUPPORTED_LANGUAGES.includes(pathLanguage as T_RouteLanguage)
    ? pathLanguage as T_RouteLanguage
    : storedLanguage
}

/** @description يبني مسار الصفحة الرئيسية باللغة المطلوبة. */
export function getLocalizedHomePath(language: T_RouteLanguage): `/${T_RouteLanguage}` {
  return `/${language}`
}

/** @description يتحقق من وجود المسار داخل قائمة المسارات المدعومة. */
export function isKnownRoute(pathname: string): pathname is T_RoutePath {
  return ROUTE_PATHS.includes(pathname as T_RoutePath)
}
