/**
 * @file        : src/components/layout/PageContainer.tsx
 * @description : حاوية موحدة لمحتوى صفحات التطبيق مع عرض متجاوب.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إنشاء حاوية الصفحات" }
 * ]
 */

import type * as React from 'react'
import { Div1 } from '../BUI-1'

export interface I_PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'wide'
}

/** @description حاوية تضبط عرض الصفحة والمسافات الداخلية بشكل موحد. */
export const PageContainer = ({ size = 'default', className = '', ...restProps }: I_PageContainerProps) => {
  const sizeClassName = size === 'wide' ? 'max-w-7xl' : 'max-w-5xl'

  return (
    <Div1
      {...restProps}
      className={`mx-auto w-full ${sizeClassName} px-4 py-6 sm:px-6 lg:px-8 ${className}`}
    />
  )
}
