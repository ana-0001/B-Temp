## 🔴 HIGH
- [x] تشغيل TypeScript وESLint والتحقق من توافق Foundation وBUI وApp Shell (ناجح 100%).
- [x] إصلاح أخطاء بناء TypeScript في `tsconfig.node.json` وملف `src/alias/icons.ts`.
- [x] تثبيت وتفعيل Tailwind CSS 4 مع `@tailwindcss/vite` وضبط ملف `src/index.css`.
- [x] إضافة حزم `clsx` و `tailwind-merge` ودالة `cn()` وربطها بنظام الـ Alias.
- [x] تثبيت `react-i18next` وتفعيل `useTranslation` داخل نظام الـ Alias.
- [x] تحويل استيرادات الصفحات والمكونات إلى الاستيراد المركزي `@a`.
- [x] مراجعة تشغيل `NotFoundScreen` على مسار غير موجود والتأكد من خلو الـ Console من الأخطاء.

## 🟡 MED
- [x] استكمال شاشات النظام الأساسية (SplashScreen, ErrorScreen, NotFoundScreen) — المرحلة 4.
- [ ] استكمال TanStack Router tree وربطه بالـ layouts الإضافية عند الحاجة.
- [ ] إضافة Sidebar أو Mobile Navigation فقط عند ظهور احتياج منتج واضح.
- [ ] استكمال إعداد Day.js helpers وQuery policies حسب احتياج الـ Features.

## 🟢 LOW
- [ ] استكمال مكونات BUI الإضافية حسب الاستخدام الفعلي فقط.
- [ ] حسم أدوات الاختبار قبل المرحلة 10.

### قرارات مطلوبة قبل المرحلة 5
- [ ] عقد Backend API.
- [ ] آلية Authentication وتخزين الـ Token.
- [ ] عقد أخطاء الـ API.
- [ ] الصفحة الافتراضية بعد تسجيل الدخول.
