import Link from 'next/link'

interface BlogCardProps {
	title: string
	image: string
	postSlug: string
	description: string
}

export const BlogCard: React.FC<BlogCardProps> = ({
	title,
	image,
	postSlug,
	description
}) => {
	return (
		<article className='h-full w-full max-w-md'>
			<Link href={`/blog/${postSlug}`}>
				<article className='h-full rounded-md border border-border bg-secondary'>
					<figure className='h-[180px] overflow-hidden rounded-t-md'>
						<img
							src={image}
							alt={title}
							className='h-full w-full rounded-t-md object-cover transition hover:scale-110'
						/>
					</figure>
					<section className='flex flex-col gap-5 px-6 py-[40px]'>
						<h2 className='w-fit border-b border-primary text-[20px] font-bold leading-normal'>
							{title}
						</h2>
						<p className='font-medium leading-6 text-[#8C8C8C]'>{description}</p>
					</section>
				</article>
			</Link>
		</article>
	)
}
