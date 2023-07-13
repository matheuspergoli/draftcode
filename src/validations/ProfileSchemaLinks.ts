import { z } from 'zod'

export const ProfileSchemaLinks = z.object({
	github: z.string().url({
		message: 'Github deve ser uma URL válida'
	}),
	website: z.string().url({
		message: 'Website deve ser uma URL válida'
	}),
	linkedin: z.string().url({
		message: 'Linkedin deve ser uma URL válida'
	})
})
