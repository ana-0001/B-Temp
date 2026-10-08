/**
 * @file        : src/components/BUI-1.tsx
 * @description : أغلفة HTML نقية بدون حالة أو Hooks أو منطق عرض.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إنشاء طبقة BUI-1 الأساسية" },
 *   { "date": "2026-10-08", "version": "0.2.0", "by": ["BomBa"], "comment": "إضافة غلاف Canvas يقبل ref (React 19 ref-as-prop) لمحرك الخلفية" }
 * ]
 */

import { buildProps, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type CanvasHTMLAttributes, type FormHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes, type LabelHTMLAttributes, type OptionHTMLAttributes, type Ref, type SelectHTMLAttributes } from '@a'

/** @description غلاف عنصر div الأساسي في طبقة BUI-1. */
export const Div = (props: HTMLAttributes<HTMLDivElement>) => <div {...buildProps(props)} />

/** @description غلاف رأس التطبيق الدلالي. */
export const Header = (props: HTMLAttributes<HTMLElement>) => <header {...buildProps(props)} />

/** @description غلاف رأس التطبيق الدلالي. */
export const Footer = (props: HTMLAttributes<HTMLElement>) => <footer {...buildProps(props)} />

/** @description غلاف المنطقة الرئيسية الدلالية للتطبيق. */
export const Main = (props: HTMLAttributes<HTMLElement>) => <main {...buildProps(props)} />

/** @description غلاف القسم الدلالي. */
export const Section = (props: HTMLAttributes<HTMLElement>) => <section {...buildProps(props)} />

/** @description غلاف النص القصير. */
export const Span = (props: HTMLAttributes<HTMLSpanElement>) => <span {...buildProps(props)} />

/** @description غلاف العنوان الرئيسي. */
export const H1 = (props: HTMLAttributes<HTMLHeadingElement>) => <h1 {...buildProps(props)} />

/** @description غلاف الفقرة. */
export const P = (props: HTMLAttributes<HTMLParagraphElement>) => <p {...buildProps(props)} />

/** @description غلاف الفقرة. */
export const Strong = (props: HTMLAttributes<HTMLElement>) => <strong {...buildProps(props)} />


/** @description غلاف الرابط. */
export const A = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...buildProps(props)} />

/** @description غلاف عنصر الإدخال. */
export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => <input {...buildProps(props)} />

/** @description غلاف الزر. */
export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => <button {...buildProps(props)} />

/** @description غلاف عنصر canvas — يقبل ref كخاصية عادية (React 19 ref-as-prop) لمحرك الخلفية الزخرفية. */
export const Canvas = (props: CanvasHTMLAttributes<HTMLCanvasElement> & { ref?: Ref<HTMLCanvasElement> }) => <canvas {...buildProps(props)} />

/** @description غلاف النموذج. */
export const Form = (props: FormHTMLAttributes<HTMLFormElement>) => <form {...buildProps(props)} />

/** @description غلاف التسمية المرتبطة بحقل. */
export const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => <label {...buildProps(props)} />

/** @description غلاف عنصر الاختيار الأساسي في طبقة BUI-1. */
export const Select = (props: SelectHTMLAttributes<HTMLSelectElement>) => <select {...buildProps(props)} />

/** @description غلاف عنصر الاختيار الأساسي في طبقة BUI-1. */
export const Option = (props: OptionHTMLAttributes<HTMLOptionElement>) => <option {...buildProps(props)} />
