import { signIn as NextAuthSignIn, signOut as NextAuthSignOut } from 'next-auth/react'

const isMock = process.env.NEXT_PUBLIC_MOCK_NEXT_AUTH === 'true'

export const signIn = () => {
	if (isMock) {
		return {}
	} else {
		return NextAuthSignIn('github')
	}
}

export const signOut = () => {
	if (isMock) {
		return {}
	} else {
		return NextAuthSignOut()
	}
}
