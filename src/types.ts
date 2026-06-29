// Domain types for the 求人一覧 (Job List / SCR-002) screen.

export type ApplyType = 'form' | 'external'

export interface Job {
  id: string
  img: string
  title: string
  co: string
  coLogo: string
  cat: string
  emp: string
  loc: string
  salary: string
  salaryNum?: number
  tags: string[]
  fav: boolean
  new: boolean
  posted: string
  desc: string
  applyType: ApplyType
  applyUrl?: string
}

export interface Category {
  en: string
  ja: string
  count: number
  icon: string
}

export type SortKey = 'new' | 'salary' | 'popular'

/** Screen IDs from the prototype's registry (SCR-001 … SCR-034). */
export type ScreenId = string

/**
 * Navigation contract, mirroring the prototype's `nav(screenId, payload)`.
 * In production this is wired to React Router / Next routing; here it is a
 * thin abstraction so call sites stay identical to the design reference.
 */
export type Nav = (screen: ScreenId, payload?: { job?: Job }) => void
