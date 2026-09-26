/**
 * @file        : src/i18n/config.ts
 * @description : إعداد i18next المركزي مع initReactI18next بموارد اللغتين الافتراضيتين.
 * @updated     : [
 *   { "date": "2026-09-26T17:32:00+03:00", "version": "1.1.0", "by": ["BomBa"], "comment": "ربط initReactI18next بموارد الترجمة" }
 * ]
 */

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from './locales/en/common.json'
import arCommon from './locales/ar/common.json'

void i18next
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { common: enCommon },
      ar: { common: arCommon },
    },
  })

export { i18next }
