/**
 * @file        : src/components/smart/action-lock.test.ts
 * @description : اختبارات وحدة لخدمة أقفال الإجراءات — منع double-submit والملكية والتنظيف (PRD §15 — SMART-002).
 * @updated     : [
 *   { "date": "2026-10-08", "version": "1.0.0", "by": ["BomBa"], "comment": "إنشاء اختبارات خدمة الأقفال" }
 * ]
 */

import { describe, expect, it } from 'vitest'
import { isActionLocked, tryAcquireActionLock } from './action-lock'

describe('ActionLock', () => {
  it('يمنع الحصول على نفس القفل مرتين — جوهر منع double-submit', () => {
    const first = tryAcquireActionLock('test-key-1')
    expect(first).not.toBeNull()
    expect(isActionLocked('test-key-1')).toBe(true)
    expect(tryAcquireActionLock('test-key-1')).toBeNull()

    if (!first) throw new Error('القفل الأول لازم ينجح')
    first.release()
    expect(isActionLocked('test-key-1')).toBe(false)
    expect(tryAcquireActionLock('test-key-1')).not.toBeNull()
  })

  it('ownership token — المقبض القديم ما يقدرش يحرر قفل مالك جديد', () => {
    const first = tryAcquireActionLock('test-key-2')
    if (!first) throw new Error('القفل الأول لازم ينجح')
    first.release()

    const second = tryAcquireActionLock('test-key-2')
    if (!second) throw new Error('القفل الثاني لازم ينجح بعد التحرير')

    // محاولة تحرير من مقبض قديم — لازم تتفشل بصمت بدون كسر القفل الجديد
    first.release()
    expect(isActionLocked('test-key-2')).toBe(true)

    second.release()
    expect(isActionLocked('test-key-2')).toBe(false)
  })

  it('مفاتيح مختلفة لا تتعارض مع بعضها', () => {
    const lockA = tryAcquireActionLock('test-key-3')
    const lockB = tryAcquireActionLock('test-key-4')
    expect(lockA).not.toBeNull()
    expect(lockB).not.toBeNull()

    lockA?.release()
    lockB?.release()
  })

  it('التحرير المتكرر لنفس المقبض آمن (no-op)', () => {
    const handle = tryAcquireActionLock('test-key-5')
    if (!handle) throw new Error('القفل لازم ينجح')
    handle.release()
    handle.release()
    expect(isActionLocked('test-key-5')).toBe(false)
  })
})
