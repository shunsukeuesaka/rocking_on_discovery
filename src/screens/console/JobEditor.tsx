import type { Nav } from '../../types'
import { CATEGORIES } from '../../data/mwData'

// ============ JOB EDITOR (SCR-019) ============
export function JobEditor({ nav }: { nav: Nav }) {
  void nav
  return (
    <div style={{ padding: '32px 28px', maxWidth: 1100 }}>
      <div className="eyebrow">Job Editor</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0 24px', fontWeight: 400, letterSpacing: '0.02em' }}>求人作成・編集</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        <div className="form-card">
          <div className="form-row">
            <div className="field-group req" style={{ flex: 2 }}><label className="label">求人タイトル</label><input className="mw-input" defaultValue="A&Rディレクター / 新人発掘〜作品プロデュース" /></div>
            <div className="field-group req"><label className="label">職種カテゴリ</label>
              <select className="mw-input">{CATEGORIES.map(c => <option key={c.en}>{c.ja}</option>)}</select>
            </div>
          </div>
          <div className="form-row">
            <div className="field-group req"><label className="label">雇用形態</label>
              <select className="mw-input"><option>正社員</option><option>契約社員</option><option>業務委託</option></select>
            </div>
            <div className="field-group req"><label className="label">年収レンジ</label>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <input className="mw-input" defaultValue="550" /><span style={{ color: 'var(--mw-gray)' }}>〜</span><input className="mw-input" defaultValue="850" /><span style={{ color: 'var(--mw-gray)', fontSize: 12 }}>万円</span>
              </div>
            </div>
            <div className="field-group"><label className="label">勤務地</label><input className="mw-input" defaultValue="東京・渋谷 / リモート可" /></div>
          </div>
          <div className="field-group req">
            <label className="label">業務概要</label>
            <textarea className="mw-textarea" rows={4} defaultValue="Discovery運営の rockin'on inc. では、アーティスト発掘から作品プロデュースまで..." />
          </div>
          <div className="field-group req">
            <label className="label">業務内容（1行ずつ）</label>
            <textarea className="mw-textarea" rows={5} defaultValue={"新人アーティストの発掘・契約交渉\n作品制作全般のプロデュース\nプロモーション戦略の立案と実行"} />
          </div>
          <div className="field-group req">
            <label className="label">応募条件</label>
            <textarea className="mw-textarea" rows={3} defaultValue={"音楽業界での制作・A&R実務経験 3年以上\nレーベル・マネジメント会社での実務経験"} />
          </div>
          <div className="field-group">
            <label className="label">歓迎要件</label>
            <textarea className="mw-textarea" rows={3} />
          </div>
          <div className="field-group">
            <label className="label">タグ（カンマ区切り）</label>
            <input className="mw-input" defaultValue="A&R, 新規開拓, プロデュース" />
          </div>
        </div>

        <div>
          <div className="apply-box">
            <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mw-red)', fontWeight: 700, marginBottom: 14 }}>— Publishing</div>
            <div className="field-group">
              <label className="label">ステータス</label>
              <select className="mw-input"><option>下書き</option><option>公開申請</option><option>公開中</option></select>
            </div>
            <div className="field-group">
              <label className="label">応募締切</label>
              <input className="mw-input" type="date" defaultValue="2026-05-31" />
            </div>
            <label className="filter-opt" style={{ margin: '14px 0' }}>
              <input type="checkbox" defaultChecked /><span style={{ fontSize: 12, color: 'var(--mw-lightgray)' }}>注目求人枠に表示</span>
            </label>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }}>公開申請する ↗</button>
            <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>下書き保存</button>
          </div>

          <div className="apply-box" style={{ marginTop: 12 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mw-red)', fontWeight: 700, marginBottom: 10 }}>— Review Checklist</div>
            <div style={{ fontSize: 11, color: 'var(--mw-lightgray)', lineHeight: 2, fontFamily: 'var(--ff-jp)' }}>
              <div>✓ タイトル入力済</div>
              <div>✓ 年収記入済</div>
              <div style={{ color: 'var(--mw-gray)' }}>○ 歓迎要件（推奨）</div>
              <div>✓ 業務内容 3件以上</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
