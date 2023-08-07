import { BlogCard } from '@components/BlogCard'

export default async function Blog() {
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

	return (
		<main className='container my-20'>
			<section className='mb-14'>
				<h1 className='text-center text-4xl font-semibold'>
					Bem-vindo ao <span className='magic-text'>Blog DraftCode</span> 🚀
				</h1>
			</section>

			<section className='grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:place-items-stretch'>
				{posts.data.allPosts?.map((post) => (
					<BlogCard
						key={post.id}
						image={post.coverImage.url}
						title={post.title}
						postSlug={post.slug}
						description={post.excerpt}
					/>
				))}
			</section>
		</main>
	)
}
