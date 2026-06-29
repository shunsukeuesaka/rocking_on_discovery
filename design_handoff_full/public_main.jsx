// MusicWork — Public screens
const { useState } = React;

// ============ FIGMA HERO (Music Works — Sample UI Top) ============
function Hero({ nav }) {
  const ref = React.useRef(null);
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const stage = ref.current;if (!stage) return;
    const update = () => setScale(stage.clientWidth / 1440);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(stage);
    window.addEventListener('resize', update);
    return () => {ro.disconnect();window.removeEventListener('resize', update);};
  }, []);

  // Right feature panel — horizontal carousel slides
  const slides = [
  { img: 'assets/hero-concert.jpg', pos: '50% 38%', grain: true, co: 'ソニーミュージックエンタテイメント', role: 'A＆R ディレクター（新人アーティスト発掘）' },
  { img: 'assets/hero-bg.jpg', pos: '50% 50%', grain: false, co: "rockin'on inc.", role: 'フェスプロデューサー（ROCK IN JAPAN FES.）' },
  { img: 'assets/hero-column.jpg', pos: '50% 32%', grain: false, co: 'Grain Pictures', role: 'MV ディレクター（映像演出・編集）' }];

  const [slide, setSlide] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  // Custom cursor ring — follows the mouse across the hero
  const [cur, setCur] = React.useState({ x: 720, y: 560, on: false });
  const onHeroMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setCur({ x: (e.clientX - r.left) / scale, y: (e.clientY - r.top) / scale, on: true });
  };

  return (
    <div className="mwh-stage" ref={ref} style={{ height: 1024 * scale }}>
    <section className="mwh" style={{ transform: `scale(${scale})` }} data-screen-label="HERO"
      onMouseMove={onHeroMove} onMouseLeave={() => setCur((c) => ({ ...c, on: false }))}>
      <div className="mwh-bg"></div>

      {/* Right feature panel — horizontal carousel */}
      <div className="mwh-panel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="mwh-track" style={{ width: 600 * slides.length, transform: `translateX(${-slide * 600}px)` }}>
          {slides.map((s, i) =>
            <div className="mwh-cslide" key={i}>
              <div className="photo" style={{ backgroundImage: `url(${s.img})`, backgroundPosition: s.pos }}></div>
              {s.grain && <div className="grain"></div>}
              <div className="colabel">
                <div className="co">{s.co}</div>
                <div className="role">{s.role}</div>
              </div>
            </div>
            )}
        </div>
        <div className="shade"></div>
        <div className="mwh-watermark"><span className="wm-big">Discovery</span><span className="wm-small">Presented by rockin' on</span></div>
        <button className="mwh-carrow prev" aria-label="前のスライド" onClick={() => setSlide((s) => (s - 1 + slides.length) % slides.length)}>‹</button>
        <button className="mwh-carrow next" aria-label="次のスライド" onClick={() => setSlide((s) => (s + 1) % slides.length)}>›</button>
      </div>

      {/* Decorative magatama */}
      <svg className="mwh-union" width="250" height="372" viewBox="0 0 250 372" fill="rgba(136,136,136,0.2)">
        <path d="M 125 0 C 194.036 0 250 55.964 250 125 C 250 128.077 249.887 131.129 249.668 134.15 C 249.028 157.618 243.172 209.895 207 258 C 129.656 360.859 28.5 372 28.5 372 C 91.318 331.216 115.123 305.001 129.5 250 L 129.578 249.916 C 128.059 249.971 126.533 250 125 250 C 55.964 250 0 194.036 0 125 C 0 55.964 55.964 0 125 0 Z" fillRule="nonzero" />
      </svg>

      {/* Header */}
      <header className="mwh-header">
        <div className="mwh-logo" onClick={() => nav('SCR-001')}><span className="lg-big">Discovery</span><span className="lg-small">Presented by rockin' on</span></div>
        <div className="mwh-search">
          <input placeholder="Search" />
          <button className="go" aria-label="search">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></svg>
          </button>
        </div>
        <div className="right">
          <div className="auth">
            <button className="mwh-btn ghost" onClick={() => nav('SCR-007')} style={{ color: "rgb(255, 255, 255)", opacity: "1" }}>ログイン</button>
            <button className="mwh-btn solid" onClick={() => nav('SCR-006')}>無料登録</button>
          </div>
          <button className="mwh-burger" aria-label="menu" data-comment-anchor="f1dd1e78a6-button-53-11"><span></span><span></span><span></span></button>
        </div>
      </header>

      {/* Headline + lead */}
      <h1 className="mwh-title">音楽を、仕事にする。</h1>
      <p className="mwh-lead">{"rockin'onだから載せられる求人がある\n自分らしく働ける企業とキャリアを本気で繋げるプラットフォーム\n"}それが <span className="lead-brand">Discovery</span> <span className="lead-brand-sm">Presented by rockin' on</span> です</p>

      {/* Custom cursor ring — follows the mouse pointer across the hero */}
      <div className="mwh-viewmore" data-comment-anchor="73de4f555c-div-62-7"
        style={{ left: cur.x - 60, top: cur.y - 60, opacity: cur.on ? 1 : 0 }}>
        <span className="t">View More</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="6 13 12 19 18 13" /></svg>
      </div>

      {/* Red CTA */}
      <button className="mwh-cta" onClick={() => nav('SCR-002')}>
        <svg width="40" height="40" viewBox="0 0 32 32" fill="#fff"><path d="M 0 32 L 0 5.4 L 8 5.4 L 8 18 L 26.1 0 L 32 5.9 L 13.7 24.1 L 26.7 24.1 L 26.7 32 L 0 32 Z" transform="rotate(180 16 16)" /></svg>
        <span className="t">求人を探す</span>
      </button>

      {/* Column card */}
      <div className="mwh-column" onClick={() => nav('SCR-014')}>
        <div className="thumb"><span className="tag">Column</span></div>
        <div className="body">
          <div className="date">2026.01.01</div>
          <h3>エンタメ業界への就職を目指す方へ「採用担当者にききました!」〜(株)ノア〜</h3>
          <p>エンターテイメント業界への就職・転職を目指す方々へ向けた特別連載、「採用担当者にききました!」。＃10は、株式会社ノアです。</p>
        </div>
      </div>

      {/* Carousel status bar */}
      <div className="mwh-progress">
        <i className="w" data-comment-anchor="a25f0c4abb-i-85-9"></i>
        {slides.map((_, i) =>
          <i key={i} className={i === slide ? 'r' : 's'} onClick={() => setSlide(i)}></i>
          )}
      </div>

      {/* Vertical tab */}
      <div className="mwh-tab" onClick={() => nav('SCR-010')} style={{ borderRadius: "7px 0px 0px 8px" }}><span>掲載企業の方はこちら</span></div>
    </section>
    </div>);

}

