import { BlogCard } from '@components/BlogCard'
import { getPreviewPosts } from '@actions/getPreviewPosts'

export default async function Blog() {
	const posts = await getPreviewPosts()

	return (
		<main className='container my-20'>
			<section className='mb-14'>
				<h1 className='text-center text-4xl font-semibold'>
					Bem-vindo ao <span className='magic-text'>Blog DraftCode</span> 🚀
				</h1>
			</section>

			<section className='grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:place-items-stretch'>
				{posts?.map((post) => (
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
