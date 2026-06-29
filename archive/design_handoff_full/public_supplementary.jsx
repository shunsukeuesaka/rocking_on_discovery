// MusicWork — Public supplementary screens (minor ones)
const { useState: useStatePS } = React;

// ============ LOGIN ============
function LoginPage({ nav, forCompany, forAdmin }) {
  const title = forAdmin ? 'Admin Login' : forCompany ? 'Company Login' : 'Member Login';
  const targetAfter = forAdmin ? 'SCR-028' : forCompany ? 'SCR-017' : 'SCR-008';
  return (
    <div style={{ minHeight: 'calc(100vh - 42px)', display: 'grid', placeItems: 'center', padding: 40, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(500px 300px at 50% 30%, rgba(207,48,21,0.15), transparent 70%)' }} />
      <div style={{ width: 420, position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--ff-display)', fontSize: 40, letterSpacing: '0.04em', fontWeight: 700 }}>Discovery<span style={{ color: 'var(--mw-red)' }}>.</span></div>
          <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--mw-gray)', marginTop: 4 }}>presented by rockin'on</div>
          <div className="eyebrow" style={{ marginTop: 8 }}>{title}</div>
        </div>
        <div className="form-card">
          <div className="field-group">
            <label className="label">メールアドレス</label>
            <input className="mw-input" defaultValue={forCompany ? 'hr@rockinon.co.jp' : forAdmin ? 'admin@discovery.rockinon.co.jp' : 'haruto@example.com'} />
          </div>
          <div className="field-group">
            <label className="label">パスワード</label>
            <input className="mw-input" type="password" defaultValue="password" />
          </div>
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }} onClick={() => nav(targetAfter)}>
            ログイン ↗
          </button>
          {!forAdmin && !forCompany && (
            <>
              <div style={{ textAlign: 'center', color: 'var(--mw-gray)', fontSize: 11, margin: '16px 0', letterSpacing: '0.1em' }}>— OR —</div>
              <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>G　Googleでログイン</button>
            </>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, fontSize: 12 }}>
            {!forAdmin && <a style={{ color: 'var(--mw-lightgray)' }} onClick={() => nav('SCR-012')}>パスワード忘れ</a>}
            {!forAdmin && !forCompany && <a style={{ color: 'var(--mw-lightgray)' }} onClick={() => nav('SCR-006')}>新規会員登録 →</a>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ SIGNUP ============
function SignupPage({ nav }) {
  return (
    <div className="apply-page">
      <div className="eyebrow">Sign Up</div>
      <h1>会員登録</h1>
      <p className="lede">登録して、応募管理・お気に入り保存・新着求人通知を受け取りましょう。</p>
      <div className="form-card">
        <div className="form-row">
          <div className="field-group req"><label className="label">メールアドレス</label><input className="mw-input" type="email" placeholder="you@example.com" /></div>
          <div className="field-group req"><label className="label">パスワード</label><input className="mw-input" type="password" /></div>
        </div>
        <div className="form-row">
          <div className="field-group req"><label className="label">氏名</label><input className="mw-input" /></div>
          <div className="field-group req"><label className="label">生年月日</label><input className="mw-input" type="date" /></div>
        </div>
        <div className="form-row">
          <div className="field-group req"><label className="label">電話番号</label><input className="mw-input" type="tel" placeholder="090-1234-5678" /></div>
          <div className="field-group req"><label className="label">住所</label><input className="mw-input" placeholder="東京都渋谷区…" /></div>
        </div>
        <div className="signup-note">
          <span className="ico">✉</span>
          <span>登録後、入力したメールアドレス宛に確認メールをお送りします。メール内のリンクで認証を完了してください。</span>
        </div>
        <div className="signup-note alt">
          希望職種・経験年数などは登録後、マイページから任意で設定できます。
        </div>
        <label className="filter-opt" style={{ marginTop: 10 }}>
          <input type="checkbox" defaultChecked />
          <span style={{ fontSize: 12, color: 'var(--mw-lightgray)' }}>利用規約・プライバシーポリシーに同意する</span>
        </label>
        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }} onClick={() => nav('SCR-008')}>確認メールを送信して登録 ↗</button>
        <div style={{ textAlign: 'center', color: 'var(--mw-gray)', fontSize: 11, margin: '16px 0' }}>— OR —</div>
        <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>Googleで登録</button>
      </div>
    </div>
  );
}

// ============ PASSWORD RESET ============
function PasswordResetPage({ nav }) {
  const [sent, setSent] = useStatePS(false);
  return (
    <div style={{ minHeight: 'calc(100vh - 42px)', display: 'grid', placeItems: 'center', padding: 40 }}>
      <div style={{ width: 420 }}>
        <div className="eyebrow" style={{ textAlign: 'center' }}>Password Reset</div>
        <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, textAlign: 'center', margin: '4px 0 24px', fontWeight: 400, letterSpacing: '0.02em' }}>パスワード再設定</h1>
        <div className="form-card">
          {!sent ? (
            <div>
              <p style={{ fontSize: 13, color: 'var(--mw-lightgray)', marginBottom: 18, fontFamily: 'var(--ff-jp)', lineHeight: 1.8 }}>
                登録済みのメールアドレスを入力してください。再設定用のリンクをお送りします。
              </p>
              <div className="field-group"><label className="label">メール</label><input className="mw-input" defaultValue="haruto@example.com" /></div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSent(true)}>リセットメールを送信 ↗</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--mw-red)', color: '#fff', display: 'grid', placeItems: 'center', margin: '0 auto 16px', fontSize: 24 }}>✉</div>
              <div style={{ fontWeight: 700, marginBottom: 8, color: 'var(--mw-white)' }}>メールを送信しました</div>
              <p style={{ fontSize: 12, color: 'var(--mw-lightgray)', lineHeight: 1.8, fontFamily: 'var(--ff-jp)' }}>
                haruto@example.com 宛にリセットリンクを送りました。<br />
                リンクの有効期限は30分です。
              </p>
              <button className="btn-ghost mt-3" onClick={() => nav('SCR-007')} style={{ marginTop: 16 }}>ログインへ戻る</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ COMPANY PAGE (SCR-009) ============
function CompanyPage({ nav }) {
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
            {window.MW_DATA.jobs.filter(j => j.co.includes('rockin')).map(j => <JobCard key={j.id} job={j} nav={nav} />)}
          </div>
        </section>
      </div>
    </div>
  );
}

