/**
 * @file        : src/components/BUI-1.tsx
 * @description : أغلفة HTML نقية بدون حالة أو Hooks أو منطق عرض.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إنشاء طبقة BUI-1 الأساسية" }
 * ]
 */

import type * as React from 'react'
import { buildProps } from '../utils/build-props'

/** @description غلاف عنصر div الأساسي في طبقة BUI-1. */
export const Div1 = (props: React.HTMLAttributes<HTMLDivElement>) => <div {...buildProps(props)} />

/** @description غلاف عنصر div العام للمكونات المركبة. */
export const Div5 = (props: React.HTMLAttributes<HTMLDivElement>) => <div {...buildProps(props)} />

/** @description غلاف رأس التطبيق الدلالي. */
export const Header = (props: React.HTMLAttributes<HTMLElement>) => <header {...buildProps(props)} />

/** @description غلاف المنطقة الرئيسية الدلالية للتطبيق. */
export const Main = (props: React.HTMLAttributes<HTMLElement>) => <main {...buildProps(props)} />

/** @description غلاف النص القصير. */
export const Span = (props: React.HTMLAttributes<HTMLSpanElement>) => <span {...buildProps(props)} />

/** @description غلاف العنوان الرئيسي. */
export const H1 = (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 {...buildProps(props)} />

/** @description غلاف الفقرة. */
export const P = (props: React.HTMLAttributes<HTMLParagraphElement>) => <p {...buildProps(props)} />

/** @description غلاف الرابط. */
export const A = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...buildProps(props)} />

/** @description غلاف عنصر الإدخال. */
export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...buildProps(props)} />

/** @description غلاف الزر. */
export const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...buildProps(props)} />

/** @description غلاف النموذج. */
export const Form = (props: React.FormHTMLAttributes<HTMLFormElement>) => <form {...buildProps(props)} />

/** @description غلاف التسمية المرتبطة بحقل. */
export const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => <label {...buildProps(props)} />
