# Handoff: 求人一覧ページ（Job List / Search）

## Overview
音楽・エンタメ業界特化のキャリアプラットフォーム「Discovery presented by rockin'on」の **求人一覧ページ**（画面ID: `SCR-002`）の実装ハンドオフです。求人カードのグリッド表示、サイドバーの検索条件パネル、ページネーションを含みます。トップページ（`SCR-001`）と統一されたデザイン言語（Uesaka Design System v2.1）を踏襲しています。

## About the Design Files
このバンドルに含まれるファイルは **HTMLで作成されたデザインリファレンス**です。意図した見た目と挙動を示すプロトタイプであり、そのまま本番投入するコードではありません。タスクは、これらのHTMLデザインを **ターゲットのコードベースの既存環境**（React / Vue / Next.js など）の確立されたパターン・ライブラリで**再現すること**です。まだ環境がない場合は、プロジェクトに最適なフレームワークを選定して実装してください。

現状のプロトタイプは、ビルド工程のない構成（React 18 + Babel Standalone をブラウザでその場トランスパイル、生CSS + CSSカスタムプロパティ）で動いています。本番ではこの構成を踏襲する必要はありません。

## Fidelity
**High-fidelity (hifi)** です。最終的な配色・タイポグラフィ・余白・インタラクションを含むピクセルパーフェクトなモックです。下記の design token とコンポーネント仕様の実数値を使って忠実に再現してください。

---

## Screens / Views

### 求人一覧ページ（SCR-002）

**Purpose**: 掲載中の求人を一覧し、検索条件で絞り込み、気になる求人をブックマーク、カードクリックで求人詳細（SCR-003）へ遷移する。

**Layout（デスクトップ ≥ 981px）**
- ページコンテナ `.jl`: `width: 100%`、左右 padding `clamp(40px, 4vw, 80px)`、下 padding `72px`。**全幅**（中央寄せの最大幅制限なし）。
- 上から順に: パンくず → ヒーロー → 2カラムレイアウト。
- パンくず `.jl-breadcrumb`: `ホーム › 求人一覧`。フォントサイズ `12px`、色 `--color-text-secondary`、`gap: 12px`。
- ヒーロー `.jl-hero`: `display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 32px`。左に大見出し、右にソートコントロール。
  - 左 `.jl-hero-left`: 見出し行 `.jl-hero-title`（`display: flex; align-items: baseline; gap: 24px`）= 英語見出し「JOBS」+ 和文「求人一覧」、その下にリード文。
  - 右 `.jl-control`: `display: grid; gap: 12px; min-width: 190px`。件数表示 + ソートセレクト。
- メインレイアウト `.jl-layout`: `display: grid; grid-template-columns: 1fr 288px; gap: 36px; align-items: start`。左が求人グリッド、右が検索条件サイドバー。
- 求人グリッド `.jl-grid`: `display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px`。横幅に応じて列数が自動増減（広い画面で4〜5列）。
- サイドバー `.jl-side`: `position: sticky; top: 88px`。スクロール追従。

**Components**

#### 1. ヒーロー見出し
- 英語見出し `.jl-hero-en`「JOBS」: `font-family: Barlow; font-weight: 700; font-size: clamp(60px, 6vw, 82px); letter-spacing: 0.005em; line-height: 0.82; color: #1C1C1A`。
- 和文 `.jl-hero-ja`「求人一覧」: `font-family: Hiragino Sans / Noto Sans JP; font-weight: 700; font-size: 20px (--text-xl); color: #1C1C1A`。
- リード `.jl-hero-lead`: `font-size: 14px (--text-sm); color: #5C5B57; line-height: 1.9; margin-top: 22px`。コピー: 「音楽・エンタメ業界の最新求人情報を掲載中。気になる求人を見つけて応募しよう。」

#### 2. 件数 + ソート（ヒーロー右）
- 件数 `.jl-count`: 「**152**件（新着順）」。数字 `b` は Barlow 700 / `20px (--text-xl)`、本文は和文 700 / `16px`。「（新着順）」は `--color-text-tertiary` / `12px` / regular。
- ソート `.jl-sort select`: ネイティブselectの矢印を消し（`appearance: none`）、右に自前のキャレット `⌄`。`border: 1px solid #E0DDD9; border-radius: 2px (--radius-sm); padding: 13px 40px 13px 16px; font-size: 14px; color: #5C5B57`。hover時 border `#1C1C1A`。
  - オプション: 新着順 / 年収が高い順 / 人気順。

#### 3. 求人カード `.jl-card`（最重要・統一仕様）
- 縦積み（`flex-direction: column`）。`background: #F2F0ED (--color-surface); border: 1px solid #E0DDD9; border-radius: 2px; overflow: hidden`。クリックで求人詳細へ。**シャドウなし**。
- hover: border が `#1C1C1A` に変化。
- サムネ `.jl-thumb`: `aspect-ratio: 16/9; background: #111; filter: grayscale(1)`（**デフォルトでモノクロ**）。hover で `grayscale(0)`（カラー化）、transition `200ms ease-out`。
  - 下部グラデーション `::after`: `inset: 45% 0 0; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))`。
  - ブックマークボタン `.jl-bookmark`: 右上 `top:12px; right:12px`、`26×26px`、リボン型SVGアイコン（`viewBox 0 0 24 30`, path `M3 2h18v26l-9-7-9 7z`）。デフォルト白 `#fff`、保存済み `.on` で `--color-accent (#D93030)`。hover で `scale(1.08)`。
