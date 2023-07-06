import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@components/ui/button'
import { ArrowRightIcon } from '@radix-ui/react-icons'

interface AboutCardProps {
	title: string
	description: string
	buttonText: string
}

export const AboutCard: React.FC<AboutCardProps> = ({
	title,
	description,
	buttonText
}) => {
	return (
		<article className='grid h-full grid-rows-1 gap-6 rounded-md bg-secondary px-5 py-6'>
			<div className='mx-auto flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#1F1F1F]'>
				<Image
					loading='lazy'
					src='/images/mini-beaker.svg'
					alt='Card Icon'
					width={20}
					height={20}
				/>
			</div>
			<h3 className='text-center font-bold leading-6'>{title}</h3>
			<p className='text-center text-base text-[#8C8C8C]'>{description}</p>
			<Button
				asChild
				variant='ghost'
				className='group/btn-icon gap-2 text-sm font-bold uppercase leading-normal text-primary'>
				<Link href='/faq'>
					{buttonText}{' '}
					<ArrowRightIcon className='h-5 w-5 transition group-hover/btn-icon:rotate-90' />
				</Link>
			</Button>
		</article>
	)
}
