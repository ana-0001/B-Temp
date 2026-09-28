/**
 * @file        : src/components/layout/Header.tsx
 * @description : رأس التطبيق مع أدوات تغيير اللغة والثيم والأيقونات الدلالية عبر نظام Alias.
 * @updated     : [
 *   { "date": "2026-09-26T17:33:00+03:00", "version": "1.1.0", "by": ["BomBa"], "comment": "استخدام نظام Alias وتضمين الأيقونات ببادئة Icon" }
 * ]
 */

import {
  Button2,
  Div as Div1,
  Header as Header1,
  IconLanguages,
  IconMoon,
  IconSun,
  Span,
  useSettingsStore,
  useTranslation
} from '@a'

/** @description رأس عام يوفّر أدوات الإعدادات المشتركة للتطبيق. */
export const AppHeader = () => {
  const { t } = useTranslation('common')
  const language = useSettingsStore((state) => state.language)
  const theme = useSettingsStore((state) => state.theme)
  const setLanguage = useSettingsStore((state) => state.setLanguage)
  const setTheme = useSettingsStore((state) => state.setTheme)

  /** @description يبدّل لغة التطبيق ويحافظ على القيم المدعومة فقط. */
  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en')

  /** @description يبدّل الثيم الحالي بين الفاتح والداكن. */
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  return (
    <Header1 className="sticky top-0 z-sticky border-b border-br bg-surface/90 backdrop-blur-sm">
      <Div1 className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Span className="text-base font-bold text-te tracking-tight">{t('appName')}</Span>
        <Div1 className="flex items-center gap-2">
          <Button2
            type="button"
            variant="secondary"
            onClick={toggleLanguage}
            aria-label={t('controls.language')}
            className="flex items-center gap-1.5 text-sm"
          >
            <IconLanguages className="size-4 text-py" />
            <Span>{t(`languages.${language === 'en' ? 'ar' : 'en'}`)}</Span>
          </Button2>
          <Button2
            type="button"
            variant="secondary"
            onClick={toggleTheme}
            aria-label={t('controls.theme')}
            className="flex items-center gap-1.5 text-sm"
          >
            {theme === 'light' ? (
              <IconMoon className="size-4 text-sy" />
            ) : (
              <IconSun className="size-4 text-war" />
            )}
            <Span>{t(`themes.${theme === 'light' ? 'dark' : 'light'}`)}</Span>
          </Button2>
        </Div1>
      </Div1>
    </Header1>
  )
}
