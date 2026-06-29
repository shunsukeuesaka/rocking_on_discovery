import type { Nav } from '../../types'

// ============ APPLICANT DETAIL (SCR-021) ============
export function ApplicantDetail({ nav }: { nav: Nav }) {
  void nav
  return (
    <div style={{ padding: '32px 28px' }}>
      <div className="breadcrumb">応募者管理 / A&Rディレクター / 佐藤 陽翔</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, marginTop: 16 }}>
        <div>
          <div className="form-card" style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--mw-red)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 32, fontFamily: 'var(--ff-display)' }}>佐</div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 28, letterSpacing: '0.02em', color: 'var(--mw-white)' }}>佐藤 陽翔 <span style={{ fontSize: 14, color: 'var(--mw-gray)', fontFamily: 'var(--ff-mono)' }}>/ 28</span></h2>
                <div style={{ fontSize: 12, color: 'var(--mw-lightgray)', marginTop: 4, fontFamily: 'var(--ff-jp)' }}>haruto.sato@example.com · 090-1234-5678 · 東京都渋谷区</div>
                <div style={{ marginTop: 10, display: 'flex', gap: 4 }}>
                  {['ProTools', 'Logic Pro', 'A&R実務', 'ライブ制作'].map(s => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>
            </div>
          </div>

          <div className="form-card">
            <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 12 }}>— 志望動機</h3>
            <p style={{ fontSize: 13, lineHeight: 1.9, color: 'var(--mw-lightgray)', fontFamily: 'var(--ff-jp)' }}>
              rockin'on が手がけるフェスに学生時代から足を運び、音楽業界に入りたいという想いを強く持ってきました。
              現職のレーベルで5年間、新人アーティストのA&Rを担当し、2組のデビューをサポートしてまいりました。
              rockin'on のメディア力とフェス制作力を活かした、よりスケールの大きなアーティスト育成に挑戦したいと考えています。
            </p>
          </div>

          <div className="form-card" style={{ marginTop: 12 }}>
            <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 12 }}>— 職務経歴</h3>
            {[
              { y: '2021 - Present', co: 'Blue Record Label', role: 'A&R Staff' },
              { y: '2019 - 2021', co: 'Sound Studio Tokyo', role: 'Assistant Producer' },
              { y: '2019', co: '大学卒業 (音楽学部)', role: '' },
            ].map((w, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16, padding: '12px 0', borderBottom: i < 2 ? '0.5px solid var(--mw-border)' : 'none' }}>
                <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, color: 'var(--mw-red-light)' }}>{w.y}</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--mw-white)', fontFamily: 'var(--ff-jp)' }}>{w.co}</div>
                  {w.role && <div style={{ fontSize: 12, color: 'var(--mw-lightgray)', marginTop: 2 }}>{w.role}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="form-card" style={{ marginTop: 12 }}>
            <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 12 }}>— 応募書類</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              {['履歴書_佐藤陽翔.pdf', '職務経歴書_佐藤陽翔.pdf'].map(f => (
                <div key={f} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontFamily: 'var(--ff-mono)' }}>
                  📄 {f} <span style={{ color: 'var(--mw-red-light)', marginLeft: 6 }}>↓</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="apply-box">
            <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mw-red)', fontWeight: 700, marginBottom: 12 }}>— Status</div>
            <select className="mw-input" defaultValue="review" style={{ marginBottom: 10 }}>
              <option value="new">新規</option>
              <option value="review">書類選考中</option>
              <option value="interview">面接</option>
              <option value="offer">内定</option>
              <option value="reject">不合格</option>
            </select>
            <div className="field-group">
              <label className="label">評価</label>
              <div style={{ display: 'flex', gap: 4, fontSize: 24 }}>
                {[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: s <= 4 ? 'var(--mw-red)' : 'rgba(255,255,255,0.2)', cursor: 'pointer' }}>★</span>)}
              </div>
            </div>
            <div className="field-group">
              <label className="label">社内メモ</label>
              <textarea className="mw-textarea" rows={4} defaultValue="志望動機が明確。A&R経験も十分。1次面接に進めて良さそう。" />
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }}>次のステップへ ↗</button>
            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>メッセージを送る</button>
          </div>
        </div>
      </div>
    </div>
  )
}
