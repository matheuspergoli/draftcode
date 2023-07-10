'use client'

import { Button } from '@components/ui/button'
import { ArrowUpIcon } from '@radix-ui/react-icons'

export const ScrollToTop: React.FC = () => {
	return (
		<Button
			size='icon'
			name='scroll-to-top'
			aria-label='Scroll to top'
			className='fixed bottom-4 right-4 z-50'
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
			<ArrowUpIcon className='h-5 w-5' />
		</Button>
	)
}
