/**
 * @file        : src/stores/authStore.ts
 * @description : حالة جلسة المستخدم بدون افتراض شكل التوكن أو عقد الـ Backend.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إنشاء مخزن المصادقة الأساسي" }
 * ]
 */

import { create } from 'zustand'

interface I_AuthState {
  accessToken?: string
  setAccessToken: (accessToken?: string) => void
  clearSession: () => void
}

export const useAuthStore = create<I_AuthState>((set) => ({
  accessToken: undefined,
  setAccessToken: (accessToken) => set({ accessToken }),
  clearSession: () => set({ accessToken: undefined }),
}))
