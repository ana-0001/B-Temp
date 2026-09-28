/**
 * @file        : src/screens/NotFoundScreen.tsx
 * @description : شاشة موحّدة للمسارات غير الموجودة عبر نظام Alias المركزي.
 * @updated     : [
 *   { "date": "2026-09-26T17:33:00+03:00", "version": "1.1.0", "by": ["BomBa"], "comment": "استخدام نظام Alias المركزي @a والأيقونات" }
 * ]
 */

import {
  Button2,
  Card2,
  Div as Div1,
  H1,
  IconAlertTriangle,
  Link,
  P,
  useTranslation,
} from '@a'

/** @description تعرض رسالة مترجمة عند طلب مسار غير معروف مع زر عودة للرئيسية. */
export function NotFoundScreen() {
  const { t } = useTranslation('common')

  return (
    <Div1 className="flex w-full flex-col items-center justify-center gap-6 py-12 text-center">
      <Card2 className="max-w-md items-center">
        <IconAlertTriangle className="size-12 text-err" />
        <H1 className="text-xl font-bold text-te">{t('notFound.title')}</H1>
        <P className="text-sm text-sn">{t('notFound.message')}</P>
        <Link to="/" className="mt-2 inline-flex">
          <Button2 type="button" variant="primary">
            {t('foundation.action')}
          </Button2>
        </Link>
      </Card2>
    </Div1>
  )
}
