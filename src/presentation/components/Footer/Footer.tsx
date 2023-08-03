import Link from 'next/link'
import Image from 'next/image'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

export const Footer: React.FC = () => {
	return (
		<footer id='footer' className='border-t border-border bg-secondary py-[30px]'>
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

				<div className='flex items-center gap-3'>
					<Link href='/desafios'>Desafios</Link>

					<Link href='/faq'>FAQ&apos;s</Link>

					<a href='https://discord.gg/svsgUgAvcx' rel='noreferrer' target='_blank'>
						<Image
							loading='lazy'
							alt='Discord Icon'
							src='/images/discord.svg'
							width={21}
							height={24}
						/>
					</a>
				</div>
			</section>
			<section className='container mt-5 flex flex-wrap-reverse items-center justify-between gap-5 text-foreground'>
				<div className='flex items-center gap-2 font-semibold'>
					<GitHubLogoIcon className='h-8 w-8' /> Criado por:{' '}
					<a
						target='_blank'
						rel='noreferrer'
						href='https://matheuspergoli-portfolio.vercel.app/'
						className='underline'>
						Matheus Pergoli
					</a>
				</div>
				<div className='flex items-center gap-3'>
					<a
						target='_blank'
						rel='noreferrer'
						href='mailto:matheus.pergoli2015@yahoo.com'
						className=''>
						Contato
					</a>
					<a href='https://draftcode.substack.com/' target='_blank' rel='noreferrer'>
						Newsletter
					</a>
				</div>
			</section>
		</footer>
	)
}
