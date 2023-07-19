import { cache } from 'react'
import { db } from '@configs/db'

export const getFavorites = cache(async (id: string) => {
	const favorites = await db.favorite.findMany({
		where: {
			user: { id: id }
		},
		include: {
			project: {
				include: {
					difficulty: true,
					technologies: true
				}
			}
		}
	})

	return favorites
})
