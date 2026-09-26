/**
 * @file        : src/components/BUI-O/States.tsx
 * @description : حالات واجهة مركبة للفراغ والأخطاء مبنية فوق مكونات BUI-2.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إضافة حالات Empty وError" }
 * ]
 */

import { type HTMLAttributes } from '@a'
import { Button2, Card2, P, Span } from '../BUI-2'

export interface I_EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  message?: string
  actionLabel?: string
  onAction?: () => void
}

/** @description حالة فارغة قابلة لإعادة الاستخدام مع إجراء اختياري. */
export const EmptyState = ({
  title,
  message,
  actionLabel,
  onAction,
  className = '',
  ...restProps
}: I_EmptyStateProps) => (
  <Card2
    {...restProps}
    role="status"
    className={`items-center text-center ${className}`}
  >
    <Span className="text-lg font-semibold text-te">{title}</Span>
    {message && <P className="text-sm text-sn">{message}</P>}
    {actionLabel && onAction && (
      <Button2 type="button" onClick={onAction}>
        {actionLabel}
      </Button2>
    )}
  </Card2>
)

export interface I_ErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  message?: string
  actionLabel?: string
  onAction?: () => void
}

/** @description حالة خطأ مرئية مع إجراء إعادة المحاولة اختياري. */
export const ErrorState = ({
  title,
  message,
  actionLabel,
  onAction,
  className = '',
  ...restProps
}: I_ErrorStateProps) => (
  <Card2
    {...restProps}
    role="alert"
    className={`items-center border-err text-center ${className}`}
  >
    <Span className="text-lg font-semibold text-err">{title}</Span>
    {message && <P className="text-sm text-sn">{message}</P>}
    {actionLabel && onAction && (
      <Button2 type="button" variant="danger" onClick={onAction}>
        {actionLabel}
      </Button2>
    )}
  </Card2>
)
