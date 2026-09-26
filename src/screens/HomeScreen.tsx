/**
 * @file        : src/screens/HomeScreen.tsx
 * @description : الشاشة الرئيسية لعرض جاهزية وتكامل أساس التطبيق وطبقات BUI.
 * @updated     : [
 *   { "date": "2026-09-26T17:33:00+03:00", "version": "1.1.0", "by": ["BomBa"], "comment": "استخدام نظام Alias المركزي واستعراض مكونات BUI" }
 * ]
 */

import {
  Button2,
  Card2,
  Badge2,
  Div1,
  H1,
  P,
  Span,
  useTranslation,
  IconCheck,
  IconHome,
  IconSettings,
} from '@a'

export function HomeScreen() {
  const { t } = useTranslation('common')

  return (
    <Div1 className="flex w-full flex-col gap-6">
      <Div1 className="flex flex-col gap-2">
        <Div1 className="flex items-center gap-2">
          <IconHome className="size-6 text-py" />
          <H1 className="text-2xl font-bold tracking-tight text-te">{t('appName')}</H1>
        </Div1>
        <P className="text-sm text-sn">{t('foundation.message')}</P>
      </Div1>

      <Card2 title={t('foundation.title')}>
        <Div1 className="flex flex-wrap items-center gap-2">
          <Badge2 tone="success" className="flex items-center gap-1">
            <IconCheck className="size-3.5" />
            <Span>Tailwind CSS 4 Active</Span>
          </Badge2>
          <Badge2 tone="success" className="flex items-center gap-1">
            <IconCheck className="size-3.5" />
            <Span>Alias System (@a) Ready</Span>
          </Badge2>
          <Badge2 tone="success" className="flex items-center gap-1">
            <IconCheck className="size-3.5" />
            <Span>Design Tokens Synced</Span>
          </Badge2>
        </Div1>

        <P className="text-sm leading-relaxed text-sn">
          {t('foundation.message')}
        </P>

        <Div1 className="flex flex-wrap items-center gap-3 pt-2">
          <Button2 type="button" variant="primary">
            {t('foundation.action')}
          </Button2>
          <Button2 type="button" variant="secondary" className="flex items-center gap-1.5">
            <IconSettings className="size-4" />
            <Span>Settings</Span>
          </Button2>
        </Div1>
      </Card2>
    </Div1>
  )
}
