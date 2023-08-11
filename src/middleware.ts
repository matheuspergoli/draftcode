import { stackMiddleware } from './middlewares/stackMiddleware'
import { SolutionsMiddleware } from './middlewares/solutionsMiddleware'
import { DashboardMiddleware } from './middlewares/dashboardMiddleware'

export default stackMiddleware([DashboardMiddleware, SolutionsMiddleware])

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
