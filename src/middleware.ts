import { stackMiddleware } from './middlewares/stackMiddleware'
import { SolutionsMiddleware } from './middlewares/solutionsMiddleware'
import { DashboardMiddleware } from './middlewares/dashboardMiddleware'

export default stackMiddleware([DashboardMiddleware, SolutionsMiddleware])
