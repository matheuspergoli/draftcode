import { z } from 'zod'
import { REGEX_GITHUB_URL, REGEX_LINKEDIN_URL } from './utils'

export const ProfileSchemaLinks = z.object({
	github: z
		.string()
		.url({
			message: 'Github deve ser uma URL válida'
		})
		.refine(
			(url) => {
				return REGEX_GITHUB_URL.test(url)
			},
			{
				message: 'Github deve ser uma URL válida'
			}
		)
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
		.refine(
			(url) => {
				return REGEX_LINKEDIN_URL.test(url)
			},
			{
				message: 'Linkedin deve ser uma URL válida'
			}
		)
		.optional()
		.or(z.literal(''))
})
