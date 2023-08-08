/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from 'next/link'
import { getPost } from '@actions/getPost'
import { StructuredText } from 'react-datocms'

export default async function BlogPost({ params }: { params: { slug: string } }) {
	const post = await getPost(params.slug)

	return (
		<main className='container my-20'>
			<section className='mb-14'>
				<Link href='/blog' className='w-fit border-b-2 text-lg'>
					Voltar para o blog
				</Link>
			</section>
			<section className='prose prose-sm prose-invert mx-auto mb-10 max-w-3xl md:prose-base prose-pre:bg-[#1f2937]'>
				<StructuredText
					data={post.content as any}
					renderBlock={({ record }: any) => (
						<img src={record.image.url} alt={record.image.alt} />
					)}
				/>
			</section>
		</main>
	)
}
