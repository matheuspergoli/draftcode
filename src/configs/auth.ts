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
			}

			return session
		},
		async jwt({ token, user }) {
			const dbUser = await db.user.findFirst({
				where: {
					email: token.email
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
				picture: dbUser.image
			}
		}
	},
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET as string
}
