import type { User } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: User & {
			id: string
			role: string
			name: string
			email: string
			image: string
			solutions: Solution[]
			favorites: Favorite[]
			challenges: Challenge[]
			social_media: Social_Media[]
		}
	}
}
