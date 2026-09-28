
# 🧠 SPECKIT.md — المواصفة التنفيذية الموحّدة للمشروع

> **هذا الملف هو "الدماغ" الوحيد اللي أي موديل ذكاء اصطناعي (حتى لو رخيص/أقل قدرة) لازم يقرأه ويلتزم بيه حرفيًا قبل ما يكتب أي سطر كود.**
> الهدف: أي AI يفتح المحادثة يشتغل **بنفس المعايير بالضبط**، من غير ما يحتاج يفهم أو "يستنتج" حاجة من نفسه.
> **لا اجتهاد، لا تفسير شخصي، لا اختصار للقواعد — تنفيذ حرفي فقط.**

```yaml
Spec-Version    : 1.0.0
Target-Project  : SPA Frontend (React 19 + TypeScript + Vite 6)
Companion-File  : Plan.md   ← خطة المراحل الكاملة (SPECKIT.md يشتغل مع Plan.md مش بديل عنه)
Language-Policy : الكود إنجليزي / كل تعليق أو رد أو توثيق بالعربية المصرية
Read-Order      : SPECKIT.md → docs/AI_CONTEXT.md → docs/AI_SESSION.md → docs/TODO.md → Plan.md
```

---

## 0. كيفية استخدام هذا الملف (إلزامي لأي AI)

```markdown
1. اقرأ هذا الملف كاملاً قبل أي رد أو أي كود — مفيش تخطي أقسام.
2. لو فيه تعارض بين "فهمك الشخصي" وبين نص مكتوب هنا → النص هنا هو الفيصل دايمًا.
3. لو حاجة مش موجودة هنا ومش موجودة في Plan.md → استخدم أقرب قاعدة مذكورة بالقياس (Analogy)،
   ووثّق القرار في docs/AI_CONTEXT.md تحت "قرارات غير موثقة اتخذت أثناء التنفيذ".
4. ممنوع تبدأ أي Task قبل ما تنفّذ "بروتوكول بداية الجلسة" (§ 12.1) بالكامل.
5. ممنوع تنهي أي رد لأي Task قبل ما تنفّذ "بروتوكول نهاية الجلسة" (§ 12.3) بالكامل — بدون استثناء، حتى لو التعديل صغير.
```

---

## 1. هوية الـ AI وقواعد السلوك

```markdown
✅ رد دايمًا بالعربية المصرية — الكود نفسه بالإنجليزية فقط.
✅ نفّذ مهمة واحدة ذرّية (Atomic Task) في كل مرة — ممنوع تبدأ مهمة تانية قبل ما تخلّص اللي قدامك 100%.
✅ لو المهمة كبيرة، قسّمها بنفسك لمهام صغيرة قبل ما تبدأ، واكتبها في docs/TODO.md.
✅ لو اضطريت توقف قبل الاكتمال (حد توكنز، انقطاع، ...)، اكتب داخل الكود نفسه:
   /**
    * [ ] - todo: المهمة دي لسه مش مكتملة، هكمل منها تاني
    * التفاصيل: [وصف دقيق لآخر نقطة اتوقفت عندها والخطوة الجاية بالظبط]
    */
✅ قبل أي رد جديد، افحص: هل فيه "todo" مفتوح من جلسة سابقة في الكود أو في docs/TODO.md؟
   لو آه → أولويتك القصوى إنك تكمله، مش تبدأ حاجة جديدة.
❌ ممنوع تفترض تفاصيل Backend حساسة (شكل الـ API، الـ Auth، ...) قبل ما تتأكد إنها محسومة في
   docs/AI_CONTEXT.md أو Plan.md § "القرارات المطلوب حسمها". لو مش محسومة → اسأل المستخدم أولاً.
```

---

## 2. القواعد الذهبية (Non-Negotiable — أعلى أولوية على الإطلاق)

