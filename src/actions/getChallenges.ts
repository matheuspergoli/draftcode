import { cache } from 'react'
import { db } from '@configs/db'
import { redis } from '@externals/libs/redis'

const isDEV = process.env.NODE_ENV === 'development'

const getChallengesWithRedis = cache(async (userId?: string, includes?: Includes) => {
	const existing = await redis.get('challenges')

	if (existing) {
		return JSON.parse(existing) as Project[]
	}

	const challenges = (await db.project.findMany({
		where: {
			user_id: userId
		},
		include: {
			difficulty: Boolean(includes?.difficulty),
			technologies: Boolean(includes?.technologies)
		},
		orderBy: {
			created_at: 'desc'
		}
	})) as unknown as Project[]

	if (challenges) {
		await redis.set('challenges', JSON.stringify(challenges))
	}

	return challenges
})

const getChallengesWithoutRedis = cache(async (userId?: string, includes?: Includes) => {
	const challenges = (await db.project.findMany({
		where: {
			user_id: userId
		},
		include: {
			difficulty: Boolean(includes?.difficulty),
			technologies: Boolean(includes?.technologies)
		},
		orderBy: {
			created_at: 'desc'
		}
	})) as unknown as Project[]

	return challenges
})

export const getChallenges = isDEV ? getChallengesWithoutRedis : getChallengesWithRedis
