import { db } from '@configs/db'
import { cache } from 'react'

export const getUsers = cache(async () => {
	const users = (await db.user.findMany({
		orderBy: {
			role: 'asc'
		}
	})) as unknown as User[]

	const roleOrder = ['SUPERADMIN', 'ADMIN', 'USER']

	const orderedUsers = users.sort((a, b) => {
		const roleAIndex = roleOrder.indexOf(a.role)
		const roleBIndex = roleOrder.indexOf(b.role)

		return roleAIndex - roleBIndex
	})

	return orderedUsers
})
