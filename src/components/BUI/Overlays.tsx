/**
 * @file        : src/components/BUI/Overlays.tsx
 * @description : مكونات Popover وDrawer المعزولة عن مكتبة التنفيذ الخارجية.
 * @updated     : [{ "date": "2026-09-28", "version": "1.0.0", "by": ["BomBa"], "comment": "إضافة طبقة overlays قابلة للاستبدال" }]
 */

import { RadixDialog, RadixPopover, React, cn } from '@a'

const PopoverRoot = RadixPopover.Root
const PopoverTrigger = RadixPopover.Trigger
const PopoverAnchor = RadixPopover.Anchor
const PopoverClose = RadixPopover.Close

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  React.ComponentPropsWithoutRef<typeof RadixPopover.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <RadixPopover.Portal>
    <RadixPopover.Content ref={ref} sideOffset={sideOffset} className={cn('bui-popover-content', className)} {...props} />
  </RadixPopover.Portal>
))
PopoverContent.displayName = RadixPopover.Content.displayName

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Anchor: PopoverAnchor,
  Close: PopoverClose,
  Content: PopoverContent,
}

const DrawerRoot = RadixDialog.Root
const DrawerTrigger = RadixDialog.Trigger
const DrawerClose = RadixDialog.Close
const DrawerTitle = RadixDialog.Title
const DrawerDescription = RadixDialog.Description

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(({ className, ...props }, ref) => <RadixDialog.Overlay ref={ref} className={cn('bui-drawer-overlay', className)} {...props} />)
DrawerOverlay.displayName = RadixDialog.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content>
>(({ className, children, ...props }, ref) => (
  <RadixDialog.Portal>
    <DrawerOverlay />
    <RadixDialog.Content ref={ref} className={cn('bui-drawer-content', className)} {...props}>{children}</RadixDialog.Content>
  </RadixDialog.Portal>
))
DrawerContent.displayName = RadixDialog.Content.displayName

export const Drawer = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Close: DrawerClose,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Content: DrawerContent,
}
