import { cache } from 'react'
import { authOptions } from '@configs/auth'
import { getServerSession } from 'next-auth/next'

export const getUserSession = cache(async () => {
	const session = await getServerSession(authOptions)

	return session
})
