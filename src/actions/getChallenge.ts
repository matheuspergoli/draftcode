import { cache } from 'react'
import { db } from '@configs/db'
// import { redis } from '@externals/libs/redis'

const isDEV = process.env.NODE_ENV === 'development'

const getChallengeWithRedis = cache(async (id: string) => {
	// const existing = await redis.get(`challenge:${id}`)

	// if (existing) {
	// 	return JSON.parse(existing) as Project
	// }

	const challenge = (await db.project.findUnique({
		where: { id },
		include: {
			User: true,
			difficulty: true,
			technologies: true
		}
	})) as unknown as Project

	// if (challenge) {
	// 	await redis.set(`challenge:${id}`, JSON.stringify(challenge))
	// }

	return challenge
})

const getChallengeWithoutRedis = cache(async (id: string) => {
	const challenge = (await db.project.findUnique({
		where: { id },
		include: {
			User: true,
			difficulty: true,
			technologies: true
		}
	})) as unknown as Project

	return challenge
})

export const getChallenge = isDEV ? getChallengeWithoutRedis : getChallengeWithRedis
