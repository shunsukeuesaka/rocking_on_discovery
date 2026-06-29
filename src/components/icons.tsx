// Inline SVG icons — ported from the handoff. No icon-font dependency.

export function BookmarkIcon({ filled }: { filled: boolean }) {
  // viewBox 0 0 24 30, path M3 2h18v26l-9-7-9 7z (ribbon)
  return (
    <svg width="15" height="19" viewBox="0 0 24 30" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
      <path d="M3 2h18v26l-9-7-9 7z" />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" />
    </svg>
  )
}

/** Location pin — drawn purely in CSS (.jl-pin). */
export const PinIcon = () => <i className="jl-pin" aria-hidden="true" />
