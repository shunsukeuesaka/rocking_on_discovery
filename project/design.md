# design.md — Discovery presented by rockin'on / 実装リファレンス

> このドキュメントは、HTMLプロトタイプ「Discovery」を **別コードベースで高い再現性をもって実装** するためのプロジェクト固有の参照仕様です。
> デザインの**思想・トークン・ルールの土台**は、下記「Design Guideline by Uesaka Shunsuke」群に従います。本書はそのガイドラインに**準拠**しつつ、rockin'on Discovery 固有の画面・コンポーネント・例外を定義します。
> Claude Code はまずガイドライン群の `DESIGN.md` を読み込み、続いて本書を通読し、ここに書かれた数値・規約・原則に**厳密に**従って実装してください。

---

## 0. 参照体系（デザインシステムの土台）

本プロジェクトのデザイン判断は、うえさかのパーソナルデザインガイドライン群を**単一の土台**とする。旧称「Uesaka Design System v2.1」は廃止し、以下のガイドライン群に置き換える。

### ガイドライン群のパス

```
/Users/uesakashunsuke/Desktop/rockin-on-pf/project/guideline/ForAI_DesignGuideline_by_UesakaShunsuke_V1.0.0/guideline/md/
```

| ファイル | 役割 | 本書での主な関連箇所 |
|---------|------|------------------|
| **DESIGN.md** | 全ガイドラインのAI用サマリー（**最初に読む**） | 全体 |
| design-philosophy-uesaka.md | 設計思想・絶対ルール（P/V/S/I/N 体系） | §1, §4 |
| style-guide-uesaka.md | 色・タイポ・スペースのトークン定義（**トークンの上流**） | §3 |
| grid-system-guideline.md | グリッド・座標・寸法仕様 | §5, §9 |
| visual-pattern-guideline-uesaka.md | ダイアグラム・図解パターン | （管理画面のチャート等） |
| content-creation-guideline-uesaka.md | コンテンツ構成・ストーリーラインの原則 | （LP・トップ構成） |
| use-case-profile-uesaka.md / template-guideline.md | 用途別プロファイル・レイアウトテンプレート | （主にスライド用途。本Webでは参考） |
| asset-management-guideline-uesaka.md / pdf-output-guideline-uesaka.md | 素材管理・PDF書き出し | §10 |

> ガイドラインは更新されることがある。**毎回キャッシュせず最新を読む**こと。

### 矛盾時の優先順位（重要）

ガイドライン群と本書、プロジェクト個別決定が食い違う場合は、**上から順に優先**する。

1. **プロジェクトの明示的決定**（例: トップページの純モノクロ上書き → §3.0、求人タグのピル型例外 → §7.3）
2. **本書（design.md）の固有仕様**（画面インベントリ・コンポーネント実数値・レスポンシブ）
3. **ガイドライン群**（思想・トークン・汎用ルール）

ガイドラインに書かれた汎用ルールを、本書の固有仕様や明示的決定より優先して「修正」してはならない。

---

## 1. 最重要：実装の心得（これを破ると品質が落ちる）

ガイドラインの設計思想（P-01〜P-04）と本プロジェクト方針を統合した実装心得。

1. **これはデザインリファレンスであり、貼り付け用コードではない。** 同梱の HTML/CSS/JSX は「意図する見た目と挙動」を示すもの。ターゲット環境（React / Vue / Next.js 等）の確立されたパターンで**再現**すること。ビルドのない構成（Babel ブラウザトランスパイル）はそのまま持ち込まない。
2. **数値を推測しない（P-02 細部の誠実さ）。** 色・サイズ・余白・角丸・フォントは本書の design token と各コンポーネントの実数値を使う。「だいたいこの辺」で実装しない。未定義の値が必要なら 8px グリッドと既存トークンから導く。
3. **引き算を優先する（P-01 / V-04）。** プロトタイプにない装飾・セクション・アイコン・統計を勝手に足さない。削るのは「周囲のノイズ」であり、主役（見出し・CTA）はむしろ大きくする。情報過多なら余白を削らず、情報を削るかページを分割する。
4. **モノクロが基調（V-01 / V-05）。** 画面の支配色はモノトーン。アクセント（レッド `#D93030`）は「最も重要な1点」にだけ、**1 viewport あたり最大2箇所**まで。ただしトップページ／サイト全体テーマは §3.0 の純モノクロ上書きが優先。
5. **シャープに、平面で（V-02 / V-03）。** 角丸は 2〜4px。ピル型は使わない（タグの例外 §7.3 のみ）。シャドウは使わない。奥行きは余白・罫線・レイヤーで表現する。
6. **タイポグラフィを恐れない（V-06）。** Hero など主役の文字は大きく扱う（求人一覧の「JOBS」見出し参照）。
7. **静止状態で美しく（I-02）。** スクリーンショットで破綻しないこと。動きは意味があるときだけ（I-01 / I-03: 150〜300ms, ease-out）。
8. **迷ったら**、本書の該当コンポーネント節と同梱ソースの該当シンボル、そして `design-philosophy-uesaka.md` 付録「判断に迷ったときの問い」を照合する。

