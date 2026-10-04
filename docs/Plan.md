
    # 📋 Plan.md — خطة تنفيذ مشروع SPA Frontend

> **الحالة:** خطة معتمدة قيد التنفيذ — تم تنفيذ Foundation وApp Shell وStatus Bar MVP
> **مصدر الدمج:** وثيقة متطلبات المشروع الأصلية + نظام قواعد BomBa (`rules` / `bomba-skills` / `design-rules` / `01-1-clean-code` / `01-2-eslint` / `central-alias-system` / `git-repo-master`)
> **آخر تحديث:** 2026-09-28
> **الإصدار:** 2.0.0 (نسخة مُحدَّثة ومُطابِقة لنظام BomBa)

## 0.1 حالة التنفيذ الحالية

- Foundation وAlias وBUI وApp Shell منفذة وتعمل.
- `StatusBar` هو المكوّن الرسمي الوحيد ويعمل كـ Footer داخل `RootLayout`.
- تم إضافة Logo مركزي قابل لإعادة الاستخدام من `src/components/branding/Logo.tsx`.
- تم إضافة Live Clock بتوقيت القاهرة، Gregorian، وUmm al-Qura Hijri.
- تم إضافة Language/Theme toggles وNotifications Popover وSettings Drawer فعلي بإعدادات الوقت والمنطقة الزمنية.
- تم عزل Radix Popover/Dialog خلف `src/components/BUI/Overlays.tsx` و`src/alias/lib.ts` بحيث يمكن استبدال المكتبة من طبقة واحدة.
- تم ربط Health Check دوري قابل للتبديل عبر `VITE_API_BASE_URL/health` مع حالات Checking/Online/Degraded/Offline.
- الخطوات المتبقية: مصدر Notifications حقيقي، وإضافة اختبارات E2E.

---

## 0. ملاحظة منهجية قبل أي حاجة

الوثيقة الأصلية اللي وصلتني كانت عامة ومستقلة عن أي نظام تصميم محدد (Tailwind + shadcn + Radix بدون طبقة BUI، ومن غير Alias System، ومن غير نظام تسمية `T_/I_`). أنا هنا مش بلغي الوثيقة، أنا بـ**دمجها** مع قواعد BomBa الصارمة، وبطبّق قاعدة **"الأخص يكسب الأعم"**:

- أي حاجة تخص **نظام التصميم / البنية / التسمية / الجودة / Git** → **قواعد BomBa هي الحاكمة 100%** ومفيش تفاوض فيها.
- أي حاجة تخص **اختيار مكتبة وظيفية محددة** (زي Router أو State Manager) كانت موجودة صراحةً في وثيقة المتطلبات الأصلية ومالهاش تعارض حقيقي مع فلسفة BomBa → **بتفضل زي ما هي** (لأنها قرار منتج/مشروع مش قرار تصميم)، وبتتنفّذ **جوه** طبقات BomBa (Alias, BUI, Tailwind Tokens) مش بجانبها.
- أي تعارض حقيقي (زي Redux مقابل Zustand) بيتحل ويتوثّق صراحةً تحت في قسم **"القرارات المحسومة"** بدل ما يتسيب غامض.

⚠️ **هذا الملف يصف الخطة والقرارات؛ حالة التنفيذ الفعلية موثقة في `docs/AI_SESSION.md`.**

---

## 1. نظرة عامة على المشروع

تطبيق **SPA** مبني بـ **React 19 + TypeScript + Vite 6**، بمعايير احترافية تشمل:

- بنية Feature-based قابلة للتوسع بدون إعادة هيكلة.
- نظام مكونات طبقي موحّد (**BUI**) فوق Tailwind + shadcn/ui + Radix UI.
- نظام استيراد مركزي (**Alias System** — `@a`) يمنع أي استيراد مباشر غير منضبط.
- دعم كامل ثنائي اللغة (English LTR / Arabic RTL) عبر i18next مع Logical Properties.
- فصل صارم بين Client State (Zustand) و Server State (TanStack Query).
- التزام تام بـ UTC + ISO 8601 لكل التواريخ، وتحويل للـ Local Timezone وقت العرض فقط.
- Styling مبني على **Tailwind CSS 4 + CSS Modules**، مع Design Tokens عبر CSS Variables و`em` وTailwind `@theme`.
- جودة كود صارمة: TypeScript Strict، ESLint Zero-Noise، تعليقات وJSDoc بالعربية المصرية، Git Workflow برقم شجري.

---

## 2. القرارات المعمارية المحسومة (Resolved Decisions)

جدول يوضح كل قرار تقني، ومصدره، وسبب اعتماده — عشان محدش يرجع يسأل "ليه استخدمنا كذا" لاحقًا.

