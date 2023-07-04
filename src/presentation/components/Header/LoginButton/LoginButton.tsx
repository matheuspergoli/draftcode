'use client'

import { signIn } from '@externals/libs/auth'
import { Button } from '@components/ui/button'

export const LoginButton: React.FC = () => {
	return (
		<Button
			variant='ghost'
			className='border border-primary uppercase leading-none transition'
			onClick={() => signIn()}>
			Login
		</Button>
	)
}
