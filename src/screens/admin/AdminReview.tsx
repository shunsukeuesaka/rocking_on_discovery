import type { Nav } from '../../types'

// ============ ADMIN REVIEW (SCR-029) ============
export function AdminReview({ nav }: { nav: Nav }) {
  void nav
  return (
    <div style={{ padding: '32px 28px' }}>
      <div className="eyebrow">Content Review</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0 24px', fontWeight: 400, letterSpacing: '0.02em' }}>求人審査</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
        <div className="form-card">
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center' }}>
            <div style={{ width: 44, height: 44, background: 'rgba(207,48,21,0.2)', color: 'var(--mw-red)', borderRadius: 8, display: 'grid', placeItems: 'center', fontWeight: 700, fontFamily: 'var(--ff-display)' }}>G</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--ff-display)', fontSize: 22, letterSpacing: '0.02em' }}>MVディレクター / 音楽映像制作</div>
              <div style={{ fontSize: 11, color: 'var(--mw-gray)', fontFamily: 'var(--ff-mono)' }}>SCR-0129 · Grain Pictures · 提出 2026.04.20 08:32</div>
            </div>
            <span className="status-pill review">審査待</span>
          </div>

          <div className="detail-meta-grid">
            <div className="cell"><div className="k">Category</div><div className="v">映像・MV制作</div></div>
            <div className="cell"><div className="k">Employment</div><div className="v">業務委託</div></div>
            <div className="cell"><div className="k">Location</div><div className="v">東京・渋谷</div></div>
            <div className="cell"><div className="k">Salary</div><div className="v">400〜650万円</div></div>
          </div>

          <h4 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', margin: '20px 0 10px' }}>— Overview</h4>
          <p style={{ fontSize: 13, color: 'var(--mw-lightgray)', lineHeight: 1.9, fontFamily: 'var(--ff-jp)' }}>
            邦楽アーティストのMV制作を中心に、ライブ映像、ドキュメンタリー映像の企画・演出・撮影・編集まで一貫して担当いただきます...
          </p>

          <div style={{ marginTop: 24, padding: 14, background: 'rgba(207,48,21,0.08)', border: '0.5px solid rgba(207,48,21,0.3)', borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--mw-red-light)', marginBottom: 6, fontWeight: 700 }}>⚠ Auto-Check: 2 issues</div>
            <ul style={{ paddingLeft: 18, fontSize: 12, color: 'var(--mw-lightgray)', lineHeight: 1.8, fontFamily: 'var(--ff-jp)' }}>
              <li>年収レンジが業界平均から外れています（下限が低め）</li>
              <li>歓迎要件が未記入です</li>
            </ul>
          </div>
        </div>

        <div>
          <div className="apply-box">
            <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mw-red)', fontWeight: 700, marginBottom: 14 }}>— Decision</div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 8, background: '#4A9F3E', borderColor: '#4A9F3E' }}>✓ 承認して公開</button>
            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }}>修正依頼</button>
            <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', color: '#E86858' }}>却下</button>

            <div className="field-group" style={{ marginTop: 16 }}>
              <label className="label">審査コメント</label>
              <textarea className="mw-textarea" rows={5} placeholder="企業担当者に送られるコメントを記入..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
