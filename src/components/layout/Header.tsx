/**
 * @file        : src/components/layout/Header.tsx
 * @description : رأس التطبيق مع أدوات تغيير اللغة والثيم.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إنشاء رأس التطبيق" }
 * ]
 */

import { i18next } from '../../i18n/config'
import { Button2 } from '../BUI-2'
import { Div1, Header as Header1, Span } from '../BUI-1'
import { useSettingsStore } from '../../stores/settingsStore'

/** @description رأس عام يوفّر أدوات الإعدادات المشتركة للتطبيق. */
export const AppHeader = () => {
  const language = useSettingsStore((state) => state.language)
  const theme = useSettingsStore((state) => state.theme)
  const setLanguage = useSettingsStore((state) => state.setLanguage)
  const setTheme = useSettingsStore((state) => state.setTheme)
  const translate = (key: string) => i18next.t(key, { ns: 'common' })

  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en')
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  return (
    <Header1 className="border-b border-br bg-bg">
      <Div1 className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Span className="text-base font-semibold text-te">{translate('appName')}</Span>
        <Div1 className="flex items-center gap-2">
          <Button2 type="button" variant="secondary" onClick={toggleLanguage} aria-label={translate('controls.language')}>
            {translate(`languages.${language === 'en' ? 'ar' : 'en'}`)}
          </Button2>
          <Button2 type="button" variant="secondary" onClick={toggleTheme} aria-label={translate('controls.theme')}>
            {translate(`themes.${theme === 'light' ? 'dark' : 'light'}`)}
          </Button2>
        </Div1>
      </Div1>
    </Header1>
  )
}
