/**
 * @file        : src/components/app-background/index.ts
 * @description : نقطة تصدير محرك الخلفية الزخرفية — الـ API العام محدود للمكون والأنواع فقط (SPECKIT §15).
 * @updated     : [
 *   { "date": "2026-10-08", "version": "1.0.0", "by": ["BomBa"], "comment": "إنشاء نقطة التصدير" }
 * ]
 */

export { AppBackground } from './AppBackground'
export type {
  I_BackgroundScene,
  I_BackgroundTokens,
  I_Mote,
  T_MotionPolicy,
  I_Orb,
  I_PointerPosition,
} from './types'