---

## 2. プロダクト概要

- **名称**: Discovery presented by rockin'on
- **領域**: 音楽・エンタメ業界に特化したキャリア（求人）プラットフォーム
- **3つのロール / 面**:
  - **公開サイト（求職者向け）**: トップ・求人検索・求人詳細・応募・会員機能など
  - **企業管理画面**: ダッシュボード・求人管理・応募者管理・分析
  - **運営管理画面（Admin）**: 審査・企業管理・会員管理
- **対応デバイス**: PC（デスクトップ）/ スマホ（レスポンシブ）。SP専用のフレーム検証も存在（`sp_app.jsx`）。

---

## 3. 技術構成（現状プロトタイプ → 本番方針）

**現状（プロトタイプ）**
- 素の HTML + 生 CSS（CSSカスタムプロパティ）+ React 18（UMD, CDN）+ Babel Standalone（ブラウザでその場 JSX 変換）
- 自前の軽量ルーター: `nav(screenId, payload)` で画面切替、現在画面IDを localStorage に保持
- データはモック（`window.MW_DATA` ほか静的配列）
- 画像差し替えは `<image-slot>`（Web Component）

**本番方針（推奨）**
- フレームワーク: 既存コードベースがあればそれに合わせる。なければ **Next.js (App Router) + TypeScript** を推奨
- ルーティング: 画面ID `SCR-xxx` を実URL（例 `/jobs`, `/jobs/[id]`, `/apply/[id]`, `/company/dashboard`）にマッピング
- スタイル: `uesaka_tokens.css` のトークンを CSS 変数として残し、その上に Tailwind（トークンを theme に流し込む）か CSS Modules。**トークン名は変えない**
- データ: モックを API スキーマに置換。一覧は「検索条件 / ソート / ページネーション」をクエリ化
- 画像: `<image-slot>` → 通常の `<img>` / `next/image`
- フォント: ローカル TTF を `next/font/local` 等で配信（CDN 依存にしない）

---

## 3.0 プロジェクト個別決定（ガイドラインより優先）

ガイドラインの汎用ルールに対し、本プロジェクトで明示的に上書きされている決定。**これらは §0 の優先順位 1 に該当し、ガイドラインや本書のトークン記述より優先する。**

- **トップページ／サイト全体テーマ＝純モノクロ上書き（2026-06-29 決定）**
  - 背景は warm off-white `#FAF9F7` ではなく **白 `#FFFFFF`**、アクセントは赤ではなく **charcoal `#1C1C1A`** に再マップし、red/semantic はグレースケール化する。
  - 実装はプロトタイプの `:root` 「MONOCHROME / WHITE-BG OVERRIDE」ブロック（コメント検索）に集約。
  - これは style-guide のベースパレット（bg + 赤アクセント）を**超える**決定。構造・余白・タイポ・反シャドウ・反ピルのルールは引き続き適用される（=色だけが上書き）。
  - 赤アクセント／`#FAF9F7` を「ガイドライン準拠のため」に再導入しないこと。warm+red に戻すのはユーザーが明示的に求めたときのみ。
- **求人タグのピル型**: §7.3 のとおり、V-02 / N-03（ピル禁止）に対する**意図的な例外**。参照デザイン画像に合わせタグのみピル型を維持する。

