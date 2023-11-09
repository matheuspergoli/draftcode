import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@components/ui/button'
import { SolutionCard } from '@components/Solution'
import { getChallenge } from '@actions/getChallenge'
import { getUserSession } from '@actions/getUserSession'
import { getSolutionsByChallengeId } from '@actions/getSolutionsByChallengeId'

export default async function Page({ params }: { params: { id: string } }) {
	const session = await getUserSession()

	const isAdmin = session?.user.role === 'ADMIN' || session?.user.role === 'SUPERADMIN'

	const challenge = await getChallenge(params.id)

	if (!challenge) {
		notFound()
	}

	const solutions = await getSolutionsByChallengeId(params.id)

	return (
		<main className='container my-20'>
			{solutions.length > 0 ? (
				<h1 className='mb-14 text-center text-4xl font-semibold'>
					Soluções para o desafio <span className='magic-text'>{challenge.title}</span>{' '}
					enviadas pelos usuários
				</h1>
			) : (
				<div className='mb-14 text-center text-2xl font-semibold'>
					<h1 className='mb-5 text-center'>
						Ainda não temos soluções para o desafio,{' '}
						<span className='magic-text'>{challenge.title}</span>
					</h1>
					<p className='mb-2'>seja o primeiro a enviar uma solução</p>
					<Button asChild className='mx-auto block w-fit'>
						<Link href={`/desafios/${params.id}`}>Ver desafio</Link>
					</Button>
				</div>
			)}

			{solutions.length > 0 && (
				<section className='grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:place-items-stretch'>
					{solutions.map((solution) => (
						<SolutionCard
							key={solution.id}
							id={solution.id}
							image={solution.image}
							image_id={solution.image_id}
							title={solution.project.title}
							brief={solution.project.brief}
							include={{
								deleteAction: isAdmin,
								editAction: isAdmin
							}}
							createdAt={solution.created_at.toString()}
							difficulty={solution.project.difficulty.name}
							authorName={solution.user.name as string}
							authorImage={solution.user.image as string}
						/>
					))}
				</section>
			)}
		</main>
	)
}
