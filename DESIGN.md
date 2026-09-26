---
name: design-rules
description: 'نظام قواعد تصميم عام وقابل للتخصيص لمشاريع Web وDesktop (Electron/Tauri). استخدمه دائماً عند بناء أو تعديل أي واجهة UI تحتاج Design System موحّد — الألوان، Typography، المسافات، الحدود، الظلال، Layout، Responsive، RTL/LTR، Light/Dark Theme، Accessibility، Animations، ومكونات أساسية. يفرض CSS Variables كمصدر مركزي، وحدات em/rem فقط دون px، وألوان HSL/HSLA حصراً دون HEX/RGB/أسماء ألوان. يفرض أيضاً إجبار أي مكتبة خارجية (Tailwind، Bootstrap، MUI، Ant Design، Chakra...) على إعادة توجيه متغيراتها لتستهلك Tokens هذا النظام بدل قيمها الافتراضية، ويتضمن طبقات إلزامية لإجبار المتصفح (Chrome, Firefox, Safari, Edge, Brave) على احترام التصميم ومنع تدخلاته الافتراضية (User-Agent Stylesheets، Autofill/Password Manager، مظهر الحقول الافتراضي). فعّلها عند ذكر: "design rules"، "design system"، "design tokens"، "UI"، "RTL"، "Dark Theme"، "Tailwind"، "Bootstrap"، "Autofill"، "Browser Reset"، أو عند بناء واجهة عامة.'
---

# Design Rules — General Design System

## نظرة عامة

Design Rules هو نظام تصميم عام ومحايد للهوية، مُصمَّم ليكون أساساً قابلاً لإعادة الاستخدام والتخصيص عبر مشاريع Web وتطبيقات Desktop المبنية باستخدام Electron أو Tauri. يمنح النظام الأولوية للوضوح، والمرونة، والتجاوب، ودعم RTL/LTR، وإمكانية الوصول (Accessibility)، مع إبقاء جميع القيم الأساسية قابلة للتخصيص من نقطة مركزية واحدة.

ألوان Brand الافتراضية في هذا النظام ليست هوية نهائية للمشروع؛ يجب تخصيص `Primary` و`Secondary` و`Accent` بما يتوافق مع هوية كل مشروع، مع الحفاظ على بنية الـ Tokens وقواعد الاستخدام الموضحة أدناه.

الإصدار المرجعي: `v1.1.0` — آخر تحديث: 2026 (إضافة إجبار المكتبات الخارجية على الالتزام بالـ Tokens، وإضافة طبقات إجبار المتصفح على احترام التصميم).

## مبادئ التصميم العامة (إلزامية)

هذه المبادئ تحكم أي واجهة أو مكوّن يُبنى باستخدام هذه المهارة، ولا يجوز مخالفتها:

1. **الحداثة والوضوح**: التصميم يجب أن يكون حديثاً، نظيفاً، مريحاً للعين، وواضح التسلسل الهرمي البصري.

2. **CSS Variables هي المصدر المركزي**: كل قيمة قابلة للتخصيص — خصوصاً الألوان، المسافات، Typography، نصف القطر والظلال — يجب استهلاكها عبر `var(--token-name)` كلما كان لها Token معرّف، وليس عبر قيم ثابتة موزعة داخل المكونات.

3. **تجاوب كامل (Responsive)**: يجب أن تعمل الواجهات عبر جميع أحجام الشاشات والنوافذ دون Overflow أفقي غير مقصود، مع تكييف التخطيط والمحتوى حسب المساحة المتاحة.

4. **دعم كامل لـ RTL وLTR**: استخدم CSS Logical Properties دائماً مثل `margin-inline-start` و`padding-inline-end` و`border-inline-start` و`inset-inline-end` بدلاً من الخصائص الفيزيائية `left/right`. لا تستخدم خصائص اتجاهية فيزيائية إلا عند وجود سبب بصري أو تقني واضح.

5. **Light/Dark Theme**: جميع الألوان الدلالية يجب أن تُستهلك عبر CSS Variables بحيث يمكن تبديل القيم مركزياً بين الوضع الفاتح والداكن باستخدام `[data-theme="dark"]` أو `.dark`.

6. **Accessibility أساسية وإلزامية**:
   - دعم Keyboard Navigation باستخدام Tab وShift+Tab وEnter وSpace وEscape حيث يناسب المكوّن.
   - كل عنصر تفاعلي يجب أن يملك Focus مرئياً.
   - لا تستخدم `outline: none` دون توفير بديل Focus واضح.
   - استخدم HTML الدلالي وخصائص ARIA المناسبة.
   - لا تعتمد على اللون وحده لنقل حالة أو معلومة.
   - حافظ على تباين لا يقل عن WCAG AA: `4.5:1` للنصوص العادية و`3:1` للنصوص الكبيرة.

7. **الأداء أولاً في الحركة**: تجنب Animations الزخرفية والمبالغ فيها. الحركات الوظيفية قصيرة فقط، ويجب احترام `prefers-reduced-motion`.

8. **الوحدات**: يُحظر استخدام `px` للقيم التصميمية. استخدم `em` أو `rem` دائماً، مع ملاءمة `em` للمكونات القابلة للتحجيم و`rem` للقيم المرتبطة بالجذر. القيمة `9999px` في `--border-radius-full` استثناء رمزي للدائرية الكاملة ويمكن استبدالها بقيمة `em` كبيرة عند الحاجة إلى تطبيق الحظر حرفياً.

9. **الألوان بصيغة HSL/HSLA حصراً**: يُحظر استخدام Color Names أو HEX أو RGB/RGBA. جميع الألوان يجب أن تُكتب بصيغة `hsl(...)` أو `hsla(...)`، أو تُستهلك من CSS Variable يحتوي لوناً متوافقاً.

10. **Brand قابل للتخصيص**: قيم Brand الافتراضية نقطة بداية وليست هوية ثابتة. عند بدء مشروع جديد يجب تخصيص Brand Tokens مع الحفاظ على أدوارها الدلالية.

11. **إجبار المكتبات الخارجية على الالتزام (إلزامي وليس اختيارياً)**: أي مكتبة تصميم أو UI Framework خارجي يُستخدم في المشروع (Tailwind CSS، Bootstrap، MUI، Ant Design، Chakra، Bulma، أو غيرها) **يُمنع** أن يفرض نظامه اللوني أو مقاييسه أو أسماء متغيراته الخاصة على الواجهة. يجب دائماً إعادة توجيه (Remap/Override) متغيرات وThemes تلك المكتبة لتشير إلى Tokens هذا النظام (`--color-py`, `--color-sy`, ...) بدلاً من قيمها الافتراضية (مثل `blue-500` في Tailwind أو `--bs-primary` في Bootstrap). التفاصيل الكاملة في قسم "المكتبات الخارجية" أدناه.

12. **إجبار المتصفح على احترام التصميم (إلزامي)**: يُحظر ترك أي عنصر (حقول، أزرار، قوائم Autofill، Scrollbars، Selection) بمظهره الافتراضي القادم من User-Agent Stylesheet الخاص بالمتصفح. يجب دائماً تطبيق طبقات إعادة الضبط (Reset) والتجريد (Appearance Override) الموضحة في قسم "إجبار المتصفح على الالتزام بالتصميم" أدناه، بغض النظر عن نوع المشروع (Web أو Desktop).

