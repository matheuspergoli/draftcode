import Link from 'next/link'
import { db } from '@/configs/db'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { notFound, redirect } from 'next/navigation'
import { getChallenge } from '@actions/getChallenge'
import { CreatorCard } from '@components/CreatorCard'
import { ArrowRightIcon } from '@radix-ui/react-icons'

export default async function Desafio({ params }: { params: { id: string } }) {
	const challenge = await getChallenge(params.id, {
		user: 'include',
		difficulty: 'include',
		technologies: 'include'
	})

	if (!challenge) {
		notFound()
	}

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
		github: user?.social_media?.filter((social) => social.type === 'GITHUB')[0],
		website: user?.social_media?.filter((social) => social.type === 'WEBSITE')[0],
		linkedin: user?.social_media?.filter((social) => social.type === 'LINKEDIN')[0]
	}

	return (
		<main className='container'>
			<div className='mt-[60px] flex flex-col gap-10 md:flex-row md:justify-between'>
				<section className='flex flex-col gap-5'>
					<h1 className='w-fit border-b-2 border-primary text-2xl font-bold uppercase leading-[46px] md:text-4xl'>
						{challenge.title}
					</h1>
					<div className='flex flex-wrap items-center gap-[10px]'>
						{challenge.technologies.map((technology) => (
							<Badge key={technology.id} className='text-sm uppercase'>
								{technology.name}
							</Badge>
						))}
					</div>
					<p className='mb-5 max-w-lg font-medium leading-6 text-[#8C8C8C]'>
						{challenge.brief}
					</p>
					<div className='flex flex-wrap items-center gap-3'>
						<Link href={`/solutions/new/${challenge.id}`} className='w-full sm:w-fit'>
							<Button className='group/btn-enviar w-full justify-center gap-2 sm:w-fit sm:justify-start'>
								Enviar desafio
								<ArrowRightIcon className='h-5 w-5 transition group-hover/btn-enviar:rotate-90' />
							</Button>
						</Link>
						<a
							href={challenge.figma_url}
							rel='noreferrer'
							target='_blank'
							className='w-full sm:w-fit'>
							<Button className='group/btn-icon w-full justify-center gap-2 sm:w-fit'>
								Começar desafio
								<ArrowRightIcon className='h-5 w-5 transition group-hover/btn-icon:rotate-90' />
							</Button>
						</a>
					</div>
				</section>

				<section className='flex flex-col-reverse gap-5 md:flex-col'>
					<p className='w-fit border-b-2 border-primary text-xl font-medium uppercase md:self-end'>
						{challenge.difficulty?.name}
					</p>
				</section>
			</div>

			<figure className='my-10 h-[450px] rounded-sm border'>
				<iframe
					allowFullScreen
					name='figma-embed'
					aria-label='Figma embed'
					className='h-full w-full rounded-md object-cover'
					src={`https://www.figma.com/embed?embed_host=astra&url=${challenge.figma_url}`}
				/>
			</figure>

			<section className='mb-[105px] flex flex-col-reverse items-start justify-between gap-5 md:flex-row'>
				<article>
					<h2 className='mb-10 text-xl font-bold'>Requisitos</h2>
					<div className='flex max-w-2xl flex-col gap-[30px] whitespace-pre-line'>
						{challenge.description}
					</div>
				</article>

				<CreatorCard
					madeByText='Desafio adicionado por'
					image={challenge.user.image}
					name={challenge.user.name}
					github={links.github?.url ?? undefined}
					linkedin={links.linkedin?.url ?? undefined}
					website={links.website?.url ?? undefined}
				/>
			</section>
		</main>
	)
}
