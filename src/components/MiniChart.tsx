// Bar mini-chart used by console dashboards / analytics.
// Ported from design_handoff_full/company_admin.jsx → MiniChart.
export function MiniChart({ values }: { values: number[] }) {
  const max = Math.max(...values)
  return (
    <div style={{ height: 140, display: 'flex', alignItems: 'flex-end', gap: 4, padding: '0 4px' }}>
      {values.map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: (v / max) * 100 + '%',
            background: i === values.length - 1 ? 'var(--mw-red)' : 'rgba(207,48,21,0.45)',
            borderRadius: '2px 2px 0 0',
            position: 'relative',
          }}
        >
          {i === values.length - 1 && (
            <div
              style={{
                position: 'absolute',
                top: -20,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: 10,
                color: 'var(--mw-red-light)',
                fontFamily: 'var(--ff-mono)',
              }}
            >
              {v}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
