import { db } from '@configs/db'
import { SolutionCard } from '@components/Solution'

export default async function Solutions() {
	const solutions = await db.solution.findMany({
		where: {
			approved: false
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
				Soluções Pendentes
			</h1>

			{solutions.length > 0 ? (
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
								deleteAction: true,
								editAction: true,
								aproveAction: true
							}}
							createdAt={solution.created_at.toString()}
							difficulty={solution.project.difficulty.name}
							authorName={solution.user.name as string}
							authorImage={solution.user.image as string}
						/>
					))}
				</section>
			) : (
				<h1 className='mb-5 text-center text-xl'>
					Não há soluções pendentes no momento.
				</h1>
			)}
		</main>
	)
}
