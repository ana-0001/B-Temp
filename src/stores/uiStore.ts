/**
 * @file        : src/stores/uiStore.ts
 * @description : تخزين حالة الواجهة المؤقتة غير الدائمة.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إنشاء مخزن الواجهة" }
 * ]
 */

import { create } from 'zustand'

interface I_UIState {
  isLoading: boolean
  setLoading: (isLoading: boolean) => void
}

export const useUIStore = create<I_UIState>((set) => ({
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}))
