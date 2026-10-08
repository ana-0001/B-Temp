/**
 * @file        : src/components/app-background/AppBackground.tsx
 * @description : محرك الخلفية الزخرفية — Canvas خلف المحتوى باحترام كامل لإعدادات المستخدم والنظام.
 * @updated     : [
 *   { "date": "2026-10-08", "version": "1.0.0", "by": ["BomBa"], "comment": "إنشاء المحرك وفق مصفوفة السلوك في PRD §13.1" }
 * ]
 */

import { Canvas, useBackground, useEffect, useRef, useState } from '@a'
import {
  clampDpr,
  createScene,
  drawScene,
  getOrbCount,
  readBackgroundTokens,
  resolveMotionPolicy,
  stepScene,
} from './engine'
import type { I_BackgroundScene, I_BackgroundTokens, I_PointerPosition } from './types'
import styles from './app-background.module.css'

/** seed ثابت — المشهد نفسه في كل تحميل لتفادي وميض إعادة التوزيع */
const SCENE_SEED = 20261008

/**
 * @description طبقة خلفية زخرفية خلف محتوى التطبيق — بتقرأ إعداداتها من مخزن الإعدادات مباشرة بدون props.
 * @remarks مصفوفة السلوك الكاملة (PRD §13.1): التعطيل = لا Canvas ولا Loop — وreduced-motion = مشهد ثابت.
 */
export function AppBackground() {
  const { showBackground, backgroundMotion } = useBackground()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // ⚡ متابعة تغيير تفضيل النظام لتقليل الحركة — أولويته أعلى من إعداد المستخدم (SPECKIT §9.2)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    // خلفية معطلة = لا Canvas ولا Loop نهائياً (BG-001)
    if (!showBackground) return
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return // فشل آمن — بيئة اختبار أو متصفح بلا Canvas: مفيش رسم ومفيش أخطاء

    const motionPolicy = resolveMotionPolicy(backgroundMotion, prefersReducedMotion)
    let frameId = 0
    let width = 0
    let height = 0
    let scene: I_BackgroundScene = { orbs: [], motes: [] }
    // التوكنات بتتقرأ مرة واحدة لكل ثيم — مش داخل الحلقة (SPECKIT §9.5)
    let tokens: I_BackgroundTokens | null = readBackgroundTokens(
      window.getComputedStyle(document.documentElement),
    )
    let lastTime = 0
    const pointer: I_PointerPosition = { x: 0.5, y: 0.5 }

    /** @description رسم إطار ثابت — للحالات بدون حركة (off أو reduced-motion). */
    const drawStaticFrame = () => {
      if (tokens) drawScene(context, scene, tokens, width, height, 0, 'off', pointer)
    }

    /** @description إعادة حساب الأبعاد وDPR وإعادة بناء المشهد بعد أي resize. */
    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = clampDpr(window.devicePixelRatio || 1)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      scene = createScene(getOrbCount(width), width, height, SCENE_SEED)
      if (motionPolicy === 'off') drawStaticFrame()
    }

    /** @description حلقة الرسم الوحيدة — بتتحرك وترسم إطاراً جديداً كل ما تطلب الشاشة. */
    const renderLoop = (time: number) => {
      const deltaTime = lastTime === 0 ? 0 : (time - lastTime) / 1000
      lastTime = time
      if (tokens) {
        stepScene(scene, width, height, deltaTime, motionPolicy)
        drawScene(context, scene, tokens, width, height, time / 1000, motionPolicy, pointer)
      }
      frameId = window.requestAnimationFrame(renderLoop)
    }

    // 🎯 قاعدة الـ Loop الواحد: مفيش loop جديد قبل إلغاء القديم (SPECKIT §6.1)
    const startLoop = () => {
      if (frameId === 0) frameId = window.requestAnimationFrame(renderLoop)
    }
    const stopLoop = () => {
      if (frameId !== 0) window.cancelAnimationFrame(frameId)
      frameId = 0
      lastTime = 0
    }

    /** @description إيقاف فوري عند إخفاء التبويب واستئناف loop واحد عند العودة (BG-006). */
    const handleVisibilityChange = () => {
      if (document.hidden) stopLoop()
      else if (motionPolicy !== 'off') startLoop()
    }

    /** @description تتبع المؤشر للـ parallax — الوضع الكامل فقط. */
    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX / Math.max(window.innerWidth, 1)
      pointer.y = event.clientY / Math.max(window.innerHeight, 1)
    }

    // إعادة قراءة التوكنات عند تبديل الثيم — خارج المسار الحرج
    const themeObserver = new MutationObserver(() => {
      tokens = readBackgroundTokens(window.getComputedStyle(document.documentElement))
      if (motionPolicy === 'off') drawStaticFrame()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    if (motionPolicy === 'full') window.addEventListener('pointermove', handlePointerMove, { passive: true })

    handleResize()
    if (motionPolicy !== 'off' && !document.hidden) startLoop()

    // 🧹 تنظيف متناظر — كل مورد له cleanup مطابق (BG-005 وSPECKIT §6.2)
    return () => {
      stopLoop()
      themeObserver.disconnect()
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (motionPolicy === 'full') window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [showBackground, backgroundMotion, prefersReducedMotion])

  // خلفية معطلة = لا Canvas ولا Loop نهائياً (BG-001)
  if (!showBackground) return null

  return <Canvas ref={canvasRef} className={styles.background} aria-hidden="true" />
}
