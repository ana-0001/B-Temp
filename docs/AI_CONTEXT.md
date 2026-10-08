## 🤖 AI Context — SPA Frontend
> آخر تحديث: 2026-09-28T00:00:00Z

### Stack المعتمد
- React 19 + TypeScript strict + Vite 6.
- Tailwind CSS 4 + shadcn/ui + Radix UI داخل طبقات BUI فقط.
- TanStack Router وTanStack Query.
- Zustand للحالة المحلية وAxios لطبقة HTTP المركزية.
- react-hook-form + Zod، i18next، Day.js مع UTC، وlucide-react عبر Alias System.

### قرارات معمارية مهمة
- البنية Feature-based مع طبقات BUI: `BUI-1 → BUI-2 → BUI-O → Screens`.
- الاستيراد العام يمر عبر Alias System، ونقطة الدخول الأساسية هي `@a`.
- التصميم يعتمد Tailwind CSS + CSS Modules، مع CSS Variables و`em` وTailwind `@theme`، ودعم Light افتراضيًا وRTL/LTR.
- `index.css` للـ reset والـ design tokens فقط، والأنماط المركبة داخل `*.module.css`.
- Server State مسؤولية TanStack Query، وClient State مسؤولية Zustand فقط.
- إعدادات البيئة تُقرأ وتُتحقق مركزيًا عبر `src/config/env.ts` باستخدام Zod.
- أخطاء Axios تُحوّل إلى شكل موحّد داخل طبقة HTTP، مع إبقاء مصدر التوكن محقونًا من الخارج.
- موارد i18n الأساسية محلية حاليًا داخل `src/i18n/locales`، مع fallback إلى الإنجليزية.
- BUI-1 يحتوي أغلفة HTML نقية فقط، وBUI-2 يحتوي مكونات سلوكية/مرئية مبنية فوق BUI-1.
- تمت إضافة `EmptyState` و`ErrorState` كأول مكونات BUI-O، وتعتمدان على مكونات BUI-2.
- لا يوجد Backend أو API contract منفّذ حاليًا.
- `RootLayout` مسؤول عن مزامنة إعدادات HTML فقط، بينما `PublicLayout` يملك تركيب الصفحات العامة.
- `src/components/settings/settings.store.ts` (مفتاح `vh-settings`) هو المخزن الوحيد للإعدادات — حُذف المخزن المكرر القديم `src/stores/settingsStore.ts` في 2026-10-04.
- طبقات z-index تُستخدم عبر `B:z-*` Custom Utilities (مربوطة بـ Tokens `--z-*`) لأن Tailwind 4 لا يوفر namespace للـ z-index.

### قرارات غير موثقة اتخذت أثناء التنفيذ
- تم إنشاء ملفات الاستمرارية الأربعة في `docs/` لأن المشروع كان يحتوي على `Plan.md` و`SPECKIT.md` فقط.
- تم إضافة `src/config/env.ts` كطبقة إعداد مستقلة لأن التحقق من البيئة مسؤولية Foundation ولا ينتمي إلى Alias أو الخدمات.
- تم اعتماد `buildProps` كـ utility مشتركة داخل `src/utils` لاستخدامها في كل مكونات BUI.
- التاريخ والوقت في هذا السجل تقريبيان لعدم توفر ساعة النظام الدقيقة.

### قرارات معلّقة قبل مرحلة Authentication
- شكل Backend API وعقد الـ Endpoints.
- آلية Authentication والتخزين الفعلي للـ Tokens.
- عقد أخطاء الـ API.
- الصفحة الافتراضية بعد تسجيل الدخول.
