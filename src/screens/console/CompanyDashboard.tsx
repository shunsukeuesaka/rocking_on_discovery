import type { Nav } from '../../types'
import { MiniChart } from '../../components/MiniChart'
import { JOBS } from '../../data/mwData'

// ============ COMPANY DASHBOARD (SCR-017) ============
export function CompanyDashboard({ nav }: { nav: Nav }) {
  return (
    <div style={{ padding: '32px 28px' }}>
      <div className="eyebrow">Company Console</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0 6px', fontWeight: 400, letterSpacing: '0.02em' }}>DASHBOARD</h1>
      <p className="h-sub">rockin'on inc. · 本日 2026.04.20</p>

      <div className="stat-row" style={{ marginTop: 24 }}>
        <div className="stat-card"><div className="k">公開中の求人</div><div className="v">5</div><div className="delta">+1 this week</div></div>
        <div className="stat-card"><div className="k">新規応募</div><div className="v">28</div><div className="delta">+6 vs last week</div></div>
        <div className="stat-card"><div className="k">書類選考中</div><div className="v">12</div><div className="delta">要対応 3</div></div>
        <div className="stat-card"><div className="k">求人閲覧数</div><div className="v">4,218</div><div className="delta">過去30日</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 24 }}>
        <div className="form-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase' }}>— Applications Trend</h3>
            <span style={{ fontSize: 11, color: 'var(--mw-gray)', fontFamily: 'var(--ff-mono)' }}>LAST 14 DAYS</span>
          </div>
          <MiniChart values={[3, 5, 2, 8, 6, 9, 4, 7, 11, 8, 6, 12, 9, 14]} />
        </div>

        <div className="form-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase' }}>— Job Performance</h3>
            <span style={{ fontSize: 11, color: 'var(--mw-gray)', fontFamily: 'var(--ff-mono)' }}>VIEW / APPLY RATE</span>
          </div>
          {JOBS.slice(0, 3).map((j, i) => (
            <div key={j.id} style={{ padding: '10px 0', borderBottom: '0.5px solid var(--mw-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: 'var(--mw-white)', fontFamily: 'var(--ff-jp)' }}>{j.title}</span>
                <span style={{ fontFamily: 'var(--ff-mono)', color: 'var(--mw-red-light)' }}>{[1284, 892, 541][i]} views</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--mw-red)', width: [85, 62, 38][i] + '%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-card" style={{ marginTop: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase' }}>— Recent Applicants</h3>
          <button className="btn-ghost btn-sm" onClick={() => nav('SCR-020')}>すべて表示 →</button>
        </div>
        {[
          { name: '佐藤 陽翔', job: 'A&Rディレクター', date: '2026.04.20 09:14', status: 'new', label: '新規' },
          { name: '田中 美咲', job: 'ライブ制作マネージャー', date: '2026.04.19 17:42', status: 'review', label: '書類選考' },
          { name: '鈴木 湊', job: 'レコーディングエンジニア', date: '2026.04.19 14:08', status: 'interview', label: '面接調整' },
          { name: 'Kyle Parker', job: 'MVディレクター', date: '2026.04.18 11:30', status: 'new', label: '新規' },
        ].map((a, i) => (
          <div key={i} className="history-row" style={{ borderBottom: '0.5px solid var(--mw-border)' }}>
            <div className="co-logo">{a.name[0]}</div>
            <div>
              <h4>{a.name}</h4>
              <div className="sub">{a.job}</div>
            </div>
            <div><span className={"status-pill " + a.status}>{a.label}</span></div>
            <div className="date">{a.date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
