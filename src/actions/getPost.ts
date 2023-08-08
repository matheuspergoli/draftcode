export const getPost = async (slug: string) => {
	const response = await fetch('https://graphql.datocms.com/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATO_API_BLOG_KEY}`
		},
		body: JSON.stringify({
			query: `
			query {
				post(filter: { slug: { eq: "${slug}" } }) {
					id
					title
					content {
						value
						blocks {
							id
							image {
								url
								alt
							}
						}
					}
					coverImage {
						url
					}
				}
			}
		`
		}),
		next: {
			revalidate: 3600 // 1 hour
		}
	})

	const post = (await response.json()) as { data: { post: BlogPost } }

	return post.data.post
}