---

## 4. Design Tokens（上流 = style-guide-uesaka.md / 実数値）

トークンの定義元は `style-guide-uesaka.md`。本リポジトリには同値が `uesaka_tokens.css` にコピー済み。**必ず `var(--*)` で参照**し、ハードコードしない。値はガイドラインと完全互換。

### 4.1 Colors — Base（モノクロ基調）
| Token | 値 | 用途 |
|---|---|---|
| `--color-bg` | `#FAF9F7` | ページ背景（warm off-white）※トップ／全体テーマは §3.0 で `#FFFFFF` に上書き |
| `--color-surface` | `#F2F0ED` | カード・面 |
| `--color-border` | `#E0DDD9` | 罫線・枠 |
| `--color-text-primary` | `#1C1C1A` | 主要テキスト（charcoal）|
| `--color-text-secondary` | `#5C5B57` | 副次テキスト |
| `--color-text-tertiary` | `#9C9B96` | 補助・キャプション |

### 4.2 Colors — Accent（レッド／V-05: 1 viewport 最大2箇所）
| Token | 値 |
|---|---|
| `--color-accent` | `#D93030`（= `--color-red-500`, PRIMARY）|
| `--color-accent-hover` | `#E05050`（= `--color-red-400`）|
| `--color-accent-muted` | `#F8D0D0`（= `--color-red-100`, 淡い背景）|

レッドの陰影スケール `--color-red-50 … --color-red-900`（`#FDF0F0 → #5C1010`）あり。サブカラー（yellow `#D4B800` / orange `#C84020` / purple `#7020C0` / cyan `#20A898` の 100/300/500）は**プロジェクトで1色だけ**選んで使用（複数混在は禁止 → V-01 / N-02）。※本プロジェクトはトップ／全体テーマで純モノクロのため、原則アクセントも charcoal に寄せる（§3.0）。

### 4.3 Colors — Gray / Semantic
- グレースケール（warm 寄り）: `--color-gray-50 #F4F2EE … --color-gray-900 #141412`
- Semantic: `--color-error #D93030` / `--color-warning #D4B800` / `--color-success #2A8C5C` / `--color-info #20A898`

### 4.4 Typography
- **EN 見出し** `--font-en-heading`: `"Barlow Condensed", "Barlow", "Oswald", sans-serif`。見出しは **700 / tracking 0.03em**。（ガイドライン v2.0 に合わせ Barlow Condensed を第一候補に統一）
- EN 派生: `--font-en-condensed`（Barlow Condensed）/ `--font-en-semi-condensed`（密度の高い表・見出し）
- **JP 本文** `--font-jp-body`: `"Hiragino Sans", "Noto Sans JP", sans-serif`。本文 **400 / line-height 1.75**。
- **Mono / 数値** `--font-mono`: 本プロジェクトは `"Roboto Mono", ...` をローカル同梱して使用（メタデータ・数値・コード）。※ガイドライン v2.0 は数値に Barlow + `font-variant-numeric: tabular-nums` を推奨。本プロジェクトは Roboto Mono を継続採用（固有仕様）。

**Type scale**（base 16px）: `--text-2xs 10px / --text-xs 12px / --text-sm 14px / --text-base 16px / --text-lg 18px / --text-xl 20px / --text-2xl 24px / --text-3xl 32px / --text-4xl 36px / --text-5xl 40px / --text-6xl 48px / --text-7xl 64px / --text-8xl 80px / --text-9xl 120px / --text-10xl 160px`

**Weight**: `--weight-regular 400 / --weight-medium 500 / --weight-bold 700`（Barlow は 100–900 + italics をローカル同梱）
**Leading**: default 1.5 / heading 1.15 / body 1.75 / label 1.45 / caption 1.5
**Tracking**: heading 0.03em / body 0 / label 0.02em

**プリコンポーズ済みクラス**（`uesaka_tokens.css` 後半）: `.u-display .u-h1 .u-h2 .u-h3 .u-lead .u-body .u-label .u-caption .u-mono`、`.u-reset`（リセット）。新規画面ではこれらを優先利用。

