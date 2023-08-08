import { getResources } from '@actions/getResources'
import { ResourcesCard } from '@components/ResourcesCard'

export default async function Recursos() {
	const resources = await getResources()

	return (
		<main className='container my-20'>
			<section className='mb-14'>
				<h1 className='text-center text-4xl font-semibold'>
					<span className='magic-text'>Recursos</span> para você se desenvolver ainda mais
					🚀
				</h1>
			</section>

			<section className='grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:place-items-stretch'>
				{resources?.map((resource) => (
					<ResourcesCard
						key={resource.id}
						image={resource.image.url}
						title={resource.title}
						link={resource.link}
						technologies={resource.technologies}
						description={resource.description}
					/>
				))}
			</section>
		</main>
	)
}
