/**
 * @file        : src/i18n/config.ts
 * @description : إعداد i18next المركزي بموارد اللغتين الافتراضيتين.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إضافة موارد الترجمة الأساسية" }
 * ]
 */

import i18next from 'i18next'
import enCommon from './locales/en/common.json'
import arCommon from './locales/ar/common.json'

void i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    en: { common: enCommon },
    ar: { common: arCommon },
  },
})

export { i18next }
