# SPA Frontend — B-Temp

> تطبيق SPA مبني بمعايير BomBa — React 19 + TypeScript (strict) + Vite 6 + Tailwind CSS 4 + TanStack Router/Query + Zustand + i18next.

---

## 🧱 الـ Stack

| المجال | التقنية |
|---|---|
| Build | Vite 6 |
| UI | React 19 + TypeScript (strict، بدون `any`) |
| Styling | Tailwind CSS 4 + CSS Modules + Design Tokens (CSS Variables / HSL / em) |
| Components | نظام BUI الطبقي: `BUI-1 → BUI-2 → BUI-O → Screens` |
| Routing | TanStack Router (type-safe) |
| Server State | TanStack Query |
| Client State | Zustand (+ persist) |
| HTTP | Axios عبر طبقة مركزية نقية (`createHTTPClient`) |
| i18n | i18next + react-i18next — English (LTR) / العربية (RTL) |
| Icons | lucide-react عبر `@a` ببادئة `Icon` إلزامية |

## 🚀 التشغيل

```bash
pnpm install        # تثبيت الاعتماديات
pnpm dev            # سيرفر التطوير
pnpm build          # بناء الإنتاج (tsc -b && vite build)
pnpm preview        # معاينة نسخة الإنتاج
pnpm lint           # فحص ESLint (Zero Errors policy)
pnpm test           # تشغيل اختبارات Vitest
pnpm format         # تنسيق Prettier
```

> انسخ `.env.example` إلى `.env` واضبط `VITE_API_BASE_URL` قبل التشغيل.

## 📁 هيكل المشروع

```
├── src/
│   ├── alias/          # نظام الاستيراد المركزي (@a) — المصدر الوحيد للاستيرادات
│   ├── app/            # layouts / providers / router
│   ├── components/     # BUI (BUI-1/BUI-2/BUI-3) + branding + layout + settings + status-bar
│   ├── config/         # إعدادات البيئة متحقق منها بـ Zod
│   ├── i18n/           # إعدادات الترجمة + موارد ar/en
│   ├── lib/            # query-client / dayjs
│   ├── screens/        # شاشات التطبيق (Home/Splash/Error/NotFound)
│   ├── services/       # طبقة HTTP (Axios مع Error Normalization)
│   ├── stores/         # مخازن Zustand (ui/auth)
│   └── utils/          # buildProps / cn
├── docs/               # ملفات الاستمرارية (AI_CONTEXT / AI_SESSION / TODO / CHANGELOG / Plan / SPECKIT)
└── .agents/skills/     # مهارات وقواعد BomBa الحاكمة
```

## 📏 قواعد أساسية (التفاصيل الكاملة في `AGENTS.md`)

- **الكود بالإنجليزية — كل التعليقات وJSDoc بالعربية المصرية.**
- كل استيراد عبر نظام الـ Alias `@a` — ممنوع الاستيراد المباشر في الشاشات.
- الأيقونات ببادئة `Icon` (مثل `IconBell`)، والأنواع بـ `T_` / `I_`.
- كل مكون BUI يستخدم `buildProps()` ويمرر `...restProps`.
- الألوان من الـ Tokens فقط (`bg-py` / `text-te` / `text-sn` / `text-tt` ...) — ممنوع HEX/RGB و`dark:` prefix.
- الثيم عبر `data-theme` والـ RTL عبر Logical Properties — الاتجاهان مدعومان بالكامل.
- الطبقات: ممنوع تخطي `BUI-1 → BUI-2 → BUI-O`، وممنوع HTML خام فوق BUI-1.

## 📚 الوثائق الحاكمة

| الملف | الغرض |
|---|---|
| `AGENTS.md` | قواعد العمل الكاملة (System Prompt) |
| `.agents/skills/` | مهارات BomBa (alias / design / git / …) |
| `docs/AI_CONTEXT.md` | الـ Context المعماري الثابت |
| `docs/AI_SESSION.md` | سجل آخر الجلسات |
| `docs/TODO.md` | الأولويات (🔴 HIGH / 🟡 MED / 🟢 LOW) |
| `docs/CHANGELOG.md` | تاريخ التغييرات |
| `docs/Plan.md` + `docs/SPECKIT.md` | خطة التنفيذ والمواصفة التنفيذية |
