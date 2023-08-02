import { cache } from 'react'
import { db } from '@configs/db'

export const getChallenge = cache(async (id: string, includes?: Includes) => {
	const challenge = (await db.project.findUnique({
		where: { id },
		include: {
			user: Boolean(includes?.user),
			difficulty: Boolean(includes?.difficulty),
			technologies: Boolean(includes?.technologies)
		}
	})) as unknown as Challenge

	return challenge
})
