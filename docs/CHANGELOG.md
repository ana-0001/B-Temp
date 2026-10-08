## [Unreleased] — 2026-10-08
### Added
- **AppBackground**: محرك خلفية زخرفية Canvas خلف المحتوى (`src/components/app-background/`) — سلوك كامل حسب PRD §13.1 (disabled = لا Canvas ولا Loop · reduced-motion = مشهد ثابت · off/calm/full · إيقاف عند إخفاء التبويب · cleanup كامل) مع محرك نقي قابل للاختبار و12 اختبار وحدة.
- توكنات الخلفية في `index.css`: `--color-orb-a/b` و`--bg-orb-alpha` (فاتح 0.12 / داكن 0.18).
- غلاف `Canvas` في BUI-1 يقبل `ref` (React 19 ref-as-prop).
- hook `useBackground` في `settings.store.ts` مع تصديره من `settings/index.ts`.
- **BombaSmart** (`src/components/smart/`): `SmartButton` (loading تلقائي + ActionLock يمنع double-submit + aria-busy) و`SmartInput` (controlled/uncontrolled + مسح + إظهار كلمة مرور + حالات ARIA) و`action-lock.ts` (أقفال بـ ownership token) مع 4 اختبارات.
- حقلا إظهار الخلفية وحركتها في SettingsDrawer + كارد عرض تجريبي في HomeScreen + مفاتيح i18n `background.*` / `smartInput.*` / `smartDemo.*` بالعربية والإنجليزية.
- أيقونات `IconEye`/`IconEyeOff` وأنواع `CanvasHTMLAttributes`/`ChangeEvent`/`MouseEvent`/`Ref` في نظام Alias.

### Fixed
- تصحيح z-index طبقة الخلفية لقيمة سالبة — `--z-base` (0) كان سيرسم الأجرام فوق المحتوى وليس خلفه (CSS Painting Order).
- `PublicLayout` بقى شفافاً (إزالة `bg-bg`) لظهور طبقة الخلفية خلف المحتوى.

## [Unreleased] — 2026-10-04
### Fixed
- إصلاح Design Tokens المكسورة: تعريف `--color-te`/`--color-sn`/`--color-tt` بقيم HSL حقيقية تنقلب مع الوضع الداكن — كانت مراجع ذاتية دائرية داخل `@theme` لا تعمل.
- إصلاح كلاس `z-sticky` غير المولّدة في Tailwind 4 داخل Header → `B:z-sticky` من الـ Custom Utilities الجديدة.
- إصلاح منع وميض الثيم (FOUC): `index.html` يقرأ المفتاح الفعلي `vh-settings` مع حل الثيم `system` قبل الرسم.
- توحيد أسماء Tokens: `--fs-*`/`--fw-*` في `hr.module.css`، و`--ffy-mono` في `status-bar.module.css`، و`--color-br-f` في focus ring.
- إزالة كلاس `text-md` غير الموجود في Tailwind 4 من تلميحات الثيم واللغة.

### Added
- `README.md` للمشروع.
- Custom Utilities جديدة: `B:z-above` / `B:z-sticky` / `B:z-overlay` / `B:z-modal` / `B:z-toast` / `B:z-tooltip`.

### Removed
- حذف المخزن الميت `src/stores/settingsStore.ts` (`spa-settings`) — المصدر الوحيد الآن `settings.store.ts` (`vh-settings`).

### Chores
- تنظيف `.gitignore` وإزالة `dist` من تتبع Git.
- إزالة TODO blocks قديمة مكتملة من `index.css` و`status-bar.module.css`.

## [Unreleased] — 2026-09-26
### Changed
- اعتماد Tailwind CSS + CSS Modules رسميًا، ونقل أنماط StatusBar وLogo وRadix Overlays إلى CSS Modules مع إبقاء `index.css` للـ tokens والـ reset فقط.
### Changed
- تحديث `main` و`App` و`AppProviders` لاستخدام Alias المركزي للمكتبات الخارجية.
- تحسين TanStack Router بإضافة preload عند intent واسترجاع scroll وربط حالات التحميل والخطأ العامة.

