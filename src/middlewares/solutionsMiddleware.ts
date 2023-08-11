import { getToken } from 'next-auth/jwt'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export const SolutionsMiddleware: MiddlewareFactory = (next) => {
	return async (request: NextRequest, _next: NextFetchEvent) => {
		const pathname = request.nextUrl.pathname

		const paths = ['/solutions/new', '/solutions/edit']

		if (paths?.some((path) => pathname.startsWith(path))) {
			const token = await getToken({
				req: request,
				secret: process.env.NEXTAUTH_SECRET
			})

			if (!token) {
				return NextResponse.redirect(new URL('/login', request.url))
			}

			if (token.isBanned) {
				return NextResponse.redirect(new URL('/userbanned', request.url))
			}
		}

		return next(request, _next)
	}
}
