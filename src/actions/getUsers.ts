import { cache } from 'react'
import { db } from '@configs/db'

export const getUsers = cache(async () => {
	const users = (await db.user.findMany()) as unknown as User[]

	return users
})
