import { cache } from 'react'
import { db } from '@configs/db'

export const getChallenge = cache(async (id: string) => {
	const challenge = (await db.project.findUnique({
		where: { id }
	})) as Project

	return challenge
})