| المجال | القرار المعتمد | المصدر | ملاحظة |
|---|---|---|---|
| Build Tool | Vite 6 | الوثيقة الأصلية + BomBa | متطابقين |
| Framework | React 19 | الوثيقة الأصلية + BomBa | متطابقين |
| Language | TypeScript (Strict، بدون `any`) | BomBa (حاكم) | صارم غير قابل للتفاوض |
| Styling | Tailwind CSS 4 + CSS Modules + shadcn/ui + Radix | قرار المشروع الحالي | Tailwind للـ utilities وCSS Modules للأنماط المركبة داخل BUI |
| Design Tokens | CSS Variables + `em` + `@theme` + `B:` utilities | **BomBa (حاكم — Override)** | هذا هو نظام التصميم الملزم، مفيش استثناء |
| نظام المكونات | طبقة **BUI** (BUI-1 → BUI-2 → BUI-O → Screens) فوق shadcn/Radix | **BomBa (حاكم)** | shadcn/Radix تُستخدم *داخل* BUI-2/BUI-O، مش تُستدعى مباشرة في الشاشات |
| الاستيراد | **Alias System المركزي** (`@a`, `@ui`, `@icons`, `@store`, `@const`) | **BomBa (حاكم)** | ممنوع أي `import` مباشر في الصفحات |
| Routing | **TanStack Router** | الوثيقة الأصلية (يُعتمد) | *قرار محسوم:* بديل React Router الافتراضي عند BomBa — Type-safe Routing أنسب لمشروع بالحجم ده |
| Client State | **Zustand + Persist** | الوثيقة الأصلية (يُعتمد) | *قرار محسوم:* بديل Redux Toolkit الافتراضي عند BomBa — أخف وأنسب لحجم الـ Client State المطلوب هنا |
| Server State | **TanStack Query (react-query)** | الوثيقة الأصلية + BomBa | متطابقين |
| HTTP Client | Axios (مركزي، Interceptors، Error Normalization) | الوثيقة الأصلية + BomBa | يُنفَّذ كـ Pure Layer (تفصيل في § 9) |
| Forms | react-hook-form + Zod | الوثيقة الأصلية + BomBa | متطابقين |
| Tables | @tanstack/react-table | الوثيقة الأصلية | يُستخدم داخل BUI-O `DataTable` |
| Dates | Day.js — UTC داخليًا، Local عند العرض فقط | الوثيقة الأصلية + BomBa | متطابقين، إلزامي |
| i18n | i18next + react-i18next، Namespaces + Lazy Load | الوثيقة الأصلية + BomBa | متطابقين |
| Icons | lucide-react، عبر `alias/icons.ts` بـ **Icon prefix إلزامي** | الوثيقة الأصلية + BomBa | react-icons (Social فقط: Google/Facebook) لو احتجنا |
| Animation | framer-motion (عند الحاجة الفعلية فقط) | الوثيقة الأصلية | مع احترام `prefers-reduced-motion` |
| File Upload | react-dropzone | الوثيقة الأصلية | Client validation مش بديل عن Backend |
| Drag & Drop | dnd-kit | الوثيقة الأصلية | عند الحاجة فقط |
| Charts | Recharts (افتراضي) / Chart.js عند الحاجة | الوثيقة الأصلية | Lazy-loaded دائمًا |
| Dialogs | Radix Dialog داخل BUI-O | الوثيقة الأصلية + BomBa | ممنوع Modal مخصص لو Radix كافية |
| Confirm/Alert | SweetAlert2 | الوثيقة الأصلية | للـ Destructive/Confirm فقط |
| Toast | Sonner | الوثيقة الأصلية | متطابق |
| Error Tracking | Sentry (Production) | الوثيقة الأصلية + BomBa | بدون Tokens/Secrets في الـ Logs |
| Class Utilities | clsx + tailwind-merge عبر `cn()` | الوثيقة الأصلية + BomBa | إلزامي بدل تكرار الشروط |
| Naming | camelCase / PascalCase / `T_` / `I_` / `UPPER_SNAKE_CASE` | **BomBa (حاكم)** | تفصيل كامل في § 11 |
| Git | Branch Tree Numbering + Commit Emoji Format | **BomBa (حاكم)** | تفصيل كامل في § 15 |
| اللغة الافتراضية | English (`en` / LTR) | الوثيقة الأصلية | ثانوية: Arabic (`ar` / RTL) |
| الثيم الافتراضي | Light Mode | الوثيقة الأصلية | البنية تدعم Dark مستقبلًا عبر متغيرات BomBa (`--flip-l`, `--ISD`) بدون إعادة هيكلة |

---

## 3. الـ Tech Stack الكامل (نسخة نهائية)

```yaml
Core:
  Build        : Vite 6
  Framework    : React 19
  Language     : TypeScript 5.x (strict)
  Styling      : Tailwind CSS 4 + shadcn/ui + Radix UI (+ BUI layer فوقها)

Routing & Data:
  Router       : TanStack Router
  Server State : @tanstack/react-query
  Client State : Zustand + persist middleware
  HTTP         : Axios (مركزي، عبر @a)

Forms & Data Display:
  Forms        : react-hook-form + Zod
  Tables       : @tanstack/react-table
  Charts       : Recharts (افتراضي) | Chart.js + react-chartjs-2 (عند الحاجة)

i18n & Dates:
  i18n         : i18next + react-i18next
  Dates        : Day.js (UTC strategy + ISO 8601)

UI Utilities:
  Icons        : lucide-react (+ react-icons لأيقونات Social فقط)
  Animation    : framer-motion
  Dialogs      : @radix-ui/react-dialog
  Tooltips     : @radix-ui/react-tooltip
  Confirm/Alert: SweetAlert2
  Toast        : Sonner
  File Upload  : react-dropzone
  Drag & Drop  : dnd-kit
  Class Utils  : clsx + tailwind-merge (cn())

Quality & Ops:
  Lint         : ESLint (Flat Config — eslint.config.mjs)
  Format       : Prettier
  Error Track  : Sentry
  Testing      : Vitest / React Testing Library / Playwright (تُحسم في § 20)
```

---

## 4. الهيكل الكامل للمشروع (Directory Structure)

دمج بين هيكل الوثيقة الأصلية (§36) وهيكل BomBa الإلزامي (Alias + BUI + Feature-based):

```text
project/
├── src/
│   ├── alias/                      ← 🔒 نظام الاستيراد المركزي (إلزامي)
│   │   ├── core.ts                 → React + TanStack Router + i18n + Hooks
│   │   ├── ui.ts                   → BUI-1 + BUI-2 + BUI-O + shadcn/Radix wrappers
│   │   ├── icons.ts                → كل الأيقونات (Icon prefix إلزامي)
│   │   ├── store.ts                → Zustand stores + TanStack Query client
│   │   ├── constants.ts            → Routes + Config + Assets
│   │   └── index.ts                → export * from all (نقطة الدخول @a)
│   │
│   ├── components/
│   │   ├── BUI-1.tsx                → HTML wrappers (بدون منطق/state)
│   │   ├── BUI-2.tsx                → UI Components (Input2, Button2, Select2 ...)
│   │   ├── BUI-O/                   → Compound Components
│   │   │   ├── Modal.tsx            → مبني فوق Radix Dialog
│   │   │   ├── DataTable.tsx        → مبني فوق TanStack Table
│   │   │   ├── Panel.tsx
│   │   │   └── TabPanel.tsx
│   │   ├── global/                  → مكونات عامة (BtnTheme, BtnLanguage, LoaderScreen)
│   │   └── layout/                  → Header, Sidebar, MobileNav, PageContainer, Breadcrumbs
│   │
│   ├── app/
│   │   ├── layouts/
│   │   │   ├── RootLayout.tsx
│   │   │   ├── PublicLayout.tsx
│   │   │   ├── AuthLayout.tsx
│   │   │   └── AuthenticatedLayout.tsx
│   │   ├── router/
│   │   │   └── router.tsx           → TanStack Router tree + Guards
│   │   └── providers/
│   │       └── AppProviders.tsx     → Query Client + i18n + Theme + Sentry
│   │
│   ├── screens/                     ← الشاشات النظامية (§8)
│   │   ├── SplashScreen/
│   │   ├── ErrorScreen/
│   │   ├── NotFoundScreen/
│   │   ├── UnauthorizedScreen/
│   │   ├── ForbiddenScreen/
│   │   ├── OfflineScreen/
│   │   └── MaintenanceScreen/
│   │
│   ├── features/                    ← Feature-based (كل Feature مستقل)
│   │   └── <feature-name>/
│   │       ├── api/                 → axios calls + query/mutation hooks
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── schemas/             → Zod schemas
│   │       ├── types/
│   │       └── utils/
│   │
│   ├── features/auth/                → Feature أول وأهم (تفصيل في المرحلة 5)
│   ├── features/home/                → Dashboard الرئيسي (المرحلة 6)
│   │
│   ├── hooks/                        → Hooks عامة (useAuth, useLocalizedPath, useTheme)
│   │
│   ├── stores/                       → Zustand Stores
│   │   ├── settingsStore.ts          → theme, language, UI prefs (persist)
│   │   ├── authStore.ts              → session, user (persist انتقائي)
│   │   └── uiStore.ts                → modals/loader غير الدائمة (بدون persist)
│   │
│   ├── services/
│   │   ├── http/
│   │   │   └── axiosClient.ts        → Instance + Interceptors + Error Normalization
│   │   └── repositories/             → طبقة نداء الـ API لكل Domain
│   │
│   ├── i18n/
│   │   ├── config.ts
│   │   └── locales/
│   │       ├── en/  (common, auth, errors, home, ...)
│   │       └── ar/  (common, auth, errors, home, ...)
│   │
│   ├── types/                        → أنواع محلية (T_/I_ prefix) — أنواع مشتركة فعليًا تتنقل لـ packages/types لو المشروع Monorepo
│   ├── utils/                        → buildProps, cn(), formatDate, formatNumber ...
│   ├── lib/
│   │   ├── dayjs/                    → إعداد Day.js + UTC plugin
│   │   └── query/                    → QueryClient config
│   │
│   ├── assets/
│   ├── index.css                     → @import "tailwindcss" + :root Variables + @theme + B: utilities
│   └── main.tsx
│
├── docs/                             ← 🔒 ملفات الاستمرارية الإلزامية
│   ├── AI_CONTEXT.md
│   ├── AI_SESSION.md
│   ├── TODO.md
│   └── CHANGELOG.md
│
├── .env
├── .env.example
├── eslint.config.mjs
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
```