الأساس المرجعي للتحويل هو `1em = 1rem = 16px` عند حجم الخط الجذري الافتراضي، ولا يعني ذلك السماح بكتابة القياسات التصميمية بوحدة `px`.

---

## نظام الألوان (Design Tokens — HSL/HSLA فقط)

### الوضع الفاتح (Light — الافتراضي)

| الاسم | الاستخدام | HSL |
|---|---|---|
| `--color-bg` | خلفية التطبيق الأساسية | `hsl(40 0% 94%)` |
| `--color-bg-f` | Foreground فوق الخلفية الأساسية | `hsl(40 0% 4%)` |
| `--color-py` | Primary / اللون الرئيسي | `hsl(40 80% 60%)` |
| `--color-py-f` | Foreground فوق Primary | `hsl(40 94% 4%)` |
| `--color-sy` | Secondary | `hsl(340 80% 60%)` |
| `--color-sy-f` | Foreground فوق Secondary | `hsl(40 0% 4%)` |
| `--color-at` | Accent | `hsl(200 80% 60%)` |
| `--color-at-f` | Foreground فوق Accent | `hsl(200 80% 4%)` |
| `--color-md` | Muted / محايد | `hsl(40 15% 60%)` |
| `--color-md-f` | Foreground/نص خافت | `hsl(40 15% 4%)` |
| `--color-ok` | Success | `hsl(150 80% 60%)` |
| `--color-ok-f` | Foreground فوق Success | `hsl(40 0% 4%)` |
| `--color-err` | Error / Danger | `hsl(0 80% 60%)` |
| `--color-err-f` | Foreground فوق Error | `hsl(40 0% 4%)` |
| `--color-war` | Warning | `hsl(50 80% 60%)` |
| `--color-war-f` | Foreground فوق Warning | `hsl(40 0% 4%)` |
| `--color-inf` | Information | `hsl(200 80% 60%)` |
| `--color-inf-f` | Foreground فوق Information | `hsl(40 0% 4%)` |
| `--color-surface` | البطاقات والأسطح | `hsl(40 0% 100%)` |
| `--color-surface-f` | Foreground فوق Surface | `hsl(40 0% 4%)` |
| `--color-surface-alt` | سطح بديل | `hsl(40 0% 97%)` |
| `--color-border` | الحدود والفواصل | `hsl(40 0% 85%)` |

`--color-border-focus` يساوي `var(--color-py)` افتراضياً.

### الوضع الداكن (Dark)

تُعاد تعريف Tokens نفسها تحت `[data-theme="dark"]` أو `.dark` دون تغيير أسماء المتغيرات داخل المكونات.

| الاسم | HSL (Dark) |
|---|---|
| `--color-bg` | `hsl(40 0% 4%)` |
| `--color-bg-f` | `hsl(40 0% 94%)` |
| `--color-py` | `hsl(40 80% 30%)` |
| `--color-py-f` | `hsl(40 94% 94%)` |
| `--color-sy` | `hsl(340 80% 30%)` |
| `--color-sy-f` | `hsl(40 0% 94%)` |
| `--color-at` | `hsl(200 80% 30%)` |
| `--color-at-f` | `hsl(200 80% 94%)` |
| `--color-md` | `hsl(40 15% 30%)` |
| `--color-md-f` | `hsl(40 15% 94%)` |
| `--color-ok` | `hsl(150 80% 30%)` |
| `--color-ok-f` | `hsl(40 0% 94%)` |
| `--color-err` | `hsl(0 80% 30%)` |
| `--color-err-f` | `hsl(40 0% 94%)` |
| `--color-war` | `hsl(50 80% 30%)` |
| `--color-war-f` | `hsl(40 0% 94%)` |
| `--color-inf` | `hsl(200 80% 30%)` |
| `--color-inf-f` | `hsl(40 0% 94%)` |
| `--color-surface` | `hsl(40 0% 8%)` |
| `--color-surface-f` | `hsl(40 0% 94%)` |
| `--color-surface-alt` | `hsl(40 0% 10%)` |
| `--color-border` | `hsl(40 0% 20%)` |

### الألوان التفاعلية (Interactive / Overlay)

| Token | Light | Dark |
|---|---|---|
| `--color-hover` | `hsla(40 0% 4% / 0.04)` | `hsla(40 0% 94% / 0.05)` |
| `--color-active` | `hsla(40 0% 4% / 0.08)` | `hsla(40 0% 94% / 0.1)` |
| `--color-overlay` | `hsla(40 0% 4% / 0.5)` | `hsla(40 0% 4% / 0.7)` |

### تخصيص Brand

المعاني الدلالية للـ Tokens ثابتة، لكن قيمها ليست كذلك:

- `py` = Primary
- `sy` = Secondary
- `at` = Accent
- `md` = Muted

مثال لهوية زرقاء:

```css
:root {
  --color-py: hsl(210 80% 55%);
  --color-py-f: hsl(210 80% 98%);
  --color-sy: hsl(260 70% 55%);
  --color-sy-f: hsl(40 0% 98%);
}
```

يجب التحقق من التباين بعد أي تخصيص للـ Brand، وعدم افتراض أن تغيير Hue وحده يحافظ تلقائياً على WCAG AA.

---

## الطباعة (Typography)

### عائلات الخطوط

- **الخط الأساسي**: `'Segoe UI', system-ui, -apple-system, sans-serif`.
- **العربية / RTL**: `'Segoe UI', 'Cairo', 'Tajawal', sans-serif`.
- **Mono**: `'Cascadia Code', 'Fira Code', 'Consolas', monospace`.

| النمط | الحجم | الوزن | ارتفاع السطر |
|---|---|---|---|
| H1 | `var(--font-size-2xl)` | `700` | `var(--line-height-tight)` |
| H2 | `var(--font-size-xl)` | `600` | `var(--line-height-tight)` |
| H3 | `var(--font-size-lg)` | `600` | `var(--line-height-normal)` |
| Body | `var(--font-size-md)` | `400` | `var(--line-height-normal)` |
| Small | `var(--font-size-sm)` | `400` | `var(--line-height-normal)` |
| Helper | `var(--font-size-xs)` | `400` | `var(--line-height-normal)` |
| Code | `var(--font-size-sm)` | Normal | Mono |

### أحجام الخطوط

| Token | القيمة |
|---|---|
| `--font-size-xs` | `0.75em` |
| `--font-size-sm` | `0.875em` |
| `--font-size-md` | `1em` |
| `--font-size-lg` | `1.125em` |
| `--font-size-xl` | `1.25em` |
| `--font-size-2xl` | `1.5em` |
| `--font-size-3xl` | `2em` |

الأوزان المتاحة: `400`, `500`, `600`, `700`. ارتفاعات السطر: `1.25`, `1.5`, `1.75`.

---

## المسافات (Spacing)

| الاسم | القيمة |
|---|---|
| `--spacing-xs` | `0.25em` |
| `--spacing-sm` | `0.5em` |
| `--spacing-md` | `1em` |
| `--spacing-lg` | `1.5em` |
| `--spacing-xl` | `2em` |
| `--spacing-2xl` | `3em` |

استهلك هذه القيم عبر CSS Variables بدلاً من تكرار القياسات المباشرة كلما كانت المسافة مطابقة للـ Scale.

## نصف القطر الحدودي (Border Radius)

