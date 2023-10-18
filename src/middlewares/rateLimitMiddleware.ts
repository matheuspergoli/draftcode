import { getToken } from 'next-auth/jwt'
import { rateLimit } from '@configs/rate-limit'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

const limiter = rateLimit({
	limit: 20,
	interval: 60 * 60 * 24 * 1000 // 1 day
})

export const RateLimitMiddleware: MiddlewareFactory = (next) => {
	return async (request: NextRequest, _next: NextFetchEvent) => {
		const pathname = request.nextUrl.pathname
		const paths = ['/api/solutions']

		if (paths.some((path) => pathname.startsWith(path))) {
			const token = await getToken({
				req: request,
				secret: process.env.NEXTAUTH_SECRET
			})

			const { isRateLimited, limit, currentUsage } = limiter.check(token?.sub as string)
			console.log(`[RATE USAGE] ${currentUsage}/${limit}`)

			if (isRateLimited) {
				return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
			}
		}

		return next(request, _next)
	}
}
