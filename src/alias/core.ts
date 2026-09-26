/**
 * @file        : src/alias/core.ts
 * @description : نقطة الاستيراد المركزية لأدوات React الأساسية والراوتر والترجمة.
 * @updated     : [
 *   { "date": "2026-09-26T17:33:00+03:00", "version": "1.1.0", "by": ["BomBa"], "comment": "توسيع Core ليشمل Hooks والترجمة والراوتر" }
 * ]
 */

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
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  PropsWithChildren,
} from 'react'
export { createRoot } from 'react-dom/client'
export { Outlet, RouterProvider, Link, useNavigate, useParams } from '@tanstack/react-router'
export { useTranslation } from 'react-i18next'
export { i18next } from '../i18n/config'
