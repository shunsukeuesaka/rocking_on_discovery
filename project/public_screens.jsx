// ro_discovery — Public screens
const { useState } = React;

// ============ TOP PAGE ============
function TopPage({ nav }) {
  const data = window.MW_DATA;
  const newJobs = [...data.jobs].sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
  return (
    <div>
      <section className="top-band">
        <div className="top-band-head">
          <div className="eyebrow">Music Industry Career Platform</div>
          <h1 className="h-display">音楽の仕事を、探す。</h1>
          <p className="top-band-sub">
            レーベル・ライブ・レコーディング・マネジメント——音楽業界に特化した求人を、職種・勤務地・キーワードから探せます。
          </p>
        </div>
        <div className="top-search">
          <div className="field">
            <label>CATEGORY</label>
            <select defaultValue="all">
              <option value="all">すべての職種</option>
              {data.categories.map(c => <option key={c.en}>{c.ja}</option>)}
            </select>
          </div>
          <div className="field">
            <label>KEYWORD</label>
            <input placeholder="例: A&R、ライブ、ProTools、渋谷" />
          </div>
          <div className="field">
            <label>LOCATION</label>
            <select>
              <option>全国</option><option>東京</option><option>大阪</option><option>リモート可</option>
            </select>
          </div>
          <button className="btn-primary" onClick={() => nav('SCR-002')}>SEARCH ↗</button>
        </div>
      </section>

      <section className="featured-section">
        <div className="featured-header">
          <div>
            <div className="eyebrow">New Arrivals</div>
            <h2 className="h-display" style={{ fontSize: 48 }}>新着の求人</h2>
          </div>
          <button className="btn-ghost" onClick={() => nav('SCR-002')}>求人一覧へ →</button>
        </div>
        <div className="featured-grid">
          {newJobs.slice(0, 6).map(j => <JobCard key={j.id} job={j} nav={nav} />)}
        </div>
      </section>

      <section className="cat-rail">
        <div className="cat-rail-head">
          <div>
            <div className="eyebrow">Browse by Category</div>
            <h2 className="h-display" style={{ fontSize: 48 }}>職種から探す</h2>
          </div>
          <button className="btn-ghost" onClick={() => nav('SCR-002')}>すべて見る →</button>
        </div>
        <div className="cat-grid">
          {data.categories.map(c => (
            <div key={c.en} className="cat-cell" onClick={() => nav('SCR-002')}>
              <div className="ico">{c.icon}</div>
              <div className="name-en">{c.en}</div>
              <div className="name">{c.ja}</div>
              <div className="count">{c.count} openings</div>
              <div className="arr">→</div>
            </div>
          ))}
        </div>
      </section>

      <section className="company-cta">
        <div className="box">
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="eyebrow">For Company</div>
            <h2>音楽業界の<br />人材に届く<em style={{ color: 'var(--mw-red)', fontStyle: 'normal' }}>。</em></h2>
            <p>
              Discoveryは業界に特化した求人プラットフォーム。
              熱量の高い求職者に、あなたの会社のストーリーを届けます。
            </p>
          </div>
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn-primary" onClick={() => nav('SCR-010')}>掲載プランを見る ↗</button>
            <button className="btn-secondary" onClick={() => nav('SCR-010')}>お問い合わせ</button>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <div className="f-logo">Discovery<span className="r">.</span> <span className="by">presented by rockin'on</span></div>
          <p style={{ marginTop: 10, color: 'var(--mw-gray)', fontSize: 11, maxWidth: 280, fontFamily: 'var(--ff-jp)' }}>
            音楽を仕事にする人のためのキャリアプラットフォーム。
            rockin'on inc. が運営しています。
          </p>
        </div>
        <div>
          <div className="ft-title">FOR MEMBER</div>
          <ul><li>会員登録</li><li>ログイン</li><li>マイページ</li></ul>
        </div>
        <div>
          <div className="ft-title">FOR COMPANY</div>
          <ul><li>掲載プラン</li><li>お問い合わせ</li><li>企業ログイン</li></ul>
        </div>
        <div>
          <div className="ft-title">ABOUT</div>
          <ul><li>Discoveryとは</li><li>利用規約</li><li>プライバシー</li><li>FAQ</li></ul>
        </div>
      </footer>
    </div>
  );
}

