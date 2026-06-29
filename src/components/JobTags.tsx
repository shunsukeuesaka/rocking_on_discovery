import { useLayoutEffect, useRef, useState } from 'react'

/**
 * 1行固定のタグ表示。画面外の hidden measure 要素で各タグの実幅を測り、
 * カード幅（ResizeObserver で監視）に収まる枚数だけ表示し、残りを「+N」ピル
 * にまとめる。常に1行を維持しリサイズに追従する。
 *
 * Ported from design_handoff_job_list/public_screens.jsx → JobTags.
 */
export function JobTags({ tags }: { tags: string[] }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(tags.length)

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const meas = measureRef.current
    if (!wrap || !meas) return
    const gap = 6
    const compute = () => {
      const containerW = wrap.clientWidth
      if (!containerW) return
      const tagEls = Array.from(meas.querySelectorAll<HTMLElement>('[data-tag]'))
      const plusEl = meas.querySelector<HTMLElement>('[data-plus]')
      const plusW = plusEl ? plusEl.offsetWidth : 0
      let best = 0
      let sum = 0
      for (let k = 1; k <= tags.length; k++) {
        sum += tagEls[k - 1].offsetWidth + (k > 1 ? gap : 0)
        const remaining = tags.length - k
        const need = remaining > 0 ? gap + plusW : 0
        if (sum + need <= containerW) best = k
        else break
      }
      setShown(Math.max(1, best))
    }
    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [tags])

  const overflow = tags.length - shown
  return (
    <div className="jl-tags" ref={wrapRef}>
      <div className="jl-tags-measure" ref={measureRef} aria-hidden="true">
        {tags.map((t) => (
          <span key={t} className="jl-tag" data-tag>
            {t}
          </span>
        ))}
        <span className="jl-tag jl-tag-more" data-plus>
          +{tags.length}
        </span>
      </div>
      {tags.slice(0, shown).map((t) => (
        <span key={t} className="jl-tag">
          {t}
        </span>
      ))}
      {overflow > 0 && <span className="jl-tag jl-tag-more">+{overflow}</span>}
    </div>
  )
}
