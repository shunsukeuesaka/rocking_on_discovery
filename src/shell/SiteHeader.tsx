import { useState } from 'react'
import type { Nav } from '../types'
import { findScreen } from '../data/mwData'

// Public site header + mobile drawer + bottom tab bar.
// Ported from design_handoff_full/app_shell.jsx (SiteHeader / MobileDrawer / MobileTabBar).

const Mag = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.5" y2="16.5" />
  </svg>
)
const Star = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <polygon points="12 2.5 15 9 22 9.5 16.5 14 18.3 21 12 17.2 5.7 21 7.5 14 2 9.5 9 9" />
  </svg>
)

function MobileDrawer({ onNav, onClose }: { onNav: Nav; onClose: () => void }) {
  const go = (id: string) => {
    onClose()
    onNav(id)
  }
  const Soc = ({ d }: { d: React.ReactNode }) => (
    <span className="dp-soc">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        {d}
      </svg>
    </span>
  )
  return (
    <div className="dp-drawer">
      <div className="dp-drawer-top">
        <div className="dp-logo" onClick={() => go('SCR-001')}>
          <span className="mark">Discovery</span>
          <span className="by">presented by rockin'on</span>
        </div>
        <button className="dp-drawer-close" aria-label="閉じる" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>
      </div>
      <nav className="dp-drawer-nav">
        <a onClick={() => go('SCR-002')}>求人を探す</a>
        <a onClick={() => go('SCR-009')}>企業を探す</a>
        <a onClick={() => go('SCR-014')}>お知らせ</a>
        <a className="gap" onClick={() => go('SCR-002')}>検索する</a>
        <a onClick={() => go('SCR-008')}>お気に入り</a>
      </nav>
      <div className="dp-drawer-auth">
        <button className="dp-btn ghost" onClick={() => go('SCR-007')}>ログイン</button>
        <button className="dp-btn solid" onClick={() => go('SCR-006')}>新規登録</button>
      </div>
      <div className="dp-drawer-links">
        <a onClick={() => go('SCR-015')}>利用規約</a>
        <a onClick={() => go('SCR-015')}>プライバシーポリシー</a>
        <a onClick={() => go('SCR-015')}>運営会社</a>
        <a onClick={() => go('SCR-015')}>お問い合わせ</a>
      </div>
      <div className="dp-drawer-soc">
        <div className="label">FOLLOW US</div>
        <div className="icons">
          <Soc d={<path d="M18.9 2H22l-7 8 8.2 12h-6.5l-5-7.3L4.8 22H1.7l7.5-8.6L1 2h6.7l4.6 6.7L18.9 2zm-1.1 18h1.8L7.2 3.9H5.3L17.8 20z" />} />
          <Soc d={<path d="M12 2.2c3.2 0 3.6 0 4.9.07 3.3.15 4.8 1.7 5 5 .06 1.3.07 1.6.07 4.8s0 3.5-.07 4.8c-.15 3.3-1.7 4.8-5 5-1.3.06-1.6.07-4.9.07s-3.6 0-4.9-.07c-3.3-.15-4.8-1.7-5-5C2.05 15.5 2 15.2 2 12s0-3.5.07-4.8c.15-3.3 1.7-4.8 5-5C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1018.6 12 6.6 6.6 0 0012 5.4zm0 10.9A4.3 4.3 0 1116.3 12 4.3 4.3 0 0112 16.3zm6.8-11.2a1.55 1.55 0 11-1.55-1.55A1.55 1.55 0 0118.8 5.1z" />} />
          <Soc d={<path d="M23 7.5a3 3 0 00-2.1-2.1C19 4.8 12 4.8 12 4.8s-7 0-8.9.6A3 3 0 001 7.5 31 31 0 00.5 12 31 31 0 001 16.5a3 3 0 002.1 2.1c1.9.6 8.9.6 8.9.6s7 0 8.9-.6a3 3 0 002.1-2.1A31 31 0 0023.5 12 31 31 0 0023 7.5zM9.8 15.3V8.7l5.7 3.3z" />} />
        </div>
      </div>
    </div>
  )
}

export function MobileTabBar({ onNav, current }: { onNav: Nav; current: string }) {
  const Item = ({
    id,
    label,
    active,
    children,
  }: {
    id: string
    label: string
    active: boolean
    children: React.ReactNode
  }) => (
    <button className={'dp-tab' + (active ? ' active' : '')} onClick={() => onNav(id)}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        {children}
      </svg>
      <span>{label}</span>
    </button>
  )
  return (
    <nav className="dp-tabbar">
      <Item id="SCR-001" label="ホーム" active={current === 'SCR-001'}>
        <path d="M3 11l9-7 9 7" />
        <path d="M5 10v10h14V10" />
      </Item>
      <Item id="SCR-002" label="求人を探す" active={current === 'SCR-002'}>
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.5" y2="16.5" />
      </Item>
      <Item id="SCR-008" label="お気に入り" active={false}>
        <polygon points="12 2.5 15 9 22 9.5 16.5 14 18.3 21 12 17.2 5.7 21 7.5 14 2 9.5 9 9" />
      </Item>
      <Item id="SCR-008" label="マイページ" active={current === 'SCR-008'}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
      </Item>
    </nav>
  )
}

export function SiteHeader({ onNav, current }: { onNav: Nav; current: string }) {
  const [drawer, setDrawer] = useState(false)
  const screen = findScreen(current)
  if (!screen || screen.group !== 'public') return null
  return (
    <>
      <header className="dp-header">
        <div className="dp-logo" onClick={() => onNav('SCR-001')}>
          <span className="mark">Discovery</span>
          <span className="by">presented by rockin'on</span>
        </div>
        <nav className="dp-nav">
          <a onClick={() => onNav('SCR-002')}>求人を探す</a>
          <a onClick={() => onNav('SCR-009')}>企業を探す</a>
          <a onClick={() => onNav('SCR-014')}>お知らせ</a>
        </nav>
        <div className="dp-actions">
          <button className="dp-iconlink" onClick={() => onNav('SCR-002')}>
            <Mag />
            <span>検索する</span>
          </button>
          <button className="dp-iconlink" onClick={() => onNav('SCR-008')}>
            <Star />
            <span>お気に入り</span>
          </button>
          <button className="dp-btn ghost" onClick={() => onNav('SCR-007')}>ログイン</button>
          <button className="dp-btn solid" onClick={() => onNav('SCR-006')}>新規登録</button>
        </div>
        <div className="dp-mobtoggle">
          <button className="dp-mobicon" aria-label="検索" onClick={() => onNav('SCR-002')}>
            <Mag />
          </button>
          <button className="dp-mobicon" aria-label="メニュー" onClick={() => setDrawer(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
      </header>
      {drawer && <MobileDrawer onNav={onNav} onClose={() => setDrawer(false)} />}
    </>
  )
}
