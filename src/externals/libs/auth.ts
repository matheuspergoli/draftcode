import {
	signIn as NextAuthSignIn,
	signOut as NextAuthSignOut,
	useSession as NextAuthUseSession
} from 'next-auth/react'

const isMock = process.env.NEXT_PUBLIC_MOCK_NEXT_AUTH === 'true'

export const signIn = () => {
	if (isMock) {
		return {}
	} else {
		return NextAuthSignIn('github', { callbackUrl: '/' })
	}
}

export const signOut = () => {
	if (isMock) {
		return {}
	} else {
		return NextAuthSignOut()
	}
}

export const useSession = () => {
	if (isMock) {
		return {
			data: {
				user: {
					id: '1',
					role: 'USER',
					name: 'John Doe',
					email: 'john@doe.com',
					image: 'https://github.com/shadcn.png',
					projects: [],
					favorites: [],
					social_media: []
				}
			},
			status: 'authenticated',
			update: () => {
				return {}
			}
		}
	} else {
		return NextAuthUseSession()
	}
}
