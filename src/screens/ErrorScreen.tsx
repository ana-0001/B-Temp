/**
 * @file        : src/screens/ErrorScreen.tsx
 * @description : شاشة خطأ عامة بإجراء إعادة محاولة اختياري.
 * @updated     : [
 *   { "date": "2026-09-26T00:00:00Z", "version": "1.2.0", "by": ["BomBa"], "comment": "إضافة شاشة الخطأ الأساسية" }
 * ]
 */

import { ErrorState, useTranslation } from '@a'

export interface I_ErrorScreenProps {
  onRetry?: () => void
}

/** @description تعرض رسالة خطأ مترجمة مع إعادة تشغيل اختيارية للواجهة. */
export function ErrorScreen({ onRetry }: I_ErrorScreenProps) {
  const { t } = useTranslation('common')

  return (
    <ErrorState
      title={t('system.error.title')}
      message={t('system.error.message')}
      actionLabel={onRetry ? t('system.error.retry') : undefined}
      onAction={onRetry}
      className="mx-auto min-h-screen max-w-2xl justify-center border-0 shadow-none"
    />
  )
}
