/**
 * @file        : src/components/settings/ToggleTheme.tsx
 * @description : زر تبديل الثيم الفاتح والداكن.
 * @updated     : [{ "date": "2026-09-28", "version": "1.0.0", "by": ["BomBa"], "comment": "إعادة بناء الزر" }]
 */

import { Button, IconMoon, IconSun, useSettingsStore, useTranslation } from '@a'

/** @description بيبدّل الثيم الحالي ويحافظ على اسم الوصول المناسب. */
export function ToggleTheme() {
  const { t } = useTranslation('common')
  const theme = useSettingsStore((state) => state.theme)
  const setTheme = useSettingsStore((state) => state.setTheme)
  const nextTheme = theme === 'light' ? 'dark' : 'light'

  return <Button type="button" className="status-bar-icon-button" aria-label={t(`themes.${nextTheme}`)} title={t(`themes.${nextTheme}`)} onClick={() => setTheme(nextTheme)}>{theme === 'light' ? <IconMoon aria-hidden="true" /> : <IconSun aria-hidden="true" />}</Button>
}
