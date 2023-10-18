import { stackMiddleware } from './middlewares/stackMiddleware'
import { SolutionsMiddleware } from './middlewares/solutionsMiddleware'
import { DashboardMiddleware } from './middlewares/dashboardMiddleware'
import { RateLimitMiddleware } from './middlewares/rateLimitMiddleware'

export default stackMiddleware([
	DashboardMiddleware,
	SolutionsMiddleware,
	RateLimitMiddleware
])

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
		'/api/solutions',
		'/api/solutions/:path*'
	]
}