function JobCard({ job, nav }) {
  const [fav, setFav] = useState(job.fav);
  return (
    <div className="job-card" onClick={() => nav('SCR-003', { job })}>
      <div className="job-card-thumb" onClick={e => e.stopPropagation()}>
        <image-slot id={"thumb-" + job.id} shape="rect" placeholder="求人画像" style={{ display: 'block', width: '100%', height: '100%' }}></image-slot>
        {job.new && <span className="badge badge-red thumb-new">NEW</span>}
      </div>
      <div className="top-row">
        <div className="co">
          <div className="logo">{job.coLogo}</div>
          <span>{job.co}</span>
        </div>
        <button className={"fav" + (fav ? " on" : "")} onClick={e => { e.stopPropagation(); setFav(!fav); }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className="job-card-cat">{job.cat}</div>
      <h3>{job.title}</h3>
      {job.desc && <p className="job-card-desc">{job.desc}</p>}
      <div className="tags">
        <span className="badge badge-white">{job.emp}</span>
        {job.tags.slice(0, 2).map(t => <span key={t} className="tag">{t}</span>)}
      </div>
      <div className="bottom">
        <div>
          <div className="salary">{job.salary.split('〜')[0].replace('万円', '')}<span className="unit">〜 {job.salary.includes('〜') ? job.salary.split('〜')[1] : ''}</span></div>
          <div className="loc">{job.loc}</div>
        </div>
        <button className="icon-btn" style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--mw-red)', color: '#fff' }}>→</button>
      </div>
    </div>
  );
}

