/**
 * @file        : src/components/status-bar/use-system-status.ts
 * @description : Hook مستقل لمراقبة صحة النظام مع إلغاء الطلب وإعادة المحاولة.
 * @updated     : [{ "date": "2026-09-28", "version": "1.0.0", "by": ["BomBa"], "comment": "إضافة مراقبة صحة النظام" }]
 */

import { ENV } from '@/config/env'
import { useCallback, useEffect, useState } from '@a'
import type { T_StatusTone } from './types'

interface I_SystemStatus {
  tone: T_StatusTone
  isChecking: boolean
}

/** @description بيعمل health check دوري ويحوّل النتيجة لحالة عرض موحدة للشريط. */
export function useSystemStatus(): I_SystemStatus {
  const [status, setStatus] = useState<I_SystemStatus>({ tone: 'busy', isChecking: true })

  const checkHealth = useCallback(async (signal: AbortSignal): Promise<void> => {
    setStatus((current) => ({ ...current, isChecking: true }))
    try {
      const response = await fetch(`${ENV.VITE_API_BASE_URL}/health`, { signal, headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error(`Health check failed with status ${response.status}`)
      setStatus({ tone: 'ready', isChecking: false })
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setStatus({ tone: 'error', isChecking: false })
    }
  }, [])

  useEffect(() => {
    let activeController: AbortController | undefined
    const runCheck = () => {
      activeController?.abort()
      activeController = new AbortController()
      void checkHealth(activeController.signal)
    }
    runCheck()
    const intervalId = window.setInterval(runCheck, 30_000)
    return () => {
      activeController?.abort()
      window.clearInterval(intervalId)
    }
  }, [checkHealth])

  return status
}
