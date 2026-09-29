/**
 * @file        : src/components/status-bar/use-live-clock.ts
 * @description : ساعة حية بتنسيق 12/24 ساعة مع تواريخ القاهرة والميلادي والهجري.
 * @updated     : [{ "date": "2026-09-29", "version": "1.3.0", "by": ["BomBa"], "comment": "استعادة Hook الساعة ومعالجة المنطقة الزمنية" }]
 */

import { React, type T_AppLanguage } from '@a'

const CAIRO_TIMEZONE = 'Africa/Cairo'

export interface LiveClockValue {
  display: string
  cairo24h: string
  gregorian: string
  hijri: string
}

function partsToMap(parts: Intl.DateTimeFormatPart[]): Record<string, string> {
  const map: Record<string, string> = {}
  for (const part of parts) map[part.type] = part.value
  return map
}

function formatNamedDate(date: Date, calendar: 'gregory' | 'islamic-umalqura', locale: string, timeZone: string): string {
  const parts = partsToMap(new Intl.DateTimeFormat(locale, {
    calendar,
    timeZone,
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    era: 'short',
  }).formatToParts(date))
  const monthName = new Intl.DateTimeFormat(locale, { calendar, timeZone, month: 'long' }).format(date)
  return `${parts.weekday ?? ''} : ${parts.day ?? ''} - (${parts.month ?? ''} - ${monthName}) - ${parts.year ?? ''} ${parts.era ?? ''}`
}

/** @description بيحدّث الساعة كل 30 ثانية ويعرض الوقت والتواريخ بالمنطقة المختارة. */
export function useLiveClock(language: T_AppLanguage, timeFormat: '12' | '24', timeZone: string): LiveClockValue {
  const [now, setNow] = React.useState(() => new Date())

  React.useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(intervalId)
  }, [])

  return React.useMemo(() => {
    const locale = language === 'ar' ? 'ar-EG' : 'en-US'
    const display = new Intl.DateTimeFormat(locale, { timeZone, hour: '2-digit', minute: '2-digit', hour12: timeFormat === '12' }).format(now)
    const cairo24h = new Intl.DateTimeFormat(locale, { timeZone: CAIRO_TIMEZONE, hour: '2-digit', minute: '2-digit', hour12: false }).format(now)

    return {
      display,
      cairo24h,
      gregorian: formatNamedDate(now, 'gregory', locale, timeZone),
      hijri: formatNamedDate(now, 'islamic-umalqura', locale, timeZone),
    }
  }, [language, now, timeFormat, timeZone])
}
