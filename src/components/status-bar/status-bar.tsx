/**
 * @file        : src/components/status-bar/status-bar.tsx
 * @description : شريط حالة النظام المتجاوب يعرض نبض الحالة والمعلومات والوقت وأدوات التبديل.
 * @updated     : [
 *   { "date": "2026-09-28", "version": "1.1.0", "by": ["BomBa"], "comment": "ضبط كلاسات Tailwind وإزالة الكلاسات غير المعرفة وربط ملف التصميم" },
 *   { "date": "2026-09-29", "version": "1.3.0", "by": ["BomBa"], "comment": "إنشاء مكونات مغلفة ذكية لـ BPopover و BDrawer لتسهيل الاستخدام وتقليل التكرار" },
 *   { "date": "2026-09-30", "version": "1.4.0", "by": ["BomBa"], "comment": "إضافة نظام Backdrop قابل للتحكم الكامل مع خلفية زجاجية شفافة" },
 *   { "date": "2026-10-08", "version": "1.5.0", "by": ["BomBa"], "comment": "إضافة حقلَي إظهار الخلفية الزخرفية وحركتها في درج الإعدادات" }
 * ]
 */

import {
  BDrawer,
  BPopover,
  BTooltip,
  Button,
  cn,
  Div as Div1,
  Footer,
  IconBell,
  IconSettings,
  Input,
  Label,
  Logo,
  Option,
  P,
  Select,
  Span,
  Strong,
  ToggleLanguage,
  ToggleTheme,
  useBackground,
  useLanguage,
  useLiveClock,
  useState,
  useSystemStatus,
  useTimeFormat,
  useTranslation,
  type I_StatusBar,
  type T_BackgroundMotion
} from '@a';
import styles from './status-bar.module.css';

// ==========================================
// 000. المكون الرئيسي (StatusBar)
// ==========================================
export function StatusBar({
  className = null,
  version = 'v1.0.0',
  brand = 'SPA Frontend',
  environment = 'PROD',
  tone: toneProp,
  label: labelProp,
  tagline: taglineProp,
}: I_StatusBar) {
  const { t } = useTranslation('common')
  const tagline = taglineProp ?? t('statusBar.tagline')
  const systemStatus = useSystemStatus()
  const tone = toneProp ?? systemStatus.tone
  const label = labelProp ?? t(`statusBar.status.${systemStatus.isChecking ? 'checking' : tone}`)
  const [isNotificationsOpen, setNotificationsOpen] = useState(false)
  const [isSettingsOpen, setSettingsOpen] = useState(false)

  return (
    <Footer className={cn('B:glass', styles.statusBar, className)} role="contentinfo" aria-label={t('statusBar.label')}>
      <Div1 className={`${styles.zone} ${styles.start}`}>
        <Span
          className={`B:glass ${styles.onlineBadge}`}
          tabIndex={0}
          aria-live="polite"
          title={`${label}: ${tone === 'error' ? t('errors.generic') : t('statusBar.online')}`}
        >
          <Span className={`${styles.pulse} ${styles[tone === 'ready' ? 'pulseReady' : tone === 'busy' ? 'pulseBusy' : 'pulseError']}`} aria-hidden="true" />
          {label}
        </Span>
        <Span className={styles.version}>{version}</Span>
        <Span className={styles.environment}>{environment}</Span>
      </Div1>

      <Div1 className={`${styles.zone} ${styles.center}`}>
        <Logo showName tagline={tagline} />
        <Span className={styles.brand}>{brand}</Span>
      </Div1>

      <Div1 className={`${styles.zone} ${styles.end}`}>
        <NotificationsPopover
          open={isNotificationsOpen}
          onOpenChange={(open) => { setNotificationsOpen(open); if (open) setSettingsOpen(false) }}
        />

        <SettingsDrawer
          open={isSettingsOpen}
          onOpenChange={(open) => { setSettingsOpen(open); if (open) setNotificationsOpen(false) }}
        />

        <ToggleLanguage className={cn('B:glass:hover flex! flex-row iconButton')} />
        <ToggleTheme className={cn('B:glass:hover iconButton')} />

        <StatusClock />
      </Div1>
    </Footer>
  )
}

