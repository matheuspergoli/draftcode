import { z } from 'zod'
import { ALLOWED_WEBSITE_HOSTS } from './utils'

export const SolutionSchemaCreate = z.object({
	image: z.custom<FileList>().refine((value) => {
		if (value.length > 0) {
			return true
		}
		return false
	}, 'A imagem do projeto deve ser informada'),
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
