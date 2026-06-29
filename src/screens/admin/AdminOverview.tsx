import type { Nav } from '../../types'
import { MiniChart } from '../../components/MiniChart'

export function AdminOverview({ nav }: { nav: Nav }) {
  return (
    <div style={{ padding: '32px 28px' }}>
      <div className="eyebrow">System Admin</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0 6px', fontWeight: 400, letterSpacing: '0.02em' }}>OVERVIEW</h1>
      <p className="h-sub">Discovery Platform · 2026.04.20 10:14 JST</p>

      <div className="stat-row" style={{ marginTop: 24 }}>
        <div className="stat-card"><div className="k">Active Jobs</div><div className="v">1,284</div><div className="delta">+42 this week</div></div>
        <div className="stat-card"><div className="k">Partner Companies</div><div className="v">312</div><div className="delta">+6 this month</div></div>
        <div className="stat-card"><div className="k">Registered Members</div><div className="v">48,291</div><div className="delta">+1,204 MoM</div></div>
        <div className="stat-card"><div className="k">Pending Reviews</div><div className="v">7</div><div className="delta down">要対応</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginTop: 20 }}>
        <div className="form-card">
          <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 14 }}>— Platform Activity (14D)</h3>
          <MiniChart values={[820, 950, 1020, 880, 1120, 1350, 1280, 1420, 1580, 1480, 1620, 1750, 1680, 1920]} />
        </div>
        <div className="form-card">
          <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 14 }}>— System Status</h3>
          {[
            ['API Server', 'operational'], ['Database', 'operational'], ['Search Index', 'operational'], ['Email Service', 'degraded'], ['Payment Gateway', 'operational']
          ].map(([s, st]) => (
            <div key={s} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '0.5px solid var(--mw-border)', fontSize: 12 }}>
              <span style={{ color: 'var(--mw-white)', fontFamily: 'var(--ff-jp)' }}>{s}</span>
              <span style={{ color: st === 'operational' ? '#8FD38A' : '#E8B658', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--ff-mono)', fontSize: 11, textTransform: 'uppercase' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />{st}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-card" style={{ marginTop: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase' }}>— Pending Review Queue</h3>
          <button className="btn-ghost btn-sm" onClick={() => nav('SCR-029')}>全て見る →</button>
        </div>
        {[
          { co: 'Grain Pictures', job: 'MVディレクター', date: '2026.04.20 08:32', type: '新規求人' },
          { co: 'Night Owl Fest', job: 'フェスブッキング担当', date: '2026.04.19 16:44', type: '編集' },
          { co: '株式会社 Rhythm Mgmt', job: '—', date: '2026.04.19 11:20', type: '新規企業登録' },
        ].map((p, i) => (
          <div key={i} className="history-row" style={{ borderBottom: '0.5px solid var(--mw-border)' }} onClick={() => nav('SCR-029')}>
            <div className="co-logo">{p.co[0]}</div>
            <div>
              <h4>{p.job !== '—' ? p.job : p.co}</h4>
              <div className="sub">{p.co} · {p.type}</div>
            </div>
            <div><span className="status-pill review">審査待</span></div>
            <div className="date">{p.date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
