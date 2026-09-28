/**
 * @file        : src/alias/core.ts
 * @description : نقطة الاستيراد المركزية لأدوات React الأساسية والراوتر والترجمة.
 * @updated     : [
 *   { "date": "2026-09-26T17:33:00+03:00", "version": "1.1.0", "by": ["BomBa"], "comment": "توسيع Core ليشمل Hooks والترجمة والراوتر" }
 * ]
 */

export { default as React } from 'react'
export {
  StrictMode,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useId,
} from 'react'
export type {
  FC,
  ReactNode,
  CSSProperties,
  HTMLAttributes,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  LabelHTMLAttributes,
  PropsWithChildren,
  ImgHTMLAttributes,
  Dispatch,
  SetStateAction,
} from 'react'
export { createRoot } from 'react-dom/client'
export { QueryClientProvider } from '@tanstack/react-query'
export {
  Outlet,
  RouterProvider,
  Link,
  useNavigate,
  useParams,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

// zustand
export { create } from 'zustand'
export { persist } from 'zustand/middleware'

// i18n
export { useTranslation } from 'react-i18next'
export { i18next } from '@/i18n/config'

// tooltip — [DISABLED] @radix-ui/react-tooltip غير مثبتة حالياً
// export * as Tooltip from '@radix-ui/react-tooltip'
