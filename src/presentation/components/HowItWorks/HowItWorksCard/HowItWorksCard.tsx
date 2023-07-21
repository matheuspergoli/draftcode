import Image from 'next/image'

interface HowItWorksProps {
	title: string
	description: string
}

export const HowItWorksCard: React.FC<HowItWorksProps> = ({ title, description }) => {
	return (
		<article className='grid h-full grid-rows-1 gap-6 rounded-md border border-border bg-secondary px-5 py-6'>
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
		</article>
	)
}
