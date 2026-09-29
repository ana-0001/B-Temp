/**
 * @file        : src/components/settings/ToggleLanguage.tsx
 * @description : زر تبديل اللغة بين الإنجليزية والعربية.
 * @updated     : [{ "date": "2026-09-28", "version": "1.0.0", "by": ["BomBa"], "comment": "إعادة بناء الزر" }]
 */

import { BTooltip, Button, cn, IconGlobe, P, useLanguage, useTranslation } from '@a'

/** @description بيبدّل اللغة الحالية ويعرض اللغة التالية للمستخدم. */
export function ToggleLanguage({ className = null }: { className?: string | null | undefined }) {
  const { t } = useTranslation('common')
  const { language, setLanguage } = useLanguage()
  const nextLanguage = language === 'en' ? 'ar' : 'en'
  const label = nextLanguage === 'ar' ? t('languages.ar') : t('languages.en')

  //   rounded border border-br bg-bg transition-colors hover:bg-py/10
  return (
    <BTooltip
      side="top"
      align="center"
      content={
        <P className="m-0 text-xs leading-normal text-md">{`${t('controls.language')}: ${label}`}</P>
      }
    >
      <Button
        type="button"
        className={cn(
          'relative flex min-h-8 min-w-8 items-center justify-center gap-1 px-2 text-tt',
          className,
        )}
        aria-label={t('controls.language')}
        // title={t('controls.language')}
        onClick={() => setLanguage(nextLanguage)}
      >
        <IconGlobe aria-hidden="true" className="size-4" />
      </Button>
    </BTooltip>
  )
}
