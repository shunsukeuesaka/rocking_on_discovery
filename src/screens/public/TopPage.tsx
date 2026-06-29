import { useState, useEffect, useRef } from 'react'
import type { Nav } from '../../types'
import { JOBS, COLUMNS } from '../../data/mwData'
import { Img } from '../../components/Img'

// ============ FIGMA HERO (Music Works — Sample UI Top) ============
export function Hero({ nav }: { nav: Nav }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const stage = ref.current
    if (!stage) return
    const update = () => setScale(stage.clientWidth / 1440)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(stage)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  // Right feature panel — horizontal carousel slides
  const slides = [
    { img: 'assets/hero-concert.jpg', pos: '50% 38%', grain: true, co: 'ソニーミュージックエンタテイメント', role: 'A＆R ディレクター（新人アーティスト発掘）' },
    { img: 'assets/hero-bg.jpg', pos: '50% 50%', grain: false, co: "rockin'on inc.", role: 'フェスプロデューサー（ROCK IN JAPAN FES.）' },
    { img: 'assets/hero-column.jpg', pos: '50% 32%', grain: false, co: 'Grain Pictures', role: 'MV ディレクター（映像演出・編集）' },
  ]

  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [paused, slides.length])

  // Custom cursor ring — follows the mouse across the hero
  const [cur, setCur] = useState({ x: 720, y: 560, on: false })
  const onHeroMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setCur({ x: (e.clientX - r.left) / scale, y: (e.clientY - r.top) / scale, on: true })
  }

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
    </div>)

}

// ============ TOP PAGE (Discovery editorial redesign) ============
const DP_ARROW = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" y1="12" x2="20" y2="12" /><polyline points="14 6 20 12 14 18" /></svg>

interface PickupItem {
  id: string
  co: string
  title: string
  emp: string
  loc: string
  tags: string[]
  img: string
  ph: string
}

const PICKUP: PickupItem[] = [
  { id: 'J-2401', co: '株式会社ロッキン・ライブ', title: 'ライブ制作ディレクター', emp: '正社員', loc: '東京都 渋谷区', tags: ['ライブ制作', 'コンサート', '進行管理'], img: 'assets/us/62bc5486a419ef3a.jpg', ph: 'ライブ照明' },
  { id: 'J-2402', co: '株式会社サウンド・クリエイト', title: 'レコーディングエンジニア', emp: '契約社員', loc: '東京都 渋谷区', tags: ['レコーディング', 'PA/音響', 'ミックス'], img: 'assets/us/a4317f9f7d240dc2.jpg', ph: 'スタジオ卓' },
  { id: 'J-2403', co: 'ロッキン・レコード株式会社', title: 'A&R（邦楽担当）', emp: '正社員', loc: '東京都 渋谷区', tags: ['A&R', 'アーティスト発掘', '契約交渉'], img: 'assets/us/7fefe37856337457.jpg', ph: 'レコード' },
  { id: 'J-2404', co: 'ロッキン・フェスティバル株式会社', title: 'フェス運営スタッフ', emp: '契約社員', loc: '千葉県 千葉市', tags: ['フェス運営', '会場運営', 'イベント'], img: 'assets/us/d9ec9e2bda7be54d.jpg', ph: 'フェス会場' },
  { id: 'J-2405', co: '株式会社ビジュアル・メディア', title: 'ライブ映像ディレクター', emp: '正社員', loc: '東京都 渋谷区', tags: ['映像制作', 'ライブ配信', 'ディレクション'], img: 'assets/us/1b733ce7246613b8.jpg', ph: 'カメラ' },
  { id: 'J-2406', co: '株式会社ステージ・ワークス', title: '舞台監督', emp: '正社員', loc: '神奈川県 川崎市', tags: ['舞台監督', 'ステージ', '進行管理'], img: 'assets/us/76c62f5d21ffad6c.jpg', ph: '機材' },
  { id: 'J-2407', co: '株式会社ライブ・テック', title: '照明デザイナー', emp: '契約社員', loc: '大阪府 大阪市', tags: ['照明', 'デザイン', 'ライブ'], img: 'assets/us/74ea8c29e544340c.jpg', ph: 'ステージ照明' },
  { id: 'J-2408', co: '株式会社アーティスト・マネジメント', title: 'アーティストマネージャー', emp: '正社員', loc: '東京都 渋谷区', tags: ['マネジメント', 'スケジュール調整', '契約管理'], img: 'assets/us/d13b2321fd2a55d9.jpg', ph: 'ライブ' },
  { id: 'J-2409', co: '株式会社ロッキン・プロモーション', title: '音楽広報・PR', emp: '正社員', loc: '東京都 渋谷区', tags: ['広報', 'PR', 'SNS運用'], img: 'assets/us/6bde306c92b774b4.jpg', ph: 'マイク' },
]


