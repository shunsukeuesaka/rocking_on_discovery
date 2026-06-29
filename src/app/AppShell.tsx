import { useEffect, useState } from 'react'
import type { Nav, ScreenId } from '../types'
import { findScreen } from '../data/mwData'
import { SiteHeader, MobileTabBar } from '../shell/SiteHeader'
import { CompanySidebar, AdminSidebar } from '../shell/ConsoleSidebars'
import { NavBar, ScreenMenu } from '../shell/DevNav'
import { renderScreen, type ScreenCtx } from './registry'

/**
 * App router shell — faithful port of the prototype's state-based router
 * (design_handoff_full/app_shell.jsx → App). Current screen + ctx live in state
 * and persist to localStorage; layout switches by screen group:
 *   - company (except SCR-016 login) → CompanySidebar + console-main
 *   - admin   (except SCR-027 login) → AdminSidebar + console-main
 *   - public / console-login         → SiteHeader + screen + MobileTabBar
 *
 * The dev NavBar + ScreenMenu (screen picker) are retained for designer
 * verification across all 34 screens.
 */
export function AppShell() {
  const [current, setCurrent] = useState<ScreenId>(
    () => localStorage.getItem('mw_current') || 'SCR-001',
  )
  const [ctx, setCtx] = useState<ScreenCtx>({})
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('mw_current', current)
    window.scrollTo({ top: 0 })
  }, [current])

  const nav: Nav = (id, payload = {}) => {
    setCtx(payload)
    setCurrent(id)
  }

  const group = findScreen(current)?.group ?? 'public'

  let content: React.ReactNode
  if (group === 'company' && current !== 'SCR-016') {
    content = (
      <div className="console-layout" data-screen-label={current}>
        <CompanySidebar onNav={nav} current={current} />
        <div className="console-main">{renderScreen(current, nav, ctx)}</div>
      </div>
    )
  } else if (group === 'admin' && current !== 'SCR-027') {
    content = (
      <div className="console-layout" data-screen-label={current}>
        <AdminSidebar onNav={nav} current={current} />
        <div className="console-main">{renderScreen(current, nav, ctx)}</div>
      </div>
    )
  } else {
    content = (
      <div data-screen-label={current}>
        <SiteHeader onNav={nav} current={current} />
        {renderScreen(current, nav, ctx)}
        <MobileTabBar onNav={nav} current={current} />
      </div>
    )
  }

  return (
    <>
      <NavBar current={current} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="viewport">{content}</div>
      {menuOpen && <ScreenMenu current={current} onNav={nav} onClose={() => setMenuOpen(false)} />}
    </>
  )
}
