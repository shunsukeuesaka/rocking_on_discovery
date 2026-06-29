import { useState, useRef } from 'react'
import type { Nav } from '../../types'
import { JOBS, COLUMNS } from '../../data/mwData'
import { Img } from '../../components/Img'

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
        <span className="dp-new on-photo">NEW</span>
        <div className="dp-pkco">{item.co}</div>
        <h3 className="dp-pktitle">{item.title}</h3>
        <div className="dp-meta">{item.emp}<i></i>{item.loc}</div>
        <div className="dp-tags">{item.tags.map((t) => <span key={t} className="dp-chip">{t}</span>)}</div>
      </div>
    </article>)

}

function MiniJob({ item, nav }: { item: Omit<PickupItem, 'id'>; nav: Nav }) {
  return (
    <article className="dp-mj" onClick={() => nav('SCR-002')}>
      <div className="dp-mjthumb">
        <Img className="dp-img" src={item.img} alt={item.title} seed={item.img} />
        <span className="dp-new sm">NEW</span>
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
          <div className="dp-pk-vert">PICK UP</div>
          <div className="dp-pk-lead">
            <p>いま、音楽業界で<br />挑戦する人たちへ。</p>
            <p className="sub">注目の求人を<br />ピックアップ。</p>
          </div>
          <div className="dp-pk-nav">
            <div className="dp-pk-arrows">
              <button aria-label="前へ" onClick={() => scrollPk(-1)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="20" y1="12" x2="4" y2="12" /><polyline points="10 6 4 12 10 18" /></svg></button>
              <button aria-label="次へ" onClick={() => scrollPk(1)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" y1="12" x2="20" y2="12" /><polyline points="14 6 20 12 14 18" /></svg></button>
            </div>
            <div className="dp-pk-count"><b>{pkIndex + 1}</b><i></i><span>{PICKUP.length}</span></div>
          </div>
        </div>
        <div className="dp-pk-track" ref={trackRef}>
          {PICKUP.map((item) => <PickupCard key={item.id} item={item} nav={nav} />)}
          <button className="dp-viewall" onClick={() => nav('SCR-002')}>
            <span className="dp-display">VIEW<br />ALL</span>
            {DP_ARROW}
          </button>
        </div>
      </section>

      {/* ===== NEW JOBS + SEARCH ===== */}
      <section className="dp-newjobs">
        <div className="dp-sec-head">
          <div className="dp-sec-title"><span className="dp-display">NEW JOBS</span><span className="dp-sec-sub">新着求人</span></div>
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
        <div className="dp-ft-label"><span className="dp-display">FEATURE</span><span className="dp-sec-sub">特集</span></div>
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
          <div className="f-logo">Discovery <span className="by">presented by rockin'on</span></div>
          <p className="f-about">
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
    </div>)

}
