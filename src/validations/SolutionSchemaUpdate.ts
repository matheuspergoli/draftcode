import { z } from 'zod'
import { ALLOWED_WEBSITE_HOSTS } from './utils'

export const SolutionSchemaUpdate = z.object({
	image: z.any(),
	website: z.string().refine((value) => {
		return ALLOWED_WEBSITE_HOSTS.some((regex) => regex.test(value))
	}, 'O link do website deve pertencer a um dos hosts suportados'),
	repository: z
		.string()
		.url({
			message: 'O link do repositório deve ser válido'
		})
		.refine((value) => {
			const githubRepoRegex = /^https?:\/\/github\.com\/[\w-]+\/[\w-]+(\/)?$/
			return githubRepoRegex.test(value)
		}, 'O link do repositório deve ser válido')
})