### 4.5 Spacing（8px グリッド、最小 4px）
`--space-1 4 / --space-2 8 / --space-3 12 / --space-4 16（コンポーネント標準）/ --space-5 24 / --space-6 32 / --space-8 48（セクション）/ --space-10 64（ページ）/ --space-12 80 / --space-16 96（hero）`

余白の使い方（ガイドライン準拠）: 同グループ内 8–12px / 隣接グループ 16–24px / セクション間 48–64px / ページ 64px〜。**罫線より余白でグループを分ける**（S-03）。

### 4.6 Shape（角丸は控えめ。シャドウなし）
`--radius-none 0 / --radius-sm 2px（タグ・バッジ）/ --radius-md 4px（DEFAULT: ボタン・カード・入力）/ --radius-lg 8px（モーダル・大カード）/ --radius-full 9999px（原則 AVOID：アバター・アイコンボタンのみ）`
- **Elevation（box-shadow）は使わない（V-03 / N-04）。** 奥行きは余白・罫線・レイヤーで表現。

### 4.7 Motion
`--transition-hover 150ms ease-out / --transition-base 200ms ease-out / --transition-page 250ms ease-in-out`（I-03 準拠）

### 4.8 Layout
`--max-width 960px`（一般コンテンツ。ただし求人一覧など全幅志向の画面は独自に上書き）/ `--nav-height 64px`

---

## 5. 絶対ルール（ガイドライン P/V/S/I/N + プロジェクト例外）

`design-philosophy-uesaka.md` の禁止事項（N）とビジュアル絶対ルール（V）を本プロジェクトに適用したもの。

### 5.1 禁止（NEVER）
- **N-01** グラデーション背景
- **N-02** カラフルすぎる配色（ネオン・パステル・虹色の多色使い）
- **N-03 / V-02** ピル型ボタン・角丸大きすぎ（`border-radius: 9999px`）※**例外: 求人タグのみ**（§7.3）
- **N-04 / V-03** 全面シャドウ（`box-shadow`）

### 5.2 避ける（AVOID）
- **N-05** アイコン多用（テキストで伝えられるなら不要）
- **N-06** 情報の詰め込み（余白は削らず情報を削る/分割 → V-04）
- **N-07** アニメーション多用

### 5.3 ビジュアル必須（MUST）
- **V-01** モノクロベース。アクセントは限定（本プロジェクトはトップ／全体テーマで純モノクロ → §3.0）
- **V-05** アクセント使用数厳守: 1 viewport 最大2箇所。`border-left` への使用も1箇所としてカウント
- **V-06** タイポグラフィを主役にすることを恐れない

---

## 6. 共通レイアウト & ナビゲーション

### 6.1 公開サイトのヘッダー `.dp-header`
- 左: ロゴ `.dp-logo`（「Discovery」+ small「presented by rockin'on」）→ クリックでトップ（SCR-001）
- 中央: グローバルナビ `求人を探す`(SCR-002) / `企業を探す`(SCR-009) / `お知らせ`(SCR-014)
- 右 `.dp-actions`: アイコンリンク `検索する`(SCR-002) / `お気に入り`(SCR-008)、`ログイン`(ghostボタン, SCR-007)、`新規登録`(solidボタン, SCR-006)
- モバイル: `.dp-mobtoggle`（検索アイコン + ハンバーガー）→ ドロワー `.dp-drawer` を開く
- ナビはコンテンツの邪魔をしない（philosophy §2「ナビゲーションとコンテンツの関係」）

### 6.2 モバイルドロワー `.dp-drawer` / タブバー `.dp-tabbar`
- ドロワー: ロゴ・ナビ・認証ボタン・規約リンク・SNS
- 下部タブバー（SP）: ホーム / 求人を探す / お気に入り / マイページ

### 6.3 企業管理サイドバー `CompanySidebar`
- ダッシュボード(SCR-017) / 求人管理(SCR-018) / 応募者管理(SCR-020) / アナリティクス(SCR-022)。フッターに「← サイトへ戻る」

### 6.4 運営管理サイドバー `AdminSidebar`
- オーバービュー(SCR-028) / 求人審査(SCR-029) / 企業管理(SCR-030) / 会員管理(SCR-031)

