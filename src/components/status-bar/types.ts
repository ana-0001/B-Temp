export type T_StatusTone = 'ready' | 'busy' | 'error'

export interface I_StatusBar {
  className?: string | null | undefined
  version?: string
  brand?: string
  environment?: string
  tagline?: string
  tone?: T_StatusTone
  label?: string
}
