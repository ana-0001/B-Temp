/**
 * @file        : src/screens/HomeScreen.tsx
 * @description : الشاشة الرئيسية المؤقتة لعرض جاهزية أساس التطبيق.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إضافة الشاشة الرئيسية المؤقتة" }
 * ]
 */

import { i18next } from '../i18n/config'
import { Button2, Card2 } from '../components/BUI-2'
import { Div1, H1, P } from '../components/BUI-1'

export function HomeScreen() {
  const t = (key: string) => i18next.t(key, { ns: 'common' })

  return (
    <Div1 className="flex w-full flex-col gap-6">
      <H1 className="text-xl font-bold text-te">{t('appName')}</H1>
      <Card2 title={t('foundation.title')}>
        <P className="text-sn">{t('foundation.message')}</P>
        <Button2 type="button">{t('foundation.action')}</Button2>
      </Card2>
    </Div1>
  )
}
