/**
 * @file        : src/utils/cn.ts
 * @description : دالة دمج كلاسات Tailwind CSS وحل التعارضات دلالياً عبر clsx و tailwind-merge.
 * @updated     : [
 *   { "date": "2026-09-26T17:30:00+03:00", "version": "1.0.0", "by": ["BomBa"], "comment": "إنشاء دالة cn الموحدة" }
 * ]
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * @description دمج أسماء الكلاسات الشرطية وحل تعارضات Tailwind
 * @param {...ClassValue[]} inputs - مصفوفة أو قيم الكلاسات
 * @returns {string} سلسلة الكلاسات المدمجة والمنقحة
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
