import Link from 'next/link'
import { db } from '@configs/db'
import { Button } from '@components/ui/button'
import { SolutionCard } from '@components/Solution'
import { getUserSession } from '@actions/getUserSession'

export default async function Solutions() {
	const session = await getUserSession()

	const isAdmin = session?.user.role === 'ADMIN' || session?.user.role === 'SUPERADMIN'

	const solutions = await db.solution.findMany({
		where: {
			approved: true
		},
		include: {
			project: {
				include: {
					difficulty: true
				}
			},
			user: true
		},
		orderBy: {
			created_at: 'desc'
		}
	})

	return (
		<main className='container my-20'>
			{solutions.length > 0 ? (
				<h1 className='mb-14 text-center text-4xl font-semibold'>
					Soluções de nossos desafios enviados{' '}
					<span className='magic-text'>pelos usuários</span>
				</h1>
			) : (
				<div className='mb-14 text-center text-2xl font-semibold'>
					<h1 className='mb-5 text-center'>
						Ainda não temos soluções para os desafios, seja o primeiro a enviar uma
						solução
					</h1>
					<Button asChild className='mx-auto block w-fit'>
						<Link href='/desafios'>Ver desafios</Link>
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
