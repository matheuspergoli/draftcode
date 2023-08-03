'use client'

import React from 'react'
import { Button } from '@components/ui/button'
import { ArrowUpIcon } from '@radix-ui/react-icons'

export const ScrollToTop: React.FC = () => {
	const [showButton, setShowButton] = React.useState(false)

	React.useEffect(() => {
		const handleScroll = () => {
			const footer = document.getElementById('footer')
			if (footer) {
				const footerPosition = footer.getBoundingClientRect()
				const footerTop = footerPosition.top
				const footerHeight = footerPosition.height
				const halfFooterHeight = footerHeight / 2
				const isFooterVisible = footerTop <= window.innerHeight - halfFooterHeight
				setShowButton(isFooterVisible)
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<>
			{showButton && (
				<Button
					size='icon'
					name='scroll-to-top'
					aria-label='Scroll to top'
					className='fixed bottom-[calc(4rem+110px)] right-4 z-50'
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
					<ArrowUpIcon className='h-5 w-5' />
				</Button>
			)}
		</>
	)
}
