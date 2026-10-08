/**
 * @file        : src/components/smart/action-lock.ts
 * @description : خدمة أقفال الإجراءات — تمنع التكرار (double-submit) بشكل مستقل عن أي مكون (SPECKIT §8.6).
 * @updated     : [
 *   { "date": "2026-10-08", "version": "1.0.0", "by": ["BomBa"], "comment": "إنشاء خدمة الأقفال بـ ownership token" }
 * ]
 */

/** مقبض قفل — بيمثل ملكية القفل ويمنع تحريره من جهة غلط */
export interface I_ActionLockHandle {
  readonly key: string
  /** بيحرر القفل فقط لو المقبض ده لسه هو المالك — وإلا no-op */
  release: () => void
}

// خريطة المفاتيح → المقابض المالكة — خدمة مستقلة بدون أي ربط بـ React أو Toast أو Router
const activeLocks = new Map<string, I_ActionLockHandle>()

/**
 * @description بيحاول يحصل على قفل بمفتاح محدد — بيرجع null لو القفل محجوز.
 * @remarks سياسة التعارض الافتراضية drop: الطلب المتكرر بيتجاهل بصمت بدل ما يتراكم.
 */
export function tryAcquireActionLock(key: string): I_ActionLockHandle | null {
  if (activeLocks.has(key)) return null

  const handle: I_ActionLockHandle = {
    key,
    release: () => {
      // الملكية: التحرير ينجح فقط لو المقبض الحالي هو المالك — مقبض قديم لا يفسد قفل جديد
      if (activeLocks.get(key) === handle) activeLocks.delete(key)
    },
  }
  activeLocks.set(key, handle)
  return handle
}

/** @description بيفحص هل المفتاح محجوز حالياً. */
export function isActionLocked(key: string): boolean {
  return activeLocks.has(key)
}
