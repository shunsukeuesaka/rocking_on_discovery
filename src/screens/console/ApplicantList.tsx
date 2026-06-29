import type { Nav } from '../../types'

// ============ APPLICANT LIST (SCR-020) ============
export function ApplicantList({ nav }: { nav: Nav }) {
  return (
    <div style={{ padding: '32px 28px' }}>
      <div className="eyebrow">Applicant Management</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0', fontWeight: 400, letterSpacing: '0.02em' }}>応募者管理</h1>
      <p className="h-sub">A&Rディレクター — 応募者 42名</p>

      <div style={{ display: 'flex', gap: 4, margin: '24px 0 16px' }}>
        {([['all', '全て', 42], ['new', '新規', 12], ['review', '書類選考', 18], ['interview', '面接', 8], ['offer', '内定', 2], ['reject', '不合格', 2]] as [string, string, number][]).map(([k, n, c], i) => (
          <button key={k} className={"jobmgmt-tab" + (i === 0 ? " active" : "")}>{n} <span style={{ opacity: 0.5, marginLeft: 4 }}>{c}</span></button>
        ))}
      </div>

      <div className="form-card" style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '0.5px solid var(--mw-border)', background: 'rgba(255,255,255,0.02)' }}>
              {['NAME', 'JOB', 'STATUS', 'RATING', 'APPLIED', 'ACTION'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 10, letterSpacing: '0.14em', color: 'var(--mw-gray)', fontWeight: 700, fontFamily: 'var(--ff-mono)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { name: '佐藤 陽翔', age: 28, job: 'A&Rディレクター', status: 'new', label: '新規', stars: 0, date: '2026.04.20' },
              { name: '田中 美咲', age: 31, job: 'A&Rディレクター', status: 'review', label: '書類選考', stars: 4, date: '2026.04.19' },
              { name: '鈴木 湊', age: 26, job: 'A&Rディレクター', status: 'interview', label: '面接', stars: 5, date: '2026.04.18' },
              { name: 'Kyle Parker', age: 34, job: 'A&Rディレクター', status: 'review', label: '書類選考', stars: 3, date: '2026.04.17' },
              { name: '山田 楓', age: 29, job: 'A&Rディレクター', status: 'offer', label: '内定', stars: 5, date: '2026.04.10' },
            ].map((a, i) => (
              <tr key={i} style={{ borderBottom: '0.5px solid var(--mw-border)' }} onClick={() => nav('SCR-021')}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--mw-red)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontFamily: 'var(--ff-display)' }}>{a.name[0]}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--mw-white)', fontFamily: 'var(--ff-jp)' }}>{a.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--mw-gray)', fontFamily: 'var(--ff-mono)' }}>{a.age}歳</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px', color: 'var(--mw-lightgray)', fontFamily: 'var(--ff-jp)' }}>{a.job}</td>
                <td style={{ padding: '16px' }}><span className={"status-pill " + a.status}>{a.label}</span></td>
                <td style={{ padding: '16px', color: 'var(--mw-red)', letterSpacing: 2 }}>{'★'.repeat(a.stars)}{'☆'.repeat(5 - a.stars)}</td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-gray)' }}>{a.date}</td>
                <td style={{ padding: '16px' }}>
                  <button className="btn-ghost btn-sm" onClick={e => { e.stopPropagation(); nav('SCR-021'); }}>詳細 →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