- 本文 `.jl-body`: `padding: 0 16px 16px`。
  - バッジ列 `.jl-badges`: サムネ下端に `transform: translateY(-12px)` で重なる。各バッジ `.jl-badge` = `height: 22px; padding: 0 9px; background: #F2F0ED; border: 1px solid #1C1C1A; color: #1C1C1A; font-size: 11px; weight: 700`。「NEW」「正社員」など。
  - 会社名 `.jl-co`: `font-size: 12px; weight: 700; color: #5C5B57`。
  - タイトル `.jl-title`: `font-size: 16px (--text-base); weight: 700; color: #1C1C1A; line-height: 1.5`。
  - 勤務地 `.jl-meta`: ピン型アイコン（CSSで作図、`.jl-pin`）+ 地名。`font-size: 12px; color: #5C5B57`。
  - タグ `.jl-tags`: **1行固定・横スクロールなし**。下記「タグの省略ロジック」参照。

#### 4. タグ（ピル）`.jl-tag`
- `height: 28px; padding: 0 14px; border: 1.5px solid #1C1C1A; background: transparent; border-radius: 9999px (--radius-full); font-size: 12px; weight: 700; color: #1C1C1A; white-space: nowrap`。
- オーバーフロー表示 `.jl-tag-more`「+N」: `background: #1C1C1A; color: #FAF9F7; padding: 0 12px`（黒の塗りつぶしピル）。
- ⚠️ **デザインシステム例外**: Uesaka DSは原則「ピル型禁止（`--radius-full` 回避）」だが、参照デザイン画像に合わせてタグのみピル型を採用している。本番でもこの見た目を維持すること。

#### 5. ページネーション `.jl-pagination`
- 中央寄せ、`gap: 18px; padding-top: 34px`。各ボタン `34×34px; border-radius: 2px; weight: 700`。
- 現在ページ `.on`: `background: #1C1C1A; color: #FAF9F7`。その他は背景なし、hover で文字色 `--color-accent`。
- 省略 `.dots`「…」はクリック不可。構成例: `‹ 1 2 3 … 10 ›`。

#### 6. 検索条件サイドバー `.jl-side`
- 枠 `border: 1px solid #E0DDD9; border-radius: 2px; background: rgba(255,255,255,0.7)`。
- フィルタセクション `.jl-filter-section`: `padding: 24px 20px`、下border。
  - 見出し `.jl-side-title`「検索条件」: `font-size: 18px (--text-lg); weight: 700`。
  - キーワード入力 `.jl-search`: ラベル「キーワード」+ input（虫眼鏡SVGボタン付き）。input `padding: 13px 42px 13px 14px; border: 1px solid #E0DDD9; border-radius: 2px; font-size: 12px`。placeholder「職種名・企業名・スキルなど」。
  - アコーディオン `.jl-filter` ×4（職種 / 雇用形態 / 勤務地 / タグ）: ヘッダ `.jl-filter-head` に上border。左にラベル（`14px` 700）+ 現在値（`12px` tertiary、例「すべての職種」）、右に開閉サイン `＋` / `−`（`22px`）。開くと `.jl-filter-opts`（チェックボックスリスト、`accent-color: #D93030`）。
  - アクション `.jl-actions`: 「この条件で検索する」= 黒ボタン（`background: #050505 / 実質 #1C1C1A 系; color: #fff; padding: 14px; weight: 700`、hover `--color-gray-800 #282826`）。「条件をリセット」= アウトライン（`border: 1px solid #1C1C1A; background: transparent`）。
- 保存した検索条件 `.jl-saved`: `padding: 24px 20px`。見出し「保存した検索条件」+ 1行リンク「ログインすると保存できます ›」（クリックでログイン画面 SCR-007 へ）。

---

## Interactions & Behavior
- **カードクリック**: 求人詳細画面（SCR-003）へ遷移。`nav('SCR-003', { job })` で対象求人オブジェクトを渡す。
- **ブックマーク**: カード内のボタン。`e.stopPropagation()` でカード遷移を抑止し、ローカルstateでトグル（`fav`）。本番では保存API + ログイン要否の制御が必要。
- **サムネのモノクロ→カラー**: hover時に `filter: grayscale(1) → 0`（`transition: 200ms ease-out`）。
- **タグの1行省略（重要ロジック）**: `JobTags` コンポーネントが画面外の隠し measure 要素で各タグの実幅を測り、カード幅（`ResizeObserver` で監視）に収まる枚数だけ表示。残りを「+N」ピルにまとめる。常に1行を維持し、リサイズに追従。
  - 実装方針（本番）: CSS だけでは正確な「+N」集約はできないため、同等の measure ロジック（ResizeObserver か container query + JS）を再現するか、サーバー側で表示タグ数を固定する設計でもよい。