```markdown
G1.  اللغة الافتراضية: English (en) / LTR — الثانوية: Arabic (ar) / RTL.
G2.  Mobile First في كل تصميم بدون استثناء.
G3.  Light Mode افتراضي — البنية جاهزة لـ Dark مستقبلاً (متغيرات BomBa جاهزة، ممنوع dark: prefix).
G4.  Logical Properties فقط (start/end, ms/me, ps/pe) — ممنوع left/right لو الخاصية مرتبطة باللغة.
G5.  UTC لكل تخزين/معالجة/إرسال للتواريخ، ISO 8601 دايمًا — التحويل لـ Local عند العرض فقط.
G6.  Server State → TanStack Query فقط. Client State → Zustand فقط. ممنوع الخلط بينهم.
G7.  ممنوع أي import مباشر في الصفحات/الفيتشرز — الاستيراد من @a فقط (نظام Alias).
G8.  ممنوع تخطي طبقات BUI: BUI-1 → BUI-2 → BUI-O → Screen. ممنوع HTML خام في BUI-2 فأعلى.
G9.  ممنوع أي لون أو قياس مكتوب مباشرة (hardcoded) — كل حاجة من CSS Variables + @theme.
G10. ممنوع أي أيقونة بدون Icon prefix (IconSearch مش Search).
G11. ممنوع `any` في TypeScript تمامًا.
G12. كل نص ظاهر للمستخدم يمر عبر i18n — ممنوع نص Hardcoded في أي مكوّن.
G13. ممنوع تخزين/تسريب أي Secret داخل كود الـ Frontend أو الـ Logs أو Sentry.
G14. Frontend Route Guards مش بديل عن صلاحيات Backend — دايمًا Backend هو المرجع النهائي.
G15. كل فرع Git لازم رقم شجري + type. كل Commit لازم يتبع صيغة Emoji + وصف واضح (§ 10).
G16. **آخر كل جلسة عمل، لازم تحديث docs/ بالتاريخ والوقت + تقرير مختصر + اقتراح خطوة تالية (§ 12.3) — بدون أي استثناء مهما كانت المهمة صغيرة.**
```

---

## 3. الـ Tech Stack — نهائي وثابت (ممنوع تغييره أو اقتراح بديل)

```yaml
Build        : Vite 6
Framework    : React 19
Language     : TypeScript (strict: true, "any" ممنوع)
Styling      : Tailwind CSS 4 + shadcn/ui + Radix UI (تُستخدم فقط داخل طبقة BUI)
Router       : TanStack Router
Server State : @tanstack/react-query
Client State : Zustand + persist middleware (انتقائي)
HTTP         : Axios (مركزي عبر @a، Pure Layer)
Forms        : react-hook-form + Zod
Tables       : @tanstack/react-table
Charts       : Recharts (افتراضي) — Chart.js فقط لو Recharts مش كافية
i18n         : i18next + react-i18next
Dates        : Day.js (UTC plugin)
Icons        : lucide-react (+ react-icons لأيقونات Social فقط: Google/Facebook)
Animation    : framer-motion (عند حاجة فعلية فقط)
Dialogs      : @radix-ui/react-dialog (داخل BUI-O فقط)
Tooltips     : @radix-ui/react-tooltip
Confirm/Alert: SweetAlert2 (Destructive/Confirm فقط)
Toast        : Sonner
File Upload  : react-dropzone
Drag & Drop  : dnd-kit
Class Utils  : clsx + tailwind-merge → عبر دالة cn()
Lint         : ESLint (eslint.config.mjs — Flat Config فقط، ممنوع .eslintrc)
Error Track  : Sentry (Production فقط)
```

> ⚠️ لو مكتبة من دي مش موجودة في `package.json` وقت التنفيذ → ثبّتها بالإصدار المستقر الأحدث المتوافق مع React 19، وسجّل الإصدار في `docs/AI_CONTEXT.md`.

---

## 4. الهيكل الإلزامي للمشروع (انسخه حرفيًا)

```text
src/
├── alias/
│   ├── core.ts
│   ├── ui.ts
│   ├── icons.ts
│   ├── store.ts
│   ├── constants.ts
│   └── index.ts
├── components/
│   ├── BUI-1.tsx
│   ├── BUI-2.tsx
│   ├── BUI-O/
│   ├── global/
│   └── layout/
├── app/
│   ├── layouts/
│   ├── router/
│   └── providers/
├── screens/
│   ├── SplashScreen/
│   ├── ErrorScreen/
│   ├── NotFoundScreen/
│   ├── UnauthorizedScreen/
│   ├── ForbiddenScreen/
│   ├── OfflineScreen/
│   └── MaintenanceScreen/
├── features/
│   └── <feature-name>/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── schemas/
│       ├── types/
│       └── utils/
├── hooks/
├── stores/
│   ├── settingsStore.ts
│   ├── authStore.ts
│   └── uiStore.ts
├── services/
│   ├── http/axiosClient.ts
│   └── repositories/
├── i18n/
│   ├── config.ts
│   └── locales/{en,ar}/{common,auth,errors,home}.json
├── types/
├── utils/
├── lib/{dayjs,query}/
├── assets/
├── index.css
└── main.tsx

docs/
├── AI_CONTEXT.md
├── AI_SESSION.md
├── TODO.md
└── CHANGELOG.md
```

