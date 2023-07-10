import { cache } from 'react'
import { db } from '@configs/db'
import { redis } from '@externals/libs/redis'

export const getChallenge = cache(async (id: string) => {
	const existing = await redis.get(`challenge:${id}`)

	if (existing) {
		console.log('using cache')
		return JSON.parse(existing) as Project
	}

	const challenge = (await db.project.findUnique({
		where: { id },
		include: {
			User: true,
			difficulty: true,
			technologies: true
		}
	})) as unknown as Project

	await redis.set(`challenge:${id}`, JSON.stringify(challenge))

	return challenge
})