| الاسم | القيمة |
|---|---|
| `--border-radius-sm` | `0.25em` |
| `--border-radius` | `0.5em` |
| `--border-radius-lg` | `0.75em` |
| `--border-radius-xl` | `1em` |
| `--border-radius-full` | `9999px` |

`full` قيمة رمزية للدائرية الكاملة؛ استخدم قيمة `em` كبيرة بدلاً منها إذا كان المشروع يفرض حظر `px` آلياً دون استثناءات.

## الإضاءة والظلال (Elevation)

### Light

| المستوى | القيمة |
|---|---|
| `sm` | `0 0.0625em 0.125em hsla(40 0% 4% / 0.08)` |
| `md` | `0 0.25em 0.75em hsla(40 0% 4% / 0.1)` |
| `lg` | `0 0.5em 1.5em hsla(40 0% 4% / 0.1)` |
| `xl` | `0 1em 2.5em hsla(40 0% 4% / 0.12)` |

### Dark

| المستوى | القيمة |
|---|---|
| `sm` | `0 0.0625em 0.125em hsla(40 0% 0% / 0.3)` |
| `md` | `0 0.25em 0.75em hsla(40 0% 0% / 0.4)` |
| `lg` | `0 0.5em 1.5em hsla(40 0% 0% / 0.5)` |
| `xl` | `0 1em 2.5em hsla(40 0% 0% / 0.6)` |

---

## الحركة (Motion)

الانتقالات المرجعية:

| Token | القيمة |
|---|---|
| `--transition-fast` | `150ms ease` |
| `--transition-normal` | `250ms ease` |
| `--transition-slow` | `350ms ease` |

الاستخدام العام للحركة يجب ألا يتجاوز `300ms` في المكونات الاعتيادية. `--transition-slow` موجود كـ Token عام، لكنه لا يُستخدم لحركات UI الاعتيادية إلا عند وجود مبرر وظيفي.

الحركات المسموحة:

- Fade باستخدام `opacity`.
- Slide قصير باستخدام `transform: translateY(...)`.
- Pop خفيف باستخدام `scale(0.95)` إلى `1`.
- Collapse/Expand عند الحاجة الوظيفية.

دعم Reduced Motion إلزامي:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
}
```

---

## طبقات الواجهة (Z-Index)

| Token | القيمة |
|---|---|
| `--z-base` | `0` |
| `--z-above` | `10` |
| `--z-sticky` | `100` |
| `--z-overlay` | `200` |
| `--z-modal` | `300` |
| `--z-toast` | `400` |
| `--z-tooltip` | `500` |

استخدم هذه الطبقات بدلاً من أرقام Z-Index عشوائية داخل المكونات.

---

## نظام التخطيط (Layout)

### التخطيط الأساسي

التخطيط المرجعي لتطبيقات Desktop/Web هو Header اختياري يعلو Body يتكون من Sidebar اختيارية وMain Content مرن.

```css
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-bg-f);
  font-family: var(--font-family);
  font-size: 1rem;
}

.app-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.app-sidebar {
  inline-size: 15em;
  flex-shrink: 0;
  overflow: auto;
}

.app-content {
  flex: 1;
  overflow: auto;
  padding: var(--spacing-lg);
}
```

### Container System

| النوع | أقصى عرض |
|---|---|
| `container-sm` | `40em` |
| `container-md` | `56em` |
| `container-lg` | `75em` |
| `container-xl` | `90em` |
| `container-full` | `100%` |

```css
.container {
  inline-size: 100%;
  max-inline-size: 75em;
  margin-inline: auto;
  padding-inline: var(--spacing-lg);
}
```

يفضّل استخدام الخصائص المنطقية مثل `inline-size` و`max-inline-size` عندما يكون ذلك مناسباً.

---

## المكوّنات (Components)

### الأزرار (Buttons)

**الأنماط (Variants)**

- **Primary**: خلفية `--color-py`، نص `--color-py-f`، وحالة Hover بخفض opacity إلى `0.9`.
- **Secondary**: خلفية شفافة، حدود `0.0625em` بلون `--color-md`، وHover باستخدام `--color-hover`.
- **Accent**: خلفية `--color-at`، نص `--color-at-f`، وHover opacity `0.9`.
- **Danger**: خلفية `--color-err`، نص `--color-err-f`، وHover opacity `0.9`.
- **Ghost**: خلفية شفافة وHover باستخدام `--color-hover`.
- **Link**: خلفية شفافة، نص `--color-py`، مع underline.

**الأحجام**

| الحجم | الحشو | الخط |
|---|---|---|
| `sm` | `0.25em 0.75em` | `--font-size-sm` |
| `md` | `0.5em 1em` | `--font-size-md` |
| `lg` | `0.75em 1.5em` | `--font-size-lg` |
| `xl` | `1em 2em` | `--font-size-xl` |

الافتراضي هو `md`. استخدم `--border-radius` و`--transition-fast`. في حالة Disabled استخدم `opacity: 0.5` و`cursor: not-allowed` مع منع التفاعل الفعلي.

**Accessibility**: استخدم `<button>` للإجراءات، واسم وصول واضحاً مستمداً من النص المرئي عندما يكون موجوداً أو `aria-label` عند غيابه. يجب دعم Enter/Space و`:focus-visible` واضح.

---

### حقول الإدخال (Inputs & Form Elements)

- الحدود: `0.0625em solid var(--color-border)`.
- Radius: `var(--border-radius)`.
- الحشو: `0.5em 0.75em`.
- الخط: `var(--font-size-md)`.
- الخلفية: `var(--color-surface)`.
- النص: `var(--color-bg-f)`.
- العرض الافتراضي: `100%`.
- الانتقال: `border-color var(--transition-fast)`.

**Focus**: استخدم `--color-py` للحدود مع Focus Ring مرئي. إذا استُخدمت Relative Color Syntax مثل `hsla(from var(--color-py) ...)` فتحقق من دعم المتصفحات المستهدفة، أو عرّف Focus Ring كـ Token مستقل.

**Error**: حدود `--color-err` وحلقة Error مناسبة.

**Success**: حدود `--color-ok`.

**Disabled**: `opacity: 0.6`، `cursor: not-allowed` وخلفية `--color-surface-alt`.

**Label**: حجم `--font-size-sm`، وزن `--font-weight-medium`، ومسافة Block سفلية `--spacing-xs`.

**Helper Text**: حجم `--font-size-xs`، لون `--color-md-f` ومسافة علوية `--spacing-xs`.

كل Input يجب أن يرتبط بـ `<label>`، والأخطاء يجب ربطها بالحقل باستخدام `aria-describedby` و`aria-invalid` عند الحاجة.

---

### البطاقات (Cards)

- الخلفية: `--color-surface`.
- الحدود: `0.0625em solid var(--color-border)`.
- Radius: `--border-radius-lg`.
- الظل: `--shadow-sm`.
- الحشو: `--spacing-lg`.
- الانتقال: `box-shadow var(--transition-fast)`.

Hover اختياري فقط للبطاقات التفاعلية: `--shadow-md` وحدود `--color-py`. لا تضف Hover بصرياً إلى بطاقة غير قابلة للتفاعل بطريقة توحي بأنها قابلة للنقر.

---

### Dialog / Modal

**Overlay**: `position: fixed`، `inset: 0`، خلفية `--color-overlay`، `backdrop-filter: blur(0.25em)`، و`z-index: --z-overlay`.

**Dialog**: خلفية `--color-surface`، Radius `--border-radius-lg`، ظل `--shadow-xl`، حشو `--spacing-xl`، عرض أقصى `30em`، عرض `90%`، وطبقة `--z-modal`.

الحركة المسموحة عند الفتح: opacity من `0` إلى `1` مع `translateY(-1em)` إلى `0` خلال `200ms ease-out`. الإغلاق خلال `150ms ease-in`.

**Accessibility إلزامية**: استخدم `<dialog>` الأصلي عندما يلائم الحالة، أو `role="dialog"` و`aria-modal="true"` عند بناء Dialog مخصص. انقل Focus إلى عنصر مناسب داخل النافذة عند الفتح، احصر Tab داخلها، أعد Focus إلى المشغّل عند الإغلاق، وادعم Escape.

---

### Toast / Notifications

- طبقة العرض: `--z-toast`.
- المسافة بين Toasts: `--spacing-sm`.
- الحشو: `--spacing-md`.
- Radius: `--border-radius`.
- الخلفية: `--color-surface`.
- الظل: `--shadow-lg`.
- الحد الأدنى للعرض: `18em`.
- الحد الأقصى: `25em`.

الحالات تستخدم `border-inline-start: 0.1875em solid` مع `--color-ok` أو `--color-err` أو `--color-war` أو `--color-inf`.

يجب تحديد الموضع باستخدام Logical Properties بحيث يظهر عند Inline End دون تكرار قواعد LTR/RTL إلا عند اختلاف مقصود في السلوك.

**Accessibility**: استخدم `role="alert"` للحالات العاجلة أو `aria-live="polite"` للإشعارات غير العاجلة.

---

### Badges & Tags

- الحشو: `0.125em 0.5em`.
- Radius: `--border-radius-full`.
- الخط: `--font-size-xs`.
- الوزن: `--font-weight-medium`.

الحالات المتاحة: Default باستخدام `--color-md`، Primary باستخدام `--color-py`، Success باستخدام `--color-ok`، Error باستخدام `--color-err`، Warning باستخدام `--color-war`، وInfo باستخدام `--color-inf`. استخدم دائماً Foreground Token المقابل.

---

### Dropdown / Select Menu

- الخلفية: `--color-surface`.
- الحدود: `0.0625em solid var(--color-border)`.
- Radius: `--border-radius`.
- الظل: `--shadow-md`.
- الحد الأدنى للعرض: `10em`.
- Z-Index: `--z-above`.

العنصر الداخلي يستخدم حشواً `0.5em var(--spacing-md)` وHover باستخدام `--color-hover`. العنصر المحدد يستخدم `--color-active` ونص `--color-py` ووزن `--font-weight-medium`.

**Accessibility**: لا تضف `role="menu"` أو `role="listbox"` بصورة تبادلية؛ اختر ARIA Pattern الذي يطابق وظيفة المكوّن، ونفّذ Keyboard Interaction المطلوبة لذلك النمط.

---

### Skeleton Loader

- الخلفية: `--color-surface-alt`.
- Radius: `--border-radius`.
- الحركة المرجعية: Pulse بطول `1.5s ease-in-out infinite`.

```css
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }
}
```

يجب تعطيل أو تقليل Pulse تلقائياً تحت `prefers-reduced-motion: reduce`.

---

## التجاوب (Responsive)

### Breakpoints المرجعية

| المستوى | النطاق | الاستخدام |
|---|---|---|
| `xs` | أقل من `30em` | موبايل صغير |
| `sm` | `30em–39.9375em` | موبايل |
| `md` | `40em–63.9375em` | Tablet / نافذة صغيرة |
| `lg` | `64em–79.9375em` | Laptop |
| `xl` | `80em–95.9375em` | شاشة كبيرة |
| `2xl` | `96em` فأعلى | شاشة عريضة |

الأرقام أعلاه هي التحويل المباشر للحدود المرجعية `480/640/1024/1280/1536` إلى `em`.

أمثلة:

```css
@media (max-width: 29.9375em) {
  /* xs */
}

