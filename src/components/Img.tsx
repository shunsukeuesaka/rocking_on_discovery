import { useState } from 'react'
import { thumbPlaceholder } from '../lib/placeholder'

/**
 * Generic image with graceful fallback. Replaces the prototype's <image-slot>
 * Web Component (design handoff: 本番では通常の <img> でよい). The referenced
 * photos (assets/us/*.jpg) aren't shipped, so on load error we swap to a
 * deterministic SVG placeholder seeded by `seed`.
 *
 * Drop real images into public/assets/us/ and they render automatically.
 */
export function Img({
  src,
  alt = '',
  seed,
  label,
  className,
  style,
}: {
  src: string
  alt?: string
  seed?: string
  label?: string
  className?: string
  style?: React.CSSProperties
}) {
  const [cur, setCur] = useState(src)
  return (
    <img
      className={className}
      src={cur}
      alt={alt}
      loading="lazy"
      style={style}
      onError={() => {
        const fb = thumbPlaceholder(seed ?? src, label ?? alt ?? '♪')
        if (cur !== fb) setCur(fb)
      }}
    />
  )
}
