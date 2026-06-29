import { MiniChart } from '../../components/MiniChart'
import type { Nav } from '../../types'

// ============ ANALYTICS (SCR-022) ============
export function AnalyticsPage({ nav }: { nav: Nav }) {
  void nav
  return (
    <div style={{ padding: '32px 28px' }}>
      <div className="eyebrow">Analytics</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0 24px', fontWeight: 400, letterSpacing: '0.02em' }}>ANALYTICS</h1>

      <div className="stat-row">
        <div className="stat-card"><div className="k">総閲覧</div><div className="v">12,842</div><div className="delta">+18% MoM</div></div>
        <div className="stat-card"><div className="k">応募数</div><div className="v">128</div><div className="delta">+24% MoM</div></div>
        <div className="stat-card"><div className="k">応募率</div><div className="v">0.99<span style={{ fontSize: 18, color: 'var(--mw-gray)', fontFamily: 'var(--ff-sans)' }}>%</span></div><div className="delta">業界平均 0.62%</div></div>
        <div className="stat-card"><div className="k">内定数</div><div className="v">4</div><div className="delta">過去90日</div></div>
      </div>

      <div className="form-card" style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
          <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase' }}>— Monthly Trend</h3>
          <div style={{ display: 'flex', gap: 16, fontSize: 11 }}>
            <span style={{ color: 'var(--mw-red)' }}>● 閲覧数</span>
            <span style={{ color: 'var(--mw-red-light)' }}>● 応募数</span>
          </div>
        </div>
        <MiniChart values={[520, 680, 750, 890, 820, 1200, 1400, 1380, 1650, 1580, 1840, 2100]} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--mw-gray)', fontFamily: 'var(--ff-mono)', marginTop: 6 }}>
          <span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span><span>NOV</span><span>DEC</span><span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
        <div className="form-card">
          <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 14 }}>— Traffic Sources</h3>
          {([
            ['Direct', 42], ['検索 (Organic)', 28], ['rockin\'on 媒体', 18], ['SNS', 8], ['その他', 4]
          ] as [string, number][]).map(([src, pct]) => (
            <div key={src} style={{ padding: '8px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: 'var(--mw-white)', fontFamily: 'var(--ff-jp)' }}>{src}</span>
                <span style={{ color: 'var(--mw-red-light)', fontFamily: 'var(--ff-mono)' }}>{pct}%</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--mw-red)', width: pct + '%' }} />
              </div>
            </div>
          ))}
        </div>

        <div className="form-card">
          <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 14 }}>— Applicant Demographics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--mw-gray)', marginBottom: 8, fontFamily: 'var(--ff-mono)' }}>AGE</div>
              {([['20代', 32], ['30代', 48], ['40代', 16], ['50代+', 4]] as [string, number][]).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 12 }}>
                  <span style={{ fontFamily: 'var(--ff-jp)', color: 'var(--mw-lightgray)' }}>{k}</span>
                  <span style={{ fontFamily: 'var(--ff-mono)', color: 'var(--mw-red-light)' }}>{v}%</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--mw-gray)', marginBottom: 8, fontFamily: 'var(--ff-mono)' }}>EXPERIENCE</div>
              {([['1〜3年', 22], ['3〜5年', 38], ['5〜10年', 28], ['10年+', 12]] as [string, number][]).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 12 }}>
                  <span style={{ fontFamily: 'var(--ff-jp)', color: 'var(--mw-lightgray)' }}>{k}</span>
                  <span style={{ fontFamily: 'var(--ff-mono)', color: 'var(--mw-red-light)' }}>{v}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
