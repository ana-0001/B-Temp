---
name: central-alias-system
description: 'نظام إلزامي غير قابل للتجاوز لإدارة الاستيرادات في مشروع React عبر نقطة استيراد مركزية واحدة (@a) مبنية على src/alias/index.ts. طبّق هذه المهارة في أي وقت تكتب فيه أو تراجع كوداً في المشروع: كتابة صفحة أو مكوّن أو Hook جديد، إضافة مكوّن BUI (BUI-1/BUI-2/BUI-O)، إضافة أيقونة من lucide-react، إضافة Hook مخصص، إضافة مكتبة خارجية، أو حذف أي مما سبق. تفرض المهارة: منع أي استيراد مباشر من react أو react-router-dom أو react-redux أو lucide-react أو مسارات نسبية (../../) داخل الصفحات والمكونات والـ Hooks؛ بادئة Icon إلزامية لكل أيقونة؛ export type / import type للأنواع؛ وتحديث فوري لملف الـ alias عند أي إضافة أو حذف. فعّلها عند ذكر: "@a"، "alias"، "src/alias"، "استيراد"، import، أو عند كتابة أي ملف يستورد React أو مكوّنات UI أو أيقونات.'
---

# نظام الـ Alias المركزي (Central Alias System)

**الإصدار:** 1.0.0
**الحالة:** إلزامي التطبيق — غير قابل للتجاوز

---

## 🎯 الهدف

أنت ملزم بتطبيق نظام الـ Alias المركزي في كل كود تكتبه داخل هذا المشروع.
ملف `src/alias/index.ts` هو المصدر الوحيد المعتمد لجميع الاستيرادات.
لا استثناءات. لا تجاوزات. لا مفاوضات.

---

## 📋 المتطلبات الإلزامية (Mandatory Requirements)

### 1. قاعدة الاستيراد الوحيدة

أنت ملزم بأن يكون **كل استيراد** في أي صفحة أو مكون أو Hook
صادراً من `@a` **حصراً** دون استثناء.

```typescript
// ✅ الطريقة الوحيدة المقبولة
import {
  React,
  useState,
  useEffect,
  useNavigate,
  useDispatch,
  useSelector,
  Button,
  Input,
  IconPlus,
  type FC,
} from '@a';

// ❌ ممنوع منعاً باتاً — يُعدّ هذا خطأً فادحاً
import React from 'react';
import { useState } from 'react';
import { Button } from '../../components/BUI-1';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
```

---

### 2. بنية ملف `src/alias/index.ts` الإلزامية

أنت ملزم بالحفاظ على هذا الهيكل وترتيبه في ملف الـ Alias:

```typescript
// ============================================================
// 📦 CORE — React & Hooks
// ============================================================
export {
  default as React,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useContext,
  createContext,
  type FC,
  type ReactNode,
  type CSSProperties,
  type MouseEvent,
  type ChangeEvent,
} from 'react';

// ============================================================
// 🧭 ROUTER — React Router DOM
// ============================================================
export {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
  Link,
  NavLink,
  Outlet,
  Navigate,
} from 'react-router-dom';

// ============================================================
// 🗄️ REDUX — State Management
// ============================================================
export { useDispatch, useSelector } from 'react-redux';
export { type RootState, type AppDispatch } from '@/store';

// ============================================================
// 🪝 HOOKS — Custom Hooks
// ============================================================
export { useSettings } from '@/hooks/use-settings';
export { useAuth }     from '@/hooks/use-auth';
export { useTheme }    from '@/hooks/use-theme';

// ============================================================
// 🧱 BUI-1 — HTML Wrappers
// ============================================================
export {
  Div1, Div2, Div3,
  Span, SpanIcon,
  H1, H2, H3, H4,
  P,
  Button,
  Input,
  Label,
  Form,
  Image,
} from '@/components/BUI-1';

// ============================================================
// ⚙️ BUI-2 — Smart Components
// ============================================================
export * from '@/components/BUI-2';

// ============================================================
// 🧩 BUI-O — Compound Components
// ============================================================
export { Modal, Panel, TabPanel, Drawer, Toast } from '@/components/BUI-O';

// ============================================================
// 🎨 ICONS — Unified Icon System
// ============================================================
export {
  // Navigation
  ChevronRight as IconChevronRight,
  ChevronLeft  as IconChevronLeft,
  ChevronDown  as IconChevronDown,
  ArrowLeft    as IconArrowLeft,
  ArrowRight   as IconArrowRight,

  // Actions
  Plus     as IconPlus,
  Pencil   as IconEdit,
  Trash2   as IconDelete,
  Search   as IconSearch,
  Download as IconDownload,
  Upload   as IconUpload,

  // UI State
  X           as IconClose,
  Check       as IconCheck,
  AlertCircle as IconAlert,
  Info        as IconInfo,

  // System
  Settings as IconSettings,
  User     as IconUser,
  LogOut   as IconLogout,
  Moon     as IconDarkMode,
  Sun      as IconLightMode,
} from 'lucide-react';
```