> **ملاحظة:** ما نبنيش أي مجلد فاضي أو Feature مش موجودة فعليًا — المجلدات دي "خريطة مسموح بيها" مش "قائمة تنفيذ إجبارية من اليوم الأول" (مبدأ BomBa: Build What You Need).

---

## 5. نظام التصميم (Design System) — الجزء الحاكم بلا استثناء

هذا القسم هو **الأولوية القصوى** في الالتزام حسب طلبك. أي مخالفة له تعتبر خطأ حرج (Critical) وليس ملاحظة تحسينية.

### 5.1 الفلسفة (غير قابلة للتفاوض)

```markdown
1. em هي وحدة القياس الأساسية لكل spacing / font-size / radius — ممنوع px داخل المكونات
2. كل لون = CSS Variable — ممنوع hex/rgb/اسم لون مباشر داخل أي className
3. Tailwind 4 → التسجيل عبر @theme داخل index.css — ممنوع tailwind.config.js
4. القيم المتكررة (Shadow / Radius / Transition / RTL Transform) → B: prefix utilities
5. ترتيب Tailwind classes ثابت دائمًا:
   Positioning → Display → Box Model → Typography → Visuals
6. ممنوع dark: prefix — الـ CSS Variables بتتغيّر تلقائيًا مع [data-theme="dark"]
7. اتجاه اللغة → Logical Properties فقط (start/end, ms/me, ps/pe) بدل left/right
```

### 5.2 `index.css` — البنية الإلزامية

يجب أن يحتوي على 3 أقسام بالترتيب:

1. **`:root` Variables** — الألوان الأساسية (HSL)، حالة الثيم (`--flip-l`, `--ISD`)، اتجاه اللغة (`--ltr`, `--dir-start`, `--dir-end`)، إعدادات الظل/الحواف (`--shadow`, `--radius`)، الخط (`--ffy`)، الـ z-index layers.
2. **`@theme`** — تسجيل الـ Spacing / Font Size / Radius بوحدة `em`، وربط الألوان بمتغيرات `:root` عشان Tailwind يقدر يولّد classes زي `bg-py`, `text-te`, `p-4`.
3. **`@layer utilities`** — كل الـ `B:` utilities (`B:shadow-*`, `B:rounded-*`, `B:transition-*`, `B:font-var`, `B:z-*`, `B:overlay`, `B:dir-position`, `B:translate-rtl*`).

### 5.3 خريطة الألوان الدلالية (Semantic Colors)

| الاسم | الاستخدام |
|---|---|
| `py` / `sy` / `at` / `md` | Primary / Secondary / Accent / Muted |
| `ok` / `err` / `war` / `inf` | Success / Error / Warning / Info |
| `bg` | خلفية عامة |
| `te` | نص العناوين (Title) |
| `tt` | نص أساسي (Text) |
| `sn` | نص ثانوي (Subtext) |
| `br` | حدود (Border) |
| `over` / `trans` | Overlay شفاف / شفاف كامل |

> **قاعدة صارمة:** أي مكوّن جديد يحتاج لونًا غير موجود بالجدول ده → **يُضاف كـ Variable في `:root` أولًا**، مفيش لون "يظهر فجأة" جوه مكوّن.

### 5.4 دعم Dark Mode المستقبلي (بدون تنفيذه الآن)

الوثيقة الأصلية بتحدد Light Mode كافتراضي، وبتطلب إن البنية تسمح بـ Dark لاحقًا. نظام BomBa بيحقق الشرط ده تلقائيًا عبر `--flip-l` و `--ISD` و `[data-theme="dark"]` — يعني **مفيش أي إعادة هيكلة مطلوبة مستقبلًا**، بس تفعيل الـ toggle وتحديث الـ Zustand `settingsStore`.

### 5.5 RTL / LTR Audit (إلزامي قبل أي Release)

- `html.lang` و `html.dir` يتحدّثوا تلقائيًا مع تغيير اللغة (Effect مركزي واحد، مش متكرر في كل Screen).
- كل الـ Spacing/Positioning بـ Logical Properties.
- مراجعة خاصة لـ: Navigation, Icons ذات دلالة اتجاهية (Arrows/Chevrons), Dropdowns, Dialogs, Tables, Pagination, Charts, النصوص الطويلة/Truncation.
- ممنوع اعتبار "قلب الصفحة آليًا" = دعم RTL كافي — لازم فحص UX فعلي لكل Feature.

---