// ============ TOP PAGE (Discovery editorial redesign) ============
const DP_ARROW = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" y1="12" x2="20" y2="12" /><polyline points="14 6 20 12 14 18" /></svg>;

const PICKUP = [
{ id: 'J-2401', co: '株式会社ロッキン・ライブ', title: 'ライブ制作ディレクター', emp: '正社員', loc: '東京都 渋谷区', tags: ['ライブ制作', 'コンサート', '進行管理'], img: 'assets/us/62bc5486a419ef3a.jpg', ph: 'ライブ照明' },
{ id: 'J-2402', co: '株式会社サウンド・クリエイト', title: 'レコーディングエンジニア', emp: '契約社員', loc: '東京都 渋谷区', tags: ['レコーディング', 'PA/音響', 'ミックス'], img: 'assets/us/a4317f9f7d240dc2.jpg', ph: 'スタジオ卓' },
{ id: 'J-2403', co: 'ロッキン・レコード株式会社', title: 'A&R（邦楽担当）', emp: '正社員', loc: '東京都 渋谷区', tags: ['A&R', 'アーティスト発掘', '契約交渉'], img: 'assets/us/7fefe37856337457.jpg', ph: 'レコード' },
{ id: 'J-2404', co: 'ロッキン・フェスティバル株式会社', title: 'フェス運営スタッフ', emp: '契約社員', loc: '千葉県 千葉市', tags: ['フェス運営', '会場運営', 'イベント'], img: 'assets/us/d9ec9e2bda7be54d.jpg', ph: 'フェス会場' },
{ id: 'J-2405', co: '株式会社ビジュアル・メディア', title: 'ライブ映像ディレクター', emp: '正社員', loc: '東京都 渋谷区', tags: ['映像制作', 'ライブ配信', 'ディレクション'], img: 'assets/us/1b733ce7246613b8.jpg', ph: 'カメラ' },
{ id: 'J-2406', co: '株式会社ステージ・ワークス', title: '舞台監督', emp: '正社員', loc: '神奈川県 川崎市', tags: ['舞台監督', 'ステージ', '進行管理'], img: 'assets/us/76c62f5d21ffad6c.jpg', ph: '機材' },
{ id: 'J-2407', co: '株式会社ライブ・テック', title: '照明デザイナー', emp: '契約社員', loc: '大阪府 大阪市', tags: ['照明', 'デザイン', 'ライブ'], img: 'assets/us/74ea8c29e544340c.jpg', ph: 'ステージ照明' },
{ id: 'J-2408', co: '株式会社アーティスト・マネジメント', title: 'アーティストマネージャー', emp: '正社員', loc: '東京都 渋谷区', tags: ['マネジメント', 'スケジュール調整', '契約管理'], img: 'assets/us/d13b2321fd2a55d9.jpg', ph: 'ライブ' },
{ id: 'J-2409', co: '株式会社ロッキン・プロモーション', title: '音楽広報・PR', emp: '正社員', loc: '東京都 渋谷区', tags: ['広報', 'PR', 'SNS運用'], img: 'assets/us/6bde306c92b774b4.jpg', ph: 'マイク' }];


