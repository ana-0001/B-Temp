/**
 * @file        : src/app/layouts/RootLayout.tsx
 * @description : الغلاف الجذري الذي يزامن إعدادات اللغة والثيم مع وثيقة HTML.
 * @updated     : [
 *   { "date": "2026-09-26T16:45:00Z", "version": "1.3.0", "by": ["BomBa"], "comment": "توحيد استيرادات الغلاف الجذري عبر Alias" },
 *   { "date": "2026-09-27T08:30:00Z", "version": "1.4.0", "by": ["BomBa"], "comment": "إزالة الكود الميت وإصلاح أخطاء TypeScript" },
 *   { "date": "2026-10-08", "version": "1.5.0", "by": ["BomBa"], "comment": "تركيب طبقة الخلفية الزخرفية AppBackground خلف المحتوى" }
 * ]
 */

import { AppBackground, Div as Div1, Main, Outlet, StatusBar, i18next, useEffect, useRouterState, useSettingsStore } from '@a'
import { getRouteLanguage } from '@/app/router/router.config'

/** @description يزامن اللغة والثيم مع وثيقة HTML ثم يعرض شجرة الراوتر. */
export function RootLayout() {
  const language = useSettingsStore((state) => state.language)
  const setLanguage = useSettingsStore((state) => state.setLanguage)
  const theme = useSettingsStore((state) => state.theme)
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  useEffect(() => {
    const documentLanguage = getRouteLanguage(pathname, language)
    if (documentLanguage !== language) {
      setLanguage(documentLanguage)
      return
    }
    document.documentElement.lang = documentLanguage
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dataset.theme = theme
    void i18next.changeLanguage(documentLanguage)
  }, [language, pathname, setLanguage, theme])

  return (
    <Div1 className="flex min-h-screen flex-col">
      <AppBackground />
      <Main className="flex-1">
        <Outlet />
      </Main>
      <StatusBar />
    </Div1>
  )
}