## 6. نظام BUI — طبقات المكونات

```text
BUI-1  → HTML Wrappers نقية (بدون state/hooks) — تُبنى فوقها كل حاجة
BUI-2  → UI Components (Input2, Button2, Select2, Card2 ...) — تستخدم BUI-1 فقط + shadcn/Radix Primitives عند الحاجة
BUI-O  → Compound Components (Modal, DataTable, Panel, TabPanel) — تستخدم BUI-2 فقط
Screens/Features → تستخدم BUI-O / BUI-2 فقط — ممنوع HTML مباشر أو استدعاء Radix مباشرة
```

### 6.1 قواعد إلزامية لكل مكوّن

- `buildProps()` تُستخدم لتنظيف `className`/`style` في كل مكوّن بلا استثناء.
- الـ `interface` بتاعت أي مكوّن لازم تمتد (`extends`) من الـ HTML Attributes الأصلية.
- `...restProps` دايمًا في آخر الـ destructuring.
- استخدام `classGroup` / `classLabel` / `classInput` بدل تكرار `className` في أكتر من مكان.
- الأيقونات جوه المكونات بـ `Icon` prefix دايمًا (`IconSearch`, `IconClose`, ...).
- كل مكوّن جديد يُضاف فورًا لـ `alias/ui.ts`.

### 6.2 قائمة مكونات BUI المخطط بناؤها (حسب الحاجة الفعلية — من § 4 بالوثيقة الأصلية)

| BUI-1 | BUI-2 | BUI-O |
|---|---|---|
| H1–H6, P, Span, A, Div1–5, Header, Main, Section, Form, Label, Input, Select, Textarea, Button, Check, Radio | Button2 (IconButton), Input2 (PasswordInput2), Textarea2, Select2, Checkbox2, Radio2, Switch2, FormField2, FieldError2, Card2, Badge2, Avatar2, Separator2, Tooltip2, Dropdown2, Tabs2, Skeleton2, Spinner2 | Modal (Radix Dialog), DataTable (TanStack Table), EmptyState, ErrorState, Pagination, FileUploader (react-dropzone), Dialog (SweetAlert2 wrapper) |

> تُبنى تدريجيًا مع كل Feature تحتاجها — مفيش بناء استباقي لمكوّن مالوش استخدام فعلي (مبدأ BomBa § "لا Over-engineering").

---

## 7. نظام الاستيراد المركزي (Alias System)

```typescript
// ✅ الاستيراد العام للصفحات/الفيتشرز
import { useState, useTranslation, Button2, Input2, IconSearch, ROUTES } from '@a'

// ✅ الاستيراد المحدد في ملفات UI كبيرة (اختياري لتحسين الوضوح)
import { Button2, Card2 } from '@ui'
```

### 7.1 ملفات الـ Alias

| الملف | المحتوى |
|---|---|
| `alias/core.ts` | React, TanStack Router hooks, react-i18next hooks, Hooks عامة |
| `alias/ui.ts` | BUI-1 + BUI-2 + BUI-O + أي wrapper لـ shadcn/Radix |
| `alias/icons.ts` | كل الأيقونات بـ `Icon` prefix (lucide-react + react-icons لـ Social) |
| `alias/store.ts` | Zustand hooks/actions + TanStack Query client/hooks |
| `alias/constants.ts` | `ROUTES`, Config, Assets, `SUPPORTED_LANGUAGES`, `DEFAULT_LANGUAGE`, `DEFAULT_AppTheme` |
| `alias/index.ts` | `export * from` كل الملفات فوق → دي نقطة `@a` |

### 7.2 قواعد صارمة

```markdown
❌ ممنوع import مباشر من react-router أو lucide-react أو zustand داخل Screens/Features
❌ ممنوع مسارات نسبية عميقة (../../../)
✅ الملفات المحلية جوه نفس الـ Feature تُستورد مباشرة (مسار قصير)
✅ أي إضافة/حذف مكتبة أو مكوّن → تحديث فوري لملف الـ alias المناسب
```

---

## 8. i18n — تعدد اللغات

```text
src/i18n/locales/
├── en/
│   ├── common.json
│   ├── auth.json
│   ├── errors.json
│   └── home.json
└── ar/
    ├── common.json
    ├── auth.json
    ├── errors.json
    └── home.json
```

- **افتراضي:** `en` / `LTR` — **ثانوي:** `ar` / `RTL`.
- كل نص ظاهر للمستخدم يمر عبر `t('namespace:key')` — **ممنوع نص Hardcoded** في أي مكوّن.
- Namespaces منظمة حسب Feature/Domain، مع Lazy Loading عند الحاجة.
- Fallback إلزامي للإنجليزية لو مفتاح الترجمة ناقص بالعربي.
- تغيير اللغة → `useSettings`/`settingsStore` يحدّث `html.lang` + `html.dir` + Zustand persist، في مكان واحد مركزي.

---

## 9. طبقة الـ HTTP والـ API

### 9.1 مبدأ الفصل (Pure Layer)

عشان نتجنب مشكلة شائعة (خلط Side Effects جوه Axios Interceptor)، بنطبّق نمط **Callback Injection**:

```text
axiosClient.ts  → Pure: base URL, headers, timeout, request/response interceptors
                  الحصول على الـ Token يتم عبر _getToken() injected من الخارج
                  مفيش localStorage.getItem() أو dispatch() مباشر جوه الملف ده
authStore/authRepository → مسؤولين عن حقن الـ Token والتعامل مع Refresh Flow
```

- Error Normalization موحّد (شكل واحد للأخطاء القادمة من أي Endpoint).
- دعم Request Cancellation + Retry Policies عبر TanStack Query.
- Token Refresh Flow منفصل بوضوح عن باقي الـ Interceptors.
- **ممنوع** تسجيل Token أو Authorization headers في أي Log أو Sentry breadcrumb.

### 9.2 Repositories

كل Domain (auth, users, ...) له `repository` مستقل جوه `services/repositories/` أو جوه `features/<name>/api/` — الشاشات **لا تستدعي Axios مباشرة أبدًا**.

---

## 10. إدارة الحالة (State Management)

### 10.1 Client State — Zustand + Persist

```markdown
✅ يُستخدم فقط لـ: تفضيلات المستخدم، UI State، Session معلومات محدودة، بيانات مشتركة بين أجزاء غير مترابطة
❌ ممنوع استخدامه لتخزين بيانات قادمة من السيرفر (دي مسؤولية TanStack Query)
✅ persist يُفعَّل فقط عند حاجة فعلية للاستمرار بعد refresh (مثال: theme, language, session token المحدود)
✅ لكل Store غرض واحد واضح (settingsStore / authStore / uiStore) — بدون Store عملاق واحد
```

