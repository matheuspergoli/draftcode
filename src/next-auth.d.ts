import type { User } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: User & {
			id: string
			role: string
			name: string
			email: string
			image: string
			projects: Project[]
			social_media: Social_Media[]
		}
	}
}