- **アコーディオン**: 各フィルタは独立して開閉（ローカルstate `open`）。
- **ソートセレクト**: ローカルstate。本番ではクエリパラメータ + 再フェッチ。
- **ページネーション**: 現状はダミー（すべて同じ一覧へ）。本番はページ番号でフェッチ。

## State Management
- `fav`（カードごと、ブックマーク状態）
- `sort`（一覧のソート種別: new / salary / popular）
- `open`（フィルタ各行の開閉）
- `shown` / `overflow`（JobTags の表示タグ数。ResizeObserver 駆動）
- 画面遷移は `nav(screenId, payload)`。現状は localStorage に現在画面IDを保持する自前ルーター。本番は React Router / Next.js routing に置換。
- データ取得: 現状は静的配列 `JOBLIST`（9件）。本番は求人一覧API（検索条件・ソート・ページネーションのクエリ対応）。

## Design Tokens（Uesaka Design System v2.1 — 実数値）

**Colors**
- `--color-bg: #FAF9F7`（背景）
- `--color-surface: #F2F0ED`（カード面）
- `--color-border: #E0DDD9`
- `--color-text-primary: #1C1C1A`
- `--color-text-secondary: #5C5B57`
- `--color-text-tertiary: #9C9B96`
- `--color-accent: #D93030`（レッド。1画面に2箇所まで）
- `--color-accent-hover: #E05050`
- `--color-gray-800: #282826`（黒ボタンhover）

**Typography**
- EN見出し: `Barlow`（700, tracking 0.03em）。フォールバック `Barlow Condensed → Oswald`。
- JP本文: `Hiragino Sans, Noto Sans JP`。
- Mono: `Roboto Mono`。
- スケール: `--text-xs: 12px`, `--text-sm: 14px`, `--text-base: 16px`, `--text-lg: 18px`, `--text-xl: 20px`。
- weight: regular 400 / medium 500 / bold 700。line-height body 1.75 / heading 1.15。

**Spacing（8pxグリッド）**
- 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96px。

**Radius**
- `--radius-sm: 2px`（タグ以外のカード・入力・ボタン）, `--radius-md: 4px`, `--radius-full: 9999px`（このページはタグのみ使用）。

**Elevation**
- **シャドウ禁止**。奥行きは余白・border・レイヤーで表現。

**Motion**
- `--transition-hover: 150ms ease-out`, `--transition-base: 200ms ease-out`, `--transition-page: 250ms ease-in-out`。

## Responsive behavior
- **≥ 981px**: 上記デスクトップ。グリッドは `auto-fill, minmax(280px, 1fr)`。
- **≤ 980px（タブレット）**: 求人グリッド2列。検索条件サイドバーが求人グリッドの**上**に移動（`order: -1`、sticky解除）。ヒーローとソートが縦積み。フィルタ選択肢は2カラム（`columns: 2`）。
- **≤ 560px（スマホ）**: グリッド1列。カードが**横型**に切替（`flex-direction: row`、左に幅132pxの画像、右にテキスト）。ヒーロー見出し48pxに縮小。件数/ソートを縦積み。ブックマークは濃色アイコン。

## Assets
- 求人サムネイル画像: `assets/us/*.jpg`（プロジェクト内）。プロトタイプでは `<image-slot>`（ドラッグ&ドロップ差し替え用Web Component）でラップしているが、本番では通常の `<img>` / `next/image` でよい。
- アイコン類（ブックマーク・虫眼鏡・ピン）はすべてインラインSVG / CSS作図。外部アイコンフォント不使用。
- ブランド/デザイントークンは Uesaka Design System v2.1 に準拠（社内デザインシステムがあればそちらの実装を使用）。

## Files
このバンドルに同梱:
- `README.md` — 本書
- `styles.css` — 全画面のスタイル。求人一覧は `/* JOB LIST (求人一覧) */` セクション（`.jl-*`）を参照。
- `public_screens.jsx` — 公開画面のReactコンポーネント。`SearchPage` / `JobListCard` / `JobTags` / `FilterRow` / `JOBLIST`（モックデータ）を参照。
- `data.js` — その他モックデータ（`window.MW_DATA`、職種カテゴリ等）。
- `discovery.html` — エントリーポイント（スクリプト読込順・自前ルーターの参考）。
- `colors_and_type.css` — Uesaka Design System のトークン定義（全CSS変数の実数値）。

### 参照すべき主なシンボル（public_screens.jsx 内）
- `SearchPage({ nav })` — 求人一覧ページ本体
- `JobListCard({ job, nav })` — 求人カード
- `JobTags({ tags })` — タグの1行省略ロジック（ResizeObserver）
- `FilterRow({ label, value, options })` — サイドバーのアコーディオン1行
- `JOBLIST` — 表示用モックデータ（9件）
