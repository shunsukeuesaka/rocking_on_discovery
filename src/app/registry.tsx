import type { Job, Nav, ScreenId } from '../types'
import { JobListPage } from '../pages/JobListPage'
import { Placeholder } from './Placeholder'

// PUBLIC screens
import { TopPage } from '../screens/public/TopPage'
import { JobDetail } from '../screens/public/JobDetail'
import { ApplyPage } from '../screens/public/ApplyPage'
import { ApplyDone } from '../screens/public/ApplyDone'
import { SignupPage } from '../screens/public/SignupPage'
import { LoginPage } from '../screens/public/LoginPage'
import { MyPage } from '../screens/public/MyPage'
import { CompanyPage } from '../screens/public/CompanyPage'
import { CompanyLP } from '../screens/public/CompanyLP'
import { PasswordResetPage } from '../screens/public/PasswordResetPage'
import { NewsPage } from '../screens/public/NewsPage'
import { StaticPage } from '../screens/public/StaticPage'

// COMPANY console screens
import { CompanyDashboard } from '../screens/console/CompanyDashboard'
import { JobMgmtList } from '../screens/console/JobMgmtList'
import { JobEditor } from '../screens/console/JobEditor'
import { ApplicantList } from '../screens/console/ApplicantList'
import { ApplicantDetail } from '../screens/console/ApplicantDetail'
import { AnalyticsPage } from '../screens/console/AnalyticsPage'

// ADMIN console screens
import { AdminOverview } from '../screens/admin/AdminOverview'
import { AdminReview } from '../screens/admin/AdminReview'
import { AdminCompanies } from '../screens/admin/AdminCompanies'
import { AdminMembers } from '../screens/admin/AdminMembers'

/** Navigation payload carried alongside a screen change (mirrors prototype ctx). */
export interface ScreenCtx {
  job?: Job
}

/**
 * Screen registry — maps a screen ID to its component, mirroring the prototype's
 * renderScreen() switch (design_handoff_full/app_shell.jsx). Screens not yet
 * ported fall through to <Placeholder> so the whole app stays navigable.
 */
export function renderScreen(id: ScreenId, nav: Nav, ctx: ScreenCtx) {
  switch (id) {
    // ---------- PUBLIC ----------
    case 'SCR-001':
      return <TopPage nav={nav} />
    case 'SCR-002':
      return <JobListPage nav={nav} />
    case 'SCR-003':
      return <JobDetail nav={nav} job={ctx.job} />
    case 'SCR-004':
      return <ApplyPage nav={nav} job={ctx.job} />
    case 'SCR-005':
      return <ApplyDone nav={nav} />
    case 'SCR-006':
      return <SignupPage nav={nav} />
    case 'SCR-007':
      return <LoginPage nav={nav} />
    case 'SCR-008':
      return <MyPage nav={nav} />
    case 'SCR-009':
      return <CompanyPage nav={nav} />
    case 'SCR-010':
      return <CompanyLP nav={nav} />
    case 'SCR-012':
      return <PasswordResetPage nav={nav} />
    case 'SCR-014':
      return <NewsPage nav={nav} />
    case 'SCR-015':
      return <StaticPage nav={nav} />

    // ---------- COMPANY ----------
    case 'SCR-016':
      return <LoginPage nav={nav} forCompany />
    case 'SCR-017':
      return <CompanyDashboard nav={nav} />
    case 'SCR-018':
      return <JobMgmtList nav={nav} />
    case 'SCR-019':
      return <JobEditor nav={nav} />
    case 'SCR-020':
      return <ApplicantList nav={nav} />
    case 'SCR-021':
      return <ApplicantDetail nav={nav} />
    case 'SCR-022':
    case 'SCR-023':
      return <AnalyticsPage nav={nav} />
    case 'SCR-024':
    case 'SCR-025':
    case 'SCR-026':
      return <CompanyDashboard nav={nav} />

    // ---------- ADMIN ----------
    case 'SCR-027':
      return <LoginPage nav={nav} forAdmin />
    case 'SCR-028':
      return <AdminOverview nav={nav} />
    case 'SCR-029':
      return <AdminReview nav={nav} />
    case 'SCR-030':
    case 'SCR-031':
      return <AdminCompanies nav={nav} />
    case 'SCR-032':
      return <AdminMembers nav={nav} />
    case 'SCR-033':
      return <AnalyticsPage nav={nav} />
    case 'SCR-034':
      return <AdminOverview nav={nav} />

    default:
      return <Placeholder id={id} nav={nav} />
  }
}
