import { db } from '@configs/db'
import { cache } from 'react'

export const getUsers = cache(async () => {
	const users = (await db.user.findMany()) as unknown as User[]

	return users
})
