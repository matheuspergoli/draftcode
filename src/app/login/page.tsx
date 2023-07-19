'use client'

import Link from 'next/link'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { cn } from '@/presentation/lib/utils'
import { buttonVariants, Button } from '@components/ui/button'
import { ChevronLeftIcon, GitHubLogoIcon } from '@radix-ui/react-icons'

export default function Login() {
	return (
		<main className='container my-20'>
			<Link href='/' className={cn(buttonVariants({ variant: 'ghost' }))}>
				<ChevronLeftIcon className='mr-2 h-4 w-4' />
				Voltar
			</Link>
			<section className='my-20 flex items-center justify-center'>
				<div className='flex flex-col items-center gap-3'>
					<Image
						loading='lazy'
						alt='DraftCode Logo'
						src='/images/target.svg'
						width={31}
						height={31}
					/>
					<h1 className='text-2xl font-semibold tracking-tight'>Bem vindo de volta</h1>
					<p>Para continuar, faça login na sua conta do DraftCode.</p>
					<Button
						size='lg'
						variant='ghost'
						onClick={() => signIn('github', { callbackUrl: '/' })}
						className='flex items-center gap-2 border border-primary uppercase leading-none transition'>
						<GitHubLogoIcon className='h-4 w-4' />
						Login com GitHub
					</Button>
				</div>
			</section>
		</main>
	)
}
