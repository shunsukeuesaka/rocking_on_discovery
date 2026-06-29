import { useState } from 'react'
import type { Nav, SortKey } from '../types'
import { useJobs } from '../lib/useJobs'
import { JobCard } from '../components/JobCard'
import { SearchSidebar } from '../components/SearchSidebar'
import { Pagination } from '../components/Pagination'
import { JobGridSkeleton, EmptyState, ErrorState } from '../components/JobStates'

const TOTAL_PAGES = 10

/**
 * 求人一覧ページ（SCR-002）。
 * パンくず → ヒーロー（見出し + 件数 + ソート）→ 2カラム（求人グリッド + 検索条件サイドバー）。
 * Ported & extended from public_screens.jsx → SearchPage（loading/empty/error/disabled を追加）。
 */
export function JobListPage({ nav }: { nav: Nav }) {
  const [sort, setSort] = useState<SortKey>('new')
  const [page, setPage] = useState(1)
  const { status, jobs, total, reload } = useJobs(sort)

  const sortLabel = sort === 'salary' ? '年収が高い順' : sort === 'popular' ? '人気順' : '新着順'
  const busy = status === 'loading'

  return (
    <div className="jl">
      <div className="jl-breadcrumb">
        <a onClick={() => nav('SCR-001')}>ホーム</a>
        <span className="sep">›</span>
        <span>求人一覧</span>
      </div>

      <header className="jl-hero">
        <div className="jl-hero-left">
          <div className="jl-hero-title">
            <h1 className="jl-hero-en">JOBS</h1>
            <span className="jl-hero-ja">求人一覧</span>
          </div>
          <p className="jl-hero-lead">
            音楽・エンタメ業界の最新求人情報を掲載中。気になる求人を見つけて応募しよう。
          </p>
        </div>
        <div className="jl-control">
          <div className="jl-count">
            <b>{total}</b>件<span className="jl-count-sort">（{sortLabel}）</span>
          </div>
          <div className="jl-sort">
            <select
              value={sort}
              disabled={busy}
              aria-label="並び替え"
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              <option value="new">新着順</option>
              <option value="salary">年収が高い順</option>
              <option value="popular">人気順</option>
            </select>
            <span className="jl-sort-caret">⌄</span>
          </div>
        </div>
      </header>

      <div className="jl-layout">
        <div className="jl-main">
          {status === 'loading' && <JobGridSkeleton />}
          {status === 'error' && <ErrorState onRetry={reload} />}
          {status === 'success' && jobs.length === 0 && <EmptyState onReset={reload} />}
          {status === 'success' && jobs.length > 0 && (
            <div className="jl-grid">
              {jobs.map((j) => (
                <JobCard key={j.id} job={j} nav={nav} />
              ))}
            </div>
          )}

          {status === 'success' && jobs.length > 0 && (
            <Pagination page={page} totalPages={TOTAL_PAGES} onChange={setPage} />
          )}
        </div>

        <SearchSidebar nav={nav} busy={busy} onSearch={reload} onReset={reload} />
      </div>
    </div>
  )
}
