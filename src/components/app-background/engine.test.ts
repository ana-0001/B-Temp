/**
 * @file        : src/components/app-background/engine.test.ts
 * @description : اختبارات وحدة لدوال محرك الخلفية النقية (PRD §15 — BG-002 وBG-004).
 * @updated     : [
 *   { "date": "2026-10-08", "version": "1.0.0", "by": ["BomBa"], "comment": "إنشاء اختبارات المحرك النقية" }
 * ]
 */

import { describe, expect, it } from 'vitest'
import {
  clampDpr,
  createScene,
  getOrbCount,
  readBackgroundTokens,
  resolveMotionPolicy,
  stepScene,
} from './engine'

describe('clampDpr', () => {
  it('يحد من DPR فوق 1.5 لحماية الأجهزة الضعيفة', () => {
    expect(clampDpr(3)).toBe(1.5)
    expect(clampDpr(2)).toBe(1.5)
    expect(clampDpr(1.25)).toBe(1.25)
  })

  it('بيثبت الحد الأدنى عند 1 ويرفض القيم غير الصالحة', () => {
    expect(clampDpr(0.75)).toBe(1)
    expect(clampDpr(0)).toBe(1)
    expect(clampDpr(Number.NaN)).toBe(1)
  })
})

describe('getOrbCount', () => {
  it('يتناسب مع عرض الشاشة داخل حدود دنيا وعليا', () => {
    expect(getOrbCount(320)).toBe(2) // الحد الأدنى
    expect(getOrbCount(720)).toBe(2)
    expect(getOrbCount(1440)).toBe(4)
    expect(getOrbCount(4000)).toBe(5) // الحد الأقصى
  })
})

describe('resolveMotionPolicy', () => {
  it('تفضيل النظام لتقليل الحركة يتفوق على إعداد المستخدم (أولوية الحركة)', () => {
    expect(resolveMotionPolicy('full', true)).toBe('off')
    expect(resolveMotionPolicy('calm', true)).toBe('off')
    expect(resolveMotionPolicy('full', false)).toBe('full')
    expect(resolveMotionPolicy('calm', false)).toBe('calm')
    expect(resolveMotionPolicy('off', false)).toBe('off')
  })
})

describe('readBackgroundTokens', () => {
  it('يقرأ التوكنات من CSS Variables كما هي', () => {
    const styles = {
      getPropertyValue: (name: string) => {
        if (name === '--color-orb-a') return 'hsl(40 80% 60%)'
        if (name === '--color-orb-b') return 'hsl(200 80% 60%)'
        if (name === '--bg-orb-alpha') return '0.12'
        return ''
      },
    }
    expect(readBackgroundTokens(styles)).toEqual({
      orbA: 'hsl(40 80% 60%)',
      orbB: 'hsl(200 80% 60%)',
      alpha: 0.12,
    })
  })

  it('يرجع null عند نقص التوكنات — فشل آمن بدون ألوان hardcoded', () => {
    expect(readBackgroundTokens({ getPropertyValue: () => '' })).toBeNull()
  })

  it('يقيد الشفافية خارج النطاق 0..1', () => {
    const styles = {
      getPropertyValue: (name: string) => {
        if (name === '--color-orb-a') return 'hsl(40 80% 60%)'
        if (name === '--color-orb-b') return 'hsl(200 80% 60%)'
        if (name === '--bg-orb-alpha') return '5'
        return ''
      },
    }
    const tokens = readBackgroundTokens(styles)
    expect(tokens).not.toBeNull()
    expect(tokens?.alpha).toBe(1)
  })
})

describe('createScene وstepScene', () => {
  it('المشهد حتمي — نفس الـ seed ينتج نفس المشهد بالظبط', () => {
    expect(createScene(3, 800, 600, 42)).toEqual(createScene(3, 800, 600, 42))
  })

  it('عدد الأجرام والجزيئات مطابق للطلب', () => {
    const scene = createScene(4, 800, 600, 1)
    expect(scene.orbs).toHaveLength(4)
    expect(scene.motes).toHaveLength(24)
  })

  it('سياسة off ما بتحركش المشهد نهائياً (reduced-motion = مشهد ثابت)', () => {
    const scene = createScene(2, 100, 100, 7)
    const snapshot = scene.orbs.map((orb) => ({ x: orb.x, y: orb.y }))
    stepScene(scene, 100, 100, 5, 'off')
    expect(scene.orbs.map((orb) => ({ x: orb.x, y: orb.y }))).toEqual(snapshot)
  })

  it('الجزيئات بتتحرك في الوضع الكامل فقط (calm = orbs فقط)', () => {
    const scene = createScene(1, 100, 100, 7)
    const moteBefore = scene.motes[0].y

    stepScene(scene, 100, 100, 1, 'calm')
    expect(scene.motes[0].y).toBe(moteBefore)

    stepScene(scene, 100, 100, 1, 'full')
    expect(scene.motes[0].y).not.toBe(moteBefore)
  })

  it('الأجرام بتلف حول الحواف بدون أن تخرج من الشاشة', () => {
    const scene = createScene(2, 100, 100, 9)
    // خطوة زمنية كبيرة مقيدة بحد أقصى 0.1 ثانية — مفيش قفزات هائلة
    stepScene(scene, 100, 100, 60, 'calm')
    for (const orb of scene.orbs) {
      expect(orb.x).toBeGreaterThanOrEqual(-orb.radius - 1)
      expect(orb.x).toBeLessThanOrEqual(100 + orb.radius + 1)
      expect(orb.y).toBeGreaterThanOrEqual(-orb.radius - 1)
      expect(orb.y).toBeLessThanOrEqual(100 + orb.radius + 1)
    }
  })
})
