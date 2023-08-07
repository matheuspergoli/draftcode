/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from 'next/link'
import { StructuredText } from 'react-datocms'

export default async function BlogPost({ params }: { params: { slug: string } }) {
	const response = await fetch('https://graphql.datocms.com/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATO_API_BLOG_KEY}`
		},
		body: JSON.stringify({
			query: `
			query {
				post(filter: { slug: { eq: "${params.slug}" } }) {
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

	const { data } = (await response.json()) as { data: { post: BlogPost } }

	return (
		<main className='container my-20'>
			<section className='mb-14'>
				<Link href='/blog' className='w-fit border-b-2 text-lg'>
					Voltar para o blog
				</Link>
			</section>
			<section className='prose prose-sm prose-invert mx-auto mb-10 max-w-3xl md:prose-base prose-pre:bg-[#1f2937]'>
				<StructuredText
					data={data?.post.content as any}
					renderBlock={({ record }: any) => (
						<img src={record.image.url} alt={record.image.alt} />
					)}
				/>
			</section>
		</main>
	)
}
