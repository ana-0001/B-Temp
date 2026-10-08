/**
 * @file        : src/components/smart/index.ts
 * @description : نقطة تصدير منظومة BombaSmart — المكونات الذكية وخدمة الأقفال.
 * @updated     : [
 *   { "date": "2026-10-08", "version": "1.0.0", "by": ["BomBa"], "comment": "إنشاء نقطة التصدير" }
 * ]
 */

export { SmartButton, type I_SmartButtonProps } from './smart-button'
export { SmartInput, type I_SmartInputProps } from './smart-input'
export { isActionLocked, tryAcquireActionLock, type I_ActionLockHandle } from './action-lock'
