/**
 * @file        : src/components/branding/Logo.tsx
 * @description : مكوّن الشعار المركزي المستخدم في كل أماكن النظام.
 * @updated     : [{ "date": "2026-09-28", "version": "1.0.0", "by": ["BomBa"], "comment": "إضافة مكوّن الشعار القابل لإعادة الاستخدام" }]
 */

import { type ImgHTMLAttributes } from '@a'

interface I_LogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  alt?: string
  showName?: boolean
  tagline?: string
}

/** @description بيعرض شعار النظام من مصدر واحد مع إمكانية إظهار الاسم والوصف. */
export function Logo({ alt = 'BomBa', showName = false, tagline, className = '', ...props }: I_LogoProps) {
  return (
    <span className={`app-logo ${className}`.trim()}>
      <img {...props} src="/assets/Logo-favicon.svg" alt={alt} />
      {showName ? <span className="app-logo__copy"><strong>BomBa</strong>{tagline ? <small>{tagline}</small> : null}</span> : null}
    </span>
  )
}
