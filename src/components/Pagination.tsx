/**
 * ページネーション。構成例: ‹ 1 2 3 … 10 ›。
 * 現在ページは `.on`。省略「…」はクリック不可。
 * 端では前へ/次へを disabled に（state: disabled）。
 * Ported from public_screens.jsx → SearchPage の pagination ブロック。
 */
export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number
  totalPages: number
  onChange: (page: number) => void
}) {
  // 構成: 先頭3ページ + … + 最終ページ（参照デザインの形を踏襲）
  const head = [1, 2, 3].filter((n) => n <= totalPages)
  const showDots = totalPages > head.length + 1
  const showLast = totalPages > head.length

  return (
    <nav className="pagination jl-pagination" aria-label="ページネーション">
      <button aria-label="前へ" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        ‹
      </button>

      {head.map((n) => (
        <button
          key={n}
          className={n === page ? 'on' : undefined}
          aria-current={n === page ? 'page' : undefined}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}

      {showDots && (
        <button className="dots" disabled>
          …
        </button>
      )}

      {showLast && (
        <button
          className={totalPages === page ? 'on' : undefined}
          aria-current={totalPages === page ? 'page' : undefined}
          onClick={() => onChange(totalPages)}
        >
          {totalPages}
        </button>
      )}

      <button aria-label="次へ" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        ›
      </button>
    </nav>
  )
}
