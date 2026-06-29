# rocking_on_discovery

「Discovery presented by rockin'on」— 音楽・エンタメ業界特化の求人プラットフォーム。
プロトタイプ（全34画面）を production 向けの技術スタックで忠実に再現した実装です。
デザイン基盤は **Uesaka Design System v2.1**。

## 技術スタック

既存コードベースが無かったため、プロトタイプ（React 18 + Babel Standalone）に
最も忠実な構成を選定しました。

- **React 18 + TypeScript**
- **Vite**（ビルド / dev サーバー）
- **生 CSS + CSS カスタムプロパティ**（単一の全画面スタイルシート）
- **@fontsource**（Barlow / Noto Sans JP / Roboto Mono をローカル同梱・CDN 非依存）

## セットアップ

```bash
npm install
npm run dev       # 開発サーバー（http://localhost:5173）
npm run build     # 型チェック + 本番ビルド
npm run preview   # ビルド成果物のプレビュー
```

## 画面ナビゲーション

プロトタイプと同じく、状態ベースの簡易ルーター（`src/app/AppShell.tsx`）で
画面を切り替えます。現在画面は localStorage に保持されます。

- **公開サイト**は共通ヘッダー/フッター、**企業/運営コンソール**は専用サイドバーで遷移。
- 画面左上の**スクリーンピッカー（ALL SCREENS）**から全34画面へジャンプできます
  （デザイナー検証用の開発ナビゲーター）。

## 実装画面（全34画面）

| エリア | 画面 |
| --- | --- |
| **PUBLIC** | SCR-001 トップ / 002 求人一覧 / 003 求人詳細 / 004 応募フォーム / 005 応募完了 / 006 会員登録 / 007 ログイン / 008 マイページ / 009 企業詳細 / 010 企業向けLP / 012 PWリセット / 014 お知らせ / 015 静的ページ群 |
| **COMPANY** | SCR-016 ログイン / 017 ダッシュボード / 018 求人管理 / 019 求人作成・編集 / 020 応募者管理 / 021 応募者詳細 / 022・023 アナリティクス / 024-026 設定（ダッシュボード再利用）|
| **ADMIN** | SCR-027 ログイン / 028 管理概要 / 029 求人審査 / 030・031 企業管理 / 032 会員管理 / 033 レポート / 034 お問い合わせ管理 |

## ディレクトリ構成

```
src/
  app/         AppShell（ルーター）, registry（画面ID→コンポーネント）, Placeholder
  shell/       SiteHeader/MobileDrawer/MobileTabBar, ConsoleSidebars, DevNav（画面ピッカー）
  screens/
    public/    公開サイトの各画面
    console/   企業コンソールの各画面
    admin/     運営コンソールの各画面
  pages/       JobListPage（SCR-002, loading/empty/error/disabled を実装）
  components/  JobCard / JobTags / Img / MiniChart など共通部品
  data/        mwData.ts（jobs/applicants/columns/categories/screens のモック）
  styles/      prototype.css（全画面スタイル）, states.css（状態表示の追加分）
  lib/         useJobs（SCR-002 のデータ取得フック）, placeholder（画像フォールバック）
```

## SCR-002（求人一覧）の状態（state）

求人一覧は loading / empty / error / disabled を実装しています。
URL クエリ `?state=` で確認できます（検証・デモ用）。

| 状態 | 確認 |
| --- | --- |
| success（既定）| `/` |
| loading | `/?state=loading` |
| empty | `/?state=empty` |
| error | `/?state=error` |

## production 化のための引き継ぎ事項

プロトタイプはビジュアル参照です。本実装では以下を「差し替え点」として明示しています。

- **データ取得**: `src/data/mwData.ts` / `src/lib/useJobs.ts` のモックを各 API に置換。
- **ルーティング**: `src/app/AppShell.tsx` の状態ベースルーターを React Router / Next routing に置換。
  画面遷移はすべて `nav(screenId, payload)` を経由。
- **画像**: サムネは `assets/us/*.jpg` を参照。バンドル未同梱のため、共通 `Img` コンポーネントが
  読込失敗時に決定的な SVG プレースホルダへフォールバック。実画像を `public/assets/us/` に置けば表示されます。
- **フォント**: `/fonts` のローカル TTF 想定を `@fontsource` のローカル配信で再現。
- **開発ナビゲーター**（スクリーンピッカー）は検証用。本番では除去可能（`src/shell/DevNav.tsx`、`AppShell` の `NavBar`/`ScreenMenu`）。

## デザイン上の注意（プロトタイプより）

- **タグ（ピル）は DS 例外**: Uesaka DS は原則ピル型禁止だが、参照デザインに合わせてタグのみ採用。
- **シャドウ禁止**: 奥行きは余白・border・レイヤーで表現。
- **アクセント（レッド #D93030）は 1 画面に 1〜2 箇所まで**。
- **EN 見出しフォント**: 仕様の Barlow を正とする（フォールバック先で Barlow が当たる）。

## 参考（同梱の元ソース）

- `design_handoff_job_list/` — SCR-002 のデザインハンドオフ一式（README が仕様書）。
- `design_handoff_full/` — プロトタイプ全画面の抽出ソース（全CSS + public/company/admin の JSX + app_shell）。
  本実装の元仕様。