```markdown
❌ ممنوع إنشاء مجلد فاضي أو Feature مش مطلوبة فعليًا دلوقتي.
✅ أي مجلد/ملف جديد خارج الهيكل ده لازم سبب معماري واضح، ويتوثّق في docs/AI_CONTEXT.md.
```

---

## 5. نظام التصميم (Design System) — كود جاهز للنسخ المباشر

> هذا القسم **حرفي** — أي AI لازم ينسخه زي ما هو في `src/index.css`، وممنوع يخترع Tokens جديدة من نفسه.

```css
@import "tailwindcss";

:root {
  /* تحكم Dark Mode (غير مفعّل الآن — البنية جاهزة فقط) */
  --flip-l : 0%;
  --ISD    : -1;

  /* اللون الأساسي (HSL) */
  --h      : 210;
  --s      : 80%;
  --l      : 40%;
  --py-hsl : var(--h), var(--s), var(--l);

  --color-py  : hsl(var(--h), var(--s), var(--l));
  --color-sy  : hsl(330, var(--s), var(--l));
  --color-at  : hsl(300, var(--s), var(--l));
  --color-md  : hsl(250, var(--s), var(--l));

  --color-ok  : hsl(130, var(--s), var(--l));
  --color-err : hsl(5,   var(--s), var(--l));
  --color-war : hsl(60,  var(--s), var(--l));
  --color-inf : hsl(200, var(--s), var(--l));

  --color-bg    : hsl(var(--h), var(--s), calc(var(--flip-l) - 98% * var(--ISD)));
  --color-te    : hsl(var(--h), var(--s), calc(var(--flip-l) - 10% * var(--ISD)));
  --color-tt    : hsl(var(--h), var(--s), calc(var(--flip-l) -  2% * var(--ISD)));
  --color-sn    : hsl(var(--h), var(--s), calc(var(--flip-l) - 20% * var(--ISD)));

  --color-trans : hsl(from var(--color-py) h s l / 0%);
  --color-over  : hsl(from var(--color-py) h s l / 50%);
  --color-br    : color-mix(in srgb,
    hsl(var(--h), var(--s), var(--l)) 50%,
    hsl(var(--h), var(--s), calc(var(--flip-l) - 98% * var(--ISD)))
  );

  --ltr       : 1;
  --dir-start : left;
  --dir-end   : right;

  --shadow : 1;
  --radius : 1;
  --ffy    : "Inter", system-ui, -apple-system, sans-serif;

  --z-modal   : 999;
  --z-tooltip : 1000;
  --z-top     : 2147483647;
}

[dir="rtl"] { --ltr: -1; --dir-start: right; --dir-end: left; }
[data-theme="dark"], .dark { --h: 210; --flip-l: 100%; --ISD: 1; }

@theme {
  --spacing-px  : 0.0625em; --spacing-0   : 0em;    --spacing-0_5 : 0.125em;
  --spacing-1   : 0.25em;   --spacing-1_5 : 0.375em; --spacing-2   : 0.5em;
  --spacing-2_5 : 0.625em;  --spacing-3   : 0.75em;  --spacing-3_5 : 0.875em;
  --spacing-4   : 1em;      --spacing-5   : 1.25em;  --spacing-6   : 1.5em;
  --spacing-7   : 1.75em;   --spacing-8   : 2em;     --spacing-9   : 2.25em;
  --spacing-10  : 2.5em;    --spacing-12  : 3em;     --spacing-16  : 4em;
  --spacing-20  : 5em;      --spacing-24  : 6em;     --spacing-32  : 8em;

  --font-size-xs : 0.75em; --font-size-sm : 0.875em; --font-size-base: 1em;
  --font-size-lg : 1.125em; --font-size-xl: 1.25em;  --font-size-2xl : 1.5em;
  --font-size-3xl: 1.875em; --font-size-4xl: 2.25em; --font-size-5xl : 3em;

  --radius-sm: 0.125em; --radius-md: 0.375em; --radius-lg: 0.5em;
  --radius-xl: 0.75em;  --radius-2xl: 1em;    --radius-full: 9999em;

  --color-py: hsl(var(--py-hsl));
  --color-sy: hsl(330, var(--s), var(--l));
  --color-at: hsl(300, var(--s), var(--l));
  --color-md: hsl(250, var(--s), var(--l));
  --color-ok: hsl(130, var(--s), var(--l));
  --color-err: hsl(5, var(--s), var(--l));
  --color-war: hsl(60, var(--s), var(--l));
  --color-inf: hsl(200, var(--s), var(--l));
  --color-bg: hsl(var(--h), var(--s), calc(var(--flip-l) - 98% * var(--ISD)));
  --color-te: hsl(var(--h), var(--s), calc(var(--flip-l) - 10% * var(--ISD)));
  --color-tt: hsl(var(--h), var(--s), calc(var(--flip-l) -  2% * var(--ISD)));
  --color-sn: hsl(var(--h), var(--s), calc(var(--flip-l) - 20% * var(--ISD)));
  --color-trans: hsl(from var(--color-py) h s l / 0%);
  --color-over: hsl(from var(--color-py) h s l / 50%);
  --color-br: color-mix(in srgb, hsl(var(--h), var(--s), var(--l)) 50%,
    hsl(var(--h), var(--s), calc(var(--flip-l) - 98% * var(--ISD))));
}

@layer utilities {
  .B\:shadow-var { box-shadow: 0 0.25em 0.5em hsl(from var(--color-py) h s l / var(--shadow)); }
  .B\:shadow-md  { box-shadow: 0 0.25em 1em hsl(from var(--color-py) h s l / calc(0.2 * var(--shadow))); }
  .B\:shadow-lg  { box-shadow: 0 0.5em 2em hsl(from var(--color-py) h s l / calc(0.3 * var(--shadow))); }

  .B\:rounded-1    { border-radius: calc(0.25em * var(--radius)); }
  .B\:rounded-2    { border-radius: calc(0.5em  * var(--radius)); }
  .B\:rounded-3    { border-radius: calc(0.75em * var(--radius)); }
  .B\:rounded-4    { border-radius: calc(1em    * var(--radius)); }
  .B\:rounded-full { border-radius: calc(9999px * var(--radius)); }

  .B\:dir-position { left: var(--dir-start); right: var(--dir-end); }
  .B\:translate-rtl { transform: translateX(calc(-50% * var(--ltr))); }
  .B\:translate-rtl-center { transform: translate(calc(-50% * var(--ltr)), -50%); }

  .B\:font-var   { font-family: var(--ffy); }
  .B\:tracking-1 { letter-spacing: 0.025em; }
  .B\:tracking-2 { letter-spacing: 0.05em; }

  .B\:transition-smooth { transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease; }
  .B\:transition-colors { transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease; }

  .B\:z-modal   { z-index: var(--z-modal); }
  .B\:z-tooltip { z-index: var(--z-tooltip); }
  .B\:z-top     { z-index: var(--z-top); }

  .B\:overlay { background: hsl(from var(--color-py) h s l / 50%); backdrop-filter: blur(0.25em); }
}
```

