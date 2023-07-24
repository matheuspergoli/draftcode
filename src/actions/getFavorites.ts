import { cache } from 'react'
import { db } from '@configs/db'

export const getFavorites = cache(async (id: string, includes?: Includes) => {
	const favorites = await db.favorite.findMany({
		where: {
			user: { id: id }
		},
		include: {
			project: {
				include: {
					difficulty: Boolean(includes?.difficulty),
					technologies: Boolean(includes?.technologies)
				}
			}
		}
	})

	return favorites
})
