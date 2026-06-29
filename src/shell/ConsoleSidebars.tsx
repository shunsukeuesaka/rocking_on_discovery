import type { Nav } from '../types'

// Company / Admin console sidebars. Ported from app_shell.jsx.

export function CompanySidebar({ onNav, current }: { onNav: Nav; current: string }) {
  const items = [
    { id: 'SCR-017', label: 'ダッシュボード', icon: '◉' },
    { id: 'SCR-018', label: '求人管理', icon: '♪' },
    { id: 'SCR-020', label: '応募者管理', icon: '◈' },
    { id: 'SCR-022', label: 'アナリティクス', icon: '▲' },
  ]
  const isActive = (id: string) =>
    current === id ||
    (id === 'SCR-018' && current === 'SCR-019') ||
    (id === 'SCR-020' && current === 'SCR-021')
  return (
    <aside className="console-sidebar">
      <div className="cs-logo">
        Discovery<span className="r">.</span> <span className="sub">COMPANY</span>
      </div>
      <div className="cs-company">
        <div className="logo">R</div>
        <div>
          <div className="n">rockin'on inc.</div>
          <div className="s">ENTERPRISE PLAN</div>
        </div>
      </div>
      <nav>
        {items.map((i) => (
          <a key={i.id} className={isActive(i.id) ? 'active' : ''} onClick={() => onNav(i.id)}>
            <span className="ico">{i.icon}</span>
            {i.label}
          </a>
        ))}
      </nav>
      <div className="cs-footer">
        <a onClick={() => onNav('SCR-001')}>← サイトへ戻る</a>
      </div>
    </aside>
  )
}

export function AdminSidebar({ onNav, current }: { onNav: Nav; current: string }) {
  const items = [
    { id: 'SCR-028', label: 'オーバービュー', icon: '◉' },
    { id: 'SCR-029', label: '求人審査', icon: '⏺' },
    { id: 'SCR-030', label: '企業管理', icon: '◈' },
    { id: 'SCR-031', label: '会員管理', icon: '♛' },
  ]
  return (
    <aside className="console-sidebar admin">
      <div className="cs-logo">
        Discovery<span className="r">.</span> <span className="sub">ADMIN</span>
      </div>
      <div className="cs-company">
        <div className="logo">A</div>
        <div>
          <div className="n">System Admin</div>
          <div className="s">SUPER ACCESS</div>
        </div>
      </div>
      <nav>
        {items.map((i) => (
          <a key={i.id} className={current === i.id ? 'active' : ''} onClick={() => onNav(i.id)}>
            <span className="ico">{i.icon}</span>
            {i.label}
          </a>
        ))}
      </nav>
      <div className="cs-footer">
        <a onClick={() => onNav('SCR-001')}>← サイトへ戻る</a>
      </div>
    </aside>
  )
}