### 5.1 خريطة الألوان الدلالية (استخدمها بالاسم، ممنوع hex)

```
py sy at md   → Primary / Secondary / Accent / Muted
ok err war inf → Success / Error / Warning / Info
bg te tt sn br → Background / Title / Text / Subtext / Border
trans over     → شفاف كامل / Overlay نصف شفاف
```

### 5.2 ترتيب Tailwind Classes (إلزامي دائمًا بنفس الترتيب)

```
Positioning → Display → Box Model → Typography → Visuals
مثال صحيح: relative flex items-center p-4 font-bold text-py bg-bg
```

### 5.3 ممنوعات مطلقة

```html
❌ bg-[#3b82f6]         ✅ bg-py
❌ p-[1em]              ✅ p-4  (القيم كلها em عبر @theme بالفعل)
❌ dark:bg-gray-900     ✅ bg-bg  (بتتغير تلقائي مع [data-theme="dark"])
❌ style="box-shadow:.." ✅ class="B:shadow-md"
❌ ml-4 / pr-2          ✅ ms-4 / pe-2
❌ tailwind.config.js   ✅ @theme جوه index.css
```

---

## 6. نظام BUI — كود جاهز

### 6.1 `buildProps` (يُستخدم في كل مكوّن بدون استثناء)

```typescript
const buildProps = <T extends { className?: string; style?: React.CSSProperties }>(props: T): T => {
  const { className, style, ...rest } = props
  return {
    ...rest,
    ...(className?.trim() ? { className: className.trim() } : {}),
    ...(style && Object.keys(style).length > 0 ? { style } : {}),
  } as T
}
```

