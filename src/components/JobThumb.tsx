import { useState } from 'react'
import type { Job } from '../types'
import { thumbPlaceholder } from '../lib/placeholder'

/**
 * Job thumbnail. Replaces the prototype's <image-slot> Web Component with a
 * plain <img> (per the handoff: 本番では通常の <img> / next/image でよい).
 * The real photos (assets/us/*.jpg) aren't shipped, so on load error we fall
 * back to a deterministic SVG placeholder that preserves the grayscale→color
 * hover effect.
 */
export function JobThumb({ job }: { job: Job }) {
  const [src, setSrc] = useState(job.img)
  return (
    <img
      className="jl-img"
      src={src}
      alt={job.title}
      loading="lazy"
      onError={() => {
        const fallback = thumbPlaceholder(job.id, job.coLogo)
        if (src !== fallback) setSrc(fallback)
      }}
    />
  )
}
