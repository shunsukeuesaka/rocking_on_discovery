import type { Category, Job } from '../types'

/**
 * Mock job data — ported verbatim from the handoff
 * (design_handoff_job_list/public_screens.jsx → JOBLIST, 9 件).
 * In production this is replaced by the job-list API (検索条件・ソート・
 * ページネーションのクエリ対応).
 */
export const JOBLIST: Job[] = [
  { id: 'J-2401', img: 'assets/us/1b733ce7246613b8.jpg', title: 'ライブ制作ディレクター', co: '株式会社ロッキン・ライブ', coLogo: 'R', cat: 'ライブ制作', emp: '正社員', loc: '東京都 渋谷区', salary: '500〜750万円', tags: ['ライブ制作', 'コンサート', '進行管理', '現場統括', 'スタッフ管理'], fav: false, new: true, posted: '2日前', desc: 'ライブ・コンサートの企画から当日の進行管理までを一貫して担当。アーティストとスタッフをつなぐ現場の要となるポジションです。', applyType: 'form' },
  { id: 'J-2402', img: 'assets/us/62bc5486a419ef3a.jpg', title: 'レコーディングエンジニア', co: '株式会社サウンド・クリエイト', coLogo: 'S', cat: 'レコーディング', emp: '契約社員', loc: '東京都 渋谷区', salary: '400〜600万円', tags: ['レコーディング', 'PA/音響', 'ミックス', 'ProTools', 'スタジオ'], fav: false, new: true, posted: '3日前', desc: 'スタジオでのレコーディング、ミックスダウンを担当。アーティストの音をかたちにする専門職です。', applyType: 'form' },
  { id: 'J-2403', img: 'assets/us/6bde306c92b774b4.jpg', title: 'A&R（邦楽担当）', co: 'ロッキン・レコード株式会社', coLogo: 'R', cat: 'A&R・プロデュース', emp: '正社員', loc: '東京都 港区', salary: '600〜900万円', tags: ['A&R', 'アーティスト発掘', '契約交渉', '邦楽', '制作進行'], fav: true, new: true, posted: '今日', desc: '新人アーティストの発掘から契約交渉、作品制作のディレクションまでを担当する邦楽A&R職です。', applyType: 'form' },
  { id: 'J-2404', img: 'assets/us/74ea8c29e544340c.jpg', title: 'フェス運営スタッフ', co: 'ロッキン・フェスティバル実行委員会', coLogo: 'F', cat: 'ライブ制作', emp: '契約社員', loc: '千葉県 千葉市', salary: '350〜500万円', tags: ['フェス運営', '会場設営', '進行管理', '野外イベント', 'チーム'], fav: false, new: true, posted: '4日前', desc: '大型音楽フェスティバルの会場設営・運営・進行管理を担当。チームで一つのイベントをつくり上げます。', applyType: 'form' },
  { id: 'J-2405', img: 'assets/us/76c62f5d21ffad6c.jpg', title: 'レーベル宣伝・プロモーター', co: '株式会社ロッキン・プロモーション', coLogo: 'P', cat: 'マーケティング', emp: '正社員', loc: '東京都 渋谷区', salary: '420〜620万円', tags: ['宣伝', 'プロモーション', 'SNS運用', 'PR', 'メディア対応'], fav: false, new: true, posted: '5日前', desc: '所属アーティストの宣伝戦略立案、メディア露出やSNS運用までプロモーション全般を手がけます。', applyType: 'form' },
  { id: 'J-2406', img: 'assets/us/7fefe37856337457.jpg', title: '照明オペレーター', co: '株式会社ライブ・テック', coLogo: 'L', cat: 'ライブ制作', emp: '契約社員', loc: '大阪府 大阪市', salary: '380〜520万円', tags: ['照明', 'ライブ', 'オペレーション', '舞台演出', 'コンサート'], fav: false, new: true, posted: '6日前', desc: 'ライブ・コンサートでの照明オペレーション。仕込みから本番のオペレートまで、光で演出をつくります。', applyType: 'form' },
  { id: 'J-2407', img: 'assets/us/918698519eb4d73f.jpg', title: 'ステージ制作スタッフ', co: '株式会社ステージ・ワークス', coLogo: 'S', cat: 'ライブ制作', emp: 'アルバイト・パート', loc: '神奈川県 川崎市', salary: '時給1,300円〜', tags: ['制作', 'ステージ', '設営', '未経験歓迎', 'イベント'], fav: false, new: true, posted: '1週間前', desc: 'ライブ・イベント会場でのステージ設営・撤去を担当。未経験から現場で学べる制作スタッフ職です。', applyType: 'form' },
  { id: 'J-2408', img: 'assets/us/a4317f9f7d240dc2.jpg', title: 'アーティストマネージャー', co: '株式会社アーティスト・マネジメント', coLogo: 'A', cat: 'マネジメント', emp: '正社員', loc: '東京都 渋谷区', salary: '400〜550万円', tags: ['マネジメント', 'スケジュール調整', '契約管理', '現場同行', '広報'], fav: false, new: true, posted: '1週間前', desc: '所属アーティストのスケジュール調整・現場同行・契約管理など、活動全般をサポートします。', applyType: 'form' },
  { id: 'J-2409', img: 'assets/us/d13b2321fd2a55d9.jpg', title: 'ライブ映像ディレクター', co: '株式会社ビジュアル・メディア', coLogo: 'V', cat: '映像・写真', emp: '契約社員', loc: '東京都 渋谷区', salary: '450〜650万円', tags: ['映像制作', 'ライブ配信', 'ディレクション', '編集', 'マルチカメラ'], fav: false, new: true, posted: '10日前', desc: 'ライブ配信・映像作品のディレクションを担当。複数カメラの構成から編集まで映像表現を統括します。', applyType: 'form' },
]

/** Total listing count shown in the hero (求人総数). Mock value from the design. */
export const TOTAL_JOBS = 152

/** 職種カテゴリ — from design_handoff_job_list/data.js (window.MW_DATA.categories). */
export const CATEGORIES: Category[] = [
  { en: 'A&R', ja: 'A&R・プロデュース', count: 42, icon: '♪' },
  { en: 'LIVE', ja: 'ライブ制作', count: 38, icon: '♬' },
  { en: 'REC', ja: 'レコーディング', count: 24, icon: '⏺' },
  { en: 'MGMT', ja: 'マネジメント', count: 31, icon: '★' },
  { en: 'VIDEO', ja: '映像・写真', count: 19, icon: '▶' },
  { en: 'EDIT', ja: '編集・ライター', count: 27, icon: '✎' },
  { en: 'MKT', ja: 'マーケティング', count: 22, icon: '◎' },
  { en: 'BIZ', ja: '企画・営業', count: 33, icon: '◈' },
]