### 6.2 طبقات BUI — القاعدة الحديدية

```text
BUI-1 (src/components/BUI-1.tsx) → HTML wrappers فقط، بدون state/hooks/منطق
BUI-2 (src/components/BUI-2.tsx) → مكونات UI (state/behavior)، تستخدم BUI-1 فقط + Radix Primitives عند الحاجة
BUI-O (src/components/BUI-O/)    → Compound Components، تستخدم BUI-2 فقط (Modal, DataTable, Panel)
Screens/Features                 → تستخدم BUI-O/BUI-2 فقط — ممنوع HTML خام أو استيراد Radix مباشرة
```

### 6.3 مثال BUI-1 (انسخه واستكمل عليه نفس النمط)

```typescript
export const Div5   = (p: React.HTMLAttributes<HTMLDivElement>)  => <div {...buildProps(p)} />
export const Span   = (p: React.HTMLAttributes<HTMLSpanElement>) => <span {...buildProps(p)} />
export const Input  = (p: React.InputHTMLAttributes<HTMLInputElement>) => <input {...buildProps(p)} />
export const Button = (p: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...buildProps(p)} />
```

### 6.4 مثال BUI-2 (النمط الإلزامي لأي مكوّن جديد)

```typescript
import { Div5, Input, Span } from '@a'

interface Input2Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?      : string
  error?      : string
  classGroup? : string
  classLabel? : string
  classInput? : string
}

export const Input2: React.FC<Input2Props> = ({
  label, error, classGroup = '', classLabel = '', classInput = '', className = '', ...restProps
}) => (
  <Div5 className={`flex flex-col gap-2 w-full ${classGroup}`}>
    {label && <Span className={`text-sm font-medium text-te B:font-var ${classLabel}`}>{label}</Span>}
    <Input
      {...buildProps({
        className: `w-full px-4 py-2_5 border border-br text-base text-tt bg-bg
          outline-none B:rounded-2 B:transition-colors focus:border-py focus:bg-py/5
          ${classInput} ${className}`,
      })}
      {...restProps}
    />
    {error && <Span className="text-xs text-err">{error}</Span>}
  </Div5>
)
```

### 6.5 Checklist إلزامي قبل ما تعتبر أي مكوّن "خلصان"

```markdown
□ الطبقة الصح (BUI-1/BUI-2/BUI-O)؟
□ buildProps مستخدمة؟
□ interface بتاعته extends من الـ HTML Attributes الأصلية؟
□ ...restProps في آخر الـ destructuring؟
□ classGroup/classLabel/classInput بدل تكرار className؟
□ الأيقونات جواه بـ Icon prefix؟
□ الاستيراد من @a مش مباشر؟
□ JSDoc بالعربية المصرية فوق المكوّن؟
□ Accessibility (aria/htmlFor) لو مناسب؟
□ اتضاف لـ src/alias/ui.ts؟
```

---

## 7. نظام الاستيراد المركزي (Alias System) — كود جاهز

### 7.1 `alias/index.ts`

```typescript
export * from './core'
export * from './ui'
export * from './icons'
export * from './store'
export * from './constants'
```

### 7.2 `alias/icons.ts` (Icon prefix إلزامي — زوّد على النمط ده بس)

```typescript
export {
  Search as IconSearch, X as IconClose, Check as IconCheck, Plus as IconPlus,
  ChevronDown as IconChevronDown, ChevronUp as IconChevronUp,
  Eye as IconEyeOn, EyeOff as IconEyeOff, LogIn as IconLogin, LogOut as IconLogout,
  UserRound as IconUser, LockKeyhole as IconLock, TriangleAlert as IconWarning,
  CircleCheck as IconSuccess, CircleX as IconError, LoaderCircle as IconLoader,
} from 'lucide-react'
```

### 7.3 `alias/constants.ts`

```typescript
export const ROUTES = {
  HOME: '/', LOGIN: '/login', DASHBOARD: '/dashboard',
} as const

export const APP_NAME            = 'AppName'
export const DEFAULT_LANGUAGE    = 'en' as const
export const DEFAULT_AppTheme       = 'light' as const
export const SUPPORTED_LANGUAGES = ['ar', 'en'] as const
```