### 6.5 ボタン体系
- `.dp-btn.solid`: 塗り（charcoal 背景 / 白文字）。主要CTA
- `.dp-btn.ghost`: アウトライン（`1px solid` + 透明背景）。副次
- 角丸は `--radius-sm`〜`--radius-md`、**ピル不可**、**シャドウ不可**。ラベルは1行（S-04）

---

## 7. 画面インベントリ（SCR-xxx → コンポーネント → ファイル）

`discovery.html` の `renderScreen(id, ctx, nav)` が switch でマッピング。各画面は props `{ nav, ...ctx }` を受ける。

### 公開サイト（`public_screens.jsx` / `public_aux.jsx`）
| ID | 画面 | コンポーネント | ファイル |
|---|---|---|---|
| SCR-001 | トップ | `TopPage` | public_screens.jsx |
| SCR-002 | 求人一覧 / 検索 | `SearchPage` | public_screens.jsx |
| SCR-003 | 求人詳細 | `JobDetail` | public_screens.jsx |
| SCR-004 | 応募フォーム | `ApplyPage` | public_screens.jsx |
| SCR-005 | 応募完了 | `ApplyDone` | public_screens.jsx |
| SCR-006 | 新規登録 | `SignupPage` | public_aux.jsx |
| SCR-007 | ログイン（会員）| `LoginPage` | public_aux.jsx |
| SCR-008 | マイページ | `MyPage` | public_screens.jsx |
| SCR-009 | 企業を探す | `CompanyPage` | public_aux.jsx |
| SCR-010 | 企業LP | `CompanyLP` | public_aux.jsx |
| SCR-012 | パスワード再設定 | `PasswordResetPage` | public_aux.jsx |
| SCR-014 | お知らせ | `NewsPage` | public_aux.jsx |
| SCR-015 | 静的（規約/FAQ等）| `StaticPage` | public_aux.jsx |
| SCR-016 | ログイン（企業）| `LoginPage forCompany` | public_aux.jsx |

（補助: `FavoritesPage` SCR-011, `ColumnPage` SCR-013 も public_aux.jsx に存在）

### 企業管理（`company_admin.jsx`）
| ID | 画面 | コンポーネント |
|---|---|---|
| SCR-017 | 企業ダッシュボード | `CompanyDashboard` |
| SCR-018 | 求人管理一覧 | `JobMgmtList` |
| SCR-019 | 求人エディタ | `JobEditor` |
| SCR-020 | 応募者一覧 | `ApplicantList` |
| SCR-021 | 応募者詳細 | `ApplicantDetail` |
| SCR-022/023 | アナリティクス | `AnalyticsPage` |

### 運営管理 Admin（`company_admin.jsx`）
| ID | 画面 | コンポーネント |
|---|---|---|
| SCR-027 | ログイン（Admin）| `LoginPage forAdmin` |
| SCR-028 | オーバービュー | `AdminOverview` |
| SCR-029 | 求人審査 | `AdminReview` |
| SCR-030 | 企業管理 | `AdminCompanies` |
| SCR-031 | 会員管理 | `AdminMembers` |

---

## 8. 主要コンポーネント仕様

### 8.1 トップページ `TopPage`（SCR-001）
構成要素（`public_screens.jsx`）: `Hero`（メインビジュアル、scale 対応）/ `SearchPanel`（職種・勤務地・雇用形態・タグから探すアコーディオン）/ `PickupCard`（注目求人カルーセル）/ `MiniJob`（コンパクト求人行）/ `SiteFooter`。求人一覧（§8.2）と同じデザイン言語で統一する。**色は §3.0 の純モノクロ上書きが適用される**（赤アクセントを使わない）。1画面1目的（S-01）・視線の階層（S-02）を意識。

### 8.2 求人一覧 / 検索 `SearchPage`（SCR-002）★主要
**レイアウト（≥981px）**
- コンテナ `.jl`: `width:100%`、左右 padding `clamp(40px,4vw,80px)`、下 `72px`。**全幅**（中央寄せ最大幅なし）。
- 縦順: パンくず → ヒーロー → 2カラム。
- ヒーロー `.jl-hero`: `grid-template-columns: 1fr auto; align-items: end`。左に見出し、右に件数+ソート。
- 本体 `.jl-layout`: `grid-template-columns: 1fr 288px; gap: 36px; align-items: start`。左がカードグリッド、右が検索条件サイドバー（`position: sticky; top: 88px`）。

