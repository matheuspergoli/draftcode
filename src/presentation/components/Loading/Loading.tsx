import React from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'

interface LoadingProps {
	title: string
	subtitle: string
}

export const Loading: React.FC<LoadingProps> = ({ title, subtitle }) => {
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center'>
			<div className='absolute inset-0 bg-background opacity-80' />
			<div className='relative'>
				<div className='rounded-lg border border-border bg-[#1F1F1F] p-10 text-foreground'>
					<h1 className='text-2xl font-bold'>
						{title}
						<ReloadIcon className='ml-2 inline-block h-6 w-6 animate-spin' />
					</h1>
					<p className='mt-5'>{subtitle}</p>
				</div>
			</div>
		</div>
	)
}