### 7.4 قواعد الاستيراد

```markdown
✅ import { Button2, Input2, IconSearch, ROUTES } from '@a'   ← الاستخدام العادي في كل مكان
❌ import { Search } from 'lucide-react'                       ← ممنوع نهائيًا داخل Screens/Features
❌ import Something from '../../../shared/x'                   ← ممنوع مسارات نسبية عميقة
✅ أي مكوّن/أيقونة/Store جديد → يتضاف فورًا لملف alias المناسب في نفس الـ commit
```

---

## 8. التسمية وجودة الكود

### 8.1 Naming

```
Variables/Functions → camelCase        (getUserById)
Hooks               → camelCase + use  (useAuth)
Components           → PascalCase       (UserCard)
Constants            → UPPER_SNAKE_CASE (MAX_RETRY_COUNT)
Types مخصصة          → PascalCase + T_  (T_AppTheme)
Interfaces            → PascalCase + I_  (I_UserDTO)
ملفات Components      → PascalCase.tsx
ملفات Hooks           → camelCase.ts
ملفات Utils           → kebab-case.ts
```

### 8.2 File Header إلزامي في أول كل ملف كود

```typescript
/**
 * @file        : src/path/to/file.ts
 * @description : [وصف بالعربية المصرية]
 * @updated     : [
 *   { "date": "YYYY-MM-DDTHH:MM:SSZ", "version": "1.0.0", "by": ["AI"], "comment": "إنشاء الملف" }
 * ]
 */
```

### 8.3 قواعد صارمة إضافية

```markdown
❌ any في TypeScript تمامًا
✅ eslint.config.mjs (Flat Config) — ممنوع .eslintrc
✅ npm run lint لازم يعدي 100% قبل ما تعتبر أي Task خلصت
✅ متغير غير مستخدم لازم بادئة _ (مثال: _unused)
✅ كل تعليق/JSDoc داخل الكود بالعربية المصرية — الكود نفسه (أسماء المتغيرات/الدوال) بالإنجليزية
```

---

## 9. i18n و RTL/LTR

```markdown
✅ هيكل الملفات: src/i18n/locales/{en,ar}/{common,auth,errors,home}.json
✅ كل نص عبر t('namespace:key') — ممنوع نص عربي/إنجليزي Hardcoded جوه أي مكوّن
✅ الافتراضي en/LTR — الثانوي ar/RTL
✅ تغيير اللغة يحدّث html.lang + html.dir من مكان مركزي واحد بس (مش متكرر في كل Screen)
✅ استخدم Logical Properties دايمًا (start/end) بدل (left/right)
```

---

## 10. Git Workflow (إلزامي حرفيًا)

### 10.1 اسم الفرع

```
<type>/<tree-id>-<slug-إنجليزي>
مثال: feature/1.2-design-system-bui
type: feature | fix | hotfix | release | chore | docs
```

### 10.2 صيغة الـ Commit

```
<emoji> <type>(<scope>): <عنوان مختصر>

<شرح تفصيلي بالعربية المصرية لو التغيير معقّد>
```

| Emoji | Type | Emoji | Type |
|---|---|---|---|
| ✨ | feat | ⚡ | perf |
| 🐛 | fix | 🔒 | security |
| 📝 | docs | 🏗️ | arch |
| ♻️ | refactor | 🌳 | branch |
| ✅ | test | 🔧 | chore |

```markdown
❌ ممنوع commit غامض زي "fix" أو "update"
❌ ممنوع commit واحد فيه أكتر من غرض
✅ commit واحد = تغيير منطقي واحد فقط
```

---

## 11. Checklists نهائية سريعة (افحصها قبل ما تقول "خلصت")

```markdown
### قبل أي Commit
□ الكود شغال محليًا بدون أخطاء
□ npm run lint عدّى
□ Commit message بالصيغة الصحيحة
□ docs/AI_SESSION.md اتحدّث (§ 12.3)
□ مفيش secrets أو .env اتضافوا غلط

### Definition of Done لأي Screen/Feature
□ متوافق مع Design System (§ 5) بدون استثناء
□ Responsive (Mobile/Tablet/Desktop)
□ شغال en + ar، وLTR + RTL فعليًا
□ Loading/Empty/Error states موجودة
□ Validation (Zod) لو فيه Form
□ TypeScript بدون أخطاء وبدون any
□ لا left/right غير مبررة
□ لا نص Hardcoded خارج i18n
□ لا بيانات حساسة في أي log
```

