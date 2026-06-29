import type { Nav, ScreenId } from '../types'
import { SCREENS, findScreen, type ScreenGroup } from '../data/mwData'

/**
 * Dev navigator — the prototype's screen-picker topbar + "ALL SCREENS" registry
 * menu. Kept because this build is for designer verification (デザイナー検証用):
 * it lets reviewers jump to any of the 34 screens. Ported from app_shell.jsx.
 */
export function NavBar({
  current,
  menuOpen,
  setMenuOpen,
}: {
  current: ScreenId
  menuOpen: boolean
  setMenuOpen: (v: boolean) => void
}) {
  const screen = findScreen(current)
  const group = screen?.group ?? 'public'
  const groupLabel =
    group === 'public' ? 'PUBLIC SITE' : group === 'company' ? 'COMPANY CONSOLE' : 'ADMIN CONSOLE'
  return (
    <div className="topbar">
      <button className="screen-picker" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="sig">■</span>
        <span className="code">{current}</span>
        <span className="name">{screen?.name}</span>
        <span className="caret">▾</span>
      </button>
      <div className="topbar-right">
        <span className="topbar-group">{groupLabel}</span>
        <span className="topbar-sep">/</span>
        <span className="topbar-code">{current}</span>
      </div>
    </div>
  )
}

export function ScreenMenu({
  current,
  onNav,
  onClose,
}: {
  current: ScreenId
  onNav: Nav
  onClose: () => void
}) {
  const groups: Record<ScreenGroup, typeof SCREENS> = { public: [], company: [], admin: [] }
  SCREENS.forEach((s) => groups[s.group].push(s))
  return (
    <div className="menu-overlay" onClick={onClose}>
      <div className="menu-panel" onClick={(e) => e.stopPropagation()}>
        <div className="menu-head">
          <div>
            <div className="eyebrow">Screen Registry</div>
            <h2>ALL SCREENS</h2>
            <div className="menu-sub">Discovery Prototype · {SCREENS.length} screens across 3 areas</div>
          </div>
          <button className="menu-close" onClick={onClose}>✕</button>
        </div>
        {(Object.entries(groups) as [ScreenGroup, typeof SCREENS][]).map(([g, list]) => (
          <div key={g} className="menu-group">
            <div className="menu-group-title">
              <span className="g-tag">{g.toUpperCase()}</span>
              <span className="g-count">{list.length} screens</span>
            </div>
            <div className="menu-grid">
              {list.map((s) => (
                <div
                  key={s.id}
                  className={'menu-card' + (s.id === current ? ' active' : '')}
                  onClick={() => {
                    onNav(s.id)
                    onClose()
                  }}
                >
                  <div className="code">{s.id}</div>
                  <div className="name">{s.name}</div>
                  <div className="purpose">{s.purpose}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
