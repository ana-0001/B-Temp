/**
 * @file        : src/components/status-bar/status-bar.tsx
 * @description : شريط حالة النظام المتجاوب يعرض نبض الحالة والمعلومات والوقت وأدوات التبديل.
 * @updated     : [
 *   { "date": "2026-09-28", "version": "1.1.0", "by": ["BomBa"], "comment": "ضبط كلاسات Tailwind وإزالة الكلاسات غير المعرفة وربط ملف التصميم" }
 * ]
 */

import {
  Div as Div1,
  Drawer,
  Footer,
  IconBell,
  IconSettings,
  IconX,
  Logo,
  Popover,
  Select,
  type I_StatusBar,
  Span,
  ToggleLanguage,
  ToggleTheme,
  useLanguage,
  useLiveClock,
  useSystemStatus,
  useTimeFormat,
  useState,
  useTranslation,
} from '@a'
import './status-bar.css'

/**
 * @description شريط حالة النظام الموحد في أسفل الصفحة
 * @param {I_StatusBar} props - خصائص شريط الحالة
 * @returns {JSX.Element} عنصر شريط الحالة
 */
export function StatusBar({
  version = 'v1.0.0',
  brand = 'SPA Frontend',
  environment = 'PROD',
  tone: toneProp,
  label: labelProp,
  tagline: taglineProp,
}: I_StatusBar) {
  const { language } = useLanguage()
  const { timeFormat, setTimeFormat, timeZone, setTimeZone } = useTimeFormat()
  const { t } = useTranslation('common')
  const tagline = taglineProp ?? t('statusBar.tagline')
  const systemStatus = useSystemStatus()
  const tone = toneProp ?? systemStatus.tone
  const label = labelProp ?? t(`statusBar.status.${systemStatus.isChecking ? 'checking' : tone}`)
  const [isNotificationsOpen, setNotificationsOpen] = useState(false)
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const clock = useLiveClock(language, timeFormat, timeZone)

  return (
    <Footer className="status-bar" role="contentinfo" aria-label={t('statusBar.label')}>
      <Div1 className="status-bar-zone status-bar-start">
        <Span
          className="online-badge"
          tabIndex={0}
          aria-live="polite"
          title={`${label}: ${tone === 'error' ? t('errors.generic') : t('statusBar.online')}`}
        >
          <Span className={`status-bar-pulse status-bar-pulse-${tone}`} aria-hidden="true" />
          {label}
        </Span>
        <Span className="status-bar-version">{version}</Span>
        <Span className="status-bar-environment">{environment}</Span>
      </Div1>

      <Div1 className="status-bar-zone status-bar-center">
        <Logo showName tagline={tagline} className="status-bar-logo" />
        <span className="status-bar-brand">{brand}</span>
      </Div1>

      <Div1 className="status-bar-zone status-bar-end">
        <ToggleLanguage />
        <ToggleTheme />
        <Span
          className="status-bar-clock ltr-only"
          tabIndex={0}
          aria-describedby="status-bar-clock-tooltip"
        >
          {clock.display}
          <Span id="status-bar-clock-tooltip" role="tooltip" className="status-bar-tooltip-content">
            <strong>{t('statusBar.cairo24h')}</strong> {clock.cairo24h}
            <span>{clock.gregorian}</span>
            <span>{clock.hijri}</span>
          </Span>
        </Span>
        <Popover.Root open={isNotificationsOpen} onOpenChange={(open) => { setNotificationsOpen(open); if (open) setSettingsOpen(false) }}>
          <Popover.Trigger asChild>
            <button type="button" className="status-bar-icon-button" aria-label={t('statusBar.notifications')}>
              <IconBell aria-hidden="true" />
              <span className="status-bar-notification-dot" aria-hidden="true" />
            </button>
          </Popover.Trigger>
          <Popover.Content className="status-bar-popover" align="end">
            <Popover.Close asChild><button type="button" className="status-bar-popover__close" aria-label={t('statusBar.close')}><IconX aria-hidden="true" /></button></Popover.Close>
            <strong>{t('statusBar.notifications')}</strong>
            <Span>{t('statusBar.noNotifications')}</Span>
          </Popover.Content>
        </Popover.Root>
        <Drawer.Root open={isSettingsOpen} onOpenChange={(open) => { setSettingsOpen(open); if (open) setNotificationsOpen(false) }}>
          <Drawer.Trigger asChild>
            <button type="button" className="status-bar-icon-button" aria-label={t('controls.settings')}>
              <IconSettings aria-hidden="true" />
            </button>
          </Drawer.Trigger>
          <Drawer.Content className="status-bar-drawer">
            <Drawer.Title className="status-bar-drawer__title">{t('controls.settings')}</Drawer.Title>
            <Drawer.Description className="status-bar-drawer__description">{t('statusBar.settingsHint')}</Drawer.Description>
            <Drawer.Close asChild><button type="button" className="status-bar-popover__close" aria-label={t('statusBar.close')}><IconX aria-hidden="true" /></button></Drawer.Close>
            <label className="status-bar-setting-field">
              <Span>{t('statusBar.timeFormat')}</Span>
              <Select value={timeFormat} onChange={(event) => setTimeFormat(event.target.value as '12' | '24')}>
                <option value="12">12h</option>
                <option value="24">24h</option>
              </Select>
            </label>
            <label className="status-bar-setting-field">
              <Span>{t('statusBar.timeZone')}</Span>
              <Select value={timeZone} onChange={(event) => setTimeZone(event.target.value as typeof timeZone)}>
                <option value="Africa/Cairo">{t('statusBar.timeZones.cairo')}</option>
                <option value="Asia/Riyadh">{t('statusBar.timeZones.riyadh')}</option>
                <option value="Europe/London">{t('statusBar.timeZones.london')}</option>
                <option value="America/New_York">{t('statusBar.timeZones.newYork')}</option>
              </Select>
            </label>
          </Drawer.Content>
        </Drawer.Root>
      </Div1>
    </Footer>
  )
}