---

### 3. قواعد الأيقونات (Icon Rules)

أنت ملزم بالقواعد التالية عند التعامل مع أي أيقونة:

```typescript
// ✅ القاعدة: بادئة Icon إلزامية عند التصدير في alias/index.ts
export { Plus     as IconPlus     } from 'lucide-react';
export { Calendar as IconCalendar } from 'lucide-react';
export { Trash2   as IconDelete   } from 'lucide-react';

// ✅ الاستخدام الصحيح في الملفات
import { IconPlus, IconCalendar, IconDelete } from '@a';

// ❌ ممنوع — استيراد الأيقونة مباشرة
import { Plus } from 'lucide-react';

// ❌ ممنوع — استخدام الأيقونة بدون بادئة Icon
import { Plus as IconPlus } from 'lucide-react'; // في الصفحات
```

---

### 4. قواعد الأنواع (Type Rules)

أنت ملزم باستخدام `export type` و `import type` للأنواع دائماً:

```typescript
// ✅ التصدير الصحيح في alias/index.ts
export type { FC, ReactNode, CSSProperties } from 'react';
export type { RootState, AppDispatch }       from '@/store';

// ✅ الاستيراد الصحيح في الملفات
import { type FC, type ReactNode } from '@a';

// ❌ ممنوع — استيراد الأنواع مباشرة من المصدر
import type { FC } from 'react';
```

---

### 5. قاعدة التحديث الفوري (Immediate Update Rule)

أنت ملزم بتحديث `src/alias/index.ts` **فوراً** في هذه الحالات:

| الحدث | الإجراء الإلزامي |
|---|---|
| إنشاء مكون BUI جديد | تصديره في القطاع الصحيح من `@a` قبل أي استخدام |
| إضافة Hook مخصص جديد | تصديره في قطاع HOOKS من `@a` فوراً |
| إضافة أيقونة جديدة | تصديرها ببادئة `Icon` في قطاع ICONS |
| إضافة مكتبة خارجية جديدة | تصدير ما يلزم منها في `@a` قبل الاستخدام |
| حذف مكون أو Hook | حذف تصديره من `@a` فوراً |

---

## 🏗️ إعداد المشروع (Project Setup)

### `tsconfig.json` — إلزامي

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@a":   ["./src/alias/index.ts"],
      "@a/*": ["./src/alias/*"],
      "@/*":  ["./src/*"]
    }
  }
}
```

### `vite.config.ts` — إلزامي

```typescript
import { defineConfig } from 'vite';
import react            from '@vitejs/plugin-react';
import path             from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@a': path.resolve(__dirname, './src/alias/index.ts'),
      '@':  path.resolve(__dirname, './src'),
    },
  },
});
```

---

## 📁 هيكل ملفات الـ Alias (File Structure)

أنت ملزم بالحفاظ على هذا الهيكل:

```
src/
└── alias/
    ├── index.ts       ← نقطة الدخول الوحيدة (يُستورد منها @a)
    ├── core.ts        ← React & Hooks الأساسية
    ├── router.ts      ← React Router DOM
    ├── redux.ts       ← Redux & Store Types
    ├── hooks.ts       ← Custom Hooks
    ├── ui.ts          ← BUI-1 & BUI-2 & BUI-O
    └── icons.ts       ← جميع الأيقونات ببادئة Icon
```

### `src/alias/index.ts` — ملف التجميع

```typescript
// هذا الملف يجمع كل القطاعات — لا تضع تصديرات مباشرة هنا
export * from './core';
export * from './router';
export * from './redux';
export * from './hooks';
export * from './ui';
export * from './icons';
```

---

## ✅ سيناريوهات الاستخدام الإلزامية

### سيناريو 1: كتابة صفحة جديدة

```typescript
// 📄 src/pages/ProductsPage.tsx

// ✅ الطريقة الوحيدة المقبولة
import {
  // React & Hooks
  React, useState, useEffect,
  // Router
  useNavigate,
  // Redux
  useDispatch, useSelector,
  // Hooks
  useSettings,
  // Components
  Div1, H2, Button, Input, Modal,
  // Icons
  IconPlus, IconSearch, IconDelete,
  // Types
  type FC, type RootState,
} from '@a';

const ProductsPage: FC = () => {
  const [query, setQuery]   = useState('');
  const navigate            = useNavigate();
  const dispatch            = useDispatch();
  const { theme }           = useSettings();

  return (
    <Div1>
      <H2>المنتجات</H2>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="بحث..."
      />
      <Button onClick={() => navigate('/products/new')}>
        <IconPlus />
        منتج جديد
      </Button>
    </Div1>
  );
};

export default ProductsPage;
```

---

### سيناريو 2: إضافة مكون BUI جديد

```typescript
// 1️⃣ أنشئ الملف: src/components/BUI-1/DatePicker.tsx
// 2️⃣ صدّره فوراً في src/alias/ui.ts

