/**
 * @file        : src/utils/build-props.ts
 * @description : تنظيف خصائص مكونات الواجهة قبل تمريرها لعناصر HTML.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إنشاء أداة تنظيف الخصائص" }
 * ]
 */

import type * as React from 'react'

/**
 * @description تنظيف className وstyle مع الحفاظ على باقي الخصائص.
 */
export const buildProps = <T extends { className?: string; style?: React.CSSProperties }>(props: T): T => {
  const { className, style, ...rest } = props

  return {
    ...rest,
    ...(className?.trim() ? { className: className.trim() } : {}),
    ...(style && Object.keys(style).length > 0 ? { style } : {}),
  } as T
}
