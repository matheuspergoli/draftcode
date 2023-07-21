import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@components/ui/button'

export const Footer: React.FC = () => {
	return (
		<footer className='border-t border-border bg-secondary py-[30px]'>
			<section className='container flex flex-wrap items-center justify-between gap-5 border-t border-primary pt-5 md:border-b md:border-t-0 md:pb-5 md:pt-0'>
				<div className='flex items-center gap-2'>
					<Image
						loading='lazy'
						alt='DraftCode Logo'
						src='/images/target.svg'
						width={31}
						height={31}
					/>
					<h1 className='text-[20px] font-semibold'>DraftCode</h1>
				</div>

				<div className='flex items-center'>
					<Button asChild variant='link' className='text-foreground'>
						<Link href='/desafios'>Desafios</Link>
					</Button>

					<Button asChild variant='link' className='text-foreground'>
						<Link href='/faq'>FAQ&apos;s</Link>
					</Button>

					<Button asChild variant='link'>
						<a href='https://discord.gg/svsgUgAvcx' rel='noreferrer' target='_blank'>
							<Image
								loading='lazy'
								alt='Discord Icon'
								src='/images/discord.svg'
								width={21}
								height={24}
							/>
						</a>
					</Button>
				</div>
			</section>
			<p className='mt-5 text-center font-semibold text-foreground'>
				Criado por{' '}
				<a
					target='_blank'
					rel='noreferrer'
					href='https://matheuspergoli-portfolio.vercel.app/'
					className='underline'>
					Matheus Pergoli
				</a>
			</p>
		</footer>
	)
}
