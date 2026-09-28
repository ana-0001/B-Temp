/**
 * @file        : src/components/settings/settings.store.ts
 * @description : مخزن Zustand لحفظ الثيم واللغة بين جلسات التطبيق.
 * @updated     : [{ "date": "27/08/2026", "version": "1.0.0", "by": ["BomBa"], "comment": "إضافة إعدادات الثيم واللغة" }]
 */

import { create, persist } from '@a'

export type T_ThemePreference = 'light' | 'dark' | 'system'
export type T_AppLanguage = 'en' | 'ar'
export type T_BackgroundMotion = 'full' | 'calm' | 'off'
export type T_TimeZone = 'Africa/Cairo' | 'Asia/Riyadh' | 'Europe/London' | 'America/New_York'

/** @interface إعدادات المستخدم */
export interface SettingsState {
  theme: T_ThemePreference
  language: T_AppLanguage
  timeFormat: '12' | '24'
  timeZone: T_TimeZone
  showBackground: boolean
  backgroundMotion: T_BackgroundMotion
  showFocusRing: boolean
  setTheme: (theme: T_ThemePreference) => void
  setTimeFormat: (timeFormat: '12' | '24') => void
  setTimeZone: (timeZone: T_TimeZone) => void
  setLanguage: (language: T_AppLanguage) => void
  setShowBackground: (showBackground: boolean) => void
  toggleBackground: () => void
  setBackgroundMotion: (backgroundMotion: T_BackgroundMotion) => void
  setShowFocusRing: (showFocusRing: boolean) => void
}

/** @hook مخزن إعدادات التطبيق */
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'en',
      timeFormat: '12',
      timeZone: 'Africa/Cairo',
      showBackground: true,
      backgroundMotion: 'full',
      showFocusRing: false,
      setTheme: (theme) => set({ theme }),
      setTimeFormat: (timeFormat) => set({ timeFormat }),
      setTimeZone: (timeZone) => set({ timeZone }),
      setLanguage: (language) => set({ language }),
      setShowBackground: (showBackground) => set({ showBackground }),
      toggleBackground: () => set((state) => ({ showBackground: !state.showBackground })),
      setBackgroundMotion: (backgroundMotion) => set({ backgroundMotion }),
      setShowFocusRing: (showFocusRing) => set({ showFocusRing }),
    }),
    {
      name: 'vh-settings',
      version: 1,
    },
  ),
)

/** @function تحديد الثيم بناءً على تفضيلات المستخدم */
export function getResolvedTheme(theme: T_ThemePreference): 'light' | 'dark' {
  if (theme !== 'system') return theme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/** @function تطبيق الإعدادات على مستند HTML */
export function applySettingsToDocument(theme: T_ThemePreference, language: T_AppLanguage, showFocusRing = false): void {
  const root = document.documentElement
  root.dataset.theme = getResolvedTheme(theme)
  root.dataset.focusRing = showFocusRing ? 'visible' : 'hidden'
  root.lang = language
  root.dir = language === 'ar' ? 'rtl' : 'ltr'
  root.style.colorScheme = getResolvedTheme(theme)
}

/** @hook استخدام الثيم مع المُحرّر */
export function useTheme() {
  const theme = useSettingsStore((state) => state.theme)
  const setTheme = useSettingsStore((state) => state.setTheme)
  const resolvedTheme = getResolvedTheme(theme)
  return { theme, resolvedTheme, setTheme }
}

/** @hook استخدام اللغة مع المُحرّر */
export function useLanguage() {
  const language = useSettingsStore((state) => state.language)
  const setLanguage = useSettingsStore((state) => state.setLanguage)
  return { language, setLanguage }
}

/** @hook استخدام تنسيق الوقت مع المُحرّر */
export function useTimeFormat() {
  const timeFormat = useSettingsStore((state) => state.timeFormat)
  const setTimeFormat = useSettingsStore((state) => state.setTimeFormat)
  const timeZone = useSettingsStore((state) => state.timeZone)
  const setTimeZone = useSettingsStore((state) => state.setTimeZone)
  return { timeFormat, setTimeFormat, timeZone, setTimeZone }
}
