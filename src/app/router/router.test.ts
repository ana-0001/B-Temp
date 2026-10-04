/**
 * @file        : src/app/router/router.test.ts
 * @description : اختبارات أساسية لشجرة الراوتر وسلوك اللغة وحالات 404 والخطأ.
 * @updated     : [{ "date": "2026-09-29", "version": "1.0.0", "by": ["BomBa"], "comment": "إضافة اختبارات الراوتر الأساسية" }]
 */

import { createMemoryHistory, createRouter } from '@/alias/core'
import { rootRoute, routeTree } from './router'
import { describe, expect, it } from 'vitest'
import { ROUTE_DEFAULT_LANGUAGE, getLocalizedHomePath, getRouteLanguage, isKnownRoute } from './router.config'

describe('router configuration', () => {
  it('loads the root route without a language prefix', async () => {
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ['/'] }),
    })

    await router.load()

    expect(router.state.location.pathname).toBe('/')
    expect(router.state.matches.length).toBeGreaterThan(0)
  })

  it('uses the language from the path and falls back to the stored/default language', () => {
    expect(getRouteLanguage('/ar')).toBe('ar')
    expect(getRouteLanguage('/en')).toBe('en')
    expect(getRouteLanguage('/', 'ar')).toBe('ar')
    expect(getRouteLanguage('/unknown', ROUTE_DEFAULT_LANGUAGE)).toBe('en')
    expect(getLocalizedHomePath('ar')).toBe('/ar')
  })

  it('keeps unknown paths available for the router 404 boundary', () => {
    expect(isKnownRoute('/')).toBe(true)
    expect(isKnownRoute('/ar')).toBe(true)
    expect(isKnownRoute('/unknown')).toBe(false)
  })

  it('loads an unknown path without redirecting it to a valid screen', async () => {
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ['/does-not-exist'] }),
    })

    await router.load()

    expect(router.state.location.pathname).toBe('/does-not-exist')
    expect(rootRoute.options.notFoundComponent).toBeTypeOf('function')
  })

  it('registers an error boundary on the root route', () => {
    expect(rootRoute.options.errorComponent).toBeTypeOf('function')
    expect(rootRoute.options.notFoundComponent).toBeTypeOf('function')
  })
})
