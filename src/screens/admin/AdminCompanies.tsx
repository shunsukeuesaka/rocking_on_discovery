import type { Nav } from '../../types'

export function AdminCompanies({ nav }: { nav: Nav }) {
  void nav
  return (
    <div style={{ padding: '32px 28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div className="eyebrow">Company Management</div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0', fontWeight: 400, letterSpacing: '0.02em' }}>掲載企業管理</h1>
        </div>
        <button className="btn-primary">＋ 企業を追加</button>
      </div>

      <div className="form-card" style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '0.5px solid var(--mw-border)', background: 'rgba(255,255,255,0.02)' }}>
              {['COMPANY', 'PLAN', 'JOBS', 'TOTAL SPEND', 'STATUS', 'JOINED'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 10, letterSpacing: '0.14em', color: 'var(--mw-gray)', fontWeight: 700, fontFamily: 'var(--ff-mono)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { co: 'rockin\'on inc.', plan: 'ENTERPRISE', jobs: 5, spend: '¥2,400,000', st: 'active', joined: '2024.03' },
              { co: 'Sound Stage Tokyo', plan: 'STANDARD', jobs: 3, spend: '¥450,000', st: 'active', joined: '2025.02' },
              { co: 'Grain Pictures', plan: 'BASIC', jobs: 1, spend: '¥50,000', st: 'review', joined: '2026.04' },
              { co: 'Night Owl Fest', plan: 'STANDARD', jobs: 2, spend: '¥300,000', st: 'active', joined: '2025.08' },
              { co: 'Blue Record Label', plan: 'STANDARD', jobs: 4, spend: '¥600,000', st: 'active', joined: '2025.01' },
              { co: 'Rhythm Management', plan: '—', jobs: 0, spend: '—', st: 'pending', joined: '2026.04' },
            ].map((c, i) => (
              <tr key={i} style={{ borderBottom: '0.5px solid var(--mw-border)' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--mw-red)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontFamily: 'var(--ff-display)' }}>{c.co[0]}</div>
                    <div style={{ fontWeight: 700, color: 'var(--mw-white)', fontFamily: 'var(--ff-jp)' }}>{c.co}</div>
                  </div>
                </td>
                <td style={{ padding: '16px' }}><span className="badge badge-white">{c.plan}</span></td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-lightgray)' }}>{c.jobs}</td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-red-light)' }}>{c.spend}</td>
                <td style={{ padding: '16px' }}>
                  <span className={"status-pill " + (c.st === 'active' ? 'new' : c.st === 'review' ? 'review' : 'interview')}>
                    {c.st === 'active' ? '稼働中' : c.st === 'review' ? '審査中' : '承認待'}
                  </span>
                </td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-gray)' }}>{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
