/**
 * @file        : src/app/layouts/PublicLayout.tsx
 * @description : غلاف الصفحات العامة مع رأس التطبيق والحاوية الموحدة.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إضافة غلاف الصفحات العامة" },
 *   { "date": "2026-10-08", "version": "0.2.0", "by": ["BomBa"], "comment": "إزالة خلفية bg-bg لشفافية الغلاف أمام طبقة الخلفية الزخرفية" }
 * ]
 */

import { AppHeader, Div as Div1, Main, Outlet, PageContainer } from '@a'

/** @description يحدد التركيب المشترك للصفحات التي لا تحتاج جلسة مستخدم. */
export function PublicLayout() {
  return (
    <Div1 className="flex min-h-0 flex-1 flex-col text-tt">
      <AppHeader />
      <Main className="flex-1">
        <PageContainer>
          <Outlet />
        </PageContainer>
      </Main>
    </Div1>
  )
}