### 10.2 Server State — TanStack Query

```markdown
✅ كل نداء API له Query Key منظم وقابل للتوسع: ['users', 'list', filters]
✅ Mutations مع onSuccess/onError موحّدين لإدارة invalidateQueries
✅ Loading / Error / Empty states مُدارة من الـ Query نفسها — مش state يدوي إضافي
❌ ممنوع نسخ بيانات Query لـ Zustand بدون سبب معماري موثّق
```

---

## 11. القواعد العامة للكود (Clean Code + Naming)

### 11.1 Naming Convention

| النوع | الأسلوب | مثال |
|---|---|---|
| Variables / Functions | `camelCase` | `getUserById` |
| Hooks | `camelCase` + `use` | `useLocalizedPath` |
| Components / Classes | `PascalCase` | `UserCard` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT` |
| ملفات Components | `PascalCase.tsx` | `UserCard.tsx` |
| ملفات Hooks | `camelCase.ts` | `useAuth.ts` |
| ملفات Utils | `kebab-case.ts` | `format-date.ts` |
| Types مخصصة | `PascalCase` + `T_` | `T_AppTheme`, `T_Language` |
| Interfaces | `PascalCase` + `I_` | `I_UserDTO` |

### 11.2 TypeScript — قواعد صارمة

- **ممنوع `any` تمامًا** — أنواع صريحة، Generics للدوال المشتركة، Utility Types عند الحاجة.
- `strict: true` في `tsconfig.json`.

### 11.3 File Header إلزامي في كل ملف

```typescript
/**
 * @file        : src/path/to/file.ts
 * @description : [وصف بالعربية المصرية]
 * @updated     : [
 *   { "date": "YYYY-MM-DD", "version": "1.0.0", "by": ["BomBa"], "comment": "إنشاء الملف" }
 * ]
 */
```

### 11.4 التعليقات و JSDoc

- **الكود بالإنجليزية — كل تعليق/JSDoc بالعربية المصرية بدون استثناء.**
- Sections بـ `//#region` / `//#endregion` مع إيموجي دلالي (🧠 State, ⚡ Effects, 🎯 Handlers, 🎨 Styling, 🔒 Security).
- Markers: `[TODO]`, `[DISABLED]`, `[DEPRECATED]`, `[FIXME]`.

### 11.5 ESLint (Zero Noise Policy)

- `eslint.config.mjs` (Flat Config — **ممنوع `.eslintrc`**).
- `@typescript-eslint/no-explicit-any: error`.
- `@typescript-eslint/no-unused-vars: error` مع `argsIgnorePattern/varsIgnorePattern: '^_'`.
- `react-hooks/rules-of-hooks: error`, `react-hooks/exhaustive-deps: warn`.
- `npm run lint` لازم يعدي **قبل أي commit**.

---

## 12. Error Handling & Error Tracking

| نوع الخطأ | التعامل |
|---|---|
| Validation Error | تظهر جوه الـ Form عبر react-hook-form + Zod |
| API Error | Error Normalization من `axiosClient` → رسالة مترجمة عبر i18n |
| Authentication/Authorization Error | إعادة توجيه لـ `UnauthorizedScreen`/`ForbiddenScreen` أو Refresh Flow |
| Network Error | `OfflineScreen` أو Toast (Sonner) حسب السياق |
| Not Found | `NotFoundScreen` |
| Unexpected Error | `ErrorScreen` (Full-screen) أو Error Boundary محلي |

- **ممنوع** عرض Stack Traces أو تفاصيل سيرفر داخلية للمستخدم النهائي.
- Sentry مفعّل في Production فقط، مع فصل الإعدادات بين البيئات، وبدون إرسال Tokens/Passwords/Headers حساسة.

---

## 13. الشاشات الأساسية والترتيب

### 13.1 شاشات النظام (System Screens)

`SplashScreen`, `ErrorScreen`, `NotFoundScreen`, `UnauthorizedScreen`, `ForbiddenScreen`, `OfflineScreen`, `MaintenanceScreen` — تُبنى حسب الحاجة الفعلية للمنتج، مش كلها إجباري من اليوم الأول (عدا Splash/Error/NotFound).

### 13.2 الشاشات الأولية (نفس ترتيب الوثيقة الأصلية)

```text
1. ErrorScreen
2. SplashScreen
3. SigninScreen
4. HomeScreen
```

---

## 14. الأداء (Performance) و Code Splitting

- Lazy Loading على مستوى الـ Routes (TanStack Router)، وعلى المكتبات الثقيلة (Charts, dnd-kit, framer-motion عند الحاجة).
- تجنّب Re-renders غير الضرورية: `memo`, `useMemo`, `useCallback` **فقط عند حاجة فعلية مُقاسة**، مش استباقيًا.
- Parallel requests (`Promise.all`) بدل Sequential awaits.
- مراقبة Initial Bundle Size + Tree Shaking + Assets Optimization.
- Web Vitals المستهدفة: `LCP < 2.5s`, `FID < 100ms`, `CLS < 0.1`.

---

## 15. Git Workflow (إلزامي — من `git-repo-master`)

### 15.1 نظام الترقيم الشجري للفروع

```
<type>/<tree-id>-<slug-بالإنجليزية>

مثال:
main
 └── develop                         → 1
       ├── feature/1.1-foundation-setup
       ├── feature/1.2-design-system-bui
       ├── feature/1.3-app-shell
       ├── feature/1.4-system-screens
       ├── feature/1.5-authentication
       ├── feature/1.6-home-dashboard
       └── feature/1.x-<feature-name>
 └── hotfix/0.1-<slug>               → متفرع من main مباشرة
```

- كل فرع لازم رقم شجري + type بادئ — **مفيش استثناء**.
- قبل أي فرع جديد: `git branch -a` للتأكد من آخر رقم مستخدم.

### 15.2 Commit Messages

```
<emoji> <type>(<scope>): <عنوان مختصر>

<شرح تفصيلي بالعربية المصرية عند الحاجة>
```

| Emoji | Type |
|---|---|
| ✨ | feat |
| 🐛 | fix |
| 📝 | docs |
| ♻️ | refactor |
| ✅ | test |
| 🔧 | chore |
| ⚡ | perf |
| 🔒 | security |
| 🏗️ | arch |
| 🌳 | branch |

- Commit واحد = تغيير منطقي واحد (Atomic).
- العنوان ≤ 72 حرف.
- ممنوع commits غامضة زي "fix" أو "update".

### 15.3 Pull Requests

