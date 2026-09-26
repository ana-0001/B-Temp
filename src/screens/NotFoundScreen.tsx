/**
 * @file        : src/screens/NotFoundScreen.tsx
 * @description : شاشة موحّدة للمسارات غير الموجودة.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إضافة شاشة المسار غير الموجود" }
 * ]
 */

import { i18next } from '../i18n/config'
import { Card2 } from '../components/BUI-2'
import { Div1, H1, P } from '../components/BUI-1'

/** @description تعرض رسالة مترجمة عند طلب مسار غير معروف. */
export function NotFoundScreen() {
  const t = (key: string) => i18next.t(key, { ns: 'common' })

  return (
    <Div1 className="flex w-full flex-col items-center gap-6 text-center">
      <Card2>
        <H1 className="text-xl font-bold text-te">{t('notFound.title')}</H1>
        <P className="text-sn">{t('notFound.message')}</P>
      </Card2>
    </Div1>
  )
}
