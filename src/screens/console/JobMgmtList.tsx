import { useState } from 'react'
import type { Nav } from '../../types'
import { JOBS } from '../../data/mwData'

export function JobMgmtList({ nav }: { nav: Nav }) {
  const [tab, setTab] = useState('active')
  return (
    <div style={{ padding: '32px 28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <div className="eyebrow">Job Management</div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0', fontWeight: 400, letterSpacing: '0.02em' }}>求人管理</h1>
        </div>
        <button className="btn-primary" onClick={() => nav('SCR-019')}>＋ 新規求人作成</button>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
        {([
          ['active', '公開中', 5], ['draft', '下書き', 2], ['review', '審査中', 1], ['closed', '終了', 12]
        ] as [string, string, number][]).map(([k, n, c]) => (
          <button key={k} className={"jobmgmt-tab" + (tab === k ? " active" : "")} onClick={() => setTab(k)}>
            {n} <span style={{ opacity: 0.5, marginLeft: 6 }}>{c}</span>
          </button>
        ))}
      </div>

      <div className="form-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '0.5px solid var(--mw-border)' }}>
              {['JOB TITLE', 'STATUS', 'VIEWS', 'APPLY', 'POSTED', 'ACTION'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 10, letterSpacing: '0.14em', color: 'var(--mw-gray)', fontWeight: 700, fontFamily: 'var(--ff-mono)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {JOBS.slice(0, 5).map((j, i) => (
              <tr key={j.id} style={{ borderBottom: '0.5px solid var(--mw-border)' }}>
                <td style={{ padding: '16px', color: 'var(--mw-white)' }}>
                  <div style={{ fontWeight: 700, fontFamily: 'var(--ff-jp)' }}>{j.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--mw-gray)', marginTop: 2, fontFamily: 'var(--ff-mono)' }}>{j.id}</div>
                </td>
                <td style={{ padding: '16px' }}><span className="status-pill new">公開中</span></td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-lightgray)' }}>{[1284, 892, 541, 723, 412][i]}</td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-red-light)' }}>{[42, 28, 12, 18, 8][i]}</td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-gray)', fontSize: 11 }}>{j.posted}</td>
                <td style={{ padding: '16px' }}>
                  <button className="btn-ghost btn-sm" onClick={() => nav('SCR-019')}>編集</button>
                  <button className="btn-ghost btn-sm" onClick={() => nav('SCR-020')} style={{ marginLeft: 4 }}>応募者</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
