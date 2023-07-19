import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getFavorites } from '@actions/getFavorites'
import { getUserSession } from '@actions/getUserSession'
import { ChallengesCard } from '@components/Challenges/ChallengeCard'

export default async function Favorites() {
	const session = await getUserSession()

	if (!session) {
		redirect('/')
	}

	const favorites = await getFavorites(session?.user.id)

	return (
		<main className='container my-20'>
			<h1 className='w-fit border-b-2 border-primary text-2xl font-bold uppercase leading-[46px] md:text-4xl'>
				Meus Favoritos
			</h1>
			{session?.user.favorites.length === 0 && (
				<div className='mt-20 flex flex-col items-center justify-center gap-5'>
					<p className='text-center'>Você ainda não possui nenhum projeto favoritado</p>
					<Link
						href='/desafios'
						className='hover:bg-primary-dark focus:ring-primary-dark flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-medium uppercase text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2'>
						<span>Ver Desafios</span>
					</Link>
				</div>
			)}

			{session?.user.favorites.length > 0 && (
				<div className='mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3'>
					{favorites.map((favorite) => (
						<ChallengesCard
							key={favorite.id}
							id={favorite.project.id}
							title={favorite.project.title}
							difficulty={favorite.project.difficulty.name}
							image={favorite.project.image}
							technologies={favorite.project.technologies.map((tech) => tech.name)}
						/>
					))}
				</div>
			)}
		</main>
	)
}