**ヒーロー**
- `.jl-hero-en`「JOBS」: Barlow（Condensed系）700, `clamp(60px,6vw,82px)`, `letter-spacing:0.005em`, `line-height:0.82`, color primary（V-06: タイポを主役に）
- `.jl-hero-ja`「求人一覧」: JP 700, `--text-xl`, ベースライン揃え, `gap:24px`
- `.jl-hero-lead`: JP, `--text-sm`, secondary, `line-height:1.9`, margin-top 22px。コピー「音楽・エンタメ業界の最新求人情報を掲載中。気になる求人を見つけて応募しよう。」
- `.jl-count`: 「**152**件（新着順）」。数字 `<b>` は Barlow 700 `--text-xl`。「（新着順）」は tertiary `--text-xs`
- `.jl-sort select`: ネイティブ矢印を消し自前キャレット「⌄」。`border:1px solid border; border-radius:--radius-sm; padding:13px 40px 13px 16px; color:secondary`。hover で border primary。options: 新着順 / 年収が高い順 / 人気順

**カードグリッド** `.jl-grid`: `grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap:16px`（横幅に応じ列数自動増減し全幅を埋める）

**検索条件サイドバー** `.jl-side`: `border:1px solid border; border-radius:--radius-sm; background:rgba(255,255,255,0.7); position:sticky; top:88px`。中身: 見出し「検索条件」/ キーワード入力（虫眼鏡ボタン）/ アコーディオン4種（職種・雇用形態・勤務地・タグ, `FilterRow`）/ 「この条件で検索する」（黒 solid）+「条件をリセット」（アウトライン）/ 「保存した検索条件」（未ログイン時はログイン誘導）

**ページネーション** `.jl-pagination`: 中央寄せ `gap:18px; padding-top:34px`。各ボタン `34×34px; border-radius:--radius-sm; weight:700`。現在 `.on` は背景 primary / 文字 bg。その他 hover で文字 accent。省略 `.dots`「…」はクリック不可。

### 8.3 求人カード `JobListCard` + タグ `JobTags`（最重要・統一仕様）
- `.jl-card`: 縦積み、`background:surface; border:1px solid border; border-radius:--radius-sm; overflow:hidden`。hover で border primary。**シャドウなし**（V-03）。クリックで求人詳細(SCR-003)へ、対象 job を渡す。
- サムネ `.jl-thumb`: `aspect-ratio:16/9; background:#111; filter:grayscale(1)`（**既定モノクロ**）。カード hover で `grayscale(0)`（`transition:200ms ease-out`）。下部に黒グラデ `::after`（`inset:45% 0 0; linear-gradient(to bottom,transparent,rgba(0,0,0,.5))`）。※これは画像の可読性用オーバーレイであり N-01「グラデーション背景」には当たらない。
- ブックマーク `.jl-bookmark`: 右上 `26×26`, リボン型SVG（`viewBox 0 0 24 30`, path `M3 2h18v26l-9-7-9 7z`）。既定 `#fff`、保存済み `.on` で accent。hover `scale(1.08)`。クリックは `stopPropagation`。
- 本文 `.jl-body`（`padding:0 16px 16px`）:
  - バッジ `.jl-badges`: `transform: translateY(-12px)` でサムネ下端に重ねる。各 `.jl-badge` = `height:22px; padding:0 9px; background:surface; border:1px solid primary; color:primary; JP 700 11px`。「NEW」+ 雇用形態。
  - 会社名 `.jl-co`: `--text-xs` 700 secondary
  - タイトル `.jl-title`: `--text-base` 700 primary, line-height 1.5
  - 勤務地 `.jl-meta`: CSS作図ピン `.jl-pin`（9×9 枠線円 + 下向き三角 `::after`）+ 地名, `--text-xs` secondary
  - タグ `.jl-tags`: §下記
