/**
 * @file        : src/components/settings/ToggleLanguage.tsx
 * @description : زر تبديل اللغة بين الإنجليزية والعربية.
 * @updated     : [{ "date": "2026-09-28", "version": "1.0.0", "by": ["BomBa"], "comment": "إعادة بناء الزر" }]
 */

import { Button, IconGlobe, Span, useLanguage, useTranslation } from '@a'

/** @description بيبدّل اللغة الحالية ويعرض اللغة التالية للمستخدم. */
export function ToggleLanguage() {
  const { t } = useTranslation('common')
  const { language, setLanguage } = useLanguage()
  const nextLanguage = language === 'en' ? 'ar' : 'en'

  return <Button type="button" className="status-bar-icon-button" aria-label={t('controls.language')} title={t('controls.language')} onClick={() => setLanguage(nextLanguage)}><IconGlobe aria-hidden="true" /><Span>{nextLanguage.toUpperCase()}</Span></Button>
}
