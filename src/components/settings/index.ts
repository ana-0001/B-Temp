/**
 * @file        : src/components/settings/index.ts
 * @description : ملف تصدير مكونات/ملحقات الضبط
 * @updated     : [
 *   { "date": "2026-09-27", "version": "1.0.0", "by": ["BomBa"], "comment": "توحيد الاستيراد من Core" },
 *   { "date": "2026-10-08", "version": "1.1.0", "by": ["BomBa"], "comment": "تصدير hook إعدادات الخلفية useBackground" }
 * ] 
 */


import { i18next } from '@a';
/** @description استخدام i18next */
export const t = i18next.t.bind(i18next); // ← تصدير مباشر
// ... إعدادات i18next.init()


export {
  useSettingsStore,
  getResolvedTheme,
  applySettingsToDocument,
  useTheme,
  useBackground,
  useLanguage,
  useTimeFormat,
  type T_ThemePreference,
  type T_AppLanguage,
  type T_BackgroundMotion,
  type T_TimeZone
} from './settings.store'
export { ToggleTheme } from './ToggleTheme'
export { ToggleLanguage } from './ToggleLanguage'
