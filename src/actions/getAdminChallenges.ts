import { cache } from 'react'
import { db } from '@configs/db'

export const getAdminChallenges = cache(async (adminId: string, includes?: Includes) => {
	const challenges = (await db.project.findMany({
		where: {
			user_id: adminId
		},
		include: {
			User: Boolean(includes?.user),
			difficulty: Boolean(includes?.difficulty),
			technologies: Boolean(includes?.technologies)
		},
		orderBy: {
			created_at: 'desc'
		}
	})) as unknown as Project[]

	return challenges
})