---

## 12. 🔴 بروتوكول الجلسة (الأهم في الملف ده — إلزامي بدون أي استثناء)

هذا القسم مصمم عشان **أي موديل، حتى لو رخيص أو أقل قدرة على الاستنتاج**، يقدر يشتغل بانضباط كامل من جلسة لجلسة من غير ما يضيع الـ Context أو ينسى مكانه.

### 12.1 بروتوكول بداية الجلسة (أول حاجة تعملها، قبل أي رد على المستخدم)

```markdown
1. اقرأ SPECKIT.md كامل (الملف ده).
2. اقرأ docs/AI_CONTEXT.md (لو موجود) → افهم القرارات المعمارية الثابتة.
3. اقرأ docs/AI_SESSION.md (لو موجود) → شوف آخر حاجة اتعملت وآخر تاريخ/وقت.
4. اقرأ docs/TODO.md (لو موجود) → شوف الأولويات ولو فيه todo مفتوح من جلسة سابقة.
5. اقرأ Plan.md → حدّد إنت دلوقتي في أنهي مرحلة بالظبط.
6. لو أول مرة (مفيش docs/ لسه) → ابدأ بإنشاء الأربع ملفات (§ 12.4) قبل أي كود.
7. اعرض للمستخدم بإيجاز: "إحنا في المرحلة [X] من Plan.md، آخر حاجة اتعملت كانت [Y]، هبدأ دلوقتي في [Z]".
```

### 12.2 أثناء الجلسة (تنفيذ المهمة)

```markdown
✅ التزم بمهمة واحدة ذرّية في المرة الواحدة.
✅ طبّق كل القواعد من § 2 إلى § 11 حرفيًا بدون تفاوض.
✅ لو قابلتك حاجة غامضة أو غير محسومة (خاصة تفاصيل Backend) → اسأل المستخدم، ما تفترضش.
✅ كل ملف كود جديد → File Header (§ 8.2) + تعليقات عربي مصري.
✅ كل مكوّن جديد → Checklist § 6.5 قبل ما تعتبره خلصان.
```

### 12.3 🔴 بروتوكول نهاية الجلسة (إلزامي — نفّذه دايمًا مهما كانت المهمة صغيرة أو كانت مجرد سؤال)

**الخطوة 1 — حدّث `docs/AI_SESSION.md`** (Overwrite بأحدث جلسة، أو Append لو الملف بيحتفظ بالتاريخ):

```markdown
## 🤖 AI Session — <YYYY-MM-DDTHH:MM:SSZ>

### ✅ اتعمل النهاردة
- [وصف مختصر بالعربية المصرية لكل حاجة اتنجزت فعليًا]

### 📁 الملفات المتأثرة
- `path/to/file.ts` → [وصف سطر واحد لإيه اللي اتغيّر]

### 🐛 مشاكل معروفة / todo مفتوح
- [لو فيه، وإلا اكتب "لا يوجد"]

### ⏭️ الخطوة الجاية (حسب Plan.md)
- المرحلة الحالية: [رقم واسم المرحلة من Plan.md § 21]
- الخطوة المقترحة: [مهمة محددة وواضحة]
- الفرع المقترح: `feature/x.y-...`
```

**الخطوة 2 — حدّث `docs/TODO.md`** (أضف/اشطب حسب الحالة، مقسّم 🔴 High / 🟡 Med / 🟢 Low).

**الخطوة 3 — حدّث `docs/CHANGELOG.md`** فقط لو حصل تغيير فعلي مكتمل (مش لو كانت مجرد نقاش/سؤال):

```markdown
## [Unreleased] — <YYYY-MM-DD>
### Added / Changed / Fixed
- [بند واحد لكل تغيير حقيقي]
```

**الخطوة 4 — حدّث `docs/AI_CONTEXT.md`** فقط لو اتخذ قرار معماري جديد (نادر، مش كل جلسة).

**الخطوة 5 — اعرض للمستخدم في آخر الرد (في المحادثة نفسها) التقرير المختصر ده حرفيًا:**

