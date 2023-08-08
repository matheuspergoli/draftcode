export const getResources = async () => {
	const response = await fetch('https://graphql.datocms.com/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATO_API_RESOURCES_KEY}`
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
		}),
		next: {
			revalidate: 3600 // 1 hour
		}
	})

	const resources = (await response.json()) as { data: { allResources: Resource[] } }

	return resources.data.allResources
}
