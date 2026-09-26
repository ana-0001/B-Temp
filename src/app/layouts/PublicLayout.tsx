/**
 * @file        : src/app/layouts/PublicLayout.tsx
 * @description : غلاف الصفحات العامة مع رأس التطبيق والحاوية الموحدة.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إضافة غلاف الصفحات العامة" }
 * ]
 */

import { Outlet } from '@tanstack/react-router'
import { Div1, Main } from '../../components/BUI-1'
import { AppHeader } from '../../components/layout/Header'
import { PageContainer } from '../../components/layout/PageContainer'

/** @description يحدد التركيب المشترك للصفحات التي لا تحتاج جلسة مستخدم. */
export function PublicLayout() {
  return (
    <Div1 className="min-h-screen bg-bg text-tt">
      <AppHeader />
      <Main>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </Main>
    </Div1>
  )
}
