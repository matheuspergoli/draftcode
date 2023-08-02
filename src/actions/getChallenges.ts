import { cache } from 'react'
import { db } from '@configs/db'

export const getChallenges = cache(async (includes?: Includes) => {
	const challenges = (await db.project.findMany({
		include: {
			user: Boolean(includes?.user),
			difficulty: Boolean(includes?.difficulty),
			technologies: Boolean(includes?.technologies)
		},
		orderBy: {
			created_at: 'desc'
		}
	})) as unknown as Challenge[]

	return challenges
})
