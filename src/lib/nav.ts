import type { Nav } from '../types'

/**
 * Default navigation implementation.
 *
 * The design reference drives every transition through `nav(screenId, payload)`
 * (a custom localStorage router). This single page (SCR-002) doesn't ship the
 * rest of the screens, so the default `nav` records intent and emits a DOM
 * CustomEvent (`mw:navigate`) — making it trivial to wire to React Router /
 * Next routing and to attach analytics later without touching call sites.
 */
export const nav: Nav = (screen, payload) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mw:navigate', { detail: { screen, payload } }))
  }
  // eslint-disable-next-line no-console
  console.info('[nav]', screen, payload?.job ? `→ ${payload.job.id} ${payload.job.title}` : '')
}
