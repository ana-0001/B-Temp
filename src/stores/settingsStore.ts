/**
 * @file        : src/stores/settingsStore.ts
 * @description : تخزين إعدادات اللغة والثيم بشكل مستمر.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إنشاء مخزن الإعدادات" }
 * ]
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface I_SettingsState {
  language: 'ar' | 'en'
  theme: 'light' | 'dark'
  setLanguage: (language: I_SettingsState['language']) => void
  setTheme: (theme: I_SettingsState['theme']) => void
}

export const useSettingsStore = create<I_SettingsState>()(
  persist(
    (set) => ({
      language: 'en',
      theme: 'light',
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'spa-settings' },
  ),
)
