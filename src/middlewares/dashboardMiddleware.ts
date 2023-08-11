import { getToken } from 'next-auth/jwt'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export const DashboardMiddleware: MiddlewareFactory = (next) => {
	return async (request: NextRequest, _next: NextFetchEvent) => {
		const pathname = request.nextUrl.pathname

		const paths = ['/dashboard']

		if (paths?.some((path) => pathname.startsWith(path))) {
			const token = await getToken({
				req: request,
				secret: process.env.NEXTAUTH_SECRET
			})

			if (!token) {
				return NextResponse.redirect(new URL('/', request.url))
			}

			if (token.role === 'USER') {
				return NextResponse.redirect(new URL('/', request.url))
			}
		}

		return next(request, _next)
	}
}