قالب إلزامي (الهدف، الفرع، التغييرات، تم الاختبار، ملاحظات للمراجع) — تفصيل كامل جوه `git-repo-master`.

---

## 16. الاختبارات (Testing Strategy)

الأولوية لاختبار المسارات الحرجة:

```markdown
□ Authentication flow (login/logout/refresh)
□ Routing/Guards (Protected/Guest routes)
□ Forms (validation + submit + server errors)
□ API error handling
□ Permissions/Roles (لو موجودة)
□ UTC ↔ Local timezone conversion
□ LTR/RTL rendering
□ Critical business flows (تُحدد لكل Feature عند بداية تنفيذها)
```

> أدوات الاختبار الفعلية (Vitest/RTL/Playwright أو غيرها) تُحسم رسميًا في **§ 18 — قرارات معلّقة**، قبل بداية المرحلة 10.

---

## 17. Accessibility (غير قابل للتفاوض)

```markdown
□ Semantic HTML (header, main, nav, article ...)
□ ARIA عند الحاجة (aria-label, aria-describedby, role)
□ Keyboard Navigation + Tab order منطقي
□ Focus states واضحة + Focus trapping في Dialogs
□ Color Contrast ≥ WCAG AA (4.5:1)
□ Labels صحيحة (htmlFor) لكل Input
□ الاعتماد على سلوك Radix الافتراضي بدل تعطيله
□ احترام prefers-reduced-motion
```

---

## 18. القرارات المطلوب حسمها قبل بدء أي كود فعلي

طبقًا لقاعدة BomBa ("لا يُفترض تفاصيل Backend الحساسة قبل معرفة العقد الفعلي")، القرارات دي **لازم توثيق رسمي قبل المرحلة 1**:

```markdown
□ شكل Backend API الفعلي (REST/GraphQL) والعقد الكامل للـ Endpoints
□ Base URLs لكل بيئة (Development / Staging / Production)
□ آلية Authentication الفعلية (JWT فقط؟ + Refresh؟ + Cookies HttpOnly؟)
□ استراتيجية تخزين الـ Token (Local/Session/Cookie) — تُحدد حسب تصميم Backend
□ User Model + نموذج الصلاحيات (Roles/Permissions)
□ عقد أخطاء الـ API الموحّد { success, data, message } أو غيره
□ عقد الـ Pagination والـ Search/Filter
□ عقد رفع الملفات (File Upload contract)
□ الصفحة الافتراضية بعد تسجيل الدخول
□ سلوك انتهاء الـ Session (Session expiration behavior)
□ أدوات الاختبار المعتمدة رسميًا (Vitest/Jest + RTL + Playwright/Cypress)
□ بيئة الـ CI/CD المستهدفة (GitHub Actions / غيرها) وTarget الـ Deployment
```

⚠️ **مفيش بدء فعلي للمرحلة 5 (Authentication) قبل حسم البنود الخاصة بالـ Auth أعلاه.**

---

## 19. القواعد غير القابلة للتفاوض (Project-wide، مدموجة من الوثيقتين)

```markdown
1.  اللغة الافتراضية: English / LTR — الثانوية: Arabic / RTL
2.  Mobile First في كل تصميم
3.  Light Mode افتراضي — البنية جاهزة لـ Dark بدون إعادة هيكلة
4.  Logical Properties (start/end) بدل left/right دايمًا عند ارتباط الخاصية باللغة
5.  UTC لكل تخزين/معالجة/تبادل للتواريخ — ISO 8601 دايمًا ما أمكن
6.  التحويل لـ Local Timezone عند العرض فقط
7.  Server State → TanStack Query فقط — Client State → Zustand فقط
8.  persist في Zustand فقط عند حاجة فعلية موثّقة
9.  ممنوع تفاصيل HTTP مباشرة داخل Screens/Features
10. ممنوع تكرار UI Pattern لو ينفع يتحول BUI component
11. ممنوع مكتبات ثقيلة في Initial Bundle بدون حاجة فعلية
12. كل نص للمستخدم يمر عبر i18n — ممنوع نص Hardcoded
13. حماية Frontend (Route Guards) مش بديل عن صلاحيات Backend أبدًا
14. ممنوع تخزين/تسريب Secrets داخل Frontend
15. Accessibility جزء أساسي مش إضافة لاحقة
16. ممنوع any في TypeScript
17. ممنوع استيراد مباشر في الصفحات (لازم @a)
18. ممنوع تخطي طبقات BUI (BUI-1 → BUI-2 → BUI-O → Screen)
19. ممنوع أيقونة بدون Icon prefix
20. ممنوع لون/قياس مكتوب مباشرة — كله من CSS Variables + @theme
21. كل فرع Git لازم رقم شجري — كل Commit لازم صيغة Emoji + وصف واضح
22. أي استثناء معماري مؤثر لازم يكون مقصود وموثّق في `docs/AI_CONTEXT.md`
```

---

## 20. المبدأ المعماري العام (تسلسل التنفيذ)

```text
Foundation (Alias + Tooling + Env)
    ↓
Design System / BUI (index.css tokens + BUI-1/2/O)
    ↓
App Shell (Layouts + Router + Providers)
    ↓
System Screens
    ↓
Authentication
    ↓
Home / Dashboard
    ↓
Business Features (حسب نطاق المنتج)
    ↓
Advanced Shared Features (Tables/Upload/DnD/Charts)
    ↓
Accessibility + RTL + Responsive Audit
    ↓
Testing
    ↓
Production Hardening
    ↓
Release & Deployment
```

---

## 21. مراحل التنفيذ التفصيلية (Roadmap)

> كل مرحلة ليها **معيار إكمال (Definition of Done)** واضح، وفرع Git بترقيم شجري مقترح.

### المرحلة 1 — Foundation & Tooling
`feature/1.1-foundation-setup`

- إنشاء المشروع بـ Vite 6 + React 19 + TypeScript (strict).
- إعداد Tailwind CSS 4 + shadcn/ui + Radix UI كنقطة انطلاق.
- إعداد `eslint.config.mjs` (Flat Config) + Prettier.
- بناء **Alias System** الكامل (`alias/core.ts`, `ui.ts`, `icons.ts`, `store.ts`, `constants.ts`, `index.ts`).
- إعداد Environment Config (`.env`, `.env.example`, تحقق بـ Zod).
- إعداد TanStack Router (Router أساسي فاضي) + TanStack Query Client + Axios Client (Pure Layer).
- إعداد Zustand stores الأساسية (settingsStore, uiStore).
- إعداد i18n (config + هيكل locales فاضي).
- إعداد Day.js (UTC plugin).
- إنشاء `docs/AI_CONTEXT.md`, `AI_SESSION.md`, `TODO.md`, `CHANGELOG.md`.

