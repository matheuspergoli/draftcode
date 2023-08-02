import { cache } from 'react'
import { db } from '@configs/db'

export const getSolution = cache(
	async (id: string, includes?: Omit<Includes, 'difficulty' | 'technologies'>) => {
		const solution = (await db.solution.findUnique({
			where: { id },
			include: {
				user: Boolean(includes?.user)
			}
		})) as unknown as Solution

		return solution
	}
)
