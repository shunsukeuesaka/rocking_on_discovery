import { useState } from 'react'
import type { Nav } from '../types'
import { CATEGORIES } from '../data/jobs'
import { FilterRow } from './FilterRow'
import { SearchIcon } from './icons'

/**
 * 検索条件サイドバー（.jl-side）。キーワード入力 + アコーディオン×4 +
 * アクション + 「保存した検索条件」。
 * Ported from public_screens.jsx → SearchPage の <aside> ブロック。
 *
 * `busy`（一覧の読込中）のあいだは検索/リセットを disabled に（state: disabled）。
 */
export function SearchSidebar({
  nav,
  busy = false,
  onSearch,
  onReset,
}: {
  nav: Nav
  busy?: boolean
  onSearch: () => void
  onReset: () => void
}) {
  const [keyword, setKeyword] = useState('')

  return (
    <aside className="jl-side">
      <div className="jl-filter-section">
        <h2 className="jl-side-title">検索条件</h2>

        <div className="jl-field">
          <label className="jl-field-label" htmlFor="jl-keyword">
            キーワード
          </label>
          <div className="jl-search">
            <input
              id="jl-keyword"
              placeholder="職種名・企業名・スキルなど"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button aria-label="検索" onClick={onSearch}>
              <SearchIcon />
            </button>
          </div>
        </div>

        <FilterRow label="職種" value="すべての職種" options={CATEGORIES.map((c) => c.ja)} disabled={busy} />
        <FilterRow
          label="雇用形態"
          value="すべての雇用形態"
          options={['正社員', '契約社員', '業務委託', 'アルバイト・パート']}
          disabled={busy}
        />
        <FilterRow label="勤務地" value="すべての勤務地" options={['東京', '大阪', '名古屋', '福岡', 'リモート可']} disabled={busy} />
        <FilterRow
          label="タグ"
          value="すべてのタグ"
          options={['フェス', 'PA/音響', 'ライブ', '編集', 'DTM', 'プロモーション']}
          disabled={busy}
        />

        <div className="jl-actions">
          <button className="jl-search-btn" disabled={busy} onClick={onSearch}>
            {busy ? '検索中…' : 'この条件で検索する'}
          </button>
          <button className="jl-reset-btn" disabled={busy} onClick={onReset}>
            条件をリセット
          </button>
        </div>
      </div>

      <div className="jl-saved">
        <h3>保存した検索条件</h3>
        <button className="jl-saved-row" onClick={() => nav('SCR-007')}>
          <span>ログインすると保存できます</span>
          <span className="jl-saved-arrow">›</span>
        </button>
      </div>
    </aside>
  )
}