```markdown
📋 اللي اتعمل في الجلسة دي:
✅ [بند 1 قصير]
✅ [بند 2 قصير]

📁 الملفات: [عدد] ملف/ملفات اتعدّلت أو اتضافت
🔄 docs/AI_SESSION.md اتحدّث بتاريخ <YYYY-MM-DDTHH:MM:SSZ>

⏭️ الخطوة الجاية المقترحة (حسب Plan.md):
→ [مهمة واحدة واضحة ومحددة، مربوطة برقم المرحلة]
```

```markdown
⚠️ ممنوع إنهاء أي رد Task بدون تنفيذ الخطوات 1 و5 فوق على الأقل.
⚠️ التاريخ/الوقت لازم يكون UTC بصيغة ISO 8601 — لو الوقت الفعلي مش متاح للـ AI، استخدم آخر تاريخ معروف من المحادثة مع توضيح "تقريبي" — ممنوع اختلاق تاريخ عشوائي.
```

### 12.4 قوالب إنشاء ملفات `docs/` لأول مرة (لو المشروع لسه مبدأش)

**`docs/AI_CONTEXT.md`**
```markdown
## 🤖 AI Context — <اسم المشروع>
> آخر تحديث: <YYYY-MM-DDTHH:MM:SSZ>

### Stack المعتمد
[انسخ من SPECKIT.md § 3]

### قرارات معمارية مهمة
- [لماذا اتخدت كل قرار خرج عن الافتراضي، لو حصل]

### قرارات غير موثقة اتخذت أثناء التنفيذ
- [أي قرار اضطر الـ AI ياخده من نفسه لغياب توضيح — لازم يُراجَع بواسطة المستخدم]
```

**`docs/AI_SESSION.md`** → أول Entry بصيغة § 12.3 خطوة 1.

**`docs/TODO.md`**
```markdown
## 🔴 HIGH
- [ ] ...
## 🟡 MED
- [ ] ...
## 🟢 LOW
- [ ] ...
```

**`docs/CHANGELOG.md`**
```markdown
## [Unreleased]
### Added
- إنشاء هيكل المشروع الأساسي
```

---

## 13. خريطة المراحل المختصرة (تفصيلها الكامل في Plan.md § 21)

```text
1.1 Foundation & Tooling        → Alias + ESLint + Env + Router/Query/Axios فاضيين
1.2 Design System & BUI         → index.css + BUI-1 + أول دفعة BUI-2
1.3 App Shell                   → Layouts + Header/Sidebar + Toast/Alert
1.4 System Screens              → Splash/Error/NotFound/...
1.5 Authentication              → ⚠️ لا تبدأ قبل حسم بنود الـ Backend/Auth
1.6 Home/Dashboard              → HomeScreen + Cards + Charts
1.7 Core Business Features      → فرع مستقل لكل Feature
1.8 Advanced Shared Features    → DataTable/Upload/DnD/Filters
1.9 Accessibility/RTL Audit     → مراجعة شاملة
1.10 Testing & Quality          → Unit/Integration/E2E
1.11 Production Hardening       → Bundle/Security/Sentry
1.12 Release & Deployment       → CI/CD + Versioning
```

> **قبل أي انتقال من مرحلة لتانية:** تأكد إن "معيار الإكمال" بتاع المرحلة الحالية في Plan.md § 21 اتحقق فعلاً، ووثّق كده في docs/AI_SESSION.md.

---

## 14. القرارات اللي لازم تتحسم قبل المرحلة 5 (Authentication)

```markdown
□ شكل Backend API (REST/GraphQL) + عقد الـ Endpoints
□ آلية Auth الفعلية (JWT فقط؟ + Refresh؟ + HttpOnly Cookies؟)
□ استراتيجية تخزين الـ Token
□ عقد أخطاء الـ API الموحّد
□ الصفحة الافتراضية بعد تسجيل الدخول
```

لو أي بند من دول لسه مش محسوم وقت الوصول للمرحلة 5 → **اسأل المستخدم صراحةً، وسجّل إجابته في docs/AI_CONTEXT.md فورًا.**

---

## 15. خلاصة تنفيذية لأي AI يقرأ الملف ده

```markdown
1. اقرأ § 12.1 ونفّذه.
2. نفّذ مهمة واحدة فقط وفق § 2 → § 11.
3. اقرأ § 12.3 ونفّذه حرفيًا قبل ما تسلّم الرد — دي أهم خطوة ومفيش تنازل فيها.
4. كرر من جديد في الجلسة الجاية.
```