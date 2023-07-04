import { Metadata } from 'next'
import { authOptions } from '@configs/auth'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'
import { Provider } from '@provider/Provider'
import { Toaster } from '@components/ui/toaster'
import { getServerSession } from 'next-auth/next'

import 'swiper/css'
import '../styles/globals.css'

export const metadata: Metadata = {
	title: 'DraftCode',
	description: 'DraftCode é uma plataforma de desafios de programação.'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions)

	return (
		<html lang='pt-br'>
			<body className='flex h-screen flex-col'>
				<Provider>
					<Header user={session?.user} />
					<div className='flex-1'>{children}</div>
					<Footer />
					<Toaster />
				</Provider>
			</body>
		</html>
	)
}
