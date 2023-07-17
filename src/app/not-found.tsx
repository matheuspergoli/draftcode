import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
	return (
		<div className='container my-20 flex flex-col items-center justify-center'>
			<h1 className='text-4xl font-bold'>404</h1>
			<p className='text-xl font-medium'>Página não encontrada</p>
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
