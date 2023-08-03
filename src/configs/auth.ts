import { db } from './db'
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db) as NextAuthOptions['adapter'],
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string
		})
	],
	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id as string
				session.user.role = token.role as string
				session.user.name = token.name as string
				session.user.email = token.email as string
				session.user.image = token.picture as string
				session.user.isBanned = token.isBanned as boolean
				session.user.solutions = token.solutions as Solution[]
				session.user.favorites = token.favorites as Favorite[]
				session.user.social_media = token.social_media as Social_Media[]
			}

			return session
		},
		async jwt({ token, user }) {
			const dbUser = await db.user.findFirst({
				where: {
					email: token.email
				},
				include: {
					solutions: true,
					favorites: true,
					social_media: true
				}
			})

			if (!dbUser) {
				if (user) {
					token.id = user?.id
				}
				return token
			}

			return {
				id: dbUser.id,
				role: dbUser.role,
				name: dbUser.name,
				email: dbUser.email,
				picture: dbUser.image,
				isBanned: dbUser.isBanned,
				solutions: dbUser.solutions,
				favorites: dbUser.favorites,
				social_media: dbUser.social_media
			}
		}
	},
	pages: {
		signIn: '/login'
	},
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET as string
}