const NEWJOBS = [
{ co: '株式会社ロッキン・プロモーション', title: 'レーベル宣伝・プロモーター', emp: '正社員', loc: '東京都 渋谷区', tags: ['宣伝', 'プロモーション', 'SNS運用'], img: 'assets/us/6bde306c92b774b4.jpg', ph: 'マイク' },
{ co: '株式会社ライブ・テック', title: '照明オペレーター', emp: '契約社員', loc: '大阪府 大阪市', tags: ['照明', 'ライブ', 'オペレーション'], img: 'assets/us/74ea8c29e544340c.jpg', ph: 'ステージ照明' },
{ co: '株式会社ステージ・ワークス', title: 'ステージ制作スタッフ', emp: 'アルバイト・パート', loc: '神奈川県 川崎市', tags: ['制作', 'ステージ', '設営'], img: 'assets/us/76c62f5d21ffad6c.jpg', ph: '機材' },
{ co: '株式会社アーティスト・マネジメント', title: 'アーティストマネージャー', emp: '正社員', loc: '東京都 渋谷区', tags: ['マネジメント', 'スケジュール調整', '契約管理'], img: 'assets/us/d13b2321fd2a55d9.jpg', ph: 'ライブ' },
{ co: '株式会社サウンド・クリエイト', title: '音響システムエンジニア', emp: '正社員', loc: '東京都 渋谷区', tags: ['音響', 'システム設計', '施工管理'], img: 'assets/us/d9ec9e2bda7be54d.jpg', ph: '音響卓' },
{ co: '株式会社ビジュアル・メディア', title: 'ライブ映像ディレクター', emp: '契約社員', loc: '東京都 渋谷区', tags: ['映像制作', 'ライブ配信', 'ディレクション'], img: 'assets/us/1b733ce7246613b8.jpg', ph: 'カメラ' }];


function PickupCard({ item, nav }) {
  return (
    <article className="dp-pkcard" onClick={() => nav('SCR-003', { job: window.MW_DATA.jobs.find((j) => j.id === item.id) })}>
      <div className="dp-pkimg">
        <img className="dp-img" src={item.img} alt={item.title} />
        <div className="dp-pkshade"></div>
      </div>
      <div className="dp-pkbody">
        <span className="dp-new" style={{ backgroundColor: "rgb(255, 255, 255)", color: "rgb(38, 38, 38)", fontWeight: "700" }}>NEW</span>
        <div className="dp-pkco">{item.co}</div>
        <h3 className="dp-pktitle">{item.title}</h3>
        <div className="dp-meta">{item.emp}<i></i>{item.loc}</div>
        <div className="dp-tags">{item.tags.map((t) => <span key={t} className="dp-chip">{t}</span>)}</div>
      </div>
    </article>);

}

