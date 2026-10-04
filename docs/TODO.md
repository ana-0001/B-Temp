## 🔴 HIGH
- [x] تشغيل TypeScript وESLint والتحقق من توافق Foundation وBUI وApp Shell (ناجح 100%).
- [x] إصلاح أخطاء بناء TypeScript في `tsconfig.node.json` وملف `src/alias/icons.ts`.
- [x] تثبيت وتفعيل Tailwind CSS 4 مع `@tailwindcss/vite` وضبط ملف `src/index.css`.
- [x] إضافة حزم `clsx` و `tailwind-merge` ودالة `cn()` وربطها بنظام الـ Alias.
- [x] تثبيت `react-i18next` وتفعيل `useTranslation` داخل نظام الـ Alias.
- [x] تحويل استيرادات الصفحات والمكونات إلى الاستيراد المركزي `@a`.
- [x] مراجعة تشغيل `NotFoundScreen` على مسار غير موجود والتأكد من خلو الـ Console من الأخطاء.
- [x] اعتماد Tailwind + CSS Modules ومراجعة مكونات وصفحات المشروع.

## 🟡 MED
- [x] استكمال شاشات النظام الأساسية (SplashScreen, ErrorScreen, NotFoundScreen) — المرحلة 4.
- [x] إعادة بناء TanStack Router tree وربطه بالـ Root/Public layouts مع حالات Splash/Error/404.
- [ ] إضافة AuthLayout وAuthenticatedLayout بعد اعتماد عقد Authentication.
- [ ] إضافة route guards typed واختبارات smoke للمسارات بعد اعتماد Auth.
- [ ] إضافة Sidebar أو Mobile Navigation فقط عند ظهور احتياج منتج واضح.
- [ ] استكمال إعداد Day.js helpers وQuery policies حسب احتياج الـ Features.

## 🟢 LOW
- [ ] استكمال مكونات BUI الإضافية حسب الاستخدام الفعلي فقط.
- [ ] حسم أدوات الاختبار قبل المرحلة 10.
- [ ] إضافة اختبارات Unit/E2E للمكونات والتفاعلات الحرجة.
- [ ] إضافة اختبار آلي لمسار `/` ومسار 404 وحالة route error.

### قرارات مطلوبة قبل المرحلة 5
- [ ] عقد Backend API.
- [ ] آلية Authentication وتخزين الـ Token.
- [ ] عقد أخطاء الـ API.
- [ ] الصفحة الافتراضية بعد تسجيل الدخول.
