import { z } from 'zod'

const FIGMA_REGEX =
	/^https:\/\/([\w.-]+.)?figma.com\/(file|proto)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/

export const ProjectSchema = z.object({
	title: z
		.string()
		.min(6, {
			message: 'O nome do projeto deve ter no mínimo 6 caracteres'
		})
		.max(45, {
			message: 'O nome do projeto deve ter no máximo 45 caracteres'
		})
		.nonempty(),
	image: z.custom<FileList>().refine((value) => {
		if (value.length > 0) {
			return true
		}
		return false
	}, 'A imagem do projeto deve ser informada'),
	brief: z
		.string()
		.min(10, { message: 'A descrição deve ter no mínimo 10 caracteres' })
		.max(120, {
			message: 'A descrição deve ter no máximo 120 caracteres'
		})
		.nonempty(),
	figma_url: z
		.string()
		.regex(FIGMA_REGEX, {
			message: 'O link do figma deve ser válido'
		})
		.nonempty(),
	difficulty: z.string().nonempty({
		message: 'O nível do projeto deve ser informado'
	}),
	description: z
		.string()
		.min(10, {
			message: 'Requisitos deve ter no mínimo 10 caracteres'
		})
		.nonempty(),
	technologies: z
		.string()
		.nonempty({
			message: 'As tecnologias devem ser informadas separadas por espaço'
		})
		.transform((value) => {
			if (typeof value === 'string') {
				return value.split(' ').filter((item) => item !== '')
			}
		})
		.refine((value) => {
			if (Array.isArray(value)) {
				return value.length > 0
			}
		}) as unknown as z.ZodArray<z.ZodString>
})

export const ProjectSchemaUpdate = z.object({
	title: z
		.string()
		.min(6, {
			message: 'O nome do projeto deve ter no mínimo 6 caracteres'
		})
		.max(45, {
			message: 'O nome do projeto deve ter no máximo 45 caracteres'
		})
		.nonempty(),
	image: z.any(),
	brief: z
		.string()
		.min(10, { message: 'A descrição deve ter no mínimo 10 caracteres' })
		.max(120, {
			message: 'A descrição deve ter no máximo 120 caracteres'
		})
		.nonempty(),
	figma_url: z
		.string()
		.regex(FIGMA_REGEX, {
			message: 'O link do figma deve ser válido'
		})
		.nonempty(),
	difficulty: z.string().nonempty({
		message: 'O nível do projeto deve ser informado'
	}),
	description: z
		.string()
		.min(10, {
			message: 'Requisitos deve ter no mínimo 10 caracteres'
		})
		.nonempty(),
	technologies: z
		.string()
		.nonempty({
			message: 'As tecnologias devem ser informadas separadas por espaço'
		})
		.transform((value) => {
			if (typeof value === 'string') {
				return value.split(' ').filter((item) => item !== '')
			}
		})
		.refine((value) => {
			if (Array.isArray(value)) {
				return value.length > 0
			}
		}) as unknown as z.ZodArray<z.ZodString>
})

export const ProjectSchemaAPI = z.object({
	title: z
		.string()
		.min(6, {
			message: 'O nome do projeto deve ter no mínimo 6 caracteres'
		})
		.max(45, {
			message: 'O nome do projeto deve ter no máximo 45 caracteres'
		})
		.nonempty(),
	image: z.string().nonempty(),
	brief: z
		.string()
		.min(10, { message: 'A descrição deve ter no mínimo 10 caracteres' })
		.max(120, {
			message: 'A descrição deve ter no máximo 120 caracteres'
		})
		.nonempty(),
	figma_url: z
		.string()
		.regex(FIGMA_REGEX, {
			message: 'O link do figma deve ser válido'
		})
		.nonempty(),
	difficulty: z.string().nonempty({
		message: 'O nível do projeto deve ser informado'
	}),
	description: z
		.string()
		.min(10, {
			message: 'A descrição deve ter no mínimo 10 caracteres'
		})
		.nonempty(),
	technologies: z
		.array(z.string())
		.min(1, {
			message: 'Deve ser informado pelo menos uma tecnologia'
		})
		.nonempty()
})
