import type { Job, Nav, ScreenId } from '../types'
import { JobListPage } from '../pages/JobListPage'
import { Placeholder } from './Placeholder'

/** Navigation payload carried alongside a screen change (mirrors prototype ctx). */
export interface ScreenCtx {
  job?: Job
}

/**
 * Screen registry — maps a screen ID to its component, mirroring the prototype's
 * renderScreen() switch (design_handoff_full/app_shell.jsx). Screens not yet
 * ported fall through to <Placeholder> so the whole app stays navigable.
 *
 * As each area is implemented, replace the relevant Placeholder fall-throughs
 * with the real components.
 */
export function renderScreen(id: ScreenId, nav: Nav, _ctx: ScreenCtx) {
  switch (id) {
    case 'SCR-002':
      return <JobListPage nav={nav} />
    // PUBLIC (todo): SCR-001 TopPage, 003 JobDetail, 004 ApplyPage, 005 ApplyDone,
    //   006 SignupPage, 007 LoginPage, 008 MyPage, 009 CompanyPage, 010 CompanyLP,
    //   012 PasswordResetPage, 014 NewsPage, 015 StaticPage
    // COMPANY (todo): SCR-016/017/018/019/020/021/022/023/024/025/026
    // ADMIN (todo): SCR-027/028/029/030/031/032/033/034
    default:
      return <Placeholder id={id} nav={nav} />
  }
}