@media (min-width: 30em) {
  /* sm+ */
}

@media (min-width: 40em) {
  /* md+ */
}

@media (min-width: 64em) {
  /* lg+ */
}
```

على `xs/sm` استخدم Layout أحادي العمود وحشواً أقل وأخفِ التفاصيل الثانوية فقط عندما لا يؤدي ذلك إلى فقد وظيفة مهمة. على `md` يمكن جعل Sidebar قابلة للطي، وعلى `lg+` يمكن استخدام التخطيط الموسع وSidebar ثابتة.

**Touch Target**: الحجم الأدنى المستهدف للعناصر التفاعلية هو `2.75em × 2.75em`.

---

## دعم RTL/LTR

دعم الاتجاهين إلزامي، ويُدار الاتجاه على `<html dir="rtl">` أو `<html dir="ltr">`.

```css
html[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

[dir="rtl"] {
  font-family: var(--font-family-ar);
}

.element {
  margin-inline-start: 1em;
  margin-inline-end: 1em;
  padding-inline-start: 1em;
  padding-inline-end: 1em;
  border-inline-start: 0.0625em solid var(--color-border);
  inset-inline-start: 0;
}

[dir="rtl"] .icon-directional {
  transform: scaleX(-1);
}
```

لا تعكس جميع الأيقونات تلقائياً؛ Mirror إلزامي فقط للأيقونات التي تحمل معنى اتجاهياً، مثل الأسهم والتنقل السابق/التالي. الأيقونات غير الاتجاهية والشعارات لا تُعكس.

---

## Accessibility

القواعد التالية إلزامية في جميع المشاريع:

1. العناصر التفاعلية يجب أن تمتلك Accessible Name واضحاً؛ استخدم النص المرئي عندما يكفي، و`aria-label` فقط عندما لا يوجد اسم نصي مناسب.
2. جميع الصور تحتاج `alt` مناسباً؛ الصور الزخرفية تستخدم `alt=""`.
3. كل Input يحتاج `<label>` مرتبطاً به عبر `for`/`id` أو آلية HTML مكافئة.
4. Keyboard Navigation يجب أن يعمل بالكامل حسب طبيعة المكوّن.
5. Focus Ring واضح إلزامي؛ `outline: none` محظور دون بديل مرئي.
6. اللون لا يكون الوسيلة الوحيدة لنقل المعلومات.
7. التباين لا يقل عن `4.5:1` للنصوص العادية و`3:1` للنصوص الكبيرة.
8. Dialog/Modal يحتاج Focus Management وFocus Trap وإعادة Focus للمشغّل.
9. Toast يستخدم `role="alert"` أو منطقة Live مناسبة حسب أولوية الرسالة.
10. Loading State يستخدم `aria-busy="true"` على المنطقة التي يجري تحميلها وAccessible Label عند الحاجة.
11. Dropdown/Select/Menu يتبع ARIA Pattern المطابق لوظيفته، مع Keyboard Navigation الخاصة بذلك النمط.
12. يجب ألا تُزال دلالات HTML الأصلية واستبدالها بـ ARIA دون حاجة؛ العناصر الأصلية مفضلة متى كانت مناسبة.

---

## المكتبات الخارجية (Tailwind CSS، Bootstrap، وغيرها) — إلزامي عند الاستخدام

طبّق هذا القسم إلزامياً في أي مشروع يستخدم مكتبة تصميم أو UI Framework خارجي، أياً كان (Tailwind CSS، Bootstrap، MUI، Ant Design، Chakra UI، Bulma، Radix Themes، ...). **لا يجوز** ترك أي مكتبة خارجية تعمل بنظامها اللوني أو مقاييسها أو أسماء متغيراتها الافتراضية؛ يجب دائماً إجبارها على الاستهلاك من Tokens هذا النظام حصراً.

### القاعدة العامة (تنطبق على أي مكتبة)

1. **Tokens هذا النظام هي المصدر الوحيد للحقيقة**: أي متغير أو Token تعرّفه المكتبة الخارجية (لون، مسافة، Radius، ظل، خط) يجب أن يُعاد توجيهه (Alias/Remap) ليشير إلى `var(--color-py)`, `var(--spacing-md)`, `var(--border-radius)`... إلخ، بدلاً من قيمه الجاهزة.
2. **يُحظر استخدام الألوان الجاهزة للمكتبة مباشرة** مثل `bg-blue-500` أو `text-gray-700` في Tailwind، أو `.btn-primary` مع لوحة Bootstrap الافتراضية غير المعاد تعريفها، أو `theme.palette.primary.main` الافتراضي في MUI دون Override. أي استخدام لوني يجب أن يمر عبر اسم Token دلالي مرتبط بهذا النظام (Primary/Secondary/Accent/Muted/Success/Error/Warning/Info) وليس عبر اسم لوني حرفي خاص بالمكتبة (blue, red, gray...).
3. **الأسماء الدلالية تبقى أسماء هذا النظام**: عند ربط المكتبة بالنظام، تُستخدم أسماء الأدوار المعتمدة هنا (`py`, `sy`, `at`, `md`, `ok`, `err`, `war`, `inf`, `surface`, `border`, ...) كأسماء الـ Aliases في إعداد المكتبة، وليس أسماء المكتبة الافتراضية (`primary-500`, `bs-primary`, `theme.palette.primary`...) كمرجع نهائي للتصميم.
4. **الوحدات وHSL يبقيان كما هما**: أي Scale مسافات أو Radius أو ظلال تضيفها المكتبة يجب أن تُقيَّد بـ Tokens هذا النظام (`em`/`rem`، وHSL/HSLA فقط)، ويُحظر إدخال قيم `px` أو HEX/RGB جديدة عبر إعدادات المكتبة.
5. **Dark Mode موحّد**: تبديل الثيم في المكتبة (`dark:` في Tailwind، `data-bs-theme` في Bootstrap، `ThemeProvider` في MUI/Chakra...) يجب أن يُربط بنفس آلية هذا النظام (`[data-theme="dark"]` أو `.dark`) وليس بآلية مستقلة تخلق مصدرين للحقيقة.
6. **الحد من Arbitrary/Inline Overrides**: لا تُستخدم القيم الحرة (Arbitrary Values في Tailwind، أو Inline Styles، أو `sx`/`style` مباشرة في المكتبات الأخرى) لتمرير ألوان أو مسافات جديدة تتجاوز Tokens المعرّفة، إلا عند غياب Token مكافئ فعلاً.
7. **لا تُبقِ CSS المكتبة الافتراضي (Reset/Base) يتعارض مع طبقة إجبار المتصفح**: بعض المكتبات (خصوصاً Bootstrap) تفرض Reset خاصاً بها (Reboot). يجب تحميل طبقة "إجبار المتصفح" المعرّفة في هذا الملف **بعد** CSS الخاص بالمكتبة، حتى تكون الكلمة الأخيرة دائماً لقواعد هذا النظام.

### Tailwind CSS

القواعد الأساسية: CSS Variables تبقى المصدر المركزي للقيم، واستخدم `clsx` مع `tailwind-merge` لدمج Class Names في المكونات القابلة لإعادة الاستخدام. تجنب Arbitrary Values عندما يوجد Token مناسب، ووفّر Utility مثل `cn()`.

```typescript
// utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

عند دمج Tailwind مع CSS Variables، لا تلفّ متغيراً يحتوي أصلاً على `hsl(...)` داخل `hsl(var(...))`. إما استخدم Token مباشرة وفق إمكانات إصدار Tailwind المستهدف، أو خزّن قنوات HSL الخام في Tokens منفصلة إذا كان دعم `<alpha-value>` مطلوباً.

مثال مبسّط — **إجباري**: يُحظر ترك اللوحة اللونية الافتراضية لـ Tailwind (`blue`, `red`, `gray`, ...) متاحة للاستخدام العشوائي في المكونات؛ الأسماء الدلالية أدناه هي الواجهة الوحيدة المعتمدة:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        primary: 'var(--color-py)',
        secondary: 'var(--color-sy)',
        accent: 'var(--color-at)',
        muted: 'var(--color-md)',
        ok: 'var(--color-ok)',
        err: 'var(--color-err)',
        war: 'var(--color-war)',
        inf: 'var(--color-inf)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
      },
      borderRadius: {
        sm: 'var(--border-radius-sm)',
        DEFAULT: 'var(--border-radius)',
        lg: 'var(--border-radius-lg)',
        xl: 'var(--border-radius-xl)',
        full: 'var(--border-radius-full)',
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
      },
    },
  },
};
```

إذا كان المشروع يستخدم Tailwind v4 وإعداد `@theme` بدلاً من `tailwind.config.js`، يُطبَّق المبدأ نفسه داخل `@theme` مباشرة، مع إعادة توجيه كل `--color-*` و`--spacing-*` و`--radius-*` إلى Tokens هذا النظام بدلاً من القيم الافتراضية لـ Tailwind.

### Bootstrap

Bootstrap يعتمد على متغيرات CSS خاصة به بصيغة `--bs-*` بالإضافة إلى متغيرات Sass. **يُحظر** استخدام الألوان أو المسافات الافتراضية لـ Bootstrap دون إعادة توجيهها. أعد تعريف متغيرات `--bs-*` الأساسية فوق نطاق `:root` بعد تحميل CSS الخاص بـ Bootstrap مباشرة:

```css
/* بعد تحميل bootstrap.css مباشرة */
:root {
  --bs-primary: var(--color-py);
  --bs-primary-rgb: var(--color-py); /* استبدل بقناة RGB مكافئة فقط إذا كانت مكتبة/إصدار Bootstrap تتطلب صيغة RGB حرفياً؛ التزم بـ HSL في بقية النظام */
  --bs-secondary: var(--color-sy);
  --bs-success: var(--color-ok);
  --bs-danger: var(--color-err);
  --bs-warning: var(--color-war);
  --bs-info: var(--color-inf);
  --bs-body-bg: var(--color-bg);
  --bs-body-color: var(--color-bg-f);
  --bs-border-color: var(--color-border);
  --bs-border-radius: var(--border-radius);
  --bs-border-radius-sm: var(--border-radius-sm);
  --bs-border-radius-lg: var(--border-radius-lg);
}