// ============ SEARCH PAGE ============
function SearchPage({ nav }) {
  const data = window.MW_DATA;
  const [sort, setSort] = useState('new');
  return (
    <div className="search-layout">
      <aside className="search-filters">
        <div className="filter-block">
          <h4>KEYWORD</h4>
          <input className="mw-input" placeholder="キーワード検索" />
        </div>
        <div className="filter-block">
          <h4>職種カテゴリ</h4>
          {data.categories.slice(0, 6).map(c => (
            <label key={c.en} className="filter-opt">
              <input type="checkbox" defaultChecked={c.en === 'A&R'} /> {c.ja} <span className="n">{c.count}</span>
            </label>
          ))}
        </div>
        <div className="filter-block">
          <h4>雇用形態</h4>
          {['正社員', '契約社員', '業務委託', 'アルバイト'].map(x => (
            <label key={x} className="filter-opt"><input type="checkbox" /> {x}</label>
          ))}
        </div>
        <div className="filter-block">
          <h4>勤務地</h4>
          {['東京', '大阪', '名古屋', 'リモート可'].map(x => (
            <label key={x} className="filter-opt"><input type="checkbox" /> {x}</label>
          ))}
        </div>
        <div className="filter-block">
          <h4>年収下限</h4>
          <input type="range" min="300" max="1200" defaultValue="500" style={{ width: '100%', accentColor: 'var(--mw-red)' }} />
          <div className="flex-between" style={{ fontSize: 11, color: 'var(--mw-gray)', fontFamily: 'var(--ff-mono)' }}>
            <span>300万円</span><span style={{ color: 'var(--mw-white)' }}>500万円〜</span><span>1200万円</span>
          </div>
        </div>
      </aside>
      <div className="search-results">
        <div className="search-head">
          <div>
            <div className="eyebrow">Search Results</div>
            <h2>A&R・プロデュース</h2>
            <div className="count">{data.jobs.length} 件 · 新着 3 件</div>
          </div>
          <div className="tools">
            <select className="mw-input" style={{ width: 'auto' }} value={sort} onChange={e => setSort(e.target.value)}>
              <option value="new">新着順</option>
              <option value="salary">年収高い順</option>
              <option value="popular">人気順</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          <span className="badge badge-red">A&R・プロデュース ×</span>
          <span className="badge badge-white">500万円〜 ×</span>
          <button className="btn-ghost btn-sm">条件をクリア</button>
        </div>

        {data.jobs.map(j => (
          <div key={j.id} className="job-row" onClick={() => nav('SCR-003', { job: j })}>
            <div className="job-row-thumb" onClick={e => e.stopPropagation()}>
              <image-slot id={"thumb-" + j.id} shape="rect" placeholder="画像" style={{ display: 'block', width: '100%', height: '100%' }}></image-slot>
            </div>
            <div>
              <div className="meta-top">
                {j.new && <span className="badge badge-red">NEW</span>}
                <span>{j.co}</span>
                <span>·</span>
                <span>{j.cat}</span>
                <span>·</span>
                <span>{j.posted}</span>
              </div>
              <h3>{j.title}</h3>
              {j.desc && <p className="job-row-desc">{j.desc}</p>}
              <div className="tags">
                <span className="badge badge-white">{j.emp}</span>
                {j.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div className="right">
              <div className="salary">{j.salary}</div>
              <div className="loc">📍 {j.loc}</div>
            </div>
          </div>
        ))}

        <div className="pagination">
          <button>←</button>
          <button className="on">1</button>
          <button>2</button>
          <button>3</button>
          <button>…</button>
          <button>12</button>
          <button>→</button>
        </div>
      </div>
    </div>
  );
}

// ============ JOB DETAIL ============
function JobDetail({ nav, job }) {
  const j = job || window.MW_DATA.jobs[0];
  const [fav, setFav] = useState(j.fav);
  return (
    <div className="detail">
      <div>
        <div className="breadcrumb">HOME / 求人一覧 / {j.cat} / {j.id}</div>
        <div className="flex-between flex-gap-sm" style={{ flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {j.new && <span className="badge badge-red">NEW</span>}
            <span className="badge badge-white">{j.emp}</span>
            <span className="badge badge-gray">{j.cat}</span>
          </div>
        </div>
        <h1>{j.title}</h1>

        <div className="revision-note">
          <span className="ico">●</span>
          <span>2026.05.10 — 給与・募集要項の一部を修正しました</span>
        </div>

        <div className="co-strip">
          <div className="logo">{j.coLogo}</div>
          <div style={{ flex: 1 }}>
            <div className="co-name">{j.co}</div>
            <div className="co-sub">音楽メディア事業 · 設立 1972 · 従業員 280名</div>
          </div>
          <button className="btn-ghost btn-sm" onClick={() => nav('SCR-009')}>企業詳細 →</button>
        </div>

        <div className="job-detail-visual" onClick={e => e.stopPropagation()}>
          <image-slot id={"thumb-" + j.id} shape="rect" placeholder="求人のキービジュアル（後で差し替え）" style={{ display: 'block', width: '100%', height: '100%' }}></image-slot>
        </div>

        <section>
          <h3>概要</h3>
          <p>{j.desc} 既存アーティストの作品制作と並行し、新人発掘からデビューまでを一貫して担当いただくポジションです。</p>
        </section>

        <section>
          <h3>募集要項</h3>
          <div className="detail-meta-grid">
            <div className="cell"><div className="k">職種カテゴリ</div><div className="v">{j.cat}</div></div>
            <div className="cell"><div className="k">雇用形態</div><div className="v">{j.emp}</div></div>
            <div className="cell"><div className="k">勤務地</div><div className="v">{j.loc}</div></div>
            <div className="cell"><div className="k">給与</div><div className="v">{j.salary}</div></div>
            <div className="cell"><div className="k">掲載日</div><div className="v">{j.posted}</div></div>
            <div className="cell"><div className="k">応募締切</div><div className="v">2026.05.31</div></div>
          </div>
        </section>

        <section>
          <h3>仕事内容</h3>
          <ul>
            <li>新人アーティストの発掘・契約交渉</li>
            <li>作品制作全般のプロデュース（ディレクション・進行管理・予算管理）</li>
            <li>プロモーション戦略の立案と実行、レーベル内外のチームとの連携</li>
            <li>ライブ・フェス出演の企画提案</li>
          </ul>
        </section>

        <section>
          <h3>応募要件</h3>
          <ul>
            <li>音楽業界での制作・A&R実務経験 3年以上</li>
            <li>レーベル・マネジメント会社・制作プロダクションでの実務経験</li>
            <li>アーティスト・クリエイターとの信頼関係を築けるコミュニケーション能力</li>
          </ul>
          <h3 style={{ marginTop: 24 }}>歓迎要件</h3>
          <ul>
            <li>海外レーベル・アーティストとのネットワーク</li>
            <li>ライブ制作・フェスティバル運営経験</li>
          </ul>
        </section>

        <section>
          <h3>この企業の他の求人</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {(() => {
              const same = window.MW_DATA.jobs.filter(x => x.co === j.co && x.id !== j.id);
              const list = same.length ? same : window.MW_DATA.jobs.filter(x => x.id !== j.id).slice(0, 2);
              return list.slice(0, 2).map(jj => (
                <div key={jj.id} className="same-co-card" onClick={() => nav('SCR-003', { job: jj })}>
                  <div className="meta">{jj.cat} · {jj.emp}</div>
                  <h3>{jj.title}</h3>
                  <div className="salary">{jj.salary}</div>
                </div>
              ));
            })()}
          </div>
          <div className="same-co-note">※ 同一企業が掲載している他の求人を表示しています</div>
        </section>
      </div>

      <aside className="apply-rail">
        <div className="apply-box">
          <div className="salary-sub">想定年収</div>
          <div className="salary-big">{j.salary}</div>
          <div className="salary-sub" style={{ marginTop: 18 }}>— 勤務地</div>
          <div style={{ color: 'var(--mw-white)', fontWeight: 700, marginBottom: 20 }}>{j.loc}</div>
          {j.applyType === 'external' ? (
            <>
              <button className="btn-primary" onClick={() => nav('SCR-004', { job: j })}>応募ページへ（外部サイト）↗</button>
              <div className="apply-ext-note">この求人は企業の採用サイトで受け付けています</div>
            </>
          ) : (
            <button className="btn-primary" onClick={() => nav('SCR-004', { job: j })}>この求人に応募する ↗</button>
          )}
          <button className="btn-secondary" onClick={() => setFav(!fav)}>
            {fav ? '♥ お気に入り登録済' : '♡ お気に入りに追加'}
          </button>
        </div>

        <div className="apply-box" style={{ marginTop: 12 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mw-red)', fontWeight: 700, marginBottom: 10 }}>— 企業について</div>
          <div style={{ fontWeight: 700, marginBottom: 4, color: 'var(--mw-white)' }}>{j.co}</div>
          <p style={{ fontSize: 12, color: 'var(--mw-lightgray)', lineHeight: 1.7, fontFamily: 'var(--ff-jp)' }}>
            1972年創業の総合音楽メディア。雑誌「ROCKIN'ON」「音楽と人」「JAPAN」を発行、フェス運営も手がける。
          </p>
          <button className="btn-ghost btn-sm mt-2" onClick={() => nav('SCR-009')}>企業ページへ →</button>
        </div>
      </aside>
    </div>
  );
}

// ============ APPLY FORM ============
function ApplyPage({ nav, job }) {
  const j = job || window.MW_DATA.jobs[0];
  const [step, setStep] = useState(0);
  const [proceed, setProceed] = useState(false);
  const steps = ['基本情報', '書類アップロード', '確認・送信'];

  // 外部サイト応募の求人
  if (j.applyType === 'external') {
    return (
      <div className="apply-page">
        <div className="eyebrow">External Application</div>
        <h1>外部サイトで応募</h1>
        <p className="lede">{j.co} — {j.title}</p>
        <div className="gate-card">
          <div className="gate-ico">↗</div>
          <h2>この求人は企業の採用サイトで受け付けています</h2>
          <p>応募は {j.co} の採用フォームで行います。下のボタンから外部サイトへ移動してください。当サイトの会員登録は不要です。</p>
          <div className="gate-actions">
            <button className="btn-primary" onClick={() => nav('SCR-005', { job: j })}>採用サイトへ移動 ↗</button>
            <button className="btn-ghost" onClick={() => nav('SCR-003', { job: j })}>← 求人詳細へ戻る</button>
          </div>
          <div className="gate-url">{j.applyUrl}</div>
        </div>
      </div>
    );
  }

  // サイト内応募 → 会員必須ゲート
  if (!proceed) {
    return (
      <div className="apply-page">
        <div className="eyebrow">Apply to {j.id}</div>
        <h1>応募フォーム</h1>
        <p className="lede">{j.co} — {j.title}</p>
        <div className="gate-card">
          <div className="gate-ico">🔒</div>
          <h2>当サイトからの応募には会員登録が必要です</h2>
          <p>応募状況の管理・お気に入り・新着通知のため、サイト内応募は会員限定です。ログインまたは会員登録のうえ応募にお進みください。</p>
          <div className="gate-actions">
            <button className="btn-primary" onClick={() => nav('SCR-006')}>会員登録して応募 ↗</button>
            <button className="btn-secondary" onClick={() => nav('SCR-007')}>ログイン</button>
          </div>
          <button className="gate-demo" onClick={() => setProceed(true)}>（デモ）ログイン済みとして続ける →</button>
        </div>
      </div>
    );
  }

  return (
    <div className="apply-page">
      <div className="eyebrow">Apply to {j.id}</div>
      <h1>応募フォーム</h1>
      <p className="lede">{j.co} — {j.title}</p>

      <div className="wiz-steps">
        {steps.map((s, i) => (
          <div key={i} className={"wiz-step" + (i === step ? " active" : "") + (i < step ? " done" : "")}>
            <div className="num">{i < step ? "✓" : i + 1}</div>
            <div className="lbl">{s}</div>
          </div>
        ))}
      </div>

      <div className="autofill-banner">
        <span className="ico">●</span>
        <span>会員情報から自動入力しています。必要に応じて修正してください。</span>
      </div>

      <div className="form-card">
        {step === 0 && (
          <div>
            <div className="form-row">
              <div className="field-group req"><label className="label">氏名</label><input className="mw-input" defaultValue="佐藤 陽翔" /></div>
              <div className="field-group"><label className="label">フリガナ</label><input className="mw-input" defaultValue="サトウ ハルト" /></div>
            </div>
            <div className="form-row">
              <div className="field-group req"><label className="label">メール</label><input className="mw-input" defaultValue="haruto.sato@example.com" /></div>
              <div className="field-group req"><label className="label">電話</label><input className="mw-input" defaultValue="090-1234-5678" /></div>
            </div>
            <div className="form-row">
              <div className="field-group"><label className="label">生年月日</label><input className="mw-input" defaultValue="1998-05-12" /></div>
              <div className="field-group"><label className="label">現住所</label><input className="mw-input" defaultValue="東京都渋谷区" /></div>
            </div>
            <div className="field-group req">
              <label className="label">志望動機</label>
              <textarea className="mw-textarea" rows="5" defaultValue="rockin'on が手がけるフェスに学生時代から足を運び..." />
            </div>
            <div className="field-group">
              <label className="label">自己PR</label>
              <textarea className="mw-textarea" rows="4" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="field-group req">
              <label className="label">履歴書</label>
              <div className="uploader">
                <div className="dz-title">📄 クリックまたはドラッグで追加</div>
                <div className="dz-sub">PDF / Word / 画像 (最大 5MB)</div>
              </div>
            </div>
            <div className="field-group">
              <label className="label">職務経歴書</label>
              <div className="uploader">
                <div className="dz-title">📑 クリックまたはドラッグで追加</div>
                <div className="dz-sub">PDF / Word / 画像 (最大 5MB)</div>
              </div>
            </div>
            <div className="field-group">
              <label className="label">ポートフォリオ URL（任意）</label>
              <input className="mw-input" placeholder="https://" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ fontSize: 13, color: 'var(--mw-lightgray)', lineHeight: 1.8, fontFamily: 'var(--ff-jp)' }}>
              <h4 style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 10 }}>— 応募内容の確認</h4>
              <div className="detail-meta-grid">
                <div className="cell"><div className="k">氏名</div><div className="v">佐藤 陽翔</div></div>
                <div className="cell"><div className="k">メール</div><div className="v">haruto.sato@example.com</div></div>
                <div className="cell"><div className="k">電話</div><div className="v">090-1234-5678</div></div>
                <div className="cell"><div className="k">応募先</div><div className="v">{j.title}</div></div>
              </div>
              <p style={{ marginTop: 16 }}>送信ボタンを押すと、{j.co} に応募情報が送信されます。登録メールアドレス宛に応募受付確認メールが届きます。</p>
            </div>
          </div>
        )}
      </div>

      <div className="form-actions">
        <button className="btn-ghost" onClick={() => step > 0 ? setStep(step - 1) : nav('SCR-003', { job: j })}>
          ← 戻る
        </button>
        {step < 2 ? (
          <button className="btn-primary" onClick={() => setStep(step + 1)}>次へ ↗</button>
        ) : (
          <button className="btn-primary" onClick={() => nav('SCR-005', { job: j })}>応募を送信する ↗</button>
        )}
      </div>
    </div>
  );
}

