import { cache } from 'react'
import { db } from '@configs/db'
import { redis } from '@externals/libs/redis'

export const getChallenges = cache(async () => {
	const existing = await redis.get('challenges')

	if (existing) {
		return JSON.parse(existing) as Project[]
	}

	const challenges = (await db.project.findMany({
		include: {
			difficulty: true,
			technologies: true
		},
		orderBy: {
			created_at: 'desc'
		}
	})) as unknown as Project[]

	await redis.set('challenges', JSON.stringify(challenges))

	return challenges
})