**معيار الإكمال:** البنية شغالة وقابلة لاستدعاء `@a` من أي مكان، `npm run lint` نضيف تمامًا، بدون Screens حقيقية لسه.

---

### المرحلة 2 — Design System & BUI
`feature/1.2-design-system-bui`

- كتابة `index.css` كامل: `:root` Variables + `@theme` + `B:` utilities (طبق الأصل من § 5).
- بناء `BUI-1.tsx` (كل الـ HTML wrappers).
- بناء `buildProps()` utility + `cn()` utility (clsx + tailwind-merge).
- بناء أول دفعة BUI-2 (Button2, Input2, Card2, Badge2, Spinner2, Skeleton2).
- بناء أنماط Loading/Empty/Error الأساسية (كمكونات BUI-O مبدئية: `EmptyState`, `ErrorState`).
- RTL/LTR smoke test على كل مكوّن اتبنى.

**معيار الإكمال:** أي شاشة جديدة تقدر تتبني من غير ما حد يحتاج يكتب Tailwind class خام من الصفر أو لون Hardcoded.

---

### المرحلة 3 — App Shell
`feature/1.3-app-shell`

- `RootLayout`, `PublicLayout`, `AuthLayout`, `AuthenticatedLayout`.
- `Header`, `Sidebar` (لو مطلوب)، `MobileNavigation`، `PageContainer`، `Breadcrumbs`.
- تفعيل Sonner (Toast) + SweetAlert2 wrapper + LoaderScreen عام.
- ربط `html.lang`/`html.dir` بتغيير اللغة من مكان مركزي واحد.

**معيار الإكمال:** أي Screen جديدة بتستخدم الـ Shell الموجود، من غير إعادة بناء أي Layout.

---

### المرحلة 4 — System Screens
`feature/1.4-system-screens`

- `SplashScreen`, `ErrorScreen`, `NotFoundScreen`.
- `UnauthorizedScreen`, `ForbiddenScreen` عند الحاجة.
- `OfflineScreen`, `MaintenanceScreen` عند الحاجة.

---

### المرحلة 5 — Authentication (Feature متكامل)
`feature/1.5-authentication`

> ⚠️ لا تبدأ قبل حسم بنود Auth في § 18.

- `features/auth/` كامل: `api/`, `components/`, `hooks/`, `schemas/` (Zod)، `types/`.
- `SigninScreen` + Form validation (react-hook-form + Zod).
- Session lifecycle: Access/Refresh Token، Token expiration، Refresh flow.
- Protected Routes + Guest Routes عبر TanStack Router.
- Logout + Unauthorized handling.
- Redirect after login.
- (اختياري حسب المنتج): Forgot/Reset Password, MFA, Email Verification.

---

### المرحلة 6 — Home / Dashboard
`feature/1.6-home-dashboard`

- `HomeScreen` + بطاقات إحصائية + Recent Activity.
- Loading / Error / Empty states كاملة.
- Charts (Recharts) عند الحاجة — Lazy loaded.
- Responsive layout كامل (Mobile/Tablet/Desktop).

---

### المرحلة 7 — Core Business Features
`feature/1.7-<feature-name>` (فرع مستقل لكل Feature)

دورة كل Feature:

```text
Requirements → Types/Schemas (Zod) → API/Repository → Queries/Mutations
    → Business Logic → BUI Components → Screen → Permissions
    → Loading/Empty/Error → Testing
```

---

### المرحلة 8 — Advanced Shared Features
`feature/1.8-advanced-features`

- Advanced DataTable (TanStack Table + Server-side pagination).
- File Upload (react-dropzone).
- Drag & Drop (dnd-kit) عند الحاجة.
- Advanced Filters/Search، Export/Download، Optimistic Updates.

---

### المرحلة 9 — Accessibility / RTL / Responsive Audit
`feature/1.9-audit-a11y-rtl`

- مراجعة شاملة حسب Checklists § 17 و § 5.5.
- اختبار على Mobile/Tablet/Desktop لكل Feature رئيسية.

---

### المرحلة 10 — Testing & Quality
`feature/1.10-testing`

- Type checks + Lint كامل.
- Unit + Integration tests للمسارات الحرجة (§ 16).
- E2E لأهم الـ Flows (Auth، إنشاء بيانات، بحث/تصفية).

---

### المرحلة 11 — Production Hardening
`feature/1.11-prod-hardening`

- Bundle Analysis + Performance Review.
- Security Review (§ 22).
- Sentry Configuration (Production only) + Source Maps Policy.
- Query/Cache Review + Build Verification.

---

### المرحلة 12 — Release & Deployment
`release/1.0`

- CI/CD (Lint + Type-check + Test + Build تلقائي).
- Versioning (Semantic — طبقًا لنظام BomBa الشجري § 15).
- Monitoring + Rollback strategy.

---

## 22. اعتبارات الأمان (Security)

```markdown
□ عدم تخزين Secrets حقيقية في Frontend Env Variables (أي قيمة توصل للمتصفح = مكشوفة)
□ عدم تسجيل Tokens في Console/Sentry/Logs
□ التعامل الآمن مع Authentication (تفاصيل التخزين تُحسم بعد معرفة Backend — § 18)
□ تقليل التعامل المباشر مع HTML غير موثوق (XSS)
□ مراجعة البيانات قبل إرسالها لـ Sentry
□ HTTPS إلزامي في Production
□ Backend هو المرجع النهائي للصلاحيات — Frontend Guards للـ UX فقط
```

---

## 23. Definition of Done — لكل Screen/Feature

```markdown
□ مطابق لقواعد Design System (§ 5) بدون أي استثناء
□ Responsive (Mobile/Tablet/Desktop)
□ يعمل بالإنجليزية وبالعربية (نصوص عبر i18n بالكامل)
□ LTR/RTL صحيحين فعليًا (مش قلب آلي فقط)
□ Loading / Empty (عند الحاجة) / Error states موجودة
□ Validation (Zod) موجود لو فيه Form
□ API Errors متعامل معاها برسالة مترجمة
□ Accessibility أساسية متوفرة (§ 17)
□ TypeScript بدون أخطاء وبدون any
□ لا توجد left/right غير مبررة — Logical properties فقط
□ التواريخ تتبع سياسة UTC (§ عرض الوثيقة الأصلية 17)
□ لا بيانات حساسة في أي log
□ الأداء مقبول (لا re-renders غير ضرورية، لا bundle متضخم)
□ مضاف لـ alias المناسب (ui.ts/icons.ts/store.ts/constants.ts) لو مكوّن/أيقونة/Store جديد
□ الاختبارات المطلوبة (لو الـ Feature حرجة) ناجحة
□ Commit بصيغة BomBa الصحيحة + فرع برقم شجري صحيح
```

