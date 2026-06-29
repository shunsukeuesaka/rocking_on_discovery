import type { Nav } from '../../types'

export function AdminMembers({ nav }: { nav: Nav }) {
  void nav
  return (
    <div style={{ padding: '32px 28px' }}>
      <div className="eyebrow">Member Management</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0 24px', fontWeight: 400, letterSpacing: '0.02em' }}>会員管理</h1>

      <div className="stat-row">
        <div className="stat-card"><div className="k">総会員数</div><div className="v">48,291</div><div className="delta">+1,204 MoM</div></div>
        <div className="stat-card"><div className="k">アクティブ (30d)</div><div className="v">12,482</div><div className="delta">+8%</div></div>
        <div className="stat-card"><div className="k">今月の応募</div><div className="v">3,482</div><div className="delta">+24% MoM</div></div>
        <div className="stat-card"><div className="k">凍結中アカウント</div><div className="v">12</div><div className="delta">要確認 3</div></div>
      </div>

      <div style={{ display: 'flex', gap: 8, margin: '20px 0', alignItems: 'center' }}>
        <input className="mw-input" placeholder="メール・ID・氏名で検索" style={{ flex: 1, maxWidth: 400 }} />
        <select className="mw-input" style={{ width: 180 }}>
          <option>全ステータス</option><option>アクティブ</option><option>休眠</option><option>凍結</option>
        </select>
        <button className="btn-ghost">CSV Export ↓</button>
      </div>

      <div className="form-card" style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '0.5px solid var(--mw-border)', background: 'rgba(255,255,255,0.02)' }}>
              {['MEMBER', 'EMAIL', 'APPLIES', 'LAST ACTIVE', 'STATUS', 'JOINED'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 10, letterSpacing: '0.14em', color: 'var(--mw-gray)', fontWeight: 700, fontFamily: 'var(--ff-mono)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { name: '佐藤 陽翔', em: 'haruto.sato@example.com', a: 3, la: '2026.04.20', st: 'active', j: '2025.11' },
              { name: '田中 美咲', em: 'misaki.t@example.com', a: 8, la: '2026.04.19', st: 'active', j: '2025.06' },
              { name: '鈴木 湊', em: 'minato.s@example.com', a: 5, la: '2026.04.18', st: 'active', j: '2024.12' },
              { name: 'Kyle Parker', em: 'kyle.p@example.com', a: 2, la: '2026.04.17', st: 'active', j: '2026.02' },
              { name: '山田 楓', em: 'kaede.y@example.com', a: 12, la: '2026.04.10', st: 'active', j: '2024.08' },
              { name: '(freezed) user_01482', em: 'u01482@example.com', a: 0, la: '2026.02.02', st: 'frozen', j: '2026.01' },
            ].map((u, i) => (
              <tr key={i} style={{ borderBottom: '0.5px solid var(--mw-border)' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: u.st === 'frozen' ? 'rgba(255,255,255,0.15)' : 'var(--mw-red)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontFamily: 'var(--ff-display)' }}>{u.name[0]}</div>
                    <div style={{ fontWeight: 700, color: 'var(--mw-white)', fontFamily: 'var(--ff-jp)' }}>{u.name}</div>
                  </div>
                </td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', fontSize: 11, color: 'var(--mw-lightgray)' }}>{u.em}</td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-red-light)' }}>{u.a}</td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-gray)', fontSize: 11 }}>{u.la}</td>
                <td style={{ padding: '16px' }}>
                  <span className={"status-pill " + (u.st === 'active' ? 'new' : 'reject')}>
                    {u.st === 'active' ? 'アクティブ' : '凍結'}
                  </span>
                </td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-gray)', fontSize: 11 }}>{u.j}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
