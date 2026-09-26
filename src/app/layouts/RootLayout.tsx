/**
 * @file        : src/app/layouts/RootLayout.tsx
 * @description : الغلاف الجذري الذي يزامن إعدادات اللغة والثيم مع وثيقة HTML.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إضافة الغلاف الجذري" }
 * ]
 */

import { useEffect } from 'react'
import { Outlet } from '@tanstack/react-router'
import { Div1 } from '../../components/BUI-1'
import { i18next } from '../../i18n/config'
import { useSettingsStore } from '../../stores/settingsStore'

export function RootLayout() {
  const language = useSettingsStore((state) => state.language)
  const theme = useSettingsStore((state) => state.theme)

  useEffect(() => {
    const documentLanguage = language === 'ar' ? 'ar' : 'en'
    document.documentElement.lang = documentLanguage
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dataset.theme = theme
    void i18next.changeLanguage(documentLanguage)
  }, [language, theme])

  return (
    <Div1 className="min-h-screen bg-bg text-tt">
      <Outlet />
    </Div1>
  )
}
