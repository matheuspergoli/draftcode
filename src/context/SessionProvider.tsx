import { SessionProvider as SessionAppProvider } from 'next-auth/react'

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
	return <SessionAppProvider>{children}</SessionAppProvider>
}