function MiniJob({ item, nav }) {
  return (
    <article className="dp-mj" onClick={() => nav('SCR-002')} style={{ gap: "16px" }}>
      <div className="dp-mjthumb">
        <img className="dp-img" src={item.img} alt={item.title} />
        <span className="dp-new sm" style={{ backgroundColor: "rgb(207, 61, 21)" }}>NEW</span>
      </div>
      <div className="dp-mjbody">
        <div className="dp-mjco">{item.co}</div>
        <h4 className="dp-mjtitle">{item.title}</h4>
        <div className="dp-meta sm">{item.emp}<i></i>{item.loc}</div>
        <div className="dp-tags">{item.tags.map((t) => <span key={t} className="dp-chip">{t}</span>)}</div>
      </div>
      <span className="dp-mjarrow">{DP_ARROW}</span>
    </article>);

}

function SearchPanel({ nav }) {
  const rows = ['職種から探す', '勤務地から探す', '雇用形態から探す', 'タグから探す'];
  const [open, setOpen] = useState(null);
  const opts = {
    '職種から探す': ['A&R・プロデュース', 'ライブ制作', 'レコーディング', 'マネジメント', '映像・写真'],
    '勤務地から探す': ['東京', '大阪', '名古屋', '福岡', 'リモート可'],
    '雇用形態から探す': ['正社員', '契約社員', '業務委託', 'アルバイト・パート'],
    'タグから探す': ['フェス', 'PA/音響', 'A&R', '編集', 'DTM']
  };
  return (
    <aside className="dp-searchpanel">
      <div className="dp-sp-head">
        <span className="dp-display">SEARCH</span>
        <span className="dp-sp-sub">求人を探す</span>
      </div>
      <div className="dp-sp-rows">
        {rows.map((r) =>
        <div key={r} className={"dp-sp-row" + (open === r ? ' open' : '')}>
            <button className="dp-sp-toggle" onClick={() => setOpen(open === r ? null : r)}>
              <span>{r}</span>
              <span className="dp-sp-sign">{open === r ? '−' : '+'}</span>
            </button>
            {open === r &&
          <div className="dp-sp-opts">
                {opts[r].map((o) =>
            <label key={o} className="dp-sp-opt"><input type="checkbox" />{o}</label>
            )}
              </div>
          }
          </div>
        )}
      </div>
      <button className="dp-btn solid block" onClick={() => nav('SCR-002')}>条件を指定して検索する {DP_ARROW}</button>
    </aside>);

}

