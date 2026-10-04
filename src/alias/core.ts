/**
 * @file        : src/alias/core.ts
 * @description : نقطة الاستيراد المركزية لأدوات React الأساسية والراوتر والترجمة.
 * @updated     : [
 *   { "date": "2026-09-26T17:33:00+03:00", "version": "1.1.0", "by": ["BomBa"], "comment": "توسيع Core ليشمل Hooks والترجمة والراوتر" }
 * ]
 */

export { QueryClientProvider } from '@tanstack/react-query'
export {
  createRootRoute,
  createRoute,
  createRouter, Link, Outlet,
  createMemoryHistory, RouterProvider, useNavigate,
  useParams, useRouterState, redirect
} from '@tanstack/react-router'
export {
  default as React, StrictMode, useCallback, useEffect, useId, useMemo,
  useRef, useState
} from 'react'
export type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes, CSSProperties, Dispatch, FC, FormHTMLAttributes, HTMLAttributes, ImgHTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, OptionHTMLAttributes, PropsWithChildren, ReactNode, SelectHTMLAttributes, SetStateAction
} from 'react'
export type { JSX } from 'react/jsx-runtime'

export { createRoot } from 'react-dom/client'

// zustand
export { create } from 'zustand'
export { persist } from 'zustand/middleware'

// i18n
export { i18next } from '@/i18n/config'
export { useTranslation } from 'react-i18next'