// #region { Sub Components }

// ==========================================
// 1. مكون الإشعارات (Notifications) باستخدام BPopover
// ==========================================
function NotificationsPopover({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { t } = useTranslation('common')

  return (
    <BPopover
      open={open}
      onOpenChange={onOpenChange}
      className={'popover'}
      backdrop="close" // النقر على الخلفية يغلق النافذة
      trigger={
        <Button type="button" className={cn('B:glass:hover iconButton')} aria-label={t('statusBar.notifications')}>
          <IconBell aria-hidden="true" />
          <Span className={styles.notificationDot} aria-hidden="true" />
        </Button>
      }
    >
      <Strong>{t('statusBar.notifications')}</Strong>
      <Span>{t('statusBar.noNotifications')}</Span>
    </BPopover>
  )
}

// ==========================================
// 2. مكون الإعدادات (Settings) باستخدام BDrawer
// ==========================================
function SettingsDrawer({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { t } = useTranslation('common')
  const { timeFormat, setTimeFormat, timeZone, setTimeZone } = useTimeFormat()
  const { showBackground, setShowBackground, backgroundMotion, setBackgroundMotion } = useBackground()

  return (
    <BDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={t('controls.settings')}
      description={t('statusBar.settingsHint')}
      backdrop="close" // يمكن تغييرها إلى 'locked' لجعل الإغلاق فقط من زر X
      trigger={
        <Button type="button" className={cn('B:glass:hover iconButton')} aria-label={t('controls.settings')}>
          <IconSettings aria-hidden="true" />
        </Button>
      }
    >
      <Label className={'settingField'}>
        <Span>{t('statusBar.timeFormat')}</Span>
        <Select value={timeFormat} onChange={(event) => setTimeFormat(event.target.value as '12' | '24')}>
          <Option value="12">12h</Option>
          <Option value="24">24h</Option>
        </Select>
      </Label>
      <Label className={'settingField'}>
        <Span>{t('statusBar.timeZone')}</Span>
        <Select value={timeZone} onChange={(event) => setTimeZone(event.target.value as typeof timeZone)}>
          <Option value="Africa/Cairo">{t('statusBar.timeZones.cairo')}</Option>
          <Option value="Asia/Riyadh">{t('statusBar.timeZones.riyadh')}</Option>
          <Option value="Europe/London">{t('statusBar.timeZones.london')}</Option>
          <Option value="America/New_York">{t('statusBar.timeZones.newYork')}</Option>
        </Select>
      </Label>
      <Label className={'settingField'}>
        <Span>{t('background.show')}</Span>
        <Input
          type="checkbox"
          checked={showBackground}
          onChange={(event) => setShowBackground(event.target.checked)}
        />
      </Label>
      <Label className={'settingField'}>
        <Span>{t('background.motion')}</Span>
        <Select value={backgroundMotion} onChange={(event) => setBackgroundMotion(event.target.value as T_BackgroundMotion)}>
          <Option value="off">{t('background.motionOptions.off')}</Option>
          <Option value="calm">{t('background.motionOptions.calm')}</Option>
          <Option value="full">{t('background.motionOptions.full')}</Option>
        </Select>
      </Label>
    </BDrawer>
  )
}

// ==========================================
// 3. مكون الساعة والتلميح الخاص بها (Status Clock)
// ==========================================
function StatusClock() {
  const { language } = useLanguage()
  const { timeFormat, timeZone } = useTimeFormat()
  const { t } = useTranslation('common')
  const clock = useLiveClock(language, timeFormat, timeZone)

  return (
    <BTooltip
      side="top"
      align="end"
      content={
        <>
          <P className="tooltip-row">
            <Strong>{t('common.cairo_24h')}</Strong> {clock.cairo24h}
          </P>
          <P className="tooltip-row">{clock.gregorian}</P>
          <P className="tooltip-row">{clock.hijri}</P>
        </>
      }
    >
      <Span className={cn('B:glass flex! flex-row iconButton', styles.clock)} tabIndex={0}>
        {clock.display}
      </Span>
    </BTooltip>
  )
}

// #endregion 
