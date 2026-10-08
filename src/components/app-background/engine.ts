/**
 * @file        : src/components/app-background/engine.ts
 * @description : دوال الرسم النقية لمحرك الخلفية — بدون React أو DOM مباشر عشان تفضل قابلة للاختبار (SPECKIT §11 مرحلة 3).
 * @updated     : [
 *   { "date": "2026-10-08", "version": "1.0.0", "by": ["BomBa"], "comment": "إنشاء المحرك النقي وفق PRD §13.2 وSPECKIT §9.5" }
 * ]
 */

import type {
  I_BackgroundScene,
  I_BackgroundTokens,
  T_MotionPolicy,
  I_PointerPosition,
} from './types'

// ─────────────────────────────────────────────
// ⚙️ ثوابت الأداء — كلها محددة لحماية الأجهزة الضعيفة (PRD §17)
// ─────────────────────────────────────────────
const DPR_MIN = 1
const DPR_MAX = 1.5
const ORB_MIN = 2
const ORB_MAX = 5
/** جرم واحد لكل 360 بكسل من عرض الشاشة */
const ORB_WIDTH_RATIO = 360
const MOTE_COUNT = 24
/** أقصى إزاحة parallax بالبكسل — الوضع الكامل فقط */
const PARALLAX_STRENGTH = 24

/** @description يحد من نسبة بكسلات الشاشة لحماية الأجهزة الضعيفة (PRD §13.2). */
export function clampDpr(dpr: number): number {
  if (Number.isNaN(dpr) || dpr <= 0) return DPR_MIN
  return Math.min(Math.max(dpr, DPR_MIN), DPR_MAX)
}

/** @description يحسب عدد الأجرام من عرض الشاشة بحد أدنى وأقصى. */
export function getOrbCount(viewportWidth: number): number {
  const count = Math.round(viewportWidth / ORB_WIDTH_RATIO)
  return Math.min(Math.max(count, ORB_MIN), ORB_MAX)
}

/** @description يطبق أولوية الحركة: تفضيل نظام التشغيل لتقليل الحركة يتفوق على إعداد المستخدم (SPECKIT §9.2). */
export function resolveMotionPolicy(userMotion: T_MotionPolicy, prefersReducedMotion: boolean): T_MotionPolicy {
  return prefersReducedMotion ? 'off' : userMotion
}

