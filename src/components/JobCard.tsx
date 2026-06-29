import { useState } from 'react'
import type { Job, Nav } from '../types'
import { BookmarkIcon, PinIcon } from './icons'
import { JobTags } from './JobTags'
import { JobThumb } from './JobThumb'

/**
 * 求人カード。クリックで求人詳細（SCR-003）へ遷移し、対象求人オブジェクトを渡す。
 * ブックマークはカード遷移を抑止（stopPropagation）してローカル state でトグル。
 * Ported from public_screens.jsx → JobListCard.
 */
export function JobCard({ job, nav }: { job: Job; nav: Nav }) {
  const [fav, setFav] = useState(job.fav)
  return (
    <article className="jl-card" onClick={() => nav('SCR-003', { job })}>
      <div className="jl-thumb">
        <JobThumb job={job} />
        <button
          className={'jl-bookmark' + (fav ? ' on' : '')}
          aria-label="保存"
          aria-pressed={fav}
          onClick={(e) => {
            e.stopPropagation()
            setFav(!fav)
          }}
        >
          <BookmarkIcon filled={fav} />
        </button>
      </div>
      <div className="jl-body">
        <div className="jl-badges">
          {job.new && <span className="jl-badge">NEW</span>}
          <span className="jl-badge">{job.emp}</span>
        </div>
        <div className="jl-co">{job.co}</div>
        <h3 className="jl-title">{job.title}</h3>
        <div className="jl-meta">
          <span>
            <PinIcon />
            {job.loc}
          </span>
        </div>
        <JobTags tags={job.tags} />
      </div>
    </article>
  )
}
