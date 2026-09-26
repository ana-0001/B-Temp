/**
 * @file        : src/services/http/axiosClient.ts
 * @description : عميل Axios مركزي بدون معرفة مباشرة بمصدر التوكن أو الحالة.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "إنشاء طبقة HTTP النقية" }
 * ]
 */

import axios, { AxiosError, CanceledError, type AxiosInstance } from 'axios'

export interface I_HTTPClientOptions {
  baseURL: string
  getToken?: () => string | undefined
}

export interface I_HTTPError {
  status: number | undefined
  code: string
  message: string
  details: unknown
  cancelled: boolean
}

const normalizeHTTPError = (error: unknown): I_HTTPError => {
  if (error instanceof CanceledError || axios.isCancel(error)) {
    return {
      status: undefined,
      code: 'REQUEST_CANCELLED',
      message: 'The request was cancelled.',
      details: undefined,
      cancelled: true,
    }
  }

  if (error instanceof AxiosError) {
    const responseData = error.response?.data as
      | { message?: string; error?: { code?: string; details?: unknown } }
      | undefined

    return {
      status: error.response?.status,
      code: responseData?.error?.code ?? error.code ?? 'HTTP_ERROR',
      message: responseData?.message ?? error.message,
      details: responseData?.error?.details,
      cancelled: false,
    }
  }

  return {
    status: undefined,
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred.',
    details: undefined,
    cancelled: false,
  }
}

export const createHTTPClient = ({ baseURL, getToken }: I_HTTPClientOptions): AxiosInstance => {
  const client = axios.create({ baseURL, timeout: 10000 })

  client.interceptors.request.use((config) => {
    const token = getToken?.()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(normalizeHTTPError(error)),
  )

  return client
}
