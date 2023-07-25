import { cache } from 'react'
import { db } from '@configs/db'

export const getFavorites = cache(async (userId: string, includes?: Includes) => {
	const favorites = await db.favorite.findMany({
		where: {
			user: { id: userId }
		},
		include: {
			project: {
				include: {
					User: Boolean(includes?.user),
					difficulty: Boolean(includes?.difficulty),
					technologies: Boolean(includes?.technologies)
				}
			}
		}
	})

	return favorites
})