// ✅ في src/alias/ui.ts — أضف هذا السطر فوراً
export { DatePicker } from '@/components/BUI-1';

// 3️⃣ استخدمه في الصفحات
import { DatePicker } from '@a'; // ✅
```

---

### سيناريو 3: إضافة أيقونة جديدة

```typescript
// 1️⃣ في src/alias/icons.ts — أضف الأيقونة بالبادئة الإلزامية
export { Calendar as IconCalendar } from 'lucide-react'; // ✅

// 2️⃣ استخدمها في الصفحات
import { IconCalendar } from '@a'; // ✅
```

---

### سيناريو 4: إضافة Hook مخصص جديد

```typescript
// 1️⃣ أنشئ الملف: src/hooks/use-permissions.ts
// 2️⃣ صدّره فوراً في src/alias/hooks.ts

// ✅ في src/alias/hooks.ts
export { usePermissions } from '@/hooks/use-permissions';

// 3️⃣ استخدمه في الصفحات
import { usePermissions } from '@a'; // ✅
```

---

## 🚫 جدول المحظورات الكامل

| ❌ ممنوع منعاً باتاً | ✅ البديل الإلزامي |
|---|---|
| `import React from 'react'` | `import { React } from '@a'` |
| `import { useState } from 'react'` | `import { useState } from '@a'` |
| `import { Plus } from 'lucide-react'` | `import { IconPlus } from '@a'` |
| `import { Button } from '../../BUI-1'` | `import { Button } from '@a'` |
| `import { useDispatch } from 'react-redux'` | `import { useDispatch } from '@a'` |
| `import type { FC } from 'react'` | `import { type FC } from '@a'` |
| استيراد أيقونة بدون بادئة `Icon` | إضافة بادئة `Icon` دائماً |
| إضافة مكون قبل تصديره في `@a` | تصديره في `@a` أولاً ثم الاستخدام |

---

## 📋 قائمة المراجعة الإلزامية (Mandatory Checklist)

أنت ملزم بمراجعة هذه النقاط قبل إرسال أي كود:

### قبل كتابة أي ملف
- [ ] هل جميع ما سأستخدمه موجود في `@a`؟
- [ ] إذا لم يكن موجوداً — هل أضفته لـ `@a` أولاً؟

### بعد كتابة أي ملف
- [ ] هل جميع الاستيرادات صادرة من `@a` حصراً؟
- [ ] هل الأيقونات تحمل بادئة `Icon`؟
- [ ] هل الأنواع مصدّرة بـ `type` keyword؟
- [ ] هل لم أكتب أي مسار نسبي (`../../`) في الاستيرادات؟

### عند إضافة شيء جديد
- [ ] هل أضفت المكون/Hook/أيقونة لـ `@a` فور إنشائها؟
- [ ] هل وضعتها في القطاع الصحيح داخل الـ Alias؟
- [ ] هل ملف الـ Alias لا يزال مرتباً ومقروءاً؟

### عند حذف شيء
- [ ] هل حذفت التصدير المقابل من `@a`؟
- [ ] هل تأكدت أنه لا يوجد ملف لا يزال يستخدمه؟

---

## ⚙️ حالات الاستثناء المسموح بها

الحالات التالية **هي الوحيدة** التي يُسمح فيها بالاستيراد خارج `@a`:

```typescript
// ✅ مسموح — داخل ملف alias/index.ts نفسه أو ملفاته الفرعية فقط
export { default as React } from 'react';
export { Plus as IconPlus } from 'lucide-react';

// ✅ مسموح — في ملفات الإعداد (vite.config.ts, tsconfig.json)
import path from 'path';

// ✅ مسموح — في ملف Store الرئيسي (src/store/index.ts)
import { configureStore } from '@reduxjs/toolkit';

// ❌ ممنوع — في أي صفحة أو مكون أو Hook مهما كان السبب
import { anything } from 'anywhere-except-@a';
```

---

## 🔧 الأولويات التنفيذية

```
الأولوية 1 (فوري):     تطبيق قاعدة @a في كل كود جديد
الأولوية 2 (فوري):     تحديث alias/index.ts عند إضافة أي شيء جديد
الأولوية 3 (مستمر):    مراجعة الـ Checklist قبل كل إرسال
الأولوية 4 (دوري):     التأكد من عدم وجود Dead Exports في @a
```

---

## 📌 الخلاصة التنفيذية

```
src/alias/index.ts  = المصدر الوحيد للحقيقة
@a                  = الطريق الوحيد للاستيراد
Icon*               = البادئة الإلزامية لكل أيقونة
export type         = الطريقة الوحيدة لتصدير الأنواع
تحديث @a أولاً     = القاعدة الذهبية قبل أي استخدام
```

> أي كود لا يلتزم بهذا الـ PRD يُعدّ **خاطئاً** ويجب إعادة كتابته.
> لا استثناءات. لا مفاوضات. لا تجاوزات.