/** @description مولد أرقام شبه عشوائي حتمي (mulberry32) — المشهد قابل للاختبار وثابت بين التحميلات. */
function createRandom(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * @description يقرأ توكنات الخلفية من CSS Variables مرة واحدة لكل ثيم — خارج المسار الحرج.
 * @returns التوكنات أو null لو ناقصة — فشل آمن بدون أي ألوان hardcoded داخل TS (PRD §13.2).
 */
export function readBackgroundTokens(styles: { getPropertyValue: (name: string) => string }): I_BackgroundTokens | null {
  const orbA = styles.getPropertyValue('--color-orb-a').trim()
  const orbB = styles.getPropertyValue('--color-orb-b').trim()
  const alpha = Number.parseFloat(styles.getPropertyValue('--bg-orb-alpha').trim())

  if (!orbA || !orbB || Number.isNaN(alpha)) return null
  return { orbA, orbB, alpha: Math.min(Math.max(alpha, 0), 1) }
}

/** @description يبني مشهداً جديداً بأجرام وجزيئات حتمية التوزيع من seed ثابت. */
export function createScene(orbCount: number, width: number, height: number, seed: number): I_BackgroundScene {
  const random = createRandom(seed)
  const base = Math.max(width, height, 1)

  const orbs = Array.from({ length: orbCount }, (_, index) => ({
    x: random() * width,
    y: random() * height,
    radius: base * (0.12 + random() * 0.16),
    speedX: (random() - 0.5) * 14,
    speedY: (random() - 0.5) * 10,
    color: index % 2 === 0 ? ('a' as const) : ('b' as const),
    phase: random() * Math.PI * 2,
  }))

  const motes = Array.from({ length: MOTE_COUNT }, () => ({
    x: random() * width,
    y: random() * height,
    speedY: -(4 + random() * 8),
    size: 1 + random() * 1.5,
    alpha: 0.15 + random() * 0.25,
  }))

  return { orbs, motes }
}

/**
 * @description يقدم المشهد خطوة زمنية — يعدل في المكان بدون إنشاء كائنات جديدة داخل الحلقة (PRD §10.4).
 * @remarks في وضع off مفيش أي حركة — المشهد بيرسم مرة واحدة ثابتاً.
 */
export function stepScene(
  scene: I_BackgroundScene,
  width: number,
  height: number,
  deltaTime: number,
  motionPolicy: T_MotionPolicy,
): void {
  if (motionPolicy === 'off') return

  // حماية من قفزات الوقت الكبيرة بعد استئناف التبويب — عشان الأجرام لا تقفز مسافات هائلة
  const clampedDelta = Math.min(Math.max(deltaTime, 0), 0.1)

  for (const orb of scene.orbs) {
    orb.x += orb.speedX * clampedDelta
    orb.y += orb.speedY * clampedDelta
    // الالتفاف حول الحواف — الجرم اللي يخرج من جهة يدخل من الجهة المقابلة
    if (orb.x < -orb.radius) orb.x = width + orb.radius
    if (orb.x > width + orb.radius) orb.x = -orb.radius
    if (orb.y < -orb.radius) orb.y = height + orb.radius
    if (orb.y > height + orb.radius) orb.y = -orb.radius
  }

  // الجزيئات الدقيقة بتتحرك في الوضع الكامل فقط — إعادة الدخول حتمية بدون Math.random داخل الحلقة
  if (motionPolicy === 'full') {
    for (const mote of scene.motes) {
      mote.y += mote.speedY * clampedDelta
      if (mote.y < -mote.size) {
        mote.y = height + mote.size
        mote.x = (mote.x + width * 0.13) % Math.max(width, 1)
      }
    }
  }
}

/**
 * @description يرسم إطاراً كاملاً — مسح قبل الرسم وإرجاع حالة السياق (globalAlpha) كما كانت.
 * @remarks التدرج الشعاعي لازم يتعمل جديد كل إطار لأن مواقع الأجرام بتتغير — استثناء موثق لقاعدة "لا إنشاء داخل الحلقة".
 */
export function drawScene(
  context: CanvasRenderingContext2D,
  scene: I_BackgroundScene,
  tokens: I_BackgroundTokens,
  width: number,
  height: number,
  timeSeconds: number,
  motionPolicy: T_MotionPolicy,
  pointer: I_PointerPosition,
): void {
  context.clearRect(0, 0, width, height)
  context.globalAlpha = 1

  // parallax خفيف مع المؤشر — في الوضع الكامل فقط
  const parallaxX = motionPolicy === 'full' ? (pointer.x - 0.5) * PARALLAX_STRENGTH : 0
  const parallaxY = motionPolicy === 'full' ? (pointer.y - 0.5) * PARALLAX_STRENGTH : 0

  for (const orb of scene.orbs) {
    // تذبذب ناعم في الحجم — ثابت تماماً في وضع off (بدون حركة إطلاقاً)
    const wobble = motionPolicy === 'off' ? 0 : Math.sin(timeSeconds * 0.4 + orb.phase) * (orb.radius * 0.08)
    const x = orb.x + parallaxX
    const y = orb.y + parallaxY
    const radius = orb.radius + wobble
    const color = orb.color === 'a' ? tokens.orbA : tokens.orbB

    const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, 'transparent')

    context.globalAlpha = tokens.alpha
    context.fillStyle = gradient
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }

  // الجزيئات الدقيقة — الوضع الكامل فقط
  if (motionPolicy === 'full') {
    context.fillStyle = tokens.orbB
    for (const mote of scene.motes) {
      context.globalAlpha = mote.alpha
      context.beginPath()
      context.arc(mote.x, mote.y, mote.size, 0, Math.PI * 2)
      context.fill()
    }
  }

  // إرجاع حالة السياق كما كانت (SPECKIT §9.5 — رجّع globalAlpha)
  context.globalAlpha = 1
}
