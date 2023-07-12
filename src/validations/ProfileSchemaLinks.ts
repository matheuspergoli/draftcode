import { z } from 'zod'

export const ProfileSchemaLinks = z.object({
	github: z.string().url(),
	website: z.string().url(),
	linkedin: z.string().url()
})
