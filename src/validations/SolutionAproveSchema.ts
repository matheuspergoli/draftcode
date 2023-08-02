import { z } from 'zod'

export const SolutionAproveSchema = z.object({
	approved: z.boolean()
})
