import { useCallback, useEffect, useRef, useState } from 'react'
import type { Job, SortKey } from '../types'
import { JOBLIST, TOTAL_JOBS } from '../data/jobs'

export type FetchStatus = 'loading' | 'success' | 'error'

export interface JobsState {
  status: FetchStatus
  jobs: Job[]
  total: number
  reload: () => void
}

/** Optional demo override so every state is reachable: `?state=loading|empty|error|success`. */
function readStateOverride(): string | null {
  if (typeof window === 'undefined') return null
  return new URLSearchParams(window.location.search).get('state')
}

const sortJobs = (jobs: Job[], sort: SortKey): Job[] => {
  const copy = [...jobs]
  if (sort === 'salary') return copy.sort((a, b) => (b.salaryNum ?? 0) - (a.salaryNum ?? 0))
  if (sort === 'popular') return copy.sort((a, b) => Number(b.fav) - Number(a.fav))
  return copy // 'new' — preserve source order (newest first)
}

/**
 * Mock async data source for the job list. Mirrors a real fetch lifecycle
 * (loading → success/error) so the UI can render every state faithfully.
 * Production: replace the body with the job-list API call (条件・ソート・ページ).
 */
export function useJobs(sort: SortKey): JobsState {
  const override = readStateOverride()
  const [status, setStatus] = useState<FetchStatus>('loading')
  const [jobs, setJobs] = useState<Job[]>([])
  const [nonce, setNonce] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const reload = useCallback(() => setNonce((n) => n + 1), [])

  useEffect(() => {
    setStatus('loading')
    if (timer.current) clearTimeout(timer.current)

    // Hold 'loading' indefinitely for the demo override.
    if (override === 'loading') return

    timer.current = setTimeout(() => {
      if (override === 'error') {
        setStatus('error')
        return
      }
      if (override === 'empty') {
        setJobs([])
        setStatus('success')
        return
      }
      setJobs(JOBLIST)
      setStatus('success')
    }, 600)

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [override, nonce])

  return {
    status,
    jobs: sortJobs(jobs, sort),
    total: override === 'empty' ? 0 : TOTAL_JOBS,
    reload,
  }
}
