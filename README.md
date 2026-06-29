# rocking_on_discovery

「Discovery presented by rockin'on」— 音楽・エンタメ業界特化の求人プラットフォーム。
本リポジトリは **求人一覧ページ（Job List / Search, 画面ID: `SCR-002`）** の実装です。

デザインハンドオフ（`design_handoff_job_list/`）の高忠実度モックを、production 向けの
技術スタックで再現しています。デザイン基盤は **Uesaka Design System v2.1**。

## 技術スタック

既存のコードベースが無かったため、ハンドオフ README の指示に従いプロトタイプ
（React 18 + Babel Standalone）に最も忠実な構成を選定しました。

- **React 18 + TypeScript**
- **Vite**（ビルド / dev サーバー）
- **生 CSS + CSS カスタムプロパティ**（デザイントークン）
- **@fontsource**（Barlow / Noto Sans JP / Roboto Mono をローカル同梱・CDN 非依存）

## セットアップ

```bash
npm install
npm run dev       # 開発サーバー（http://localhost:5173）
npm run build     # 型チェック + 本番ビルド
npm run preview   # ビルド成果物のプレビュー
```

## 実装した状態（state）

求人一覧グリッドは以下の状態を実装しています。
URL クエリ `?state=` で各状態を確認できます（検証・デモ用）。

| 状態      | 説明                                      | 確認方法          |
| --------- | ----------------------------------------- | ----------------- |
| `success` | 求人カードのグリッド表示（デフォルト）    | `/`               |
| `loading` | スケルトンカード + 検索/ソートを disabled | `/?state=loading` |
| `empty`   | 該当求人なし（リセット導線）              | `/?state=empty`   |
| `error`   | 取得失敗（再読み込み導線）                | `/?state=error`   |

`disabled` は読込中の「この条件で検索する」「条件をリセット」「並び替え」、および
ページネーション端（前へ/次へ）の非活性として実装しています。

## 主要コンポーネント

| ファイル | 役割 | ハンドオフ対応 |
| --- | --- | --- |
| `src/pages/JobListPage.tsx` | 求人一覧ページ本体 | `SearchPage` |
| `src/components/JobCard.tsx` | 求人カード | `JobListCard` |
| `src/components/JobTags.tsx` | タグの1行省略（ResizeObserver） | `JobTags` |
| `src/components/FilterRow.tsx` | サイドバーのアコーディオン1行 | `FilterRow` |
| `src/components/SearchSidebar.tsx` | 検索条件サイドバー | `SearchPage` の `<aside>` |
| `src/components/Pagination.tsx` | ページネーション | pagination ブロック |
| `src/components/JobStates.tsx` | loading / empty / error | （新規） |
| `src/lib/useJobs.ts` | データ取得フック（状態管理） | `JOBLIST` の差し替え点 |
| `src/data/jobs.ts` | モックデータ（9件）+ 職種カテゴリ | `JOBLIST` / `MW_DATA` |
| `src/styles/jobList.css` | `.jl-*` スタイル（ハンドオフから忠実移植） | `styles.css` JOB LIST 節 |
| `src/styles/tokens.css` | デザイントークン実数値 | `colors_and_type.css` |

## production 化のための引き継ぎ事項

ハンドオフはビジュアル参照です。本実装では以下を「差し替え点」として明示しています。

- **データ取得**: `src/lib/useJobs.ts` のモックを求人一覧 API に置換
  （検索条件・ソート・ページネーションのクエリ対応）。
- **ルーティング**: `src/lib/nav.ts` の `nav(screenId, payload)` を
  React Router / Next routing に接続（現状は `mw:navigate` CustomEvent を発火）。
- **ブックマーク**: 現状はカードローカル state。保存 API + ログイン要否制御が必要。
- **画像**: サムネは `assets/us/*.jpg` を参照。バンドル未同梱のため、
  `JobThumb` が読込失敗時に決定的な SVG プレースホルダへフォールバック。
  実画像を `public/assets/us/` に置けばそのまま表示されます。
- **フォント**: ハンドオフは `/fonts` のローカル TTF を想定。本実装は同等の
  ローカル配信を `@fontsource` で実現（CDN 非依存の DS 方針を踏襲）。

## デザイン上の注意（ハンドオフより）

- **タグ（ピル）は DS 例外**: Uesaka DS は原則ピル型禁止（`--radius-full` 回避）
  だが、参照デザインに合わせてタグのみピル型を採用。本実装でも維持。
- **シャドウ禁止**: 奥行きは余白・border・レイヤーで表現。
- **アクセント（レッド #D93030）は 1 画面に 1〜2 箇所まで**。
- **EN 見出しフォント**: ハンドオフ README の仕様（**Barlow**）を正とした。
  （プロトタイプの `styles.css` には後付けで "Bebas Neue" への上書きがあるが、
  仕様書である README を優先。）

## 参考

- `design_handoff_job_list/` — デザインハンドオフ一式（README が仕様書）。
  本リポジトリ直下に配置すると、ハンドオフの参照ソースとして残せます。
