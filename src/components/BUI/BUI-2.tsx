/**
 * @file        : src/components/BUI-2.tsx
 * @description : مكونات واجهة قابلة لإعادة الاستخدام مبنية فوق أغلفة BUI-1.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إنشاء أول دفعة من مكونات BUI-2" }
 * ]
 */

import { Button, Div as Div1, Div as Div5, Input, Label, Span, buildProps, cn, type ButtonHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes } from '@a'

export interface I_Button2Props extends ButtonHTMLAttributes<HTMLButtonElement> {
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

export interface I_Input2Props extends InputHTMLAttributes<HTMLInputElement> {
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

export interface I_Card2Props extends HTMLAttributes<HTMLDivElement> {
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

export interface I_Badge2Props extends HTMLAttributes<HTMLSpanElement> {
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

export interface I_Spinner2Props extends HTMLAttributes<HTMLDivElement> {
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
export const Skeleton2 = ({ className = '', ...restProps }: HTMLAttributes<HTMLDivElement>) => (
  <Div5
    {...buildProps({
      ...restProps,
      'aria-hidden': true,
      className: `min-h-4 w-full animate-pulse bg-md B:rounded-2 ${className}`,
    })}
  />
)


// #region { Hr }
// ==========================================
// الأنواع والواجهات (Types & Interfaces)
// ==========================================
import styles from './styles/hr.module.css'

/** @description النوع/ الاتجاه للفاصل */
export type T_HrOrientation = 'horizontal' | 'vertical'
/** @description النوع/ النمط للفاصل */
export type T_HrVariant = 'solid' | 'dashed' | 'dotted' | 'double' | 'gradient' | 'glow' | 'shadow'
/** @description النوع/ السماكة للفاصل */
export type T_HrThickness = 'thin' | 'medium' | 'thick' | 'bold'
/** @description النوع/ اللون للفاصل */
export type T_HrColor = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'muted'
/** @description النوع/ المسافات للفاصل */
export type T_HrSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
/** @description النوع/ المحاذاة للفاصل */
export type T_HrAlign = 'start' | 'center' | 'end'

/** @description واجهة الفاصل */
export interface I_Hr {
  /** اتجاه الفاصل: أفقي أو رأسي */
  orientation?: T_HrOrientation
  /** نمط الفاصل البصري */
  variant?: T_HrVariant
  /** سماكة الفاصل */
  thickness?: T_HrThickness
  /** لون الفاصل */
  color?: T_HrColor
  /** المسافات حول الفاصل */
  spacing?: T_HrSpacing
  /** طول الفاصل (مثل: '100%', '200px', '50vh') */
  length?: string | number
  /** نص أو محتوى يظهر داخل الفاصل */
  label?: React.ReactNode
  /** محاذاة النص داخل الفاصل */
  labelAlign?: T_HrAlign
  /** أيقونة تظهر داخل الفاصل */
  icon?: React.ReactNode
  /** تفعيل تأثير الحركة عند الظهور */
  animated?: boolean
  /** لون مخصص (يطبق كـ CSS variable) */
  customColor?: string
  /** كلاسات إضافية */
  className?: string
  /** أنماط CSS inline إضافية */
  style?: React.CSSProperties
  /** تسمية الوصف لإمكانية الوصول */
  'aria-label'?: string
  /** إخفاء الفاصل من قارئات الشاشة */
  decorative?: boolean
}

/**
 * @description مكون فاصل احترافي متعدد الاستخدامات مع دعم أفقي ورأسي وتخصيص كامل
 * @example
 * // فاصل أفقي بسيط
 * <Hr />
 *
 * @example
 * // فاصل رأسي بين عناصر
 * <Hr orientation="vertical" length="24px" />
 *
 * @example
 * // فاصل مع نص وأيقونة
 * <Hr label="أو" variant="gradient" color="primary" />
 *
 * @example
 * // فاصل بتصميم متوهج
 * <Hr variant="glow" color="success" thickness="thick" animated />
 */
export function Hr({
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 'thin',
  color = 'default',
  spacing = 'none',
  length,
  label,
  labelAlign = 'center',
  icon,
  animated = false,
  customColor,
  className,
  style,
  'aria-label': ariaLabel,
  decorative = true,
}: I_Hr) {
  const hasContent = Boolean(label || icon)
  const isVertical = orientation === 'vertical'

  // بناء أنماط CSS المخصصة
  const customStyles: React.CSSProperties = {
    ...style,
    ...(length && { [isVertical ? 'height' : 'width']: typeof length === 'number' ? `${length}px` : length }),
    ...(customColor && { ['--hr-custom-color' as string]: customColor }),
  }

  // بناء الكلاسات
  const wrapperClasses = cn(
    styles.hr,
    styles[`orientation-${orientation}`],
    styles[`variant-${variant}`],
    styles[`thickness-${thickness}`],
    styles[`color-${color}`],
    styles[`spacing-${spacing}`],
    hasContent && styles.withContent,
    hasContent && styles[`align-${labelAlign}`],
    animated && styles.animated,
    customColor && styles.customColor,
    className
  )

  // خصائص إمكانية الوصول
  const a11yProps = decorative
    ? { role: 'none' as const, 'aria-hidden': true }
    : { role: 'separator' as const, 'aria-orientation': orientation, 'aria-label': ariaLabel }

  // === حالة الفاصل مع محتوى (نص/أيقونة) ===
  if (hasContent && !isVertical) {
    return (
      <Div1 className={wrapperClasses} style={customStyles} {...a11yProps}>
        <Span className={styles.line} aria-hidden="true" />
        <Span className={styles.content}>
          {icon && <Span className={styles.icon}>{icon}</Span>}
          {label && <Span className={styles.label}>{label}</Span>}
        </Span>
        <Span className={styles.line} aria-hidden="true" />
      </Div1>
    )
  }

  // === حالة الفاصل البسيط (بدون محتوى) ===
  return <Div5 className={wrapperClasses} style={customStyles} {...a11yProps} />
}

// ==========================================
// مكونات مساعدة اختصارية (Preset Components)
// ==========================================

/**
 * @description فاصل رأسي جاهز مع إعدادات افتراضية مناسبة
 */
export function HrVertical(props: Omit<I_Hr, 'orientation'>) {
  return <Hr orientation="vertical" spacing="sm" {...props} />
}
/**
 * @description فاصل متوهج جاهز مع تأثيرات بصرية جذابة
 */
export function HrGlow(props: Omit<I_Hr, 'variant'>) {
  return <Hr variant="glow" animated {...props} />
}
/**
 * @description فاصل متدرج جاهز مع تأثير gradient
 */
export function HrGradient(props: Omit<I_Hr, 'variant'>) {
  return <Hr variant="gradient" {...props} />
}

/*

** حالات الاستخدام الشائعة:**
// فاصل في نموذج تسجيل الدخول
<div className="login-form">
  <SocialLoginButtons />
  <Hr label="أو سجل بالبريد الإلكتروني" variant="gradient" spacing="lg" />
  <EmailLoginForm />
</div>

// فواصل رأسية في شريط الحالة
<StatusBar>
  <Version />
  <HrVertical length="16px" spacing="sm" />
  <Environment />
  <HrVertical length="16px" spacing="sm" />
  <Time />
</StatusBar>

// فاصل قسم بتصميم جذاب
<Hr
  label="الإعدادات المتقدمة"
  icon={<IconSettings />}
  variant="glow"
  color="primary"
  animated
  thickness="medium"
/>

---

### 📖 دليل الاستخدام الشامل:

#### **1️⃣ الاستخدامات الأساسية:**

```tsx
// فاصل أفقي بسيط
<Hr />

// فاصل رأسي بين أزرار
<div className="flex items-center gap-2">
  <Button>حفظ</Button>
  <Hr orientation="vertical" length="24px" />
  <Button>إلغاء</Button>
</div>

// أو استخدام المكون المختصر
<HrVertical length="24px" />
```

#### **2️⃣ التخصيص المتقدم:**

```tsx
// فاصل متدرج بلون أساسي
<Hr variant="gradient" color="primary" thickness="medium" />

// فاصل متقطع بمسافات كبيرة
<Hr variant="dashed" spacing="lg" color="muted" />

// فاصل متوهج مع حركة
<Hr variant="glow" color="success" thickness="thick" animated />

// فاصل بلون مخصص
<Hr customColor="#ff6b6b" thickness="bold" />
```

#### **3️⃣ فواصل مع نص أو أيقونة:**

```tsx
// فاصل مع كلمة "أو"
<Hr label="أو" variant="gradient" />

// فاصل مع أيقونة
<Hr icon={<IconStar />} color="warning" />

// فاصل مع نص وأيقونة معاً
<Hr icon={<IconCheck />} label="تم" color="success" variant="glow" />

// محاذاة النص لليسار
<Hr label="القسم الأول" labelAlign="start" />
```

#### **4️⃣ حالات الاستخدام الشائعة:**

```tsx
// فاصل في نموذج تسجيل الدخول
<div className="login-form">
  <SocialLoginButtons />
  <Hr label="أو سجل بالبريد الإلكتروني" variant="gradient" spacing="lg" />
  <EmailLoginForm />
</div>

// فواصل رأسية في شريط الحالة
<StatusBar>
  <Version />
  <HrVertical length="16px" spacing="sm" />
  <Environment />
  <HrVertical length="16px" spacing="sm" />
  <Time />
</StatusBar>

// فاصل قسم بتصميم جذاب
<Hr
  label="الإعدادات المتقدمة"
  icon={<IconSettings />}
  variant="glow"
  color="primary"
  animated
  thickness="medium"
/>
```


*/

// #endregion

