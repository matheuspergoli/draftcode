import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
	async function middleware(req) {
		const token = await getToken({ req })
		const isAuth = !!token

		if (!isAuth) {
			return NextResponse.redirect(new URL('/', req.url))
		}

		if (token.role === 'USER') {
			return NextResponse.redirect(new URL('/', req.url))
		}
	},
	{
		callbacks: {
			async authorized() {
				return true
			}
		}
	}
)

export const config = {
	matcher: ['/dashboard/:path*']
}
