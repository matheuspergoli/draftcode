'use client'

import React from 'react'
import { signIn } from '@externals/libs/auth'
import { Button } from '@components/ui/button'
import { GitHubLogoIcon, ReloadIcon } from '@radix-ui/react-icons'

export const GithubLoginBtn: React.FC = () => {
	const [loading, setLoading] = React.useState(false)

	return (
		<Button
			size='lg'
			variant='ghost'
			onClick={() => {
				setLoading(true)
				signIn()
			}}
			disabled={loading}
			className='flex items-center gap-2 border border-primary uppercase leading-none transition'>
			<GitHubLogoIcon className='h-4 w-4' />
			Login com GitHub
			{loading && <ReloadIcon className='animate-spin' />}
		</Button>
	)
}
