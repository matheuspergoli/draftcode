import { Badge } from '@components/ui/badge'

interface ChallengeCardProps {
	link: string
	image: string
	title: string
	description: string
	technologies: {
		title: string
	}[]
}

export const ResourcesCard: React.FC<ChallengeCardProps> = ({
	image,
	title,
	link,
	description,
	technologies
}) => {
	return (
		<article className='h-full w-full max-w-md'>
			<a href={link} target='_blank' rel='noreferrer'>
				<article className='h-full rounded-md border border-border bg-secondary'>
					<figure className='h-[180px] overflow-hidden rounded-t-md'>
						<img
							src={image}
							alt={title}
							className='h-full w-full rounded-t-md object-cover transition hover:scale-110'
						/>
					</figure>
					<section className='flex flex-col gap-5 px-6 py-[40px]'>
						<div className='flex flex-wrap items-center gap-[10px]'>
							{technologies.map((technology, index) => (
								<Badge key={index} className='text-sm uppercase'>
									{technology.title}
								</Badge>
							))}
						</div>
						<h3 className='w-fit border-b border-primary text-[20px] font-bold leading-normal'>
							{title}
						</h3>
						<p className='font-medium leading-6 text-[#8C8C8C]'>{description}</p>
					</section>
				</article>
			</a>
		</article>
	)
}
