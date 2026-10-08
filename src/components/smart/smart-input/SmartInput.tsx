/**
 * @file        : src/components/smart/smart-input/SmartInput.tsx
 * @description : حقل إدخال ذكي — مسح، إظهار كلمة مرور، وحالات تحقق مرتبطة بالـ ARIA (PRD §11 بدون combobox — مؤجل).
 * @updated     : [
 *   { "date": "2026-10-08", "version": "1.0.0", "by": ["BomBa"], "comment": "إنشاء SmartInput وفق العقد المرجعي" }
 * ]
 */

import {
  Button,
  Div as Div1,
  IconCheck,
  IconEye,
  IconEyeOff,
  IconX,
  Input,
  Label,
  Span,
  cn,
  useState,
  useTranslation,
  type ChangeEvent,
  type InputHTMLAttributes,
} from '@a'

export interface I_SmartInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  /** وصف مساعد يظهر تحت الحقل — بيستبدل برسالة الخطأ عند وجودها */
  description?: string
  /** رسالة خطأ — وجودها يفعل حالة الخطأ ويربطها بالحقل عبر aria-describedby */
  error?: string
  /** عرض علامة نجاح — مفعلة فقط لو مفيش خطأ وفيه قيمة */
  success?: boolean
  /** رد نداء المسح — مطلوب لظهور زر المسح، وفي الوضع المتحكم فيه هو المسؤول عن تفريغ القيمة */
  onClear?: () => void
  classGroup?: string
  classLabel?: string
  classInput?: string
}

/**
 * @description حقل إدخال ذكي بتركيبة مطابقة لأنماط Input2 مع إضافة actions متراكبة داخل الحقل.
 * @remarks عقد المسح: زر المسح يظهر فقط لو onClear موجود — وفي الوضع المتحكم فيه (value) المالك هو اللي بيفرغ القيمة.
 */
export function SmartInput({
  label,
  description,
  error,
  success = false,
  onClear,
  defaultValue,
  value,
  onChange,
  type = 'text',
  disabled,
  readOnly,
  id,
  classGroup = '',
  classLabel = '',
  classInput = '',
  ...restProps
}: I_SmartInputProps) {
  const { t } = useTranslation('common')
  const [internalValue, setInternalValue] = useState(() =>
    typeof defaultValue === 'string' ? defaultValue : '',
  )
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const isControlled = value !== undefined
  const shownValue = isControlled ? String(value) : internalValue

  /** @description تمرير التغيير للمالك مع مزامنة الحالة الداخلية في الوضع الحر فقط — بدون منافسة state (PRD §10.2). */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(event.target.value)
    onChange?.(event)
  }

  /** @description مسح القيمة — داخلياً في الوضع الحر، وعبر onClear في الوضع المتحكم فيه. */
  const handleClear = () => {
    if (!isControlled) setInternalValue('')
    onClear?.()
  }

  const showClearButton = Boolean(onClear) && !disabled && !readOnly && shownValue.length > 0
  const showPasswordToggle = type === 'password' && !disabled
  const showSuccessIcon = success && !error && shownValue.length > 0
  const trailingCount = [showClearButton, showPasswordToggle, showSuccessIcon].filter(Boolean).length
  const trailingPadding = trailingCount >= 2 ? 'pe-20' : trailingCount === 1 ? 'pe-11' : ''
  const inputType = type === 'password' && isPasswordVisible ? 'text' : type
  const errorId = id ? `${id}-error` : undefined
  const descriptionId = id ? `${id}-description` : undefined

  return (
    <Div1 className={cn('flex w-full flex-col gap-2', classGroup)}>
      {label && (
        <Label htmlFor={id} className={cn('text-sm font-medium text-te B:font-var', classLabel)}>
          {label}
        </Label>
      )}
      <Div1 className="relative flex items-center">
        <Input
          {...restProps}
          id={id}
          type={inputType}
          value={shownValue}
          onChange={handleChange}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? errorId : description ? descriptionId : undefined}
          className={cn(
            'w-full border bg-bg px-4 py-2 text-base text-tt outline-none B:rounded-2 B:transition-smooth focus:border-py',
            error ? 'border-err' : success ? 'border-ok' : 'border-br',
            trailingPadding,
            classInput,
          )}
        />
        {trailingCount > 0 && (
          <Div1 className="absolute inset-y-0 end-0 flex items-center gap-1 pe-3">
            {showSuccessIcon && <IconCheck aria-hidden="true" className="size-4 text-ok" />}
            {showPasswordToggle && (
              <Button
                type="button"
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                aria-pressed={isPasswordVisible}
                aria-label={isPasswordVisible ? t('smartInput.hidePassword') : t('smartInput.showPassword')}
                className="flex min-h-8 min-w-8 items-center justify-center text-sn"
              >
                {isPasswordVisible ? (
                  <IconEyeOff aria-hidden="true" className="size-4" />
                ) : (
                  <IconEye aria-hidden="true" className="size-4" />
                )}
              </Button>
            )}
            {showClearButton && (
              <Button
                type="button"
                onClick={handleClear}
                aria-label={t('smartInput.clear')}
                className="flex min-h-8 min-w-8 items-center justify-center text-sn"
              >
                <IconX aria-hidden="true" className="size-4" />
              </Button>
            )}
          </Div1>
        )}
      </Div1>
      {error ? (
        <Span id={errorId} role="alert" className="text-sm text-err">
          {error}
        </Span>
      ) : description ? (
        <Span id={descriptionId} className="text-sm text-sn">
          {description}
        </Span>
      ) : null}
    </Div1>
  )
}