- نقل أنواع HTML المستخدمة في مكونات BUI إلى `@a` لتطبيق قاعدة Alias المركزية بدون استيراد React مباشر.
- نقل نصوص شاشة Home وأزرار Header إلى موارد i18n باللغتين.
- إزالة fallback بصيغة `style` وألوان hardcoded من نقطة التشغيل وتوحيد ألوان HTML مع Design Tokens.

### Added
- إضافة `SplashScreen` و`ErrorScreen` كحالات نظام أساسية قابلة لإعادة الاستخدام.

### Fixed
- إصلاح أخطاء بناء TypeScript (`pnpm run build`) وتوافق `URL` في `tsconfig.node.json`.
- تصدير الأيقونات الأساسية ببادئة `Icon` داخل `src/alias/icons.ts` لمنع خطأ `not a module`.
- إصلاح سطر الخطأ في `index.html` بحذف المتغير غير المعرف `h`.
- تحويل استيرادات الشاشات والـ Header إلى نظام الاستيراد المركزي `@a`.

### Added
- تثبيت وتفعيل Tailwind CSS 4 رسمياً مع `@tailwindcss/vite` داخل `vite.config.ts`.
- بناء ملف `src/index.css` بنظام الـ Tokens الكامل وكلاسات `B:` utilities و `@theme`.
- تثبيت `clsx` و `tailwind-merge` وإضافة دالة `cn()` في `src/utils/cn.ts` وتصديرها عبر `@a` و `@ui`.
- تثبيت `react-i18next` وتحديث إعدادات `src/i18n/config.ts` وتصدير `useTranslation` في `@a`.
- التحقق التام بالمتصفح من استقرار الواجهة وخلو الـ Console من أي أخطاء.

## [0.1.0] — 2026-09-24
### Added
- إنشاء ملفات الاستمرارية الأساسية: `AI_CONTEXT.md` و`AI_SESSION.md` و`TODO.md` و`CHANGELOG.md`.
- تسجيل أن المشروع يبدأ من المرحلة `1.1 Foundation & Tooling`.
- إنشاء Foundation أولي لمشروع React وTypeScript وVite.
- إضافة Alias System، إعدادات TypeScript strict، ESLint Flat Config، وPrettier.
- إضافة طبقات Router وQuery وAxios وZustand وi18n وDay.js UTC.
- إضافة CSS Tokens أولية وReset وTailwind `@theme`.
- إضافة Environment Config متحقق منه بـ Zod وملف `.env.example`.
- إضافة موارد ترجمة أساسية للغتين `en` و`ar`.
- إضافة تطبيع موحّد لأخطاء Axios ومعالجة الطلبات الملغاة.
- إضافة Utility `buildProps` وطبقتي BUI-1 وBUI-2 بأول مكونات الواجهة الأساسية.
- إضافة `EmptyState` و`ErrorState` كأول مكونات BUI-O.
- ربط الشاشة الرئيسية المؤقتة بالـ Router وإضافة `RootLayout` لمزامنة اللغة والثيم مع HTML.
- إضافة App Shell أولي يتضمن `AppHeader` و`PageContainer`.
- إضافة تبديل اللغة والثيم مع موارد i18n للغتين.
- إصلاح تركيب `HomeScreen` لإزالة تكرار عنصر `main` داخل `RootLayout`.
- فصل مزامنة إعدادات HTML داخل `RootLayout` عن تخطيط الصفحات العامة.
- إضافة `PublicLayout` وربط الصفحة الرئيسية به داخل شجرة TanStack Router.
- إضافة `NotFoundScreen` وربطها كـ fallback للمسارات غير الموجودة مع ترجمتها.
- إصلاح إعداد Vite بإضافة Aliases المطابقة لمسارات TypeScript، وإضافة fallback افتراضي للمسارات غير الموجودة في الراوتر.
- عزل نقطة التشغيل والـ layouts والـ screens عن Alias `@a` لإزالة دورة الاستيراد المحتملة المسببة للصفحة البيضاء.
- تفعيل App Shell من خلال `AppProviders` و`RouterProvider` وربط مزامنة اللغة والثيم بتغيير i18next.
