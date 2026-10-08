## 🔴 HIGH
- [x] **[Design Tokens]** إصلاح التعريف الدائري لـ `--color-te`/`--color-sn` في `@theme` بـ `src/index.css` وتعريف `--color-tt` المفقود — كلاسات `text-te/text-sn/text-tt` لا تعمل الآن (مؤكد من فحص CSS الإنتاجي).
- [x] **[Design Tokens]** توحيد أسماء المتغيرات: `--font-size-*`→`--fs-*` و `--font-weight-*`→`--fw-*` في `hr.module.css`، و`--color-border-focus`→`--color-br-f` في `index.css`، و`--font-family-mono`→`--ffy-mono` في `status-bar.module.css`.
- [x] **[Layout]** إصلاح `z-sticky` في `Header.tsx` — الكلاس غير مولّدة في Tailwind 4 (`--z-*` ليس namespace لـ z-index)؛ الحل: `z-[100]` أو تسجيل namespace صحيح.
- [x] **[FOUC]** مواءمة مفتاح التخزين: `index.html` يقرأ `spa-settings` والمخزن الفعال `settings.store.ts` يكتب في `vh-settings` — منع وميض الثيم معطوب فعلياً.
- [x] **[Dead Code]** حسم مصير `src/stores/settingsStore.ts` (مخزن `spa-settings`) — إما حذفه أو دمجه مع `settings.store.ts` في مصدر واحد.
- [x] **[Repo Hygiene]** إضافة `dist` إلى `.gitignore` وإزالته من تتبع Git (`git rm -r --cached dist`)، وإصلاح تكرار `node_modules` في الملف.
- [x] **[Docs]** إنشاء `README.md` — إلزامي حسب AGENTS.md §2.
- [x] تشغيل TypeScript وESLint والتحقق من توافق Foundation وBUI وApp Shell (ناجح 100%).
- [x] إصلاح أخطاء بناء TypeScript في `tsconfig.node.json` وملف `src/alias/icons.ts`.
- [x] تثبيت وتفعيل Tailwind CSS 4 مع `@tailwindcss/vite` وضبط ملف `src/index.css`.
- [x] إضافة حزم `clsx` و `tailwind-merge` ودالة `cn()` وربطها بنظام الـ Alias.
- [x] تثبيت `react-i18next` وتفعيل `useTranslation` داخل نظام الـ Alias.
- [x] تحويل استيرادات الصفحات والمكونات إلى الاستيراد المركزي `@a`.
- [x] مراجعة تشغيل `NotFoundScreen` على مسار غير موجود والتأكد من خلو الـ Console من الأخطاء.
- [x] اعتماد Tailwind + CSS Modules ومراجعة مكونات وصفحات المشروع.

## 🟡 MED
- [ ] **[Architecture]** حسم تسمية طبقة `BUI-3.tsx` — القواعد الموثقة تقول BUI-1 → BUI-2 → BUI-O، والملف الحالي (BTooltip/BPopover/BDrawer/Backdrop) هو فعلياً طبقة BUI-O؛ القرار: إعادة تسمية أو تحديث التوثيق (AI_CONTEXT.md).
- [ ] **[Performance]** تقسيم الـ Bundle (613KB في ملف واحد) — lazy loading للشاشات عند نمو عددها + `manualChunks` لمكتبات الفرع (Radix/TanStack).
- [ ] **[Design Rules]** تقييد لوحة Tailwind الافتراضية (blue/gray/white لسه مولدة في الـ CSS) عبر `@theme` block ليكون المصدر الوحيد هو Tokens المشروع — حسب design-rules §المكتبات الخارجية.
- [x] استكمال شاشات النظام الأساسية (SplashScreen, ErrorScreen, NotFoundScreen) — المرحلة 4.
- [x] إعادة بناء TanStack Router tree وربطه بالـ Root/Public layouts مع حالات Splash/Error/404.
- [ ] إضافة AuthLayout وAuthenticatedLayout بعد اعتماد عقد Authentication.
- [ ] إضافة route guards typed واختبارات smoke للمسارات بعد اعتماد Auth.
- [ ] إضافة Sidebar أو Mobile Navigation فقط عند ظهور احتياج منتج واضح.
- [ ] استكمال إعداد Day.js helpers وQuery policies حسب احتياج الـ Features.

- [ ] **[BombaSmart]** إضافة combobox داخل SmartInput — مؤجل عمداً لأول مستهلك حقيقي (شاشة Auth) بقرار المستخدم 2026-10-08.
- [ ] **[Testing]** اختبارات تفاعل للمكونات (testing-library + jsdom) — معلقة لموافقة المستخدم لأنها dependency جديدة (SPECKIT §13).
- [x] **[Feature]** تنفيذ AppBackground وBombaSmart (SmartButton/SmartInput/ActionLock) وفق PRD/SPECKIT المعتمدين — 2026-10-08.

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