[data-bs-theme="dark"] {
  --bs-body-bg: var(--color-bg);
  --bs-body-color: var(--color-bg-f);
  --bs-border-color: var(--color-border);
}
```

اربط `data-bs-theme` بنفس حالة `data-theme` الخاصة بالنظام بدلاً من تبديل مستقل، وامنع استخدام Class الألوان الجاهزة لـ Bootstrap (`btn-primary` بلوحته الافتراضية غير المعاد تعريفها) كمصدر للهوية البصرية.

### مكتبات UI أخرى (MUI، Ant Design، Chakra، ...)

المبدأ نفسه ينطبق دون استثناء: استخدم طبقة الـ Theming الرسمية للمكتبة (`createTheme` في MUI، `ConfigProvider` في Ant Design، `extendTheme` في Chakra، ...) لإعادة توجيه Palette وSpacing وRadius وTypography الخاصة بالمكتبة إلى قيم مبنية على `var(--color-py)` وبقية Tokens هذا النظام. لا تُستخدم القيم الافتراضية لأي مكتبة كمرجع تصميم نهائي، ويجب أن يمر أي تخصيص إضافي عبر ملف الإعداد المركزي للمكتبة وليس عبر Inline Styles متفرقة داخل المكونات.

---

## إجبار المتصفح على الالتزام بالتصميم (Browser Override & Reset) — إلزامي

المتصفحات (Chrome, Brave, Safari, Edge, Firefox) تتضمّن أنماطاً وسلوكيات افتراضية (User-Agent Stylesheets) وتدخلات أمنية (مثل مدير كلمات المرور والتعبئة التلقائية Autofill) تُشوّه التصميم إن لم تُعطَّل صراحةً: تراكب قوائم كلمات المرور فوق الحقول، تغيّر لون خلفية الحقل عند التعبئة التلقائية، أيقونات وأسهم افتراضية داخل الحقول، وحواف Focus غير متوافقة مع الهوية البصرية. هذا القسم إلزامي في كل مشروع Web، ويُطبَّق أيضاً داخل WebView تطبيقات Desktop (Electron/Tauri) حيثما وُجد.

**ترتيب التحميل إلزامي**: طبّق هذه الطبقات بعد أي CSS من مكتبات خارجية (Tailwind/Bootstrap/غيرها) حتى تكون لها الكلمة الأخيرة دائماً.

### الطبقة 1 — تعطيل قوائم الـ Autofill ومدير كلمات المرور

**HTML**: استخدم قيمة `autocomplete` تمنع المتصفح من اقتراح بيانات محفوظة فوق التصميم بدلاً من الاعتماد على `off` وحدها (بعض المتصفحات الحديثة تتجاهل `off`):

```html
<!-- حقول عادية لا يُراد فيها اقتراح تلقائي -->
<input type="email" name="user_email" autocomplete="off" placeholder="البريد الإلكتروني">

