import { z } from 'zod'

export const SolutionSchemaCreate = z.object({
	image: z.custom<FileList>().refine((value) => {
		if (value.length > 0) {
			return true
		}
		return false
	}, 'A imagem do projeto deve ser informada'),
	website: z.string().refine((value) => {
		const allowedWebsiteHosts = [
			/(?:www\.)?vercel\.app\/?$/,
			/(?:www\.)?netlify\.app\/?$/,
			/(?:www\.)?github\.io\/?$/,
			/(?:www\.)?cloudflare\.pages\/?$/,
			/(?:www\.)?gitlab\.io\/?$/,
			/(?:www\.)?firebaseapp\.com\/?$/,
			/(?:www\.)?herokuapp\.com\/?$/,
			/(?:www\.)?surge\.sh\/?$/,
			/(?:www\.)?repl\.it\/?$/,
			/(?:www\.)?render\.com\/?$/,
			/(?:www\.)?fly\.io\/?$/,
			/(?:www\.)?deno\.dev\/?$/,
			/(?:www\.)?editorx\.com\/?$/
		]

		return allowedWebsiteHosts.some((regex) => regex.test(value))
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