const NEWJOBS: Omit<PickupItem, 'id'>[] = [
  { co: '株式会社ロッキン・プロモーション', title: 'レーベル宣伝・プロモーター', emp: '正社員', loc: '東京都 渋谷区', tags: ['宣伝', 'プロモーション', 'SNS運用'], img: 'assets/us/6bde306c92b774b4.jpg', ph: 'マイク' },
  { co: '株式会社ライブ・テック', title: '照明オペレーター', emp: '契約社員', loc: '大阪府 大阪市', tags: ['照明', 'ライブ', 'オペレーション'], img: 'assets/us/74ea8c29e544340c.jpg', ph: 'ステージ照明' },
  { co: '株式会社ステージ・ワークス', title: 'ステージ制作スタッフ', emp: 'アルバイト・パート', loc: '神奈川県 川崎市', tags: ['制作', 'ステージ', '設営'], img: 'assets/us/76c62f5d21ffad6c.jpg', ph: '機材' },
  { co: '株式会社アーティスト・マネジメント', title: 'アーティストマネージャー', emp: '正社員', loc: '東京都 渋谷区', tags: ['マネジメント', 'スケジュール調整', '契約管理'], img: 'assets/us/d13b2321fd2a55d9.jpg', ph: 'ライブ' },
  { co: '株式会社サウンド・クリエイト', title: '音響システムエンジニア', emp: '正社員', loc: '東京都 渋谷区', tags: ['音響', 'システム設計', '施工管理'], img: 'assets/us/d9ec9e2bda7be54d.jpg', ph: '音響卓' },
  { co: '株式会社ビジュアル・メディア', title: 'ライブ映像ディレクター', emp: '契約社員', loc: '東京都 渋谷区', tags: ['映像制作', 'ライブ配信', 'ディレクション'], img: 'assets/us/1b733ce7246613b8.jpg', ph: 'カメラ' },
]


function PickupCard({ item, nav }: { item: PickupItem; nav: Nav }) {
  return (
    <article className="dp-pkcard" onClick={() => nav('SCR-003', { job: JOBS.find((j) => j.id === item.id) })}>
      <div className="dp-pkimg">
        <Img className="dp-img" src={item.img} alt={item.title} seed={item.img} />
        <div className="dp-pkshade"></div>
      </div>
      <div className="dp-pkbody">
        <span className="dp-new" style={{ backgroundColor: "rgb(255, 255, 255)", color: "rgb(38, 38, 38)", fontWeight: "700" }}>NEW</span>
        <div className="dp-pkco">{item.co}</div>
        <h3 className="dp-pktitle">{item.title}</h3>
        <div className="dp-meta">{item.emp}<i></i>{item.loc}</div>
        <div className="dp-tags">{item.tags.map((t) => <span key={t} className="dp-chip">{t}</span>)}</div>
      </div>
    </article>)

}

function MiniJob({ item, nav }: { item: Omit<PickupItem, 'id'>; nav: Nav }) {
  return (
    <article className="dp-mj" onClick={() => nav('SCR-002')} style={{ gap: "16px" }}>
      <div className="dp-mjthumb">
        <Img className="dp-img" src={item.img} alt={item.title} seed={item.img} />
        <span className="dp-new sm" style={{ backgroundColor: "rgb(207, 61, 21)" }}>NEW</span>
      </div>
      <div className="dp-mjbody">
        <div className="dp-mjco">{item.co}</div>
        <h4 className="dp-mjtitle">{item.title}</h4>
        <div className="dp-meta sm">{item.emp}<i></i>{item.loc}</div>
        <div className="dp-tags">{item.tags.map((t) => <span key={t} className="dp-chip">{t}</span>)}</div>
      </div>
      <span className="dp-mjarrow">{DP_ARROW}</span>
    </article>)

}

function SearchPanel({ nav }: { nav: Nav }) {
  const rows = ['職種から探す', '勤務地から探す', '雇用形態から探す', 'タグから探す']
  const [open, setOpen] = useState<string | null>(null)
  const opts: Record<string, string[]> = {
    '職種から探す': ['A&R・プロデュース', 'ライブ制作', 'レコーディング', 'マネジメント', '映像・写真'],
    '勤務地から探す': ['東京', '大阪', '名古屋', '福岡', 'リモート可'],
    '雇用形態から探す': ['正社員', '契約社員', '業務委託', 'アルバイト・パート'],
    'タグから探す': ['フェス', 'PA/音響', 'A&R', '編集', 'DTM']
  }
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
    </aside>)

}

export function TopPage({ nav }: { nav: Nav }) {
  const data = { columns: COLUMNS }
  const [pkIndex, setPkIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollPk = (dir: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('.dp-pkcard')
    const step = card ? card.offsetWidth + 24 : 480
    track.scrollBy({ left: dir * step, behavior: 'smooth' })
    setPkIndex((i) => Math.max(0, Math.min(PICKUP.length - 1, i + dir)))
  }

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
          <Img className="dp-img" src="assets/us/c88d6151cec05ff3.jpg" alt="音楽フェスのつくり方" seed="col-hero" />
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
                <div className="dp-col-thumb"><Img className="dp-img" src={['assets/us/377f909c5a5ca4f3.jpg', 'assets/us/d732648dc45d9cd3.jpg', 'assets/us/a19e94e73191a826.jpg'][i % 3]} alt="" seed={'col' + i} /></div>
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
    </div>)

}