---

## 24. ملفات التوثيق والاستمرارية (إلزامية طوال المشروع)

| الملف | الغرض | يتحدّث |
|---|---|---|
| `docs/AI_CONTEXT.md` | البنية والقرارات المعمارية الثابتة | فقط عند قرار معماري جديد |
| `docs/AI_SESSION.md` | آخر جلسة عمل (تلقائي) | آخر كل Session |
| `docs/TODO.md` | الأولويات (🔴 High / 🟡 Med / 🟢 Low) | مستمر |
| `docs/CHANGELOG.md` | تاريخ التغييرات | مع كل Release |

---

## 25. خلاصة

الخطة دي بتحوّل وثيقة المتطلبات العامة الأصلية لخطة **منضبطة 100% بنظام BomBa** في كل ما يخص التصميم والبنية والجودة والـ Git، مع الحفاظ على القرارات الوظيفية المحددة صراحةً في الوثيقة الأصلية (Router/State/Forms/...) كقرارات مشروع موثّقة ومقصودة، مش تعارضات مسكوت عنها.

**الحالة الحالية:** تم تنفيذ Foundation وApp Shell وStatus Bar Footer وLogo المركزي والساعة والإعدادات الأساسية. تم أيضًا إعادة بناء TanStack Router ليتوافق مع الكود الحالي واختباره بصريًا.

---

## 26. خطة الراوتر المعتمدة — Router Implementation Plan

### 26.1 الوضع الحالي بعد المراجعة

- `RootLayout` هو الغلاف الجذري، ويحتوي على `Outlet` ثم `StatusBar` كـ Footer ثابت منطقيًا.
- `PublicLayout` هو غلاف المسارات العامة، ويحتوي على `AppHeader` و`PageContainer` و`Outlet`.
- المسارات الحالية المدعومة هي `/` و`/en` و`/ar`، وكلها تعرض `HomeScreen`.
- حالات الراوتر الأساسية مفعلة: `SplashScreen` للتحميل، `ErrorScreen` لأخطاء route match، و`NotFoundScreen` للمسارات غير الموجودة.
- تم حذف `use-appShell.ts` القديم لأنه كان يعتمد على Auth/Health modules غير موجودة ويسبب تعارضًا معماريًا.
- تم توحيد تعريف شجرة الراوتر في `src/app/router/router.tsx` بدل خريطة شاشات يدوية خارج TanStack Router.

### 26.2 القواعد التي يجب اتباعها داخل الراوتر

1. أي Route جديد يُعرّف داخل `router.tsx` أو ملف route مستقل يتم ربطه من خلاله، وليس داخل Screen.
2. الـ Layouts مسؤولة عن الهيكل العام فقط، والـ Screens مسؤولة عن محتوى الصفحة فقط.
3. التنقل يتم عبر TanStack Router، وليس عبر `window.location` أو روابط يدوية غير معرفة.
4. كل Route يحتاج حالة تحميل أو خطأ مناسبة عند وجود async data أو loader.
5. Guards المصادقة تُضاف فقط بعد اعتماد عقد الـ Auth والـ Backend، ولا يتم اختراع Auth flow داخل الراوتر الحالي.
6. أي import داخل الراوتر يمر من `@a`، مع تقسيم imports إلى مجموعات واضحة.
7. كل مسار قابل للوصول يجب أن يملك حالة 404 أو fallback مفهومًا للمستخدم.
8. المسارات والـ params والـ search params يجب أن تكون typed، مع تجنب `string` العام عند بدء تنفيذ Features حقيقية.

### 26.3 مراحل التطوير حسب الأولوية

#### 🔴 P0 — مكتمل في هذه المراجعة

- إزالة imports والمكونات غير الموجودة.
- إزالة الرموز غير الصالحة والكود القديم الخاص بـ Auth/Health.
- إنشاء Root Route وPublic Route وHome Route بطريقة TanStack Router الصحيحة.
- ربط `pendingComponent` و`errorComponent` و`notFoundComponent`.
- إعادة تفعيل `AppHeader` داخل `PublicLayout`.
- تصحيح أخطاء TypeScript المرتبطة بالـ Overlay وStatusBar التي كانت تمنع البناء.
- اختبار `/` ومسار غير موجود والعودة للرئيسية بصريًا.
- إضافة `/en` و`/ar` كمسارات لغة صريحة حتى لا يتم ابتلاع مسارات 404 بواسطة dynamic route.

#### 🔴 P1 — يجب تنفيذه قبل Authentication

- إضافة `AuthLayout` و`AuthenticatedLayout` فقط بعد اعتماد نموذج الجلسة والصلاحيات.
- إنشاء route groups واضحة: Public / Auth / Protected.
- إضافة typed route guards باستخدام `beforeLoad` مع redirect موحد.
- اعتماد مسار افتراضي موثق للزائر والمستخدم المسجل.
- إضافة اختبار route smoke آلي للمسارات الأساسية.

#### 🟡 P2 — بعد تثبيت عقد الـ API

- إضافة loaders أو TanStack Query integrations للبيانات الخاصة بكل Feature.
- إضافة search params typed للفلاتر والصفحات عند الحاجة.
- lazy loading للشاشات الثقيلة وتقسيم bundle.
- إضافة breadcrumbs وdocument title من route metadata عند ظهور أكثر من شاشة.

#### 🟢 P3 — تحسينات لاحقة

- route-level analytics وmonitoring بدون تسريب بيانات حساسة.
- prefetch مدروس للمسارات المتوقعة.
- اختبار keyboard navigation وRTL لكل انتقال وDialog/Drawer مرتبط بالمسارات.

### 26.4 معيار إكمال أي Route جديد

```markdown
□ المسار معرف في TanStack Router ومربوط بالـ parent الصحيح
□ الـ path والـ params typed
□ الـ Layout مناسب لنوع المسار
□ Loading / Error / NotFound states موجودة عند الحاجة
□ النصوص تمر عبر i18n
□ RTL/LTR وdocument direction يعملان
□ التنقل يعمل بالكيبورد والرابط قابل للوصول
□ لا يوجد import مباشر خارج @a
□ TypeScript وESLint وBuild ناجحين
□ اختبار بصري للمسار الأساسي وحالة الخطأ أو 404
```
