import Link from 'next/link'
import { Button } from '@components/ui/button'
import { ArrowRightIcon } from '@radix-ui/react-icons'

export const Hero: React.FC = () => {
	return (
		<section className='container flex items-center justify-between'>
			<article>
				<h2 className='mb-4 max-w-3xl text-center text-3xl font-bold sm:text-left sm:text-5xl sm:leading-[56px]'>
					Aprimore suas skills front-end através de projetos práticos
				</h2>
				<p className='mx-auto mb-12 max-w-xl text-center text-base font-medium leading-6 text-[#8C8C8C] sm:mx-0 sm:text-left'>
					Melhore a qualidade do seu código e domine HTML, CSS e JavaScript, enfrentando
					desafios que simulam cenários reais de desenvolvimento web
				</p>
				<div className='flex flex-col justify-center gap-6 sm:flex-row sm:justify-start'>
					<Button asChild className='font-bold'>
						<Link href='/desafios' className='self-stretch sm:self-center'>
							Comece os desafios
						</Link>
					</Button>

					<Button
						asChild
						variant='ghost'
						className='group/btn-icon gap-[10px] border border-primary font-bold'>
						<Link href='/faq' className='self-stretch sm:self-center'>
							Saiba mais
							<ArrowRightIcon className='h-5 w-5 transition group-hover/btn-icon:rotate-90' />
						</Link>
					</Button>
				</div>
			</article>

			<figure className='hidden lg:block'>
				<img
					className='min-h-min min-w-min'
					src='/images/hero-image.svg'
					alt='DraftCode Hero Image React'
				/>
			</figure>
		</section>
	)
}