- **タグの「+N」省略（重要挙動）**: タグは**必ず1行**に収める。入りきらない分は末尾の「+N」ピルに集約。
  - `.jl-tag`: `height:28px; padding:0 14px; border:1.5px solid primary; background:transparent; border-radius:--radius-full（ピル）; JP 700 12px; color:primary; white-space:nowrap; flex:none`
  - `.jl-tag-more`「+N」: `background:primary; color:bg`（反転ピル）, `padding:0 12px`
  - アルゴリズム: 画面外の隠し measure 要素（`position:absolute; left:-9999px; visibility:hidden`）に全タグ+「+N」を実描画して各幅を測定 → コンテナ `clientWidth` に対し先頭から幅(+gap 6px)を積算、残タグがあれば「+N」幅分を確保しつつ収まる最大数を表示（最低1）。`ResizeObserver` で再計算。参照: `JobTags`。
  - ⚠️ **ガイドライン例外（V-02 / N-03 ピル禁止に対する意図的逸脱）**: 提供された参照デザイン画像に合わせ**タグのみ意図的にピル型**を採用。本番でもこの見た目を維持する（§3.0 / §5.1 で明記）。

### 8.4 求人詳細 `JobDetail`（SCR-003）
求人ヘッダー（タイトル・会社・雇用形態・勤務地・給与・タグ）、本文（仕事内容・応募要件等）、ブックマーク、応募CTA（→ SCR-004）。一覧と同じタグ・バッジ言語を流用。

### 8.5 応募フォーム `ApplyPage`（SCR-004）/ 完了 `ApplyDone`（SCR-005）
- `ApplyPage`: 複数ステップ（`step` state）。入力欄は `--radius-md`、focus で border primary。CTAは黒 solid。1画面1目的（S-01）。
- `ApplyDone`: 完了画面 `.thanks`。

### 8.6 認証系 `LoginPage`（SCR-007/016/027）/ `SignupPage` / `PasswordResetPage`
- `LoginPage` は `forCompany` / `forAdmin` フラグでタイトルと遷移先を切替（会員→SCR-008 / 企業→SCR-017 / Admin→SCR-028）。

### 8.7 管理画面共通
- 統計カード・テーブル・タブ（`tab` state）・`MiniChart`（簡易バー）。**シャドウ禁止**、罫線と余白で区切る（S-03）。数値は mono。アクセント色は最重要1点のみ（V-05）。図解は `visual-pattern-guideline-uesaka.md` に準拠。

---

## 9. インタラクション & 状態

ガイドライン I-01〜I-03（動きは意味があるときだけ / 静止で美しく / 150〜300ms ease-out）に準拠。

- 画面遷移: `nav(screenId, payload)`。本番では URL ルーティングに置換。`payload`（例: 選択した job）は route param / state / loader で渡す。
- カードクリック → 詳細遷移（job を伴う）
- ブックマーク: ローカル state トグル（`fav`）。本番は保存API + ログイン状態に依存
- ソート: `sort`（new / salary / popular）。本番はクエリ + 再フェッチ
- アコーディオン（`FilterRow`, `SearchPanel`）: 各行独立の `open` state
- タグ省略（`JobTags`）: `ResizeObserver` 駆動の `shown`/`overflow`
- フォーム（`ApplyPage`）: `step` でステップ管理
- タブ（`MyPage`, `StaticPage`, 管理画面）: `tab` state
- 現在画面の保持: プロト は localStorage。本番は URL が真実の状態。

---

## 10. レスポンシブ規則（求人一覧を代表例に）

グリッド・座標の詳細は `grid-system-guideline.md` も参照。

- **≥981px**: デスクトップ。グリッド `auto-fill minmax(280px,1fr)`、サイドバー右・sticky。
- **≤980px（タブレット）**: グリッド2列。検索条件サイドバーがグリッドの**上**へ（`order:-1`、sticky解除）。ヒーローとソートは縦積み。フィルタ選択肢は2カラム（`columns:2`）。
- **≤560px（スマホ）**: グリッド1列。カードは**横型**（`flex-direction:row`、左に幅132pxの画像、右にテキスト）。ヒーロー見出し48pxに縮小。件数/ソート縦積み。ブックマークは濃色アイコン。
- 他画面も同様に、768px / 560px 付近で段組みを単列化し、ヘッダーはドロワー + 下部タブバーに切替。

