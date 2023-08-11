import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { getUserSession } from '@actions/getUserSession'

export default async function UserBannedPage() {
	const session = await getUserSession()

	if (!session) {
		redirect('/')
	}

	if (!session.user.isBanned) {
		redirect('/')
	}

	return (
		<div className='container my-20 flex flex-col items-center justify-center'>
			<h1 className='mb-1 text-4xl font-bold'>Ops... encontramos algo errado</h1>
			<p className='mb-5 text-xl font-medium'>
				Desculpe, você não pode acessar esta página.
			</p>
			<p>Caso isso tenha sido um erro, entre com contato com nossa equipe.</p>
			<Link
				href='/'
				className='mb-10 mt-5 block rounded-md border-b border-border bg-primary p-2'>
				Voltar para a página inicial
			</Link>
			<figure className='relative h-60 w-full max-w-xs'>
				<Image
					className='object-cover'
					loading='lazy'
					src='/images/hero-image.svg'
					alt='404'
					fill
				/>
			</figure>
		</div>
	)
}
