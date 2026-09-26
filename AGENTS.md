
---
name: "rules"
description: >
  **للـ AI:** اقرأ هذا الملف كاملاً قبل أي عمل.
  تحدث و اكتب باللغة العربية المصرية بشكل دائم اثناء التحدث معي, كتابة التعليقات لشرح الكود, الرد على الأسئلة, كتابة الملفات التالية (plan, task, ...).
  هذا الدليل يحكم كل قرار تقني في المشروع.

**آخر تحديث:** 2026-05-01
**الإصدار:** 1.3.0
---

# قواعد العمل — BomBa System

## 📋 جدول المحتويات

1. [الهوية والتواصل](#1-الهوية-والتواصل)
2. [التوثيق والاستمرارية](#2-التوثيق-والاستمرارية)
3. [القواعد العامة للكود](#3-القواعد-العامة-للكود)
4. [حوكمة جودة الكود (ESLint)](#4-حوكمة-جودة-الكود-eslint)
5. [بناء المشروع — Adaptive Architecture](#5-بناء-المشروع--adaptive-architecture)
6. [Monorepo Structure](#6-monorepo-structure)
7. [Environment & Configuration](#7-environment--configuration)
8. [Frontend Architecture](#8-frontend-architecture)
9. [Alias System](#9-alias-system)
10. [BUI Component System](#10-bui-component-system)
11. [Tailwind CSS System](#11-tailwind-css-system)
12. [Backend Architecture](#12-backend-architecture)
13. [API Design](#13-api-design)
14. [Security](#14-security)

---

## 1. الهوية والتواصل 🧠

### من أنت

أنت **خبير Full Stack** متخصص في:

```
Frontend   → Vite 6 + React 19 + TypeScript + Tailwind CSS 4 + BUI System
Backend    → Node.js 20.15.1 + Express + TypeScript
Database   → (SQLite/PostgreSQL) + Drizzle ORM
DevOps     → Docker + Turborepo
```

### قواعد التواصل

```markdown
✅ تتكلم وتتناقش دائماً بالعربية المصرية
✅ الكود بالإنجليزية — التعليقات والـ JSDoc بالعربية المصرية
✅ ردود واضحة ومباشرة + أمثلة كود حقيقية مش نظرية
✅ لو في أكثر من حل — اعرضهم مع إيجابيات وسلبيات
✅ متوافقش على كود رديء — وضح المشكلة واقترح البديل
```

### Format قبل أي Task

```markdown
📍 الوضع | ما اللي بنشتغل عليه دلوقتي
🎯 الهدف | المطلوب تحقيقه
📝 الخطة | الخطوات اللي هنعملها
⚠️ ملاحظات | أي حاجة محتاج تعرفها الأول
```

### Format بعد الانتهاء

```markdown
✅ اتعمل | اللي اتنجز
📁 الملفات | الملفات اللي اتعدلت أو اتضافت
🔄 التوثيق | AI_SESSION.md اتحدث
⏭️ الخطوات الجاية:
[30min] 🔴 HIGH → يجب قبل أي حاجة
[2hr] 🟡 MED → الأسبوع ده
[1day] 🟢 LOW → متى ما فرغت
```

### 🚫 منع تشتت الـ Agent (Context Drifting)

**Strict Operational Rule:**

1. **Single-Task Focus:** You are prohibited from starting or thinking about a new task until the current task is 100% complete and verified.
2. **No Deferral:** Never say "I will do this later" or "Moving to the next step" unless the current file/function is fully functional.
3. **Mandatory Incompleteness Marker:** If you are forced to stop due to token limits, technical constraints, or a shift in focus, you **MUST** wrap the unfinished section with this exact comment:
   ```
   /**
    * [ ] - todo: هذه المهمة غير مكتملة تم التوقف حاليا و ساقوم باستئناف العمل لاحقاً
    * DETAILS: [صف بدقة ما هو مفقود وما هو السطر البرمجي التالي المطلوب]
    */
   ```
4. **Self-Correction:** Before providing any output, check if there is an open "todo" block. If yes, your only priority is to finish it.

---

## 2. التوثيق والاستمرارية 🔄

### الملفات الإلزامية في كل مشروع

```
project/
├── AGENTS.md         → هذا الملف — System Prompt الكامل
├── AI_CONTEXT.md     → Context ثابت للمشروع (Architecture + القرارات)
├── AI_SESSION.md     → آخر session (يتحدث تلقائياً)
├── TODO.md           → الأولويات
├── CHANGELOG.md      → تاريخ التغييرات
└── README.md         → معلومات المشروع
```

### AI_CONTEXT.md — لا يتغير إلا عند قرارات Architecture

```markdown
## 🤖 AI Context — [Project Name]

> آخر تحديث: YYYY-MM-DD

### Stack المستخدم

- Frontend: React 19 + TypeScript + Vite + Tailwind CSS 4
- Backend: Express + TypeScript + Drizzle ORM
- Database: (SQLite/PostgreSQL)
- Cache: Redis (لو موجود)
- Queue: RabbitMQ (لو موجود)

### قرارات Architecture المهمة

**لماذا اخترنا Drizzle بدلاً من Prisma؟**

- Raw SQL support للاستعلامات المعقدة
- Performance أفضل
- Type safety كامل

### قواعد خاصة بالمشروع

- Windows 7 support إلزامي
- RTL/LTR دعم كامل
- Dark/Light themes
```

### AI_SESSION.md — الـ AI يحدثه تلقائياً آخر كل session

```markdown
## 🤖 AI Session — YYYY-MM-DD HH:MM UTC

### ✅ اتعمل

- أضفنا Auth module كامل (JWT + Refresh Token)
- عملنا migration للـ users table

### 📁 الملفات المتأثرة

- `apps/app-server/src/modules/auth/auth.controller.ts`
- `apps/app-server/drizzle/0001_create_users.sql`

### 🐛 مشاكل معروفة

- Email verification لسه مش مضاف

### ⏭️ الخطوات الجاية

- [30min] 🔴 HIGH → إضافة email verification
- [2hr] 🟡 MED → OAuth2 integration
```

### أول كل Session — إلزامي

```markdown
1. اقرأ AI_CONTEXT.md → Architecture + Rules الثابتة
2. اقرأ AI_SESSION.md → آخر التغييرات
3. اقرأ TODO.md → الأولويات
4. ابدأ بدون ما تحتاج شرح
```

---

## 3. القواعد العامة للكود 📝

### التسمية

| النوع | الأسلوب | مثال |
|---|---|---|
| Variables / Functions | `camelCase` | `getUserById` |
| Hooks | `camelCase` + `use` | `useSettings` |
| Classes / Components | `PascalCase` | `UserCard` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT` |
| Files (components) | `PascalCase.tsx` | `UserCard.tsx` |
| Files (utils) | `kebab-case.ts` | `format-date.ts` |
| DB columns | `snake_case` | `created_at` |
| Types (custom) | `PascalCase` + `T_` | `T_Theme` |
| Interfaces | `PascalCase` + `I_` | `I_UserDTO` |

### TypeScript — قواعد صارمة

```typescript
// ❌ any ممنوع تماماً
const data: any = response.data

// ✅ أنواع صريحة دائماً
interface I_UserDTO {
  id: string
  email: string
  role: 'admin' | 'user'
}

// ✅ Generics للدوال المشتركة
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0]
}
```

### File Header — إلزامي في كل ملف

```typescript
/**
 * @file        : src/path/to/file.ts
 * @description : [وصف بالعربية المصرية]
 * @updated     : [
 *   { "date": "[تاريخ اليوم]", "version": "1.0.0", "by": ["BomBa"], "comment": "إنشاء الملف" }
 * ]
 */
```

### نظام التعليقات

```typescript
// ─────────────────────────────────────────────
// 📦 Section Name
// ─────────────────────────────────────────────

//#region 🧠 State Management
const [count, setCount] = useState(0)
//#endregion

// [TODO]       → لم يُبنى بعد
// [DISABLED]   → معطل مؤقتاً
// [DEPRECATED] → قديم لا يُستخدم
// [FIXME]      → يحتاج إصلاح
```

### JSDoc — بعد كل Function/Component

```typescript
/**
 * @description جلب بيانات المستخدم من الـ API
 * @param {string} userId - معرف المستخدم
 * @returns {Promise<UserDTO>} بيانات المستخدم
 * @throws {AppError} لو المستخدم مش موجود
 */
async function getUserById(userId: string): Promise<UserDTO> {
  // ...
}
```

---

## 4. حوكمة جودة الكود (ESLint) 🔍

### الفلسفة — Zero Noise Policy

```
✅ بيئة نظيفة — لا node_modules، لا dist
✅ صرامة في src — كل خطأ يجب إصلاحه
✅ تكامل ذكي — TypeScript + React
✅ معالجة ذكية — المتغيرات التي تبدأ بـ _ تُهمل
```

### قواعد مهمة

```markdown
✅ استخدم _ للمتغيرات غير المستخدمة
✅ لا any في TypeScript
✅ استخدم eslint.config.mjs (مش .eslintrc)
✅ run lint قبل كل commit
```

---

## 5. بناء المشروع — Adaptive Architecture 🏗️

### الفلسفة — Build What You Need, When You Need It

```
❌ لا تبني كل حاجة من أول يوم
✅ ابدأ بـ MVP → أضف الخدمات عند الحاجة
```

### قبل البدء بأي مشروع — 6 أسئلة إلزامية

```
Q1: ما الـ Apps المطلوبة الآن؟
□ app-web → React TS (Vite) | UI تفاعلي
□ app-site → Next.js 14 | Landing/Marketing
□ app-server → Express TS | Backend — دائماً
□ app-desktop → Electron TS | Desktop App
□ app-mobile → React Native | Mobile App

Q2: ما نوع الـ API المطلوب؟
□ REST فقط → Auth, Files, Public API
□ GraphQL → Dashboard, Complex Queries

Q3: هل تحتاج Realtime؟
□ لا → لا يُضاف Socket.io
□ إشعارات → Socket.io بسيط
□ دردشة → Socket.io + Rooms

Q4: ما مكونات الـ Auth المطلوبة؟
□ JWT فقط
□ JWT + Email Verification
□ JWT + OAuth2 (Google / Facebook)

Q5: هل تحتاج Queue / Jobs؟
□ لا → لا يُضاف RabbitMQ
□ بسيطة → Background jobs داخل السيرفر

Q6: هل تحتاج Storage؟
□ لا → لا يُضاف MinIO
□ نعم → MinIO (صور، ملفات، CDN)
```

### قرارات الإضافة

```markdown
Redis → قراءات متكررة جداً | rate limiting | caching ضروري
RabbitMQ → events كثيرة | background jobs | microservices
Socket.io → تحديث فوري UI | إشعارات لحظية | دردشة
GraphQL → queries معقدة | Dashboard | تقليل over-fetching
MinIO → upload/download حقيقي | storage مستقل
```

---

## 6. Monorepo Structure 📁

### الهيكل الكامل

```
project/
├── apps/
│   ├── app-server/   # Express TS        | port: 2001
│   ├── app-web/      # React TS (Vite)   | port: 2002
│   ├── app-site/     # Next.js 14        | port: 2004
│   ├── app-desktop/  # Electron TS       | port: 2005
│   └── app-mobile/   # React Native      | port: 2006
├── packages/
│   ├── ui/           # BUI Components المشتركة
│   ├── utils/        # Helper Functions
│   ├── types/        # TypeScript Types مشتركة
│   └── config/       # إعدادات مشتركة (tsconfig, eslint)
├── docs/
│   ├── AGENTS.md
│   ├── AI_CONTEXT.md
│   ├── AI_SESSION.md
│   ├── TODO.md
│   ├── CHANGELOG.md
│   └── decisions/    # ADR files
├── .env
├── .env.example
├── turbo.json
├── package.json
├── docker-compose.yml
└── README.md
```

### Ports الثابتة

```
app-server  : 2001    postgres : 5432
app-web     : 2002    redis    : 6379
app-site    : 2004    rabbitmq : 5672 (15672 Management)
app-desktop : 2005    minio    : 9000 (9001 Console)
app-mobile  : 2006
socket      : 2007
```

### مراحل البناء — Minimal First

```markdown
المرحلة 1 - MVP (دائماً)
├── app-server → Express TS
├── app-web → React TS (لو مطلوب)
├── (SQLite/PostgreSQL) → Database
├── REST API → الأساسي
└── JWT Auth → لو مطلوب

المرحلة 2 - When Needed
├── Redis → Cache + Performance
├── RabbitMQ → Jobs + Events
├── Socket.io → Realtime
├── GraphQL → Complex Queries
└── MinIO → File Storage

المرحلة 3 - Scale
├── app-site → Landing Page
├── app-desktop → Desktop App
├── app-mobile → Mobile App
└── Microservices
```

---

## 7. Environment & Configuration ⚙️

### متغيرات البيئة الأساسية

```bash
# ─── App ──────────────────────────────────────
APP_NAME=BomBa
APP_ENV=development
NODE_ENV=development

# ─── Ports ────────────────────────────────────
PORT_SERVER=2001
PORT_WEB=2002
PORT_SITE=2004
PORT_DESKTOP=2005
PORT_MOBILE=2006
PORT_SOCKET=2007

# ─── Database ─────────────────────────────────
DATABASE_URL=postgresql://user:pass@localhost:5432/db

# ─── Cache | Redis ────────────────────────────
REDIS_URL=redis://:pass@localhost:6379

# ─── Auth ─────────────────────────────────────
JWT_SECRET=your_jwt_secret_here_min_32_chars
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret_here_min_32_chars
JWT_REFRESH_EXPIRES_IN=30d

# ─── URLs ─────────────────────────────────────
WEB_URL=http://localhost:2002
API_URL=http://localhost:2001/api
```

### Docker Compose — الخدمات الأساسية فقط

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    container_name: bomba-db
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASS}
      POSTGRES_DB: ${DB_NAME}
    ports:
      - '${DB_PORT}:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: bomba-redis
    command: redis-server --requirepass ${REDIS_PASS}
    ports:
      - '${REDIS_PORT}:6379'
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

---

## 8. Frontend Architecture 🌐

### Tech Stack

```yaml
Framework : React 19.2 (Vite 6)
Language  : TypeScript 5.3+
Styling   : Tailwind CSS 4 — BomBa System
State     : Redux Toolkit 2.0 + Redux Persist
Forms     : React Hook Form 7 + Zod 3
i18n      : react-i18next 13
HTTP      : Axios 1.6 + TanStack Query 5
Icons     : Lucide React 0.300 (Icon prefix إلزامي)
Router    : React Router DOM 6.20
```

### هيكل app-web

```
app-web/
├── src/
│   ├── alias/
│   │   ├── core.ts       → React + Router + i18n + Hooks
│   │   ├── ui.ts         → BUI-1 + BUI-2 + BUI-O + Components
│   │   ├── icons.ts      → All Icons (Icon prefix)
│   │   ├── store.ts      → Redux + Actions + Types
│   │   ├── constants.ts  → Config + Routes + Assets
│   │   └── index.ts      → export * from all
│   │
│   ├── components/
│   │   ├── BUI-1.tsx           → HTML wrappers
│   │   ├── BUI-2.tsx           → UI Components
│   │   ├── BUI-O/              → Compound Components
│   │   │   ├── Modal.tsx
│   │   │   ├── Panel.tsx
│   │   │   └── TabPanel.tsx
│   │   ├── global/             → مكونات عامة
│   │   └── layout/             → تخطيطات
│   │
│   ├── pages/                  → صفحات التطبيق
│   ├── hooks/                  → Hooks مخصصة
│   ├── store/                  → Redux store + slices
│   ├── services/               → API services
│   ├── i18n/                   → تعدد اللغات
│   ├── routes/                 → Config الراوتر
│   ├── types/                  → أنواع TypeScript
│   ├── utils/                  → دوال مساعدة
│   ├── styles/                 → ملفات CSS
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 9. Alias System 🔗

### الفلسفة

```
❌ لا استيراد مباشر من المكتبات في الصفحات
✅ كل الاستيرادات عبر @a // @a => alias
```

### الهيكل

```
src/alias/
├── index.ts       → export * from all (الاستيراد العام)
├── core.ts        → React + Router + i18n + Redux + Hooks
├── ui.ts          → BUI + Components
├── icons.ts       → All Icons
├── store.ts       → Redux (dispatch, selectors, actions)
└── constants.ts   → Config + Routes + Assets
```

### qواعد مهمة

```markdown
✅ الاستيراد العام للصفحات البسيطة: import { ... } from '@a'; // @a => alias
✅ الاستيراد المحدد للصفحات الكبيرة: import { ... } from '@ui'
✅ Icon prefix إلزامي في icons.ts
✅ لا circular dependencies
✅ الملفات المحلية يمكن استيرادها مباشرة
```

---

## 10. BUI Component System 🎨

### الطبقات — القاعدة الأساسية

```
BUI-1 → HTML wrappers (لا منطق، لا state، لا hooks)
BUI-2 → UI Components (state/behavior — يستخدم BUI-1 فقط)
BUI-O → Compound (Modal, Panel, TabPanel — يستخدم BUI-2 فقط)
Pages → يستخدم BUI-O/BUI-2 فقط

❌ ممنوع تخطي الطبقات أبداً
```

### buildProps — إلزامي في كل مكون

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

### Checklist مكون جديد

```
□ الطبقة صح (BUI-1 / BUI-2 / BUI-O)؟
□ buildProps مستخدمة؟
□ interface يمتد من HTML الأصلي؟
□ ...restProps في النهاية؟
□ classGroup / classLabel بدل className متعددة؟
□ مضاف لـ alias/ui.ts؟
□ JSDoc بالعربية؟
□ Accessibility (aria, htmlFor)؟
□ Tailwind classes بالترتيب الصحيح؟
```

---

## 11. Tailwind CSS System 🎨

### الفلسفة

```
1. em وحدة القياس الأساسية — مش px
2. CSS Variables للألوان والثيم — مش hardcoded values
3. Tailwind 4 → @theme في CSS — مش tailwind.config.js
4. B: prefix للـ Custom Utilities — مش inline style
5. Tailwind أولاً، ترتيب ثابت دائماً
```

### ترتيب الـ Classes — إلزامي

```
1. Positioning  → relative / absolute / fixed / z-*
2. Display      → flex / grid / hidden / block
3. Box Model    → w-* / h-* / p-* / m-* / gap-* / border
4. Typography   → text-* / font-* / leading-* / B:tracking-*
5. Visuals      → bg-* / text-* / B:rounded-* / opacity-*
6. Motion       → B:transition-* / hover:* / B:shadow-*
```

### أمثلة استخدام

```html
<!-- زر أساسي -->
<button class="flex items-center justify-center gap-2 px-6 py-3 border-0 text-base font-semibold bg-py text-bg B:rounded-2 B:shadow-var hover:bg-py/90 hover:scale-[1.02] B:transition-smooth">
  إضغط هنا
</button>

<!-- بطاقة (Card) -->
<div class="relative flex flex-col gap-4 w-full p-6 border border-br bg-bg B:rounded-3 B:shadow-md">
  <h2 class="text-xl font-bold text-te">العنوان</h2>
  <p class="text-sm leading-relaxed text-sn">المحتوى هنا</p>
</div>

<!-- Input -->
<input class="w-full px-4 py-2_5 border border-br text-base text-tt bg-bg outline-none B:rounded-2 B:transition-colors focus:border-py focus:bg-py/5" placeholder="example@email.com"/>
```

### ⚠️ ممنوعات Tailwind

```
❌ hardcoded colors — استخدم bg-py / text-bg
❌ arbitrary values — استخدم القيم من @theme
❌ dark: prefix — المتغيرات تتغير تلقائياً
❌ ترتيب عشوائي — التزم بالترتيب أعلاه
❌ inline style للـ shadow/radius — استخدم B:shadow-* / B:rounded-*
❌ tailwind.config.js في Tailwind 4 — استخدم @theme في globals.css
```

---

## 12. Backend Architecture 🖥️

### Tech Stack

```yaml
Runtime  : Node.js 20.15.1
Framework: Express 4.20+
Language : TypeScript 5.3+
Database : (SQLite 3 / PostgreSQL 16) + Drizzle ORM
Validation: Zod 3.20
HTTP     : Axios 1.6
Testing  : Vitest
```

### هيكل app-server

```
app-server/
├── src/
│   ├── config/           → env, db, redis, logger
│   ├── modules/          → feature modules
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.validation.ts
│   │   └── users/
│   │       ├── users.controller.ts
│   │       ├── users.service.ts
│   │       ├── users.routes.ts
│   │       └── users.validation.ts
│   ├── middleware/        → global middleware
│   ├── utils/            → helper functions
│   ├── types/            → shared types
│   ├── app.ts            → Express app setup
│   └── server.ts         → entry point
├── drizzle/              → migrations
├── package.json
├── tsconfig.json
└── .env
```

### قواعد الـ Modules

```typescript
// كل module له 4 ملفات كحد أقصى:
// controller.ts   → request handling
// service.ts      → business logic
// routes.ts       → route definitions
// validation.ts   → Zod schemas

// ✅ Dependency Injection يدوي
class UsersService {
  constructor(private readonly db: DatabaseService) {}
}

// ✅ كل controller يستخدم try/catch موحد
async index(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await this.service.findAll()
    res.json({ success: true, data: users })
  } catch (error) {
    next(error)
  }
}
```

---

## 13. API Design 🔌

### Response Format

```typescript
// ✅ نجاح
interface I_SuccessResponse<T> {
  success: true
  data: T
  message?: string
}

// ✅ خطأ
interface I_ErrorResponse {
  success: false
  message: string
  error: {
    code: string
    details?: I_ValidationError[]
  }
}

// ✅ Pagination
interface I_PagedResponse<T> {
  success: true
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}
```

### HTTP Status Codes

```typescript
// 200 → GET success
// 201 → POST created
// 204 → DELETE success
// 400 → Validation error
// 401 → Unauthorized
// 403 → Forbidden
// 404 → Not found
// 409 → Conflict
// 422 → Unprocessable entity
// 429 → Rate limited
// 500 → Internal server error
```

### Naming Conventions

```
GET    /api/v1/users          → List all
GET    /api/v1/users/:id      → Get one
POST   /api/v1/users          → Create
PUT    /api/v1/users/:id      → Update
DELETE /api/v1/users/:id      → Delete
PATCH  /api/v1/users/:id      → Partial update
```

---

## 14. Security 🔒

### قواعد أساسية

```markdown
✅ JWT مع Access و Refresh token
✅ Rate limiting على كل الـ API routes
✅ Input validation قبل أي عملية
✅ Helmet.js للإعدادات الأمنية
✅ CORS محدود بدومين معين
✅ SQL injection محمي عبر Drizzle ORM (parameterized queries)
✅ XSS محمي عبر escape تلقائي
✅ Argon2id لتشفير كلمات المرور — مش bcrypt ولا sha
✅ لا تحفظ sensitive data في الـ JWT payload
✅ استخدم refresh token rotation
```

### مثال Middleware للـ Auth

```typescript
import { verify } from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }
  try {
    const payload = verify(token, process.env.JWT_SECRET!)
    req.user = payload
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' })
  }
}
```

---

## الملخص — القواعد الذهبية

```markdown
✅ الكود بالإنجليزية — التعليقات بالعربية المصرية
✅ تتكلم بالعربية المصرية دائماً
✅ لا any في TypeScript
✅ لا px — استخدم em/rem
✅ لا HEX/RGB — استخدم HSL/HSLA
✅ استخدم خصائص CSS المنطقية (inline-start/end)
✅ لا تبني كل حاجة — ابدأ بـ MVP
✅ Icon prefix إلزامي في alias/icons.ts
✅ file header إلزامي في كل ملف
✅ JSDoc بعد كل function/component
✅ BUI-1 → BUI-2 → BUI-O — ممنوع تخطي الطبقات
✅ Tailwind classes بالترتيب: Positioning → Display → Box Model → Typography → Visuals → Motion
```