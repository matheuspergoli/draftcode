import { Metadata } from 'next'
import { Suspense } from 'react'
import Script from 'next/script'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'
import { Provider } from '@provider/Provider'
import { Toaster } from '@components/ui/toaster'
import { ScrollToTop } from '@components/ScrollToTop'

import 'swiper/css'
import '../styles/globals.css'

export const metadata: Metadata = {
	title: 'DraftCode | Desafios de programação',
	metadataBase: new URL('https://draftcode.vercel.app'),
	creator: 'Matheus Pergoli',
	description:
		'DraftCode é uma plataforma de desafios de programação que te ajuda a se desenvolver como programador, com desafios de programação de todos os níveis. E o melhor, é de graça!',
	keywords: [
		'DraftCode',
		'Desafios',
		'Programação',
		'Next.js',
		'React',
		'Tailwind CSS',
		'Server Components',
		'Vercel'
	],
	authors: [
		{
			name: 'Matheus Pergoli',
			url: 'https://matheuspergoli-portfolio.vercel.app/'
		}
	],
	icons: {
		icon: '/images/icon.png'
	},
	openGraph: {
		type: 'website',
		locale: 'pt_BR',
		title: 'DraftCode',
		siteName: 'DraftCode',
		url: 'https://draftcode.vercel.app',
		description:
			'DraftCode é uma plataforma de desafios de programação que te ajuda a se desenvolver como programador, com desafios de programação de todos os níveis. E o melhor, é de graça!'
	},
	themeColor: '#050505',
	robots: {
		follow: true,
		index: true
	},
	viewport: {
		width: 'device-width',
		initialScale: 1
	}
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='pt-br'>
			<Script src='https://www.googletagmanager.com/gtag/js?id=G-60FHSDW5V2' />
			<Script id='google-analytics'>
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-60FHSDW5V2');
				`}
			</Script>
			<body className='flex h-screen flex-col'>
				<Provider>
					<Suspense fallback={<div>Loading...</div>}>
						<Header />
					</Suspense>
					<div className='flex-1'>{children}</div>
					<Footer />
					<ScrollToTop />
					<Toaster />
				</Provider>
			</body>
		</html>
	)
}
