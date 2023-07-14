import { z } from 'zod'

export const ProfileSchemaLinks = z.object({
	github: z
		.string()
		.url({
			message: 'Github deve ser uma URL válida'
		})
		.optional()
		.or(z.literal('')),
	website: z
		.string()
		.url({
			message: 'Website deve ser uma URL válida'
		})
		.optional()
		.or(z.literal('')),
	linkedin: z
		.string()
		.url({
			message: 'Linkedin deve ser uma URL válida'
		})
		.optional()
		.or(z.literal(''))
})
