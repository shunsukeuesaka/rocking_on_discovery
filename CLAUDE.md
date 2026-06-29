# rocking_on_discovery

「Discovery presented by rockin'on」— 音楽・エンタメ業界特化のキャリア（求人）プラットフォーム。

## 🔴 最重要：デザイン実装の唯一の参照仕様

このプロジェクトの UI/画面実装は、必ず以下の `design.md` を**単一の参照仕様**として従うこと。

```
/Users/uesakashunsuke/Desktop/rockin-on-pf/project/design.md
```

**実装・デザイン・UI に関わる作業を始める前に、まず上記 `design.md` を Read で通読し、そこに書かれた数値・規約・原則に厳密に従うこと。** 色・サイズ・余白・角丸・フォントは推測せず、design.md と `colors_and_type.css` の design token を `var(--*)` で参照する。

同梱のプロトタイプ・トークン・スタイルは同じディレクトリにある:
- `colors_and_type.css` / `uesaka_tokens.css` … 全 design token
- `styles.css` … 全画面スタイル（求人一覧は `.jl-*`）
- `public_screens.jsx` / `public_aux.jsx` / `company_admin.jsx` … 各画面コンポーネント
- `data.js` … モックデータ
- `discovery.html` / `ro_discovery*.html` … エントリ・画面マッピング

### 絶対禁止（Uesaka Design System v2.1）

1. グラデーション背景
2. ピル型ボタン（`border-radius: 9999px`）※タグのみ例外
3. `box-shadow`（シャドウ）
4. ネオン・パステル・虹色の多色使い
5. アクセントカラー（レッド `#D93030`）を1画面に3箇所以上

### 基本原則

- モノクロ基調：warm off-white `#FAF9F7` + charcoal `#1C1C1A`。レッド `#D93030` は最重要1点（1画面1〜2箇所まで）。
- 8px グリッド。引き算の美学（プロトにない装飾・セクションを勝手に足さない）。
- 詳細・実数値・画面インベントリ・コンポーネント仕様・レスポンシブ規則・実装チェックリストはすべて `design.md` を参照。

> design.md が更新されることがあるため、毎回キャッシュせず最新を読むこと。