<!-- حقل كلمة مرور جديدة: يمنع اقتراح كلمات مرور محفوظة فوق التصميم -->
<input type="password" name="user_password" autocomplete="new-password" placeholder="كلمة المرور">
```

استخدم `autocomplete="new-password"` فقط لحقول إنشاء/تغيير كلمة المرور. لا تُطفئ Autocomplete في حقول تسجيل الدخول الاعتيادية دون سبب وظيفي، لأن ذلك يضرّ بتجربة مستخدمي مديري كلمات المرور الشرعيين ويُعدّ إساءة استخدام لهذه التقنية إذا طُبّق للتحايل على إرادة المستخدم بدلاً من حماية التصميم فقط.

**CSS**: إلغاء الألوان والأيقونات التي يفرضها المتصفح عند التعبئة التلقائية:

```css
/* منع المتصفح من تغيير لون خلفية الحقل عند Autofill */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  /* استبدل القيمة بلون خلفية الحقل الفعلي من Tokens المشروع */
  box-shadow: 0 0 0 62.5em var(--color-surface) inset !important;
  -webkit-text-fill-color: var(--color-surface-f) !important;
  transition: background-color 5000s ease-in-out 0s;
}

/* إخفاء أيقونات مدير كلمات المرور المدمجة في بعض المتصفحات (Chrome/Edge/Brave) */
input::-webkit-credentials-auto-fill-button,
input::-webkit-contacts-auto-fill-button {
  visibility: hidden !important;
  pointer-events: none !important;
  position: absolute !important;
  inset-inline-end: 0 !important;
}

/* إخفاء أيقونة إظهار كلمة المرور وزر المسح الافتراضيين في Edge */
input::-ms-reveal,
input::-ms-clear {
  display: none !important;
}
```

القيم `var(--color-surface)` و`var(--color-surface-f)` أعلاه أمثلة؛ استبدلها بالـ Token الفعلي لخلفية ونص الحقل في المكوّن المستهدف بحيث تبقى القيمة متوافقة مع Light/Dark تلقائياً، ولا تُثبَّت كقيمة HEX/RGB منفصلة عن نظام الألوان.

### الطبقة 2 — إعادة ضبط جذرية لمظهر المتصفح الافتراضي (Reset & Appearance)

يُطبَّق هذا الكود في أعلى ملف CSS الرئيسي للمشروع (قبل أي مكوّنات، وبعد CSS أي مكتبة خارجية كما ذُكر أعلاه)، لتجريد الحقول والأزرار والقوائم من مظهرها الافتراضي القادم من نظام التشغيل/المتصفح:

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent; /* إزالة الوميض عند اللمس على الهواتف */
}

/* تجريد الحقول والأزرار والقوائم من المظهر الافتراضي للمتصفح/النظام */
input, button, select, textarea {
  font: inherit;
  color: inherit;
  background: transparent;
  border: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

/* إزالة أسهم حقول الأرقام الافتراضية */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

/* إزالة زخارف حقل البحث الافتراضية */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}
```

**تحذير Accessibility إلزامي**: هذا الـ Reset يزيل `outline` الافتراضي بالكامل. يُحظر تركه بلا بديل — طبّق فوراً حلقة Focus مخصّصة متوافقة مع قواعد Accessibility في هذا الملف (راجع قسم Accessibility وقسم Inputs)، باستخدام `:focus-visible` بدلاً من `:focus` كلما أمكن لتفادي إظهار الحلقة عند التفاعل بالماوس فقط:

```css
input:focus-visible,
button:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 0.125em solid var(--color-border-focus);
  outline-offset: 0.125em;
}
```

### الطبقة 3 — خدعة JavaScript للمتصفحات العنيدة (استثناء محدود، ليس افتراضياً)

بعض المتصفحات (خصوصاً Chrome وBrave) قد تتجاهل الطبقتين السابقتين وتفرض قائمة الحفظ/الاقتراح فوق العناصر رغم كل شيء. عندئذٍ فقط، وليس كسلوك افتراضي على كل حقل في المشروع، يمكن استخدام حيلة "Readonly حتى أول تفاعل" على الحقول المتأثرة فعلياً:

```html
<input
  type="password"
  name="user_password"
  readonly
  onfocus="this.removeAttribute('readonly')"
  placeholder="كلمة المرور"
>
```

أو تطبيقها برمجياً على مجموعة حقول محددة (وليس بالضرورة كل الحقول الحساسة في الموقع، تفادياً لأي تعارض مع مديري كلمات مرور شرعيين):

```javascript
document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('[data-force-design="true"]')
    .forEach((input) => {
      input.setAttribute('readonly', 'readonly');
      input.addEventListener('focus', function handler() {
        this.removeAttribute('readonly');
        this.removeEventListener('focus', handler);
      });
    });
});
```