// ============ COMPANY LP (SCR-010) ============
function CompanyLP({ nav }) {
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
          {[
            { name: 'BASIC', price: '¥50,000', per: '/ 30日', ja: '初めての掲載に', features: ['求人1枠', '基本情報表示', 'メール通知'] },
            { name: 'STANDARD', price: '¥150,000', per: '/ 30日', ja: '継続採用に', features: ['求人3枠', '企業ページ掲載', 'アナリティクス', '注目求人枠ランダム'], featured: true },
            { name: 'ENTERPRISE', price: 'ASK', per: '', ja: '大規模採用に', features: ['求人無制限', '専属サポート', 'カスタムLP', '独占バナー枠'] },
          ].map(p => (
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

// ============ FAVORITES (SCR-011) ============
function FavoritesPage({ nav }) {
  return (
    <div style={{ padding: '32px 28px', maxWidth: 1200 }}>
      <div className="eyebrow">Saved Jobs</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0 24px', fontWeight: 400, letterSpacing: '0.02em' }}>お気に入り一覧</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {window.MW_DATA.jobs.slice(0, 6).map(j => <JobCard key={j.id} job={{...j, fav: true}} nav={nav} />)}
      </div>
    </div>
  );
}

// ============ COLUMN (SCR-013) ============
function ColumnPage({ nav }) {
  return (
    <div style={{ padding: '32px 28px', maxWidth: 1100 }}>
      <div className="eyebrow">Column & Interview</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 56, margin: '4px 0 4px', fontWeight: 400, letterSpacing: '0.02em' }}>COLUMN</h1>
      <p className="h-sub">音楽業界で働く人の声と、業界の最新動向。</p>

      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {['All', 'Career', 'Industry', 'Interview', 'Tips'].map((c, i) => (
          <button key={c} className={i === 0 ? "jobmgmt-tab active" : "jobmgmt-tab"}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {[
          { cat: 'Career', title: '音楽プロデューサーになるには：現役A&Rが語るリアル', date: '2026.04.18', excerpt: '新人発掘からアルバム制作まで、A&Rの仕事の全貌を第一線で働く3人が語る...' },
          { cat: 'Industry', title: 'ライブエンタメ市場は2030年までに2倍—最新動向', date: '2026.04.15', excerpt: 'コロナ禍を経て急回復するライブ市場。新たに生まれる職種と必要なスキル...' },
          { cat: 'Interview', title: '独立した3人のマネージャーが語るキャリアの分岐点', date: '2026.04.10', excerpt: '大手から独立、自分のマネジメント会社を立ち上げた3人に、キャリアの転機を聞いた...' },
          { cat: 'Tips', title: '音楽業界の職務経歴書：書くべきポイント10選', date: '2026.04.03', excerpt: '一般的な職務経歴書とは違う、音楽業界で評価される書き方とは...' },
        ].map((c, i) => (
          <div key={i} className="column-item" style={{ background: 'var(--mw-surface)', border: '0.5px solid var(--mw-border)', borderRadius: 12, padding: 24 }}>
            <div className="cat">{c.cat}</div>
            <h4 style={{ fontFamily: 'var(--ff-sans)', fontSize: 18, margin: '10px 0 10px', fontWeight: 700, color: 'var(--mw-white)', lineHeight: 1.4 }}>{c.title}</h4>
            <p style={{ fontSize: 12, color: 'var(--mw-lightgray)', lineHeight: 1.7, fontFamily: 'var(--ff-jp)' }}>{c.excerpt}</p>
            <div className="date mt-2">{c.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ SIMPLE GENERIC (News / Static) ============
function NewsPage({ nav }) {
  return (
    <div style={{ padding: '32px 28px', maxWidth: 900 }}>
      <div className="eyebrow">Notice</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 48, margin: '4px 0 24px', fontWeight: 400, letterSpacing: '0.02em' }}>お知らせ</h1>
      {[
        { date: '2026.04.19', label: 'アップデート', title: '職種カテゴリに「サウンドデザイナー」を追加しました' },
        { date: '2026.04.15', label: 'メンテナンス', title: '4/22 深夜2:00-4:00 に定期メンテナンスを実施します' },
        { date: '2026.04.10', label: 'お知らせ', title: '応募フォームのファイル上限を10MBに拡大しました' },
        { date: '2026.03.28', label: 'キャンペーン', title: '企業向け春の掲載キャンペーン開始' },
      ].map((n, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 120px 1fr', gap: 20, padding: '18px 0', borderBottom: '0.5px solid var(--mw-border)', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 12, color: 'var(--mw-gray)' }}>{n.date}</div>
          <span className="badge badge-white" style={{ justifySelf: 'start' }}>{n.label}</span>
          <div style={{ color: 'var(--mw-white)', fontSize: 14, fontFamily: 'var(--ff-jp)' }}>{n.title}</div>
        </div>
      ))}
    </div>
  );
}

function StaticPage({ nav }) {
  const [tab, setTab] = useStatePS('faq');
  const [who, setWho] = useStatePS('user');
  const tabs = [['terms', '利用規約'], ['privacy', 'プライバシー'], ['faq', 'FAQ'], ['contact', 'お問い合わせ']];
  return (
    <div style={{ padding: '32px 28px', maxWidth: 900 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {tabs.map(([key, label]) => (
          <button key={key} className={tab === key ? "jobmgmt-tab active" : "jobmgmt-tab"} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {tab === 'faq' && (
        <div>
          <div className="eyebrow">FAQ</div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 48, margin: '4px 0 24px', fontWeight: 400, letterSpacing: '0.02em' }}>よくある質問</h1>
          {[
            ['登録は無料ですか？', '会員登録・利用はすべて無料です。求職者の方は一切費用はかかりません。'],
            ['非公開で応募できますか？', '現職の企業に応募情報が伝わることはありません。企業側には応募時にのみ情報が開示されます。'],
            ['海外からの応募は可能ですか？', 'リモート可の求人については海外からのご応募も受け付けています。'],
            ['プロフィール情報は安全に管理されますか？', 'SSL暗号化通信、アクセス制限、定期的なセキュリティ監査を実施しています。'],
          ].map(([q, a], i) => (
            <div key={i} className="form-card" style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--mw-white)', marginBottom: 8 }}>Q. {q}</div>
              <div style={{ fontSize: 13, color: 'var(--mw-lightgray)', fontFamily: 'var(--ff-jp)', lineHeight: 1.8 }}>A. {a}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'contact' && (
        <div>
          <div className="eyebrow">Contact</div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 48, margin: '4px 0 8px', fontWeight: 400, letterSpacing: '0.02em' }}>お問い合わせ</h1>
          <p className="h-sub" style={{ marginBottom: 20 }}>お問い合わせの種別を選択してください。企業の方とユーザーの方でフォームが分かれています。</p>

          <div className="contact-switch">
            <button className={who === 'user' ? 'active' : ''} onClick={() => setWho('user')}>ユーザーの方</button>
            <button className={who === 'company' ? 'active' : ''} onClick={() => setWho('company')}>企業の方</button>
          </div>

          {who === 'user' ? (
            <div className="form-card" style={{ marginTop: 16 }}>
              <div className="contact-lead">求人・応募・会員登録など、サービスのご利用に関するお問い合わせ</div>
              <div className="form-row">
                <div className="field-group req"><label className="label">お名前</label><input className="mw-input" /></div>
                <div className="field-group req"><label className="label">メールアドレス</label><input className="mw-input" type="email" /></div>
              </div>
              <div className="field-group"><label className="label">お問い合わせ種別</label>
                <select className="mw-input"><option>応募・選考について</option><option>会員登録・ログイン</option><option>退会について</option><option>その他</option></select>
              </div>
              <div className="field-group req"><label className="label">お問い合わせ内容</label><textarea className="mw-textarea" rows="5"></textarea></div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>送信する ↗</button>
            </div>
          ) : (
            <div className="form-card" style={{ marginTop: 16 }}>
              <div className="contact-lead">求人掲載・プラン・お見積りなど、掲載をご検討の企業さま向け</div>
              <div className="form-row">
                <div className="field-group req"><label className="label">会社名</label><input className="mw-input" /></div>
                <div className="field-group req"><label className="label">ご担当者名</label><input className="mw-input" /></div>
              </div>
              <div className="form-row">
                <div className="field-group req"><label className="label">メールアドレス</label><input className="mw-input" type="email" /></div>
                <div className="field-group"><label className="label">電話番号</label><input className="mw-input" type="tel" /></div>
              </div>
              <div className="field-group"><label className="label">お問い合わせ種別</label>
                <select className="mw-input"><option>掲載プラン・お見積り</option><option>掲載の流れについて</option><option>請求・契約について</option><option>その他</option></select>
              </div>
              <div className="field-group req"><label className="label">お問い合わせ内容</label><textarea className="mw-textarea" rows="5"></textarea></div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>送信する ↗</button>
            </div>
          )}
        </div>
      )}

      {(tab === 'terms' || tab === 'privacy') && (
        <div>
          <div className="eyebrow">{tab === 'terms' ? 'Terms' : 'Privacy'}</div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 48, margin: '4px 0 24px', fontWeight: 400, letterSpacing: '0.02em' }}>{tab === 'terms' ? '利用規約' : 'プライバシーポリシー'}</h1>
          <div className="form-card">
            <p style={{ fontSize: 13, color: 'var(--mw-lightgray)', fontFamily: 'var(--ff-jp)', lineHeight: 1.9 }}>
              {tab === 'terms'
                ? '本規約は、Discovery（presented by rockin\'on）が提供するサービスの利用条件を定めるものです。会員は本規約に同意のうえサービスを利用するものとします。（本文はプレースホルダーです）'
                : '当社は、取得した個人情報を法令およびプライバシーポリシーに従って適切に管理します。会員管理画面へのアクセスは限定された環境からのみ許可されます。（本文はプレースホルダーです）'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { LoginPage, SignupPage, PasswordResetPage, CompanyPage, CompanyLP, FavoritesPage, ColumnPage, NewsPage, StaticPage });
