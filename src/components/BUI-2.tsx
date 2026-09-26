/**
 * @file        : src/components/BUI-2.tsx
 * @description : مكونات واجهة قابلة لإعادة الاستخدام مبنية فوق أغلفة BUI-1.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إنشاء أول دفعة من مكونات BUI-2" }
 * ]
 */

import type * as React from 'react'
import { Button, Div1, Div5, Input, Label, Span } from './BUI-1'
import { buildProps } from '../utils/build-props'

export interface I_Button2Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
}

/** @description زر موحّد بمتغيرات دلالية من نظام التصميم. */
export const Button2 = ({ variant = 'primary', className = '', ...restProps }: I_Button2Props) => {
  const variantClassName = {
    primary: 'bg-py text-bg',
    secondary: 'border border-br bg-bg text-tt',
    danger: 'bg-err text-bg',
  }[variant]

  return (
    <Button
      {...buildProps({
        ...restProps,
        className: `flex min-h-11 items-center justify-center gap-2 px-4 py-2 text-base font-semibold B:rounded-2 B:transition-smooth ${variantClassName} ${className}`,
      })}
    />
  )
}

export interface I_Input2Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  classGroup?: string
  classLabel?: string
  classInput?: string
}

/** @description حقل إدخال موحّد مع Label ورسالة خطأ اختيارية. */
export const Input2 = ({
  id,
  label,
  error,
  className = '',
  classGroup = '',
  classLabel = '',
  classInput = '',
  ...restProps
}: I_Input2Props) => {
  const errorId = id ? `${id}-error` : undefined

  return (
    <Div5 className={`flex w-full flex-col gap-2 ${classGroup}`}>
      {label && (
        <Label htmlFor={id} className={`text-sm font-medium text-te B:font-var ${classLabel}`}>
          {label}
        </Label>
      )}
      <Input
        {...buildProps({
          ...restProps,
          id,
          'aria-invalid': Boolean(error),
          'aria-describedby': errorId,
          className: `w-full border border-br bg-bg px-4 py-2 text-base text-tt outline-none B:rounded-2 B:transition-smooth focus:border-py ${classInput} ${className}`,
        })}
      />
      {error && (
        <Span id={errorId} role="alert" className="text-sm text-err">
          {error}
        </Span>
      )}
    </Div5>
  )
}

export interface I_Card2Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
}

/** @description بطاقة دلالية اختيارية العنوان للمحتوى العام. */
export const Card2 = ({ title, className = '', children, ...restProps }: I_Card2Props) => (
  <Div1
    {...buildProps({
      ...restProps,
      className: `relative flex w-full flex-col gap-4 border border-br bg-bg p-4 B:rounded-2 B:shadow-md ${className}`,
    })}
  >
    {title && <Span className="text-lg font-semibold text-te">{title}</Span>}
    {children}
  </Div1>
)

export interface I_Badge2Props extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'success' | 'danger' | 'warning'
}

/** @description شارة قصيرة لحالة أو تصنيف دلالي. */
export const Badge2 = ({ tone = 'default', className = '', ...restProps }: I_Badge2Props) => {
  const toneClassName = {
    default: 'bg-md text-bg',
    success: 'bg-ok text-bg',
    danger: 'bg-err text-bg',
    warning: 'bg-war text-bg',
  }[tone]

  return <Span {...buildProps({ ...restProps, className: `inline-flex px-2 py-1 text-sm B:rounded-full ${toneClassName} ${className}` })} />
}

export interface I_Spinner2Props extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
}

/** @description مؤشر تحميل بصري مع اسم وصول اختياري. */
export const Spinner2 = ({ label, className = '', ...restProps }: I_Spinner2Props) => (
  <Div5
    {...buildProps({
      ...restProps,
      role: 'status',
      'aria-label': label,
      className: `size-6 animate-spin rounded-full border-2 border-br border-t-py ${className}`,
    })}
  />
)

/** @description مساحة تحميل مؤقتة للمحتوى غير الجاهز. */
export const Skeleton2 = ({ className = '', ...restProps }: React.HTMLAttributes<HTMLDivElement>) => (
  <Div5
    {...buildProps({
      ...restProps,
      'aria-hidden': true,
      className: `min-h-4 w-full animate-pulse bg-md B:rounded-2 ${className}`,
    })}
  />
)

export { P, Span } from './BUI-1'
