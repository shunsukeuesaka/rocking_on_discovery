# rocking_on_discovery

「Discovery presented by rockin'on」— 音楽・エンタメ業界特化のキャリア（求人）プラットフォーム。

## 🔴 最重要：デザイン実装の参照体系

デザインの**思想・トークン・ルールの土台**は、うえさかのパーソナルデザインガイドライン群「**Design Guideline by Uesaka Shunsuke V1.0.0**」とする（旧称「Uesaka Design System v2.1」は廃止・置換）。本プロジェクト固有の画面・コンポーネント・例外は `design.md` が定義する。

参照は次の階層・順序で行う。**作業前に必ず最新を Read すること（キャッシュしない）。**

1. **ガイドライン群**（デザインシステムの土台。まず `DESIGN.md` を読む）
   ```
   project/guideline/ForAI_DesignGuideline_by_UesakaShunsuke_V1.0.0/guideline/md/
   ```
   ※ パスはリポジトリ直下からの相対。`guideline/.../V1.0.0` は `design-guideline-uesaka` の **git submodule**（本家と同期）。クローン直後は `git submodule update --init --recursive` で取得すること。
   - `DESIGN.md` … 全ガイドラインのAI用サマリー（**最初に読む**）
   - `design-philosophy-uesaka.md` … 設計思想・絶対ルール（**P/V/S/I/N 体系**）
   - `style-guide-uesaka.md` … 色・タイポ・スペースのトークン定義（**トークンの上流**）
   - `grid-system-guideline.md` ほか … グリッド・図解・コンテンツ・素材・PDF 各仕様
2. **プロジェクト固有仕様** `design.md`（画面インベントリ・コンポーネント実数値・レスポンシブ・例外）
   ```
   project/design.md
   ```

色・サイズ・余白・角丸・フォントは推測せず、`uesaka_tokens.css`（上流 = `style-guide-uesaka.md`）の design token を `var(--*)` で参照する。**⚠️ 色の最終値は `design.md` §3.0 の「純モノクロ上書き」が正**：トークンCSS冒頭は accent＝赤 `#D93030` だが、実装では charcoal `#1C1C1A` に再マップされる（`prototype.css` 末尾の `MONOCHROME / WHITE-BG OVERRIDE` ブロックに集約）。トークン冒頭の赤を鵜呑みにしない。迷ったら実描画の算出値（devtools / preview_inspect）を確認する。

同梱のプロトタイプ・トークン・スタイルは `design.md` と同じディレクトリにある:
- `uesaka_tokens.css` … 全 design token（上流 = `style-guide-uesaka.md`）
- `styles.css` … 全画面スタイル（求人一覧は `.jl-*`）
- `public_screens.jsx` / `public_aux.jsx` / `company_admin.jsx` … 各画面コンポーネント
- `data.js` … モックデータ
- `discovery.html` / `ro_discovery*.html` … エントリ・画面マッピング

## 🟢 実装の所在（`src/` が本体・`project/` は参照専用）

**⚠️ `project/` はデザイン参照・プロトタイプ置き場**。実際に動く React アプリと「生きたコード」は **`src/`** にある。両者は別ファイルで値が微妙に食い違うことがある（例：`.btn-primary` の padding が `project/styles.css`=`11px 24px` vs `src/styles/prototype.css`=`12px 24px`）。**実数値・現状のコンポーネントを確認・改修するときは必ず `src/` 側を正とする。**

- **エントリ**: `index.html` → `src/main.tsx`（Vite + React 18 / TypeScript）
- **生きたCSS**: `src/styles/prototype.css`（全画面スタイル。`project/styles.css` の移植版＝こちらが実際に読み込まれる）＋ `src/styles/states.css`（loading/empty/error）。**`project/*.css` は編集しても画面に反映されない。**
- **画面**: `src/screens/`（public / console / admin）、共通は `src/components/`・`src/shell/`
- **起動 / 確認**: `npm run dev`（`.claude/launch.json` の `dev` は `:5180` 固定）。画面遷移は **URL ルーティングではなく state ベース**（`src/app/AppShell.tsx` の `useState`）。画面の切替は上部 **DevNav の screen-picker（`■ SCR-xxx ▾`）**から `SCR-xxx` を選ぶ。ヘッダーのボタンを押しても画面遷移しないので注意。

### ボタンは2系統ある
- `btn-primary` / `btn-secondary` / `btn-ghost`（+ `btn-sm`）… 汎用フォーム系（ログイン・応募・管理画面など）。定義は `src/styles/prototype.css` の `BUTTONS` セクション。
- `dp-btn`（`.ghost` / `.solid` / `.block`）… トップページ等 editorial 系のボタン。
- どちらも角丸 `4px`・反シャドウ・モノクロ（accent は §3.0 で charcoal）。**新規UIでどちらを使うかは既存画面の系統に合わせる。**

### 絶対禁止（design-philosophy-uesaka.md / P・V・N 体系）

1. グラデーション背景（N-01）
2. ピル型ボタン・角丸大きすぎ（`border-radius: 9999px`）※タグのみ例外（N-03 / V-02）
3. `box-shadow`（シャドウ）（N-04 / V-03）
4. カラフルすぎる配色／ネオン・パステル・虹色の多色使い（N-02）
5. アクセントカラー（レッド `#D93030`）を 1 viewport に3箇所以上（V-05）

### 基本原則

- モノクロ基調（V-01）。アクセント（レッド `#D93030`）は最重要1点・1 viewport 1〜2箇所まで（V-05）。8px グリッド・引き算の美学（P-01 / V-04：プロトにない装飾・セクションを勝手に足さない）。シャープな角丸 2〜4px（V-02）・反シャドウ（V-03）・タイポを主役に（V-06）。
- **⚠️ トップページ／サイト全体テーマは「純モノクロ上書き」が優先**：背景 `#FFFFFF`・アクセントは charcoal `#1C1C1A`（赤と `#FAF9F7` を再導入しない）。詳細は `design.md` §3.0。
- 矛盾時の優先順位：**(1) プロジェクト個別決定 > (2) `design.md` 固有仕様 > (3) ガイドライン群**。
- 詳細・実数値・画面インベントリ・コンポーネント仕様・レスポンシブ規則・実装チェックリストはすべて `design.md` を参照。

> design.md・ガイドライン群はともに更新されることがあるため、毎回キャッシュせず最新を読むこと。
