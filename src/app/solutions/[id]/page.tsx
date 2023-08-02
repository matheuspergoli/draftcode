import { db } from '@/configs/db'
import { redirect } from 'next/navigation'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { CreatorCard } from '@components/CreatorCard'
import { DesktopIcon, GitHubLogoIcon } from '@radix-ui/react-icons'

export default async function Solution({ params }: { params: { id: string } }) {
	const solution = await db.solution.findUnique({
		where: {
			id: params.id,
			approved: true
		},
		include: {
			project: {
				include: {
					difficulty: true,
					technologies: true
				}
			},
			user: true
		}
	})

	if (!solution) {
		redirect('/desafios')
	}

	return (
		<main className='container'>
			<div className='mt-[60px] flex flex-col gap-10 md:flex-row md:justify-between'>
				<section className='flex flex-col gap-5'>
					<h1 className='w-fit border-b-2 border-primary text-2xl font-bold uppercase leading-[46px] md:text-4xl'>
						{solution.project.title}
					</h1>
					<div className='flex flex-wrap items-center gap-[10px]'>
						{solution.project.technologies.map((technology) => (
							<Badge key={technology.id} className='text-sm uppercase'>
								{technology.name}
							</Badge>
						))}
					</div>
					<p className='max-w-lg font-medium leading-6 text-[#8C8C8C]'>
						{solution.project.brief}
					</p>
					<div className='flex flex-wrap items-center gap-3'>
						<a
							href={solution.website}
							rel='noreferrer'
							target='_blank'
							className='w-full sm:w-fit'>
							<Button className='w-full justify-center gap-2 sm:w-fit sm:justify-start'>
								Ver website
								<DesktopIcon className='h-5 w-5' />
							</Button>
						</a>
						<a
							href={solution.repository}
							rel='noreferrer'
							target='_blank'
							className='w-full sm:w-fit'>
							<Button className='w-full justify-center gap-2 sm:w-fit sm:justify-start'>
								Ver repositório
								<GitHubLogoIcon className='h-5 w-5' />
							</Button>
						</a>
					</div>
				</section>

				<section className='flex flex-col-reverse gap-5 md:flex-col'>
					<p className='w-fit border-b-2 border-primary text-xl font-medium uppercase md:self-end'>
						{solution.project.difficulty?.name}
					</p>
				</section>
			</div>

			<figure className='my-10 h-[450px] rounded-sm border'>
				<img
					aria-label='Imagem da solução'
					className='h-full w-full rounded-md object-cover'
					src={solution.image}
				/>
			</figure>

			<section className='mb-[105px] flex flex-col-reverse items-start justify-between gap-5 md:flex-row'>
				<article>
					<h2 className='mb-10 text-xl font-bold'>Requisitos</h2>
					<div className='flex max-w-2xl flex-col gap-[30px] whitespace-pre-line'>
						{solution.project.description}
					</div>
				</article>

				<CreatorCard
					madeByText='Desafio feito por'
					image={solution.user.image as string}
					name={solution.user.name as string}
				/>
			</section>
		</main>
	)
}
