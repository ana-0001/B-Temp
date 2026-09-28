/**
 * @file        : src/screens/SplashScreen.tsx
 * @description : شاشة التحميل الأولية قبل جاهزية التطبيق.
 * @updated     : [
 *   { "date": "2026-09-26T00:00:00Z", "version": "1.2.0", "by": ["BomBa"], "comment": "إضافة شاشة التحميل الأساسية" }
 * ]
 */

import { Card2, Div as Div1, Span, Spinner2, useTranslation } from '@a'

/** @description تعرض حالة التحميل العامة بشكل متوافق مع الثيم واللغة. */
export function SplashScreen() {
  const { t } = useTranslation('common')

  return (
    <Div1 className="flex min-h-screen items-center justify-center bg-bg p-4">
      <Card2 className="max-w-sm items-center text-center">
        <Spinner2 label={t('loading')} />
        <Span className="text-sm text-sn">{t('system.splash')}</Span>
      </Card2>
    </Div1>
  )
}
