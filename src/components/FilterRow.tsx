import { useId, useState } from 'react'

/**
 * サイドバーのアコーディオン1行（職種 / 雇用形態 / 勤務地 / タグ）。
 * 各行は独立して開閉（ローカル state `open`）。
 * Ported from public_screens.jsx → FilterRow.
 */
export function FilterRow({
  label,
  value,
  options,
  disabled = false,
}: {
  label: string
  value: string
  options: string[]
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  return (
    <div className={'jl-filter' + (open ? ' open' : '')}>
      <button
        className="jl-filter-head"
        aria-expanded={open}
        aria-controls={panelId}
        disabled={disabled}
        onClick={() => setOpen(!open)}
      >
        <span className="jl-filter-text">
          <span className="jl-filter-label">{label}</span>
          <span className="jl-filter-value">{value}</span>
        </span>
        <span className="jl-filter-sign">{open ? '−' : '＋'}</span>
      </button>
      {open && (
        <div className="jl-filter-opts" id={panelId}>
          {options.map((o) => (
            <label key={o} className="jl-filter-opt">
              <input type="checkbox" disabled={disabled} />
              {o}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
