import { z } from 'zod'
import { FIGMA_REGEX } from './utils'

export const ProjectSchemaUpdate = z.object({
	title: z
		.string()
		.min(6, {
			message: 'O nome do projeto deve ter no mínimo 6 caracteres'
		})
		.max(40, {
			message: 'O nome do projeto deve ter no máximo 40 caracteres'
		})
		.nonempty(),
	image: z.any(),
	brief: z
		.string()
		.min(10, { message: 'A descrição deve ter no mínimo 10 caracteres' })
		.max(255, {
			message: 'A descrição deve ter no máximo 255 caracteres'
		})
		.nonempty(),
	figma_url: z
		.string()
		.regex(FIGMA_REGEX, {
			message: 'O link do figma deve ser válido'
		})
		.nonempty(),
	difficulty: z.enum(['Iniciante', 'Intermediário', 'Avançado'], {
		errorMap: () => ({
			message: 'Dificuldade deve ser (Iniciante) - (Intermediário) - (Avançado)'
		})
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
