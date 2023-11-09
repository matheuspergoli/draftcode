import { cache } from 'react'
import { db } from '@configs/db'

export const getSolutionsByChallengeId = cache(async (id: string) => {
	const solutions = await db.solution.findMany({
		where: {
			project_id: id
		},
		include: {
			user: true,
			project: {
				include: {
					difficulty: true
				}
			}
		}
	})

	return solutions
})
