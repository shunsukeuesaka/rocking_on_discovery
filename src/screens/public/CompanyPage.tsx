import type { Nav } from '../../types'
import { JOBS } from '../../data/mwData'
import { JobCard } from '../../components/JobCard'

// ============ COMPANY PAGE (SCR-009) ============
export function CompanyPage({ nav }: { nav: Nav }) {
  return (
    <div>
      <div style={{ padding: '40px 28px', background: 'var(--mw-bg)', borderBottom: '0.5px solid var(--mw-border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -80, top: -40, width: 280, height: 280, background: 'radial-gradient(circle, rgba(207,48,21,0.2), transparent 70%)' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: 24, alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ width: 100, height: 100, background: 'var(--mw-red)', borderRadius: 12, display: 'grid', placeItems: 'center', fontFamily: 'var(--ff-display)', fontSize: 52, letterSpacing: '0.04em' }}>R</div>
          <div>
            <div className="eyebrow">Music Media · Festival</div>
            <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 48, margin: '4px 0', fontWeight: 400, letterSpacing: '0.02em' }}>rockin'on inc.</h1>
            <div style={{ color: 'var(--mw-lightgray)', fontSize: 13, fontFamily: 'var(--ff-jp)' }}>1972年創業 · 従業員 280名 · 東京都渋谷区</div>
            <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
              <span className="tag">音楽メディア</span>
              <span className="tag">雑誌出版</span>
              <span className="tag">フェス運営</span>
            </div>
          </div>
          <div className="company-follow">
            <button className="btn-primary">フォローする ↗</button>
            <div className="company-follow-note">フォローすると、この企業が新しい求人を掲載したときに通知が届きます。</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '40px 28px', maxWidth: 1100 }}>
        <section style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 14 }}>— About</h3>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'var(--mw-lightgray)', maxWidth: 760, fontFamily: 'var(--ff-jp)' }}>
            1972年創刊の音楽雑誌「rockin'on」をはじめ、「ROCKIN'ON JAPAN」「音楽と人」を発行する総合音楽メディア。
            ROCK IN JAPAN FESTIVAL、COUNTDOWN JAPAN、JAPAN JAM など日本最大級の音楽フェスの運営も手がける。
          </p>
        </section>

        <section>
          <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 14 }}>— Open Positions (3)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {JOBS.filter(j => j.co.includes('rockin')).map(j => <JobCard key={j.id} job={j} nav={nav} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
