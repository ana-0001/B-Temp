/**
 * @file        : src/components/BUI/Overlays.tsx
 * @description : مكونات Popover وDrawer المعزولة عن مكتبة التنفيذ الخارجية.
 * @updated     : [{ "date": "2026-09-28", "version": "1.0.0", "by": ["BomBa"], "comment": "إضافة طبقة overlays قابلة للاستبدال" }]
 */

import { RadixDialog, RadixPopover, RadixTooltip, React, cn } from '@a'
import styles from './Overlays.module.css'

const PopoverRoot = RadixPopover.Root
const PopoverTrigger = RadixPopover.Trigger
const PopoverAnchor = RadixPopover.Anchor
const PopoverClose = RadixPopover.Close
const PopoverPortal = RadixPopover.Portal

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  React.ComponentPropsWithoutRef<typeof RadixPopover.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <RadixPopover.Portal>
    <RadixPopover.Content ref={ref} sideOffset={sideOffset} className={cn(styles.popoverContent, className)} {...props} />
  </RadixPopover.Portal>
))
PopoverContent.displayName = RadixPopover.Content.displayName

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Anchor: PopoverAnchor,
  Close: PopoverClose,
  Portal: PopoverPortal,
  Content: PopoverContent,
}

const DrawerRoot = RadixDialog.Root
const DrawerTrigger = RadixDialog.Trigger
const DrawerClose = RadixDialog.Close
const DrawerPortal = RadixDialog.Portal
const DrawerTitle = RadixDialog.Title
const DrawerDescription = RadixDialog.Description

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(({ className, ...props }, ref) => <RadixDialog.Overlay ref={ref} className={cn(styles.drawerOverlay, className)} {...props} />)
DrawerOverlay.displayName = RadixDialog.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content>
>(({ className, children, ...props }, ref) => (
  <RadixDialog.Portal>
    <DrawerOverlay />
    <RadixDialog.Content ref={ref} className={cn(styles.drawerContent, className)} {...props}>{children}</RadixDialog.Content>
  </RadixDialog.Portal>
))
DrawerContent.displayName = RadixDialog.Content.displayName

export const Drawer = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Close: DrawerClose,
  Portal: DrawerPortal,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Content: DrawerContent,
}

const TooltipProvider = RadixTooltip.Provider
const TooltipRoot = RadixTooltip.Root
const TooltipTrigger = RadixTooltip.Trigger
const TooltipPortal = RadixTooltip.Portal
const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof RadixTooltip.Arrow>,
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Arrow>
>(({ className, ...props }, ref) => <RadixTooltip.Arrow ref={ref} className={cn(styles.tooltipArrow, className)} {...props} />)
TooltipArrow.displayName = RadixTooltip.Arrow.displayName

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof RadixTooltip.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <RadixTooltip.Content ref={ref} sideOffset={sideOffset} className={cn(styles.tooltipContent, className)} {...props} />
))
TooltipContent.displayName = RadixTooltip.Content.displayName

export const Tooltip = {
  Provider: TooltipProvider,
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Portal: TooltipPortal,
  Content: TooltipContent,
  Arrow: TooltipArrow,
}
