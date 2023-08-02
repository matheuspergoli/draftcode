import Link from 'next/link'
import { db } from '@configs/db'
import { SolutionCard } from '@components/Solution'
import { getUserSession } from '@actions/getUserSession'

export default async function UserSolutions() {
	const session = await getUserSession()

	const solutions = await db.solution.findMany({
		where: {
			approved: true,
			user_id: session?.user.id
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
			<h1 className='mb-14 w-fit border-b-2 border-primary text-2xl font-bold uppercase leading-[46px] md:text-4xl'>
				Minhas Soluções
			</h1>
			{solutions.length === 0 && (
				<div className='mt-20 flex flex-col items-center justify-center gap-5'>
					<p className='text-center'>Você ainda não possui nenhuma solução enviada</p>
					<Link
						href='/desafios'
						className='hover:bg-primary-dark focus:ring-primary-dark flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-medium uppercase text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2'>
						<span>Ver Desafios</span>
					</Link>
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
							include={{ deleteAction: true, editAction: true }}
							title={solution.project.title}
							brief={solution.project.brief}
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
