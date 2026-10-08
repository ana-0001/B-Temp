/**
 * @file        : src/components/smart/smart-button/SmartButton.tsx
 * @description : زر ذكي فوق Button2 — loading تلقائي للـ async وActionLock يمنع double-submit (PRD §12).
 * @updated     : [
 *   { "date": "2026-10-08", "version": "1.0.0", "by": ["BomBa"], "comment": "إنشاء SmartButton وفق العقد المرجعي" }
 * ]
 */

import {
  Button2,
  IconLoader2,
  useEffect,
  useId,
  useRef,
  useState,
  type I_Button2Props,
  type MouseEvent,
  type ReactNode,
} from '@a'
import { tryAcquireActionLock } from '../action-lock'

export interface I_SmartButtonProps extends Omit<I_Button2Props, 'onClick'> {
  /** أيقونة تظهر قبل المحتوى — من نظام Icon* فقط */
  startIcon?: ReactNode
  /** أيقونة تظهر بعد المحتوى */
  endIcon?: ReactNode
  /** حالة تحميل متحكم فيها — لو مش محددة بتشتغل تلقائياً مع الـ handler اللي بيرجع Promise */
  loading?: boolean
  /** نص بديل يظهر وقت التحميل بدل المحتوى */
  loadingLabel?: string
  /** معالج الضغط — لو رجع Promise بيتشغل التحميل التلقائي والقفل لحد ما يتحل */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>
}

/** @description بيحدد هل القيمة Promise — علشان نشغل التحميل التلقائي. */
function isPromise(value: unknown): value is Promise<unknown> {
  return value instanceof Promise
}

/**
 * @description زر ذكي: loading تلقائي + منع double-submit للـ async handlers — بدون أي API أو routing داخله.
 * @remarks أخطاء الـ handler مسؤولية المستدعي — الزر بيتعامل مع النجاح والفشل بنفس الطريقة (تحرير القفل في finally دايماً).
 */
export function SmartButton({
  startIcon,
  endIcon,
  loading: controlledLoading,
  loadingLabel,
  onClick,
  disabled,
  children,
  ...restProps
}: I_SmartButtonProps) {
  const buttonId = useId()
  const [isRunning, setIsRunning] = useState(false)
  const runningLockRef = useRef<{ release: () => void } | null>(null)

  const isControlledLoading = controlledLoading !== undefined
  const isLoading = isControlledLoading ? controlledLoading : isRunning

  // 🧹 تحرير القفل لو المكون اتفك والتنفيذ لسه شغال (SPECKIT §8.6 — unmount)
  useEffect(
    () => () => {
      runningLockRef.current?.release()
      runningLockRef.current = null
    },
    [],
  )

  /** @description تنفيذ الضغط: متزامن بينفذ فوراً — وasync بيقفل الزر لحد ما يخلص. */
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    // الفحص قبل التنفيذ — الضغط المتكرر أثناء التنفيذ بيتجاهل تماماً (SMART-002)
    if (disabled === true || isLoading || runningLockRef.current !== null) return

    const result = onClick?.(event)
    if (!isPromise(result)) return

    const lock = tryAcquireActionLock(`smart-button:${buttonId}`)
    if (!lock) return // حماية دفاعية — المفروض مستحيلة بعد فحص runningLockRef
    runningLockRef.current = lock
    setIsRunning(true)

    // التحرير دايماً في الحالتين — النجاح والفشل (finally semantics)
    void Promise.resolve(result).then(
      () => undefined,
      () => undefined,
    ).finally(() => {
      lock.release()
      runningLockRef.current = null
      setIsRunning(false)
    })
  }

  return (
    <Button2 {...restProps} onClick={handleClick} disabled={disabled} aria-busy={isLoading}>
      {isLoading ? <IconLoader2 aria-hidden="true" className="size-4 animate-spin" /> : startIcon}
      {isLoading && loadingLabel ? loadingLabel : children}
      {!isLoading && endIcon}
    </Button2>
  )
}
