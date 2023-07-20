import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { cn } from '@/presentation/lib/utils'
import { buttonVariants } from '@components/ui/button'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import { getUserSession } from '@actions/getUserSession'
import { GithubLoginBtn } from '@components/GithubLoginBtn'

export default async function Login() {
	const session = await getUserSession()

	if (session) {
		redirect('/')
	}

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
					<GithubLoginBtn />
				</div>
			</section>
		</main>
	)
}