---

## 11. アセット & フォント

素材命名・管理は `asset-management-guideline-uesaka.md`、PDF書き出しは `pdf-output-guideline-uesaka.md` に準拠。

- 求人サムネイル: `assets/us/*.jpg`。プロトは `<image-slot>` でラップ → 本番は `<img>`/`next/image`。
- アイコン: ブックマーク・虫眼鏡・ピンなどはインラインSVG / CSS作図。外部アイコンフォント不使用（N-05: アイコン多用を避ける）。
- フォント: Barlow Condensed / Barlow（100–900 + italics）/ Barlow Semi Condensed / Noto Sans JP（可変）/ Roboto Mono（可変）を **ローカル配信**（`fonts/` 配下、CDN禁止）。日本語の第一候補は OS の Hiragino Sans、フォールバックが Noto Sans JP。
- トークン定義: `uesaka_tokens.css`（このリポジトリにコピー済み。上流は `style-guide-uesaka.md`）。

---

## 12. 同梱ファイルと対応シンボル

| ファイル | 内容 |
|---|---|
| `uesaka_tokens.css` | 全トークン（color/type/spacing/radius/motion）+ `.u-*` プリコンポーズクラス（上流: `style-guide-uesaka.md`）|
| `styles.css` | 全画面のスタイル。求人一覧は `/* JOB LIST (求人一覧) */`（`.jl-*`）|
| `discovery.html` | エントリ。`renderScreen` の画面→コンポーネント対応、ヘッダー/ドロワー/タブバー/サイドバーの実装 |
| `public_screens.jsx` | 公開主要画面（`TopPage`/`SearchPage`/`JobListCard`/`JobTags`/`FilterRow`/`JobDetail`/`ApplyPage`/`ApplyDone`/`MyPage`/`JOBLIST`）|
| `public_aux.jsx` | 認証・企業ページ・静的ページ（`LoginPage`/`SignupPage`/`PasswordResetPage`/`CompanyPage`/`CompanyLP`/`NewsPage`/`StaticPage`）|
| `company_admin.jsx` | 企業/運営管理（`CompanyDashboard`/`JobMgmtList`/`JobEditor`/`ApplicantList`/`ApplicantDetail`/`AnalyticsPage`/`AdminOverview`/`AdminReview`/`AdminCompanies`/`AdminMembers`）|
| `data.js` | モックデータ `window.MW_DATA`（jobs / categories 等）|
| `sp_app.jsx` | スマホ専用フレーム検証 |
| `guideline/.../guideline/md/*` | デザインシステムの土台（§0 参照）|

---

## 13. 実装チェックリスト（PRを出す前に）

ガイドライン `design-philosophy-uesaka.md` §9 ハンドオフチェックリスト + 本プロジェクト固有項目。

- [ ] 色・余白・角丸・フォントはすべてトークン参照（ハードコードなし）— P-02
- [ ] `box-shadow` を1つも使っていない — V-03 / N-04
- [ ] グラデーション背景なし / ピル型ボタンなし（タグの例外を除く）— N-01 / V-02 / N-03
- [ ] アクセント（レッド）は 1 viewport 1〜2箇所まで（`border-left` も1箇所換算）— V-05
- [ ] トップ／全体テーマは純モノクロ上書きを維持（赤・`#FAF9F7` を再導入していない）— §3.0
- [ ] 余白は 8px グリッド。情報過多を余白圧縮で解決していない — V-04
- [ ] 見出し・ラベル・CTA は1行に収まっている — S-04
- [ ] 求人カードのタグが常に1行 + 「+N」集約で破綻しない（リサイズ追従）
- [ ] サムネのモノクロ→hoverカラーが効いている
- [ ] 980px / 560px のブレークポイントで段組みが正しく崩れる
- [ ] 静止状態（スクリーンショット）で美しい — I-02
- [ ] プロトにない要素を勝手に足していない — P-01

---

*Based on Design Guideline by Uesaka Shunsuke V1.0.0（旧 Uesaka Design System v2.1 を置換）。トークン上流 = style-guide-uesaka.md v2.0。*