function TopPage({ nav }) {
  const data = window.MW_DATA;
  const [pkIndex, setPkIndex] = useState(0);
  const trackRef = React.useRef(null);
  const scrollPk = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.dp-pkcard');
    const step = card ? card.offsetWidth + 24 : 480;
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
    setPkIndex((i) => Math.max(0, Math.min(PICKUP.length - 1, i + dir)));
  };

  return (
    <div className="dp">
      {/* ===== PICK UP carousel ===== */}
      <section className="dp-pickup">
        <div className="dp-pk-rail">
          <div className="dp-pk-vert" style={{ fontFamily: "\"Barlow Condensed\"", fontSize: "64px", fontWeight: "700", letterSpacing: "0.6px" }}>PICK UP</div>
          <div className="dp-pk-lead">
            <p>いま、音楽業界で<br />挑戦する人たちへ。</p>
            <p className="sub">注目の求人を<br />ピックアップ。</p>
          </div>
          <div className="dp-pk-nav" data-comment-anchor="a25f0c4abb-i-85-9">
            <div className="dp-pk-arrows">
              <button aria-label="前へ" onClick={() => scrollPk(-1)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="20" y1="12" x2="4" y2="12" /><polyline points="10 6 4 12 10 18" /></svg></button>
              <button aria-label="次へ" onClick={() => scrollPk(1)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" y1="12" x2="20" y2="12" /><polyline points="14 6 20 12 14 18" /></svg></button>
            </div>
            <div className="dp-pk-count"><b>{pkIndex + 1}</b><i></i><span>{PICKUP.length}</span></div>
          </div>
        </div>
        <div className="dp-pk-track" ref={trackRef} style={{ gap: "1px" }}>
          {PICKUP.map((item) => <PickupCard key={item.id} item={item} nav={nav} />)}
          <button className="dp-viewall" data-comment-anchor="73de4f555c-div-62-7" onClick={() => nav('SCR-002')}>
            <span className="dp-display">VIEW<br />ALL</span>
            {DP_ARROW}
          </button>
        </div>
      </section>

      {/* ===== NEW JOBS + SEARCH ===== */}
      <section className="dp-newjobs">
        <div className="dp-sec-head" style={{ justifyContent: "space-between" }}>
          <div className="dp-sec-title"><span className="dp-display" style={{ fontFamily: "\"Barlow Condensed\"", fontWeight: "600", letterSpacing: "0.7px", fontSize: "48px" }}>NEW JOBS</span><span className="dp-sec-sub">新着求人</span></div>
          <button className="dp-link" onClick={() => nav('SCR-002')}>すべての新着求人を見る {DP_ARROW}</button>
        </div>
        <div className="dp-nj-body">
          <div className="dp-nj-main">
            <div className="dp-nj-grid">
              {NEWJOBS.map((item, i) => <MiniJob key={i} item={item} nav={nav} />)}
            </div>
          </div>
          <SearchPanel nav={nav} />
        </div>
      </section>

      {/* ===== FEATURE / COLUMN ===== */}
      <section className="dp-feature">
        <div className="dp-ft-label"><span className="dp-display" style={{ fontSize: "48px", letterSpacing: "0.7px", fontFamily: "\"Bebas Neue\"" }}>FEATURE</span><span className="dp-sec-sub">特集</span></div>
        <div className="dp-ft-banner" onClick={() => nav('SCR-014')}>
          <img className="dp-img" src="assets/us/c88d6151cec05ff3.jpg" alt="音楽フェスのつくり方" />
          <div className="dp-ft-overlay">
            <div className="dp-ft-eyebrow">SPECIAL FEATURE</div>
            <h3>音楽フェスのつくり方</h3>
            <p>フェス運営の仕事に迫る</p>
          </div>
        </div>
        <div className="dp-column">
          <div className="dp-col-head">
            <span className="dp-display">COLUMN</span>
            <span className="dp-sec-sub light">お知らせ</span>
            <button className="dp-link light" onClick={() => nav('SCR-014')}>すべて見る {DP_ARROW}</button>
          </div>
          <ul className="dp-col-list">
            {data.columns.map((c, i) =>
            <li key={i} onClick={() => nav('SCR-014')}>
                <div className="dp-col-thumb"><img className="dp-img" src={['assets/us/377f909c5a5ca4f3.jpg', 'assets/us/d732648dc45d9cd3.jpg', 'assets/us/a19e94e73191a826.jpg'][i % 3]} alt="" /></div>
                <div className="dp-col-text">
                  <span className="d">{c.date}</span>
                  <span className="t">{c.title}</span>
                </div>
              </li>
            )}
          </ul>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <div className="f-logo">Discovery <span className="by" style={{ fontFamily: "\"Hiragino Sans\"", height: "11px", lineHeight: "1.5", padding: "0px", margin: "12px 0px 0px" }}>presented by rockin'on</span></div>
          <p style={{ marginTop: 10, color: 'var(--mw-gray)', fontSize: 11, maxWidth: 280, fontFamily: 'var(--ff-jp)' }}>
            音楽を仕事にする人のためのキャリアプラットフォーム。
            rockin'on inc. が運営しています。
          </p>
        </div>
        <div>
          <div className="ft-title" style={{ fontFamily: "\"Hiragino Sans\"" }}>FOR MEMBER</div>
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
    </div>);

}

function JobCard({ job, nav }) {
  const [fav, setFav] = useState(job.fav);
  return (
    <div className="job-card" onClick={() => nav('SCR-003', { job })}>
      <div className="job-card-thumb" onClick={(e) => e.stopPropagation()}>
        <image-slot id={"thumb-" + job.id} shape="rect" placeholder="求人画像" style={{ display: 'block', width: '100%', height: '100%' }}></image-slot>
        {job.new && <span className="badge badge-red thumb-new">NEW</span>}
      </div>
      <div className="top-row">
        <div className="co">
          <div className="logo">{job.coLogo}</div>
          <span>{job.co}</span>
        </div>
        <button className={"fav" + (fav ? " on" : "")} onClick={(e) => {e.stopPropagation();setFav(!fav);}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
      <div className="job-card-cat">{job.cat}</div>
      <h3>{job.title}</h3>
      {job.desc && <p className="job-card-desc">{job.desc}</p>}
      <div className="tags">
        <span className="badge badge-white">{job.emp}</span>
        {job.tags.slice(0, 2).map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
      <div className="bottom">
        <div>
          <div className="salary">{job.salary.split('〜')[0].replace('万円', '')}<span className="unit">〜 {job.salary.includes('〜') ? job.salary.split('〜')[1] : ''}</span></div>
          <div className="loc">{job.loc}</div>
        </div>
        <button className="icon-btn" style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--mw-red)', color: '#fff' }}>→</button>
      </div>
    </div>);

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
          {data.categories.slice(0, 6).map((c) =>
          <label key={c.en} className="filter-opt">
              <input type="checkbox" defaultChecked={c.en === 'A&R'} /> {c.ja} <span className="n">{c.count}</span>
            </label>
          )}
        </div>
        <div className="filter-block">
          <h4>雇用形態</h4>
          {['正社員', '契約社員', '業務委託', 'アルバイト'].map((x) =>
          <label key={x} className="filter-opt"><input type="checkbox" /> {x}</label>
          )}
        </div>
        <div className="filter-block">
          <h4>勤務地</h4>
          {['東京', '大阪', '名古屋', 'リモート可'].map((x) =>
          <label key={x} className="filter-opt"><input type="checkbox" /> {x}</label>
          )}
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
            <select className="mw-input" style={{ width: 'auto' }} value={sort} onChange={(e) => setSort(e.target.value)}>
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

        {data.jobs.map((j) =>
        <div key={j.id} className="job-row" onClick={() => nav('SCR-003', { job: j })}>
            <div className="job-row-thumb" onClick={(e) => e.stopPropagation()}>
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
                {j.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div className="right">
              <div className="salary">{j.salary}</div>
              <div className="loc">📍 {j.loc}</div>
            </div>
          </div>
        )}

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
    </div>);

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

        <div className="job-detail-visual" onClick={(e) => e.stopPropagation()}>
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
              const same = window.MW_DATA.jobs.filter((x) => x.co === j.co && x.id !== j.id);
              const list = same.length ? same : window.MW_DATA.jobs.filter((x) => x.id !== j.id).slice(0, 2);
              return list.slice(0, 2).map((jj) =>
              <div key={jj.id} className="same-co-card" onClick={() => nav('SCR-003', { job: jj })}>
                  <div className="meta">{jj.cat} · {jj.emp}</div>
                  <h3>{jj.title}</h3>
                  <div className="salary">{jj.salary}</div>
                </div>
              );
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
          {j.applyType === 'external' ?
          <>
              <button className="btn-primary" onClick={() => nav('SCR-004', { job: j })}>応募ページへ（外部サイト）↗</button>
              <div className="apply-ext-note">この求人は企業の採用サイトで受け付けています</div>
            </> :

          <button className="btn-primary" onClick={() => nav('SCR-004', { job: j })}>この求人に応募する ↗</button>
          }
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
    </div>);

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
      </div>);

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
      </div>);

  }

  return (
    <div className="apply-page">
      <div className="eyebrow">Apply to {j.id}</div>
      <h1>応募フォーム</h1>
      <p className="lede">{j.co} — {j.title}</p>

      <div className="wiz-steps">
        {steps.map((s, i) =>
        <div key={i} className={"wiz-step" + (i === step ? " active" : "") + (i < step ? " done" : "")}>
            <div className="num">{i < step ? "✓" : i + 1}</div>
            <div className="lbl">{s}</div>
          </div>
        )}
      </div>

      <div className="autofill-banner">
        <span className="ico">●</span>
        <span>会員情報から自動入力しています。必要に応じて修正してください。</span>
      </div>

      <div className="form-card">
        {step === 0 &&
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
        }

        {step === 1 &&
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
        }

        {step === 2 &&
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
        }
      </div>

      <div className="form-actions">
        <button className="btn-ghost" onClick={() => step > 0 ? setStep(step - 1) : nav('SCR-003', { job: j })}>
          ← 戻る
        </button>
        {step < 2 ?
        <button className="btn-primary" onClick={() => setStep(step + 1)}>次へ ↗</button> :

        <button className="btn-primary" onClick={() => nav('SCR-005', { job: j })}>応募を送信する ↗</button>
        }
      </div>
    </div>);

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
    </div>);

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
        {['history', 'favorites', 'profile', 'notify'].map((t) =>
        <div key={t} className={"tab" + (tab === t ? " active" : "")} onClick={() => setTab(t)}>
            {{ history: '応募履歴', favorites: 'お気に入り', profile: 'プロフィール', notify: '通知設定' }[t]}
          </div>
        )}
      </div>

      {tab === 'history' &&
      <div>
          <div className="history-note">応募状況の進捗（書類選考・面接など）はマイページでは管理していません。選考のご連絡は企業から直接届きます。掲載終了後も応募・お気に入りした求人はここから確認できます。</div>
          {[
        { co: 'R', coName: 'rockin\'on inc.', title: 'A&Rディレクター', status: 'active', label: '応募済み', date: '2026.04.12' },
        { co: 'S', coName: 'Sound Stage Tokyo', title: 'ライブプロダクション マネージャー', status: 'active', label: '応募済み', date: '2026.04.10' },
        { co: 'N', coName: 'Night Owl Fest', title: 'フェスブッキング担当', status: 'closed', label: '掲載終了', date: '2026.03.28' }].
        map((h, i) =>
        <div key={i} className="history-row">
              <div className="co-logo">{h.co}</div>
              <div>
                <h4>{h.title}</h4>
                <div className="sub">{h.coName}</div>
              </div>
              <div><span className={"status-pill " + h.status}>{h.label}</span></div>
              <div className="date">{h.date}</div>
            </div>
        )}
        </div>
      }

      {tab === 'favorites' &&
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {window.MW_DATA.jobs.slice(0, 6).map((j) => <JobCard key={j.id} job={{ ...j, fav: true }} nav={nav} />)}
        </div>
      }

      {tab === 'profile' &&
      <div className="form-card" style={{ maxWidth: 720 }}>
          <div className="form-row">
            <div className="field-group"><label className="label">氏名</label><input className="mw-input" defaultValue="佐藤 陽翔" /></div>
            <div className="field-group"><label className="label">年齢</label><input className="mw-input" defaultValue="28" /></div>
          </div>
          <div className="field-group"><label className="label">希望職種</label><input className="mw-input" defaultValue="A&R・プロデュース" /></div>
          <div className="field-group"><label className="label">希望勤務地</label><input className="mw-input" defaultValue="東京・リモート可" /></div>
          <div className="field-group"><label className="label">スキル</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['ProTools', 'Logic Pro', 'Ableton', 'A&R実務', 'ライブ制作', 'プロジェクト管理'].map((s) => <span key={s} className="tag">{s} ×</span>)}
              <span className="tag" style={{ borderStyle: 'dashed' }}>+ 追加</span>
            </div>
          </div>
          <div className="field-group"><label className="label">自己紹介</label>
            <textarea className="mw-textarea" rows="4" defaultValue="大学時代からレーベル立ち上げに関わり..." />
          </div>
          <button className="btn-primary">変更を保存 ↗</button>
        </div>
      }

      {tab === 'notify' &&
      <div className="form-card" style={{ maxWidth: 560 }}>
          {[
        ['新着求人のお知らせ', '希望条件にマッチする新着求人を週1回お届け'],
        ['お気に入り求人の期限リマインド', '保存した求人の応募締切が近づいたときに通知'],
        ['フォロー中企業の新着求人', 'フォローした企業が新しい求人を掲載したとき'],
        ['おすすめ求人通知', 'あなたに合った求人レコメンドを月1回お届け']].
        map(([t, s], i) =>
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
        )}
        </div>
      }
    </div>);

}

// Export
Object.assign(window, { TopPage, SearchPage, JobDetail, ApplyPage, ApplyDone, MyPage, JobCard });