/**
 * Deterministic SVG placeholder for job thumbnails.
 *
 * The handoff references photos at `assets/us/*.jpg` that aren't shipped in the
 * bundle. JobThumb tries the real path first and falls back to this generator
 * on error, so the page runs and the monochrome→color hover (the card uses
 * `filter: grayscale(1)` → `0`) still reads: the placeholder carries a hue
 * derived from the seed that only appears on hover.
 */
export function thumbPlaceholder(seed: string, label: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360
  const c1 = `hsl(${h} 48% 26%)`
  const c2 = `hsl(${(h + 28) % 360} 52% 16%)`
  const accent = `hsl(${h} 70% 60%)`
  const initial = (label || '♪').slice(0, 2)

  // A dark gradient block with a subtle equalizer motif + company initial.
  const bars = Array.from({ length: 11 }, (_, i) => {
    const bh = 16 + ((seed.charCodeAt((i + seed.length) % seed.length) * (i + 3)) % 70)
    const x = 196 + i * 11
    return `<rect x="${x}" y="${168 - bh}" width="6" height="${bh}" rx="1" fill="${accent}" opacity="0.55"/>`
  }).join('')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
  </linearGradient></defs>
  <rect width="320" height="180" fill="url(#g)"/>
  ${bars}
  <text x="22" y="60" font-family="Barlow, Arial, sans-serif" font-size="46" font-weight="700" fill="rgba(255,255,255,0.92)">${initial}</text>
</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
