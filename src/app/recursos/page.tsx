import { ResourcesCard } from '@components/ResourcesCard'

export const revalidate = 1

export default async function Recursos() {
	const response = await fetch('https://graphql.datocms.com/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATO_API_KEY}`
		},
		body: JSON.stringify({
			query: `
			query {
				allResources(first: "35") {
					id
					link
					title
					description
					image {
						url
					}
					technologies {
						title
					}
				}
			}
		`
		})
	})

	const resources = (await response.json()) as { data: { allResources: Resource[] } }

	return (
		<main className='container my-20'>
			<section className='mb-14'>
				<h1 className='text-center text-4xl font-semibold'>
					<span className='magic-text'>Recursos para você</span> se desenvolver ainda mais
					🚀
				</h1>
			</section>

			<section className='grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:place-items-stretch'>
				{resources.data.allResources?.map((resource) => (
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