**قيود استخدام الطبقة 3**:
- تُستخدم فقط عند إثبات أن الطبقتين 1 و2 لا تكفيان فعلياً على المتصفح المستهدف، وليس كإجراء وقائي عام.
- لا تُطبَّق افتراضياً على كل حقل بريد/كلمة مرور في المشروع؛ اقتصرها على العناصر التي تُعلَّم صراحةً (مثل `data-force-design`)، لتقليل أثرها الجانبي على تجربة الإدخال وAccessibility.
- تحقق من أن `readonly` لا يمنع قارئات الشاشة أو لوحة المفاتيح من الوصول إلى الحقل قبل أول تفاعل.

### ملخص ترتيب التطبيق

1. CSS أي مكتبة خارجية (Tailwind/Bootstrap/...) مع Overrides الخاصة بها (القسم السابق).
2. الطبقة 2 هنا (Reset + Appearance) فوق كل شيء سابق.
3. الطبقة 1 هنا (Autofill/Autocomplete) لكل حقول البريد/كلمة المرور.
4. الطبقة 3 هنا فقط عند الحاجة الفعلية ولمتصفحات بعينها ثبت تجاهلها للطبقتين 1 و2.

---

## تطبيقات Desktop — Electron / Tauri (اختياري)

طبّق هذا القسم فقط عندما يكون المشروع تطبيق Desktop. القواعد الخاصة بـ Electron لا تُطبّق تلقائياً على Tauri؛ استخدم API المنصة المستهدفة مع الحفاظ على السلوك البصري نفسه.

### Custom Title Bar

الارتفاع المرجعي `2.5em`، الخلفية `--color-bg`، والحد السفلي `0.0625em solid var(--color-border)`.

```css
.titlebar {
  block-size: 2.5em;
  -webkit-app-region: drag;
  user-select: none;
}

.titlebar-controls,
.titlebar-controls *,
.titlebar-btn,
.titlebar-menu,
.titlebar-icon {
  -webkit-app-region: no-drag;
}
```

كل عنصر تفاعلي داخل منطقة السحب يجب أن يكون `no-drag`. الحد الأدنى المرجعي لأزرار التحكم `2em × 2em`، مع مراعاة Touch/Pointer target أكبر إذا كان نمط الاستخدام يتطلب ذلك.

حالة Hover لزر الإغلاق:

- Light: `hsl(0 80% 45%)`.
- Dark: `hsl(0 80% 35%)`.

### سلوك النافذة

في Electron، يدعم Custom Title Bar إجراءات Minimize وMaximize وRestore وClose عبر IPC أو API آمنة من Renderer. Double Click على المنطقة القابلة للسحب يبدّل Maximize/Restore، ويمكن توفير System Menu بالنقر الثانوي.

لا تفترض أن Snap أو Native Resize أو Shadow يعمل بالطريقة نفسها على جميع أنظمة التشغيل أو إصدارات Electron/Tauri؛ اختبر السلوك على المنصات المستهدفة.

### DPI

عند الحاجة في Electron/Windows:

```typescript
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', '1');
  app.commandLine.appendSwitch('force-device-scale-factor', '1');
}
```

استخدم هذه الإعدادات فقط إذا كانت متوافقة مع إصدارات Runtime والمنصات التي يستهدفها المشروع.

### حفظ واستعادة حجم النافذة

احفظ Bounds وحالة Maximize عند الإغلاق، وأعد استخدامها عند التشغيل التالي. تحقق قبل الاستعادة من أن الإحداثيات ما زالت تقع على شاشة متاحة، خصوصاً بعد تغيير عدد الشاشات أو دقتها.

```typescript
mainWindow.on('close', () => {
  const bounds = mainWindow.getBounds();
  const isMaximized = mainWindow.isMaximized();

  settings.set('window_width', String(bounds.width));
  settings.set('window_height', String(bounds.height));
  settings.set('window_x', String(bounds.x));
  settings.set('window_y', String(bounds.y));
  settings.set('window_maximized', isMaximized ? '1' : '0');
});
```

### توافق Windows

لا تفترض دعم Windows 7/8 أو أي إصدار قديم اعتماداً على قواعد التصميم وحدها. دعم أنظمة التشغيل يتحدد حسب إصدار Electron/Tauri/WebView/runtime والمكتبات المستخدمة في المشروع، ويجب التحقق منه من وثائق الإصدارات المستهدفة قبل إعلان التوافق.

---

## متغيّرات CSS (مثال تطبيقي)

```css
:root,
[data-theme="light"] {
  /* Base */
  --color-bg: hsl(40 0% 94%);
  --color-bg-f: hsl(40 0% 4%);

  /* Brand */
  --color-py: hsl(40 80% 60%);
  --color-py-f: hsl(40 94% 4%);
  --color-sy: hsl(340 80% 60%);
  --color-sy-f: hsl(40 0% 4%);
  --color-at: hsl(200 80% 60%);
  --color-at-f: hsl(200 80% 4%);
  --color-md: hsl(40 15% 60%);
  --color-md-f: hsl(40 15% 4%);

  /* Status */
  --color-ok: hsl(150 80% 60%);
  --color-ok-f: hsl(40 0% 4%);
  --color-err: hsl(0 80% 60%);
  --color-err-f: hsl(40 0% 4%);
  --color-war: hsl(50 80% 60%);
  --color-war-f: hsl(40 0% 4%);
  --color-inf: hsl(200 80% 60%);
  --color-inf-f: hsl(40 0% 4%);

  /* Surfaces */
  --color-surface: hsl(40 0% 100%);
  --color-surface-f: hsl(40 0% 4%);
  --color-surface-alt: hsl(40 0% 97%);
  --color-border: hsl(40 0% 85%);
  --color-border-focus: var(--color-py);

  /* Interactive */
  --color-hover: hsla(40 0% 4% / 0.04);
  --color-active: hsla(40 0% 4% / 0.08);
  --color-overlay: hsla(40 0% 4% / 0.5);

  /* Radius */
  --border-radius-sm: 0.25em;
  --border-radius: 0.5em;
  --border-radius-lg: 0.75em;
  --border-radius-xl: 1em;
  --border-radius-full: 624.9375em;

  /* Spacing */
  --spacing-xs: 0.25em;
  --spacing-sm: 0.5em;
  --spacing-md: 1em;
  --spacing-lg: 1.5em;
  --spacing-xl: 2em;
  --spacing-2xl: 3em;

  /* Typography */
  --font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
  --font-family-ar: "Segoe UI", "Cairo", "Tajawal", sans-serif;
  --font-family-mono: "Cascadia Code", "Fira Code", "Consolas", monospace;

  --font-size-xs: 0.75em;
  --font-size-sm: 0.875em;
  --font-size-md: 1em;
  --font-size-lg: 1.125em;
  --font-size-xl: 1.25em;
  --font-size-2xl: 1.5em;
  --font-size-3xl: 2em;

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Elevation */
  --shadow-sm: 0 0.0625em 0.125em hsla(40 0% 4% / 0.08);
  --shadow-md: 0 0.25em 0.75em hsla(40 0% 4% / 0.1);
  --shadow-lg: 0 0.5em 1.5em hsla(40 0% 4% / 0.1);
  --shadow-xl: 0 1em 2.5em hsla(40 0% 4% / 0.12);

  /* Motion */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;

  /* Layers */
  --z-base: 0;
  --z-above: 10;
  --z-sticky: 100;
  --z-overlay: 200;
  --z-modal: 300;
  --z-toast: 400;
  --z-tooltip: 500;
}

[data-theme="dark"],
.dark {
  --color-bg: hsl(40 0% 4%);
  --color-bg-f: hsl(40 0% 94%);

  --color-py: hsl(40 80% 30%);
  --color-py-f: hsl(40 94% 94%);
  --color-sy: hsl(340 80% 30%);
  --color-sy-f: hsl(40 0% 94%);
  --color-at: hsl(200 80% 30%);
  --color-at-f: hsl(200 80% 94%);
  --color-md: hsl(40 15% 30%);
  --color-md-f: hsl(40 15% 94%);

  --color-ok: hsl(150 80% 30%);
  --color-ok-f: hsl(40 0% 94%);
  --color-err: hsl(0 80% 30%);
  --color-err-f: hsl(40 0% 94%);
  --color-war: hsl(50 80% 30%);
  --color-war-f: hsl(40 0% 94%);
  --color-inf: hsl(200 80% 30%);
  --color-inf-f: hsl(40 0% 94%);

  --color-surface: hsl(40 0% 8%);
  --color-surface-f: hsl(40 0% 94%);
  --color-surface-alt: hsl(40 0% 10%);
  --color-border: hsl(40 0% 20%);

  --color-hover: hsla(40 0% 94% / 0.05);
  --color-active: hsla(40 0% 94% / 0.1);
  --color-overlay: hsla(40 0% 4% / 0.7);

  --shadow-sm: 0 0.0625em 0.125em hsla(40 0% 0% / 0.3);
  --shadow-md: 0 0.25em 0.75em hsla(40 0% 0% / 0.4);
  --shadow-lg: 0 0.5em 1.5em hsla(40 0% 0% / 0.5);
  --shadow-xl: 0 1em 2.5em hsla(40 0% 0% / 0.6);
}
```

