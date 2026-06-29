import type { Nav } from '../../types'

// ============ COMPANY LP (SCR-010) ============
export function CompanyLP({ nav }: { nav: Nav }) {
  void nav;
  return (
    <div>
      <section className="top-hero" style={{ padding: '80px 48px 60px' }}>
        <div className="vinyl" style={{ right: 'auto', left: '-140px', bottom: 'auto', top: '-140px' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 960, marginLeft: 'auto' }}>
          <div className="eyebrow">For Company</div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 104, lineHeight: 0.92, margin: '12px 0 20px', letterSpacing: '0.02em' }}>
            HIRE THE<br /><em style={{ fontStyle: 'normal', color: 'var(--mw-red)' }}>MUSIC PEOPLE.</em>
          </h1>
          <p style={{ color: 'var(--mw-lightgray)', fontSize: 15, lineHeight: 1.8, maxWidth: 560, fontFamily: 'var(--ff-jp)' }}>
            音楽業界特化だからこそ集まる、業界経験者 4.8万人の熱量。
            Discoveryで、あなたの会社の次のチームメイトを見つけよう。
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            <button className="btn-primary">掲載を相談する ↗</button>
            <button className="btn-secondary">資料ダウンロード</button>
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 28px', borderBottom: '0.5px solid var(--mw-border)' }}>
        <div className="eyebrow">Why Discovery</div>
        <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 48, margin: '4px 0 28px', letterSpacing: '0.02em' }}>3つの理由</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { n: '01', t: 'INDUSTRY FOCUSED', ja: '音楽業界に特化', d: '業界経験者のみが集まるコミュニティ。応募者の質が圧倒的に違います。' },
            { n: '02', t: 'ROCKIN\'ON NETWORK', ja: '40年のメディア力', d: 'rockin\'on 媒体から集客。熱量の高い読者層に直接リーチ。' },
            { n: '03', t: 'EASY TO START', ja: '最短3日で公開', d: '掲載フローはシンプル。求人作成から審査、公開まで最短3営業日。' },
          ].map(f => (
            <div key={f.n} style={{ background: 'var(--mw-surface)', border: '0.5px solid var(--mw-border)', borderRadius: 12, padding: 28 }}>
              <div style={{ fontFamily: 'var(--ff-display)', fontSize: 48, color: 'var(--mw-red)', letterSpacing: '0.02em' }}>{f.n}</div>
              <div style={{ fontFamily: 'var(--ff-display)', fontSize: 20, letterSpacing: '0.04em', marginTop: 8 }}>{f.t}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4, color: 'var(--mw-white)' }}>{f.ja}</div>
              <p style={{ fontSize: 12, color: 'var(--mw-lightgray)', marginTop: 12, lineHeight: 1.8, fontFamily: 'var(--ff-jp)' }}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '64px 28px' }}>
        <div className="eyebrow">Pricing</div>
        <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 48, margin: '4px 0 28px', letterSpacing: '0.02em' }}>掲載プラン</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {([
            { name: 'BASIC', price: '¥50,000', per: '/ 30日', ja: '初めての掲載に', features: ['求人1枠', '基本情報表示', 'メール通知'] },
            { name: 'STANDARD', price: '¥150,000', per: '/ 30日', ja: '継続採用に', features: ['求人3枠', '企業ページ掲載', 'アナリティクス', '注目求人枠ランダム'], featured: true },
            { name: 'ENTERPRISE', price: 'ASK', per: '', ja: '大規模採用に', features: ['求人無制限', '専属サポート', 'カスタムLP', '独占バナー枠'] },
          ] as { name: string; price: string; per: string; ja: string; features: string[]; featured?: boolean }[]).map(p => (
            <div key={p.name} style={{ background: p.featured ? 'var(--mw-red)' : 'var(--mw-surface)', border: '0.5px solid ' + (p.featured ? 'var(--mw-red)' : 'var(--mw-border)'), borderRadius: 12, padding: 28, position: 'relative' }}>
              {p.featured && <span style={{ position: 'absolute', top: 16, right: 16 }} className="badge badge-white">POPULAR</span>}
              <div style={{ fontFamily: 'var(--ff-display)', fontSize: 28, letterSpacing: '0.04em' }}>{p.name}</div>
              <div style={{ fontSize: 12, color: p.featured ? 'rgba(255,255,255,.85)' : 'var(--mw-gray)', fontFamily: 'var(--ff-jp)' }}>{p.ja}</div>
              <div style={{ marginTop: 16 }}>
                <span style={{ fontFamily: 'var(--ff-display)', fontSize: 48, letterSpacing: '0.02em' }}>{p.price}</span>
                <span style={{ fontSize: 12, color: p.featured ? 'rgba(255,255,255,.8)' : 'var(--mw-gray)', marginLeft: 6 }}>{p.per}</span>
              </div>
              <ul style={{ listStyle: 'none', marginTop: 20, padding: 0 }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontSize: 13, color: p.featured ? '#fff' : 'var(--mw-lightgray)', padding: '6px 0', fontFamily: 'var(--ff-jp)' }}>✓ {f}</li>
                ))}
              </ul>
              <button className={p.featured ? 'btn-secondary' : 'btn-primary'} style={{ width: '100%', justifyContent: 'center', marginTop: 16, borderColor: p.featured ? '#fff' : undefined }}>相談する ↗</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
