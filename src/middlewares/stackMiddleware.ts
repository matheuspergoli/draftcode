import { NextMiddleware, NextResponse } from 'next/server'

export const stackMiddleware = (
	functions: MiddlewareFactory[] = [],
	index = 0
): NextMiddleware => {
	const current = functions[index]

	if (current) {
		const next = stackMiddleware(functions, index + 1)
		return current(next)
	}

	return () => NextResponse.next()
}