---

## قائمة مراجعة قبل الإصدار

تحقق من النقاط التالية قبل أي Release:

- **Design**: جميع الألوان تأتي من CSS Variables وبصيغة HSL/HSLA، Light/Dark يعملان بالكامل، لا توجد قياسات تصميمية بـ `px`، وBrand Tokens مخصصة للمشروع.
- **Responsive**: الواجهة مختبرة عند Breakpoints المستهدفة، Touch Targets تحقق الحد الأدنى، ولا يوجد Overflow أفقي غير مقصود.
- **RTL/LTR**: Logical Properties مستخدمة، خط العربية مطبق، ولا تُعكس إلا الأيقونات الاتجاهية.
- **Accessibility**: Accessible Names صحيحة، الصور تملك `alt`، الحقول مرتبطة بـ Labels، Keyboard Navigation مختبر، Focus مرئي، والتباين يحقق WCAG AA.
- **Motion/Performance**: `prefers-reduced-motion` مطبق، ولا توجد Animations غير ضرورية، واستخدم Skeleton فقط عندما يكون مناسباً لتجربة التحميل.
- **المكتبات الخارجية**: أي Tailwind/Bootstrap/UI Library مستخدمة معاد توجيهها بالكامل إلى Tokens هذا النظام، ولا توجد ألوان أو مسافات جاهزة من لوحة المكتبة الافتراضية مستخدمة مباشرة في المكونات.
- **إجبار المتصفح**: طبقات الـ Reset وتعطيل Autofill مطبقة وبالترتيب الصحيح (بعد CSS المكتبات الخارجية)، خدعة الـ Readonly (الطبقة 3) غير مفعّلة إلا عند إثبات حاجة فعلية، وحلقة Focus البديلة موجودة فعلياً بعد إزالة `outline` الافتراضي.
- **Desktop عند التطبيق**: Title Bar وWindow Controls وResize/Maximize/Restore مختبرة، Bounds تُحفظ وتُستعاد بأمان، وDPI وسلوك المنصة مختبران على الأنظمة المستهدفة.

---

## القواعد الذهبية (Do's and Don'ts)

1. **افعل** اجعل CSS Variables المصدر المركزي للـ Design Tokens.
2. **افعل** خصص ألوان Brand لكل مشروع بدلاً من اعتبار الألوان الافتراضية هوية ثابتة.
3. **لا تفعل** تستخدم HEX أو RGB/RGBA أو Color Names؛ استخدم HSL/HSLA حصراً.
4. **لا تفعل** تستخدم `px` للقياسات التصميمية؛ استخدم `em` أو `rem`.
5. **افعل** استخدم Logical Properties بدلاً من `left/right` لدعم RTL/LTR تلقائياً.
6. **افعل** اختبر Light وDark فعلياً، ولا تفترض أن تبديل قيم الألوان وحده يضمن التباين.
7. **لا تفعل** تخفِ Focus Ring دون بديل مرئي.
8. **افعل** استخدم HTML الدلالي أولاً ثم ARIA عند الحاجة؛ لا تضف ARIA زائدة إلى عناصر أصلية تؤدي الوظيفة بالفعل.
9. **لا تفعل** تعتمد على اللون وحده لنقل Error أو Success أو Warning.
10. **افعل** حافظ على Touch Targets بحجم مناسب واختبر الواجهة عبر أحجام الشاشات الفعلية.
11. **لا تفعل** تضف Animations زخرفية طويلة؛ اجعل الحركة قصيرة ووظيفية واحترم `prefers-reduced-motion`.
12. **افعل** استخدم Z-Index Tokens بدلاً من قيم عشوائية متزايدة.
13. **افعل** اختر ARIA Pattern الصحيح لـ Dialog وDropdown وSelect وMenu بدلاً من استخدام الأدوار بصورة تبادلية.
14. **لا تفعل** تطبق قواعد Electron أو Tauri على مشاريع Web، ولا تفترض أن APIs الخاصة بإحداهما صالحة للأخرى.
15. **افعل** تحقق من توافق Runtime الفعلي قبل إعلان دعم إصدار معين من Windows أو أي نظام تشغيل.
16. **لا تفعل** تستخدم قيمة ثابتة عندما يوجد Design Token يؤدي المعنى نفسه، إلا إذا كانت القيمة خاصة فعلاً بسلوك المكوّن ولا تستحق Token مستقلاً.
17. **افعل** أعِد توجيه أي مكتبة UI خارجية (Tailwind، Bootstrap، MUI، ...) لتستهلك Tokens هذا النظام عبر طبقة الـ Theming الرسمية لها.
18. **لا تفعل** تستخدم لوحة الألوان أو مقاييس المسافات الافتراضية لأي مكتبة خارجية مباشرة في المكونات (مثل `blue-500` أو `--bs-primary` غير المعاد تعريفه).
19. **افعل** طبّق طبقات إجبار المتصفح (Reset + Autofill Override) في كل مشروع Web، وحمّلها بعد CSS أي مكتبة خارجية.
20. **لا تفعل** تُزيل `outline` الافتراضي دون توفير حلقة Focus بديلة مبنية على Tokens النظام فوراً في الكود نفسه.
21. **لا تفعل** تُفعّل خدعة الـ Readonly/JS (الطبقة 3 لإجبار المتصفح) كسلوك افتراضي على كل الحقول؛ اقتصرها على الحالات المُثبَتة فعلياً.