import type { Nav, ScreenId } from '../types'
import { findScreen } from '../data/mwData'

/**
 * Placeholder for screens not yet ported from the prototype. Keeps the whole
 * app navigable (via header / sidebars / screen menu) while screens are built
 * area by area. DS-consistent (sharp radii, no shadows, accent minimal).
 */
export function Placeholder({ id, nav }: { id: ScreenId; nav: Nav }) {
  const screen = findScreen(id)
  return (
    <div style={{ padding: 'clamp(40px, 6vw, 96px) clamp(24px, 4vw, 80px)' }}>
      <div className="u-label" style={{ marginBottom: 12 }}>
        {screen?.group?.toUpperCase() ?? 'SCREEN'} · {id}
      </div>
      <h1 className="u-h2" style={{ margin: '0 0 16px' }}>
        {screen?.name ?? id}
      </h1>
      <p className="u-body" style={{ color: 'var(--color-text-secondary)', maxWidth: '52ch', margin: '0 0 8px' }}>
        {screen?.purpose}
      </p>
      <p className="u-caption">この画面は実装予定です（プロトタイプから順次移植中）。</p>
      <div style={{ marginTop: 28 }}>
        <button className="btn-ghost btn-sm" onClick={() => nav('SCR-001')}>
          ← トップへ戻る
        </button>
      </div>
    </div>
  )
}
