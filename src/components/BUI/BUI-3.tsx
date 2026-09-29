/**
 * @file        : src/components/BUI-3.tsx
 * @description : مكونات واجهة قابلة لإعادة الاستخدام مبنية فوق أغلفة BUI-1.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إنشاء أول دفعة من مكونات BUI-3" }
 * ]
 */

import { Button, cn, Div as Div1, Drawer, Hr, IconX, P, Popover, Tooltip, useTranslation } from "@a";


// ==========================================
// 1. المكون المغلف لـ Tooltip (Reusable Tooltip)
// ==========================================
interface BTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  className?: string
  showArrow?: boolean
}
/**
 * @description مكون تلميح احترافي يختزل شجرة Radix UI المعقدة
 */
export function BTooltip({
  children,
  content,
  side = 'top',
  align = 'center',
  sideOffset = 8,
  className,
  showArrow = true,
}: BTooltipProps) {
  if (!content) return <>{children}</>

  return (
    <Tooltip.Provider delayDuration={250}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={side}
            align={align}
            sideOffset={sideOffset}
            className={cn('B:glass tooltip', className)}
          >
            {showArrow && <Tooltip.Arrow className="B:arrow tooltip-arrow" />}
            {typeof content === 'string' ? <P className="tooltip-row">{content}</P> : content}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}


// ==========================================
// 2.0. مكون الخلفية الزجاجية (Backdrop)
// ==========================================
type BackdropMode = 'close' | 'locked' | 'custom' | false

interface BackdropProps {
  open: boolean
  mode?: BackdropMode
  onClick?: () => void
  onBackdropClick?: () => void
  className?: string
  zIndex?: number
}

/**
 * @description خلفية زجاجية شفافة قابلة للتخصيص الكامل
 * @param mode - 'close': إغلاق عند النقر | 'locked': لا يمكن الإغلاق | 'custom': حدث مخصص | false: بدون خلفية
 */
export function Backdrop({
  open,
  mode = 'close',
  onClick,
  onBackdropClick,
  className,
  zIndex = 40,
}: BackdropProps) {
  if (!open || mode === false) return null

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (mode === 'locked') return
    if (mode === 'custom' && onBackdropClick) {
      onBackdropClick()
      return
    }
    if (mode === 'close' && onClick) {
      onClick()
    }
  }

  return (
    <Div1
      className={cn('backdrop', mode === 'locked' && 'backdropLocked', className)}
      style={{ zIndex }}
      onClick={handleClick}
      aria-hidden="true"
      data-state={open ? 'open' : 'closed'}
      data-mode={mode}
    />
  )
}

// ==========================================
// 2.1. المكون الذكي والمغلف لـ Popover (BPopover)
// ==========================================
interface BPopoverProps {
  trigger: React.ReactNode
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  align?: 'start' | 'center' | 'end'
  className?: string
  showCloseButton?: boolean
  backdrop?: BackdropMode
  onBackdropClick?: () => void
}

export function BPopover({
  trigger,
  children,
  open,
  onOpenChange,
  align = 'end',
  className,
  showCloseButton = true,
  backdrop = false,
  onBackdropClick,
}: BPopoverProps) {
  const { t } = useTranslation('common')

  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      {backdrop !== false && (
        <Popover.Portal>
          <Backdrop
            open={!!open}
            mode={backdrop}
            onClick={() => onOpenChange?.(false)}
            onBackdropClick={onBackdropClick}
          />
        </Popover.Portal>
      )}
      <Popover.Content
        className={cn('B:glass', 'popoverContent', className)}
        align={align}
        onPointerDownOutside={(e) => {
          if (backdrop === 'locked') e.preventDefault()
        }}
        onEscapeKeyDown={(e) => {
          if (backdrop === 'locked') e.preventDefault()
        }}
      >
        {showCloseButton && (
          <Popover.Close asChild>
            <Button
              type="button"
              className={cn('B:glass:hover', 'iconButton', 'closeButton')}
              aria-label={t('statusBar.close')}
            >
              <IconX aria-hidden="true" />
            </Button>
          </Popover.Close>
        )}
        {children}
      </Popover.Content>
    </Popover.Root>
  )
}

// ==========================================
// 2.2. المكون الذكي والمغلف لـ Drawer (BDrawer)
// ==========================================
interface BDrawerProps {
  trigger: React.ReactNode
  children: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  showCloseButton?: boolean
  backdrop?: BackdropMode
  onBackdropClick?: () => void
}

export function BDrawer({
  trigger,
  children,
  title,
  description,
  open,
  onOpenChange,
  className,
  showCloseButton = true,
  backdrop = 'close',
  onBackdropClick,
}: BDrawerProps) {
  const { t } = useTranslation('common')

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      {backdrop !== false && (
        <Drawer.Portal>
          <Backdrop
            open={!!open}
            mode={backdrop}
            onClick={() => onOpenChange?.(false)}
            onBackdropClick={onBackdropClick}
          />
        </Drawer.Portal>
      )}
      <Drawer.Content
        className={cn('B:glass drawer drawerContent', className)}
        onPointerDownOutside={(e) => {
          if (backdrop === 'locked') e.preventDefault()
        }}
        onEscapeKeyDown={(e) => {
          if (backdrop === 'locked') e.preventDefault()
        }}
      >
        {title && <Drawer.Title className={'drawerTitle'}>{title}</Drawer.Title>}
        {description && <Drawer.Description className={'drawerDescription'}>{description}</Drawer.Description>}
        <Hr className={'w-[95%]! mx-auto! -mt-2! mb-0.5!'} />
        {showCloseButton && (
          <Drawer.Close asChild>
            <Button type="button" className={'B:glass:hover iconButton closeButton'} aria-label={t('statusBar.close')}>
              <IconX aria-hidden="true" />
            </Button>
          </Drawer.Close>
        )}
        {children}
      </Drawer.Content>
    </Drawer.Root>
  )
}
