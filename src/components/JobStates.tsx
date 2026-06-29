/**
 * 一覧の状態表示: loading（スケルトン）/ empty（該当なし）/ error（取得失敗）。
 * いずれも Uesaka DS v2.1 準拠（シャドウなし・シャープな角丸・アクセント最小）。
 */

/** Loading — 1枚分のスケルトンカード。 */
function JobCardSkeleton() {
  return (
    <div className="jl-skel" aria-hidden="true">
      <div className="jl-skel-thumb" />
      <div className="jl-skel-body">
        <div className="jl-skel-line sm" />
        <div className="jl-skel-line lg" />
        <div className="jl-skel-line md" />
        <div className="jl-skel-chips">
          <span className="jl-skel-chip" />
          <span className="jl-skel-chip" />
        </div>
      </div>
    </div>
  )
}

/** Loading — グリッドを埋めるスケルトン群。 */
export function JobGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="jl-grid" role="status" aria-busy="true" aria-label="求人を読み込み中">
      {Array.from({ length: count }, (_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  )
}

/** Empty — 条件に一致する求人がない。 */
export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="jl-grid">
      <div className="jl-state empty" role="status">
        <div className="jl-state-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>
        </div>
        <div className="jl-state-title">該当する求人が見つかりませんでした</div>
        <p className="jl-state-desc">
          検索条件を変更するか、条件をリセットしてもう一度お試しください。
        </p>
        <div className="jl-state-actions">
          <button className="jl-state-btn ghost" onClick={onReset}>
            条件をリセット
          </button>
        </div>
      </div>
    </div>
  )
}

/** Error — 求人の取得に失敗。 */
export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="jl-grid">
      <div className="jl-state error" role="alert">
        <div className="jl-state-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <line x1="12" y1="7" x2="12" y2="13" />
            <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
            <path d="M12 3 1.5 21h21z" />
          </svg>
        </div>
        <div className="jl-state-title">求人を読み込めませんでした</div>
        <p className="jl-state-desc">
          通信エラーが発生しました。しばらくしてからもう一度お試しください。
        </p>
        <div className="jl-state-actions">
          <button className="jl-state-btn" onClick={onRetry}>
            再読み込み
          </button>
        </div>
      </div>
    </div>
  )
}
