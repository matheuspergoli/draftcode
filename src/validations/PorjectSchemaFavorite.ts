import { z } from 'zod'

export const ProjectSchemaFavorite = z.object({
	projectId: z.string().uuid()
})
