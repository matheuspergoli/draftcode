export const getPreviewPosts = async () => {
	const response = await fetch('https://graphql.datocms.com/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATO_API_BLOG_KEY}`
		},
		body: JSON.stringify({
			query: `
			query {
				allPosts {
					id
					slug
					title
					excerpt
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

	const posts = (await response.json()) as { data: { allPosts: BlogPostPreview[] } }

	return posts.data.allPosts
}
