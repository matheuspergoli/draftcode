import { db } from '@/configs/db'
import { redirect } from 'next/navigation'
import { Button } from '@components/ui/button'
import { getChallenge } from '@actions/getChallenge'
import { CreatorCard } from '@components/CreatorCard'
import { ArrowRightIcon } from '@radix-ui/react-icons'

export default async function Desafio({ params }: { params: { id: string } }) {
	const challenge = await getChallenge(params.id)

	const user = await db.user.findUnique({
		where: {
			id: challenge.user_id
		},
		select: {
			social_media: true
		}
	})

	if (!challenge) {
		redirect('/desafios')
	}

	const links = {
		linkedin: user?.social_media
			?.filter((social) => social.type === 'LINKEDIN')
			.map((social) => social.url)[0],

		github: user?.social_media
			?.filter((social) => social.type === 'GITHUB')
			.map((social) => social.url)[0],

		website: user?.social_media
			?.filter((social) => social.type === 'WEBSITE')
			.map((social) => social.url)[0]
	}

	return (
		<main className='container'>
			<div className='mt-[60px] flex flex-col gap-10 md:flex-row md:justify-between'>
				<section className='flex flex-col gap-5'>
					<h1 className='w-fit border-b-2 border-primary text-2xl font-bold uppercase leading-[46px] md:text-4xl'>
						{challenge.title}
					</h1>
					<p className='max-w-lg font-medium leading-6 text-[#8C8C8C]'>
						{challenge.brief}
					</p>
				</section>

				<section className='flex flex-col-reverse gap-5 md:flex-col'>
					<a href={challenge.figma_url} rel='noreferrer' target='_blank'>
						<Button className='group/btn-icon w-fit gap-2'>
							Começar desafio
							<ArrowRightIcon className='h-5 w-5 transition group-hover/btn-icon:rotate-90' />
						</Button>
					</a>
					<p className='w-fit border-b-2 border-primary text-xl font-medium uppercase md:self-end'>
						{challenge.difficulty?.name}
					</p>
				</section>
			</div>

			<figure className='my-10 h-[450px] '>
				<iframe
					name='figma-embed'
					aria-label='Figma embed'
					className='h-full w-full rounded-md object-cover'
					src={`https://www.figma.com/embed?embed_host=astra&url=${challenge.figma_url}`}
				/>
			</figure>

			<section className='mb-[105px] flex flex-col-reverse items-start justify-between gap-5 md:flex-row'>
				<article>
					<h3 className='mb-10 text-xl font-bold'>Requisitos</h3>
					<div className='flex max-w-2xl flex-col gap-[30px] whitespace-pre-line'>
						{challenge.description}
					</div>
				</article>

				<CreatorCard
					image={challenge.User.image}
					name={challenge.User.name}
					github={links.github}
					linkedin={links.linkedin}
					website={links.website}
				/>
			</section>
		</main>
	)
}
