/**
 * @file        : src/alias/lib.ts
 * @description : نقطة التصدير المركزية لمكتبات التطبيق.
 * @updated     : [
 *   { "date": "2026-09-26T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إنشاء Alias المكتبات" }
 * ]
 */

// queryClient: إعداد عميل TanStack Query المركزي.
export { queryClient } from '@/lib/query/query-client'

// UI primitives: نقطة العزل الوحيدة لمكتبات الـ overlays الخارجية.
export * as RadixDialog from '@radix-ui/react-dialog'
export * as RadixPopover from '@radix-ui/react-popover'
export * as RadixTooltip from '@radix-ui/react-tooltip'

