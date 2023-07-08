import { cache } from 'react'
import { db } from '@configs/db'

export const getChallenges = cache(async () => {
	const challenges = (await db.project.findMany({
		include: {
			difficulty: true,
			technologies: true
		},
		orderBy: {
			created_at: 'desc'
		}
	})) as unknown as Project[]

	return challenges
})
