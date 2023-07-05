import { cache } from 'react'
import { db } from '@configs/db'

export const getChallenges = cache(async () => {
	const challenges = (await db.project.findMany({
		include: {
			difficulty: true,
			technologies: true
		}
	})) as Project[]

	return challenges
})