// ============ APPLY DONE ============
function ApplyDone({ nav }) {
  return (
    <div className="thanks">
      <div className="inner">
        <div className="mark">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="eyebrow">Application Received</div>
        <h1>THANK YOU.<br />応募ありがとうございます。</h1>
        <p>
          応募内容を受け付けました。登録メールアドレスに確認メールを送信しています。<br />
          企業担当者より書類選考のご連絡をお待ちください。
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="btn-primary" onClick={() => nav('SCR-006')}>会員登録して応募を管理 ↗</button>
          <button className="btn-secondary" onClick={() => nav('SCR-001')}>トップへ戻る</button>
        </div>

        <div className="box">
          <div style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>— Next Steps</div>
          <ul style={{ paddingLeft: 18, color: 'var(--mw-lightgray)', fontSize: 13, lineHeight: 2, fontFamily: 'var(--ff-jp)' }}>
            <li>確認メールを受信箱でご確認ください（届かない場合は迷惑メールフォルダも）</li>
            <li>書類選考の結果は7営業日以内にご連絡します</li>
            <li>会員登録すると応募状況をマイページで確認できます</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============ MY PAGE ============
function MyPage({ nav }) {
  const [tab, setTab] = useState('history');
  return (
    <div className="mypage">
      <div className="mypage-header">
        <div className="avatar">H</div>
        <div>
          <h1>佐藤 陽翔</h1>
          <div className="sub">MEMBER SINCE 2025.11 · HARUTO.SATO@EXAMPLE.COM</div>
        </div>
        <button className="btn-ghost">プロフィール編集</button>
      </div>

      <div className="stat-row">
        <div className="stat-card"><div className="k">応募した求人</div><div className="v">3</div><div className="delta">掲載終了 1 件を含む</div></div>
        <div className="stat-card"><div className="k">お気に入り</div><div className="v">12</div><div className="delta">+3 this week</div></div>
        <div className="stat-card"><div className="k">閲覧履歴</div><div className="v">48</div><div className="delta">過去30日</div></div>
        <div className="stat-card"><div className="k">プロフィール完成度</div><div className="v">82<span style={{ fontSize: 16, color: 'var(--mw-gray)', fontFamily: 'var(--ff-sans)' }}>%</span></div><div className="delta down">書類UPで完成</div></div>
      </div>

      <div className="tabs">
        {['history', 'favorites', 'profile', 'notify'].map(t => (
          <div key={t} className={"tab" + (tab === t ? " active" : "")} onClick={() => setTab(t)}>
            {({ history: '応募履歴', favorites: 'お気に入り', profile: 'プロフィール', notify: '通知設定' })[t]}
          </div>
        ))}
      </div>

      {tab === 'history' && (
        <div>
          <div className="history-note">応募状況の進捗（書類選考・面接など）はマイページでは管理していません。選考のご連絡は企業から直接届きます。掲載終了後も応募・お気に入りした求人はここから確認できます。</div>
          {[
            { co: 'R', coName: 'rockin\'on inc.', title: 'A&Rディレクター', status: 'active', label: '応募済み', date: '2026.04.12' },
            { co: 'S', coName: 'Sound Stage Tokyo', title: 'ライブプロダクション マネージャー', status: 'active', label: '応募済み', date: '2026.04.10' },
            { co: 'N', coName: 'Night Owl Fest', title: 'フェスブッキング担当', status: 'closed', label: '掲載終了', date: '2026.03.28' },
          ].map((h, i) => (
            <div key={i} className="history-row">
              <div className="co-logo">{h.co}</div>
              <div>
                <h4>{h.title}</h4>
                <div className="sub">{h.coName}</div>
              </div>
              <div><span className={"status-pill " + h.status}>{h.label}</span></div>
              <div className="date">{h.date}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'favorites' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {window.MW_DATA.jobs.slice(0, 6).map(j => <JobCard key={j.id} job={{...j, fav: true}} nav={nav} />)}
        </div>
      )}

      {tab === 'profile' && (
        <div className="form-card" style={{ maxWidth: 720 }}>
          <div className="form-row">
            <div className="field-group"><label className="label">氏名</label><input className="mw-input" defaultValue="佐藤 陽翔" /></div>
            <div className="field-group"><label className="label">年齢</label><input className="mw-input" defaultValue="28" /></div>
          </div>
          <div className="field-group"><label className="label">希望職種</label><input className="mw-input" defaultValue="A&R・プロデュース" /></div>
          <div className="field-group"><label className="label">希望勤務地</label><input className="mw-input" defaultValue="東京・リモート可" /></div>
          <div className="field-group"><label className="label">スキル</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['ProTools', 'Logic Pro', 'Ableton', 'A&R実務', 'ライブ制作', 'プロジェクト管理'].map(s => <span key={s} className="tag">{s} ×</span>)}
              <span className="tag" style={{ borderStyle: 'dashed' }}>+ 追加</span>
            </div>
          </div>
          <div className="field-group"><label className="label">自己紹介</label>
            <textarea className="mw-textarea" rows="4" defaultValue="大学時代からレーベル立ち上げに関わり..." />
          </div>
          <button className="btn-primary">変更を保存 ↗</button>
        </div>
      )}

      {tab === 'notify' && (
        <div className="form-card" style={{ maxWidth: 560 }}>
          {[
            ['新着求人のお知らせ', '希望条件にマッチする新着求人を週1回お届け'],
            ['お気に入り求人の期限リマインド', '保存した求人の応募締切が近づいたときに通知'],
            ['フォロー中企業の新着求人', 'フォローした企業が新しい求人を掲載したとき'],
            ['おすすめ求人通知', 'あなたに合った求人レコメンドを月1回お届け'],
          ].map(([t, s], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '0.5px solid var(--mw-border)' }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--mw-white)', fontSize: 13 }}>{t}</div>
                <div style={{ fontSize: 11, color: 'var(--mw-gray)', marginTop: 2 }}>{s}</div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: 40, height: 22 }}>
                <input type="checkbox" defaultChecked={i < 2} style={{ opacity: 0 }} />
                <span style={{ position: 'absolute', inset: 0, background: i < 2 ? 'var(--mw-red)' : 'rgba(255,255,255,0.12)', borderRadius: 11, cursor: 'pointer' }}>
                  <span style={{ position: 'absolute', top: 2, left: i < 2 ? 20 : 2, width: 18, height: 18, background: '#fff', borderRadius: '50%', transition: 'left .2s' }}></span>
                </span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Export
Object.assign(window, { TopPage, SearchPage, JobDetail, ApplyPage, ApplyDone, MyPage, JobCard });
