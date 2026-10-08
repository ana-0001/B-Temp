/**
 * @file        : src/components/settings/ToggleTheme.tsx
 * @description : زر تبديل الثيم الفاتح والداكن.
 * @updated     : [{ "date": "2026-09-28", "version": "1.0.0", "by": ["BomBa"], "comment": "إعادة بناء الزر" },
 *   { "date": "2026-10-04", "version": "1.0.1", "by": ["BomBa"], "comment": "إزالة كلاس text-md غير الموجود في Tailwind 4 — الظهور يظل text-xs كما كان" }]
 */

import { BTooltip, Button, cn, IconMoon, IconSun, P, useSettingsStore, useTranslation } from '@a'

/** @description بيبدّل الثيم الحالي ويحافظ على اسم الوصول المناسب. */
export function ToggleTheme({ className = null }: { className?: string | null | undefined }) {
  const { t } = useTranslation('common')
  const theme = useSettingsStore((state) => state.theme)
  const setTheme = useSettingsStore((state) => state.setTheme)
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  const label = nextTheme === 'dark' ? t('themes.dark') : t('themes.light')

  // "relative grid min-h-8 min-w-8 place-items-center rounded border border-br bg-bg text-tt transition-colors hover:bg-py/10",
  return (
        <BTooltip
          side="top"
          align="center"
          content={<P className="m-0 text-xs leading-normal">{`${t('controls.theme')}: ${label}`}</P>}
        >
          <Button
            type="button"
            className={cn(
              'relative flex min-h-8 min-w-8 items-center justify-center gap-1 px-2 text-tt',
              className,
            )}
            aria-label={t(`themes.${nextTheme}`)}
            // title={t(`themes.${nextTheme}`)}
            onClick={() => setTheme(nextTheme)}
          >
            {theme === 'light' ? (
              <IconMoon aria-hidden="true" className="size-4" />
            ) : (
              <IconSun aria-hidden="true" className="size-4" />
            )}
          </Button>
        </BTooltip>
  )
}
