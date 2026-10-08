/**
 * @file        : src/components/app-background/types.ts
 * @description : أنواع وعقود محرك خلفية التطبيق الزخرفية (AppBackground).
 * @updated     : [
 *   { "date": "2026-10-08", "version": "1.0.0", "by": ["BomBa"], "comment": "إنشاء أنواع المحرك وفق PRD BombaSmart&Background" }
 * ]
 */

import type { T_BackgroundMotion } from '@/components/settings/settings.store'

/** سياسة الحركة — نفس نوع إعداد المستخدم في مخزن الإعدادات (مصدر واحد للحقيقة بدون تكرار) */
export type T_MotionPolicy = T_BackgroundMotion

/** جرمن ضوئي ناعم — الوحدة الأساسية للمشهد */
export interface I_Orb {
  /** موقع أفقي بالبكسل */
  x: number
  /** موقع رأسي بالبكسل */
  y: number
  /** نصف القطر بالبكسل */
  radius: number
  /** سرعة أفقية — بكسل/ثانية */
  speedX: number
  /** سرعة رأسية — بكسل/ثانية */
  speedY: number
  /** أي توكن لون يستخدمه الجرم */
  color: 'a' | 'b'
  /** إزاحة طور التذبذب — عشان الأجرام لا تتحرك بشكل متطابق */
  phase: number
}

/** جزيء دقيق — يظهر في وضع الحركة الكاملة فقط */
export interface I_Mote {
  x: number
  y: number
  /** سرعة الصعود — بكسل/ثانية (قيمة سالبة) */
  speedY: number
  /** نصف القطر بالبكسل */
  size: number
  /** شفافية مطلقة 0..1 */
  alpha: number
}

/** توكنات الألوان المقروءة من CSS Variables مرة واحدة لكل ثيم — مش داخل الحلقة */
export interface I_BackgroundTokens {
  orbA: string
  orbB: string
  alpha: number
}

/** مشهد الخلفية الكامل */
export interface I_BackgroundScene {
  orbs: I_Orb[]
  motes: I_Mote[]
}

/** موضع المؤشر الطبيعي 0..1 — للـ parallax في الوضع الكامل فقط */
export interface I_PointerPosition {
  x: number
  y: number
}
